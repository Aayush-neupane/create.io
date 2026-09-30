/**
 * Ember & Oak — bespoke predesigned library.
 * Hearth system: centered crest masthead, dotted menu leaders, reservation cards.
 */
import type { SectionType, ThemeConfig } from "@/types/builder";
import { fontStack, containerWidth, sectionPad, btnRadius, str, arr, EmptyArt } from "@/components/sections/Sections";
import type { BespokeProps } from "./minimal-portfolio";
import { withPages } from "./minimal-portfolio";

type C = (props: BespokeProps) => React.ReactNode;

const Navbar: C = ({ content, theme, pages }) => {
  const links = withPages(content, pages);
  return (
    <nav className="border-b" style={{ borderColor: theme.surface, background: theme.background }}>
      <div className={`mx-auto px-6 pb-4 pt-6 text-center ${containerWidth(theme)}`}>
        <p className="italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "1.6rem", fontWeight: 600 }}>{str(content.logo, "Ember & Oak")}</p>
        <div className="mt-1.5 flex items-center justify-center gap-2" style={{ color: theme.muted }}>
          <span className="h-px w-12" style={{ background: theme.accent }} />
          <span className="text-xs">❦</span>
          <span className="h-px w-12" style={{ background: theme.accent }} />
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-x-8 gap-y-1 text-[13px] font-medium uppercase tracking-[0.12em]" style={{ color: theme.muted }}>
          {links.map((l, i) => <a key={i} href={l.href} className="hover:opacity-70">{l.label}</a>)}
        </div>
      </div>
    </nav>
  );
};

const Hero: C = ({ content, theme }) => (
  <section className="relative overflow-hidden" style={{ background: theme.primary, color: "#fff8ef" }}>
    <div className={`mx-auto px-6 pb-16 pt-16 text-center md:pb-20 md:pt-20 ${containerWidth(theme)}`}>
      <p className="text-xs font-semibold uppercase" style={{ letterSpacing: "0.32em", color: "#f5c98a" }}>{str(content.eyebrow)}</p>
      <h1 className="mx-auto mt-4 max-w-3xl italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(3.6rem * ${theme.headingScale})`, fontWeight: 600, lineHeight: 1.02 }}>
        {str(content.title, "Ember & Oak")}
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-[15px] opacity-80">{str(content.description)}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a href="#contact" className={`${btnRadius(theme)} px-6 py-3 text-sm font-bold`} style={{ background: "#fff8ef", color: theme.primary }}>{str(content.primaryCta, "Reserve a table")}</a>
        <a href="#menu" className={`${btnRadius(theme)} border border-white/40 px-6 py-3 text-sm font-semibold`}>{str(content.secondaryCta, "See the menu")}</a>
      </div>
      {str(content.image) && <img src={str(content.image)} alt="" className="mx-auto mt-10 aspect-[16/7] max-w-4xl object-cover" style={{ borderRadius: theme.radius * 1.5 }} />}
    </div>
  </section>
);

const About: C = ({ content, theme }) => (
  <section id="about" className={sectionPad(theme)}>
    <div className={`mx-auto grid items-center gap-8 px-6 md:grid-cols-2 ${containerWidth(theme)}`}>
      <div className="border p-8 md:p-10" style={{ borderRadius: theme.radius * 1.4, borderColor: theme.accent, background: theme.surface }}>
        <p className="text-xs font-semibold uppercase" style={{ letterSpacing: "0.24em", color: theme.accent }}>{str(content.heading, "Our story")}</p>
        <h2 className="mt-3 italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2rem * ${theme.headingScale})`, fontWeight: 600, lineHeight: 1.15 }}>{str(content.title)}</h2>
        <p className="mt-4 text-[15px] leading-relaxed" style={{ color: theme.muted }}>{str(content.body)}</p>
        {arr<string>(content.bullets).length > 0 && (
          <p className="mt-5 font-mono text-xs" style={{ color: theme.muted }}>{arr<string>(content.bullets).join("  ·  ")}</p>
        )}
      </div>
      <div className="flex aspect-[4/5] items-center justify-center overflow-hidden" style={{ borderRadius: theme.radius * 1.4, background: theme.surface }}>
        {str(content.image) ? <img src={str(content.image)} alt="" className="h-full w-full object-cover" /> : (
          <EmptyArt theme={theme} glyph="❦" caption="The hearth" className="h-full" />
        )}
      </div>
    </div>
  </section>
);

const Menu: C = ({ content, theme }) => {
  const groups = arr<{ name: string; items: { name: string; description: string; price: string }[] }>(content.groups);
  return (
    <section id="menu" className={sectionPad(theme)} style={{ background: theme.surface }}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <p className="text-center text-xs font-semibold uppercase" style={{ letterSpacing: "0.3em", color: theme.accent }}>{str(content.heading, "The menu")}</p>
        <h2 className="mt-2 text-center italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.4rem * ${theme.headingScale})`, fontWeight: 600 }}>{str(content.title, "Eat & drink")}</h2>
        <div className="mx-auto mt-10 grid max-w-4xl gap-x-12 gap-y-10 md:grid-cols-2">
          {groups.map((g, i) => (
            <div key={i}>
              <h3 className="text-center font-semibold uppercase" style={{ letterSpacing: "0.2em", fontSize: "0.85rem", fontFamily: fontStack(theme.fontHeading) }}>— {g.name} —</h3>
              <div className="mt-5 space-y-5">
                {arr<{ name: string; description: string; price: string }>(g.items).map((it, j) => (
                  <div key={j}>
                    <div className="flex items-baseline gap-2 font-medium">
                      <span>{it.name}</span>
                      <span className="mx-1 flex-1 border-b border-dotted" style={{ borderColor: theme.muted }} />
                      <span style={{ color: theme.accent, fontFamily: fontStack(theme.fontHeading), fontWeight: 700 }}>{it.price}</span>
                    </div>
                    <p className="mt-0.5 text-[13px] italic" style={{ color: theme.muted }}>{it.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery: C = ({ content, theme }) => {
  const images = arr<string>(content.images);
  return (
    <section className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <h2 className="text-center italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2rem * ${theme.headingScale})` }}>{str(content.title, "From the pass")}</h2>
        <div className="mt-8 columns-2 gap-3 md:columns-3 [&>*]:mb-3">
          {images.map((img, i) => (
            <div key={i} className="break-inside-avoid overflow-hidden" style={{ borderRadius: theme.radius, background: theme.surface, aspectRatio: i % 3 === 1 ? "3/4" : "1/1" }}>
              {img ? <img src={img} alt="" className="h-full w-full object-cover" /> : (
                <EmptyArt theme={theme} glyph={String(i + 1).padStart(2, "0")} caption="From the pass" className="h-full min-h-44" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Hours: C = ({ content, theme }) => {
  const rows = arr<{ day: string; time: string }>(content.rows);
  return (
    <section className={sectionPad(theme)} style={{ background: theme.primary, color: "#fff8ef" }}>
      <div className={`mx-auto grid gap-8 px-6 md:grid-cols-2 ${containerWidth(theme)}`}>
        <div>
          <p className="text-xs font-semibold uppercase" style={{ letterSpacing: "0.3em", color: "#f5c98a" }}>{str(content.heading, "Find us")}</p>
          <h2 className="mt-2 italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})` }}>{str(content.title, "Hours & location")}</h2>
          <p className="mt-4">{str(content.address)}</p>
          <p className="opacity-80">{str(content.phone)}</p>
          <a href="#contact" className={`${btnRadius(theme)} mt-6 inline-block px-6 py-3 text-sm font-bold`} style={{ background: "#fff8ef", color: theme.primary }}>Reserve a table</a>
        </div>
        <div className="border border-white/25 p-7" style={{ borderRadius: theme.radius * 1.3 }}>
          {rows.map((r, i) => (
            <div key={i} className="flex items-baseline justify-between gap-3 border-b border-white/15 py-3 text-sm last:border-0">
              <span className="opacity-70">{r.day}</span>
              <span className="mx-1 flex-1 border-b border-dotted border-white/25" />
              <span className="font-semibold">{r.time}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials: C = ({ content, theme }) => {
  const items = arr<{ name: string; message: string; company: string }>(content.items);
  return (
    <section className={sectionPad(theme)}>
      <div className={`mx-auto max-w-3xl px-6 text-center ${containerWidth(theme)}`}>
        <span className="italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "2rem", color: theme.accent }}>“</span>
        {items.slice(0, 2).map((t0, i) => (
          <figure key={i} className="mb-8">
            <blockquote className="italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "1.35rem", lineHeight: 1.45 }}>{t0.message}</blockquote>
            <figcaption className="mt-3 font-mono text-xs uppercase tracking-widest" style={{ color: theme.muted }}>— {t0.name}{t0.company ? `, ${t0.company}` : ""}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

const Contact: C = ({ content, theme }) => (
  <section id="contact" className={sectionPad(theme)} style={{ background: theme.surface }}>
    <div className={`mx-auto grid gap-8 px-6 md:grid-cols-2 ${containerWidth(theme)}`}>
      <div>
        <p className="text-xs font-semibold uppercase" style={{ letterSpacing: "0.3em", color: theme.accent }}>{str(content.heading, "Reservations")}</p>
        <h2 className="mt-2 italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})` }}>{str(content.title)}</h2>
        <p className="mt-3 text-sm" style={{ color: theme.muted }}>{str(content.body)}</p>
        <p className="mt-5 font-semibold">{str(content.phone)}</p>
        <p className="text-sm" style={{ color: theme.muted }}>{str(content.email)} · {str(content.location)}</p>
      </div>
      <form action="#contact" className="space-y-3 border bg-white p-6" style={{ borderRadius: theme.radius * 1.3, borderColor: theme.surface }}>
        <div className="grid grid-cols-2 gap-3">
          <input required name="name" placeholder="Name" className="rounded-lg border bg-white px-3 py-2.5 text-sm" />
          <input required name="guests" placeholder="Guests" className="rounded-lg border bg-white px-3 py-2.5 text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input required name="date" type="date" className="rounded-lg border bg-white px-3 py-2.5 text-sm" />
          <input required name="phone" placeholder="Phone" className="rounded-lg border bg-white px-3 py-2.5 text-sm" />
        </div>
        <textarea name="notes" rows={3} placeholder="Occasion, allergies, seating wishes…" className="w-full rounded-lg border bg-white px-3 py-2.5 text-sm" />
        <button className={`${btnRadius(theme)} w-full py-2.5 text-sm font-bold text-white`} style={{ background: theme.primary }}>Request reservation</button>
      </form>
    </div>
  </section>
);

const Footer: C = ({ content, theme }) => (
  <footer className="px-6 py-10 text-center">
    <p className="italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "1.4rem" }}>{str(content.tagline, "Ember & Oak")}</p>
    <p className="mt-1 font-mono text-[11px] uppercase" style={{ letterSpacing: "0.25em", color: theme.muted }}>Tue – Sun · 5pm – late</p>
    <p className="mt-3 text-xs" style={{ color: theme.muted }}>{str(content.copyright)}</p>
  </footer>
);

export const seed: Partial<Record<SectionType, Record<string, unknown>>> = {
  navbar: { logo: "Ember and Oak", links: [{ label: "Menu", href: "#menu" }, { label: "About", href: "#about" }, { label: "Reservations", href: "#contact" }], cta: "" },
  hero: {
    eyebrow: "Wood-fired kitchen, Lazimpat, Est. 2016", title: "Fire-kissed and seasonal", subtitle: "",
    description: "A neighborhood dining room in Lazimpat built around oak fire, Kavre farms and Himalayan hospitality. Walk-ins welcome.",
    primaryCta: "Reserve a table", secondaryCta: "See the menu", image: "", stats: [],
  },
  about: {
    heading: "Our story", title: "Cooked over oak, served with warmth",
    body: "Ember and Oak began as a twelve-seat counter in Jhamsikhel with one wood oven. A decade later we still cook everything over fire, bread at dawn, tarkari at noon, whole kukhura on weekends.",
    image: "", bullets: ["Wood-fired everything", "Kavre farms within 50 km", "Local wine and chhyang list"],
  },
  menu: {
    heading: "The menu", title: "Eat and drink",
    groups: [
      { name: "To Start", items: [{ name: "Charred Sourdough", description: "Whipped ricotta, hot honey", price: "Rs. 550" }, { name: "Ember Beets", description: "Pistachio, citrus, herbs", price: "Rs. 495" }] },
      { name: "From the Fire", items: [{ name: "Chicken Sekuwa Plate", description: "Rosemary jus, grilled lemon, dhedo", price: "Rs. 1,150" }, { name: "Buff Sukuti Sizzler", description: "Smoked buff, timur, watercress", price: "Rs. 1,250" }] },
      { name: "To Finish", items: [{ name: "Juju Dhau", description: "Bhaktapur king curd, honey", price: "Rs. 350" }, { name: "Chiya Affogato", description: "Vanilla gelato, double milk chiya", price: "Rs. 300" }] },
    ],
  },
  gallery: { heading: "", title: "From the pass", images: ["", "", "", "", "", ""] },
  hours: {
    heading: "Find us", title: "Hours and location", address: "214 Lazimpat Road, Kathmandu", phone: "(01) 444-0114",
    rows: [{ day: "Tue to Thu", time: "11am to 10pm" }, { day: "Fri and Sat", time: "11am to 11pm" }, { day: "Sunday", time: "12pm to 9pm" }, { day: "Monday", time: "Oven rests" }],
  },
  testimonials: {
    heading: "", title: "Guest book",
    items: [
      { name: "Wave Magazine", role: "", company: "Best of Kathmandu", message: "The most exciting fire cooking in the valley right now.", photo: "" },
      { name: "Daniel R.", role: "", company: "Regular since 2017", message: "We have celebrated everything here. The sekuwa alone is worth moving to Lazimpat for.", photo: "" },
    ],
  },
  contact: { heading: "Reservations", title: "Join us at the table", email: "namaste@emberandoak.com.np", phone: "(01) 444-0114", location: "214 Lazimpat Road, Kathmandu", body: "Parties of 7 or more, please call. Full buyouts available on Mondays." },
  footer: { tagline: "Ember and Oak", copyright: "2026 Ember and Oak, Lazimpat, Kathmandu.", showSocial: true },
};

export const components: Record<string, C> = {
  "navbar:centered": Navbar,
  "hero:image": Hero,
  "about:card": About,
  "menu:grouped": Menu,
  "gallery:grid": Gallery,
  "hours:card": Hours,
  "testimonials:minimal": Testimonials,
  "contact:split": Contact,
  "footer:minimal": Footer,
};
