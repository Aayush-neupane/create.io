import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TEMPLATES } from "@/lib/templates";

const SHELF_IDS = ["minimal-portfolio", "restaurant", "agency", "saas-starter", "creative-portfolio"];

const route = [
  ["01", "Pick a finished site", "Start from the site closest to what you need."],
  ["02", "Drop in your content", "Fields, not code — menus, hours, projects."],
  ["03", "Publish your page", "One click to a fast public link."],
];

export function LibraryPreview() {
  const shelf = SHELF_IDS.map((id) => TEMPLATES.find((t) => t.id === id)).filter(
    (t): t is (typeof TEMPLATES)[number] => Boolean(t),
  );
  const free = TEMPLATES.filter((t) => t.tier !== "premium").length;
  const premium = TEMPLATES.length - free;
  const sections = TEMPLATES.reduce((n, t) => n + t.sections.length, 0);
  const signals: [string, number][] = [
    ["Free sites", free],
    ["Premium sites", premium],
    ["Finished sections", sections],
  ];
  const max = Math.max(...signals.map(([, n]) => n));

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
                    {TEMPLATES.length} finished sites · live count
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
                <p className="px-3 font-mono text-[8px] uppercase tracking-[0.16em] text-[#858176]">Shelf index</p>
                <nav aria-label="Featured templates" className="mt-4 flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
                  {shelf.map((t, i) => (
                    <Link
                      key={t.id}
                      href={`/templates/${t.id}`}
                      className={`flex shrink-0 items-center gap-3 px-3 py-2.5 text-xs transition-colors ${i === 0 ? "bg-background text-foreground" : "text-[#aaa398] hover:text-white"}`}
                    >
                      <span className={`font-mono text-[8px] ${i === 0 ? "text-primary-strong" : "text-[#777168]"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {t.name}
                    </Link>
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
                      Library / shelf signals
                    </p>
                    <h3 className="mt-3 font-serif text-3xl tracking-[-0.04em] sm:text-4xl">
                      Counted, not claimed.
                    </h3>
                  </div>
                  <p className="max-w-[18rem] text-xs leading-5 text-muted">
                    Real numbers from the shelf, recomputed on every visit.
                  </p>
                </div>

                <div className="grid gap-px bg-border lg:grid-cols-[1.08fr_0.92fr]">
                  <div className="bg-[#e8dfcf] p-5 sm:p-7">
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted">What&apos;s on the shelf</p>
                      <span className="font-mono text-[8px] text-[#777168]">Live data</span>
                    </div>
                    <div className="mt-6 space-y-5">
                      {signals.map(([label, n]) => (
                        <div key={label}>
                          <div className="flex items-baseline justify-between gap-4">
                            <span className="text-sm font-medium">{label}</span>
                            <span className="font-serif text-3xl tabular-nums">{n}</span>
                          </div>
                          <div className="mt-2 h-1.5 bg-border/15">
                            <div className="h-full bg-secondary" style={{ width: `${Math.max(6, Math.round((n / max) * 100))}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-[#777168]">
                      <span className="border border-border/30 px-2.5 py-1">Hero crops below</span>
                      <span className="border border-border/30 px-2.5 py-1">Full sites inside</span>
                    </div>
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
