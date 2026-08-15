import { stats } from "../data/content"
import Watermark from "./Watermark"
import { CountUp, Reveal, Section, SectionLabel } from "./ui"

export default function Stats() {
  return (
    <Section className="border-t border-line">
      <Watermark>Numbers</Watermark>
      <SectionLabel index="07" label="By the numbers" />
      <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.06}
            className="group bg-white/[0.035] p-8 text-center backdrop-blur-xl transition-colors duration-300 hover:bg-white/[0.06] md:p-10"
          >
            <p className="font-display text-5xl font-bold transition-colors duration-300 group-hover:text-accent md:text-6xl">
              <CountUp to={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
