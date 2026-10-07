const quotes = [
  ["I published my trekking site between two bus rides to Pokhara. Bookings came before I got home.", "Binod Thapa", "Guide, Himalayan Trails"],
  ["Clients think I hired an agency in Jhamsikhel. It was me, on a Sunday, with chiya.", "Sabina Karki", "Designer, Lalitpur"],
  ["Our momo menu finally looks as good as it tastes. Weekend covers are up.", "Tashi Sherpa", "Owner, Lakeside Kitchen"],
];

/** A light wall of love — oversized serif voices divided by hairlines, so the
 *  two dark bands (workflow above, none below) never touch. */
export function Testimonials() {
  return (
    <section id="love" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-shell">
        <div className="grid border-b border-border lg:grid-cols-[0.62fr_1.38fr]">
          <div className="px-6 py-10 sm:px-10 lg:border-r lg:border-border lg:px-16 lg:py-16 xl:px-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Wall of love</p>
          </div>
          <div className="px-6 py-10 sm:px-10 lg:px-16 lg:py-16 xl:px-20">
            <h2 className="max-w-[14ch] font-serif text-[clamp(2.7rem,5.2vw,5.6rem)] font-normal leading-[0.98] tracking-[-0.045em]">
              Namaste, new website.
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3">
          {quotes.map(([m, n, r], i) => (
            <figure
              key={n}
              data-scroll-reveal
              style={{ transitionDelay: `${i * 90}ms` }}
              className={`flex min-h-[26rem] flex-col p-7 sm:p-10 lg:p-12 ${i < 2 ? "border-b border-border md:border-b-0 md:border-r" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] tracking-[0.16em] text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden className="text-xs tracking-[0.2em] text-primary">★★★★★</span>
              </div>
              <span className="mt-8 font-serif text-6xl leading-none text-primary/60" aria-hidden>
                &ldquo;
              </span>
              <blockquote className="-mt-3 max-w-[26ch] flex-1 font-serif text-2xl leading-[1.25] tracking-[-0.02em]">
                {m}
              </blockquote>
              <figcaption className="mt-8 border-t border-border/25 pt-4 text-sm">
                <span className="font-semibold">{n}</span>
                <br />
                <span className="text-muted">{r}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
