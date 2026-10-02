import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { findWebsiteById, saveWebsite, newId, uniqueSlug } from "@/lib/db";

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await currentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    const site = await findWebsiteById(id);
    if (!site || site.userId !== user.id) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const now = new Date().toISOString();
    const slug = await uniqueSlug(`${site.slug}-copy`);
    const copy = await saveWebsite({
      ...structuredClone(site),
      id: newId("w_"),
      name: `${site.name} (copy)`,
      slug,
      status: "draft",
      customDomain: undefined,
      publishedAt: undefined,
      createdAt: now,
      updatedAt: now,
    });
    return NextResponse.json({ website: copy });
  } catch (e) {
    console.error("[api:websites/[id]/duplicate]", e);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
