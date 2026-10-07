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
  const [name, setName] = useState(sp.get("name") ?? "");
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

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-8 grid justify-items-center gap-3 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          New site · Step {step} of 2
        </p>
        <h1 className="font-serif text-[clamp(2.2rem,4vw,3.4rem)] font-normal leading-[0.95]">
          {step === 1 ? <>Choose your starting point.</> : <>Make it yours.</>}
        </h1>
        <div className="flex items-center gap-2" aria-hidden>
          {[1, 2].map((n) => (
            <span key={n} className="flex items-center gap-2">
              <span className="h-1.5 rounded-full transition-all" style={{ width: step >= n ? 28 : 12, background: step >= n ? "var(--accent)" : "var(--line-2)" }} />
            </span>
          ))}
        </div>
      </div>

      <div className="kit-panel p-6 md:p-8" style={{ borderRadius: "1.25rem" }}>
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
                  className="overflow-hidden rounded-xl border bg-white text-left transition-all"
                  style={active ? { borderColor: "var(--accent)", boxShadow: "0 0 0 1px var(--accent)" } : { borderColor: "var(--line)" }}
                >
                  <div className="flex items-center gap-2.5 p-3" style={{ background: t.theme.surface }}>
                    <span className="grid h-9 w-9 flex-none place-items-center rounded-[10px] text-sm font-bold text-white" style={{ background: t.theme.primary }} aria-hidden>
                      {t.name.slice(0, 1)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold" style={{ color: t.theme.text }}>{t.name}</span>
                      <span className="mono-meta block text-[10.5px] uppercase" style={{ letterSpacing: "0.08em", color: t.theme.muted }}>{t.category} · {t.sections.length} sections</span>
                    </span>
                    <span className="flex flex-none gap-1" aria-hidden>
                      {[t.theme.primary, t.theme.accent].map((c, i) => (
                        <i key={i} className="h-4 w-4 rounded-full border" style={{ background: c, borderColor: "var(--line-2)" }} />
                      ))}
                    </span>
                    {active && <span className="mono-meta flex-none text-[11px] font-bold" style={{ color: t.theme.accent }}>✓</span>}
                  </div>
                  <span className="block truncate px-3 py-2 text-xs" style={{ color: "var(--ink-2)" }}>{t.description}</span>
                </button>
              );
            })}
          </div>
          <button onClick={() => setStep(2)} className="btn-primary mt-6 w-full" style={{ height: 46 }}>
            Continue with {TEMPLATES.find((t) => t.id === templateId)?.name} →
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <p className="text-[13px]" style={{ color: "var(--ink-2)" }}>
            Editing <strong style={{ color: "var(--ink)" }}>{TEMPLATES.find((t) => t.id === templateId)?.name}</strong> — names and tagline prefill your site, everything stays editable later.
          </p>
          <p className="mono-meta mb-1.5 mt-5 text-[10.5px] font-semibold uppercase" style={{ letterSpacing: "0.12em", color: "var(--ink-3)" }}>What kind of site is it?</p>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setSiteType(t)}
                aria-pressed={siteType === t}
                className="rounded-full border px-3.5 py-1.5 text-sm transition-colors"
                style={siteType === t ? { borderColor: "var(--ink)", background: "var(--ink)", color: "#fff" } : { borderColor: "var(--line-2)", background: "#fff" }}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-700">Website name
                <span className="mt-0.5 block text-[11px] font-normal text-neutral-400">Shows in your dashboard and the browser tab.</span>
              </label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Morgan — Portfolio" className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm transition-colors placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-900 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-700">Your name / business name
                <span className="mt-0.5 block text-[11px] font-normal text-neutral-400">Prefills the navbar, hero and footers.</span>
              </label>
              <input value={ownerName} onChange={(e) => setOwnerName(e.target.value)} placeholder="Alex Morgan" className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm transition-colors placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-900 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-700">Tagline
                <span className="mt-0.5 block text-[11px] font-normal text-neutral-400">One line under your name — change it anytime.</span>
              </label>
              <input value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="Product Designer & Developer" className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm transition-colors placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-900 focus:outline-none" />
            </div>
          </div>
          {err && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{err}</p>}
          <div className="mt-6 flex gap-2">
            <button onClick={() => setStep(1)} className="rounded-lg border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium transition-colors hover:border-neutral-400">← Back</button>
            <button onClick={create} disabled={loading} className="btn-primary flex-1 disabled:opacity-60" style={{ height: 46 }}>{loading ? "Creating…" : "Create website →"}</button>
          </div>
        </>
      )}
      </div>
    </div>
  );
}

export default function NewPage() {
  return (
    <div className="marketing-theme min-h-screen bg-background px-6 py-10 text-foreground">
      <div className="mx-auto mb-6 max-w-3xl"><Link href="/dashboard" className="text-sm text-muted transition-colors hover:text-foreground">← Dashboard</Link></div>
      <Suspense><Flow /></Suspense>
    </div>
  );
}
