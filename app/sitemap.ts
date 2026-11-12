import type { MetadataRoute } from "next";
import { categories } from "@/data/services";
import { publishedPosts } from "@/data/posts";
import { getCatalog } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/seo";

/**
 * Lists every live page, including pages added in the admin. Hidden pages and drafts are left out.
 * Only blog posts carry a lastModified date: Google ignores <lastmod> when it changes on every
 * request, so pages without a real "last edited" date leave it out.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const catalog = await getCatalog();
  const staticPaths = ["/", "/service-areas", "/about-us", "/contact", "/reviews", "/financing", "/faqs", "/blog"];

  return [
    ...staticPaths.map((p) => ({ url: absoluteUrl(p), priority: p === "/" ? 1 : 0.6 })),
    ...categories.map((c) => ({ url: absoluteUrl(`/${c.slug}`), priority: 0.9 })),
    ...catalog.services.map((s) => ({ url: absoluteUrl(`/${s.slug}`), priority: 0.9 })),
    ...catalog.cities.map((l) => ({
      url: absoluteUrl(`/service-areas/${l.slug}`),
      priority: 0.8,
    })),
    ...catalog.otherPages.map((p) => ({ url: absoluteUrl(`/${p.slug}`), priority: 0.6 })),
    ...publishedPosts().map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      ...(p.date ? { lastModified: new Date(p.date) } : {}),
      priority: 0.5,
    })),
  ];
}
