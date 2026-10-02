/**
 * Consultant Pro — bespoke predesigned library.
 * Dossier system: utility bar, numbered briefings, tables and stamps of proof.
 */
import type { SectionType } from "@/types/builder";
import { fontStack, containerWidth, sectionPad, btnRadius, str, arr } from "@/components/sections/Sections";
import type { BespokeProps } from "./minimal-portfolio";
import { withPages } from "./minimal-portfolio";

type C = (props: BespokeProps) => React.ReactNode;

const Navbar: C = ({ content, theme, pages }) => {
  const links = withPages(content, pages);
  return (
    <header>
      <div style={{ background: theme.primary, color: "#fff" }}>
        <div className={`mx-auto flex items-center justify-between px-6 py-1.5 font-mono text-[11px] ${containerWidth(theme)}`}>
          <span className="opacity-80">Trusted since 2012 — 120+ engagements</span>
          <a href="#contact" className="underline underline-offset-2">Book a consultation →</a>
        </div>
      </div>
      <nav className="border-b" style={{ borderColor: theme.surface, background: theme.background }}>
        <div className={`mx-auto flex items-center justify-between px-6 py-4 ${containerWidth(theme)}`}>
          <span className="flex items-center gap-2 font-bold" style={{ fontFamily: fontStack(theme.fontHeading) }}>
            <span className="flex h-8 w-8 items-center justify-center rounded text-sm font-black text-white" style={{ background: theme.primary }}>H</span>
            {str(content.logo, "Harbor & Co.")}
          </span>
          <div className="hidden gap-6 text-sm font-medium md:flex" style={{ color: theme.muted }}>
            {links.map((l, i) => <a key={i} href={l.href} className="hover:opacity-70">{l.label}</a>)}
          </div>
          <a href="#contact" className={`${btnRadius(theme)} px-4 py-2 text-sm font-semibold text-white`} style={{ background: theme.primary }}>{str(content.cta) || "Get in touch"}</a>
        </div>
      </nav>
    </header>
  );
};

const Hero: C = ({ content, theme }) => {
  const stats = arr<{ value: string; label: string }>(content.stats);
  return (
    <section className={sectionPad(theme)} style={{ background: theme.surface }}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <p className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold" style={{ borderColor: theme.primary, color: theme.primary }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: theme.primary }} />{str(content.eyebrow, "Briefing 01 — Who we help")}
        </p>
        <h1 className="mt-5 max-w-3xl" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.9rem * ${theme.headingScale})`, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.08 }}>
          {str(content.title)}
        </h1>
        <p className="mt-4 max-w-2xl" style={{ color: theme.muted }}>{str(content.description)}</p>
        <div className="mt-7 flex gap-3">
          <a href="#contact" className={`${btnRadius(theme)} px-5 py-2.5 text-sm font-semibold text-white`} style={{ background: theme.primary }}>{str(content.primaryCta, "Book a consultation")}</a>
          <a href="#work" className={`${btnRadius(theme)} border bg-white px-5 py-2.5 text-sm font-semibold`} style={{ borderColor: theme.surface }}>See results</a>
        </div>
        {stats.length > 0 && (
          <dl className="mt-10 grid grid-cols-3 gap-4">
            {stats.map((st, i) => (
              <div key={i} className="border bg-white p-5" style={{ borderRadius: theme.radius, borderColor: theme.surface }}>
                <dt className="text-2xl font-bold" style={{ fontFamily: fontStack(theme.fontHeading), color: theme.primary }}>{st.value}</dt>
                <dd className="mt-1 text-xs" style={{ color: theme.muted }}>{st.label}</dd>
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
    <section id="work" className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <p className="font-mono text-xs" style={{ color: theme.muted }}>02 — {str(content.heading, "Practice areas")}</p>
        <h2 className="mt-2" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2rem * ${theme.headingScale})`, fontWeight: 700 }}>{str(content.title, "How I can help")}</h2>
        <div className="mt-8 overflow-hidden border" style={{ borderRadius: theme.radius, borderColor: theme.surface }}>
          {items.map((it, i) => (
            <div key={i} className="grid gap-2 border-b p-6 last:border-0 md:grid-cols-[56px_1fr_auto] md:items-start" style={{ borderColor: theme.surface, background: i % 2 ? theme.surface : theme.background }}>
              <span className="font-mono text-sm font-bold" style={{ color: theme.primary }}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-semibold" style={{ fontFamily: fontStack(theme.fontHeading) }}>{it.title}</h3>
                <p className="mt-1 max-w-xl text-sm" style={{ color: theme.muted }}>{it.description}</p>
              </div>
              {it.price && <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: theme.primary, color: "#fff" }}>{it.price}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process: C = ({ content, theme }) => {
  const steps = arr<{ title: string; description: string }>(content.steps);
  return (
    <section className={sectionPad(theme)} style={{ background: theme.primary, color: "#fff" }}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <p className="font-mono text-xs opacity-60">03 — {str(content.heading, "Engagement model")}</p>
        <h2 className="mt-2" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2rem * ${theme.headingScale})`, fontWeight: 700 }}>{str(content.title)}</h2>
        <ol className="mt-8 grid gap-px overflow-hidden border border-white/20 md:grid-cols-4" style={{ borderRadius: theme.radius }}>
          {steps.map((st, i) => (
            <li key={i} className="p-6" style={{ background: "#2a4a73" }}>
              <p className="font-mono text-xs opacity-60">Phase {i + 1}</p>
              <h3 className="mt-2 font-semibold">{st.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed opacity-70">{st.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

const Testimonials: C = ({ content, theme }) => {
  const items = arr<{ name: string; role: string; company: string; message: string }>(content.items);
  return (
    <section className={sectionPad(theme)} style={{ background: theme.surface }}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <p className="font-mono text-xs" style={{ color: theme.muted }}>04 — {str(content.heading, "Client record")}</p>
        <h2 className="mt-2" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2rem * ${theme.headingScale})`, fontWeight: 700 }}>{str(content.title, "Results, in their words")}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((t0, i) => (
            <figure key={i} className="flex flex-col border-t-4 bg-white p-6" style={{ borderRadius: `0 0 ${theme.radius}px ${theme.radius}px`, borderColor: theme.surface, borderTopColor: theme.primary }}>
              <blockquote className="flex-1 text-sm leading-relaxed">“{t0.message}”</blockquote>
              <figcaption className="mt-5 border-t pt-4 text-[13px]" style={{ borderColor: theme.surface }}>
                <span className="font-bold">{t0.name}</span><br /><span style={{ color: theme.muted }}>{t0.role}, {t0.company}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing: C = ({ content, theme }) => {
  const items = arr<{ name: string; price: string; period: string; description: string; features: string[]; featured: boolean }>(content.items);
  return (
    <section className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <p className="font-mono text-xs" style={{ color: theme.muted }}>05 — {str(content.heading, "Engagement options")}</p>
        <h2 className="mt-2" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2rem * ${theme.headingScale})`, fontWeight: 700 }}>{str(content.title)}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((p, i) => (
            <div key={i} className="border p-7" style={{ borderRadius: theme.radius, borderColor: p.featured ? theme.primary : theme.surface, background: p.featured ? theme.primary : theme.background, color: p.featured ? "#fff" : undefined }}>
              <p className="font-mono text-[11px] uppercase tracking-widest opacity-70">{p.name}</p>
              <p className="mt-2 text-3xl font-bold" style={{ fontFamily: fontStack(theme.fontHeading) }}>{p.price}</p>
              <p className="text-[13px] opacity-70">{p.period} · {p.description}</p>
              <ul className="mt-5 space-y-2 text-sm">{arr<string>(p.features).map((f, j) => <li key={j} className="flex gap-2"><span>✓</span>{f}</li>)}</ul>
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
    <section className={sectionPad(theme)} style={{ background: theme.surface }}>
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-center font-mono text-xs" style={{ color: theme.muted }}>06 — {str(content.heading, "Due diligence")}</p>
        <h2 className="mt-2 text-center" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2rem * ${theme.headingScale})`, fontWeight: 700 }}>{str(content.title)}</h2>
        <div className="mt-8 divide-y border-y" style={{ borderColor: theme.background }}>
          {items.map((f, i) => (
            <details key={i} className="group py-5">
              <summary className="cursor-pointer list-none font-semibold"><span className="mr-3 font-mono text-xs" style={{ color: theme.primary }}>Q{i + 1}</span>{f.q}</summary>
              <p className="mt-2 pl-9 text-sm leading-relaxed" style={{ color: theme.muted }}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

const Cta: C = ({ content, theme }) => (
  <section className={sectionPad(theme)}>
    <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
      <div className="grid gap-6 p-10 md:grid-cols-[1fr_auto] md:items-center" style={{ borderRadius: theme.radius * 1.5, background: theme.primary, color: "#fff" }}>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-60">Next step</p>
          <h2 className="mt-2" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(1.9rem * ${theme.headingScale})`, fontWeight: 700 }}>{str(content.title)}</h2>
          <p className="mt-2 max-w-lg text-sm opacity-75">{str(content.description)}</p>
        </div>
        <a href="#contact" className={`${btnRadius(theme)} bg-white px-6 py-3 text-sm font-bold`} style={{ color: theme.primary }}>{str(content.primaryCta, "Book a consultation")}</a>
      </div>
    </div>
  </section>
);

const Footer: C = ({ content, theme }) => (
  <footer className="px-6 py-12" style={{ background: theme.surface }}>
    <div className={`mx-auto grid gap-8 md:grid-cols-[1.4fr_1fr_1fr] ${containerWidth(theme)}`}>
      <div>
        <p className="flex items-center gap-2 font-bold" style={{ fontFamily: fontStack(theme.fontHeading) }}>
          <span className="flex h-7 w-7 items-center justify-center rounded text-xs font-black text-white" style={{ background: theme.primary }}>H</span>
          {str(content.tagline, "Harbor & Co. Consulting")}
        </p>
        <p className="mt-2 text-xs" style={{ color: theme.muted }}>{str(content.copyright)}</p>
      </div>
      <div>
        <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: theme.muted }}>Index</p>
        <div className="mt-3 flex flex-col gap-2 text-sm"><a href="#work" className="hover:opacity-70">Practice areas</a><a href="#about" className="hover:opacity-70">About</a><a href="#contact" className="hover:opacity-70">Contact</a></div>
      </div>
      <div>
        <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: theme.muted }}>Office</p>
        <p className="mt-3 text-sm" style={{ color: theme.muted }}>100 Federal St, Boston<br />Mon–Fri, 9–6 ET</p>
      </div>
    </div>
  </footer>
);

export const seed: Partial<Record<SectionType, Record<string, unknown>>> = {
  navbar: { logo: "Himalaya Advisors", links: [{ label: "Practice", href: "#work" }, { label: "Results", href: "#results" }, { label: "FAQ", href: "#faq" }], cta: "Get in touch" },
  hero: {
    eyebrow: "Briefing 01, who we help", title: "Clarity for complex decisions", subtitle: "",
    description: "Himalaya Advisors helps Nepali founders cut through noise, pricing, hiring and growth strategy for companies doing Rs. 1-50 crore.",
    primaryCta: "Book a consultation", secondaryCta: "", image: "",
    stats: [{ value: "80+", label: "Engagements" }, { value: "92%", label: "Repeat clients" }, { value: "12 yrs", label: "In practice" }],
  },
  services: {
    heading: "Practice areas", title: "How we can help", description: "",
    items: [
      { title: "Growth Strategy", description: "A 4-week diagnostic ending in a sequenced 12-month plan with owners and metrics.", icon: "", price: "from Rs. 3,20,000" },
      { title: "Pricing and Packaging", description: "Research-backed repackaging that lifts average revenue without churning your base.", icon: "", price: "from Rs. 2,40,000" },
      { title: "Operator Coaching", description: "Monthly working sessions for founders stepping into the CEO role.", icon: "", price: "from Rs. 80,000/mo" },
    ],
  },
  process: {
    heading: "Engagement model", title: "A calm, senior-only process",
    steps: [
      { title: "Diagnose", description: "Stakeholder interviews and data review in week one, in Nepali or English.", icon: "" },
      { title: "Decide", description: "One focused workshop in Kathmandu to choose the highest-leverage moves.", icon: "" },
      { title: "Execute", description: "We stay in the room while your team ships the changes.", icon: "" },
      { title: "Review", description: "90-day check-in against the metrics we set together.", icon: "" },
    ],
  },
  testimonials: {
    heading: "Client record", title: "Results, in their words",
    items: [
      { name: "Dikshya Adhikari", role: "CEO", company: "Sajilo Rentals", message: "Himalaya found the pricing leak we had missed for two years. Revenue per customer is up 31 percent.", photo: "" },
      { name: "Prakash KC", role: "Founder", company: "Loop Pasal", message: "The rare consultant who argues with you, and is usually right.", photo: "" },
      { name: "Sneha Rana", role: "COO", company: "Northbeam Treks", message: "Our leadership team finally rows in the same direction.", photo: "" },
    ],
  },
  pricing: {
    heading: "Engagement options", title: "Work with us",
    items: [
      { name: "Diagnostic", price: "Rs. 1,90,000", period: "2 weeks", description: "Know exactly what is wrong.", features: ["Stakeholder interviews", "Data and funnel review", "Written findings"], featured: false },
      { name: "Advisory", price: "Rs. 2,60,000", period: "per month", description: "A senior partner in your corner.", features: ["Weekly working sessions", "Async review", "Quarterly planning"], featured: true },
      { name: "Embedded", price: "Custom", period: "per quarter", description: "We join the team.", features: ["On-site workshops", "Team coaching", "Board support"], featured: false },
    ],
  },
  faq: {
    heading: "Due diligence", title: "Fair questions",
    items: [
      { q: "How fast can we start?", a: "Diagnostics begin within two weeks of signing. Advisory slots are limited to four clients." },
      { q: "Do you work outside Kathmandu?", a: "Yes, we regularly travel to Pokhara, Chitwan and Biratnagar, remote works too." },
      { q: "What do you need from us?", a: "Access to your numbers, your team for interviews, and one decision-maker in the room." },
    ],
  },
  cta: { title: "One call could save you a quarter.", description: "A 30-minute conversation over chiya. If we are not a fit, we will tell you who is.", primaryCta: "Book a consultation", secondaryCta: "" },
  footer: { tagline: "Himalaya Business Advisors", copyright: "2026 Himalaya Advisors, Durbarmarg, Kathmandu.", showSocial: true },
};

export const components: Record<string, C> = {
  "navbar:solid": Navbar,
  "hero:editorial": Hero,
  "services:list": Services,
  "process:steps": Process,
  "testimonials:cards": Testimonials,
  "pricing:tiers": Pricing,
  "faq:accordion": Faq,
  "cta:banner": Cta,
  "footer:columns": Footer,
};
