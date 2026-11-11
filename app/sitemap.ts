import type { MetadataRoute } from "next";
import { categories } from "@/data/services";
import { publishedPosts } from "@/data/posts";
import { getCatalog } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/seo";

/** Lists every live page, including pages added in the admin. Hidden pages and drafts are left out. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const catalog = await getCatalog();
  const staticPaths = ["/", "/service-areas", "/about-us", "/contact", "/reviews", "/financing", "/faqs", "/blog"];

  return [
    ...staticPaths.map((p) => ({ url: absoluteUrl(p), lastModified: now, priority: p === "/" ? 1 : 0.6 })),
    ...categories.map((c) => ({ url: absoluteUrl(`/${c.slug}`), lastModified: now, priority: 0.9 })),
    ...catalog.services.map((s) => ({ url: absoluteUrl(`/${s.slug}`), lastModified: now, priority: 0.9 })),
    ...catalog.cities.map((l) => ({
      url: absoluteUrl(`/service-areas/${l.slug}`),
      lastModified: now,
      priority: 0.8,
    })),
    ...catalog.otherPages.map((p) => ({ url: absoluteUrl(`/${p.slug}`), lastModified: now, priority: 0.6 })),
    ...publishedPosts().map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p.date ? new Date(p.date) : now,
      priority: 0.5,
    })),
  ];
}
