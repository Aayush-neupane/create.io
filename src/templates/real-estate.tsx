/**
 * Haven — bespoke predesigned library.
 * Boutique brokerage system: solid concierge navbar, listing-card hero,
 * brass-on-forest details. Trust, but make it beautiful.
 */
import type { SectionType } from "@/types/builder";
import { fontStack, containerWidth, sectionPad, btnRadius, str, arr } from "@/components/sections/Sections";
import type { BespokeProps } from "./minimal-portfolio";
import { withPages } from "./minimal-portfolio";

type C = (props: BespokeProps) => React.ReactNode;

const Navbar: C = ({ content, theme, pages }) => {
  const links = withPages(content, pages);
  return (
    <nav className="sticky top-0 z-30" style={{ background: theme.surface, borderBottom: `1px solid ${theme.background}` }}>
      <div className={`mx-auto flex items-center justify-between px-6 py-3.5 ${containerWidth(theme)}`}>
        <span className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-md text-white" style={{ background: theme.primary, fontFamily: fontStack(theme.fontHeading), fontWeight: 800 }}>H</span>
          <span className="flex flex-col leading-none">
            <span style={{ fontFamily: fontStack(theme.fontHeading), fontWeight: 800, fontSize: "1.15rem" }}>{str(content.logo, "Haven")}</span>
            <span className="font-mono text-[10px] uppercase" style={{ letterSpacing: "0.24em", color: theme.accent }}>Homes · Land · Rentals</span>
          </span>
        </span>
        <div className="hidden gap-7 text-sm font-medium md:flex" style={{ color: theme.muted }}>
          {links.map((l, i) => <a key={i} href={l.href} className="transition-opacity hover:opacity-70">{l.label}</a>)}
        </div>
        <a href={str(content.ctaHref) || "#contact"} className="hidden sm:block">
          <span className="font-mono text-xs" style={{ color: theme.muted }}>Call us · </span>
          <span className="text-sm font-bold" style={{ color: theme.primary }}>{str(content.cta) || "(01) 444-8899"}</span>
        </a>
      </div>
    </nav>
  );
};

const Hero: C = ({ content, theme }) => (
  <section className={sectionPad(theme)}>
    <div className={`mx-auto grid items-center gap-10 px-6 lg:grid-cols-[1.1fr_1fr] ${containerWidth(theme)}`}>
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase" style={{ borderColor: theme.accent, color: theme.accent, letterSpacing: "0.16em" }}>{str(content.eyebrow, "Kathmandu valley · 120+ listings")}</p>
        <h1 className="mt-4" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.9rem * ${theme.headingScale})`, fontWeight: 750, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
          {str(content.title, "Find the home your mornings deserve")}
        </h1>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed" style={{ color: theme.muted }}>{str(content.description)}</p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a href={str(content.primaryHref) || "#work"} className={`${btnRadius(theme)} t-btn px-6 py-3 text-sm font-bold text-white`} style={{ background: theme.primary }}>{str(content.primaryCta, "Browse listings")}</a>
          {str(content.secondaryCta) && <a href={str(content.secondaryHref) || "#contact"} className="text-sm font-semibold underline underline-offset-4">{str(content.secondaryCta)}</a>}
        </div>
        {str(content.subtitle) && <p className="mono-meta mt-6 text-xs" style={{ color: theme.muted }}>{str(content.subtitle)}</p>}
      </div>
      <div className="overflow-hidden border shadow-2xl" style={{ borderRadius: theme.radius * 1.6, borderColor: theme.surface, background: theme.surface }}>
        {str(content.image) ? <img src={str(content.image)} alt={str(content.title)} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" /> : (
          <div className="grid aspect-[4/3] place-items-center p-8 text-center" style={{ background: `linear-gradient(150deg, ${theme.primary}, #0e241a)` }}>
            <div>
              <p className="font-mono text-[11px] uppercase" style={{ letterSpacing: "0.26em", color: theme.accent }}>Featured · Budhanilkantha</p>
              <p className="mt-2" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "1.7rem", fontWeight: 750, color: "#fff" }}>4BHK with valley view</p>
              <p className="mt-1 font-mono text-sm font-bold" style={{ color: theme.accent }}>Rs. 4.2 cr · 8 aana</p>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between gap-3 bg-white px-5 py-4">
          <div className="flex gap-4 font-mono text-[11px] font-bold uppercase" style={{ color: theme.muted }}>
            <span>4 bed</span><span>3 bath</span><span>8 aana</span>
          </div>
          <a href={str(content.secondaryHref) || "#contact"} className="text-[13px] font-bold" style={{ color: theme.primary }}>Book a visit →</a>
        </div>
      </div>
    </div>
  </section>
);

const Gallery: C = ({ content, theme }) => {
  const images = arr<string>(content.images);
  return (
    <section id="gallery" className={sectionPad(theme)} style={{ background: theme.surface }}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase" style={{ letterSpacing: "0.24em", color: theme.accent }}>{str(content.heading, "Fresh on the market")}</p>
            <h2 className="mt-2" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})`, fontWeight: 750 }}>{str(content.title)}</h2>
          </div>
          <a href="#contact" className="text-sm font-bold underline underline-offset-4" style={{ color: theme.primary }}>Get the full list →</a>
        </div>
        <div className="no-bar snap-row mt-8 flex gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {images.slice(0, 6).map((img, i) => (
            <article key={i} className="group w-[82%] flex-none overflow-hidden border bg-white sm:w-[48%] md:w-auto" style={{ borderRadius: theme.radius, borderColor: theme.background }}>
              <div className="img-zoom relative aspect-[4/3]" style={{ background: theme.background }}>
                {img ? <img src={img} alt={`Listing ${i + 1}`} loading="lazy" decoding="async" className="h-full w-full object-cover" /> : (
                  <div className="grid h-full min-h-48 place-items-center p-6 text-center" style={{ background: `linear-gradient(150deg, ${theme.primary}, #0e241a)` }}>
                    <div>
                      <p className="font-mono text-[10px] uppercase" style={{ letterSpacing: "0.24em", color: theme.accent }}>Listing nº {String(i + 1).padStart(2, "0")}</p>
                      <p className="mt-1 font-mono font-bold" style={{ color: "#fff" }}>{["4BHK · Budhanilkantha", "3BHK · Jhamsikhel", "Plot · Dhapakhel", "2BHK · Sitapaila", "5BHK · Lazimpat", "Land · Machhegaun"][i % 6]}</p>
                    </div>
                  </div>
                )}
                <span className="absolute left-3 top-3 rounded-sm bg-black/70 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-white">New</span>
              </div>
              <div className="flex items-center justify-between gap-2 p-4">
                <p className="text-sm font-bold" style={{ color: theme.primary }}>{["Rs. 4.2 cr", "Rs. 2.8 cr", "Rs. 1.6 cr", "Rs. 95L", "Rs. 6.5 cr", "Rs. 85L"][i % 6]}</p>
                <p className="font-mono text-[11px]" style={{ color: theme.muted }}>4bd · 3ba · 8a</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stats: C = ({ content, theme }) => {
  const items = arr<{ value: string; label: string }>(content.items);
  return (
    <section className="border-y" style={{ borderColor: theme.surface, background: theme.background }}>
      <dl className={`mx-auto grid grid-cols-2 px-6 py-10 md:grid-cols-4 ${containerWidth(theme)}`}>
        {items.map((st, i) => (
          <div key={i} className="border-l px-6 first:border-l-0 max-md:[&:nth-child(3)]:border-l-0" style={{ borderColor: theme.surface }}>
            <dt className="tabular-nums" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "2rem", fontWeight: 750, color: theme.primary }}>{st.value}</dt>
            <dd className="mt-1 font-mono text-[11px] uppercase" style={{ letterSpacing: "0.14em", color: theme.muted }}>{st.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

const Services: C = ({ content, theme }) => {
  const items = arr<{ title: string; description: string }>(content.items);
  return (
    <section id="services" className={sectionPad(theme)}>
      <div className={`mx-auto grid gap-10 px-6 md:grid-cols-[1fr_1.6fr] ${containerWidth(theme)}`}>
        <div className="md:sticky md:top-28 md:self-start">
          <p className="font-mono text-[11px] font-bold uppercase" style={{ letterSpacing: "0.24em", color: theme.accent }}>{str(content.heading, "Full service")}</p>
          <h2 className="mt-2" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})`, fontWeight: 750 }}>{str(content.title)}</h2>
          {str(content.description) && <p className="mt-3 text-sm leading-relaxed" style={{ color: theme.muted }}>{str(content.description)}</p>}
          <a href="#contact" className={`${btnRadius(theme)} t-btn mt-6 inline-block px-6 py-3 text-sm font-bold text-white`} style={{ background: theme.primary }}>Book a consultation</a>
        </div>
        <div className="divide-y divide-dashed" style={{ borderColor: theme.surface }}>
          {items.map((it, i) => (
            <div key={i} className="group flex gap-5 py-7 transition-transform duration-300 hover:translate-x-1.5">
              <span className="font-mono text-sm font-bold" style={{ color: theme.accent }}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-lg font-bold" style={{ fontFamily: fontStack(theme.fontHeading) }}>{it.title}</h3>
                <p className="mt-1 max-w-lg text-sm leading-relaxed" style={{ color: theme.muted }}>{it.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials: C = ({ content, theme }) => {
  const items = arr<{ name: string; company: string; message: string }>(content.items);
  return (
    <section className={sectionPad(theme)} style={{ background: theme.primary, color: "#fff" }}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <p className="font-mono text-[11px] font-bold uppercase" style={{ letterSpacing: "0.24em", color: theme.accent }}>{str(content.heading, "Moved in")}</p>
        <h2 className="mt-2" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})`, fontWeight: 750 }}>{str(content.title)}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {items.map((t0, i) => (
            <figure key={i} className="flex flex-col border border-white/15 p-6 transition-transform duration-300 hover:-translate-y-1" style={{ borderRadius: theme.radius, background: "rgba(255,255,255,.04)" }}>
              <span aria-hidden style={{ color: theme.accent, fontSize: "1.6rem", lineHeight: 1 }}>“</span>
              <blockquote className="flex-1 text-[15px] leading-relaxed opacity-90">{t0.message}</blockquote>
              <figcaption className="mt-5 border-t border-white/15 pt-4">
                <p className="font-bold">{t0.name}</p>
                <p className="font-mono text-[11px] uppercase tracking-widest opacity-60">{t0.company}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

const Team: C = ({ content, theme }) => {
  const members = arr<{ name: string; role: string; photo: string; bio: string }>(content.members);
  return (
    <section id="team" className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <p className="font-mono text-[11px] font-bold uppercase" style={{ letterSpacing: "0.24em", color: theme.accent }}>{str(content.heading, "Agents")}</p>
        <h2 className="mt-2" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})`, fontWeight: 750 }}>{str(content.title)}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {members.map((m, i) => (
            <article key={i} className="group border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ borderRadius: theme.radius, borderColor: theme.surface }}>
              <div className="img-zoom flex items-center gap-4 border-b p-5" style={{ borderColor: theme.surface }}>
                <div className="grid h-16 w-16 flex-none place-items-center overflow-hidden rounded-full" style={{ background: theme.surface }}>
                  {m.photo ? <img src={m.photo} alt={m.name} loading="lazy" decoding="async" className="h-full w-full object-cover" /> : (
                    <span className="font-bold" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "1.5rem", color: theme.primary }}>{m.name.slice(0, 1)}</span>
                  )}
                </div>
                <div>
                  <h3 className="font-bold" style={{ fontFamily: fontStack(theme.fontHeading) }}>{m.name}</h3>
                  <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: theme.accent }}>{m.role}</p>
                </div>
              </div>
              <p className="p-5 text-sm leading-relaxed" style={{ color: theme.muted }}>{m.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact: C = ({ content, theme }) => (
  <section id="contact" className={sectionPad(theme)} style={{ background: theme.surface }}>
    <div className={`mx-auto grid gap-8 px-6 md:grid-cols-2 ${containerWidth(theme)}`}>
      <div className="border bg-white p-8 md:p-10" style={{ borderRadius: theme.radius * 1.4, borderColor: theme.background }}>
        <p className="font-mono text-[11px] font-bold uppercase" style={{ letterSpacing: "0.24em", color: theme.accent }}>{str(content.heading, "Visit")}</p>
        <h2 className="mt-2" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})`, fontWeight: 750 }}>{str(content.title)}</h2>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: theme.muted }}>{str(content.body)}</p>
        <div className="mt-6 space-y-2 border-t border-dashed pt-5 text-sm" style={{ borderColor: theme.surface }}>
          <p><span className="font-mono text-xs uppercase tracking-widest" style={{ color: theme.muted }}>Office — </span><span className="font-semibold">{str(content.location)}</span></p>
          <p><span className="font-mono text-xs uppercase tracking-widest" style={{ color: theme.muted }}>Phone — </span><span className="font-mono font-bold" style={{ color: theme.primary }}>{str(content.phone)}</span></p>
          <p><span className="font-mono text-xs uppercase tracking-widest" style={{ color: theme.muted }}>Email — </span><span className="font-semibold">{str(content.email)}</span></p>
        </div>
      </div>
      <form action="#contact" className="space-y-3 border border-white/10 p-7 md:p-8" style={{ borderRadius: theme.radius * 1.4, background: theme.primary, color: "#fff" }}>
        <p className="font-mono text-[11px] font-bold uppercase" style={{ letterSpacing: "0.22em", color: theme.accent }}>Request a callback</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <input required name="name" placeholder="Your name" className="rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white outline-none transition-all placeholder:text-white/50 focus:shadow-md" />
          <input required name="phone" placeholder="Phone" className="rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white outline-none transition-all placeholder:text-white/50 focus:shadow-md" />
        </div>
        <select name="interest" className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white outline-none" defaultValue="Buying a home">
          {["Buying a home", "Buying land", "Renting", "Selling with Haven"].map((o) => <option key={o} className="text-black">{o}</option>)}
        </select>
        <div className="flex items-center gap-3 rounded-lg border border-white/20 bg-white/10 px-3 py-2.5">
          <span className="font-mono text-xs uppercase tracking-widest opacity-70">Budget</span>
          <input name="budget" type="range" min={20} max={500} defaultValue={120} aria-label="Budget in lakhs" className="w-full accent-[#b98a2f]" />
          <span className="font-mono text-xs font-bold">Rs. 1.2cr+</span>
        </div>
        <button className={`${btnRadius(theme)} t-btn w-full py-3 text-sm font-bold`} style={{ background: theme.accent, color: "#14201a" }}>Request callback</button>
      </form>
    </div>
  </section>
);

const Footer: C = ({ content, theme }) => (
  <footer className="px-6 py-12" style={{ background: theme.background }}>
    <div className={`mx-auto grid gap-8 md:grid-cols-[1.4fr_1fr_1fr] ${containerWidth(theme)}`}>
      <div>
        <p className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-md text-white" style={{ background: theme.primary, fontFamily: fontStack(theme.fontHeading), fontWeight: 800 }}>H</span>
          <span className="font-bold" style={{ fontFamily: fontStack(theme.fontHeading) }}>{str(content.tagline, "Haven — home, honestly.")}</span>
        </p>
        <p className="mt-3 max-w-xs font-mono text-[11px] uppercase" style={{ letterSpacing: "0.18em", color: theme.muted }}>Durbarmarg · Lalitpur · Bhaktapur</p>
        <p className="mt-3 text-xs" style={{ color: theme.muted }}>{str(content.copyright)}</p>
      </div>
      <div>
        <p className="font-mono text-[11px] font-bold uppercase" style={{ letterSpacing: "0.2em", color: theme.muted }}>Explore</p>
        <div className="mt-3 flex flex-col gap-2 text-sm">
          <a href="#gallery" className="transition-opacity hover:opacity-70">Listings</a>
          <a href="#services" className="transition-opacity hover:opacity-70">Why Haven</a>
          <a href="#team" className="transition-opacity hover:opacity-70">Agents</a>
        </div>
      </div>
      <div>
        <p className="font-mono text-[11px] font-bold uppercase" style={{ letterSpacing: "0.2em", color: theme.muted }}>Office hours</p>
        <div className="mt-3 space-y-1.5 font-mono text-[13px]" style={{ color: theme.muted }}>
          <p>Sun – Fri · 10am – 6pm</p>
          <p>Saturday · open houses</p>
          <a href="#top" className="inline-block pt-2 font-bold transition-all hover:-translate-y-0.5" style={{ color: theme.primary }}>Back to top ↑</a>
        </div>
      </div>
    </div>
  </footer>
);

export const seed: Partial<Record<SectionType, Record<string, unknown>>> = {
  navbar: { logo: "Haven", links: [{ label: "Listings", href: "#gallery" }, { label: "Why Haven", href: "#services" }, { label: "Agents", href: "#team" }, { label: "Contact", href: "#contact" }], cta: "(01) 444-8899", ctaHref: "#contact" },
  hero: {
    eyebrow: "Kathmandu valley · 120+ listings", title: "Find the home your mornings deserve", subtitle: "RERA-style paperwork, verified titles, no broker drama",
    description: "Boutique brokerage for homes, land and rentals across the valley. We verify every title, negotiate hard, and stay till the lalpurja is in your name.",
    primaryCta: "Browse listings", secondaryCta: "Talk to an agent", primaryHref: "#gallery", secondaryHref: "#contact", image: "", stats: [],
  },
  gallery: { heading: "Fresh on the market", title: "This week's listings", images: ["", "", "", "", "", ""] },
  stats: {
    heading: "Track record", title: "", description: "",
    items: [
      { value: "340+", label: "Families housed" },
      { value: "Rs. 280cr", label: "Deals closed" },
      { value: "18 days", label: "Median to offer" },
      { value: "4.9★", label: "Client rating" },
    ],
  },
  services: {
    heading: "Full service", title: "Why Haven",
    description: "One team from first viewing to final signature.",
    items: [
      { title: "Title verification", description: "Malpot records, mohi claims and road-access checks before you pay a rupee.", icon: "shield", price: "" },
      { title: "Honest pricing", description: "Comparables from real Lalitpur–Bhaktapur closes, not wishful thinking.", icon: "chart", price: "" },
      { title: "Loan hand-holding", description: "Pre-approvals from 4 banks, paperwork done with you, not to you.", icon: "doc", price: "" },
    ],
  },
  testimonials: {
    heading: "Moved in", title: "New keys, happy hearts",
    items: [
      { name: "The Adhikaris", role: "", company: "Bought in Sitapaila", message: "They talked us OUT of two overpriced flats before finding ours. Who does that? Haven does.", photo: "" },
      { name: "Menuka & Saroj", role: "", company: "Plot in Dhapakhel", message: "Title check caught a mohi dispute the seller hid. Saved our life savings, literally.", photo: "" },
      { name: "R. Pradhan", role: "", company: "Rented in Jhamsikhel", message: "Found a pet-friendly flat in 6 days. The agent even argued our deposit down.", photo: "" },
    ],
  },
  team: {
    heading: "Agents", title: "People who pick up the phone",
    members: [
      { name: "Sunita Rai", role: "Founder · Residential", photo: "", bio: "12 years, 300+ closes. Knows every tole in Lalitpur by its morning tea stall." },
      { name: "Kiran Joshi", role: "Land & Legal", photo: "", bio: "Ex-malpot officer. Reads title deeds like novels — finds the plot twists." },
      { name: "Asha Limbu", role: "Rentals", photo: "", bio: "Matches humans to homes in days. Pet owners ask for her by name." },
    ],
  },
  contact: { heading: "Visit", title: "Coffee first, contracts later", email: "namaste@havennepal.com", phone: "(01) 444-8899", location: "Durbarmarg, Kathmandu", body: "Walk in with a wishlist, walk out with viewings booked. Saturdays are open-house days." },
  footer: { tagline: "Haven — home, honestly.", copyright: "2026 Haven Realty, Durbarmarg.", showSocial: true },
};

export const components: Record<string, C> = {
  "navbar:solid": Navbar,
  "hero:split": Hero,
  "gallery:feature": Gallery,
  "stats:band": Stats,
  "services:list": Services,
  "testimonials:cards": Testimonials,
  "team:grid": Team,
  "contact:split": Contact,
  "footer:columns": Footer,
};
