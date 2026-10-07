import type { ReactNode } from "react";
import { Navbar, Footer } from "@/components/layout/chrome";
import { currentUser } from "@/lib/auth";

/** Shared shell for privacy / terms / cookies: kit chrome + strip header
 *  + bordered paper article, matching the marketing editorial system. */
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
        <div className="border-b border-border bg-[#e8dfcf]">
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
        <div className="mx-auto max-w-shell px-4 py-12 sm:px-8 lg:px-14 xl:px-20">
          <article className="kit-panel mx-auto max-w-3xl p-7 sm:p-10">
            <div className="space-y-6 text-[15px] leading-relaxed text-[#5e5952] [&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_code]:border [&_code]:border-border/40 [&_code]:bg-surface-2 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[13px] [&_code]:text-foreground [&_h2]:border-t [&_h2]:border-border/25 [&_h2]:pt-6 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:tracking-[-0.03em] [&_h2]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-2">
              {children}
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
