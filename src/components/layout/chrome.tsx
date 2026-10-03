"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { TEMPLATES } from "@/lib/templates";
import { SECTION_META } from "@/components/templates/Renderer";

export function LogoTile({ size = 28 }: { size?: number }) {
  return (
    <span
      className="grid flex-none place-items-center overflow-hidden"
      style={{ width: size, height: size, borderRadius: 9, background: "#17171b", boxShadow: "0 0 0 1px rgba(0,0,0,.4) inset" }}
    >
      <Image src="/logo.png" alt="" width={size - 4} height={size - 4} priority />
    </span>
  );
}

export function BrandMark({ size = 28 }: { size?: number }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoTile size={size} />
      <span className="text-[17px] font-semibold" style={{ letterSpacing: "-0.035em" }}>
        create.io
      </span>
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
      className="grid flex-none place-items-center rounded-full font-semibold text-white transition-transform duration-200 hover:scale-105"
      style={{ width: size, height: size, background: "var(--ink)", fontSize: Math.round(size * 0.42) }}
    >
      {name.slice(0, 1).toUpperCase()}
    </Link>
  );
}

const NAV = [
  { href: "/templates", label: "Templates" },
  { href: "/#how", label: "How it works" },
  { href: "/#features", label: "Features" },
];

export function Navbar({ user }: { user?: { name: string } | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className="sticky top-0 z-40 transition-shadow duration-300"
      style={{
        background: "var(--paper)",
        borderBottom: "1px solid var(--line)",
        boxShadow: scrolled ? "0 12px 32px -20px rgba(23,23,27,.35)" : "none",
      }}
    >
      <div className="relative mx-auto flex h-16 max-w-7xl items-center gap-7 px-6">
        <Link href="/" aria-label="create.io home">
          <BrandMark />
        </Link>
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="nav-link rounded-[9px] px-3 py-[7px] text-sm transition-colors hover:bg-black/[0.045]"
              style={{ color: "var(--ink-2)" }}
            >
              {n.label}
            </Link>
          ))}
          {user && (
            <Link href="/dashboard" className="nav-link rounded-[9px] px-3 py-[7px] text-sm font-medium transition-colors hover:bg-black/[0.045]" style={{ color: "var(--ink)" }}>
              Dashboard
            </Link>
          )}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {user ? (
            <>
              <Link href="/new" className="btn-primary hidden sm:inline-flex" style={{ height: 36, fontSize: 13 }}>
                Start building
              </Link>
              <ProfileIcon name={user.name} />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded-[9px] px-3 py-2 text-sm font-medium transition-colors hover:bg-black/[0.045] sm:inline"
                style={{ color: "var(--ink-2)" }}
              >
                Log in
              </Link>
              <Link href="/new" className="btn-primary hidden sm:inline-flex" style={{ height: 36, fontSize: 13 }}>
                Start building
              </Link>
            </>
          )}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-9 w-9 place-items-center rounded-[9px] transition-colors hover:bg-black/[0.045] md:hidden"
            style={{ color: "var(--ink)" }}
          >
            <span aria-hidden className="relative block h-3.5 w-4">
              <i className="absolute inset-x-0 top-0 h-[1.8px] rounded bg-current transition-all duration-300" style={{ transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
              <i className="absolute inset-x-0 top-[7px] h-[1.8px] rounded bg-current transition-opacity duration-200" style={{ opacity: open ? 0 : 1 }} />
              <i className="absolute inset-x-0 bottom-0 h-[1.8px] rounded bg-current transition-all duration-300" style={{ transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }} />
            </span>
          </button>
        </div>
      </div>
      <div className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out md:hidden ${open ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]"}`}>
        <nav className="min-h-0 overflow-hidden">
          <div className="space-y-0.5 border-t px-6 py-3" style={{ borderColor: "var(--line)" }}>
            {[...NAV, ...(user ? [{ href: "/dashboard", label: "Dashboard" }, { href: "/settings", label: "Account" }] : [])].map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="block rounded-[9px] px-3 py-2.5 text-[15px] font-medium transition-colors hover:bg-black/[0.045]"
                style={{ color: "var(--ink)" }}
              >
                {n.label}
              </Link>
            ))}
            <div className="flex gap-2 py-2">
              {user ? (
                <Link href="/new" onClick={() => setOpen(false)} className="btn-primary flex-1" style={{ height: 42 }}>
                  New website
                </Link>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)} className="btn-ghost flex-1" style={{ height: 42 }}>
                    Log in
                  </Link>
                  <Link href="/new" onClick={() => setOpen(false)} className="btn-primary flex-1" style={{ height: 42 }}>
                    Start building
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
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

/** Shared navbar for authenticated app pages (dashboard, account): the same
 *  centered-link design as the marketing nav, with app links + actions. */
export function AppNavbar({ user, active, actions }: { user?: { name: string } | null; active: string; actions?: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className="sticky top-0 z-40 transition-shadow duration-300"
      style={{
        background: "var(--paper)",
        borderBottom: "1px solid var(--line)",
        boxShadow: scrolled ? "0 12px 32px -20px rgba(23,23,27,.35)" : "none",
      }}
    >
      <div className="relative mx-auto flex h-16 max-w-7xl items-center gap-7 px-6">
        <Link href="/dashboard" aria-label="create.io dashboard">
          <BrandMark />
        </Link>
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 md:flex">
          {APP_NAV.map((n) => {
            const on = active === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={on ? "page" : undefined}
                className="rounded-[9px] px-3 py-[7px] text-sm transition-colors hover:bg-black/[0.045]"
                style={on ? { background: "var(--accent-soft)", color: "var(--accent-text)", fontWeight: 600 } : { color: "var(--ink-2)" }}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/new" className="btn-primary hidden sm:inline-flex" style={{ height: 36, fontSize: 13 }}>
            New website
          </Link>
          {actions}
          {user && <ProfileIcon name={user.name} />}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-9 w-9 place-items-center rounded-[9px] transition-colors hover:bg-black/[0.045] md:hidden"
            style={{ color: "var(--ink)" }}
          >
            <span aria-hidden className="relative block h-3.5 w-4">
              <i className="absolute inset-x-0 top-0 h-[1.8px] rounded bg-current transition-all duration-300" style={{ transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
              <i className="absolute inset-x-0 top-[7px] h-[1.8px] rounded bg-current transition-opacity duration-200" style={{ opacity: open ? 0 : 1 }} />
              <i className="absolute inset-x-0 bottom-0 h-[1.8px] rounded bg-current transition-all duration-300" style={{ transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }} />
            </span>
          </button>
        </div>
      </div>
      <div className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out md:hidden ${open ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]"}`}>
        <nav className="min-h-0 overflow-hidden">
          <div className="space-y-0.5 border-t px-6 py-3" style={{ borderColor: "var(--line)" }}>
            {APP_NAV.map((n) => {
              const on = active === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  aria-current={on ? "page" : undefined}
                  className="block rounded-[9px] px-3 py-2.5 text-[15px] font-medium transition-colors hover:bg-black/[0.045]"
                  style={on ? { background: "var(--accent-soft)", color: "var(--accent-text)" } : { color: "var(--ink)" }}
                >
                  {n.label}
                </Link>
              );
            })}
            <div className="flex gap-2 py-2" onClick={() => setOpen(false)}>
              <Link href="/new" className="btn-primary flex-1" style={{ height: 42 }}>
                New website
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  const cols: { h: string; links: { href: string; label: string }[] }[] = [
    { h: "Product", links: [{ href: "/templates", label: "Templates" }, { href: "/new", label: "Create a site" }, { href: "/dashboard", label: "Dashboard" }] },
    { h: "Library", links: [{ href: "/templates", label: "Portfolio" }, { href: "/templates", label: "Business" }, { href: "/templates", label: "Restaurant" }] },
    { h: "Account", links: [{ href: "/login", label: "Log in" }, { href: "/signup", label: "Sign up" }, { href: "/settings", label: "Account" }] },
    { h: "Legal", links: [{ href: "/privacy", label: "Privacy policy" }, { href: "/terms", label: "Terms of use" }, { href: "/cookies", label: "Cookie policy" }] },
  ];
  const styleCount = Object.values(SECTION_META).reduce((n, m) => n + m.variants.length, 0);
  return (
    <footer style={{ borderTop: "1px solid var(--line)", marginTop: 96 }}>
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
        <div>
          <BrandMark />
          <p className="mt-4 max-w-[330px] text-sm" style={{ color: "var(--ink-2)" }}>
            Whole websites, predesigned. Pick one, make it yours, publish in minutes.
          </p>
          <p className="mono-meta mt-4 text-xs" style={{ color: "var(--ink-3)" }}>
            {TEMPLATES.length} sites · {styleCount}+ sections · 0 code
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <h4 className="mono-meta mb-3.5 text-[11px] font-semibold uppercase" style={{ letterSpacing: "0.14em", color: "var(--ink-3)" }}>
              {c.h}
            </h4>
            {c.links.map((l) => (
              <Link key={l.label} href={l.href} className="block py-[5px] text-sm transition-all hover:translate-x-[3px]" style={{ color: "var(--ink-2)" }}>
                {l.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 pb-6 pt-5 text-[13px]" style={{ borderTop: "1px solid var(--line)", color: "var(--ink-3)" }}>
        <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>© 2026 create.io — No code · No canvas · No kidding.</span>
          <Link href="/privacy" className="transition-colors hover:text-neutral-900">Privacy</Link>
          <Link href="/terms" className="transition-colors hover:text-neutral-900">Terms</Link>
          <Link href="/cookies" className="transition-colors hover:text-neutral-900">Cookies</Link>
        </span>
        <span className="flex items-center gap-4">
          <span className="mono-meta hidden text-xs sm:inline">paper · jakarta · newsreader · mono</span>
          <a href="#top" className="inline-flex items-center gap-1 rounded-md font-medium transition-all hover:-translate-y-0.5 hover:text-neutral-900" style={{ color: "var(--ink-2)" }}>
            Back to top <span aria-hidden>↑</span>
          </a>
        </span>
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-9">
        <a
          href="https://dynamic-aayush38.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Aayush Neupane — portfolio"
          className="mx-auto flex w-full max-w-xl items-center justify-center gap-2.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] transition-colors duration-200"
          style={{ color: "var(--ink-3)" }}
        >
          <Image
            src="/logo.png"
            alt="Aayush Neupane"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full border object-cover"
            style={{ borderColor: "var(--line-2)", filter: "invert(1)" }}
          />
          <span>
            Developed by <span className="underline-offset-4 hover:underline" style={{ color: "var(--ink)" }}>Aayush Neupane</span>
          </span>
        </a>
      </div>
    </footer>
  );
}
