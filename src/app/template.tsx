"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Every route enters with the same breath: a short rise-and-settle keyed by
 *  pathname, so back/forward and link travel feel continuous. Slow routes
 *  additionally get the delayed RouteLoader via loading.tsx. */
export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
