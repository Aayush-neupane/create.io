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

export function AuthSplit({
  kicker,
  panelTitle,
  panelPoints,
  title,
  sub,
  children,
  footer,
}: {
  kicker: string;
  panelTitle: React.ReactNode;
  panelPoints: [string, string][];
  title: string;
  sub: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.1fr]" style={{ background: "var(--paper)" }}>
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden lg:block" style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <div className="inkgrid pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative flex h-full flex-col justify-between p-12">
          <div className="flex items-center justify-between">
            <Link href="/" aria-label="create.io home"><BrandMark size={30} /></Link>
            <span className="tag-tan">No code</span>
          </div>
          <div>
            <p className="eyebrow" style={{ color: "var(--accent)" }}>{kicker}</p>
            <h2 className="display display-upper mt-4 max-w-[14ch]" style={{ fontSize: "clamp(36px,3.6vw,54px)", color: "var(--paper)" }}>
              {panelTitle}
            </h2>
            <ul className="mt-8 space-y-0 border-t" style={{ borderColor: "rgba(244,239,228,.16)" }}>
              {panelPoints.map(([t, d], i) => (
                <li key={t} className="flex gap-4 border-b py-4" style={{ borderColor: "rgba(244,239,228,.16)" }}>
                  <span className="font-mono text-[10px] font-bold" style={{ color: "var(--accent)" }}>0{i + 1}</span>
                  <div>
                    <p className="font-mono text-[11px] font-bold uppercase" style={{ letterSpacing: "0.14em", color: "var(--paper)" }}>{t}</p>
                    <p className="mt-0.5 text-sm" style={{ color: "var(--cream-dim)" }}>{d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <p className="font-mono text-[10px] font-bold uppercase" style={{ letterSpacing: "0.2em", color: "var(--cream-dim)" }}>
            14 sites · 80+ styles · 0 code
          </p>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Link href="/" className="font-mono text-[11px] font-bold uppercase transition-opacity hover:opacity-60" style={{ letterSpacing: "0.14em", color: "var(--ink-3)" }}>← Back</Link>
            <Link href="/" aria-label="create.io home"><BrandMark size={26} /></Link>
          </div>
          <Link href="/" className="hidden font-mono text-[11px] font-bold uppercase transition-opacity hover:opacity-60 lg:inline" style={{ letterSpacing: "0.14em", color: "var(--ink-3)" }}>← Back home</Link>
          <p className="mono-meta mt-4 font-mono text-[10px] font-bold uppercase" style={{ letterSpacing: "0.2em", color: "var(--accent-text)" }}>{kicker}</p>
          <h1 className="display display-upper mt-2" style={{ fontSize: "clamp(32px,3.4vw,44px)" }}>{title}</h1>
          <p className="mt-2 text-[15px]" style={{ color: "var(--ink-2)" }}>{sub}</p>
          <div className="card mt-7 p-7" style={{ borderRadius: 12 }}>
            {children}
          </div>
          {footer}
        </div>
      </div>
    </div>
  );
}

const inputStyle = { borderColor: "var(--line-2)", background: "#fff", borderRadius: 0 } as const;
const inputCls = "w-full border px-4 py-3 text-sm outline-none transition-colors";

export function LoginForm() {
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
      kicker="Members"
      panelTitle={<>Your studio is exactly as you left it.</>}
      panelPoints={[
        ["Autosaved", "Every edit stored the second you make it."],
        ["One-click publish", "Republish a finished page in seconds."],
        ["Yours to keep", "Custom domains, SEO and analytics included."],
      ]}
      title="Welcome back"
      sub="Log in to manage your websites."
      footer={<p className="mt-6 text-center text-sm" style={{ color: "var(--ink-2)" }}>No account yet? <Link href="/signup" className="font-bold underline underline-offset-4" style={{ color: "var(--ink)" }}>Sign up</Link></p>}
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="mb-1.5 block font-mono text-[10px] font-bold uppercase" style={{ letterSpacing: "0.14em" }}>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="you@example.com" className={inputCls} style={inputStyle} />
        </div>
        <div>
          <label className="mb-1.5 block font-mono text-[10px] font-bold uppercase" style={{ letterSpacing: "0.14em" }}>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="••••••••" className={inputCls} style={inputStyle} />
        </div>
        {err && <p className="border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">{err}</p>}
        <button disabled={loading} className="btn-primary w-full disabled:opacity-60">
          {loading ? "Logging in…" : "Log in →"}
        </button>
      </form>
      <div className="my-4 flex items-center gap-3 font-mono text-[10px] font-bold uppercase" style={{ letterSpacing: "0.16em", color: "var(--ink-3)" }}>
        <span className="h-px flex-1" style={{ background: "var(--line-2)" }} />
        or
        <span className="h-px flex-1" style={{ background: "var(--line-2)" }} />
      </div>
      <Link href="/demo" className="btn-ghost w-full">
        Continue as guest
      </Link>
    </AuthSplit>
  );
}

export default function LoginPage() {
  return <LoginForm />;
}
