"use client";

import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

export interface ConfirmOptions {
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Red confirm button for destructive actions. */
  danger?: boolean;
}

export interface PromptOptions {
  title: string;
  message?: string;
  placeholder?: string;
  initial?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

function mount(node: React.ReactNode): () => void {
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root = createRoot(host);
  root.render(node);
  return () => {
    root.unmount();
    host.remove();
  };
}

function Shell({ label, onCancel, children }: { label: string; onCancel: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onCancel]);
  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
      style={{ background: "rgba(23,23,27,.45)", backdropFilter: "blur(3px)" }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-label={label}
        className="w-full max-w-sm border border-border bg-surface p-6 shadow-2xl"
      >
        {children}
      </div>
    </div>
  );
}

function Buttons({
  onCancel,
  onConfirm,
  confirmLabel,
  cancelLabel,
  danger,
  busy,
}: {
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel: string;
  cancelLabel: string;
  danger: boolean;
  busy?: boolean;
}) {
  return (
    <div className="mt-6 flex gap-2">
      <button onClick={onCancel} disabled={busy} className="btn-ghost flex-1 disabled:opacity-50" style={{ height: 42, fontSize: 13 }}>
        {cancelLabel}
      </button>
      <button
        onClick={onConfirm}
        disabled={busy}
        autoFocus={!danger}
        className={`flex-1 rounded-[11px] px-4 py-2 text-[13px] font-semibold text-white transition-all ${danger ? "" : "btn-primary"}`}
        style={danger ? { height: 42, background: "#dc2626" } : { height: 42 }}
      >
        {busy ? "Working…" : confirmLabel}
      </button>
    </div>
  );
}

/** Branded replacement for window.confirm. Resolves true on confirm. */
export function confirmPopup({
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  danger = false,
}: ConfirmOptions): Promise<boolean> {
  return new Promise((resolve) => {
    let cleanup = () => {};
    let settled = false;
    const settle = (v: boolean) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(v);
    };
    cleanup = mount(
      <Shell label={title} onCancel={() => settle(false)}>
        <h2 className="font-serif text-2xl tracking-[-0.02em]">{title}</h2>
        {message && <p className="mt-2 text-sm leading-relaxed text-muted">{message}</p>}
        <Buttons
          onCancel={() => settle(false)}
          onConfirm={() => settle(true)}
          confirmLabel={confirmLabel}
          cancelLabel={cancelLabel}
          danger={danger}
        />
      </Shell>,
    );
  });
}

/** Branded replacement for window.alert. Single dismiss button. */
export function alertPopup(title: string, message?: string): Promise<void> {
  return new Promise((resolve) => {
    let cleanup = () => {};
    let settled = false;
    const settle = () => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve();
    };
    cleanup = mount(
      <Shell label={title} onCancel={settle}>
        <h2 className="font-serif text-2xl tracking-[-0.02em]">{title}</h2>
        {message && <p className="mt-2 text-sm leading-relaxed text-muted">{message}</p>}
        <div className="mt-6">
          <button onClick={settle} autoFocus className="btn-primary w-full" style={{ height: 42, fontSize: 13 }}>
            OK
          </button>
        </div>
      </Shell>,
    );
  });
}

/** Branded replacement for window.prompt. Resolves the entered text, or null on cancel. */
export function promptPopup({
  title,
  message,
  placeholder,
  initial = "",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
}: PromptOptions): Promise<string | null> {
  return new Promise((resolve) => {
    let cleanup = () => {};
    let settled = false;
    const settle = (v: string | null) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(v);
    };
    const Body = () => {
      const areaRef = useRef<HTMLTextAreaElement>(null);
      useEffect(() => {
        areaRef.current?.focus();
      }, []);
      const submit = () => settle(areaRef.current?.value ?? "");
      return (
        <>
          <h2 className="font-serif text-2xl tracking-[-0.02em]">{title}</h2>
          {message && <p className="mt-2 text-sm leading-relaxed text-muted">{message}</p>}
          <textarea
            ref={areaRef}
            defaultValue={initial}
            placeholder={placeholder}
            rows={4}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit();
            }}
            className="mt-4 w-full resize-y border border-border bg-background px-3 py-2 font-mono text-xs text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-primary"
          />
          <Buttons
            onCancel={() => settle(null)}
            onConfirm={submit}
            confirmLabel={confirmLabel}
            cancelLabel={cancelLabel}
            danger={false}
          />
        </>
      );
    };
    cleanup = mount(
      <Shell label={title} onCancel={() => settle(null)}>
        <Body />
      </Shell>,
    );
  });
}
