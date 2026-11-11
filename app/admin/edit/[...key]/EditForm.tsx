"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { savePageAction, type SaveState } from "../../actions";
import type { StoredPage } from "@/lib/contentStore";
import type { CmsImage } from "@/lib/cms";
import type { EditablePage } from "@/lib/pageRegistry";
import type { CustomPage } from "@/lib/customPages";
import { CustomFields, VisibilityCard } from "./CustomFields";

interface Props {
  pageKey: string;
  defaults: EditablePage["defaults"];
  content: StoredPage;
  /** Set for pages added in the admin. */
  custom?: CustomPage;
  /** Set for built-in cities/services that can be hidden. */
  visibility?: { visible: boolean };
}

export function EditForm({ pageKey, defaults, content, custom, visibility }: Props) {
  const router = useRouter();
  const [state, action, pending] = useActionState<SaveState | undefined, FormData>(
    savePageAction.bind(null, pageKey),
    undefined,
  );
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (state?.ok) {
      setDirty(false);
      router.refresh();
    }
  }, [state, router]);

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    if (!dirty) return;
    const h = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  return (
    <form
      className="admin-form"
      onChange={() => setDirty(true)}
      // Submit manually instead of <form action>: React clears a form after an action runs,
      // which would wipe everything typed whenever a save is rejected (e.g. an FAQ missing its answer).
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => action(data));
      }}
    >
      {/* Fields remount after each save (new updatedAt) so file inputs and previews reset,
          while the form itself — and its save message — stays put. */}
      <Fields
        key={content.updatedAt ?? "new"}
        defaults={defaults}
        content={content}
        custom={custom}
        visibility={visibility}
      />

      <div className="admin-savebar">
        <div aria-live="polite">
          {state?.error && <p className="admin-error">{state.error}</p>}
          {state?.ok && !dirty && <p className="admin-success-inline">{state.message}</p>}
          {dirty && !pending && <p className="admin-muted">You have unsaved changes.</p>}
        </div>
        <button className="admin-btn admin-btn-primary" disabled={pending}>
          {pending ? "Saving…" : "Save changes"}
        </button>
      </div>
    </form>
  );
}

function Fields({
  defaults,
  content,
  custom,
  visibility,
}: {
  defaults: EditablePage["defaults"];
  content: StoredPage;
  custom?: CustomPage;
  visibility?: { visible: boolean };
}) {
  return (
    <>
      {custom && <CustomFields page={custom} />}
      {visibility && <VisibilityCard visible={visibility.visible} />}
      <section className="admin-card">
        <h2>Photos</h2>
        <div className="admin-slots">
          <ImageSlot
            prefix="hero"
            label="Main image"
            help="Large photo at the top of the page."
            image={content.heroImage}
          />
          <ImageSlot
            prefix="card"
            label="Card image"
            help="Shown on cards that link to this page. Uses the main image if empty."
            image={content.cardImage}
          />
        </div>
      </section>

      <section className="admin-card">
        <h2>Project gallery</h2>
        <p className="admin-muted">Shown as “Recent Projects” on the page. Up to 24 photos.</p>
        <Gallery images={content.gallery ?? []} />
      </section>

      <section className="admin-card">
        <h2>Text</h2>
        <p className="admin-muted">Leave a field empty to keep the website&apos;s built-in text (shown in grey).</p>
        <Field name="h1" label="Page heading" value={content.h1} placeholder={defaults.h1} max={160} />
        <Field name="intro" label="Intro paragraph" value={content.intro} placeholder={defaults.intro} max={1200} textarea />
        <h3>Google search result</h3>
        <Field
          name="title"
          label="SEO title"
          value={content.title}
          placeholder={defaults.title}
          max={120}
          hint="Aim for 50–60 characters."
        />
        <Field
          name="description"
          label="Meta description"
          value={content.description}
          placeholder={defaults.description}
          max={320}
          textarea
          hint="Aim for 140–160 characters."
        />
      </section>
    </>
  );
}

// ───────────────────────── text field ─────────────────────────

function Field(props: {
  name: string;
  label: string;
  value?: string;
  placeholder?: string;
  max: number;
  textarea?: boolean;
  hint?: string;
}) {
  const [len, setLen] = useState(props.value?.length ?? 0);
  const common = {
    name: props.name,
    defaultValue: props.value ?? "",
    placeholder: props.placeholder,
    maxLength: props.max,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setLen(e.target.value.length),
  };
  return (
    <label className="admin-field">
      <span className="admin-field-label">
        {props.label}
        <small>
          {len ? `${len} characters` : "Using built-in text"}
          {props.hint ? ` · ${props.hint}` : ""}
        </small>
      </span>
      {props.textarea ? <textarea rows={3} {...common} /> : <input {...common} />}
    </label>
  );
}

// ───────────────────────── single image slot ─────────────────────────

function ImageSlot({ prefix, label, help, image }: { prefix: string; label: string; help: string; image?: CmsImage }) {
  const [preview, setPreview] = useState<string | undefined>(image?.src);
  const [removed, setRemoved] = useState(false);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget;
    if (!input.files?.length) return;
    setBusy(true);
    const [file] = await shrinkFiles(input);
    setBusy(false);
    if (file) {
      setPreview(URL.createObjectURL(file));
      setRemoved(false);
    }
  }

  const shown = !removed && preview;
  return (
    <div className="admin-slot">
      <div className="admin-slot-head">
        <strong>{label}</strong>
        <small>{help}</small>
      </div>
      <div className={`admin-slot-img${shown ? "" : " empty"}`}>
        {shown ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" />
        ) : (
          <span>{busy ? "Preparing…" : "No image"}</span>
        )}
      </div>
      <div className="admin-slot-actions">
        <label className="admin-btn admin-btn-small">
          {shown ? "Replace" : "Upload"}
          <input
            ref={fileRef}
            type="file"
            name={`${prefix}_file`}
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={onFile}
            hidden
          />
        </label>
        {image && (
          <label className="admin-check">
            <input
              type="checkbox"
              name={`${prefix}_remove`}
              checked={removed}
              onChange={(e) => {
                setRemoved(e.target.checked);
                if (e.target.checked && fileRef.current) fileRef.current.value = "";
              }}
            />
            Remove
          </label>
        )}
      </div>
      <label className="admin-field">
        <span className="admin-field-label">
          Image description <small>(alt text — describe what&apos;s in the photo)</small>
        </span>
        <input name={`${prefix}_alt`} defaultValue={image?.alt ?? ""} placeholder="e.g. New sewer line installed in Aurora" maxLength={200} />
      </label>
    </div>
  );
}

// ───────────────────────── gallery ─────────────────────────

function Gallery({ images }: { images: CmsImage[] }) {
  const [order, setOrder] = useState(images.map((_, i) => i));
  const [removed, setRemoved] = useState<Set<number>>(new Set());
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  const move = (pos: number, dir: -1 | 1) => {
    const next = [...order];
    const target = pos + dir;
    if (target < 0 || target >= next.length) return;
    [next[pos], next[target]] = [next[target], next[pos]];
    setOrder(next);
  };

  async function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget;
    if (!input.files?.length) return setNewPreviews([]);
    setBusy(true);
    const files = await shrinkFiles(input);
    setBusy(false);
    setNewPreviews(files.map((f) => URL.createObjectURL(f)));
  }

  return (
    <>
      <input type="hidden" name="gallery_order" value={order.join(",")} />
      {images.length > 0 && (
        <ul className="admin-gallery">
          {order.map((i, pos) => {
            const img = images[i];
            const isRemoved = removed.has(i);
            return (
              <li key={img.src} className={isRemoved ? "is-removed" : ""}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt="" />
                <input
                  name={`gallery_alt_${i}`}
                  defaultValue={img.alt}
                  placeholder="Describe this photo"
                  maxLength={200}
                  aria-label={`Description for photo ${pos + 1}`}
                />
                <div className="admin-gallery-tools">
                  <button type="button" onClick={() => move(pos, -1)} disabled={pos === 0} aria-label="Move earlier">
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => move(pos, 1)}
                    disabled={pos === order.length - 1}
                    aria-label="Move later"
                  >
                    →
                  </button>
                  <label className="admin-check">
                    <input
                      type="checkbox"
                      name={`gallery_remove_${i}`}
                      checked={isRemoved}
                      onChange={(e) => {
                        const s = new Set(removed);
                        if (e.target.checked) s.add(i);
                        else s.delete(i);
                        setRemoved(s);
                      }}
                    />
                    Remove
                  </label>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <label className="admin-dropzone">
        <input
          type="file"
          name="gallery_files"
          multiple
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={onFiles}
        />
        <span>{busy ? "Preparing photos…" : "＋ Add photos"}</span>
        <small>JPG, PNG or WebP. Large photos are resized automatically.</small>
      </label>
      {newPreviews.length > 0 && (
        <div className="admin-new-previews">
          <small>
            {newPreviews.length} new photo{newPreviews.length > 1 ? "s" : ""} will be added when you save. You can add
            descriptions after saving.
          </small>
          <div>
            {newPreviews.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt="" />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// ───────────────────────── resize in the browser ─────────────────────────

const MAX_EDGE = 2400;
const QUALITY = 0.85;

/**
 * Shrinks large photos before upload (phone photos are often 5–12 MB) and puts the
 * smaller versions back into the file input, so uploads are fast and stay under hosting limits.
 */
async function shrinkFiles(input: HTMLInputElement): Promise<File[]> {
  const original = Array.from(input.files ?? []);
  const out: File[] = [];
  for (const file of original) out.push(await shrink(file).catch(() => file));
  try {
    const dt = new DataTransfer();
    out.forEach((f) => dt.items.add(f));
    input.files = dt.files;
  } catch {
    /* very old browsers: upload the originals */
  }
  return out;
}

async function shrink(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/avif") return file;
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  if (scale === 1 && file.size < 1.5 * 1024 * 1024) {
    bitmap.close();
    return file;
  }
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const keepPng = file.type === "image/png" && file.size < 1.5 * 1024 * 1024;
  const type = keepPng ? "image/png" : "image/jpeg";
  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, type, QUALITY));
  if (!blob || blob.size >= file.size) return file;
  const name = file.name.replace(/\.[^.]+$/, "") + (type === "image/png" ? ".png" : ".jpg");
  return new File([blob], name, { type, lastModified: Date.now() });
}
