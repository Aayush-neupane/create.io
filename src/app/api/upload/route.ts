import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const ALLOWED = new Set(["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"]);
const MAX = 5 * 1024 * 1024;

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided." }, { status: 400 });
  if (!ALLOWED.has(file.type)) return NextResponse.json({ error: "Only PNG, JPG, WEBP, GIF or SVG images are allowed." }, { status: 400 });
  if (file.size > MAX) return NextResponse.json({ error: "Image must be under 5MB." }, { status: 400 });
  const ext = (file.name.split(".").pop() || "png").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5) || "png";
  const name = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${ext}`;
  const buf = Buffer.from(await file.arrayBuffer());
  // Deployed (Netlify): local disk is ephemeral → persist in the blob store
  // and serve through /api/files. Local dev keeps plain files.
  if (process.env.NETLIFY) {
    try {
      const { getStore } = await import("@netlify/blobs");
      const bytes = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
      await getStore("create-io").set(`uploads_${name}`, bytes, { metadata: { contentType: file.type } });
      return NextResponse.json({ url: `/api/files/uploads_${name}` });
    } catch (e) {
      console.error("[api:upload/blob]", e);
      return NextResponse.json({ error: "Upload storage is unavailable right now." }, { status: 500 });
    }
  }
  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), buf);
  return NextResponse.json({ url: `/uploads/${name}` });
}
