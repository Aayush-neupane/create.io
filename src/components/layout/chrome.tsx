import Image from "next/image";
import Link from "next/link";

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

const NAV = [
  { href: "/templates", label: "Templates" },
  { href: "/#how", label: "How it works" },
  { href: "/#features", label: "Features" },
];

export function Navbar({ user }: { user?: { name: string } | null }) {
  return (
    <header
      className="sticky top-0 z-40"
      style={{
        background: "color-mix(in srgb, var(--paper) 78%, transparent)",
        backdropFilter: "blur(18px) saturate(1.4)",
        WebkitBackdropFilter: "blur(18px) saturate(1.4)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-7 px-6">
        <Link href="/" aria-label="create.io home">
          <BrandMark />
        </Link>
        <nav className="ml-2 hidden items-center gap-0.5 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-[9px] px-3 py-[7px] text-sm transition-colors"
              style={{ color: "var(--ink-2)" }}
            >
              {n.label}
            </Link>
          ))}
          {user && (
            <Link href="/dashboard" className="rounded-[9px] px-3 py-[7px] text-sm font-medium" style={{ color: "var(--ink)" }}>
              Dashboard
            </Link>
          )}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {user ? (
            <>
              <span className="mono-meta mr-1 hidden text-xs lg:inline" style={{ color: "var(--ink-3)" }}>
                {user.name}
              </span>
              <Link href="/new" className="btn-primary" style={{ height: 36, fontSize: 13 }}>
                New website
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-[9px] px-3 py-2 text-sm font-medium transition-colors"
                style={{ color: "var(--ink-2)" }}
              >
                Log in
              </Link>
              <Link href="/new" className="btn-primary" style={{ height: 36, fontSize: 13 }}>
                Start building
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  const cols: { h: string; links: { href: string; label: string }[] }[] = [
    { h: "Product", links: [{ href: "/templates", label: "Templates" }, { href: "/new", label: "Create a site" }, { href: "/dashboard", label: "Dashboard" }] },
    { h: "Library", links: [{ href: "/templates", label: "Portfolio" }, { href: "/templates", label: "Business" }, { href: "/templates", label: "Restaurant" }] },
    { h: "Account", links: [{ href: "/login", label: "Log in" }, { href: "/signup", label: "Sign up" }, { href: "/settings", label: "Settings" }] },
  ];
  return (
    <footer style={{ borderTop: "1px solid var(--line)", marginTop: 96 }}>
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.7fr_1fr_1fr_1fr]">
        <div>
          <BrandMark />
          <p className="mt-4 max-w-[330px] text-sm" style={{ color: "var(--ink-2)" }}>
            Whole websites, predesigned. Pick one, make it yours, publish in minutes.
          </p>
          <p className="mono-meta mt-4 text-xs" style={{ color: "var(--ink-3)" }}>
            6 sites · 50+ sections · 0 code
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
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 px-6 pb-6 pt-5 text-[13px]" style={{ borderTop: "1px solid var(--line)", color: "var(--ink-3)" }}>
        <span>© 2026 create.io — Minimal sites. Maximum voltage.</span>
        <span className="mono-meta text-xs">paper · jakarta · newsreader · mono</span>
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
