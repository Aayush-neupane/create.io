import type { SectionInstance, ThemeConfig, WebsiteConfig } from "@/types/builder";
import {
  AboutSection, ContactSection, CtaSection, EducationSection, ExperienceSection, FaqSection,
  FooterSection, GallerySection, HeroSection, HoursSection, MenuSection, NavbarSection,
  PricingSection, ProcessSection, ProjectsSection, ServicesSection, SkillsSection,
  TeamSection, TestimonialsSection, wrapStyle,
} from "@/components/sections/Sections";

export const SECTION_META: Record<string, { label: string; variants: { id: string; label: string }[]; deletable: boolean }> = {
  navbar: { label: "Navbar", variants: [{ id: "minimal", label: "Minimal" }, { id: "solid", label: "Solid" }, { id: "overlay", label: "Overlay" }], deletable: false },
  hero: { label: "Hero", variants: [{ id: "split", label: "Split" }, { id: "centered", label: "Centered" }, { id: "minimal", label: "Minimal" }, { id: "image", label: "Image focused" }], deletable: false },
  about: { label: "About", variants: [{ id: "simple", label: "Simple" }, { id: "split", label: "Split with image" }], deletable: true },
  skills: { label: "Skills", variants: [{ id: "bars", label: "Bars" }, { id: "simple", label: "Simple" }], deletable: true },
  services: { label: "Services", variants: [{ id: "cards", label: "Cards" }, { id: "grid", label: "Grid" }], deletable: true },
  projects: { label: "Projects", variants: [{ id: "grid", label: "Grid" }, { id: "featured", label: "Featured" }, { id: "list", label: "Minimal list" }], deletable: true },
  experience: { label: "Experience", variants: [{ id: "timeline", label: "Timeline" }, { id: "simple", label: "Simple" }], deletable: true },
  education: { label: "Education", variants: [{ id: "simple", label: "Simple" }], deletable: true },
  testimonials: { label: "Testimonials", variants: [{ id: "cards", label: "Cards" }, { id: "grid", label: "Grid" }, { id: "minimal", label: "Minimal" }, { id: "quote", label: "Quote" }], deletable: true },
  pricing: { label: "Pricing", variants: [{ id: "tiers", label: "Tiers" }], deletable: true },
  gallery: { label: "Gallery", variants: [{ id: "grid", label: "Grid" }, { id: "masonry", label: "Masonry" }], deletable: true },
  menu: { label: "Menu", variants: [{ id: "grouped", label: "Grouped" }], deletable: true },
  hours: { label: "Hours", variants: [{ id: "card", label: "Card" }], deletable: true },
  team: { label: "Team", variants: [{ id: "grid", label: "Grid" }], deletable: true },
  process: { label: "Process", variants: [{ id: "steps", label: "Steps" }], deletable: true },
  faq: { label: "FAQ", variants: [{ id: "accordion", label: "Accordion" }], deletable: true },
  cta: { label: "Call to action", variants: [{ id: "banner", label: "Banner" }], deletable: true },
  contact: { label: "Contact", variants: [{ id: "minimal", label: "Minimal" }, { id: "split", label: "Split" }], deletable: false },
  footer: { label: "Footer", variants: [{ id: "simple", label: "Simple" }, { id: "columns", label: "Columns" }], deletable: false },
};

export function renderSection(s: SectionInstance, theme: ThemeConfig) {
  switch (s.type) {
    case "navbar": return <NavbarSection s={s} theme={theme} />;
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
    case "footer": return <FooterSection s={s} theme={theme} />;
    default: return null;
  }
}

export function TemplateRenderer({ config, previewDevice }: { config: WebsiteConfig; previewDevice?: "desktop" | "tablet" | "mobile" }) {
  void previewDevice;
  return (
    <div style={wrapStyle(config.theme)} className="min-h-full">
      {config.customCss && <style>{config.customCss}</style>}
      {config.sections.filter((s) => s.enabled).map((s) => (
        <div key={s.id}>{renderSection(s, config.theme)}</div>
      ))}
    </div>
  );
}
