import { education } from "../data/content"
import Watermark from "./Watermark"
import { Reveal, Section, SectionLabel } from "./ui"

export default function Education() {
  return (
    <Section id="education" className="border-t border-line">
      <Watermark>Education</Watermark>
      <SectionLabel index="04" label="Education" />
      <Reveal className="mt-12 overflow-hidden rounded-2xl border border-line bg-ink-2 p-8 md:p-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <h3 className="font-display text-2xl font-bold md:text-3xl">{education.degree}</h3>
            <p className="mt-2 font-mono text-sm text-accent">{education.school}</p>
          </div>
          <div className="shrink-0 md:text-right">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              {education.period}
            </p>
            <p className="mt-2 font-display text-3xl font-bold text-accent">
              CGPA {education.cgpa}
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {education.coursework.map((c) => (
            <span
              key={c}
              className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-muted"
            >
              {c}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
