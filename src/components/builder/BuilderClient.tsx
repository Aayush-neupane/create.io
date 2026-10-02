"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { PageConfig, SectionInstance, SectionType, ThemeConfig, WebsiteConfig, WebsiteRecord } from "@/types/builder";
import { TemplateRenderer, SECTION_META } from "@/components/templates/Renderer";
import { LogoTile } from "@/components/layout/chrome";
import { isBespoke } from "@/templates";
import { FONT_CHOICES, THEME_PRESETS, defaultSection, normalizeConfig, sanitizePagePath, sid } from "@/lib/website-defaults";
import { getTemplate } from "@/lib/templates";
import { TextField, AreaField, ImageField, ListShell, ItemCard, FieldGroup, summaryOf } from "./fields";

type Tab = "content" | "sections" | "pages" | "design" | "seo" | "settings";
type SaveState = "saved" | "saving" | "dirty" | "error";

const TABS: { id: Tab; label: string }[] = [
  { id: "content", label: "Content" },
  { id: "sections", label: "Sections" },
  { id: "pages", label: "Pages" },
  { id: "design", label: "Design" },
  { id: "seo", label: "SEO" },
  { id: "settings", label: "Settings" },
];

function setC(s: SectionInstance, patch: Record<string, unknown>): SectionInstance {
  return { ...s, content: { ...s.content, ...patch } };
}
function move<T>(list: T[], i: number, dir: -1 | 1): T[] {
  if (i < 0 || i >= list.length) return list;
  const j = i + dir;
  if (j < 0 || j >= list.length) return list;
  const out = [...list];
  [out[i], out[j]] = [out[j], out[i]];
  return out;
}

const VALID_TABS: Tab[] = ["content", "sections", "pages", "design", "seo", "settings"];

export function BuilderClient({ initial, initialTab, demo }: { initial: WebsiteRecord; initialTab?: string; demo?: boolean }) {
  const router = useRouter();
  const [site, setSite] = useState<WebsiteRecord>(initial);
  // Demo accounts persist in this browser (localStorage) with full editing
  // privileges — same builder, same controls as signed-in accounts.
  const [config, setConfig] = useState<WebsiteConfig>(() => {
    if (!demo || typeof window === "undefined") return initial.config;
    try {
      const raw = window.localStorage.getItem(`createio-demo-${initial.templateId}`);
      if (raw) return normalizeConfig(JSON.parse(raw));
    } catch { /* corrupted demo cache → fall through to seed */ }
    return initial.config;
  });
  const [tab, setTab] = useState<Tab>(VALID_TABS.includes(initialTab as Tab) ? (initialTab as Tab) : "content");
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [selectedId, setSelectedId] = useState<string | null>(
    Array.isArray(initial.config?.sections) ? (initial.config.sections[1]?.id ?? initial.config.sections[0]?.id ?? null) : null,
  );
  const [dragId, setDragId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("saved");
  const [saveMsg, setSaveMsg] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [activePageId, setActivePageId] = useState<string | null>(null);

  const past = useRef<WebsiteConfig[]>([]);
  const future = useRef<WebsiteConfig[]>([]);
  const [, force] = useState(0);
  // Demo config loads from this browser only — defer first paint past
  // hydration so server and client HTML always match.
  const [mounted, setMounted] = useState(!demo);
  useEffect(() => {
    if (!demo || mounted) return;
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, [demo, mounted]);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saveNowRef = useRef<(status?: "draft" | "published") => Promise<void>>(async () => {});

  const commit = useCallback((next: WebsiteConfig) => {
    past.current.push(config);
    // Cap history and shed oldest entries faster when configs are huge
    // (e.g. embedded demo images) to avoid 100s-of-MB memory retention.
    while (past.current.length > 30) past.current.shift();
    try {
      const size = JSON.stringify(next).length;
      if (size > 2_000_000) while (past.current.length > 10) past.current.shift();
    } catch { /* size check is best-effort */ }
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
      else if (e.key === "Escape") { setSelectedId(null); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  // autosave (debounced; demo writes to this browser instead of the server)
  useEffect(() => {
    if (saveState !== "dirty") return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => saveNow(), 1200);
    return () => { if (saveTimer.current) clearTimeout(saveTimer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  async function saveNow(status?: "draft" | "published") {
    if (demo) {
      try {
        window.localStorage.setItem(`createio-demo-${site.templateId}`, JSON.stringify(config));
        setSaveState("saved");
        setSaveMsg("");
      } catch {
        // Quota / private mode: keep in-memory edits but warn loudly — a
        // reload would otherwise silently revert to the seed template.
        setSaveState("error");
        setSaveMsg("This browser is out of storage, so demo changes are only kept in memory for now. Sign up to save them permanently, or remove large images.");
      }
      return;
    }
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
    try {
      if (demo) return;
      setSaveState("saving");
      setSaveMsg("");
      const res = await fetch(`/api/websites/${site.id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: config.siteName, config, status: "published" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string }).error || "Could not publish.");
      setSite((data as { website: WebsiteRecord }).website);
      setSaveState("saved");
      router.refresh();
    } catch (e) {
      setSaveState("error");
      setSaveMsg(e instanceof Error ? e.message : "Could not publish. Your changes are still available locally.");
    } finally {
      setPublishing(false);
    }
  }

  async function unpublish() {
    await saveNow("draft");
  }

  // Keep a ref to the latest save so guards/flush don't close over stale state.
  saveNowRef.current = saveNow;

  // Warn before losing unsaved work (tab close / reload).
  useEffect(() => {
    function onBeforeUnload(e: BeforeUnloadEvent) {
      if (saveState === "dirty" || saveState === "saving" || saveState === "error") {
        e.preventDefault();
      }
    }
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [saveState]);

  // Flush a pending autosave when unmounting (e.g. in-app navigation) so the
  // last <1200ms of edits aren't silently dropped.
  const flushOnUnmount = useRef(false);
  useEffect(() => {
    flushOnUnmount.current = saveState === "dirty";
  }, [saveState]);
  useEffect(() => {
    return () => {
      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
        saveTimer.current = null;
        if (flushOnUnmount.current) void saveNowRef.current();
      }
    };
  }, []);

  // Keep the selected section in view when picking from the sidebars.
  useEffect(() => {
    if (!selectedId) return;
    document.querySelector(`[data-section-id="${selectedId}"]`)?.scrollIntoView({ block: "nearest" });
  }, [selectedId]);

  const activePage = useMemo(() => (config.pages ?? []).find((p) => p.id === activePageId) ?? null, [config, activePageId]);
  const activeSections = activePage ? activePage.sections : config.sections;
  const activeConfig: WebsiteConfig = useMemo(() => ({ ...config, sections: activeSections }), [config, activeSections]);
  function setActiveSections(fn: (list: SectionInstance[]) => SectionInstance[]) {
    if (activePage) {
      commit({ ...config, pages: (config.pages ?? []).map((p) => (p.id === activePage.id ? { ...p, sections: fn(p.sections) } : p)) });
    } else {
      commit({ ...config, sections: fn(config.sections) });
    }
  }
  function switchPage(id: string | null) {
    setActivePageId(id);
    setSelectedId(null);
    setTab("content");
  }
  function addPage(title: string) {
    const clean = title.trim() || "New page";
    let path = sanitizePagePath(clean);
    const taken = new Set((config.pages ?? []).map((p) => p.path));
    let n = 1;
    while (taken.has(path)) path = `${sanitizePagePath(clean)}-${++n}`;
    const page: PageConfig = { id: sid("page"), title: clean, path, sections: [] };
    commit({ ...config, pages: [...(config.pages ?? []), page] });
    setActivePageId(page.id);
    setTab("sections");
  }
  function renamePage(id: string, title: string, path: string) {
    const cleanTitle = title.trim() || "Page";
    let cleanPath = sanitizePagePath(path || cleanTitle);
    const taken = new Set((config.pages ?? []).filter((p) => p.id !== id).map((p) => p.path));
    let n = 1;
    while (taken.has(cleanPath)) cleanPath = `${sanitizePagePath(path || cleanTitle)}-${++n}`;
    commit({ ...config, pages: (config.pages ?? []).map((p) => (p.id === id ? { ...p, title: cleanTitle, path: cleanPath } : p)) });
  }
  function removePage(id: string) {
    if (!confirm("Delete this page and all its sections?")) return;
    commit({ ...config, pages: (config.pages ?? []).filter((p) => p.id !== id) });
    if (activePageId === id) { setActivePageId(null); setSelectedId(null); }
  }
  const selected = useMemo(() => activeSections.find((s) => s.id === selectedId) ?? null, [activeSections, selectedId]);
  const previewWidth = device === "mobile" ? "max-w-[390px]" : device === "tablet" ? "max-w-[768px]" : "max-w-none";

  function patchTheme(p: Partial<ThemeConfig>) {
    commit({ ...config, theme: { ...config.theme, ...p } });
  }
  function patchSection(id: string, fn: (s: SectionInstance) => SectionInstance) {
    setActiveSections((list) => list.map((s) => (s.id === id ? fn(s) : s)));
  }
  function reorderSection(id: string, dir: -1 | 1) {
    setActiveSections((list) => move(list, list.findIndex((s) => s.id === id), dir));
  }
  function reorderSectionTo(fromId: string, toId: string) {
    if (fromId === toId) return;
    setActiveSections((list) => {
      const from = list.findIndex((s) => s.id === fromId);
      const to = list.findIndex((s) => s.id === toId);
      if (from < 0 || to < 0) return list;
      const next = [...list];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  }
  function toggleSection(id: string) {
    patchSection(id, (s) => ({ ...s, enabled: !s.enabled }));
  }
  // ── canvas drag-and-drop reorder ──
  function onDndStart(id: string) { setDragId(id); setOverId(null); }
  function onDndOver(id: string | null) { setOverId(id); }
  function onDndDrop(id: string) {
    if (dragId && dragId !== id) reorderSectionTo(dragId, id);
    setDragId(null);
    setOverId(null);
  }
  function onDndEnd() { setDragId(null); setOverId(null); }
  // ── docked selection bar: variant / text size / spacing without the panel ──
  const SPACING_ORDER = ["compact", "comfortable", "spacious"] as const;
  function patchOverride(patch: Record<string, unknown>) {
    const sel = activeSections.find((s) => s.id === selectedId);
    if (!sel) return;
    patchSection(sel.id, (s) => {
      const merged = { ...(s.themeOverride ?? {}), ...patch } as Record<string, unknown>;
      // Drop keys that match the site theme so overrides stay minimal.
      if (merged["headingScale"] === config.theme.headingScale) delete merged["headingScale"];
      if (merged["sectionSpacing"] === config.theme.sectionSpacing) delete merged["sectionSpacing"];
      return { ...s, ...(Object.keys(merged).length > 0 ? { themeOverride: merged } : { themeOverride: undefined }) };
    });
  }
  function cycleVariant(dir: -1 | 1) {
    const sel = activeSections.find((s) => s.id === selectedId);
    if (!sel) return;
    const vs = SECTION_META[sel.type]?.variants ?? [];
    if (vs.length < 2) return;
    const i = vs.findIndex((v) => v.id === sel.variant);
    const next = vs[(i + dir + vs.length) % vs.length];
    patchSection(sel.id, (s) => ({ ...s, variant: next.id }));
  }
  function stepText(dir: -1 | 1) {
    const sel = activeSections.find((s) => s.id === selectedId);
    if (!sel) return;
    const cur = (sel.themeOverride?.headingScale as number | undefined) ?? config.theme.headingScale;
    patchOverride({ headingScale: Math.min(1.5, Math.max(0.7, Math.round((cur + dir * 0.05) * 100) / 100)) });
  }
  function cycleSpacing() {
    const sel = activeSections.find((s) => s.id === selectedId);
    if (!sel) return;
    const cur = (sel.themeOverride?.sectionSpacing as (typeof SPACING_ORDER)[number] | undefined) ?? config.theme.sectionSpacing;
    patchOverride({ sectionSpacing: SPACING_ORDER[(SPACING_ORDER.indexOf(cur) + 1) % SPACING_ORDER.length] });
  }
  function removeSection(id: string) {
    const s = activeSections.find((x) => x.id === id);
    if (!s) return;
    if (!SECTION_META[s.type]?.deletable) return;
    if (!confirm(`Remove ${SECTION_META[s.type].label} section?`)) return;
    setActiveSections((list) => list.filter((x) => x.id !== id));
    if (selectedId === id) setSelectedId(null);
  }
  function duplicateSection(id: string) {
    const s = activeSections.find((x) => x.id === id);
    if (!s) return;
    const copy: SectionInstance = { ...s, id: sid(s.type), content: JSON.parse(JSON.stringify(s.content)) };
    setActiveSections((list) => {
      const idx = list.findIndex((x) => x.id === id);
      const next = [...list];
      next.splice(idx + 1, 0, copy);
      return next;
    });
    setSelectedId(copy.id);
  }
  function addSection(type: SectionType) {
    const meta = SECTION_META[type];
    const inst = defaultSection(type, meta.variants[0].id);
    // Announcement banners belong at the very top, above the navbar.
    if (type === "banner") {
      setActiveSections((list) => [inst, ...list]);
    } else {
      setActiveSections((list) => [...list, inst]);
    }
    setSelectedId(inst.id);
    setTab("content");
  }

  if (demo && !mounted) {
    return (
      <div className="flex h-screen items-center justify-center" style={{ background: "var(--paper)" }}>
        <p className="mono-meta text-xs uppercase" style={{ letterSpacing: "0.14em", color: "var(--ink-3)" }}>Loading demo…</p>
      </div>
    );
  }

  return (
    <div className="builder flex h-screen flex-col" style={{ background: "var(--paper)" }}>
      {/* Top bar */}
      <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-white px-4" style={{ borderColor: "var(--line)" }}>
        <Link href={demo ? "/demo" : "/dashboard"} className="flex items-center gap-2" aria-label={demo ? "Back to demo sites" : "Back to dashboard"} title={demo ? "All demo sites" : "Dashboard"}>
          <LogoTile size={28} />
        </Link>
        <input
          value={config.siteName}
          onChange={(e) => commit({ ...config, siteName: e.target.value })}
          className="mono-meta w-48 rounded-md px-2 py-1 text-[13px] font-semibold focus:outline-none"
          style={{ color: "var(--ink)" }}
        />
        <span className="mono-meta hidden text-[11px] sm:inline" style={{ color: "var(--ink-3)" }}>/s/{site.slug}</span>
        <div className="mx-auto hidden items-center gap-0.5 rounded-[11px] border p-[3px] md:flex" style={{ borderColor: "var(--line)", background: "var(--paper-2)" }}>
          {(["desktop", "tablet", "mobile"] as const).map((d) => (
            <button key={d} onClick={() => setDevice(d)} className="rounded-lg px-3 py-1 text-xs font-medium capitalize transition-all" style={device === d ? { background: "var(--surface)", color: "var(--ink)", boxShadow: "0 1px 3px rgba(0,0,0,.12)" } : { color: "var(--ink-2)" }}>{d}</button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          {demo ? (
            <span className="flex items-center gap-2">
              <span className="tag">Demo — saved in this browser</span>
              <button
                onClick={() => { if (confirm("Reset the demo to the original template?")) { try { window.localStorage.removeItem(`createio-demo-${site.templateId}`); } catch {} window.location.reload(); } }}
                className="mono-meta text-[11px] underline opacity-60"
              >
                Reset
              </button>
            </span>
          ) : (
          <span className="mono-meta mr-1 hidden text-[11px] sm:inline" style={{ color: "var(--ink-3)" }}>
            {saveState === "saving" ? "saving…" : saveState === "dirty" ? "unsaved" : saveState === "error" ? "save failed" : "saved"}
          </span>
          )}
          <span className={`h-2 w-2 rounded-full ${saveState === "saved" ? "bg-emerald-500" : saveState === "error" ? "bg-red-500" : "bg-amber-400 animate-pulse"}`} title={saveState === "saving" ? "saving…" : saveState === "dirty" ? "unsaved changes" : saveState === "error" ? "save failed" : "all changes saved"} />
          <button onClick={undo} disabled={past.current.length === 0} className="rounded-[9px] border px-2.5 py-1.5 text-xs transition-transform active:scale-95 disabled:opacity-40" style={{ borderColor: "var(--line-2)" }} title="Undo (Ctrl+Z)">↩</button>
          <button onClick={redo} disabled={future.current.length === 0} className="rounded-[9px] border px-2.5 py-1.5 text-xs transition-transform active:scale-95 disabled:opacity-40" style={{ borderColor: "var(--line-2)" }} title="Redo">↪</button>
          <Link href={demo ? `/templates/${site.templateId}` : `/s/${site.slug}`} target="_blank" className="rounded-[9px] border px-3 py-1.5 text-[13px] font-medium" style={{ borderColor: "var(--line-2)" }}>Preview</Link>
          {demo ? (
            <Link href="/signup" className="rounded-[9px] border px-3 py-1.5 text-[13px] font-medium" style={{ borderColor: "var(--line-2)" }}>Save</Link>
          ) : (
          <button onClick={() => saveNow()} className="rounded-[9px] border px-3 py-1.5 text-[13px] font-medium" style={{ borderColor: "var(--line-2)" }}>Save</button>
          )}
          {demo ? (
            <Link href="/signup" className="btn-primary rounded-[9px] px-3 py-1.5 text-[13px]" style={{ height: 33 }}>Publish</Link>
          ) : site.status === "published" ? (
            <button onClick={unpublish} className="rounded-[9px] px-3 py-1.5 text-[13px] font-medium" style={{ background: "var(--surface-2)" }}>Unpublish</button>
          ) : (
            <button onClick={publish} disabled={publishing || saveState === "saving"} className="btn-primary rounded-[9px] px-3 py-1.5 text-[13px] disabled:opacity-60" style={{ height: 33 }}>
              {publishing ? "Publishing…" : "Publish"}
            </button>
          )}
        </div>
      </header>
      {saveMsg && <p className="border-b border-red-200 bg-red-50 px-4 py-2 text-[13px] text-red-700">{saveMsg}</p>}

      <div className="flex min-h-0 flex-1">
        {/* Left sidebar */}
        <aside className="flex w-64 shrink-0 flex-col border-r bg-white" style={{ borderColor: "var(--line)" }}>
          <div className="grid grid-cols-3 gap-1 border-b p-2" style={{ borderColor: "var(--line)", background: "var(--paper)" }}>
            {TABS.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} aria-current={tab === t.id ? "page" : undefined} className="mono-meta rounded-lg px-1 py-2 text-[11px] font-semibold uppercase transition-colors" style={tab === t.id ? { background: "var(--ink)", color: "#fff" } : { color: "var(--ink-3)" }}>
                {t.label}
              </button>
            ))}
          </div>
          <div key={tab} className="tab-in min-h-0 flex-1 overflow-y-auto p-3">
            {tab === "content" && <ContentPanel config={activeConfig} selected={selected} onSelect={setSelectedId} onPatch={patchSection} pageLabel={activePage ? activePage.title : "Home"} demo={demo} onAddSection={() => setTab("sections")} />}
            {tab === "sections" && <SectionsPanel config={activeConfig} selectedId={selectedId} onSelect={(id) => { setSelectedId(id); }} onToggle={toggleSection} onMove={reorderSection} onRemove={removeSection} onDuplicate={duplicateSection} onAdd={addSection} onReorder={reorderSectionTo} pageLabel={activePage ? activePage.title : "Home"} />}
            {tab === "pages" && <PagesPanel config={config} activePageId={activePageId} onSwitch={switchPage} onAdd={addPage} onRename={renamePage} onRemove={removePage} siteSlug={site.slug} />}
            {tab === "design" && <DesignPanel theme={config.theme} onPatch={patchTheme} onCustomCss={(v) => commit({ ...config, customCss: v })} customCss={config.customCss || ""} onResetTheme={() => { if (confirm("Reset colors, fonts and layout to this template's original style? Your content stays.")) patchTheme({ ...getTemplate(site.templateId).theme }); }} />}
            {tab === "seo" && <SeoPanel config={config} onCommit={commit} demo={demo} />}
            {tab === "settings" && <SettingsPanel site={site} config={config} onCommit={commit} onSite={setSite} />}
          </div>
        </aside>

        {/* Preview */}
        <main className="flex min-w-0 flex-1 flex-col" style={{ background: "var(--paper-2)" }}>
          <div className="flex-1 overflow-auto p-4 md:p-6">
            {selected && <SelectionBar selected={selected} siteTheme={config.theme} onVariant={cycleVariant} onText={stepText} onSpacing={cycleSpacing} onToggle={() => toggleSection(selected.id)} onDelete={() => removeSection(selected.id)} />}
            <div className={`relative mx-auto overflow-hidden rounded-2xl border bg-white transition-all ${previewWidth}`} style={{ borderColor: "var(--line-2)", boxShadow: "0 30px 80px -40px rgba(23,23,27,.35)" }}>
              {!selected && (
                <p className="mono-meta absolute left-1/2 top-3 z-30 -translate-x-1/2 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[11px] font-semibold" style={{ background: "var(--ink)", color: "#fff" }}>
                  Click any section to edit it
                </p>
              )}
              <div className="builder-preview">
                {activePage && (
                  <p className="mono-meta mx-auto mb-2 w-fit rounded-full border bg-white px-3 py-1 text-[11px]" style={{ borderColor: "var(--line-2)", color: "var(--ink-2)" }}>
                    Editing page: {activePage.title} · /s/{site.slug}/{activePage.path}
                  </p>
                )}
                {activeSections.length === 0 ? (                  <div className="grid justify-items-center gap-2 px-6 py-24 text-center">
                    <p className="text-lg font-semibold" style={{ letterSpacing: "-0.02em" }}>{activePage ? "This page is empty" : "No sections yet"}</p>
                    <p className="max-w-sm text-sm" style={{ color: "var(--ink-2)" }}>
                      {activePage ? "Add sections to this page to start building it out." : "Add your first section to start building."}
                    </p>
                    <button onClick={() => setTab("sections")} className="btn-primary mt-3" style={{ height: 40, padding: "0 20px", fontSize: 13 }}>
                      {activePage ? "Add sections" : "Manage sections"}
                    </button>
                  </div>
                ) : (
                  <TemplateRenderer config={config} templateId={site.templateId} slug={site.slug} pagePath={activePage?.path} selectedId={selectedId} showHidden dnd={{ dragId, overId, onStart: onDndStart, onOver: onDndOver, onDrop: onDndDrop, onEnd: onDndEnd }} onSelect={(id) => { setSelectedId(id); setTab("content"); }} />
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Right panel */}
        <aside className="hidden w-72 shrink-0 flex-col border-l bg-white lg:flex" style={{ borderColor: "var(--line)" }}>
          <div className="border-b px-4 py-3" style={{ borderColor: "var(--line)", background: "var(--paper)" }}>
            <p className="mono-meta text-[10.5px] font-semibold uppercase" style={{ letterSpacing: "0.12em", color: "var(--ink-3)" }}>
              {selected ? `Editing — ${SECTION_META[selected.type]?.label}` : "Inspector"}
            </p>
            <h3 className="mt-0.5 text-[14px] font-semibold" style={{ letterSpacing: "-0.015em" }}>
              {selected ? (SECTION_META[selected.type]?.variants.length ?? 0) > 1 ? "Style, visibility & content" : "Visibility & content" : "Select a section"}
            </h3>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            {selected ? (
              <SectionInspector section={selected} templateId={site.templateId} demo={demo} siteTheme={config.theme} onPatch={(fn) => patchSection(selected.id, fn)} onMoveUp={() => reorderSection(selected.id, -1)} onMoveDown={() => reorderSection(selected.id, 1)} onDuplicate={() => duplicateSection(selected.id)} />
            ) : (
              <p className="text-[13px] text-neutral-500">Click any section on the left, or pick one below.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

// ─── Docked selection bar: edit the selected section without the side panels ───
function BarBtn({ title, onClick, children }: { title: string; onClick: () => void; children: ReactNode }) {
  return (
    <button title={title} onClick={(e) => { e.stopPropagation(); onClick(); }} className="rounded-full px-2 py-1 text-[13px] font-bold leading-none text-white transition-colors hover:bg-white/15">
      {children}
    </button>
  );
}

function SelectionBar({ selected, siteTheme, onVariant, onText, onSpacing, onToggle, onDelete }: {
  selected: SectionInstance; siteTheme: ThemeConfig;
  onVariant: (dir: -1 | 1) => void; onText: (dir: -1 | 1) => void;
  onSpacing: () => void; onToggle: () => void; onDelete: () => void;
}) {
  const variants = SECTION_META[selected.type]?.variants ?? [];
  const currentLabel = variants.find((v) => v.id === selected.variant)?.label ?? selected.variant;
  const effScale = (selected.themeOverride?.headingScale as number | undefined) ?? siteTheme.headingScale;
  const effSpacing = (selected.themeOverride?.sectionSpacing as string | undefined) ?? siteTheme.sectionSpacing;
  const deletable = SECTION_META[selected.type]?.deletable;
  return (
    <div className="sticky top-2 z-30 mx-auto mb-3 w-fit max-w-full">
      <div className="flex flex-wrap items-center justify-center gap-0.5 rounded-full py-1.5 pl-3 pr-1.5 shadow-xl" style={{ background: "var(--ink)" }}>
        <span className="mono-meta px-1 text-[11px] font-bold uppercase text-white" style={{ letterSpacing: "0.1em" }}>
          {SECTION_META[selected.type]?.label ?? selected.type}
        </span>
        <span aria-hidden className="mx-1 h-4 w-px bg-white/20" />
        {variants.length > 1 && (
          <>
            <BarBtn title="Previous style" onClick={() => onVariant(-1)}>‹</BarBtn>
            <span className="max-w-24 truncate px-0.5 text-[11px] text-white/75">{currentLabel}</span>
            <BarBtn title="Next style" onClick={() => onVariant(1)}>›</BarBtn>
            <span aria-hidden className="mx-1 h-4 w-px bg-white/20" />
          </>
        )}
        <BarBtn title="Smaller text" onClick={() => onText(-1)}>A−</BarBtn>
        <span className="mono-meta w-10 text-center text-[11px] text-white/80">{Math.round(effScale * 100)}%</span>
        <BarBtn title="Larger text" onClick={() => onText(1)}>A+</BarBtn>
        <span aria-hidden className="mx-1 h-4 w-px bg-white/20" />
        <BarBtn title="Cycle section padding (compact → comfortable → spacious)" onClick={onSpacing}>
          <span className="mono-meta text-[11px] font-semibold normal-case">⇕ {effSpacing}</span>
        </BarBtn>
        <span aria-hidden className="mx-1 h-4 w-px bg-white/20" />
        <BarBtn title={selected.enabled ? "Hide section" : "Show section"} onClick={onToggle}>
          <span className="mono-meta text-[11px] font-semibold">{selected.enabled ? "HIDE" : "SHOW"}</span>
        </BarBtn>
        {deletable && (
          <BarBtn title="Delete section" onClick={onDelete}>
            <span className="text-[13px] font-bold text-red-300">✕</span>
          </BarBtn>
        )}
      </div>
    </div>
  );
}

// ─── LEFT: content ───
function ContentPanel({ config, selected, onSelect, onPatch, pageLabel, demo, onAddSection }: {
  config: WebsiteConfig; selected: SectionInstance | null; onSelect: (id: string) => void;
  onPatch: (id: string, fn: (s: SectionInstance) => SectionInstance) => void; pageLabel: string; demo?: boolean;
  onAddSection: () => void;
}) {
  return (
    <div className="space-y-2">
      <p className="mono-meta px-1 text-[10.5px] font-semibold uppercase" style={{ letterSpacing: "0.12em", color: "var(--ink-3)" }}>Editing · {pageLabel}</p>
      {config.sections.map((s) => (
        <button key={s.id} onClick={() => onSelect(s.id)} className={`flex w-full items-center gap-2 rounded-lg border px-2.5 py-2 text-left text-[13px] ${selected?.id === s.id ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 bg-white"}`}>
          <span className="text-neutral-400">☰</span>
          <span className="font-medium">{SECTION_META[s.type]?.label}</span>
          {s.themeOverride && <span className="h-1.5 w-1.5 flex-none rounded-full bg-white/70" title="Custom colors" />}
          {!s.enabled && <span className="ml-auto text-[10px] opacity-60">hidden</span>}
        </button>
      ))}
      <button onClick={onAddSection} className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-neutral-300 px-2.5 py-2 text-[13px] font-medium text-neutral-500 transition-colors hover:border-neutral-900 hover:text-neutral-900">
        + Add section
      </button>
      {selected && (
        <div className="mt-3 border-t border-neutral-100 pt-3">
          <p className="mono-meta mb-2 px-1 text-[10.5px] font-semibold uppercase" style={{ letterSpacing: "0.12em", color: "var(--ink-3)" }}>Editing — {SECTION_META[selected.type]?.label}</p>
          <SectionFields demo={demo} section={selected} onChange={(patch) => onPatch(selected.id, (s) => setC(s, patch))} onReplace={(c) => onPatch(selected.id, (s) => ({ ...s, content: c }))} />
        </div>
      )}
    </div>
  );
}

// ─── Generic per-section fields ───
export function SectionFields({ section, onChange, onReplace, demo }: {
  section: SectionInstance; onChange: (patch: Record<string, unknown>) => void; onReplace: (c: Record<string, unknown>) => void; demo?: boolean;
}) {
  const c = section.content as Record<string, unknown>;
  const str = (k: string) => (typeof c[k] === "string" ? (c[k] as string) : "");

  const listEditor = <T extends Record<string, unknown>>(
    key: string, title: string, addLabel: string, blank: T, render: (item: T, set: (p: Partial<T>) => void) => React.ReactNode,
  ) => {
    const items = (Array.isArray(c[key]) ? c[key] as T[] : []);
    const setItems = (next: T[]) => onChange({ [key]: next });
    return (
      <ListShell title={title} addLabel={addLabel} count={items.length} onAdd={() => setItems([...items, JSON.parse(JSON.stringify(blank))])}>
        {items.map((it, i) => (
          <ItemCard key={i} index={i} title={summaryOf(it as Record<string, unknown>)} defaultOpen={i === 0} onDelete={() => setItems(items.filter((_, j) => j !== i))} onMove={(d) => setItems(move(items, i, d))}>
            {render(it, (p) => setItems(items.map((x, j) => (j === i ? { ...x, ...p } : x))))}
          </ItemCard>
        ))}
        {items.length === 0 && <p className="px-1 py-2 text-xs text-neutral-400">Nothing here yet — add the first one above.</p>}
      </ListShell>
    );
  };

  return (
    <div className="space-y-3">
      {(section.type === "navbar") && (
        <>
          <FieldGroup title="Brand">
            <TextField label="Logo text" value={str("logo")} onChange={(v) => onChange({ logo: v })} placeholder="Your name or studio" />
          </FieldGroup>
          <FieldGroup title="Button" hint="Leave the text empty to hide the navbar button.">
            <TextField label="Button text" value={str("cta")} onChange={(v) => onChange({ cta: v })} placeholder="Hire me" />
            <TextField label="Button link" value={str("ctaHref")} onChange={(v) => onChange({ ctaHref: v })} placeholder="#contact" hint="A #section on this page, another page, or a full URL." />
          </FieldGroup>
          <FieldGroup title="Links">
            {listEditor("links", "Nav links", "Link", { label: "New", href: "#about" },
              (it, set) => (<div className="grid grid-cols-2 gap-2"><TextField label="Label" value={String(it["label"] ?? "")} onChange={(v) => set({ label: v } as never)} /><TextField label="Link" value={String(it["href"] ?? "")} onChange={(v) => set({ href: v } as never)} /></div>))}
          </FieldGroup>
        </>
      )}
      {(section.type === "banner") && (
        <FieldGroup title="Announcement">
          <TextField label="Message" value={str("message")} onChange={(v) => onChange({ message: v })} placeholder="Now booking new projects" />
          <div className="grid grid-cols-2 gap-2">
            <TextField label="Link label" value={str("linkLabel")} onChange={(v) => onChange({ linkLabel: v })} placeholder="Get in touch" hint="Optional." />
            <TextField label="Link URL" value={str("linkHref")} onChange={(v) => onChange({ linkHref: v })} placeholder="#contact" hint="Optional." />
          </div>
        </FieldGroup>
      )}
      {(section.type === "hero") && (
        <>
          <FieldGroup title="Headline">
            <TextField label="Kicker" value={str("eyebrow")} onChange={(v) => onChange({ eyebrow: v })} placeholder="Available for work" hint="Small label above the title." />
            <TextField label="Title" value={str("title")} onChange={(v) => onChange({ title: v })} />
            <TextField label="Subtitle" value={str("subtitle")} onChange={(v) => onChange({ subtitle: v })} placeholder="Product Designer & Developer" />
            <AreaField label="Description" value={str("description")} onChange={(v) => onChange({ description: v })} />
          </FieldGroup>
          <FieldGroup title="Buttons" hint="Leave a label empty to hide that button.">
            <div className="grid grid-cols-2 gap-2">
              <TextField label="Primary label" value={str("primaryCta")} onChange={(v) => onChange({ primaryCta: v })} />
              <TextField label="Secondary label" value={str("secondaryCta")} onChange={(v) => onChange({ secondaryCta: v })} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <TextField label="Primary link" value={str("primaryHref")} onChange={(v) => onChange({ primaryHref: v })} placeholder="#work" />
              <TextField label="Secondary link" value={str("secondaryHref")} onChange={(v) => onChange({ secondaryHref: v })} placeholder="#contact" />
            </div>
          </FieldGroup>
          <FieldGroup title="Media & proof">
            <ImageField demo={demo} label="Hero image" value={str("image")} onChange={(v) => onChange({ image: v })} hint="Portrait, product shot or venue photo." />
            {listEditor("stats", "Stats", "Stat", { value: "", label: "" },
              (it, set) => (<div className="grid grid-cols-2 gap-2"><TextField label="Value" value={String(it["value"] ?? "")} onChange={(v) => set({ value: v } as never)} placeholder="8+" /><TextField label="Label" value={String(it["label"] ?? "")} onChange={(v) => set({ label: v } as never)} placeholder="Years experience" /></div>))}
          </FieldGroup>
        </>
      )}
      {(section.type === "about") && (
        <FieldGroup title="Story">
          <TextField label="Kicker" value={str("heading")} onChange={(v) => onChange({ heading: v })} hint="Small label above the title." />
          <TextField label="Title" value={str("title")} onChange={(v) => onChange({ title: v })} />
          <AreaField label="Body" value={str("body")} rows={4} onChange={(v) => onChange({ body: v })} />
          <ImageField demo={demo} label="Image" value={str("image")} onChange={(v) => onChange({ image: v })} hint="Portrait, studio or venue shot." />
          <AreaField label="Checklist" value={(Array.isArray(c["bullets"]) ? (c["bullets"] as string[]).join("\n") : "")} rows={3} onChange={(v) => onChange({ bullets: v.split("\n").map((s) => s.trim()).filter(Boolean) })} hint="One point per line." />
        </FieldGroup>
      )}
      {section.type === "skills" && (
        <FieldGroup title="Skills">
          <TextField label="Kicker" value={str("heading")} onChange={(v) => onChange({ heading: v })} />
          <TextField label="Title" value={str("title")} onChange={(v) => onChange({ title: v })} />
          {listEditor("skills", "Skills", "Skill", { name: "New skill", level: 80 },
            (it, set) => (<><TextField label="Name" value={String(it["name"] ?? "")} onChange={(v) => set({ name: v } as Partial<typeof it>)} /><TextField label="Level (0–100)" value={String(it["level"] ?? "")} onChange={(v) => { const n = Math.max(0, Math.min(100, Number(v) || 0)); set({ level: n } as Partial<typeof it>); }} /></>))}
        </FieldGroup>
      )}
      {section.type === "services" && (
        <FieldGroup title="Services">
          <TextField label="Kicker" value={str("heading")} onChange={(v) => onChange({ heading: v })} />
          <TextField label="Title" value={str("title")} onChange={(v) => onChange({ title: v })} />
          <AreaField label="Description" value={str("description")} onChange={(v) => onChange({ description: v })} />
          {listEditor("items", "Services", "Service", { title: "New service", description: "", icon: "sparkles", price: "" },
            (it, set) => (<><TextField label="Name" value={String(it["title"] ?? "")} onChange={(v) => set({ title: v } as never)} /><AreaField label="Description" value={String(it["description"] ?? "")} onChange={(v) => set({ description: v } as never)} /><TextField label="Price" value={String(it["price"] ?? "")} onChange={(v) => set({ price: v } as never)} placeholder="from Rs. 95,000" hint="Optional — leave empty to hide." /></>))}
        </FieldGroup>
      )}
      {section.type === "projects" && (
        <FieldGroup title="Work">
          <TextField label="Kicker" value={str("heading")} onChange={(v) => onChange({ heading: v })} />
          <TextField label="Title" value={str("title")} onChange={(v) => onChange({ title: v })} />
          <AreaField label="Description" value={str("description")} onChange={(v) => onChange({ description: v })} />
          {listEditor("items", "Projects", "Project", { title: "New project", description: "", image: "", tags: [], url: "#", github: "#" },
            (it, set) => (<>
              <TextField label="Name" value={String(it["title"] ?? "")} onChange={(v) => set({ title: v } as never)} />
              <AreaField label="Description" value={String(it["description"] ?? "")} onChange={(v) => set({ description: v } as never)} />
              <ImageField demo={demo} label="Image" value={String(it["image"] ?? "")} onChange={(v) => set({ image: v } as never)} />
              <TextField label="Tags" value={(Array.isArray(it["tags"]) ? (it["tags"] as string[]).join(", ") : "")} onChange={(v) => set({ tags: v.split(",").map((s) => s.trim()).filter(Boolean) } as never)} placeholder="Next.js, Design system" hint="Comma separated." />
              <div className="grid grid-cols-2 gap-2">
                <TextField label="Project URL" value={String(it["url"] ?? "")} onChange={(v) => set({ url: v } as never)} />
                <TextField label="GitHub URL" value={String(it["github"] ?? "")} onChange={(v) => set({ github: v } as never)} hint="List variants only." />
              </div>
            </>))}
        </FieldGroup>
      )}
      {section.type === "experience" && (
        <FieldGroup title="Career">
          <TextField label="Kicker" value={str("heading")} onChange={(v) => onChange({ heading: v })} />
          <TextField label="Title" value={str("title")} onChange={(v) => onChange({ title: v })} />
          {listEditor("items", "Roles", "Role", { company: "", role: "", start: "", end: "", description: "" },
            (it, set) => (<><div className="grid grid-cols-2 gap-2"><TextField label="Company" value={String(it["company"] ?? "")} onChange={(v) => set({ company: v } as never)} /><TextField label="Position" value={String(it["role"] ?? "")} onChange={(v) => set({ role: v } as never)} /></div><div className="grid grid-cols-2 gap-2"><TextField label="Start" value={String(it["start"] ?? "")} onChange={(v) => set({ start: v } as never)} placeholder="2021" /><TextField label="End" value={String(it["end"] ?? "")} onChange={(v) => set({ end: v } as never)} placeholder="Present" /></div><AreaField label="Description" value={String(it["description"] ?? "")} onChange={(v) => set({ description: v } as never)} /></>))}
        </FieldGroup>
      )}
      {section.type === "education" && (
        <FieldGroup title="Education">
          <TextField label="Kicker" value={str("heading")} onChange={(v) => onChange({ heading: v })} />
          <TextField label="Title" value={str("title")} onChange={(v) => onChange({ title: v })} />
          {listEditor("items", "Education", "Entry", { school: "", degree: "", start: "", end: "", description: "" },
            (it, set) => (<><TextField label="Institution" value={String(it["school"] ?? "")} onChange={(v) => set({ school: v } as never)} /><TextField label="Degree" value={String(it["degree"] ?? "")} onChange={(v) => set({ degree: v } as never)} /><div className="grid grid-cols-2 gap-2"><TextField label="Start year" value={String(it["start"] ?? "")} onChange={(v) => set({ start: v } as never)} /><TextField label="End year" value={String(it["end"] ?? "")} onChange={(v) => set({ end: v } as never)} /></div><AreaField label="Details" value={String(it["description"] ?? "")} onChange={(v) => set({ description: v } as never)} /></>))}
        </FieldGroup>
      )}
      {section.type === "testimonials" && (
        <FieldGroup title="Praise" hint="The Quote style spotlights the first entry.">
          <TextField label="Kicker" value={str("heading")} onChange={(v) => onChange({ heading: v })} />
          <TextField label="Title" value={str("title")} onChange={(v) => onChange({ title: v })} />
          {listEditor("items", "Testimonials", "Quote", { name: "", role: "", company: "", message: "", photo: "" },
            (it, set) => (<><AreaField label="Message" value={String(it["message"] ?? "")} onChange={(v) => set({ message: v } as never)} /><div className="grid grid-cols-2 gap-2"><TextField label="Name" value={String(it["name"] ?? "")} onChange={(v) => set({ name: v } as never)} /><TextField label="Company" value={String(it["company"] ?? "")} onChange={(v) => set({ company: v } as never)} /></div><TextField label="Role" value={String(it["role"] ?? "")} onChange={(v) => set({ role: v } as never)} placeholder="Founder" /><ImageField demo={demo} label="Photo" value={String(it["photo"] ?? "")} onChange={(v) => set({ photo: v } as never)} hint="Optional — initials show without one." /></>))}
        </FieldGroup>
      )}
      {section.type === "pricing" && (
        <FieldGroup title="Plans" hint="Tick Highlighted on exactly one plan to feature it.">
          <TextField label="Kicker" value={str("heading")} onChange={(v) => onChange({ heading: v })} />
          <TextField label="Title" value={str("title")} onChange={(v) => onChange({ title: v })} />
          {listEditor("items", "Plans", "Plan", { name: "New plan", price: "$0", period: "one-time", description: "", features: [], featured: false },
            (it, set) => (<><div className="grid grid-cols-2 gap-2"><TextField label="Name" value={String(it["name"] ?? "")} onChange={(v) => set({ name: v } as never)} /><TextField label="Price" value={String(it["price"] ?? "")} onChange={(v) => set({ price: v } as never)} placeholder="Rs. 75,000" /></div><div className="grid grid-cols-2 gap-2"><TextField label="Billing period" value={String(it["period"] ?? "")} onChange={(v) => set({ period: v } as never)} placeholder="per month" /><label className="flex items-center gap-2 text-xs font-medium text-neutral-600"><input type="checkbox" checked={Boolean(it["featured"])} onChange={(e) => set({ featured: e.target.checked } as never)} className="h-4 w-4 accent-neutral-900" /> Highlighted</label></div><TextField label="Blurb" value={String(it["description"] ?? "")} onChange={(v) => set({ description: v } as never)} /><TextField label="Features" value={(Array.isArray(it["features"]) ? (it["features"] as string[]).join(", ") : "")} onChange={(v) => set({ features: v.split(",").map((s) => s.trim()).filter(Boolean) } as never)} hint="Comma separated." /></>))}
        </FieldGroup>
      )}
      {section.type === "gallery" && (
        <FieldGroup title="Photos" hint="Reorder with ↑ ↓ — first photo is featured in Feature layouts.">
          <TextField label="Kicker" value={str("heading")} onChange={(v) => onChange({ heading: v })} />
          <TextField label="Title" value={str("title")} onChange={(v) => onChange({ title: v })} />
          {(Array.isArray(c["images"]) ? c["images"] as string[] : []).map((img, i) => (
            <div key={`${section.id}-img-${i}`} className="rounded-lg border border-neutral-200 bg-neutral-50/50 p-2">
              <ImageField demo={demo} label={`Photo ${i + 1}`} value={img} onChange={(v) => { const next = [...(c["images"] as string[])]; next[i] = v; onChange({ images: next }); }} />
              <div className="mt-1.5 flex gap-1.5">
                <button onClick={() => { const next = [...(c["images"] as string[])]; next.splice(i, 1); onChange({ images: next }); }} className="flex-1 rounded-md border border-neutral-200 bg-white px-2 py-1 text-[11px] text-red-600">Remove this photo</button>
                <button onClick={() => { const next = [...(c["images"] as string[])]; if (i > 0) { [next[i - 1], next[i]] = [next[i], next[i - 1]]; onChange({ images: next }); } }} disabled={i === 0} className="rounded-md border border-neutral-200 bg-white px-2 py-1 text-[11px] disabled:opacity-40">↑</button>
                <button onClick={() => { const next = [...(c["images"] as string[])]; if (i < next.length - 1) { [next[i + 1], next[i]] = [next[i], next[i + 1]]; onChange({ images: next }); } }} disabled={i === (Array.isArray(c["images"]) ? (c["images"] as string[]).length - 1 : 0)} className="rounded-md border border-neutral-200 bg-white px-2 py-1 text-[11px] disabled:opacity-40">↓</button>
              </div>
            </div>
          ))}
          <div className="flex gap-2">
            <button onClick={() => onChange({ images: [...(Array.isArray(c["images"]) ? c["images"] as string[] : []), ""] })} className="flex-1 rounded-lg border border-dashed border-neutral-300 py-1.5 text-xs font-medium text-neutral-500 transition-colors hover:border-neutral-900 hover:text-neutral-900">+ Add photo</button>
          </div>
        </FieldGroup>
      )}
      {section.type === "team" && (
        <FieldGroup title="People">
          <TextField label="Kicker" value={str("heading")} onChange={(v) => onChange({ heading: v })} />
          <TextField label="Title" value={str("title")} onChange={(v) => onChange({ title: v })} />
          {listEditor("members", "Members", "Member", { name: "", role: "", photo: "", bio: "" },
            (it, set) => (<><TextField label="Name" value={String(it["name"] ?? "")} onChange={(v) => set({ name: v } as never)} /><TextField label="Role" value={String(it["role"] ?? "")} onChange={(v) => set({ role: v } as never)} placeholder="Founder & CEO" /><ImageField demo={demo} label="Photo" value={String(it["photo"] ?? "")} onChange={(v) => set({ photo: v } as never)} hint="Square photos look best." /><AreaField label="Bio" value={String(it["bio"] ?? "")} onChange={(v) => set({ bio: v } as never)} rows={2} /></>))}
        </FieldGroup>
      )}
      {section.type === "process" && (
        <FieldGroup title="Steps" hint="Shown in order — drag with ↑ ↓ to reorder.">
          <TextField label="Kicker" value={str("heading")} onChange={(v) => onChange({ heading: v })} />
          <TextField label="Title" value={str("title")} onChange={(v) => onChange({ title: v })} />
          {listEditor("steps", "Steps", "Step", { title: "", description: "", icon: "" },
            (it, set) => (<><TextField label="Title" value={String(it["title"] ?? "")} onChange={(v) => set({ title: v } as never)} placeholder="Book in 60 seconds" /><AreaField label="Description" value={String(it["description"] ?? "")} onChange={(v) => set({ description: v } as never)} rows={2} /></>))}
        </FieldGroup>
      )}
      {section.type === "faq" && (
        <FieldGroup title="Questions">
          <TextField label="Kicker" value={str("heading")} onChange={(v) => onChange({ heading: v })} />
          <TextField label="Title" value={str("title")} onChange={(v) => onChange({ title: v })} />
          {listEditor("items", "Questions", "Question", { q: "", a: "" },
            (it, set) => (<><TextField label="Question" value={String(it["q"] ?? "")} onChange={(v) => set({ q: v } as never)} /><AreaField label="Answer" value={String(it["a"] ?? "")} onChange={(v) => set({ a: v } as never)} rows={2} /></>))}
        </FieldGroup>
      )}
      {(section.type === "cta") && (
        <FieldGroup title="Call to action">
          <TextField label="Title" value={str("title")} onChange={(v) => onChange({ title: v })} />
          <AreaField label="Description" value={str("description")} onChange={(v) => onChange({ description: v })} rows={2} />
          <div className="grid grid-cols-2 gap-2">
            <TextField label="Primary label" value={str("primaryCta")} onChange={(v) => onChange({ primaryCta: v })} />
            <TextField label="Secondary label" value={str("secondaryCta")} onChange={(v) => onChange({ secondaryCta: v })} hint="Empty hides it." />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <TextField label="Primary link" value={str("primaryHref")} onChange={(v) => onChange({ primaryHref: v })} placeholder="#contact" />
            <TextField label="Secondary link" value={str("secondaryHref")} onChange={(v) => onChange({ secondaryHref: v })} placeholder="#contact" />
          </div>
        </FieldGroup>
      )}
      {(section.type === "video") && (
        <FieldGroup title="Video">
          <TextField label="Kicker" value={str("heading")} onChange={(v) => onChange({ heading: v })} />
          <TextField label="Title" value={str("title")} onChange={(v) => onChange({ title: v })} />
          <AreaField label="Description" value={str("description")} onChange={(v) => onChange({ description: v })} rows={2} />
          <TextField label="Video URL" value={str("url")} onChange={(v) => onChange({ url: v })} placeholder="https://youtube.com/watch?v=…" hint="YouTube, Vimeo or MP4 link." />
          <TextField label="Caption" value={str("caption")} onChange={(v) => onChange({ caption: v })} hint="Optional line under the video." />
        </FieldGroup>
      )}
      {(section.type === "stats") && (
        <FieldGroup title="Numbers">
          <TextField label="Kicker" value={str("heading")} onChange={(v) => onChange({ heading: v })} />
          <TextField label="Title" value={str("title")} onChange={(v) => onChange({ title: v })} />
          <AreaField label="Description" value={str("description")} onChange={(v) => onChange({ description: v })} rows={2} />
          {listEditor("items", "Stats", "Stat", { value: "", label: "" },
            (it, set) => (<div className="grid grid-cols-2 gap-2"><TextField label="Value" value={String(it["value"] ?? "")} onChange={(v) => set({ value: v } as never)} placeholder="120+" /><TextField label="Label" value={String(it["label"] ?? "")} onChange={(v) => set({ label: v } as never)} placeholder="Projects shipped" /></div>))}
        </FieldGroup>
      )}
      {(section.type === "logos") && (
        <FieldGroup title="Logo strip">
          <TextField label="Heading" value={str("heading")} onChange={(v) => onChange({ heading: v })} placeholder="Trusted by" />
          <TextField label="Names" value={(Array.isArray(c["items"]) ? (c["items"] as string[]).join(", ") : "")} onChange={(v) => onChange({ items: v.split(",").map((x) => x.trim()).filter(Boolean) })} hint="Comma separated — keep them short." />
        </FieldGroup>
      )}
      {(section.type === "contact") && (
        <FieldGroup title="Contact details" hint="This is what visitors see next to your form.">
          <TextField label="Kicker" value={str("heading")} onChange={(v) => onChange({ heading: v })} />
          <TextField label="Title" value={str("title")} onChange={(v) => onChange({ title: v })} />
          <AreaField label="Intro" value={str("body")} onChange={(v) => onChange({ body: v })} rows={2} />
          <TextField label="Email" value={str("email")} onChange={(v) => onChange({ email: v })} placeholder="namaste@example.com" />
          <TextField label="Phone" value={str("phone")} onChange={(v) => onChange({ phone: v })} placeholder="+977-98…" />
          <TextField label="Location" value={str("location")} onChange={(v) => onChange({ location: v })} placeholder="Kathmandu, Nepal" />
        </FieldGroup>
      )}
      {(section.type === "footer") && (
        <FieldGroup title="Footer">
          <TextField label="Tagline" value={str("tagline")} onChange={(v) => onChange({ tagline: v })} />
          <TextField label="Copyright" value={str("copyright")} onChange={(v) => onChange({ copyright: v })} placeholder="© 2026 All rights reserved." />
        </FieldGroup>
      )}
      {(section.type === "menu") && (
        <FieldGroup title="Menu" hint="Groups first, then dishes inside each group.">
          <TextField label="Kicker" value={str("heading")} onChange={(v) => onChange({ heading: v })} />
          <TextField label="Title" value={str("title")} onChange={(v) => onChange({ title: v })} />
          {listEditor("groups", "Menu groups", "Group", { name: "New group", items: [] },
            (g, setG) => {
              const items = (Array.isArray(g["items"]) ? g["items"] as { name: string; description: string; price: string }[] : []);
              const setItems = (next: { name: string; description: string; price: string }[]) => setG({ items: next } as never);
              return (<>
                <TextField label="Group name" value={String(g["name"] ?? "")} onChange={(v) => setG({ name: v } as never)} placeholder="Mains" />
                <div className="space-y-2 rounded-lg bg-neutral-50 p-2">
                  {items.map((it, j) => (
                    <div key={j} className="space-y-1.5 rounded-md border border-neutral-200 bg-white p-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-neutral-500">Dish #{j + 1} — {it.name || "Untitled"}</span>
                        <span className="flex gap-1">
                          <button onClick={() => setItems(items.filter((_, k) => k !== j))} className="rounded border border-neutral-200 px-1.5 py-0.5 text-[11px] text-red-600">✕</button>
                        </span>
                      </div>
                      <TextField label="Dish" value={String(it.name ?? "")} onChange={(v) => setItems(items.map((x, k) => (k === j ? { ...x, name: v } : x)))} />
                      <AreaField label="Description" value={String(it.description ?? "")} onChange={(v) => setItems(items.map((x, k) => (k === j ? { ...x, description: v } : x)))} rows={2} />
                      <TextField label="Price" value={String(it.price ?? "")} onChange={(v) => setItems(items.map((x, k) => (k === j ? { ...x, price: v } : x)))} placeholder="Rs. 850" />
                    </div>
                  ))}
                  <button onClick={() => setItems([...items, { name: "New dish", description: "", price: "" }])} className="w-full rounded-md px-2 py-1 text-[11px] font-semibold text-white" style={{ background: "var(--ink)" }}>+ Add dish</button>
                </div>
              </>);
            })}
        </FieldGroup>
      )}
      {(section.type === "hours") && (
        <FieldGroup title="Visit info">
          <TextField label="Kicker" value={str("heading")} onChange={(v) => onChange({ heading: v })} />
          <TextField label="Title" value={str("title")} onChange={(v) => onChange({ title: v })} />
          <TextField label="Address" value={str("address")} onChange={(v) => onChange({ address: v })} placeholder="Street, Kathmandu" />
          <TextField label="Phone" value={str("phone")} onChange={(v) => onChange({ phone: v })} />
          {listEditor("rows", "Opening hours", "Row", { day: "", time: "" },
            (it, set) => (<div className="grid grid-cols-2 gap-2"><TextField label="Days" value={String(it["day"] ?? "")} onChange={(v) => set({ day: v } as never)} placeholder="Sun – Fri" /><TextField label="Hours" value={String(it["time"] ?? "")} onChange={(v) => set({ time: v } as never)} placeholder="7am – 9pm" /></div>))}
        </FieldGroup>
      )}
      {/* allow raw variant note */}
      <details className="rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-xs text-neutral-400">
        <summary className="cursor-pointer font-medium text-neutral-500">Advanced — raw content</summary>
        <pre className="mt-2 max-h-40 overflow-auto rounded-lg bg-neutral-900 p-2 font-mono text-[10px] leading-relaxed text-neutral-200">{JSON.stringify(c, null, 1).slice(0, 1500)}</pre>
        <button className="mt-1.5 underline" onClick={() => { const raw = prompt("Paste section content JSON"); if (raw) { try { onReplace(JSON.parse(raw)); } catch { alert("Invalid JSON"); } } }}>Replace JSON</button>
      </details>
    </div>
  );
}

// ─── Sections panel ───
function SectionsPanel({ config, selectedId, onSelect, onToggle, onMove, onRemove, onDuplicate, onAdd, onReorder, pageLabel }: {
  config: WebsiteConfig; selectedId: string | null; onSelect: (id: string) => void;
  onToggle: (id: string) => void; onMove: (id: string, d: -1 | 1) => void; onRemove: (id: string) => void; onDuplicate: (id: string) => void; onAdd: (t: SectionType) => void; onReorder: (fromId: string, toId: string) => void; pageLabel: string;
}) {
  const [dragId, setDragId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  return (
    <div className="space-y-2">
      <p className="mono-meta px-1 text-[10.5px] font-semibold uppercase" style={{ letterSpacing: "0.12em", color: "var(--ink-3)" }}>Sections · {pageLabel}</p>
      {config.sections.map((s) => (
        <div key={s.id} draggable
          onDragStart={(e) => { setDragId(s.id); e.dataTransfer.effectAllowed = "move"; }}
          onDragOver={(e) => { e.preventDefault(); if (overId !== s.id) setOverId(s.id); }}
          onDragLeave={() => { if (overId === s.id) setOverId(null); }}
          onDrop={(e) => { e.preventDefault(); if (dragId && dragId !== s.id) onReorder(dragId, s.id); setDragId(null); setOverId(null); }}
          onDragEnd={() => { setDragId(null); setOverId(null); }}
          onClick={() => onSelect(s.id)}
          className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-[13px] ${selectedId === s.id ? "border-neutral-900" : "border-neutral-200"} ${s.enabled ? "bg-white" : "bg-neutral-50 opacity-60"} ${overId === s.id && dragId ? "ring-2 ring-neutral-400" : ""}`}>
          <span className="cursor-grab text-neutral-400">☰</span>
          <span className="font-medium">{SECTION_META[s.type]?.label}</span>
          {s.themeOverride && <span className="h-1.5 w-1.5 flex-none rounded-full" style={{ background: "var(--accent)" }} title="Custom colors" />}
          <span className="text-[11px] text-neutral-400">{s.variant}</span>
          <span className="ml-auto flex gap-1" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => onMove(s.id, -1)} title="Move up" className="rounded border border-neutral-200 px-1 text-[11px]">↑</button>
            <button onClick={() => onMove(s.id, 1)} title="Move down" className="rounded border border-neutral-200 px-1 text-[11px]">↓</button>
            <button onClick={() => onToggle(s.id)} title={s.enabled ? "Hide section" : "Show section"} className="rounded border border-neutral-200 px-1.5 text-[11px]">{s.enabled ? "Hide" : "Show"}</button>
            <button onClick={() => onDuplicate(s.id)} title="Duplicate section" className="rounded border border-neutral-200 px-1 text-[11px]">⧉</button>
            {SECTION_META[s.type]?.deletable && <button onClick={() => onRemove(s.id)} title="Delete section" className="rounded border border-neutral-200 px-1 text-[11px] text-red-600">✕</button>}
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
      {dragId && <p className="text-[11px] text-neutral-400">Drop on a section to move it there — or use ↑ ↓.</p>}
    </div>
  );
}

// ─── Pages ───
function PagesPanel({ config, activePageId, onSwitch, onAdd, onRename, onRemove, siteSlug }: {
  config: WebsiteConfig; activePageId: string | null;
  onSwitch: (id: string | null) => void; onAdd: (title: string) => void;
  onRename: (id: string, title: string, path: string) => void; onRemove: (id: string) => void;
  siteSlug: string;
}) {
  const [draft, setDraft] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [eTitle, setETitle] = useState("");
  const [ePath, setEPath] = useState("");
  const pages = config.pages ?? [];
  function startEdit(p: PageConfig) {
    setEditing(p.id);
    setETitle(p.title);
    setEPath(p.path);
  }
  return (
    <div className="space-y-2">
      <p className="mono-meta px-1 text-[10.5px] font-semibold uppercase" style={{ letterSpacing: "0.12em", color: "var(--ink-3)" }}>Whole site · {pages.length + 1} pages</p>
      <button
        onClick={() => onSwitch(null)}
        className={`flex w-full items-center gap-2 rounded-lg border px-2.5 py-2 text-left text-[13px] ${activePageId === null ? "font-semibold text-white" : "bg-white"}`}
        style={activePageId === null ? { background: "var(--ink)", borderColor: "var(--ink)" } : { borderColor: "var(--line)" }}
      >
        <span className="font-mono text-[11px] opacity-60">/</span>
        <span>Home</span>
        <span className="mono-meta ml-auto text-[10px] opacity-60">/s/{siteSlug}</span>
      </button>
      {pages.map((p) => (
        <div key={p.id} className="rounded-lg border bg-white" style={{ borderColor: activePageId === p.id ? "var(--ink)" : "var(--line)" }}>
          <button onClick={() => onSwitch(p.id)} className="flex w-full items-center gap-2 px-2.5 py-2 text-left text-[13px]">
            <span className="font-mono text-[11px] opacity-60">/{p.path}</span>
            <span className="font-medium">{p.title}</span>
            <span className="mono-meta ml-auto text-[10px] opacity-60">{p.sections.length} sections</span>
          </button>
          {editing === p.id ? (
            <div className="space-y-2 border-t px-2.5 py-2.5" style={{ borderColor: "var(--line)" }}>
              <input value={eTitle} onChange={(e) => setETitle(e.target.value)} placeholder="Page title" className="w-full rounded-md border px-2 py-1.5 text-[13px]" />
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[11px] opacity-60">/s/{siteSlug}/</span>
                <input value={ePath} onChange={(e) => setEPath(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))} className="w-full rounded-md border px-2 py-1.5 font-mono text-[13px]" />
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => { onRename(p.id, eTitle, ePath); setEditing(null); }} className="flex-1 rounded-md px-2 py-1.5 text-xs font-semibold text-white" style={{ background: "var(--ink)" }}>Save</button>
                <button onClick={() => setEditing(null)} className="rounded-md border px-3 py-1.5 text-xs" style={{ borderColor: "var(--line-2)" }}>Cancel</button>
                <button onClick={() => { onRemove(p.id); setEditing(null); }} className="rounded-md border border-red-200 px-3 py-1.5 text-xs text-red-600">Delete</button>
              </div>
            </div>
          ) : (
            <div className="flex gap-1.5 px-2.5 pb-2">
              <button onClick={() => startEdit(p)} className="text-[11px] underline opacity-60">Rename / path</button>
              <Link href={`/s/${siteSlug}/${p.path}`} target="_blank" className="text-[11px] underline opacity-60">Visit ↗</Link>
              {p.sections.length === 0 && <span className="ml-auto rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-800">Empty — will 404 until you add sections</span>}
            </div>
          )}
        </div>
      ))}
      <div className="flex gap-1.5 pt-1">
        <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="New page title…" className="w-full rounded-lg border px-2.5 py-2 text-[13px]" />
        <button onClick={() => { if (draft.trim()) { onAdd(draft); setDraft(""); } }} className="rounded-lg px-3 py-2 text-[13px] font-semibold text-white" style={{ background: "var(--ink)" }}>Add</button>
      </div>
      <p className="px-1 text-[11px] leading-relaxed opacity-60">New pages appear in the navbar automatically. Each page has its own sections.</p>
    </div>
  );
}

// ─── Design ───
function DesignPanel({ theme, onPatch, customCss, onCustomCss, onResetTheme }: { theme: ThemeConfig; onPatch: (p: Partial<ThemeConfig>) => void; customCss: string; onCustomCss: (v: string) => void; onResetTheme: () => void }) {
  const colors: { key: keyof ThemeConfig; label: string }[] = [
    { key: "primary", label: "Primary" }, { key: "secondary", label: "Secondary" },
    { key: "background", label: "Background" }, { key: "surface", label: "Surface" },
    { key: "text", label: "Text" }, { key: "muted", label: "Muted" }, { key: "accent", label: "Accent" },
  ];
  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Presets</p>
          <button onClick={onResetTheme} className="text-[11px] font-medium underline opacity-60 hover:opacity-100">Reset to template style</button>
        </div>
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
          <label className="col-span-2 text-xs">Letter spacing ({theme.letterSpacing.toFixed(3)}em)<input type="range" min={-0.02} max={0.12} step={0.005} value={theme.letterSpacing} onChange={(e) => onPatch({ letterSpacing: Number(e.target.value) })} className="w-full" /></label>
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
function SeoPanel({ config, onCommit, demo }: { config: WebsiteConfig; onCommit: (c: WebsiteConfig) => void; demo?: boolean }) {
  const seo = config.seo;
  const set = (p: Partial<typeof seo>) => onCommit({ ...config, seo: { ...seo, ...p } });
  return (
    <div className="space-y-3">
      <TextField label="SEO title" value={seo.title} onChange={(v) => set({ title: v })} />
      <AreaField label="SEO description" value={seo.description} onChange={(v) => set({ description: v })} />
      <ImageField demo={demo} label="Social preview image" value={seo.socialImage} onChange={(v) => set({ socialImage: v })} />
      <ImageField demo={demo} label="Favicon (small logo, square works best)" value={seo.favicon} onChange={(v) => set({ favicon: v })} />
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
  const [siteDesc, setSiteDesc] = useState(config.siteDescription || "");
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);
  const [syncedSlug, setSyncedSlug] = useState(site.slug);
  const [syncedDomain, setSyncedDomain] = useState(site.customDomain || "");
  const [syncedDesc, setSyncedDesc] = useState(config.siteDescription || "");
  // Re-sync when the site changes elsewhere (e.g. after a save returns a
  // normalized slug) so inputs never show stale values. State is adjusted
  // during render (not in an effect) per React docs.
  if (site.slug !== syncedSlug) { setSyncedSlug(site.slug); setSlug(site.slug); }
  if ((site.customDomain || "") !== syncedDomain) { setSyncedDomain(site.customDomain || ""); setDomain(site.customDomain || ""); }
  if ((config.siteDescription || "") !== syncedDesc) { setSyncedDesc(config.siteDescription || ""); setSiteDesc(config.siteDescription || ""); }

  async function saveMeta() {
    setMsg("Saving…");
    setSaving(true);
    try {
      const cleanDomain = domain.trim().toLowerCase();
      const res = await fetch(`/api/websites/${site.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug: slug.trim().toLowerCase(), customDomain: cleanDomain || undefined, name: config.siteName, config: { ...config, siteDescription: siteDesc } }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string }).error || "Failed.");
      const website = (data as { website: WebsiteRecord }).website;
      onSite(website);
      onCommit({ ...config, siteDescription: website.config.siteDescription ?? siteDesc });
      setSlug(website.slug);
      setDomain(website.customDomain || "");
      setMsg("Saved.");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Failed.");
    } finally {
      setSaving(false);
    }
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
        <label className="mb-1 block text-xs font-medium">Site description (search + fallback)</label>
        <textarea value={siteDesc} onChange={(e) => setSiteDesc(e.target.value)} rows={2} placeholder="What is this site about?" className="w-full rounded-lg border border-neutral-200 px-2.5 py-1.5 text-[13px]" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium">Google Analytics ID (optional)</label>
        <input value={config.analyticsId || ""} onChange={(e) => onCommit({ ...config, analyticsId: e.target.value.trim() })} placeholder="G-XXXXXXX" className="w-full rounded-lg border border-neutral-200 px-2.5 py-1.5 text-[13px]" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium">Custom domain (optional)</label>
        <input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="www.yourdomain.com" className="w-full rounded-lg border border-neutral-200 px-2.5 py-1.5 text-[13px]" />
        {domain && <div className="mt-2 rounded-lg bg-amber-50 p-2.5 text-[11px] text-amber-900">Status: waiting for DNS. Add: CNAME www → sites.create.io. Custom-domain serving is not enabled on this build — the site stays live at /s/{site.slug}.</div>}
      </div>
      <button onClick={saveMeta} disabled={saving} className="w-full rounded-lg bg-neutral-900 py-2 text-[13px] font-medium text-white disabled:opacity-60">{saving ? "Saving…" : "Save settings"}</button>
      {msg && <p className="text-xs text-neutral-500">{msg}</p>}
      <div className="rounded-lg bg-neutral-50 p-3 text-[11px] leading-relaxed text-neutral-500">
        Shortcuts: Ctrl/Cmd+Z undo · Ctrl/Cmd+Shift+Z redo · Ctrl/Cmd+S save.
      </div>
    </div>
  );
}

// ─── Right inspector ───
function SectionInspector({ section, templateId, demo, siteTheme, onPatch, onMoveUp, onMoveDown, onDuplicate }: {
  section: SectionInstance; templateId: string; demo?: boolean; siteTheme: ThemeConfig;
  onPatch: (fn: (s: SectionInstance) => SectionInstance) => void;
  onMoveUp: () => void; onMoveDown: () => void; onDuplicate: () => void;
}) {
  const meta = SECTION_META[section.type];
  const signature = isBespoke(templateId, section.type, section.variant);
  return (
    <div className="space-y-3">
      {signature && (
        <p className="rounded-lg px-2.5 py-2 text-[11px] leading-relaxed" style={{ background: "var(--accent-soft)", color: "var(--accent-text)" }}>
          <span className="font-bold">Signature design</span> — this section uses the template&apos;s predesigned library. Switch variant for system alternates.
        </p>
      )}
      {meta.variants.length > 1 && (
        <div>
          <p className="mb-1.5 text-xs font-medium text-neutral-600">Style <span className="font-normal text-neutral-400">— layout stays professional</span></p>
          <div className="flex flex-wrap gap-1.5">
            {meta.variants.map((v) => (
              <button key={v.id} onClick={() => onPatch((s) => ({ ...s, variant: v.id }))} className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${section.variant === v.id ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 hover:border-neutral-400"}`}>
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}
      <label className="flex items-center justify-between text-[13px]">
        <span>Visible on site</span>
        <button onClick={() => onPatch((s) => ({ ...s, enabled: !s.enabled }))} className={`relative h-6 w-11 rounded-full transition ${section.enabled ? "bg-neutral-900" : "bg-neutral-300"}`}>
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${section.enabled ? "left-[22px]" : "left-0.5"}`} />
        </button>
      </label>
      <label className="flex items-center justify-between text-[13px]">
        <span>Tinted background</span>
        <button onClick={() => onPatch((s) => ({ ...s, band: !s.band }))} aria-pressed={!!section.band} title="Wrap this section in a tinted band" className={`relative h-6 w-11 rounded-full transition ${section.band ? "bg-neutral-900" : "bg-neutral-300"}`}>
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${section.band ? "left-[22px]" : "left-0.5"}`} />
        </button>
      </label>
      <div className="flex gap-1.5">
        <button onClick={onMoveUp} className="flex-1 rounded-lg border border-neutral-200 px-2 py-1.5 text-xs font-medium transition-colors hover:border-neutral-900" title="Move section up">↑ Move up</button>
        <button onClick={onMoveDown} className="flex-1 rounded-lg border border-neutral-200 px-2 py-1.5 text-xs font-medium transition-colors hover:border-neutral-900" title="Move section down">↓ Move down</button>
        <button onClick={onDuplicate} className="flex-1 rounded-lg border border-neutral-200 px-2 py-1.5 text-xs font-medium transition-colors hover:border-neutral-900" title="Duplicate this section">⧉ Duplicate</button>
      </div>
      <SectionColors section={section} siteTheme={siteTheme} onPatch={onPatch} />
      <div className="border-t border-neutral-100 pt-3">
        <SectionFields demo={demo} section={section} onChange={(patch) => onPatch((s) => setC(s, patch))} onReplace={(c) => onPatch((s) => ({ ...s, content: c }))} />
      </div>
    </div>
  );
}

// ─── Per-section colors: recolor one component without touching the site ───
const OVERRIDE_ROWS: { key: "background" | "surface" | "text" | "muted" | "primary" | "accent"; label: string; hint: string }[] = [
  { key: "background", label: "Background", hint: "Section canvas" },
  { key: "surface", label: "Surface", hint: "Cards & bands" },
  { key: "text", label: "Text", hint: "Headings" },
  { key: "muted", label: "Muted", hint: "Secondary text" },
  { key: "primary", label: "Primary", hint: "Buttons & blocks" },
  { key: "accent", label: "Accent", hint: "Highlights" },
];

function SectionColors({ section, siteTheme, onPatch }: {
  section: SectionInstance; siteTheme: ThemeConfig; onPatch: (fn: (s: SectionInstance) => SectionInstance) => void;
}) {
  const o = section.themeOverride;
  function set(key: (typeof OVERRIDE_ROWS)[number]["key"], value: string) {
    onPatch((s) => ({ ...s, themeOverride: { ...(s.themeOverride ?? {}), [key]: value } }));
  }
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <p className="text-xs font-medium text-neutral-600">Colors <span className="font-normal text-neutral-400">— this section only</span></p>
        {o && <button onClick={() => onPatch((s) => ({ ...s, themeOverride: undefined }))} className="text-[11px] font-medium underline opacity-60 hover:opacity-100">Reset</button>}
      </div>
      {!o ? (
        <button
          onClick={() => onPatch((s) => ({ ...s, themeOverride: {} }))}
          className="flex w-full items-center gap-2 rounded-xl border border-dashed border-neutral-300 px-3 py-2.5 text-left transition-colors hover:border-neutral-900"
        >
          <span className="flex gap-1" aria-hidden>
            {[siteTheme.background, siteTheme.surface, siteTheme.accent].map((c) => (
              <i key={c} className="h-4 w-4 rounded-full border border-neutral-200" style={{ background: c }} />
            ))}
          </span>
          <span className="text-xs font-medium text-neutral-600">Customize this section&apos;s colors<span className="block text-[11px] font-normal text-neutral-400">The rest of the site keeps its colors.</span></span>
        </button>
      ) : (
        <div className="space-y-1.5 rounded-xl border border-neutral-200 bg-white p-2.5">
          {OVERRIDE_ROWS.map((r) => {
            const val = o[r.key] ?? siteTheme[r.key];
            return (
              <div key={r.key} className="flex items-center gap-2">
                <input type="color" value={val} onChange={(e) => set(r.key, e.target.value)} className="h-7 w-9 flex-none cursor-pointer rounded border border-neutral-200" aria-label={`${r.label} color`} />
                <span className="w-[86px] flex-none text-xs">
                  <span className="block font-medium text-neutral-700">{r.label}</span>
                  <span className="block text-[10px] text-neutral-400">{r.hint}</span>
                </span>
                <input value={val} onChange={(e) => set(r.key, e.target.value)} spellCheck={false} className="w-full rounded-md border border-neutral-200 px-2 py-1 font-mono text-xs" aria-label={`${r.label} hex value`} />
                {o[r.key] && <span className="h-1.5 w-1.5 flex-none rounded-full" style={{ background: "var(--accent)" }} title="Customized" />}
              </div>
            );
          })}
          <p className="px-0.5 pt-0.5 text-[11px] leading-snug text-neutral-400">Only this {SECTION_META[section.type]?.label.toLowerCase() ?? "section"} changes. Dots mark colors that differ from the site.</p>
        </div>
      )}
    </div>
  );
}
