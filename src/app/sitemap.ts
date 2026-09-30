import type { MetadataRoute } from "next";
import { listWebsites } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const urls: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/templates`, lastModified: new Date() },
  ];
  try {
    const all = await listWebsites();
    for (const w of all.filter((x) => x.status === "published")) {
      urls.push({ url: `${base}/s/${w.slug}`, lastModified: new Date(w.updatedAt) });
    }
  } catch { /* ignore */ }
  return urls;
}
