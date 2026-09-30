import Link from "next/link";
import { Navbar, Footer } from "@/components/layout/chrome";
import { currentUser } from "@/lib/auth";
import { TEMPLATES } from "@/lib/templates";

export default async function LandingPage() {
  const user = await currentUser();
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar user={user} />

      {/* Hero */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-20 text-center md:pt-28">
          <p className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Templates → Customize → Preview → Publish
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-neutral-900 md:text-6xl">
            Build a website without building it from scratch.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg">
            Choose a professionally designed template, add your content, customize the look, and publish your website in minutes.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/new" className="rounded-xl bg-neutral-900 px-6 py-3 text-[15px] font-medium text-white hover:bg-neutral-700">
              Create Your Website
            </Link>
            <Link href="/templates" className="rounded-xl border border-neutral-200 bg-white px-6 py-3 text-[15px] font-medium text-neutral-900 hover:border-neutral-400">
              Explore Templates
            </Link>
          </div>

          {/* Builder visual demo */}
          <div className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-2xl border border-neutral-200 bg-white text-left shadow-sm">
            <div className="flex items-center gap-1.5 border-b border-neutral-200 bg-neutral-50 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
              <span className="ml-3 text-xs text-neutral-500">create.io / builder — minimal-portfolio</span>
              <span className="ml-auto hidden gap-2 md:flex">
                <span className="rounded-md bg-neutral-900 px-2.5 py-1 text-[11px] font-medium text-white">Preview</span>
                <span className="rounded-md border border-neutral-200 px-2.5 py-1 text-[11px] font-medium">Publish</span>
              </span>
            </div>
            <div className="grid md:grid-cols-[220px_1fr_220px]">
              <div className="hidden border-r border-neutral-200 bg-white p-4 md:block">
                {["Content", "Sections", "Design", "Pages", "SEO"].map((t, i) => (
                  <div key={t} className={`mb-1 rounded-lg px-3 py-2 text-[13px] ${i === 1 ? "bg-neutral-900 font-medium text-white" : "text-neutral-600"}`}>{t}</div>
                ))}
                <div className="mt-4 space-y-2 border-t border-neutral-100 pt-4">
                  {["Hero — Split", "About", "Projects — Grid", "Contact"].map((s) => (
                    <div key={s} className="rounded-lg border border-neutral-200 px-3 py-2 text-xs text-neutral-600">☰ {s}</div>
                  ))}
                </div>
              </div>
              <div className="bg-[#f7f7f6] p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">Available for new projects</p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-neutral-900">Designing clarity out of complexity</p>
                <p className="mt-2 text-sm text-neutral-600">Product Designer & Developer — I help teams ship thoughtful websites.</p>
                <div className="mt-5 flex gap-2">
                  <span className="rounded-lg bg-neutral-900 px-4 py-2 text-xs font-medium text-white">View my work</span>
                  <span className="rounded-lg border border-neutral-300 px-4 py-2 text-xs font-medium">Get in touch</span>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {["Projects", "About", "Contact"].map((b) => (
                    <div key={b} className="rounded-xl border border-neutral-200 bg-white p-4">
                      <div className="h-2 w-10 rounded bg-neutral-200" />
                      <div className="mt-2 text-xs font-medium text-neutral-700">{b}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden border-l border-neutral-200 bg-white p-4 md:block">
                <p className="text-xs font-semibold text-neutral-900">Design</p>
                <div className="mt-3 flex gap-1.5">{["#111", "#0c4a6e", "#1a3c2e", "#7c2d12", "#2563eb"].map((c) => <span key={c} className="h-6 w-6 rounded-full border border-neutral-200" style={{ background: c }} />)}</div>
                <div className="mt-4 space-y-2">
                  <div className="h-8 rounded-lg bg-neutral-100" />
                  <div className="h-8 rounded-lg bg-neutral-100" />
                  <div className="h-8 rounded-lg bg-neutral-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Template showcase */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Start from something great</h2>
            <p className="mt-1 text-sm text-neutral-600">Professionally designed templates. Structured customization that preserves quality.</p>
          </div>
          <Link href="/templates" className="hidden text-sm font-medium text-neutral-900 underline sm:block">Browse all templates →</Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.slice(0, 6).map((t) => (
            <Link key={t.id} href={`/templates/${t.id}`} className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:border-neutral-400">
              <div className="aspect-[16/10] p-6" style={{ background: t.thumbnailGradient }}>
                <div className="h-full rounded-xl border border-black/5 bg-white/80 p-4 shadow-sm">
                  <div className="h-2 w-16 rounded bg-neutral-900/80" />
                  <div className="mt-3 h-4 w-3/4 rounded bg-neutral-900/10" />
                  <div className="mt-2 h-4 w-1/2 rounded bg-neutral-900/10" />
                  <div className="mt-4 flex gap-2">
                    <div className="h-7 w-20 rounded-md bg-neutral-900" />
                    <div className="h-7 w-20 rounded-md border border-neutral-300" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{t.name}</h3>
                  <span className="rounded-full border border-neutral-200 px-2 py-0.5 text-[11px] text-neutral-600">{t.category}</span>
                </div>
                <p className="mt-1.5 line-clamp-2 text-sm text-neutral-600">{t.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-y border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">How it works</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {[
              { n: "1", t: "Choose a template", d: "Browse by category — portfolio, business, restaurant, agency and more." },
              { n: "2", t: "Add your content", d: "Enter your info, projects, services and photos. No code, just fields." },
              { n: "3", t: "Make it yours", d: "Switch variants, tune colors, fonts and spacing. Preview instantly." },
              { n: "4", t: "Publish", d: "Get a live link in one click. Update and republish anytime." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-neutral-200 p-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-white">{s.n}</span>
                <h3 className="mt-4 font-semibold">{s.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-2xl font-semibold tracking-tight">Everything you need, nothing you don&apos;t</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Professional templates", "Real layouts with variants — not blank canvases."],
            ["Live customization", "Every change renders instantly in the preview."],
            ["Responsive by default", "Desktop, tablet and mobile handled automatically."],
            ["SEO controls", "Meta title, description, social cards and sitemap built in."],
            ["Fast publishing", "One click to a lightweight public page."],
            ["No coding required", "Structured editing keeps every site looking professional."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h3 className="font-semibold">{t}</h3>
              <p className="mt-1.5 text-sm text-neutral-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Your website is waiting.</h2>
          <p className="mt-3 text-neutral-600">Pick a template and publish your first page today.</p>
          <Link href="/new" className="mt-7 inline-block rounded-xl bg-neutral-900 px-7 py-3 font-medium text-white hover:bg-neutral-700">
            Start Building
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
