import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import type { UserRecord, WebsiteRecord } from "@/types/builder";

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const SITES_FILE = path.join(DATA_DIR, "websites.json");

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(file, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, data: unknown) {
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
  await ensureDir();
  return readJson<UserRecord[]>(USERS_FILE, []);
}

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const users = await listUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function findUserById(id: string): Promise<UserRecord | null> {
  const users = await listUsers();
  return users.find((u) => u.id === id) ?? null;
}

export async function saveUser(user: UserRecord): Promise<UserRecord> {
  const users = await listUsers();
  const idx = users.findIndex((u) => u.id === user.id);
  if (idx >= 0) users[idx] = user;
  else users.push(user);
  await writeJson(USERS_FILE, users);
  return user;
}

// ─── Websites ───
export async function listWebsites(): Promise<WebsiteRecord[]> {
  await ensureDir();
  return readJson<WebsiteRecord[]>(SITES_FILE, []);
}

export async function websitesForUser(userId: string): Promise<WebsiteRecord[]> {
  const all = await listWebsites();
  return all
    .filter((w) => w.userId === userId)
    .sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
}

export async function findWebsiteById(id: string): Promise<WebsiteRecord | null> {
  const all = await listWebsites();
  return all.find((w) => w.id === id) ?? null;
}

export async function findWebsiteBySlug(slug: string): Promise<WebsiteRecord | null> {
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
  const all = await listWebsites();
  const idx = all.findIndex((w) => w.id === site.id);
  if (idx >= 0) all[idx] = site;
  else all.push(site);
  await writeJson(SITES_FILE, all);
  return site;
}

export async function deleteWebsite(id: string): Promise<void> {
  const all = await listWebsites();
  await writeJson(
    SITES_FILE,
    all.filter((w) => w.id !== id),
  );
}
