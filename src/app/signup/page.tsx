"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthSplit } from "../login/page";

/** Return path requested via ?next= — internal paths only, else dashboard. */
function safeNext(): string {
  try {
    const n = new URLSearchParams(window.location.search).get("next");
    if (n && n.startsWith("/") && !n.startsWith("//")) return n;
  } catch { /* ignore */ }
  return "/dashboard";
}

const inputStyle = { borderColor: "var(--line-2)", background: "#fff", borderRadius: 0 } as const;
const inputCls = "w-full border px-4 py-3 text-sm outline-none transition-colors";

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
      kicker="New account · Free start"
      panelTitle={<>Fourteen sites. Zero lines of code.</>}
      panelPoints={[
        ["Pick", "A finished site with its own sections and copy."],
        ["Fill", "Plain fields — projects, menus, hours, photos."],
        ["Publish", "One click to a fast public page."],
      ]}
      title="Join create.io"
      sub="Start building your website in minutes."
      footer={<p className="mt-6 text-center text-sm" style={{ color: "var(--ink-2)" }}>Already have an account? <Link href="/login" className="font-bold underline underline-offset-4" style={{ color: "var(--ink)" }}>Log in</Link></p>}
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="mb-1.5 block font-mono text-[10px] font-bold uppercase" style={{ letterSpacing: "0.14em" }}>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Alex Morgan" className={inputCls} style={inputStyle} />
        </div>
        <div>
          <label className="mb-1.5 block font-mono text-[10px] font-bold uppercase" style={{ letterSpacing: "0.14em" }}>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="you@example.com" className={inputCls} style={inputStyle} />
        </div>
        <div>
          <label className="mb-1.5 block font-mono text-[10px] font-bold uppercase" style={{ letterSpacing: "0.14em" }}>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" minLength={8} placeholder="Minimum 8 characters" className={inputCls} style={inputStyle} />
        </div>
        {err && <p className="border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">{err}</p>}
        <button disabled={loading} className="btn-primary w-full disabled:opacity-60">
          {loading ? "Creating…" : "Create account →"}
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
