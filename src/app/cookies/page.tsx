import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/legal";

export const metadata: Metadata = {
  title: "Cookie policy — create.io",
  description: "Which cookies and browser storage create.io uses, and why.",
};

export default function CookiesPage() {
  return (
    <LegalShell
      eyebrow="Cookies"
      title="Cookie policy"
      intro="create.io uses a single strictly-necessary cookie. No advertising trackers, no third-party analytics cookies."
      updated="October 2026"
    >
      <h2>Cookies we set</h2>
      <ul>
        <li>
          <strong><code>create_io_session</code></strong> — strictly necessary. Holds your
          encrypted login session so you stay signed in (up to 30 days, or until you log
          out). Without it, accounts cannot work. It is <code>HttpOnly</code> (unreadable by
          page scripts) and sent only over HTTPS in production.
        </li>
      </ul>
      <h2>Browser storage (not cookies)</h2>
      <ul>
        <li><strong><code>createio-demo-*</code></strong> — guest builder drafts, kept only in your own browser so you can try templates without an account. Never sent to our servers.</li>
        <li><strong><code>createio-cookie-consent</code></strong> — remembers whether you accepted or declined this notice, so we don&apos;t ask again.</li>
      </ul>
      <h2>Your consent choice</h2>
      <p>
        When you first visit, we ask you to accept or decline cookies. Because our only
        cookie is strictly necessary for login, the site works either way — declining
        simply records your preference and means we won&apos;t ask again on this browser.
        Clearing your browser storage resets the choice and the notice reappears.
      </p>
      <h2>Managing cookies</h2>
      <p>
        You can block or delete cookies in your browser settings at any time. Note that
        blocking <code>create_io_session</code> will sign you out and prevent logging in,
        since the session cannot be maintained without it.
      </p>
    </LegalShell>
  );
}
