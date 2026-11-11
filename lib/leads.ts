/**
 * Contact-form submissions ("leads"), viewable at /admin/leads.
 *
 * Each lead is its own small JSON file, so two customers submitting at the same moment can
 * never overwrite each other.
 *  - Vercel Blob (BLOB_READ_WRITE_TOKEN set): stored as PRIVATE blobs under leads/ — customer
 *    details are not reachable by URL.
 *  - Otherwise: stored on disk in <storage>/leads/.
 */
import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { put, list, del, get } from "@vercel/blob";
import { assertCanSave, BLOB_TOKEN, storageMode } from "./contentStore";
import { env } from "./env";

export type LeadStatus = "new" | "contacted" | "done";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  service: string;
  message: string;
  /** Page the customer was on when they submitted. */
  page: string;
  receivedAt: string;
  status: LeadStatus;
  note: string;
}

const diskDir = path.join(
  path.resolve(/*turbopackIgnore: true*/ env("ADMIN_STORAGE_DIR") ?? path.join(process.cwd(), "storage")),
  "leads",
);
const PREFIX = "leads/";
const MAX_LIST = 1000;

const validId = (id: string) => /^[0-9]{13}-[a-f0-9]{8}$/.test(id);

export function newLeadId() {
  return `${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
}

// ───────────────────────── write ─────────────────────────

export async function saveLead(lead: Lead) {
  if (!validId(lead.id)) throw new Error("Invalid lead id");
  assertCanSave();
  const json = JSON.stringify(lead, null, 2);
  if (storageMode === "disk") {
    await fs.mkdir(diskDir, { recursive: true });
    const file = path.join(diskDir, `${lead.id}.json`);
    const tmp = `${file}.${process.pid}.tmp`;
    await fs.writeFile(tmp, json);
    await fs.rename(tmp, file);
    return;
  }
  await put(`${PREFIX}${lead.id}.json`, json, {
    access: "private",
    token: BLOB_TOKEN,
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function deleteLead(id: string) {
  if (!validId(id)) return;
  if (storageMode === "disk") {
    await fs.unlink(path.join(diskDir, `${id}.json`)).catch(() => {});
    return;
  }
  await del(`${PREFIX}${id}.json`, { token: BLOB_TOKEN }).catch(() => {});
}

// ───────────────────────── read ─────────────────────────

export async function getLead(id: string): Promise<Lead | null> {
  if (!validId(id)) return null;
  try {
    if (storageMode === "disk") {
      return JSON.parse(await fs.readFile(path.join(diskDir, `${id}.json`), "utf8"));
    }
    const res = await get(`${PREFIX}${id}.json`, { access: "private", useCache: false, token: BLOB_TOKEN });
    if (!res) return null;
    return JSON.parse(await new Response(res.stream).text());
  } catch {
    return null;
  }
}

/** All leads, newest first. */
export async function listLeads(): Promise<Lead[]> {
  let ids: string[] = [];
  if (storageMode === "disk") {
    try {
      ids = (await fs.readdir(diskDir)).filter((f) => f.endsWith(".json")).map((f) => f.slice(0, -5));
    } catch {
      return [];
    }
  } else {
    let cursor: string | undefined;
    do {
      const page = await list({ prefix: PREFIX, cursor, limit: 1000, token: BLOB_TOKEN });
      ids.push(...page.blobs.map((b) => b.pathname.slice(PREFIX.length, -5)));
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor && ids.length < MAX_LIST * 2);
  }
  ids = ids.filter(validId).sort().reverse().slice(0, MAX_LIST); // ids start with a timestamp
  const leads = await Promise.all(ids.map(getLead));
  return leads.filter((l): l is Lead => Boolean(l));
}
