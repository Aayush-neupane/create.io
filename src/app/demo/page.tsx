import Link from "next/link";
import { SiteNavbar, Footer } from "@/components/layout/chrome";
import { Reveal } from "@/components/layout/Reveal";
import { TEMPLATES } from "@/lib/templates";

export const metadata = {
  title: "Try a live demo — create.io",
  description: "Pick any site and edit it live in your browser. No signup needed.",
};

const TINTS = [
  { bg: "#fbe7d7", fg: "#9a3412" }, // clay
  { bg: "#dde9e2", fg: "#2d6a4f" }, // sage
  { bg: "#f3e7c8", fg: "#8a6414" }, // gold
];

export default function DemoChooserPage() {
  return (
    <div className="marketing-theme min-h-screen bg-background text-foreground">
      <SiteNavbar />
      <Reveal>
        <div className="border-b border-border bg-[#e8dfcf]">
          <div className="mx-auto max-w-shell px-6 pb-10 pt-14 sm:px-10 lg:px-16 xl:px-20">
            <div className="grid justify-items-center gap-4 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                01 · Guest mode
              </p>
              <h1 className="max-w-2xl font-serif text-[clamp(2.8rem,5vw,4.5rem)] font-normal leading-[0.95]">
                Pick a site. Edit it live.
              </h1>
              <p className="max-w-[600px] text-[15px] text-muted">
                No account, no setup. Choose any finished site below and the full builder
                opens with real content — every change saves in this browser.
              </p>
            </div>

            <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
            {[
              ["Pick", "Choose the site closest to what you need."],
              ["Edit", "Click any section in the preview — fields appear instantly."],
              ["Keep", "Sign up anytime to save, publish and share."],
            ].map(([t, d], i) => (
              <div key={t} className="rounded-[20px] border p-5 text-center" style={{ background: TINTS[i % TINTS.length].bg, borderColor: TINTS[i % TINTS.length].bg }}>
                <p className="mono-meta grid mx-auto place-items-center bg-white text-[11px] font-bold" style={{ width: 30, height: 30, borderRadius: 10, color: TINTS[i % TINTS.length].fg }}>0{i + 1}</p>
                <p className="mt-2 font-semibold" style={{ letterSpacing: "-0.015em" }}>{t}</p>
                <p className="mt-1 text-[13px] leading-relaxed" style={{ color: "var(--ink-2)" }}>{d}</p>
              </div>
            ))}
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-shell px-6 py-10 sm:px-10 lg:px-16 xl:px-20">

          <p aria-live="polite" className="mono-meta mb-4 text-xs" style={{ color: "var(--ink-3)" }}>
            {TEMPLATES.length} sites · all editable
          </p>
          <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {TEMPLATES.map((t) => (
              <article key={t.id} className="kit-card group flex min-w-0 flex-col overflow-hidden border border-border bg-surface">
                <div className="relative flex h-28 items-center gap-3 overflow-hidden px-5" style={{ borderBottom: "1px solid var(--line)", background: t.theme.surface }}>
                  <span className="grid h-12 w-12 flex-none place-items-center rounded-2xl text-lg font-bold text-white" style={{ background: t.theme.primary }} aria-hidden>
                    {t.name.slice(0, 1)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold" style={{ fontFamily: `'${t.theme.fontHeading}', sans-serif`, letterSpacing: "-0.02em", color: t.theme.text }}>{t.name}</p>
                    <p className="mono-meta text-[10.5px] uppercase" style={{ letterSpacing: "0.08em", color: t.theme.muted }}>{t.category} · {t.sections.length} sections</p>
                  </div>
                  <span className="ml-auto flex flex-none gap-1.5" aria-hidden>
                    {[t.theme.primary, t.theme.accent, t.theme.background].map((c, i) => (
                      <i key={i} className="h-5 w-5 rounded-full border" style={{ background: c, borderColor: "var(--line-2)" }} />
                    ))}
                  </span>
                </div>
                <div className="px-5 py-3.5">
                  <p className="text-[13.5px] leading-relaxed" style={{ color: "var(--ink-2)" }}>{t.description}</p>
                </div>
                <div className="mt-auto flex gap-2 border-t px-[14px] py-3" style={{ borderColor: "var(--line)" }}>
                  <Link href={`/templates/${t.id}`} className="flex-1 rounded-[9px] border px-3 py-2 text-center text-[13px] font-medium transition-colors" style={{ borderColor: "var(--line-2)" }}>
                    Preview
                  </Link>
                  <Link href={`/demo/${t.id}`} className="btn-primary flex-1" style={{ height: 37, fontSize: 13 }}>
                    Edit live demo →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-12 grid max-w-3xl justify-items-center gap-3 rounded-[24px] border px-6 py-10 text-center" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
            <p className="eyebrow">Keep your work</p>
            <p className="max-w-md text-[15px]" style={{ color: "var(--ink-2)" }}>
              Guest edits live in this browser only. Create a free account to save,
              publish and share your site with the world.
            </p>
            <div className="mt-1 flex flex-wrap justify-center gap-3">
              <Link href="/signup" className="btn-primary" style={{ height: 44, padding: "0 22px" }}>Sign up free</Link>
              <Link href="/login" className="btn-ghost" style={{ height: 44, padding: "0 22px" }}>Log in</Link>
            </div>
          </div>
        </div>
      </Reveal>
      <Footer />
    </div>
  );
}
