import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import type { UserRecord, WebsiteConfig, WebsiteRecord } from "@/types/builder";

// ─── Store selection ─────────────────────────────────────────────────────────
// DATABASE_URL set → PostgreSQL (Neon serverless).
// NETLIFY set (deployed functions) → Netlify Blobs, zero-config persistence.
// Otherwise → local JSON files (zero-setup `npm run dev`).
// All stores expose the same functions; routes never branch.

type BlobStore = {
  get: (key: string, opts?: { type: "json" }) => Promise<unknown>;
  setJSON: (key: string, data: unknown) => Promise<void>;
};

async function blobStore(): Promise<BlobStore | null> {
  if (!process.env.NETLIFY) return null;
  try {
    const { getStore } = await import("@netlify/blobs");
    return getStore("create-io") as unknown as BlobStore;
  } catch (e) {
    console.error("[db:blobs-unavailable]", e);
    return null;
  }
}

type Prisma = import("@prisma/client").PrismaClient;

const globalForPrisma = globalThis as unknown as { prisma?: Prisma };

async function prisma(): Promise<Prisma | null> {
  if (!process.env.DATABASE_URL) return null;
  if (!globalForPrisma.prisma) {
    const [{ PrismaClient }, { PrismaNeon }] = await Promise.all([
      import("@prisma/client"),
      import("@prisma/adapter-neon"),
    ]);
    const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
    globalForPrisma.prisma = new PrismaClient({ adapter }) as Prisma;
  }
  return globalForPrisma.prisma;
}

function toUser(u: { id: string; name: string; email: string; passwordHash: string; isGuest: boolean; createdAt: Date }): UserRecord {
  return { id: u.id, name: u.name, email: u.email, passwordHash: u.passwordHash, isGuest: u.isGuest, createdAt: u.createdAt.toISOString() };
}

function toSite(w: {
  id: string; userId: string; name: string; slug: string; templateId: string; status: string;
  config: unknown; customDomain: string | null; createdAt: Date; updatedAt: Date; publishedAt: Date | null;
}): WebsiteRecord {
  return {
    id: w.id,
    userId: w.userId,
    name: w.name,
    slug: w.slug,
    templateId: w.templateId,
    status: w.status as WebsiteRecord["status"],
    config: w.config as WebsiteConfig,
    ...(w.customDomain ? { customDomain: w.customDomain } : {}),
    createdAt: w.createdAt.toISOString(),
    updatedAt: w.updatedAt.toISOString(),
    ...(w.publishedAt ? { publishedAt: w.publishedAt.toISOString() } : {}),
  };
}

// ─── Local JSON store (dev fallback) ───
const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const SITES_FILE = path.join(DATA_DIR, "websites.json");

async function ensureDir() {
  if (process.env.NETLIFY) return; // blob store needs no directory
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  const blobs = await blobStore();
  if (blobs) {
    try {
      const key = file.split("/").pop() as string;
      const val = (await blobs.get(key, { type: "json" })) as T | null;
      return val ?? fallback;
    } catch (e) {
      console.error("[db:blob-read]", e);
      return fallback;
    }
  }
  try {
    const raw = await fs.readFile(file, "utf-8");
    return JSON.parse(raw) as T;
  } catch (e) {
    // ENOENT (first run) → quiet fallback. Corrupt JSON → back up + log so
    // we never silently pretend the database is empty.
    const code = (e as NodeJS.ErrnoException)?.code;
    if (code !== "ENOENT") {
      console.error(`[db:json-corrupt] ${file}`, e);
      try {
        await fs.copyFile(file, `${file}.corrupt-${Date.now()}.bak`);
      } catch { /* backup is best-effort */ }
    }
    return fallback;
  }
}

async function writeJson(file: string, data: unknown) {
  const blobs = await blobStore();
  if (blobs) {
    const key = file.split("/").pop() as string;
    await blobs.setJSON(key, data);
    return;
  }
  await ensureDir();
  const tmp = `${file}.${crypto.randomBytes(4).toString("hex")}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf-8");
  await fs.rename(tmp, file);
}

export function newId(prefix = ""): string {
  return `${prefix}${crypto.randomBytes(8).toString("hex")}${Date.now().toString(36)}`;
}

export function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || `site-${Date.now().toString(36)}`
  );
}

// ─── Users ───
export async function listUsers(): Promise<UserRecord[]> {
  const db = await prisma();
  if (db) return (await db.user.findMany()).map(toUser);
  await ensureDir();
  return readJson<UserRecord[]>(USERS_FILE, []);
}

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const db = await prisma();
  if (db) {
    const u = await db.user.findFirst({ where: { email: { equals: email, mode: "insensitive" } } });
    return u ? toUser(u) : null;
  }
  const users = await listUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function findUserById(id: string): Promise<UserRecord | null> {
  const db = await prisma();
  if (db) {
    const u = await db.user.findUnique({ where: { id } });
    return u ? toUser(u) : null;
  }
  const users = await listUsers();
  return users.find((u) => u.id === id) ?? null;
}

export async function saveUser(user: UserRecord): Promise<UserRecord> {
  const db = await prisma();
  if (db) {
    await db.user.upsert({
      where: { id: user.id },
      update: { name: user.name, email: user.email, passwordHash: user.passwordHash, isGuest: user.isGuest ?? false },
      create: { id: user.id, name: user.name, email: user.email, passwordHash: user.passwordHash, isGuest: user.isGuest ?? false },
    });
    return user;
  }
  const users = await listUsers();
  const idx = users.findIndex((u) => u.id === user.id);
  if (idx >= 0) users[idx] = user;
  else users.push(user);
  await writeJson(USERS_FILE, users);
  return user;
}

// ─── Websites ───
export async function listWebsites(): Promise<WebsiteRecord[]> {
  const db = await prisma();
  if (db) return (await db.website.findMany()).map(toSite);
  await ensureDir();
  return readJson<WebsiteRecord[]>(SITES_FILE, []);
}

export async function websitesForUser(userId: string): Promise<WebsiteRecord[]> {
  const db = await prisma();
  if (db) {
    return (await db.website.findMany({ where: { userId }, orderBy: { updatedAt: "desc" } })).map(toSite);
  }
  const all = await listWebsites();
  return all
    .filter((w) => w.userId === userId)
    .sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
}

export async function findWebsiteById(id: string): Promise<WebsiteRecord | null> {
  const db = await prisma();
  if (db) {
    const w = await db.website.findUnique({ where: { id } });
    return w ? toSite(w) : null;
  }
  const all = await listWebsites();
  return all.find((w) => w.id === id) ?? null;
}

export async function findWebsiteBySlug(slug: string): Promise<WebsiteRecord | null> {
  const db = await prisma();
  if (db) {
    const w = await db.website.findUnique({ where: { slug } });
    return w ? toSite(w) : null;
  }
  const all = await listWebsites();
  return all.find((w) => w.slug === slug) ?? null;
}

export async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  const all = await listWebsites();
  let candidate = slugify(base);
  let n = 1;
  const taken = (s: string) => all.some((w) => w.slug === s && w.id !== excludeId);
  while (taken(candidate)) candidate = `${slugify(base)}-${++n}`;
  return candidate;
}

export async function saveWebsite(site: WebsiteRecord): Promise<WebsiteRecord> {
  const db = await prisma();
  if (db) {
    const publishedAt = site.publishedAt ? new Date(site.publishedAt) : null;
    await db.website.upsert({
      where: { id: site.id },
      update: {
        name: site.name, slug: site.slug, templateId: site.templateId, status: site.status,
        config: site.config as never, customDomain: site.customDomain ?? null, publishedAt,
      },
      create: {
        id: site.id, userId: site.userId, name: site.name, slug: site.slug, templateId: site.templateId,
        status: site.status, config: site.config as never, customDomain: site.customDomain ?? null, publishedAt,
      },
    });
    return { ...site, updatedAt: new Date().toISOString() };
  }
  const all = await listWebsites();
  const idx = all.findIndex((w) => w.id === site.id);
  if (idx >= 0) all[idx] = site;
  else all.push(site);
  await writeJson(SITES_FILE, all);
  return site;
}

export async function deleteWebsite(id: string): Promise<void> {
  const db = await prisma();
  if (db) {
    try {
      await db.website.delete({ where: { id } });
    } catch (e) {
      // Prisma P2025 = already gone → treat as success. Anything else is a
      // real outage and must surface so routes return 500, not false ok:true.
      const code = (e as { code?: string })?.code;
      if (code !== "P2025") throw e;
    }
    return;
  }
  const all = await listWebsites();
  await writeJson(
    SITES_FILE,
    all.filter((w) => w.id !== id),
  );
}
