import type { Metadata } from "next";
import { siteConfig } from "./siteConfig";

interface PageSeo {
  /** Full SEO title as it should appear in Google (not templated). */
  title: string;
  description: string;
  /** Path beginning with "/", used for the canonical URL. */
  path: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
}

/** Builds unique title, description, canonical and social tags for a page. */
export function buildMetadata({ title, description, path, keywords, noIndex }: PageSeo): Metadata {
  const url = absoluteUrl(path);
  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}
