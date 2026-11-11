import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import { listLeads, type Lead, type LeadStatus } from "@/lib/leads";
import { AdminBar } from "../AdminBar";
import { ConfirmButton } from "../ConfirmButton";
import { deleteLeadAction, updateLeadAction } from "./actions";

export const dynamic = "force-dynamic";

const TZ = "America/Denver";
const LABEL: Record<LeadStatus, string> = { new: "New", contacted: "Contacted", done: "Done" };
const TABS = ["all", "new", "contacted", "done"] as const;
type Tab = (typeof TABS)[number];

function when(iso: string) {
  const d = new Date(iso);
  const date = d.toLocaleDateString("en-US", { timeZone: TZ, weekday: "short", month: "short", day: "numeric", year: "numeric" });
  const time = d.toLocaleTimeString("en-US", { timeZone: TZ, hour: "numeric", minute: "2-digit" });
  const mins = Math.round((Date.now() - +d) / 60000);
  const ago =
    mins < 1 ? "just now" : mins < 60 ? `${mins} min ago` : mins < 1440 ? `${Math.round(mins / 60)} hr ago` : `${Math.round(mins / 1440)} days ago`;
  return { full: `${date} · ${time}`, ago };
}

export default async function LeadsPage({ searchParams }: { searchParams: Promise<{ status?: string; q?: string }> }) {
  await requireAdmin();
  const { status = "all", q = "" } = await searchParams;
  const tab: Tab = (TABS as readonly string[]).includes(status) ? (status as Tab) : "all";
  const all = await listLeads();
  const counts = { all: all.length, new: 0, contacted: 0, done: 0 };
  all.forEach((l) => counts[l.status]++);

  const query = q.trim().toLowerCase();
  const shown = all.filter(
    (l) =>
      (tab === "all" || l.status === tab) &&
      (!query ||
        [l.name, l.phone, l.email, l.location, l.service, l.message].some((v) => v.toLowerCase().includes(query))),
  );

  return (
    <>
      <AdminBar active="leads" />
      <main className="admin-main">
        <div className="admin-head">
          <div>
            <h1>Leads</h1>
            <p className="admin-muted">
              Requests sent through the website&apos;s contact forms. Times are Mountain Time.
            </p>
          </div>
          <div className="admin-head-actions">
            <form className="admin-search">
              {tab !== "all" && <input type="hidden" name="status" value={tab} />}
              <input name="q" defaultValue={q} placeholder="Search name, phone, city…" aria-label="Search leads" />
            </form>
            {all.length > 0 && (
              <a href="/admin/leads/export" className="admin-btn admin-btn-small">
                Download spreadsheet
              </a>
            )}
          </div>
        </div>

        <nav className="admin-filter" aria-label="Filter by status">
          {TABS.map((t) => (
            <Link
              key={t}
              href={t === "all" ? "/admin/leads" : `/admin/leads?status=${t}`}
              aria-current={tab === t ? "page" : undefined}
            >
              {t === "all" ? "All" : LABEL[t]} <span>{counts[t]}</span>
            </Link>
          ))}
        </nav>

        {all.length === 0 ? (
          <div className="admin-card admin-empty">
            <h2>No leads yet</h2>
            <p className="admin-muted">
              When a customer fills out a “Request Service” form anywhere on the website, it shows up here.
            </p>
          </div>
        ) : shown.length === 0 ? (
          <p className="admin-muted">No leads match.</p>
        ) : (
          <ul className="admin-leads">
            {shown.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </ul>
        )}
      </main>
    </>
  );
}

function LeadCard({ lead }: { lead: Lead }) {
  const t = when(lead.receivedAt);
  const tel = lead.phone.replace(/[^\d+]/g, "");
  return (
    <li className={`admin-lead is-${lead.status}`}>
      <div className="admin-lead-main">
        <div className="admin-lead-top">
          <strong className="admin-lead-name">{lead.name}</strong>
          <span className={`admin-badge badge-${lead.status}`}>{LABEL[lead.status]}</span>
          <time dateTime={lead.receivedAt} title={t.full}>
            {t.ago}
          </time>
        </div>
        <div className="admin-lead-contact">
          <a href={`tel:${tel}`} className="admin-btn admin-btn-small admin-btn-primary">
            📞 {lead.phone}
          </a>
          {lead.email && (
            <a href={`mailto:${lead.email}`} className="admin-btn admin-btn-small">
              ✉ {lead.email}
            </a>
          )}
        </div>
        <dl className="admin-lead-details">
          {lead.service && (
            <div>
              <dt>Service</dt>
              <dd>{lead.service}</dd>
            </div>
          )}
          {lead.location && (
            <div>
              <dt>City / ZIP</dt>
              <dd>{lead.location}</dd>
            </div>
          )}
          <div>
            <dt>Received</dt>
            <dd>{t.full}</dd>
          </div>
          {lead.page && (
            <div>
              <dt>Sent from</dt>
              <dd>
                <a href={lead.page} target="_blank" rel="noopener">
                  {lead.page}
                </a>
              </dd>
            </div>
          )}
        </dl>
        {lead.message && <p className="admin-lead-message">{lead.message}</p>}
      </div>

      <form action={updateLeadAction.bind(null, lead.id)} className="admin-lead-side">
        <label>
          Status
          <select name="status" defaultValue={lead.status}>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="done">Done</option>
          </select>
        </label>
        <label>
          Notes (only you see these)
          <textarea name="note" rows={3} defaultValue={lead.note} placeholder="e.g. Booked for Thu 9am" maxLength={2000} />
        </label>
        <div className="admin-lead-buttons">
          <button className="admin-btn admin-btn-small admin-btn-primary">Save</button>
          <ConfirmButton
            className="admin-btn admin-btn-small admin-btn-danger"
            message={`Delete the lead from ${lead.name}? This can't be undone.`}
            formAction={deleteLeadAction.bind(null, lead.id)}
          >
            Delete
          </ConfirmButton>
        </div>
      </form>
    </li>
  );
}
