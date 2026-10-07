import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar, Footer } from "@/components/layout/chrome";
import { Reveal } from "@/components/layout/Reveal";
import { TemplateRow } from "@/components/templates/TemplateRow";
import { Hero } from "@/components/kit/Hero";
import { Ticker } from "@/components/kit/Ticker";
import { FieldsDemo } from "@/components/kit/FieldsDemo";
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

/** Five featured sites as full-bleed shelf rows — the same division as the
 *  templates index, with alternating sides. Closes with the whole library. */
const FEATURED_IDS = ["minimal-portfolio", "restaurant", "agency", "saas-starter", "creative-portfolio"];

function LibraryGrid() {
  const featured = FEATURED_IDS.map((id) => TEMPLATES.find((t) => t.id === id)).filter(
    (t): t is (typeof TEMPLATES)[number] => Boolean(t),
  );
  return (
    <section aria-label="Featured template sites" className="border-b border-border">
      <div className="mx-auto max-w-shell">
        <div className="grid border-b border-border lg:grid-cols-[0.62fr_1.38fr]">
          <div className="px-6 py-10 sm:px-10 lg:border-r lg:border-border lg:px-16 lg:py-16 xl:px-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Ch. 04 — The shortlist · {TEMPLATES.length} on the shelf
            </p>
          </div>
          <div className="px-6 py-10 sm:px-10 lg:px-16 lg:py-16 xl:px-20">
            <h2 className="max-w-[17ch] font-serif text-[clamp(2.7rem,5.2vw,5.6rem)] font-normal leading-[0.98] tracking-[-0.045em]">
              Five finished starting points.
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-7 text-[#5e5952] sm:text-lg sm:leading-8">
              Readable crops of real sites — the full library holds {TEMPLATES.length} of them.
            </p>
          </div>
        </div>

        <div className="border-b border-border">
          {featured.map((t, i) => (
            <TemplateRow key={t.id} t={t} n={String(i + 1).padStart(2, "0")} flip={i % 2 === 1} />
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-8 sm:px-10 lg:px-16 xl:px-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            {TEMPLATES.length - featured.length} more on the shelf
          </p>
          <Link
            href="/templates"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:bg-primary"
          >
            Browse all {TEMPLATES.length} sites
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
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
          <Ticker />
          <FieldsDemo />
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
