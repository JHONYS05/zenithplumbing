"use server";

import { isAdmin } from "@/lib/adminAuth";
import { submitAllPages, type IndexNowResult } from "@/lib/indexnow";

export async function notifySearchEnginesAction(): Promise<IndexNowResult> {
  if (!(await isAdmin())) return { ok: false, count: 0, message: "Your session expired. Please log in again." };
  return submitAllPages();
}
