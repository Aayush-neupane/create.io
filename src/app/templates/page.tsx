"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Navbar, Footer } from "@/components/layout/chrome";
import { TemplateThumb } from "@/components/templates/Thumb";
import { TEMPLATES } from "@/lib/templates";

export default function TemplatesPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [tier, setTier] = useState("All");

  const cats = useMemo(() => ["All", ...Array.from(new Set(TEMPLATES.map((t) => t.category)))], []);
  const list = TEMPLATES.filter((t) => {
    if (cat !== "All" && t.category !== cat) return false;
    if (tier !== "All" && t.tier !== tier.toLowerCase()) return false;
    if (q && !`${t.name} ${t.description} ${t.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Templates</h1>
      <p className="mt-1 text-sm text-neutral-600">Professionally designed starting points. Preview the real template, then make it yours.</p>

      <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search templates…"
          className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none md:max-w-sm"
        />
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-3 py-1.5 text-[13px] ${cat === c ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 bg-white text-neutral-700"}`}>
              {c}
            </button>
          ))}
        </div>
        <select value={tier} onChange={(e) => setTier(e.target.value)} className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm md:ml-auto">
          <option>All</option>
          <option>Free</option>
          <option>Premium</option>
        </select>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((t) => (
          <div key={t.id} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            <Link href={`/templates/${t.id}`}>
              <div className="aspect-[16/10] p-6 transition hover:opacity-95" style={{ background: t.thumbnailGradient }}>
                <TemplateThumb t={t} />
              </div>
            </Link>
            <div className="p-5">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{t.name}</h3>
                {t.tier === "premium" && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-800">Premium</span>}
              </div>
              <p className="mt-0.5 text-xs text-neutral-500">{t.category} · {t.style} · {t.mode}</p>
              <p className="mt-2 line-clamp-2 text-sm text-neutral-600">{t.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">{t.tags.slice(0, 3).map((tag) => <span key={tag} className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-600">{tag}</span>)}</div>
              <div className="mt-4 flex gap-2">
                <Link href={`/templates/${t.id}`} className="flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-center text-sm font-medium hover:border-neutral-400">Preview</Link>
                <Link href={`/new?template=${t.id}`} className="flex-1 rounded-lg bg-neutral-900 px-3 py-2 text-center text-sm font-medium text-white hover:bg-neutral-700">Use Template</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {list.length === 0 && <p className="mt-10 text-center text-sm text-neutral-500">No templates match your search.</p>}
      </div>
      <div className="mt-10"><Footer /></div>
    </div>
  );
}
