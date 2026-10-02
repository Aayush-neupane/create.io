import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { TEMPLATES } from "@/lib/templates";
import { SECTION_META } from "@/components/templates/Renderer";

export default async function AdminTemplatesPage() {
  const user = await currentUser();
  if (!user) redirect("/login");
  const allow = (process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const isAdmin = allow.length > 0 && allow.includes(user.email.toLowerCase());
  if (!isAdmin) redirect("/dashboard");
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-4">
          <Link href="/dashboard" className="text-sm text-neutral-500">← Dashboard</Link>
          <span className="font-semibold">Template admin</span>
          <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-600">internal</span>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">
        <p className="max-w-2xl text-sm text-neutral-600">
          Templates are defined in <code className="rounded bg-neutral-100 px-1">src/lib/templates.ts</code> and rendered through the shared section registry
          (<code className="rounded bg-neutral-100 px-1">SECTION_META</code> + <code className="rounded bg-neutral-100 px-1">Sections.tsx</code>).
          Adding a template = add one entry with theme + section list. No rebuild of the builder required.
        </p>
        <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-neutral-200 bg-neutral-50 text-xs text-neutral-500">
              <tr><th className="px-4 py-2.5">Template</th><th className="px-4 py-2.5">Category</th><th className="px-4 py-2.5">Sections</th><th className="px-4 py-2.5">Tier</th><th className="px-4 py-2.5">Action</th></tr>
            </thead>
            <tbody>
              {TEMPLATES.map((t) => (
                <tr key={t.id} className="border-b border-neutral-100 last:border-0">
                  <td className="px-4 py-3"><p className="font-medium">{t.name}</p><p className="font-mono text-xs text-neutral-500">{t.id}</p></td>
                  <td className="px-4 py-3 text-neutral-600">{t.category} · {t.style}</td>
                  <td className="px-4 py-3 text-xs text-neutral-600">{t.sections.map((s) => SECTION_META[s.type]?.label).join(" · ")}</td>
                  <td className="px-4 py-3">{t.tier}</td>
                  <td className="px-4 py-3"><Link href={`/templates/${t.id}`} className="font-medium underline">Preview</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
