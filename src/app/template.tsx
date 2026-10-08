"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { TransitionVeil } from "@/components/layout/TransitionVeil";

/** Settle a cross-page hash link (e.g. /templates → /#try) on the target
 *  section. The router fires its own scroll before the new page's content has
 *  mounted, so the target isn't there yet and the page sits at the top.
 *  Retry briefly until the element exists, then scroll once. Same-page hashes
 *  are left to the router, which already handles them. */
function useCrossPageHashScroll(routeKey: string) {
  useEffect(() => {
    let id = "";
    try {
      id = decodeURIComponent(window.location.hash.slice(1));
    } catch {
      return;
    }
    if (!id) return;
    const settled = document.getElementById(id);
    if (settled && Math.abs(settled.getBoundingClientRect().top) < 4) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let attempts = 0;
    let done = false;
    const tick = () => {
      if (done) return;
      attempts += 1;
      const el = document.getElementById(id);
      if (el) {
        done = true;
        el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        return;
      }
      if (attempts < 20) window.setTimeout(tick, 100);
    };
    tick();
  }, [routeKey]);
}

/** Every route enters with the same breath: a short rise-and-settle keyed by
 *  pathname, so back/forward and link travel feel continuous. The veil adds
 *  one quick loader beat over slow client-side transitions, then gets out of
 *  the way; slow routes additionally get the delayed RouteLoader via
 *  loading.tsx. */
export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  useCrossPageHashScroll(pathname);
  return (
    <>
      <TransitionVeil routeKey={pathname} />
      <div key={pathname} className="page-enter">
        {children}
      </div>
    </>
  );
}
