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
    <div className="marketing-theme min-h-screen bg-background text-foreground">
      <AppNavbar user={user} active="/dashboard" actions={<DashboardActions />} />

      <main className="mx-auto max-w-shell px-6 py-10 sm:px-10 lg:px-16 xl:px-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Dashboard</p>
        <h1 className="mt-3 font-serif text-[clamp(2rem,3.5vw,3rem)] font-normal leading-[0.95]">Welcome back, {user.name.split(" ")[0]}.</h1>
        <p className="mt-2 text-sm text-muted">Manage your websites — edit, preview, publish and share.</p>

        {sites.length === 0 ? (
          <div className="kit-panel mt-10 flex flex-col items-center justify-center px-8 py-16 text-center" style={{ borderRadius: "1.25rem", borderStyle: "dashed" }}>
            <h3 className="font-serif text-2xl">You don&apos;t have a website yet.</h3>
            <p className="mt-2 max-w-sm text-sm text-muted">Choose a template and start building your first website.</p>
            <div className="mt-6 flex gap-2">
              <Link href="/new" className="inline-flex h-[42px] items-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition hover:bg-primary">Create Website</Link>
              <Link href="/templates" className="inline-flex h-[42px] items-center rounded-full border border-border px-5 text-sm font-medium transition hover:bg-foreground hover:text-background">Browse Templates</Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sites.map((s) => {
              const tpl = getTemplate(s.templateId);
              return (
              <div key={s.id} className="kit-card border border-border bg-surface p-5">
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
                  <Link href={`/builder/${s.id}`} className="inline-flex h-9 flex-1 items-center justify-center rounded-full bg-foreground text-[13px] font-medium text-background transition hover:bg-primary">Edit</Link>
                  <Link href={`/s/${s.slug}`} className="rounded-full border border-border px-2 py-2 text-center text-[13px] font-medium transition-colors hover:bg-foreground hover:text-background">Preview</Link>
                  <Link href={`/builder/${s.id}?tab=settings`} className="rounded-full border border-border px-2 py-2 text-center text-[13px] font-medium transition-colors hover:bg-foreground hover:text-background">Settings</Link>
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
