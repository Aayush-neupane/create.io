const steps = [
  ["01", "CHOOSE", "Pick a whole site", "Not blocks — complete predesigned websites with their own components and copy."],
  ["02", "FILL", "Drop in your content", "Fields, not code. Projects, menus, hours, testimonials — structured for you."],
  ["03", "TUNE", "Tune the voltage", "Variants, palettes, type and spacing. The design holds together no matter what."],
  ["04", "SHIP", "Publish in one click", "A fast public page with SEO built in. Edit and republish whenever."],
];

export function Workflow() {
  return (
    <section id="how" className="scroll-mt-20 border-b border-border bg-[#292721] text-[#f4efe4]">
      <div className="mx-auto max-w-shell px-6 py-20 sm:px-10 lg:px-16 lg:py-28 xl:px-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#aaa398]">
              From blank tab to live site
            </p>
            <h2 className="mt-7 max-w-[11ch] font-serif text-[clamp(3rem,5.5vw,6rem)] font-normal leading-[0.94] tracking-[-0.045em]">
              Live in four moves.
            </h2>
          </div>

          <ol className="border-t border-white/25">
            {steps.map(([number, stage, title, body]) => (
              <li key={number} className="grid gap-4 border-b border-white/25 py-7 sm:grid-cols-[4rem_1fr] sm:gap-7">
                <span className="font-mono text-[10px] tracking-[0.16em] text-[#d97757]">{number}</span>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="text-lg font-medium tracking-[-0.02em] sm:text-xl">{title}</h3>
                    <span className="font-mono text-[8px] tracking-[0.15em] text-[#858176]">{stage}</span>
                  </div>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-[#bdb7ac]">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-5 font-mono text-[8px] uppercase tracking-[0.14em] text-[#aaa398]">
          <span>Structured fields first</span>
          <span className="text-[#d97757]">Taste built in second</span>
        </div>
      </div>
    </section>
  );
}
