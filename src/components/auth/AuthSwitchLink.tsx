"use client";

import { useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

type VTDocument = Document & {
  startViewTransition?: (update: () => void) => void;
};

/** Link between login ↔ signup that glides instead of swapping: the outgoing
 *  page slides out and the incoming one slides in from the direction of
 *  travel (`forward` = deeper into signup, `back` = back to login). Falls
 *  back to a plain navigation where View Transitions are unsupported. */
export function AuthSwitchLink({
  href,
  dir,
  className,
  children,
}: {
  href: string;
  dir: "forward" | "back";
  className?: string;
  children: ReactNode;
}) {
  const router = useRouter();

  function go(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const doc = document as VTDocument;
    const root = document.documentElement;
    root.dataset.authTransition = dir;
    root.classList.add("auth-switching");
    window.setTimeout(() => {
      delete root.dataset.authTransition;
      root.classList.remove("auth-switching");
    }, 600);
    if (doc.startViewTransition) doc.startViewTransition(() => router.push(href));
    else router.push(href);
  }

  return (
    <a href={href} onClick={go} className={className}>
      {children}
    </a>
  );
}
