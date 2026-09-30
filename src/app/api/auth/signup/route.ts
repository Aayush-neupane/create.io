import { NextResponse } from "next/server";
import { signupSchema, safeError } from "@/lib/validation";
import { findUserByEmail, saveUser, newId } from "@/lib/db";
import { hashPassword, createSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = signupSchema.parse(body);
    const existing = await findUserByEmail(data.email);
    if (existing) return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    const user = await saveUser({
      id: newId("u_"),
      name: data.name,
      email: data.email,
      passwordHash: await hashPassword(data.password),
      createdAt: new Date().toISOString(),
    });
    await createSession(user.id);
    return NextResponse.json({ id: user.id, name: user.name, email: user.email });
  } catch (e) {
    return NextResponse.json({ error: safeError(e) }, { status: 400 });
  }
}
