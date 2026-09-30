import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { findWebsiteById, saveWebsite, deleteWebsite, uniqueSlug } from "@/lib/db";
import { updateWebsiteSchema, safeError } from "@/lib/validation";

async function owned(id: string) {
  const user = await currentUser();
  if (!user) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) as never };
  const site = await findWebsiteById(id);
  if (!site || site.userId !== user.id) return { error: NextResponse.json({ error: "Not found" }, { status: 404 }) as never };
  return { user, site };
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const o = await owned(id);
  if ("error" in o) return o.error;
  return NextResponse.json({ website: o.site });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const o = await owned(id);
    if ("error" in o) return o.error;
    const body = await req.json();
    const data = updateWebsiteSchema.parse(body);
    let slug = o.site.slug;
    if (data.slug && data.slug !== slug) slug = await uniqueSlug(data.slug, o.site.id);
    const updated = await saveWebsite({
      ...o.site,
      name: data.name ?? o.site.name,
      slug,
      status: data.status ?? o.site.status,
      customDomain: data.customDomain ?? o.site.customDomain,
      config: (data.config ?? o.site.config) as typeof o.site.config,
      updatedAt: new Date().toISOString(),
      publishedAt: data.status === "published" ? new Date().toISOString() : o.site.publishedAt,
    });
    return NextResponse.json({ website: updated });
  } catch (e) {
    return NextResponse.json({ error: safeError(e) }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const o = await owned(id);
  if ("error" in o) return o.error;
  await deleteWebsite(id);
  return NextResponse.json({ ok: true });
}
