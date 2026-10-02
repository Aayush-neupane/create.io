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
