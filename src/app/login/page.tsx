"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
      router.push("/dashboard");
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6" style={{ background: "var(--paper)" }}>
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-900">← Back</Link>
          <Image src="/logo.png" alt="create.io" width={32} height={32} className="h-8 w-8 rounded-md" style={{ background: "#17171b", padding: 3 }} />
        </div>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="mt-1 text-sm text-neutral-600">Log in to manage your websites.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-[13px] font-medium">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="you@example.com" className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-[13px] font-medium">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="••••••••" className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none" />
          </div>
          {err && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{err}</p>}
          <button disabled={loading} className="btn-primary w-full disabled:opacity-60">
            {loading ? "Logging in…" : "Log in"}
          </button>
        </form>
        <div className="my-4 flex items-center gap-3 text-xs" style={{ color: "var(--ink-3)" }}>
            <span className="h-px flex-1" style={{ background: "var(--line)" }} />
            or
            <span className="h-px flex-1" style={{ background: "var(--line)" }} />
          </div>
          <Link href="/demo" className="btn-ghost w-full">
            Continue as guest — no signup
          </Link>
<p className="mt-5 text-center text-sm text-neutral-600">No account yet? <Link href="/signup" className="font-medium text-neutral-900 underline">Sign up</Link></p>
      </div>
    </div>
  );
}
