"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

function Meta({ t }: { t: (typeof TEMPLATES)[number] }) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted">
      {[`${t.category}`, `${t.sections.length} sections`, t.tier === "premium" ? "Premium" : "Free"].map((tag) => (
        <li key={tag} className="flex items-center gap-2">
          <span className="h-1 w-1 shrink-0 rounded-full bg-primary" />
          {tag}
        </li>
      ))}
    </ul>
  );
}

function Ctas({ id }: { id: string }) {
  return (
    <p className="flex flex-wrap items-center gap-3">
      <Link
        href={`/templates/${id}`}
        className="inline-flex h-11 items-center rounded-full border border-border px-5 text-[13px] font-medium transition hover:bg-foreground hover:text-background"
      >
        Open full preview
      </Link>
      <Link
        href={`/new?template=${id}`}
        className="group inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-[13px] font-medium text-background transition hover:bg-primary"
      >
        Use template
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </p>
  );
}

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
  const [lead, ...rest] = list;

  return (
    <div className="marketing-theme min-h-screen bg-background text-foreground">
      <SiteNavbar />

      {/* Editorial header */}
      <div className="border-b border-border">
        <div className="mx-auto grid max-w-shell lg:grid-cols-[0.62fr_1.38fr]">
          <div className="px-6 py-10 sm:px-10 lg:border-r lg:border-border lg:px-16 lg:py-16 xl:px-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Library index</p>
            <p className="mt-6 font-serif text-5xl tabular-nums">{String(list.length).padStart(2, "0")}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              {list.length === 1 ? "site" : "sites"} on the shelf
            </p>
          </div>
          <div className="px-6 py-10 sm:px-10 lg:px-16 lg:py-16 xl:px-20">
            <h1 className="max-w-[14ch] font-serif text-[clamp(2.6rem,5vw,4.5rem)] font-normal leading-[0.95]">
              Every site, finished.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#5e5952]">
              Live renders — what you see is the actual template, components and
              copy included. Filter the index, open any site, make it yours.
            </p>
            <div className="mt-6 flex h-[52px] max-w-md items-center gap-2.5 rounded-full border border-border bg-surface px-5 transition-colors focus-within:border-primary md:hidden">
              <span aria-hidden className="text-muted">⌕</span>
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
      </div>

      <div className="mx-auto flex max-w-shell gap-0 px-0 sm:px-10 md:gap-10 lg:px-16 xl:px-20">
        {/* Index panel */}
        <aside className="hidden w-[248px] shrink-0 md:block">
          <div className="sticky overflow-auto border border-border bg-surface" style={{ top: 104, maxHeight: "calc(100vh - 128px)", marginTop: 32, marginBottom: 32 }}>
            <p className="border-b border-border px-4 py-3 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
              Browse the shelf
            </p>
            <div className="border-b border-border p-3">
              <div className="flex h-[46px] items-center gap-2.5 rounded-full border border-border bg-background px-3.5 text-muted transition-colors focus-within:border-primary">
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
            </div>
            <p className="px-4 pb-1 pt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">Kind</p>
            <nav aria-label="Filter by kind" className="px-2 pb-2">
              {cats.map((c, i) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  aria-current={cat === c ? "page" : undefined}
                  className={`flex w-full items-center gap-2.5 rounded-full px-2.5 py-2 text-left text-sm transition-colors ${cat === c ? "bg-foreground font-semibold text-background" : "text-muted hover:bg-foreground/5"}`}
                >
                  <span className="font-mono text-[8px] opacity-60">{String(i).padStart(2, "0")}</span>
                  {c === "All" ? (
                    <i className="h-2 w-2 rounded-full bg-muted" />
                  ) : (
                    <i className="h-2 w-2 rounded-full" style={{ background: KIND_DOTS[c] ?? "var(--kit-primary)" }} />
                  )}
                  {c}
                  <span className="ml-auto font-mono text-xs opacity-70">{counts[c] ?? 0}</span>
                </button>
              ))}
            </nav>
            <p className="border-t border-border px-4 pb-1 pt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">Plan</p>
            <div className="px-2 pb-3">
              {(["All", "Free", "Premium"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setTier(p)}
                  className={`block w-full rounded-full px-2.5 py-2 text-left text-sm transition-colors ${tier === p ? "bg-foreground font-semibold text-background" : "text-muted hover:bg-foreground/5"}`}
                >
                  {p === "All" ? "All plans" : p}
                </button>
              ))}
            </div>
            <p className="border-t border-border px-4 py-3 text-xs leading-relaxed text-muted">
              Whole sites with their own components and copy — never a recolor.
            </p>
          </div>
        </aside>

        {/* Divided shelf */}
        <div className="min-w-0 flex-1 py-8 md:py-0">
          <p aria-live="polite" className="hidden px-6 font-mono text-xs text-muted md:block md:px-0 md:pt-8">
            {list.length === 1 ? "1 site" : `${list.length} sites`}{q && <> for “{q}”</>}
          </p>

          {lead ? (
            <article className="kit-card group relative mt-4 overflow-hidden border border-border bg-surface transition-colors duration-500 hover:bg-[#ebe4d4] md:mt-8">
              <span className="kit-accent absolute left-0 top-0 z-10 h-1 bg-primary" aria-hidden="true" />
              <div className="grid sm:grid-cols-2">
                <div className="relative aspect-[16/10] overflow-hidden border-b border-border/40 sm:border-b-0 sm:border-r">
                  <LiveCard templateId={lead.id} />
                  <Link href={`/templates/${lead.id}`} aria-label={`Open ${lead.name}`} className="absolute inset-0" />
                </div>
                <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
                  <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.16em] text-muted">
                    <span>01</span>
                    <span>{lead.category}</span>
                  </div>
                  <h2 className="font-serif text-3xl leading-[1.05] tracking-[-0.035em] sm:text-4xl">{lead.name}</h2>
                  <p className="max-w-md text-sm leading-7 text-[#5e5952]">{lead.description}</p>
                  <Meta t={lead} />
                  <Ctas id={lead.id} />
                </div>
              </div>
            </article>
          ) : null}

          {rest.length > 0 ? (
            <div className="mt-5 border-t border-border">
              <div className="grid sm:grid-cols-2">
                {rest.map((t, i) => (
                  <article
                    key={t.id}
                    className="kit-card group relative flex min-w-0 flex-col border-b border-border p-6 transition-colors duration-500 hover:bg-[#ebe4d4] sm:odd:border-r sm:p-8"
                  >
                    <span className="kit-accent absolute left-0 top-0 h-1 bg-primary" aria-hidden="true" />
                    <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.16em] text-muted">
                      <span>{String(i + 2).padStart(2, "0")}</span>
                      <span>{t.category}</span>
                    </div>
                    <h3 className="mt-6 font-serif text-3xl leading-[1.05] tracking-[-0.035em]">{t.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#5e5952]">{t.description}</p>
                    <div className="relative mt-6 aspect-[16/10] overflow-hidden border-y border-border/40">
                      <LiveCard templateId={t.id} />
                      <Link href={`/templates/${t.id}`} aria-label={`Open ${t.name}`} className="absolute inset-0" />
                      <span className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                        <span className="rounded-full bg-foreground/95 px-4 py-1.5 text-[13px] font-semibold text-background shadow-lg">
                          Open live preview →
                        </span>
                      </span>
                    </div>
                    <div className="mt-6 border-t border-border/25 pt-5">
                      <Meta t={t} />
                    </div>
                    <div className="mt-5">
                      <Ctas id={t.id} />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          {list.length === 0 && (
            <div className="kit-panel mt-4 grid justify-items-center gap-2.5 px-5 py-[90px] text-center md:mt-8" style={{ borderStyle: "dashed" }}>
              <strong className="font-serif text-2xl">Nothing struck</strong>
              <p className="text-sm text-muted">Try a different search or kind.</p>
            </div>
          )}
          <div className="h-10 md:h-14" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
