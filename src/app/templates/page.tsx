"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SiteNavbar, Footer } from "@/components/layout/chrome";
import { LiveCard } from "@/components/templates/LiveCard";
import { TEMPLATES } from "@/lib/templates";

/** Sidebar dot per category — borrows each kind's own template color. */
const KIND_DOTS: Record<string, string> = {
  Portfolio: "#111111",
  Photography: "#78716c",
  Business: "#2563eb",
  Restaurant: "#ea580c",
  Agency: "#7c3aed",
  SaaS: "#10b981",
  Freelancer: "#c2410c",
  Event: "#d4a017",
  Wedding: "#e11d48",
  Fitness: "#e4572e",
  "Café": "#c2703d",
  "Real Estate": "#b98a2f",
  Automotive: "#e0a32e",
};

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
    <div className="marketing-theme min-h-screen bg-background text-foreground">
      <SiteNavbar />
      <div className="border-b border-border bg-[#e8dfcf]">
        <div className="mx-auto max-w-shell px-6 pb-8 pt-10 sm:px-10 lg:px-16 xl:px-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Library · {list.length === 1 ? "1 site" : `${list.length} sites`}
          </p>
          <h1 className="mt-4 max-w-[14ch] font-serif text-[clamp(2.6rem,4.5vw,4rem)] font-normal leading-[0.95]">
            Pick a finished site
          </h1>
          <p className="mt-2.5 max-w-[520px] text-[15px] text-muted">
            Live renders — what you see is the actual template, components and copy included.
          </p>
          <div className="mt-5 flex h-[46px] max-w-md items-center gap-2.5 rounded-full border border-border bg-surface px-3.5 transition-colors focus-within:border-primary md:hidden">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search sites…" aria-label="Search templates" className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted/70" />
            {q && (
              <button onClick={() => setQ("")} aria-label="Clear search" className="grid h-6 w-6 flex-none place-items-center rounded-full text-sm text-muted transition-colors hover:bg-foreground/10">
                ✕
              </button>
            )}
          </div>
          <div className="no-bar snap-row mt-4 flex gap-2 overflow-x-auto pb-1 md:hidden">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`flex-none rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${cat === c ? "border-foreground bg-foreground text-background" : "border-border bg-surface"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-shell gap-11 px-6 py-8 sm:px-10 lg:px-16 xl:px-20">
        {/* Sidebar */}
        <aside className="hidden w-[236px] shrink-0 md:block">
          <div className="sticky grid gap-2 overflow-auto" style={{ top: 88, maxHeight: "calc(100vh - 112px)", paddingBottom: 20 }}>
            <div className="mb-2 flex h-[46px] items-center gap-2.5 rounded-full border border-border bg-surface px-3.5 text-muted transition-colors focus-within:border-primary">
              <span aria-hidden>⌕</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search sites…"
                aria-label="Search templates"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted/70"
              />
              {q && (
                <button onClick={() => setQ("")} aria-label="Clear search" className="grid h-6 w-6 flex-none place-items-center rounded-full text-sm transition-colors hover:bg-foreground/10">
                  ✕
                </button>
              )}
            </div>
            <h4 className="mb-1 ml-2.5 mt-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Kind</h4>
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                aria-current={cat === c ? "page" : undefined}
                className={`flex items-center gap-2.5 rounded-full px-2.5 py-2 text-left text-sm transition-colors ${cat === c ? "bg-foreground font-semibold text-background" : "text-muted hover:bg-foreground/5"}`}
              >
                {c === "All" ? (
                  <i className="h-2 w-2 rounded-full bg-muted" />
                ) : (
                  <i className="h-2 w-2 rounded-full" style={{ background: KIND_DOTS[c] ?? "var(--kit-primary)" }} />
                )}
                {c}
                <span className="ml-auto font-mono text-xs opacity-70">{counts[c] ?? 0}</span>
              </button>
            ))}
            <h4 className="mb-1 ml-2.5 mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Plan</h4>
            {(["All", "Free", "Premium"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setTier(p)}
                className={`rounded-full px-2.5 py-2 text-left text-sm transition-colors ${tier === p ? "bg-foreground font-semibold text-background" : "text-muted hover:bg-foreground/5"}`}
              >
                {p === "All" ? "All plans" : p}
              </button>
            ))}
            <p className="px-2.5 pt-3 text-xs leading-relaxed text-muted">
              Whole sites with their own components and copy — never a recolor.
            </p>
          </div>
        </aside>

        {/* Grid */}
        <div className="min-w-0 flex-1">
          <p aria-live="polite" className="mb-4 hidden font-mono text-xs text-muted md:block">
            {list.length === 1 ? "1 site" : `${list.length} sites`}{q && <> for “{q}”</>}
          </p>
          <div className="grid gap-[18px] sm:grid-cols-2">
            {list.map((t) => (
              <article key={t.id} className="kit-card group flex min-w-0 flex-col overflow-hidden border border-border bg-surface">
                <div className="relative aspect-[16/10] overflow-hidden border-b border-border/40">
                  <LiveCard templateId={t.id} />
                  <Link href={`/templates/${t.id}`} aria-label={`Open ${t.name}`} className="absolute inset-0" />
                  <span className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <span className="rounded-full bg-foreground/95 px-4 py-1.5 text-[13px] font-semibold text-background shadow-lg">Open full preview →</span>
                  </span>
                </div>
                <div className="flex items-center gap-3 px-[18px] py-[13px]">
                  <div className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="block truncate font-serif text-lg tracking-[-0.02em]">{t.name}</span>
                      {t.tier === "premium" && (
                        <span className="flex-none rounded-full border border-primary/50 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-primary-strong">Pro</span>
                      )}
                    </span>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-muted">{t.category} · {t.sections.length} sections</span>
                  </div>
                  <span className="flex flex-none gap-1" aria-hidden>
                    {[t.theme.primary, t.theme.accent, t.theme.surface].map((c, i) => (
                      <i key={i} className="h-4 w-4 rounded-full border border-border/40" style={{ background: c }} />
                    ))}
                  </span>
                </div>
                <div className="flex gap-2 border-t border-border/40 px-[14px] py-3">
                  <Link href={`/templates/${t.id}`} className="flex-1 rounded-full border border-border px-3 py-2 text-center text-[13px] font-medium transition-colors hover:bg-foreground hover:text-background">
                    Open full preview
                  </Link>
                  <Link href={`/new?template=${t.id}`} className="inline-flex flex-1 items-center justify-center rounded-full bg-foreground px-3 py-2 text-center text-[13px] font-medium text-background transition-colors hover:bg-primary" style={{ height: 37 }}>
                    Use template
                  </Link>
                </div>
              </article>
            ))}
          </div>
          {list.length === 0 && (
            <div className="kit-panel grid justify-items-center gap-2.5 px-5 py-[90px] text-center" style={{ borderStyle: "dashed" }}>
              <strong className="font-serif text-2xl">Nothing struck</strong>
              <p className="text-sm text-muted">Try a different search or kind.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
