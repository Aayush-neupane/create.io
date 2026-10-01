"use client";

import { useState } from "react";

export function TextField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-neutral-600">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-lg border border-neutral-200 px-2.5 py-1.5 text-[13px] focus:border-neutral-900 focus:outline-none" />
    </label>
  );
}

export function AreaField({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-neutral-600">{label}</span>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className="w-full rounded-lg border border-neutral-200 px-2.5 py-1.5 text-[13px] focus:border-neutral-900 focus:outline-none" />
    </label>
  );
}

export function ImageField({ label, value, onChange, demo }: { label: string; value: string; onChange: (v: string) => void; demo?: boolean }) {
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
      <span className="mb-1 block text-xs font-medium text-neutral-600">{label}</span>
      {value ? (
        <div className="overflow-hidden rounded-lg border border-neutral-200">
          <img src={value} alt="" className="aspect-video w-full object-cover" />
          <div className="flex gap-1 bg-white p-1.5">
            <label className="flex-1 cursor-pointer rounded-md bg-neutral-100 px-2 py-1 text-center text-xs font-medium">{busy ? "…" : "Replace"}<input type="file" accept="image/*" className="hidden" onChange={pick} /></label>
            <button onClick={() => onChange("")} className="flex-1 rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-red-700">Remove</button>
          </div>
        </div>
      ) : (
        <label className="block cursor-pointer rounded-lg border border-dashed border-neutral-300 bg-white px-3 py-4 text-center text-xs text-neutral-500 hover:border-neutral-500">
          {busy ? "Uploading…" : "Click to upload image"}
          <input type="file" accept="image/*" className="hidden" onChange={pick} />
        </label>
      )}
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="…or paste image URL" className="mt-1.5 w-full rounded-lg border border-neutral-200 px-2.5 py-1.5 text-xs text-neutral-500 focus:outline-none" />
      {err && <p className="mt-1 text-xs text-red-600">{err}</p>}
    </div>
  );
}

export function ListShell({ title, onAdd, addLabel, children }: { title: string; onAdd: () => void; addLabel: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white">
      <div className="flex items-center justify-between border-b border-neutral-100 px-3 py-2">
        <span className="text-xs font-semibold">{title}</span>
        <button onClick={onAdd} className="rounded-md bg-neutral-900 px-2 py-1 text-[11px] font-medium text-white">+ {addLabel}</button>
      </div>
      <div className="space-y-2 p-2.5">{children}</div>
    </div>
  );
}

export function ItemCard({ index, onDelete, onMove, children }: { index: number; onDelete: () => void; onMove: (dir: -1 | 1) => void; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-neutral-50/50 p-2.5">
      <div className="mb-2 flex items-center gap-1">
        <span className="text-[11px] font-semibold text-neutral-500">#{index + 1}</span>
        <span className="ml-auto flex gap-1">
          <button onClick={() => onMove(-1)} className="rounded border border-neutral-200 bg-white px-1.5 py-0.5 text-[11px]">↑</button>
          <button onClick={() => onMove(1)} className="rounded border border-neutral-200 bg-white px-1.5 py-0.5 text-[11px]">↓</button>
          <button onClick={onDelete} className="rounded border border-neutral-200 bg-white px-1.5 py-0.5 text-[11px] text-red-600">✕</button>
        </span>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
