"use client";

import { useState } from "react";
import { categoryOptions, type CustomPage } from "@/lib/customPages";

let nextId = 0;
const withIds = <T,>(items: T[]) => items.map((item) => ({ id: ++nextId, ...item }));

// ───────────────────────── show on website ─────────────────────────

export function PublishSwitch({
  name,
  defaultOn,
  onLabel,
  offLabel,
}: {
  name: string;
  defaultOn: boolean;
  onLabel: string;
  offLabel: string;
}) {
  const [on, setOn] = useState(defaultOn);
  return (
    <label className={`admin-publish${on ? " is-on" : ""}`}>
      <input type="checkbox" name={name} checked={on} onChange={(e) => setOn(e.target.checked)} />
      <span className="admin-switch" aria-hidden="true" />
      <span>
        <strong>Show on website</strong>
        <small>{on ? onLabel : offLabel}</small>
      </span>
    </label>
  );
}

/** For built-in cities and services: hide from or show on the website. */
export function VisibilityCard({ visible }: { visible: boolean }) {
  return (
    <section className="admin-card">
      <input type="hidden" name="visibility_field" value="1" />
      <PublishSwitch
        name="visible"
        defaultOn={visible}
        onLabel="This page is live and listed in the menus, footer and sitemap."
        offLabel="Hidden: removed from the website, menus and sitemap. Turn on to bring it back."
      />
    </section>
  );
}

// ───────────────────────── pages added in the admin ─────────────────────────

export function CustomFields({ page }: { page: CustomPage }) {
  const isCity = page.type === "city";
  const isService = page.type === "service";

  return (
    <>
      <section className="admin-card">
        <h2>Page details</h2>
        <PublishSwitch
          name="custom_published"
          defaultOn={page.published}
          onLabel="Live on the website and listed in the menus, footer and sitemap."
          offLabel="Draft: only you can see this page here. Turn on and save to publish it."
        />

        <label className="admin-field admin-field-spaced">
          <span className="admin-field-label">{isCity ? "City name" : isService ? "Service name" : "Page name"}</span>
          <input name="custom_name" defaultValue={page.name} maxLength={80} required />
        </label>

        {isCity && (
          <label className="admin-field">
            <span className="admin-field-label">
              County <small>Optional. Shown on the Service Areas page.</small>
            </span>
            <input name="custom_county" defaultValue={page.county ?? ""} placeholder="Jefferson County" maxLength={80} />
          </label>
        )}

        {isService && (
          <>
            <label className="admin-field">
              <span className="admin-field-label">
                Category <small>Which top-menu section it appears under.</small>
              </span>
              <select name="custom_category" defaultValue={page.category}>
                {categoryOptions.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="admin-field">
              <span className="admin-field-label">
                Short summary <small>One line shown on service cards, e.g. “Leak checks, repairs and new lines.”</small>
              </span>
              <input name="custom_summary" defaultValue={page.summary ?? ""} maxLength={200} />
            </label>
          </>
        )}
      </section>

      {isService && (
        <section className="admin-card">
          <h2>Service details</h2>
          <label className="admin-field">
            <span className="admin-field-label">
              Signs you need this service <small>One per line. Shown as a checklist.</small>
            </span>
            <textarea
              name="custom_signs"
              rows={5}
              defaultValue={page.signs.join("\n")}
              placeholder={"Smell of gas near an appliance\nHissing sound from a gas line\nHigher gas bills than usual"}
            />
          </label>
          <label className="admin-field">
            <span className="admin-field-label">
              Our process <small>One step per line. Shown as numbered steps.</small>
            </span>
            <textarea
              name="custom_process"
              rows={5}
              defaultValue={page.process.join("\n")}
              placeholder={"Inspect and pressure-test the line\nLocate the problem\nExplain options and price\nRepair and re-test"}
            />
          </label>
        </section>
      )}

      <SectionsEditor
        initial={page.sections}
        title={isCity ? `What ${page.name} homeowners should know` : "Content sections"}
        help={
          isCity
            ? "Short local facts that make this page genuinely useful — e.g. older sewer lines in certain neighborhoods, common problems you see there. Each one shows as a card."
            : "Each section has a heading and text. Leave a blank line between paragraphs."
        }
        headingPlaceholder={isCity ? "Older sewer lines" : "Why choose us for this"}
      />

      <FaqEditor initial={page.faqs} />
    </>
  );
}

// ───────────────────────── repeatable lists ─────────────────────────

function SectionsEditor({
  initial,
  title,
  help,
  headingPlaceholder,
}: {
  initial: CustomPage["sections"];
  title: string;
  help: string;
  headingPlaceholder: string;
}) {
  const [items, setItems] = useState(() => withIds(initial));
  const add = () => setItems((l) => [...l, { id: ++nextId, heading: "", body: "" }]);
  const remove = (id: number) => setItems((l) => l.filter((i) => i.id !== id));

  return (
    <section className="admin-card">
      <h2>{title}</h2>
      <p className="admin-muted">{help}</p>
      <input type="hidden" name="section_count" value={items.length} />
      <div className="admin-repeat">
        {items.map((item, i) => (
          <div key={item.id} className="admin-repeat-item">
            <div className="admin-repeat-head">
              <span>{i + 1}</span>
              <button type="button" className="admin-link-danger" onClick={() => remove(item.id)}>
                Remove
              </button>
            </div>
            <input
              name={`section_heading_${i}`}
              defaultValue={item.heading}
              placeholder={headingPlaceholder}
              maxLength={120}
              aria-label={`Section ${i + 1} heading`}
            />
            <textarea
              name={`section_body_${i}`}
              defaultValue={item.body}
              rows={4}
              placeholder="Write the text for this section…"
              maxLength={4000}
              aria-label={`Section ${i + 1} text`}
            />
          </div>
        ))}
      </div>
      {items.length < 12 && (
        <button type="button" className="admin-btn admin-btn-small" onClick={add}>
          ＋ Add section
        </button>
      )}
    </section>
  );
}

function FaqEditor({ initial }: { initial: CustomPage["faqs"] }) {
  const [items, setItems] = useState(() => withIds(initial));
  const add = () => setItems((l) => [...l, { id: ++nextId, q: "", a: "" }]);
  const remove = (id: number) => setItems((l) => l.filter((i) => i.id !== id));

  return (
    <section className="admin-card">
      <h2>Frequently asked questions</h2>
      <p className="admin-muted">Optional. Shown as an expandable list near the bottom of the page.</p>
      <input type="hidden" name="faq_count" value={items.length} />
      <div className="admin-repeat">
        {items.map((item, i) => (
          <div key={item.id} className="admin-repeat-item">
            <div className="admin-repeat-head">
              <span>Q{i + 1}</span>
              <button type="button" className="admin-link-danger" onClick={() => remove(item.id)}>
                Remove
              </button>
            </div>
            <input name={`faq_q_${i}`} defaultValue={item.q} placeholder="Question" maxLength={200} aria-label={`Question ${i + 1}`} />
            <textarea name={`faq_a_${i}`} defaultValue={item.a} rows={3} placeholder="Answer" maxLength={2000} aria-label={`Answer ${i + 1}`} />
          </div>
        ))}
      </div>
      {items.length < 15 && (
        <button type="button" className="admin-btn admin-btn-small" onClick={add}>
          ＋ Add question
        </button>
      )}
    </section>
  );
}
