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

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (!name.trim()) { setErr("Enter your name."); return; }
    if (!email.trim()) { setErr("Enter your email."); return; }
    if (password.length < 8) { setErr("Password must be at least 8 characters."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, password }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string }).error || "Could not create account.");
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
      eyebrow="Get started"
      title="Your first site starts here."
      sub="Create your account and turn a finished template into your live website in minutes."
      foot="Free start · No card required · Live preview"
      flip
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label htmlFor="signup-name" className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.14em] text-muted">Full name</label>
          <input id="signup-name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Alex Morgan" className={inputCls} />
        </div>
        <div>
          <label htmlFor="signup-email" className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.14em] text-muted">Email</label>
          <input id="signup-email" value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="you@example.com" className={inputCls} />
        </div>
        <div>
          <label htmlFor="signup-password" className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.14em] text-muted">Password</label>
          <input id="signup-password" value={password} onChange={(e) => setPassword(e.target.value)} required type="password" minLength={8} placeholder="Minimum 8 characters" className={inputCls} />
        </div>
        {err && <p className="border border-red-900/30 bg-red-50 px-3 py-2 text-sm text-red-700">{err}</p>}
        <button disabled={loading} className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-medium text-white transition hover:bg-primary-strong disabled:opacity-60">
          {loading ? "Creating…" : "Create account"}
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
      <p className="mt-4 text-center text-sm text-muted">Already have an account? <AuthSwitchLink href="/login" dir="back" className="font-medium text-primary-strong underline underline-offset-4">Log in</AuthSwitchLink></p>
    </AuthSplit>
  );
}
