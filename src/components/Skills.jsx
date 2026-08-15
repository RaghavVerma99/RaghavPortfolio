import { Section, SectionLabel, Reveal } from "./ui"

const Watermark = ({ children }) => (
  <span
    aria-hidden
    className="pointer-events-none absolute top-0 right-0 font-display text-[18vw] leading-none font-bold text-paper/[0.03] select-none"
  >
    {children}
  </span>
)

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

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {[
          {
            group: "Languages",
            items: ["C++", "C", "JavaScript", "TypeScript", "Python", "SQL", "Dart"],
          },
          {
            group: "Frontend",
            items: ["React", "Vite", "Tailwind CSS", "Redux Toolkit", "Next.js"],
          },
          {
            group: "Backend & DB",
            items: ["Node.js", "Express", "Redis", "PostgreSQL", "MongoDB", "REST APIs", "WebSockets"],
          },
          {
            group: "Cloud & Tools",
            items: ["Docker", "Git", "GitHub Actions", "Linux", "Vercel", "Postman", "AWS"],
          },
        ].map((category, i) => (
          <Reveal key={category.group} delay={i * 0.04}>
            <div className="glass h-full rounded-2xl p-7 transition-colors duration-300 hover:border-accent/30">
              <h3 className="font-display text-sm font-semibold tracking-widest text-accent uppercase">
                {category.group}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line bg-ink px-3 py-1 font-mono text-xs text-paper/70"
                  >
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
