import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { websitesForUser, saveWebsite, newId, uniqueSlug } from "@/lib/db";
import { createWebsiteSchema, safeError } from "@/lib/validation";
import { getTemplate } from "@/lib/templates";
import { buildConfigFromTemplate, baseTheme } from "@/lib/website-defaults";

export async function GET() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sites = await websitesForUser(user.id);
  return NextResponse.json({ websites: sites });
}

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await req.json();
    const data = createWebsiteSchema.parse(body);
    const tpl = getTemplate(data.templateId);
    const theme = { ...baseTheme(), ...tpl.theme };
    const owner = data.ownerName || "";
    const config = buildConfigFromTemplate(
      tpl.id,
      tpl.sections,
      theme,
      { siteName: data.name, ownerName: owner, tagline: data.tagline || "", siteDescription: `${data.name} — ${data.tagline || tpl.description}` },
    );
    const slug = await uniqueSlug(data.name);
    const now = new Date().toISOString();
    const site = await saveWebsite({
      id: newId("w_"),
      userId: user.id,
      name: data.name,
      slug,
      templateId: tpl.id,
      status: "draft",
      config,
      createdAt: now,
      updatedAt: now,
    });
    return NextResponse.json({ website: site });
  } catch (e) {
    console.error("[api:api/websites/route.ts]", e);
    return NextResponse.json({ error: safeError(e) }, { status: 400 });
  }
}
