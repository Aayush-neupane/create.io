"use client";

import { useEffect, useState } from "react";
import { TEMPLATES } from "@/lib/templates";
import { OrbitCluster, TrackLine } from "@/components/layout/Orbit";

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
      className="relative grid min-h-[92svh] place-items-center overflow-hidden px-6 py-20"
      role="status"
      aria-live="polite"
      aria-label="Preparing your shelf"
    >
      <div className="marketing-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="route-loader-in relative grid w-full max-w-sm justify-items-center text-center">
        <OrbitCluster />
        <p className="mt-8 font-mono text-[9px] uppercase tracking-[0.2em] text-primary-strong">
          create.io / Working
        </p>
        <p className="mt-3 min-h-[2.6em] font-serif text-3xl tracking-[-0.03em] sm:text-4xl">
          Hanging {template.name}…
        </p>
        <div className="mt-6 w-full">
          <TrackLine />
        </div>
        <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">{step}</p>
        <span className="sr-only">Please wait.</span>
      </div>
    </div>
  );
}
