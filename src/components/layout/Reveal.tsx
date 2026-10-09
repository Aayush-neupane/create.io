"use client";

import { useEffect } from "react";

const PENDING = "[data-reveal]:not(.is-in)";

function revealNow(el: Element) {
  el.classList.add("is-in");
}

/** Scroll-reveal observer. Hiding is gated behind `html.reveal-on` (added
 *  here), so content can never get stuck invisible if observation fails.
 *  A MutationObserver catches nodes that mount after navigation or
 *  filtering. Mounted in the root layout for global coverage. */
export function Reveal({ children }: { children?: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add("reveal-on");

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal]").forEach(revealNow);
      return;
    }

    const seen = new WeakSet<Element>();
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          revealNow(e.target);
          io.unobserve(e.target);
        }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    const watch = (el: Element) => {
      if (seen.has(el)) return;
      seen.add(el);
      io.observe(el);
    };
    const sweep = (root: ParentNode) => {
      if (root instanceof Element && root.matches(PENDING)) watch(root);
      const q = root instanceof Element || root instanceof Document ? root.querySelectorAll(PENDING) : null;
      q?.forEach(watch);
    };
    sweep(document);

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((n) => {
          if (n instanceof Element) sweep(n);
        });
      });
    });
    if (document.body) mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return <>{children}</>;
}
