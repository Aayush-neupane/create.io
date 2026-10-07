import { NextResponse } from "next/server";
import { signupSchema, safeError } from "@/lib/validation";
import { findUserByEmail, saveUser, newId } from "@/lib/db";
import { authConfigError, hashPassword, createSession } from "@/lib/auth";

export async function POST(req: Request) {
  // Fail before writing anything when sessions can't be issued — otherwise
  // the account is half-created and retrying reports "already exists".
  const misconfigured = authConfigError();
  if (misconfigured) {
    console.error("[api:auth/signup]", misconfigured);
    return NextResponse.json({ error: "Account creation is temporarily unavailable. Please try again later." }, { status: 500 });
  }
  try {
    const body = await req.json();
    const data = signupSchema.parse(body);
    const existing = await findUserByEmail(data.email);
    if (existing) return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    const id = newId("u_");
    // Persist the user BEFORE issuing the session: otherwise a store failure
    // leaves a cookie for an account that doesn't exist (signed in, nothing loads).
    const user = await saveUser({
      id,
      name: data.name,
      email: data.email,
      passwordHash: await hashPassword(data.password),
      createdAt: new Date().toISOString(),
    });
    await createSession(user.id);
    return NextResponse.json({ id: user.id, name: user.name, email: user.email });
  } catch (e) {
    console.error("[api:api/auth/signup/route.ts]", e);
    return NextResponse.json({ error: safeError(e) }, { status: 400 });
  }
}
