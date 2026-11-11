import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import { readContent, storageMode } from "@/lib/contentStore";
import { editablePages, type EditablePage } from "@/lib/pageRegistry";
import { AdminBar } from "./AdminBar";
import { listLeads } from "@/lib/leads";
import { readSettings } from "@/lib/contactInfo";

export const dynamic = "force-dynamic";

const GROUPS: EditablePage["group"][] = ["Main pages", "Service categories", "Services", "Cities", "Other pages"];
const ADD_TYPE: Partial<Record<EditablePage["group"], string>> = { Services: "service", Cities: "city", "Other pages": "page" };

export default async function AdminHome({ searchParams }: { searchParams: Promise<{ q?: string; deleted?: string }> }) {
  await requireAdmin();
  const { q = "", deleted } = await searchParams;
  const [content, leads] = await Promise.all([readContent({ fresh: true }), listLeads()]);
  const newLeads = leads.filter((l) => l.status === "new").length;
  const settings = readSettings(content);
  const query = q.trim().toLowerCase();
  const allPages = editablePages(content);
  const pages = allPages.filter(
    (p) => !query || p.label.toLowerCase().includes(query) || p.path.includes(query),
  );

  const withImages = allPages.filter((p) => {
    const c = content[p.key];
    return c?.heroImage || c?.cardImage || c?.gallery?.length;
  }).length;

  return (
    <>
      <AdminBar active="pages" />
      <main className="admin-main">
        <div className="admin-head">
          <div>
            <h1>Pages</h1>
            <p className="admin-muted">
              Choose a page to change its photos and text, or add a new one. {withImages} of {allPages.length} pages
              have photos.
            </p>
          </div>
          <div className="admin-head-actions">
            <form className="admin-search">
              <input name="q" defaultValue={q} placeholder="Search pages…" aria-label="Search pages" />
            </form>
            <Link href="/admin/new" className="admin-btn admin-btn-primary">
              ＋ Add page
            </Link>
          </div>
        </div>

        {deleted && <p className="admin-success">“{deleted}” was deleted.</p>}

        {newLeads > 0 && (
          <Link href="/admin/leads?status=new" className="admin-leads-alert">
            <strong>
              {newLeads} new lead{newLeads > 1 ? "s" : ""}
            </strong>{" "}
            from the website — view {newLeads > 1 ? "them" : "it"} →
          </Link>
        )}

        {(!settings.phone || !settings.email) && (
          <p className="admin-warning">
            <strong>Your website is showing a placeholder phone number and email.</strong>{" "}
            <Link href="/admin/settings">Add your real contact details →</Link>
          </p>
        )}

        {storageMode === "disk" && process.env.VERCEL && (
          <p className="admin-warning">
            <strong>Uploads won&apos;t be saved on Vercel yet.</strong> Connect a Vercel Blob store to this project
            (Storage → Blob) so photos and changes are kept permanently.
          </p>
        )}

        {GROUPS.map((group) => {
          const list = pages.filter((p) => p.group === group);
          if (!list.length && (query || group !== "Other pages")) return null;
          return (
            <section key={group} className="admin-group">
              <div className="admin-group-head">
                <h2>{group}</h2>
                {ADD_TYPE[group] && (
                  <Link href={`/admin/new?type=${ADD_TYPE[group]}`} className="admin-group-add">
                    ＋ Add {group === "Cities" ? "a city" : group === "Services" ? "a service" : "a page"}
                  </Link>
                )}
              </div>
              {!list.length && (
                <p className="admin-muted admin-empty-group">
                  Add pages such as Commercial Plumbing, Careers or a seasonal offer.
                </p>
              )}
              <ul className="admin-pages">
                {list.map((p) => {
                  const c = content[p.key];
                  const thumb = c?.heroImage?.src ?? c?.cardImage?.src ?? c?.gallery?.[0]?.src;
                  const count = (c?.heroImage ? 1 : 0) + (c?.cardImage ? 1 : 0) + (c?.gallery?.length ?? 0);
                  return (
                    <li key={p.key} className={p.offline ? "is-offline" : undefined}>
                      <Link href={`/admin/edit/${p.key}`} className="admin-page-row">
                        <span className="admin-thumb">
                          {thumb ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={thumb} alt="" loading="lazy" />
                          ) : (
                            <span aria-hidden="true">＋</span>
                          )}
                        </span>
                        <span className="admin-page-info">
                          <strong>
                            {p.label}
                            {p.offline && (
                              <span className="admin-badge badge-offline">{p.custom ? "Draft" : "Hidden"}</span>
                            )}
                            {p.custom && !p.offline && <span className="admin-badge badge-added">Added</span>}
                          </strong>
                          <small>
                            {p.subgroup ? `${p.subgroup} · ` : ""}
                            {p.path}
                          </small>
                        </span>
                        <span className="admin-page-meta">
                          {count ? `${count} photo${count > 1 ? "s" : ""}` : "No photos"}
                          {c?.updatedAt && <small>Updated {new Date(c.updatedAt).toLocaleDateString("en-US")}</small>}
                        </span>
                        <span className="admin-btn admin-btn-small">Edit</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
        {!pages.length && <p className="admin-muted">No pages match “{q}”.</p>}
      </main>
    </>
  );
}
