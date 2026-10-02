import type { SectionInstance, ThemeConfig } from "@/types/builder";

export function fontStack(name: string): string {
  return `'${name}', ui-sans-serif, system-ui, sans-serif`;
}

export function sectionShell(theme: ThemeConfig, extra?: string): React.CSSProperties & { className?: string } {
  return { backgroundColor: theme.surface, color: theme.text, borderRadius: theme.radius, className: extra };
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
  if (theme.sectionSpacing === "compact") return "py-12 md:py-16";
  if (theme.sectionSpacing === "spacious") return "py-24 md:py-32";
  return "py-16 md:py-24";
}

export function btnRadius(theme: ThemeConfig): string {
  if (theme.buttonStyle === "pill") return "rounded-full";
  if (theme.buttonStyle === "square") return "rounded-none";
  return "rounded-lg";
}

export function H({ theme, children, className = "" }: { theme: ThemeConfig; children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={className}
      style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2rem * ${theme.headingScale})`, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.08, textWrap: "balance" }}
    >
      {children}
    </h2>
  );
}

export function Eyebrow({ theme, children }: { theme: ThemeConfig; children: React.ReactNode }) {
  return (
    <p className="mb-3 flex items-center gap-2 font-mono text-xs font-medium uppercase" style={{ letterSpacing: "0.14em", color: theme.secondary || theme.accent }}>
      <span aria-hidden style={{ width: 18, height: 1, background: "currentColor", opacity: 0.7 }} />
      {children}
    </p>
  );
}

export function str(v: unknown, fb = ""): string {
  return typeof v === "string" ? v : fb;
}

export function arr<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : [];
}

/** Flat stand-in for empty image slots — solid tint, oversized glyph, caption.
 *  Sites look finished before a single upload, with zero gradients. */
export function EmptyArt({ theme, glyph, caption, className = "", style }: {
  theme: ThemeConfig; glyph: string; caption?: string; className?: string; style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden border border-dashed ${className}`}
      style={{
        background: theme.surface,
        color: theme.muted,
        borderColor: theme.muted,
        ...style,
      }}
    >
      <span aria-hidden style={{ fontFamily: fontStack(theme.fontHeading), fontWeight: 800, fontSize: "clamp(2.6rem, 7vw, 5rem)", lineHeight: 1, letterSpacing: "-0.04em", opacity: 0.9 }}>
        {glyph}
      </span>
      {caption && (
        <span className="relative font-mono text-[10px] uppercase" style={{ letterSpacing: "0.22em", opacity: 0.8 }}>
          {caption}
        </span>
      )}
    </div>
  );
}

// ─── NAVBAR ───
export function NavbarSection({ s, theme, pages }: { s: SectionInstance; theme: ThemeConfig; pages?: { title: string; href: string }[] }) {
  const c = s.content as { logo?: string; links?: { label: string; href: string }[]; cta?: string; ctaHref?: string };
  const links = [...arr<{ label: string; href: string }>(c.links), ...((pages ?? []).map((pg) => ({ label: pg.title, href: pg.href })))];
  if (s.variant === "overlay") {
    return (
      <nav className="absolute inset-x-0 top-0 z-10">
        <div className={`mx-auto flex items-center justify-between px-6 py-5 ${containerWidth(theme)}`}>
          <span style={{ fontFamily: fontStack(theme.fontHeading), fontWeight: 700 }}>{str(c.logo, "Studio")}</span>
          <div className="hidden gap-6 text-sm md:flex">{links.map((l, i) => <a key={i} href={l.href} className="opacity-80 transition-opacity hover:opacity-100">{l.label}</a>)}</div>
        </div>
      </nav>
    );
  }
  if (s.variant === "bold") {
    return (
      <nav className="sticky top-0 z-30" style={{ background: theme.primary, color: "#fff" }}>
        <div className={`mx-auto flex items-center justify-between px-6 py-3.5 ${containerWidth(theme)}`}>
          <span className="flex items-center gap-2.5" style={{ fontFamily: fontStack(theme.fontHeading), fontWeight: 800, letterSpacing: "-0.02em" }}>
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-sm font-black" style={{ color: theme.primary }}>{str(c.logo, "S").slice(0, 1)}</span>
            {str(c.logo, "Studio")}
          </span>
          <div className="hidden gap-7 text-[13px] font-medium md:flex">
            {links.map((l, i) => <a key={i} href={l.href} className="opacity-80 transition-opacity hover:opacity-100">{l.label}</a>)}
          </div>
          <a href={str((s.content as { ctaHref?: string }).ctaHref) || "#contact"} className={`${btnRadius(theme)} t-btn bg-white px-4 py-2 text-[13px] font-bold`} style={{ color: theme.primary }}>
            {str(c.cta) || "Start a project"}
          </a>
        </div>
        <div className="h-px bg-white/15" />
      </nav>
    );
  }
  if (s.variant === "centered") {
    return (
      <nav className="sticky top-0 z-30 border-b" style={{ borderColor: theme.surface, background: theme.background }}>
        <div className={`mx-auto px-6 pb-3 pt-5 text-center ${containerWidth(theme)}`}>
          <p className="text-[11px] font-semibold uppercase" style={{ color: theme.muted, letterSpacing: "0.3em" }}>{str(c.logo, "Studio")}</p>
          <div className="mt-1 flex items-center justify-center" style={{ color: theme.muted }}>
            <span className="h-px w-10" style={{ background: theme.surface }} />
            <span className="mx-2 text-xs">✦</span>
            <span className="h-px w-10" style={{ background: theme.surface }} />
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-x-7 gap-y-1 text-sm">
            {links.map((l, i) => <a key={i} href={l.href} className="transition-opacity hover:opacity-70">{l.label}</a>)}
          </div>
        </div>
      </nav>
    );
  }
  return (
    <nav className="sticky top-0 z-30 border-b" style={{ borderColor: theme.surface, background: s.variant === "solid" ? theme.surface : theme.background }}>
      <div className={`mx-auto flex items-center justify-between px-6 py-4 ${containerWidth(theme)}`}>
        <span style={{ fontFamily: fontStack(theme.fontHeading), fontWeight: 700 }}>{str(c.logo, "Studio")}</span>
        <div className="hidden gap-6 text-sm md:flex" style={{ color: theme.muted }}>
          {links.map((l, i) => <a key={i} href={l.href} className="transition-opacity hover:opacity-80">{l.label}</a>)}
        </div>
        {str(c.cta) && (
          <a href={str(c.ctaHref) || "#contact"} className={`${btnRadius(theme)} t-btn px-4 py-2 text-sm font-medium text-white`} style={{ background: theme.primary }}>
            {str(c.cta)}
          </a>
        )}
      </div>
    </nav>
  );
}

// ─── ANNOUNCEMENT BANNER ───
export function BannerSection({ s, theme }: { s: SectionInstance; theme: ThemeConfig }) {
  const c = s.content as Record<string, unknown>;
  const msg = str(c.message, "Now booking — tell me about your project");
  const href = str(c.linkHref);
  const label = str(c.linkLabel);
  return (
    <div className="px-4 py-2 text-center text-[13px] font-medium" style={{ background: s.variant === "dark" ? theme.text : theme.primary, color: "#fff" }}>
      {msg}
      {href && label && <a href={href} className="ml-2 font-bold underline underline-offset-4 transition-opacity hover:opacity-80">{label} →</a>}
    </div>
  );
}

// ─── HERO ───
export function HeroSection({ s, theme }: { s: SectionInstance; theme: ThemeConfig }) {
  const c = s.content as Record<string, unknown>;
  const stats = arr<{ value: string; label: string }>(c.stats);
  const primaryHref = str(c.primaryHref) || "#work";
  const secondaryHref = str(c.secondaryHref) || "#contact";
  const primary = (
    <a href={primaryHref} className={`${btnRadius(theme)} t-btn inline-flex px-5 py-2.5 text-sm font-semibold text-white`} style={{ background: theme.primary }}>
      {str(c.primaryCta, "View my work")}
    </a>
  );
  const secondary = str(c.secondaryCta) ? (
    <a href={secondaryHref} className={`${btnRadius(theme)} t-btn inline-flex border px-5 py-2.5 text-sm font-semibold`} style={{ borderColor: theme.muted }}>
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
      <section className="relative overflow-hidden" style={{ background: theme.surface }}>
        <div className={`relative mx-auto px-6 pb-16 pt-24 text-center md:pt-32 ${containerWidth(theme)}`}>
          {str(c.eyebrow) && <Eyebrow theme={theme}>{str(c.eyebrow)}</Eyebrow>}
          <h1 style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(3.25rem * ${theme.headingScale})`, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.02 }}>
            {str(c.title)}
          </h1>
          {str(c.subtitle) && <p className="mx-auto mt-4 max-w-xl text-lg" style={{ color: theme.muted }}>{str(c.subtitle)}</p>}
          <div className="mt-8 flex justify-center gap-3">{primary}{secondary}</div>
          <div className="mx-auto mt-12 aspect-[16/8] max-w-4xl overflow-hidden" style={{ borderRadius: theme.radius * 1.5, background: theme.surface }}>
            {str(c.image) ? <img src={str(c.image)} alt={str(c.title, "Featured work")} loading="lazy" decoding="async" className="h-full w-full object-cover" /> : (
              <div className="flex h-full items-center justify-center text-sm" style={{ color: theme.muted }}>Add a hero image in the builder</div>
            )}
          </div>
        </div>
      </section>
    );
  }
  if (s.variant === "poster") {
    return (
      <section className="relative overflow-hidden" style={{ background: theme.primary, color: "#fff" }}>
        <div className={`mx-auto px-6 pb-14 pt-20 md:pb-20 md:pt-28 ${containerWidth(theme)}`}>
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70">
            <span className="h-px w-10 bg-white/40" />
            {str(c.eyebrow) || str(c.subtitle) || "Portfolio"}
          </div>
          <h1 className="mt-5 max-w-5xl" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(3.6rem * ${theme.headingScale})`, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.98 }}>
            {str(c.title, "Work that speaks louder")}
          </h1>
          {str(c.description) && <p className="mt-5 max-w-xl text-[15px] leading-relaxed opacity-75">{str(c.description)}</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={primaryHref} className={`${btnRadius(theme)} t-btn bg-white px-6 py-3 text-sm font-bold`} style={{ color: theme.primary }}>{str(c.primaryCta, "View my work")}</a>
            {str(c.secondaryCta) && <a href={secondaryHref} className={`${btnRadius(theme)} t-btn border border-white/40 px-6 py-3 text-sm font-semibold`}>{str(c.secondaryCta)}</a>}
          </div>
          {stats.length > 0 && (
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-white/20 pt-6">
              {stats.map((st, i) => (
                <div key={i}>
                  <dt className="text-3xl font-extrabold" style={{ fontFamily: fontStack(theme.fontHeading) }}>{st.value}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-widest opacity-60">{st.label}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>
    );
  }
  if (s.variant === "editorial") {
    return (
      <section className={sectionPad(theme)}>
        <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-sm" style={{ color: theme.muted }}>01</span>
            <span className="h-px flex-1" style={{ background: theme.surface }} />
            <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: theme.muted }}>{str(c.eyebrow) || str(c.subtitle) || "Introduction"}</span>
          </div>
          <h1 className="mt-6 max-w-4xl" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.9rem * ${theme.headingScale})`, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.08 }}>
            {str(c.title, "Headline")}
          </h1>
          <div className="mt-6 grid gap-8 md:grid-cols-[1.4fr_1fr]">
            {str(c.description) && <p className="max-w-xl text-[15px] leading-relaxed" style={{ color: theme.muted }}>{str(c.description)}</p>}
            <div className="flex flex-col items-start gap-3">
              <div className="flex gap-3">{primary}{secondary}</div>
              {stats.length > 0 && (
                <ul className="mt-2 space-y-1.5">
                  {stats.map((st, i) => (
                    <li key={i} className="text-sm"><span className="font-bold" style={{ fontFamily: fontStack(theme.fontHeading) }}>{st.value}</span> <span style={{ color: theme.muted }}>— {st.label}</span></li>
                  ))}
                </ul>
              )}
            </div>
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
        <div className="img-zoom aspect-square overflow-hidden md:aspect-[4/5]" style={{ borderRadius: theme.radius * 1.5 }}>
          {str(c.image) ? <img src={str(c.image)} alt={str(c.title, "Portrait")} className="h-full w-full object-cover" /> : (
            <EmptyArt theme={theme} glyph={str(c.title).slice(0, 1) || "A"} caption="Portrait" className="h-full" />
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
  if (s.variant === "editorial") {
    return (
      <section id="about" className={sectionPad(theme)}>
        <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
          <div className="grid gap-10 md:grid-cols-[80px_1fr_1fr]">
            <span className="font-mono text-sm" style={{ color: theme.muted }}>(02)</span>
            <blockquote style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(1.9rem * ${theme.headingScale})`, fontWeight: 550, lineHeight: 1.25, letterSpacing: "-0.02em" }}>
              “{str(c.body).slice(0, 140) || str(c.title, "Good work is a mix of taste, systems and care.")}”
            </blockquote>
            <div>
              {str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
              <H theme={theme}>{str(c.title, "About")}</H>
              {bullets.length > 0 && (
                <ul className="mt-5 space-y-0 divide-y" style={{ borderColor: theme.surface }}>
                  {bullets.map((b, i) => <li key={i} className="flex items-baseline gap-3 py-2.5 text-sm"><span className="font-mono text-xs" style={{ color: theme.muted }}>0{i + 1}</span>{b}</li>)}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
  if (s.variant === "card") {
    return (
      <section id="about" className={sectionPad(theme)} style={{ background: theme.surface }}>
        <div className={`mx-auto grid gap-6 px-6 md:grid-cols-[1.2fr_1fr] ${containerWidth(theme)}`}>
          <div className="p-8 md:p-10" style={{ borderRadius: theme.radius * 1.5, background: theme.background }}>
            {str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
            <H theme={theme}>{str(c.title, "About")}</H>
            <p className="mt-4" style={{ color: theme.muted }}>{str(c.body)}</p>
            {bullets.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {bullets.map((b, i) => <span key={i} className="rounded-full px-3 py-1.5 text-xs font-medium" style={{ background: theme.surface }}>{b}</span>)}
              </div>
            )}
          </div>
          <div className="img-zoom overflow-hidden" style={{ borderRadius: theme.radius * 1.5, background: theme.primary, color: "#fff" }}>
            {str(c.image) ? <img src={str(c.image)} alt={str(c.title, "About")} loading="lazy" decoding="async" className="h-full w-full object-cover" /> : (
              <div className="flex h-full min-h-64 flex-col justify-end p-8">
                <p className="text-5xl font-extrabold" style={{ fontFamily: fontStack(theme.fontHeading) }}>✳</p>
                <p className="mt-3 text-sm opacity-80">Add a portrait or studio shot in Content → About.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="about" className={sectionPad(theme)} style={{ background: s.variant === "split" ? theme.surface : undefined }}>
      <div className={`mx-auto px-6 ${containerWidth(theme)} ${s.variant === "split" ? "grid gap-10 md:grid-cols-2" : ""}`}>
        {s.variant === "split" && (
          <div className="img-zoom aspect-[4/3] overflow-hidden" style={{ borderRadius: theme.radius, background: theme.background }}>
            {str(c.image) ? <img src={str(c.image)} alt={str(c.title, "About")} loading="lazy" decoding="async" className="h-full w-full object-cover" /> : <EmptyArt theme={theme} glyph="✳" caption="About" className="h-full min-h-56" />}
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
              <div className="mb-2 flex justify-between text-sm"><span className="font-medium">{sk.name}</span><span className="tabular-nums" style={{ color: theme.muted }}>{sk.level}%</span></div>
              <div className="h-1.5 overflow-hidden rounded-full" style={{ background: theme.surface }}>
                <div className="h-full rounded-full transition-[width] duration-700 ease-out" style={{ width: `${sk.level}%`, background: theme.primary }} />
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
  if (s.variant === "list") {
    return (
      <section id="services" className={sectionPad(theme)}>
        <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
          {str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
          <H theme={theme}>{str(c.title, "Services")}</H>
          <div className="mt-8 border-t" style={{ borderColor: theme.surface }}>
            {items.map((it, i) => (
              <div key={i} className="grid gap-2 border-b py-6 md:grid-cols-[60px_1fr_auto] md:items-baseline" style={{ borderColor: theme.surface }}>
                <span className="font-mono text-sm" style={{ color: theme.muted }}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-lg font-semibold" style={{ fontFamily: fontStack(theme.fontHeading) }}>{it.title}</h3>
                  <p className="mt-1 max-w-xl text-sm" style={{ color: theme.muted }}>{it.description}</p>
                </div>
                {it.price && <span className="text-sm font-bold" style={{ color: theme.accent }}>{it.price}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (s.variant === "split") {
    return (
      <section id="services" className={sectionPad(theme)} style={{ background: theme.primary, color: "#fff" }}>
        <div className={`mx-auto grid gap-10 px-6 md:grid-cols-[1fr_1.4fr] ${containerWidth(theme)}`}>
          <div className="md:sticky md:top-28 md:self-start">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] opacity-60">{str(c.heading) || "Services"}</p>
            <h2 style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2.2rem * ${theme.headingScale})`, fontWeight: 700, lineHeight: 1.1 }}>{str(c.title, "Services")}</h2>
            {str(c.description) && <p className="mt-3 text-sm leading-relaxed opacity-70">{str(c.description)}</p>}
          </div>
          <div className="space-y-4">
            {items.map((it, i) => (
              <div key={i} className="border border-white/15 p-6" style={{ borderRadius: theme.radius }}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-semibold" style={{ fontFamily: fontStack(theme.fontHeading) }}>{it.title}</h3>
                  {it.price && <span className="text-sm font-bold opacity-90">{it.price}</span>}
                </div>
                <p className="mt-1.5 text-sm opacity-70">{it.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="services" className={sectionPad(theme)} style={{ background: theme.surface }}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        {str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
        <H theme={theme}>{str(c.title, "Services")}</H>
        {str(c.description) && <p className="mt-3 max-w-2xl" style={{ color: theme.muted }}>{str(c.description)}</p>}
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {items.map((it, i) => (
            <div key={i} className="border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ borderRadius: theme.radius, background: theme.background, borderColor: theme.background }}>
              <div className="mb-4 flex h-10 w-10 items-center justify-center text-lg transition-transform duration-300 hover:scale-110 hover:-rotate-6" style={{ borderRadius: theme.radius / 1.5, background: theme.surface }}>{s.variant === "grid" ? `${i + 1}` : "✦"}</div>
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
              <a key={i} href={p.url || "#"} className="group flex items-center justify-between gap-6 py-5 transition-transform duration-300 hover:translate-x-1">
                <div><h3 className="text-lg font-semibold group-hover:underline group-hover:underline-offset-4" style={{ fontFamily: fontStack(theme.fontHeading) }}>{p.title}</h3>
                <p className="mt-1 text-sm" style={{ color: theme.muted }}>{p.description}</p></div>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5" style={{ color: theme.muted }}>→</span>
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
              <div className="min-h-64" style={{ background: theme.background }}>{first.image ? <img src={first.image} alt={first.title} loading="lazy" decoding="async" className="h-full w-full object-cover" /> : null}</div>
            </div>
          )}
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {rest.map((p, i) => (
              <div key={i} className="border p-6 transition-transform duration-300 hover:-translate-y-1" style={{ borderRadius: theme.radius, borderColor: theme.surface }}>
                <h3 className="font-semibold" style={{ fontFamily: fontStack(theme.fontHeading) }}>{p.title}</h3>
                <p className="mt-2 text-sm" style={{ color: theme.muted }}>{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (s.variant === "editorial") {
    return (
      <section id="work" className={sectionPad(theme)}>
        <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-sm" style={{ color: theme.muted }}>(03)</span>
            <span className="h-px flex-1" style={{ background: theme.surface }} />
            <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: theme.muted }}>{str(c.heading) || "Selected work"}</span>
          </div>
          <H theme={theme}>{str(c.title, "Work")}</H>
          <div className="mt-10 space-y-12">
            {items.map((p, i) => (
              <article key={i} className={`group grid items-center gap-6 md:grid-cols-2 ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className="img-zoom overflow-hidden" style={{ borderRadius: theme.radius, background: theme.surface }}>
                  <div className="aspect-[4/3]">
                    {p.image ? <img src={p.image} alt={p.title} loading="lazy" decoding="async" className="h-full w-full object-cover" /> : (
                      <div className="flex h-full items-center justify-center">
                        <span className="text-7xl font-extrabold opacity-15 transition-opacity duration-300 group-hover:opacity-30" style={{ fontFamily: fontStack(theme.fontHeading) }}>{String(i + 1).padStart(2, "0")}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <p className="font-mono text-xs" style={{ color: theme.muted }}>{String(i + 1).padStart(2, "0")} — {arr<string>(p.tags).join(" · ")}</p>
                  <h3 className="mt-2" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(1.6rem * ${theme.headingScale})`, fontWeight: 650 }}>{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: theme.muted }}>{p.description}</p>
                  <a href={p.url || "#"} className="group/l mt-3 inline-block text-sm font-semibold underline underline-offset-4">View case <span className="inline-block transition-transform duration-300 group-hover/l:translate-x-1">→</span></a>
                </div>
              </article>
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
            <article key={i} className="group overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl" style={{ borderRadius: theme.radius, borderColor: theme.surface, background: theme.background }}>
              <div className="img-zoom aspect-[4/3]" style={{ background: theme.surface }}>
                {p.image ? <img src={p.image} alt={p.title} loading="lazy" decoding="async" className="h-full w-full object-cover" /> : (
                  <EmptyArt theme={theme} glyph={p.title.slice(0, 1)} caption={arr<string>(p.tags)[0] || "Work"} className="h-full" />
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
    if (items.length === 0) return null;
    return (
      <section id="testimonials" className={sectionPad(theme)}>
        <div className={`mx-auto px-6 text-center ${containerWidth(theme)}`}>
          {str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
          <H theme={theme}>{str(c.title, "Testimonials")}</H>
          <div className="mx-auto mt-8 max-w-3xl space-y-10">{items.map((t0, qi) => (
            <figure key={qi}>
              {t0.photo ? <img src={t0.photo} alt={t0.name} loading="lazy" decoding="async" className="mx-auto h-14 w-14 rounded-full object-cover" /> : null}
              <blockquote className="mx-auto max-w-3xl" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(1.75rem * ${theme.headingScale})`, lineHeight: 1.3 }}>“{t0.message}”</blockquote>
              <p className="mt-6 text-sm" style={{ color: theme.muted }}>{t0.name} — {t0.role}, {t0.company}</p>
            </figure>
          ))}</div>
        </div>
      </section>
    );
  }
  if (s.variant === "minimal") {
    return (
      <section id="testimonials" className={sectionPad(theme)} style={{ background: theme.surface }}>
        <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
          <H theme={theme}>{str(c.title, "Testimonials")}</H>
          <div className="mt-8 space-y-8">{items.map((t0, i) => (
            <figure key={i} className="flex gap-4 border-l-2 pl-6" style={{ borderColor: theme.accent }}>
              {t0.photo ? <img src={t0.photo} alt={t0.name} loading="lazy" decoding="async" className="h-10 w-10 flex-none rounded-full object-cover" /> : null}
              <div>
                <blockquote>{t0.message}</blockquote>
                <figcaption className="mt-2 text-sm" style={{ color: theme.muted }}>— {t0.name}, {t0.company}</figcaption>
              </div>
            </figure>
          ))}</div>
        </div>
      </section>
    );
  }
  return (
    <section id="testimonials" className={sectionPad(theme)} style={{ background: theme.surface }}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        {str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
        <H theme={theme}>{str(c.title, "Testimonials")}</H>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {items.map((t0, i) => (
            <figure key={i} className="p-6 transition-transform duration-300 hover:-translate-y-1" style={{ borderRadius: theme.radius, background: theme.background }}>
              {t0.photo ? <img src={t0.photo} alt={t0.name} loading="lazy" decoding="async" className="mb-3 h-11 w-11 rounded-full object-cover" /> : null}
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
    <section id="pricing" className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <div className="text-center">{str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
        <H theme={theme}>{str(c.title, "Pricing")}</H></div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map((p, i) => (
            <div key={i} className="relative border p-7 transition-transform duration-300 hover:-translate-y-1" style={{ borderRadius: theme.radius * 1.3, borderColor: p.featured ? theme.primary : theme.surface, background: p.featured ? theme.primary : theme.background, color: p.featured ? "#fff" : undefined }}>
              {p.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-900 shadow-md" style={{ color: theme.primary }}>Most popular</span>}
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
  if (s.variant === "feature") {
    const [first, ...rest] = images;
    const cell = (img: string | undefined, i: number, cls = "aspect-square") => (
      <div key={i} className={`img-zoom ${cls} overflow-hidden`} style={{ borderRadius: theme.radius, background: theme.surface }}>
        {img ? <img src={img} alt={`Gallery ${i + 1}`} loading="lazy" decoding="async" className="h-full w-full object-cover" /> : <EmptyArt theme={theme} glyph={String(i + 1).padStart(2, "0")} caption="Frame" className="h-full min-h-32" />}
      </div>
    );
    return (
      <section className={sectionPad(theme)} style={{ background: theme.primary, color: "#fff" }}>
        <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
          <div className="flex items-baseline justify-between gap-4">
            <H theme={{ ...theme, text: "#fff" }}>{str(c.title, "Gallery")}</H>
            <span className="font-mono text-xs opacity-60">{images.length} frames</span>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            <div className="md:col-span-2 md:row-span-2">{cell(first, 0, "aspect-[16/10] h-full min-h-72")}</div>
            {rest.map((img, i) => cell(img, i + 1))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="gallery" className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        {str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
        <H theme={theme}>{str(c.title, "Gallery")}</H>
        <div className="no-bar snap-row mt-8 flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {images.map((img, i) => (
            <div key={i} className="img-zoom aspect-square w-[78%] flex-none overflow-hidden sm:w-[46%] md:w-auto" style={{ borderRadius: theme.radius, background: theme.surface }}>
              {img ? <img src={img} alt={`Gallery ${i + 1}`} loading="lazy" decoding="async" className="h-full w-full object-cover" /> : <EmptyArt theme={theme} glyph={String(i + 1).padStart(2, "0")} caption="Frame" className="h-full min-h-32" />}
            </div>
          ))}
        </div>
        <p className="mono-meta mt-3 text-[11px] md:hidden" style={{ color: theme.muted }}>Swipe →</p>
      </div>
    </section>
  );
}

// ─── VIDEO ───
export function videoEmbedUrl(raw: string): { kind: "youtube" | "vimeo" | "file"; src: string } | null {
  const url = raw.trim();
  if (!url) return null;
  if (/\.(mp4|webm|ogg)(\?|$)/i.test(url)) return { kind: "file", src: url };
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
  if (yt) return { kind: "youtube", src: `https://www.youtube.com/embed/${yt[1]}` };
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return { kind: "vimeo", src: `https://player.vimeo.com/video/${vm[1]}` };
  return null;
}

export function VideoSection({ s, theme }: { s: SectionInstance; theme: ThemeConfig }) {
  const c = s.content as Record<string, unknown>;
  const embed = videoEmbedUrl(str(c.url));
  const frame = embed ? (
    embed.kind === "file" ? (
      <video src={embed.src} controls preload="metadata" className="h-full w-full" />
    ) : (
      <iframe src={embed.src} title={str(c.title, "Video")} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="h-full w-full border-0" />
    )
  ) : (
    <div className="flex h-full min-h-56 flex-col items-center justify-center gap-2 p-8 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full text-xl text-white" style={{ background: theme.primary }}>▶</span>
      <p className="text-sm" style={{ color: theme.muted }}>{str(c.url) ? "That link isn't a YouTube, Vimeo or MP4 URL yet." : "Paste a YouTube, Vimeo or MP4 link in Content → Video."}</p>
      {str(c.url) && <a href={str(c.url)} className="text-sm font-semibold underline underline-offset-4">Open the link →</a>}
    </div>
  );
  if (s.variant === "card") {
    return (
      <section className={sectionPad(theme)} style={{ background: theme.surface }}>
        <div className={`mx-auto grid items-center gap-8 px-6 md:grid-cols-[1fr_1.5fr] ${containerWidth(theme)}`}>
          <div>
            {str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
            <H theme={theme}>{str(c.title, "Watch")}</H>
            {str(c.description) && <p className="mt-3 text-[15px] leading-relaxed" style={{ color: theme.muted }}>{str(c.description)}</p>}
            {str(c.caption) && <p className="mono-meta mt-4 text-xs" style={{ color: theme.muted }}>{str(c.caption)}</p>}
          </div>
          <div className="aspect-video overflow-hidden shadow-xl" style={{ borderRadius: theme.radius * 1.4, background: theme.background }}>{frame}</div>
        </div>
      </section>
    );
  }
  return (
    <section className={sectionPad(theme)}>
      <div className={`mx-auto px-6 text-center ${containerWidth(theme)}`}>
        {str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
        <H theme={theme}>{str(c.title, "Watch")}</H>
        {str(c.description) && <p className="mx-auto mt-3 max-w-2xl" style={{ color: theme.muted }}>{str(c.description)}</p>}
        <div className="mx-auto mt-8 aspect-video max-w-4xl overflow-hidden shadow-xl" style={{ borderRadius: theme.radius * 1.5, background: theme.surface }}>{frame}</div>
        {str(c.caption) && <p className="mono-meta mt-3 text-xs" style={{ color: theme.muted }}>{str(c.caption)}</p>}
      </div>
    </section>
  );
}

// ─── STATS BAND ───
export function StatsSection({ s, theme }: { s: SectionInstance; theme: ThemeConfig }) {
  const c = s.content as Record<string, unknown>;
  const items = arr<{ value: string; label: string }>(c.items);
  if (s.variant === "grid") {
    return (
      <section className={sectionPad(theme)}>
        <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
          {str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
          <H theme={theme}>{str(c.title, "By the numbers")}</H>
          {str(c.description) && <p className="mt-3 max-w-2xl" style={{ color: theme.muted }}>{str(c.description)}</p>}
          <dl className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {items.map((st, i) => (
              <div key={i} className="border p-6 text-center transition-transform duration-300 hover:-translate-y-1" style={{ borderRadius: theme.radius, borderColor: theme.surface, background: theme.surface }}>
                <dt className="text-3xl font-extrabold tabular-nums" style={{ fontFamily: fontStack(theme.fontHeading) }}>{st.value}</dt>
                <dd className="mt-1 text-xs uppercase tracking-widest" style={{ color: theme.muted }}>{st.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    );
  }
    return (
      <section id="gallery" className={sectionPad(theme)} style={{ background: theme.primary, color: "#fff" }}>
      <div className={`mx-auto px-6 text-center ${containerWidth(theme)}`}>
        {str(c.heading) && <p className="mb-3 font-mono text-xs font-medium uppercase opacity-70" style={{ letterSpacing: "0.2em" }}>{str(c.heading)}</p>}
        <h2 style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(1.8rem * ${theme.headingScale})`, fontWeight: 700 }}>{str(c.title, "By the numbers")}</h2>
        <dl className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
          {items.map((st, i) => (
            <div key={i}>
              <dt className="text-4xl font-extrabold tabular-nums" style={{ fontFamily: fontStack(theme.fontHeading) }}>{st.value}</dt>
              <dd className="mt-1 text-xs uppercase tracking-widest opacity-70">{st.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function LogosSection({ s, theme }: { s: SectionInstance; theme: ThemeConfig }) {
  const c = s.content as Record<string, unknown>;
  const items = arr<string>(c.items);
  if (s.variant === "grid") {
    return (
      <section className={sectionPad(theme)}>
        <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
          {str(c.heading) && <p className="text-center font-mono text-xs uppercase" style={{ letterSpacing: "0.2em", color: theme.muted }}>{str(c.heading)}</p>}
          <div className="mx-auto mt-6 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3">
            {items.map((name, i) => (
              <div key={i} className="border px-4 py-5 text-center font-bold" style={{ borderRadius: theme.radius, borderColor: theme.surface, fontFamily: fontStack(theme.fontHeading) }}>{name}</div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="border-y" style={{ borderColor: theme.surface, background: theme.surface }}>
      <div className={`mx-auto px-6 py-8 ${containerWidth(theme)}`}>
        {str(c.heading) && <span className="mb-5 block text-center font-mono text-[11px] uppercase" style={{ letterSpacing: "0.2em", color: theme.muted }}>{str(c.heading)}</span>}
        <div className="no-bar snap-row flex items-center gap-x-10 gap-y-3 overflow-x-auto whitespace-nowrap md:flex-wrap md:justify-center md:overflow-visible md:whitespace-normal">
          {items.map((name, i) => (
            <span key={i} className="flex-none text-lg font-bold opacity-60 transition-opacity duration-300 hover:opacity-100" style={{ fontFamily: fontStack(theme.fontHeading) }}>{name}</span>
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
    <section id="menu" className={sectionPad(theme)} style={{ background: theme.surface }}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <div className="text-center">{str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
        <H theme={theme}>{str(c.title, "Menu")}</H></div>
        <div className="mx-auto mt-10 grid max-w-4xl gap-10 md:grid-cols-2">
          {groups.map((g, i) => (
            <div key={i}>
              <h3 className="mb-4 border-b pb-2 font-semibold uppercase tracking-wide" style={{ borderColor: theme.background, fontFamily: fontStack(theme.fontHeading) }}>{g.name}</h3>
              <div className="space-y-5">{arr<{ name: string; description: string; price: string }>(g.items).map((it, j) => (
                <div key={j}>
                  <div className="flex items-baseline justify-between gap-3 font-medium"><span>{it.name}</span><span aria-hidden className="mx-1 flex-1 border-b border-dotted opacity-40" /><span className="whitespace-nowrap tabular-nums">{it.price}</span></div>
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
    <section id="team" className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        {str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
        <H theme={theme}>{str(c.title, "Team")}</H>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {members.map((m, i) => (
            <div key={i}>
              <div className="img-zoom aspect-square overflow-hidden" style={{ borderRadius: theme.radius, background: theme.surface }}>
                {m.photo ? <img src={m.photo} alt={m.name} loading="lazy" decoding="async" className="h-full w-full object-cover" /> : <EmptyArt theme={theme} glyph={m.name.slice(0, 1)} caption={m.role || "Team"} className="h-full" />}
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
    <section id="process" className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        {str(c.heading) && <Eyebrow theme={theme}>{str(c.heading)}</Eyebrow>}
        <H theme={theme}>{str(c.title, "Process")}</H>
        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {steps.map((st, i) => (
            <div key={i} className="border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ borderRadius: theme.radius, borderColor: theme.surface }}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white transition-transform duration-300 hover:scale-110" style={{ background: theme.primary }}>{i + 1}</span>
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
  const primaryHref = str(c.primaryHref) || "#contact";
  const secondaryHref = str(c.secondaryHref) || "#contact";
  return (
    <section className={sectionPad(theme)}>
      <div className={`mx-auto px-6 ${containerWidth(theme)}`}>
        <div className="px-8 py-14 text-center md:py-16" style={{ borderRadius: theme.radius * 1.6, background: theme.primary, color: "#fff" }}>
          <h2 style={{ fontFamily: fontStack(theme.fontHeading), fontSize: `calc(2rem * ${theme.headingScale})`, fontWeight: 700 }}>{str(c.title, "Have a project in mind?")}</h2>
          {str(c.description) && <p className="mx-auto mt-3 max-w-xl opacity-80">{str(c.description)}</p>}
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href={primaryHref} className={`${btnRadius(theme)} t-btn bg-white px-5 py-2.5 text-sm font-semibold`} style={{ color: theme.primary }}>{str(c.primaryCta, "Start a project")}</a>
            {str(c.secondaryCta) && <a href={secondaryHref} className={`${btnRadius(theme)} t-btn border border-white/40 px-5 py-2.5 text-sm font-semibold`}>{str(c.secondaryCta)}</a>}
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
        <input required name="name" placeholder="Your name" className="w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all placeholder:opacity-60 focus:-translate-y-px focus:shadow-md" style={{ borderColor: theme.background }} />
        <input required name="email" type="email" placeholder="Email address" className="w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all placeholder:opacity-60 focus:-translate-y-px focus:shadow-md" style={{ borderColor: theme.background }} />
        <textarea required name="message" placeholder="Tell me about your project…" rows={4} className="w-full resize-y rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all placeholder:opacity-60 focus:shadow-md" style={{ borderColor: theme.background }} />
        <button className={`${btnRadius(theme)} t-btn w-full py-2.5 text-sm font-semibold text-white`} style={{ background: theme.primary }}>Send message</button>
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

export function FooterSection({ s, theme, pages }: { s: SectionInstance; theme: ThemeConfig; pages?: { title: string; href: string }[] }) {
  const c = s.content as Record<string, unknown>;
  const siteLinks = (pages ?? []).slice(0, 6);
  if (s.variant === "big") {
    return (
      <footer className="px-6 pb-8 pt-16" style={{ background: theme.primary, color: "#fff" }}>
        <div className={`mx-auto ${containerWidth(theme)}`}>
          <p className="break-words leading-none" style={{ fontFamily: fontStack(theme.fontHeading), fontSize: "clamp(3rem, 10vw, 7rem)", fontWeight: 800, letterSpacing: "-0.04em" }}>
            {str(c.tagline, "Let's talk.")}
          </p>
          <div className="mt-8 flex flex-col gap-3 border-t border-white/20 pt-6 md:flex-row md:items-center md:justify-between">
            <p className="text-xs opacity-70">{str(c.copyright, "© 2026 All rights reserved.")}</p>
            <div className="flex gap-5 text-sm">
              {siteLinks.length > 0 ? siteLinks.map((p) => <a key={p.href} href={p.href} className="opacity-80 hover:opacity-100">{p.title}</a>) : (<>
                <a href="#about" className="opacity-80 hover:opacity-100">About</a>
                <a href="#work" className="opacity-80 hover:opacity-100">Work</a>
                <a href="#contact" className="opacity-80 hover:opacity-100">Contact</a>
              </>)}
            </div>
          </div>
        </div>
      </footer>
    );
  }
  if (s.variant === "minimal") {
    return (
      <footer className="px-6 py-10 text-center" style={{ borderTop: `1px solid ${theme.surface}` }}>
        <p className="text-[11px] font-semibold uppercase" style={{ color: theme.muted, letterSpacing: "0.28em" }}>{str(c.tagline, "Designed and built with care.")}</p>
        <p className="mt-2 text-xs" style={{ color: theme.muted }}>{str(c.copyright, "© 2026 All rights reserved.")}</p>
        <a href="#top" className="mt-4 inline-flex items-center gap-1 text-xs font-medium transition-all hover:-translate-y-0.5" style={{ color: theme.muted }}>Back to top <span aria-hidden>↑</span></a>
      </footer>
    );
  }
  if (s.variant === "columns") {
    return (
      <footer className="px-6 py-12" style={{ background: theme.surface }}>
        <div className={`mx-auto grid gap-8 md:grid-cols-[1.4fr_1fr_1fr] ${containerWidth(theme)}`}>
          <div>
            <p className="font-bold" style={{ fontFamily: fontStack(theme.fontHeading) }}>{str(c.tagline, "Designed and built with care.")}</p>
            <p className="mt-2 text-xs" style={{ color: theme.muted }}>{str(c.copyright, "© 2026 All rights reserved.")}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: theme.muted }}>Sitemap</p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              {siteLinks.length > 0 ? siteLinks.map((p) => <a key={p.href} href={p.href} className="hover:opacity-70">{p.title}</a>) : (<>
                <a href="#about" className="hover:opacity-70">About</a>
                <a href="#work" className="hover:opacity-70">Work</a>
                <a href="#contact" className="hover:opacity-70">Contact</a>
              </>)}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: theme.muted }}>Elsewhere</p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <a href="#" className="hover:opacity-70">GitHub</a>
              <a href="#" className="hover:opacity-70">LinkedIn</a>
              <a href="#" className="hover:opacity-70">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  return (
    <footer className="border-t px-6 py-10" style={{ borderColor: theme.surface }}>
      <div className={`mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between ${containerWidth(theme)}`}>
        <div>
          <p className="font-semibold" style={{ fontFamily: fontStack(theme.fontHeading) }}>{str(c.tagline, "Designed and built with care.")}</p>
          <p className="mt-1 text-xs" style={{ color: theme.muted }}>{str(c.copyright, "© 2026 All rights reserved.")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: theme.muted }}>
          {siteLinks.length > 0 ? siteLinks.map((p) => <a key={p.href} href={p.href} className="transition-opacity hover:opacity-70">{p.title}</a>) : (<>
            <a href="#about" className="transition-opacity hover:opacity-70">About</a>
            <a href="#work" className="transition-opacity hover:opacity-70">Work</a>
            <a href="#contact" className="transition-opacity hover:opacity-70">Contact</a>
          </>)}
          <a href="#top" className="transition-all hover:-translate-y-0.5 hover:opacity-70" aria-label="Back to top">↑</a>
        </div>
      </div>
    </footer>
  );
}
