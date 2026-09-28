import { marquee } from "../data/content"

export default function Marquee() {
  const items = [...marquee, ...marquee]

  return (
    <section aria-label="Technology stack" className="relative overflow-hidden border-y border-line py-4">
      <div className="marquee-mask marquee-track gap-12 px-10">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-12 font-mono text-[11px] uppercase tracking-[0.3em] text-muted"
          >
            {item}
            <span aria-hidden className="text-accent/70">
              ◈
            </span>
          </span>
        ))}
      </div>
    </section>
  )
}