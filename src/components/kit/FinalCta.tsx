import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCta() {
  return (
    <section id="pricing" className="scroll-mt-20 bg-primary text-[#201f1b]">
      <div className="mx-auto grid max-w-shell lg:grid-cols-[1.15fr_0.85fr]">
        <div className="px-6 py-16 sm:px-10 lg:border-r lg:border-[#201f1b] lg:px-16 lg:py-24 xl:px-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em]">Free to start, yours to keep</p>
          <h2 className="mt-7 max-w-[12ch] font-serif text-[clamp(3.2rem,6vw,6.5rem)] font-normal leading-[0.9] tracking-[-0.05em]">
            Begin with clarity. Keep it as you grow.
          </h2>
        </div>
        <div className="flex flex-col justify-between px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
          <div>
            <p className="text-lg leading-8">
              Starting is free. Premium sites, custom domains and analytics
              unlock when you need them — no card required to explore today.
            </p>
            <div className="mt-8 grid grid-cols-3 border-y border-[#201f1b]/40 py-5">
              {[
                ["01", "Free start"],
                ["02", "Live preview"],
                ["03", "No code"],
              ].map(([number, label]) => (
                <div key={number}>
                  <p className="font-mono text-[8px] tracking-[0.15em]">{number}</p>
                  <p className="mt-1.5 text-xs sm:text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/new"
              className="group inline-flex h-14 w-fit items-center gap-4 rounded-full bg-[#201f1b] px-7 text-sm font-medium text-[#f4efe4] transition hover:bg-[#f4efe4] hover:text-[#201f1b]"
            >
              Start building
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/templates"
              className="inline-flex h-14 w-fit items-center rounded-full border border-[#201f1b]/40 px-7 text-sm font-medium transition hover:bg-[#201f1b] hover:text-[#f4efe4]"
            >
              Browse sites
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
