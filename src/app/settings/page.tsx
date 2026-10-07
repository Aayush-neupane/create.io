import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { AppNavbar } from "@/components/layout/chrome";
import { currentUser } from "@/lib/auth";
import { websitesForUser } from "@/lib/db";
import { getTemplate } from "@/lib/templates";
import { timeAgo } from "@/lib/utils";
import { DeleteAccount, LogoutButton, NameForm, PasswordForm } from "./account-actions";

export const metadata = {
  title: "Account — create.io",
  description: "Manage your create.io profile, security, sites and data.",
};

function Card({ index, title, sub, children }: { index: string; title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section className="kit-panel p-6 md:p-7">
      <p className="font-mono text-[9px] tracking-[0.16em] text-muted">{index}</p>
      <h2 className="mt-2 font-serif text-2xl tracking-[-0.03em]">{title}</h2>
      {sub && <p className="mt-1 text-sm text-muted">{sub}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default async function AccountPage() {
  const user = await currentUser();
  if (!user) redirect("/login");
  const sites = await websitesForUser(user.id);
  const published = sites.filter((s) => s.status === "published").length;

  const stats = [
    { v: String(sites.length), l: sites.length === 1 ? "Website" : "Websites" },
    { v: String(published), l: "Published" },
    { v: String(sites.length - published), l: "Drafts" },
  ];

  return (
    <div className="marketing-theme min-h-screen bg-background text-foreground">
      <AppNavbar user={user} active="/settings" actions={<LogoutButton />} />

      <main className="mx-auto max-w-3xl px-6 py-10 sm:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Account</p>
        <div className="mt-4 flex items-center gap-4">
          <span className="grid h-14 w-14 flex-none place-items-center rounded-md bg-primary font-serif text-2xl text-white" aria-hidden>
            {user.name.slice(0, 1).toUpperCase()}
          </span>
          <div className="min-w-0">
            <h1 className="truncate font-serif text-3xl tracking-[-0.03em]">{user.name}</h1>
            <p className="mt-0.5 font-mono text-xs text-muted">
              {user.email} · member since {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div key={s.l} className="kit-panel p-4 text-center sm:p-5">
              <p className="font-serif text-3xl tabular-nums sm:text-4xl">{s.v}</p>
              <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted">{s.l}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-5">
          <Card index="01" title="Profile" sub="How your name appears across the product.">
            <NameForm initial={user.name} />
            <dl className="mt-4 space-y-2.5 border-t border-border/40 pt-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted">Email</dt>
                <dd className="min-w-0 truncate font-medium">{user.email}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted">Member since</dt>
                <dd className="font-medium">{new Date(user.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</dd>
              </div>
            </dl>
          </Card>

          {!user.isGuest && (
            <Card index="02" title="Security" sub="Your session stays signed in for 30 days on each device. Logging out ends it immediately.">
              <PasswordForm />
            </Card>
          )}

          <Card index="03" title={`Your sites (${sites.length})`} sub={sites.length > 0 ? "Jump back into the builder or open the live page." : undefined}>
            {sites.length === 0 ? (
              <div className="grid justify-items-center gap-2 py-4 text-center">
                <p className="text-sm text-muted">No websites yet — start with any finished template.</p>
                <div className="mt-1 flex gap-2">
                  <Link href="/new" className="inline-flex h-10 items-center rounded-full bg-foreground px-5 text-[13px] font-medium text-background transition hover:bg-primary">Create website</Link>
                  <Link href="/templates" className="inline-flex h-10 items-center rounded-full border border-border px-5 text-[13px] font-medium transition hover:bg-foreground hover:text-background">Browse templates</Link>
                </div>
              </div>
            ) : (
              <ul className="divide-y divide-border/40">
                {sites.map((s) => {
                  const tpl = getTemplate(s.templateId);
                  return (
                    <li key={s.id} className="flex items-center gap-3 py-3.5">
                      <span className="grid h-9 w-9 flex-none place-items-center rounded-[11px] text-[13px] font-bold text-white" style={{ background: tpl.theme.primary }} aria-hidden>
                        {s.name.slice(0, 1)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{s.name}</p>
                        <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[11px] text-muted">
                          <i className="h-1.5 w-1.5 rounded-full" style={{ background: s.status === "published" ? "#16a34a" : "var(--kit-muted)" }} />
                          {s.status} · updated {timeAgo(s.updatedAt)}
                        </p>
                      </div>
                      <Link href={`/builder/${s.id}`} className="group flex-none text-[13px] font-semibold underline underline-offset-4">Edit</Link>
                      {s.status === "published" && (
                        <Link href={`/s/${s.slug}`} target="_blank" className="flex-none text-[13px] font-medium text-muted transition-colors hover:text-foreground">Visit ↗</Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>

          <Card index="04" title="Custom domains" sub="Connect www.yourdomain.com to any published site from the builder → Settings panel.">
            <div className="border border-border/40 bg-surface-2 p-3 font-mono text-xs text-muted">
              CNAME www → sites.create.io<br />A @ → 76.76.21.21
            </div>
            <p className="mt-2 text-xs text-muted">DNS status updates after propagation.</p>
          </Card>

          <section className="border border-red-900/40 bg-[#fff7f7] p-6 md:p-7">
            <p className="font-mono text-[9px] tracking-[0.16em] text-red-800/70">05</p>
            <h2 className="mt-2 font-serif text-2xl tracking-[-0.03em] text-red-800">Danger zone</h2>
            <div className="mt-4"><DeleteAccount email={user.email} siteCount={sites.length} /></div>
          </section>

          <Link
            href="/templates"
            className="group inline-flex h-12 w-fit items-center gap-2 rounded-full border border-border px-6 text-sm font-medium transition hover:bg-foreground hover:text-background"
          >
            Start another site
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </main>
    </div>
  );
}
