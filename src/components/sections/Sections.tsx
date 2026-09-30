import type { SectionInstance, ThemeConfig } from "@/types/builder";

function fontStack(name: string): string {
  return `'${name}', ui-sans-serif, system-ui, sans-serif`;
}

export function sectionShell(theme: ThemeConfig, extra?: string): React.CSSProperties & { className?: string } {
  return {} as never;
}

export function wrapStyle(theme: ThemeConfig): React.CSSProperties {
  return {
    backgroundColor: theme.background,
    color: theme.text,
    fontFamily: fontStack(theme.fontBody),
    fontSize: theme.bodySize,
    lineHeight: theme.lineHeight,
    letterSpacing: `${theme.letterSpacing}em`,
    ["--t-primary" as string]: theme.primary,
    ["--t-accent" as string]: theme.accent,
    ["--t-muted" as string]: theme.muted,
    ["--t-surface" as string]: theme.surface,
    ["--t-radius" as string]: `${theme.radius}px`,
  } as React.CSSProperties;
}

export function containerWidth(theme: ThemeConfig): string {
  if (theme.contentWidth === "narrow") return "max-w-3xl";
  if (theme.contentWidth === "wide") return "max-w-7xl";
  return "max-w-5xl";
}

export function sectionPad(theme: ThemeConfig): string {
  if (theme.sectionSpacing === "compact") return "py-10 md:py-14";
  if (theme.sectionSpacing === "spacious") return "py-20 md:py-28";
  return "py-14 md:py-20";
}

function btnRadius(theme: ThemeConfig): string {
  if (theme.buttonStyle === "pill") return "rounded-full";
  if (theme.buttonStyle === "square") return "rounded-none";
  return "rounded-lg";
}

function H({ theme, children, className = "" }: { theme: ThemeConfig; children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={className}
      style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(1.875rem * ${theme.headingScale})`, fontWeight: 650, letterSpacing: "-0.02em", lineHeight: 1.15 }}
    >
      {children}
    </h2>
  );
}

function Eyebrow({ theme, children }: { theme: ThemeConfig; children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: theme.accent }}>
      {children}
    </p>
  );
}

function str(v: unknown, fb = ""): string {
  return typeof v === "string" ? v : fb;
}

function arr<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : [];
}

// ─── NAVBAR ───
export function NavbarSection({ s, theme }: { s: SectionInstance; theme: ThemeConfig }) {
  const c = s.content as { logo?: string; links?: { label: string; href: string }[]; cta?: string };
  const links = arr<{ label: string; href: string }>(c.links);
  if (s.variant === "overlay") {
    return (
      <nav className="absolute inset-x-0 top-0 z-10">
        <div className={`mx-auto flex items-center justify-between px-6 py-5 ${containerWidth(theme)}`}>
          <span style={{ fontFamily: fontStack(theme.fontHeading), fontWeight: 700 }}>{str(c.logo, "Studio")}</span>
          <div className="hidden gap-6 text-sm md:flex">{links.map((l, i) => <a key={i} href={l.href} className="opacity-80 hover:opacity-100">{l.label}</a>)}</div>
        </div>
      </nav>
    );
  }
  return (
    <nav className="border-b" style={{ borderColor: theme.surface, background: s.variant === "solid" ? theme.surface : theme.background }}>
      <div className={`mx-auto flex items-center justify-between px-6 py-4 ${containerWidth(theme)}`}>
        <span style={{ fontFamily: fontStack(theme.fontHeading), fontWeight: 700 }}>{str(c.logo, "Studio")}</span>
        <div className="hidden gap-6 text-sm md:flex" style={{ color: theme.muted }}>
          {links.map((l, i) => <a key={i} href={l.href} className="hover:opacity-80">{l.label}</a>)}
        </div>
        {str(c.cta) && (
          <a href="#contact" className={`${btnRadius(theme)} px-4 py-2 text-sm font-medium text-white`} style={{ background: theme.primary }}>
            {str(c.cta)}
          </a>
        )}
      </div>
    </nav>
  );
}

// ─── HERO ───
export function HeroSection({ s, theme }: { s: SectionInstance; theme: ThemeConfig }) {
  const c = s.content as Record<string, unknown>;
  const stats = arr<{ value: string; label: string }>(c.stats);
  const primary = (
    <a href="#work" className={`${btnRadius(theme)} inline-flex px-5 py-2.5 text-sm font-semibold text-white`} style={{ background: theme.primary }}>
      {str(c.primaryCta, "View my work")}
    </a>
  );
  const secondary = str(c.secondaryCta) ? (
    <a href="#contact" className={`${btnRadius(theme)} inline-flex border px-5 py-2.5 text-sm font-semibold`} style={{ borderColor: theme.muted }}>
      {str(c.secondaryCta)}
    </a>
  ) : null;

  if (s.variant === "centered") {
    return (
      <section className={sectionPad(theme)}>
        <div className={`mx-auto px-6 text-center ${containerWidth(theme)}`}>
          {str(c.eyebrow) && <Eyebrow theme={theme}>{str(c.eyebrow)}</Eyebrow>}
          <h1 style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(3rem * ${theme.headingScale})`, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            {str(c.title, "Headline")}
          </h1>
          {str(c.subtitle) && <p className="mx-auto mt-4 max-w-2xl text-lg" style={{ color: theme.muted }}>{str(c.subtitle)}</p>}
          {str(c.description) && <p className="mx-auto mt-3 max-w-2xl" style={{ color: theme.muted }}>{str(c.description)}</p>}
          <div className="mt-8 flex justify-center gap-3">{primary}{secondary}</div>
        </div>
      </section>
    );
  }
  if (s.variant === "image") {
    return (
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${theme.surface}, ${theme.background})` }} />
        <div className={`relative mx-auto px-6 pb-16 pt-24 text-center md:pt-32 ${containerWidth(theme)}`}>
          {str(c.eyebrow) && <Eyebrow theme={theme}>{str(c.eyebrow)}</Eyebrow>}
          <h1 style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(3.25rem * ${theme.headingScale})`, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.02 }}>
            {str(c.title)}
          </h1>
          {str(c.subtitle) && <p className="mx-auto mt-4 max-w-xl text-lg" style={{ color: theme.muted }}>{str(c.subtitle)}</p>}
          <div className="mt-8 flex justify-center gap-3">{primary}{secondary}</div>
          <div className="mx-auto mt-12 aspect-[16/8] max-w-4xl overflow-hidden" style={{ borderRadius: theme.radius * 1.5, background: theme.surface }}>
            {str(c.image) ? <img src={str(c.image)} alt="" className="h-full w-full object-cover" /> : (
              <div className="flex h-full items-center justify-center text-sm" style={{ color: theme.muted }}>Add a hero image in the builder</div>
            )}
          </div>
        </div>
      </section>
    );
  }
  // split / minimal
  return (
    <section className={sectionPad(theme)}>
      <div className={`mx-auto grid items-center gap-10 px-6 md:grid-cols-2 ${containerWidth(theme)}`}>
        <div>
          {str(c.eyebrow) && <Eyebrow theme={theme}>{str(c.eyebrow)}</Eyebrow>}
          <p className="text-sm font-medium" style={{ color: theme.muted }}>{str(c.subtitle)}</p>
          <h1 className="mt-2" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.75rem * ${theme.headingScale})`, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            {str(c.title)}
          </h1>
          {str(c.description) && <p className="mt-4 max-w-lg" style={{ color: theme.muted }}>{str(c.description)}</p>}
          <div className="mt-7 flex gap-3">{primary}{secondary}</div>
          {stats.length > 0 && (
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t pt-6" style={{ borderColor: theme.surface }}>
              {stats.map((st, i) => (
                <div key={i}>
                  <dt className="text-2xl font-bold" style={{ fontFamily: fontStack(theme.fontHeading) }}>{st.value}</dt>
                  <dd className="mt-1 text-xs" style={{ color: theme.muted }}>{st.label}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        <div className="aspect-square overflow-hidden md:aspect-[4/5]" style={{ borderRadius: theme.radius * 1.5, background: theme.surface }}>
          {str(c.image) ? <img src={str(c.image)} alt="" className="h-full w-full object-cover" /> : (
            <div className="flex h-full flex-col items-center justify-center gap-2 p-8 text-center" style={{ color: theme.muted }}>
              <span className="text-4xl" style={{ fontFamily: fontStack(theme.fontHeading) }}>{str(c.title).slice(0, 1) || "A"}</span>
              <span className="text-sm">Upload a portrait in Content → Hero</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── SIMPLE CONTENT SECTIONS ───
export function AboutSection({ s, theme }: { s: SectionInstance; theme: ThemeConfig }) {
  const c = s.content as Record<string, unknown>;
  const bullets = arr<string>(c.bullets);
  return (
    <section id="about" className={sectionPad(theme)} style={{ background: s.variant === "split" ? theme.surface : undefined }}>
      <div className={`mx-auto px-6 ${containerWidth(theme)} ${s.variant === "split" ? "grid gap-10 md:grid-cols-2" : ""}`}>
        {s.variant === "split" && (
          <div className="aspect-[4/3] overflow-hidden" style={{ borderRadius: theme.radius, background: theme.background }}>
            {str(c.image) ? <img src={str(c.image)} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-sm" style={{ color: theme.muted }}>About image</div>}
          </div>
        )}
        <div>
          {str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
          <H theme={theme}>{str(c.title, "About")}</H>
          <p className="mt-4" style={{ color: theme.muted }}>{str(c.body)}</p>
          {bullets.length > 0 && (
            <ul className="mt-6 space-y-2">
              {bullets.map((b, i) => <li key={i} className="flex items-center gap-2 text-sm"><span style={{ color: theme.accent }}>✓</span>{b}</li>)}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export function SkillsSection({ s, theme }: { s: SectionInstance; theme: ThemeConfig }) {
  const c = s.content as Record<string, unknown>;
  const skills = arr<{ name: string; level: number }>(c.skills);
  return (
    <section className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        {str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
        <H theme={theme}>{str(c.title, "Skills")}</H>
        <div className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
          {skills.map((sk, i) => (
            <div key={i}>
              <div className="mb-2 flex justify-between text-sm"><span className="font-medium">{sk.name}</span><span style={{ color: theme.muted }}>{sk.level}%</span></div>
              <div className="h-1.5 overflow-hidden rounded-full" style={{ background: theme.surface }}>
                <div className="h-full rounded-full" style={{ width: `${sk.level}%`, background: theme.primary }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesSection({ s, theme }: { s: SectionInstance; theme: ThemeConfig }) {
  const c = s.content as Record<string, unknown>;
  const items = arr<{ title: string; description: string; icon: string; price: string }>(c.items);
  return (
    <section className={sectionPad(theme)} style={{ background: theme.surface }}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        {str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
        <H theme={theme}>{str(c.title, "Services")}</H>
        {str(c.description) && <p className="mt-3 max-w-2xl" style={{ color: theme.muted }}>{str(c.description)}</p>}
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {items.map((it, i) => (
            <div key={i} className="border p-6" style={{ borderRadius: theme.radius, background: theme.background, borderColor: theme.background }}>
              <div className="mb-4 flex h-10 w-10 items-center justify-center text-lg" style={{ borderRadius: theme.radius / 1.5, background: theme.surface }}>{s.variant === "grid" ? `${i + 1}` : "✦"}</div>
              <h3 className="font-semibold" style={{ fontFamily: fontStack(theme.fontHeading) }}>{it.title}</h3>
              <p className="mt-2 text-sm" style={{ color: theme.muted }}>{it.description}</p>
              {it.price && <p className="mt-4 text-sm font-semibold" style={{ color: theme.accent }}>{it.price}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection({ s, theme }: { s: SectionInstance; theme: ThemeConfig }) {
  const c = s.content as Record<string, unknown>;
  const items = arr<{ title: string; description: string; image: string; tags: string[]; url: string; github: string }>(c.items);
  if (s.variant === "list") {
    return (
      <section id="work" className={sectionPad(theme)}>
        <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
          {str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
          <H theme={theme}>{str(c.title, "Work")}</H>
          <div className="mt-8 divide-y" style={{ borderColor: theme.surface }}>
            {items.map((p, i) => (
              <a key={i} href={p.url || "#"} className="group flex items-center justify-between gap-6 py-5">
                <div><h3 className="text-lg font-semibold group-hover:underline" style={{ fontFamily: fontStack(theme.fontHeading) }}>{p.title}</h3>
                <p className="mt-1 text-sm" style={{ color: theme.muted }}>{p.description}</p></div>
                <span style={{ color: theme.muted }}>→</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (s.variant === "featured") {
    const [first, ...rest] = items;
    return (
      <section id="work" className={sectionPad(theme)}>
        <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
          {str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
          <H theme={theme}>{str(c.title, "Work")}</H>
          {first && (
            <div className="mt-8 grid gap-6 overflow-hidden border md:grid-cols-2" style={{ borderRadius: theme.radius * 1.4, borderColor: theme.surface, background: theme.surface }}>
              <div className="min-h-64 p-8">
                <h3 className="text-2xl font-bold" style={{ fontFamily: fontStack(theme.fontHeading) }}>{first.title}</h3>
                <p className="mt-3" style={{ color: theme.muted }}>{first.description}</p>
                <div className="mt-4 flex gap-2">{arr<string>(first.tags).map((tg, j) => <span key={j} className="rounded-full px-2.5 py-1 text-xs" style={{ background: theme.background }}>{tg}</span>)}</div>
              </div>
              <div className="min-h-64" style={{ background: theme.background }}>{first.image ? <img src={first.image} alt={first.title} className="h-full w-full object-cover" /> : null}</div>
            </div>
          )}
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {rest.map((p, i) => (
              <div key={i} className="border p-6" style={{ borderRadius: theme.radius, borderColor: theme.surface }}>
                <h3 className="font-semibold" style={{ fontFamily: fontStack(theme.fontHeading) }}>{p.title}</h3>
                <p className="mt-2 text-sm" style={{ color: theme.muted }}>{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="work" className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        {str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
        <H theme={theme}>{str(c.title, "Work")}</H>
        {str(c.description) && <p className="mt-3" style={{ color: theme.muted }}>{str(c.description)}</p>}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <article key={i} className="overflow-hidden border" style={{ borderRadius: theme.radius, borderColor: theme.surface, background: theme.background }}>
              <div className="aspect-[4/3]" style={{ background: theme.surface }}>
                {p.image ? <img src={p.image} alt={p.title} className="h-full w-full object-cover" /> : (
                  <div className="flex h-full items-center justify-center text-2xl font-bold opacity-20" style={{ fontFamily: fontStack(theme.fontHeading) }}>{p.title.slice(0, 1)}</div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-semibold" style={{ fontFamily: fontStack(theme.fontHeading) }}>{p.title}</h3>
                <p className="mt-1.5 text-sm" style={{ color: theme.muted }}>{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">{arr<string>(p.tags).map((tg, j) => <span key={j} className="rounded-full px-2 py-0.5 text-[11px]" style={{ background: theme.surface }}>{tg}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExperienceSection({ s, theme }: { s: SectionInstance; theme: ThemeConfig }) {
  const c = s.content as Record<string, unknown>;
  const items = arr<{ company: string; role: string; start: string; end: string; description: string }>(c.items);
  return (
    <section className={sectionPad(theme)} style={{ background: theme.surface }}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        {str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
        <H theme={theme}>{str(c.title, "Experience")}</H>
        <div className="mt-8 space-y-0">
          {items.map((e, i) => (
            <div key={i} className="grid gap-2 border-l-2 py-5 pl-6 md:grid-cols-[1fr_2fr]" style={{ borderColor: theme.background }}>
              <div className="text-sm" style={{ color: theme.muted }}>{e.start} — {e.end}</div>
              <div><h3 className="font-semibold" style={{ fontFamily: fontStack(theme.fontHeading) }}>{e.role} · {e.company}</h3>
              <p className="mt-1 text-sm" style={{ color: theme.muted }}>{e.description}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EducationSection({ s, theme }: { s: SectionInstance; theme: ThemeConfig }) {
  const c = s.content as Record<string, unknown>;
  const items = arr<{ school: string; degree: string; start: string; end: string; description: string }>(c.items);
  return (
    <section className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        {str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
        <H theme={theme}>{str(c.title, "Education")}</H>
        <div className="mt-6 grid gap-4">
          {items.map((e, i) => (
            <div key={i} className="border p-5" style={{ borderRadius: theme.radius, borderColor: theme.surface }}>
              <h3 className="font-semibold">{e.degree}</h3>
              <p className="text-sm" style={{ color: theme.muted }}>{e.school} · {e.start}–{e.end}</p>
              {e.description && <p className="mt-2 text-sm" style={{ color: theme.muted }}>{e.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection({ s, theme }: { s: SectionInstance; theme: ThemeConfig }) {
  const c = s.content as Record<string, unknown>;
  const items = arr<{ name: string; role: string; company: string; message: string; photo: string }>(c.items);
  if (s.variant === "quote") {
    const t0 = items[0];
    if (!t0) return null;
    return (
      <section className={sectionPad(theme)}>
        <div className={`mx-auto px-6 text-center ${containerWidth(theme)}`}>
          <blockquote className="mx-auto max-w-3xl" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(1.75rem * ${theme.headingScale})`, lineHeight: 1.3 }}>“{t0.message}”</blockquote>
          <p className="mt-6 text-sm" style={{ color: theme.muted }}>{t0.name} — {t0.role}, {t0.company}</p>
        </div>
      </section>
    );
  }
  if (s.variant === "minimal") {
    return (
      <section className={sectionPad(theme)} style={{ background: theme.surface }}>
        <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
          <H theme={theme}>{str(c.title, "Testimonials")}</H>
          <div className="mt-8 space-y-8">{items.map((t0, i) => (
            <figure key={i} className="border-l-2 pl-6" style={{ borderColor: theme.accent }}>
              <blockquote>{t0.message}</blockquote>
              <figcaption className="mt-2 text-sm" style={{ color: theme.muted }}>— {t0.name}, {t0.company}</figcaption>
            </figure>
          ))}</div>
        </div>
      </section>
    );
  }
  return (
    <section className={sectionPad(theme)} style={{ background: theme.surface }}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        {str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
        <H theme={theme}>{str(c.title, "Testimonials")}</H>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {items.map((t0, i) => (
            <figure key={i} className="p-6" style={{ borderRadius: theme.radius, background: theme.background }}>
              <blockquote className="text-sm leading-relaxed">“{t0.message}”</blockquote>
              <figcaption className="mt-4 text-sm"><span className="font-semibold">{t0.name}</span><span style={{ color: theme.muted }}> · {t0.role}, {t0.company}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PricingSection({ s, theme }: { s: SectionInstance; theme: ThemeConfig }) {
  const c = s.content as Record<string, unknown>;
  const items = arr<{ name: string; price: string; period: string; description: string; features: string[]; featured: boolean }>(c.items);
  return (
    <section className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <div className="text-center">{str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
        <H theme={theme}>{str(c.title, "Pricing")}</H></div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map((p, i) => (
            <div key={i} className="border p-7" style={{ borderRadius: theme.radius * 1.3, borderColor: p.featured ? theme.primary : theme.surface, background: p.featured ? theme.primary : theme.background, color: p.featured ? "#fff" : undefined }}>
              <h3 className="font-semibold">{p.name}</h3>
              <p className="mt-2 text-3xl font-bold" style={{ fontFamily: fontStack(theme.fontHeading) }}>{p.price}</p>
              <p className="text-sm opacity-70">{p.period} · {p.description}</p>
              <ul className="mt-5 space-y-2 text-sm">{arr<string>(p.features).map((f, j) => <li key={j}>✓ {f}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GallerySection({ s, theme }: { s: SectionInstance; theme: ThemeConfig }) {
  const c = s.content as Record<string, unknown>;
  const images = arr<string>(c.images);
  return (
    <section className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        {str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
        <H theme={theme}>{str(c.title, "Gallery")}</H>
        <div className={`mt-8 grid gap-3 ${s.variant === "masonry" ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2 md:grid-cols-3"}`}>
          {images.map((img, i) => (
            <div key={i} className="aspect-square overflow-hidden" style={{ borderRadius: theme.radius, background: theme.surface }}>
              {img ? <img src={img} alt={`Gallery ${i + 1}`} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-xs" style={{ color: theme.muted }}>Photo {i + 1}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MenuSection({ s, theme }: { s: SectionInstance; theme: ThemeConfig }) {
  const c = s.content as Record<string, unknown>;
  const groups = arr<{ name: string; items: { name: string; description: string; price: string }[] }>(c.groups);
  return (
    <section className={sectionPad(theme)} style={{ background: theme.surface }}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <div className="text-center">{str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
        <H theme={theme}>{str(c.title, "Menu")}</H></div>
        <div className="mx-auto mt-10 grid max-w-4xl gap-10 md:grid-cols-2">
          {groups.map((g, i) => (
            <div key={i}>
              <h3 className="mb-4 border-b pb-2 font-semibold uppercase tracking-wide" style={{ borderColor: theme.background, fontFamily: fontStack(theme.fontHeading) }}>{g.name}</h3>
              <div className="space-y-5">{arr<{ name: string; description: string; price: string }>(g.items).map((it, j) => (
                <div key={j}>
                  <div className="flex justify-between gap-4 font-medium"><span>{it.name}</span><span>{it.price}</span></div>
                  <p className="mt-0.5 text-sm" style={{ color: theme.muted }}>{it.description}</p>
                </div>
              ))}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HoursSection({ s, theme }: { s: SectionInstance; theme: ThemeConfig }) {
  const c = s.content as Record<string, unknown>;
  const rows = arr<{ day: string; time: string }>(c.rows);
  return (
    <section className={sectionPad(theme)}>
      <div className={`mx-auto grid gap-8 px-6 md:grid-cols-2 ${containerWidth(theme)}`}>
        <div>
          {str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
          <H theme={theme}>{str(c.title, "Visit us")}</H>
          <p className="mt-4">{str(c.address)}</p>
          <p style={{ color: theme.muted }}>{str(c.phone)}</p>
        </div>
        <div className="border p-6" style={{ borderRadius: theme.radius, borderColor: theme.surface, background: theme.surface }}>
          {rows.map((r, i) => <div key={i} className="flex justify-between border-b py-2.5 text-sm last:border-0" style={{ borderColor: theme.background }}><span style={{ color: theme.muted }}>{r.day}</span><span className="font-medium">{r.time}</span></div>)}
        </div>
      </div>
    </section>
  );
}

export function TeamSection({ s, theme }: { s: SectionInstance; theme: ThemeConfig }) {
  const c = s.content as Record<string, unknown>;
  const members = arr<{ name: string; role: string; photo: string; bio: string }>(c.members);
  return (
    <section className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        {str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
        <H theme={theme}>{str(c.title, "Team")}</H>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {members.map((m, i) => (
            <div key={i}>
              <div className="aspect-square overflow-hidden" style={{ borderRadius: theme.radius, background: theme.surface }}>
                {m.photo ? <img src={m.photo} alt={m.name} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-3xl font-bold opacity-20" style={{ fontFamily: fontStack(theme.fontHeading) }}>{m.name.slice(0, 1)}</div>}
              </div>
              <h3 className="mt-3 font-semibold">{m.name}</h3>
              <p className="text-sm" style={{ color: theme.accent }}>{m.role}</p>
              <p className="mt-1 text-sm" style={{ color: theme.muted }}>{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection({ s, theme }: { s: SectionInstance; theme: ThemeConfig }) {
  const c = s.content as Record<string, unknown>;
  const steps = arr<{ title: string; description: string }>(c.steps);
  return (
    <section className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        {str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
        <H theme={theme}>{str(c.title, "Process")}</H>
        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {steps.map((st, i) => (
            <div key={i} className="border p-6" style={{ borderRadius: theme.radius, borderColor: theme.surface }}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: theme.primary }}>{i + 1}</span>
              <h3 className="mt-4 font-semibold">{st.title}</h3>
              <p className="mt-1.5 text-sm" style={{ color: theme.muted }}>{st.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection({ s, theme }: { s: SectionInstance; theme: ThemeConfig }) {
  const c = s.content as Record<string, unknown>;
  const items = arr<{ q: string; a: string }>(c.items);
  return (
    <section className={sectionPad(theme)} style={{ background: theme.surface }}>
      <div className={`mx-auto max-w-3xl px-6`}>
        <div className="text-center">{str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
        <H theme={theme}>{str(c.title, "FAQ")}</H></div>
        <div className="mt-8 space-y-3">
          {items.map((f, i) => (
            <details key={i} className="group border p-5" style={{ borderRadius: theme.radius, background: theme.background, borderColor: theme.background }}>
              <summary className="cursor-pointer font-medium">{f.q}</summary>
              <p className="mt-2 text-sm" style={{ color: theme.muted }}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaSection({ s, theme }: { s: SectionInstance; theme: ThemeConfig }) {
  const c = s.content as Record<string, unknown>;
  return (
    <section className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <div className="px-8 py-14 text-center md:py-16" style={{ borderRadius: theme.radius * 1.6, background: theme.primary, color: "#fff" }}>
          <h2 style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2rem * ${theme.headingScale})`, fontWeight: 700 }}>{str(c.title, "Have a project in mind?")}</h2>
          {str(c.description) && <p className="mx-auto mt-3 max-w-xl opacity-80">{str(c.description)}</p>}
          <div className="mt-7 flex justify-center gap-3">
            <a href="#contact" className={`${btnRadius(theme)} bg-white px-5 py-2.5 text-sm font-semibold`} style={{ color: theme.primary }}>{str(c.primaryCta, "Start a project")}</a>
            {str(c.secondaryCta) && <a href="#contact" className={`${btnRadius(theme)} border border-white/40 px-5 py-2.5 text-sm font-semibold`}>{str(c.secondaryCta)}</a>}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection({ s, theme }: { s: SectionInstance; theme: ThemeConfig }) {
  const c = s.content as Record<string, unknown>;
  const inner = (
    <>
      <div>
        {str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
        <H theme={theme}>{str(c.title, "Contact")}</H>
        {str(c.body) && <p className="mt-3" style={{ color: theme.muted }}>{str(c.body)}</p>}
        <div className="mt-6 space-y-2 text-sm">
          {str(c.email) && <p><span style={{ color: theme.muted }}>Email — </span><a href={`mailto:${str(c.email)}`} className="font-medium underline">{str(c.email)}</a></p>}
          {str(c.phone) && <p><span style={{ color: theme.muted }}>Phone — </span>{str(c.phone)}</p>}
          {str(c.location) && <p><span style={{ color: theme.muted }}>Based in — </span>{str(c.location)}</p>}
        </div>
      </div>
      <form action="#contact" className="space-y-3 border p-6" style={{ borderRadius: theme.radius, borderColor: theme.surface, background: theme.surface }}>
        <input required name="name" placeholder="Your name" className="w-full rounded-lg border bg-white px-3 py-2.5 text-sm" style={{ borderColor: theme.background }} />
        <input required name="email" type="email" placeholder="Email address" className="w-full rounded-lg border bg-white px-3 py-2.5 text-sm" style={{ borderColor: theme.background }} />
        <textarea required name="message" placeholder="Tell me about your project…" rows={4} className="w-full rounded-lg border bg-white px-3 py-2.5 text-sm" style={{ borderColor: theme.background }} />
        <button className={`${btnRadius(theme)} w-full py-2.5 text-sm font-semibold text-white`} style={{ background: theme.primary }}>Send message</button>
        <p className="text-center text-xs" style={{ color: theme.muted }}>This demo form doesn&apos;t send email yet.</p>
      </form>
    </>
  );
  return (
    <section id="contact" className={sectionPad(theme)}>
      <div className={`mx-auto grid gap-10 px-6 md:grid-cols-2 ${containerWidth(theme)}`}>{inner}</div>
    </section>
  );
}

export function FooterSection({ s, theme }: { s: SectionInstance; theme: ThemeConfig }) {
  const c = s.content as Record<string, unknown>;
  return (
    <footer className="border-t px-6 py-10" style={{ borderColor: theme.surface }}>
      <div className={`mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between ${containerWidth(theme)}`}>
        <div>
          <p className="font-semibold" style={{ fontFamily: fontStack(theme.fontHeading) }}>{str(c.tagline, "Designed and built with care.")}</p>
          <p className="mt-1 text-xs" style={{ color: theme.muted }}>{str(c.copyright, "© 2026 All rights reserved.")}</p>
        </div>
        <div className="flex gap-4 text-sm" style={{ color: theme.muted }}>
          <a href="#about" className="hover:opacity-70">About</a>
          <a href="#work" className="hover:opacity-70">Work</a>
          <a href="#contact" className="hover:opacity-70">Contact</a>
        </div>
      </div>
    </footer>
  );
}
