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
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-strong">
          New site · Step {step} of 2
        </p>
        <h1 className="font-serif text-[clamp(2.2rem,4vw,3.4rem)] font-normal leading-[0.95]">
          {step === 1 ? <>Choose your <span className="italic text-primary-strong">starting point.</span></> : <>Make it <span className="italic text-primary-strong">yours.</span></>}
        </h1>
        <div className="flex items-center gap-2" aria-hidden>
          {[1, 2].map((n) => (
            <span key={n} className="flex items-center gap-2">
              <span className="h-1.5 rounded-full transition-all" style={{ width: step >= n ? 28 : 12, background: step >= n ? "var(--kit-primary)" : undefined, opacity: step >= n ? 1 : 0.25 }} />
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
                  className={`overflow-hidden border bg-background text-left transition-all ${active ? "border-primary" : "border-border/40"}`}
                  style={active ? { boxShadow: "0 0 0 1px var(--kit-primary)" } : undefined}
                >
                  <div className="flex items-center gap-2.5 p-3" style={{ background: t.theme.surface }}>
                    <span className="grid h-9 w-9 flex-none place-items-center rounded-[10px] text-sm font-bold text-white" style={{ background: t.theme.primary }} aria-hidden>
                      {t.name.slice(0, 1)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold" style={{ color: t.theme.text }}>{t.name}</span>
                      <span className="block font-mono text-[10.5px] uppercase tracking-[0.08em]" style={{ color: t.theme.muted }}>{t.category} · {t.sections.length} sections</span>
                    </span>
                    <span className="flex flex-none gap-1" aria-hidden>
                      {[t.theme.primary, t.theme.accent].map((c, i) => (
                        <i key={i} className="h-4 w-4 rounded-full border border-border/40" style={{ background: c }} />
                      ))}
                    </span>
                    {active && <span className="flex-none font-mono text-[11px] font-bold text-primary-strong">✓</span>}
                  </div>
                  <span className="block truncate px-3 py-2 text-xs text-muted">{t.description}</span>
                </button>
              );
            })}
          </div>
          <button onClick={() => setStep(2)} className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-medium text-white transition hover:bg-primary-strong">
            Continue with {TEMPLATES.find((t) => t.id === templateId)?.name} →
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <p className="text-[13px] text-muted">
            Editing <strong className="text-foreground">{TEMPLATES.find((t) => t.id === templateId)?.name}</strong> — names and tagline prefill your site, everything stays editable later.
          </p>
          <p className="mb-1.5 mt-5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted">What kind of site is it?</p>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setSiteType(t)}
                aria-pressed={siteType === t}
                className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${siteType === t ? "border-primary bg-primary text-white" : "border-border bg-background"}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium">Website name
                <span className="mt-0.5 block text-[11px] font-normal text-muted">Shows in your dashboard and the browser tab.</span>
              </label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Morgan — Portfolio" className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground transition-colors outline-none placeholder:text-muted/70 focus:border-primary" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium">Your name / business name
                <span className="mt-0.5 block text-[11px] font-normal text-muted">Prefills the navbar, hero and footers.</span>
              </label>
              <input value={ownerName} onChange={(e) => setOwnerName(e.target.value)} placeholder="Alex Morgan" className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground transition-colors outline-none placeholder:text-muted/70 focus:border-primary" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium">Tagline
                <span className="mt-0.5 block text-[11px] font-normal text-muted">One line under your name — change it anytime.</span>
              </label>
              <input value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="Product Designer & Developer" className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground transition-colors outline-none placeholder:text-muted/70 focus:border-primary" />
            </div>
          </div>
          {err && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{err}</p>}
          <div className="mt-6 flex gap-2">
            <button onClick={() => setStep(1)} className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium transition-colors hover:bg-foreground hover:text-background">← Back</button>
            <button onClick={create} disabled={loading} className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-primary text-sm font-medium text-white transition hover:bg-primary-strong disabled:opacity-60">{loading ? "Creating…" : "Create website →"}</button>
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
      <div className="mx-auto mb-6 max-w-3xl"><Link href="/dashboard" className="text-sm text-muted transition-colors hover:text-primary-strong">← Dashboard</Link></div>
      <Suspense><Flow /></Suspense>
    </div>
  );
}
