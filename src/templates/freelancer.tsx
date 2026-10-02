/**
 * Solo — bespoke predesigned library for freelancers.
 * Rate-card system: mono labels, tabular numbers, availability ledger.
 */
import type { SectionType } from "@/types/builder";
import { fontStack, containerWidth, sectionPad, btnRadius, str, arr } from "@/components/sections/Sections";
import type { BespokeProps } from "./minimal-portfolio";
import { withPages } from "./minimal-portfolio";

type C = (props: BespokeProps) => React.ReactNode;

const Navbar: C = ({ content, theme, pages }) => {
  const links = withPages(content, pages);
  return (
    <nav className="border-b" style={{ borderColor: theme.surface, background: theme.background }}>
      <div className={`mx-auto flex items-center justify-between px-6 py-4 ${containerWidth(theme)}`}>
        <span className="font-bold" style={{ fontFamily: fontStack(theme.fontHeading) }}>{str(content.logo, "Sita Sharma")}</span>
        <div className="hidden gap-6 font-mono text-xs md:flex" style={{ color: theme.muted }}>
          {links.map((l, i) => <a key={i} href={l.href} className="hover:opacity-70">{String(i + 1).padStart(2, "0")} {l.label}</a>)}
        </div>
        <span className="flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[11px] font-semibold" style={{ background: theme.surface }}>
          <i className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Open for Magh
        </span>
      </div>
    </nav>
  );
};

const Hero: C = ({ content, theme }) => {
  const stats = arr<{ value: string; label: string }>(content.stats);
  return (
    <section className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <p className="font-mono text-xs uppercase" style={{ letterSpacing: "0.2em", color: theme.muted }}>{str(content.eyebrow)}</p>
        <h1 className="mt-3" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(3.4rem * ${theme.headingScale})`, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.98 }}>
          {str(content.title)}
        </h1>
        <p className="mt-3 max-w-xl text-[15px]" style={{ color: theme.muted }}>{str(content.description)}</p>
        <div className="mt-8 grid gap-px overflow-hidden border sm:grid-cols-3" style={{ borderRadius: theme.radius, borderColor: theme.surface, background: theme.surface }}>
          <div className="p-5" style={{ background: theme.background }}>
            <p className="font-mono text-[11px] uppercase" style={{ color: theme.muted }}>Day rate</p>
            <p className="mt-1 text-2xl font-extrabold" style={{ fontFamily: fontStack(theme.fontHeading) }}>Rs. 12,000</p>
          </div>
          <div className="p-5" style={{ background: theme.background }}>
            <p className="font-mono text-[11px] uppercase" style={{ color: theme.muted }}>Availability</p>
            <p className="mt-1 text-2xl font-extrabold" style={{ fontFamily: fontStack(theme.fontHeading) }}>2 slots</p>
          </div>
          {str(content.primaryCta) ? (
            <a href="#contact" className="flex items-center justify-center p-5 text-sm font-bold text-white" style={{ background: theme.primary }}>
              {str(content.primaryCta)}
            </a>
          ) : null}
        </div>
        {stats.length > 0 && (
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3">
            {stats.map((st, i) => (
              <div key={i} className="flex items-baseline gap-2">
                <dt className="text-xl font-extrabold" style={{ fontFamily: fontStack(theme.fontHeading) }}>{st.value}</dt>
                <dd className="font-mono text-[11px]" style={{ color: theme.muted }}>{st.label}</dd>
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
    <section id="work" className={sectionPad(theme)} style={{ background: theme.surface }}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <p className="font-mono text-xs uppercase" style={{ letterSpacing: "0.2em", color: theme.muted }}>01 — {str(content.heading, "Services")}</p>
        <h2 className="mt-2" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})`, fontWeight: 800, letterSpacing: "-0.03em" }}>{str(content.title)}</h2>
        <div className="mt-8 space-y-3">
          {items.map((it, i) => (
            <div key={i} className="grid gap-3 border bg-white p-6 md:grid-cols-[1fr_auto] md:items-center" style={{ borderRadius: theme.radius, borderColor: theme.background }}>
              <div>
                <h3 className="font-bold" style={{ fontFamily: fontStack(theme.fontHeading) }}><span className="mr-2 font-mono text-xs font-normal" style={{ color: theme.muted }}>S.{i + 1}</span>{it.title}</h3>
                <p className="mt-1 max-w-xl text-sm" style={{ color: theme.muted }}>{it.description}</p>
              </div>
              <div className="text-left md:text-right">
                <p className="font-mono text-lg font-bold">{it.price}</p>
                <a href="#contact" className="text-[13px] font-semibold underline underline-offset-4">Enquire →</a>
              </div>
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
    <section className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <p className="font-mono text-xs uppercase" style={{ letterSpacing: "0.2em", color: theme.muted }}>02 — {str(content.heading, "Work log")}</p>
        <h2 className="mt-2" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})`, fontWeight: 800, letterSpacing: "-0.03em" }}>{str(content.title)}</h2>
        <div className="mt-8 font-mono text-[13px]">
          <div className="hidden grid-cols-[70px_1fr_1fr_auto] gap-4 border-b pb-2 text-[11px] uppercase md:grid" style={{ borderColor: theme.text, color: theme.muted }}>
            <span>Year</span><span>Project</span><span>Scope</span><span>Link</span>
          </div>
          {items.map((p, i) => (
            <a key={i} href={p.url || "#"} className="grid grid-cols-[70px_1fr_auto] items-baseline gap-4 border-b py-4 hover:opacity-70 md:grid-cols-[70px_1fr_1fr_auto]" style={{ borderColor: theme.surface }}>
              <span style={{ color: theme.muted }}>208{i % 3}/09</span>
              <span className="font-sans font-bold" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "1rem" }}>{p.title}</span>
              <span className="hidden truncate md:inline" style={{ color: theme.muted }}>{p.description}</span>
              <span>↗</span>
            </a>
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
        <p className="font-mono text-xs uppercase opacity-60" style={{ letterSpacing: "0.2em" }}>03 — Receipts</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {items.map((t0, i) => (
            <figure key={i} className="border border-white/20 p-6" style={{ borderRadius: theme.radius }}>
              <p className="font-mono text-xs opacity-60">★ ★ ★ ★ ★</p>
              <blockquote className="mt-3 text-sm leading-relaxed">“{t0.message}”</blockquote>
              <figcaption className="mt-4 font-mono text-xs opacity-70">{t0.name} · {t0.company}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing: C = ({ content, theme }) => {
  const items = arr<{ name: string; price: string; period: string; description: string; features: string[] }>(content.items);
  return (
    <section id="rates" className={sectionPad(theme)}>
      <div className={`mx-auto grid gap-8 px-6 md:grid-cols-[1fr_1.5fr] ${containerWidth(theme)}`}>
        <div>
          <p className="font-mono text-xs uppercase" style={{ letterSpacing: "0.2em", color: theme.muted }}>04 — {str(content.heading, "Rates")}</p>
          <h2 className="mt-2" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})`, fontWeight: 800, letterSpacing: "-0.03em" }}>{str(content.title)}</h2>
          <p className="mt-3 text-sm" style={{ color: theme.muted }}>Fixed quotes after a free 20-minute call. VAT bills provided.</p>
        </div>
        <div className="space-y-3">
          {items.map((p, i) => (
            <div key={i} className="flex items-center justify-between gap-4 border p-5" style={{ borderRadius: theme.radius, borderColor: theme.surface, background: i === 1 ? theme.surface : undefined }}>
              <div>
                <h3 className="font-bold">{p.name}</h3>
                <p className="text-[13px]" style={{ color: theme.muted }}>{p.description}</p>
              </div>
              <p className="whitespace-nowrap font-mono text-lg font-bold">{p.price}<span className="text-xs font-normal" style={{ color: theme.muted }}>/{p.period}</span></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact: C = ({ content, theme }) => (
  <section id="contact" className={sectionPad(theme)} style={{ background: theme.surface }}>
    <div className={`mx-auto max-w-2xl px-6 text-center ${containerWidth(theme)}`}>
      <p className="font-mono text-xs uppercase" style={{ letterSpacing: "0.2em", color: theme.muted }}>{str(content.heading, "Booking")}</p>
      <h2 className="mt-2" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.6rem * ${theme.headingScale})`, fontWeight: 800, letterSpacing: "-0.03em" }}>{str(content.title, "One email away")}</h2>
      <a href={`mailto:${str(content.email)}`} className={`${btnRadius(theme)} mt-6 inline-block px-8 py-3.5 font-mono text-lg font-bold text-white`} style={{ background: theme.primary }}>{str(content.email)}</a>
      <p className="mt-4 font-mono text-xs" style={{ color: theme.muted }}>{str(content.phone)} · {str(content.location)} · replies within a day</p>
    </div>
  </section>
);

const Footer: C = ({ content, theme }) => (
  <footer className="border-t px-6 py-8" style={{ borderColor: theme.surface }}>
    <div className={`mx-auto flex flex-col gap-2 font-mono text-xs md:flex-row md:justify-between ${containerWidth(theme)}`} style={{ color: theme.muted }}>
      <span>{str(content.copyright)}</span>
      <span>{str(content.tagline, "Designed, built and invoiced solo.")}</span>
    </div>
  </footer>
);

export const seed: Partial<Record<SectionType, Record<string, unknown>>> = {
  navbar: { logo: "Sita Sharma", links: [{ label: "Services", href: "#work" }, { label: "Work", href: "#work" }, { label: "Rates", href: "#rates" }], cta: "" },
  hero: {
    eyebrow: "Freelance designer and developer, Kathmandu", title: "Websites that pay for themselves", subtitle: "",
    description: "I am Sita. I design and build marketing sites for Nepali businesses, fixed price, delivered in weeks, no agency overhead.",
    primaryCta: "Book intro call", secondaryCta: "", image: "",
    stats: [{ value: "32", label: "Sites shipped" }, { value: "3 wks", label: "Typical delivery" }, { value: "100%", label: "Fixed quotes" }],
  },
  services: {
    heading: "Services", title: "What you can hire me for", description: "",
    items: [
      { title: "Business Website", description: "5-page site with photos, map, contact form and basic SEO. You own everything.", icon: "", price: "Rs. 85,000" },
      { title: "Online Store Setup", description: "Product catalog with eSewa and Khalti payments plus delivery zones.", icon: "", price: "Rs. 1,40,000" },
      { title: "Care Plan", description: "Updates, backups and small changes every month. Cancel anytime.", icon: "", price: "Rs. 8,000/mo" },
    ],
  },
  projects: {
    heading: "Work log", title: "Recent deliveries", description: "",
    items: [
      { title: "Thakali Bhanchha", description: "Menu site with online reservations", image: "", tags: [], url: "#", github: "#" },
      { title: "Sagar Handicrafts", description: "Catalog with WhatsApp ordering", image: "", tags: [], url: "#", github: "#" },
      { title: "Himalayan Treks", description: "Booking site in English and Nepali", image: "", tags: [], url: "#", github: "#" },
    ],
  },
  testimonials: {
    heading: "Receipts", title: "Clients",
    items: [
      { name: "Gita Shrestha", role: "Owner", company: "Thakali Bhanchha", message: "Online orders doubled in a month. Sita even fixed our Google Maps listing.", photo: "" },
      { name: "Kamal Rai", role: "Founder", company: "Sagar Handicrafts", message: "Delivered two days early. My WhatsApp has not stopped since.", photo: "" },
      { name: "Dawa Sherpa", role: "Guide", company: "Himalayan Treks", message: "Foreign clients now find and book us directly. No more middlemen.", photo: "" },
    ],
  },
  pricing: {
    heading: "Rates", title: "Simple money talk",
    items: [
      { name: "Landing page", price: "Rs. 45,000", period: "fixed", description: "One sharp page, launched in a week.", features: [], featured: false },
      { name: "Full website", price: "Rs. 85,000", period: "fixed", description: "The complete business presence.", features: [], featured: true },
      { name: "Day rate", price: "Rs. 12,000", period: "day", description: "For ongoing odds and ends.", features: [], featured: false },
    ],
  },
  contact: { heading: "Booking", title: "One email away", email: "namaste@sitasharma.com.np", phone: "+977-98410-54321", location: "Baneshwor, Kathmandu", body: "" },
  footer: { tagline: "Designed, built and invoiced solo.", copyright: "2026 Sita Sharma, Kathmandu.", showSocial: true },
};

export const components: Record<string, C> = {
  "navbar:minimal": Navbar,
  "hero:split": Hero,
  "services:list": Services,
  "projects:grid": Projects,
  "testimonials:minimal": Testimonials,
  "pricing:tiers": Pricing,
  "contact:minimal": Contact,
  "footer:simple": Footer,
};
