import { NextResponse } from "next/server";
import { saveUser, saveWebsite, newId, uniqueSlug } from "@/lib/db";
import { hashPassword, createSession } from "@/lib/auth";
import { getTemplate } from "@/lib/templates";
import { buildConfigFromTemplate, baseTheme } from "@/lib/website-defaults";
import crypto from "crypto";

/** One-click demo: throwaway guest account with a pre-made site. No form. */
export async function POST() {
  try {
    const tag = crypto.randomBytes(3).toString("hex");
    const now = new Date().toISOString();
    const user = await saveUser({
      id: newId("guest_"),
      name: `Guest ${tag.toUpperCase()}`,
      email: `guest-${tag}@guest.local`,
      passwordHash: await hashPassword(crypto.randomBytes(16).toString("hex")),
      createdAt: now,
      isGuest: true,
    });

    const tpl = getTemplate("minimal-portfolio");
    const config = buildConfigFromTemplate(
      tpl.id,
      tpl.sections,
      { ...baseTheme(), ...tpl.theme },
      { siteName: "Demo Portfolio", ownerName: user.name, tagline: "Product Designer", siteDescription: "A demo site — make it yours." },
    );
    const site = await saveWebsite({
      id: newId("w_"),
      userId: user.id,
      name: "Demo Portfolio",
      slug: await uniqueSlug(`demo-${tag}`),
      templateId: tpl.id,
      status: "draft",
      config,
      createdAt: now,
      updatedAt: now,
    });

    await createSession(user.id);
    return NextResponse.json({ user: { id: user.id, name: user.name }, websiteId: site.id });
  } catch (e) {
    console.error("[api:auth/guest]", e);
    return NextResponse.json({ error: "Could not start the demo. Try again." }, { status: 400 });
  }
}
