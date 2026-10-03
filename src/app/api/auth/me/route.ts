import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUser, destroySession, hashPassword, verifyPassword } from "@/lib/auth";
import { deleteUser, saveUser, websitesForUser } from "@/lib/db";
import { safeError } from "@/lib/validation";

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) return NextResponse.json({ user: null }, { status: 401 });
    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch (e) {
    console.error("[api:auth/me]", e);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}

const updateSchema = z.object({
  name: z.string().trim().min(1).max(60).optional(),
  currentPassword: z.string().min(1).max(128).optional(),
  newPassword: z.string().min(8).max(128).optional(),
});

/** Update display name and/or password (password change requires the current one). */
export async function PUT(req: Request) {
  try {
    const user = await currentUser();
    if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    const data = updateSchema.parse(await req.json());
    if (!data.name && !data.newPassword) {
      return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
    }
    if (data.newPassword) {
      if (user.isGuest || !data.currentPassword) {
        return NextResponse.json({ error: "Enter your current password to set a new one." }, { status: 400 });
      }
      const ok = await verifyPassword(data.currentPassword, user.passwordHash);
      if (!ok) return NextResponse.json({ error: "Current password is incorrect." }, { status: 403 });
      user.passwordHash = await hashPassword(data.newPassword);
    }
    if (data.name) user.name = data.name;
    await saveUser(user);
    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch (e) {
    console.error("[api:auth/me PUT]", e);
    return NextResponse.json({ error: safeError(e) }, { status: 400 });
  }
}

/** Delete the account and every website on it. Irreversible. */
export async function DELETE() {
  try {
    const user = await currentUser();
    if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    const sites = await websitesForUser(user.id);
    for (const s of sites) {
      const { deleteWebsite } = await import("@/lib/db");
      await deleteWebsite(s.id);
    }
    await deleteUser(user.id);
    await destroySession();
    return NextResponse.json({ ok: true, deletedSites: sites.length });
  } catch (e) {
    console.error("[api:auth/me DELETE]", e);
    return NextResponse.json({ error: safeError(e) }, { status: 500 });
  }
}
