import { skills } from "../data/content"
import Watermark from "./Watermark"
import { GlowCard, Section, SectionLabel, Reveal } from "./ui"

export default function Skills() {
  return (
    <Section id="skills" className="relative overflow-hidden">
      <Watermark>Skills</Watermark>
      <SectionLabel index="03" label="Stack & Toolbox" />
      <h2 className="mt-10 max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">
        The stack I <span className="italic-display text-gradient text-[1.05em]">ship.</span>
      </h2>
      <p className="mt-4 max-w-xl text-base text-muted">
        Backend-first: languages, APIs, data, and the systems layer that keeps latency honest.
      </p>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((category, i) => (
          <Reveal key={category.title} delay={i * 0.04}>
            <GlowCard className="h-full p-7">
              <h3 className="font-display text-sm font-semibold tracking-widest text-accent uppercase">
                {category.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
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
