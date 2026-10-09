import Link from "next/link";
import { SiteNavbar, Footer } from "@/components/layout/chrome";
import { Reveal } from "@/components/layout/Reveal";
import { TEMPLATES } from "@/lib/templates";

export const metadata = {
  title: "Try a live demo — create.io",
  description: "Pick any site and edit it live in your browser. No signup needed.",
};

export default function DemoChooserPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--paper)" }}>
      <SiteNavbar />
      <Reveal>
        <div style={{ background: "var(--ink)", color: "var(--paper)" }}>
          <div className="mx-auto max-w-6xl px-6 pb-12 pt-12 text-center md:pt-16">
            <p className="eyebrow eyebrow-center justify-center" style={{ color: "var(--accent)" }}>Guest mode</p>
            <h1 className="display display-upper mx-auto mt-4 max-w-[14ch]" style={{ fontSize: "clamp(38px,5.6vw,68px)", color: "var(--paper)" }}>
              Pick a site. Edit it live.
            </h1>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed" style={{ color: "var(--cream-dim)" }}>
              No account, no setup. Choose any finished site below and the full builder
              opens with real content — every change saves in this browser.
            </p>
            <div className="mx-auto mt-9 grid max-w-4xl gap-px text-left sm:grid-cols-3" style={{ background: "rgba(244,239,228,.14)", border: "1px solid rgba(244,239,228,.14)" }}>
              {[
                ["01 · Pick", "Choose the site closest to what you need."],
                ["02 · Edit", "Click any section — fields appear instantly."],
                ["03 · Keep", "Sign up anytime to save and publish."],
              ].map(([t, d]) => (
                <div key={t} className="p-5" style={{ background: "var(--ink)" }}>
                  <p className="font-mono text-[10px] font-bold uppercase" style={{ letterSpacing: "0.2em", color: "var(--accent)" }}>{t}</p>
                  <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--cream-dim)" }}>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 py-10">
          <p aria-live="polite" className="mono-meta mb-5 font-mono text-[10px] font-bold uppercase" style={{ letterSpacing: "0.18em", color: "var(--ink-3)" }}>
            {TEMPLATES.length} sites · all editable
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TEMPLATES.map((t, i) => (
              <article key={t.id} data-reveal className="card card-hover group flex min-w-0 flex-col overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid var(--line)" }}>
                  <span className="grid h-11 w-11 flex-none place-items-center font-mono text-sm font-bold" style={{ background: "var(--ink)", color: "var(--paper)" }} aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="display display-upper truncate text-lg">{t.name}</p>
                    <p className="mono-meta font-mono text-[10px] font-bold uppercase" style={{ letterSpacing: "0.1em", color: "var(--ink-3)" }}>{t.category} · {t.sections.length} sections</p>
                  </div>
                </div>
                <div className="px-5 py-3.5">
                  <p className="line-clamp-2 text-[13.5px] leading-relaxed" style={{ color: "var(--ink-2)" }}>{t.description}</p>
                </div>
                <div className="mt-auto flex gap-2.5 border-t px-4 py-3" style={{ borderColor: "var(--line)" }}>
                  <Link href={`/templates/${t.id}`} className="btn-ghost flex-1 !h-11" style={{ fontSize: 12 }}>
                    Preview
                  </Link>
                  <Link href={`/demo/${t.id}`} className="btn-primary flex-1 !h-11" style={{ fontSize: 12 }}>
                    Edit demo
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-12 grid max-w-2xl justify-items-center gap-4 px-6 py-12 text-center" style={{ background: "var(--surface-2)" }}>
            <p className="eyebrow eyebrow-center">Keep your work</p>
            <p className="display display-upper max-w-md text-3xl md:text-4xl">Guest edits stay in this browser.</p>
            <p className="max-w-md text-[15px] leading-relaxed" style={{ color: "var(--ink-2)" }}>
              Create a free account to save, publish and share your site with the world.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <Link href="/signup" className="btn-primary">Sign up free</Link>
              <Link href="/login" className="btn-ghost">Log in</Link>
            </div>
          </div>
        </div>
      </Reveal>
      <Footer />
    </div>
  );
}
