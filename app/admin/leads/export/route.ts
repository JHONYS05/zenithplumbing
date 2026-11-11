import { isAdmin } from "@/lib/adminAuth";
import { listLeads } from "@/lib/leads";

export const dynamic = "force-dynamic";

/** Downloads all leads as a CSV file that opens in Excel, Numbers or Google Sheets. */
export async function GET() {
  if (!(await isAdmin())) return new Response("Unauthorized", { status: 401 });
  const leads = await listLeads();

  const header = ["Received (Mountain Time)", "Status", "Name", "Phone", "Email", "City / ZIP", "Service", "Message", "Sent from page", "Notes"];
  const rows = leads.map((l) => [
    new Date(l.receivedAt).toLocaleString("en-US", { timeZone: "America/Denver" }),
    l.status,
    l.name,
    l.phone,
    l.email,
    l.location,
    l.service,
    l.message,
    l.page,
    l.note,
  ]);
  const csv = "﻿" + [header, ...rows].map((r) => r.map(cell).join(",")).join("\r\n");
  const date = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="zenith-leads-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}

function cell(v: string) {
  let s = String(v ?? "");
  // Stop spreadsheet apps from treating customer-typed text as a formula.
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
