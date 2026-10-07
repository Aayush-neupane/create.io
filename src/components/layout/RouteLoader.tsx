"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { TEMPLATES } from "@/lib/templates";

const STEPS = ["Waking the studio", "Pulling the shelf", "Hanging the sites"];

/** Slow-route loader with a conscience: renders nothing for the first beat,
 *  so instant navigations never flash. Anything slower reveals the orbit —
 *  rings, haloed mark and a tracked line setting the shelf, cycling real
 *  template names. Never a spinner. */
export function RouteLoader() {
  const [slow, setSlow] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const arm = window.setTimeout(() => setSlow(true), 180);
    return () => window.clearTimeout(arm);
  }, []);

  useEffect(() => {
    if (!slow) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 1400);
    return () => window.clearInterval(id);
  }, [slow]);

  if (!slow) return null;

  const template = TEMPLATES[tick % TEMPLATES.length];
  const step = STEPS[Math.min(Math.floor(tick / 2), STEPS.length - 1)];

  return (
    <div
      className="relative grid min-h-[70vh] place-items-center overflow-hidden px-6 py-20"
      role="status"
      aria-live="polite"
      aria-label="Preparing your shelf"
    >
      <div className="marketing-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="loader-orbit-spin pointer-events-none absolute left-1/2 top-1/2 h-[clamp(20rem,72vmin,32rem)] w-[clamp(20rem,72vmin,32rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/25" aria-hidden="true">
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary" />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[clamp(13rem,46vmin,21rem)] w-[clamp(13rem,46vmin,21rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/15" aria-hidden="true" />

      <div className="route-loader-in relative grid w-full max-w-sm justify-items-center text-center">
        <div className="relative grid h-20 w-20 place-items-center rounded-full border border-border bg-surface shadow-[0_18px_50px_rgba(41,39,33,.12)]">
          <span className="loader-halo pointer-events-none absolute inset-[-1px] rounded-full border border-primary" aria-hidden="true" />
          <Image src="/logo.png" alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
        </div>
        <p className="mt-7 font-mono text-[9px] uppercase tracking-[0.2em] text-primary-strong">
          create.io / Working
        </p>
        <p className="mt-3 min-h-[2.6em] font-serif text-3xl tracking-[-0.03em] sm:text-4xl">
          Hanging {template.name}…
        </p>
        <div className="mt-6 flex w-full items-center gap-3" aria-hidden="true">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
          <span className="relative h-px flex-1 overflow-hidden bg-border/40">
            <span className="loader-track-slide absolute inset-y-0 w-2/5 bg-primary" />
          </span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
        </div>
        <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">{step}</p>
        <span className="sr-only">Please wait.</span>
      </div>
    </div>
  );
}
