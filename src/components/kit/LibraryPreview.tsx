import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TEMPLATES } from "@/lib/templates";

const views = [
  ["01", "Portfolio"],
  ["02", "Business"],
  ["03", "Restaurant"],
  ["04", "Agency"],
  ["05", "SaaS"],
];

const route = [
  ["01", "Pick a finished site", "Start from the site closest to what you need."],
  ["02", "Drop in your content", "Fields, not code — menus, hours, projects."],
  ["03", "Publish your page", "One click to a fast public link."],
];

export function LibraryPreview() {
  const featured = TEMPLATES.slice(0, 3);
  return (
    <section id="library" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-shell">
        <div className="grid border-b border-border lg:grid-cols-[0.62fr_1.38fr]">
          <div className="px-6 py-10 sm:px-10 lg:border-r lg:border-border lg:px-16 lg:py-16 xl:px-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Inside the library</p>
            <div className="mt-8 hidden h-24 w-px bg-border/35 lg:block" />
          </div>
          <div className="px-6 py-10 sm:px-10 lg:px-16 lg:py-16 xl:px-20">
            <h2 className="max-w-[18ch] font-serif text-[clamp(2.7rem,5.2vw,5.6rem)] font-normal leading-[0.98] tracking-[-0.045em]">
              Start from something finished.
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-7 text-[#5e5952] sm:text-lg sm:leading-8">
              Live renders below — what you see is the actual site, with its own
              components and copy. Pick one and make it yours.
            </p>
          </div>
        </div>

        <div className="px-4 py-12 sm:px-8 sm:py-16 lg:px-14 lg:py-20 xl:px-20">
          <div className="overflow-hidden border border-border bg-[#292721] text-[#f5f0e5] shadow-[0_36px_90px_-60px_rgba(41,39,33,.8)]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/20 px-5 py-4 sm:px-7">
              <div className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center bg-primary font-serif text-lg leading-none text-white">c</span>
                <div>
                  <p className="text-sm font-medium">Template library</p>
                  <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#aaa398]">
                    {TEMPLATES.length} finished sites · live render
                  </p>
                </div>
              </div>
              <Link
                href="/templates"
                className="group flex items-center gap-2 border border-white/20 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-[#c8c2b7] transition hover:bg-background hover:text-foreground"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#9aaa91]" />
                Browse all sites
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="grid lg:grid-cols-[15rem_1fr]">
              <aside className="border-b border-white/20 bg-[#24231f] p-4 lg:border-b-0 lg:border-r lg:p-5">
                <p className="px-3 font-mono text-[8px] uppercase tracking-[0.16em] text-[#858176]">Library index</p>
                <nav aria-label="Template categories" className="mt-4 flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
                  {views.map(([number, label], i) => (
                    <div
                      key={number}
                      className={`flex shrink-0 items-center gap-3 px-3 py-2.5 text-xs ${i === 0 ? "bg-background text-foreground" : "text-[#aaa398]"}`}
                    >
                      <span className={`font-mono text-[8px] ${i === 0 ? "text-primary-strong" : "text-[#777168]"}`}>
                        {number}
                      </span>
                      {label}
                    </div>
                  ))}
                </nav>
                <div className="mt-8 hidden border-t border-white/15 px-3 pt-5 lg:block">
                  <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#858176]">Editing model</p>
                  <p className="mt-2 text-xs leading-5 text-[#aaa398]">
                    Structured fields
                    <br />
                    Undo + autosave
                  </p>
                </div>
              </aside>

              <div className="bg-background p-5 text-foreground sm:p-8 lg:p-10">
                <div className="flex flex-wrap items-end justify-between gap-5 border-b border-border pb-6">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
                      Library / featured sites
                    </p>
                    <h3 className="mt-3 font-serif text-3xl tracking-[-0.04em] sm:text-4xl">
                      Three finished starting points
                    </h3>
                  </div>
                  <p className="max-w-[18rem] text-xs leading-5 text-muted">
                    Each with its own sections, palette, type and copy.
                  </p>
                </div>

                <div className="grid gap-px bg-border lg:grid-cols-[1.08fr_0.92fr]">
                  <div className="bg-[#e8dfcf] p-5 sm:p-7">
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted">Featured sites</p>
                      <span className="font-mono text-[8px] text-[#777168]">Live data</span>
                    </div>
                    <div className="mt-5 space-y-3">
                      {featured.map((t) => (
                        <Link
                          key={t.id}
                          href={`/templates/${t.id}`}
                          className="flex items-center gap-3 border border-border/40 bg-surface px-4 py-3 transition hover:-translate-y-0.5"
                        >
                          <span
                            className="grid h-9 w-9 flex-none place-items-center rounded-[10px] text-sm font-bold text-white"
                            style={{ background: t.theme.primary }}
                            aria-hidden
                          >
                            {t.name.slice(0, 1)}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-semibold">{t.name}</span>
                            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
                              {t.category} · {t.sections.length} sections
                            </span>
                          </span>
                          <span className="flex flex-none gap-1" aria-hidden>
                            {[t.theme.primary, t.theme.accent].map((c, i) => (
                              <i key={i} className="h-4 w-4 rounded-full border border-border/40" style={{ background: c }} />
                            ))}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <svg viewBox="0 0 520 120" className="mt-5 w-full" role="img" aria-label="Section graph">
                      <g fill="none" stroke="#292721" strokeOpacity=".45" strokeWidth="1.4">
                        <path d="M65 60H168L242 30H350L430 60" />
                        <path d="M168 60 245 95H355L430 60" />
                        <path d="M242 30 245 95M350 30 355 95" />
                      </g>
                      <g stroke="#292721" strokeWidth="1.4">
                        <circle cx="65" cy="60" r="18" fill="#F5F0E5" />
                        <circle cx="168" cy="60" r="24" fill="#D75C3F" />
                        <circle cx="242" cy="30" r="14" fill="#F5F0E5" />
                        <circle cx="245" cy="95" r="16" fill="#809177" />
                        <circle cx="430" cy="60" r="26" fill="#292721" />
                      </g>
                      <g fontFamily="ui-monospace, monospace" fontSize="8" textAnchor="middle" fill="#292721">
                        <text x="65" y="86">NAV</text>
                        <text x="168" y="64">HERO</text>
                      </g>
                      <text x="430" y="64" fill="#F5F0E5" fontFamily="ui-monospace, monospace" fontSize="8" textAnchor="middle">
                        CTA
                      </text>
                    </svg>
                  </div>

                  <div className="bg-surface p-5 sm:p-7">
                    <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted">Suggested first route</p>
                    <ol className="mt-5 divide-y divide-border/25 border-t border-border/25">
                      {route.map(([number, title, body]) => (
                        <li key={number} className="grid grid-cols-[2rem_1fr] gap-3 py-4">
                          <span className="font-mono text-[8px] text-primary-strong">{number}</span>
                          <div>
                            <p className="text-sm font-medium">{title}</p>
                            <p className="mt-1 text-xs leading-5 text-muted">{body}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                    <div className="mt-5 border-l-2 border-secondary bg-[#dfe5d8] px-4 py-3">
                      <p className="font-mono text-[8px] uppercase tracking-[0.13em] text-[#52664d]">Why this matters</p>
                      <p className="mt-1.5 text-xs leading-5 text-[#43533f]">
                        Taste is built in — sections come from the template&apos;s own library.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-right font-mono text-[8px] uppercase tracking-[0.14em] text-[#777168]">
            Live data · <Link href="/templates" className="underline underline-offset-2">Open the full library</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
