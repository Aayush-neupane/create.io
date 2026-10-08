"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthSplit } from "@/components/auth/AuthSplit";
import { AuthSwitchLink } from "@/components/auth/AuthSwitchLink";

/** Return path requested via ?next= — internal paths only, else dashboard. */
function safeNext(): string {
  try {
    const n = new URLSearchParams(window.location.search).get("next");
    if (n && n.startsWith("/") && !n.startsWith("//")) return n;
  } catch { /* ignore */ }
  return "/dashboard";
}

const inputCls =
  "h-12 w-full border border-border bg-background px-4 text-sm text-foreground outline-none placeholder:text-muted/70 focus:border-primary";

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
    <AuthSplit
      eyebrow="Account access"
      title="Welcome back."
      sub="Log in to manage your websites — edit, preview, publish and share."
      foot="Protected session · Your sites stay yours"
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label htmlFor="login-email" className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.14em] text-muted">Email</label>
          <input id="login-email" value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="you@example.com" className={inputCls} />
        </div>
        <div>
          <label htmlFor="login-password" className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.14em] text-muted">Password</label>
          <input id="login-password" value={password} onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="••••••••" className={inputCls} />
        </div>
        {err && <p className="border border-red-900/30 bg-red-50 px-3 py-2 text-sm text-red-700">{err}</p>}
        <button disabled={loading} className="inline-flex h-12 w-full items-center justify-center rounded-full bg-foreground text-sm font-medium text-background transition hover:bg-primary disabled:opacity-60">
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>
      <div className="my-4 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
        <span className="h-px flex-1 bg-border/40" />
        or continue as guest
        <span className="h-px flex-1 bg-border/40" />
      </div>
      <Link href="/demo" className="inline-flex h-12 w-full items-center justify-center rounded-full border border-border text-sm font-medium transition hover:bg-foreground hover:text-background">
        Continue as guest — no signup
      </Link>
      <p className="mt-4 text-center text-sm text-muted">No account yet? <AuthSwitchLink href="/signup" dir="forward" className="font-medium text-foreground underline underline-offset-4">Sign up</AuthSwitchLink></p>
    </AuthSplit>
  );
}
