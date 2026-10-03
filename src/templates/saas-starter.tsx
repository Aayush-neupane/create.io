/**
 * Launchpad SaaS — bespoke predesigned library.
 * Launch system: floating pill nav, product frame hero, logo cloud, checklist pricing.
 */
import type { SectionType } from "@/types/builder";
import { fontStack, fluid, containerWidth, sectionPad, btnRadius, str, arr } from "@/components/sections/Sections";
import type { BespokeProps } from "./minimal-portfolio";
import { withPages } from "./minimal-portfolio";

type C = (props: BespokeProps) => React.ReactNode;

const Navbar: C = ({ content, theme, pages }) => {
  const links = withPages(content, pages);
  return (
    <div className="sticky top-3 z-30 px-4">
      <nav className="mx-auto flex max-w-4xl items-center justify-between border bg-white py-2.5 pl-5 pr-2.5 shadow-sm" style={{ borderRadius: 999, borderColor: theme.surface }}>
        <span className="flex items-center gap-2 text-sm font-bold" style={{ fontFamily: fontStack(theme.fontHeading) }}>
          <span className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-black text-white" style={{ background: theme.primary }}>◍</span>
          {str(content.logo, "Launchpad")}
        </span>
        <div className="hidden gap-5 text-[13px] font-medium md:flex" style={{ color: theme.muted }}>
          {links.map((l, i) => <a key={i} href={l.href} className="hover:opacity-70">{l.label}</a>)}
        </div>
        {str(content.cta) ? <a href="#contact" className="rounded-full px-4 py-2 text-[13px] font-bold text-white" style={{ background: theme.primary }}>{str(content.cta)}</a> : null}
      </nav>
      <div className="no-bar flex gap-5 overflow-x-auto whitespace-nowrap px-5 py-2 text-[13px] font-medium md:hidden" style={{ color: theme.muted }}>
        {links.map((l, i) => <a key={i} href={l.href} className="flex-none">{l.label}</a>)}
      </div>
    </div>
  );
};

const Hero: C = ({ content, theme }) => {
  const stats = arr<{ value: string; label: string }>(content.stats);
  return (
    <section className="overflow-hidden">
      <div className={`mx-auto px-6 pt-14 text-center md:pt-20 ${containerWidth(theme)}`}>
        <a href="#pricing" className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold" style={{ borderColor: theme.surface, background: theme.surface }}>
          <span className="rounded-full px-1.5 py-0.5 text-[10px] font-bold text-white" style={{ background: theme.primary }}>NEW</span>
          {str(content.eyebrow, "Launchpad 2.0 is live →")}
        </a>
        <h1 className="mx-auto mt-5 max-w-3xl" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: fluid(theme, 3.2, 2), fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.04 }}>
          {str(content.title)}
        </h1>
        <p className="mx-auto mt-4 max-w-xl" style={{ color: theme.muted }}>{str(content.description)}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {str(content.primaryCta) ? <a href="#contact" className={`${btnRadius(theme)} px-6 py-3 text-sm font-bold text-white`} style={{ background: theme.primary }}>{str(content.primaryCta)}</a> : null}
          <a href="#work" className={`${btnRadius(theme)} border px-6 py-3 text-sm font-semibold`} style={{ borderColor: theme.surface }}>Watch demo ▸</a>
        </div>
        <p className="mt-3 font-mono text-[11px]" style={{ color: theme.muted }}>Free 14-day trial · No credit card</p>
        <div className="mx-auto mt-10 max-w-4xl overflow-hidden border shadow-xl" style={{ borderRadius: theme.radius * 1.5, borderColor: theme.surface, background: theme.surface }}>
          <div className="flex items-center gap-1.5 border-b px-4 py-2.5" style={{ borderColor: theme.background, background: theme.background }}>
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" /><span className="h-2.5 w-2.5 rounded-full bg-neutral-300" /><span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
            <span className="ml-2 font-mono text-[11px]" style={{ color: theme.muted }}>app.launchpad.io</span>
          </div>
          {str(content.image) ? <img src={str(content.image)} alt="" className="aspect-[16/8] w-full object-cover" /> : (
            <div className="grid aspect-[16/10] sm:aspect-[16/8] sm:grid-cols-[180px_1fr]">
              <div className="hidden border-r p-4 text-left sm:block" style={{ borderColor: theme.background, background: theme.background }}>
                <div className="h-2 w-16 rounded" style={{ background: theme.primary }} />
                {[0, 1, 2, 3].map((i) => <div key={i} className="mt-2.5 h-6 rounded" style={{ background: i === 1 ? theme.surface : "transparent", border: `1px solid ${theme.surface}` }} />)}
              </div>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-2">{[0, 1, 2].map((i) => <div key={i} className="h-14 rounded-lg border bg-white" style={{ borderColor: theme.surface }} />)}</div>
                <div className="mt-2 h-28 rounded-lg border bg-white p-3" style={{ borderColor: theme.surface }}>
                  <div className="h-2 w-1/3 rounded" style={{ background: theme.surface }} />
                  <div className="mt-2 flex h-12 items-end gap-1">{[40, 70, 55, 90, 65, 100, 80].map((h, i) => <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: theme.primary, opacity: 0.35 + (i / 14) }} />)}</div>
                </div>
              </div>
            </div>
          )}
        </div>
        {stats.length > 0 && (
          <dl className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-x-10 gap-y-3">
            {stats.map((st, i) => (
              <div key={i} className="flex items-baseline gap-2">
                <dt className="text-xl font-extrabold" style={{ fontFamily: fontStack(theme.fontHeading) }}>{st.value}</dt>
                <dd className="text-xs" style={{ color: theme.muted }}>{st.label}</dd>
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
        <p className="text-center font-mono text-xs uppercase tracking-[0.2em]" style={{ color: theme.accent }}>{str(content.heading, "Features")}</p>
        <h2 className="mx-auto mt-2 max-w-xl text-center" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: fluid(theme, 2.2, 1.55), fontWeight: 800, letterSpacing: "-0.02em" }}>{str(content.title)}</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map((it, i) => (
            <div key={i} className="border bg-white p-7 transition hover:shadow-lg" style={{ borderRadius: theme.radius * 1.3, borderColor: theme.surface }}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl text-lg font-black text-white" style={{ background: theme.primary }}>{["◍", "⬡", "✦"][i % 3]}</span>
              <h3 className="mt-4 font-bold" style={{ fontFamily: fontStack(theme.fontHeading) }}>{it.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed" style={{ color: theme.muted }}>{it.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects: C = ({ content, theme }) => {
  const items = arr<{ title: string; description: string; tags: string[]; url: string }>(content.items);
  return (
    <section id="work" className={sectionPad(theme)} style={{ background: theme.surface }}>
      <div className={`mx-auto max-w-3xl px-6 ${containerWidth(theme)}`}>
        <h2 className="text-center" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: fluid(theme, 2, 1.5), fontWeight: 800 }}>{str(content.title, "Loved by modern teams")}</h2>
        <div className="mt-8 space-y-3">
          {items.map((p, i) => (
            <a key={i} href={p.url || "#"} className="flex items-center gap-4 border bg-white p-5 transition hover:shadow-md" style={{ borderRadius: theme.radius, borderColor: theme.background }}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black text-white" style={{ background: theme.primary }}>{p.title.slice(0, 1)}</span>
              <div className="min-w-0">
                <h3 className="truncate text-[15px] font-bold">{p.title}</h3>
                <p className="truncate text-[13px]" style={{ color: theme.muted }}>{p.description}</p>
              </div>
              <span className="ml-auto shrink-0 font-mono text-[11px]" style={{ color: theme.accent }}>★★★★★</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing: C = ({ content, theme }) => {
  const items = arr<{ name: string; price: string; period: string; description: string; features: string[]; featured: boolean }>(content.items);
  return (
    <section id="pricing" className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <h2 className="text-center" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: fluid(theme, 2.2, 1.55), fontWeight: 800, letterSpacing: "-0.02em" }}>{str(content.title)}</h2>
        <p className="mt-2 text-center text-sm" style={{ color: theme.muted }}>Start free. Upgrade when it hurts not to.</p>
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
          {items.map((p, i) => (
            <div key={i} className={`relative border p-7 ${p.featured ? "shadow-xl" : ""}`} style={{ borderRadius: theme.radius * 1.4, borderColor: p.featured ? theme.primary : theme.surface, borderWidth: p.featured ? 2 : 1, background: "#fff" }}>
              {p.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] font-bold text-white" style={{ background: theme.primary }}>MOST POPULAR</span>}
              <h3 className="text-sm font-bold">{p.name}</h3>
              <p className="mt-2" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "2.2rem", fontWeight: 800 }}>{p.price}<span className="text-sm font-medium" style={{ color: theme.muted }}>/{p.period}</span></p>
              <p className="mt-1 text-[13px]" style={{ color: theme.muted }}>{p.description}</p>
              <ul className="mt-5 space-y-2 text-[13px]">{arr<string>(p.features).map((f, j) => <li key={j} className="flex gap-2"><span className="font-bold" style={{ color: theme.accent }}>✓</span>{f}</li>)}</ul>
              <a href="#contact" className="mt-6 block py-2.5 text-center text-sm font-bold text-white" style={{ borderRadius: theme.radius, background: p.featured ? theme.primary : "#111" }}>Choose {p.name}</a>
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
    <section id="faq" className={sectionPad(theme)} style={{ background: theme.surface }}>
      <div className="mx-auto grid max-w-4xl gap-8 px-6 md:grid-cols-[1fr_1.6fr]">
        <div>
          <h2 style={{ fontFamily: fontStack(theme.fontHeading), fontSize: fluid(theme, 1.8, 1.4), fontWeight: 800 }}>{str(content.title)}</h2>
          <p className="mt-2 text-sm" style={{ color: theme.muted }}>Still curious? <a href="#contact" className="font-semibold underline">Talk to us →</a></p>
        </div>
        <div className="space-y-2.5">
          {items.map((f, i) => (
            <details key={i} className="group border bg-white px-5 py-4" style={{ borderRadius: theme.radius, borderColor: theme.background }}>
              <summary className="cursor-pointer list-none text-sm font-bold">{f.q}<span className="float-right opacity-40 transition group-open:rotate-45">＋</span></summary>
              <p className="mt-2 text-[13px] leading-relaxed" style={{ color: theme.muted }}>{f.a}</p>
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
      <div className="relative overflow-hidden px-8 py-16 text-center text-white" style={{ borderRadius: theme.radius * 1.6, background: theme.primary }}>
        <div aria-hidden className="absolute inset-x-0 top-0 h-1.5" style={{ background: theme.accent }} />
        <h2 className="relative mx-auto max-w-xl" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: fluid(theme, 2.4, 1.65), fontWeight: 800, letterSpacing: "-0.02em" }}>{str(content.title)}</h2>
        <p className="relative mx-auto mt-3 max-w-md text-sm opacity-80">{str(content.description)}</p>
        {str(content.primaryCta) ? <a href="#contact" className="relative mt-7 inline-block rounded-full bg-white px-8 py-3.5 text-sm font-bold" style={{ color: theme.primary }}>{str(content.primaryCta)}</a> : null}
      </div>
    </div>
  </section>
);

const Footer: C = ({ content, theme }) => (
  <footer className="border-t px-6 py-12" style={{ borderColor: theme.surface }}>
    <div className={`mx-auto ${containerWidth(theme)}`}>
      <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="flex items-center gap-2 text-sm font-bold"><span className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] text-white" style={{ background: theme.primary }}>◍</span>{str(content.tagline, "Launchpad")}</p>
          <p className="mt-2 max-w-xs text-xs" style={{ color: theme.muted }}>{str(content.copyright)}</p>
        </div>
        {[["Product", ["Features", "Pricing", "Changelog"]], ["Company", ["About", "Blog", "Careers"]], ["Resources", ["Docs", "API", "Status"]]].map(([h, ls]) => (
          <div key={h as string}>
            <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: theme.muted }}>{h}</p>
            <div className="mt-3 flex flex-col gap-2 text-[13px] font-medium">{(ls as string[]).map((l) => <a key={l} href="#" className="hover:opacity-60">{l}</a>)}</div>
          </div>
        ))}
      </div>
    </div>
  </footer>
);


const Logos: C = ({ content, theme }) => {
  const items = arr<string>(content.items);
  return (
    <section className="border-y" style={{ borderColor: theme.surface, background: theme.surface }}>
      <div className={`mx-auto px-6 py-9 ${containerWidth(theme)}`}>
        <p className="text-center font-mono text-[11px] font-bold uppercase" style={{ letterSpacing: "0.22em", color: theme.muted }}>{str(content.heading, "Powering teams at")}</p>
        <div className="no-bar snap-row mt-5 flex items-center gap-x-10 overflow-x-auto whitespace-nowrap md:flex-wrap md:justify-center md:overflow-visible md:whitespace-normal">
          {items.map((name, i) => (
            <span key={i} className="flex flex-none items-center gap-2 text-[15px] font-bold transition-opacity duration-300 hover:opacity-100" style={{ fontFamily: fontStack(theme.fontHeading), opacity: 0.55 }}>
              <span className="grid h-7 w-7 place-items-center rounded-md text-xs font-black text-white" style={{ background: theme.primary }}>{name.slice(0, 1)}</span>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export const seed: Partial<Record<SectionType, Record<string, unknown>>> = {
  navbar: { logo: "Sajilo", links: [{ label: "Features", href: "#work" }, { label: "Pricing", href: "#pricing" }, { label: "FAQ", href: "#faq" }], cta: "Get started" },
  logos: { heading: "Powering modern Nepali teams", items: ["Sajilo Rentals", "Himalayan Trails", "Momo Mart", "Kumari Pay", "FitNepal"] },
  hero: {
    eyebrow: "Sajilo 2.0 is live", title: "Analytics your whole team gets", subtitle: "",
    description: "Sajilo turns business data into decisions, dashboards, alerts and reports without the SQL. Built in Kathmandu, used across South Asia.",
    primaryCta: "Start free trial", secondaryCta: "", image: "",
    stats: [{ value: "900+", label: "teams" }, { value: "4.8/5", label: "rating" }, { value: "eSewa", label: "and Khalti ready" }],
  },
  services: {
    heading: "Features", title: "Everything you need to grow", description: "",
    items: [
      { title: "Live dashboards", description: "Metrics that update in real time, shareable with one link, in Nepali or English.", icon: "", price: "" },
      { title: "Smart alerts", description: "Get pinged on Viber or Slack the moment a metric moves.", icon: "", price: "" },
      { title: "Weekly reports", description: "Board-ready summaries generated every Monday morning.", icon: "", price: "" },
    ],
  },
  projects: {
    heading: "", title: "Loved by Nepali teams", description: "",
    items: [
      { title: "Sajilo Rentals", description: "Cut reporting time from 2 days to 20 minutes.", image: "", tags: [], url: "#", github: "#" },
      { title: "Himalayan Trails", description: "Found a Rs. 40 lakh churn leak in week one.", image: "", tags: [], url: "#", github: "#" },
      { title: "Momo Mart", description: "One dashboard replaced eleven spreadsheets.", image: "", tags: [], url: "#", github: "#" },
    ],
  },
  pricing: {
    heading: "", title: "Simple pricing",
    items: [
      { name: "Starter", price: "Rs. 0", period: "mo", description: "For side projects.", features: ["3 dashboards", "7-day retention", "Community support"], featured: false },
      { name: "Growth", price: "Rs. 2,900", period: "mo", description: "For teams finding fit.", features: ["Unlimited dashboards", "Viber alerts", "Priority support"], featured: true },
      { name: "Scale", price: "Rs. 9,500", period: "mo", description: "For companies at speed.", features: ["SSO and audit log", "Dedicated manager", "99.9% uptime"], featured: false },
    ],
  },
  faq: {
    heading: "", title: "Questions?",
    items: [
      { q: "Is there really a free plan?", a: "Yes, free forever for up to 3 dashboards. No credit card, no eSewa needed." },
      { q: "How long does setup take?", a: "Most teams connect a source and see first dashboards in under 15 minutes." },
      { q: "Can I pay with eSewa or Khalti?", a: "Yes, plus cards and bank transfer for annual plans with VAT bills." },
    ],
  },
  cta: { title: "See what your data is hiding.", description: "Join 900 plus Nepali teams making faster decisions with Sajilo.", primaryCta: "Start free trial", secondaryCta: "" },
  footer: { tagline: "Sajilo", copyright: "2026 Sajilo Inc., Kathmandu. Analytics for everyone.", showSocial: true },
};

export const components: Record<string, C> = {
  "navbar:solid": Navbar,
  "hero:split": Hero,
  "services:cards": Services,
  "projects:list": Projects,
  "pricing:tiers": Pricing,
  "faq:accordion": Faq,
  "cta:banner": Cta,
  "footer:columns": Footer,
  "logos:row": Logos,
};
