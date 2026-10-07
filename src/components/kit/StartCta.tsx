"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Chapter } from "@/components/kit/Chapter";

function Pipeline() {
  return (
    <div className="relative mb-7 border-y border-border/30 py-5" aria-hidden="true">
      <svg viewBox="0 0 640 96" className="w-full">
        <path d="M62 48H578" stroke="#292721" strokeOpacity=".42" strokeWidth="1.2" className="kit-dash" />
        <circle cx="62" cy="48" r="23" fill="#F7F2E7" stroke="#292721" />
        <circle cx="320" cy="48" r="27" fill="#D75C3F" stroke="#292721" />
        <circle cx="578" cy="48" r="23" fill="#292721" />
        <g fontFamily="ui-monospace, monospace" fontSize="8" textAnchor="middle">
          <text x="62" y="52" fill="#292721">SITE</text>
          <text x="320" y="52" fill="#292721">EDIT</text>
          <text x="578" y="52" fill="#F5F0E5">GO</text>
        </g>
        <g fill="#6D675F" fontFamily="ui-monospace, monospace" fontSize="7" textAnchor="middle" letterSpacing="1">
          <text x="62" y="88">PICK</text>
          <text x="320" y="88">FILL</text>
          <text x="578" y="88">PUBLISH</text>
        </g>
      </svg>
    </div>
  );
}

export function StartCta() {
  const [value, setValue] = useState("");

  return (
    <section id="start" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto grid max-w-shell lg:grid-cols-[0.78fr_1.22fr]">
        <div data-scroll-reveal className="kit-scroll px-6 py-16 sm:px-10 lg:border-r lg:border-border lg:px-16 lg:py-20 xl:px-20" data-reveal="">
          <Chapter n="10" label="Start with one site" />
          <h2 className="mt-7 max-w-[10ch] font-serif text-[clamp(3rem,5vw,5.8rem)] font-normal leading-[0.94] tracking-[-0.05em]">
            Your website is waiting.
          </h2>
          <p className="mt-7 max-w-md text-base leading-7 text-[#5e5952]">
            Name it below, then pick a finished site and fill its fields.
            Publish your first page today.
          </p>
          <ol className="relative mt-8 border-t border-border/30">
            {["Pick a finished site", "Fill its fields", "Publish your page"].map((label, i) => (
              <li key={label} className="flex items-center gap-4 border-b border-border/20 py-3 text-sm text-[#5e5952]">
                <span className="grid h-6 w-6 place-items-center rounded-full border border-border/30 bg-background font-mono text-[7px] text-primary-strong">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {label}
              </li>
            ))}
          </ol>
        </div>
        <div className="relative flex min-h-[46rem] items-center overflow-hidden bg-surface-2 px-6 py-14 sm:px-10 lg:px-14 lg:py-16 xl:px-20">
          <div className="marketing-grid pointer-events-none absolute inset-0 opacity-45" aria-hidden="true" />

          <div data-scroll-reveal className="kit-scroll relative mx-auto w-full max-w-[48rem]" data-reveal="">
            <div className="mb-5 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.15em] text-muted">
              <span>Create / 01</span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" /> Builder ready
              </span>
            </div>
            <Pipeline />
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 border border-border/25 bg-[#ddd2be]" aria-hidden="true" />
              <div className="pointer-events-none absolute inset-0 translate-x-1.5 translate-y-1.5 border border-border/30 bg-[#e5dbc8]" aria-hidden="true" />
              <form
                className="relative border border-border bg-surface p-4 sm:p-5"
                onSubmit={(e) => e.preventDefault()}
              >
                <label htmlFor="cta-input" className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted">
                  Name your website
                </label>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="cta-input"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Alex Morgan — Portfolio"
                    className="h-13 w-full border border-border bg-background px-4 text-sm outline-none placeholder:text-muted/70 focus:border-primary"
                  />
                  <Link
                    href={value.trim() ? `/new?name=${encodeURIComponent(value.trim())}` : "/new"}
                    className="inline-flex h-13 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:bg-primary"
                  >
                    Start building
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </form>
            </div>
            <div className="mt-8 grid grid-cols-3 border-y border-border/25 py-4 text-center">
              {[
                ["PICK", "Finished site"],
                ["FILL", "Structured fields"],
                ["SHIP", "Live link"],
              ].map(([verb, noun]) => (
                <div key={verb}>
                  <p className="font-mono text-[7px] tracking-[0.15em] text-primary-strong">{verb}</p>
                  <p className="mt-1 text-[11px] text-muted sm:text-xs">{noun}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
