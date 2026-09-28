import { skills } from "../data/content"
import Watermark from "./Watermark"
import { GlowCard, Section, SectionBody, SectionHeader, Stagger, StaggerItem } from "./ui"

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

      <SectionBody>
      <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" gap={0.08}>
        {skills.map((category) => (
          <StaggerItem key={category.title} className="h-full">
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
                  <span
                    key={item}
                    className="chip chip-ink transition-[transform,border-color,color] duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-paper"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </GlowCard>
          </StaggerItem>
        ))}
      </Stagger>
    </SectionBody>
    </Section>
  )
}