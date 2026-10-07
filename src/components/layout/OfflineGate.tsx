"use client";

import { useEffect, useState } from "react";
import { OrbitMark, OrbitRings, TrackLine } from "@/components/layout/Orbit";

/** Full-screen offline takeover. Appears only while the browser reports no
 *  connection and lifts itself the moment it is back — nothing to dismiss,
 *  nothing forced. Mounted once in the root layout. */
export function OfflineGate() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const update = () => setOffline(!window.navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  if (!offline) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-label="You are offline"
      className="fixed inset-0 z-[200] grid place-items-center overflow-hidden bg-background px-6 text-foreground"
    >
      <div className="marketing-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <OrbitRings />
      <div className="relative grid max-w-md justify-items-center text-center">
        <OrbitMark size={72} />
        <p className="mt-6 inline-flex items-center gap-3 rounded-full border border-border bg-surface px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" aria-hidden="true" />
          Offline — signal lost
        </p>
        <h2 className="mt-6 font-serif text-[clamp(2.6rem,7vw,4.5rem)] font-normal leading-[0.95]">
          The shelf needs the internet.
        </h2>
        <p className="mt-4 max-w-sm text-[15px] leading-7 text-[#5e5952]">
          Your drafts and guest edits stay safe in this browser. Reconnect and
          everything picks up where it left off.
        </p>
        <div className="mt-7 w-full max-w-xs">
          <TrackLine />
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-7 inline-flex h-13 items-center rounded-full bg-foreground px-7 text-sm font-medium text-background transition hover:bg-primary"
        >
          Try again
        </button>
        <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
          Lifts itself when you&apos;re back
        </p>
      </div>
    </div>
  );
}
