import Link from "next/link";
import { redirect } from "next/navigation";
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

function Card({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border p-6 md:p-7" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
      <h2 className="font-semibold" style={{ letterSpacing: "-0.015em" }}>{title}</h2>
      {sub && <p className="mt-1 text-sm" style={{ color: "var(--ink-2)" }}>{sub}</p>}
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
    <div className="min-h-screen" style={{ background: "var(--paper)" }}>
      <AppNavbar user={user} active="/settings" actions={<LogoutButton />} />

      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="flex items-center gap-4">
          <span className="grid h-14 w-14 flex-none place-items-center rounded-2xl text-xl font-bold text-white" style={{ background: "var(--ink)" }} aria-hidden>
            {user.name.slice(0, 1).toUpperCase()}
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-semibold tracking-tight">{user.name}</h1>
            <p className="mono-meta mt-0.5 text-xs" style={{ color: "var(--ink-3)" }}>
              {user.email} · member since {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div key={s.l} className="rounded-2xl border p-4 text-center sm:p-5" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
              <p className="text-2xl font-bold tabular-nums sm:text-3xl" style={{ letterSpacing: "-0.03em" }}>{s.v}</p>
              <p className="mono-meta mt-1 text-[10.5px] uppercase" style={{ letterSpacing: "0.1em", color: "var(--ink-3)" }}>{s.l}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-5">
          <Card title="Profile" sub="How your name appears across the product.">
            <NameForm initial={user.name} />
            <dl className="mt-4 space-y-2.5 border-t pt-4 text-sm" style={{ borderColor: "var(--line)" }}>
              <div className="flex items-center justify-between gap-4">
                <dt style={{ color: "var(--ink-3)" }}>Email</dt>
                <dd className="min-w-0 truncate font-medium">{user.email}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt style={{ color: "var(--ink-3)" }}>Member since</dt>
                <dd className="font-medium">{new Date(user.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</dd>
              </div>
            </dl>
          </Card>

          {!user.isGuest && (
            <Card title="Security" sub="Your session stays signed in for 30 days on each device. Logging out ends it immediately.">
              <PasswordForm />
            </Card>
          )}

          <Card title={`Your sites (${sites.length})`} sub={sites.length > 0 ? "Jump back into the builder or open the live page." : undefined}>
            {sites.length === 0 ? (
              <div className="grid justify-items-center gap-2 py-4 text-center">
                <p className="text-sm" style={{ color: "var(--ink-2)" }}>No websites yet — start with any finished template.</p>
                <div className="mt-1 flex gap-2">
                  <Link href="/new" className="btn-primary" style={{ height: 38, fontSize: 13 }}>Create website</Link>
                  <Link href="/templates" className="btn-ghost" style={{ height: 38, fontSize: 13 }}>Browse templates</Link>
                </div>
              </div>
            ) : (
              <ul className="divide-y" style={{ borderColor: "var(--line)" }}>
                {sites.map((s) => {
                  const tpl = getTemplate(s.templateId);
                  return (
                    <li key={s.id} className="flex items-center gap-3 py-3.5">
                      <span className="grid h-9 w-9 flex-none place-items-center rounded-[11px] text-[13px] font-bold text-white" style={{ background: tpl.theme.primary }} aria-hidden>
                        {s.name.slice(0, 1)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{s.name}</p>
                        <p className="mono-meta mt-0.5 flex items-center gap-1.5 text-[11px]" style={{ color: "var(--ink-3)" }}>
                          <i className="h-1.5 w-1.5 rounded-full" style={{ background: s.status === "published" ? "#16a34a" : "var(--ink-3)" }} />
                          {s.status} · updated {timeAgo(s.updatedAt)}
                        </p>
                      </div>
                      <Link href={`/builder/${s.id}`} className="flex-none text-[13px] font-semibold underline underline-offset-4">Edit</Link>
                      {s.status === "published" && (
                        <Link href={`/s/${s.slug}`} target="_blank" className="flex-none text-[13px] font-medium" style={{ color: "var(--ink-3)" }}>Visit ↗</Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>

          <Card title="Custom domains" sub="Connect www.yourdomain.com to any published site from the builder → Settings panel.">
            <div className="rounded-lg p-3 font-mono text-xs" style={{ background: "var(--surface-2)", color: "var(--ink-2)" }}>
              CNAME www → sites.create.io<br />A @ → 76.76.21.21
            </div>
            <p className="mt-2 text-xs" style={{ color: "var(--ink-3)" }}>DNS status updates after propagation.</p>
          </Card>

          <section className="rounded-2xl border p-6 md:p-7" style={{ borderColor: "#f3c2c2", background: "#fff7f7" }}>
            <h2 className="font-semibold text-red-800" style={{ letterSpacing: "-0.015em" }}>Danger zone</h2>
            <div className="mt-4"><DeleteAccount email={user.email} siteCount={sites.length} /></div>
          </section>
        </div>
      </main>
    </div>
  );
}
