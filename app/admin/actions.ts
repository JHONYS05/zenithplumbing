"use server";

import { redirect } from "next/navigation";
import { revalidatePath, updateTag } from "next/cache";
import { endSession, isAdmin, passwordMatches, requireAdmin, startSession } from "@/lib/adminAuth";
import {
  CONTENT_TAG,
  deleteImage,
  readContent,
  saveImage,
  writeContent,
  type StoredPage,
} from "@/lib/contentStore";
import { getEditablePage } from "@/lib/pageRegistry";
import type { CmsImage } from "@/lib/cms";
import { readPagesDoc, slugProblem, writePagesDoc } from "@/lib/catalog";
import {
  customKey,
  isCategoryKey,
  suggestSlug,
  type CustomPage,
  type CustomType,
} from "@/lib/customPages";

/** Refreshes every page of the live site (menus and footers list pages, so all pages can change). */
function refreshSite() {
  updateTag(CONTENT_TAG);
  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");
}

// ───────────────────────── login / logout ─────────────────────────

export async function loginAction(_prev: { error?: string } | undefined, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) {
    await new Promise((r) => setTimeout(r, 800)); // slow down guessing
    return { error: "Incorrect password." };
  }
  await startSession();
  redirect("/admin");
}

export async function logoutAction() {
  await endSession();
  redirect("/admin/login");
}

// ───────────────────────── save a page ─────────────────────────

export interface SaveState {
  ok?: boolean;
  message?: string;
  error?: string;
}

const MAX_GALLERY = 24;

export async function savePageAction(key: string, _prev: SaveState | undefined, formData: FormData): Promise<SaveState> {
  if (!(await isAdmin())) return { error: "Your session expired. Please log in again." };

  const text = (name: string, max: number) => {
    const v = String(formData.get(name) ?? "").trim().slice(0, max);
    return v || undefined;
  };
  const file = (name: string) => {
    const f = formData.get(name);
    return f instanceof File && f.size > 0 ? f : undefined;
  };

  try {
    const doc = await readContent({ fresh: true });
    const page = getEditablePage(doc, key);
    if (!page) return { error: "This page no longer exists." };

    // Page details (pages added in the admin) and visibility — checked before any upload.
    const pages = readPagesDoc(doc);
    let published = true;
    if (page.custom) {
      const updated = readCustomFields(formData, page.custom);
      if (typeof updated === "string") return { error: updated };
      pages.custom = pages.custom.map((p) => (customKey(p) === key ? updated : p));
      published = updated.published;
    } else if (page.canHide && formData.get("visibility_field") === "1") {
      published = formData.get("visible") === "on";
      pages.hidden = pages.hidden.filter((k) => k !== key).concat(published ? [] : [key]);
    }
    writePagesDoc(doc, pages);

    const before: StoredPage = doc[key] ?? {};
    const removed: string[] = [];

    // A single image slot (hero or card): keep, update alt text, replace or remove.
    const slot = async (prefix: "hero" | "card", current?: CmsImage): Promise<CmsImage | undefined> => {
      const alt = text(`${prefix}_alt`, 200) ?? "";
      const upload = file(`${prefix}_file`);
      if (upload) {
        if (current) removed.push(current.src);
        return { src: await saveImage(upload), alt };
      }
      if (formData.get(`${prefix}_remove`) === "on") {
        if (current) removed.push(current.src);
        return undefined;
      }
      return current ? { ...current, alt } : undefined;
    };

    const heroImage = await slot("hero", before.heroImage);
    const cardImage = await slot("card", before.cardImage);

    // Gallery: existing photos (alt edits, removals, order) + new uploads.
    const gallery: CmsImage[] = [];
    (before.gallery ?? []).forEach((img, i) => {
      if (formData.get(`gallery_remove_${i}`) === "on") removed.push(img.src);
      else gallery.push({ ...img, alt: text(`gallery_alt_${i}`, 200) ?? "" });
    });
    const order = String(formData.get("gallery_order") ?? "");
    if (order) {
      // "2,0,1" → reorder kept photos by their original index
      const kept = new Map((before.gallery ?? []).map((img, i) => [i, img.src]));
      const rank = new Map(order.split(",").map((v, pos) => [kept.get(Number(v)), pos]));
      gallery.sort((a, b) => (rank.get(a.src) ?? 999) - (rank.get(b.src) ?? 999));
    }
    const newFiles = formData.getAll("gallery_files").filter((f): f is File => f instanceof File && f.size > 0);
    if (gallery.length + newFiles.length > MAX_GALLERY) {
      return { error: `A gallery can hold up to ${MAX_GALLERY} photos.` };
    }
    for (const f of newFiles) gallery.push({ src: await saveImage(f), alt: "" });

    const next: StoredPage = {
      title: text("title", 120),
      description: text("description", 320),
      h1: text("h1", 160),
      intro: text("intro", 1200),
      heroImage,
      cardImage,
      gallery,
      updatedAt: new Date().toISOString(),
    };
    // Drop empty fields so the JSON stays tidy.
    for (const k of Object.keys(next) as (keyof StoredPage)[]) if (next[k] === undefined) delete next[k];
    doc[key] = next;
    await writeContent(doc);

    // Delete files that were replaced/removed and aren't used on any other page.
    const stillUsed = new Set(
      Object.values(doc).flatMap((p) => [p.heroImage?.src, p.cardImage?.src, ...(p.gallery ?? []).map((g) => g.src)]),
    );
    await Promise.all(removed.filter((src) => !stillUsed.has(src)).map(deleteImage));

    // Refresh the live site right away.
    refreshSite();

    const missingAlt = [heroImage, cardImage, ...gallery].filter((i) => i && !i.alt).length;
    const status = !published
      ? page.custom
        ? "Saved as a draft — turn on “Show on website” to publish it."
        : "Saved. This page is hidden from the website."
      : "Saved. The live page is updated.";
    return {
      ok: true,
      message: missingAlt
        ? `${status} ${missingAlt} image${missingAlt > 1 ? "s are" : " is"} missing a description (alt text) — add one for SEO and accessibility.`
        : status,
    };
  } catch (err) {
    console.error("[admin] save failed", err);
    return { error: err instanceof Error ? err.message : "Saving failed. Please try again." };
  }
}

/** Clears every admin change on a page, returning it to the built-in content. */
export async function resetPageAction(key: string) {
  await requireAdmin();
  const doc = await readContent({ fresh: true });
  const page = doc[key];
  if (page) {
    delete doc[key];
    await writeContent(doc);
    const stillUsed = new Set(
      Object.values(doc).flatMap((p) => [p.heroImage?.src, p.cardImage?.src, ...(p.gallery ?? []).map((g) => g.src)]),
    );
    const mine = [page.heroImage?.src, page.cardImage?.src, ...(page.gallery ?? []).map((g) => g.src)];
    await Promise.all(mine.filter((s): s is string => Boolean(s) && !stillUsed.has(s!)).map(deleteImage));
    refreshSite();
  }
  redirect(`/admin/edit/${key}?reset=1`);
}

// ───────────────────────── pages added in the admin ─────────────────────────

/** Reads the "Page details" / content fields of an added page. Returns an error message or the updated page. */
function readCustomFields(formData: FormData, current: CustomPage): CustomPage | string {
  const text = (name: string, max: number) => String(formData.get(name) ?? "").trim().slice(0, max);
  const lines = (name: string) =>
    String(formData.get(name) ?? "")
      .split("\n")
      .map((l) => l.trim().replace(/^[-•*]\s*/, "").slice(0, 200))
      .filter(Boolean)
      .slice(0, 15);
  const count = (name: string, max: number) => Math.min(max, Math.max(0, Number(formData.get(name)) || 0));

  const name = text("custom_name", 80);
  if (!name) return "Enter a name for this page.";

  const sections = [];
  for (let i = 0; i < count("section_count", 12); i++) {
    const heading = text(`section_heading_${i}`, 120);
    const body = text(`section_body_${i}`, 4000);
    if (heading || body) sections.push({ heading, body });
  }
  const faqs = [];
  for (let i = 0; i < count("faq_count", 15); i++) {
    const q = text(`faq_q_${i}`, 200);
    const a = text(`faq_a_${i}`, 2000);
    if (!q && !a) continue;
    if (!q || !a) return "Each FAQ needs both a question and an answer.";
    faqs.push({ q, a });
  }

  const isService = current.type === "service";
  const category = text("custom_category", 40);
  return {
    ...current,
    name,
    published: formData.get("custom_published") === "on",
    county: current.type === "city" ? text("custom_county", 80) || undefined : current.county,
    category: isService ? (isCategoryKey(category) ? category : current.category) : current.category,
    summary: isService ? text("custom_summary", 200) || undefined : current.summary,
    signs: isService ? lines("custom_signs") : current.signs,
    process: isService ? lines("custom_process") : current.process,
    sections,
    faqs,
  };
}

export interface CreateState {
  error?: string;
  values?: { type: string; name: string; slug: string; category: string };
}

export async function createPageAction(_prev: CreateState | undefined, formData: FormData): Promise<CreateState> {
  if (!(await isAdmin())) return { error: "Your session expired. Please log in again." };
  const t = String(formData.get("type") ?? "");
  const name = String(formData.get("name") ?? "").trim().slice(0, 80);
  const slugInput = String(formData.get("slug") ?? "").trim().toLowerCase();
  const categoryInput = String(formData.get("category") ?? "");
  const values = { type: t, name, slug: slugInput, category: categoryInput };

  if (t !== "city" && t !== "service" && t !== "page") return { error: "Choose what kind of page to add.", values };
  const type: CustomType = t;
  if (!name) return { error: type === "city" ? "Enter the city name." : "Enter a name for the page.", values };
  if (type === "service" && !isCategoryKey(categoryInput)) return { error: "Choose which menu the service goes under.", values };

  const slug = slugInput || suggestSlug(type, name);
  const doc = await readContent({ fresh: true });
  const pages = readPagesDoc(doc);
  const problem = slugProblem(type, slug, pages);
  if (problem) return { error: problem, values };

  const page: CustomPage = {
    type,
    slug,
    name,
    published: false,
    category: type === "service" && isCategoryKey(categoryInput) ? categoryInput : undefined,
    signs: [],
    process: [],
    sections: [],
    faqs: [],
    createdAt: new Date().toISOString(),
  };
  pages.custom.push(page);
  writePagesDoc(doc, pages);
  await writeContent(doc);
  refreshSite();
  redirect(`/admin/edit/${customKey(page)}?created=1`);
}

/** Permanently deletes a page added in the admin, with its photos. */
export async function deleteCustomPageAction(key: string) {
  await requireAdmin();
  const doc = await readContent({ fresh: true });
  const pages = readPagesDoc(doc);
  const page = pages.custom.find((p) => customKey(p) === key);
  if (!page) redirect("/admin");

  pages.custom = pages.custom.filter((p) => customKey(p) !== key);
  writePagesDoc(doc, pages);
  const content = doc[key];
  delete doc[key];
  await writeContent(doc);

  if (content) {
    const stillUsed = new Set(
      Object.values(doc).flatMap((p) => [p?.heroImage?.src, p?.cardImage?.src, ...(p?.gallery ?? []).map((g) => g.src)]),
    );
    const mine = [content.heroImage?.src, content.cardImage?.src, ...(content.gallery ?? []).map((g) => g.src)];
    await Promise.all(mine.filter((s): s is string => Boolean(s) && !stillUsed.has(s!)).map(deleteImage));
  }
  refreshSite();
  redirect(`/admin?deleted=${encodeURIComponent(page.name)}`);
}
