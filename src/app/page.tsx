import Link from "next/link";
import { Navbar, Footer } from "@/components/layout/chrome";
import { Reveal } from "@/components/layout/Reveal";
import { LiveCard } from "@/components/templates/LiveCard";
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

export default async function LandingPage() {
  const user = await currentUser();
  return (
    <div className="min-h-screen">
      <Navbar user={user} />
      <Reveal>

      {/* Hero */}
      <section className="relative overflow-hidden pb-4 pt-16 md:pt-24">
        <div className="dotgrid pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl justify-items-center gap-6 px-6 text-center">
          <Link href="/templates" className="pill">
            <span className="tag">New</span>
            6 predesigned sites — browse them live
            <span aria-hidden>→</span>
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
              <li key={s} className="mono-meta inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs" style={{ borderColor: "var(--line-2)", color: "var(--ink-2)" }}>
                <i className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--grad)" }} />{s}
              </li>
            ))}
          </ul>
          <dl className="mt-6 flex flex-wrap justify-center">
            {[
              ["6", "complete sites"],
              ["50+", "predesigned sections"],
              ["0", "lines of code"],
            ].map(([v, l], i) => (
              <div key={l} className="grid gap-0.5 px-7 py-1" style={{ borderLeft: i ? "1px solid var(--line-2)" : "none" }}>
                <dd className="order-first text-[26px] font-semibold" style={{ letterSpacing: "-0.045em" }}>{v}</dd>
                <dt className="mono-meta text-[11px] uppercase" style={{ letterSpacing: "0.1em", color: "var(--ink-3)" }}>{l}</dt>
              </div>
            ))}
          </dl>
        </div>

        {/* Browser-window showcase */}
        <div className="relative mx-auto mt-14 max-w-5xl px-6">
          <div className="pointer-events-none absolute inset-x-[10%] -top-8 h-44 rounded-full opacity-30 blur-[90px]" style={{ background: "var(--grad)" }} aria-hidden />
          <div className="card relative overflow-hidden text-left" style={{ borderRadius: "28px 28px 0 0", borderBottom: 0 }}>
            <div className="flex h-12 items-center gap-3.5 border-b px-5" style={{ borderColor: "var(--line)" }}>
              <span className="flex gap-[7px]">
                <i className="h-[11px] w-[11px] rounded-full" style={{ background: "var(--surface-2)", border: "1px solid var(--line-2)" }} />
                <i className="h-[11px] w-[11px] rounded-full" style={{ background: "var(--surface-2)", border: "1px solid var(--line-2)" }} />
                <i className="h-[11px] w-[11px] rounded-full" style={{ background: "var(--surface-2)", border: "1px solid var(--line-2)" }} />
              </span>
              <span className="mono-meta mx-auto hidden rounded-full px-4 py-1 text-xs sm:inline" style={{ background: "var(--paper-2)", color: "var(--ink-3)" }}>
                create.io / builder
              </span>
              <span className="flex items-center gap-2 text-xs" style={{ color: "var(--ink-3)" }}>
                <i className="h-[7px] w-[7px] rounded-full bg-emerald-500" /> Live
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

      {/* Site kits */}
      <section className="mx-auto max-w-7xl px-6" style={{ paddingTop: 120 }}>
        <div className="mb-10 grid justify-items-center gap-4 text-center">
          <p className="eyebrow">The library</p>
          <h2 className="max-w-2xl text-4xl font-semibold md:text-5xl">
            Start from something <span className="serif-accent">finished.</span>
          </h2>
          <p className="max-w-[620px]" style={{ color: "var(--ink-2)" }}>
            Live renders below — what you see is the actual site, with its own components and copy.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((t) => (
            <div key={t.id} className="card card-hover group relative flex flex-col overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden" style={{ borderBottom: "1px solid var(--line)" }}>
                <LiveCard templateId={t.id} />
                <Link href={`/templates/${t.id}`} aria-label={`Open ${t.name}`} className="absolute inset-0" />
              </div>
              <div className="flex items-center gap-3.5 border-t p-[18px_20px]" style={{ borderColor: "var(--line)" }}>
                <span className="icon-tile" aria-hidden>{t.name.slice(0, 1)}</span>
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
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-7xl px-6" style={{ paddingTop: 120 }}>
        <div className="mb-10 grid justify-items-center gap-4 text-center">
          <p className="eyebrow">Process</p>
          <h2 className="max-w-xl text-4xl font-semibold md:text-5xl">Live in four moves</h2>
        </div>
        <ol className="grid gap-3.5 md:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s.n} className="card card-hover grid content-start gap-2.5 p-[26px]" data-reveal>
              <span className="icon-tile mb-2.5" style={{ width: 46, height: 46, borderRadius: 15 }}>{s.n.slice(1)}</span>
              <h3 className="text-[17px] font-semibold">{s.t}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--ink-2)" }}>{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Principles */}
      <section id="features" className="mx-auto max-w-7xl px-6" style={{ paddingTop: 120 }}>
        <div className="mb-10 grid justify-items-center gap-4 text-center">
          <p className="eyebrow">Why it works</p>
          <h2 className="max-w-xl text-4xl font-semibold md:text-5xl">Opinionated, <span className="serif-accent">on purpose.</span></h2>
        </div>
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p) => (
            <div key={p.t} className="card card-hover grid content-start gap-2.5 p-[26px]">
              <span className="icon-tile mb-2.5" aria-hidden>{p.icon}</span>
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

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6" style={{ paddingTop: 120 }}>
        <div className="card relative grid justify-items-center gap-[18px] overflow-hidden px-6 py-[92px] text-center" style={{ borderRadius: 36 }}>
          <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(60% 120% at 12% 0%, rgba(79,70,229,.16), transparent 60%), radial-gradient(60% 120% at 88% 100%, rgba(147,51,234,.14), transparent 60%)" }} aria-hidden />
          <p className="eyebrow relative">No code · No canvas · No kidding</p>
          <h2 className="relative max-w-2xl font-semibold" style={{ fontSize: "clamp(38px, 6vw, 72px)", lineHeight: 1, letterSpacing: "-0.055em" }}>
            Your website is <span className="serif-accent">waiting.</span>
          </h2>
          <p className="relative max-w-[620px]" style={{ color: "var(--ink-2)" }}>
            Pick a finished site and publish your first page today.
          </p>
          <div className="relative mt-2.5 flex flex-wrap justify-center gap-3">
            <Link href="/new" className="btn-primary" style={{ height: 52, padding: "0 26px", fontSize: 15 }}>Start building</Link>
            <Link href="/templates" className="btn-ghost" style={{ height: 52, padding: "0 26px", fontSize: 15 }}>Browse sites</Link>
          </div>
        </div>
      </section>

      <Footer />
      </Reveal>
    </div>
  );
}
