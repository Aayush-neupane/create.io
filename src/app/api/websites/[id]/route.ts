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
  try {
    const { id } = await params;
    const o = await owned(id);
    if ("error" in o) return o.error;
    return NextResponse.json({ website: o.site });
  } catch (e) {
    console.error("[api:websites/[id] GET]", e);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
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
      customDomain: data.customDomain === undefined ? o.site.customDomain : data.customDomain,
      config: (data.config ?? o.site.config) as typeof o.site.config,
      updatedAt: new Date().toISOString(),
      publishedAt: data.status === "published" ? new Date().toISOString() : data.status === "draft" ? undefined : o.site.publishedAt,
    });
    return NextResponse.json({ website: updated });
  } catch (e) {
    console.error("[api:api/websites/[id]/route.ts]", e);
    return NextResponse.json({ error: safeError(e) }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const o = await owned(id);
    if ("error" in o) return o.error;
    // Best-effort cleanup of uploaded blobs referenced by this site so
    // deleted sites don't leave orphaned files behind.
    try {
      const { collectUploadKeys } = await import("@/lib/uploads");
      const keys = collectUploadKeys(o.site.config);
      if (keys.length > 0) {
        const { deleteUploadKeys } = await import("@/lib/uploads");
        await deleteUploadKeys(keys);
        // Also remove matching local files (dev fallback in public/uploads).
        const { promises: fs } = await import("fs");
        const { default: path } = await import("path");
        await Promise.all(
          keys
            .filter((k) => k.startsWith("uploads_"))
            .map((k) => {
              const name = k.slice("uploads_".length);
              if (!/^[A-Za-z0-9_.-]{1,80}$/.test(name) || name.includes("..")) return null;
              return fs.unlink(path.join(process.cwd(), "public", "uploads", name)).catch(() => null);
            }),
        );
      }
    } catch (e) {
      console.error("[api:websites/[id] cleanup]", e);
    }
    await deleteWebsite(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api:websites/[id] DELETE]", e);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
