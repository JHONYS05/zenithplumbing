import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/adminAuth";
import { readContent } from "@/lib/contentStore";
import { getEditablePage } from "@/lib/pageRegistry";
import { TYPE_LABEL } from "@/lib/customPages";
import { AdminBar } from "../../AdminBar";
import { EditForm } from "./EditForm";
import { deleteCustomPageAction, resetPageAction } from "../../actions";
import { ConfirmButton } from "../../ConfirmButton";

export const dynamic = "force-dynamic";

export default async function EditPage({
  params,
  searchParams,
}: {
  params: Promise<{ key: string[] }>;
  searchParams: Promise<{ reset?: string; created?: string }>;
}) {
  await requireAdmin();
  const key = (await params).key.map(decodeURIComponent).join("/");
  const doc = await readContent({ fresh: true });
  const page = getEditablePage(doc, key);
  if (!page) notFound();
  const { reset, created } = await searchParams;
  const content = doc[key] ?? {};

  return (
    <>
      <AdminBar active="pages" />
      <main className="admin-main admin-narrow">
        <p className="admin-crumbs">
          <Link href="/admin">← All pages</Link>
        </p>
        <div className="admin-head">
          <div>
            <h1>
              {page.label}{" "}
              {page.offline && <span className="admin-badge badge-offline">{page.custom ? "Draft" : "Hidden"}</span>}
            </h1>
            <p className="admin-muted">
              {page.custom ? `${TYPE_LABEL[page.custom.type]} · ` : ""}
              {page.offline ? (
                <>Web address when published: {page.path}</>
              ) : (
                <>
                  Live page:{" "}
                  <a href={page.path} target="_blank" rel="noopener">
                    {page.path} ↗
                  </a>
                </>
              )}
            </p>
          </div>
        </div>
        {created && (
          <p className="admin-success">
            Page created as a draft. Fill in the details below, then turn on <strong>Show on website</strong> and
            save to publish it.
          </p>
        )}
        {reset && <p className="admin-success">This page was reset to its original content.</p>}

        <EditForm
          pageKey={key}
          defaults={page.defaults}
          content={content}
          custom={page.custom}
          visibility={page.canHide ? { visible: !page.offline } : undefined}
        />

        {page.custom ? (
          <form action={deleteCustomPageAction.bind(null, key)} className="admin-danger-zone">
            <div>
              <strong>Delete this page</strong>
              <p className="admin-muted">Removes the page, its text and its photos from the website for good.</p>
            </div>
            <ConfirmButton
              className="admin-btn admin-btn-danger"
              message={`Delete “${page.label}”? This removes the page and its photos and can't be undone.`}
            >
              Delete page
            </ConfirmButton>
          </form>
        ) : (
          content.updatedAt && (
            <form action={resetPageAction.bind(null, key)} className="admin-danger-zone">
              <div>
                <strong>Reset this page</strong>
                <p className="admin-muted">Removes all photos and text changes made here for this page.</p>
              </div>
              <ConfirmButton
                className="admin-btn admin-btn-danger"
                message="Remove all photos and text changes for this page? This can't be undone."
              >
                Reset page
              </ConfirmButton>
            </form>
          )
        )}
      </main>
    </>
  );
}
