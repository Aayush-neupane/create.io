import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/dashboard", "/builder/", "/admin/", "/api/", "/new", "/settings"] },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
