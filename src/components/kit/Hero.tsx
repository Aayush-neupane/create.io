import Link from "next/link";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import { TEMPLATES } from "@/lib/templates";
import { SECTION_META } from "@/components/templates/Renderer";
import { LiveCard } from "@/components/templates/LiveCard";

const principles = [
  ["01", "Whole sites", "Complete predesigned websites, not blocks."],
  ["02", "Structured fields", "Projects, menus, hours — never code."],
  ["03", "Taste built in", "Variants, palettes and type that hold together."],
  ["04", "Publish instantly", "One click to a fast public page."],
];

/** The product is the visual: two real templates, live-rendered and stacked,
 *  not a mock. Badges name what makes them different. */
function LiveStack() {
  const back = TEMPLATES.find((t) => t.id === "restaurant") ?? TEMPLATES[1];
  const front = TEMPLATES.find((t) => t.id === "minimal-portfolio") ?? TEMPLATES[0];
  return (
    <div className="relative mx-auto w-full max-w-[39rem]" aria-label="Live template previews">
      <div className="absolute -left-8 top-8 h-28 w-28 rounded-full bg-primary/35 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-8 bottom-12 h-36 w-36 rounded-full bg-secondary/30 blur-3xl" aria-hidden="true" />

      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-0 translate-x-5 translate-y-5 rotate-[2.5deg] overflow-hidden border border-border bg-surface"
        >
          <div className="flex items-center gap-1.5 border-b border-border/40 px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-border/50" />
            <span className="h-2 w-2 rounded-full bg-border/50" />
            <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">{back.name}</span>
          </div>
          <div className="aspect-[4/3]">
            <LiveCard templateId={back.id} />
          </div>
        </div>

        <div className="relative overflow-hidden border border-border bg-surface shadow-[0_30px_90px_-42px_rgba(38,35,29,.65)]">
          <div className="flex items-center justify-between border-b border-border/40 px-4 py-2.5">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">{front.name}</span>
            <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live
            </span>
          </div>
          <div className="aspect-[4/3]">
            <LiveCard templateId={front.id} />
          </div>
        </div>
      </div>

      <div className="absolute -right-2 top-10 hidden rounded-full border border-border bg-surface px-4 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-foreground shadow-lg sm:block">
        Live render · not a mock
      </div>
      <div className="absolute -bottom-5 -left-3 hidden rounded-2xl border border-border bg-surface px-4 py-3 shadow-xl sm:block">
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#777168]">Editing model</p>
        <p className="mt-1 text-sm font-medium">Fields, not code · undo ready</p>
      </div>
    </div>
  );
}

export function Hero() {
  const styleCount = Object.values(SECTION_META).reduce((n, m) => n + m.variants.length, 0);
  const kindCount = new Set(TEMPLATES.map((t) => t.category)).size;
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

            <div className="mt-16 grid max-w-xl grid-cols-2 gap-x-8 gap-y-5 border-t border-border/35 pt-5 text-[#5e5952] sm:grid-cols-4">
              {[
                [String(TEMPLATES.length), "complete sites"],
                [`${styleCount}+`, "section styles"],
                [String(kindCount), "kinds of site"],
                ["0", "lines of code"],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="font-serif text-3xl tabular-nums leading-none">{v}</p>
                  <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.14em]">{l}</p>
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
            <LiveStack />
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
