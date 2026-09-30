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
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto flex max-w-7xl gap-11 px-6" style={{ paddingTop: 36 }}>
        {/* Sidebar */}
        <aside className="hidden w-[236px] shrink-0 md:block">
          <div className="sticky grid gap-2 overflow-auto" style={{ top: 88, maxHeight: "calc(100vh - 112px)", paddingBottom: 20 }}>
            <div className="mb-2 flex h-[46px] items-center gap-2.5 rounded-[13px] border px-3.5" style={{ borderColor: "var(--line-2)", background: "var(--surface)", color: "var(--ink-3)" }}>
              <span aria-hidden>⌕</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search sites…"
                className="w-full bg-transparent text-sm outline-none"
                style={{ color: "var(--ink)" }}
              />
            </div>
            <h4 className="mono-meta mb-1 ml-2.5 mt-2 text-[11px] font-semibold uppercase" style={{ letterSpacing: "0.14em", color: "var(--ink-3)" }}>Kind</h4>
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                aria-current={cat === c ? "page" : undefined}
                className="flex items-center gap-2.5 rounded-[10px] px-2.5 py-2 text-left text-sm transition-colors"
                style={cat === c ? { background: "var(--accent-soft)", color: "var(--accent-text)", fontWeight: 600 } : { color: "var(--ink-2)" }}
              >
                {c}
                <span className="mono-meta ml-auto text-xs" style={{ color: cat === c ? "inherit" : "var(--ink-3)" }}>{counts[c] ?? 0}</span>
              </button>
            ))}
            <h4 className="mono-meta mb-1 ml-2.5 mt-4 text-[11px] font-semibold uppercase" style={{ letterSpacing: "0.14em", color: "var(--ink-3)" }}>Plan</h4>
            {(["All", "Free", "Premium"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setTier(p)}
                className="rounded-[10px] px-2.5 py-2 text-left text-sm transition-colors"
                style={tier === p ? { background: "var(--accent-soft)", color: "var(--accent-text)", fontWeight: 600 } : { color: "var(--ink-2)" }}
              >
                {p === "All" ? "All plans" : p}
              </button>
            ))}
            <p className="px-2.5 pt-3 text-xs leading-relaxed" style={{ color: "var(--ink-3)" }}>
              Whole sites with their own components and copy — never a recolor.
            </p>
          </div>
        </aside>

        {/* Grid */}
        <div className="min-w-0 flex-1">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
            <div>
              <h1 className="font-semibold" style={{ fontSize: "clamp(32px, 4.2vw, 46px)", lineHeight: 1.04 }}>
                Pick a <span className="serif-accent">finished</span> site
              </h1>
              <p className="mt-2.5 max-w-[520px] text-[15px]" style={{ color: "var(--ink-2)" }}>
                Live renders — what you see is the actual template, components and copy included.
              </p>
            </div>
            <div className="flex h-[46px] items-center gap-2.5 rounded-[13px] border px-3.5 md:hidden" style={{ borderColor: "var(--line-2)", background: "var(--surface)" }}>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search sites…" className="w-full bg-transparent text-sm outline-none" />
            </div>
          </div>
          <div className="mb-5 flex gap-2 overflow-x-auto pb-1 md:hidden">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className="flex-none rounded-full border px-3.5 py-1.5 text-[13px]"
                style={cat === c ? { background: "var(--ink)", color: "#fff", borderColor: "var(--ink)" } : { borderColor: "var(--line-2)", background: "var(--surface)" }}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid gap-[18px] sm:grid-cols-2">
            {list.map((t) => (
              <article key={t.id} className="card group flex min-w-0 flex-col overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden" style={{ borderBottom: "1px solid var(--line)" }}>
                  <LiveCard templateId={t.id} />
                  <Link href={`/templates/${t.id}`} aria-label={`Open ${t.name}`} className="absolute inset-0" />
                </div>
                <div className="flex items-center gap-3 px-[18px] py-[13px]">
                  <div className="min-w-0">
                    <span className="block truncate text-[14.5px] font-semibold" style={{ letterSpacing: "-0.015em" }}>{t.name}</span>
                    <span className="mono-meta text-[10.5px] uppercase" style={{ letterSpacing: "0.08em", color: "var(--ink-3)" }}>{t.category} · {t.sections.length} sections</span>
                  </div>
                </div>
                <div className="flex gap-2 border-t px-[14px] py-3" style={{ borderColor: "var(--line)" }}>
                  <Link href={`/templates/${t.id}`} className="flex-1 rounded-[9px] border px-3 py-2 text-center text-[13px] font-medium transition-colors" style={{ borderColor: "var(--line-2)" }}>
                    Open full preview
                  </Link>
                  <Link href={`/new?template=${t.id}`} className="btn-primary flex-1" style={{ height: 37, fontSize: 13 }}>
                    Use template
                  </Link>
                </div>
              </article>
            ))}
          </div>
          {list.length === 0 && (
            <div className="grid justify-items-center gap-2.5 rounded-[20px] border border-dashed px-5 py-[90px] text-center" style={{ borderColor: "var(--line-2)", color: "var(--ink-2)" }}>
              <strong className="text-[17px]" style={{ color: "var(--ink)" }}>Nothing struck</strong>
              <p className="text-sm">Try a different search or kind.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
