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
    <div className="marketing-theme min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/95">
        <div className="mx-auto flex max-w-shell items-center gap-3 px-6 py-4 sm:px-10 lg:px-16 xl:px-20">
          <Link href="/dashboard" className="text-sm text-muted transition-colors hover:text-foreground">← Dashboard</Link>
          <span className="font-serif text-lg">Template admin</span>
          <span className="rounded-full border border-border/40 px-2 py-0.5 font-mono text-[11px] text-muted">internal</span>
        </div>
      </header>
      <main className="mx-auto max-w-shell px-6 py-8 sm:px-10 lg:px-16 xl:px-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Internal</p>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Templates are defined in <code className="border border-border/40 bg-surface-2 px-1 font-mono text-[13px]">src/lib/templates.ts</code> and rendered through the shared section registry
          (<code className="border border-border/40 bg-surface-2 px-1 font-mono text-[13px]">SECTION_META</code> + <code className="border border-border/40 bg-surface-2 px-1 font-mono text-[13px]">Sections.tsx</code>).
          Adding a template = add one entry with theme + section list. No rebuild of the builder required.
        </p>
        <div className="kit-panel mt-6 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-surface-2 font-mono text-xs text-muted">
              <tr><th className="px-4 py-2.5">Template</th><th className="px-4 py-2.5">Category</th><th className="px-4 py-2.5">Sections</th><th className="px-4 py-2.5">Tier</th><th className="px-4 py-2.5">Action</th></tr>
            </thead>
            <tbody>
              {TEMPLATES.map((t) => (
                <tr key={t.id} className="border-b border-border/25 last:border-0">
                  <td className="px-4 py-3"><p className="font-medium">{t.name}</p><p className="font-mono text-xs text-muted">{t.id}</p></td>
                  <td className="px-4 py-3 text-muted">{t.category} · {t.style}</td>
                  <td className="px-4 py-3 text-xs text-muted">{t.sections.map((s) => SECTION_META[s.type]?.label).join(" · ")}</td>
                  <td className="px-4 py-3">{t.tier}</td>
                  <td className="px-4 py-3"><Link href={`/templates/${t.id}`} className="font-medium underline underline-offset-4">Preview</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
