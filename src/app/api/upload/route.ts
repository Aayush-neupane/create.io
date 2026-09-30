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
  const ext = (file.name.split(".").pop() || "png").toLowerCase().slice(0, 5);
  const name = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  const buf = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(dir, name), buf);
  return NextResponse.json({ url: `/uploads/${name}` });
}
