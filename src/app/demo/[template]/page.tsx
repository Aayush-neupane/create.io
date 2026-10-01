import { notFound } from "next/navigation";
import { getTemplate, TEMPLATES } from "@/lib/templates";
import { buildConfigFromTemplate, baseTheme } from "@/lib/website-defaults";
import { BuilderClient } from "@/components/builder/BuilderClient";

/** Zero-database demo: the full builder running on template seed data.
 *  Edits live in tab state only; Save/Publish point at signup. */
export default async function DemoPage({ params }: { params: Promise<{ template: string }> }) {
  const { template } = await params;
  const known = TEMPLATES.some((t) => t.id === template);
  if (!known) notFound();
  const tpl = getTemplate(template);
  const now = new Date().toISOString();
  const config = buildConfigFromTemplate(
    tpl.id,
    tpl.sections,
    { ...baseTheme(), ...tpl.theme },
    { siteName: tpl.name, ownerName: "", tagline: "", siteDescription: tpl.description },
  );
  return (
    <BuilderClient
      demo
      initial={{
        id: "demo",
        userId: "demo",
        name: tpl.name,
        slug: "demo",
        templateId: tpl.id,
        status: "draft",
        config,
        createdAt: now,
        updatedAt: now,
      }}
    />
  );
}
