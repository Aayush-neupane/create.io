import Link from "next/link";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import { TEMPLATES } from "@/lib/templates";
import { SECTION_META } from "@/components/templates/Renderer";
import { HeroCrop, LazyMount } from "@/components/templates/HeroCrop";

/** Full-width masthead: one giant serif claim, the proof (stats), then the
 *  whole shelf as a swipeable strip of live crops. No split hero, no mock. */
export function Hero() {
  const styleCount = Object.values(SECTION_META).reduce((n, m) => n + m.variants.length, 0);
  const kindCount = new Set(TEMPLATES.map((t) => t.category)).size;
  return (
    <>
      <section id="hero" className="relative overflow-hidden bg-[#171310] text-[#f4efe4]">
        <div className="inkgrid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-shell px-6 pb-14 pt-16 text-center sm:px-10 sm:pt-24 lg:px-16 xl:px-20">
          <p className="reveal font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#d97757]">
            {site.eyebrow}
          </p>
          <h1 className="reveal mx-auto mt-8 max-w-[14ch] font-serif text-[clamp(3.2rem,9vw,9rem)] font-normal leading-[0.88] tracking-[-0.055em] [animation-delay:80ms]">
            Whole websites, <span className="italic text-[#d97757]">predesigned.</span>
          </h1>
          <p className="reveal mx-auto mt-8 max-w-[41rem] text-base leading-7 text-[#b9b0a1] sm:text-lg sm:leading-8 [animation-delay:160ms]">
            {site.heroSub}
          </p>
          <div className="reveal mt-9 flex flex-wrap items-center justify-center gap-4 [animation-delay:240ms]">
            <Link
              href={site.primaryCta.href}
              className="group inline-flex h-13 items-center gap-3 rounded-full bg-primary px-6 text-sm font-medium text-white transition hover:bg-primary-strong"
            >
              {site.primaryCta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={site.secondaryCta.href}
              className="inline-flex h-13 items-center gap-2 rounded-full border border-white/25 px-6 text-sm font-medium text-[#f4efe4] transition hover:bg-background hover:text-foreground"
            >
              {site.secondaryCta.label}
              <ArrowDownRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="reveal mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[8px] uppercase tracking-[0.14em] text-[#918c83] [animation-delay:300ms]">
            {site.trustRow.map((t, i) => (
              <span key={t} className="flex items-center gap-3">
                {i > 0 ? <span className="h-1 w-1 rounded-full bg-primary" aria-hidden="true" /> : null}
                {t}
              </span>
            ))}
          </div>

          <dl className="reveal mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-6 border-t border-white/20 pt-6 sm:grid-cols-4 [animation-delay:360ms]">
            {[
              [String(TEMPLATES.length), "complete sites"],
              [`${styleCount}+`, "section styles"],
              [String(kindCount), "kinds of site"],
              ["0", "lines of code"],
            ].map(([v, l]) => (
              <div key={l}>
                <dd className="font-serif text-4xl tabular-nums leading-none">{v}</dd>
                <dt className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#918c83]">{l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-label="Swipe the shelf" className="border-b border-border bg-surface/40">
        <div className="mx-auto max-w-shell">
          <div className="flex items-center justify-between px-6 pt-8 sm:px-10 lg:px-16 xl:px-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              The shelf · swipe it
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              {String(TEMPLATES.length).padStart(2, "0")} live crops
            </p>
          </div>
        </div>
        <div className="no-bar snap-row mt-5 flex gap-4 overflow-x-auto px-6 pb-10 sm:px-10 lg:px-16 xl:px-20">
          {TEMPLATES.map((t, i) => (
            <Link
              key={t.id}
              href={`/templates/${t.id}`}
              className="group w-[80vw] max-w-[400px] flex-none snap-center overflow-hidden border border-border bg-surface transition-colors duration-500 hover:bg-surface-2 sm:w-[380px]"
            >
              <div className="flex items-center justify-between border-b border-border/40 px-4 py-2.5">
                <span className="font-mono text-[9px] tracking-[0.14em] text-muted">
                  {String(i + 1).padStart(2, "0")} · {t.name}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live
                </span>
              </div>
              <div className="h-52 overflow-hidden sm:h-60">
                <LazyMount>
                  <HeroCrop templateId={t.id} />
                </LazyMount>
              </div>
              <div className="flex items-center justify-between border-t border-border/40 px-4 py-2.5">
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                  {t.category} · {t.sections.length} sections
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-muted transition-all group-hover:translate-x-1 group-hover:text-primary-strong" />
              </div>
            </Link>
          ))}
          <Link
            href="/templates"
            className="group grid w-[70vw] max-w-[300px] flex-none snap-center place-items-center border border-dashed border-border/60 px-8 text-center transition-colors hover:bg-foreground hover:text-background sm:w-[280px]"
          >
            <span>
              <span className="block font-serif text-3xl">Open the full library →</span>
              <span className="mt-3 block font-mono text-[9px] uppercase tracking-[0.14em] opacity-70">
                Every site, finished
              </span>
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
