"use client";

import { useActionState, useState } from "react";
import { createPageAction, type CreateState } from "../actions";
import { categoryOptions, suggestSlug, type CustomType } from "@/lib/customPages";

const TYPES: { type: CustomType; title: string; text: string; example: string }[] = [
  {
    type: "city",
    title: "City page",
    text: "A service-area page for a city you serve. Listed under Service Areas and in the footer.",
    example: "e.g. Golden, Parker, Broomfield",
  },
  {
    type: "service",
    title: "Service page",
    text: "A service you offer. Appears in the top menu under the category you choose.",
    example: "e.g. Gas Line Repair, Water Softeners",
  },
  {
    type: "page",
    title: "Other page",
    text: "Any other page, such as commercial services, careers or a special offer. Linked in the footer.",
    example: "e.g. Commercial Plumbing, Careers",
  },
];

export function NewPageForm({ initialType }: { initialType: CustomType }) {
  const [state, action, pending] = useActionState<CreateState | undefined, FormData>(createPageAction, undefined);
  const v = state?.values;
  const [type, setType] = useState<CustomType>((v?.type as CustomType) || initialType);
  const [name, setName] = useState(v?.name ?? "");
  const [slug, setSlug] = useState(v?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(v?.slug));

  const shownSlug = slugEdited ? slug : suggestSlug(type, name);
  const prefix = type === "city" ? "/service-areas/" : "/";

  return (
    <form action={action} className="admin-form">
      <section className="admin-card">
        <h2>What kind of page?</h2>
        <div className="admin-type-grid" role="radiogroup">
          {TYPES.map((t) => (
            <label key={t.type} className={`admin-type${type === t.type ? " is-selected" : ""}`}>
              <input
                type="radio"
                name="type"
                value={t.type}
                checked={type === t.type}
                onChange={() => setType(t.type)}
              />
              <strong>{t.title}</strong>
              <span>{t.text}</span>
              <small>{t.example}</small>
            </label>
          ))}
        </div>
      </section>

      <section className="admin-card">
        <label className="admin-field">
          <span className="admin-field-label">{type === "city" ? "City name" : type === "service" ? "Service name" : "Page name"}</span>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={type === "city" ? "Golden" : type === "service" ? "Gas Line Repair" : "Commercial Plumbing"}
            maxLength={80}
            required
            autoFocus
          />
        </label>

        {type === "service" && (
          <label className="admin-field">
            <span className="admin-field-label">
              Category <small>Which top-menu section it appears under.</small>
            </span>
            <select name="category" defaultValue={v?.category ?? ""} required>
              <option value="" disabled>
                Choose a category…
              </option>
              {categoryOptions.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        )}

        <label className="admin-field">
          <span className="admin-field-label">
            Web address <small>Filled in from the name. It can&apos;t be changed after the page is created.</small>
          </span>
          <span className="admin-slug">
            <span className="admin-slug-prefix">{prefix}</span>
            <input
              name="slug"
              value={shownSlug}
              onChange={(e) => {
                setSlugEdited(true);
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"));
              }}
              placeholder={type === "city" ? "golden-co" : "gas-line-repair"}
              maxLength={60}
              aria-label="Web address"
            />
          </span>
        </label>
      </section>

      <div className="admin-savebar">
        <div aria-live="polite">{state?.error && <p className="admin-error">{state.error}</p>}</div>
        <button className="admin-btn admin-btn-primary" disabled={pending || !name.trim()}>
          {pending ? "Creating…" : "Create page"}
        </button>
      </div>
    </form>
  );
}
