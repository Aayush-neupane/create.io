"use client";

import Link from "next/link";
import { useState } from "react";

const KEY = "createio-cookie-consent";

/** First-visit cookie notice. Records accept/decline in local storage so the
 *  choice persists; the only cookie we set (create_io_session) is strictly
 *  necessary for login — see /cookies. */
export function CookieBanner() {
  const [show, setShow] = useState<boolean>(() => {
    try {
      return !window.localStorage.getItem(KEY);
    } catch {
      return true;
    }
  });

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
        className="kit-panel mx-auto flex max-w-3xl flex-col gap-4 p-5 shadow-2xl sm:flex-row sm:items-center sm:gap-6"
      >
        <p className="text-sm leading-relaxed text-muted">
          <strong className="text-foreground">A quick word on cookies.</strong> We use
          one strictly-necessary cookie to keep you logged in — no trackers, no ads.{" "}
          <Link href="/cookies" className="font-medium text-foreground underline underline-offset-4">
            Cookie policy
          </Link>
        </p>
        <div className="flex flex-none gap-2">
          <button
            onClick={() => pick("declined")}
            className="inline-flex h-10 flex-1 items-center justify-center whitespace-nowrap rounded-full border border-border px-5 text-[13px] font-medium transition hover:bg-foreground hover:text-background sm:flex-none"
          >
            Decline
          </button>
          <button
            onClick={() => pick("accepted")}
            className="inline-flex h-10 flex-1 items-center justify-center whitespace-nowrap rounded-full bg-foreground px-5 text-[13px] font-medium text-background transition hover:bg-primary sm:flex-none"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
