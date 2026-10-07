"use client";

import { useEffect, useState } from "react";
import { TEMPLATES } from "@/lib/templates";

const STEPS = ["Setting type", "Inking the grid", "Hanging the shelf"];

/** Slow-route loader with a conscience: renders nothing for the first
 *  half-second, so fast navigations never flash. Only genuinely slow loads
 *  reveal the print shop at work — never a spinner. */
export function RouteLoader() {
  const [slow, setSlow] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const arm = window.setTimeout(() => setSlow(true), 500);
    return () => window.clearTimeout(arm);
  }, []);

  useEffect(() => {
    if (!slow) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 1100);
    return () => window.clearInterval(id);
  }, [slow]);

  if (!slow) return null;

  const template = TEMPLATES[tick % TEMPLATES.length];
  const step = STEPS[Math.min(Math.floor(tick / 2), STEPS.length - 1)];

  return (
    <div className="grid min-h-[70vh] place-items-center px-6 py-20" role="status" aria-label="Loading">
      <div className="kit-panel w-full max-w-sm p-8 text-center sm:p-10">
        <p className="flex items-center justify-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" aria-hidden="true" />
          Loading — one moment
        </p>
        <p className="mt-5 font-serif text-4xl leading-[1.02] tracking-[-0.03em]">
          Setting the type…
        </p>
        <div className="relative mt-7 h-1 overflow-hidden bg-border/15" aria-hidden="true">
          <div className="kit-scan-beam absolute inset-y-0 w-20 bg-primary" />
        </div>
        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted" aria-live="polite">
          {step} · {template.name}
        </p>
        <div className="mt-6 flex items-center justify-center gap-1.5" aria-hidden="true">
          {[template.theme.primary, template.theme.accent, template.theme.surface].map((c) => (
            <span key={c} className="h-4 w-4 rounded-full border border-border/40" style={{ background: c }} />
          ))}
        </div>
      </div>
    </div>
  );
}
