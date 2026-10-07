import { NextResponse } from "next/server";
import { authConfigError } from "@/lib/auth";

/** Deployment self-check (no secrets leaked): open /api/health in a browser.
 *  `auth` must read "ready" — "missing-secret" means AUTH_SECRET is not set
 *  in the host's environment, so login/signup cannot issue session cookies. */
export async function GET() {
  const store = process.env.DATABASE_URL ? "prisma" : process.env.NETLIFY ? "blobs" : "json";
  return NextResponse.json({
    ok: true,
    auth: authConfigError() ? "missing-secret" : "ready",
    store,
    time: new Date().toISOString(),
  });
}
