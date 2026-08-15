import { useRef } from "react"
import { motion, useScroll } from "framer-motion"
import { experience } from "../data/content"
import Watermark from "./Watermark"
import { Reveal, Section, SectionLabel } from "./ui"

export default function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.65", "end 0.45"],
  })

  return (
    <Section id="experience" className="border-t border-line">
      <Watermark>Experience</Watermark>
      <SectionLabel index="03" label="Experience" />
      <div ref={ref} className="relative mt-14 space-y-16 border-l border-line pl-8 md:pl-12">
        <motion.div
          aria-hidden
          style={{ scaleY: scrollYProgress }}
          className="absolute -left-px top-0 h-full w-px origin-top bg-accent shadow-[0_0_12px_rgba(201,255,77,0.6)]"
        />
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 0.05} className="relative">
            <span className="absolute -left-[41px] top-1 h-3 w-3 rounded-full border-2 border-accent bg-ink md:-left-[57px]" />
            <span className="absolute -left-[39px] top-[5px] h-[7px] w-[7px] rounded-full bg-accent opacity-50 blur-[2px] md:-left-[55px]" />
            <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
              <div>
                <h3 className="font-display text-2xl font-bold">{job.role}</h3>
                <p className="mt-1 font-mono text-sm text-accent">{job.company}</p>
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                {job.period}
              </span>
            </div>
            <p className="mt-4 max-w-2xl leading-relaxed text-paper/70">{job.summary}</p>
            <ul className="mt-5 space-y-2">
              {job.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-paper/60">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {job.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-muted transition-colors duration-300 hover:border-accent/40 hover:text-accent"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
