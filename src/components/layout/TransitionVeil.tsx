"use client";

import { useEffect, useRef, useState } from "react";
import { OrbitCluster, TrackLine } from "@/components/layout/Orbit";

/** Minimum time the veil stays fully visible, then fade-out length. Total
 *  presence ≈ 0.5s — one quick beat of the orbit, then gone. */
const MIN_VISIBLE_MS = 300;
const FADE_MS = 200;

/** The navigation hasn't settled this long after click — assume it is slow
 *  and raise the veil while the next page is still on its way. Fast
 *  transitions commit before this fires, so they never flash the orbit. */
const SLOW_NAV_MS = 400;

/** Module-level navigation memory. The root template (and this veil with it)
 *  remounts on every navigation, so refs cannot carry anything across the
 *  transition — these survive because the JS context does. */
let lastNavStart = 0;
let lastHandledKey: string | null = null;
let armTimer: number | null = null;
let veilShownAt = 0;

function disarm() {
  if (armTimer !== null) {
    window.clearTimeout(armTimer);
    armTimer = null;
  }
}

/** Full-screen loader that appears only while a slow client-side page
 *  transition is in flight. Clicking a link arms a short fuse: fast
 *  transitions commit first and the fuse is pulled, so nothing ever flashes;
 *  sluggish ones get one quick, centered beat of the orbit instead — raised
 *  mid-wait, held briefly past arrival, then gone. Skipped on first mount
 *  (full page loads already have the browser's own blank) and for
 *  reduced-motion users. Non-interactive throughout: it never traps clicks
 *  or focus. */
export function TransitionVeil({ routeKey }: { routeKey: string }) {
  const [phase, setPhase] = useState<"hidden" | "shown" | "leaving">("hidden");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const onLinkClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = e.target instanceof Element ? e.target.closest("a[href]") : null;
      const raw = anchor?.getAttribute("href") ?? "";
      if (!raw.startsWith("/") || raw.startsWith("//")) return;
      // Same-page hash: no route change coming, nothing to arm.
      try {
        const next = new URL(raw, window.location.origin);
        if (next.pathname === window.location.pathname) return;
      } catch {
        return;
      }
      lastNavStart = Date.now();
      disarm();
      armTimer = window.setTimeout(() => {
        armTimer = null;
        veilShownAt = Date.now();
        setPhase("shown");
      }, SLOW_NAV_MS);
    };
    const onPopState = () => {
      lastNavStart = Date.now();
      disarm();
      armTimer = window.setTimeout(() => {
        armTimer = null;
        veilShownAt = Date.now();
        setPhase("shown");
      }, SLOW_NAV_MS);
    };
    document.addEventListener("click", onLinkClick, true);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onLinkClick, true);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  useEffect(() => {
    // Same key as already handled: a re-run, not a navigation. (StrictMode
    // double-invokes effects in dev; this collapses both runs into one.)
    if (lastHandledKey === routeKey) return;
    const firstMount = lastHandledKey === null;
    lastHandledKey = routeKey;
    if (firstMount) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      disarm();
      return;
    }
    disarm();
    const now = Date.now();
    const preShown = veilShownAt !== 0;
    const slow = lastNavStart === 0 || now - lastNavStart >= SLOW_NAV_MS;
    if (!preShown && !slow) return;
    // Hold at least MIN_VISIBLE from the moment the veil (re)appeared here.
    // NOTE: the cleanup below deliberately does NOT clear these timers. The
    // template remounts around login-style push+refresh flows, and wiping the
    // hide timers there stranded the veil on screen. Firing setState after an
    // unmount is a harmless no-op; a stranded visible veil is not.
    setPhase("shown");
    if (!preShown) veilShownAt = now;
    const hold = Math.max(0, veilShownAt + MIN_VISIBLE_MS - Date.now());
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    timers.current.push(
      window.setTimeout(() => setPhase("leaving"), hold),
      window.setTimeout(() => {
        setPhase("hidden");
        veilShownAt = 0;
      }, hold + FADE_MS),
    );
  }, [routeKey]);

  if (phase === "hidden") return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[90] grid place-items-center overflow-hidden bg-background transition-opacity ${
        phase === "leaving" ? "opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <div className="marketing-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative grid w-full max-w-xs justify-items-center px-6 text-center">
        <OrbitCluster box={256} mark={72} />
        <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.2em] text-primary-strong">
          create.io / Working
        </p>
        <div className="mt-5 w-full">
          <TrackLine />
        </div>
      </div>
    </div>
  );
}
