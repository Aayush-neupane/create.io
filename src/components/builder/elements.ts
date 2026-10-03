import type { SectionInstance, SectionType } from "@/types/builder";

export type ElKind = "text" | "textarea" | "button" | "image";

export interface ElDef {
  key: string;
  label: string;
  kind: ElKind;
  /** content key holding the link URL (buttons). */
  linkKey?: string;
  hint?: string;
}

export interface ListDef {
  arrayKey: string;
  /** item field holding the visible marker text, or "." when items are strings. */
  matchKey: string;
  label: string;
}

const T = (key: string, label: string, kind: ElKind = "text", extra?: Partial<ElDef>): ElDef => ({ key, label, kind, ...extra });
const TA = (key: string, label: string, extra?: Partial<ElDef>): ElDef => ({ key, label, kind: "textarea", ...extra });
const BTN = (key: string, label: string, linkKey: string): ElDef => ({ key, label, kind: "button", linkKey });

/** Editable pieces of every section type — keys match the content model. */
export const ELEMENT_META: Record<SectionType, { singles: ElDef[]; lists: ListDef[] }> = {
  navbar: {
    singles: [T("logo", "Logo text"), BTN("cta", "Button label", "ctaHref")],
    lists: [{ arrayKey: "links", matchKey: "label", label: "Nav link" }],
  },
  banner: {
    singles: [T("message", "Message"), BTN("linkLabel", "Link label", "linkHref")],
    lists: [],
  },
  hero: {
    singles: [
      T("eyebrow", "Kicker"), T("title", "Title"), T("subtitle", "Subtitle"),
      TA("description", "Description"),
      BTN("primaryCta", "Primary button", "primaryHref"),
      BTN("secondaryCta", "Secondary button", "secondaryHref"),
      { key: "image", label: "Hero image", kind: "image" },
    ],
    lists: [{ arrayKey: "stats", matchKey: "value", label: "Stat" }],
  },
  about: {
    singles: [
      T("heading", "Kicker"), T("title", "Title"), TA("body", "Body"),
      { key: "image", label: "Image", kind: "image" },
    ],
    lists: [{ arrayKey: "bullets", matchKey: ".", label: "Checkpoint" }],
  },
  skills: {
    singles: [T("heading", "Kicker"), T("title", "Title")],
    lists: [{ arrayKey: "skills", matchKey: "name", label: "Skill" }],
  },
  services: {
    singles: [T("heading", "Kicker"), T("title", "Title"), TA("description", "Description")],
    lists: [{ arrayKey: "items", matchKey: "title", label: "Service" }],
  },
  projects: {
    singles: [T("heading", "Kicker"), T("title", "Title"), TA("description", "Description")],
    lists: [{ arrayKey: "items", matchKey: "title", label: "Project" }],
  },
  experience: {
    singles: [T("heading", "Kicker"), T("title", "Title")],
    lists: [{ arrayKey: "items", matchKey: "role", label: "Role" }],
  },
  education: {
    singles: [T("heading", "Kicker"), T("title", "Title")],
    lists: [{ arrayKey: "items", matchKey: "degree", label: "Entry" }],
  },
  testimonials: {
    singles: [T("heading", "Kicker"), T("title", "Title")],
    lists: [{ arrayKey: "items", matchKey: "name", label: "Quote" }],
  },
  pricing: {
    singles: [T("heading", "Kicker"), T("title", "Title")],
    lists: [{ arrayKey: "items", matchKey: "name", label: "Plan" }],
  },
  gallery: {
    singles: [T("heading", "Kicker"), T("title", "Title")],
    lists: [{ arrayKey: "images", matchKey: ".", label: "Photo" }],
  },
  team: {
    singles: [T("heading", "Kicker"), T("title", "Title")],
    lists: [{ arrayKey: "members", matchKey: "name", label: "Member" }],
  },
  process: {
    singles: [T("heading", "Kicker"), T("title", "Title")],
    lists: [{ arrayKey: "steps", matchKey: "title", label: "Step" }],
  },
  faq: {
    singles: [T("heading", "Kicker"), T("title", "Title")],
    lists: [{ arrayKey: "items", matchKey: "q", label: "Question" }],
  },
  cta: {
    singles: [
      T("title", "Title"), TA("description", "Description"),
      BTN("primaryCta", "Primary button", "primaryHref"),
      BTN("secondaryCta", "Secondary button", "secondaryHref"),
    ],
    lists: [],
  },
  video: {
    singles: [
      T("heading", "Kicker"), T("title", "Title"), TA("description", "Description"),
      T("url", "Video URL", "text", { hint: "YouTube, Vimeo or MP4 link." }), T("caption", "Caption"),
    ],
    lists: [],
  },
  stats: {
    singles: [T("heading", "Kicker"), T("title", "Title"), TA("description", "Description")],
    lists: [{ arrayKey: "items", matchKey: "value", label: "Stat" }],
  },
  logos: {
    singles: [T("heading", "Heading")],
    lists: [{ arrayKey: "items", matchKey: ".", label: "Name" }],
  },
  contact: {
    singles: [
      T("heading", "Kicker"), T("title", "Title"), TA("body", "Intro"),
      T("email", "Email"), T("phone", "Phone"), T("location", "Location"),
    ],
    lists: [],
  },
  footer: {
    singles: [T("tagline", "Tagline"), T("copyright", "Copyright")],
    lists: [],
  },
  menu: {
    singles: [T("heading", "Kicker"), T("title", "Title")],
    lists: [{ arrayKey: "groups", matchKey: "name", label: "Group" }],
  },
  hours: {
    singles: [T("heading", "Kicker"), T("title", "Title"), T("address", "Address"), T("phone", "Phone")],
    lists: [{ arrayKey: "rows", matchKey: "day", label: "Row" }],
  },
};

export interface ElSelection {
  sectionId: string;
  /** singleton field key (e.g. "title"). */
  key?: string;
  /** list binding for array items. */
  arrayKey?: string;
  index?: number;
}

const norm = (s: string) => s.replace(/\s+/g, " ").trim();

function deepestMatches(root: Element, target: string): Element[] {
  const want = norm(target);
  if (!want) return [];
  const found: Element[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
  let node: Element | null = walker.currentNode as Element;
  // include root's children only (root is the section wrapper)
  while (walker.nextNode()) {
    node = walker.currentNode as Element;
    if (node.tagName === "SCRIPT" || node.tagName === "STYLE") continue;
    if (norm(node.textContent || "") !== want) continue;
    // deepest: no child element carries the same full text
    let child = node.firstElementChild;
    let deeper = false;
    while (child) {
      if (norm(child.textContent || "") === want) { deeper = true; break; }
      child = child.nextElementSibling;
    }
    if (!deeper) found.push(node);
  }
  return found;
}

/**
 * Tag a rendered section's editable nodes with data-el attributes.
 * Zero template cooperation needed: nodes are matched by their content.
 * Returns a cleanup that removes every attribute this pass added.
 */
export function tagSectionElements(root: Element, section: SectionInstance): () => void {
  const added: Element[] = [];
  const tag = (el: Element, value: string) => {
    el.setAttribute("data-el", value);
    added.push(el);
  };
  const meta = ELEMENT_META[section.type];
  if (!meta) return () => {};
  const content = (section.content ?? {}) as Record<string, unknown>;

  for (const def of meta.singles) {
    const v = content[def.key];
    if (typeof v !== "string" || !norm(v)) continue;
    if (def.kind === "image") {
      root.querySelectorAll(`img[src="${CSS.escape(v)}"]`).forEach((img) => tag(img, `${section.id}:${def.key}`));
      continue;
    }
    for (const el of deepestMatches(root, v)) tag(el, `${section.id}:${def.key}`);
  }

  for (const list of meta.lists) {
    const arr = content[list.arrayKey];
    if (!Array.isArray(arr) || arr.length === 0) continue;
    const markers = arr.map((it) => (list.matchKey === "." ? String(it ?? "") : String((it as Record<string, unknown>)?.[list.matchKey] ?? "")));
    const counts = new Map<string, number>();
    markers.forEach((m) => counts.set(norm(m), (counts.get(norm(m)) ?? 0) + 1));
    markers.forEach((marker, index) => {
      const want = norm(marker);
      if (!want || (counts.get(want) ?? 0) !== 1) return; // ambiguous → panel fallback
      const leaves = deepestMatches(root, marker);
      if (leaves.length === 0) return;
      // Climb to the largest ancestor holding exactly this item's marker text.
      let container: Element = leaves[0];
      let parent = container.parentElement;
      while (parent && parent !== root) {
        const text = norm(parent.textContent || "");
        const others = markers.some((m, j) => j !== index && norm(m) && text.includes(norm(m)));
        if (others || !text.includes(want)) break;
        container = parent;
        parent = parent.parentElement;
      }
      tag(container, `${section.id}:${list.arrayKey}:${index}`);
    });
  }

  return () => {
    for (const el of added) el.removeAttribute("data-el");
  };
}

/** Look up the manifest entry for a tag value like "title" or "items:2". */
export function describeTag(
  section: SectionInstance,
  tagKey: string,
): { label: string; kind: ElKind | "item"; linkKey?: string; hint?: string; index?: number; arrayKey?: string } | null {
  const meta = ELEMENT_META[section.type];
  if (!meta) return null;
  const single = meta.singles.find((d) => d.key === tagKey);
  if (single) return { label: single.label, kind: single.kind, linkKey: single.linkKey, hint: single.hint };
  const m = tagKey.match(/^(.+):(\d+)$/);
  if (m) {
    const list = meta.lists.find((l) => l.arrayKey === m[1]);
    if (list) return { label: `${list.label} ${Number(m[2]) + 1}`, kind: "item", index: Number(m[2]), arrayKey: list.arrayKey };
  }
  return null;
}

/* ─── Smart guides + alignment (Figma-style magnets) ─── */

export type AlignKind = "left" | "center-x" | "right" | "top" | "middle" | "bottom";

export const SNAP_PX = 6;

/** Indigo = section bounds + parent padding · brick = sibling components. */
export const GUIDE_SECTION = "var(--accent)";
export const GUIDE_SIBLING = "#e4572e";

export interface GuideLine {
  pos: number;
  color: string;
}

/** Snap an element span [a0,a1] (px, relative to wrap origin) onto any line
 *  (element edges/center may match). Returns the px delta plus guide line. */
export function snapToLines(a0: number, a1: number, lines: GuideLine[], threshold = SNAP_PX): { delta: number; line: GuideLine } | null {
  const anchors = [a0, (a0 + a1) / 2, a1];
  let best: { delta: number; line: GuideLine } | null = null;
  for (const L of lines) {
    for (const a of anchors) {
      const delta = L.pos - a;
      if (Math.abs(delta) <= threshold && (!best || Math.abs(delta) < Math.abs(best.delta))) best = { delta, line: L };
    }
  }
  return best;
}

/** Collect snap lines for a drag: section bounds + parent padding (indigo)
 *  plus every sibling component's edges and centers (brick). `self` and its
 *  kin are excluded, as are full-bleed containers. All px, wrap-relative. */
export function collectSnapLines(wrap: Element, self: Element | null): { v: GuideLine[]; h: GuideLine[] } {
  const wr = wrap.getBoundingClientRect();
  const W = wr.width;
  const H = wr.height;
  const v: GuideLine[] = [
    { pos: 0, color: GUIDE_SECTION },
    { pos: W / 2, color: GUIDE_SECTION },
    { pos: W, color: GUIDE_SECTION },
  ];
  const h: GuideLine[] = [
    { pos: 0, color: GUIDE_SECTION },
    { pos: H / 2, color: GUIDE_SECTION },
    { pos: H, color: GUIDE_SECTION },
  ];
  // Parent padding: the section's own padding box inside the wrapper.
  const secEl = [...wrap.children].find(
    (c) => !c.classList.contains("snap-guides") && !c.classList.contains("builder-tag") && !c.classList.contains("builder-grip") && c.tagName !== "STYLE",
  );
  if (secEl) {
    const sr = secEl.getBoundingClientRect();
    const cs = getComputedStyle(secEl);
    const pl = parseFloat(cs.paddingLeft) || 0;
    const pr = parseFloat(cs.paddingRight) || 0;
    const pt = parseFloat(cs.paddingTop) || 0;
    const pb = parseFloat(cs.paddingBottom) || 0;
    const ox = sr.left - wr.left;
    const oy = sr.top - wr.top;
    if (pl > 1) v.push({ pos: ox + pl, color: GUIDE_SECTION });
    if (pr > 1) v.push({ pos: ox + sr.width - pr, color: GUIDE_SECTION });
    if (pt > 1) h.push({ pos: oy + pt, color: GUIDE_SECTION });
    if (pb > 1) h.push({ pos: oy + sr.height - pb, color: GUIDE_SECTION });
  }
  // Siblings: every other tagged node or float in this section.
  wrap.querySelectorAll("[data-el],[data-float]").forEach((el) => {
    if (!el || el === self) return;
    if (self && (el.contains(self) || (self.contains && self.contains(el)))) return;
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return;
    const x0 = r.left - wr.left;
    const x1 = r.right - wr.left;
    const y0 = r.top - wr.top;
    const y1 = r.bottom - wr.top;
    if (x0 <= 1 && x1 >= W - 1 && y0 <= 1 && y1 >= H - 1) return; // full-bleed container
    v.push({ pos: x0, color: GUIDE_SIBLING }, { pos: (x0 + x1) / 2, color: GUIDE_SIBLING }, { pos: x1, color: GUIDE_SIBLING });
    h.push({ pos: y0, color: GUIDE_SIBLING }, { pos: (y0 + y1) / 2, color: GUIDE_SIBLING }, { pos: y1, color: GUIDE_SIBLING });
  });
  return { v, h };
}

const GUIDE_RESET = "margin:0!important;border:0!important;padding:0!important;";

/** Imperative magnetic-guide overlay inside a section wrapper (builder-only,
 *  shown during drags). Lines are % positioned; resets guard against the
 *  host section's own child selectors (space-y, dividers, mb rules). */
export function showSnapGuides(wrap: Element, v: GuideLine[], h: GuideLine[], W: number, H: number) {
  let box = wrap.querySelector(":scope > .snap-guides");
  if (!box) {
    box = document.createElement("div");
    box.className = "snap-guides";
    box.setAttribute("aria-hidden", "true");
    wrap.appendChild(box);
  }
  const el = box as HTMLElement;
  el.style.cssText = `position:absolute;inset:0;pointer-events:none;z-index:40;${GUIDE_RESET}`;
  el.innerHTML = "";
  for (const L of v) {
    const d = document.createElement("div");
    d.style.cssText = `position:absolute;top:0;bottom:0;left:${(L.pos / W) * 100}%;width:1px;background:${L.color};${GUIDE_RESET}`;
    el.appendChild(d);
  }
  for (const L of h) {
    const d = document.createElement("div");
    d.style.cssText = `position:absolute;left:0;right:0;top:${(L.pos / H) * 100}%;height:1px;background:${L.color};${GUIDE_RESET}`;
    el.appendChild(d);
  }
}

export function clearSnapGuides(wrap: Element | null) {
  if (!wrap) return;
  wrap.querySelector(":scope > .snap-guides")?.remove();
}
