import Link from "next/link";
import type { ReactNode } from "react";
import { BrandMark } from "@/components/layout/chrome";

const STEPS = [
  ["01", "Pick", "A finished site, not a blank canvas."],
  ["02", "Fill", "Fields for words, photos and hours."],
  ["03", "Publish", "One click to a fast live page."],
];

/** Split-screen auth shell mirroring the reference: narrow form column on
 *  one side, brand/visual panel on the other. `flip` mirrors the halves
 *  (signup) and both columns enter from their own side, so switching pages
 *  reads as the halves trading places. */
export function AuthSplit({
  eyebrow,
  title,
  sub,
  formId = "auth-form",
  foot,
  flip,
  children,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  formId?: string;
  foot: string;
  flip?: boolean;
  children: ReactNode;
}) {
  const form = (
    <div className={`flex min-h-0 flex-col overflow-hidden px-6 py-6 sm:px-10 lg:px-16 xl:px-20 ${flip ? "auth-in-right lg:border-l lg:border-border" : "auth-in-left lg:border-r lg:border-border"}`}>
      <div className="flex flex-none items-center justify-between">
        <Link href="/" className="text-sm text-muted transition-colors hover:text-primary-strong">
          ← Back home
        </Link>
        <Link href="/" aria-label="create.io home">
          <BrandMark size={26} />
        </Link>
      </div>

      <div id={formId} className="mx-auto flex w-full max-w-md min-h-0 flex-1 flex-col justify-center py-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-strong">{eyebrow}</p>
        <h1 className="mt-3 font-serif text-[clamp(2rem,3.4vw,2.9rem)] font-normal leading-[0.95]">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#5e5952]">{sub}</p>
        <div className="mt-6">{children}</div>
      </div>

      <p className="flex-none border-t border-border/40 pt-3 font-mono text-[8px] uppercase tracking-[0.14em] text-muted">
        {foot}
      </p>
    </div>
  );

  const panel = (
    <div className={`relative hidden min-h-0 overflow-hidden bg-surface-2 lg:flex lg:flex-col ${flip ? "auth-in-left" : "auth-in-right"}`} style={{ animationDelay: "90ms" }}>
      <div className="marketing-grid pointer-events-none absolute inset-0 opacity-45" aria-hidden="true" />
      <div className="relative flex min-h-0 flex-1 flex-col justify-center px-14 py-8 xl:px-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          Whole websites, predesigned
        </p>
        <h2 className="mt-3 max-w-[14ch] font-serif text-[clamp(1.9rem,2.8vw,2.7rem)] font-normal leading-[0.95]">
          The shortest path to a live site.
        </h2>

            <div className="relative mt-8 overflow-hidden rounded-[1.25rem] border border-[#25231f] bg-[#22211d] text-[#f2efe7]">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#aaa69b]">
              Live site / 01
            </span>
            <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-[#cdc8bc]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Preview
            </span>
          </div>
          <div className="flex items-center gap-2 px-5 pt-5" aria-hidden="true">
            {["#111111", "#7c2d12", "#064e3b", "#1e3a5f", "#2e1065"].map((c) => (
              <span key={c} className="h-6 w-6 rounded-full border border-white/20" style={{ background: c }} />
            ))}
            <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#858176]">
              13 finished sites
            </span>
          </div>
          <svg viewBox="0 0 640 60" className="w-full px-2 py-4" aria-hidden="true">
            <path d="M62 30H578" stroke="#77746c" strokeOpacity=".5" strokeWidth="1.2" className="kit-dash" />
            <circle cx="62" cy="30" r="16" fill="#F7F2E7" stroke="#77746c" />
            <circle cx="320" cy="30" r="19" fill="#BC4F30" />
            <circle cx="578" cy="30" r="16" fill="#E8E3D8" />
            <g fontFamily="ui-monospace, monospace" fontSize="8" textAnchor="middle">
              <text x="62" y="33" fill="#292721">SITE</text>
              <text x="320" y="33" fill="#292721">EDIT</text>
              <text x="578" y="33" fill="#292721">GO</text>
            </g>
          </svg>
          <div className="grid grid-cols-3 border-t border-white/10">
            {STEPS.map(([n, verb, noun]) => (
              <div key={n} className="border-r border-white/10 px-4 py-3 last:border-r-0">
                <p className="font-mono text-[8px] tracking-[0.15em] text-[#d97757]">{n}</p>
                <p className="mt-1 text-xs font-medium">{verb}</p>
                <p className="mt-0.5 text-[11px] leading-4 text-[#aaa69b]">{noun}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="relative border-t border-border/40 px-14 py-4 font-mono text-[8px] uppercase tracking-[0.14em] text-muted xl:px-20">
        Autosave on · Undo ready · No code
      </p>
    </div>
  );

  return (
    <div className="marketing-theme h-svh overflow-hidden bg-background text-foreground">
      <a
        href={`#${formId}`}
        className="pointer-events-none fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background opacity-0 transition focus-visible:pointer-events-auto focus-visible:translate-y-0 focus-visible:opacity-100"
      >
        Skip to form
      </a>
      <div className="mx-auto grid h-svh max-w-shell overflow-hidden lg:grid-cols-[0.9fr_1.1fr]">
        {flip ? (
          <>
            {panel}
            {form}
          </>
        ) : (
          <>
            {form}
            {panel}
          </>
        )}
      </div>
    </div>
  );
}
