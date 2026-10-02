/**
 * Creative Portfolio — bespoke predesigned library.
 * Darkroom system: near-black canvas, serif display, frame numbers, white-on-dark poster.
 */
import type { SectionType } from "@/types/builder";
import { fontStack, containerWidth, sectionPad, btnRadius, str, arr, EmptyArt } from "@/components/sections/Sections";
import type { BespokeProps } from "./minimal-portfolio";
import { withPages } from "./minimal-portfolio";

type C = (props: BespokeProps) => React.ReactNode;

const Navbar: C = ({ content, theme, pages }) => {
  const links = withPages(content, pages);
  return (
    <nav className="absolute inset-x-0 top-0 z-10" style={{ color: "#fff" }}>
      <div className={`mx-auto flex items-center justify-between px-6 py-6 ${containerWidth(theme)}`}>
        <span className="text-lg italic" style={{ fontFamily: fontStack(theme.fontHeading) }}>{str(content.logo, "June Park")}</span>
        <div className="hidden gap-7 text-[13px] uppercase tracking-[0.14em] md:flex">
          {links.map((l, i) => <a key={i} href={l.href} className="opacity-70 hover:opacity-100">{l.label}</a>)}
        </div>
        <span className="rounded-full border border-white/30 px-3 py-1 font-mono text-[11px]">EST. 2017</span>
      </div>
    </nav>
  );
};

const Hero: C = ({ content, theme }) => {
  const stats = arr<{ value: string; label: string }>(content.stats);
  return (
    <section className="relative overflow-hidden" style={{ background: "#0c0c0c", color: "#fff" }}>
      <div className={`mx-auto px-6 pb-16 pt-32 md:pt-40 ${containerWidth(theme)}`}>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/50">{str(content.eyebrow)}</p>
        <h1 className="mt-5 max-w-5xl italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(4rem * ${theme.headingScale})`, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 0.98 }}>
          {str(content.title)}
        </h1>
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-[15px] leading-relaxed text-white/60">{str(content.description)}</p>
          <a href="#work" className={`${btnRadius(theme)} shrink-0 border border-white/40 px-6 py-3 text-sm font-semibold text-white`}>{str(content.primaryCta, "Enter the gallery")}</a>
        </div>
        {stats.length > 0 && (
          <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-white/15 pt-6">
            {stats.map((st, i) => (
              <div key={i}>
                <dt className="text-3xl italic" style={{ fontFamily: fontStack(theme.fontHeading) }}>{st.value}</dt>
                <dd className="mt-1 font-mono text-[11px] uppercase tracking-widest text-white/40">{st.label}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
};

const Gallery: C = ({ content, theme }) => {
  const images = arr<string>(content.images);
  const [first, ...rest] = images;
  const frame = (img: string | undefined, i: number, cls: string) => (
    <figure key={i} className={`${cls} group relative overflow-hidden`} style={{ borderRadius: theme.radius, background: "#1c1c1f" }}>
      {img ? <img src={img} alt="" className="h-full w-full object-cover" /> : (
        <EmptyArt theme={theme} glyph={String(i + 1).padStart(2, "0")} caption="Exposure" className="h-full min-h-40" />
      )}
      <figcaption className="absolute bottom-2 left-3 font-mono text-[10px] text-white/70">FIG. {String(i + 1).padStart(2, "0")}</figcaption>
    </figure>
  );
  return (
    <section id="work" className={sectionPad(theme)} style={{ background: "#0c0c0c", color: "#fff" }}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2rem * ${theme.headingScale})` }}>{str(content.title, "Selected frames")}</h2>
          <span className="font-mono text-xs text-white/40">{images.length} frames</span>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="md:col-span-2 md:row-span-2">{frame(first, 0, "h-full min-h-80")}</div>
          {rest.slice(0, 4).map((img, i) => frame(img, i + 1, "aspect-square"))}
        </div>
      </div>
    </section>
  );
};

const About: C = ({ content, theme }) => {
  const bullets = arr<string>(content.bullets);
  return (
    <section id="about" className={sectionPad(theme)} style={{ background: "#0c0c0c", color: "#fff" }}>
      <div className={`mx-auto grid gap-10 px-6 md:grid-cols-[70px_1fr_1fr] ${containerWidth(theme)}`}>
        <span className="font-mono text-xs text-white/40">( 02 )</span>
        <blockquote className="italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(1.9rem * ${theme.headingScale})`, lineHeight: 1.3 }}>
          “{str(content.body).slice(0, 150) || str(content.title)}”
        </blockquote>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">{str(content.heading)}</p>
          <h3 className="mt-2 text-xl font-semibold">{str(content.title)}</h3>
          {bullets.length > 0 && (
            <ul className="mt-5 space-y-2">
              {bullets.map((b, i) => <li key={i} className="border-t border-white/10 pt-2 text-sm text-white/70">— {b}</li>)}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

const Testimonials: C = ({ content, theme }) => {
  const items = arr<{ name: string; role: string; company: string; message: string }>(content.items);
  const t0 = items[0];
  if (!t0) return null;
  return (
    <section className={sectionPad(theme)} style={{ background: theme.surface, color: "#fff" }}>
      <div className={`mx-auto px-6 text-center ${containerWidth(theme)}`}>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">Field notes</p>
        <blockquote className="mx-auto mt-6 max-w-3xl italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(1.8rem * ${theme.headingScale})`, lineHeight: 1.35 }}>“{t0.message}”</blockquote>
        <p className="mt-6 text-sm text-white/50">{t0.name} — {t0.role}, {t0.company}</p>
        {items.length > 1 && <p className="mt-2 font-mono text-[11px] text-white/30">+ {items.length - 1} more in the book</p>}
      </div>
    </section>
  );
};

const Contact: C = ({ content, theme }) => (
  <section id="contact" className={sectionPad(theme)} style={{ background: "#0c0c0c", color: "#fff" }}>
    <div className={`mx-auto grid gap-10 px-6 md:grid-cols-2 ${containerWidth(theme)}`}>
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">{str(content.heading, "Bookings")}</p>
        <h2 className="mt-3 italic" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.4rem * ${theme.headingScale})`, lineHeight: 1.1 }}>{str(content.title, "Let's make something honest")}</h2>
        <p className="mt-4 max-w-sm text-sm text-white/60">{str(content.body)}</p>
        <p className="mt-6 text-sm"><a className="underline underline-offset-4" href={`mailto:${str(content.email)}`}>{str(content.email)}</a></p>
        <p className="mt-1 font-mono text-xs text-white/40">{str(content.location)}</p>
      </div>
      <form action="#contact" className="space-y-3 border border-white/15 p-6" style={{ borderRadius: theme.radius }}>
        <input required name="name" placeholder="Your name" className="w-full border border-white/15 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/30" />
        <input required name="email" type="email" placeholder="Email" className="w-full border border-white/15 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/30" />
        <textarea required name="message" rows={4} placeholder="Tell me about the shoot…" className="w-full border border-white/15 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/30" />
        <button className="w-full bg-white py-2.5 text-sm font-bold text-black">Request a booking</button>
      </form>
    </div>
  </section>
);

const Footer: C = ({ content, theme }) => (
  <footer className="px-6 pb-8 pt-16" style={{ background: "#0c0c0c", color: "#fff" }}>
    <div className={`mx-auto ${containerWidth(theme)}`}>
      <p className="italic leading-none" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "clamp(3rem, 10vw, 6.5rem)" }}>{str(content.tagline, "Stay in the light.")}</p>
      <div className="mt-8 flex flex-col gap-2 border-t border-white/15 pt-6 font-mono text-[11px] text-white/40 md:flex-row md:justify-between">
        <span>{str(content.copyright)}</span>
        <span>Shot on film & digital — Portland, OR</span>
      </div>
    </div>
  </footer>
);

export const seed: Partial<Record<SectionType, Record<string, unknown>>> = {
  navbar: { logo: "Prerana Gurung", links: [{ label: "Frames", href: "#work" }, { label: "About", href: "#about" }, { label: "Bookings", href: "#contact" }], cta: "" },
  hero: {
    eyebrow: "Wedding and travel photographer, Pokhara", title: "Light, honestly observed", subtitle: "",
    description: "I photograph weddings, treks and everyday life across Nepal, for couples, magazines and brands who hate posing.",
    primaryCta: "Enter the gallery", secondaryCta: "", image: "",
    stats: [{ value: "200+", label: "Weddings" }, { value: "9", label: "Years" }, { value: "14", label: "Districts covered" }],
  },
  gallery: { heading: "", title: "Selected frames", images: ["", "", "", "", ""] },
  about: {
    heading: "The photographer", title: "A patient eye",
    body: "My work starts with listening. Every shoot is unhurried, the best frames arrive when nobody is performing. Home base in Pokhara, available from Mechi to Mahakali.",
    image: "", bullets: ["Weddings and pre-wedding", "Treks and travel stories", "Prints and photo books"],
  },
  testimonials: {
    heading: "Field notes", title: "Kind words",
    items: [
      { name: "Aayush and Shreya", role: "Married", company: "Ghandruk", message: "We forgot the camera existed. The album makes our families cry every Dashain.", photo: "" },
      { name: "Binod Thapa", role: "Editor", company: "Nepali Traveller", message: "Prerana sees what the rest of us walk past. Our Mustang cover sold out.", photo: "" },
    ],
  },
  contact: { heading: "Bookings", title: "Lets make something honest", email: "namaste@prerana.photo", phone: "+977-98560-67890", location: "Pokhara, travels all over Nepal", body: "Wedding season (Nov-Feb) books out fast. Tell me your date and venue." },
  footer: { tagline: "Stay in the light.", copyright: "2026 Prerana Gurung Photography, Pokhara.", showSocial: true },
};

export const components: Record<string, C> = {
  "navbar:overlay": Navbar,
  "hero:poster": Hero,
  "gallery:feature": Gallery,
  "about:editorial": About,
  "testimonials:quote": Testimonials,
  "contact:split": Contact,
  "footer:big": Footer,
};
