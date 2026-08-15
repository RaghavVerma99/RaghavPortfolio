import { skills } from "../data/content"
import Watermark from "./Watermark"
import { Section, SectionLabel, Reveal } from "./ui"

const glyphs = ["{}", "</>", "=>", "[ ]", "$", "#"]

export default function Skills() {
  return (
    <Section id="skills" className="relative overflow-hidden">
      <Watermark>Skills</Watermark>
      <SectionLabel index="02" label="Stack & Toolbox" />

      <div className="mt-14 flex flex-wrap gap-4">
        {glyphs.map((glyph, i) => (
          <Reveal key={glyph} delay={i * 0.05}>
            <div
              data-cursor
              className="glass grid h-20 w-20 place-items-center rounded-2xl font-mono text-2xl text-accent transition-colors duration-300 hover:border-accent/40 sm:h-24 sm:w-24"
            >
              {glyph}
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((category, i) => (
          <Reveal key={category.title} delay={i * 0.04}>
            <div className="glass h-full rounded-2xl p-7 transition-colors duration-300 hover:border-accent/30">
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
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
