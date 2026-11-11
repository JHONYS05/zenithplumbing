"use client";

import { useState } from "react";
import { categories } from "@/data/services";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ defaultService = "" }: { defaultService?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const data: Record<string, FormDataEntryValue> = {
      ...Object.fromEntries(new FormData(e.currentTarget)),
      page: window.location.pathname,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setStatus("sent");
      // Conversion event for Google Tag Manager (trigger: Custom Event "generate_lead").
      const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
      (w.dataLayer ??= []).push({ event: "generate_lead", service: data.service || "Not specified", page: data.page });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-success" role="status">
        <h3>Thanks — we got your request.</h3>
        <p>We&apos;ll contact you shortly to schedule. For anything urgent, please call us.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate={false}>
      <div className="form-row">
        <label>
          Name
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          Phone
          <input name="phone" type="tel" required autoComplete="tel" />
        </label>
      </div>
      <div className="form-row">
        <label>
          Email
          <input name="email" type="email" autoComplete="email" />
        </label>
        <label>
          City / ZIP
          <input name="location" autoComplete="postal-code" />
        </label>
      </div>
      <label>
        Service needed
        <select name="service" defaultValue={defaultService}>
          <option value="">Select a service…</option>
          {categories.map((c) => (
            <option key={c.key} value={c.name}>
              {c.name}
            </option>
          ))}
          <option value="Other">Other / not sure</option>
        </select>
      </label>
      <label>
        What&apos;s going on?
        <textarea name="message" rows={4} />
      </label>
      {/* Honeypot field for bots */}
      <input name="company" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      {status === "error" && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button className="btn btn-primary btn-lg" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Request Service"}
      </button>
    </form>
  );
}
