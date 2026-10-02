import type { WebsiteConfig } from "@/types/builder";

const KEY_RE = /^uploads_[A-Za-z0-9_.-]{1,72}$/;

/** Collect `uploads_*` blob keys referenced anywhere in a site config. */
export function collectUploadKeys(config: unknown): string[] {
  const found = new Set<string>();
  const visit = (v: unknown) => {
    if (typeof v === "string") {
      // Match both /api/files/uploads_x and bare uploads_x references.
      for (const m of v.matchAll(/(uploads_[A-Za-z0-9_.-]{1,72})/g)) {
        if (KEY_RE.test(m[1])) found.add(m[1]);
      }
      return;
    }
    if (Array.isArray(v)) {
      for (const item of v) visit(item);
      return;
    }
    if (v && typeof v === "object") {
      for (const val of Object.values(v as Record<string, unknown>)) visit(val);
    }
  };
  visit((config as WebsiteConfig | null) ?? {});
  return [...found];
}

/** Best-effort delete of blob keys. Never throws — callers log only. */
export async function deleteUploadKeys(keys: string[]): Promise<void> {
  if (!process.env.NETLIFY) return;
  try {
    const { getStore } = await import("@netlify/blobs");
    const store = getStore("create-io");
    await Promise.all(
      keys.filter((k) => KEY_RE.test(k)).map((k) => store.delete(k).catch(() => null)),
    );
  } catch {
    // Intentionally silent: cleanup must never fail a delete request.
  }
}
