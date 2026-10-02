/**
 * Forge — bespoke predesigned library.
 * Brutalist gym system: volt-on-charcoal masthead, giant condensed hero,
 * dark membership pricing. No soft corners, no apologies.
 */
import type { SectionType } from "@/types/builder";
import { fontStack, containerWidth, sectionPad, btnRadius, str, arr } from "@/components/sections/Sections";
import type { BespokeProps } from "./minimal-portfolio";
import { withPages } from "./minimal-portfolio";

type C = (props: BespokeProps) => React.ReactNode;

const Navbar: C = ({ content, theme, pages }) => {
  const links = withPages(content, pages);
  return (
    <nav className="sticky top-0 z-30 border-b border-white/10" style={{ background: `color-mix(in srgb, ${theme.background} 88%, transparent)`, backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}>
      <div className={`mx-auto flex items-center justify-between px-6 py-3.5 ${containerWidth(theme)}`}>
        <span className="flex items-center gap-2 font-black uppercase" style={{ fontFamily: fontStack(theme.fontHeading), letterSpacing: "0.02em" }}>
          <span className="grid h-8 w-8 place-items-center rounded-sm text-sm font-black" style={{ background: theme.accent, color: "#0b0d0c" }}>F</span>
          {str(content.logo, "Forge")}
        </span>
        <div className="hidden gap-7 text-[13px] font-bold uppercase tracking-wider md:flex" style={{ color: theme.muted }}>
          {links.map((l, i) => <a key={i} href={l.href} className="transition-colors hover:text-white">{l.label}</a>)}
        </div>
        <a href={str(content.ctaHref) || "#contact"} className="rounded-sm px-4 py-2 text-[13px] font-black uppercase tracking-wide transition-transform duration-200 hover:-translate-y-px" style={{ background: theme.accent, color: "#0b0d0c" }}>
          {str(content.cta) || "Join now"}
        </a>
      </div>
    </nav>
  );
};

const Hero: C = ({ content, theme }) => (
  <section className="relative overflow-hidden" style={{ background: theme.background }}>
    <div className={`mx-auto px-6 pb-14 pt-16 md:pb-20 md:pt-24 ${containerWidth(theme)}`}>
      <p className="inline-block rounded-sm px-3 py-1 font-mono text-xs font-bold uppercase" style={{ background: theme.accent, color: "#0b0d0c", letterSpacing: "0.18em" }}>{str(content.eyebrow, "Lazimpat · Est. 2018")}</p>
      <h1 className="mt-5 uppercase" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(4rem * ${theme.headingScale})`, fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.01em" }}>
        {str(content.title, "Strong looks good on you")}
      </h1>
      <p className="mt-5 max-w-xl text-[15px] leading-relaxed" style={{ color: theme.muted }}>{str(content.description)}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={str(content.primaryHref) || "#contact"} className="t-btn rounded-sm px-7 py-3.5 text-sm font-black uppercase tracking-wide" style={{ background: theme.accent, color: "#0b0d0c" }}>{str(content.primaryCta, "Claim free week")}</a>
        {str(content.secondaryCta) && <a href={str(content.secondaryHref) || "#work"} className="t-btn rounded-sm border border-white/25 px-7 py-3.5 text-sm font-bold uppercase tracking-wide">{str(content.secondaryCta)}</a>}
      </div>
      {str(content.image) && <img src={str(content.image)} alt={str(content.title)} loading="lazy" decoding="async" className="mt-10 aspect-[16/7] w-full object-cover" style={{ borderRadius: theme.radius }} />}
    </div>
    <div className="overflow-hidden border-y border-white/10 py-2.5" aria-hidden>
      <p className="whitespace-nowrap font-mono text-xs font-bold uppercase" style={{ letterSpacing: "0.3em", color: theme.accent }}>No shortcuts · Just reps · No shortcuts · Just reps · No shortcuts · Just reps</p>
    </div>
  </section>
);

const Pricing: C = ({ content, theme }) => {
  const items = arr<{ name: string; price: string; period: string; description: string; features: string[]; featured: boolean }>(content.items);
  return (
    <section className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <p className="font-mono text-xs font-bold uppercase" style={{ letterSpacing: "0.22em", color: theme.accent }}>{str(content.heading, "Membership")}</p>
        <h2 className="mt-2 uppercase" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.4rem * ${theme.headingScale})`, fontWeight: 800 }}>{str(content.title, "Pick your poison")}</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map((p, i) => (
            <div key={i} className="relative border border-white/15 p-7 transition-transform duration-300 hover:-translate-y-1" style={{ borderRadius: theme.radius, background: p.featured ? theme.accent : theme.surface, color: p.featured ? "#0b0d0c" : undefined }}>
              {p.featured && <span className="absolute -top-3 left-6 rounded-sm bg-white px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-neutral-900">Most forged</span>}
              <h3 className="font-black uppercase tracking-wide">{p.name}</h3>
              <p className="mt-2 text-4xl font-black tabular-nums" style={{ fontFamily: fontStack(theme.fontHeading) }}>{p.price}</p>
              <p className="text-xs font-bold uppercase tracking-widest opacity-70">{p.period} · {p.description}</p>
              <ul className="mt-5 space-y-2 text-sm font-medium">{arr<string>(p.features).map((f, j) => <li key={j}>▸ {f}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const seed: Partial<Record<SectionType, Record<string, unknown>>> = {
  navbar: { logo: "Forge", links: [{ label: "Coaches", href: "#team" }, { label: "Plans", href: "#pricing" }, { label: "Stories", href: "#testimonials" }, { label: "Join", href: "#contact" }], cta: "Join now", ctaHref: "#contact" },
  banner: { message: "First week free for new members — no card required", linkLabel: "Claim", linkHref: "#contact" },
  hero: {
    eyebrow: "Lazimpat · Est. 2018", title: "Strong looks good on you", subtitle: "",
    description: "24/7 iron paradise with Nepal's friendliest coaches. Powerlifting, calisthenics, Zumba at dawn — first week is on us.",
    primaryCta: "Claim free week", secondaryCta: "See the gym", primaryHref: "#contact", secondaryHref: "#gallery", image: "", stats: [],
  },
  stats: {
    heading: "The forge record", title: "", description: "",
    items: [
      { value: "900+", label: "Members" },
      { value: "14", label: "Coaches" },
      { value: "40+", label: "Weekly classes" },
      { value: "24/7", label: "Always open" },
    ],
  },
  pricing: {
    heading: "Membership", title: "Pick your poison",
    items: [
      { name: "Day pass", price: "Rs. 500", period: "per visit", description: "Drop in and lift.", features: ["Full floor access", "Locker + shower", "One group class"], featured: false },
      { name: "Monthly", price: "Rs. 3,500", period: "per month", description: "The regulars' choice.", features: ["Everything in Day pass", "All group classes", "Diet chart", "1 PT session"], featured: true },
      { name: "Annual", price: "Rs. 32,000", period: "per year", description: "Commit and save.", features: ["Everything in Monthly", "4 PT sessions", "Guest passes", "Forge t-shirt"], featured: false },
    ],
  },
  team: {
    heading: "Coaches", title: "Suffer with the best",
    members: [
      { name: "Bibek R.", role: "Head Coach · Powerlifting", photo: "", bio: "National champion, 180kg deadlift, zero tolerance for skipped leg day." },
      { name: "Anisha S.", role: "Zumba & Mobility", photo: "", bio: "Dawn classes that feel like Dashain dancing, minus the tika." },
      { name: "Dipesh K.", role: "Calisthenics", photo: "", bio: "From zero pull-ups to muscle-ups — his specialty is beginners." },
    ],
  },
  gallery: { heading: "The floor", title: "Iron paradise", images: ["", "", "", "", "", ""] },
  faq: {
    heading: "No excuses", title: "Asked at the desk",
    items: [
      { q: "I have never lifted. Where do I start?", a: "Free week includes a starter assessment and two coached sessions. Everyone starts light." },
      { q: "Is it open during load-shedding hours?", a: "We run on inverter + generator. Lights, music and fans never stop — only you do." },
      { q: "Do you have plans for students?", a: "Yes — Rs. 2,500/month with a valid college ID, plus exam-month freeze." },
    ],
  },
  cta: { title: "First week free. No card, no excuses.", description: "Walk in any day before 9pm and train. If you hate it, never come back.", primaryCta: "Claim free week", secondaryCta: "Talk to a coach", primaryHref: "#contact", secondaryHref: "#contact" },
  contact: { heading: "Join", title: "Come lift with us", email: "train@forgegym.com.np", phone: "98-12121212", location: "Lazimpat, Kathmandu (above the bakery)", body: "Open 24/7. Staffed 6am–9pm. Ring the bell after midnight." },
  footer: { tagline: "Forge — strong looks good on you.", copyright: "2026 Forge Fitness, Lazimpat.", showSocial: true },
};

export const components: Record<string, C> = {
  "navbar:bold": Navbar,
  "hero:poster": Hero,
  "pricing:tiers": Pricing,
};
