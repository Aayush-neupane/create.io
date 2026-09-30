import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "create.io — Build a website without building it from scratch",
  description: "Choose a professionally designed template, add your content, customize the look, and publish your website in minutes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[#fafafa] text-neutral-900">{children}</body>
    </html>
  );
}
