import Link from "next/link";
import type { Metadata } from "next";
import { SiteNavbar, Footer } from "@/components/layout/chrome";
import { TEMPLATES } from "@/lib/templates";

export const metadata: Metadata = {
  title: "Lost — create.io",
  description: "This shelf doesn't exist. Head back to finished websites.",
};

const SHORTCUTS = ["minimal-portfolio", "restaurant", "agency"];

export default function NotFound() {
  const shortcuts = SHORTCUTS.map((id) => TEMPLATES.find((t) => t.id === id)).filter(
    (t): t is (typeof TEMPLATES)[number] => Boolean(t),
  );
  return (
    <div className="marketing-theme flex min-h-screen flex-col bg-background text-foreground">
      <SiteNavbar />
      <main className="mx-auto grid w-full max-w-shell flex-1 content-center px-6 py-20 text-center sm:px-10">
        <p className="mx-auto inline-flex w-fit items-center gap-3 rounded-full border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-primary font-bold text-white">!</span>
          404 — No such shelf
        </p>
        <h1 className="mx-auto mt-8 max-w-[14ch] font-serif text-[clamp(3rem,9vw,8rem)] font-normal leading-[0.9] tracking-[-0.05em]">
          Lost, or early.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-base leading-7 text-[#5e5952]">
          This page was never published — or it moved while the ink was wet.
          The finished sites are all still on the shelf.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-13 items-center rounded-full bg-foreground px-7 text-sm font-medium text-background transition hover:bg-primary"
          >
            Return home
          </Link>
          <Link
            href="/templates"
            className="inline-flex h-13 items-center rounded-full border border-border px-7 text-sm font-medium transition hover:bg-foreground hover:text-background"
          >
            Browse the shelf
          </Link>
        </div>
        <div className="mx-auto mt-12 grid w-full max-w-2xl gap-px border border-border bg-border sm:grid-cols-3">
          {shortcuts.map((t) => (
            <Link
              key={t.id}
              href={`/templates/${t.id}`}
              className="group flex items-center gap-3 bg-background px-5 py-4 text-left transition-colors hover:bg-surface"
            >
              <span
                className="grid h-9 w-9 flex-none place-items-center rounded-[10px] text-sm font-bold text-white"
                style={{ background: t.theme.primary }}
                aria-hidden
              >
                {t.name.slice(0, 1)}
              </span>
              <span className="min-w-0">
                <span className="block truncate font-serif text-lg leading-tight">{t.name}</span>
                <span className="block font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                  {t.category} · live preview →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
