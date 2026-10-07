"use client";

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
      <>
        <button onClick={duplicate} disabled={busy} className="inline-flex h-10 items-center rounded-full border border-border px-4 text-[13px] font-medium transition hover:bg-foreground hover:text-background disabled:opacity-60">Duplicate</button>
        <button onClick={remove} disabled={busy} className="inline-flex h-10 items-center rounded-full border border-red-900/40 px-4 text-[13px] font-medium text-red-700 transition hover:bg-red-700 hover:text-white disabled:opacity-60">Delete</button>
        {err && <p className="basis-full text-xs text-red-600">{err}</p>}
      </>
    );
  }

  return (
    <button onClick={logout} className="inline-flex h-9 items-center rounded-full border border-border px-4 text-[13px] font-medium transition hover:bg-foreground hover:text-background">
      Log out
    </button>
  );
}
