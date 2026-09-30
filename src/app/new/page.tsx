"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { TEMPLATES } from "@/lib/templates";

const TYPES = ["Portfolio", "Personal", "Business", "Restaurant", "Freelancer", "Agency"];

function Flow() {
  const router = useRouter();
  const sp = useSearchParams();
  const [step, setStep] = useState(sp.get("template") ? 2 : 1);
  const [templateId, setTemplateId] = useState(sp.get("template") || "minimal-portfolio");
  const [siteType, setSiteType] = useState("Portfolio");
  const [name, setName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [tagline, setTagline] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function create() {
    setErr("");
    if (!name.trim()) { setErr("Give your website a name."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/websites", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, templateId, siteType, ownerName, tagline }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not create website.");
      router.push(`/builder/${data.website.id}`);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl border border-neutral-200 bg-white p-8">
      <div className="mb-6 flex items-center gap-2 text-xs font-medium text-neutral-500">
        {[1, 2, 3].map((n) => (
          <span key={n} className="flex items-center gap-2">
            <span className={`flex h-6 w-6 items-center justify-center rounded-full ${step >= n ? "bg-neutral-900 text-white" : "bg-neutral-100"}`}>{n}</span>
            {n < 3 && <span className="h-px w-8 bg-neutral-200" />}
          </span>
        ))}
        <span className="ml-2">{step === 1 ? "Choose template" : step === 2 ? "Website type & info" : "Create"}</span>
      </div>

      {step === 1 && (
        <>
          <h1 className="text-xl font-semibold">Choose a template</h1>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {TEMPLATES.map((t) => (
              <button key={t.id} onClick={() => setTemplateId(t.id)} className={`overflow-hidden rounded-xl border text-left ${templateId === t.id ? "border-neutral-900 ring-1 ring-neutral-900" : "border-neutral-200"}`}>
                <div className="h-24 p-3" style={{ background: t.thumbnailGradient }}>
                  <div className="h-full rounded-lg bg-white/85 p-2"><div className="h-1.5 w-12 rounded bg-neutral-900/70" /><div className="mt-2 h-2 w-3/4 rounded bg-neutral-900/10" /></div>
                </div>
                <div className="p-3"><p className="text-sm font-semibold">{t.name}</p><p className="text-xs text-neutral-500">{t.category}</p></div>
              </button>
            ))}
          </div>
          <button onClick={() => setStep(2)} className="mt-6 w-full rounded-lg bg-neutral-900 py-2.5 text-sm font-medium text-white">Continue</button>
        </>
      )}

      {step === 2 && (
        <>
          <h1 className="text-xl font-semibold">What are you creating?</h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {TYPES.map((t) => <button key={t} onClick={() => setSiteType(t)} className={`rounded-full border px-3 py-1.5 text-sm ${siteType === t ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200"}`}>{t}</button>)}
          </div>
          <div className="mt-6 space-y-4">
            <div><label className="mb-1.5 block text-[13px] font-medium">Website name</label><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Morgan — Portfolio" className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none" /></div>
            <div><label className="mb-1.5 block text-[13px] font-medium">Your name / business name</label><input value={ownerName} onChange={(e) => setOwnerName(e.target.value)} placeholder="Alex Morgan" className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none" /></div>
            <div><label className="mb-1.5 block text-[13px] font-medium">Tagline</label><input value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="Product Designer & Developer" className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none" /></div>
          </div>
          {err && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{err}</p>}
          <div className="mt-6 flex gap-2">
            <button onClick={() => setStep(1)} className="rounded-lg border border-neutral-200 px-5 py-2.5 text-sm font-medium">Back</button>
            <button onClick={create} disabled={loading} className="flex-1 rounded-lg bg-neutral-900 py-2.5 text-sm font-medium text-white disabled:opacity-60">{loading ? "Creating…" : "Create website"}</button>
          </div>
        </>
      )}
    </div>
  );
}

export default function NewPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] px-6 py-10">
      <div className="mx-auto mb-6 max-w-3xl"><Link href="/dashboard" className="text-sm text-neutral-500">← Dashboard</Link></div>
      <Suspense><Flow /></Suspense>
    </div>
  );
}
