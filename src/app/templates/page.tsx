"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Navbar, Footer } from "@/components/layout/chrome";
import { LiveCard } from "@/components/templates/LiveCard";
import { TEMPLATES } from "@/lib/templates";

export default function TemplatesPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [tier, setTier] = useState("All");

  const cats = useMemo(() => ["All", ...Array.from(new Set(TEMPLATES.map((t) => t.category)))], []);
  const counts = useMemo(() => {
    const m: Record<string, number> = { All: TEMPLATES.length };
    for (const t of TEMPLATES) m[t.category] = (m[t.category] ?? 0) + 1;
    return m;
  }, []);
  const list = TEMPLATES.filter((t) => {
    if (cat !== "All" && t.category !== cat) return false;
    if (tier !== "All" && t.tier !== tier.toLowerCase()) return false;
    if (q && !`${t.name} ${t.description} ${t.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-10">
        {/* Sidebar — browse like a library */}
        <aside className="hidden w-60 shrink-0 md:block">
          <div className="sticky top-24 space-y-6">
            <div>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search sites…"
                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
              />
            </div>
            <nav>
              <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-widest text-neutral-400">Kind</p>
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm ${cat === c ? "bg-neutral-900 font-medium text-white" : "text-neutral-600 hover:bg-neutral-100"}`}
                >
                  {c}
                  <span className={`font-mono text-[11px] ${cat === c ? "opacity-70" : "text-neutral-400"}`}>{counts[c] ?? 0}</span>
                </button>
              ))}
            </nav>
            <div>
              <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-widest text-neutral-400">Plan</p>
              {(["All", "Free", "Premium"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setTier(p)}
                  className={`flex w-full rounded-lg px-3 py-2 text-left text-sm ${tier === p ? "bg-neutral-900 font-medium text-white" : "text-neutral-600 hover:bg-neutral-100"}`}
                >
                  {p === "All" ? "All plans" : p}
                </button>
              ))}
            </div>
            <p className="px-1 text-xs leading-relaxed text-neutral-400">
              Every template is a complete site with its own components and copy — not a recolor.
            </p>
          </div>
        </aside>

        {/* Grid of live sites */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Whole sites, ready to steal</h1>
              <p className="mt-1 text-sm text-neutral-600">Live renders below — what you see is the actual template.</p>
            </div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search sites…"
              className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none sm:max-w-xs md:hidden"
            />
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 md:hidden">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`shrink-0 rounded-full border px-3 py-1.5 text-[13px] ${cat === c ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 bg-white"}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {list.map((t) => (
              <div key={t.id} className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:border-neutral-400 hover:shadow-md">
                <Link href={`/templates/${t.id}`} className="relative block">
                  <div className="aspect-[16/10]">
                    <LiveCard templateId={t.id} />
                  </div>
                  <span className="absolute inset-0" aria-hidden />
                </Link>
                <div className="border-t border-neutral-100 p-5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{t.name}</h3>
                    {t.tier === "premium" && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-800">Premium</span>}
                    <span className="ml-auto rounded-full border border-neutral-200 px-2 py-0.5 text-[11px] text-neutral-600">{t.category}</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-neutral-600">{t.description}</p>
                  <p className="mt-1.5 font-mono text-[11px] text-neutral-400">{t.sections.length} sections · {t.style} · {t.mode}</p>
                  <div className="mt-4 flex gap-2">
                    <Link href={`/templates/${t.id}`} className="flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-center text-sm font-medium hover:border-neutral-400">Open full preview</Link>
                    <Link href={`/new?template=${t.id}`} className="flex-1 rounded-lg bg-neutral-900 px-3 py-2 text-center text-sm font-medium text-white hover:bg-neutral-700">Use Template</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {list.length === 0 && <p className="mt-10 text-center text-sm text-neutral-500">No sites match your search.</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
}
