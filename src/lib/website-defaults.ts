import type { SectionInstance, SectionType, SeoConfig, ThemeConfig, WebsiteConfig } from "@/types/builder";
import { templateSeedContent } from "@/templates";
export const FONT_CHOICES = [
  "Inter",
  "Plus Jakarta Sans",
  "Space Grotesk",
  "Fraunces",
  "Newsreader",
  "JetBrains Mono",
];

export const THEME_PRESETS: { name: string; theme: Partial<ThemeConfig> }[] = [
  { name: "Classic", theme: { primary: "#111111", secondary: "#4b5563", background: "#ffffff", surface: "#f6f6f5", text: "#111111", muted: "#6b7280", accent: "#111111" } },
  { name: "Monochrome", theme: { primary: "#000000", secondary: "#525252", background: "#ffffff", surface: "#fafafa", text: "#0a0a0a", muted: "#737373", accent: "#000000" } },
  { name: "Ocean", theme: { primary: "#0c4a6e", secondary: "#0369a1", background: "#f8fafc", surface: "#eef4f8", text: "#0c1a2a", muted: "#5b7a93", accent: "#0ea5e9" } },
  { name: "Forest", theme: { primary: "#1a3c2e", secondary: "#2d6a4f", background: "#fafaf7", surface: "#eef2ea", text: "#14231b", muted: "#5f7267", accent: "#40916c" } },
  { name: "Warm", theme: { primary: "#7c2d12", secondary: "#9a3412", background: "#fffbeb", surface: "#fef3c7", text: "#292019", muted: "#8a7a6b", accent: "#ea580c" } },
  { name: "Professional", theme: { primary: "#1e3a5f", secondary: "#475569", background: "#ffffff", surface: "#f1f5f9", text: "#0f172a", muted: "#64748b", accent: "#2563eb" } },
  { name: "Elegant", theme: { primary: "#3b2f2f", secondary: "#6b5d5d", background: "#fdfbf7", surface: "#f5efe6", text: "#2a2222", muted: "#8a7f7a", accent: "#b45309" } },
  { name: "Noir", theme: { primary: "#fafafa", secondary: "#a1a1aa", background: "#0a0a0a", surface: "#171717", text: "#fafafa", muted: "#a1a1aa", accent: "#fafafa" } },
];

let counter = 0;
export function sid(prefix: string): string {
  counter += 1;
  return `${prefix}-${Date.now().toString(36)}-${counter}`;
}

export function defaultSection(type: SectionType, variant: string): SectionInstance {
  return { id: sid(type), type, variant, enabled: true, content: defaultContentFor(type) };
}

export function defaultContentFor(type: SectionType): Record<string, unknown> {
  switch (type) {
    case "navbar":
      return { logo: "Your Name", links: [{ label: "About", href: "#about" }, { label: "Work", href: "#work" }, { label: "Contact", href: "#contact" }], cta: "Hire me" };
    case "hero":
      return {
        eyebrow: "Available for new projects",
        title: "Designing clarity out of complexity",
        subtitle: "Product Designer & Developer",
        description: "I help teams ship thoughtful, high-performing websites and products — from first sketch to production.",
        primaryCta: "View my work",
        secondaryCta: "Get in touch",
        image: "",
        stats: [{ value: "8+", label: "Years experience" }, { value: "60+", label: "Projects shipped" }, { value: "12", label: "Awards" }],
      };
    case "about":
      return {
        heading: "About",
        title: "Designer who codes, developer who cares about design",
        body: "I spend most of my time turning ambiguous ideas into clear, usable interfaces. My background spans product design and front-end engineering, so I can own a project end to end.",
        image: "",
        bullets: ["Product strategy & UX", "Design systems", "React / Next.js development"],
      };
    case "skills":
      return {
        heading: "Skills",
        title: "What I do best",
        skills: [
          { name: "Product Design", level: 95 }, { name: "React / Next.js", level: 92 },
          { name: "TypeScript", level: 88 }, { name: "Design Systems", level: 90 },
          { name: "Motion & Interaction", level: 80 }, { name: "SEO & Performance", level: 85 },
        ],
      };
    case "services":
      return {
        heading: "Services",
        title: "How I can help",
        description: "Fixed-scope engagements with clear deliverables and timelines.",
        items: [
          { title: "Website Design", description: "Custom, conversion-focused websites designed around your brand and audience.", icon: "sparkles", price: "from Rs. 95,000" },
          { title: "Development", description: "Fast, accessible builds with Next.js, TypeScript and modern tooling.", icon: "code", price: "from Rs. 1,25,000" },
          { title: "Brand Identity", description: "Logo, type and color systems that make you look established from day one.", icon: "palette", price: "from Rs. 70,000" },
        ],
      };
    case "projects":
      return {
        heading: "Selected work",
        title: "Projects",
        description: "A few engagements I'm proud of.",
        items: [
          { title: "Sajilo Banking", description: "Marketing site + dashboard redesign that lifted trial signups 38%.", image: "", tags: ["Next.js", "Design system"], url: "#", github: "#" },
          { title: "Himalayan Trails", description: "Booking experience for a Pokhara trekking company. 4.9★ from 300+ reviews.", image: "", tags: ["Booking", "SEO"], url: "#", github: "#" },
          { title: "FitNepal Studio", description: "Class scheduling and membership site for a fitness studio in Lalitpur.", image: "", tags: ["Scheduling", "CMS"], url: "#", github: "#" },
        ],
      };
    case "experience":
      return {
        heading: "Experience",
        title: "Where I've worked",
        items: [
          { company: "Freelance", role: "Product Designer & Developer", start: "2021", end: "Present", description: "Partnering with startups and studios on websites, design systems and product UI." },
          { company: "Studio Kathmandu", role: "Senior Designer", start: "2018", end: "2021", description: "Led web projects for SaaS and e-commerce clients; built the studio's component library." },
          { company: "Pixel Danfe", role: "UI Developer", start: "2016", end: "2018", description: "Shipped marketing sites and interactive prototypes for agency clients." },
        ],
      };
    case "education":
      return {
        heading: "Education",
        title: "Background",
        items: [
          { school: "Tribhuvan University", degree: "B.Sc. Computer Science", start: "2012", end: "2016", description: "Focus on human-computer interaction and web technologies." },
        ],
      };
    case "testimonials":
      return {
        heading: "Kind words",
        title: "Testimonials",
        items: [
          { name: "Sabina Shrestha", role: "Founder", company: "Sajilo Banking", message: "The rare designer who thinks in systems and ships like an engineer. Our conversion rate speaks for itself.", photo: "" },
          { name: "Rohit Maharjan", role: "CTO", company: "FitNepal", message: "Fast, communicative, and obsessive about detail. The site paid for itself within two months.", photo: "" },
          { name: "Anjali Thapa", role: "Marketing Lead", company: "Himalayan Trails", message: "Bookings doubled after launch. Customers constantly compliment the website.", photo: "" },
        ],
      };
    case "pricing":
      return {
        heading: "Pricing",
        title: "Simple, transparent plans",
        items: [
          { name: "Starter", price: "Rs. 75,000", period: "one-time", description: "Perfect for a sharp one-page presence.", features: ["1-page custom site", "Copy polish", "Basic SEO", "2-week delivery"], featured: false },
          { name: "Studio", price: "Rs. 1,50,000", period: "one-time", description: "Our most popular full website package.", features: ["Up to 6 pages", "CMS + blog", "Advanced SEO", "Analytics setup"], featured: true },
          { name: "Scale", price: "Rs. 2,90,000", period: "one-time", description: "For teams that need design + build.", features: ["Everything in Studio", "Design system", "Priority support", "Training"], featured: false },
        ],
      };
    case "gallery":
      return {
        heading: "Gallery",
        title: "Selected frames",
        images: ["", "", "", "", "", ""],
      };
    case "menu":
      return {
        heading: "Menu",
        title: "Taste of the house",
        groups: [
          { name: "Starters", items: [{ name: "Burrata & Heirloom", description: "Basil oil, aged balsamic, grilled sourdough", price: "Rs. 550" }, { name: "Crispy Calamari", description: "Lemon aioli, parsley", price: "Rs. 495" }] },
          { name: "Mains", items: [{ name: "Wood-fired Margherita", description: "San Marzano, fior di latte, basil", price: "Rs. 850" }, { name: "Herb-roast Chicken", description: "Rosemary jus, seasonal vegetables", price: "Rs. 1,150" }] },
          { name: "Desserts", items: [{ name: "Olive Oil Cake", description: "Citrus mascarpone", price: "Rs. 350" }, { name: "Affogato", description: "Vanilla gelato, double espresso", price: "Rs. 250" }] },
        ],
      };
    case "hours":
      return {
        heading: "Visit us",
        title: "Hours & location",
        address: "214 Lazimpat Road, Kathmandu",
        phone: "(01) 444-0114",
        rows: [{ day: "Mon – Thu", time: "11:30a – 10p" }, { day: "Fri – Sat", time: "11:30a – 11p" }, { day: "Sunday", time: "12p – 9p" }],
      };
    case "team":
      return {
        heading: "Team",
        title: "The people behind it",
        members: [
          { name: "Aashish Shrestha", role: "Founder & CEO", photo: "", bio: "Previously led product at two Kathmandu startups." },
          { name: "Sabina Karki", role: "Design Director", photo: "", bio: "Systems thinker, type nerd." },
          { name: "Rohit Maharjan", role: "Engineering Lead", photo: "", bio: "Ships fast without breaking things." },
        ],
      };
    case "process":
      return {
        heading: "Process",
        title: "How we'll work together",
        steps: [
          { title: "Discover", description: "A focused workshop to align on goals, audience and scope.", icon: "1" },
          { title: "Design", description: "Iterative concepts in days, not months. You review real pages.", icon: "2" },
          { title: "Build", description: "Clean, fast implementation with content and SEO baked in.", icon: "3" },
          { title: "Launch", description: "QA, analytics, training — then we ship and measure.", icon: "4" },
        ],
      };
    case "faq":
      return {
        heading: "FAQ",
        title: "Questions, answered",
        items: [
          { q: "How long does a project take?", a: "Most sites launch in 2–4 weeks depending on scope and feedback speed." },
          { q: "Do you write the copy?", a: "Yes — every engagement includes a copy polish pass, and full copywriting is available." },
          { q: "What do you need from me?", a: "A kickoff call, brand assets if you have them, and timely feedback. I handle the rest." },
        ],
      };
    case "cta":
      return { title: "Have a project in mind?", description: "Tell me about your goals — I'll reply within one business day.", primaryCta: "Start a project", secondaryCta: "Book a call" };
    case "logos":
      return { heading: "Trusted by", items: ["Sajilo", "Himal Trails", "Momo Mart", "Kumari Pay", "FitNepal"] };
    case "contact":
      return { heading: "Contact", title: "Let's work together", email: "namaste@example.com.np", phone: "", location: "Kathmandu, Nepal", body: "Currently booking new projects for next quarter." };
    case "footer":
      return { tagline: "Designed and built with care.", copyright: "© 2026 All rights reserved.", showSocial: true };
    default:
      return {};
  }
}

export function baseTheme(): ThemeConfig {
  return {
    primary: "#111111",
    secondary: "#4b5563",
    background: "#ffffff",
    surface: "#f6f6f5",
    text: "#111111",
    muted: "#6b7280",
    accent: "#111111",
    fontHeading: "Inter",
    fontBody: "Inter",
    headingScale: 1,
    bodySize: 16,
    lineHeight: 1.6,
    letterSpacing: 0,
    contentWidth: "medium",
    sectionSpacing: "comfortable",
    radius: 10,
    buttonStyle: "rounded",
  };
}

export function personalize(content: Record<string, unknown>, owner: string, tagline: string): Record<string, unknown> {
  const out = { ...content };
  if (owner && typeof out["subtitle"] === "string" && !(out["subtitle"] as string).trim()) {
    out["subtitle"] = owner;
  }
  if (tagline && typeof out["description"] === "string" && !(out["description"] as string).trim()) {
    out["description"] = tagline;
  }
  return out;
}

export function buildConfigFromTemplate(
  templateId: string,
  sections: { type: SectionType; variant: string }[],
  theme: ThemeConfig,
  opts: { siteName: string; ownerName: string; tagline: string; siteDescription: string },
): WebsiteConfig {
  // Per-template predesigned library owns the seed content: unique copy per kind.
  const libSeed = templateSeedContent(templateId);
  const instances = sections.map((s) => {
    const inst = defaultSection(s.type, s.variant);
    const seed = libSeed[s.type];
    if (seed) inst.content = { ...inst.content, ...JSON.parse(JSON.stringify(seed)) };
    return inst;
  });
  const byType = (t: SectionType) => instances.find((s) => s.type === t);

  const nav = byType("navbar");
  if (nav) nav.content = { ...(nav.content as object), logo: opts.ownerName || (nav.content as Record<string, unknown>).logo || opts.siteName };
  const hero = byType("hero");
  if (hero) {
    hero.content = {
      ...(hero.content as object),
      ...(opts.ownerName ? { title: opts.ownerName } : {}),
      ...(opts.tagline ? { subtitle: opts.tagline } : {}),
    };
  }
  const contact = byType("contact");
  if (contact && opts.ownerName) {
    contact.content = { ...(contact.content as object), title: `Let's work together` };
  }

  return {
    version: 1,
    siteName: opts.siteName,
    siteDescription: opts.siteDescription || opts.tagline || "A professional website built with create.io",
    theme,
    navigation: {
      logo: opts.ownerName || opts.siteName,
      links: [
        { label: "About", href: "#about" },
        { label: "Work", href: "#work" },
        { label: "Contact", href: "#contact" },
      ],
    },
    sections: instances,
    pages: [],
    seo: {
      title: `${opts.siteName} — ${opts.tagline || "Welcome"}`,
      description: opts.siteDescription || opts.tagline || "A professional website.",
      socialImage: "",
      favicon: "",
      language: "en",
    },
  };
}

/** Sanitize one section list (home or subpage) without ever throwing. */
export function sanitizeSections(raw: unknown): SectionInstance[] {
  if (!Array.isArray(raw) || raw.length === 0) return [];
  return (raw as SectionInstance[]).map((s) => ({
    id: typeof s?.id === "string" ? s.id : sid("section"),
    type: (s?.type ?? "about") as SectionType,
    variant: typeof s?.variant === "string" ? s.variant : "simple",
    enabled: s?.enabled !== false,
    content: ((s?.content ?? {}) as Record<string, unknown>) ?? {},
  }));
}

export function sanitizePagePath(raw: unknown): string {
  const p = String(raw ?? "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);
  return p || "page";
}

/** Fill every missing piece of a stored config so rendering can never crash —
 *  corrupted or legacy configs degrade to a working site instead of a 500. */
export function normalizeConfig(raw: unknown): WebsiteConfig {
  const c = (raw ?? {}) as Partial<WebsiteConfig>;
  const theme = { ...baseTheme(), ...((c.theme ?? {}) as Partial<ThemeConfig>) };
  const home = sanitizeSections(c.sections);
  const sections = home.length > 0 ? home : [defaultSection("hero", "split"), defaultSection("contact", "minimal"), defaultSection("footer", "simple")];
  const pages = (Array.isArray(c.pages) ? c.pages : []).map((p) => ({
    id: typeof p?.id === "string" ? p.id : sid("page"),
    title: typeof p?.title === "string" && p.title ? p.title : "Page",
    path: sanitizePagePath(p?.path),
    sections: sanitizeSections(p?.sections),
  }));
  const nav = (c.navigation ?? {}) as Partial<WebsiteConfig["navigation"]>;
  const seo = (c.seo ?? {}) as Partial<SeoConfig>;
  return {
    version: 1,
    siteName: typeof c.siteName === "string" && c.siteName ? c.siteName : "Untitled site",
    siteDescription: typeof c.siteDescription === "string" ? c.siteDescription : "",
    theme,
    navigation: {
      logo: typeof nav.logo === "string" ? nav.logo : "Home",
      links: Array.isArray(nav.links) ? nav.links : [],
    },
    sections,
    pages,
    seo: {
      title: typeof seo.title === "string" ? seo.title : "",
      description: typeof seo.description === "string" ? seo.description : "",
      socialImage: typeof seo.socialImage === "string" ? seo.socialImage : "",
      favicon: typeof seo.favicon === "string" ? seo.favicon : "",
      language: typeof seo.language === "string" ? seo.language : "en",
    },
    ...(typeof c.analyticsId === "string" ? { analyticsId: c.analyticsId } : {}),
    ...(typeof c.customCss === "string" ? { customCss: c.customCss } : {}),
  };
}
