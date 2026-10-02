/**
 * Chamak — bespoke predesigned library.
 * Mobile detailing studio system: gloss-dark masthead, giant condensed hero
 * with work-order ticker, contact-sheet proof gallery, booking-first contact.
 *
 * Inspired by the Default Project folder (never copied): the mobile-service
 * concept, proof-of-work and appointment booking flow of the car-detailing
 * project; the photographer's contact sheet (frame numbers, grease-pencil
 * selects, where-and-in-what-light captions); the fitness project's
 * high-energy stats and plan cards; the humanitarian project's
 * areas-served community strip.
 */
import type { SectionType } from "@/types/builder";
import { fontStack, containerWidth, sectionPad, btnRadius, str, arr, EmptyArt } from "@/components/sections/Sections";
import type { BespokeProps } from "./minimal-portfolio";
import { withPages } from "./minimal-portfolio";

type C = (props: BespokeProps) => React.ReactNode;

/** Rotating shoot locations, in the spirit of contact-sheet captions. */
const SPOTS = [
  "Lazimpat driveway · harsh noon",
  "Boudha rooftop · golden hour",
  "Jhamsikhel lane · overcast",
  "Bhaktapur durbar · midday glare",
  "Thamel basement · tube light",
  "Patan courtyard · soft morning",
];

const Navbar: C = ({ content, theme, pages }) => {
  const links = withPages(content, pages);
  return (
    <nav className="sticky top-0 z-30 border-b border-white/10" style={{ background: `color-mix(in srgb, ${theme.background} 88%, transparent)`, backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}>
      <div className={`mx-auto flex items-center justify-between px-6 py-3.5 ${containerWidth(theme)}`}>
        <span className="flex items-center gap-2.5">
          <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full text-base font-black" style={{ background: `linear-gradient(140deg, ${theme.accent}, ${theme.primary})`, color: "#04121f" }}>✦</span>
          <span className="flex flex-col leading-none">
            <span style={{ fontFamily: fontStack(theme.fontHeading), fontWeight: 800, fontSize: "1.2rem", letterSpacing: "-0.01em" }}>{str(content.logo, "Chamak")}</span>
            <span className="font-mono text-[10px] uppercase" style={{ letterSpacing: "0.24em", color: theme.accent }}>Mobile detailing</span>
          </span>
        </span>
        <div className="hidden gap-7 text-[13px] font-bold uppercase tracking-wider md:flex" style={{ color: theme.muted }}>
          {links.map((l, i) => <a key={i} href={l.href} className="transition-colors hover:text-white">{l.label}</a>)}
        </div>
        <a href={str(content.ctaHref) || "#contact"} className="t-btn rounded-full px-4 py-2 text-[13px] font-black uppercase tracking-wide" style={{ background: theme.accent, color: "#04121f" }}>
          {str(content.cta) || "Book wash"}
        </a>
      </div>
    </nav>
  );
};

const Hero: C = ({ content, theme }) => (
  <section className="relative overflow-hidden" style={{ background: `radial-gradient(90% 70% at 80% 0%, color-mix(in srgb, ${theme.accent} 18%, transparent), transparent 60%), ${theme.background}` }}>
    <div className={`mx-auto px-6 pb-12 pt-16 md:pb-16 md:pt-24 ${containerWidth(theme)}`}>
      <p className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase" style={{ letterSpacing: "0.2em", color: theme.accent }}>
        <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: theme.accent }} />{str(content.eyebrow, "We come to your driveway")}
      </p>
      <h1 className="mt-5 uppercase" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(4.2rem * ${theme.headingScale})`, fontWeight: 800, lineHeight: 0.94, letterSpacing: "-0.015em" }}>
        {str(content.title, "Showroom shine, zero driving")}
      </h1>
      <p className="mt-5 max-w-xl text-[15px] leading-relaxed" style={{ color: theme.muted }}>{str(content.description)}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={str(content.primaryHref) || "#contact"} className="t-btn rounded-full px-7 py-3.5 text-sm font-black uppercase tracking-wide" style={{ background: theme.accent, color: "#04121f" }}>{str(content.primaryCta, "Book a detail")}</a>
        {str(content.secondaryCta) && <a href={str(content.secondaryHref) || "#work"} className="t-btn rounded-full border border-white/25 px-7 py-3.5 text-sm font-bold uppercase tracking-wide">{str(content.secondaryCta)}</a>}
      </div>
      {str(content.subtitle) && <p className="mono-meta mt-6 text-xs" style={{ color: theme.muted }}>{str(content.subtitle)}</p>}
    </div>
    <div className="overflow-hidden border-y border-white/10 py-2.5" style={{ background: "rgba(255,255,255,.02)" }} aria-hidden>
      <p className="whitespace-nowrap font-mono text-xs font-bold uppercase" style={{ letterSpacing: "0.3em", color: theme.accent }}>Wash · Clay · Polish · Seal · Wash · Clay · Polish · Seal · Wash · Clay · Polish · Seal</p>
    </div>
  </section>
);

const Gallery: C = ({ content, theme }) => {
  const images = arr<string>(content.images);
  return (
    <section id="work" className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-bold uppercase" style={{ letterSpacing: "0.22em", color: theme.accent }}>{str(content.heading, "Proof of work")}</p>
            <h2 className="mt-2" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})`, fontWeight: 800 }}>{str(content.title, "Contact sheet")}</h2>
          </div>
          <p className="font-mono text-xs" style={{ color: theme.muted }}>{images.length} frames · circled keeps are client favourites</p>
        </div>
        <div className="no-bar snap-row mt-8 flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {images.map((img, i) => (
            <figure key={i} className="group w-[80%] flex-none sm:w-[47%] md:w-auto">
              <div className="img-zoom relative overflow-hidden border border-white/10" style={{ borderRadius: theme.radius, background: theme.surface, aspectRatio: i % 3 === 1 ? "3/4" : "4/3" }}>
                {img ? <img src={img} alt={`Detailing proof ${i + 1}`} loading="lazy" decoding="async" className="h-full w-full object-cover" /> : (
                  <EmptyArt theme={theme} glyph={String(i + 1).padStart(2, "0")} caption="Proof" className="h-full min-h-56" />
                )}
                {i === 0 && (
                  <span aria-hidden className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border-2 font-black" style={{ borderColor: theme.accent, color: theme.accent }}>✓</span>
                )}
                <span className="absolute bottom-3 left-3 rounded-sm bg-black/70 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-white">Frame {String(i + 1).padStart(2, "0")}</span>
              </div>
              <figcaption className="mt-2 font-mono text-[11px]" style={{ color: theme.muted }}>{SPOTS[i % SPOTS.length]}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact: C = ({ content, theme }) => (
  <section id="contact" className={sectionPad(theme)} style={{ background: theme.surface }}>
    <div className={`mx-auto grid gap-10 px-6 md:grid-cols-[1fr_1.2fr] ${containerWidth(theme)}`}>
      <div>
        <p className="font-mono text-xs font-bold uppercase" style={{ letterSpacing: "0.22em", color: theme.accent }}>{str(content.heading, "Booking")}</p>
        <h2 className="mt-2" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})`, fontWeight: 800 }}>{str(content.title, "Book your shine")}</h2>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: theme.muted }}>{str(content.body)}</p>
        <ul className="mt-5 space-y-2 text-sm">
          {["We bring our own water + power", "3-hour average, you keep the keys", "Cash, eSewa and FonePay accepted"].map((li) => (
            <li key={li} className="flex items-center gap-2"><span className="font-black" style={{ color: theme.accent }}>✓</span>{li}</li>
          ))}
        </ul>
        <p className="mt-5 font-mono text-sm font-bold" style={{ color: theme.accent }}>{str(content.phone)}</p>
        <p className="text-sm" style={{ color: theme.muted }}>{str(content.email)} · {str(content.location)}</p>
      </div>
      <form action="#contact" className="space-y-3 border border-white/10 bg-white/[0.03] p-6 md:p-7" style={{ borderRadius: theme.radius * 1.4 }}>
        <div className="grid gap-3 sm:grid-cols-2">
          <input required name="name" placeholder="Your name" className="rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition-all placeholder:text-neutral-400 focus:shadow-md" />
          <input required name="phone" placeholder="Phone number" className="rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition-all placeholder:text-neutral-400 focus:shadow-md" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <select name="vehicle" className="rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none" defaultValue="Sedan">
            {["Hatchback", "Sedan", "SUV / 4WD", "Pickup", "Bike"].map((v) => <option key={v} className="text-black">{v}</option>)}
          </select>
          <select name="package" className="rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none" defaultValue="Full Spa">
            {["Express Wash", "Full Spa", "Ceramic Shield"].map((v) => <option key={v} className="text-black">{v}</option>)}
          </select>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <input required name="date" type="date" aria-label="Preferred date" className="rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none [color-scheme:dark]" />
          <input required name="location" placeholder="Where should we come?" className="rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition-all placeholder:text-neutral-400 focus:shadow-md" />
        </div>
        <button className="t-btn w-full rounded-full py-3 text-sm font-black uppercase tracking-wide" style={{ background: theme.accent, color: "#04121f" }}>Request booking</button>
        <p className="text-center font-mono text-[11px]" style={{ color: theme.muted }}>We confirm on WhatsApp within 2 hours</p>
      </form>
    </div>
  </section>
);

const Banner: C = ({ content, theme }) => (
  <div className="px-4 py-2 text-center font-mono text-[12px] font-bold uppercase" style={{ background: theme.text, color: theme.background, letterSpacing: "0.14em" }}>
    <span style={{ color: theme.accent }}>● </span>{str(content.message, "Now serving the Valley")}
    {str(content.linkHref) && str(content.linkLabel) && <a href={str(content.linkHref)} className="ml-2 underline underline-offset-4">{str(content.linkLabel)} →</a>}
  </div>
);

const Stats: C = ({ content, theme }) => {
  const items = arr<{ value: string; label: string }>(content.items);
  return (
    <section className="border-y border-white/10" style={{ background: "rgba(255,255,255,.02)" }}>
      <dl className={`mx-auto grid grid-cols-2 px-6 py-8 md:grid-cols-4 ${containerWidth(theme)}`}>
        {items.map((st, i) => (
          <div key={i} className="px-5 max-md:[&:nth-child(n+3)]:mt-6">
            <dt className="font-mono tabular-nums" style={{ fontSize: "1.9rem", fontWeight: 800, color: theme.accent, textShadow: `0 0 24px color-mix(in srgb, ${theme.accent} 55%, transparent)` }}>{st.value}</dt>
            <dd className="mt-1 font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: theme.muted }}><span style={{ color: theme.accent }}>[ </span>{st.label}<span style={{ color: theme.accent }}> ]</span></dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

const Services: C = ({ content, theme }) => {
  const items = arr<{ title: string; description: string; price: string }>(content.items);
  return (
    <section className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <p className="font-mono text-xs font-bold uppercase" style={{ letterSpacing: "0.22em", color: theme.accent }}>{str(content.heading, "What we do")}</p>
        <h2 className="mt-2 uppercase" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})`, fontWeight: 800 }}>{str(content.title)}</h2>
        {str(content.description) && <p className="mt-3 max-w-2xl text-sm" style={{ color: theme.muted }}>{str(content.description)}</p>}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((it, i) => (
            <div key={i} className="group relative overflow-hidden border border-white/12 p-6 transition-all duration-300 hover:-translate-y-1" style={{ borderRadius: theme.radius, background: theme.surface }}>
              <span aria-hidden className="pointer-events-none absolute -right-4 -top-7 font-black opacity-[0.07] transition-opacity duration-300 group-hover:opacity-[0.14]" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "6rem" }}>{String(i + 1).padStart(2, "0")}</span>
              <p className="font-mono text-[11px] font-bold uppercase tracking-widest" style={{ color: theme.accent }}>Service_{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-bold" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "1.2rem" }}>{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: theme.muted }}>{it.description}</p>
              {it.price && <p className="mt-4 font-mono text-sm font-bold" style={{ color: theme.accent }}>{it.price}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing: C = ({ content, theme }) => {
  const items = arr<{ name: string; price: string; period: string; description: string; features: string[]; featured: boolean }>(content.items);
  return (
    <section className={sectionPad(theme)} style={{ background: theme.surface }}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <p className="text-center font-mono text-xs font-bold uppercase" style={{ letterSpacing: "0.22em", color: theme.accent }}>{str(content.heading, "Packages")}</p>
        <h2 className="mt-2 text-center uppercase" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})`, fontWeight: 800 }}>{str(content.title)}</h2>
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
          {items.map((p, i) => (
            <div key={i} className="relative border p-7 transition-transform duration-300 hover:-translate-y-1" style={{ borderRadius: theme.radius, borderColor: p.featured ? theme.accent : "rgba(255,255,255,.12)", background: p.featured ? `linear-gradient(160deg, color-mix(in srgb, ${theme.accent} 22%, ${theme.background}), ${theme.background})` : theme.background, boxShadow: p.featured ? `0 0 44px -12px color-mix(in srgb, ${theme.accent} 60%, transparent)` : undefined }}>
              {p.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest" style={{ background: theme.accent, color: "#04121f" }}>Most booked</span>}
              <h3 className="font-mono text-xs font-black uppercase tracking-widest" style={{ color: p.featured ? theme.accent : theme.muted }}>{p.name}</h3>
              <p className="mt-2 font-mono font-black tabular-nums" style={{ fontSize: "1.9rem" }}>{p.price}</p>
              <p className="font-mono text-[11px] uppercase tracking-widest opacity-60">{p.period} · {p.description}</p>
              <ul className="mt-5 space-y-2 text-sm">{arr<string>(p.features).map((f, j) => <li key={j} className="flex gap-2"><span className="font-black" style={{ color: theme.accent }}>✓</span>{f}</li>)}</ul>
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
    <section id="process" className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <p className="font-mono text-xs font-bold uppercase" style={{ letterSpacing: "0.22em", color: theme.accent }}>{str(content.heading, "How it works")}</p>
        <h2 className="mt-2 uppercase" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})`, fontWeight: 800 }}>{str(content.title)}</h2>
        <ol className="mt-8 grid gap-px overflow-hidden border border-white/10 md:grid-cols-4" style={{ borderRadius: theme.radius, background: "rgba(255,255,255,.08)" }}>
          {steps.map((st, i) => (
            <li key={i} className="group p-6 transition-colors duration-300 hover:bg-white/[0.04]" style={{ background: theme.surface }}>
              <p className="font-mono text-xs font-black" style={{ color: theme.accent }}>STEP_{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 font-bold" style={{ fontFamily: fontStack(theme.fontHeading) }}>{st.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed" style={{ color: theme.muted }}>{st.description}</p>
              <span aria-hidden className="mt-4 block font-mono text-lg transition-transform duration-300 group-hover:translate-x-1.5" style={{ color: theme.accent }}>→</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

const Testimonials: C = ({ content, theme }) => {
  const items = arr<{ name: string; company: string; message: string }>(content.items);
  return (
    <section className={sectionPad(theme)} style={{ background: theme.surface }}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <p className="font-mono text-xs font-bold uppercase" style={{ letterSpacing: "0.22em", color: theme.accent }}>{str(content.heading, "Reviews")}</p>
        <h2 className="mt-2 uppercase" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})`, fontWeight: 800 }}>{str(content.title)}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((t0, i) => (
            <figure key={i} className="flex flex-col border border-white/10 p-6 transition-transform duration-300 hover:-translate-y-1" style={{ borderRadius: theme.radius, background: theme.background }}>
              <p aria-label="5 out of 5 stars" className="text-sm tracking-[0.2em]" style={{ color: theme.accent }}>★★★★★</p>
              <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed">“{t0.message}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                <span className="grid h-10 w-10 flex-none place-items-center rounded-full font-black" style={{ background: theme.accent, color: "#04121f" }}>{t0.name.slice(0, 1)}</span>
                <span>
                  <span className="block text-sm font-bold">{t0.name}</span>
                  <span className="block font-mono text-[11px] uppercase tracking-widest" style={{ color: theme.muted }}>{t0.company}</span>
                </span>
                <span className="mono-meta ml-auto text-[10px]" style={{ color: theme.muted }}>✓ verified</span>
              </figcaption>
            </figure>
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
        <p className="font-mono text-xs font-bold uppercase" style={{ letterSpacing: "0.22em", color: theme.accent }}>{str(content.heading, "Fine print")}</p>
        <h2 className="mt-2 uppercase" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})`, fontWeight: 800 }}>{str(content.title)}</h2>
        <div className="mt-8 overflow-hidden border border-white/10" style={{ borderRadius: theme.radius }}>
          {items.map((f, i) => (
            <details key={i} className="group border-b border-white/10 bg-white/[0.02] last:border-0 open:bg-white/[0.05]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-bold [&::-webkit-details-marker]:hidden">
                <span><span className="mr-3 font-mono text-xs" style={{ color: theme.accent }}>Q{i + 1}</span>{f.q}</span>
                <span aria-hidden className="font-mono text-lg transition-transform duration-300 group-open:rotate-45" style={{ color: theme.accent }}>+</span>
              </summary>
              <div className="faq-a"><div><p className="px-5 pb-5 pl-[52px] text-sm leading-relaxed" style={{ color: theme.muted }}>{f.a}</p></div></div>
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
      <div className="relative overflow-hidden px-8 py-14 text-center md:py-16" style={{ borderRadius: theme.radius * 1.6, background: `linear-gradient(140deg, ${theme.primary}, #04121f 75%)`, border: `1px solid color-mix(in srgb, ${theme.accent} 45%, transparent)`, boxShadow: `0 0 70px -22px color-mix(in srgb, ${theme.accent} 65%, transparent)` }}>
        <p className="font-mono text-[11px] font-black uppercase" style={{ letterSpacing: "0.26em", color: theme.accent }}>● Slots fill by Thursday</p>
        <h2 className="mx-auto mt-3 max-w-2xl uppercase" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.4rem * ${theme.headingScale})`, fontWeight: 800, lineHeight: 1 }}>{str(content.title)}</h2>
        {str(content.description) && <p className="mx-auto mt-4 max-w-xl text-sm" style={{ color: theme.muted }}>{str(content.description)}</p>}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={str(content.primaryHref) || "#contact"} className="t-btn rounded-full px-7 py-3.5 text-sm font-black uppercase tracking-wide" style={{ background: theme.accent, color: "#04121f" }}>{str(content.primaryCta, "Book now")}</a>
          {str(content.secondaryCta) && <a href={str(content.secondaryHref) || "#contact"} className="t-btn rounded-full border border-white/25 px-7 py-3.5 text-sm font-bold uppercase tracking-wide">{str(content.secondaryCta)}</a>}
        </div>
      </div>
    </div>
  </section>
);

const Footer: C = ({ content, theme }) => (
  <footer className="border-t border-white/10 px-6 pb-10 pt-14" style={{ background: theme.background }}>
    <div className={`mx-auto ${containerWidth(theme)}`}>
      <p className="uppercase" style={{ fontFamily: fontStack(theme.fontHeading), fontWeight: 800, fontSize: "clamp(2.6rem, 8vw, 5.5rem)", lineHeight: 0.95 }}>Stay <span style={{ color: theme.accent }}>glossy.</span></p>
      <div className="mt-8 grid gap-4 border-t border-white/10 pt-6 font-mono text-xs uppercase tracking-widest md:grid-cols-3" style={{ color: theme.muted }}>
        <p>{str(content.copyright, "2026 Chamak Mobile Detailing.")}</p>
        <p className="md:text-center">Lazimpat → Bhaktapur · 8am – 8pm</p>
        <p className="md:text-right"><a href="#top" className="font-black transition-all hover:-translate-y-0.5" style={{ color: theme.accent }}>Top ↑</a></p>
      </div>
    </div>
  </footer>
);

export const seed: Partial<Record<SectionType, Record<string, unknown>>> = {
  navbar: { logo: "Chamak", links: [{ label: "Proof", href: "#work" }, { label: "Packages", href: "#pricing" }, { label: "Reviews", href: "#testimonials" }, { label: "Book", href: "#contact" }], cta: "Book wash", ctaHref: "#contact" },
  banner: { message: "Now serving the Valley — we bring our own water + power", linkLabel: "Book", linkHref: "#contact" },
  hero: {
    eyebrow: "We come to your driveway", title: "Showroom shine, zero driving", subtitle: "Lazimpat to Bhaktapur · 7 days a week, 8am – 8pm",
    description: "Kathmandu's mobile detailing studio. Full wash, clay, machine polish and ceramic protection — done at your home or office while you get on with your day.",
    primaryCta: "Book a detail", secondaryCta: "See the proof", primaryHref: "#contact", secondaryHref: "#work", image: "", stats: [],
  },
  stats: {
    heading: "Dashboard", title: "", description: "",
    items: [
      { value: "2,400+", label: "Cars detailed" },
      { value: "4.9★", label: "Average rating" },
      { value: "14", label: "Areas served" },
      { value: "~3hr", label: "Per full spa" },
    ],
  },
  services: {
    heading: "What we do", title: "The full spa menu",
    description: "Every visit starts with a 20-point inspection. You approve everything before we touch a panel.",
    items: [
      { title: "Exterior revival", description: "Foam bath, clay decon, single-stage machine polish and 6-month sealant.", icon: "sparkles", price: "from Rs. 1,499" },
      { title: "Interior reset", description: "Deep vacuum, steam clean, leather feed and ozone odour kill.", icon: "seat", price: "from Rs. 1,999" },
      { title: "Ceramic shield", description: "2-year graphene-ceramic coating with paint correction included.", icon: "shield", price: "from Rs. 14,999" },
    ],
  },
  pricing: {
    heading: "Packages", title: "Pick your shine",
    items: [
      { name: "Express", price: "Rs. 1,499", period: "90 minutes", description: "The weekly reset.", features: ["Foam wash + wax", "Wheels + tyres dressed", "Glass in-out", "Interior vacuum"], featured: false },
      { name: "Full Spa", price: "Rs. 3,999", period: "~3 hours", description: "Our most booked.", features: ["Everything in Express", "Clay + machine polish", "Interior steam clean", "Engine bay wipe-down"], featured: true },
      { name: "Ceramic", price: "Rs. 14,999", period: "2 days", description: "Gloss that outlives monsoon.", features: ["Everything in Full Spa", "Paint correction", "2-yr ceramic coating", "Free yearly top-up"], featured: false },
    ],
  },
  gallery: { heading: "Proof of work", title: "Contact sheet", images: ["", "", "", "", "", ""] },
  process: {
    heading: "How it works", title: "You don't lift a finger",
    steps: [
      { title: "Book in 60 seconds", description: "Pick a package and a slot. We confirm on WhatsApp within 2 hours.", icon: "1" },
      { title: "We roll in", description: "Van with water, power and shade canopy. Apartments and offices welcome.", icon: "2" },
      { title: "The spa", description: "2–3 hours of wash, correct and protect. Watch, or don't.", icon: "3" },
      { title: "Walkaround", description: "Torch-lit inspection together. Not happy with a panel? We redo it free.", icon: "4" },
    ],
  },
  testimonials: {
    heading: "Reviews", title: "Valley approved",
    items: [
      { name: "Rabin S.", role: "Creta owner", company: "Jhamsikhel", message: "They detailed my car in our office parking while I worked. Came down to a mirror. My colleagues booked three more.", photo: "" },
      { name: "Anjali M.", role: "Swift owner", company: "Pokhara", message: "Dog hair, dal-bhat stains, monsoon mud — all gone. The interior smells new, not perfumed.", photo: "" },
      { name: "Deepak K.", role: "Scorpio owner", company: "Budhanilkantha", message: "Ceramic coating survived a whole monsoon of Ring Road slush. Water still beads.", photo: "" },
    ],
  },
  faq: {
    heading: "Fine print", title: "Before you book",
    items: [
      { q: "Do I need to provide water or power?", a: "No. The van carries 200L of water and a silent generator. Apartments, offices, basements — all fine." },
      { q: "How long does a full spa take?", a: "About 3 hours for a sedan, 4 for a large SUV. Ceramic jobs take 2 days including paint correction." },
      { q: "What if it rains on my booking day?", a: "We carry a canopy for light rain. Heavy downpour? Free reschedule, no questions, no fees." },
      { q: "Do you do bikes too?", a: "Yes — full bike spa at Rs. 799, including chain clean-lube and polish." },
    ],
  },
  cta: { title: "Your car called. It wants a spa day.", description: "Slots fill by Thursday every week — weekend bookings go first.", primaryCta: "Book now", secondaryCta: "See packages", primaryHref: "#contact", secondaryHref: "#pricing" },
  contact: { heading: "Booking", title: "Book your shine", email: "namaste@chamaknepal.com", phone: "98-15151515", location: "Mobile — all over the Valley", body: "Tell us your vehicle, package and location. We confirm on WhatsApp within 2 hours." },
  footer: { tagline: "Chamak — showroom shine, zero driving.", copyright: "2026 Chamak Mobile Detailing, Kathmandu.", showSocial: true },
};

export const components: Record<string, C> = {
  "navbar:bold": Navbar,
  "banner:dark": Banner,
  "hero:poster": Hero,
  "stats:band": Stats,
  "services:cards": Services,
  "pricing:tiers": Pricing,
  "gallery:feature": Gallery,
  "process:steps": Process,
  "testimonials:cards": Testimonials,
  "faq:accordion": Faq,
  "cta:banner": Cta,
  "contact:split": Contact,
  "footer:big": Footer,
};
