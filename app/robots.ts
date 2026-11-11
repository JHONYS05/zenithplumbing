import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

/**
 * Search engines and AI assistants are welcome on every public page.
 * ChatGPT search (OAI-SearchBot / ChatGPT-User) and others are named explicitly so it's
 * unambiguous that they may crawl the site. The admin and API stay off-limits to all.
 */
const PRIVATE = ["/api/", "/admin"];
const AI_AND_SEARCH_BOTS = [
  "OAI-SearchBot", // ChatGPT search results
  "ChatGPT-User", // pages a ChatGPT user asks about
  "GPTBot",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Google-Extended", // Gemini
  "Bingbot", // Bing — also feeds Copilot and ChatGPT search
  "Googlebot",
  "Applebot",
  "DuckDuckBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_AND_SEARCH_BOTS.map((userAgent) => ({ userAgent, allow: "/", disallow: PRIVATE })),
      { userAgent: "*", allow: "/", disallow: PRIVATE },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
