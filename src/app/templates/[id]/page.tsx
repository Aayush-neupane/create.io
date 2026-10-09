import Link from "next/link";
import { notFound } from "next/navigation";
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
    <div className="flex min-h-screen flex-col" style={{ background: "var(--paper-2)" }}>
      <div className="sticky top-0 z-40" style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:px-6">
          <Link href="/templates" className="shrink-0 font-mono text-[11px] font-bold uppercase transition-colors hover:text-white" style={{ letterSpacing: "0.14em", color: "var(--accent)" }}>← All sites</Link>
          <span className="display display-upper min-w-0 flex-1 truncate text-xl" style={{ color: "var(--paper)" }}>{tpl.name}</span>
          <span className="mono-meta hidden px-2.5 py-1 font-mono text-[9px] font-bold uppercase sm:inline" style={{ letterSpacing: "0.12em", color: "var(--cream-dim)", border: "1px solid rgba(244,239,228,.25)" }}>{tpl.category} · {tpl.sections.length} sections</span>
          <div className="flex items-center gap-1 p-1" style={{ background: "rgba(244,239,228,.1)" }}>
            {(["desktop", "tablet", "mobile"] as const).map((d) => (
              <Link key={d} href={`/templates/${tpl.id}?device=${d}`} className="px-3 py-1 font-mono text-[10px] font-bold uppercase transition-all" style={device === d ? { background: "var(--accent)", color: "var(--ink)", letterSpacing: "0.1em" } : { color: "var(--cream-dim)", letterSpacing: "0.1em" }}>
                {d}
              </Link>
            ))}
          </div>
          <Link href={`/new?template=${tpl.id}`} className="btn-tan !h-10 shrink-0" style={{ fontSize: 11, padding: "0 18px" }}>
            Use this template →
          </Link>
        </div>
      </div>
      <div className="flex flex-1 justify-center p-4 md:p-8">
        <div className={`w-full overflow-hidden border bg-white ${width}`} style={{ borderColor: "var(--line-2)" }}>
          <TemplateRenderer config={config} templateId={tpl.id} />
        </div>
      </div>
    </div>
  );
}
