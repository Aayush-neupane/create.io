import { ArrowDownRight, Plus } from "lucide-react";
import { Chapter } from "@/components/kit/Chapter";

const faqs = [
  ["Do I need to write any code?", "Never. If you can fill a form and upload a photo, you can ship a site."],
  ["Can I use my own domain?", "Yes. Point your domain at us from the builder settings — .com.np works too."],
  ["What does it cost?", "Starting is free. Paid plans unlock premium sites, custom domains and analytics."],
  ["I run a shop in Asan, not a startup. Will this work?", "That is exactly who it is for. Menus, hours, price lists and contact pages are first-class."],
  ["Can I edit after publishing?", "Anytime. Every change autosaves, undo is built in, and republishing takes one click."],
  ["Who owns my content?", "You do. Your words, photos and pages — export and leave whenever you like."],
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto grid max-w-shell lg:grid-cols-[0.72fr_1.28fr]">
        <div className="px-6 py-14 sm:px-10 lg:border-r lg:border-border lg:px-16 lg:py-20 xl:px-20">
          <Chapter n="09" label="Fair questions" />
          <h2 className="mt-7 max-w-[10ch] font-serif text-[clamp(3rem,5vw,5.8rem)] font-normal leading-[0.94] tracking-[-0.05em]">
            Asked often.
          </h2>
          <ArrowDownRight className="mt-10 hidden h-8 w-8 text-primary lg:block" strokeWidth={1.25} />
        </div>

        <div className="px-6 py-8 sm:px-10 lg:px-16 lg:py-12 xl:px-20">
          <div className="border-t border-border">
            {faqs.map(([q, a], i) => (
              <details key={q} className="group border-b border-border">
                <summary className="flex cursor-pointer list-none items-center gap-5 py-6 marker:hidden sm:py-7">
                  <span className="font-mono text-[8px] tracking-[0.15em] text-primary-strong">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-serif text-xl tracking-[-0.025em] sm:text-2xl">{q}</span>
                  <Plus className="h-4 w-4 shrink-0 transition-transform group-open:rotate-45" />
                </summary>
                <p className="max-w-2xl pb-7 pl-10 pr-8 text-sm leading-7 text-[#5e5952] sm:text-base">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
