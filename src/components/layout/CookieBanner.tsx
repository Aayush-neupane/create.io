"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "createio-cookie-consent";

/** First-visit cookie notice. Records accept/decline in local storage so the
 *  choice persists; the only cookie we set (create_io_session) is strictly
 *  necessary for login — see /cookies. */
export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(KEY)) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  const pick = (value: "accepted" | "declined") => {
    try {
      window.localStorage.setItem(KEY, value);
    } catch {
      /* storage unavailable — just dismiss */
    }
    setShow(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div
        className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border bg-white/95 p-5 shadow-2xl backdrop-blur sm:flex-row sm:items-center sm:gap-6"
        style={{ borderColor: "var(--line-2)" }}
      >
        <p className="text-sm leading-relaxed" style={{ color: "var(--ink-2)" }}>
          <strong style={{ color: "var(--ink)" }}>A quick word on cookies.</strong> We use
          one strictly-necessary cookie to keep you logged in — no trackers, no ads.{" "}
          <Link href="/cookies" className="font-medium underline underline-offset-4">
            Cookie policy
          </Link>
        </p>
        <div className="flex flex-none gap-2">
          <button
            onClick={() => pick("declined")}
            className="btn-ghost flex-1 whitespace-nowrap sm:flex-none"
            style={{ height: 40, fontSize: 13 }}
          >
            Decline
          </button>
          <button
            onClick={() => pick("accepted")}
            className="btn-primary flex-1 whitespace-nowrap sm:flex-none"
            style={{ height: 40, fontSize: 13 }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
