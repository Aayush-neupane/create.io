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
    <div className="min-h-screen" style={{ background: "var(--paper)" }}>
      <header style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-4">
          <Link href="/dashboard" className="font-mono text-[11px] font-bold uppercase transition-colors hover:text-white" style={{ letterSpacing: "0.14em", color: "var(--cream-dim)" }}>← Dashboard</Link>
          <span className="display display-upper text-xl" style={{ color: "var(--paper)" }}>Template admin</span>
          <span className="tag-tan">internal</span>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">
        <p className="max-w-2xl text-sm leading-relaxed" style={{ color: "var(--ink-2)" }}>
          Templates are defined in <code className="border px-1 font-mono text-[13px]" style={{ borderColor: "var(--line-2)", background: "var(--surface)" }}>src/lib/templates.ts</code> and rendered through the shared section registry.
          Adding a template = add one entry with theme + section list. No rebuild of the builder required.
        </p>
        <div className="card mt-6 overflow-x-auto" style={{ borderRadius: 12 }}>
          <table className="w-full text-left text-sm">
            <thead className="border-b font-mono text-[10px] font-bold uppercase" style={{ borderColor: "var(--line-2)", background: "var(--surface-2)", letterSpacing: "0.14em", color: "var(--ink-3)" }}>
              <tr><th className="px-4 py-3">Template</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Sections</th><th className="px-4 py-3">Tier</th><th className="px-4 py-3">Action</th></tr>
            </thead>
            <tbody>
              {TEMPLATES.map((t) => (
                <tr key={t.id} className="border-b last:border-0" style={{ borderColor: "var(--line)" }}>
                  <td className="px-4 py-3"><p className="font-bold">{t.name}</p><p className="mono-meta font-mono text-xs" style={{ color: "var(--ink-3)" }}>{t.id}</p></td>
                  <td className="px-4 py-3" style={{ color: "var(--ink-2)" }}>{t.category} · {t.style}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "var(--ink-2)" }}>{t.sections.map((s) => SECTION_META[s.type]?.label).join(" · ")}</td>
                  <td className="px-4 py-3"><span className="tag">{t.tier}</span></td>
                  <td className="px-4 py-3"><Link href={`/templates/${t.id}`} className="font-bold underline underline-offset-4">Preview</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
