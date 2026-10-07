import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { TEMPLATES } from "@/lib/templates";
import { buildConfigFromTemplate, baseTheme } from "@/lib/website-defaults";
import { TemplateRenderer } from "@/components/templates/Renderer";

export default async function TemplatePreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ device?: string }>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const tpl = TEMPLATES.find((t) => t.id === id);
  if (!tpl) notFound();
  const device = (sp.device as "desktop" | "tablet" | "mobile") || "desktop";
  const config = buildConfigFromTemplate(
    tpl.id,
    tpl.sections,
    { ...baseTheme(), ...tpl.theme },
    { siteName: tpl.name, ownerName: "", tagline: "", siteDescription: tpl.description },
  );

  const width = device === "mobile" ? "max-w-[390px]" : device === "tablet" ? "max-w-[820px]" : "max-w-none";

  return (
    <div className="marketing-theme flex min-h-screen flex-col bg-background text-foreground">
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-shell flex-wrap items-center gap-x-3 gap-y-2 px-6 py-3 sm:px-10 lg:px-16 xl:px-20">
          <Link href="/templates" className="shrink-0 text-sm text-muted transition-colors hover:text-foreground">← Back</Link>
          <span className="min-w-0 flex-1 truncate font-serif text-lg tracking-[-0.02em]">{tpl.name}</span>
          <span className="hidden rounded-full border border-border/40 px-2 py-0.5 font-mono text-[11px] text-muted sm:inline">{tpl.category}</span>
          <div className="flex items-center gap-1 rounded-full border border-border p-1">
            {(["desktop", "tablet", "mobile"] as const).map((d) => (
              <Link key={d} href={`/templates/${tpl.id}?device=${d}`} className={`rounded-full px-2 py-1 text-[11px] font-medium capitalize sm:px-3 sm:text-xs ${device === d ? "bg-foreground text-background" : "text-muted hover:bg-foreground/5"}`}>
                {d}
              </Link>
            ))}
          </div>
          <Link
            href={`/new?template=${tpl.id}`}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition hover:bg-primary"
          >
            Use this template
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
      <div className="flex flex-1 justify-center bg-surface-2 p-4 md:p-8">
        <div className={`w-full overflow-hidden border border-border bg-white shadow-[0_36px_90px_-60px_rgba(41,39,33,.5)] ${width}`}>
          <TemplateRenderer config={config} templateId={tpl.id} />
        </div>
      </div>
    </div>
  );
}
