import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import { AdminBar } from "../AdminBar";
import { NewPageForm } from "./NewPageForm";

export const dynamic = "force-dynamic";

export default async function NewPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  await requireAdmin();
  const { type } = await searchParams;
  return (
    <>
      <AdminBar active="pages" />
      <main className="admin-main admin-narrow">
        <p className="admin-crumbs">
          <Link href="/admin">← All pages</Link>
        </p>
        <div className="admin-head">
          <div>
            <h1>Add a page</h1>
            <p className="admin-muted">
              The new page starts as a draft. You&apos;ll add its photos and text next, then publish it when it&apos;s
              ready.
            </p>
          </div>
        </div>
        <NewPageForm initialType={type === "city" || type === "service" || type === "page" ? type : "city"} />
      </main>
    </>
  );
}
