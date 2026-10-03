import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/legal";

export const metadata: Metadata = {
  title: "Privacy policy — create.io",
  description: "How create.io collects, uses and protects your data.",
};

export default function PrivacyPage() {
  return (
    <LegalShell
      eyebrow="Privacy"
      title="Privacy policy"
      intro="create.io is a website builder. This policy explains what data we collect, why, and the choices you have."
      updated="October 2026"
    >
      <h2>What we collect</h2>
      <ul>
        <li><strong>Account details</strong> — your name and email address when you sign up. Passwords are stored only as one-way bcrypt hashes; we never see or store plain-text passwords.</li>
        <li><strong>Your websites</strong> — the pages, sections, content and settings you create, so we can save, render and publish them for you.</li>
        <li><strong>Session cookie</strong> — one strictly-necessary cookie (<code>create_io_session</code>) that keeps you logged in for up to 30 days. See our <a href="/cookies">cookie policy</a>.</li>
        <li><strong>Guest drafts</strong> — if you try the builder without an account, your edits stay in your own browser (local storage) and are never sent to our servers.</li>
      </ul>
      <h2>How we use it</h2>
      <p>
        Your data runs the service: authentication, saving your work, publishing your sites,
        and keeping everything secure. We do not sell your personal data, we run no
        third-party advertising trackers, and we do not use your site content to train models.
      </p>
      <h2>Where it lives</h2>
      <p>
        Account and website data is stored in a managed PostgreSQL database (Neon) in
        production. Passwords are hashed with bcrypt before storage.
      </p>
      <h2>Your choices</h2>
      <ul>
        <li>View and edit your profile any time from <a href="/settings">account settings</a>.</li>
        <li>Delete a website from your <a href="/dashboard">dashboard</a> — published pages for that site stop being served.</li>
        <li>Log out from any device to invalidate the session cookie immediately.</li>
        <li>To request a copy of your data or deletion of your account, contact us through the site and we will action verified requests within 30 days.</li>
      </ul>
      <h2>Changes</h2>
      <p>
        If this policy changes materially, we will update the date above and, for
        significant changes, note it in the product. Continued use of create.io after a
        change means you accept the updated policy.
      </p>
    </LegalShell>
  );
}
