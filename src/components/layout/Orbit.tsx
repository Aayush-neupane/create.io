import Image from "next/image";

/** Shared orbit language: rings, haloed mark and tracked line. Used by the
 *  route loader, the 404 page and the offline takeover alike. */

/** Concentric rings with an ember satellite on the outer ring. */
export function OrbitRings({ spin = true }: { spin?: boolean }) {
  return (
    <>
      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 h-[clamp(20rem,72vmin,32rem)] w-[clamp(20rem,72vmin,32rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/25 ${spin ? "loader-orbit-spin" : ""}`}
        aria-hidden="true"
      >
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary" />
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[clamp(13rem,46vmin,21rem)] w-[clamp(13rem,46vmin,21rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/15"
        aria-hidden="true"
      />
    </>
  );
}

/** The logo in a haloed medallion. */
export function OrbitMark({ size = 80 }: { size?: number }) {
  const inner = Math.round(size * 0.45);
  return (
    <span
      className="relative grid place-items-center rounded-full border border-border bg-surface"
      style={{ width: size, height: size, boxShadow: "0 18px 50px rgba(41,39,33,.12)" }}
      aria-hidden="true"
    >
      <span className="loader-halo pointer-events-none absolute inset-[-1px] rounded-full border border-primary" />
      <Image src="/logo.png" alt="" width={inner} height={inner} className="rounded-full object-cover" style={{ width: inner, height: inner }} />
    </span>
  );
}

/** A journey in one row: origin dot, tracked line, destination node. */
export function TrackLine({ animate = true }: { animate?: boolean }) {
  return (
    <span className="flex w-full items-center gap-3" aria-hidden="true">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
      <span className="relative h-px flex-1 overflow-hidden bg-border/40">
        <span className={`absolute inset-y-0 w-2/5 bg-primary ${animate ? "loader-track-slide" : "left-1/4"}`} />
      </span>
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
    </span>
  );
}
