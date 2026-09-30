"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { SectionInstance, SectionType, ThemeConfig, WebsiteConfig, WebsiteRecord } from "@/types/builder";
import { TemplateRenderer, SECTION_META } from "@/components/templates/Renderer";
import { FONT_CHOICES, THEME_PRESETS, defaultSection, sid } from "@/lib/website-defaults";
import { TextField, AreaField, ImageField, ListShell, ItemCard } from "./fields";

type Tab = "content" | "sections" | "design" | "seo" | "settings";
type SaveState = "saved" | "saving" | "dirty" | "error";

const TABS: { id: Tab; label: string }[] = [
  { id: "content", label: "Content" },
  { id: "sections", label: "Sections" },
  { id: "design", label: "Design" },
  { id: "seo", label: "SEO" },
  { id: "settings", label: "Settings" },
];

function get<T>(obj: Record<string, unknown>, key: string, fb: T): T {
  const v = obj[key];
  return (v === undefined ? fb : v) as T;
}
function setC(s: SectionInstance, patch: Record<string, unknown>): SectionInstance {
  return { ...s, content: { ...s.content, ...patch } };
}
function move<T>(list: T[], i: number, dir: -1 | 1): T[] {
  const j = i + dir;
  if (j < 0 || j >= list.length) return list;
  const out = [...list];
  [out[i], out[j]] = [out[j], out[i]];
  return out;
}

export function BuilderClient({ initial, initialTab }: { initial: WebsiteRecord; initialTab?: string }) {
  const router = useRouter();
  const [site, setSite] = useState<WebsiteRecord>(initial);
  const [config, setConfig] = useState<WebsiteConfig>(initial.config);
  const [tab, setTab] = useState<Tab>((initialTab as Tab) || "content");
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [selectedId, setSelectedId] = useState<string | null>(initial.config.sections[1]?.id ?? null);
  const [saveState, setSaveState] = useState<SaveState>("saved");
  const [saveMsg, setSaveMsg] = useState("");
  const [publishing, setPublishing] = useState(false);

  const past = useRef<WebsiteConfig[]>([]);
  const future = useRef<WebsiteConfig[]>([]);
  const [, force] = useState(0);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const commit = useCallback((next: WebsiteConfig) => {
    past.current.push(config);
    if (past.current.length > 60) past.current.shift();
    future.current = [];
    setConfig(next);
    setSaveState("dirty");
    force((n) => n + 1);
  }, [config]);

  const undo = useCallback(() => {
    const prev = past.current.pop();
    if (!prev) return;
    future.current.push(config);
    setConfig(prev);
    setSaveState("dirty");
    force((n) => n + 1);
  }, [config]);

  const redo = useCallback(() => {
    const nxt = future.current.pop();
    if (!nxt) return;
    past.current.push(config);
    setConfig(nxt);
    setSaveState("dirty");
    force((n) => n + 1);
  }, [config]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "z" && !e.shiftKey) { e.preventDefault(); undo(); }
      else if (mod && (e.key.toLowerCase() === "y" || (e.key.toLowerCase() === "z" && e.shiftKey))) { e.preventDefault(); redo(); }
      else if (mod && e.key.toLowerCase() === "s") { e.preventDefault(); saveNow(); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  // autosave (debounced)
  useEffect(() => {
    if (saveState !== "dirty") return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => saveNow(), 1200);
    return () => { if (saveTimer.current) clearTimeout(saveTimer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  async function saveNow(status?: "draft" | "published") {
    setSaveState("saving");
    setSaveMsg("");
    try {
      const res = await fetch(`/api/websites/${site.id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: config.siteName, config, ...(status ? { status } : {}) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save.");
      setSite(data.website);
      setSaveState("saved");
    } catch (e) {
      setSaveState("error");
      setSaveMsg(e instanceof Error ? e.message : "Something went wrong while saving your website. Your latest changes are still available locally. Try again.");
    }
  }

  async function publish() {
    setPublishing(true);
    await saveNow("published");
    setPublishing(false);
    router.refresh();
  }

  async function unpublish() {
    await saveNow("draft");
  }

  const selected = useMemo(() => config.sections.find((s) => s.id === selectedId) ?? null, [config, selectedId]);
  const previewWidth = device === "mobile" ? "max-w-[390px]" : device === "tablet" ? "max-w-[768px]" : "max-w-none";

  function patchTheme(p: Partial<ThemeConfig>) {
    commit({ ...config, theme: { ...config.theme, ...p } });
  }
  function patchSection(id: string, fn: (s: SectionInstance) => SectionInstance) {
    commit({ ...config, sections: config.sections.map((s) => (s.id === id ? fn(s) : s)) });
  }
  function reorderSection(id: string, dir: -1 | 1) {
    const idx = config.sections.findIndex((s) => s.id === id);
    commit({ ...config, sections: move(config.sections, idx, dir) });
  }
  function toggleSection(id: string) {
    patchSection(id, (s) => ({ ...s, enabled: !s.enabled }));
  }
  function removeSection(id: string) {
    const s = config.sections.find((x) => x.id === id);
    if (!s) return;
    if (!SECTION_META[s.type]?.deletable) return;
    if (!confirm(`Remove ${SECTION_META[s.type].label} section?`)) return;
    commit({ ...config, sections: config.sections.filter((x) => x.id !== id) });
    if (selectedId === id) setSelectedId(null);
  }
  function duplicateSection(id: string) {
    const s = config.sections.find((x) => x.id === id);
    if (!s) return;
    const copy: SectionInstance = { ...s, id: sid(s.type), content: JSON.parse(JSON.stringify(s.content)) };
    const idx = config.sections.findIndex((x) => x.id === id);
    const next = [...config.sections];
    next.splice(idx + 1, 0, copy);
    commit({ ...config, sections: next });
  }
  function addSection(type: SectionType) {
    const meta = SECTION_META[type];
    const inst = defaultSection(type, meta.variants[0].id);
    commit({ ...config, sections: [...config.sections, inst] });
    setSelectedId(inst.id);
    setTab("content");
  }

  return (
    <div className="flex h-screen flex-col bg-[#fafafa]">
      {/* Top bar */}
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-neutral-200 bg-white px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-neutral-900 text-xs font-bold text-white">C</span>
        </Link>
        <input
          value={config.siteName}
          onChange={(e) => commit({ ...config, siteName: e.target.value })}
          className="w-48 rounded-md px-2 py-1 text-sm font-semibold focus:bg-neutral-100 focus:outline-none"
        />
        <span className="hidden text-xs text-neutral-400 sm:inline">/s/{site.slug}</span>
        <div className="mx-auto hidden items-center gap-1 rounded-lg border border-neutral-200 p-1 md:flex">
          {(["desktop", "tablet", "mobile"] as const).map((d) => (
            <button key={d} onClick={() => setDevice(d)} className={`rounded-md px-3 py-1 text-xs font-medium capitalize ${device === d ? "bg-neutral-900 text-white" : "text-neutral-600"}`}>{d}</button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="hidden text-xs text-neutral-500 sm:inline">
            {saveState === "saving" ? "Saving…" : saveState === "dirty" ? "Unsaved changes" : saveState === "error" ? "Save failed" : "Saved"}
          </span>
          <span className={`h-2 w-2 rounded-full ${saveState === "saved" ? "bg-emerald-500" : saveState === "error" ? "bg-red-500" : "bg-amber-400"}`} />
          <button onClick={undo} disabled={past.current.length === 0} className="rounded-lg border border-neutral-200 px-2.5 py-1.5 text-xs disabled:opacity-40" title="Undo (Ctrl+Z)">↩</button>
          <button onClick={redo} disabled={future.current.length === 0} className="rounded-lg border border-neutral-200 px-2.5 py-1.5 text-xs disabled:opacity-40" title="Redo">↪</button>
          <Link href={`/s/${site.slug}`} target="_blank" className="rounded-lg border border-neutral-200 px-3 py-1.5 text-[13px] font-medium">Preview</Link>
          <button onClick={() => saveNow()} className="rounded-lg border border-neutral-200 px-3 py-1.5 text-[13px] font-medium">Save</button>
          {site.status === "published" ? (
            <button onClick={unpublish} className="rounded-lg bg-neutral-200 px-3 py-1.5 text-[13px] font-medium">Unpublish</button>
          ) : (
            <button onClick={publish} disabled={publishing} className="rounded-lg bg-neutral-900 px-3 py-1.5 text-[13px] font-medium text-white disabled:opacity-60">
              {publishing ? "Publishing…" : "Publish"}
            </button>
          )}
        </div>
      </header>
      {saveMsg && <p className="border-b border-red-200 bg-red-50 px-4 py-2 text-[13px] text-red-700">{saveMsg}</p>}

      <div className="flex min-h-0 flex-1">
        {/* Left sidebar */}
        <aside className="flex w-64 shrink-0 flex-col border-r border-neutral-200 bg-white">
          <div className="flex border-b border-neutral-200">
            {TABS.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`flex-1 px-1 py-2.5 text-[11px] font-medium ${tab === t.id ? "border-b-2 border-neutral-900 text-neutral-900" : "text-neutral-500"}`}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-3">
            {tab === "content" && <ContentPanel config={config} selected={selected} onSelect={setSelectedId} onPatch={patchSection} />}
            {tab === "sections" && <SectionsPanel config={config} selectedId={selectedId} onSelect={(id) => { setSelectedId(id); }} onToggle={toggleSection} onMove={reorderSection} onRemove={removeSection} onDuplicate={duplicateSection} onAdd={addSection} />}
            {tab === "design" && <DesignPanel theme={config.theme} onPatch={patchTheme} onCustomCss={(v) => commit({ ...config, customCss: v })} customCss={config.customCss || ""} />}
            {tab === "seo" && <SeoPanel config={config} onCommit={commit} />}
            {tab === "settings" && <SettingsPanel site={site} config={config} onCommit={commit} onSite={setSite} />}
          </div>
        </aside>

        {/* Preview */}
        <main className="flex min-w-0 flex-1 flex-col bg-neutral-100">
          <div className="flex-1 overflow-auto p-4 md:p-6">
            <div className={`mx-auto overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all ${previewWidth}`}>
              <div className="builder-preview">
                <TemplateRenderer config={config} />
              </div>
            </div>
          </div>
        </main>

        {/* Right panel */}
        <aside className="hidden w-72 shrink-0 flex-col border-l border-neutral-200 bg-white lg:flex">
          <div className="border-b border-neutral-200 px-4 py-3">
            <h3 className="text-[13px] font-semibold">{selected ? SECTION_META[selected.type]?.label : "Page style"}</h3>
            <p className="text-xs text-neutral-500">{selected ? "Edit content, variant and visibility." : "Select a section to edit."}</p>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            {selected ? (
              <SectionInspector section={selected} theme={config.theme} onPatch={(fn) => patchSection(selected.id, fn)} onTheme={patchTheme} />
            ) : (
              <p className="text-[13px] text-neutral-500">Click any section on the left, or pick one below.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

// ─── LEFT: content ───
function ContentPanel({ config, selected, onSelect, onPatch }: {
  config: WebsiteConfig; selected: SectionInstance | null; onSelect: (id: string) => void;
  onPatch: (id: string, fn: (s: SectionInstance) => SectionInstance) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="px-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Page sections</p>
      {config.sections.map((s) => (
        <button key={s.id} onClick={() => onSelect(s.id)} className={`flex w-full items-center gap-2 rounded-lg border px-2.5 py-2 text-left text-[13px] ${selected?.id === s.id ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 bg-white"}`}>
          <span className="text-neutral-400">☰</span>
          <span className="font-medium">{SECTION_META[s.type]?.label}</span>
          {!s.enabled && <span className="ml-auto text-[10px] opacity-60">hidden</span>}
        </button>
      ))}
      {selected && (
        <div className="mt-3 border-t border-neutral-100 pt-3">
          <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Edit — {SECTION_META[selected.type]?.label}</p>
          <SectionFields section={selected} onChange={(patch) => onPatch(selected.id, (s) => setC(s, patch))} onReplace={(c) => onPatch(selected.id, (s) => ({ ...s, content: c }))} />
        </div>
      )}
    </div>
  );
}

// ─── Generic per-section fields ───
export function SectionFields({ section, onChange, onReplace }: {
  section: SectionInstance; onChange: (patch: Record<string, unknown>) => void; onReplace: (c: Record<string, unknown>) => void;
}) {
  const c = section.content as Record<string, unknown>;
  const str = (k: string) => (typeof c[k] === "string" ? (c[k] as string) : "");

  const listEditor = <T extends Record<string, unknown>>(
    key: string, title: string, addLabel: string, blank: T, render: (item: T, set: (p: Partial<T>) => void) => React.ReactNode,
  ) => {
    const items = (Array.isArray(c[key]) ? c[key] as T[] : []);
    const setItems = (next: T[]) => onChange({ [key]: next });
    return (
      <ListShell title={title} addLabel={addLabel} onAdd={() => setItems([...items, JSON.parse(JSON.stringify(blank))])}>
        {items.map((it, i) => (
          <ItemCard key={i} index={i} onDelete={() => setItems(items.filter((_, j) => j !== i))} onMove={(d) => setItems(move(items, i, d))}>
            {render(it, (p) => setItems(items.map((x, j) => (j === i ? { ...x, ...p } : x))))}
          </ItemCard>
        ))}
        {items.length === 0 && <p className="px-1 py-2 text-xs text-neutral-400">No items yet.</p>}
      </ListShell>
    );
  };

  return (
    <div className="space-y-3">
      {(section.type === "navbar") && (
        <>
          <TextField label="Logo text" value={str("logo")} onChange={(v) => onChange({ logo: v })} />
          <TextField label="Button text" value={str("cta")} onChange={(v) => onChange({ cta: v })} />
        </>
      )}
      {(section.type === "hero") && (
        <>
          <TextField label="Eyebrow" value={str("eyebrow")} onChange={(v) => onChange({ eyebrow: v })} />
          <TextField label="Title" value={str("title")} onChange={(v) => onChange({ title: v })} />
          <TextField label="Subtitle" value={str("subtitle")} onChange={(v) => onChange({ subtitle: v })} />
          <AreaField label="Description" value={str("description")} onChange={(v) => onChange({ description: v })} />
          <div className="grid grid-cols-2 gap-2">
            <TextField label="Primary button" value={str("primaryCta")} onChange={(v) => onChange({ primaryCta: v })} />
            <TextField label="Secondary button" value={str("secondaryCta")} onChange={(v) => onChange({ secondaryCta: v })} />
          </div>
          <ImageField label="Hero image" value={str("image")} onChange={(v) => onChange({ image: v })} />
        </>
      )}
      {(section.type === "about") && (
        <>
          <TextField label="Eyebrow" value={str("heading")} onChange={(v) => onChange({ heading: v })} />
          <TextField label="Title" value={str("title")} onChange={(v) => onChange({ title: v })} />
          <AreaField label="Body" value={str("body")} rows={4} onChange={(v) => onChange({ body: v })} />
          <ImageField label="Image" value={str("image")} onChange={(v) => onChange({ image: v })} />
        </>
      )}
      {section.type === "skills" && listEditor("skills", "Skills", "Skill", { name: "New skill", level: 80 },
        (it, set) => (<><TextField label="Name" value={String(it["name"] ?? "")} onChange={(v) => set({ name: v } as Partial<typeof it>)} /><TextField label="Level (0–100)" value={String(it["level"] ?? "")} onChange={(v) => set({ level: Number(v) || 0 } as Partial<typeof it>)} /></>))}
      {section.type === "services" && (
        <>
          <TextField label="Title" value={str("title")} onChange={(v) => onChange({ title: v })} />
          <AreaField label="Description" value={str("description")} onChange={(v) => onChange({ description: v })} />
          {listEditor("items", "Services", "Service", { title: "New service", description: "", icon: "sparkles", price: "" },
            (it, set) => (<><TextField label="Name" value={String(it["title"] ?? "")} onChange={(v) => set({ title: v } as never)} /><AreaField label="Description" value={String(it["description"] ?? "")} onChange={(v) => set({ description: v } as never)} /><TextField label="Price (optional)" value={String(it["price"] ?? "")} onChange={(v) => set({ price: v } as never)} /></>))}
        </>
      )}
      {section.type === "projects" && (
        <>
          <TextField label="Title" value={str("title")} onChange={(v) => onChange({ title: v })} />
          {listEditor("items", "Projects", "Project", { title: "New project", description: "", image: "", tags: [], url: "#", github: "#" },
            (it, set) => (<>
              <TextField label="Name" value={String(it["title"] ?? "")} onChange={(v) => set({ title: v } as never)} />
              <AreaField label="Description" value={String(it["description"] ?? "")} onChange={(v) => set({ description: v } as never)} />
              <ImageField label="Image" value={String(it["image"] ?? "")} onChange={(v) => set({ image: v } as never)} />
              <TextField label="Tags (comma separated)" value={(Array.isArray(it["tags"]) ? (it["tags"] as string[]).join(", ") : "")} onChange={(v) => set({ tags: v.split(",").map((s) => s.trim()).filter(Boolean) } as never)} />
              <div className="grid grid-cols-2 gap-2">
                <TextField label="URL" value={String(it["url"] ?? "")} onChange={(v) => set({ url: v } as never)} />
                <TextField label="GitHub" value={String(it["github"] ?? "")} onChange={(v) => set({ github: v } as never)} />
              </div>
            </>))}
        </>
      )}
      {section.type === "experience" && listEditor("items", "Roles", "Role", { company: "", role: "", start: "", end: "", description: "" },
        (it, set) => (<><div className="grid grid-cols-2 gap-2"><TextField label="Company" value={String(it["company"] ?? "")} onChange={(v) => set({ company: v } as never)} /><TextField label="Position" value={String(it["role"] ?? "")} onChange={(v) => set({ role: v } as never)} /></div><div className="grid grid-cols-2 gap-2"><TextField label="Start" value={String(it["start"] ?? "")} onChange={(v) => set({ start: v } as never)} /><TextField label="End" value={String(it["end"] ?? "")} onChange={(v) => set({ end: v } as never)} /></div><AreaField label="Description" value={String(it["description"] ?? "")} onChange={(v) => set({ description: v } as never)} /></>))}
      {section.type === "education" && listEditor("items", "Education", "Entry", { school: "", degree: "", start: "", end: "", description: "" },
        (it, set) => (<><TextField label="Institution" value={String(it["school"] ?? "")} onChange={(v) => set({ school: v } as never)} /><TextField label="Degree" value={String(it["degree"] ?? "")} onChange={(v) => set({ degree: v } as never)} /><div className="grid grid-cols-2 gap-2"><TextField label="Start year" value={String(it["start"] ?? "")} onChange={(v) => set({ start: v } as never)} /><TextField label="End year" value={String(it["end"] ?? "")} onChange={(v) => set({ end: v } as never)} /></div></>))}
      {section.type === "testimonials" && listEditor("items", "Testimonials", "Quote", { name: "", role: "", company: "", message: "", photo: "" },
        (it, set) => (<><AreaField label="Message" value={String(it["message"] ?? "")} onChange={(v) => set({ message: v } as never)} /><div className="grid grid-cols-2 gap-2"><TextField label="Name" value={String(it["name"] ?? "")} onChange={(v) => set({ name: v } as never)} /><TextField label="Company" value={String(it["company"] ?? "")} onChange={(v) => set({ company: v } as never)} /></div><TextField label="Role" value={String(it["role"] ?? "")} onChange={(v) => set({ role: v } as never)} /></>))}
      {section.type === "pricing" && listEditor("items", "Plans", "Plan", { name: "New plan", price: "$0", period: "one-time", description: "", features: [], featured: false },
        (it, set) => (<><div className="grid grid-cols-2 gap-2"><TextField label="Name" value={String(it["name"] ?? "")} onChange={(v) => set({ name: v } as never)} /><TextField label="Price" value={String(it["price"] ?? "")} onChange={(v) => set({ price: v } as never)} /></div><TextField label="Features (comma separated)" value={(Array.isArray(it["features"]) ? (it["features"] as string[]).join(", ") : "")} onChange={(v) => set({ features: v.split(",").map((s) => s.trim()).filter(Boolean) } as never)} /></>))}
      {section.type === "gallery" && (
        <div className="space-y-2">
          {(Array.isArray(c["images"]) ? c["images"] as string[] : []).map((img, i) => (
            <ImageField key={i} label={`Photo ${i + 1}`} value={img} onChange={(v) => { const next = [...(c["images"] as string[])]; next[i] = v; onChange({ images: next }); }} />
          ))}
          <div className="flex gap-2">
            <button onClick={() => onChange({ images: [...(Array.isArray(c["images"]) ? c["images"] as string[] : []), ""] })} className="flex-1 rounded-lg border border-neutral-200 py-1.5 text-xs font-medium">+ Add photo</button>
            <button onClick={() => onChange({ images: (c["images"] as string[]).slice(0, -1) })} className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs">−</button>
          </div>
        </div>
      )}
      {section.type === "team" && listEditor("members", "Members", "Member", { name: "", role: "", photo: "", bio: "" },
        (it, set) => (<><TextField label="Name" value={String(it["name"] ?? "")} onChange={(v) => set({ name: v } as never)} /><TextField label="Role" value={String(it["role"] ?? "")} onChange={(v) => set({ role: v } as never)} /><ImageField label="Photo" value={String(it["photo"] ?? "")} onChange={(v) => set({ photo: v } as never)} /><AreaField label="Bio" value={String(it["bio"] ?? "")} onChange={(v) => set({ bio: v } as never)} /></>))}
      {section.type === "process" && listEditor("steps", "Steps", "Step", { title: "", description: "", icon: "" },
        (it, set) => (<><TextField label="Title" value={String(it["title"] ?? "")} onChange={(v) => set({ title: v } as never)} /><AreaField label="Description" value={String(it["description"] ?? "")} onChange={(v) => set({ description: v } as never)} /></>))}
      {section.type === "faq" && listEditor("items", "Questions", "Question", { q: "", a: "" },
        (it, set) => (<><TextField label="Question" value={String(it["q"] ?? "")} onChange={(v) => set({ q: v } as never)} /><AreaField label="Answer" value={String(it["a"] ?? "")} onChange={(v) => set({ a: v } as never)} /></>))}
      {(section.type === "cta") && (
        <><TextField label="Title" value={str("title")} onChange={(v) => onChange({ title: v })} /><AreaField label="Description" value={str("description")} onChange={(v) => onChange({ description: v })} /></>
      )}
      {(section.type === "contact") && (
        <>
          <TextField label="Title" value={str("title")} onChange={(v) => onChange({ title: v })} />
          <TextField label="Email" value={str("email")} onChange={(v) => onChange({ email: v })} />
          <TextField label="Phone" value={str("phone")} onChange={(v) => onChange({ phone: v })} />
          <TextField label="Location" value={str("location")} onChange={(v) => onChange({ location: v })} />
          <AreaField label="Intro" value={str("body")} onChange={(v) => onChange({ body: v })} />
        </>
      )}
      {(section.type === "footer") && (
        <><TextField label="Tagline" value={str("tagline")} onChange={(v) => onChange({ tagline: v })} /><TextField label="Copyright" value={str("copyright")} onChange={(v) => onChange({ copyright: v })} /></>
      )}
      {(section.type === "menu" || section.type === "hours") && (
        <p className="rounded-lg bg-neutral-50 p-2.5 text-xs text-neutral-500">Structured editing for this section lives in the right panel. Use enable / variant controls there.</p>
      )}
      {/* allow raw variant note */}
      <details className="text-xs text-neutral-400"><summary className="cursor-pointer">Advanced</summary><pre className="mt-1 max-h-40 overflow-auto rounded bg-neutral-900 p-2 text-[10px] text-neutral-200">{JSON.stringify(c, null, 1).slice(0, 1500)}</pre>
        <button className="mt-1 underline" onClick={() => { const raw = prompt("Paste section content JSON"); if (raw) { try { onReplace(JSON.parse(raw)); } catch { alert("Invalid JSON"); } } }}>Replace JSON</button>
      </details>
    </div>
  );
}

// ─── Sections panel ───
function SectionsPanel({ config, selectedId, onSelect, onToggle, onMove, onRemove, onDuplicate, onAdd }: {
  config: WebsiteConfig; selectedId: string | null; onSelect: (id: string) => void;
  onToggle: (id: string) => void; onMove: (id: string, d: -1 | 1) => void; onRemove: (id: string) => void; onDuplicate: (id: string) => void; onAdd: (t: SectionType) => void;
}) {
  const [dragId, setDragId] = useState<string | null>(null);
  return (
    <div className="space-y-2">
      <p className="px-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Reorder · toggle · edit</p>
      {config.sections.map((s) => (
        <div key={s.id} draggable onDragStart={() => setDragId(s.id)} onDragOver={(e) => e.preventDefault()} onDrop={() => { /* simple: move via order */ setDragId(null); }}
          onClick={() => onSelect(s.id)}
          className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-[13px] ${selectedId === s.id ? "border-neutral-900" : "border-neutral-200"} ${s.enabled ? "bg-white" : "bg-neutral-50 opacity-60"}`}>
          <span className="cursor-grab text-neutral-400">☰</span>
          <span className="font-medium">{SECTION_META[s.type]?.label}</span>
          <span className="text-[11px] text-neutral-400">{s.variant}</span>
          <span className="ml-auto flex gap-1" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => onMove(s.id, -1)} className="rounded border border-neutral-200 px-1 text-[11px]">↑</button>
            <button onClick={() => onMove(s.id, 1)} className="rounded border border-neutral-200 px-1 text-[11px]">↓</button>
            <button onClick={() => onToggle(s.id)} className="rounded border border-neutral-200 px-1.5 text-[11px]">{s.enabled ? "Hide" : "Show"}</button>
          </span>
        </div>
      ))}
      <div className="border-t border-neutral-100 pt-3">
        <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Add section</p>
        <div className="grid grid-cols-2 gap-1.5">
          {(Object.keys(SECTION_META) as SectionType[]).filter((t) => SECTION_META[t].deletable).map((t) => (
            <button key={t} onClick={() => onAdd(t)} className="rounded-lg border border-neutral-200 px-2 py-1.5 text-xs font-medium hover:border-neutral-900">+ {SECTION_META[t].label}</button>
          ))}
        </div>
      </div>
      {dragId && <p className="text-[11px] text-neutral-400">Drag to reorder — use ↑ ↓ for precise placement.</p>}
    </div>
  );
}

// ─── Design ───
function DesignPanel({ theme, onPatch, customCss, onCustomCss }: { theme: ThemeConfig; onPatch: (p: Partial<ThemeConfig>) => void; customCss: string; onCustomCss: (v: string) => void }) {
  const colors: { key: keyof ThemeConfig; label: string }[] = [
    { key: "primary", label: "Primary" }, { key: "secondary", label: "Secondary" },
    { key: "background", label: "Background" }, { key: "surface", label: "Surface" },
    { key: "text", label: "Text" }, { key: "muted", label: "Muted" }, { key: "accent", label: "Accent" },
  ];
  return (
    <div className="space-y-5">
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Presets</p>
        <div className="grid grid-cols-2 gap-1.5">
          {THEME_PRESETS.map((p) => (
            <button key={p.name} onClick={() => onPatch(p.theme)} className="rounded-lg border border-neutral-200 px-2 py-1.5 text-xs font-medium hover:border-neutral-900">{p.name}</button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Colors</p>
        <div className="space-y-2">
          {colors.map((c) => (
            <div key={c.key} className="flex items-center gap-2">
              <input type="color" value={String(theme[c.key])} onChange={(e) => onPatch({ [c.key]: e.target.value } as Partial<ThemeConfig>)} className="h-8 w-10 cursor-pointer rounded border border-neutral-200" />
              <span className="w-20 text-xs">{c.label}</span>
              <input value={String(theme[c.key])} onChange={(e) => onPatch({ [c.key]: e.target.value } as Partial<ThemeConfig>)} className="w-full rounded-md border border-neutral-200 px-2 py-1 font-mono text-xs" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Typography</p>
        <label className="mb-2 block text-xs">Heading font
          <select value={theme.fontHeading} onChange={(e) => onPatch({ fontHeading: e.target.value })} className="mt-1 w-full rounded-lg border border-neutral-200 px-2 py-1.5 text-[13px]">
            {FONT_CHOICES.map((f) => <option key={f}>{f}</option>)}
          </select>
        </label>
        <label className="mb-2 block text-xs">Body font
          <select value={theme.fontBody} onChange={(e) => onPatch({ fontBody: e.target.value })} className="mt-1 w-full rounded-lg border border-neutral-200 px-2 py-1.5 text-[13px]">
            {FONT_CHOICES.map((f) => <option key={f}>{f}</option>)}
          </select>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <label className="text-xs">Heading scale<input type="range" min={0.9} max={1.3} step={0.05} value={theme.headingScale} onChange={(e) => onPatch({ headingScale: Number(e.target.value) })} className="w-full" /></label>
          <label className="text-xs">Body size<input type="range" min={14} max={19} step={1} value={theme.bodySize} onChange={(e) => onPatch({ bodySize: Number(e.target.value) })} className="w-full" /></label>
          <label className="text-xs">Line height<input type="range" min={1.4} max={1.9} step={0.05} value={theme.lineHeight} onChange={(e) => onPatch({ lineHeight: Number(e.target.value) })} className="w-full" /></label>
          <label className="text-xs">Radius ({theme.radius}px)<input type="range" min={0} max={24} step={2} value={theme.radius} onChange={(e) => onPatch({ radius: Number(e.target.value) })} className="w-full" /></label>
        </div>
      </div>
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Layout</p>
        <div className="grid grid-cols-3 gap-1.5">
          {(["narrow", "medium", "wide"] as const).map((w) => <button key={w} onClick={() => onPatch({ contentWidth: w })} className={`rounded-lg border px-2 py-1.5 text-xs capitalize ${theme.contentWidth === w ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200"}`}>{w}</button>)}
        </div>
        <div className="mt-1.5 grid grid-cols-3 gap-1.5">
          {(["compact", "comfortable", "spacious"] as const).map((w) => <button key={w} onClick={() => onPatch({ sectionSpacing: w })} className={`rounded-lg border px-2 py-1.5 text-xs capitalize ${theme.sectionSpacing === w ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200"}`}>{w}</button>)}
        </div>
        <div className="mt-1.5 grid grid-cols-3 gap-1.5">
          {(["rounded", "pill", "square"] as const).map((w) => <button key={w} onClick={() => onPatch({ buttonStyle: w })} className={`rounded-lg border px-2 py-1.5 text-xs capitalize ${theme.buttonStyle === w ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200"}`}>{w}</button>)}
        </div>
      </div>
      <details>
        <summary className="cursor-pointer text-xs font-medium text-neutral-600">Custom CSS (advanced)</summary>
        <textarea value={customCss} onChange={(e) => onCustomCss(e.target.value)} rows={5} placeholder="/* Optional extra styles */" className="mt-2 w-full rounded-lg border border-neutral-200 p-2 font-mono text-xs" />
      </details>
    </div>
  );
}

// ─── SEO ───
function SeoPanel({ config, onCommit }: { config: WebsiteConfig; onCommit: (c: WebsiteConfig) => void }) {
  const seo = config.seo;
  const set = (p: Partial<typeof seo>) => onCommit({ ...config, seo: { ...seo, ...p } });
  return (
    <div className="space-y-3">
      <TextField label="SEO title" value={seo.title} onChange={(v) => set({ title: v })} />
      <AreaField label="SEO description" value={seo.description} onChange={(v) => set({ description: v })} />
      <ImageField label="Social preview image" value={seo.socialImage} onChange={(v) => set({ socialImage: v })} />
      <TextField label="Language" value={seo.language} onChange={(v) => set({ language: v })} />
      <div className="rounded-lg bg-neutral-50 p-3 text-xs text-neutral-600">
        <p className="font-semibold text-neutral-800">Preview</p>
        <p className="mt-1 font-medium text-blue-800">{seo.title || config.siteName}</p>
        <p className="line-clamp-2">{seo.description}</p>
      </div>
    </div>
  );
}

// ─── Settings ───
function SettingsPanel({ site, config, onCommit, onSite }: { site: WebsiteRecord; config: WebsiteConfig; onCommit: (c: WebsiteConfig) => void; onSite: (s: WebsiteRecord) => void }) {
  const [slug, setSlug] = useState(site.slug);
  const [domain, setDomain] = useState(site.customDomain || "");
  const [msg, setMsg] = useState("");

  async function saveMeta() {
    setMsg("Saving…");
    const res = await fetch(`/api/websites/${site.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug, customDomain: domain, name: config.siteName, config }) });
    const data = await res.json();
    if (res.ok) { onSite(data.website); setMsg("Saved."); } else setMsg(data.error || "Failed.");
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-xs font-medium">Website name</label>
        <input value={config.siteName} onChange={(e) => onCommit({ ...config, siteName: e.target.value })} className="w-full rounded-lg border border-neutral-200 px-2.5 py-1.5 text-[13px]" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium">Site URL slug</label>
        <div className="flex gap-1.5">
          <input value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))} className="w-full rounded-lg border border-neutral-200 px-2.5 py-1.5 font-mono text-[13px]" />
        </div>
        <p className="mt-1 text-[11px] text-neutral-500">Live at /s/{site.slug}</p>
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium">Google Analytics ID (optional)</label>
        <input value={config.analyticsId || ""} onChange={(e) => onCommit({ ...config, analyticsId: e.target.value })} placeholder="G-XXXXXXX" className="w-full rounded-lg border border-neutral-200 px-2.5 py-1.5 text-[13px]" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium">Custom domain (optional)</label>
        <input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="www.yourdomain.com" className="w-full rounded-lg border border-neutral-200 px-2.5 py-1.5 text-[13px]" />
        {domain && <div className="mt-2 rounded-lg bg-amber-50 p-2.5 text-[11px] text-amber-900">Status: waiting for DNS. Add: CNAME www → sites.create.io</div>}
      </div>
      <button onClick={saveMeta} className="w-full rounded-lg bg-neutral-900 py-2 text-[13px] font-medium text-white">Save settings</button>
      {msg && <p className="text-xs text-neutral-500">{msg}</p>}
      <div className="rounded-lg bg-neutral-50 p-3 text-[11px] leading-relaxed text-neutral-500">
        Shortcuts: Ctrl/Cmd+Z undo · Ctrl/Cmd+Shift+Z redo · Ctrl/Cmd+S save.
      </div>
    </div>
  );
}

// ─── Right inspector ───
function SectionInspector({ section, theme, onPatch, onTheme }: {
  section: SectionInstance; theme: ThemeConfig; onPatch: (fn: (s: SectionInstance) => SectionInstance) => void; onTheme: (p: Partial<ThemeConfig>) => void;
}) {
  void theme; void onTheme;
  const meta = SECTION_META[section.type];
  return (
    <div className="space-y-4">
      <div>
        <p className="mb-1.5 text-xs font-medium text-neutral-600">Variant — keeps design professional</p>
        <div className="flex flex-wrap gap-1.5">
          {meta.variants.map((v) => (
            <button key={v.id} onClick={() => onPatch((s) => ({ ...s, variant: v.id }))} className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium ${section.variant === v.id ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200"}`}>
              {v.label}
            </button>
          ))}
        </div>
      </div>
      <label className="flex items-center justify-between text-[13px]">
        <span>Visible on site</span>
        <button onClick={() => onPatch((s) => ({ ...s, enabled: !s.enabled }))} className={`relative h-6 w-11 rounded-full transition ${section.enabled ? "bg-neutral-900" : "bg-neutral-300"}`}>
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${section.enabled ? "left-[22px]" : "left-0.5"}`} />
        </button>
      </label>
      <div className="border-t border-neutral-100 pt-3">
        <SectionFields section={section} onChange={(patch) => onPatch((s) => setC(s, patch))} onReplace={(c) => onPatch((s) => ({ ...s, content: c }))} />
      </div>
    </div>
  );
}
