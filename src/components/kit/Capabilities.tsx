import { LayoutTemplate, MousePointerClick, MonitorSmartphone, Zap } from "lucide-react";
import { Chapter } from "@/components/kit/Chapter";

const items = [
  {
    n: "01",
    title: "Whole sites, not parts.",
    body: "Every template is a finished website with a coherent component library — never a blank canvas.",
    Icon: LayoutTemplate,
    detail: "Template library",
    tags: ["Finished sites", "Own components", "Real copy"],
  },
  {
    n: "02",
    title: "Edit fields, not code.",
    body: "Every word, photo, price and hour is a plain field. Click a section and change it — nothing to break.",
    Icon: MousePointerClick,
    detail: "Structured builder",
    tags: ["Click to edit", "Autosave", "Undo all"],
  },
  {
    n: "03",
    title: "Responsive by default.",
    body: "Desktop, tablet and mobile fall out of every template automatically. Taste holds on every screen.",
    Icon: MonitorSmartphone,
    detail: "Every breakpoint",
    tags: ["Desktop", "Tablet", "Mobile"],
  },
  {
    n: "04",
    title: "Publish in one click.",
    body: "SEO, hosting and sharing are built in. Edit and republish whenever — your link stays live.",
    Icon: Zap,
    detail: "Instant publish",
    tags: ["SEO built-in", "Fast pages", "Custom domains"],
  },
];

function Visual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="capability-visual" aria-hidden="true">
        <div className="absolute inset-0 marketing-grid opacity-55" />
        <div className="relative grid h-full grid-cols-[0.8fr_1.2fr] items-center gap-5 p-5 sm:p-6">
          <div className="space-y-2 font-mono text-[8px] uppercase tracking-[0.13em] text-muted">
            {["Sections", "Design", "Content"].map((layer, i) => (
              <div
                key={layer}
                className="capability-layer flex items-center justify-between border border-border/35 bg-surface/90 px-3 py-2"
              >
                <span>{layer}</span>
                <span className={`h-1.5 w-1.5 rounded-full ${i === 1 ? "bg-primary" : "bg-secondary"}`} />
              </div>
            ))}
          </div>
          <svg viewBox="0 0 240 130" className="w-full">
            <g fill="none" stroke="#292721" strokeOpacity=".42" strokeWidth="1.2">
              <path className="kit-dash" d="M26 64H88L127 29H205" />
              <path className="kit-dash" d="M88 64 129 102H205" />
              <path d="M127 29 129 102" />
            </g>
            <circle cx="26" cy="64" r="13" fill="#BC4F30" />
            <circle cx="88" cy="64" r="18" fill="#292721" />
            <circle cx="127" cy="29" r="10" fill="#809177" />
            <circle cx="129" cy="102" r="12" fill="#F5F0E5" stroke="#292721" />
            <circle cx="205" cy="29" r="14" fill="#F5F0E5" stroke="#292721" />
            <circle cx="205" cy="102" r="9" fill="#BC4F30" />
          </svg>
        </div>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="capability-visual bg-[#292721]" aria-hidden="true">
        <div className="absolute left-5 top-4 font-mono text-[8px] uppercase tracking-[0.14em] text-[#858176]">
          Live section map
        </div>
        <div className="absolute right-5 top-4 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.12em] text-[#aaa398]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#9aaa91]" /> Editing live
        </div>
        <svg viewBox="0 0 520 170" className="absolute inset-x-0 bottom-0 w-full">
          <g fill="none" stroke="#A9A398" strokeOpacity=".42" strokeWidth="1.2">
            <path d="M45 102 142 61 239 92 350 42 468 88" />
            <path d="M142 61 175 137 239 92 337 139 468 88" />
            <path d="M45 102 175 137M350 42 337 139" />
          </g>
          <circle cx="45" cy="102" r="17" fill="#BC4F30" />
          <circle cx="142" cy="61" r="10" fill="#F5F0E5" />
          <circle cx="175" cy="137" r="13" fill="#809177" />
          <circle cx="239" cy="92" r="24" fill="#F5F0E5" />
          <circle cx="350" cy="42" r="12" fill="#809177" />
          <circle cx="337" cy="139" r="15" fill="#BC4F30" />
          <circle cx="468" cy="88" r="19" fill="#F5F0E5" />
          <g fill="#292721" fontFamily="ui-monospace, monospace" fontSize="7" textAnchor="middle">
            <text x="45" y="105">NAV</text>
            <text x="239" y="95">HERO</text>
            <text x="468" y="91">CTA</text>
          </g>
        </svg>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="capability-visual" aria-hidden="true">
        <div className="absolute bottom-5 left-8 top-5 w-px bg-border/35" />
        <div className="relative grid h-full content-center gap-3 px-5 py-4 sm:px-8">
          {[
            ["01", "Pick a finished site", "Begin here"],
            ["02", "Drop in your content", "Then fill"],
            ["03", "Tune the look", "Keep taste"],
          ].map(([number, title, state], i) => (
            <div key={number} className="relative grid grid-cols-[1.5rem_1fr_auto] items-center gap-3">
              <span
                className={`relative z-10 grid h-5 w-5 place-items-center rounded-full border border-border font-mono text-[7px] ${i === 0 ? "bg-primary text-white" : "bg-background"}`}
              >
                {number}
              </span>
              <span className="text-xs font-medium sm:text-sm">{title}</span>
              <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-muted">{state}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="capability-visual overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 marketing-grid opacity-45" />
      <div className="kit-scan-beam absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="relative grid h-full grid-cols-[0.8fr_1.2fr] items-center gap-6 p-5 sm:p-6">
        <div className="relative mx-auto grid h-24 w-24 place-items-center rounded-full border border-border/35">
          <div className="absolute inset-2 rounded-full border border-dashed border-primary/65" />
          <Zap className="h-7 w-7 text-foreground" strokeWidth={1.25} />
          <span className="absolute -right-1 top-4 h-2.5 w-2.5 rounded-full bg-primary" />
        </div>
        <div className="space-y-3">
          {[
            ["Sections", "w-[78%]"],
            ["Styles", "w-[58%]"],
            ["SEO", "w-[86%]"],
          ].map(([label, width]) => (
            <div key={label}>
              <div className="flex justify-between font-mono text-[7px] uppercase tracking-[0.12em] text-muted">
                <span>{label}</span>
                <span>Ready</span>
              </div>
              <div className="mt-1.5 h-1 bg-border/10">
                <div className={`h-full bg-secondary ${width}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Capabilities() {
  return (
    <section id="product" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-shell">
        <div className="grid border-b border-border lg:grid-cols-[0.62fr_1.38fr]">
          <div className="px-6 py-10 sm:px-10 lg:border-r lg:border-border lg:px-16 lg:py-16 xl:px-20">
            <Chapter n="02" label="Why it works" />
          </div>
          <div className="px-6 py-10 sm:px-10 lg:px-16 lg:py-16 xl:px-20">
            <h2 className="max-w-[17ch] font-serif text-[clamp(2.7rem,5.2vw,5.6rem)] font-normal leading-[0.98] tracking-[-0.045em]">
              Opinionated, on purpose.
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-7 text-[#5e5952] sm:text-lg sm:leading-8">
              A finished site with its own components and copy — structured editing keeps
              every result professional. Undo, autosave and SEO included.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2">
          {items.map((item, index) => {
            const Icon = item.Icon;
            return (
              <article
                key={item.n}
                data-scroll-reveal
                className={`capability-card group relative min-h-[34rem] overflow-hidden border-border p-6 transition-colors duration-500 hover:bg-surface-2 sm:p-10 lg:p-12 xl:p-14 ${
                  index % 2 === 0 ? "md:border-r" : ""
                } ${index < 3 ? "border-b" : ""} ${index === 2 ? "md:border-b-0" : ""} ${
                  index === 1 || index === 2 ? "bg-surface/40" : ""
                }`}
              >
                <span className="capability-accent absolute left-0 top-0 h-1 bg-primary" />
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] tracking-[0.16em] text-muted">{item.n}</span>
                  <Icon className="h-8 w-8 text-primary transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-3" strokeWidth={1.35} />
                </div>
                <h3 className="mt-10 max-w-[17ch] font-serif text-3xl leading-[1.05] tracking-[-0.035em] sm:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-5 max-w-lg text-sm leading-7 text-[#5e5952] sm:text-base">{item.body}</p>
                <div className="mt-7">
                  <Visual index={index} />
                </div>
                <ul className="mt-7 grid gap-2 border-t border-border/25 pt-5 text-xs text-muted sm:grid-cols-3">
                  {item.tags.map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-7 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                  {item.detail}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
