"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrandMark } from "@/components/layout/chrome";

/** Return path requested via ?next= — internal paths only, else dashboard. */
function safeNext(): string {
  try {
    const n = new URLSearchParams(window.location.search).get("next");
    if (n && n.startsWith("/") && !n.startsWith("//")) return n;
  } catch { /* ignore */ }
  return "/dashboard";
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (!email.trim() || !password) { setErr("Enter your email and password."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string }).error || "Could not log in.");
      router.push(safeNext());
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="marketing-theme flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="kit-panel w-full max-w-sm p-8" style={{ borderRadius: "1.25rem" }}>
        <div className="flex items-center justify-between">
          <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-900">← Back</Link>
          <Link href="/" aria-label="create.io home"><BrandMark size={26} /></Link>
        </div>
        <h1 className="mt-4 font-serif text-3xl tracking-[-0.03em]">Welcome back</h1>
        <p className="mt-1 text-sm text-muted">Log in to manage your websites.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-[13px] font-medium">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="you@example.com" className="w-full border border-border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted/70 focus:border-primary" />
          </div>
          <div>
            <label className="mb-1.5 block text-[13px] font-medium">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="••••••••" className="w-full border border-border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted/70 focus:border-primary" />
          </div>
          {err && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{err}</p>}
          <button disabled={loading} className="inline-flex h-12 w-full items-center justify-center rounded-full bg-foreground text-sm font-medium text-background transition hover:bg-primary disabled:opacity-60">
            {loading ? "Logging in…" : "Log in"}
          </button>
        </form>
        <div className="my-4 flex items-center gap-3 text-xs text-muted">
            <span className="h-px flex-1 bg-border/40" />
            or
            <span className="h-px flex-1 bg-border/40" />
          </div>
          <Link href="/demo" className="inline-flex h-12 w-full items-center justify-center rounded-full border border-border text-sm font-medium transition hover:bg-foreground hover:text-background">
            Continue as guest — no signup
          </Link>
<p className="mt-5 text-center text-sm text-muted">No account yet? <Link href="/signup" className="font-medium text-foreground underline">Sign up</Link></p>
      </div>
    </div>
  );
}
