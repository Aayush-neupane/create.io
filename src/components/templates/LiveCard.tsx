"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { TemplateRenderer } from "./Renderer";
import { getTemplate } from "@/lib/templates";
import { baseTheme, buildConfigFromTemplate } from "@/lib/website-defaults";

const STAGE_W = 1280;
const STAGE_H = 2600;

/** Live, scaled render of a whole template — browse real sites, not mock skeletons. */
export function LiveCard({ templateId }: { templateId: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);
  const [ready, setReady] = useState(false);

  const cfg = useMemo(() => {
    const tpl = getTemplate(templateId);
    return buildConfigFromTemplate(
      tpl.id,
      tpl.sections,
      { ...baseTheme(), ...tpl.theme },
      { siteName: tpl.name, ownerName: "", tagline: "", siteDescription: tpl.description },
    );
  }, [templateId]);

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
        style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})` }}
        aria-hidden
      >
        <TemplateRenderer config={cfg} templateId={templateId} />
      </div>
    </div>
  );
}
