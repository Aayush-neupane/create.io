import { NextResponse } from "next/server";
import { loginSchema, safeError } from "@/lib/validation";
import { findUserByEmail } from "@/lib/db";
import { authConfigError, verifyPassword, createSession } from "@/lib/auth";

export async function POST(req: Request) {
  const misconfigured = authConfigError();
  if (misconfigured) {
    console.error("[api:auth/login]", misconfigured);
    return NextResponse.json({ error: "Login is temporarily unavailable. Please try again later." }, { status: 500 });
  }
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
