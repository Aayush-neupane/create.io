// ─── Core website-builder types ─────────────────────────────────────────────

/** Free-transform of a single canvas element. */
export interface ElementStyle {
  /** zoom factor, 0.5 – 2 */
  z?: number;
  /** nudge in px */
  dx?: number;
  /** nudge in px */
  dy?: number;
  /** rotation in degrees, -180 – 180 */
  r?: number;
  /** text color hex */
  color?: string;
  /** fill behind the element hex */
  background?: string;
  /** corner radius in px, 0 – 48 */
  radius?: number;
}

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
  /** Per-section overrides — only this section changes, the rest of
   *  the site keeps the site theme. Any subset of keys; all optional. */
  themeOverride?: Partial<Pick<ThemeConfig, "primary" | "background" | "surface" | "text" | "muted" | "accent" | "headingScale" | "sectionSpacing">>;
  /** Per-element free transforms, keyed by content field (e.g. "title").
   *  z = zoom (0.5–2), dx/dy = nudge in px, r = rotation in degrees.
   *  Lets any header / button / text move, scale and tilt Canva-style. */
  elementStyle?: Record<string, ElementStyle>;
  /** Free-floating overlays (text / buttons) placed anywhere on the section,
   *  Canva-style. x/y are % of the section box (center-anchored). */
  floats?: FloatElement[];
  content: SectionContent;
}

/** One free-floating overlay element on a section. */
export interface FloatElement {
  id: string;
  kind: "text" | "button";
  /** Visible label. */
  text: string;
  /** Buttons only. */
  href?: string;
  /** % across the section (center point). */
  x: number;
  /** % down the section (center point). */
  y: number;
  /** Font size in px. */
  size: number;
  /** Optional overrides; defaults come from the section theme. */
  color?: string;
  background?: string;
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
