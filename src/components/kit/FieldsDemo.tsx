"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TEMPLATES, getTemplate } from "@/lib/templates";
import { baseTheme, buildConfigFromTemplate } from "@/lib/website-defaults";
import { SiteCrop, LazyMount } from "@/components/templates/HeroCrop";
import { Chapter } from "@/components/kit/Chapter";

const DEMO_IDS = ["minimal-portfolio", "restaurant", "agency"];

/** The signature section: type into plain fields and watch a real template
 *  re-render with your words. Fields, not code — proven in ten seconds. */
export function FieldsDemo() {
  const [name, setName] = useState("Alex Morgan");
  const [tagline, setTagline] = useState("Product Designer & Developer");
  const [tplId, setTplId] = useState(DEMO_IDS[0]);

  const tpl = getTemplate(tplId);
  const config = useMemo(() => {
    const built = buildConfigFromTemplate(
      tpl.id,
      tpl.sections,
      { ...baseTheme(), ...tpl.theme },
      {
        siteName: name.trim() || tpl.name,
        ownerName: name.trim(),
        tagline: tagline.trim(),
        siteDescription: tpl.description,
      },
    );
    built.sections.forEach((s, i) => { s.id = `${tpl.id}-demo-${s.type}-${i}`; });
    return built;
  }, [tpl, name, tagline]);

  const inputCls =
    "h-13 w-full border border-border bg-background px-4 font-serif text-lg text-foreground outline-none placeholder:text-muted/50 focus:border-primary";

  return (
    <section id="try" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-shell">
        <div className="grid border-b border-border lg:grid-cols-[0.62fr_1.38fr]">
          <div className="px-6 py-10 sm:px-10 lg:border-r lg:border-border lg:px-16 lg:py-16 xl:px-20">
            <Chapter n="01" label="Try the fields" />
          </div>
          <div className="px-6 py-10 sm:px-10 lg:px-16 lg:py-16 xl:px-20">
            <h2 className="max-w-[16ch] font-serif text-[clamp(2.7rem,5.2vw,5.6rem)] font-normal leading-[0.98] tracking-[-0.045em]">
              Type here. Watch a website happen.
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-7 text-[#5e5952] sm:text-lg sm:leading-8">
              No signup, no canvas. These are the actual builder fields, wired to
              a real render — change a word and the site changes with it.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
          <div className="border-b border-border px-6 py-10 sm:px-10 lg:border-b-0 lg:border-r lg:px-14 lg:py-14">
            <div className="mx-auto max-w-md space-y-5">
              <div>
                <label htmlFor="demo-name" className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                  01 · Your name
                </label>
                <input
                  id="demo-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Morgan"
                  maxLength={40}
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="demo-tagline" className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                  02 · Your tagline
                </label>
                <input
                  id="demo-tagline"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Product Designer & Developer"
                  maxLength={80}
                  className={inputCls}
                />
              </div>
              <div>
                <p className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                  03 · Your starting point
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {DEMO_IDS.map((id) => {
                    const t = TEMPLATES.find((x) => x.id === id) ?? TEMPLATES[0];
                    const on = id === tplId;
                    return (
                      <button
                        key={id}
                        onClick={() => setTplId(id)}
                        aria-pressed={on}
                        className={`border px-2 py-3 text-center transition-colors ${on ? "border-foreground bg-foreground text-background" : "border-border bg-surface hover:bg-foreground/5"}`}
                      >
                        <span className="mx-auto grid h-8 w-8 place-items-center rounded-[10px] text-sm font-bold text-white" style={{ background: t.theme.primary }} aria-hidden>
                          {t.name.slice(0, 1)}
                        </span>
                        <span className="mt-1.5 block truncate text-xs font-medium">{t.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <Link
                href={`/new?template=${tpl.id}`}
                className="group flex h-13 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-medium text-background transition hover:bg-primary"
              >
                Start from {tpl.name}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <p className="text-center font-mono text-[8px] uppercase tracking-[0.14em] text-muted">
                Fields, not code · Undo ready · Autosave on
              </p>
            </div>
          </div>

          <div className="relative bg-surface-2 px-4 py-10 sm:px-8 lg:px-12">
            <div className="marketing-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
            <div className="relative mx-auto max-w-[46rem]">
              <div className="mb-4 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.15em] text-muted">
                <span>Live render · {tpl.name}</span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Your words, right now
                </span>
              </div>
              <div className="overflow-hidden border border-border bg-surface shadow-[0_30px_80px_-50px_rgba(41,39,33,.6)]">
                <div className="flex items-center gap-1.5 border-b border-border/40 bg-surface px-4 py-2.5" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-border/50" />
                  <span className="h-2 w-2 rounded-full bg-border/50" />
                  <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                    {(name.trim() || tpl.name).slice(0, 28)}
                  </span>
                </div>
                <div className="h-[26rem] sm:h-[30rem]">
                  <LazyMount>
                    <SiteCrop config={config} templateId={tpl.id} />
                  </LazyMount>
                </div>
              </div>
              <p className="mt-4 text-center font-mono text-[8px] uppercase tracking-[0.14em] text-[#777168]">
                Real render · {tpl.sections.length} sections · {tpl.category}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
