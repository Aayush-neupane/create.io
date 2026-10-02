import { notFound, redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { findWebsiteById } from "@/lib/db";
import { normalizeConfig } from "@/lib/website-defaults";
import { BuilderClient } from "@/components/builder/BuilderClient";

export default async function BuilderPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const user = await currentUser();
  if (!user) redirect("/login");
  const { id } = await params;
  const sp = await searchParams;
  const site = await findWebsiteById(id);
  if (!site) notFound();
  if (site.userId !== user.id) redirect("/dashboard");
  return <BuilderClient initial={{ ...site, config: normalizeConfig(site.config) }} initialTab={sp.tab} />;
}
