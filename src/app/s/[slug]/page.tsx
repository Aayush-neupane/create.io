import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { findWebsiteBySlug, listWebsites } from "@/lib/db";
import { sessionUserId } from "@/lib/auth";
import { normalizeConfig } from "@/lib/website-defaults";
import { TemplateRenderer } from "@/components/templates/Renderer";

async function isOwner(siteUserId: string): Promise<boolean> {
  try {
    return (await sessionUserId()) === siteUserId;
  } catch {
    return false;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const site = await findWebsiteBySlug(slug);
  if (!site) return { title: "Not found" };
  if (site.status !== "published" && !(await isOwner(site.userId))) {
    return { title: "Not found", robots: { index: false, follow: false } };
  }
  const seo = normalizeConfig(site.config).seo;
  const title = seo.title || site.name;
  const description = seo.description || site.config.siteDescription;
  const noindex = site.status !== "published";
  return {
    title,
    description,
    icons: normalizeConfig(site.config).seo.favicon ? [{ url: normalizeConfig(site.config).seo.favicon }] : undefined,
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      images: seo.socialImage ? [{ url: seo.socialImage }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description, images: seo.socialImage ? [seo.socialImage] : undefined },
    alternates: { canonical: `/s/${site.slug}` },
  };
}

export default async function PublishedPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = await findWebsiteBySlug(slug);
  if (!site) notFound();
  const owner = await isOwner(site.userId);
  if (site.status !== "published" && !owner) notFound();
  const cfg = normalizeConfig(site.config);
  const isDraft = site.status !== "published";
  return (
    <div className="published-site min-h-screen bg-white">
      {isDraft && (
        <div className="bg-amber-100 px-4 py-2 text-center text-[13px] text-amber-900">
          Draft preview — this site isn&apos;t published yet. <Link href={`/builder/${site.id}`} className="font-semibold underline">Open in builder</Link>
        </div>
      )}
      <TemplateRenderer config={cfg} templateId={site.templateId} slug={site.slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: cfg.siteName, description: cfg.siteDescription }) }}
      />
      {cfg.analyticsId && <script async src={`https://www.googletagmanager.com/gtag/js?id=${cfg.analyticsId}`} />}
      {cfg.analyticsId && (
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${cfg.analyticsId.replace(/[^A-Za-z0-9-_]/g, "")}');`,
          }}
        />
      )}
      <footer className="border-t border-neutral-100 bg-white px-6 py-4 text-center text-xs text-neutral-400">
        <Link href="/" className="inline-flex items-center gap-1.5 font-medium text-neutral-600">
          <Image src="/logo.png" alt="create.io" width={16} height={16} className="h-4 w-4 rounded-[4px]" style={{ background: "#17171b" }} />
          Built with create.io
        </Link>
      </footer>
    </div>
  );
}

export async function generateStaticParams() {
  // Keep dynamic; return known slugs for prerender hint
  const all = await listWebsites().catch(() => []);
  return all.filter((w) => w.status === "published").slice(0, 20).map((w) => ({ slug: w.slug }));
}
