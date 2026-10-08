import { CircleCheck, Code2, Eye, Map, ShieldCheck } from "lucide-react";
import { Chapter } from "@/components/kit/Chapter";

const cols = [
  {
    number: "01",
    title: "What you get",
    Icon: Eye,
    items: [
      "Finished sites, not blocks",
      "Each with own components",
      "Real copy included",
      "SEO built in",
    ],
  },
  {
    number: "02",
    title: "What stays intact",
    Icon: Map,
    items: [
      "Taste on every screen",
      "Undo for everything",
      "Autosave while you type",
      "Zero code, ever",
    ],
  },
  {
    number: "03",
    title: "What it won't do",
    Icon: ShieldCheck,
    items: ["No blank canvas", "No plugins to maintain", "No code to break", "No replacement for you"],
  },
];

export function Trust() {
  return (
    <section id="builder" className="scroll-mt-20 border-b border-border bg-surface-2">
      <div className="mx-auto max-w-shell">
        <div className="grid border-b border-border lg:grid-cols-[1.05fr_0.95fr]">
          <div className="px-6 py-14 sm:px-10 lg:border-r lg:border-border lg:px-16 lg:py-20 xl:px-20">
            <Chapter n="08" label="Under the hood" />
            <h2 className="mt-7 max-w-[13ch] font-serif text-[clamp(3rem,5vw,5.8rem)] font-normal leading-[0.94] tracking-[-0.05em]">
              Understand what it does — and what it never breaks.
            </h2>
          </div>
          <div className="flex flex-col justify-end px-6 py-14 sm:px-10 lg:px-16 lg:py-20 xl:px-20">
            <Code2 className="h-8 w-8 text-primary" strokeWidth={1.3} />
            <p className="mt-8 max-w-lg text-base leading-7 text-[#5e5952]">
              Every word, photo, price and hour is a plain field. Sections come
              from the template&apos;s own library, so the design holds together
              whatever you change.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3">
          {cols.map((c, i) => (
            <article
              key={c.number}
              className={`p-7 sm:p-10 lg:p-12 ${i < 2 ? "border-b border-border lg:border-b-0 lg:border-r" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] tracking-[0.16em] text-primary-strong">{c.number}</span>
                <c.Icon className="h-6 w-6 text-secondary" strokeWidth={1.4} />
              </div>
              <h3 className="mt-10 font-serif text-3xl tracking-[-0.04em]">{c.title}</h3>
              <ul className="mt-7 border-t border-border/30">
                {c.items.map((item) => (
                  <li key={item} className="flex gap-3 border-b border-border/20 py-3 text-sm leading-6 text-[#5e5952]">
                    <CircleCheck className="mt-1 h-3.5 w-3.5 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
