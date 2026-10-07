import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AppNavbar } from "@/components/layout/chrome";
import { currentUser } from "@/lib/auth";
import { websitesForUser } from "@/lib/db";
import { getTemplate, TEMPLATES } from "@/lib/templates";
import { timeAgo } from "@/lib/utils";
import { DashboardActions } from "./actions";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/login");
  const sites = await websitesForUser(user.id);
  const published = sites.filter((s) => s.status === "published").length;

  const stats: [string, string][] = [
    [String(sites.length), sites.length === 1 ? "website" : "websites"],
    [String(published), "published"],
    [String(sites.length - published), "drafts"],
    [String(TEMPLATES.length), "templates"],
  ];

  return (
    <div className="marketing-theme min-h-screen bg-background text-foreground">
      <AppNavbar user={user} active="/dashboard" actions={<DashboardActions />} />

      <main className="mx-auto max-w-shell px-6 py-10 sm:px-10 lg:px-16 lg:py-14 xl:px-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Studio</p>
            <h1 className="mt-3 font-serif text-[clamp(2.2rem,4vw,3.6rem)] font-normal leading-[0.95]">
              Welcome back, {user.name.split(" ")[0]}.
            </h1>
            <p className="mt-3 text-sm text-muted">Edit, preview, publish and share — every site below is live data.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/templates"
              className="inline-flex h-12 items-center rounded-full border border-border px-6 text-sm font-medium transition hover:bg-foreground hover:text-background"
            >
              Browse templates
            </Link>
            <Link
              href="/new"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:bg-primary"
            >
              New website
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-px border border-border bg-border lg:grid-cols-4">
          {stats.map(([v, l]) => (
            <div key={l} className="bg-background px-6 py-5">
              <dd className="font-serif text-4xl tabular-nums leading-none">{v}</dd>
              <dt className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">{l}</dt>
            </div>
          ))}
        </dl>

        {sites.length === 0 ? (
          <div className="kit-panel mt-8 flex flex-col items-center justify-center px-8 py-16 text-center" style={{ borderStyle: "dashed" }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Empty shelf</p>
            <h3 className="mt-3 font-serif text-3xl">You don&apos;t have a website yet.</h3>
            <p className="mt-2 max-w-sm text-sm text-muted">Choose a finished template and publish your first page in minutes.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Link href="/new" className="inline-flex h-12 items-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:bg-primary">Create website</Link>
              <Link href="/templates" className="inline-flex h-12 items-center rounded-full border border-border px-6 text-sm font-medium transition hover:bg-foreground hover:text-background">Browse templates</Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 border-t border-border">
            {sites.map((s, i) => {
              const tpl = getTemplate(s.templateId);
              const live = s.status === "published";
              return (
                <article key={s.id} className="group grid gap-4 border-b border-border py-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-6">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className="grid h-12 w-12 flex-none place-items-center rounded-[14px] text-base font-bold text-white" style={{ background: tpl.theme.primary }} aria-hidden>
                      {s.name.slice(0, 1)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate font-serif text-2xl tracking-[-0.02em]">{s.name}</h3>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-muted">
                      <span className="flex items-center gap-1.5">
                        <i className="h-1.5 w-1.5 rounded-full" style={{ background: live ? "#16a34a" : "var(--kit-muted)" }} />
                        {s.status}
                      </span>
                      <span>{tpl.name}</span>
                      <span>updated {timeAgo(s.updatedAt)}</span>
                    </p>
                    {live && (
                      <Link href={`/s/${s.slug}`} target="_blank" className="mt-1.5 inline-flex items-center gap-1 text-[13px] font-medium text-primary-strong underline underline-offset-4">
                        /s/{s.slug} <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/builder/${s.id}`} className="inline-flex h-10 items-center rounded-full bg-foreground px-5 text-[13px] font-medium text-background transition hover:bg-primary">Edit</Link>
                    <Link href={`/s/${s.slug}`} className="inline-flex h-10 items-center rounded-full border border-border px-4 text-[13px] font-medium transition hover:bg-foreground hover:text-background">Preview</Link>
                    <Link href={`/builder/${s.id}?tab=settings`} className="inline-flex h-10 items-center rounded-full border border-border px-4 text-[13px] font-medium transition hover:bg-foreground hover:text-background">Settings</Link>
                    <DashboardCardActions id={s.id} slug={s.slug} />
                  </div>
                </article>
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
