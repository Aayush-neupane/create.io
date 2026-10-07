import { TEMPLATES } from "@/lib/templates";

/** A ticker of real shelf contents — every template name and kind, looping.
 *  Uses the global marquee rhythm; pauses on hover. */
export function Ticker() {
  const items = TEMPLATES.map((t) => `${t.name} · ${t.category.toLowerCase()}`);
  const row = [...items, ...items];
  return (
    <section aria-label="Template shelf ticker" className="overflow-hidden border-b border-border bg-background">
      <div className="marquee py-4" role="presentation">
        <ul className="marquee-track items-center">
          {row.map((s, i) => (
            <li key={`${s}-${i}`} aria-hidden={i >= items.length} className="flex flex-none items-center gap-6 pr-6">
              <span className="whitespace-nowrap font-serif text-xl tracking-[-0.02em]">{s}</span>
              <span className="h-1.5 w-1.5 flex-none rounded-full bg-primary" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
