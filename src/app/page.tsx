import Link from "next/link";
import { Navbar, Footer } from "@/components/layout/chrome";
import { Reveal } from "@/components/layout/Reveal";
import { HeroCrop } from "@/components/templates/HeroCrop";
import { SECTION_META } from "@/components/templates/Renderer";
import { currentUser } from "@/lib/auth";
import { TEMPLATES } from "@/lib/templates";

const STEPS = [
  { n: "01", t: "Pick a finished site", d: "Complete websites with their own sections and copy — never a blank canvas." },
  { n: "02", t: "Drop in your content", d: "Plain fields for projects, menus, hours and photos. Nothing to break." },
  { n: "03", t: "Tune the look", d: "Variants, palettes, type and spacing. The design holds together." },
  { n: "04", t: "Publish in a click", d: "One click to a fast public page. Edit and republish whenever." },
];

const PRINCIPLES = [
  { n: "A", t: "Whole sites, not parts", d: "Every template is a finished website with a coherent layout — never a pile of blocks." },
  { n: "B", t: "What you see is real", d: "Gallery cards, builder preview and the published page render the same code." },
  { n: "C", t: "Responsive by default", d: "Desktop, tablet and mobile fall out of every template automatically." },
  { n: "D", t: "Zero code, full control", d: "Structured editing with undo, autosave, SEO and image uploads built in." },
];

const QUOTES = [
  ["I published my trekking site between two bus rides to Pokhara. Bookings came before I got home.", "Binod Thapa", "Guide, Himalayan Trails"],
  ["Clients think I hired an agency in Jhamsikhel. It was me, on a Sunday, with chiya.", "Sabina Karki", "Designer, Lalitpur"],
  ["Our momo menu finally looks as good as it tastes. Weekend covers are up.", "Tashi Sherpa", "Owner, Lakeside Kitchen"],
];

const FAQS = [
  ["Do I need to write any code?", "Never. If you can fill a form and upload a photo, you can ship a site."],
  ["Can I use my own domain?", "Yes. Point your domain at us from the builder settings — .com.np works too."],
  ["What does it cost?", "Starting is free. Paid plans unlock premium sites, custom domains and analytics."],
  ["I run a shop in Asan, not a startup. Will this work?", "That is exactly who it is for. Menus, hours, price lists and contact pages are first-class."],
  ["Can I edit after publishing?", "Anytime. Every change autosaves, undo is built in, and republishing takes one click."],
];

function SecHead({ index, eyebrow, title, sub, dark }: { index: string; eyebrow: string; title: React.ReactNode; sub?: string; dark?: boolean }) {
  return (
    <div className="mb-12">
      <p className="eyebrow" style={dark ? { color: "var(--accent)" } : undefined}>
        <span className="mono-meta">{index}</span>
        {eyebrow}
      </p>
      <h2 className="display display-upper mt-4 max-w-[20ch]" style={{ fontSize: "clamp(34px,4.6vw,60px)", color: dark ? "var(--paper)" : undefined }}>{title}</h2>
      {sub && <p className="mt-4 max-w-xl text-base leading-relaxed" style={{ color: dark ? "var(--cream-dim)" : "var(--ink-2)" }}>{sub}</p>}
    </div>
  );
}

export default async function LandingPage() {
  const user = await currentUser();
  const styleCount = Object.values(SECTION_META).reduce((n, m) => n + m.variants.length, 0);
  const kindCount = new Set(TEMPLATES.map((t) => t.category)).size;
  const heroMain = TEMPLATES.find((t) => t.id === "restaurant") ?? TEMPLATES[0];
  const ticker = [...TEMPLATES, ...TEMPLATES];

  return (
    <div className="min-h-screen" style={{ background: "var(--paper)" }}>
      <Navbar user={user} />
      <Reveal>

      {/* ── HERO · ink band ── */}
      <section className="relative overflow-hidden" style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <div className="inkgrid pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-16 text-center md:pt-24">
          <p data-reveal className="eyebrow eyebrow-center justify-center" style={{ color: "var(--accent)" }}>
            Whole websites · predesigned
          </p>
          <h1 data-reveal className="display display-upper mx-auto mt-7 max-w-[13ch]" style={{ fontSize: "clamp(50px,8.4vw,118px)" }}>
            Designed. Done. Published.
          </h1>
          <p data-reveal className="mx-auto mt-7 max-w-xl text-base leading-relaxed md:text-lg" style={{ color: "var(--cream-dim)" }}>
            Skip the blank canvas. Pick a complete site with its own sections
            and copy, make it yours, and publish in minutes.
          </p>
          <div data-reveal className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/new" className="btn-tan">
              Create your website →
            </Link>
            <Link href="/templates" className="btn-ghost !text-[#f4efe4]" style={{ borderColor: "rgba(244,239,228,.35)" }}>
              Explore templates
            </Link>
          </div>
          <div data-reveal className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-[10px] font-bold uppercase" style={{ letterSpacing: "0.2em", color: "var(--cream-dim)" }}>
            <span>No code</span><span style={{ color: "var(--accent)" }}>·</span>
            <span>Live preview</span><span style={{ color: "var(--accent)" }}>·</span>
            <span>Publish in minutes</span>
          </div>

          {/* Live preview window */}
          <div data-reveal className="relative mx-auto mt-12 max-w-4xl overflow-hidden text-left" style={{ background: "var(--surface)", borderRadius: 14 }}>
            <div className="flex h-12 items-center gap-3 px-5" style={{ borderBottom: "1px solid var(--line)", background: "var(--surface)" }}>
              <span className="flex gap-1.5">
                <i className="h-2.5 w-2.5 rounded-full" style={{ background: "#d8cdb4" }} />
                <i className="h-2.5 w-2.5 rounded-full" style={{ background: "#d8cdb4" }} />
                <i className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--accent)" }} />
              </span>
              <span className="mono-meta mx-auto rounded-full px-3 py-0.5 text-[11px] font-bold uppercase" style={{ letterSpacing: "0.1em", background: "var(--accent-soft)", color: "var(--accent-text)" }}>
                {heroMain.name} — live render
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase" style={{ letterSpacing: "0.12em", color: "var(--accent-text)" }}>
                <i className="pulse-dot h-[7px] w-[7px] rounded-full" style={{ background: "var(--accent)", color: "var(--accent)" }} /> Live
              </span>
            </div>
            <div className="h-[300px] sm:h-[380px]">
              <HeroCrop templateId={heroMain.id} />
            </div>
          </div>

          <dl data-reveal className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-6 border-t pt-8 sm:grid-cols-4" style={{ borderColor: "rgba(244,239,228,.18)" }}>
            {[
              [String(TEMPLATES.length), "finished sites"],
              [`${styleCount}+`, "section styles"],
              [String(kindCount), "kinds of site"],
              ["0", "lines of code"],
            ].map(([v, l]) => (
              <div key={l}>
                <dd className="display text-4xl md:text-5xl" style={{ color: "var(--paper)" }}>{v}</dd>
                <dt className="mt-2 font-mono text-[9px] font-bold uppercase" style={{ letterSpacing: "0.18em", color: "var(--cream-dim)" }}>{l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── TICKER ── */}
      <section aria-label="Template shelf ticker" className="overflow-hidden" style={{ background: "var(--accent)", color: "var(--ink)" }}>
        <div className="marquee py-3" role="presentation">
          <ul className="marquee-track items-center">
            {ticker.map((t, i) => (
              <li key={`${t.id}-${i}`} aria-hidden={i >= TEMPLATES.length} className="flex flex-none items-center">
                <span className="whitespace-nowrap px-6 font-mono text-[11px] font-bold uppercase" style={{ letterSpacing: "0.18em" }}>{t.name} · {t.category}</span>
                <span className="h-1.5 w-1.5 flex-none" style={{ background: "var(--ink)" }} aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── LIBRARY ── */}
      <section id="work" className="scroll-mt-20" style={{ background: "var(--paper)" }}>
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <SecHead index="01" eyebrow="The library" title={<>Start from something finished.</>} sub={`Live renders — what you see is the actual site. The shelf holds ${TEMPLATES.length} of them.`} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TEMPLATES.slice(0, 6).map((t, i) => (
              <article key={t.id} data-reveal style={{ transitionDelay: `${Math.min(i, 5) * 70}ms` }} className="card card-hover group flex min-w-0 flex-col overflow-hidden">
                <div className="relative h-52 overflow-hidden" style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-2)" }}>
                  <HeroCrop templateId={t.id} />
                  <Link href={`/templates/${t.id}`} aria-label={`Open ${t.name}`} className="absolute inset-0" />
                  <span className="mono-meta absolute left-3 top-3 px-2.5 py-1 font-mono text-[9px] font-bold uppercase" style={{ letterSpacing: "0.12em", background: "rgba(23,19,16,.85)", color: "var(--paper)" }}>
                    {String(i + 1).padStart(2, "0")} · {t.category}
                  </span>
                  {t.tier === "premium" && (
                    <span className="mono-meta absolute right-3 top-3 px-2.5 py-1 font-mono text-[9px] font-bold uppercase" style={{ letterSpacing: "0.12em", background: "var(--accent)", color: "var(--ink)" }}>Pro</span>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="display display-upper text-2xl">{t.name}</h3>
                  <p className="line-clamp-2 text-sm leading-relaxed" style={{ color: "var(--ink-2)" }}>{t.description}</p>
                  <p className="mono-meta font-mono text-[10px] font-bold uppercase" style={{ letterSpacing: "0.14em", color: "var(--ink-3)" }}>{t.sections.length} sections</p>
                  <div className="mt-auto flex gap-2.5 pt-3">
                    <Link href={`/templates/${t.id}`} className="btn-ghost flex-1 !h-11" style={{ fontSize: 12 }}>
                      Preview
                    </Link>
                    <Link href={`/new?template=${t.id}`} className="btn-primary flex-1 !h-11" style={{ fontSize: 12 }}>
                      Use →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-8" style={{ borderColor: "var(--line)" }}>
            <p className="font-mono text-[10px] font-bold uppercase" style={{ letterSpacing: "0.18em", color: "var(--ink-3)" }}>
              {TEMPLATES.length - 6} more on the shelf
            </p>
            <Link href="/templates" className="btn-dark group">
              Browse all {TEMPLATES.length} sites
              <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── PROCESS · ink band ── */}
      <section id="how" className="scroll-mt-20" style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <SecHead dark index="02" eyebrow="Process" title="Live in four moves." />
          <ol className="grid gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: "rgba(244,239,228,.14)", border: "1px solid rgba(244,239,228,.14)" }}>
            {STEPS.map((s, i) => (
              <li key={s.n} data-reveal style={{ transitionDelay: `${i * 80}ms`, background: "var(--ink)" }} className="grid content-start gap-3 p-7">
                <span className="font-mono text-[11px] font-bold" style={{ letterSpacing: "0.2em", color: "var(--accent)" }}>{s.n}</span>
                <h3 className="display display-upper text-[26px]" style={{ color: "var(--paper)" }}>{s.t}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--cream-dim)" }}>{s.d}</p>
              </li>
            ))}
          </ol>
          <div data-reveal className="mt-10 grid gap-8 border p-8 md:grid-cols-[1.2fr_1fr] md:p-10" style={{ borderColor: "rgba(244,239,228,.14)", background: "rgba(244,239,228,.03)" }}>
            <div>
              <p className="eyebrow" style={{ color: "var(--accent)" }}>The builder</p>
              <h3 className="display display-upper mt-3 text-3xl md:text-4xl" style={{ color: "var(--paper)" }}>Feels like a form. Looks like an agency.</h3>
              <ul className="mt-6 space-y-3 text-sm leading-relaxed" style={{ color: "var(--cream-dim)" }}>
                <li className="flex gap-3"><span style={{ color: "var(--accent)" }}>■</span>Every word, photo, price and hour is a plain field. Nothing to break.</li>
                <li className="flex gap-3"><span style={{ color: "var(--accent)" }}>■</span>Sections come from the template&apos;s own library, so taste is built in.</li>
                <li className="flex gap-3"><span style={{ color: "var(--accent)" }}>■</span>Full history, autosave, one-click publish when it feels right.</li>
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/new" className="btn-tan">Try the builder</Link>
                <Link href="/demo" className="btn-ghost !text-[#f4efe4]" style={{ borderColor: "rgba(244,239,228,.35)" }}>Live demo</Link>
              </div>
            </div>
            <div className="grid content-start gap-2.5 p-5" style={{ background: "var(--paper)", color: "var(--ink)" }}>
              <p className="mono-meta font-mono text-[10px] font-bold uppercase" style={{ letterSpacing: "0.16em", color: "var(--ink-3)" }}>Ember and Oak — menu section</p>
              {[
                ["Charred Sourdough", "Rs. 550"],
                ["Chicken Sekuwa Plate", "Rs. 1,150"],
                ["Juju Dhau", "Rs. 350"],
              ].map(([n, p]) => (
                <div key={n} className="flex items-baseline gap-2 border px-4 py-3 text-sm" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
                  <span className="font-semibold">{n}</span>
                  <span className="mx-1 flex-1 border-b border-dotted" style={{ borderColor: "var(--ink-3)" }} />
                  <span className="font-mono text-[13px] font-bold">{p}</span>
                </div>
              ))}
              <div className="flex flex-wrap gap-2 font-mono text-[10px] font-bold uppercase" style={{ letterSpacing: "0.1em" }}>
                <span className="px-3.5 py-2" style={{ background: "var(--ink)", color: "var(--paper)" }}>Publish</span>
                <span className="border px-3.5 py-2" style={{ borderColor: "var(--line-2)", color: "var(--ink-2)" }}>Duplicate</span>
                <span className="border px-3.5 py-2" style={{ borderColor: "var(--line-2)", color: "var(--ink-2)" }}>Variant: Grouped</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTES ── */}
      <section style={{ background: "var(--paper)" }}>
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <SecHead index="03" eyebrow="Wall of love" title={<>Namaste, new website.</>} />
          <div className="grid gap-5 md:grid-cols-3">
            {QUOTES.map(([m, n, r], i) => (
              <figure key={n} data-reveal style={{ transitionDelay: `${i * 90}ms` }} className="card card-hover flex flex-col p-7">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold" style={{ letterSpacing: "0.18em", color: "var(--accent-text)" }}>0{i + 1}</span>
                  <span aria-hidden className="text-xs" style={{ letterSpacing: "0.2em" }}>★★★★★</span>
                </div>
                <span className="display mt-5 text-6xl leading-none" style={{ color: "var(--accent)" }} aria-hidden>“</span>
                <blockquote className="flex-1 text-[16px] font-medium leading-relaxed">{m}</blockquote>
                <figcaption className="mt-6 border-t pt-4 text-sm" style={{ borderColor: "var(--line)" }}>
                  <span className="display display-upper text-base">{n}</span><br />
                  <span style={{ color: "var(--ink-2)" }}>{r}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES ── */}
      <section id="features" className="scroll-mt-20" style={{ background: "var(--surface-2)" }}>
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <SecHead index="04" eyebrow="Why it works" title={<>Opinionated, on purpose.</>} />
          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: "var(--line)", border: "1px solid var(--line)" }}>
            {PRINCIPLES.map((p, i) => (
              <div key={p.t} data-reveal style={{ transitionDelay: `${i * 70}ms`, background: "var(--surface)" }} className="grid content-start gap-3 p-7">
                <span className="grid h-11 w-11 place-items-center font-mono text-sm font-bold" style={{ background: "var(--ink)", color: "var(--paper)" }} aria-hidden>{p.n}</span>
                <h3 className="display display-upper text-xl">{p.t}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink-2)" }}>{p.d}</p>
              </div>
            ))}
          </div>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {["seo built-in", "undo / redo", "autosave", "image uploads", "custom domains", "analytics"].map((s) => (
              <li key={s} className="chip">{s}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="scroll-mt-20" style={{ background: "var(--paper)" }}>
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[0.8fr_1.2fr] md:py-28">
          <div className="md:sticky md:top-24 md:self-start">
            <SecHead index="05" eyebrow="Fair questions" title="Asked often." sub="Everything else is one click away in the builder. No sales calls, no setup fees." />
            <Link href="/templates" className="btn-dark">Browse the library →</Link>
          </div>
          <div style={{ borderTop: "2px solid var(--ink)" }}>
            {FAQS.map(([q, a], i) => (
              <details key={q} className="group" style={{ borderBottom: "1px solid var(--line-2)" }}>
                <summary className="flex cursor-pointer list-none items-center gap-5 py-6 [&::-webkit-details-marker]:hidden">
                  <span className="font-mono text-[10px] font-bold" style={{ color: "var(--accent-text)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="display flex-1 text-xl md:text-2xl" style={{ letterSpacing: "-0.02em", lineHeight: 1.15 }}>{q}</span>
                  <span aria-hidden className="grid h-9 w-9 flex-none place-items-center border text-lg transition-transform duration-300 group-open:rotate-45" style={{ borderColor: "var(--line-2)" }}>+</span>
                </summary>
                <div className="faq-a"><div><p className="max-w-2xl pb-7 pl-9 pr-4 text-sm leading-relaxed md:text-[15px]" style={{ color: "var(--ink-2)" }}>{a}</p></div></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA · tan band ── */}
      <section style={{ background: "var(--accent)" }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-8 px-6 py-16 md:py-20">
          <div data-reveal>
            <p className="font-mono text-[11px] font-bold uppercase" style={{ letterSpacing: "0.24em", color: "var(--ink)" }}>No code · No canvas · No kidding</p>
            <h2 className="display display-upper mt-3 max-w-[16ch]" style={{ fontSize: "clamp(36px,5.4vw,68px)", color: "var(--ink)" }}>
              Your website is waiting.
            </h2>
            <p className="mt-3 max-w-md font-medium" style={{ color: "rgba(23,19,16,.7)" }}>
              Pick one of {TEMPLATES.length} finished sites and publish your first page today. Starting is free.
            </p>
          </div>
          <div data-reveal className="flex flex-wrap gap-3">
            <Link href="/new" className="btn-primary !h-[54px]" style={{ padding: "0 32px" }}>Start building</Link>
            <Link href="/templates" className="btn-ghost !h-[54px]" style={{ padding: "0 32px", borderColor: "var(--ink)", color: "var(--ink)" }}>Browse sites</Link>
          </div>
        </div>
      </section>

      <Footer />
      </Reveal>
    </div>
  );
}
