import Link from "next/link";
import { Navbar, Footer } from "@/components/layout/chrome";
import { Reveal } from "@/components/layout/Reveal";
import { LiveCard } from "@/components/templates/LiveCard";
import { SECTION_META } from "@/components/templates/Renderer";
import { currentUser } from "@/lib/auth";
import { TEMPLATES } from "@/lib/templates";

const STEPS = [
  { n: "01", t: "Pick a whole site", d: "Not blocks — complete predesigned websites with their own components and copy." },
  { n: "02", t: "Drop in your content", d: "Fields, not code. Projects, menus, hours, testimonials — structured for you." },
  { n: "03", t: "Tune the voltage", d: "Variants, palettes, type and spacing. The design holds together no matter what." },
  { n: "04", t: "Publish", d: "One click to a fast public page. Edit and republish whenever." },
];

const PRINCIPLES = [
  { icon: "◧", t: "Whole sites, not parts", d: "Every template is a finished website with a coherent component library — never a blank canvas." },
  { icon: "◍", t: "Live everything", d: "Gallery cards, builder preview and published page render the same components." },
  { icon: "⬡", t: "Responsive by default", d: "Desktop, tablet and mobile fall out of every template automatically." },
  { icon: "✦", t: "Zero code", d: "Structured editing keeps every site professional. Undo, autosave, SEO included." },
];

/** Flat supporting hues — decorative surfaces only. Buttons, links and
 *  eyebrows stay on the single indigo brand accent. */
const TINTS = [
  { bg: "#fbe7d7", fg: "#9a3412", solid: "#9a3412" }, // clay
  { bg: "#dde9e2", fg: "#2d6a4f", solid: "#2d6a4f" }, // sage
  { bg: "#f3e7c8", fg: "#8a6414", solid: "#8a6414" }, // gold
  { bg: "#e7e9fb", fg: "#4338ca", solid: "#4338ca" }, // indigo
];

/** Category dot colors borrow each library template's own accent. */
const CATEGORY_DOTS: Record<string, string> = {
  portfolio: "#111111",
  business: "#2563eb",
  restaurant: "#ea580c",
  agency: "#7c3aed",
  saas: "#10b981",
  photography: "#18181b",
};

function SecHead({ index, eyebrow, title, sub, dark }: { index: string; eyebrow: string; title: React.ReactNode; sub?: string; dark?: boolean }) {
  return (
    <div className="mb-10 grid justify-items-center gap-4 text-center">
      <p className="eyebrow" style={dark ? { color: "var(--accent-soft)" } : undefined}>
        <span className="mono-meta" style={{ color: dark ? "#8f8b9e" : "var(--ink-3)" }}>{index}</span>
        <span aria-hidden className="h-px w-8" style={{ background: dark ? "rgba(244,243,239,.25)" : "var(--line-2)" }} />
        {eyebrow}
      </p>
      <h2 className="max-w-2xl text-4xl font-semibold md:text-5xl" style={dark ? { color: "#f4f3ef" } : undefined}>{title}</h2>
      {sub && <p className="max-w-[620px]" style={{ color: dark ? "#b9b8c2" : "var(--ink-2)" }}>{sub}</p>}
    </div>
  );
}

export default async function LandingPage() {
  const user = await currentUser();
  const styleCount = Object.values(SECTION_META).reduce((n, m) => n + m.variants.length, 0);
  return (
    <div className="min-h-screen">
      <Navbar user={user} />
      <Reveal>

      {/* Hero */}
      <section className="relative overflow-hidden pb-4 pt-16 md:pt-24" style={{ background: "var(--paper)", borderBottom: "1px solid var(--line)" }}>
        <div className="blueprint pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl justify-items-center gap-6 px-6 text-center">
          <Link href="/templates" className="pill group">
            <span className="tag">New</span>
            {TEMPLATES.length} predesigned sites — browse them live
            <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
          <h1 className="max-w-4xl font-bold" style={{ fontSize: "clamp(46px, 8vw, 96px)", lineHeight: 0.96 }}>
            Whole websites,
            <br />
            <span className="serif-accent" style={{ fontSize: "1.06em" }}>predesigned.</span>
          </h1>
          <p className="max-w-[660px] text-base md:text-lg" style={{ color: "var(--ink-2)" }}>
            Skip the blank canvas. Pick a complete site with its own components and copy,
            make it yours, and publish in minutes.
          </p>
          <div className="mt-1 flex flex-wrap justify-center gap-3">
            <Link href="/new" className="btn-primary" style={{ height: 52, padding: "0 26px", fontSize: 15 }}>
              Create your website
            </Link>
            <Link href="/templates" className="btn-ghost" style={{ height: 52, padding: "0 26px", fontSize: 15 }}>
              Explore templates
            </Link>
          </div>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {["portfolio", "business", "restaurant", "agency", "saas", "photography"].map((s) => (
              <li key={s} className="mono-meta inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs" style={{ borderColor: "var(--line-2)", color: "var(--ink-2)", background: "var(--surface)" }}>
                <i className="h-1.5 w-1.5 rounded-full" style={{ background: CATEGORY_DOTS[s] ?? "var(--accent)" }} />{s}
              </li>
            ))}
          </ul>
          <dl className="mt-8 grid max-w-full grid-cols-3 justify-items-center gap-x-2 border-t px-2 pt-6 sm:gap-x-6 sm:px-6" style={{ borderColor: "var(--line)" }}>
            {[
              [String(TEMPLATES.length), "complete sites"],
              [`${styleCount}+`, "section styles"],
              ["0", "lines of code"],
            ].map(([v, l], i) => (
              <div key={l} className="flex min-w-0 flex-col items-center gap-0.5 px-2 py-1 sm:px-7" style={{ borderLeft: i ? "1px solid var(--line-2)" : "none" }}>
                <dt className="mono-meta order-last text-center text-[10px] uppercase sm:text-[11px]" style={{ letterSpacing: "0.1em", color: "var(--ink-3)" }}>{l}</dt>
                <dd className="text-[22px] font-semibold sm:text-[26px]" style={{ letterSpacing: "-0.045em" }}>{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-col items-center gap-2" aria-hidden>
            <span className="mono-meta text-[10px] uppercase" style={{ letterSpacing: "0.22em", color: "var(--ink-3)" }}>Scroll</span>
            <span className="block h-8 w-px overflow-hidden" style={{ background: "var(--line-2)" }}>
              <span className="scroll-cue-line block h-3 w-px" style={{ background: "var(--accent)" }} />
            </span>
          </div>
        </div>

        {/* Browser-window showcase */}
        <div className="relative mx-auto mt-14 max-w-5xl px-6" data-reveal>
          <div className="card card-hover relative overflow-hidden text-left" style={{ borderRadius: "28px 28px 0 0", borderBottom: 0 }}>
            <div className="flex h-12 items-center gap-3.5 border-b px-5" style={{ borderColor: "var(--line)" }}>
              <span className="flex gap-[7px]">
                <i className="h-[11px] w-[11px] rounded-full" style={{ background: "#ff5f57", border: "1px solid rgba(0,0,0,.12)" }} />
                <i className="h-[11px] w-[11px] rounded-full" style={{ background: "#febc2e", border: "1px solid rgba(0,0,0,.12)" }} />
                <i className="h-[11px] w-[11px] rounded-full" style={{ background: "#28c840", border: "1px solid rgba(0,0,0,.12)" }} />
              </span>
              <span className="mono-meta mx-auto hidden rounded-full px-4 py-1 text-xs sm:inline" style={{ background: "var(--paper-2)", color: "var(--ink-3)" }}>
                create.io / builder
              </span>
              <span className="flex items-center gap-2 text-xs" style={{ color: "var(--ink-3)" }}>
                <i className="pulse-dot h-[7px] w-[7px] rounded-full bg-emerald-500 text-emerald-500" /> Live
              </span>
            </div>
            <div className="grid md:grid-cols-[210px_1fr_210px]">
              <div className="hidden border-r p-4 md:block" style={{ borderColor: "var(--line)" }}>
                {["Content", "Sections", "Design", "SEO", "Settings"].map((t, i) => (
                  <div key={t} className="mono-meta mb-1 rounded-[10px] px-2.5 py-2 text-[13px]" style={i === 0 ? { background: "var(--accent-soft)", color: "var(--accent-text)" } : { color: "var(--ink-2)" }}>
                    {t}
                  </div>
                ))}
                <div className="mt-4 space-y-2 border-t pt-4" style={{ borderColor: "var(--line)" }}>
                  {["Hero — Poster", "Cases — Editorial", "Team", "Contact"].map((s) => (
                    <div key={s} className="rounded-[10px] border px-2.5 py-2 font-mono text-[11px]" style={{ borderColor: "var(--line)", color: "var(--ink-2)" }}>≡ {s}</div>
                  ))}
                </div>
              </div>
              <div className="p-8 md:p-10" style={{ background: "var(--paper)" }}>
                <p className="eyebrow">Booking Q3 projects</p>
                <p className="mt-3 text-4xl font-bold md:text-5xl">We ship brands that win</p>
                <p className="mt-3 max-w-md text-sm" style={{ color: "var(--ink-2)" }}>
                  Brand, website and product under one roof. Senior team only, no hand-offs, no bloat.
                </p>
                <div className="mt-6 flex gap-2.5">
                  <span className="btn-primary" style={{ height: 38, fontSize: 13 }}>See the work</span>
                  <span className="btn-ghost" style={{ height: 38, fontSize: 13 }}>Our process</span>
                </div>
              </div>
              <div className="hidden border-l p-4 md:block" style={{ borderColor: "var(--line)" }}>
                <p className="mono-meta text-[11px] uppercase" style={{ letterSpacing: "0.12em", color: "var(--ink-3)" }}>Palette</p>
                <div className="mt-3 flex gap-2">
                  {["#17171b", "#4f46e5", "#7c2d12", "#064e3b", "#1e3a5f"].map((c) => (
                    <span key={c} className="h-6 w-6 rounded-full border" style={{ background: c, borderColor: "var(--line-2)" }} />
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-9 rounded-[10px]" style={{ background: "var(--surface-2)" }} />
                  <div className="h-9 rounded-[10px]" style={{ background: "var(--surface-2)" }} />
                  <div className="h-9 rounded-[10px]" style={{ background: "var(--surface-2)" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="mx-auto max-w-7xl px-6" style={{ paddingTop: 72 }}>
        <p className="mono-meta text-center text-[11px] uppercase" style={{ letterSpacing: "0.16em", color: "var(--ink-3)" }}>
          Powering new sites from Mechi to Mahakali
        </p>
        <div className="marquee mt-5" role="presentation">
          <ul className="marquee-track">
            {["freelancers", "trekking guides", "thakali kitchens", "saas startups", "photographers", "consultants", "event planners"].map((s, i) => (
              <li key={s} className="flex-none rounded-full px-4 py-1.5 text-[13px] font-semibold text-white" style={{ background: TINTS[i % TINTS.length].solid }}>{s}</li>
            ))}
            {["freelancers", "trekking guides", "thakali kitchens", "saas startups", "photographers", "consultants", "event planners"].map((s, i) => (
              <li key={`dup-${s}`} aria-hidden className="flex-none rounded-full px-4 py-1.5 text-[13px] font-semibold text-white" style={{ background: TINTS[i % TINTS.length].solid }}>{s}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Site kits */}
      <section style={{ background: "var(--surface-2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", marginTop: 120 }}>
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <SecHead index="01" eyebrow="The library" title={<>Start from something <span className="serif-accent">finished.</span></>} sub="Live renders below — what you see is the actual site, with its own components and copy." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((t, i) => (
            <div key={t.id} data-reveal style={{ transitionDelay: `${Math.min(i, 5) * 70}ms` }} className="card card-hover group relative flex flex-col overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden" style={{ borderBottom: "1px solid var(--line)" }}>
                <LiveCard templateId={t.id} />
                <Link href={`/templates/${t.id}`} aria-label={`Open ${t.name}`} className="absolute inset-0" />
                <span className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span className="rounded-full bg-white/95 px-4 py-1.5 text-[13px] font-semibold text-neutral-900 shadow-lg">Open live preview →</span>
                </span>
              </div>
              <div className="flex items-center gap-3.5 border-t p-[18px_20px]" style={{ borderColor: "var(--line)" }}>
                <span className="grid h-10 w-10 flex-none place-items-center rounded-[13px] text-sm font-bold text-white" style={{ background: t.theme.primary }} aria-hidden>
                  {t.name.slice(0, 1)}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-[17px] font-semibold">{t.name}</h3>
                  <p className="truncate text-[13.5px]" style={{ color: "var(--ink-2)" }}>{t.description}</p>
                </div>
                <span className="mono-meta rounded-full border px-2.5 py-[3px] text-xs" style={{ borderColor: "var(--line-2)", color: "var(--ink-2)" }}>
                  {t.sections.length}
                </span>
                <span className="grid h-9 w-9 flex-none place-items-center rounded-full transition-all group-hover:rotate-45" style={{ background: "var(--surface-2)", color: "var(--ink-2)" }} aria-hidden>
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-7xl scroll-mt-24 px-6" style={{ paddingTop: 120 }}>
        <SecHead index="02" eyebrow="Process" title="Live in four moves" />
        <ol className="grid gap-3.5 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.n} className="card-hover grid content-start gap-2.5 overflow-hidden rounded-[20px] border p-[26px]" data-reveal style={{ transitionDelay: `${i * 80}ms`, background: TINTS[i % TINTS.length].bg, borderColor: TINTS[i % TINTS.length].bg }}>
              <span className="mb-2.5 grid place-items-center bg-white font-mono text-sm font-bold transition-transform duration-300 hover:-rotate-12 hover:scale-110" style={{ width: 46, height: 46, borderRadius: 15, color: TINTS[i % TINTS.length].fg }}>{s.n.slice(1)}</span>
              <h3 className="text-[17px] font-semibold">{s.t}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--ink-2)" }}>{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Builder deep-dive */}
      <section className="mx-auto max-w-7xl px-6" style={{ paddingTop: 120 }}>
        <div className="card grid gap-10 overflow-hidden p-8 md:grid-cols-2 md:p-12" data-reveal>
          <div>
            <p className="eyebrow">03 · The builder</p>
            <h2 className="mt-3 max-w-md text-4xl font-semibold md:text-5xl">
              Feels like filling a form. <span className="serif-accent">Looks like hiring an agency.</span>
            </h2>
            <ul className="mt-7 space-y-3.5">
              {[
                ["Edit anything", "Every word, photo, price and hour is a plain field. Nothing to break."],
                ["Signature stays intact", "Sections come from the template's own library, so taste is built in."],
                ["Undo everything", "Full history, autosave, and one-click publish when it feels right."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-3.5">
                  <span className="icon-tile" aria-hidden>✓</span>
                  <div>
                    <p className="font-semibold" style={{ letterSpacing: "-0.015em" }}>{t}</p>
                    <p className="text-sm" style={{ color: "var(--ink-2)" }}>{d}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/new" className="btn-primary mt-8" style={{ height: 46, padding: "0 22px" }}>Try the builder</Link>
          </div>
          <div className="grid content-start gap-3 rounded-[20px] border p-5" style={{ borderColor: "var(--line)", background: "var(--paper)" }}>
            <p className="mono-meta text-[11px] uppercase" style={{ letterSpacing: "0.12em", color: "var(--ink-3)" }}>Ember and Oak — menu section</p>
            {[
              ["Charred Sourdough", "Rs. 550"],
              ["Chicken Sekuwa Plate", "Rs. 1,150"],
              ["Juju Dhau", "Rs. 350"],
            ].map(([n, p]) => (
              <div key={n} className="flex items-baseline gap-2 rounded-xl border bg-white px-4 py-3 text-sm" style={{ borderColor: "var(--line)" }}>
                <span className="font-medium">{n}</span>
                <span className="mx-1 flex-1 border-b border-dotted" style={{ borderColor: "var(--ink-3)" }} />
                <span className="font-mono text-[13px] font-semibold">{p}</span>
              </div>
            ))}
            <div className="flex gap-2">
              <span className="rounded-lg px-3 py-2 text-center text-xs font-semibold text-white" style={{ background: "var(--ink)" }}>Hide</span>
              <span className="rounded-lg border px-3 py-2 text-center text-xs font-medium" style={{ borderColor: "var(--line-2)" }}>Duplicate</span>
              <span className="rounded-lg border px-3 py-2 text-center text-xs font-medium" style={{ borderColor: "var(--line-2)" }}>Variant: Grouped</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ background: "var(--ink)", marginTop: 120 }}>
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <SecHead dark index="04" eyebrow="Wall of love" title={<>Namaste, <span className="serif-accent">new website.</span></>} />
        <div className="grid gap-3.5 md:grid-cols-3">
          {[
            ["I published my trekking site between two bus rides to Pokhara. Bookings came before I got home.", "Binod Thapa", "Guide, Himalayan Trails"],
            ["Clients think I hired an agency in Jhamsikhel. It was me, on a Sunday, with chiya.", "Sabina Karki", "Designer, Lalitpur"],
            ["Our momo menu finally looks as good as it tastes. Weekend covers are up.", "Tashi Sherpa", "Owner, Lakeside Kitchen"],
          ].map(([m, n, r], i) => (
            <figure key={n} data-reveal style={{ transitionDelay: `${i * 90}ms` }} className="card card-hover flex flex-col p-[26px]">
              <span aria-hidden className="text-sm tracking-[0.2em]" style={{ color: "var(--accent)" }}>★★★★★</span>
              <span className="serif-accent mt-1 text-3xl" aria-hidden style={{ color: TINTS[(i + 1) % TINTS.length].solid }}>“</span>
              <blockquote className="flex-1 text-[15px] leading-relaxed">{m}</blockquote>
              <figcaption className="mt-5 border-t pt-4 text-sm" style={{ borderColor: "var(--line)" }}>
                <span className="font-semibold">{n}</span><br />
                <span style={{ color: "var(--ink-2)" }}>{r}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        </div>
      </section>

      {/* Principles */}
      <section id="features" className="mx-auto max-w-7xl scroll-mt-24 px-6" style={{ paddingTop: 120 }}>
        <SecHead index="05" eyebrow="Why it works" title={<>Opinionated, <span className="serif-accent">on purpose.</span></>} />
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <div key={p.t} data-reveal style={{ transitionDelay: `${i * 70}ms`, background: TINTS[(i + 2) % TINTS.length].bg, borderColor: TINTS[(i + 2) % TINTS.length].bg }} className="card-hover grid content-start gap-2.5 overflow-hidden rounded-[20px] border p-[26px]">
              <span className="mb-2.5 grid place-items-center bg-white text-lg transition-transform duration-300 hover:-rotate-12 hover:scale-110" style={{ width: 46, height: 46, borderRadius: 15, color: TINTS[(i + 2) % TINTS.length].fg }} aria-hidden>{p.icon}</span>
              <h3 className="text-[17px] font-semibold">{p.t}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--ink-2)" }}>{p.d}</p>
            </div>
          ))}
        </div>
        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          {["seo built-in", "undo / redo", "autosave", "image uploads", "custom domains", "analytics"].map((s) => (
            <li key={s} className="mono-meta rounded-full border px-3.5 py-1.5 text-xs" style={{ borderColor: "var(--line-2)", color: "var(--ink-2)" }}>{s}</li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section style={{ background: "var(--surface-2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", marginTop: 120 }}>
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <SecHead index="06" eyebrow="Fair questions" title={<>Asked <span className="serif-accent">often.</span></>} />
        <div className="divide-y border-y" style={{ borderColor: "var(--line)" }}>
          {[
            ["Do I need to write any code?", "Never. If you can fill a form and upload a photo, you can ship a site."],
            ["Can I use my own domain?", "Yes. Point your domain at us from the builder settings — .com.np works too."],
            ["What does it cost?", "Starting is free. Paid plans unlock premium sites, custom domains and analytics."],
            ["I run a shop in Asan, not a startup. Will this work?", "That is exactly who it is for. Menus, hours, price lists and contact pages are first-class."],
          ].map(([q, a]) => (
            <details key={q} className="group py-5">
              <summary className="cursor-pointer list-none font-semibold transition-colors hover:text-black [&::-webkit-details-marker]:hidden" style={{ letterSpacing: "-0.015em" }}>{q}<span className="float-right opacity-40 transition-transform duration-300 group-open:rotate-45">＋</span></summary>
              <div className="faq-a"><div><p className="pt-2 text-sm leading-relaxed" style={{ color: "var(--ink-2)" }}>{a}</p></div></div>
            </details>
          ))}
        </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6" style={{ paddingTop: 120 }}>
        <div className="relative grid justify-items-center gap-[18px] overflow-hidden px-6 py-[92px] text-center" data-reveal style={{ borderRadius: 36, background: "var(--ink)", color: "#f4f3ef" }}>
          <p className="eyebrow relative" style={{ color: "var(--accent-soft)" }}>No code · No canvas · No kidding</p>
          <h2 className="relative max-w-2xl font-semibold" style={{ fontSize: "clamp(38px, 6vw, 72px)", lineHeight: 1, letterSpacing: "-0.055em" }}>
            Your website is <span className="serif-accent">waiting.</span>
          </h2>
          <p className="relative max-w-[620px]" style={{ color: "#b9b8c2" }}>
            Pick a finished site and publish your first page today.
          </p>
          <div className="relative mt-2.5 flex flex-wrap justify-center gap-3">
            <Link href="/new" className="btn-primary" style={{ height: 52, padding: "0 26px", fontSize: 15, background: "#f4f3ef", color: "var(--ink)" }}>Start building</Link>
            <Link href="/templates" className="btn-ghost" style={{ height: 52, padding: "0 26px", fontSize: 15, background: "transparent", color: "#f4f3ef", borderColor: "rgba(244,243,239,.3)" }}>Browse sites</Link>
          </div>
        </div>
      </section>

      <Footer />
      </Reveal>
    </div>
  );
}
