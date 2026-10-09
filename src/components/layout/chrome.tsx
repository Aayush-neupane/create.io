"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { TEMPLATES } from "@/lib/templates";
import { SECTION_META } from "@/components/templates/Renderer";

export function LogoTile({ size = 30 }: { size?: number }) {
  return (
    <span
      className="grid flex-none place-items-center overflow-hidden"
      style={{ width: size, height: size, background: "var(--paper)" }}
    >
      <Image src="/logo.png" alt="" width={size - 4} height={size - 4} priority />
    </span>
  );
}

export function BrandMark({ size = 30, onDark }: { size?: number; onDark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoTile size={size} />
      <span className="display display-upper" style={{ fontSize: 19, color: onDark ? "var(--paper)" : "var(--paper)" }}>
        create.io
      </span>
    </span>
  );
}

/** Square profile entry point — links to the account page everywhere. */
export function ProfileIcon({ name, size = 36 }: { name: string; size?: number }) {
  return (
    <Link
      href="/settings"
      aria-label={`Account settings for ${name}`}
      title={name}
      className="grid flex-none place-items-center font-bold transition-colors"
      style={{ width: size, height: size, background: "var(--accent)", color: "var(--ink)", fontSize: Math.round(size * 0.42) }}
    >
      {name.slice(0, 1).toUpperCase()}
    </Link>
  );
}

const NAV = [
  { href: "/templates", label: "Templates" },
  { href: "/demo", label: "Demo" },
  { href: "/#how", label: "Process" },
  { href: "/#work", label: "Work" },
  { href: "/#faq", label: "FAQ" },
];

export function Navbar({ user }: { user?: { name: string } | null }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50" style={{ background: "var(--ink)", color: "var(--paper)" }}>
      <div className="mx-auto flex h-[72px] w-full max-w-6xl items-center gap-8 px-6">
        <Link href="/" aria-label="create.io home">
          <BrandMark />
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="font-mono text-[12px] font-bold uppercase transition-colors hover:text-white"
              style={{ letterSpacing: "0.14em", color: "var(--cream-dim)" }}
            >
              {n.label}
            </Link>
          ))}
          {user && (
            <Link
              href="/dashboard"
              className="font-mono text-[12px] font-bold uppercase"
              style={{ letterSpacing: "0.14em", color: "var(--accent)" }}
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          {user ? (
            <>
              <Link href="/new" className="btn-cream hidden !h-11 sm:inline-flex" style={{ fontSize: 12 }}>
                Start building
              </Link>
              <ProfileIcon name={user.name} />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden font-mono text-[12px] font-bold uppercase transition-colors hover:text-white sm:inline"
                style={{ letterSpacing: "0.14em", color: "var(--cream-dim)" }}
              >
                Log in
              </Link>
              <Link href="/new" className="btn-cream hidden !h-11 sm:inline-flex" style={{ fontSize: 12 }}>
                Start building
              </Link>
            </>
          )}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center transition-colors lg:hidden"
            style={{ border: "1px solid rgba(244,239,228,.25)" }}
          >
            <span aria-hidden className="relative block h-3.5 w-4">
              <i className="absolute inset-x-0 top-0 h-[2px] bg-current transition-all duration-300" style={{ transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
              <i className="absolute inset-x-0 top-[7px] h-[2px] bg-current transition-opacity duration-200" style={{ opacity: open ? 0 : 1 }} />
              <i className="absolute inset-x-0 bottom-0 h-[2px] bg-current transition-all duration-300" style={{ transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }} />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <nav aria-label="Mobile navigation" className="lg:hidden" style={{ borderTop: "1px solid rgba(244,239,228,.15)", background: "var(--ink)" }}>
          <div className="flex flex-col px-6 py-4">
            {[...NAV, ...(user ? [{ href: "/dashboard", label: "Dashboard" }, { href: "/settings", label: "Account" }] : [])].map((n, i) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="display display-upper flex items-baseline gap-4 border-b py-4 text-3xl"
                style={{ borderColor: "rgba(244,239,228,.12)", color: "var(--paper)" }}
              >
                <span className="font-mono text-[10px]" style={{ color: "var(--accent)" }}>{String(i + 1).padStart(2, "0")}</span>
                {n.label}
              </Link>
            ))}
            <div className="flex gap-3 py-5">
              {user ? (
                <Link href="/new" onClick={() => setOpen(false)} className="btn-cream flex-1">
                  New website
                </Link>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)} className="btn-ghost flex-1 !text-[#f4efe4]" style={{ borderColor: "rgba(244,239,228,.3)" }}>
                    Log in
                  </Link>
                  <Link href="/new" onClick={() => setOpen(false)} className="btn-cream flex-1">
                    Start building
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
  { href: "/demo", label: "Demo" },
  { href: "/settings", label: "Account" },
];

/** Shared navbar for authenticated app pages (dashboard, account). */
export function AppNavbar({ user, active, actions }: { user?: { name: string } | null; active: string; actions?: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50" style={{ background: "var(--ink)", color: "var(--paper)" }}>
      <div className="mx-auto flex h-[72px] w-full max-w-6xl items-center gap-8 px-6">
        <Link href="/dashboard" aria-label="create.io dashboard">
          <BrandMark />
        </Link>
        <nav aria-label="App navigation" className="hidden items-center gap-7 lg:flex">
          {APP_NAV.map((n) => {
            const on = active === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={on ? "page" : undefined}
                className="font-mono text-[12px] font-bold uppercase transition-colors hover:text-white"
                style={{ letterSpacing: "0.14em", color: on ? "var(--accent)" : "var(--cream-dim)" }}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <Link href="/new" className="btn-cream hidden !h-11 sm:inline-flex" style={{ fontSize: 12 }}>
            New website
          </Link>
          {actions}
          {user && <ProfileIcon name={user.name} />}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center lg:hidden"
            style={{ border: "1px solid rgba(244,239,228,.25)" }}
          >
            <span aria-hidden className="relative block h-3.5 w-4">
              <i className="absolute inset-x-0 top-0 h-[2px] bg-current transition-all duration-300" style={{ transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
              <i className="absolute inset-x-0 top-[7px] h-[2px] bg-current transition-opacity duration-200" style={{ opacity: open ? 0 : 1 }} />
              <i className="absolute inset-x-0 bottom-0 h-[2px] bg-current transition-all duration-300" style={{ transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }} />
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <nav aria-label="Mobile navigation" className="lg:hidden" style={{ borderTop: "1px solid rgba(244,239,228,.15)" }}>
          <div className="flex flex-col px-6 py-4">
            {APP_NAV.map((n, i) => {
              const on = active === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  aria-current={on ? "page" : undefined}
                  className="display display-upper flex items-baseline gap-4 border-b py-4 text-3xl"
                  style={{ borderColor: "rgba(244,239,228,.12)", color: on ? "var(--accent)" : "var(--paper)" }}
                >
                  <span className="font-mono text-[10px]" style={{ color: "var(--accent)" }}>{String(i + 1).padStart(2, "0")}</span>
                  {n.label}
                </Link>
              );
            })}
            <div className="flex gap-3 py-5" onClick={() => setOpen(false)}>
              <Link href="/new" className="btn-cream flex-1">
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
    { h: "Explore", links: [{ href: "/templates", label: "Templates" }, { href: "/demo", label: "Live demo" }, { href: "/#how", label: "Process" }, { href: "/#faq", label: "FAQ" }] },
    { h: "Start", links: [{ href: "/new", label: "Create a site" }, { href: "/dashboard", label: "Dashboard" }, { href: "/demo", label: "Try it live" }] },
    { h: "Account", links: [{ href: "/login", label: "Log in" }, { href: "/signup", label: "Sign up" }, { href: "/settings", label: "Settings" }] },
    { h: "Legal", links: [{ href: "/privacy", label: "Privacy" }, { href: "/terms", label: "Terms" }, { href: "/cookies", label: "Cookies" }] },
  ];
  return (
    <footer style={{ background: "var(--ink)", color: "var(--paper)" }}>
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <BrandMark onDark />
            <p className="display display-upper mt-6 max-w-[16ch]" style={{ fontSize: "clamp(30px,4vw,44px)", color: "var(--paper)" }}>
              Websites, already designed.
            </p>
            <p className="mono-meta mt-4 font-mono text-[10px] font-bold uppercase" style={{ letterSpacing: "0.18em", color: "var(--cream-dim)" }}>
              {TEMPLATES.length} sites · {styleCount}+ styles · 0 code
            </p>
            <Link href="/new" className="btn-tan mt-6">
              Start building →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {cols.map((c) => (
              <div key={c.h}>
                <h4 className="font-mono text-[10px] font-bold uppercase" style={{ letterSpacing: "0.2em", color: "var(--accent)" }}>
                  {c.h}
                </h4>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="transition-colors hover:text-white" style={{ color: "var(--cream-dim)" }}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="display display-upper mt-14 select-none text-center leading-none" aria-hidden style={{ fontSize: "clamp(64px,13vw,180px)", color: "rgba(244,239,228,.07)" }}>
          create.io
        </p>

        <div className="flex flex-col gap-3 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: "rgba(244,239,228,.15)", color: "var(--cream-dim)" }}>
          <p className="flex flex-wrap items-center gap-x-5 gap-y-1 font-mono uppercase" style={{ letterSpacing: "0.12em", fontSize: 10 }}>
            <span>© 2026 create.io</span>
            <Link href="/privacy" className="transition-colors hover:text-white">Privacy</Link>
            <Link href="/terms" className="transition-colors hover:text-white">Terms</Link>
            <Link href="/cookies" className="transition-colors hover:text-white">Cookies</Link>
          </p>
          <a href="#top" className="font-mono text-[10px] font-bold uppercase transition-colors hover:text-white" style={{ letterSpacing: "0.14em" }}>
            Back to top ↑
          </a>
        </div>
        <div className="pt-5">
          <a
            href="https://aayushnp.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Aayush Neupane — portfolio"
            className="mx-auto flex w-full max-w-xl items-center justify-center gap-2.5 font-mono text-[0.7rem] uppercase transition-colors hover:text-white"
            style={{ letterSpacing: "0.14em", color: "var(--cream-dim)" }}
          >
            <Image src="/logo.png" alt="Aayush Neupane" width={32} height={32} className="h-8 w-8 rounded-full object-cover" style={{ border: "1px solid rgba(244,239,228,.25)" }} />
            <span>
              Developed by <span className="underline-offset-4 hover:underline" style={{ color: "var(--paper)" }}>Aayush Neupane</span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
