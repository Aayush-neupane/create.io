/**
 * Copper Cup — bespoke predesigned library.
 * Craft café system: copper-rule masthead, warm serif hero, single-column
 * brew menu, closing-hours footer. Smells like cardamom.
 */
import type { SectionType } from "@/types/builder";
import { fontStack, containerWidth, sectionPad, btnRadius, str, arr, EmptyArt } from "@/components/sections/Sections";
import type { BespokeProps } from "./minimal-portfolio";
import { withPages } from "./minimal-portfolio";

type C = (props: BespokeProps) => React.ReactNode;

const Navbar: C = ({ content, theme, pages }) => {
  const links = withPages(content, pages);
  return (
    <nav className="sticky top-0 z-30 border-b" style={{ borderColor: theme.surface, background: `color-mix(in srgb, ${theme.background} 90%, transparent)`, backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}>
      <div className={`mx-auto flex items-center justify-between px-6 py-4 ${containerWidth(theme)}`}>
        <span className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full text-base" style={{ background: theme.primary, color: "#fff" }}>☕</span>
          <span className="italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "1.35rem", fontWeight: 600 }}>{str(content.logo, "Copper Cup")}</span>
        </span>
        <div className="hidden gap-7 text-sm md:flex" style={{ color: theme.muted }}>
          {links.map((l, i) => <a key={i} href={l.href} className="transition-opacity hover:opacity-70">{l.label}</a>)}
        </div>
        <a href="#contact" className={`${btnRadius(theme)} t-btn px-4 py-2 text-sm font-bold text-white`} style={{ background: theme.primary }}>
          {str(content.cta) || "Find us"}
        </a>
      </div>
    </nav>
  );
};

const Hero: C = ({ content, theme }) => (
  <section className="relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${theme.surface}, ${theme.background})` }}>
    <div className={`mx-auto grid items-center gap-10 px-6 pb-16 pt-16 md:grid-cols-2 md:pt-20 ${containerWidth(theme)}`}>
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold" style={{ borderColor: theme.accent, color: theme.accent }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: theme.accent }} />{str(content.eyebrow, "Roasted in small batches")}
        </p>
        <h1 className="mt-4 italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(3.2rem * ${theme.headingScale})`, fontWeight: 600, lineHeight: 1.02 }}>
          {str(content.title, "Slow mornings, strong chiya")}
        </h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed" style={{ color: theme.muted }}>{str(content.description)}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={str(content.primaryHref) || "#menu"} className={`${btnRadius(theme)} t-btn px-6 py-3 text-sm font-bold text-white`} style={{ background: theme.primary }}>{str(content.primaryCta, "See the menu")}</a>
          {str(content.secondaryCta) && <a href={str(content.secondaryHref) || "#contact"} className={`${btnRadius(theme)} t-btn border px-6 py-3 text-sm font-semibold`} style={{ borderColor: theme.muted }}>{str(content.secondaryCta)}</a>}
        </div>
        {str(content.subtitle) && <p className="mono-meta mt-6 text-xs" style={{ color: theme.muted }}>{str(content.subtitle)}</p>}
      </div>
      <div className="img-zoom aspect-[4/5] overflow-hidden" style={{ borderRadius: theme.radius * 2, background: theme.surface }}>
        {str(content.image) ? <img src={str(content.image)} alt={str(content.title)} loading="lazy" decoding="async" className="h-full w-full object-cover" /> : (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
            <span style={{ fontSize: "4rem" }}>☕</span>
            <p className="italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "1.3rem" }}>First pour at 7am</p>
            <p className="text-sm" style={{ color: theme.muted }}>Add a photo of the bar in Content → Hero.</p>
          </div>
        )}
      </div>
    </div>
  </section>
);

const Menu: C = ({ content, theme }) => {
  const groups = arr<{ name: string; items: { name: string; description: string; price: string }[] }>(content.groups);
  return (
    <section id="menu" className={sectionPad(theme)} style={{ background: theme.primary, color: "#faf3e8" }}>
      <div className={`mx-auto max-w-2xl px-6 ${containerWidth(theme)}`}>
        <p className="text-center text-xs font-semibold uppercase" style={{ letterSpacing: "0.3em", color: theme.accent }}>{str(content.heading, "The brew board")}</p>
        <h2 className="mt-2 text-center italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.4rem * ${theme.headingScale})` }}>{str(content.title, "Poured & brewed")}</h2>
        <div className="mt-10 space-y-10">
          {groups.map((g, i) => (
            <div key={i}>
              <h3 className="text-center font-mono text-xs font-bold uppercase" style={{ letterSpacing: "0.26em", color: theme.accent }}>· {g.name} ·</h3>
              <div className="mt-5 space-y-5">
                {arr<{ name: string; description: string; price: string }>(g.items).map((it, j) => (
                  <div key={j}>
                    <div className="flex items-baseline gap-2 font-medium">
                      <span style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "1.1rem" }}>{it.name}</span>
                      <span className="mx-1 flex-1 border-b border-dotted border-white/30" />
                      <span className="font-mono font-bold" style={{ color: theme.accent }}>{it.price}</span>
                    </div>
                    <p className="mt-0.5 text-[13px] italic opacity-70">{it.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center font-mono text-xs opacity-60">Oat milk +Rs. 50 · Extra shot +Rs. 80 · Beans to take home</p>
      </div>
    </section>
  );
};

const Footer: C = ({ content, theme }) => (
  <footer className="px-6 py-10 text-center" style={{ borderTop: `1px solid ${theme.surface}` }}>
    <p className="text-3xl">☕</p>
    <p className="mt-2 italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "1.4rem" }}>{str(content.tagline, "Copper Cup")}</p>
    <p className="mt-1 font-mono text-[11px] uppercase" style={{ letterSpacing: "0.25em", color: theme.muted }}>Open daily · 7am – 9pm</p>
    <p className="mt-3 text-xs" style={{ color: theme.muted }}>{str(content.copyright)}</p>
    <a href="#top" className="mt-4 inline-block text-xs font-medium transition-all hover:-translate-y-0.5" style={{ color: theme.muted }}>Back to top ↑</a>
  </footer>
);

const Hours: C = ({ content, theme }) => {
  const rows = arr<{ day: string; time: string }>(content.rows);
  return (
    <section id="hours" className={sectionPad(theme)}>
      <div className={`mx-auto grid gap-6 px-6 md:grid-cols-[1fr_1.2fr] ${containerWidth(theme)}`}>
        <div className="border-2 border-dashed p-8 text-center md:p-10" style={{ borderRadius: theme.radius * 1.6, borderColor: theme.accent, background: theme.surface }}>
          <p className="text-4xl">☕</p>
          <p className="mt-3 text-xs font-bold uppercase" style={{ letterSpacing: "0.28em", color: theme.accent }}>{str(content.heading, "Visit")}</p>
          <h2 className="mt-2 italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2rem * ${theme.headingScale})` }}>{str(content.title)}</h2>
          <p className="mt-3 font-medium">{str(content.address)}</p>
          <p className="font-mono text-sm font-bold" style={{ color: theme.accent }}>{str(content.phone)}</p>
          <a href="#contact" className={`${btnRadius(theme)} t-btn mt-6 inline-block px-6 py-3 text-sm font-bold text-white`} style={{ background: theme.primary }}>Plan your visit</a>
        </div>
        <div className="flex flex-col justify-center border p-8 md:p-10" style={{ borderRadius: theme.radius * 1.6, borderColor: theme.surface, background: theme.background }}>
          <p className="font-mono text-xs font-bold uppercase" style={{ letterSpacing: "0.24em", color: theme.muted }}>When the kettle is on</p>
          <div className="mt-4">
            {rows.map((r, i) => (
              <div key={i} className="flex items-baseline justify-between gap-3 border-b border-dotted py-3.5 last:border-0" style={{ borderColor: theme.surface }}>
                <span className="italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "1.15rem" }}>{r.day}</span>
                <span aria-hidden className="mx-1 flex-1 border-b border-dotted opacity-40" />
                <span className="font-mono text-sm font-bold" style={{ color: theme.accent }}>{r.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Gallery: C = ({ content, theme }) => {
  const images = arr<string>(content.images);
  return (
    <section className={sectionPad(theme)} style={{ background: theme.surface }}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <p className="text-center text-xs font-bold uppercase" style={{ letterSpacing: "0.3em", color: theme.accent }}>{str(content.heading, "Inside")}</p>
        <h2 className="mt-2 text-center italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})` }}>{str(content.title, "The corner")}</h2>
        <div className="no-bar snap-row mt-8 flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {images.map((img, i) => (
            <figure key={i} className={`w-[78%] flex-none sm:w-[46%] md:w-auto ${i % 3 === 1 ? "md:mt-10" : ""}`}>
              <div className="img-zoom overflow-hidden border-4 border-white shadow-lg" style={{ borderRadius: theme.radius, aspectRatio: "4/5", background: theme.background }}>
                {img ? <img src={img} alt={`Café ${i + 1}`} loading="lazy" decoding="async" className="h-full w-full object-cover" /> : (
                  <div className="grid h-full min-h-64 place-items-center p-6 text-center" style={{ background: `linear-gradient(150deg, ${theme.background}, ${theme.surface})` }}>
                    <div>
                      <p className="text-3xl">☕</p>
                      <p className="mt-2 italic" style={{ fontFamily: fontStack(theme.fontHeading) }}>Table {i + 1}</p>
                      <p className="mono-meta mt-1 text-[11px]" style={{ color: theme.muted }}>your corner awaits</p>
                    </div>
                  </div>
                )}
              </div>
              <figcaption className="mt-2 text-center font-mono text-[11px]" style={{ color: theme.muted }}>corner nº {i + 1} — sunniest at 9am</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials: C = ({ content, theme }) => {
  const items = arr<{ name: string; company: string; message: string }>(content.items);
  return (
    <section className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <p className="text-center text-xs font-bold uppercase" style={{ letterSpacing: "0.3em", color: theme.accent }}>{str(content.heading, "Regulars")}</p>
        <h2 className="mt-2 text-center italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})` }}>{str(content.title)}</h2>
        <div className="mx-auto mt-8 grid max-w-4xl gap-5 md:grid-cols-2">
          {items.map((t0, i) => (
            <figure key={i} className="border bg-white p-6 transition-transform duration-300 hover:-translate-y-1 hover:rotate-[0.5deg]" style={{ borderRadius: theme.radius * 1.3, borderColor: theme.surface }}>
              <p aria-label="Rated 5 out of 5 cups" className="text-sm" style={{ color: theme.accent }}>☕☕☕☕☕</p>
              <blockquote className="mt-3 italic leading-relaxed" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "1.1rem" }}>“{t0.message}”</blockquote>
              <figcaption className="mt-4 border-t border-dotted pt-3 text-sm" style={{ borderColor: theme.surface }}>
                <span className="font-bold">{t0.name}</span> <span style={{ color: theme.muted }}>· {t0.company}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact: C = ({ content, theme }) => (
  <section id="contact" className={sectionPad(theme)} style={{ background: theme.primary, color: "#faf3e8" }}>
    <div className={`mx-auto grid gap-10 px-6 md:grid-cols-2 ${containerWidth(theme)}`}>
      <div>
        <p className="text-xs font-bold uppercase" style={{ letterSpacing: "0.3em", color: theme.accent }}>{str(content.heading, "Visit")}</p>
        <h2 className="mt-2 italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.4rem * ${theme.headingScale})` }}>{str(content.title)}</h2>
        <p className="mt-3 text-sm leading-relaxed opacity-80">{str(content.body)}</p>
        <div className="mt-6 space-y-2 text-sm">
          <p><span className="opacity-60">Find us — </span><span className="font-semibold">{str(content.location)}</span></p>
          <p><span className="opacity-60">Call — </span><span className="font-mono font-bold" style={{ color: theme.accent }}>{str(content.phone)}</span></p>
          <p><span className="opacity-60">Write — </span><span className="font-semibold">{str(content.email)}</span></p>
        </div>
      </div>
      <form action="#contact" className="space-y-3 border border-white/20 p-6 md:p-7" style={{ borderRadius: theme.radius * 1.4, background: "rgba(255,255,255,.06)" }}>
        <p className="font-mono text-xs font-bold uppercase" style={{ letterSpacing: "0.22em", color: theme.accent }}>Reserve a table / order beans</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <input required name="name" placeholder="Your name" className="rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white outline-none transition-all placeholder:text-white/50 focus:shadow-md" />
          <input required name="phone" placeholder="Phone" className="rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white outline-none transition-all placeholder:text-white/50 focus:shadow-md" />
        </div>
        <select name="topic" className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white outline-none" defaultValue="Reserve a corner table">
          {["Reserve a corner table", "Whole-bean subscription", "Catering an event", "Just saying hello"].map((o) => <option key={o} className="text-black">{o}</option>)}
        </select>
        <textarea name="message" rows={3} placeholder="How many, when, decaf or regular…" className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white outline-none transition-all placeholder:text-white/50 focus:shadow-md" />
        <button className={`${btnRadius(theme)} t-btn w-full py-3 text-sm font-bold`} style={{ background: theme.accent, color: "#2b1d12" }}>Send to the counter</button>
      </form>
    </div>
  </section>
);

export const seed: Partial<Record<SectionType, Record<string, unknown>>> = {
  navbar: { logo: "Copper Cup", links: [{ label: "Menu", href: "#menu" }, { label: "Story", href: "#about" }, { label: "Visit", href: "#contact" }], cta: "Find us", ctaHref: "#contact" },
  hero: {
    eyebrow: "Roasted in small batches", title: "Slow mornings, strong chiya", subtitle: "Single-origin Ilam beans · Patan courtyard seating",
    description: "A twelve-table café in Jhamsikhel pouring careful espresso, masala chiya and the flakiest croissants south of the Bagmati.",
    primaryCta: "See the menu", secondaryCta: "Our story", primaryHref: "#menu", secondaryHref: "#about", image: "", stats: [],
  },
  about: {
    heading: "Our story", title: "From Ilam gardens to your cup",
    body: "We buy directly from three Ilam gardens, roast every Tuesday in-house, and train every barista for six months before their first solo shift. Coffee this careful should never be rushed — but your mornings are safe with us.",
    image: "", bullets: ["Direct-trade Ilam beans", "Roasted every Tuesday", "Baked fresh at 6am"],
  },
  menu: {
    heading: "The brew board", title: "Poured and brewed",
    groups: [
      { name: "Espresso", items: [{ name: "Espresso", description: "Double shot, honeyed crema", price: "Rs. 220" }, { name: "Cortado", description: "Equal parts espresso and steamed milk", price: "Rs. 280" }, { name: "Spanish Latte", description: "Condensed milk, double espresso", price: "Rs. 350" }] },
      { name: "Slow bar", items: [{ name: "V60 Pour-over", description: "Single-origin Ilam, apricot and black tea", price: "Rs. 380" }, { name: "Masala Chiya", description: "Slow-brewed with ginger and cardamom", price: "Rs. 180" }, { name: "Cold Brew", description: "18-hour steep, orange peel", price: "Rs. 320" }] },
    ],
  },
  hours: {
    heading: "Visit", title: "Find the aroma", address: "Jhamsikhel Chowk, Lalitpur (yellow door)", phone: "(01) 555-0182",
    rows: [{ day: "Sun – Fri", time: "7am – 9pm" }, { day: "Saturday", time: "8am – 10pm" }, { day: "Public holidays", time: "8am – 6pm" }],
  },
  gallery: { heading: "Inside", title: "The corner", images: ["", "", "", "", "", ""] },
  testimonials: {
    heading: "", title: "Regulars",
    items: [
      { name: "Prerana M.", role: "", company: "Writes here daily", message: "My office, my living room, my deadline sanctuary. The cortado has never once been wrong.", photo: "" },
      { name: "Sujal B.", role: "", company: "Cycled from Bhaktapur", message: "Worth every uphill pedal. Best V60 in the valley and they remember my name.", photo: "" },
    ],
  },
  contact: { heading: "Visit", title: "Follow the smell of roast", email: "namaste@coppercup.com.np", phone: "(01) 555-0182", location: "Jhamsikhel Chowk, Lalitpur", body: "Beans, brewers and gift cards available at the counter. Whole-bean subscriptions every Friday." },
  footer: { tagline: "Copper Cup", copyright: "2026 Copper Cup, Jhamsikhel.", showSocial: true },
};

export const components: Record<string, C> = {
  "navbar:centered": Navbar,
  "hero:image": Hero,
  "menu:grouped": Menu,
  "hours:card": Hours,
  "gallery:grid": Gallery,
  "testimonials:minimal": Testimonials,
  "contact:split": Contact,
  "footer:minimal": Footer,
};
