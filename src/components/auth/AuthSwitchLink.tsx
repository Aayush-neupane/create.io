"use client";

import { useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

type VTDocument = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

/** Link between login ↔ signup that glides instead of swapping: the outgoing
 *  page slides out and the incoming one slides in from the direction of
 *  travel (`forward` = deeper into signup, `back` = back to login). Falls
 *  back to a plain navigation where View Transitions are unsupported.
 *
 *  The halves' own entrance animations are pinned at their end state before
 *  suppression lifts — otherwise the keyframes re-apply from zero and replay
 *  as a ghost second slide. */
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
    if (!doc.startViewTransition) {
      router.push(href);
      return;
    }
    const root = document.documentElement;
    root.dataset.authTransition = dir;
    root.classList.add("auth-switching");
    const settle = () => {
      root.querySelectorAll(".auth-in-left, .auth-in-right").forEach((el) => {
        (el as HTMLElement).style.setProperty("animation", "none");
      });
      delete root.dataset.authTransition;
      root.classList.remove("auth-switching");
    };
    try {
      const transition = doc.startViewTransition(() => {
        router.push(href);
      });
      transition.finished.finally(settle);
      window.setTimeout(settle, 900);
    } catch {
      settle();
      router.push(href);
    }
  }

  return (
    <a href={href} onClick={go} className={className}>
      {children}
    </a>
  );
}
