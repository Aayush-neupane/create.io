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
                <p className="grid mx-auto place-items-center bg-background font-mono text-[11px] font-bold" style={{ width: 30, height: 30, borderRadius: 10, color: TINTS[i % TINTS.length].fg }}>0{i + 1}</p>
                <p className="mt-2 font-semibold" style={{ letterSpacing: "-0.015em" }}>{t}</p>
                <p className="mt-1 text-[13px] leading-relaxed" style={{ color: "var(--ink-2)" }}>{d}</p>
              </div>
            ))}
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-shell px-6 py-10 sm:px-10 lg:px-16 xl:px-20">

          <p aria-live="polite" className="mb-4 font-mono text-xs text-muted">
            {TEMPLATES.length} sites · all editable
          </p>
          <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {TEMPLATES.map((t) => (
              <article key={t.id} className="kit-card group flex min-w-0 flex-col overflow-hidden border border-border bg-surface">
                <div className="relative flex h-28 items-center gap-3 overflow-hidden border-b border-border/40 px-5" style={{ background: t.theme.surface }}>
                  <span className="grid h-12 w-12 flex-none place-items-center rounded-2xl text-lg font-bold text-white" style={{ background: t.theme.primary }} aria-hidden>
                    {t.name.slice(0, 1)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-serif text-lg tracking-[-0.02em]" style={{ color: t.theme.text }}>{t.name}</p>
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.08em]" style={{ color: t.theme.muted }}>{t.category} · {t.sections.length} sections</p>
                  </div>
                  <span className="ml-auto flex flex-none gap-1.5" aria-hidden>
                    {[t.theme.primary, t.theme.accent, t.theme.background].map((c, i) => (
                      <i key={i} className="h-5 w-5 rounded-full border border-border/40" style={{ background: c }} />
                    ))}
                  </span>
                </div>
                <div className="px-5 py-3.5">
                  <p className="text-[13.5px] leading-relaxed text-muted">{t.description}</p>
                </div>
                <div className="mt-auto flex gap-2 border-t border-border/40 px-[14px] py-3">
                  <Link href={`/templates/${t.id}`} className="flex-1 rounded-full border border-border px-3 py-2 text-center text-[13px] font-medium transition-colors hover:bg-foreground hover:text-background">
                    Preview
                  </Link>
                  <Link href={`/demo/${t.id}`} className="inline-flex h-[37px] flex-1 items-center justify-center rounded-full bg-foreground px-3 text-center text-[13px] font-medium text-background transition-colors hover:bg-primary">
                    Edit live demo →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="kit-panel mx-auto mt-12 grid max-w-3xl justify-items-center gap-3 px-6 py-10 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Keep your work</p>
            <p className="max-w-md text-[15px] text-muted">
              Guest edits live in this browser only. Create a free account to save,
              publish and share your site with the world.
            </p>
            <div className="mt-1 flex flex-wrap justify-center gap-3">
              <Link href="/signup" className="inline-flex h-11 items-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:bg-primary">Sign up free</Link>
              <Link href="/login" className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-medium transition hover:bg-foreground hover:text-background">Log in</Link>
            </div>
          </div>
        </div>
      </Reveal>
      <Footer />
    </div>
  );
}
