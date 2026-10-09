import type { ReactNode } from "react";
import Link from "next/link";
import { Navbar, Footer } from "@/components/layout/chrome";
import { currentUser } from "@/lib/auth";

/** Shared shell for privacy / terms / cookies: ink header band + numbered prose. */
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
    <div className="min-h-screen" style={{ background: "var(--paper)" }}>
      <Navbar user={user} />
      <div style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <div className="mx-auto max-w-3xl px-6 pb-12 pt-12 md:pt-16">
          <p className="eyebrow" style={{ color: "var(--accent)" }}>
            <span className="mono-meta">Legal</span>
            {eyebrow}
          </p>
          <h1 className="display display-upper mt-4" style={{ fontSize: "clamp(36px,5.4vw,64px)", color: "var(--paper)" }}>
            {title}
          </h1>
          <p className="mt-4 leading-relaxed" style={{ color: "var(--cream-dim)" }}>
            {intro}
          </p>
          <p className="mono-meta mt-4 font-mono text-[10px] font-bold uppercase" style={{ letterSpacing: "0.18em", color: "var(--accent)" }}>
            Last updated · {updated}
          </p>
        </div>
      </div>
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        <div className="legal-numbered space-y-8 text-[15px] leading-relaxed" style={{ color: "var(--ink-2)" }}>
          {children}
        </div>
        <div className="mt-14 flex flex-wrap gap-3 border-t pt-8" style={{ borderColor: "var(--line)" }}>
          <Link href="/templates" className="btn-dark">Browse templates</Link>
          <Link href="/new" className="btn-ghost">Start building</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
