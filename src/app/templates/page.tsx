"use client";

import { useMemo, useState } from "react";
import { SiteNavbar, Footer } from "@/components/layout/chrome";
import { TemplateRow } from "@/components/templates/TemplateRow";
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
  const list = TEMPLATES.filter((t) => {
    if (cat !== "All" && t.category !== cat) return false;
    if (tier !== "All" && t.tier !== tier.toLowerCase()) return false;
    if (q && !`${t.name} ${t.description} ${t.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="marketing-theme min-h-screen bg-background text-foreground">
      <SiteNavbar />

      {/* Editorial header */}
      <div className="border-b border-border">
        <div className="mx-auto grid max-w-shell lg:grid-cols-[0.62fr_1.38fr]">
          <div className="px-6 py-10 sm:px-10 lg:border-r lg:border-border lg:px-16 lg:py-16 xl:px-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Library index</p>
            <p className="mt-6 font-serif text-6xl tabular-nums leading-none">{String(list.length).padStart(2, "0")}</p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              {list.length === 1 ? "site" : "sites"} on the shelf
            </p>
          </div>
          <div className="px-6 py-10 sm:px-10 lg:px-16 lg:py-16 xl:px-20">
            <h1 className="max-w-[14ch] font-serif text-[clamp(2.6rem,5vw,4.5rem)] font-normal leading-[0.95]">
              Every site, finished.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#5e5952]">
              Readable crops of real sites — what you see is the actual template,
              components and copy included. Filter the shelf, open any site, make it yours.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky shelf bar: search + kinds + plan */}
      <div className="sticky top-20 z-30 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-shell flex-wrap items-center gap-3 px-6 py-3 sm:px-10 lg:px-16 xl:px-20">
          <div className="flex h-11 w-full max-w-xs items-center gap-2.5 rounded-full border border-border bg-surface px-4 transition-colors focus-within:border-primary">
            <span aria-hidden className="text-muted">⌕</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search sites…"
              aria-label="Search templates"
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted/70"
            />
            {q && (
              <button onClick={() => setQ("")} aria-label="Clear search" className="grid h-6 w-6 flex-none place-items-center rounded-full text-sm text-muted transition-colors hover:bg-foreground/10">
                ✕
              </button>
            )}
          </div>
          <div className="no-bar snap-row flex flex-1 items-center gap-2 overflow-x-auto py-1">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                aria-pressed={cat === c}
                className={`flex flex-none items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${
                  cat === c ? "border-foreground bg-foreground text-background" : "border-border bg-surface"
                }`}
              >
                {c !== "All" ? (
                  <i className="h-2 w-2 rounded-full" style={{ background: KIND_DOTS[c] ?? "var(--kit-primary)" }} />
                ) : null}
                {c}
              </button>
            ))}
          </div>
          <div className="flex flex-none items-center gap-1 rounded-full border border-border p-1" role="group" aria-label="Filter by plan">
            {(["All", "Free", "Premium"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setTier(p)}
                aria-pressed={tier === p}
                className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors ${
                  tier === p ? "bg-foreground text-background" : "text-muted hover:bg-foreground/5"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* The shelf: full-bleed rows */}
      <div className="mx-auto max-w-shell">
        <p aria-live="polite" className="px-6 pt-8 font-mono text-xs text-muted sm:px-10 lg:px-16 xl:px-20">
          {list.length === 1 ? "1 site" : `${list.length} sites`}{q && <> for “{q}”</>}
        </p>
        {list.length > 0 ? (
          <div className="mt-6 border-b border-border">
            {list.map((t, i) => (
              <TemplateRow key={t.id} t={t} n={String(i + 1).padStart(2, "0")} flip={i % 2 === 1} />
            ))}
          </div>
        ) : (
          <div className="px-6 pb-20 sm:px-10 lg:px-16 xl:px-20">
            <div className="kit-panel grid justify-items-center gap-2.5 px-5 py-[90px] text-center" style={{ borderStyle: "dashed" }}>
              <strong className="font-serif text-3xl">Nothing struck</strong>
              <p className="text-sm text-muted">Try a different search or kind.</p>
              <button
                onClick={() => { setQ(""); setCat("All"); setTier("All"); }}
                className="mt-2 inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-medium transition hover:bg-foreground hover:text-background"
              >
                Clear the shelf filters
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
