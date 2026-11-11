/**
 * Storage for content edited in the built-in /admin.
 *
 *  - On Vercel (BLOB_READ_WRITE_TOKEN set): images and content go to Vercel Blob.
 *  - Anywhere else: saved to a folder on disk (ADMIN_STORAGE_DIR, default ./storage)
 *    and served through /media/... .
 *
 * All page content lives in one JSON document: { [pageKey]: StoredPage }.
 * In Blob mode each save writes a new, uniquely named version (cms/content-<time>.json) and the
 * newest one wins — this sidesteps CDN caching of overwritten files and keeps a short history.
 */
import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { cache } from "react";
import { put, list, del } from "@vercel/blob";
import type { CmsImage, CmsPage } from "./cms";

export type StoredPage = Partial<Omit<CmsPage, "gallery">> & { gallery?: CmsImage[]; updatedAt?: string };
/** Business-wide settings edited under Admin → Business info. Stored under the key "__site". */
export interface SiteSettings {
  phone?: string;
  email?: string;
  /** Monday-first, 7 entries — see lib/hours.ts */
  hours?: import("./hours").DayHours[];
  updatedAt?: string;
}
export const SITE_KEY = "__site";
export type ContentDoc = Record<string, StoredPage>;

export const storageMode: "blob" | "disk" = process.env.BLOB_READ_WRITE_TOKEN ? "blob" : "disk";
export const CONTENT_TAG = "admin-content";

// Runtime data folder, not part of the build — tell the bundler not to trace it.
const diskRoot = path.resolve(/*turbopackIgnore: true*/ process.env.ADMIN_STORAGE_DIR ?? path.join(process.cwd(), "storage"));
const diskContent = path.join(diskRoot, "content.json");
const diskUploads = path.join(diskRoot, "uploads");
const BLOB_PREFIX = "cms/content-";
const KEEP_VERSIONS = 10;

// ───────────────────────── read ─────────────────────────

export async function readContent(opts: { fresh?: boolean } = {}): Promise<ContentDoc> {
  try {
    if (storageMode === "disk") {
      return JSON.parse(await fs.readFile(diskContent, "utf8"));
    }
    const latest = await latestBlobVersion();
    if (!latest) return {};
    // Each version has a unique URL, so it can be cached indefinitely; saves call updateTag().
    const res = await fetch(latest.url, opts.fresh ? { cache: "no-store" } : { next: { tags: [CONTENT_TAG] } });
    return res.ok ? await res.json() : {};
  } catch (err) {
    if ((err as NodeJS.ErrnoException)?.code !== "ENOENT") console.warn("[admin] could not read content:", err);
    return {};
  }
}

/** Same as readContent(), but read only once per page render. */
export const readContentCached = cache(() => readContent());

async function latestBlobVersion() {
  const { blobs } = await list({ prefix: BLOB_PREFIX, limit: 1000 });
  return blobs.sort((a, b) => +new Date(b.uploadedAt) - +new Date(a.uploadedAt))[0];
}

// ───────────────────────── write ─────────────────────────

export async function writeContent(doc: ContentDoc) {
  const json = JSON.stringify(doc, null, 2);
  if (storageMode === "disk") {
    await fs.mkdir(diskRoot, { recursive: true });
    const tmp = `${diskContent}.${process.pid}.tmp`;
    await fs.writeFile(tmp, json);
    await fs.rename(tmp, diskContent); // atomic replace
    return;
  }
  await put(`${BLOB_PREFIX}${Date.now()}.json`, json, {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: true,
  });
  // Trim old versions.
  const { blobs } = await list({ prefix: BLOB_PREFIX, limit: 1000 });
  const old = blobs
    .sort((a, b) => +new Date(b.uploadedAt) - +new Date(a.uploadedAt))
    .slice(KEEP_VERSIONS)
    .map((b) => b.url);
  if (old.length) await del(old);
}

// ───────────────────────── images ─────────────────────────

const ALLOWED: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};
export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

/** Saves an uploaded image and returns its public URL. */
export async function saveImage(file: File): Promise<string> {
  const ext = ALLOWED[file.type];
  if (!ext) throw new Error(`${file.name}: only JPG, PNG, WebP or AVIF images are allowed.`);
  if (file.size > MAX_UPLOAD_BYTES) throw new Error(`${file.name}: image is larger than 8 MB.`);
  const base =
    file.name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 50) || "image";
  const name = `${base}-${crypto.randomBytes(4).toString("hex")}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  if (storageMode === "disk") {
    await fs.mkdir(diskUploads, { recursive: true });
    await fs.writeFile(path.join(diskUploads, name), bytes);
    return `/media/${name}`;
  }
  const blob = await put(`uploads/${name}`, bytes, {
    access: "public",
    contentType: file.type,
    addRandomSuffix: false,
  });
  return blob.url;
}

/** Deletes an image the admin removed. Ignores images it doesn't own. */
export async function deleteImage(src: string) {
  try {
    if (src.startsWith("/media/")) {
      const name = path.basename(src);
      await fs.unlink(path.join(diskUploads, name));
    } else if (storageMode === "blob" && /\.blob\.vercel-storage\.com\/uploads\//.test(src)) {
      await del(src);
    }
  } catch {
    /* already gone */
  }
}

/** Reads a disk-mode upload for the /media route. Returns null if it doesn't exist. */
export async function readDiskUpload(name: string): Promise<{ data: Buffer; type: string } | null> {
  const safe = path.basename(name);
  if (safe !== name) return null;
  const ext = path.extname(safe).slice(1);
  const type = Object.keys(ALLOWED).find((t) => ALLOWED[t] === ext);
  if (!type) return null;
  try {
    return { data: await fs.readFile(path.join(diskUploads, safe)), type };
  } catch {
    return null;
  }
}
