/**
 * Zenith's phone number and email, as set in Admin → Business info.
 * Falls back to the placeholder values in lib/siteConfig.ts until they're set.
 */
import "server-only";
import { cache } from "react";
import { readContentCached, SITE_KEY, type ContentDoc, type SiteSettings } from "./contentStore";
import { siteConfig } from "./siteConfig";
import { hoursSummary, hoursTable, sanitizeHours, type DayHours } from "./hours";

export interface ContactInfo {
  phone: string;
  /** tel: link, e.g. "tel:+13035550123" */
  phoneHref: string;
  email: string;
  /** True while either value is still the built-in placeholder. */
  isPlaceholder: boolean;
  hours: DayHours[];
  /** One line for the header, e.g. "Mon–Fri 7am–6pm · Sat 8am–2pm" */
  hoursSummary: string;
  /** Full week for the contact page */
  hoursTable: { label: string; text: string }[];
}

export function readSettings(doc: ContentDoc): SiteSettings {
  return (doc[SITE_KEY] as SiteSettings | undefined) ?? {};
}

export const getContactInfo = cache(async (): Promise<ContactInfo> => {
  const s = readSettings(await readContentCached());
  const phone = s.phone || siteConfig.phone;
  const hours = sanitizeHours(s.hours);
  return {
    phone,
    phoneHref: telHref(phone),
    email: s.email || siteConfig.email,
    isPlaceholder: !s.phone || !s.email,
    hours,
    hoursSummary: hoursSummary(hours),
    hoursTable: hoursTable(hours),
  };
});

// ───────────────────────── validation / formatting ─────────────────────────

/** Returns a cleaned-up US phone number like "(303) 555-0123", or null if it isn't valid. */
export function normalizePhone(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  const ten = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  if (ten.length !== 10 || /^[01]/.test(ten)) return null;
  return `(${ten.slice(0, 3)}) ${ten.slice(3, 6)}-${ten.slice(6)}`;
}

export function telHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const ten = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  return ten.length === 10 ? `tel:+1${ten}` : `tel:${digits}`;
}

export function normalizeEmail(input: string): string | null {
  const email = input.trim().toLowerCase();
  return /^[^\s@<>()"',;:]+@[^\s@<>()"',;:]+\.[a-z]{2,}$/i.test(email) && email.length <= 200 ? email : null;
}
