/**
 * Studio North — bespoke predesigned library.
 * Studio system: sticker badges, oversized grotesk, alternating case rows, violet current.
 */
import type { SectionType } from "@/types/builder";
import { fontStack, containerWidth, sectionPad, btnRadius, str, arr, EmptyArt } from "@/components/sections/Sections";
import type { BespokeProps } from "./minimal-portfolio";
import { withPages } from "./minimal-portfolio";

type C = (props: BespokeProps) => React.ReactNode;

const Navbar: C = ({ content, theme, pages }) => {
  const links = withPages(content, pages);
  return (
    <nav style={{ background: theme.primary, color: "#fff" }}>
      <div className={`mx-auto flex items-center justify-between px-6 py-3.5 ${containerWidth(theme)}`}>
        <span className="flex items-center gap-2 text-[15px] font-bold tracking-tight" style={{ fontFamily: fontStack(theme.fontHeading) }}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black" style={{ background: theme.accent }}>N↑</span>
          {str(content.logo, "Studio North")}
        </span>
        <div className="hidden gap-7 text-[13px] font-semibold md:flex">
          {links.map((l, i) => <a key={i} href={l.href} className="opacity-80 hover:opacity-100">{l.label}</a>)}
        </div>
        <a href="#contact" className="rounded-full bg-white px-4 py-2 text-[13px] font-bold" style={{ color: theme.primary }}>{str(content.cta) || "Start a project ↗"}</a>
      </div>
    </nav>
  );
};

const Hero: C = ({ content, theme }) => {
  const stats = arr<{ value: string; label: string }>(content.stats);
  return (
    <section className="relative overflow-hidden" style={{ background: theme.primary, color: "#fff" }}>
      <div className={`mx-auto px-6 pb-14 pt-16 md:pb-20 md:pt-24 ${containerWidth(theme)}`}>
        <span className="inline-block -rotate-2 rounded-full px-3 py-1 text-xs font-bold text-white" style={{ background: theme.accent }}>{str(content.eyebrow, "● Booking Q3 projects")}</span>
        <h1 className="mt-5 max-w-5xl" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(3.8rem * ${theme.headingScale})`, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 0.98 }}>
          {str(content.title)}
        </h1>
        <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <p className="max-w-xl text-[15px] leading-relaxed opacity-75">{str(content.description)}</p>
          <div className="flex gap-3">
            <a href="#work" className="rounded-full bg-white px-6 py-3 text-sm font-bold" style={{ color: theme.primary }}>{str(content.primaryCta, "See the work")}</a>
            {str(content.secondaryCta) && <a href="#contact" className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold">{str(content.secondaryCta)}</a>}
          </div>
        </div>
        {stats.length > 0 && (
          <dl className="mt-12 grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-white/15">
            {stats.map((st, i) => (
              <div key={i} className="p-5" style={{ background: theme.primary }}>
                <dt className="text-3xl font-bold" style={{ fontFamily: fontStack(theme.fontHeading) }}>{st.value}</dt>
                <dd className="mt-1 text-xs uppercase tracking-widest opacity-60">{st.label}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
};

const Services: C = ({ content, theme }) => {
  const items = arr<{ title: string; description: string; price: string }>(content.items);
  return (
    <section className={sectionPad(theme)} style={{ background: "#0f0f12", color: "#fff" }}>
      <div className={`mx-auto grid gap-10 px-6 md:grid-cols-[1fr_1.5fr] ${containerWidth(theme)}`}>
        <div className="md:sticky md:top-8 md:self-start">
          <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: theme.accent }}>◼ {str(content.heading, "Capabilities")}</p>
          <h2 className="mt-3" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.4rem * ${theme.headingScale})`, fontWeight: 700, lineHeight: 1.05 }}>{str(content.title)}</h2>
          <p className="mt-3 text-sm opacity-60">{str(content.description)}</p>
        </div>
        <div className="space-y-3">
          {items.map((it, i) => (
            <div key={i} className="group border border-white/15 p-6 transition hover:border-white/40" style={{ borderRadius: theme.radius * 1.2 }}>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-bold" style={{ fontFamily: fontStack(theme.fontHeading) }}><span className="mr-2 font-mono text-xs" style={{ color: theme.accent }}>0{i + 1}</span>{it.title}</h3>
                {it.price && <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: theme.accent }}>{it.price}</span>}
              </div>
              <p className="mt-1.5 text-sm opacity-65">{it.description}</p>
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
        <div className="flex items-end justify-between">
          <h2 style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.6rem * ${theme.headingScale})`, fontWeight: 700, letterSpacing: "-0.03em" }}>{str(content.title, "Case work")}</h2>
          <span className="rounded-full px-3 py-1 font-mono text-[11px] font-bold" style={{ background: theme.surface }}>{items.length} cases</span>
        </div>
        <div className="mt-10 space-y-10">
          {items.map((p, i) => (
            <article key={i} className={`grid items-stretch gap-5 md:grid-cols-2 ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <div className="relative min-h-64 overflow-hidden" style={{ borderRadius: theme.radius * 1.3 }}>
                {p.image ? <img src={p.image} alt={p.title} className="absolute inset-0 h-full w-full object-cover" /> : (
                  <EmptyArt theme={theme} glyph={String(i + 1).padStart(2, "0")} caption={arr<string>(p.tags)[0] || "Case work"} className="absolute inset-0" />
                )}
                <span className="absolute left-4 top-4 rounded-full bg-black/50 px-2.5 py-1 font-mono text-[10px] text-white">{arr<string>(p.tags)[0] || "Case"}</span>
              </div>
              <div className="flex flex-col justify-center border p-7" style={{ borderRadius: theme.radius * 1.3, borderColor: theme.surface }}>
                <h3 className="text-2xl font-bold tracking-tight" style={{ fontFamily: fontStack(theme.fontHeading) }}>{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: theme.muted }}>{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">{arr<string>(p.tags).map((tg, j) => <span key={j} className="rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: theme.surface }}>{tg}</span>)}</div>
                <a href={p.url || "#"} className="mt-5 text-sm font-bold underline underline-offset-4">Read the case ↗</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process: C = ({ content, theme }) => {
  const steps = arr<{ title: string; description: string }>(content.steps);
  return (
    <section className={sectionPad(theme)} style={{ background: theme.surface }}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <h2 className="text-center" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})`, fontWeight: 700 }}>{str(content.title, "How we'll work")}</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {steps.map((st, i) => (
            <div key={i} className="relative bg-white p-6 pt-8" style={{ borderRadius: theme.radius * 1.2 }}>
              <span className="absolute -top-4 left-5 flex h-9 w-9 rotate-3 items-center justify-center rounded-lg text-sm font-black text-white" style={{ background: theme.accent }}>{i + 1}</span>
              <h3 className="font-bold" style={{ fontFamily: fontStack(theme.fontHeading) }}>{st.title}</h3>
              <p className="mt-1.5 text-[13px]" style={{ color: theme.muted }}>{st.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Team: C = ({ content, theme }) => {
  const members = arr<{ name: string; role: string; photo: string; bio: string }>(content.members);
  return (
    <section className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <h2 style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})`, fontWeight: 700 }}>{str(content.title, "No juniors, no hand-offs")}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {members.map((m, i) => (
            <div key={i} className="group">
              <div className="relative aspect-[4/5] overflow-hidden" style={{ borderRadius: theme.radius * 1.2 }}>
                {m.photo ? <img src={m.photo} alt={m.name} className="h-full w-full object-cover" /> : (
                  <EmptyArt theme={theme} glyph={m.name.split(" ").map((w) => w[0]).join("")} caption="Studio" className="absolute inset-0" />
                )}
                <span className="absolute bottom-3 left-3 rounded-full px-3 py-1 text-[11px] font-bold text-white" style={{ background: theme.primary }}>{m.role}</span>
              </div>
              <h3 className="mt-3 font-bold">{m.name}</h3>
              <p className="text-[13px]" style={{ color: theme.muted }}>{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials: C = ({ content, theme }) => {
  const items = arr<{ name: string; role: string; company: string; message: string }>(content.items);
  return (
    <section className={sectionPad(theme)} style={{ background: theme.primary, color: "#fff" }}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: theme.accent }}>★★★★★ {str(content.heading, "Client proof")}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {items.map((t0, i) => (
            <figure key={i} className={`border border-white/15 p-6 ${i === 1 ? "md:-rotate-1" : i === 2 ? "md:rotate-1" : ""}`} style={{ borderRadius: theme.radius * 1.2, background: "rgba(255,255,255,0.05)" }}>
              <blockquote className="text-sm leading-relaxed">“{t0.message}”</blockquote>
              <figcaption className="mt-4 text-[13px]"><span className="font-bold">{t0.name}</span><br /><span className="opacity-60">{t0.role}, {t0.company}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

const Cta: C = ({ content, theme }) => (
  <section className={sectionPad(theme)}>
    <div className={`mx-auto px-6 text-center ${containerWidth(theme)}`}>
      <span className="inline-block rotate-2 rounded-full px-3 py-1 text-xs font-bold text-white" style={{ background: theme.accent }}>● 2 slots left for Q3</span>
      <h2 className="mx-auto mt-4 max-w-2xl" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.8rem * ${theme.headingScale})`, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.02 }}>{str(content.title)}</h2>
      <p className="mx-auto mt-3 max-w-lg text-sm" style={{ color: theme.muted }}>{str(content.description)}</p>
      <a href="#contact" className={`${btnRadius(theme)} mt-7 inline-block px-8 py-3.5 text-sm font-bold text-white`} style={{ background: theme.primary }}>{str(content.primaryCta, "Start a project ↗")}</a>
    </div>
  </section>
);

const Footer: C = ({ content, theme }) => (
  <footer className="px-6 pb-8 pt-14" style={{ background: "#0f0f12", color: "#fff" }}>
    <div className={`mx-auto ${containerWidth(theme)}`}>
      <p className="leading-none" style={{ fontFamily: fontStack(theme.fontHeading), fontWeight: 700, letterSpacing: "-0.035em", fontSize: "clamp(2.6rem, 8vw, 5.5rem)" }}>{str(content.tagline, "Let's build ↗")}</p>
      <div className="mt-8 flex flex-col gap-3 border-t border-white/15 pt-6 text-[13px] md:flex-row md:items-center md:justify-between">
        <span className="opacity-60">{str(content.copyright)}</span>
        <div className="flex gap-5 font-semibold"><a href="#work">Work</a><a href="#about">Studio</a><a href="#contact">Contact</a></div>
      </div>
    </div>
  </footer>
);

export const seed: Partial<Record<SectionType, Record<string, unknown>>> = {
  navbar: { logo: "Studio Himal", links: [{ label: "Work", href: "#work" }, { label: "Studio", href: "#about" }, { label: "Contact", href: "#contact" }], cta: "Start a project" },
  hero: {
    eyebrow: "Booking projects for 2083", title: "We ship brands that win", subtitle: "",
    description: "Studio Himal is a senior-only design and engineering team in Lalitpur. Brand, website and product, under one roof, shipped in weeks.",
    primaryCta: "See the work", secondaryCta: "Our process", image: "",
    stats: [{ value: "60+", label: "Launches" }, { value: "9", label: "Awards" }, { value: "6 wks", label: "Avg. timeline" }],
  },
  services: {
    heading: "Capabilities", title: "Everything you need to launch", description: "Fixed-scope sprints with senior people only.",
    items: [
      { title: "Brand Identity", description: "Naming, logo, type and voice, a complete kit in three weeks.", icon: "", price: "from Rs. 3,50,000" },
      { title: "Web Design and Build", description: "Marketing sites and product UI, designed and shipped by the same team.", icon: "", price: "from Rs. 5,50,000" },
      { title: "Design Engineering", description: "Design systems and component libraries your team will actually use.", icon: "", price: "from Rs. 4,25,000" },
    ],
  },
  projects: {
    heading: "Case work", title: "Recent wins", description: "",
    items: [
      { title: "Sajilo Rentals", description: "Rebrand plus booking platform. Trial signups up 3x in 90 days.", image: "", tags: ["Brand", "Web", "Booking"], url: "#", github: "#" },
      { title: "Kumari Pay", description: "Product UI for a fintech scale-up. Onboarding completion doubled.", image: "", tags: ["Product", "Design system"], url: "#", github: "#" },
      { title: "Fern and Field", description: "E-commerce for a Jhamsikhel plant studio. Order value up 44 percent.", image: "", tags: ["E-commerce", "Brand"], url: "#", github: "#" },
    ],
  },
  process: {
    heading: "Process", title: "How we will work",
    steps: [
      { title: "Sprint 0", description: "Stakeholders, audit and a plan you can hold us to.", icon: "" },
      { title: "Design", description: "Weekly drops in Figma. Real content, Nepali and English.", icon: "" },
      { title: "Build", description: "Clean code, CMS, analytics and QA baked in.", icon: "" },
      { title: "Launch", description: "Ship, measure, and a 30-day tune-up included.", icon: "" },
    ],
  },
  team: {
    heading: "Team", title: "No juniors, no hand-offs",
    members: [
      { name: "Aayush Neupane", role: "Founder, Design", photo: "", bio: "Ex-agency CD. 10 years, 80 plus launches." },
      { name: "Sabin Shrestha", role: "Engineering Lead", photo: "", bio: "Full-stack. Ships fast, tests everything." },
      { name: "Prerana Karki", role: "Brand Director", photo: "", bio: "Identity systems with actual personality." },
    ],
  },
  testimonials: {
    heading: "Client proof", title: "Loved by founders",
    items: [
      { name: "Nina Shrestha", role: "CEO", company: "Sajilo Rentals", message: "They operate like co-founders. Best money we have spent.", photo: "" },
      { name: "Omar Shrestha", role: "Founder", company: "Kumari Pay", message: "Design quality you would expect at 3x the price.", photo: "" },
      { name: "Liv Chen", role: "CMO", company: "Fern and Field", message: "The site paid for itself before launch day ended.", photo: "" },
    ],
  },
  cta: { title: "Have something ambitious? Lets build it.", description: "Tell us where you are headed, we will reply within one business day.", primaryCta: "Start a project", secondaryCta: "" },
  footer: { tagline: "Lets build", copyright: "2026 Studio Himal, Jhamsikhel, Lalitpur.", showSocial: true },
};

export const components: Record<string, C> = {
  "navbar:bold": Navbar,
  "hero:poster": Hero,
  "services:split": Services,
  "projects:editorial": Projects,
  "process:steps": Process,
  "team:grid": Team,
  "testimonials:grid": Testimonials,
  "cta:banner": Cta,
  "footer:big": Footer,
};
