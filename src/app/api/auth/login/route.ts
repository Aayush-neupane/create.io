import { NextResponse } from "next/server";
import { loginSchema, safeError } from "@/lib/validation";
import { findUserByEmail } from "@/lib/db";
import { verifyPassword, createSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = loginSchema.parse(body);
    const user = await findUserByEmail(data.email);
    if (!user) return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    const ok = await verifyPassword(data.password, user.passwordHash);
    if (!ok) return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    await createSession(user.id);
    return NextResponse.json({ id: user.id, name: user.name, email: user.email });
  } catch (e) {
    console.error("[api:api/auth/login/route.ts]", e);
    return NextResponse.json({ error: safeError(e) }, { status: 400 });
  }
}
