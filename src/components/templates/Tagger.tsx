"use client";

import { useEffect } from "react";
import type { SectionInstance } from "@/types/builder";
import { tagSectionElements } from "../builder/elements";

/** Published-site counterpart to the builder's element tagging.
 *  Marks editable nodes with data-el attributes so per-element styles
 *  (move / zoom / tilt) and floating overlays apply outside the builder.
 *  Inert otherwise — no outlines, grips or handlers are attached here. */
export function PublishedTagger({ sections }: { sections: SectionInstance[] }) {
  useEffect(() => {
    const cleanups = sections.map((s) => {
      const root = document.querySelector(`[data-section-id="${CSS.escape(s.id)}"]`);
      if (!root) return () => {};
      return tagSectionElements(root, s);
    });
    return () => cleanups.forEach((fn) => fn());
    // Tag once on mount; published output is static.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
