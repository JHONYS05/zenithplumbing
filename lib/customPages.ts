/**
 * Pages added in the admin (Admin → Pages → "+ Add page"), plus built-in pages hidden there.
 * Shared by the website and the admin screens — no server-only imports here.
 */
import type { CategoryKey, Faq } from "@/data/services";

export type CustomType = "city" | "service" | "page";

export interface CustomSection {
  heading: string;
  body: string;
}

export interface CustomPage {
  type: CustomType;
  /** URL part: /{slug} for services and other pages, /service-areas/{slug} for cities. Fixed after creation. */
  slug: string;
  /** City name, service name or page name. */
  name: string;
  /** Shown on the website only when true. New pages start as drafts. */
  published: boolean;
  /** Service pages: which menu/category it belongs to. */
  category?: CategoryKey;
  /** City pages: county shown on the Service Areas list. */
  county?: string;
  /** Service pages: one-line description used on cards and in menus. */
  summary?: string;
  /** Service pages: "Signs you need…" bullet list. */
  signs: string[];
  /** Service pages: numbered process steps. */
  process: string[];
  /** Content blocks (cities: "What homeowners should know" cards). */
  sections: CustomSection[];
  faqs: Faq[];
  createdAt: string;
}

export interface PagesDoc {
  custom: CustomPage[];
  /** Page keys of built-in cities/services hidden from the website. */
  hidden: string[];
}

export const PAGES_KEY = "__pages";

export const TYPE_LABEL: Record<CustomType, string> = {
  city: "City page",
  service: "Service page",
  page: "Other page",
};

/** Admin/content key for a custom page (matches the keys used for built-in pages). */
export const customKey = (p: Pick<CustomPage, "type" | "slug">) =>
  p.type === "city" ? `service-areas/${p.slug}` : p.slug;

export const customPath = (p: Pick<CustomPage, "type" | "slug">) => `/${customKey(p)}`;

// ───────────────────────── web addresses ─────────────────────────

/** "Golden" → "golden", "Commercial Plumbing & Drains" → "commercial-plumbing-and-drains" */
export function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
}

/** Suggested address for a new page. Cities get "-co" like the built-in ones (denver-co). */
export function suggestSlug(type: CustomType, name: string) {
  const s = slugify(name);
  if (!s) return "";
  return type === "city" && !s.endsWith("-co") ? `${s}-co` : s;
}

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Mirrors the categories in data/services.ts (kept here so the admin doesn't load all service text). */
export const categoryOptions: { key: CategoryKey; name: string }[] = [
  { key: "plumbing", name: "Plumbing" },
  { key: "drain", name: "Drain Cleaning" },
  { key: "sewer", name: "Sewer Services" },
  { key: "water-heaters", name: "Water Heaters" },
  { key: "hvac", name: "HVAC" },
];
export const isCategoryKey = (v: string): v is CategoryKey => categoryOptions.some((c) => c.key === v);

/** Reads the stored pages document defensively. */
export function sanitizePagesDoc(value: unknown): PagesDoc {
  const v = (value ?? {}) as Partial<PagesDoc>;
  const str = (x: unknown, max = 2000) => (typeof x === "string" ? x.slice(0, max) : "");
  const list = (x: unknown) => (Array.isArray(x) ? x.map((i) => str(i, 300)).filter(Boolean) : []);
  const custom: CustomPage[] = Array.isArray(v.custom)
    ? v.custom
        .filter((p) => p && typeof p.slug === "string" && SLUG_PATTERN.test(p.slug) && typeof p.name === "string")
        .map((p) => ({
          type: p.type === "city" || p.type === "service" ? p.type : "page",
          slug: p.slug,
          name: str(p.name, 80),
          published: p.published === true,
          category: p.type === "service" && isCategoryKey(String(p.category)) ? p.category : p.type === "service" ? "plumbing" : undefined,
          county: str(p.county, 80) || undefined,
          summary: str(p.summary, 200) || undefined,
          signs: list(p.signs),
          process: list(p.process),
          sections: Array.isArray(p.sections)
            ? p.sections.map((s) => ({ heading: str(s?.heading, 120), body: str(s?.body, 4000) })).filter((s) => s.heading || s.body)
            : [],
          faqs: Array.isArray(p.faqs)
            ? p.faqs.map((f) => ({ q: str(f?.q, 200), a: str(f?.a, 2000) })).filter((f) => f.q && f.a)
            : [],
          createdAt: str(p.createdAt, 40) || new Date(0).toISOString(),
        }))
    : [];
  return { custom, hidden: list(v.hidden) };
}
