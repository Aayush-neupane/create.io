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
  "footer:minimal": Footer,
};
