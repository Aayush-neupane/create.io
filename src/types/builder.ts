// ─── Core website-builder types ─────────────────────────────────────────────

export type SectionType =
  | "navbar"
  | "banner"
  | "hero"
  | "about"
  | "skills"
  | "services"
  | "projects"
  | "experience"
  | "education"
  | "testimonials"
  | "pricing"
  | "gallery"
  | "video"
  | "stats"
  | "menu"
  | "hours"
  | "team"
  | "process"
  | "faq"
  | "cta"
  | "logos"
  | "contact"
  | "footer";

export interface SectionContent {
  [key: string]: unknown;
}

export interface SectionInstance {
  id: string;
  type: SectionType;
  variant: string;
  enabled: boolean;
  /** Tinted band behind the section (alternating rhythm). */
  band?: boolean;
  content: SectionContent;
}

export interface ThemeConfig {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  accent: string;
  fontHeading: string;
  fontBody: string;
  headingScale: number; // 0.9 - 1.25
  bodySize: number; // px base
  lineHeight: number;
  letterSpacing: number; // em
  contentWidth: "narrow" | "medium" | "wide";
  sectionSpacing: "compact" | "comfortable" | "spacious";
  radius: number; // px
  buttonStyle: "rounded" | "pill" | "square";
}

export interface SeoConfig {
  title: string;
  description: string;
  socialImage: string;
  favicon: string;
  language: string;
}

export interface PageConfig {
  id: string;
  title: string;
  /** URL path segment, e.g. "about". Home page lives at the site root. */
  path: string;
  sections: SectionInstance[];
}

export interface WebsiteConfig {
  version: 1;
  siteName: string;
  siteDescription: string;
  theme: ThemeConfig;
  navigation: { logo: string; links: { label: string; href: string }[] };
  sections: SectionInstance[];
  /** Additional pages beyond home. */
  pages: PageConfig[];
  seo: SeoConfig;
  analyticsId?: string;
  customCss?: string;
}

export interface TemplateDefinition {
  id: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  style: string;
  mode: "light" | "dark";
  tier: "free" | "premium";
  thumbnailGradient: string;
  theme: ThemeConfig;
  sections: { type: SectionType; variant: string }[];
}

export interface WebsiteRecord {
  id: string;
  userId: string;
  name: string;
  slug: string;
  templateId: string;
  status: "draft" | "published";
  config: WebsiteConfig;
  customDomain?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  /** One-time demo account — no password the user knows. */
  isGuest?: boolean;
}
