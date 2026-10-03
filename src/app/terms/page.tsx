import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/legal";

export const metadata: Metadata = {
  title: "Terms of use — create.io",
  description: "The rules for using create.io.",
};

export default function TermsPage() {
  return (
    <LegalShell
      eyebrow="Terms"
      title="Terms of use"
      intro="Plain-language rules for using create.io. By creating an account or using the service, you agree to them."
      updated="October 2026"
    >
      <h2>The service</h2>
      <p>
        create.io provides predesigned website templates, a structured editing builder, and
        hosting for sites you publish. We may update, improve or discontinue features over
        time; where a change materially affects published sites, we aim to give notice first.
      </p>
      <h2>Your account</h2>
      <ul>
        <li>You must be at least 13 years old (or the age of digital consent in your country) to create an account.</li>
        <li>Keep your password private. You are responsible for activity under your account — log out on shared devices.</li>
        <li>One account per person for the free tier; contact us about team or classroom use.</li>
      </ul>
      <h2>Your content</h2>
      <ul>
        <li>You own the text, images and data you put into your sites. You grant us a license to store, render and serve that content solely to operate the service for you.</li>
        <li>Only publish content you have the rights to — no plagiarism, no unlicensed images, nothing unlawful.</li>
        <li>We may remove published content that is illegal, phishing, malware, or clearly abusive, and we may suspend accounts that repeatedly violate this.</li>
      </ul>
      <h2>Acceptable use</h2>
      <p>
        No scraping or reverse-engineering the service at abusive scale, no attempts to
        breach other users&apos; accounts or data, no spam, and no using published sites for
        fraud or deception.
      </p>
      <h2>Availability and liability</h2>
      <p>
        We aim for a fast, reliable service but provide it &ldquo;as is&rdquo; without
        warranties. To the maximum extent permitted by law, create.io is not liable for
        indirect or consequential losses arising from your use of the service. Keep your own
        backups of important content.
      </p>
      <h2>Changes</h2>
      <p>
        We may update these terms; the date above always shows the current version.
        Material changes will be flagged in the product. If you disagree with updated terms,
        stop using the service and delete your account data via <a href="/settings">settings</a>.
      </p>
    </LegalShell>
  );
}
