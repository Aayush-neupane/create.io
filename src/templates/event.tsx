/**
 * Utsav — bespoke predesigned library for events.
 * Festival system: date badges, marquee ticker, ticket stubs, lineup grid.
 */
import type { SectionType } from "@/types/builder";
import { fontStack, containerWidth, sectionPad, btnRadius, str, arr } from "@/components/sections/Sections";
import type { BespokeProps } from "./minimal-portfolio";
import { withPages } from "./minimal-portfolio";

type C = (props: BespokeProps) => React.ReactNode;

const Navbar: C = ({ content, theme, pages }) => {
  const links = withPages(content, pages);
  return (
    <nav style={{ background: theme.primary, color: "#fff" }}>
      <div className={`mx-auto flex items-center justify-between px-6 py-3 ${containerWidth(theme)}`}>
        <span className="flex items-center gap-3 font-bold" style={{ fontFamily: fontStack(theme.fontHeading) }}>
          <span className="rounded-md px-2 py-1 font-mono text-[11px] font-bold" style={{ background: theme.accent, color: theme.primary }}>POUSH 5</span>
          {str(content.logo, "Utsav Fest")}
        </span>
        <div className="hidden gap-6 text-[13px] font-semibold md:flex">
          {links.map((l, i) => <a key={i} href={l.href} className="opacity-80 hover:opacity-100">{l.label}</a>)}
        </div>
        <a href="#contact" className="rounded-full bg-white px-4 py-2 text-[13px] font-bold" style={{ color: theme.primary }}>{str(content.cta) || "Get tickets"}</a>
      </div>
      <div className="overflow-hidden whitespace-nowrap border-t border-white/20 py-1.5 font-mono text-[11px] uppercase" style={{ letterSpacing: "0.2em" }}>
        <span>Live music · Food stalls · Thangka market · Kids zone · Live music · Food stalls · Thangka market · Kids zone ·&nbsp;</span>
      </div>
    </nav>
  );
};

const Hero: C = ({ content, theme }) => {
  const stats = arr<{ value: string; label: string }>(content.stats);
  return (
    <section className="relative overflow-hidden" style={{ background: theme.primary, color: "#fff" }}>
      <div className={`mx-auto px-6 pb-14 pt-16 text-center md:pt-20 ${containerWidth(theme)}`}>
        <p className="font-mono text-xs uppercase" style={{ letterSpacing: "0.3em", color: theme.accent }}>{str(content.eyebrow)}</p>
        <h1 className="mx-auto mt-4 max-w-4xl" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(3.8rem * ${theme.headingScale})`, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 0.98 }}>
          {str(content.title)}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[15px] opacity-80">{str(content.description)}</p>
        <div className="mx-auto mt-7 flex max-w-lg flex-wrap justify-center gap-2.5 font-mono text-xs">
          {stats.map((st, i) => (
            <span key={i} className="rounded-full border border-white/30 px-4 py-2"><b>{st.value}</b> {st.label}</span>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#contact" className={`${btnRadius(theme)} px-7 py-3 text-sm font-bold`} style={{ background: theme.accent, color: theme.primary }}>{str(content.primaryCta, "Get tickets")}</a>
          <a href="#work" className={`${btnRadius(theme)} border border-white/40 px-7 py-3 text-sm font-semibold`}>Lineup</a>
        </div>
      </div>
    </section>
  );
};

const Gallery: C = ({ content, theme }) => {
  const images = arr<string>(content.images);
  return (
    <section id="work" className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <h2 className="text-center" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})`, fontWeight: 800 }}>{str(content.title, "Last year was loud")}</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.slice(0, 8).map((img, i) => (
            <figure key={i} className={`border bg-white p-2 pb-6 ${i % 2 ? "rotate-1" : "-rotate-1"}`} style={{ borderRadius: 6, borderColor: theme.surface, boxShadow: "0 10px 24px -14px rgba(0,0,0,.3)" }}>
              <div className="aspect-square overflow-hidden" style={{ background: theme.surface }}>
                {img ? <img src={img} alt="" className="h-full w-full object-cover" /> : (
                  <div className="flex h-full items-center justify-center font-bold opacity-25" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "2.2rem" }}>{String(i + 1).padStart(2, "0")}</div>
                )}
              </div>
              <figcaption className="mt-2 text-center font-mono text-[10px]" style={{ color: theme.muted }}>utsav · 2082</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

const Schedule: C = ({ content, theme }) => {
  const steps = arr<{ title: string; description: string }>(content.steps);
  return (
    <section className={sectionPad(theme)} style={{ background: theme.surface }}>
      <div className={`mx-auto max-w-3xl px-6 ${containerWidth(theme)}`}>
        <p className="text-center font-mono text-xs uppercase" style={{ letterSpacing: "0.2em", color: theme.muted }}>{str(content.heading, "Running order")}</p>
        <h2 className="mt-2 text-center" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})`, fontWeight: 800 }}>{str(content.title, "The day, hour by hour")}</h2>
        <ol className="mt-8 space-y-0 border-t-2" style={{ borderColor: theme.primary }}>
          {steps.map((st, i) => (
            <li key={i} className="grid grid-cols-[90px_1fr] gap-4 border-b py-5" style={{ borderColor: theme.background }}>
              <span className="font-mono text-sm font-bold" style={{ color: theme.primary }}>{st.title}</span>
              <span className="text-sm" style={{ color: theme.muted }}>{st.description}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

const Lineup: C = ({ content, theme }) => {
  const members = arr<{ name: string; role: string; photo: string; bio: string }>(content.members);
  return (
    <section className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <h2 className="text-center" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})`, fontWeight: 800 }}>{str(content.title, "On stage")}</h2>
        <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2 md:grid-cols-4">
          {members.map((m, i) => (
            <div key={i} className="border bg-white p-5 text-center" style={{ borderRadius: theme.radius, borderColor: theme.surface }}>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-2xl font-extrabold text-white" style={{ background: theme.primary, fontFamily: fontStack(theme.fontHeading) }}>
                {m.photo ? <img src={m.photo} alt={m.name} className="h-full w-full rounded-full object-cover" /> : m.name.slice(0, 1)}
              </div>
              <h3 className="mt-3 font-bold">{m.name}</h3>
              <p className="font-mono text-[11px]" style={{ color: theme.accent }}>{m.role}</p>
              <p className="mt-1 text-[13px]" style={{ color: theme.muted }}>{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Tickets: C = ({ content, theme }) => {
  const items = arr<{ name: string; price: string; period: string; description: string; features: string[]; featured: boolean }>(content.items);
  return (
    <section id="tickets" className={sectionPad(theme)} style={{ background: theme.primary, color: "#fff" }}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <h2 className="text-center" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})`, fontWeight: 800 }}>{str(content.title, "Pick your ticket")}</h2>
        <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-3">
          {items.map((p, i) => (
            <div key={i} className="relative border border-dashed border-white/40 bg-white/[0.07] p-6" style={{ borderRadius: theme.radius }}>
              <span className="absolute -left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full" style={{ background: theme.primary }} />
              <span className="absolute -right-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full" style={{ background: theme.primary }} />
              <h3 className="font-mono text-xs uppercase" style={{ letterSpacing: "0.2em", color: theme.accent }}>{p.name}</h3>
              <p className="mt-2 text-3xl font-extrabold" style={{ fontFamily: fontStack(theme.fontHeading) }}>{p.price}</p>
              <p className="mt-1 text-[13px] opacity-70">{p.description}</p>
              <ul className="mt-4 space-y-1.5 text-[13px]">{arr<string>(p.features).map((f, j) => <li key={j}>✓ {f}</li>)}</ul>
              <a href="#contact" className="mt-5 block py-2.5 text-center text-sm font-bold" style={{ borderRadius: theme.radius / 1.5, background: p.featured ? theme.accent : "#fff", color: theme.primary }}>Book {p.name}</a>
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
      <div className="mx-auto grid max-w-4xl gap-8 px-6 md:grid-cols-[1fr_1.6fr]">
        <h2 style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(1.8rem * ${theme.headingScale})`, fontWeight: 800 }}>{str(content.title, "Good to know")}</h2>
        <div className="space-y-2.5">
          {items.map((f, i) => (
            <details key={i} className="border bg-white px-5 py-4" style={{ borderRadius: theme.radius, borderColor: theme.surface }}>
              <summary className="cursor-pointer list-none text-sm font-bold">{f.q}<span className="float-right opacity-40">＋</span></summary>
              <p className="mt-2 text-[13px]" style={{ color: theme.muted }}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact: C = ({ content, theme }) => (
  <section id="contact" className={sectionPad(theme)} style={{ background: theme.surface }}>
    <div className={`mx-auto grid gap-8 px-6 md:grid-cols-2 ${containerWidth(theme)}`}>
      <div>
        <p className="font-mono text-xs uppercase" style={{ letterSpacing: "0.2em", color: theme.muted }}>{str(content.heading, "Venue")}</p>
        <h2 className="mt-2" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})`, fontWeight: 800 }}>{str(content.title, "Find your way")}</h2>
        <p className="mt-3 font-semibold">{str(content.location)}</p>
        <p className="text-sm" style={{ color: theme.muted }}>{str(content.body)}</p>
        <p className="mt-4 font-mono text-sm">{str(content.phone)} · {str(content.email)}</p>
      </div>
      <form action="#contact" className="space-y-3 border bg-white p-6" style={{ borderRadius: theme.radius, borderColor: theme.background }}>
        <div className="grid grid-cols-2 gap-3">
          <input required name="name" placeholder="Name" className="rounded-lg border px-3 py-2.5 text-sm" />
          <input required name="tickets" placeholder="Tickets" className="rounded-lg border px-3 py-2.5 text-sm" />
        </div>
        <input required name="phone" placeholder="Phone" className="w-full rounded-lg border px-3 py-2.5 text-sm" />
        <button className="w-full py-2.5 text-sm font-bold text-white" style={{ borderRadius: theme.radius / 1.5, background: theme.primary }}>RSVP now</button>
      </form>
    </div>
  </section>
);

const Footer: C = ({ content, theme }) => (
  <footer style={{ background: theme.primary, color: "#fff" }} className="px-6 py-10">
    <div className={`mx-auto flex flex-col gap-3 md:flex-row md:items-center md:justify-between ${containerWidth(theme)}`}>
      <p className="font-extrabold" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "1.6rem" }}>{str(content.tagline, "Utsav Fest")}</p>
      <p className="font-mono text-xs opacity-70">{str(content.copyright)}</p>
    </div>
  </footer>
);


const Logos: C = ({ content, theme }) => {
  const items = arr<string>(content.items);
  return (
    <section className="overflow-hidden border-y border-white/15 py-7" style={{ background: theme.primary, color: "#fff" }}>
      <p className="text-center font-mono text-[11px] font-bold uppercase" style={{ letterSpacing: "0.26em", opacity: 0.7 }}>{str(content.heading, "On stage & decks")}</p>
      <div className="mt-4 flex items-baseline justify-center gap-8 overflow-x-auto whitespace-nowrap px-6" aria-hidden>
        {items.map((name, i) => (
          <span key={i} className="flex-none italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: i % 2 ? "1.1rem" : "1.7rem", fontWeight: 600, opacity: i % 2 ? 0.65 : 1 }}>{name}<span className="ml-8 not-italic" style={{ color: theme.accent }}>✦</span></span>
        ))}
      </div>
    </section>
  );
};

export const seed: Partial<Record<SectionType, Record<string, unknown>>> = {
  navbar: { logo: "Utsav Fest", links: [{ label: "Lineup", href: "#work" }, { label: "Tickets", href: "#tickets" }, { label: "Venue", href: "#contact" }], cta: "Get tickets" },
  hero: {
    eyebrow: "Poush 5, Patan Durbar Square", title: "One square, forty acts", subtitle: "",
    description: "Utsav Fest brings folk, rock and EDM to Patan Durbar Square for one loud winter night. Food stalls, thangka market and kids zone included.",
    primaryCta: "Get tickets", secondaryCta: "", image: "",
    stats: [{ value: "Dec 20", label: "Poush 5" }, { value: "40+", label: "Artists" }, { value: "8k", label: "Expected crowd" }],
  },
  gallery: { heading: "", title: "Last year was loud", images: ["", "", "", "", "", "", "", ""] },
  logos: { heading: "In partnership with", items: ["Himal Beverages", "Yak Gear", "Patan Suites", "Momo Mart", "Sajilo Pay"] },
  process: {
    heading: "Running order", title: "The day, hour by hour",
    steps: [
      { title: "2 PM", description: "Gates open, food stalls fire up, thangka market begins.", icon: "" },
      { title: "4 PM", description: "Folk stage: Kutumba-style ensembles and Dohori battles.", icon: "" },
      { title: "7 PM", description: "Rock block: Tracers, Jindabaad and surprise guests.", icon: "" },
      { title: "10 PM", description: "EDM finale with fireworks over the square.", icon: "" },
    ],
  },
  team: {
    heading: "Lineup", title: "On stage",
    members: [
      { name: "Kutumba", role: "Folk, 4 PM", photo: "", bio: "Seven instruments, zero electricity needed." },
      { name: "Tracers", role: "Rock, 7 PM", photo: "", bio: "Loudest Nepali rock export since the 2000s." },
      { name: "DJ Anup", role: "EDM, 10 PM", photo: "", bio: "Closes the night, opens the sky." },
      { name: "Singer S", role: "Surprise, 8 PM", photo: "", bio: "Unannounced. You will know." },
    ],
  },
  pricing: {
    heading: "", title: "Pick your ticket",
    items: [
      { name: "General", price: "Rs. 1,500", period: "early bird", description: " standing, full access.", features: ["All stages", "Food street access", "Free drinking water"], featured: false },
      { name: "VIP", price: "Rs. 3,500", period: "limited", description: "Front pit plus lounge.", features: ["Front pit", "Raised lounge", "Separate toilets"], featured: true },
      { name: "Table of 8", price: "Rs. 20,000", period: "per table", description: "Your own corner.", features: ["Reserved table", "Welcome platter", "Dedicated server"], featured: false },
    ],
  },
  faq: {
    heading: "", title: "Good to know",
    items: [
      { q: "Can I get a refund?", a: "Full refund until one week before, 50 percent after that. Rain or shine, the show goes on." },
      { q: "Is there parking?", a: "No vehicle entry to the square. Park at Lagankhel and walk 10 minutes, shuttles run all evening." },
      { q: "Are kids allowed?", a: "Under 10 enter free with the kids zone, face painting and early hours." },
    ],
  },
  contact: { heading: "Venue", title: "Find your way", email: "namaste@utsavfest.com.np", phone: "+977-98510-22222", location: "Patan Durbar Square, Lalitpur", body: "Gates at 2 PM. Bring ID for VIP. No outside food or drones." },
  footer: { tagline: "Utsav Fest", copyright: "2026 Utsav Events, Pulchowk, Lalitpur.", showSocial: true },
};

export const components: Record<string, C> = {
  "navbar:solid": Navbar,
  "hero:poster": Hero,
  "gallery:masonry": Gallery,
  "process:steps": Schedule,
  "team:grid": Lineup,
  "pricing:tiers": Tickets,
  "faq:accordion": Faq,
  "contact:split": Contact,
  "footer:columns": Footer,
  "logos:row": Logos,
};
