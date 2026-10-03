import type { ReactNode } from "react";
import { Navbar, Footer } from "@/components/layout/chrome";
import { currentUser } from "@/lib/auth";

/** Shared shell for privacy / terms / cookies: brand chrome + narrow prose. */
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
    <div className="min-h-screen">
      <Navbar user={user} />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-14">
        <p className="eyebrow">
          <span className="mono-meta" style={{ color: "var(--ink-3)" }}>Legal</span>
          <span aria-hidden className="h-px w-8" style={{ background: "var(--line-2)" }} />
          {eyebrow}
        </p>
        <h1 className="mt-3 font-semibold" style={{ fontSize: "clamp(32px, 4.2vw, 46px)", lineHeight: 1.04 }}>
          {title}
        </h1>
        <p className="mt-3 text-[15px]" style={{ color: "var(--ink-2)" }}>
          {intro}
        </p>
        <p className="mono-meta mt-2 text-xs" style={{ color: "var(--ink-3)" }}>
          Last updated · {updated}
        </p>
        <div className="mt-10 space-y-5 text-[15px] leading-relaxed [&_h2]:pt-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-1.5" style={{ color: "var(--ink-2)" }}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
