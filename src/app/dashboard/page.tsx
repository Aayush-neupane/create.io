import Link from "next/link";
import { redirect } from "next/navigation";
import { AppNavbar } from "@/components/layout/chrome";
import { currentUser } from "@/lib/auth";
import { websitesForUser } from "@/lib/db";
import { getTemplate } from "@/lib/templates";
import { timeAgo } from "@/lib/utils";
import { DashboardActions } from "./actions";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/login");
  const sites = await websitesForUser(user.id);

  return (
    <div className="min-h-screen" style={{ background: "var(--paper)" }}>
      <AppNavbar user={user} active="/dashboard" actions={<DashboardActions />} />

      <main className="mx-auto max-w-6xl px-6 py-12">
        <p className="eyebrow">Studio</p>
        <h1 className="display display-upper mt-3" style={{ fontSize: "clamp(32px,4.4vw,54px)" }}>Welcome back, {user.name.split(" ")[0]}.</h1>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ink-2)" }}>Manage your websites — edit, preview, publish and share.</p>

        {sites.length === 0 ? (
          <div className="mt-10 grid justify-items-center gap-3 border border-dashed px-8 py-16 text-center" style={{ borderColor: "var(--line-2)", background: "var(--surface)" }}>
            <p className="mono-meta font-mono text-[10px] font-bold uppercase" style={{ letterSpacing: "0.2em", color: "var(--ink-3)" }}>Empty studio</p>
            <h3 className="display display-upper text-3xl">You don&apos;t have a website yet.</h3>
            <p className="max-w-sm text-sm" style={{ color: "var(--ink-2)" }}>Choose a template and start building your first website.</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2.5">
              <Link href="/new" className="btn-primary">Create website</Link>
              <Link href="/templates" className="btn-ghost">Browse templates</Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-px border" style={{ background: "var(--line)", borderColor: "var(--line)" }}>
              {[
                [String(sites.length), sites.length === 1 ? "website" : "websites"],
                [String(sites.filter((s) => s.status === "published").length), "published"],
                [String(sites.filter((s) => s.status !== "published").length), "drafts"],
              ].map(([v, l]) => (
                <div key={l} className="p-4 text-center" style={{ background: "var(--surface)" }}>
                  <p className="display text-3xl">{v}</p>
                  <p className="mono-meta mt-1 font-mono text-[9px] font-bold uppercase" style={{ letterSpacing: "0.16em", color: "var(--ink-3)" }}>{l}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {sites.map((s) => {
                const tpl = getTemplate(s.templateId);
                const published = s.status === "published";
                return (
                <div key={s.id} className="card card-hover p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 flex-none place-items-center font-mono text-sm font-bold" style={{ background: "var(--ink)", color: "var(--paper)" }} aria-hidden>
                      {s.name.slice(0, 1)}
                    </span>
                    <h3 className="display display-upper min-w-0 flex-1 truncate text-xl">{s.name}</h3>
                    <span className="mono-meta flex flex-none items-center gap-1.5 px-2.5 py-1 font-mono text-[9px] font-bold uppercase" style={{ letterSpacing: "0.1em", background: published ? "var(--ink)" : "var(--surface-2)", color: published ? "var(--paper)" : "var(--ink-3)" }}>
                      <i className="h-1.5 w-1.5 rounded-full" style={{ background: published ? "var(--accent)" : "currentColor" }} />
                      {s.status}
                    </span>
                  </div>
                  <p className="mono-meta mt-2 font-mono text-[10px] font-bold uppercase" style={{ letterSpacing: "0.1em", color: "var(--ink-3)" }}>{tpl.name} · {timeAgo(s.updatedAt)}</p>
                  {published && (
                    <Link href={`/s/${s.slug}`} target="_blank" className="mt-2 block truncate font-mono text-xs font-bold uppercase underline underline-offset-4" style={{ letterSpacing: "0.08em", color: "var(--accent-text)" }}>
                      /s/{s.slug} ↗
                    </Link>
                  )}
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <Link href={`/builder/${s.id}`} className="btn-primary !h-10 flex-1" style={{ fontSize: 11, padding: "0 8px" }}>Edit</Link>
                    <Link href={`/s/${s.slug}`} className="btn-ghost !h-10 flex-1" style={{ fontSize: 11, padding: "0 8px" }}>Preview</Link>
                    <Link href={`/builder/${s.id}?tab=settings`} className="btn-ghost !h-10 flex-1" style={{ fontSize: 11, padding: "0 8px" }}>Setup</Link>
                  </div>
                  <DashboardCardActions id={s.id} slug={s.slug} />
                </div>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function DashboardCardActions({ id, slug }: { id: string; slug: string }) {
  return <DashboardActions compact id={id} slug={slug} />;
}
