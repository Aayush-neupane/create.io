import Link from "next/link";
import { notFound } from "next/navigation";
import { TEMPLATES } from "@/lib/templates";
import { buildConfigFromTemplate, baseTheme } from "@/lib/website-defaults";
import { TemplateRenderer } from "@/components/templates/Renderer";
import { Button } from "@/components/ui/controls";

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
    <div className="flex min-h-screen flex-col bg-[#fafafa]">
      <div className="sticky top-0 z-40 border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-3">
          <Link href="/templates" className="text-sm text-neutral-600 hover:text-neutral-900">← Back</Link>
          <span className="font-semibold">{tpl.name}</span>
          <span className="hidden rounded-full border border-neutral-200 px-2 py-0.5 text-[11px] text-neutral-600 sm:inline">{tpl.category}</span>
          <div className="ml-auto flex items-center gap-1 rounded-lg border border-neutral-200 p-1">
            {(["desktop", "tablet", "mobile"] as const).map((d) => (
              <Link key={d} href={`/templates/${tpl.id}?device=${d}`} className={`rounded-md px-3 py-1 text-xs font-medium capitalize ${device === d ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-neutral-100"}`}>
                {d}
              </Link>
            ))}
          </div>
          <Link href={`/new?template=${tpl.id}`}>
            <Button size="sm">Use This Template</Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-1 justify-center bg-neutral-100 p-4 md:p-8">
        <div className={`w-full overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm ${width}`}>
          <TemplateRenderer config={config} templateId={tpl.id} />
        </div>
      </div>
    </div>
  );
}
