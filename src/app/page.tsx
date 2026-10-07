import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar, Footer } from "@/components/layout/chrome";
import { Reveal } from "@/components/layout/Reveal";
import { LiveCard } from "@/components/templates/LiveCard";
import { Hero } from "@/components/kit/Hero";
import { Ticker } from "@/components/kit/Ticker";
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

/** Five featured sites divided exactly like the other sections — bordered
 *  cells with dividers, alternating tints and mono numbers (cf. Capabilities).
 *  Four cells in two columns, closed by one full-width feature cell. */
const FEATURED_IDS = ["minimal-portfolio", "restaurant", "agency", "saas-starter", "creative-portfolio"];

function FeaturedCell({
  t,
  n,
  cls = "",
  wide,
}: {
  t: (typeof TEMPLATES)[number];
  n: string;
  cls?: string;
  wide?: boolean;
}) {
  return (
    <article
      data-scroll-reveal
      className={`capability-card group relative overflow-hidden border-border p-6 transition-colors duration-500 hover:bg-[#ebe4d4] sm:p-10 lg:p-12 ${cls}`}
    >
      <span className="capability-accent absolute left-0 top-0 h-1 bg-primary" />
      <div className="flex items-start justify-between">
        <span className="font-mono text-[10px] tracking-[0.16em] text-muted">{n}</span>
        <span className="font-mono text-[10px] tracking-[0.16em] text-muted">{t.category}</span>
      </div>
      <div className={wide ? "mt-10 grid items-end gap-8 lg:grid-cols-2" : "mt-10"}>
        <div>
          <h3 className="max-w-[17ch] font-serif text-3xl leading-[1.05] tracking-[-0.035em] sm:text-4xl">
            {t.name}
          </h3>
          <p className="mt-5 max-w-lg text-sm leading-7 text-[#5e5952] sm:text-base">{t.description}</p>
          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-border/25 pt-5 text-xs text-muted">
            {[
              `${t.sections.length} sections`,
              t.tier === "premium" ? "Premium site" : "Free site",
              "Live render",
            ].map((tag) => (
              <li key={tag} className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                {tag}
              </li>
            ))}
          </ul>
          <p className="mt-7 flex items-center gap-4">
            <Link
              href={`/templates/${t.id}`}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border px-6 text-sm font-medium transition hover:bg-foreground hover:text-background"
            >
              Open live preview
            </Link>
            <Link
              href={`/new?template=${t.id}`}
              className="group/link inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:bg-primary"
            >
              Use template
              <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
            </Link>
          </p>
        </div>
        <div className="capability-visual" aria-hidden="true">
          <div className="absolute inset-0">
            <LiveCard templateId={t.id} />
          </div>
          <Link href={`/templates/${t.id}`} aria-label={`Open ${t.name}`} className="absolute inset-0" />
        </div>
      </div>
    </article>
  );
}

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
              The library · {TEMPLATES.length} sites
            </p>
          </div>
          <div className="px-6 py-10 sm:px-10 lg:px-16 lg:py-16 xl:px-20">
            <h2 className="max-w-[17ch] font-serif text-[clamp(2.7rem,5.2vw,5.6rem)] font-normal leading-[0.98] tracking-[-0.045em]">
              Five finished starting points.
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-7 text-[#5e5952] sm:text-lg sm:leading-8">
              Live renders — what you see is the actual site. The full library
              holds {TEMPLATES.length} of them.
            </p>
            <Link
              href="/templates"
              className="group mt-8 inline-flex h-12 items-center gap-2 rounded-full border border-border px-6 text-sm font-medium transition hover:bg-foreground hover:text-background"
            >
              Browse all {TEMPLATES.length} sites
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2">
          {featured.slice(0, 4).map((t, i) => (
            <FeaturedCell
              key={t.id}
              t={t}
              n={String(i + 1).padStart(2, "0")}
              cls={["md:border-r", "border-t md:border-t-0", "border-t md:border-r", "border-t"][i]}
            />
          ))}
        </div>
        {featured[4] ? <FeaturedCell t={featured[4]} n="05" cls="border-t md:col-span-2" wide /> : null}
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
