"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/adminAuth";
import { deleteLead, getLead, saveLead, type LeadStatus } from "@/lib/leads";

const STATUSES: LeadStatus[] = ["new", "contacted", "done"];

export async function updateLeadAction(id: string, formData: FormData) {
  await requireAdmin();
  const lead = await getLead(id);
  if (!lead) return;
  const status = String(formData.get("status") ?? "");
  if (STATUSES.includes(status as LeadStatus)) lead.status = status as LeadStatus;
  if (formData.has("note")) lead.note = String(formData.get("note")).trim().slice(0, 2000);
  await saveLead(lead);
  revalidatePath("/admin/leads");
}

export async function deleteLeadAction(id: string) {
  await requireAdmin();
  await deleteLead(id);
  revalidatePath("/admin/leads");
}
