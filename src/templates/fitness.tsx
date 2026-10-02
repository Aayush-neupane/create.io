/**
 * Forge — bespoke predesigned library.
 * Brutalist gym system: brick-on-charcoal masthead, giant condensed hero,
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
    <nav className="sticky top-0 z-30 border-b border-white/10" style={{ background: theme.background }}>
      <div className={`mx-auto flex items-center justify-between px-6 py-3.5 ${containerWidth(theme)}`}>
        <span className="flex items-center gap-2 font-black uppercase" style={{ fontFamily: fontStack(theme.fontHeading), letterSpacing: "0.02em" }}>
          <span className="grid h-8 w-8 place-items-center rounded-sm text-sm font-black" style={{ background: theme.accent, color: "#0b0d0c" }}>F</span>
          {str(content.logo, "Forge")}
        </span>
        <div className="hidden gap-7 text-[13px] font-bold uppercase tracking-wider md:flex" style={{ color: theme.muted }}>
          {links.map((l, i) => <a key={i} href={l.href} className="transition-colors hover:text-white">{l.label}</a>)}
        </div>
        {str(content.cta) ? (
          <a href={str(content.ctaHref) || "#contact"} className="rounded-sm px-4 py-2 text-[13px] font-black uppercase tracking-wide transition-transform duration-200 hover:-translate-y-px" style={{ background: theme.accent, color: "#0b0d0c" }}>
            {str(content.cta)}
          </a>
        ) : null}
      </div>
    </nav>
  );
};

const Hero: C = ({ content, theme }) => (
  <section className="relative overflow-hidden" style={{ background: theme.background }}>
    <div className={`mx-auto px-6 pb-14 pt-16 md:pb-20 md:pt-24 ${containerWidth(theme)}`}>
      <p className="inline-block rounded-sm px-3 py-1 font-mono text-xs font-bold uppercase" style={{ background: theme.accent, color: "#0b0d0c", letterSpacing: "0.18em" }}>{str(content.eyebrow, "Lazimpat · Est. 2018")}</p>
      <h1 className="mt-5 uppercase" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `clamp(2.6rem, 11vw, calc(4rem * ${theme.headingScale}))`, fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.01em" }}>
        {str(content.title, "Strong looks good on you")}
      </h1>
      <p className="mt-5 max-w-xl text-[15px] leading-relaxed" style={{ color: theme.muted }}>{str(content.description)}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        {str(content.primaryCta) ? <a href={str(content.primaryHref) || "#contact"} className="t-btn rounded-sm px-7 py-3.5 text-sm font-black uppercase tracking-wide" style={{ background: theme.accent, color: "#0b0d0c" }}>{str(content.primaryCta)}</a> : null}
        {str(content.secondaryCta) && <a href={str(content.secondaryHref) || "#gallery"} className="t-btn rounded-sm border border-white/25 px-7 py-3.5 text-sm font-bold uppercase tracking-wide">{str(content.secondaryCta)}</a>}
      </div>
      {str(content.image) && <img src={str(content.image)} alt={str(content.title)} loading="lazy" decoding="async" className="mt-10 aspect-[16/7] w-full object-cover" style={{ borderRadius: theme.radius }} />}
    </div>
    <div className="marquee overflow-hidden border-y border-white/10 py-2.5" aria-hidden>
      <div className="marquee-track">
        {[0, 1].map((dup) => (
          <span key={dup} className="whitespace-nowrap font-mono text-xs font-bold uppercase" style={{ letterSpacing: "0.3em", color: theme.accent }}>
            No shortcuts · Just reps · No shortcuts · Just reps · No shortcuts · Just reps ·&nbsp;
          </span>
        ))}
      </div>
    </div>
  </section>
);

const Pricing: C = ({ content, theme }) => {
  const items = arr<{ name: string; price: string; period: string; description: string; features: string[]; featured: boolean }>(content.items);
  return (
    <section id="pricing" className={sectionPad(theme)}>
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

const Banner: C = ({ content, theme }) => (
  <div className="px-4 py-2 text-center font-mono text-[12px] font-black uppercase" style={{ background: theme.accent, color: "#0b0d0c", letterSpacing: "0.14em" }}>
    {str(content.message, "First week free")}
    {str(content.linkHref) && str(content.linkLabel) && <a href={str(content.linkHref)} className="ml-2 underline underline-offset-4">{str(content.linkLabel)} →</a>}
  </div>
);

const Stats: C = ({ content, theme }) => {
  const items = arr<{ value: string; label: string }>(content.items);
  return (
    <section className="border-y border-white/10" style={{ background: theme.background }}>
      <dl className={`mx-auto grid grid-cols-2 px-6 md:grid-cols-4 ${containerWidth(theme)}`}>
        {items.map((st, i) => (
          <div key={i} className="border-l border-white/10 px-6 py-8 first:border-l-0 max-md:[&:nth-child(3)]:border-l-0 max-md:[&:nth-child(n+3)]:border-t max-md:[&:nth-child(n+3)]:border-white/10">
            <dt className="text-4xl font-black tabular-nums md:text-5xl" style={{ fontFamily: fontStack(theme.fontHeading), color: theme.accent }}>{st.value}</dt>
            <dd className="mt-1 font-mono text-[11px] font-bold uppercase tracking-widest" style={{ color: theme.muted }}>{st.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

const Team: C = ({ content, theme }) => {
  const members = arr<{ name: string; role: string; photo: string; bio: string }>(content.members);
  return (
    <section id="team" className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <p className="font-mono text-xs font-bold uppercase" style={{ letterSpacing: "0.22em", color: theme.accent }}>{str(content.heading, "Coaches")}</p>
        <h2 className="mt-2 uppercase" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.4rem * ${theme.headingScale})`, fontWeight: 800 }}>{str(content.title)}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {members.map((m, i) => (
            <article key={i} className="group border border-white/15 transition-all duration-300 hover:-translate-y-1" style={{ borderRadius: theme.radius, background: theme.surface }}>
              <div className="relative aspect-[4/5] overflow-hidden" style={{ borderRadius: `${theme.radius}px ${theme.radius}px 0 0`, background: theme.background }}>
                {m.photo ? <img src={m.photo} alt={m.name} loading="lazy" decoding="async" className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" /> : (
                  <div className="grid h-full place-items-center">
                    <span className="font-black uppercase" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "4rem", color: theme.accent }}>{m.name.slice(0, 1) || "F"}</span>
                  </div>
                )}
                <span className="absolute left-4 top-4 rounded-sm bg-black px-2 py-1 font-mono text-[11px] font-black" style={{ color: theme.accent }}>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="p-5">
                <h3 className="font-black uppercase" style={{ fontFamily: fontStack(theme.fontHeading) }}>{m.name}</h3>
                <p className="font-mono text-[11px] font-bold uppercase tracking-widest" style={{ color: theme.accent }}>{m.role}</p>
                <p className="mt-2 text-sm" style={{ color: theme.muted }}>{m.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery: C = ({ content, theme }) => {
  const images = arr<string>(content.images);
  return (
    <section id="gallery" className={sectionPad(theme)} style={{ background: theme.surface }}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="uppercase" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})`, fontWeight: 800 }}>{str(content.title, "The floor")}</h2>
          <p className="font-mono text-xs font-bold uppercase" style={{ color: theme.muted }}>{images.length} frames</p>
        </div>
        <div className="no-bar snap-row mt-8 flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
          {images.map((img, i) => (
            <div key={i} className="group relative aspect-square w-[68%] flex-none overflow-hidden border border-white/10 sm:w-[38%] md:w-auto" style={{ borderRadius: theme.radius, background: theme.background }}>
              {img ? <img src={img} alt={`Gym ${i + 1}`} loading="lazy" decoding="async" className="h-full w-full object-cover grayscale-[35%] transition-all duration-500 group-hover:grayscale-0" /> : (
                <div className="grid h-full min-h-44 place-items-center">
                  <span className="font-black" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "3rem", color: theme.accent }}>{String(i + 1).padStart(2, "0")}</span>
                </div>
              )}
              <span className="absolute bottom-2 left-2 rounded-sm bg-black px-1.5 py-0.5 font-mono text-[10px] font-black" style={{ color: theme.accent }}>{String(i + 1).padStart(2, "0")}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Faq: C = ({ content, theme }) => {
  const items = arr<{ q: string; a: string }>(content.items);
  return (
    <section className={sectionPad(theme)}>
      <div className={`mx-auto max-w-3xl px-6 ${containerWidth(theme)}`}>
        <p className="font-mono text-xs font-bold uppercase" style={{ letterSpacing: "0.22em", color: theme.accent }}>{str(content.heading, "No excuses")}</p>
        <h2 className="mt-2 uppercase" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})`, fontWeight: 800 }}>{str(content.title)}</h2>
        <div className="mt-8 space-y-3">
          {items.map((f, i) => (
            <details key={i} className="group border border-white/15" style={{ borderRadius: theme.radius, background: theme.surface }}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-bold uppercase tracking-wide [&::-webkit-details-marker]:hidden" style={{ fontSize: "0.95rem" }}>
                <span><span className="mr-3 font-mono" style={{ color: theme.accent }}>{String(i + 1).padStart(2, "0")}</span>{f.q}</span>
                <span aria-hidden className="grid h-8 w-8 flex-none place-items-center rounded-sm text-lg font-black transition-transform duration-300 group-open:rotate-45" style={{ background: theme.accent, color: "#0b0d0c" }}>+</span>
              </summary>
              <div className="faq-a"><div><p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: theme.muted }}>{f.a}</p></div></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

const Cta: C = ({ content, theme }) => (
  <section id="contact" className={sectionPad(theme)}>
    <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
      <div className="relative overflow-hidden px-8 py-14 text-center md:py-20" style={{ borderRadius: theme.radius, background: theme.accent, color: "#0b0d0c" }}>
        <p aria-hidden className="pointer-events-none absolute inset-x-0 top-3 whitespace-nowrap font-mono text-xs font-black uppercase opacity-40" style={{ letterSpacing: "0.3em" }}>No card · No excuses · No card · No excuses</p>
        <h2 className="mx-auto mt-4 max-w-2xl uppercase" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.6rem * ${theme.headingScale})`, fontWeight: 800, lineHeight: 0.98 }}>{str(content.title)}</h2>
        {str(content.description) && <p className="mx-auto mt-4 max-w-xl font-medium opacity-80">{str(content.description)}</p>}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {str(content.primaryCta) ? <a href={str(content.primaryHref) || "#contact"} className="t-btn rounded-sm bg-black px-7 py-3.5 text-sm font-black uppercase tracking-wide text-white">{str(content.primaryCta)}</a> : null}
          {str(content.secondaryCta) && <a href={str(content.secondaryHref) || "#contact"} className="t-btn rounded-sm border-2 border-black/70 px-7 py-3.5 text-sm font-black uppercase tracking-wide">{str(content.secondaryCta)}</a>}
        </div>
      </div>
    </div>
  </section>
);

const Footer: C = ({ content, theme }) => (
  <footer className="border-t border-white/10 px-6 pb-10 pt-14" style={{ background: theme.background }}>
    <div className={`mx-auto ${containerWidth(theme)}`}>
      <p className="uppercase" style={{ fontFamily: fontStack(theme.fontHeading), fontWeight: 800, fontSize: "clamp(3rem, 9vw, 6rem)", lineHeight: 0.95, letterSpacing: "-0.01em" }}>
        Train <span style={{ color: theme.accent }}>dirty.</span>
      </p>
      <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 font-mono text-xs uppercase tracking-widest md:flex-row md:items-center md:justify-between" style={{ color: theme.muted }}>
        <p>{str(content.copyright, "2026 Forge Fitness.")}</p>
        <p>{str(content.tagline, "Strong looks good on you.")}</p>
        <a href="#top" className="font-black transition-all hover:-translate-y-0.5" style={{ color: theme.accent }}>Top ↑</a>
      </div>
    </div>
  </footer>
);

export const seed: Partial<Record<SectionType, Record<string, unknown>>> = {
  navbar: { logo: "Forge", links: [{ label: "Coaches", href: "#team" }, { label: "Plans", href: "#pricing" }, { label: "The gym", href: "#gallery" }, { label: "Join", href: "#contact" }], cta: "Join now", ctaHref: "#contact" },
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
  "banner:dark": Banner,
  "hero:poster": Hero,
  "stats:band": Stats,
  "pricing:tiers": Pricing,
  "team:grid": Team,
  "gallery:grid": Gallery,
  "faq:accordion": Faq,
  "cta:banner": Cta,
  "footer:big": Footer,
};
