import { Chapter } from "@/components/kit/Chapter";

const steps = [
  ["01", "CHOOSE", "Pick a whole site", "Not blocks — complete predesigned websites with their own components and copy."],
  ["02", "FILL", "Drop in your content", "Fields, not code. Projects, menus, hours, testimonials — structured for you."],
  ["03", "TUNE", "Tune the voltage", "Variants, palettes, type and spacing. The design holds together no matter what."],
  ["04", "SHIP", "Publish in one click", "A fast public page with SEO built in. Edit and republish whenever."],
];

/** The process as an open drafting table — giant ghost numerals on paper,
 *  not another dark band. Deliberately the airiest chapter on the page. */
export function Workflow() {
  return (
    <section id="how" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-shell">
        <div className="grid border-b border-border lg:grid-cols-[0.62fr_1.38fr]">
          <div className="px-6 py-10 sm:px-10 lg:border-r lg:border-border lg:px-16 lg:py-16 xl:px-20">
            <Chapter n="06" label="How it works" />
          </div>
          <div className="px-6 py-10 sm:px-10 lg:px-16 lg:py-16 xl:px-20">
            <h2 className="max-w-[14ch] font-serif text-[clamp(2.7rem,5.2vw,5.6rem)] font-normal leading-[0.98] tracking-[-0.045em]">
              Live in four moves.
            </h2>
          </div>
        </div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([number, stage, title, body], i) => (
            <li
              key={number}
              data-scroll-reveal
              style={{ transitionDelay: `${i * 80}ms` }}
              className={`relative overflow-hidden p-7 sm:p-10 lg:p-10 ${
                i === 0 ? "sm:border-r sm:border-border" : ""
              } ${i === 1 ? "border-t border-border sm:border-t-0 lg:border-r" : ""} ${
                i === 2 ? "border-t border-border sm:border-r sm:border-border lg:border-t-0" : ""
              } ${i === 3 ? "border-t border-border lg:border-t-0" : ""}`}
            >
              <p aria-hidden="true" className="pointer-events-none absolute -top-4 right-2 font-serif text-[7rem] leading-none text-primary/15 sm:text-[8rem]">
                {number}
              </p>
              <p className="relative font-mono text-[9px] tracking-[0.16em] text-primary-strong">{stage}</p>
              <h3 className="relative mt-6 font-serif text-3xl leading-[1.05] tracking-[-0.03em]">{title}</h3>
              <p className="relative mt-3 max-w-[30ch] text-sm leading-7 text-[#5e5952]">{body}</p>
              <span className="relative mt-6 block h-px w-12 bg-primary" aria-hidden="true" />
            </li>
          ))}
        </ol>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-4 sm:px-10 lg:px-16 xl:px-20">
          <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted">Structured fields first</span>
          <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-primary-strong">Taste built in second</span>
        </div>
      </div>
    </section>
  );
}
