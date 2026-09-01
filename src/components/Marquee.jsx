import { marquee } from "../data/content"

export default function Marquee() {
  const items = [...marquee, ...marquee]

  return (
    <section aria-hidden className="relative overflow-hidden border-y border-line py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
      <div className="marquee-track gap-10 px-6">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 font-mono text-xs uppercase tracking-[0.28em] text-muted"
          >
            {item}
            <span className="text-accent/70">✦</span>
          </span>
        ))}
      </div>
    </section>
  )
}
