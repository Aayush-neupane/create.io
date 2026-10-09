"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SiteNavbar, Footer } from "@/components/layout/chrome";
import { HeroCrop } from "@/components/templates/HeroCrop";
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
    <div className="min-h-screen" style={{ background: "var(--paper)" }}>
      <SiteNavbar />

      {/* Header */}
      <div style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-12 md:pt-16">
          <p className="eyebrow" style={{ color: "var(--accent)" }}>
            <span className="mono-meta">Library</span>
            {list.length === 1 ? "1 site" : `${list.length} sites`}
          </p>
          <h1 className="display display-upper mt-4 max-w-[16ch]" style={{ fontSize: "clamp(40px,6vw,76px)", color: "var(--paper)" }}>
            Pick a finished site.
          </h1>
          <p className="mt-4 max-w-xl leading-relaxed" style={{ color: "var(--cream-dim)" }}>
            Live renders — what you see is the actual template, sections and copy included.
          </p>
          <div className="mt-7 flex h-[52px] max-w-md items-center gap-3 px-5" style={{ background: "rgba(244,239,228,.08)", border: "1px solid rgba(244,239,228,.2)" }}>
            <span aria-hidden className="font-mono text-xs" style={{ color: "var(--accent)" }}>⌕</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="SEARCH SITES…" aria-label="Search templates" className="w-full bg-transparent font-mono text-xs uppercase outline-none placeholder:text-[#8d8471]" style={{ letterSpacing: "0.12em", color: "var(--paper)" }} />
            {q && (
              <button onClick={() => setQ("")} aria-label="Clear search" className="font-mono text-sm" style={{ color: "var(--cream-dim)" }}>✕</button>
            )}
          </div>
          <div className="no-bar snap-row mt-5 flex gap-2 overflow-x-auto pb-1 md:hidden">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className="flex-none px-4 py-2 font-mono text-[11px] font-bold uppercase"
                style={cat === c ? { background: "var(--accent)", color: "var(--ink)" } : { border: "1px solid rgba(244,239,228,.25)", color: "var(--cream-dim)", letterSpacing: "0.1em" }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl gap-8 px-6 py-10">
        {/* Sidebar */}
        <aside className="hidden w-[220px] shrink-0 md:block">
          <div className="sticky grid gap-1 overflow-auto" style={{ top: 96, maxHeight: "calc(100vh - 120px)" }}>
            <h4 className="mono-meta mb-2 font-mono text-[10px] font-bold uppercase" style={{ letterSpacing: "0.2em", color: "var(--ink-3)" }}>Kind</h4>
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                aria-current={cat === c ? "page" : undefined}
                className="flex items-center gap-2.5 px-3 py-2.5 text-left text-sm transition-colors"
                style={cat === c ? { background: "var(--ink)", color: "var(--paper)", fontWeight: 700 } : { color: "var(--ink-2)" }}
              >
                <span className="font-mono text-[10px] font-bold" style={{ color: cat === c ? "var(--accent)" : "var(--ink-3)" }}>
                  {String(counts[c] ?? 0).padStart(2, "0")}
                </span>
                {c}
              </button>
            ))}
            <h4 className="mono-meta mb-2 mt-5 font-mono text-[10px] font-bold uppercase" style={{ letterSpacing: "0.2em", color: "var(--ink-3)" }}>Plan</h4>
            {(["All", "Free", "Premium"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setTier(p)}
                className="px-3 py-2.5 text-left text-sm transition-colors"
                style={tier === p ? { background: "var(--ink)", color: "var(--paper)", fontWeight: 700 } : { color: "var(--ink-2)" }}
              >
                {p === "All" ? "All plans" : p}
              </button>
            ))}
            <p className="px-3 pt-5 font-mono text-[10px] font-bold uppercase leading-relaxed" style={{ letterSpacing: "0.16em", color: "var(--ink-3)" }}>
              Whole sites —<br />never a recolor
            </p>
          </div>
        </aside>

        {/* Grid */}
        <div className="min-w-0 flex-1">
          <p aria-live="polite" className="mono-meta mb-5 hidden font-mono text-[10px] font-bold uppercase md:block" style={{ letterSpacing: "0.18em", color: "var(--ink-3)" }}>
            Showing {list.length === 1 ? "1 site" : `${list.length} sites`}{q && <> for “{q}”</>}
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            {list.map((t, i) => (
              <article key={t.id} className="card card-hover group flex min-w-0 flex-col overflow-hidden">
                <div className="relative h-52 overflow-hidden" style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-2)" }}>
                  <HeroCrop templateId={t.id} />
                  <Link href={`/templates/${t.id}`} aria-label={`Open ${t.name}`} className="absolute inset-0" />
                  <span className="mono-meta absolute left-3 top-3 px-2.5 py-1 font-mono text-[9px] font-bold uppercase" style={{ letterSpacing: "0.12em", background: "rgba(23,19,16,.85)", color: "var(--paper)" }}>
                    {String(i + 1).padStart(2, "0")} · {t.category}
                  </span>
                  {t.tier === "premium" && (
                    <span className="mono-meta absolute right-3 top-3 px-2.5 py-1 font-mono text-[9px] font-bold uppercase" style={{ letterSpacing: "0.12em", background: "var(--accent)", color: "var(--ink)" }}>Pro</span>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="display display-upper text-[22px]">{t.name}</h3>
                  <p className="line-clamp-2 text-sm leading-relaxed" style={{ color: "var(--ink-2)" }}>{t.description}</p>
                  <p className="mono-meta font-mono text-[10px] font-bold uppercase" style={{ letterSpacing: "0.14em", color: "var(--ink-3)" }}>{t.sections.length} sections</p>
                  <div className="mt-auto flex gap-2.5 pt-3">
                    <Link href={`/templates/${t.id}`} className="btn-ghost flex-1 !h-11" style={{ fontSize: 12 }}>
                      Preview
                    </Link>
                    <Link href={`/new?template=${t.id}`} className="btn-primary flex-1 !h-11" style={{ fontSize: 12 }}>
                      Use →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {list.length === 0 && (
            <div className="card grid justify-items-center gap-2 px-5 py-20 text-center" style={{ borderStyle: "dashed" }}>
              <strong className="display display-upper text-3xl">No matches.</strong>
              <p className="text-sm" style={{ color: "var(--ink-2)" }}>Try a different search or kind.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
