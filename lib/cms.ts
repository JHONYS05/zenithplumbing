/**
 * Page content edited in the built-in admin (/admin): photos, galleries and optional text.
 *
 * Everything is stored as JSON (storage/content.json, or Vercel Blob when connected) —
 * see lib/contentStore.ts. Any field left empty falls back to the built-in content in /data,
 * so a page never breaks.
 */
import { readContentCached } from "./contentStore";

export interface CmsImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface CmsPage {
  title?: string;
  description?: string;
  h1?: string;
  intro?: string;
  heroImage?: CmsImage;
  /** Image used on cards that link to this page. Falls back to heroImage. */
  cardImage?: CmsImage;
  gallery: CmsImage[];
}

const EMPTY: CmsPage = { gallery: [] };

/** Admin content for one page, by key: "home", "sewer-replacement", "service-areas/denver-co"… */
export async function getCmsPage(key: string): Promise<CmsPage> {
  const page = (await readContentCached())[key];
  if (!page) return EMPTY;
  return { ...page, cardImage: page.cardImage ?? page.heroImage, gallery: page.gallery ?? [] };
}

/** Admin content for several pages at once (e.g. card images for a list of services). */
export async function getCmsPages(keys: string[]): Promise<Record<string, CmsPage>> {
  const entries = await Promise.all(keys.map(async (k) => [k, await getCmsPage(k)] as const));
  return Object.fromEntries(entries);
}
