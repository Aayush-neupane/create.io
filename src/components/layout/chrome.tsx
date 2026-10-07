"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { TEMPLATES } from "@/lib/templates";
import { SECTION_META } from "@/components/templates/Renderer";
import { site } from "@/config/site";

/** ui-kit paper-editorial chrome for create.io:
 *  sticky hard-border bar, serif letter mark, pill CTAs. */

export function LogoTile({ size = 28 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      className="grid flex-none place-items-center rounded-md bg-primary font-serif leading-none text-white"
      style={{ width: size, height: size, fontSize: size * 0.62 }}
    >
      {site.mark}
    </span>
  );
}

export function BrandMark({ size = 28 }: { size?: number }) {
  return (
    <span className="flex items-center gap-2.5 text-base font-semibold tracking-[-0.025em]">
      <LogoTile size={size} />
      {site.brand}
    </span>
  );
}

/** Circular profile entry point — links to the account page everywhere. */
export function ProfileIcon({ name, size = 34 }: { name: string; size?: number }) {
  return (
    <Link
      href="/settings"
      aria-label={`Account settings for ${name}`}
      title={name}
      className="grid flex-none place-items-center rounded-full bg-foreground font-semibold text-background transition-colors hover:bg-primary"
      style={{ width: size, height: size, fontSize: Math.round(size * 0.42) }}
    >
      {name.slice(0, 1).toUpperCase()}
    </Link>
  );
}

const NAV = [
  { href: "/templates", label: "Templates" },
  { href: "/#library", label: "Library" },
  { href: "/#how", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/#faq", label: "FAQ" },
];

export function Navbar({ user }: { user?: { name: string } | null }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 text-foreground backdrop-blur-md">
      <div className="mx-auto flex h-20 w-full max-w-shell items-center justify-between px-6 sm:px-10 lg:px-16 xl:px-20">
        <Link href="/" aria-label="create.io home">
          <BrandMark />
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-6 text-sm lg:flex xl:gap-8">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="transition hover:text-primary-strong">
              {n.label}
            </Link>
          ))}
          {user && (
            <Link href="/dashboard" className="font-medium transition hover:text-primary-strong">
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <>
              <Link
                href="/new"
                className="hidden rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:bg-primary sm:inline-flex"
              >
                Start building
              </Link>
              <ProfileIcon name={user.name} />
            </>
          ) : (
            <>
              <Link href="/login" className="hidden px-2 py-2 text-sm font-medium transition hover:text-primary-strong sm:inline">
                Log in
              </Link>
              <Link
                href="/new"
                className="hidden rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:bg-primary sm:inline-flex"
              >
                Try create.io
              </Link>
            </>
          )}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-border lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav aria-label="Mobile navigation" className="border-t border-border bg-background px-6 py-5 lg:hidden">
          <div className="flex flex-col">
            {[...NAV, ...(user ? [{ href: "/dashboard", label: "Dashboard" }, { href: "/settings", label: "Account" }] : [])].map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/20 py-4 text-lg font-medium"
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-5 flex gap-3">
              {user ? (
                <Link
                  href="/new"
                  onClick={() => setOpen(false)}
                  className="flex h-12 flex-1 items-center justify-center rounded-full bg-foreground text-sm font-medium text-background"
                >
                  New website
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="flex h-12 flex-1 items-center justify-center rounded-full border border-border text-sm font-medium"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/new"
                    onClick={() => setOpen(false)}
                    className="flex h-12 flex-1 items-center justify-center rounded-full bg-foreground text-sm font-medium text-background"
                  >
                    Try create.io
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

/** Session-aware navbar for client pages (templates, demo): resolves the
 *  logged-in user via /api/auth/me so members see Dashboard, not Log in. */
export function SiteNavbar() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  useEffect(() => {
    let live = true;
    fetch("/api/auth/me", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (live && d?.user?.name) setUser({ name: d.user.name });
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);
  return <Navbar user={user} />;
}

const APP_NAV = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/templates", label: "Templates" },
  { href: "/settings", label: "Account" },
];

/** Shared navbar for authenticated app pages (dashboard, account). */
export function AppNavbar({ user, active, actions }: { user?: { name: string } | null; active: string; actions?: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 text-foreground backdrop-blur-md">
      <div className="mx-auto flex h-20 w-full max-w-shell items-center justify-between px-6 sm:px-10 lg:px-16 xl:px-20">
        <Link href="/dashboard" aria-label="create.io dashboard">
          <BrandMark />
        </Link>
        <nav aria-label="App navigation" className="hidden items-center gap-6 text-sm lg:flex xl:gap-8">
          {APP_NAV.map((n) => {
            const on = active === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={on ? "page" : undefined}
                className={`transition hover:text-primary-strong ${on ? "font-semibold text-primary-strong" : ""}`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/new"
            className="hidden rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:bg-primary sm:inline-flex"
          >
            New website
          </Link>
          {actions}
          {user && <ProfileIcon name={user.name} />}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-border lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open ? (
        <nav aria-label="Mobile navigation" className="border-t border-border bg-background px-6 py-5 lg:hidden">
          <div className="flex flex-col">
            {APP_NAV.map((n) => {
              const on = active === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  aria-current={on ? "page" : undefined}
                  className={`border-b border-border/20 py-4 text-lg font-medium ${on ? "text-primary-strong" : ""}`}
                >
                  {n.label}
                </Link>
              );
            })}
            <div className="mt-5 flex gap-3">
              <Link
                href="/new"
                onClick={() => setOpen(false)}
                className="flex h-12 flex-1 items-center justify-center rounded-full bg-foreground text-sm font-medium text-background"
              >
                New website
              </Link>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

export function Footer() {
  const styleCount = Object.values(SECTION_META).reduce((n, m) => n + m.variants.length, 0);
  const cols: { h: string; links: { href: string; label: string }[] }[] = [
    { h: "Explore", links: [{ href: "/templates", label: "Templates" }, { href: "/#library", label: "Library" }, { href: "/#how", label: "How it works" }, { href: "/about", label: "About" }, { href: "/#faq", label: "FAQ" }] },
    { h: "Start", links: [{ href: "/new", label: "Create a site" }, { href: "/dashboard", label: "Dashboard" }, { href: "/demo", label: "Live demo" }] },
    { h: "Account", links: [{ href: "/login", label: "Log in" }, { href: "/signup", label: "Sign up" }, { href: "/settings", label: "Settings" }] },
    { h: "Legal", links: [{ href: "/privacy", label: "Privacy" }, { href: "/terms", label: "Terms" }, { href: "/cookies", label: "Cookies" }] },
  ];
  return (
    <footer id="footer" className="bg-[#1f1e1a] text-[#eee9de]">
      <div className="mx-auto max-w-shell px-6 pb-8 pt-16 sm:px-10 lg:px-16 lg:pt-20 xl:px-20">
        <div className="grid gap-14 border-b border-white/20 pb-16 md:grid-cols-2 lg:grid-cols-[1.35fr_0.65fr_0.65fr_0.65fr_0.65fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 text-lg font-semibold tracking-[-0.025em]">
              <span
                aria-hidden="true"
                className="grid h-8 w-8 place-items-center rounded-md bg-[#d97757] font-serif text-xl text-white"
              >
                {site.mark}
              </span>
              {site.brand}
            </Link>
            <p className="mt-6 max-w-md font-serif text-3xl leading-[1.12] tracking-[-0.03em] sm:text-4xl">
              Whole websites, predesigned.
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#918c83]">
              {TEMPLATES.length} sites · {styleCount}+ sections · 0 code
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.h}>
              <h2 className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#918c83]">{c.h}</h2>
              <ul className="mt-5 space-y-3.5 text-sm text-[#c9c3b8]">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="transition hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 pt-7 text-xs text-[#918c83] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {site.brand} — No code · No canvas · No kidding.</p>
          <p>Paper theme · Hard borders · Serif headlines.</p>
        </div>
        <div className="pt-5">
          <a
            href="https://dynamic-aayush38.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Aayush Neupane — portfolio"
            className="mx-auto flex w-full max-w-xl items-center justify-center gap-2.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[#918c83] transition-colors hover:text-white"
          >
            <Image
              src="/logo.png"
              alt="Aayush Neupane"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border border-white/20 object-cover"
              style={{ filter: "invert(1)" }}
            />
            <span>
              Developed by <span className="underline-offset-4 hover:underline">Aayush Neupane</span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
