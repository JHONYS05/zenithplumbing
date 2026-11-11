/**
 * Every page the admin can edit, with its key, public path and built-in defaults.
 * The defaults are shown as placeholders in the admin so you can see what a blank field falls back to.
 */
import "server-only";
import { HOME } from "./homeContent";
import { categories, getCategory, publishedServices } from "@/data/services";
import { publishedLocations } from "@/data/locations";
import type { ContentDoc } from "./contentStore";
import { readPagesDoc, customCityDefaults, customPageDefaults, customServiceDefaults } from "./catalog";
import { customKey, customPath, type CustomPage } from "./customPages";

export interface EditablePage {
  key: string;
  label: string;
  group: "Main pages" | "Service categories" | "Services" | "Cities" | "Other pages";
  /** Category name, for grouping services. */
  subgroup?: string;
  path: string;
  defaults: { title: string; description: string; h1: string; intro: string };
  /** Set for pages added in the admin. */
  custom?: CustomPage;
  /** Built-in city/service that can be hidden from the website. */
  canHide?: boolean;
  /** True when not shown on the website (hidden built-in page or unpublished draft). */
  offline?: boolean;
}

const HOME_TITLE = HOME.title;
const HOME_DESC = HOME.description;

const main: EditablePage[] = [
  { key: "home", label: "Homepage", path: "/", defaults: { title: HOME_TITLE, description: HOME_DESC, h1: HOME.h1, intro: HOME.intro } },
  { key: "about-us", label: "About Us", path: "/about-us", defaults: blank("About Zenith") },
  { key: "contact", label: "Contact", path: "/contact", defaults: blank("Request Service") },
  { key: "service-areas", label: "Service Areas", path: "/service-areas", defaults: blank("Areas We Serve in Colorado") },
  { key: "financing", label: "Financing", path: "/financing", defaults: blank("Financing Options") },
  { key: "reviews", label: "Reviews", path: "/reviews", defaults: blank("Customer Reviews") },
  { key: "faqs", label: "FAQs", path: "/faqs", defaults: blank("Frequently Asked Questions") },
  { key: "blog", label: "Blog", path: "/blog", defaults: blank("Homeowner Guides") },
].map((p) => ({ ...p, group: "Main pages" as const }));

function blank(h1: string) {
  return { title: "", description: "", h1, intro: "" };
}

function fromCustom(p: CustomPage): EditablePage {
  const base = { key: customKey(p), path: customPath(p), custom: p, offline: !p.published };
  if (p.type === "city") {
    return { ...base, label: `${p.name}, CO`, group: "Cities", defaults: customCityDefaults(p.name) };
  }
  if (p.type === "service") {
    return {
      ...base,
      label: p.name,
      group: "Services",
      subgroup: getCategory(p.category ?? "plumbing").name,
      defaults: customServiceDefaults(p.name, p.summary),
    };
  }
  return { ...base, label: p.name, group: "Other pages", defaults: customPageDefaults(p.name) };
}

export function editablePages(doc: ContentDoc): EditablePage[] {
  const pages = readPagesDoc(doc);
  const hidden = new Set(pages.hidden);
  const custom = pages.custom.map(fromCustom);
  return [
    ...main,
    ...categories.map((c) => ({
      key: c.slug,
      label: c.name,
      group: "Service categories" as const,
      path: `/${c.slug}`,
      defaults: { title: c.title, description: c.description.replace("{phone}", "your phone number"), h1: c.h1, intro: c.intro },
    })),
    ...publishedServices().map((s) => ({
      key: s.slug,
      label: s.name,
      group: "Services" as const,
      subgroup: getCategory(s.category).name,
      path: `/${s.slug}`,
      defaults: { title: s.title, description: s.description, h1: s.h1, intro: s.intro },
      canHide: true,
      offline: hidden.has(s.slug),
    })),
    ...custom.filter((p) => p.group === "Services"),
    ...publishedLocations().map((l) => ({
      key: `service-areas/${l.slug}`,
      label: `${l.city}, CO`,
      group: "Cities" as const,
      path: `/service-areas/${l.slug}`,
      defaults: {
        title: `Plumbing, Sewer & HVAC in ${l.city}, CO | Zenith`,
        description: "",
        h1: `Plumbing, Drain, Sewer & HVAC Services in ${l.city}, CO`,
        intro: l.intro,
      },
      canHide: true,
      offline: hidden.has(`service-areas/${l.slug}`),
    })),
    ...custom.filter((p) => p.group === "Cities"),
    ...custom.filter((p) => p.group === "Other pages"),
  ];
}

export const getEditablePage = (doc: ContentDoc, key: string) => editablePages(doc).find((p) => p.key === key);
