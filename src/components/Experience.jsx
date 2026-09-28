import { useRef } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { education, experience } from "../data/content"
import Watermark from "./Watermark"
import { Reveal, Section, SectionHeader } from "./ui"

export default function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.5"],
  })
  const headY = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })

  return (
    <Section id="experience" className="border-t border-line">
      <Watermark>Experience</Watermark>
      <SectionHeader
        index="04"
        kicker="Experience & education"
        meta={<>career.bin</>}
        title={
          <h2 className="mt-8 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
            Where I&apos;ve been.{" "}
            <span className="italic-display text-gradient text-[1.06em]">What I&apos;m building.</span>
          </h2>
        }
      />

      <div ref={ref} className="relative mt-14 space-y-8 border-l border-line pl-8 md:pl-12">
        <motion.div
          aria-hidden
          style={{ scaleY: scrollYProgress }}
          className="absolute -left-px top-0 h-full w-px origin-top bg-gradient-to-b from-accent via-cyan to-blue shadow-[0_0_16px_rgba(201,255,77,0.65)]"
        />
        <motion.div
          aria-hidden
          style={{ top: headY }}
          className="absolute -left-[2.5px] h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_rgba(201,255,77,0.9)] md:-left-[4.5px]"
        />
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 0.05} className="relative">
            <span className="absolute -left-[41px] top-7 h-3 w-3 rounded-full border-2 border-accent bg-ink transition-transform duration-500 hover:scale-125 md:-left-[57px]" />
            <article className="glass-lux lift overflow-hidden rounded-3xl">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-white/[0.07] bg-white/[0.03] px-6 py-4 md:px-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-mono text-xs uppercase tracking-widest text-accent">{job.company}</p>
                <span className="ml-auto font-mono text-xs uppercase tracking-widest text-muted">
                  {job.period}
                </span>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                  <span className="bg-gradient-to-r from-paper to-paper bg-clip-text text-transparent transition-[background-position] duration-700 hover:from-accent hover:to-cyan">
                    {job.role}
                  </span>
                </h3>
                <p className="mt-4 max-w-2xl leading-relaxed text-paper/70">{job.summary}</p>
                <ul className="mt-5 grid gap-2.5 md:grid-cols-3">
                  {job.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3 text-sm text-paper/75"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {job.stack.map((s) => (
                    <span key={s} className="chip chip-ink">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}

        <Reveal className="relative">
          <span className="absolute -left-[41px] top-7 h-3 w-3 rounded-full border-2 border-paper/30 bg-ink md:-left-[57px]" />
          <article className="glass overflow-hidden rounded-3xl">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-white/[0.07] bg-white/[0.03] px-6 py-4 md:px-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
                {String(experience.length + 1).padStart(2, "0")}
              </span>
              <p className="font-mono text-xs uppercase tracking-widest text-paper/60">{education.school}</p>
              <span className="ml-auto font-mono text-xs uppercase tracking-widest text-muted">
                {education.period}
              </span>
            </div>
            <div className="p-6 md:p-8">
              <h3 className="font-display text-2xl font-bold tracking-tight">{education.degree}</h3>
              <p className="mt-4 max-w-2xl text-sm text-paper/60">
                Relevant coursework — foundations that keep the systems side honest.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {education.coursework.map((c) => (
                  <span key={c} className="chip">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </Section>
  )
}