const quotes = [
  ["I published my trekking site between two bus rides to Pokhara. Bookings came before I got home.", "Binod Thapa", "Guide, Himalayan Trails"],
  ["Clients think I hired an agency in Jhamsikhel. It was me, on a Sunday, with chiya.", "Sabina Karki", "Designer, Lalitpur"],
  ["Our momo menu finally looks as good as it tastes. Weekend covers are up.", "Tashi Sherpa", "Owner, Lakeside Kitchen"],
];

export function Testimonials() {
  return (
    <section id="love" className="scroll-mt-20 border-b border-border bg-[#292721] text-[#f4efe4]">
      <div className="mx-auto max-w-shell px-6 py-20 sm:px-10 lg:px-16 lg:py-28 xl:px-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#aaa398]">04 · Wall of love</p>
        <h2 className="mt-7 max-w-[12ch] font-serif text-[clamp(3rem,5.5vw,6rem)] font-normal leading-[0.94] tracking-[-0.045em]">
          Namaste, new website.
        </h2>
        <div className="mt-14 grid gap-px border border-white/25 bg-white/25 md:grid-cols-3">
          {quotes.map(([m, n, r], i) => (
            <figure key={n} data-scroll-reveal className="flex flex-col bg-[#292721] p-8 sm:p-10" style={{ transitionDelay: `${i * 90}ms` }}>
              <span aria-hidden className="text-sm tracking-[0.2em] text-[#d97757]">★★★★★</span>
              <span className="mt-4 font-serif text-4xl leading-none text-[#d97757]" aria-hidden>“</span>
              <blockquote className="mt-2 flex-1 text-[15px] leading-relaxed text-[#e8e3d8]">{m}</blockquote>
              <figcaption className="mt-6 border-t border-white/20 pt-4 text-sm">
                <span className="font-semibold">{n}</span><br />
                <span className="text-[#aaa398]">{r}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
