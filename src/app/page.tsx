import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar, Footer } from "@/components/layout/chrome";
import { Reveal } from "@/components/layout/Reveal";
import { LiveCard } from "@/components/templates/LiveCard";
import { Hero } from "@/components/kit/Hero";
import { Capabilities } from "@/components/kit/Capabilities";
import { LibraryPreview } from "@/components/kit/LibraryPreview";
import { UseCases } from "@/components/kit/UseCases";
import { Workflow } from "@/components/kit/Workflow";
import { Testimonials } from "@/components/kit/Testimonials";
import { Trust } from "@/components/kit/Trust";
import { Faq } from "@/components/kit/Faq";
import { StartCta } from "@/components/kit/StartCta";
import { FinalCta } from "@/components/kit/FinalCta";
import { currentUser } from "@/lib/auth";
import { TEMPLATES } from "@/lib/templates";

/** Five featured sites in a broken editorial grid — varied spans, staggered
 *  offsets and alternating preview ratios, closed by a full-width feature. */
const FEATURED_IDS = ["minimal-portfolio", "restaurant", "agency", "saas-starter", "creative-portfolio"];

const FEATURED_LAYOUT = [
  "col-span-12 lg:col-span-7",
  "col-span-12 lg:col-span-5 lg:mt-14",
  "col-span-12 lg:col-span-5 lg:-mt-14",
  "col-span-12 lg:col-span-7",
  "col-span-12",
];

const FEATURED_RATIO = [
  "aspect-[16/10]",
  "aspect-[4/3]",
  "aspect-[4/3]",
  "aspect-[16/10]",
  "aspect-[21/9]",
];

function LibraryGrid() {
  const featured = FEATURED_IDS.map((id) => TEMPLATES.find((t) => t.id === id)).filter(
    (t): t is (typeof TEMPLATES)[number] => Boolean(t),
  );
  return (
    <section aria-label="Featured template sites" className="border-b border-border">
      <div className="mx-auto max-w-shell px-4 py-12 sm:px-8 sm:py-16 lg:px-14 lg:py-20 xl:px-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              The library · {TEMPLATES.length} sites
            </p>
            <h2 className="mt-4 max-w-[16ch] font-serif text-[clamp(2.2rem,4vw,3.8rem)] font-normal leading-[0.95]">
              Five finished starting points.
            </h2>
          </div>
          <Link
            href="/templates"
            className="group inline-flex h-12 items-center gap-2 rounded-full border border-border px-6 text-sm font-medium transition hover:bg-foreground hover:text-background"
          >
            Browse all {TEMPLATES.length} sites
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-12 gap-5">
          {featured.map((t, i) => (
            <article
              key={t.id}
              data-scroll-reveal
              style={{ transitionDelay: `${Math.min(i, 4) * 70}ms` }}
              className={`kit-card group relative flex min-w-0 flex-col overflow-hidden border border-border bg-surface transition-colors duration-500 hover:bg-[#ebe4d4] ${FEATURED_LAYOUT[i]}`}
            >
              <span className="kit-accent absolute left-0 top-0 z-10 h-1 bg-primary" aria-hidden="true" />
              <div className={`relative ${FEATURED_RATIO[i]} overflow-hidden border-b border-border/40`}>
                <div className="absolute inset-0">
                  <LiveCard templateId={t.id} />
                </div>
                <Link href={`/templates/${t.id}`} aria-label={`Open ${t.name}`} className="absolute inset-0" />
                <span className="absolute left-4 top-4 rounded-full border border-border/40 bg-background/90 px-2.5 py-1 font-mono text-[9px] tracking-[0.14em] text-muted">
                  {String(i + 1).padStart(2, "0")} · {t.category}
                </span>
                <span className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span className="rounded-full bg-foreground/95 px-4 py-1.5 text-[13px] font-semibold text-background shadow-lg">
                    Open live preview →
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-3.5 p-[18px_20px]">
                <span
                  className="grid h-10 w-10 flex-none place-items-center rounded-[13px] text-sm font-bold text-white"
                  style={{ background: t.theme.primary }}
                  aria-hidden
                >
                  {t.name.slice(0, 1)}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-serif text-xl tracking-[-0.025em]">{t.name}</h3>
                  <p className="truncate text-[13.5px] text-muted">{t.description}</p>
                </div>
                <span className="rounded-full border border-border/40 px-2.5 py-[3px] font-mono text-xs text-muted">
                  {t.sections.length}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function LandingPage() {
  const user = await currentUser();
  return (
    <div className="marketing-theme min-h-screen">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition focus:translate-y-0"
      >
        Skip to content
      </a>
      <Navbar user={user} />
      <Reveal>
        <main id="main-content" className="flex-1">
          <Hero />
          <Capabilities />
          <LibraryPreview />
          <LibraryGrid />
          <UseCases />
          <Workflow />
          <Testimonials />
          <Trust />
          <Faq />
          <StartCta />
          <FinalCta />
        </main>
        <Footer />
      </Reveal>
    </div>
  );
}
