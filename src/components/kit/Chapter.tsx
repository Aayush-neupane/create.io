/** Chapter ticket: a numbered medallion, a DejaVu-loud label and a rule.
 *  One shared voice so every section announces itself the same way. */
export function Chapter({ n, label }: { n: string; label: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="grid h-9 w-9 flex-none place-items-center rounded-full bg-primary font-mono text-[10px] font-bold tracking-[0.06em] text-white"
      >
        {n}
      </span>
      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground">
        {label}
      </span>
      <span aria-hidden="true" className="h-px w-12 bg-border" />
    </p>
  );
}
