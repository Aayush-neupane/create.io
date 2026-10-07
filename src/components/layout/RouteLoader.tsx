"use client";

import { useEffect, useState } from "react";
import { TEMPLATES } from "@/lib/templates";

const STEPS = ["Waking the studio", "Pulling the shelf", "Polishing pixels"];

/** Slow-route loader with a conscience: renders nothing for the first
 *  half-second, so fast navigations never flash. Only genuinely slow loads
 *  reveal the shelf being set — cycling real template names, never a spinner. */
export function RouteLoader() {
  const [slow, setSlow] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const arm = window.setTimeout(() => setSlow(true), 500);
    return () => window.clearTimeout(arm);
  }, []);

  useEffect(() => {
    if (!slow) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 900);
    return () => window.clearInterval(id);
  }, [slow]);

  if (!slow) return null;

  const template = TEMPLATES[tick % TEMPLATES.length];
  const step = STEPS[Math.min(Math.floor(tick / 2), STEPS.length - 1)];

  return (
    <div className="grid min-h-[70vh] place-items-center px-6 py-20" role="status" aria-label="Loading">
      <div className="grid w-full max-w-md justify-items-center text-center">
        <span className="kit-float grid h-14 w-14 place-items-center rounded-2xl bg-primary font-serif text-3xl text-white" aria-hidden="true">
          c
        </span>
        <p className="mt-6 font-serif text-3xl tracking-[-0.02em]">Setting up the shelf…</p>
        <svg viewBox="0 0 320 24" className="mt-6 w-full max-w-xs" aria-hidden="true">
          <path d="M8 12H312" stroke="#292721" strokeOpacity=".4" strokeWidth="1.2" className="kit-dash" />
          <circle cx="12" cy="12" r="7" fill="#F7F2E7" stroke="#292721" />
          <circle cx="308" cy="12" r="7" fill="#D75C3F" stroke="#292721" />
        </svg>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted" aria-live="polite">
          {step} · hanging {template.name}
        </p>
        <div className="mt-5 flex items-center gap-2" aria-hidden="true">
          {STEPS.map((s, i) => {
            const activeStep = Math.min(Math.floor(tick / 2), STEPS.length - 1);
            return (
              <span
                key={s}
                className={`h-1.5 rounded-full transition-all duration-500 ${i <= activeStep ? "w-8 bg-primary" : "w-3 bg-border/40"}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
