import Link from "next/link";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import { TEMPLATES } from "@/lib/templates";
import { SECTION_META } from "@/components/templates/Renderer";

const principles = [
  ["01", "Whole sites", "Complete predesigned websites, not blocks."],
  ["02", "Structured fields", "Projects, menus, hours — never code."],
  ["03", "Taste built in", "Variants, palettes and type that hold together."],
  ["04", "Publish instantly", "One click to a fast public page."],
];

function BuilderCard() {
  return (
    <div className="relative mx-auto w-full max-w-[39rem]" aria-label="Illustrative builder preview">
      <div className="absolute -left-8 top-8 h-28 w-28 rounded-full bg-primary/35 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-8 bottom-12 h-36 w-36 rounded-full bg-secondary/30 blur-3xl" aria-hidden="true" />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-[#25231f] bg-[#22211d] text-[#f2efe7] shadow-[0_30px_90px_-42px_rgba(38,35,29,.65)]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="flex gap-[7px]" aria-hidden="true">
              <i className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
              <i className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
              <i className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#aaa69b]">
              create.io / builder
            </span>
          </div>
          <span className="flex items-center gap-2 rounded-full border border-white/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[#cdc8bc]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live
          </span>
        </div>

        <div className="grid min-h-[30rem] md:grid-cols-[0.86fr_1.4fr]">
          <div className="border-b border-white/10 p-5 md:border-b-0 md:border-r">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#858176]">Sections</p>
            <div className="mt-5 space-y-2.5">
              {["Content", "Sections", "Design", "SEO", "Settings"].map((t, i) => (
                <div
                  key={t}
                  className={`rounded-[10px] px-2.5 py-2 font-mono text-[10px] ${i === 0 ? "bg-background text-foreground" : "text-[#cbc6ba]"}`}
                >
                  {t}
                </div>
              ))}
            </div>
            <div className="mt-8 border-t border-white/10 pt-5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#858176]">Sections</p>
                  <p className="mt-1 font-serif text-4xl leading-none">{TEMPLATES[0]?.sections.length ?? 8}</p>
                </div>
                <span className="mb-1 text-xs text-[#9aaa91]">Styled</span>
              </div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[92%] rounded-full bg-[#9aaa91]" />
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden p-5 sm:p-7">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#858176]">Canvas</p>
              <span className="font-mono text-[9px] text-[#858176]">Hero — Poster</span>
            </div>
            <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.16em] text-[#d97757]">Booking Q3 projects</p>
            <p className="mt-3 font-serif text-4xl leading-[1.02] tracking-[-0.04em] sm:text-5xl">
              We ship brands that win
            </p>
            <p className="mt-3 max-w-md text-xs leading-5 text-[#aaa69b]">
              Brand, website and product under one roof. Senior team only, no hand-offs, no bloat.
            </p>
            <div className="mt-6 flex gap-2.5">
              <span className="inline-flex h-9 items-center rounded-full bg-[#f2efe7] px-4 text-xs font-medium text-[#22211d]">
                See the work
              </span>
              <span className="inline-flex h-9 items-center rounded-full border border-white/20 px-4 text-xs text-[#cdc8bc]">
                Our process
              </span>
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#d97757]" />
                <div>
                  <p className="text-sm font-medium text-[#eeeae0]">Click any section to edit its fields</p>
                  <p className="mt-1.5 text-xs leading-5 text-[#aaa69b]">
                    Words, photos, prices and hours — nothing to break, undo included.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 -left-3 hidden rounded-2xl border border-border bg-surface px-4 py-3 text-foreground shadow-xl sm:block">
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#777168]">Builder</p>
        <p className="mt-1 text-sm font-medium">Autosave on · undo ready</p>
      </div>
    </div>
  );
}

export function Hero() {
  const styleCount = Object.values(SECTION_META).reduce((n, m) => n + m.variants.length, 0);
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="marketing-grid absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[calc(100svh-5rem)] max-w-shell lg:grid-cols-[1.03fr_0.97fr]">
          <div className="flex flex-col justify-between px-6 pb-12 pt-16 sm:px-10 sm:pt-24 lg:border-r lg:border-border lg:px-16 lg:pb-16 xl:px-20">
            <div>
              <p className="reveal font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                {site.eyebrow}
              </p>
              <h1 className="reveal mt-8 max-w-[12ch] font-serif text-[clamp(3.6rem,7.4vw,8rem)] font-normal leading-[0.88] tracking-[-0.055em] [animation-delay:80ms]">
                {site.heroTitle}
              </h1>
              <p className="reveal mt-8 max-w-[41rem] text-base leading-7 text-[#5e5952] sm:text-lg sm:leading-8 [animation-delay:160ms]">
                {site.heroSub}
              </p>
              <div className="reveal mt-9 flex flex-wrap items-center gap-4 [animation-delay:240ms]">
                <Link
                  href={site.primaryCta.href}
                  className="group inline-flex h-13 items-center gap-3 rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:bg-primary"
                >
                  {site.primaryCta.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href={site.secondaryCta.href}
                  className="inline-flex h-13 items-center gap-2 rounded-full border border-border px-6 text-sm font-medium transition hover:bg-foreground hover:text-background"
                >
                  {site.secondaryCta.label}
                  <ArrowDownRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="reveal mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[8px] uppercase tracking-[0.14em] text-muted [animation-delay:300ms]">
                {site.trustRow.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>

            <div className="mt-16 grid max-w-xl grid-cols-3 border-t border-border/35 pt-5 text-[#5e5952]">
              {[
                [String(TEMPLATES.length), "complete sites"],
                [`${styleCount}+`, "section styles"],
                ["0", "lines of code"],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="font-mono text-[9px] tracking-[0.16em]">{v}</p>
                  <p className="mt-1.5 text-xs sm:text-sm">{l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center px-6 py-16 sm:px-10 lg:px-12 xl:px-16">
            <div
              aria-hidden="true"
              className="absolute right-10 top-10 font-serif text-[10rem] leading-none text-primary/10"
            >
              {site.mark}
            </div>
            <BuilderCard />
          </div>
        </div>
      </section>

      <section aria-label="Operating principles" className="border-b border-border bg-[#e8dfcf]">
        <div className="mx-auto grid max-w-shell sm:grid-cols-2 lg:grid-cols-4">
          {principles.map(([number, title, body], index) => (
            <div
              key={number}
              className={`px-6 py-5 sm:px-8 ${index < 3 ? "border-b border-border lg:border-b-0 lg:border-r" : ""} ${index === 0 ? "sm:border-r" : ""} ${index === 2 ? "sm:border-b-0 sm:border-r" : ""}`}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[8px] tracking-[0.15em] text-primary-strong">{number}</span>
                <p className="text-sm font-medium">{title}</p>
              </div>
              <p className="mt-2 pl-8 text-xs leading-5 text-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
