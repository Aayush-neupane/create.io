import type { TemplateDefinition } from "@/types/builder";

/** Stylized structural mock per template — shows layout differences, not just color. */
export function TemplateThumb({ t }: { t: TemplateDefinition }) {
  const bar = "rounded bg-neutral-900/10";
  const dark = t.mode === "dark";
  const ink = dark ? "bg-white/15" : "bg-neutral-900/10";
  const solid = dark ? "bg-white/80" : "bg-neutral-900";

  if (t.id === "creative-portfolio") {
    return (
      <div className="h-full rounded-xl border border-black/5 bg-black/60 p-4 shadow-sm">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">Portfolio</p>
        <div className="mt-1 h-6 w-4/5 rounded bg-white/85" />
        <div className="mt-1 h-6 w-3/5 rounded bg-white/40" />
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          <div className="col-span-2 h-16 rounded bg-white/20" />
          <div className="h-16 rounded bg-white/10" />
          <div className="h-12 rounded bg-white/10" />
          <div className="col-span-2 h-12 rounded bg-white/15" />
        </div>
      </div>
    );
  }
  if (t.id === "restaurant") {
    return (
      <div className="h-full rounded-xl border border-black/5 bg-white/85 p-4 text-center shadow-sm">
        <p className="text-[9px] font-semibold uppercase" style={{ letterSpacing: "0.3em", color: t.theme.muted }}>Ember & Oak</p>
        <p className="mx-auto mt-1 text-[10px]" style={{ color: t.theme.muted }}>✦</p>
        <div className={`mx-auto mt-2 h-4 w-2/3 rounded ${ink}`} />
        <div className="mx-auto mt-3 grid max-w-[90%] grid-cols-2 gap-2 text-left">
          <div className={`h-2 w-3/4 rounded ${ink}`} />
          <div className={`h-2 w-1/2 rounded ${ink}`} />
          <div className={`h-2 w-2/3 rounded ${ink}`} />
          <div className={`h-2 w-3/4 rounded ${ink}`} />
        </div>
      </div>
    );
  }
  if (t.id === "agency") {
    return (
      <div className="h-full rounded-xl border border-black/5 bg-white/85 p-4 shadow-sm" style={{ background: t.theme.primary }}>
        <div className="flex items-center justify-between">
          <div className="h-2 w-12 rounded bg-white/80" />
          <div className="h-5 w-16 rounded-full bg-white" />
        </div>
        <div className="mt-3 h-5 w-11/12 rounded bg-white" />
        <div className="mt-1.5 h-5 w-3/4 rounded bg-white/60" />
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          <div className="h-10 rounded border border-white/25" />
          <div className="h-10 rounded border border-white/25" />
        </div>
      </div>
    );
  }
  if (t.id === "professional-business") {
    return (
      <div className="h-full rounded-xl border border-black/5 bg-white/85 p-4 shadow-sm">
        <div className={`mx-auto h-1.5 w-10 rounded ${ink}`} />
        <div className="mx-auto mt-2 h-4 w-3/4 rounded bg-neutral-900/80" />
        <div className="mx-auto mt-1 h-2.5 w-1/2 rounded bg-neutral-900/10" />
        <div className="mt-3 space-y-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2 border-b border-neutral-900/5 pb-1.5">
              <span className="font-mono text-[9px] text-neutral-400">0{i + 1}</span>
              <span className={`h-2 flex-1 rounded ${bar}`} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (t.id === "saas-starter") {
    return (
      <div className="h-full rounded-xl border border-black/5 bg-white/85 p-4 text-center shadow-sm">
        <div className="mx-auto h-4 w-1/2 rounded bg-neutral-900/80" />
        <div className="mx-auto mt-1.5 h-2.5 w-2/3 rounded bg-neutral-900/10" />
        <div className="mx-auto mt-2.5 flex justify-center gap-1.5">
          <div className="h-6 w-20 rounded-md" style={{ background: t.theme.primary }} />
          <div className="h-6 w-20 rounded-md border border-neutral-300" />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => <div key={i} className="h-12 rounded-lg border border-neutral-900/10" />)}
        </div>
      </div>
    );
  }
  // minimal-portfolio default: quiet editorial split
  return (
    <div className="h-full rounded-xl border border-black/5 bg-white/80 p-4 shadow-sm">
      <div className="grid h-full grid-cols-2 gap-3">
        <div>
          <div className="h-1.5 w-14 rounded bg-neutral-900/60" />
          <div className="mt-2 h-3.5 w-full rounded bg-neutral-900/80" />
          <div className="mt-1.5 h-3.5 w-2/3 rounded bg-neutral-900/20" />
          <div className="mt-3 h-6 w-20 rounded-md bg-neutral-900" />
        </div>
        <div className="rounded-lg bg-neutral-900/5" />
      </div>
    </div>
  );
}
