"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { confirmPopup } from "@/components/ui/confirm";

export function DashboardActions({ compact, id, slug }: { compact?: boolean; id?: string; slug?: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function logout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Logout is idempotent — still navigate home.
    }
    router.push("/");
    router.refresh();
  }

  async function duplicate() {
    if (!id) return;
    setBusy(true);
    setErr("");
    try {
      const res = await fetch(`/api/websites/${id}/duplicate`, { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string }).error || "Could not duplicate.");
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Could not duplicate.");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!id) return;
    const ok = await confirmPopup({
      title: "Delete this website?",
      message: "The site and all its pages will be gone. This cannot be undone.",
      confirmLabel: "Delete",
      danger: true,
    });
    if (!ok) return;
    setBusy(true);
    setErr("");
    try {
      const res = await fetch(`/api/websites/${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string }).error || "Could not delete.");
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Could not delete.");
    } finally {
      setBusy(false);
    }
  }

  if (compact && id) {
    return (
      <div className="mt-2 text-[13px]">
        <div className="flex gap-2">
          <button onClick={duplicate} disabled={busy} className="flex-1 rounded-lg bg-neutral-100 py-1.5 font-medium text-neutral-700 hover:bg-neutral-200 disabled:opacity-60">Duplicate</button>
          <button onClick={remove} disabled={busy} className="flex-1 rounded-lg bg-neutral-100 py-1.5 font-medium text-red-700 hover:bg-red-100 disabled:opacity-60">Delete</button>
          {slug && <Link href={`/s/${slug}`} target="_blank" className="flex-1 rounded-lg bg-neutral-100 py-1.5 text-center font-medium text-neutral-700">Visit</Link>}
        </div>
        {err && <p className="mt-1.5 text-xs text-red-600">{err}</p>}
      </div>
    );
  }

  return (
    <button onClick={logout} className="rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-600 hover:border-neutral-400">
      Log out
    </button>
  );
}
