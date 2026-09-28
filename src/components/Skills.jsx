import { skills } from "../data/content"
import Watermark from "./Watermark"
import { GlowCard, Section, SectionHeader, Reveal } from "./ui"

export default function Skills() {
  const total = skills.reduce((n, s) => n + s.items.length, 0)
  return (
    <Section id="skills" className="relative overflow-hidden">
      <Watermark>Skills</Watermark>
      <SectionHeader
        index="03"
        kicker="Stack & toolbox"
        meta={<>{total} technologies</>}
        title={
          <h2 className="mt-8 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
            The stack I <span className="italic-display text-gradient text-[1.06em]">ship.</span>
          </h2>
        }
        lede="Backend-first: languages, APIs, data, and the systems layer that keeps latency honest."
      />

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((category, i) => (
          <Reveal key={category.title} delay={i * 0.04}>
            <GlowCard className="group h-full p-7">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-semibold tracking-[0.18em] uppercase text-accent">
                  {category.title}
                </h3>
                <span className="font-mono text-[10px] text-faint">
                  {String(category.items.length).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span key={item} className="chip chip-ink">
                    {item}
                  </span>
                ))}
              </div>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}