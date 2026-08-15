import { marquee } from "../data/content"

const phrases = [
  "Backend Systems",
  "Distributed Systems",
  "System Design",
  "REST APIs",
  "Concurrency",
  "Low-Latency",
  "Cloud",
  "Open Source",
]

export default function Marquee() {
  const stack = [...marquee, ...marquee]
  const words = [...phrases, ...phrases]

  return (
    <section className="border-y border-line">
      <div className="relative overflow-hidden py-8">
        <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap pr-10">
          {stack.map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-10 font-display text-3xl font-bold text-paper/70 md:text-4xl"
            >
              {t}
              <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-line">
        <div className="relative overflow-hidden py-6">
          <div className="marquee-track marquee-track-reverse flex w-max items-center gap-12 whitespace-nowrap pr-12">
            {words.map((t, i) => (
              <span
                key={i}
                className="flex items-center gap-12 font-mono text-xs uppercase tracking-[0.3em] text-muted"
              >
                {t}
                <span className="text-accent/70">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
