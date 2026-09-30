import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { findWebsiteBySlug } from "@/lib/db";
import { normalizeConfig } from "@/lib/website-defaults";
import { TemplateRenderer } from "@/components/templates/Renderer";

export async function generateMetadata({ params }: { params: Promise<{ slug: string; page: string }> }): Promise<Metadata> {
  const { slug, page } = await params;
  const site = await findWebsiteBySlug(slug);
  if (!site) return { title: "Not found" };
  const cfg = normalizeConfig(site.config);
  const sub = cfg.pages.find((p) => p.path === page);
  if (!sub) return { title: "Not found" };
  const title = `${sub.title} — ${site.name}`;
  return { title, description: cfg.seo.description || cfg.siteDescription, icons: cfg.seo.favicon ? [{ url: cfg.seo.favicon }] : undefined, alternates: { canonical: `/s/${slug}/${page}` } };
}

export default async function SubPage({ params }: { params: Promise<{ slug: string; page: string }> }) {
  const { slug, page } = await params;
  const site = await findWebsiteBySlug(slug);
  if (!site) notFound();
  const cfg = normalizeConfig(site.config);
  const sub = cfg.pages.find((p) => p.path === page);
  if (!sub || sub.sections.length === 0) notFound();
  return (
    <div className="published-site min-h-screen bg-white">
      {site.status !== "published" && (
        <div className="bg-amber-100 px-4 py-2 text-center text-[13px] text-amber-900">
          Draft preview — this site isn&apos;t published yet. <Link href={`/builder/${site.id}`} className="font-semibold underline">Open in builder</Link>
        </div>
      )}
      <TemplateRenderer config={cfg} templateId={site.templateId} slug={site.slug} pagePath={page} />
      <footer className="border-t border-neutral-100 bg-white px-6 py-4 text-center text-xs text-neutral-400">
        <a href={`/s/${site.slug}`} className="font-medium text-neutral-600 underline">← {site.name}</a>
        <span className="mx-2">·</span>
        <a href="/" className="inline-flex items-center gap-1.5 font-medium text-neutral-600">
          <img src="/logo.png" alt="" className="h-4 w-4 rounded-[4px]" style={{ background: "#17171b" }} />
          Built with create.io
        </a>
      </footer>
    </div>
  );
}
