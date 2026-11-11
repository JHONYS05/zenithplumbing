"use client";

import { useActionState, useState } from "react";
import { saveSettingsAction, type SettingsState, type SettingsValues } from "./actions";
import { DAYS, hoursSummary, hoursTable, type DayHours, type DayMode } from "@/lib/hours";

export function SettingsForm({ initial, updatedAt }: { initial: SettingsValues; updatedAt?: string }) {
  const [state, action, pending] = useActionState<SettingsState | undefined, FormData>(saveSettingsAction, undefined);
  const values = state?.values ?? initial;

  return (
    // key resets the inputs to the cleaned-up values after a successful save
    <form
      action={action}
      className="admin-form"
      key={state?.ok ? JSON.stringify(values) : "form"}
      noValidate
    >
      <ContactCard values={values} errors={state?.fieldErrors} />
      <HoursCard initial={values.hours} errors={state?.fieldErrors?.hours} />

      <div className="admin-savebar">
        <div aria-live="polite">
          {state?.error && <p className="admin-error">{state.error}</p>}
          {state?.ok && <p className="admin-success-inline">Saved. The website now shows your updated business info.</p>}
          {!state && updatedAt && (
            <p className="admin-muted">Last updated {new Date(updatedAt).toLocaleDateString("en-US")}</p>
          )}
        </div>
        <button className="admin-btn admin-btn-primary" disabled={pending}>
          {pending ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}

// ───────────────────────── phone + email ─────────────────────────

function ContactCard({ values, errors }: { values: SettingsValues; errors?: SettingsState["fieldErrors"] }) {
  return (
    <section className="admin-card">
      <h2>Contact details</h2>
      <label className="admin-field">
        <span className="admin-field-label">
          Phone number <small>Customers can tap it to call on their phone.</small>
        </span>
        <input
          name="phone"
          type="tel"
          defaultValue={values.phone}
          placeholder="(303) 555-0123"
          autoComplete="off"
          aria-invalid={Boolean(errors?.phone)}
        />
        {errors?.phone && <span className="admin-error">{errors.phone}</span>}
      </label>

      <label className="admin-field">
        <span className="admin-field-label">
          Email address <small>Shown on the contact page and footer.</small>
        </span>
        <input
          name="email"
          type="email"
          defaultValue={values.email}
          placeholder="service@zenithplumbing.com"
          autoComplete="off"
          aria-invalid={Boolean(errors?.email)}
        />
        {errors?.email && <span className="admin-error">{errors.email}</span>}
      </label>

      <p className="admin-muted admin-small">
        Tip: use the same phone number and hours as your Google Business Profile — matching details help local
        search rankings.
      </p>
    </section>
  );
}

// ───────────────────────── hours ─────────────────────────

function HoursCard({ initial, errors }: { initial: DayHours[]; errors?: Record<number, string> }) {
  const [hours, setHours] = useState<DayHours[]>(initial);
  const set = (i: number, patch: Partial<DayHours>) =>
    setHours((h) => h.map((d, j) => (j === i ? { ...d, ...patch } : d)));
  const copyMondayToWeekdays = () => setHours((h) => h.map((d, j) => (j >= 1 && j <= 4 ? { ...h[0] } : d)));

  return (
    <section className="admin-card">
      <div className="admin-card-head">
        <h2>Business hours</h2>
        <button type="button" className="admin-btn admin-btn-small" onClick={copyMondayToWeekdays}>
          Copy Monday to Tue–Fri
        </button>
      </div>

      <div className="admin-hours">
        {hours.map((d, i) => (
          <div key={DAYS[i]} className={`admin-hours-row${errors?.[i] ? " has-error" : ""}`}>
            <strong>{DAYS[i]}</strong>
            <select
              name={`hours_mode_${i}`}
              value={d.mode}
              onChange={(e) => set(i, { mode: e.target.value as DayMode })}
              aria-label={`${DAYS[i]} status`}
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="24h">Open 24 hours</option>
            </select>
            <span className="admin-hours-times" aria-hidden={d.mode !== "open"}>
              {d.mode === "open" ? (
                <>
                  <input
                    type="time"
                    name={`hours_from_${i}`}
                    value={d.from}
                    step={900}
                    onChange={(e) => set(i, { from: e.target.value })}
                    aria-label={`${DAYS[i]} opening time`}
                  />
                  <span>to</span>
                  <input
                    type="time"
                    name={`hours_to_${i}`}
                    value={d.to}
                    step={900}
                    onChange={(e) => set(i, { to: e.target.value })}
                    aria-label={`${DAYS[i]} closing time`}
                  />
                </>
              ) : (
                <>
                  {/* keep the times so switching back to Open restores them */}
                  <input type="hidden" name={`hours_from_${i}`} value={d.from} />
                  <input type="hidden" name={`hours_to_${i}`} value={d.to} />
                  <span className="admin-muted">{d.mode === "closed" ? "Closed all day" : "Open all day and night"}</span>
                </>
              )}
            </span>
            {errors?.[i] && <span className="admin-error admin-hours-error">{errors[i]}</span>}
          </div>
        ))}
      </div>

      <div className="admin-hours-preview">
        <small>How it will look on the website</small>
        <p>
          <span className="admin-muted">Top of every page:</span> {hoursSummary(hours)}
        </p>
        <p>
          <span className="admin-muted">Contact page:</span>{" "}
          {hoursTable(hours)
            .map((r) => `${r.label} ${r.text}`)
            .join(" · ")}
        </p>
      </div>
    </section>
  );
}
