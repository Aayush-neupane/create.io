import Link from "next/link";
import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout/chrome";
import { Reveal } from "@/components/layout/Reveal";
import { FinalCta } from "@/components/kit/FinalCta";
import { currentUser } from "@/lib/auth";
import { TEMPLATES } from "@/lib/templates";
import { SECTION_META } from "@/components/templates/Renderer";

export const metadata: Metadata = {
  title: "About — create.io",
  description: "Why create.io exists: websites should start finished, not blank.",
};

const VALUES = [
  {
    n: "01",
    t: "Whole sites, not parts",
    d: "Every template is a finished website — its own components, copy, palette and type. You never assemble taste from blocks.",
  },
  {
    n: "02",
    t: "Taste is built in",
    d: "Sections come from each template's own library, so variants, palettes and spacing hold together no matter what you change.",
  },
  {
    n: "03",
    t: "Yours to keep",
    d: "Your words, photos and pages belong to you. Publish, point a domain at it, republish anytime — leave whenever you like.",
  },
];

export default async function AboutPage() {
  const user = await currentUser();
  const styleCount = Object.values(SECTION_META).reduce((n, m) => n + m.variants.length, 0);
  const kindCount = new Set(TEMPLATES.map((t) => t.category)).size;

  return (
    <div className="marketing-theme min-h-screen bg-background text-foreground">
      <a
        href="#main-content"
        className="pointer-events-none fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background opacity-0 transition focus-visible:pointer-events-auto focus-visible:translate-y-0 focus-visible:opacity-100"
      >
        Skip to content
      </a>
      <Navbar user={user} />
      <Reveal>
        <main id="main-content" className="flex-1">
          <section className="relative overflow-hidden border-b border-border">
            <div className="marketing-grid absolute inset-0 opacity-50" aria-hidden="true" />
            <div className="relative mx-auto max-w-shell px-6 py-16 sm:px-10 sm:py-24 lg:px-16 xl:px-20">
              <p className="reveal font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                About · The workshop
              </p>
              <h1 className="reveal mt-8 max-w-[14ch] font-serif text-[clamp(3rem,7vw,6.5rem)] font-normal leading-[0.9] tracking-[-0.055em] [animation-delay:80ms]">
                Websites should start finished.
              </h1>
              <p className="reveal mt-8 max-w-[41rem] text-base leading-7 text-[#5e5952] sm:text-lg sm:leading-8 [animation-delay:160ms]">
                create.io is a small workshop for finished websites. The blank
                canvas is where good intentions go to stall — so we skipped it.
                Pick a complete site, fill its fields, publish your page.
              </p>
            </div>
          </section>

          <section aria-label="What we believe" className="border-b border-border">
            <div className="mx-auto max-w-shell">
              <div className="grid border-b border-border lg:grid-cols-[0.62fr_1.38fr]">
                <div className="px-6 py-10 sm:px-10 lg:border-r lg:border-border lg:px-16 lg:py-16 xl:px-20">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Three beliefs</p>
                </div>
                <div className="px-6 py-10 sm:px-10 lg:px-16 lg:py-16 xl:px-20">
                  <h2 className="max-w-[17ch] font-serif text-[clamp(2.4rem,4.5vw,4.5rem)] font-normal leading-[0.98] tracking-[-0.045em]">
                    Opinionated, on purpose.
                  </h2>
                </div>
              </div>
              <div className="grid md:grid-cols-3">
                {VALUES.map((v, i) => (
                  <article
                    key={v.n}
                    data-scroll-reveal
                    style={{ transitionDelay: `${i * 80}ms` }}
                    className={`flex min-h-[24rem] flex-col p-7 sm:p-10 lg:p-12 ${i < 2 ? "border-b border-border md:border-b-0 md:border-r" : ""}`}
                  >
                    <span className="font-mono text-[9px] tracking-[0.16em] text-primary-strong">{v.n}</span>
                    <h3 className="mt-8 font-serif text-3xl leading-[1.05] tracking-[-0.035em]">{v.t}</h3>
                    <p className="mt-4 text-sm leading-7 text-[#5e5952]">{v.d}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section aria-label="The shelf in numbers" className="border-b border-border bg-[#292721] text-[#f4efe4]">
            <div className="mx-auto grid max-w-shell gap-10 px-6 py-16 sm:grid-cols-2 sm:px-10 lg:grid-cols-4 lg:px-16 lg:py-20 xl:px-20">
              {[
                [String(TEMPLATES.length), "finished sites"],
                [`${styleCount}+`, "section styles"],
                [String(kindCount), "kinds of site"],
                ["0", "lines of code"],
              ].map(([v, l]) => (
                <div key={l} className="border-t border-white/25 pt-5">
                  <p className="font-serif text-5xl tabular-nums leading-none sm:text-6xl">{v}</p>
                  <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-[#aaa398]">{l}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-label="The story" className="border-b border-border">
            <div className="mx-auto grid max-w-shell lg:grid-cols-[0.62fr_1.38fr]">
              <div className="px-6 py-14 sm:px-10 lg:border-r lg:border-border lg:px-16 lg:py-20 xl:px-20">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">The idea</p>
                <h2 className="mt-7 font-serif text-[clamp(2.4rem,4vw,4rem)] font-normal leading-[0.95]">
                  Built for the rest of us.
                </h2>
              </div>
              <div className="space-y-5 px-6 py-14 text-base leading-8 text-[#5e5952] sm:px-10 lg:px-16 lg:py-20 xl:px-20">
                <p>
                  Most site builders hand you an empty page and a thousand
                  decisions. Templates, when they exist, are skins over the
                  same boxes — change the color and call it yours. The result
                  looks assembled, because it is.
                </p>
                <p>
                  create.io goes the other way: a small shelf of complete,
                  predesigned websites, each with its own components and its own
                  words. A trekking guide, a thakali kitchen, a SaaS launch —
                  real starting points with taste already in them. You bring the
                  content; the design holds.
                </p>
                <p>
                  It is made for shops in Asan as much as startups in
                  Jhamsikhel: menus, hours, price lists and portfolios are
                  first-class citizens, and publishing takes one click. Start
                  free, keep it as you grow.
                </p>
                <p className="border-t border-border/25 pt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  Made by <Link href="https://dynamic-aayush38.netlify.app" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4">Aayush Neupane</Link> · No code · No canvas · No kidding
                </p>
              </div>
            </div>
          </section>

          <FinalCta />
        </main>
        <Footer />
      </Reveal>
    </div>
  );
}
