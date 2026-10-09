"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { TEMPLATES } from "@/lib/templates";

const TYPES = ["Portfolio", "Personal", "Business", "Restaurant", "Freelancer", "Agency", "Event", "SaaS"];

function Flow() {
  const router = useRouter();
  const sp = useSearchParams();
  const initialTemplate = sp.get("template");
  const validInitial = initialTemplate && TEMPLATES.some((t) => t.id === initialTemplate) ? initialTemplate : null;
  const [step, setStep] = useState(validInitial ? 2 : 1);
  const [templateId, setTemplateId] = useState(validInitial || "minimal-portfolio");
  const [siteType, setSiteType] = useState("Portfolio");
  const [name, setName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [tagline, setTagline] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function create() {
    setErr("");
    if (!name.trim()) { setErr("Give your website a name."); return; }
    if (!TEMPLATES.some((t) => t.id === templateId)) { setErr("Pick a valid template."); setStep(1); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/websites", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, templateId, siteType, ownerName, tagline }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string }).error || "Could not create website.");
      router.push(`/builder/${(data as { website: { id: string } }).website.id}`);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const inputCls = "w-full border bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-neutral-400";
  const inputStyle = { borderColor: "var(--line-2)", borderRadius: 0 } as const;

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-8 grid justify-items-center gap-4 text-center">
        <p className="eyebrow eyebrow-center">New site · Step {step} of 2</p>
        <h1 className="display display-upper" style={{ fontSize: "clamp(32px,4.6vw,52px)" }}>
          {step === 1 ? "Choose your starting point." : "Make it yours."}
        </h1>
        <div className="flex items-center gap-2" aria-hidden>
          {[1, 2].map((n) => (
            <span key={n} className="h-1 transition-all" style={{ width: step >= n ? 44 : 20, background: step >= n ? "var(--ink)" : "var(--line-2)" }} />
          ))}
        </div>
      </div>

      <div className="card p-6 md:p-8" style={{ borderRadius: 12 }}>
      {step === 1 && (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            {TEMPLATES.map((t) => {
              const active = templateId === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTemplateId(t.id)}
                  aria-pressed={active}
                  className="overflow-hidden border bg-white text-left transition-all"
                  style={active ? { borderColor: "var(--ink)", boxShadow: "0 0 0 1px var(--ink)" } : { borderColor: "var(--line)" }}
                >
                  <div className="flex items-center gap-2.5 p-3" style={{ background: active ? "var(--ink)" : "var(--surface-2)", color: active ? "var(--paper)" : undefined }}>
                    <span className="grid h-9 w-9 flex-none place-items-center font-mono text-sm font-bold" style={{ background: active ? "var(--accent)" : "var(--ink)", color: active ? "var(--ink)" : "var(--paper)" }} aria-hidden>
                      {t.name.slice(0, 1)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold">{t.name}</span>
                      <span className="mono-meta block font-mono text-[10px] font-bold uppercase" style={{ letterSpacing: "0.08em", opacity: 0.65 }}>{t.category} · {t.sections.length} sections</span>
                    </span>
                    {active && <span className="mono-meta flex-none font-mono text-[11px] font-bold" style={{ color: "var(--accent)" }}>✓</span>}
                  </div>
                  <span className="block truncate px-3 py-2 text-xs" style={{ color: "var(--ink-2)" }}>{t.description}</span>
                </button>
              );
            })}
          </div>
          <button onClick={() => setStep(2)} className="btn-primary mt-6 w-full">
            Continue with {TEMPLATES.find((t) => t.id === templateId)?.name} →
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <p className="text-sm" style={{ color: "var(--ink-2)" }}>
            Editing <strong style={{ color: "var(--ink)" }}>{TEMPLATES.find((t) => t.id === templateId)?.name}</strong> — names and tagline prefill your site, everything stays editable later.
          </p>
          <p className="mono-meta mb-2 mt-6 font-mono text-[10px] font-bold uppercase" style={{ letterSpacing: "0.16em", color: "var(--ink-3)" }}>What kind of site is it?</p>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setSiteType(t)}
                aria-pressed={siteType === t}
                className="border px-4 py-2 font-mono text-[11px] font-bold uppercase transition-colors"
                style={siteType === t ? { borderColor: "var(--ink)", background: "var(--ink)", color: "var(--paper)", letterSpacing: "0.08em" } : { borderColor: "var(--line-2)", background: "#fff", letterSpacing: "0.08em" }}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="mt-6 space-y-5">
            {[
              { label: "Website name", hint: "Shows in your dashboard and the browser tab.", value: name, set: setName, ph: "Alex Morgan — Portfolio" },
              { label: "Your name / business name", hint: "Prefills the navbar, hero and footers.", value: ownerName, set: setOwnerName, ph: "Alex Morgan" },
              { label: "Tagline", hint: "One line under your name — change it anytime.", value: tagline, set: setTagline, ph: "Product Designer & Developer" },
            ].map((f) => (
              <div key={f.label}>
                <label className="mb-1.5 block font-mono text-[10px] font-bold uppercase" style={{ letterSpacing: "0.14em" }}>{f.label}
                  <span className="mt-0.5 block font-sans text-[11px] font-normal normal-case" style={{ letterSpacing: 0, color: "var(--ink-3)" }}>{f.hint}</span>
                </label>
                <input value={f.value} onChange={(e) => f.set(e.target.value)} placeholder={f.ph} className={inputCls} style={inputStyle} />
              </div>
            ))}
          </div>
          {err && <p className="mt-4 border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">{err}</p>}
          <div className="mt-6 flex gap-2.5">
            <button onClick={() => setStep(1)} className="btn-ghost">← Back</button>
            <button onClick={create} disabled={loading} className="btn-primary flex-1 disabled:opacity-60">{loading ? "Creating…" : "Create website →"}</button>
          </div>
        </>
      )}
      </div>
    </div>
  );
}

export default function NewPage() {
  return (
    <div className="min-h-screen px-6 py-10" style={{ background: "var(--paper)" }}>
      <div className="mx-auto mb-6 max-w-3xl"><Link href="/dashboard" className="font-mono text-[11px] font-bold uppercase" style={{ letterSpacing: "0.14em", color: "var(--ink-3)" }}>← Dashboard</Link></div>
      <Suspense><Flow /></Suspense>
    </div>
  );
}
