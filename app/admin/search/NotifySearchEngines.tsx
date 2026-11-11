"use client";

import { useActionState } from "react";
import { notifySearchEnginesAction } from "./actions";
import type { IndexNowResult } from "@/lib/indexnow";

/** Admin card: tell Bing (and ChatGPT search, which uses Bing) about every page right away. */
export function NotifySearchEngines() {
  const [result, action, pending] = useActionState<IndexNowResult | undefined>(notifySearchEnginesAction, undefined);
  return (
    <form action={action} className="admin-card admin-search-card">
      <div>
        <h2>Search engines &amp; ChatGPT</h2>
        <p className="admin-muted">
          After adding pages or making big changes, tell Bing right away. Bing&apos;s index also powers ChatGPT
          search and Microsoft Copilot. Google picks up changes from your sitemap automatically.
        </p>
        {result && <p className={result.ok ? "admin-success-inline" : "admin-error"}>{result.message}</p>}
      </div>
      <button className="admin-btn admin-btn-primary" disabled={pending}>
        {pending ? "Sending…" : "Notify Bing & ChatGPT search"}
      </button>
    </form>
  );
}
