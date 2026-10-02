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
  "hero:poster": Hero,
  "gallery:feature": Gallery,
  "contact:split": Contact,
};
