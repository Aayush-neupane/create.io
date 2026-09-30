"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DashboardActions({ compact, id, slug }: { compact?: boolean; id?: string; slug?: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  async function duplicate() {
    if (!id) return;
    setBusy(true);
    const res = await fetch(`/api/websites/${id}/duplicate`, { method: "POST" });
    setBusy(false);
    if (res.ok) router.refresh();
  }

  async function remove() {
    if (!id) return;
    if (!confirm("Delete this website? This cannot be undone.")) return;
    setBusy(true);
    await fetch(`/api/websites/${id}`, { method: "DELETE" });
    setBusy(false);
    router.refresh();
  }

  if (compact && id) {
    return (
      <div className="mt-2 flex gap-2 text-[13px]">
        <button onClick={duplicate} disabled={busy} className="flex-1 rounded-lg bg-neutral-100 py-1.5 font-medium text-neutral-700 hover:bg-neutral-200">Duplicate</button>
        <button onClick={remove} disabled={busy} className="flex-1 rounded-lg bg-neutral-100 py-1.5 font-medium text-red-700 hover:bg-red-100">Delete</button>
        {slug && <a href={`/s/${slug}`} target="_blank" className="flex-1 rounded-lg bg-neutral-100 py-1.5 text-center font-medium text-neutral-700">Visit</a>}
      </div>
    );
  }

  return (
    <button onClick={logout} className="rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-600 hover:border-neutral-400">
      Log out
    </button>
  );
}
