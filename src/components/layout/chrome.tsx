import Link from "next/link";
import { currentUser } from "@/lib/auth";

export async function Navbar() {
  const user = await currentUser();
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-white">C</span>
          <span className="text-[15px] font-semibold tracking-tight text-neutral-900">create.io</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-neutral-600 md:flex">
          <Link href="/templates" className="hover:text-neutral-900">Templates</Link>
          <Link href="/#how" className="hover:text-neutral-900">How it works</Link>
          <Link href="/#features" className="hover:text-neutral-900">Features</Link>
          {user && <Link href="/dashboard" className="hover:text-neutral-900">Dashboard</Link>}
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link href="/dashboard" className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100">
                Dashboard
              </Link>
              <Link href="/new" className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700">
                New website
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100">
                Log in
              </Link>
              <Link href="/signup" className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700">
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
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-neutral-900 text-xs font-bold text-white">C</span>
          <span className="text-sm font-semibold text-neutral-900">create.io</span>
          <span className="text-sm text-neutral-500">— Build a website without building it from scratch.</span>
        </div>
        <div className="flex gap-6 text-sm text-neutral-500">
          <Link href="/templates" className="hover:text-neutral-900">Templates</Link>
          <Link href="/dashboard" className="hover:text-neutral-900">Dashboard</Link>
          <Link href="/login" className="hover:text-neutral-900">Log in</Link>
        </div>
      </div>
    </footer>
  );
}
