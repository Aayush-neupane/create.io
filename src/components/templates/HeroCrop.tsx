"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { WebsiteConfig } from "@/types/builder";
import { TemplateRenderer } from "./Renderer";
import { getTemplate } from "@/lib/templates";
import { baseTheme, buildConfigFromTemplate } from "@/lib/website-defaults";

const STAGE_W = 1280;

/** Defers heavy live renders until they approach the viewport. The parent
 *  must fix the visible size so the placeholder reserves the same space and
 *  nothing shifts when the real render mounts. */
export function LazyMount({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "240px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-full w-full">
      {inView ? children : <div className="h-full w-full animate-pulse bg-surface-2" aria-hidden="true" />}
    </div>
  );
}

/** Scaled top-crop of an arbitrary site config — the readable preview
 *  primitive. The parent fixes the visible height. */
export function SiteCrop({ config, templateId }: { config: WebsiteConfig; templateId: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      setScale(el.clientWidth / STAGE_W);
      setReady(true);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden bg-white transition-opacity duration-500" style={{ opacity: ready ? 1 : 0 }}>
      <div
        className="pointer-events-none absolute left-0 top-0 origin-top-left select-none"
        style={{ width: STAGE_W, transform: `scale(${scale})` }}
        aria-hidden
      >
        <TemplateRenderer config={config} templateId={templateId} />
      </div>
    </div>
  );
}

/** A readable crop of a template — renders the real site at desktop width
 *  and shows its top (hero) region at near-legible scale, instead of shrinking
 *  the whole page into gray mush. The parent fixes the visible height. */
export function HeroCrop({ templateId }: { templateId: string }) {
  const cfg = useMemo(() => {
    const tpl = getTemplate(templateId);
    const built = buildConfigFromTemplate(
      tpl.id,
      tpl.sections,
      { ...baseTheme(), ...tpl.theme },
      { siteName: tpl.name, ownerName: "", tagline: "", siteDescription: tpl.description },
    );
    // Stable ids: buildConfigFromTemplate mints random ones (Date.now), which
    // would differ between server render and hydration and warn every load.
    built.sections.forEach((s, i) => { s.id = `${templateId}-crop-${s.type}-${i}`; });
    return built;
  }, [templateId]);

  return <SiteCrop config={cfg} templateId={templateId} />;
}
