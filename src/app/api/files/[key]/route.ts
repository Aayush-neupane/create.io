import { NextResponse } from "next/server";

const KEY = /^[A-Za-z0-9_.-]{1,80}$/;

/** Serves uploads persisted in the Netlify blob store (see /api/upload). */
export async function GET(_: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!KEY.test(key) || !key.startsWith("uploads_")) return NextResponse.json({ error: "Not found" }, { status: 404 });
  try {
    const { getStore } = await import("@netlify/blobs");
    const store = getStore("create-io");
    const [data, meta] = await Promise.all([
      store.get(key, { type: "arrayBuffer" }),
      store.getMetadata(key),
    ]);
    if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const rawType =
      (meta?.metadata as Record<string, string> | undefined)?.contentType ?? "application/octet-stream";
    // Only ever serve images — never trust stored metadata for HTML/SVG.
    const ALLOWED_OUT = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);
    const contentType = ALLOWED_OUT.has(rawType) ? rawType : "application/octet-stream";
    const disposition = ALLOWED_OUT.has(rawType) ? "inline" : "attachment";
    return new NextResponse(data as ArrayBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `${disposition}; filename="${key}"`,
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (e) {
    console.error("[api:files]", e);
    return NextResponse.json({ error: "Unavailable" }, { status: 500 });
  }
}
