/**
 * Bihe — bespoke predesigned library.
 * Romantic Nepali wedding system: double-rule masthead, serif vows hero,
 * light editorial gallery, RSVP-first contact, monogram footer.
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
      <div className={`mx-auto px-6 pb-4 pt-5 text-center ${containerWidth(theme)}`}>
        <p className="italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "1.5rem", fontWeight: 600 }}>{str(content.logo, "A & R")}</p>
        <div className="mt-1.5 flex items-center justify-center gap-2" style={{ color: theme.accent }}>
          <span className="h-px w-10" style={{ background: "currentColor", opacity: 0.6 }} />
          <span className="text-[11px]">❦ ❦</span>
          <span className="h-px w-10" style={{ background: "currentColor", opacity: 0.6 }} />
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-x-7 gap-y-1 text-[12px] font-medium uppercase" style={{ letterSpacing: "0.16em", color: theme.muted }}>
          {links.map((l, i) => <a key={i} href={l.href} className="transition-opacity hover:opacity-70">{l.label}</a>)}
        </div>
      </div>
    </nav>
  );
};

const Hero: C = ({ content, theme }) => (
  <section className="relative overflow-hidden text-center" style={{ background: theme.background }}>
    <div className={`mx-auto px-6 pb-16 pt-16 md:pb-20 md:pt-20 ${containerWidth(theme)}`}>
      <p className="text-xs font-semibold uppercase" style={{ letterSpacing: "0.34em", color: theme.accent }}>{str(content.eyebrow, "Together with their families")}</p>
      <h1 className="mx-auto mt-5 max-w-3xl italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(3.4rem * ${theme.headingScale})`, fontWeight: 500, lineHeight: 1.05 }}>
        {str(content.title, "Aashish weds Reecha")}
      </h1>
      <p className="mx-auto mt-4 max-w-xl italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "1.25rem", color: theme.muted }}>{str(content.subtitle)}</p>
      <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-4">
        <span className="h-px flex-1" style={{ background: theme.accent, opacity: 0.5 }} />
        <span className="font-mono text-sm" style={{ color: theme.accent }}>{str(content.description, "Falgun 12 · Gyaneshwor, Kathmandu")}</span>
        <span className="h-px flex-1" style={{ background: theme.accent, opacity: 0.5 }} />
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a href={str(content.primaryHref) || "#contact"} className={`${btnRadius(theme)} t-btn px-6 py-3 text-sm font-bold text-white`} style={{ background: theme.primary }}>{str(content.primaryCta, "RSVP")}</a>
        {str(content.secondaryCta) && <a href={str(content.secondaryHref) || "#work"} className={`${btnRadius(theme)} t-btn border px-6 py-3 text-sm font-semibold`} style={{ borderColor: theme.accent, color: theme.primary }}>{str(content.secondaryCta)}</a>}
      </div>
      {str(content.image) && <img src={str(content.image)} alt={str(content.title)} loading="lazy" decoding="async" className="mx-auto mt-10 aspect-[16/8] max-w-4xl object-cover" style={{ borderRadius: theme.radius * 2 }} />}
    </div>
  </section>
);

const Gallery: C = ({ content, theme }) => {
  const images = arr<string>(content.images);
  return (
    <section id="gallery" className={sectionPad(theme)} style={{ background: theme.surface }}>
      <div className={`mx-auto px-6 text-center ${containerWidth(theme)}`}>
        <p className="text-xs font-semibold uppercase" style={{ letterSpacing: "0.3em", color: theme.accent }}>{str(content.heading, "Moments")}</p>
        <h2 className="mt-2 italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})` }}>{str(content.title, "Engagement diaries")}</h2>
        <div className="no-bar snap-row mt-8 flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {images.map((img, i) => (
            <div key={i} className="img-zoom w-[80%] flex-none overflow-hidden sm:w-[47%] md:w-auto" style={{ borderRadius: theme.radius * 1.5, background: theme.background, aspectRatio: "3/4" }}>
              {img ? <img src={img} alt={`Wedding ${i + 1}`} loading="lazy" decoding="async" className="h-full w-full object-cover" /> : (
                <EmptyArt theme={theme} glyph="❦" caption="Pre-wedding" className="h-full min-h-64" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact: C = ({ content, theme }) => (
  <section id="contact" className={sectionPad(theme)}>
    <div className={`mx-auto max-w-2xl px-6 text-center ${containerWidth(theme)}`}>
      <p className="text-xs font-semibold uppercase" style={{ letterSpacing: "0.3em", color: theme.accent }}>{str(content.heading, "RSVP")}</p>
      <h2 className="mt-2 italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})` }}>{str(content.title, "Will you join us?")}</h2>
      <p className="mx-auto mt-3 max-w-lg text-sm" style={{ color: theme.muted }}>{str(content.body)}</p>
      <form action="#contact" className="mx-auto mt-8 space-y-3 border bg-white p-6 text-left md:p-8" style={{ borderRadius: theme.radius * 1.4, borderColor: theme.surface }}>
        <div className="grid gap-3 sm:grid-cols-2">
          <input required name="name" placeholder="Your full name" className="rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all focus:shadow-md" />
          <input required name="phone" placeholder="Phone number" className="rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all focus:shadow-md" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <select name="events" className="rounded-lg border bg-white px-3 py-2.5 text-sm outline-none" defaultValue="All events">
            {["Mehendi", "Sangeet", "Bihe ceremony", "Reception", "All events"].map((e) => <option key={e}>{e}</option>)}
          </select>
          <select name="guests" className="rounded-lg border bg-white px-3 py-2.5 text-sm outline-none" defaultValue="2 guests">
            {["1 guest", "2 guests", "3 guests", "4+ guests"].map((e) => <option key={e}>{e}</option>)}
          </select>
        </div>
        <textarea name="wishes" rows={3} placeholder="Blessings, dietary needs, song requests…" className="w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all focus:shadow-md" />
        <button className={`${btnRadius(theme)} t-btn w-full py-3 text-sm font-bold text-white`} style={{ background: theme.primary }}>Send RSVP</button>
      </form>
      <p className="mt-4 text-sm" style={{ color: theme.muted }}>{str(content.phone)} · {str(content.email)}</p>
    </div>
  </section>
);

const Footer: C = ({ content, theme }) => (
  <footer className="px-6 py-12 text-center" style={{ background: theme.primary, color: "#fff" }}>
    <p className="italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "2rem" }}>{str(content.tagline, "A & R")}</p>
    <p className="mt-2 font-mono text-[11px] uppercase opacity-70" style={{ letterSpacing: "0.28em" }}>Falgun 12 · Kathmandu</p>
    <p className="mt-4 text-xs opacity-60">{str(content.copyright)}</p>
    <a href="#top" className="mt-4 inline-block text-xs font-medium opacity-70 transition-all hover:-translate-y-0.5 hover:opacity-100">Back to top ↑</a>
  </footer>
);

const Banner: C = ({ content, theme }) => (
  <div className="px-4 py-2 text-center text-[13px] italic" style={{ background: theme.primary, color: "#fff8f2", fontFamily: fontStack(theme.fontHeading) }}>
    <span aria-hidden>❦ </span>{str(content.message, "Kindly RSVP by Magh 20")}
    {str(content.linkHref) && str(content.linkLabel) && <a href={str(content.linkHref)} className="ml-2 font-sans font-bold not-italic underline underline-offset-4">{str(content.linkLabel)} →</a>}
  </div>
);

const About: C = ({ content, theme }) => {
  const body = str(content.body);
  return (
    <section id="about" className={sectionPad(theme)}>
      <div className={`mx-auto max-w-2xl px-6 text-center ${containerWidth(theme)}`}>
        <p className="text-xs font-semibold uppercase" style={{ letterSpacing: "0.3em", color: theme.accent }}>{str(content.heading, "Our story")}</p>
        <h2 className="mt-3 italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.4rem * ${theme.headingScale})`, fontWeight: 500, lineHeight: 1.15 }}>{str(content.title)}</h2>
        <span aria-hidden className="mx-auto my-5 block h-px w-16" style={{ background: theme.accent }} />
        {body && <p className="text-[16px] leading-[1.9]" style={{ color: theme.text, fontFamily: fontStack(theme.fontHeading) }}>{body}</p>}
        {arr<string>(content.bullets).length > 0 && (
          <div className="mt-7 flex flex-wrap justify-center gap-2.5">
            {arr<string>(content.bullets).map((b, i) => (
              <span key={i} className="rounded-full border px-4 py-2 font-mono text-xs" style={{ borderColor: theme.accent, color: theme.primary }}>{b}</span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const Process: C = ({ content, theme }) => {
  const steps = arr<{ title: string; description: string }>(content.steps);
  return (
    <section id="process" className={sectionPad(theme)} style={{ background: theme.surface }}>
      <div className={`mx-auto max-w-xl px-6 text-center ${containerWidth(theme)}`}>
        <p className="text-xs font-semibold uppercase" style={{ letterSpacing: "0.3em", color: theme.accent }}>{str(content.heading, "Order of the day")}</p>
        <h2 className="mt-2 italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})` }}>{str(content.title)}</h2>
        <div className="mt-10">
          {steps.map((st, i) => (
            <div key={i} className="relative pb-10 last:pb-0">
              {i < steps.length - 1 && <span aria-hidden className="absolute left-1/2 top-8 h-full w-px -translate-x-1/2" style={{ background: theme.accent, opacity: 0.35 }} />}
              <span aria-hidden className="relative z-10 mx-auto grid h-9 w-9 place-items-center rounded-full text-sm" style={{ background: theme.background, border: `1px solid ${theme.accent}`, color: theme.accent }}>❦</span>
              <h3 className="mt-3 italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "1.4rem" }}>{st.title}</h3>
              <p className="mx-auto mt-1.5 max-w-md text-sm leading-relaxed" style={{ color: theme.muted }}>{st.description}</p>
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
    <section className={sectionPad(theme)}>
      <div className={`mx-auto max-w-2xl px-6 text-center ${containerWidth(theme)}`}>
        <p className="text-xs font-semibold uppercase" style={{ letterSpacing: "0.3em", color: theme.accent }}>{str(content.heading, "Blessings")}</p>
        <h2 className="mt-2 italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})` }}>{str(content.title)}</h2>
        <div className="mt-8 space-y-10">
          {items.map((t0, i) => (
            <figure key={i}>
              <span aria-hidden className="italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "2.4rem", color: theme.accent, lineHeight: 1 }}>“</span>
              <blockquote className="italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "1.4rem", lineHeight: 1.5 }}>{t0.message}</blockquote>
              <figcaption className="mt-3 font-mono text-[11px] uppercase" style={{ letterSpacing: "0.22em", color: theme.muted }}>— {t0.name}{t0.company ? ` · ${t0.company}` : ""}</figcaption>
              {i < items.length - 1 && <span aria-hidden className="mx-auto mt-10 block text-sm" style={{ color: theme.accent }}>❦ ❦ ❦</span>}
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
    <section className={sectionPad(theme)} style={{ background: theme.surface }}>
      <div className={`mx-auto max-w-2xl px-6 ${containerWidth(theme)}`}>
        <p className="text-center text-xs font-semibold uppercase" style={{ letterSpacing: "0.3em", color: theme.accent }}>{str(content.heading, "Good to know")}</p>
        <h2 className="mt-2 text-center italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})` }}>{str(content.title)}</h2>
        <div className="mt-8 divide-y" style={{ borderColor: theme.background }}>
          {items.map((f, i) => (
            <details key={i} className="group py-6">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 italic [&::-webkit-details-marker]:hidden" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "1.25rem" }}>
                {f.q}
                <span aria-hidden className="font-sans text-lg transition-transform duration-300 group-open:rotate-45" style={{ color: theme.accent }}>＋</span>
              </summary>
              <div className="faq-a"><div><p className="pt-3 text-[15px] leading-relaxed" style={{ color: theme.muted }}>{f.a}</p></div></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export const seed: Partial<Record<SectionType, Record<string, unknown>>> = {
  navbar: { logo: "A & R", links: [{ label: "Our story", href: "#about" }, { label: "Moments", href: "#gallery" }, { label: "Order of day", href: "#process" }, { label: "RSVP", href: "#contact" }], cta: "" },
  banner: { message: "Seats for the bihe are limited — kindly RSVP by Magh 20", linkLabel: "RSVP", linkHref: "#contact" },
  hero: {
    eyebrow: "Together with their families", title: "Aashish weds Reecha", subtitle: "Two souls, one journey — under the winter sun",
    description: "Falgun 12 · Gyaneshwor, Kathmandu", primaryCta: "RSVP now", secondaryCta: "View events",
    primaryHref: "#contact", secondaryHref: "#process", image: "", stats: [],
  },
  about: {
    heading: "Our story", title: "From a bus stop to a mandap",
    body: "It started with a shared umbrella at Ratnapark in the monsoon of 2019. Six years, two cities and one very patient family later — we are getting married, and you are invited to all of it.",
    image: "", bullets: ["Mehendi · Falgun 9", "Sangeet · Falgun 10", "Bihe · Falgun 12"],
  },
  gallery: { heading: "Moments", title: "Engagement diaries", images: ["", "", "", "", "", ""] },
  process: {
    heading: "Order of the day", title: "Bihe · Falgun 12",
    steps: [
      { title: "Baraat", description: "The groom's procession leaves Lazimpat at 9am sharp, baja included.", icon: "1" },
      { title: "Swayambar", description: "Garland exchange under the mandap, followed by family blessings.", icon: "2" },
      { title: "Kanyadaan & feast", description: "Ceremony concludes by 2pm; lapsi-fish thali for all guests.", icon: "3" },
    ],
  },
  testimonials: {
    heading: "Blessings", title: "Words from family",
    items: [
      { name: "Buwa & Aama", role: "", company: "Both families", message: "May your home be full of laughter, your kitchen full of achaar, and your patience full like the Bagmati in monsoon.", photo: "" },
      { name: "Sathi haru", role: "", company: "College gang", message: "We watched this love story from the back bench. Front row seats at the bihe, finally.", photo: "" },
    ],
  },
  faq: {
    heading: "Good to know", title: "Guest questions",
    items: [
      { q: "What should I wear?", a: "Daura-suruwal or suit for men, saree or kurtha for women. The mandap is outdoors — bring a shawl for the evening." },
      { q: "Can I bring plus-ones or kids?", a: "Tell us in the RSVP and we will save thalis. Kids are welcome at the reception, less so at the ceremony." },
      { q: "Where do I stay?", a: "Out-of-town guests get rooms at Hotel Marshyangdi, Thamel — mention Aashish weds Reecha for the family rate." },
    ],
  },
  contact: { heading: "RSVP", title: "Will you join us?", email: "rsvp@aashishwedsreecha.com.np", phone: "98-10101010", location: "Gyaneshwor, Kathmandu", body: "Kindly respond by Magh 20 so we can count thalis. We cannot wait to celebrate with you." },
  footer: { tagline: "A & R", copyright: "2026 Aashish weds Reecha · Made with love in Kathmandu.", showSocial: true },
};

export const components: Record<string, C> = {
  "navbar:centered": Navbar,
  "banner:strip": Banner,
  "hero:poster": Hero,
  "about:simple": About,
  "gallery:feature": Gallery,
  "process:steps": Process,
  "testimonials:quote": Testimonials,
  "faq:accordion": Faq,
  "contact:split": Contact,
  "footer:minimal": Footer,
};
