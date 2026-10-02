"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">Create your account</h1>
        <p className="mt-1 text-sm text-neutral-600">Start building your website in minutes.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-[13px] font-medium">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Alex Morgan" className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-[13px] font-medium">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="you@example.com" className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-[13px] font-medium">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" minLength={8} placeholder="Minimum 8 characters" className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none" />
          </div>
          {err && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{err}</p>}
          <button disabled={loading} className="btn-primary w-full disabled:opacity-60">
            {loading ? "Creating…" : "Create account"}
          </button>
        </form>
        <div className="my-4 flex items-center gap-3 text-xs" style={{ color: "var(--ink-3)" }}>
            <span className="h-px flex-1" style={{ background: "var(--line)" }} />
            or
            <span className="h-px flex-1" style={{ background: "var(--line)" }} />
          </div>
          <Link href="/demo/minimal-portfolio" className="btn-ghost w-full">
            Continue as guest — no signup
          </Link>
<p className="mt-5 text-center text-sm text-neutral-600">Already have an account? <Link href="/login" className="font-medium text-neutral-900 underline">Log in</Link></p>
      </div>
    </div>
  );
}
