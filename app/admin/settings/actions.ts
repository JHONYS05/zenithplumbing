"use server";

import { revalidatePath, updateTag } from "next/cache";
import { isAdmin } from "@/lib/adminAuth";
import { CONTENT_TAG, readContent, SITE_KEY, writeContent, type SiteSettings, type StoredPage } from "@/lib/contentStore";
import { normalizeEmail, normalizePhone } from "@/lib/contactInfo";
import { validateHours, type DayHours, type DayMode } from "@/lib/hours";

export interface SettingsValues {
  phone: string;
  email: string;
  hours: DayHours[];
}

export interface SettingsState {
  ok?: boolean;
  error?: string;
  fieldErrors?: { phone?: string; email?: string; hours?: Record<number, string> };
  values?: SettingsValues;
}

function readHours(formData: FormData): DayHours[] {
  return Array.from({ length: 7 }, (_, i) => {
    const m = String(formData.get(`hours_mode_${i}`) ?? "open");
    const mode: DayMode = m === "closed" || m === "24h" ? m : "open";
    return {
      mode,
      from: String(formData.get(`hours_from_${i}`) ?? "").slice(0, 5),
      to: String(formData.get(`hours_to_${i}`) ?? "").slice(0, 5),
    };
  });
}

export async function saveSettingsAction(_prev: SettingsState | undefined, formData: FormData): Promise<SettingsState> {
  if (!(await isAdmin())) return { error: "Your session expired. Please log in again." };

  const rawPhone = String(formData.get("phone") ?? "").trim();
  const rawEmail = String(formData.get("email") ?? "").trim();
  const hours = readHours(formData);
  const raw: SettingsValues = { phone: rawPhone, email: rawEmail, hours };

  // Empty phone/email is allowed — the site then keeps showing the placeholder.
  const phone = rawPhone ? normalizePhone(rawPhone) : "";
  const email = rawEmail ? normalizeEmail(rawEmail) : "";

  const fieldErrors: NonNullable<SettingsState["fieldErrors"]> = {};
  if (phone === null) fieldErrors.phone = "Enter a 10-digit US phone number, e.g. (303) 555-0123.";
  if (email === null) fieldErrors.email = "Enter a valid email address, e.g. service@zenithplumbing.com.";
  const hourErrors = validateHours(hours);
  if (Object.keys(hourErrors).length) fieldErrors.hours = hourErrors;
  if (Object.keys(fieldErrors).length) {
    return { fieldErrors, values: raw, error: "Please fix the highlighted fields." };
  }

  try {
    const doc = await readContent({ fresh: true });
    const settings: SiteSettings = {
      ...((doc[SITE_KEY] as SiteSettings | undefined) ?? {}),
      phone: phone || undefined,
      email: email || undefined,
      hours,
      updatedAt: new Date().toISOString(),
    };
    doc[SITE_KEY] = settings as StoredPage;
    await writeContent(doc);

    // These details appear on every page, so refresh the whole site.
    updateTag(CONTENT_TAG);
    revalidatePath("/", "layout");
    return { ok: true, values: { phone: phone || "", email: email || "", hours } };
  } catch (err) {
    console.error("[admin] saving business info failed", err);
    const msg = err instanceof Error && err.message.startsWith("Saving isn't set up") ? err.message : "Saving failed. Please try again.";
    return { error: msg, values: raw };
  }
}
