import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";

export default async function SettingsPage() {
  const user = await currentUser();
  if (!user) redirect("/login");
  return (
    <div className="min-h-screen" style={{ background: "var(--paper)" }}>
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-6 py-4">
          <Link href="/dashboard" className="text-sm text-neutral-500">← Dashboard</Link>
          <span className="font-semibold">Account settings</span>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h1 className="font-semibold">Profile</h1>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between border-b border-neutral-100 pb-3"><span className="text-neutral-500">Name</span><span className="font-medium">{user.name}</span></div>
            <div className="flex justify-between border-b border-neutral-100 pb-3"><span className="text-neutral-500">Email</span><span className="font-medium">{user.email}</span></div>
            <div className="flex justify-between"><span className="text-neutral-500">Member since</span><span className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</span></div>
          </div>
        </div>
        <div className="mt-5 rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="font-semibold">Custom domains</h2>
          <p className="mt-1 text-sm text-neutral-600">Connect <code>www.yourdomain.com</code> to any published site from the builder → Settings panel. Add the DNS records shown there; status updates after propagation.</p>
          <div className="mt-3 rounded-lg bg-neutral-50 p-3 font-mono text-xs text-neutral-600">CNAME www → sites.create.io<br />A @ → 76.76.21.21</div>
        </div>
      </main>
    </div>
  );
}
