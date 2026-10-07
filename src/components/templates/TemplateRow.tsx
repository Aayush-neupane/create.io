import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { TemplateDefinition } from "@/types/builder";
import { HeroCrop, LazyMount } from "./HeroCrop";

/** One shelf row: a readable live crop beside big serif details, divided by
 *  full-bleed hairlines. Sides alternate for rhythm. Shared by the home
 *  featured shelf and the templates index. */
export function TemplateRow({
  t,
  n,
  flip,
}: {
  t: TemplateDefinition;
  n: string;
  flip?: boolean;
}) {
  return (
    <article data-scroll-reveal className="group grid border-t border-border lg:grid-cols-2">
      <div
        className={`relative h-60 overflow-hidden border-b border-border/40 sm:h-72 lg:h-auto lg:min-h-[22rem] lg:border-b-0 ${
          flip ? "lg:order-2 lg:border-l" : "lg:border-r"
        }`}
      >
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
          <LazyMount>
            <HeroCrop templateId={t.id} />
          </LazyMount>
        </div>
        <Link href={`/templates/${t.id}`} aria-label={`Open ${t.name}`} className="absolute inset-0" />
        <span className="absolute left-4 top-4 rounded-full border border-border/40 bg-background/90 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
          {t.category}
        </span>
        {t.tier === "premium" ? (
          <span className="absolute right-4 top-4 rounded-full bg-foreground px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-background">
            Pro
          </span>
        ) : null}
        <span className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
          <span className="rounded-full bg-foreground/95 px-4 py-1.5 text-[13px] font-semibold text-background shadow-lg">
            Open live preview →
          </span>
        </span>
      </div>

      <div className={`flex flex-col justify-center gap-4 p-6 sm:p-10 lg:p-12 ${flip ? "lg:order-1" : ""}`}>
        <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.16em] text-muted">
          <span className="text-primary-strong">{n}</span>
          <span>{t.sections.length} sections</span>
        </div>
        <h3 className="max-w-[14ch] font-serif text-4xl leading-[1.0] tracking-[-0.04em] sm:text-5xl">
          {t.name}
        </h3>
        <p className="max-w-md text-[15px] leading-7 text-[#5e5952]">{t.description}</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-1.5 border-t border-border/25 pt-5 text-xs text-muted">
          {[t.category, `${t.sections.length} sections`, t.tier === "premium" ? "Premium site" : "Free site", "Live render"].map(
            (tag) => (
              <li key={tag} className="flex items-center gap-2">
                <span className="h-1 w-1 shrink-0 rounded-full bg-primary" />
                {tag}
              </li>
            ),
          )}
        </ul>
        <p className="mt-2 flex flex-wrap items-center gap-3">
          <Link
            href={`/templates/${t.id}`}
            className="inline-flex h-12 items-center rounded-full border border-border px-6 text-sm font-medium transition hover:bg-foreground hover:text-background"
          >
            Open full preview
          </Link>
          <Link
            href={`/new?template=${t.id}`}
            className="group/cta inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:bg-primary"
          >
            Use template
            <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
          </Link>
        </p>
      </div>
    </article>
  );
}
