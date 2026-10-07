import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TEMPLATES } from "@/lib/templates";

/** The closing argument: one enormous serif line on paper, proof underneath,
 *  two doors out. No color flood — the type does the shouting. */
export function FinalCta() {
  return (
    <section aria-label="Start building" className="relative overflow-hidden border-b border-border">
      <div className="relative mx-auto max-w-shell px-6 py-20 text-center sm:px-10 lg:px-16 lg:py-28 xl:px-20">
        <p data-scroll-reveal className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          No code · No canvas · No kidding
        </p>
        <h2
          data-scroll-reveal
          className="mx-auto mt-6 max-w-[16ch] font-serif text-[clamp(3rem,9vw,8.5rem)] font-normal leading-[0.9] tracking-[-0.05em]"
        >
          Your website is <span className="italic text-primary-strong">waiting.</span>
        </h2>
        <p data-scroll-reveal className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#5e5952] sm:text-lg sm:leading-8">
          Pick one of {TEMPLATES.length} finished sites, fill its fields, and
          publish your first page today. Starting is free.
        </p>
        <div data-scroll-reveal className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/new"
            className="group inline-flex h-14 items-center gap-3 rounded-full bg-foreground px-8 text-[15px] font-medium text-background transition hover:bg-primary"
          >
            Start building
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/templates"
            className="inline-flex h-14 items-center rounded-full border border-border px-8 text-[15px] font-medium transition hover:bg-foreground hover:text-background"
          >
            Browse the shelf
          </Link>
        </div>
        <div data-scroll-reveal className="mx-auto mt-12 flex max-w-xl flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-border/40 pt-5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
          <span>Free start</span>
          <span className="h-1 w-1 rounded-full bg-primary" aria-hidden="true" />
          <span>Live preview</span>
          <span className="h-1 w-1 rounded-full bg-primary" aria-hidden="true" />
          <span>Publish in minutes</span>
        </div>
      </div>
    </section>
  );
}
