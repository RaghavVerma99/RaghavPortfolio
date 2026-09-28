import { marquee } from "../data/content"

export default function Marquee() {
  const items = [...marquee, ...marquee]

  return (
    <section
      aria-label="Technology stack"
      className="relative overflow-hidden border-y border-line/80 py-4"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-accent/[0.06] via-transparent to-blue/[0.06]"
      />
      <div className="marquee-mask marquee-track relative gap-12 px-10">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="group flex shrink-0 items-center gap-12 font-mono text-[11px] uppercase tracking-[0.3em] text-muted transition-colors duration-300 hover:text-paper"
          >
            {item}
            <span
              aria-hidden
              className="text-accent/60 transition-transform duration-500 group-hover:rotate-90 group-hover:text-accent"
            >
              ◈
            </span>
          </span>
        ))}
      </div>
    </section>
  )
}