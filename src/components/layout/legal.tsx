import Link from "next/link";
import type { ReactNode } from "react";
import { Navbar, Footer } from "@/components/layout/chrome";
import { currentUser } from "@/lib/auth";

/** Shared shell for privacy / terms / cookies — mirrors the reference legal
 *  pages: paper header, auto-numbered serif rows divided by hairlines,
 *  return links at the foot. Section numbers come from a CSS counter so the
 *  individual pages stay plain h2/p/ul prose. */
export async function LegalShell({
  eyebrow,
  title,
  intro,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  children: ReactNode;
}) {
  const user = await currentUser();
  return (
    <div className="marketing-theme min-h-screen bg-background text-foreground">
      <Navbar user={user} />
      <main>
        <div className="border-b border-border">
          <div className="mx-auto max-w-shell px-6 py-14 sm:px-10 lg:px-16 lg:py-20 xl:px-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Legal · {eyebrow}
            </p>
            <h1 className="mt-4 max-w-[14ch] font-serif text-[clamp(2.6rem,5vw,4.5rem)] font-normal leading-[0.95]">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#5e5952]">{intro}</p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              Last updated · {updated}
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-shell px-6 py-14 sm:px-10 lg:px-16 lg:py-20 xl:px-20">
          <div className="legal-doc max-w-3xl text-[15px] leading-relaxed text-[#5e5952] [&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_code]:border [&_code]:border-border/40 [&_code]:bg-surface-2 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[13px] [&_code]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-2">
            {children}
          </div>
          <div className="mt-16 flex max-w-3xl flex-wrap gap-3 border-t border-border pt-8">
            <Link
              href="/"
              className="inline-flex h-12 items-center rounded-full border border-border px-6 text-sm font-medium transition hover:bg-foreground hover:text-background"
            >
              Return home
            </Link>
            <Link
              href="/new"
              className="inline-flex h-12 items-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:bg-primary"
            >
              Start building
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
