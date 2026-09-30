/**
 * Minimal Portfolio — bespoke predesigned library.
 * Quiet editorial system: hairline rules, index numerals, single-column rhythm.
 */
import type { SectionType, ThemeConfig } from "@/types/builder";
import { fontStack, containerWidth, sectionPad, btnRadius, str, arr } from "@/components/sections/Sections";

export interface BespokeProps {
  content: Record<string, unknown>;
  theme: ThemeConfig;
  /** Whole-site pages for nav linking. Empty on single-page sites. */
  pages?: { title: string; href: string }[];
}

/** Navbar links followed by whole-site page links (deduped by href). */
export function withPages(
  content: Record<string, unknown>,
  pages?: { title: string; href: string }[],
): { label: string; href: string }[] {
  const base = arr<{ label: string; href: string }>(content.links);
  const extra = (pages ?? []).map((pg) => ({ label: pg.title, href: pg.href }));
  const seen = new Set(base.map((l) => l.href));
  return [...base, ...extra.filter((l) => !seen.has(l.href))];
}

type C = (props: BespokeProps) => React.ReactNode;

function Rule({ theme }: { theme: ThemeConfig }) {
  return <div className="h-px w-full" style={{ background: theme.surface }} />;
}

function IndexLabel({ theme, n, label }: { theme: ThemeConfig; n: string; label: string }) {
  return (
    <div className="mb-8 flex items-baseline gap-4">
      <span className="font-mono text-xs" style={{ color: theme.muted }}>{n}</span>
      <span className="h-px flex-1" style={{ background: theme.surface }} />
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: theme.muted }}>{label}</span>
    </div>
  );
}

const Navbar: C = ({ content, theme, pages }) => {
  const links = withPages(content, pages);
  return (
    <nav className="border-b" style={{ borderColor: theme.surface, background: theme.background }}>
      <div className={`mx-auto flex items-baseline justify-between px-6 py-5 ${containerWidth(theme)}`}>
        <span className="text-[15px] font-semibold tracking-tight" style={{ fontFamily: fontStack(theme.fontHeading) }}>
          {str(content.logo, "A. Morgan")}
        </span>
        <div className="flex gap-6 text-[13px]" style={{ color: theme.muted }}>
          {links.map((l, i) => (
            <a key={i} href={l.href} className="hover:opacity-70">
              <span className="mr-1 font-mono text-[10px]">0{i + 1}</span>{l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

const Hero: C = ({ content, theme }) => {
  const stats = arr<{ value: string; label: string }>(content.stats);
  return (
    <section className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <p className="font-mono text-xs" style={{ color: theme.muted }}>{str(content.eyebrow, "Folio — 2026")}</p>
        <h1 className="mt-4 max-w-3xl" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(3.4rem * ${theme.headingScale})`, fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.02 }}>
          {str(content.title, "Alex Morgan")}
        </h1>
        <p className="mt-2 text-lg" style={{ color: theme.muted }}>{str(content.subtitle, "Product Designer & Developer")}</p>
        <div className="mt-6 max-w-xl text-[15px] leading-relaxed" style={{ color: theme.muted }}>{str(content.description)}</div>
        <div className="mt-8 flex gap-3">
          <a href="#work" className={`${btnRadius(theme)} px-5 py-2.5 text-sm font-semibold text-white`} style={{ background: theme.primary }}>{str(content.primaryCta, "Selected work ↓")}</a>
          {str(content.secondaryCta) && <a href="#contact" className={`${btnRadius(theme)} border px-5 py-2.5 text-sm font-semibold`} style={{ borderColor: theme.surface }}>{str(content.secondaryCta)}</a>}
        </div>
        {stats.length > 0 && (
          <dl className="mt-12 grid grid-cols-3 gap-6 border-t pt-6" style={{ borderColor: theme.surface }}>
            {stats.map((st, i) => (
              <div key={i}>
                <dt className="text-[26px] font-semibold" style={{ fontFamily: fontStack(theme.fontHeading) }}>{st.value}</dt>
                <dd className="mt-0.5 font-mono text-[11px]" style={{ color: theme.muted }}>{st.label}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
};

const About: C = ({ content, theme }) => {
  const bullets = arr<string>(content.bullets);
  return (
    <section id="about" className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <IndexLabel theme={theme} n="01" label={str(content.heading, "Profile")} />
        <div className="grid gap-10 md:grid-cols-[1fr_1.6fr]">
          <h2 style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(1.5rem * ${theme.headingScale})`, fontWeight: 600, lineHeight: 1.25 }}>{str(content.title)}</h2>
          <div>
            <p className="max-w-xl leading-relaxed" style={{ color: theme.muted }}>{str(content.body)}</p>
            {bullets.length > 0 && (
              <ul className="mt-6 divide-y" style={{ borderColor: theme.surface }}>
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-baseline gap-3 border-t py-2.5 text-sm" style={{ borderColor: theme.surface }}>
                    <span className="font-mono text-[11px]" style={{ color: theme.muted }}>—</span>{b}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills: C = ({ content, theme }) => {
  const skills = arr<{ name: string; level: number }>(content.skills);
  return (
    <section className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <IndexLabel theme={theme} n="02" label={str(content.heading, "Capabilities")} />
        <div className="divide-y" style={{ borderColor: theme.surface }}>
          {skills.map((sk, i) => (
            <div key={i} className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-t py-3.5" style={{ borderColor: theme.surface }}>
              <span className="text-[15px] font-medium">{sk.name}</span>
              <span className="font-mono text-xs" style={{ color: theme.muted }}>{sk.level}/100</span>
              <div className="col-span-2 h-px w-full" style={{ background: theme.surface }}>
                <div className="h-px" style={{ width: `${sk.level}%`, background: theme.primary }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects: C = ({ content, theme }) => {
  const items = arr<{ title: string; description: string; image: string; tags: string[]; url: string }>(content.items);
  return (
    <section id="work" className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <IndexLabel theme={theme} n="03" label={str(content.heading, "Selected work")} />
        <div className="border-t" style={{ borderColor: theme.text }}>
          {items.map((p, i) => (
            <a key={i} href={p.url || "#work"} className="group grid gap-2 border-b py-7 md:grid-cols-[48px_1fr_auto] md:items-baseline" style={{ borderColor: theme.surface }}>
              <span className="font-mono text-xs" style={{ color: theme.muted }}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-xl font-semibold tracking-tight group-hover:underline" style={{ fontFamily: fontStack(theme.fontHeading) }}>{p.title}</h3>
                <p className="mt-1 max-w-lg text-sm" style={{ color: theme.muted }}>{p.description}</p>
                <p className="mt-2 font-mono text-[11px]" style={{ color: theme.muted }}>{arr<string>(p.tags).join(" · ")}</p>
              </div>
              <span className="text-lg" style={{ color: theme.muted }}>↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience: C = ({ content, theme }) => {
  const items = arr<{ company: string; role: string; start: string; end: string; description: string }>(content.items);
  return (
    <section className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <IndexLabel theme={theme} n="04" label={str(content.heading, "Experience")} />
        <div>
          {items.map((e, i) => (
            <div key={i} className="grid gap-1 border-t py-5 md:grid-cols-[140px_1fr_auto]" style={{ borderColor: theme.surface }}>
              <span className="font-mono text-xs" style={{ color: theme.muted }}>{e.start}–{e.end}</span>
              <div>
                <h3 className="text-[15px] font-semibold">{e.role}</h3>
                <p className="text-sm" style={{ color: theme.muted }}>{e.company} — {e.description}</p>
              </div>
            </div>
          ))}
          <Rule theme={theme} />
        </div>
      </div>
    </section>
  );
};

const Contact: C = ({ content, theme }) => {
  return (
    <section id="contact" className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <IndexLabel theme={theme} n="05" label={str(content.heading, "Contact")} />
        <a href={`mailto:${str(content.email, "hello@example.com")}`} className="block" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})`, fontWeight: 600, letterSpacing: "-0.03em" }}>
          {str(content.email, "hello@example.com")}
        </a>
        <p className="mt-3 max-w-md text-sm" style={{ color: theme.muted }}>{str(content.body)} {str(content.location) && `Based in ${str(content.location)}.`}</p>
      </div>
    </section>
  );
};

const Footer: C = ({ content, theme }) => (
  <footer className="px-6 py-8">
    <div className={`mx-auto flex flex-col gap-2 border-t pt-6 text-xs md:flex-row md:items-center md:justify-between ${containerWidth(theme)}`} style={{ borderColor: theme.surface, color: theme.muted }}>
      <span className="font-mono">{str(content.copyright, "© 2026 — All rights reserved.")}</span>
      <span>{str(content.tagline, "Set in Inter. Built with care.")}</span>
    </div>
  </footer>
);

export const seed: Partial<Record<SectionType, Record<string, unknown>>> = {
  navbar: { logo: "A. Shrestha", links: [{ label: "Profile", href: "#about" }, { label: "Work", href: "#work" }, { label: "Contact", href: "#contact" }], cta: "" },
  hero: {
    eyebrow: "Folio — 2083", title: "Aashish Shrestha", subtitle: "Product Designer & Developer",
    description: "I design and build interfaces for teams who care about craft. Eight years across fintech, travel tech and developer tools in Kathmandu.",
    primaryCta: "Selected work ↓", secondaryCta: "Email me", image: "",
    stats: [{ value: "8", label: "Years practice" }, { value: "47", label: "Projects shipped" }, { value: "6", label: "Design awards" }],
  },
  about: {
    heading: "Profile", title: "Designer who codes, developer who cares about design",
    body: "I work at the intersection of product design and front-end engineering — most comfortable owning a project from first sketch to production deploy. Based in Lalitpur, working with clients across Nepal and beyond.",
    image: "", bullets: ["Product strategy & UX", "Design systems", "React / Next.js / TypeScript"],
  },
  skills: {
    heading: "Capabilities", title: "What I do best",
    skills: [{ name: "Interface Design", level: 95 }, { name: "React / Next.js", level: 92 }, { name: "Design Systems", level: 90 }, { name: "Prototyping", level: 86 }, { name: "Web Performance", level: 82 }],
  },
  projects: {
    heading: "Selected work", title: "Projects", description: "",
    items: [
      { title: "Sajilo Banking", description: "Mobile banking UX for a Kathmandu digital wallet — onboarding completed 2x faster.", image: "", tags: ["Fintech", "Next.js"], url: "#", github: "#" },
      { title: "Himalayan Trails", description: "Trekking booking platform for a Pokhara operator, in English and Nepali.", image: "", tags: ["Travel", "i18n"], url: "#", github: "#" },
      { title: "Nepali Type Scale", description: "Open Devanagari-friendly type tooling adopted by local studios.", image: "", tags: ["Open source", "Typography"], url: "#", github: "#" },
    ],
  },
  experience: {
    heading: "Experience", title: "Where I've worked",
    items: [
      { company: "Freelance", role: "Independent Designer-Developer", start: "2021", end: "Now", description: "Product design + builds for Nepali SaaS and fintech clients." },
      { company: "Sajilo Tech", role: "Product Designer", start: "2019", end: "2021", description: "Owned wallet UX across web and mobile." },
      { company: "Studio Patan", role: "UI Developer", start: "2017", end: "2019", description: "Marketing sites and interactive prototypes." },
    ],
  },
  contact: { heading: "Contact", title: "Get in touch", email: "namaste@aashish.com.np", phone: "+977-98510-12345", location: "Lalitpur, Nepal", body: "Currently booking projects for next quarter. Prefer Chiya over email threads." },
  footer: { tagline: "Set in Inter. Built with care in Lalitpur.", copyright: "© 2026 Aashish Shrestha — All rights reserved.", showSocial: true },
};

export const components: Record<string, C> = {
  "navbar:minimal": Navbar,
  "hero:split": Hero,
  "about:simple": About,
  "skills:bars": Skills,
  "projects:grid": Projects,
  "experience:timeline": Experience,
  "contact:minimal": Contact,
  "footer:simple": Footer,
};
