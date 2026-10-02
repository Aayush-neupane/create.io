"use client";

import { useState } from "react";

const INPUT_CLS =
  "w-full rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-[13px] transition-colors placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-900 focus:outline-none";

function Label({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <span className="mb-1 block">
      <span className="block text-xs font-medium text-neutral-700">{children}</span>
      {hint && <span className="mt-0.5 block text-[11px] font-normal leading-snug text-neutral-400">{hint}</span>}
    </span>
  );
}

export function TextField({ label, value, onChange, placeholder, hint }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; hint?: string;
}) {
  return (
    <label className="block">
      <Label hint={hint}>{label}</Label>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={INPUT_CLS} />
    </label>
  );
}

export function AreaField({ label, value, onChange, rows = 3, hint }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number; hint?: string;
}) {
  return (
    <label className="block">
      <Label hint={hint}>{label}</Label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className={`${INPUT_CLS} resize-y leading-relaxed`} />
    </label>
  );
}

/** Grouped subsection inside a section editor — mono heading + hairline. */
export function FieldGroup({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-3">
      <p className="mono-meta text-[10.5px] font-semibold uppercase" style={{ letterSpacing: "0.12em", color: "var(--ink-3)" }}>
        {title}
      </p>
      {hint && <p className="mt-0.5 text-[11px] text-neutral-400">{hint}</p>}
      <div className="mt-2.5 space-y-3">{children}</div>
    </div>
  );
}

export function ImageField({ label, value, onChange, demo, hint }: {
  label: string; value: string; onChange: (v: string) => void; demo?: boolean; hint?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true);
    setErr("");
    try {
      // Demo accounts have no server storage — embed images directly.
      if (demo) {
        if (f.size > 1_500_000) throw new Error("Keep demo images under 1.5MB — or sign up for full uploads.");
        const dataUrl: string = await new Promise((resolve, reject) => {
          const r = new FileReader();
          r.onload = () => resolve(String(r.result));
          r.onerror = () => reject(new Error("Could not read that file."));
          r.readAsDataURL(f);
        });
        onChange(dataUrl);
        return;
      }
      const fd = new FormData();
      fd.append("file", f);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed.");
      onChange(data.url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <Label hint={hint}>{label}</Label>
      {value ? (
        <div className="overflow-hidden rounded-lg border border-neutral-200">
          <img src={value} alt="" className="aspect-video w-full object-cover" />
          <div className="flex gap-1 bg-white p-1.5">
            <label className="flex-1 cursor-pointer rounded-md bg-neutral-100 px-2 py-1 text-center text-xs font-medium transition-colors hover:bg-neutral-200">{busy ? "…" : "Replace"}<input type="file" accept="image/*" className="hidden" onChange={pick} /></label>
            <button onClick={() => onChange("")} className="flex-1 rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-red-700 transition-colors hover:bg-red-50">Remove</button>
          </div>
        </div>
      ) : (
        <label className="block cursor-pointer rounded-lg border border-dashed border-neutral-300 bg-white px-3 py-4 text-center text-xs text-neutral-500 transition-colors hover:border-neutral-500 hover:bg-neutral-50">
          {busy ? "Uploading…" : "Click to upload image"}
          <input type="file" accept="image/*" className="hidden" onChange={pick} />
        </label>
      )}
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="…or paste image URL" className={`${INPUT_CLS} mt-1.5 text-xs text-neutral-500`} />
      {err && <p className="mt-1 text-xs text-red-600">{err}</p>}
    </div>
  );
}

/** First meaningful string prop — used as the collapsed summary of a list item. */
function summaryOf(item: Record<string, unknown>): string {
  for (const k of ["title", "name", "q", "label", "value", "day", "school", "company", "role"]) {
    const v = item[k];
    if (typeof v === "string" && v.trim()) return v.trim().slice(0, 48);
  }
  for (const v of Object.values(item)) {
    if (typeof v === "string" && v.trim()) return v.trim().slice(0, 48);
  }
  return "Untitled";
}

export function ListShell({ title, onAdd, addLabel, count, children }: {
  title: string; onAdd: () => void; addLabel: string; count?: number; children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
      <div className="flex items-center justify-between gap-2 border-b border-neutral-100 bg-neutral-50/60 px-3 py-2">
        <span className="text-xs font-semibold">
          {title}
          {typeof count === "number" && (
            <span className="mono-meta ml-1.5 rounded-full px-1.5 py-0.5 text-[10px]" style={{ background: "var(--accent-soft)", color: "var(--accent-text)" }}>{count}</span>
          )}
        </span>
        <button onClick={onAdd} className="rounded-md px-2 py-1 text-[11px] font-semibold text-white transition-transform active:scale-95" style={{ background: "var(--ink)" }}>+ {addLabel}</button>
      </div>
      <div className="space-y-2 p-2.5">{children}</div>
    </div>
  );
}

export function ItemCard({ index, title, onDelete, onMove, children, defaultOpen }: {
  index: number; title?: string; onDelete: () => void; onMove: (dir: -1 | 1) => void;
  children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50/50">
      <div className="flex items-center gap-1.5 px-2 py-1.5">
        <button onClick={() => setOpen((v) => !v)} aria-expanded={open} className="flex min-w-0 flex-1 items-center gap-2 text-left">
          <span aria-hidden className={`text-[10px] text-neutral-400 transition-transform ${open ? "rotate-90" : ""}`}>▶</span>
          <span className="mono-meta text-[10px] text-neutral-400">#{index + 1}</span>
          <span className="truncate text-xs font-semibold text-neutral-700">{title || "Untitled"}</span>
        </button>
        <span className="flex flex-none gap-1">
          <button onClick={() => onMove(-1)} title="Move up" className="rounded border border-neutral-200 bg-white px-1.5 py-0.5 text-[11px]">↑</button>
          <button onClick={() => onMove(1)} title="Move down" className="rounded border border-neutral-200 bg-white px-1.5 py-0.5 text-[11px]">↓</button>
          <button onClick={onDelete} title="Delete" className="rounded border border-neutral-200 bg-white px-1.5 py-0.5 text-[11px] text-red-600">✕</button>
        </span>
      </div>
      {open && <div className="space-y-2.5 border-t border-neutral-200/70 bg-white p-2.5">{children}</div>}
    </div>
  );
}

export { summaryOf };
