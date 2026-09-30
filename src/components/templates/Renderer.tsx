import type { PageConfig, SectionInstance, ThemeConfig, WebsiteConfig } from "@/types/builder";
import {
  AboutSection, ContactSection, CtaSection, EducationSection, ExperienceSection, FaqSection,
  FooterSection, GallerySection, HeroSection, HoursSection, MenuSection, NavbarSection,
  PricingSection, ProcessSection, ProjectsSection, ServicesSection, SkillsSection,
  TeamSection, TestimonialsSection, wrapStyle,
} from "@/components/sections/Sections";
import { getBespoke } from "@/templates";

export const SECTION_META: Record<string, { label: string; variants: { id: string; label: string }[]; deletable: boolean }> = {
  navbar: { label: "Navbar", variants: [{ id: "minimal", label: "Minimal" }, { id: "solid", label: "Solid" }, { id: "overlay", label: "Overlay" }, { id: "bold", label: "Bold bar" }, { id: "centered", label: "Centered" }], deletable: false },
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
  menu: { label: "Menu", variants: [{ id: "grouped", label: "Grouped" }], deletable: true },
  hours: { label: "Hours", variants: [{ id: "card", label: "Card" }], deletable: true },
  team: { label: "Team", variants: [{ id: "grid", label: "Grid" }], deletable: true },
  process: { label: "Process", variants: [{ id: "steps", label: "Steps" }], deletable: true },
  faq: { label: "FAQ", variants: [{ id: "accordion", label: "Accordion" }], deletable: true },
  cta: { label: "Call to action", variants: [{ id: "banner", label: "Banner" }], deletable: true },
  contact: { label: "Contact", variants: [{ id: "minimal", label: "Minimal" }, { id: "split", label: "Split" }], deletable: false },
  footer: { label: "Footer", variants: [{ id: "simple", label: "Simple" }, { id: "columns", label: "Columns" }, { id: "big", label: "Big type" }, { id: "minimal", label: "Minimal centered" }], deletable: false },
};

export interface NavPage {
  title: string;
  href: string;
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
  if (templateId) {
    const Bespoke = getBespoke(templateId, s.type, s.variant);
    if (Bespoke) return <Bespoke content={s.content as Record<string, unknown>} theme={theme} pages={pages} />;
  }
  switch (s.type) {
    case "navbar": return <NavbarSection s={s} theme={theme} pages={pages} />;
    case "hero": return <HeroSection s={s} theme={theme} />;
    case "about": return <AboutSection s={s} theme={theme} />;
    case "skills": return <SkillsSection s={s} theme={theme} />;
    case "services": return <ServicesSection s={s} theme={theme} />;
    case "projects": return <ProjectsSection s={s} theme={theme} />;
    case "experience": return <ExperienceSection s={s} theme={theme} />;
    case "education": return <EducationSection s={s} theme={theme} />;
    case "testimonials": return <TestimonialsSection s={s} theme={theme} />;
    case "pricing": return <PricingSection s={s} theme={theme} />;
    case "gallery": return <GallerySection s={s} theme={theme} />;
    case "menu": return <MenuSection s={s} theme={theme} />;
    case "hours": return <HoursSection s={s} theme={theme} />;
    case "team": return <TeamSection s={s} theme={theme} />;
    case "process": return <ProcessSection s={s} theme={theme} />;
    case "faq": return <FaqSection s={s} theme={theme} />;
    case "cta": return <CtaSection s={s} theme={theme} />;
    case "contact": return <ContactSection s={s} theme={theme} />;
    case "footer": return <FooterSection s={s} theme={theme} pages={pages} />;
    default: return null;
  }
}

export function TemplateRenderer({ config, templateId, slug, pagePath, previewDevice }: {
  config: WebsiteConfig; templateId?: string; slug?: string; pagePath?: string; previewDevice?: "desktop" | "tablet" | "mobile";
}) {
  void previewDevice;
  const active = pagePath ? (config.pages ?? []).find((p) => p.path === pagePath) : undefined;
  const sections = active ? active.sections : config.sections;
  const pages = navPages(config, slug);
  return (
    <div style={wrapStyle(config.theme)} className="min-h-full">
      {config.customCss && <style>{config.customCss}</style>}
      {sections.filter((s) => s.enabled).map((s) => (
        <div key={s.id}>{renderSection(s, config.theme, templateId, pages)}</div>
      ))}
    </div>
  );
}
