import Link from "next/link";
import type { ReactNode } from "react";
import { BrandMark } from "@/components/layout/chrome";

const STEPS = [
  ["01", "Pick", "A finished site, not a blank canvas."],
  ["02", "Fill", "Fields for words, photos and hours."],
  ["03", "Publish", "One click to a fast live page."],
];

/** Split-screen auth shell mirroring the reference: narrow form column on
 *  the left, brand/visual panel on the right, mono strip notes top and toe. */
export function AuthSplit({
  eyebrow,
  title,
  sub,
  formId = "auth-form",
  foot,
  children,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  formId?: string;
  foot: string;
  children: ReactNode;
}) {
  return (
    <div className="marketing-theme min-h-screen bg-background text-foreground">
      <a
        href={`#${formId}`}
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition focus:translate-y-0"
      >
        Skip to form
      </a>
      <div className="mx-auto grid min-h-screen max-w-shell lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col px-6 py-8 sm:px-10 lg:border-r lg:border-border lg:px-16 xl:px-20">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-sm text-muted transition-colors hover:text-foreground">
              ← Back home
            </Link>
            <Link href="/" aria-label="create.io home">
              <BrandMark size={26} />
            </Link>
          </div>

          <div id={formId} className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-14">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{eyebrow}</p>
            <h1 className="mt-4 font-serif text-[clamp(2.4rem,4vw,3.6rem)] font-normal leading-[0.95]">
              {title}
            </h1>
            <p className="mt-4 text-[15px] leading-7 text-[#5e5952]">{sub}</p>
            <div className="mt-8">{children}</div>
          </div>

          <p className="border-t border-border/40 pt-4 font-mono text-[8px] uppercase tracking-[0.14em] text-muted">
            {foot}
          </p>
        </div>

        <div className="relative hidden overflow-hidden bg-surface-2 lg:flex lg:flex-col">
          <div className="marketing-grid pointer-events-none absolute inset-0 opacity-45" aria-hidden="true" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 top-6 font-serif text-[12rem] leading-none text-primary/10"
          >
            c
          </div>
          <div className="relative flex flex-1 flex-col justify-center px-14 py-16 xl:px-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Whole websites, predesigned
            </p>
            <h2 className="mt-4 max-w-[14ch] font-serif text-[clamp(2.2rem,3.4vw,3.4rem)] font-normal leading-[0.95]">
              The shortest path to a live site.
            </h2>

            <div className="relative mt-10 overflow-hidden rounded-[1.25rem] border border-[#25231f] bg-[#22211d] text-[#f2efe7]">
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
                <circle cx="320" cy="30" r="19" fill="#D75C3F" />
                <circle cx="578" cy="30" r="16" fill="#E8E3D8" />
                <g fontFamily="ui-monospace, monospace" fontSize="8" textAnchor="middle">
                  <text x="62" y="33" fill="#292721">SITE</text>
                  <text x="320" y="33" fill="#292721">EDIT</text>
                  <text x="578" y="33" fill="#292721">GO</text>
                </g>
              </svg>
              <div className="grid grid-cols-3 border-t border-white/10">
                {STEPS.map(([n, verb, noun]) => (
                  <div key={n} className="border-r border-white/10 px-4 py-3.5 last:border-r-0">
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
      </div>
    </div>
  );
}
