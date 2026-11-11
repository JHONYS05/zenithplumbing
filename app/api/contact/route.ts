import { NextResponse } from "next/server";
import { newLeadId, saveLead } from "@/lib/leads";

/**
 * Receives contact form submissions and saves them as leads, viewable at /admin/leads.
 */
export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept bot submissions without processing them.
  if (body.company) return NextResponse.json({ ok: true });

  const field = (k: string, max: number) => String(body[k] ?? "").trim().slice(0, max);
  const name = field("name", 120);
  const phone = field("phone", 40);
  if (!name || !phone) {
    return NextResponse.json({ error: "Please enter your name and phone number." }, { status: 400 });
  }
  if (phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  }

  const page = field("page", 200);
  const lead = {
    id: newLeadId(),
    name,
    phone,
    email: field("email", 200),
    location: field("location", 120),
    service: field("service", 80),
    message: field("message", 2000),
    page: page.startsWith("/") ? page : "",
    receivedAt: new Date().toISOString(),
    status: "new" as const,
    note: "",
  };

  try {
    await saveLead(lead);
  } catch (err) {
    // Never lose a lead silently: log it in full so it can be recovered from the server logs.
    console.error("[contact] could not save lead", err, lead);
    return NextResponse.json(
      { error: "Sorry, we couldn't send your request. Please call us instead." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
