/**
 * The site's live list of cities, services and other pages:
 * built-in pages from /data, minus any hidden in the admin, plus pages added in the admin.
 * Everything that lists or links to pages (menus, footer, sitemap, Service Areas…) uses this.
 */
import "server-only";
import { cache } from "react";
import { readContentCached, type ContentDoc } from "./contentStore";
import {
  categories,
  publishedServices,
  services as builtInServices,
  type CategoryKey,
  type Service,
} from "@/data/services";
import { locations as builtInLocations, publishedLocations, type Location } from "@/data/locations";
import {
  PAGES_KEY,
  SLUG_PATTERN,
  customKey,
  sanitizePagesDoc,
  type CustomPage,
  type CustomType,
  type PagesDoc,
} from "./customPages";

export function readPagesDoc(doc: ContentDoc): PagesDoc {
  return sanitizePagesDoc((doc as Record<string, unknown>)[PAGES_KEY]);
}

export function writePagesDoc(doc: ContentDoc, pages: PagesDoc) {
  (doc as Record<string, unknown>)[PAGES_KEY] = pages;
}

// ───────────────────────── custom page → site shapes ─────────────────────────

export function customServiceDefaults(name: string, summary?: string) {
  const lower = name.toLowerCase();
  return {
    title: `${name} in Colorado | Zenith`,
    description:
      summary || `Professional ${lower} for Colorado homes. Contact Zenith to request service or an estimate.`,
    h1: name,
    intro:
      summary ||
      `Zenith provides professional ${lower} for homes across the Denver metro and Colorado Front Range. We explain your options and the price before any work begins.`,
  };
}

export function customCityDefaults(city: string) {
  return {
    title: `Plumbing, Sewer & HVAC in ${city}, CO | Zenith`,
    description: `Plumbing repair, drain cleaning, sewer line repair and replacement, water heaters and HVAC service for ${city}, Colorado homes. Request service from Zenith.`,
    h1: `Plumbing, Drain, Sewer & HVAC Services in ${city}, CO`,
    intro: `Zenith provides plumbing, drain cleaning, sewer, water heater and HVAC services for homes in ${city}, Colorado.`,
  };
}

export function customPageDefaults(name: string) {
  return { title: `${name} | Zenith Plumbing, Drain, Sewer & HVAC`, description: "", h1: name, intro: "" };
}

function toService(p: CustomPage): Service {
  const d = customServiceDefaults(p.name, p.summary);
  return {
    slug: p.slug,
    category: p.category ?? "plumbing",
    name: p.name,
    title: d.title,
    description: d.description,
    keywords: [p.name.toLowerCase(), `${p.name.toLowerCase()} Colorado`],
    h1: d.h1,
    intro: d.intro,
    summary: p.summary || `Professional ${p.name.toLowerCase()}.`,
    signs: p.signs,
    process: p.process,
    sections: p.sections.map((s) => ({ heading: s.heading, body: s.body })),
    faqs: p.faqs,
    related: [],
  };
}

function toLocation(p: CustomPage): Location {
  return {
    slug: p.slug,
    city: p.name,
    county: p.county ?? "",
    published: true,
    intro: customCityDefaults(p.name).intro,
    localNotes: p.sections.map((s) => ({ title: s.heading, text: s.body })),
    faqs: p.faqs,
  };
}

// ───────────────────────── live catalog ─────────────────────────

export interface Catalog {
  services: Service[];
  cities: Location[];
  otherPages: CustomPage[];
  servicesIn: (key: CategoryKey) => Service[];
  service: (slug: string) => Service | undefined;
  city: (slug: string) => Location | undefined;
  otherPage: (slug: string) => CustomPage | undefined;
}

export function buildCatalog(doc: ContentDoc): Catalog {
  const pages = readPagesDoc(doc);
  const hidden = new Set(pages.hidden);
  const live = pages.custom.filter((p) => p.published);

  const services = [
    ...publishedServices().filter((s) => !hidden.has(s.slug)),
    ...live.filter((p) => p.type === "service").map(toService),
  ];
  const cities = [
    ...publishedLocations().filter((l) => !hidden.has(`service-areas/${l.slug}`)),
    ...live.filter((p) => p.type === "city").map(toLocation),
  ];
  const otherPages = live.filter((p) => p.type === "page");

  return {
    services,
    cities,
    otherPages,
    servicesIn: (key) => services.filter((s) => s.category === key),
    service: (slug) => services.find((s) => s.slug === slug),
    city: (slug) => cities.find((l) => l.slug === slug),
    otherPage: (slug) => otherPages.find((p) => p.slug === slug),
  };
}

/** The live catalog, read once per page render. */
export const getCatalog = cache(async () => buildCatalog(await readContentCached()));

// ───────────────────────── address validation ─────────────────────────

/** Top-level addresses already used by the site itself. */
const RESERVED = new Set([
  "admin", "api", "media", "_next", "contact", "about-us", "about", "blog", "faqs", "financing", "reviews",
  "service-areas", "sitemap.xml", "robots.txt", "icon.svg", "favicon.ico", "index", "home", "search", "login",
]);

/** Returns an error message, or null if the address is free. */
export function slugProblem(type: CustomType, slug: string, pages: PagesDoc): string | null {
  if (!slug) return "Enter a web address.";
  if (slug.length > 60 || !SLUG_PATTERN.test(slug)) {
    return "Use only lowercase letters, numbers and dashes (for example: golden-co).";
  }
  const taken =
    type === "city"
      ? builtInLocations.some((l) => l.slug === slug)
      : RESERVED.has(slug) ||
        categories.some((c) => c.slug === slug) ||
        builtInServices.some((s) => s.slug === slug);
  const takenByCustom = pages.custom.some((p) => customKey(p) === customKey({ type, slug }));
  if (taken || takenByCustom) return "That web address is already used by another page. Try a different one.";
  return null;
}
