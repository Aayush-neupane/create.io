"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { confirmPopup } from "@/components/ui/confirm";

function errMsg(e: unknown, fb: string) {
  return e instanceof Error ? e.message : fb;
}

export function LogoutButton() {
  const router = useRouter();
  async function logout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Logout is idempotent — still navigate home.
    }
    router.push("/");
    router.refresh();
  }
  return (
    <button onClick={logout} className="inline-flex h-9 items-center rounded-full border border-border px-4 text-[13px] font-medium transition hover:bg-foreground hover:text-background">
      Log out
    </button>
  );
}

export function NameForm({ initial }: { initial: string }) {
  const router = useRouter();
  const [name, setName] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<{ ok: boolean; msg: string } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || name.trim() === initial) return;
    setBusy(true);
    setNote(null);
    try {
      const res = await fetch("/api/auth/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string }).error || "Could not save.");
      setNote({ ok: true, msg: "Name updated." });
      router.refresh();
    } catch (e) {
      setNote({ ok: false, msg: errMsg(e, "Could not save.") });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-label="Display name"
        maxLength={60}
        className="w-full flex-1 border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-primary"
      />
      <button disabled={busy || !name.trim() || name.trim() === initial} className="inline-flex h-10 flex-none items-center justify-center rounded-full bg-primary px-5 text-[13px] font-medium text-white transition hover:bg-primary-strong disabled:opacity-50">
        {busy ? "Saving…" : "Save"}
      </button>
      {note && <p className={`text-xs sm:self-center ${note.ok ? "text-muted" : "text-red-600"}`}>{note.msg}</p>}
    </form>
  );
}

export function PasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<{ ok: boolean; msg: string } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (next.length < 8) {
      setNote({ ok: false, msg: "New password must be at least 8 characters." });
      return;
    }
    setBusy(true);
    setNote(null);
    try {
      const res = await fetch("/api/auth/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string }).error || "Could not update password.");
      setNote({ ok: true, msg: "Password changed. Use it next time you log in." });
      setCurrent("");
      setNext("");
    } catch (e) {
      setNote({ ok: false, msg: errMsg(e, "Could not update password.") });
    } finally {
      setBusy(false);
    }
  }

  const input = "w-full border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-primary";
  return (
    <form onSubmit={submit} className="grid gap-2.5 sm:grid-cols-2">
      <input value={current} onChange={(e) => setCurrent(e.target.value)} required type="password" placeholder="Current password" aria-label="Current password" className={input} />
      <input value={next} onChange={(e) => setNext(e.target.value)} required type="password" placeholder="New password (8+ characters)" aria-label="New password" minLength={8} className={input} />
      <div className="flex items-center gap-3 sm:col-span-2">
        <button disabled={busy} className="inline-flex h-10 flex-none items-center justify-center rounded-full bg-primary px-5 text-[13px] font-medium text-white transition hover:bg-primary-strong disabled:opacity-50">
          {busy ? "Updating…" : "Change password"}
        </button>
        {note && <p className={`text-xs ${note.ok ? "text-muted" : "text-red-600"}`}>{note.msg}</p>}
      </div>
    </form>
  );
}

export function DeleteAccount({ email, siteCount }: { email: string; siteCount: number }) {
  const router = useRouter();
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const armed = confirm.trim().toLowerCase() === email.toLowerCase();

  async function destroy() {
    if (!armed || busy) return;
    const ok = await confirmPopup({
      title: "Delete your account?",
      message: `This permanently deletes your account${siteCount > 0 ? ` and all ${siteCount} of your site${siteCount === 1 ? "" : "s"}` : ""}. Published pages stop working immediately.`,
      confirmLabel: "Delete everything",
      danger: true,
    });
    if (!ok) return;
    setBusy(true);
    setErr("");
    try {
      const res = await fetch("/api/auth/me", { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string }).error || "Could not delete account.");
      router.push("/");
      router.refresh();
    } catch (e) {
      setErr(errMsg(e, "Could not delete account."));
      setBusy(false);
    }
  }

  return (
    <div>
      <p className="text-sm text-muted">
        Permanently deletes your account{siteCount > 0 && <> and all {siteCount} of your site{siteCount === 1 ? "" : "s"}</>}. Published pages stop working immediately.
      </p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder={`Type ${email} to confirm`}
          aria-label="Type your email to confirm deletion"
          className="w-full flex-1 border border-border bg-background px-3 py-2 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-red-400"
        />
        <button
          onClick={destroy}
          disabled={!armed || busy}
          className="inline-flex h-10 flex-none items-center justify-center rounded-full bg-red-700 px-5 text-[13px] font-semibold text-white transition-opacity disabled:opacity-40"
        >
          {busy ? "Deleting…" : "Delete account"}
        </button>
      </div>
      {err && <p className="mt-2 text-xs text-red-600">{err}</p>}
    </div>
  );
}
