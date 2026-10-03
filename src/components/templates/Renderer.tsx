import type { DragEvent as RDragEvent, KeyboardEvent as RKeyboardEvent, MouseEvent as RMouseEvent, PointerEvent as RPointerEvent } from "react";
import type { PageConfig, SectionInstance, ThemeConfig, WebsiteConfig } from "@/types/builder";
import {
  AboutSection, BannerSection, ContactSection, CtaSection, EducationSection, ExperienceSection, FaqSection,
  FooterSection, GallerySection, HeroSection, HoursSection, LogosSection, MenuSection, NavbarSection,
  PricingSection, ProcessSection, ProjectsSection, ServicesSection, SkillsSection, StatsSection,
  TeamSection, TestimonialsSection, VideoSection, wrapStyle,
} from "@/components/sections/Sections";
import { getBespoke } from "@/templates";

export const SECTION_META: Record<string, { label: string; variants: { id: string; label: string }[]; deletable: boolean }> = {
  navbar: { label: "Navbar", variants: [{ id: "minimal", label: "Minimal" }, { id: "solid", label: "Solid" }, { id: "overlay", label: "Overlay" }, { id: "bold", label: "Bold bar" }, { id: "centered", label: "Centered" }], deletable: false },
  banner: { label: "Announcement", variants: [{ id: "strip", label: "Strip" }, { id: "dark", label: "Dark strip" }], deletable: true },
  hero: { label: "Hero", variants: [{ id: "split", label: "Split" }, { id: "centered", label: "Centered" }, { id: "minimal", label: "Minimal" }, { id: "image", label: "Image focused" }, { id: "poster", label: "Poster" }, { id: "editorial", label: "Editorial" }], deletable: false },
  about: { label: "About", variants: [{ id: "simple", label: "Simple" }, { id: "split", label: "Split with image" }, { id: "editorial", label: "Editorial" }, { id: "card", label: "Card" }], deletable: true },
  skills: { label: "Skills", variants: [{ id: "bars", label: "Bars" }, { id: "simple", label: "Simple" }], deletable: true },
  services: { label: "Services", variants: [{ id: "cards", label: "Cards" }, { id: "grid", label: "Grid" }, { id: "list", label: "Numbered list" }, { id: "split", label: "Split dark" }], deletable: true },
  projects: { label: "Projects", variants: [{ id: "grid", label: "Grid" }, { id: "featured", label: "Featured" }, { id: "list", label: "Minimal list" }, { id: "editorial", label: "Editorial rows" }], deletable: true },
  experience: { label: "Experience", variants: [{ id: "timeline", label: "Timeline" }, { id: "simple", label: "Simple" }], deletable: true },
  education: { label: "Education", variants: [{ id: "simple", label: "Simple" }], deletable: true },
  testimonials: { label: "Testimonials", variants: [{ id: "cards", label: "Cards" }, { id: "grid", label: "Grid" }, { id: "minimal", label: "Minimal" }, { id: "quote", label: "Quote" }], deletable: true },
  pricing: { label: "Pricing", variants: [{ id: "tiers", label: "Tiers" }], deletable: true },
  gallery: { label: "Gallery", variants: [{ id: "grid", label: "Grid" }, { id: "masonry", label: "Masonry" }, { id: "feature", label: "Feature dark" }], deletable: true },
  video: { label: "Video", variants: [{ id: "wide", label: "Wide" }, { id: "card", label: "Card" }], deletable: true },
  stats: { label: "Stats band", variants: [{ id: "band", label: "Dark band" }, { id: "grid", label: "Light grid" }], deletable: true },
  menu: { label: "Menu", variants: [{ id: "grouped", label: "Grouped" }], deletable: true },
  hours: { label: "Hours", variants: [{ id: "card", label: "Card" }], deletable: true },
  team: { label: "Team", variants: [{ id: "grid", label: "Grid" }], deletable: true },
  process: { label: "Process", variants: [{ id: "steps", label: "Steps" }], deletable: true },
  faq: { label: "FAQ", variants: [{ id: "accordion", label: "Accordion" }], deletable: true },
  cta: { label: "Call to action", variants: [{ id: "banner", label: "Banner" }], deletable: true },
  logos: { label: "Logos", variants: [{ id: "row", label: "Row" }, { id: "grid", label: "Grid" }], deletable: true },
  contact: { label: "Contact", variants: [{ id: "minimal", label: "Minimal" }, { id: "split", label: "Split" }], deletable: false },
  footer: { label: "Footer", variants: [{ id: "simple", label: "Simple" }, { id: "columns", label: "Columns" }, { id: "big", label: "Big type" }, { id: "minimal", label: "Minimal centered" }], deletable: false },
};

export interface NavPage {
  title: string;
  href: string;
}

/** Effective theme for one section: site theme + that section's own color
 *  overrides (if any). Lets a single component change color without
 *  affecting the rest of the site. */
export function sectionTheme(base: ThemeConfig, s: SectionInstance): ThemeConfig {
  return s.themeOverride ? { ...base, ...s.themeOverride } : base;
}

/** Whole-site nav entries (home + subpages). Empty without a slug. */
export function navPages(config: WebsiteConfig, slug?: string): NavPage[] {
  if (!slug) return [];
  const base = `/s/${slug}`;
  const home: NavPage[] = [{ title: "Home", href: base }];
  const subs = (config.pages ?? []).map((p: PageConfig) => ({ title: p.title, href: `${base}/${p.path}` }));
  return subs.length > 0 ? [...home, ...subs] : [];
}

export function renderSection(s: SectionInstance, theme: ThemeConfig, templateId?: string, pages?: NavPage[]) {
  const t = sectionTheme(theme, s);
  if (templateId) {
    const Bespoke = getBespoke(templateId, s.type, s.variant);
    if (Bespoke) return <Bespoke content={s.content as Record<string, unknown>} theme={t} pages={pages} />;
  }
  switch (s.type) {
    case "navbar": return <NavbarSection s={s} theme={t} pages={pages} />;
    case "banner": return <BannerSection s={s} theme={t} />;
    case "hero": return <HeroSection s={s} theme={t} />;
    case "about": return <AboutSection s={s} theme={t} />;
    case "skills": return <SkillsSection s={s} theme={t} />;
    case "services": return <ServicesSection s={s} theme={t} />;
    case "projects": return <ProjectsSection s={s} theme={t} />;
    case "experience": return <ExperienceSection s={s} theme={t} />;
    case "education": return <EducationSection s={s} theme={t} />;
    case "testimonials": return <TestimonialsSection s={s} theme={t} />;
    case "pricing": return <PricingSection s={s} theme={t} />;
    case "gallery": return <GallerySection s={s} theme={t} />;
    case "video": return <VideoSection s={s} theme={t} />;
    case "stats": return <StatsSection s={s} theme={t} />;
    case "menu": return <MenuSection s={s} theme={t} />;
    case "hours": return <HoursSection s={s} theme={t} />;
    case "team": return <TeamSection s={s} theme={t} />;
    case "process": return <ProcessSection s={s} theme={t} />;
    case "faq": return <FaqSection s={s} theme={t} />;
    case "cta": return <CtaSection s={s} theme={t} />;
    case "logos": return <LogosSection s={s} theme={t} />;
    case "contact": return <ContactSection s={s} theme={t} />;
    case "footer": return <FooterSection s={s} theme={t} pages={pages} />;
    default: return null;
  }
}

/** Builder-only drag-and-drop reorder state, owned by the builder. */
export interface PreviewDnd {
  dragId: string | null;
  overId: string | null;
  onStart: (id: string) => void;
  onOver: (id: string | null) => void;
  onDrop: (id: string) => void;
  onEnd: () => void;
}

export function TemplateRenderer({ config, templateId, slug, pagePath, selectedId, onSelect, showHidden, dnd, floatSel, onFloatSelect, onFloatPointerDown }: {
  config: WebsiteConfig; templateId?: string; slug?: string; pagePath?: string;
  /** Builder-only: highlight + click-to-select sections in the preview. */
  selectedId?: string | null; onSelect?: (id: string) => void;
  /** Builder-only: render hidden sections as slim placeholder strips. */
  showHidden?: boolean;
  /** Builder-only: drag handles + drop targets for canvas reorder. */
  dnd?: PreviewDnd;
  /** Builder-only: selected free-floating overlay element. */
  floatSel?: { sectionId: string; floatId: string } | null;
  /** Builder-only: pick a floating element (opens its editor). */
  onFloatSelect?: (sectionId: string, floatId: string, x: number, y: number) => void;
  /** Builder-only: begin a free-drag session on a floating element. */
  onFloatPointerDown?: (sectionId: string, floatId: string, e: RPointerEvent) => void;
}) {
  const active = pagePath ? (config.pages ?? []).find((p) => p.path === pagePath) : undefined;
  const sections = active ? active.sections : config.sections;
  const pages = navPages(config, slug);
  const selectable = typeof onSelect === "function";
  const visible = sections.filter((s) => s.enabled);
  const hidden = showHidden ? sections.filter((s) => !s.enabled) : [];
  return (
    <div lang={config.seo.language || "en"} style={wrapStyle(config.theme)} className="min-h-full">
      {config.customCss && <style>{config.customCss}</style>}
      {visible.map((s) => (
        <div
          key={s.id}
          data-section-id={s.id}
          style={{
            ...((s.floats && s.floats.length > 0) || selectable ? { position: "relative" as const } : {}),
            ...(s.band ? { background: sectionTheme(config.theme, s).surface } : {}),
          }}
          {...(selectable ? {
            role: "button",
            tabIndex: 0,
            "aria-label": `Edit ${SECTION_META[s.type]?.label ?? s.type} section`,
            onClickCapture: (e: RMouseEvent) => { e.preventDefault(); },
            onClick: () => (onSelect as (id: string) => void)(s.id),
            onKeyDown: (e: RKeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); (onSelect as (id: string) => void)(s.id); } },
            onDragOver: dnd ? (e: RDragEvent) => {
              if (dnd.dragId && dnd.dragId !== s.id) {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
                if (dnd.overId !== s.id) dnd.onOver(s.id);
              }
            } : undefined,
            onDragLeave: dnd ? () => { if (dnd.overId === s.id) dnd.onOver(null); } : undefined,
            onDrop: dnd ? (e: RDragEvent) => { e.preventDefault(); dnd.onDrop(s.id); } : undefined,
          } : {})}
          className={[
            selectable ? "builder-selectable" : "",
            selectable && selectedId === s.id ? "is-selected" : "",
            dnd && dnd.overId === s.id ? "drop-before" : "",
            dnd && dnd.dragId === s.id ? "is-dragging" : "",
          ].filter(Boolean).join(" ") || undefined}
        >
          {selectable && (
            <span aria-hidden className="builder-tag">{SECTION_META[s.type]?.label ?? s.type}</span>
          )}
          {selectable && dnd && (
            <span
              aria-hidden
              title="Drag to reorder"
              draggable
              onDragStart={(e) => { e.stopPropagation(); try { e.dataTransfer.setData("text/plain", s.id); } catch {} e.dataTransfer.effectAllowed = "move"; dnd.onStart(s.id); }}
              onDragEnd={() => dnd.onEnd()}
              className="builder-grip"
            >
              ⠿
            </span>
          )}
          {renderSection(s, config.theme, templateId, pages)}
          {s.elementStyle && Object.keys(s.elementStyle).length > 0 && (
            <style>{Object.entries(s.elementStyle).map(([k, v]) => {
              if (!v || typeof v !== "object") return "";
              const parts: string[] = [];
              if (typeof v.z === "number") parts.push(`zoom:${v.z};`);
              const t: string[] = [];
              if (typeof v.dx === "number" || typeof v.dy === "number") t.push(`translate(${v.dx ?? 0}px,${v.dy ?? 0}px)`);
              if (typeof v.r === "number") t.push(`rotate(${v.r}deg)`);
              if (t.length > 0) parts.push(`transform:${t.join(" ")};`);
              // Explicit user styling wins over template inline styles.
              if (typeof v.color === "string") parts.push(`color:${v.color}!important;`);
              if (typeof v.background === "string") parts.push(`background:${v.background}!important;`);
              if (typeof v.radius === "number") parts.push(`border-radius:${v.radius}px!important;`);
              return parts.length > 0 ? `[data-el="${s.id}:${k}"]{${parts.join("")}}` : "";
            }).join("")}</style>
          )}
          {(s.floats ?? []).map((f) => {
            const isBtn = f.kind === "button";
            const effT = sectionTheme(config.theme, s);
            const fsel = floatSel != null && floatSel.sectionId === s.id && floatSel.floatId === f.id;
            const editing = !!onFloatSelect;
            return (
              <div
                key={f.id}
                data-float={`${s.id}:${f.id}`}
                onClickCapture={editing ? (e: RMouseEvent) => { e.preventDefault(); } : undefined}
                onClick={editing && onFloatSelect ? (e: RMouseEvent) => { onFloatSelect(s.id, f.id, e.clientX, e.clientY); } : undefined}
                onPointerDown={editing && onFloatPointerDown ? (e: RPointerEvent) => onFloatPointerDown(s.id, f.id, e) : undefined}
                style={{
                  position: "absolute",
                  left: `${f.x}%`,
                  top: `${f.y}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: 15,
                  fontSize: f.size,
                  lineHeight: 1.25,
                  ...(editing ? { cursor: "grab", touchAction: "none" as const } : undefined),
                  ...(fsel ? { outline: "2px solid var(--accent)", outlineOffset: "3px" } : undefined),
                }}
              >
                {isBtn ? (
                  <a
                    href={f.href || "#contact"}
                    style={{
                      display: "inline-block",
                      padding: "0.6em 1.25em",
                      borderRadius: effT.radius,
                      background: f.background ?? effT.primary,
                      color: f.color ?? "#ffffff",
                      fontWeight: 800,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {f.text || "Button"}
                  </a>
                ) : (
                  <span
                    style={{
                      color: f.color ?? effT.text,
                      background: f.background ?? "transparent",
                      padding: f.background ? "0.25em 0.6em" : undefined,
                      borderRadius: effT.radius,
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {f.text || "Text"}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
      {hidden.length > 0 && (
        <div className="px-6 py-6" style={{ background: "var(--paper-2)" }}>
          <p className="mono-meta mb-2 text-[10.5px] font-semibold uppercase" style={{ letterSpacing: "0.12em", color: "var(--ink-3)" }}>
            Hidden — invisible on your site
          </p>
          <div className="flex flex-wrap gap-1.5">
            {hidden.map((s) => (
              <button
                key={s.id}
                data-section-id={s.id}
                onClick={() => selectable && (onSelect as (id: string) => void)(s.id)}
                className={`mono-meta rounded-full border border-dashed px-3 py-1.5 text-[11px] transition-colors hover:border-neutral-900 ${selectedId === s.id ? "border-neutral-900 bg-neutral-900 text-white" : "bg-white text-neutral-500"}`}
                style={selectedId === s.id ? undefined : { borderColor: "var(--line-2)" }}
              >
                {SECTION_META[s.type]?.label ?? s.type} · show
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
