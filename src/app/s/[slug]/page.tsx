import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findWebsiteBySlug, listWebsites } from "@/lib/db";
import { TemplateRenderer } from "@/components/templates/Renderer";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const site = await findWebsiteBySlug(slug);
  if (!site) return { title: "Not found" };
  const seo = site.config.seo;
  const title = seo.title || site.name;
  const description = seo.description || site.config.siteDescription;
  return {
    title,
    description,
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
  if (site.status !== "published") {
    // Allow owners to preview drafts via direct link? Keep simple: show draft with notice.
    // Public visitors see 404 for drafts; we can't know visitor, so render with noindex banner.
  }
  const cfg = site.config;
  return (
    <div className="published-site min-h-screen bg-white">
      {site.status !== "published" && (
        <div className="bg-amber-100 px-4 py-2 text-center text-[13px] text-amber-900">
          Draft preview — this site isn&apos;t published yet. <a href={`/builder/${site.id}`} className="font-semibold underline">Open in builder</a>
        </div>
      )}
      <TemplateRenderer config={cfg} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: cfg.siteName, description: cfg.siteDescription }) }}
      />
      {cfg.analyticsId && <script async src={`https://www.googletagmanager.com/gtag/js?id=${cfg.analyticsId}`} />}
      <footer className="border-t border-neutral-100 bg-white px-6 py-4 text-center text-xs text-neutral-400">
        Built with <a href="/" className="font-medium text-neutral-600 underline">create.io</a>
      </footer>
    </div>
  );
}

export async function generateStaticParams() {
  // Keep dynamic; return known slugs for prerender hint
  const all = await listWebsites().catch(() => []);
  return all.filter((w) => w.status === "published").slice(0, 20).map((w) => ({ slug: w.slug }));
}
