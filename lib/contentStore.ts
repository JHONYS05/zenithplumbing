/**
 * Storage for content edited in the built-in /admin.
 *
 *  - On Vercel (BLOB_READ_WRITE_TOKEN set): images and content go to a PRIVATE Vercel Blob store.
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
import { put, list, del, get } from "@vercel/blob";
import { blobToken, env } from "./env";
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

/** Token for the Vercel Blob store (any connection prefix). Passed to every Blob call. */
export const BLOB_TOKEN = blobToken();
export const storageMode: "blob" | "disk" = BLOB_TOKEN ? "blob" : "disk";
export const CONTENT_TAG = "admin-content";

// Runtime data folder, not part of the build — tell the bundler not to trace it.
const diskRoot = path.resolve(/*turbopackIgnore: true*/ env("ADMIN_STORAGE_DIR") ?? path.join(process.cwd(), "storage"));
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
    // Private store: read with the project's token (pages that use it are cached until a save refreshes them).
    const res = await get(latest.pathname, { access: "private", useCache: !opts.fresh, token: BLOB_TOKEN });
    if (!res || res.statusCode !== 200 || !res.stream) return {};
    return JSON.parse(await new Response(res.stream).text());
  } catch (err) {
    if ((err as NodeJS.ErrnoException)?.code !== "ENOENT") console.warn("[admin] could not read content:", err);
    return {};
  }
}

/** Same as readContent(), but read only once per page render. */
export const readContentCached = cache(() => readContent());

async function latestBlobVersion() {
  const { blobs } = await list({ prefix: BLOB_PREFIX, limit: 1000, token: BLOB_TOKEN });
  return blobs.sort((a, b) => +new Date(b.uploadedAt) - +new Date(a.uploadedAt))[0];
}

// ───────────────────────── write ─────────────────────────

/** Shown in the admin when saving is impossible because no storage is set up on the host. */
export const NO_STORAGE_MESSAGE =
  "Saving isn't set up on this server yet. In Vercel, open your project → Storage → Create → Blob, set Access to Private, connect it to the project, then redeploy.";

/**
 * Vercel (and similar hosts) can't save files to their own disk. Without a Blob store, fail early
 * with a clear message instead of a confusing write error.
 */
export function assertCanSave() {
  if (storageMode === "disk" && (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME)) {
    throw new Error(NO_STORAGE_MESSAGE);
  }
}

/** Turns low-level disk errors (read-only / no permission) into the same clear message. */
export function friendlyStorageError(err: unknown): Error {
  const code = (err as NodeJS.ErrnoException)?.code;
  if (code === "EROFS" || code === "EACCES" || code === "EPERM") return new Error(NO_STORAGE_MESSAGE);
  return err instanceof Error ? err : new Error(String(err));
}

export async function writeContent(doc: ContentDoc) {
  assertCanSave();
  const json = JSON.stringify(doc, null, 2);
  if (storageMode === "disk") {
    try {
      await fs.mkdir(diskRoot, { recursive: true });
      const tmp = `${diskContent}.${process.pid}.tmp`;
      await fs.writeFile(tmp, json);
      await fs.rename(tmp, diskContent); // atomic replace
    } catch (err) {
      throw friendlyStorageError(err);
    }
    return;
  }
  await put(`${BLOB_PREFIX}${Date.now()}.json`, json, {
    access: "private",
    token: BLOB_TOKEN,
    contentType: "application/json",
    addRandomSuffix: true,
  });
  // Trim old versions.
  const { blobs } = await list({ prefix: BLOB_PREFIX, limit: 1000, token: BLOB_TOKEN });
  const old = blobs
    .sort((a, b) => +new Date(b.uploadedAt) - +new Date(a.uploadedAt))
    .slice(KEEP_VERSIONS)
    .map((b) => b.pathname);
  if (old.length) await del(old, { token: BLOB_TOKEN });
}

// ───────────────────────── images ─────────────────────────

const ALLOWED: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};
export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

/** Saves an uploaded image and returns its URL on this site (/media/…), in both storage modes. */
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

  assertCanSave();
  if (storageMode === "disk") {
    try {
      await fs.mkdir(diskUploads, { recursive: true });
      await fs.writeFile(path.join(diskUploads, name), bytes);
    } catch (err) {
      throw friendlyStorageError(err);
    }
    return `/media/${name}`;
  }
  await put(`uploads/${name}`, bytes, {
    access: "private",
    token: BLOB_TOKEN,
    contentType: file.type,
    addRandomSuffix: false,
  });
  return `/media/${name}`;
}

/** Deletes an image the admin removed. Ignores images it doesn't own. */
export async function deleteImage(src: string) {
  try {
    if (!src.startsWith("/media/")) return;
    const name = path.basename(src);
    if (storageMode === "disk") await fs.unlink(path.join(diskUploads, name));
    else await del(`uploads/${name}`, { token: BLOB_TOKEN });
  } catch {
    /* already gone */
  }
}

/** Reads an uploaded image for the /media route (from disk or the private Blob store). */
export async function readUpload(
  name: string,
): Promise<{ body: ReadableStream<Uint8Array> | Uint8Array; type: string } | null> {
  const safe = path.basename(name);
  if (safe !== name) return null;
  const ext = path.extname(safe).slice(1);
  const type = Object.keys(ALLOWED).find((t) => ALLOWED[t] === ext);
  if (!type) return null;
  try {
    if (storageMode === "disk") {
      return { body: new Uint8Array(await fs.readFile(path.join(diskUploads, safe))), type };
    }
    const res = await get(`uploads/${safe}`, { access: "private", token: BLOB_TOKEN });
    return res && res.statusCode === 200 && res.stream ? { body: res.stream, type } : null;
  } catch {
    return null;
  }
}
