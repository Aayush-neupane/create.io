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
};
