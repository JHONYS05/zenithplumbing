/**
 * IndexNow: tells Bing (and other participating search engines) that pages are new or updated,
 * so they're crawled within hours instead of weeks. Bing's index also powers ChatGPT search
 * and Microsoft Copilot.
 *
 * The key below is public by design — search engines confirm it by fetching /<key>.txt.
 */
import "server-only";
import sitemap from "@/app/sitemap";
import { siteConfig } from "./siteConfig";

export const INDEXNOW_KEY = "414ad9625ab4ae957deea8b34c4ed6ae";

export interface IndexNowResult {
  ok: boolean;
  count: number;
  status?: number;
  message: string;
}

/** Submits every page in the sitemap. */
export async function submitAllPages(): Promise<IndexNowResult> {
  const urls = (await sitemap()).map((e) => e.url);
  const host = new URL(siteConfig.url).host;
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: `${siteConfig.url}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
      signal: AbortSignal.timeout(15000),
    });
    // 200 = received, 202 = accepted (key being verified)
    if (res.status === 200 || res.status === 202) {
      return { ok: true, count: urls.length, status: res.status, message: `Sent ${urls.length} pages to Bing.` };
    }
    const reasons: Record<number, string> = {
      400: "the request was invalid",
      403: "the verification key wasn't accepted — make sure the site is live at its real address",
      422: "the pages don't match the site's address — check NEXT_PUBLIC_SITE_URL",
      429: "too many submissions — try again later",
    };
    return { ok: false, count: 0, status: res.status, message: `Bing didn't accept it: ${reasons[res.status] ?? `error ${res.status}`}.` };
  } catch (err) {
    return { ok: false, count: 0, message: `Couldn't reach Bing: ${err instanceof Error ? err.message : String(err)}` };
  }
}
