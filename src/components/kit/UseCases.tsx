import { Compass, GitPullRequest, Workflow as WorkflowIcon } from "lucide-react";

const cases = [
  {
    number: "01",
    kicker: "Freelancers and portfolios",
    question: "Will clients take me seriously?",
    body: "A finished portfolio with work, rates and contact — published before your chiya cools. No agency invoice.",
    Icon: Compass,
  },
  {
    number: "02",
    kicker: "Shops, cafés and kitchens",
    question: "Will the menu look as good as it tastes?",
    body: "Menus, hours, price lists and contact pages are first-class. Weekend covers notice the difference.",
    Icon: GitPullRequest,
  },
  {
    number: "03",
    kicker: "Startups and studios",
    question: "Can we launch this week?",
    body: "Pick the SaaS or agency site, drop in your copy and pricing, publish the link in your pitch deck.",
    Icon: WorkflowIcon,
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-shell">
        <div className="grid border-b border-border lg:grid-cols-[0.82fr_1.18fr]">
          <div className="px-6 py-12 sm:px-10 lg:border-r lg:border-border lg:px-16 lg:py-20 xl:px-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Ch. 05 — Who it&apos;s for
            </p>
            <h2 className="mt-7 max-w-[12ch] font-serif text-[clamp(3rem,5vw,5.8rem)] font-normal leading-[0.94] tracking-[-0.05em]">
              Start with a better starting point.
            </h2>
          </div>
          <div className="flex items-end px-6 py-12 sm:px-10 lg:px-16 lg:py-20 xl:px-20">
            <p className="max-w-2xl text-base leading-7 text-[#5e5952] sm:text-lg sm:leading-8">
              Most useful when there is a real site to ship: a portfolio that wins
              work, a menu that fills tables, or a launch page that cannot wait.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3">
          {cases.map((c, i) => (
            <article
              key={c.number}
              className={`flex min-h-[30rem] flex-col p-7 sm:p-10 lg:p-12 ${i < 2 ? "border-b border-border md:border-b-0 md:border-r" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] tracking-[0.16em] text-muted">{c.number}</span>
                <c.Icon className="h-7 w-7 text-primary" strokeWidth={1.35} />
              </div>
              <p className="mt-14 font-mono text-[9px] uppercase tracking-[0.14em] text-secondary">{c.kicker}</p>
              <h3 className="mt-5 max-w-[15ch] font-serif text-3xl leading-[1.05] tracking-[-0.04em] sm:text-4xl">
                {c.question}
              </h3>
              <p className="mt-auto pt-10 text-sm leading-7 text-[#5e5952]">{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
