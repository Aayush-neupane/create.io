import Link from "next/link";
import { redirect } from "next/navigation";
import { LogoTile } from "@/components/layout/chrome";
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
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <LogoTile size={32} />
            <span className="font-semibold">create.io</span>
          </Link>
          <nav className="ml-6 hidden gap-5 text-sm text-neutral-600 md:flex">
            <span className="font-medium text-neutral-900">Dashboard</span>
            <Link href="/templates" className="hover:text-neutral-900">Templates</Link>
            <Link href="/settings" className="hover:text-neutral-900">Settings</Link>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden text-sm text-neutral-500 sm:inline">{user.name}</span>
            <Link href="/new" className="btn-primary" style={{ height: 36, fontSize: 13 }}>+ Create Website</Link>
            <DashboardActions />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back, {user.name.split(" ")[0]}.</h1>
        <p className="mt-1 text-sm text-neutral-600">Manage your websites — edit, preview, publish and share.</p>

        {sites.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white px-8 py-16 text-center">
            <h3 className="text-lg font-semibold">You don&apos;t have a website yet.</h3>
            <p className="mt-2 max-w-sm text-sm text-neutral-500">Choose a template and start building your first website.</p>
            <div className="mt-6 flex gap-2">
              <Link href="/new" className="btn-primary" style={{ height: 42, padding: "0 20px" }}>Create Website</Link>
              <Link href="/templates" className="rounded-lg border border-neutral-200 px-5 py-2.5 text-sm font-medium">Browse Templates</Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sites.map((s) => {
              const tpl = getTemplate(s.templateId);
              return (
              <div key={s.id} className="card card-hover p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-[13px] text-sm font-bold text-white" style={{ background: tpl.theme.primary }} aria-hidden>
                    {s.name.slice(0, 1)}
                  </span>
                  <h3 className="min-w-0 flex-1 truncate font-semibold" style={{ letterSpacing: "-0.015em" }}>{s.name}</h3>
                  <span className="mono-meta flex flex-none items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] font-semibold uppercase" style={{ borderColor: "var(--line-2)", color: "var(--ink-2)", letterSpacing: "0.08em" }}>
                    <i className="h-1.5 w-1.5 rounded-full" style={{ background: s.status === "published" ? "#16a34a" : "var(--ink-3)" }} />
                    {s.status}
                  </span>
                </div>
                <p className="mono-meta mt-1.5 text-[11px]" style={{ color: "var(--ink-3)" }}>{s.templateId} · updated {timeAgo(s.updatedAt)}</p>
                {s.status === "published" && (
                  <Link href={`/s/${s.slug}`} target="_blank" className="mt-2 block truncate text-sm font-medium underline underline-offset-4" style={{ color: "var(--accent-text)" }}>
                    /s/{s.slug} ↗
                  </Link>
                )}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <Link href={`/builder/${s.id}`} className="btn-primary flex-1" style={{ height: 36, fontSize: 13 }}>Edit</Link>
                  <Link href={`/s/${s.slug}`} className="rounded-lg border border-neutral-200 px-2 py-2 text-center text-[13px] font-medium transition-colors hover:border-neutral-400">Preview</Link>
                  <Link href={`/builder/${s.id}?tab=settings`} className="rounded-lg border border-neutral-200 px-2 py-2 text-center text-[13px] font-medium transition-colors hover:border-neutral-400">Settings</Link>
                </div>
                <DashboardCardActions id={s.id} slug={s.slug} />
              </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

function DashboardCardActions({ id, slug }: { id: string; slug: string }) {
  return <DashboardActions compact id={id} slug={slug} />;
}
