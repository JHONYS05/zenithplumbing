import { requireAdmin } from "@/lib/adminAuth";
import { readContent } from "@/lib/contentStore";
import { readSettings } from "@/lib/contactInfo";
import { siteConfig } from "@/lib/siteConfig";
import { sanitizeHours } from "@/lib/hours";
import { AdminBar } from "../AdminBar";
import { SettingsForm } from "./SettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  await requireAdmin();
  const settings = readSettings(await readContent({ fresh: true }));

  return (
    <>
      <AdminBar active="settings" />
      <main className="admin-main admin-narrow">
        <div className="admin-head">
          <div>
            <h1>Business info</h1>
            <p className="admin-muted">
              Your phone number, email and hours appear across the website — header, footer, buttons and contact
              page — and in the business details Google reads.
            </p>
          </div>
        </div>

        {(!settings.phone || !settings.email) && (
          <p className="admin-warning">
            <strong>The website is showing placeholder contact details</strong> (
            {siteConfig.phone} · {siteConfig.email}). Enter your real ones below.
          </p>
        )}

        <SettingsForm
          initial={{ phone: settings.phone ?? "", email: settings.email ?? "", hours: sanitizeHours(settings.hours) }}
          updatedAt={settings.updatedAt}
        />
      </main>
    </>
  );
}
