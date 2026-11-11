/**
 * Business hours, edited in Admin → Business info.
 * Shared by the website (server) and the admin editor (browser), so no server-only imports here.
 */

export type DayMode = "open" | "closed" | "24h";

export interface DayHours {
  mode: DayMode;
  /** "HH:MM", 24-hour clock */
  from: string;
  to: string;
}

/** Monday first. */
export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
export const DAY_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

/** Used until hours are saved in the admin. */
export const DEFAULT_HOURS: DayHours[] = [
  ...Array.from({ length: 5 }, () => ({ mode: "open" as const, from: "07:00", to: "18:00" })),
  { mode: "open", from: "08:00", to: "14:00" },
  { mode: "closed", from: "08:00", to: "14:00" },
];

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

/** Validates 7 days of hours. Returns an error message per day (index), or none. */
export function validateHours(hours: DayHours[]): Record<number, string> {
  const errors: Record<number, string> = {};
  if (hours.length !== 7) return { 0: "All seven days are required." };
  hours.forEach((d, i) => {
    if (d.mode !== "open") return;
    if (!TIME.test(d.from) || !TIME.test(d.to)) errors[i] = "Enter an opening and closing time.";
    else if (d.to <= d.from) errors[i] = "Closing time must be after opening time.";
  });
  return errors;
}

/** "07:00" → "7am", "18:30" → "6:30pm", "12:00" → "12pm" */
export function formatTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const suffix = h < 12 ? "am" : "pm";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m ? `${h12}:${String(m).padStart(2, "0")}${suffix}` : `${h12}${suffix}`;
}

const same = (a: DayHours, b: DayHours) =>
  a.mode === b.mode && (a.mode !== "open" || (a.from === b.from && a.to === b.to));

function describe(d: DayHours) {
  if (d.mode === "24h") return "Open 24 hours";
  if (d.mode === "closed") return "Closed";
  return `${formatTime(d.from)}–${formatTime(d.to)}`;
}

/** Groups consecutive days that share the same hours: [{ label: "Mon–Fri", text: "7am–6pm" }, …] */
export function groupHours(hours: DayHours[]) {
  const groups: { start: number; end: number; day: DayHours }[] = [];
  hours.forEach((d, i) => {
    const last = groups[groups.length - 1];
    if (last && same(last.day, d)) last.end = i;
    else groups.push({ start: i, end: i, day: d });
  });
  return groups.map((g) => ({
    label: g.start === g.end ? DAY_SHORT[g.start] : `${DAY_SHORT[g.start]}–${DAY_SHORT[g.end]}`,
    text: describe(g.day),
    mode: g.day.mode,
  }));
}

/** Compact one-line summary for the header bar, e.g. "Mon–Fri 7am–6pm · Sat 8am–2pm". Closed days are left out. */
export function hoursSummary(hours: DayHours[]) {
  if (hours.every((d) => d.mode === "24h")) return "Open 24/7";
  const open = groupHours(hours).filter((g) => g.mode !== "closed");
  if (!open.length) return "Call for hours";
  return open.map((g) => `${g.label} ${g.mode === "24h" ? "24 hours" : g.text}`).join(" · ");
}

/** Full week for the contact page: one row per group, closed days included. */
export function hoursTable(hours: DayHours[]) {
  return groupHours(hours).map(({ label, text }) => ({ label, text }));
}

/** schema.org OpeningHoursSpecification for Google. Closed days are omitted. */
export function hoursSchema(hours: DayHours[]) {
  const specs: { dayOfWeek: string[]; opens: string; closes: string }[] = [];
  hours.forEach((d, i) => {
    if (d.mode === "closed") return;
    const opens = d.mode === "24h" ? "00:00" : d.from;
    const closes = d.mode === "24h" ? "23:59" : d.to;
    const match = specs.find((s) => s.opens === opens && s.closes === closes);
    if (match) match.dayOfWeek.push(DAYS[i]);
    else specs.push({ dayOfWeek: [DAYS[i]], opens, closes });
  });
  return specs.map((s) => ({ "@type": "OpeningHoursSpecification", ...s }));
}

/** Accepts stored data defensively, falling back to defaults for anything malformed. */
export function sanitizeHours(value: unknown): DayHours[] {
  if (!Array.isArray(value) || value.length !== 7) return DEFAULT_HOURS;
  return value.map((d, i) => {
    const mode: DayMode = d?.mode === "closed" || d?.mode === "24h" ? d.mode : "open";
    const from = typeof d?.from === "string" && TIME.test(d.from) ? d.from : DEFAULT_HOURS[i].from;
    const to = typeof d?.to === "string" && TIME.test(d.to) ? d.to : DEFAULT_HOURS[i].to;
    return { mode, from, to };
  });
}
