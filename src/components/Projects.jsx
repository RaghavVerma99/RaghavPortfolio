import { useState } from "react"
import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { projects } from "../data/content"
import { Section, SectionHeader, Reveal } from "./ui"

const EASE = [0.16, 1, 0.3, 1]

const Watermark = ({ children }) => (
  <span
    aria-hidden
    className="pointer-events-none absolute right-0 top-6 font-display text-[17vw] font-bold leading-[0.8] tracking-tight text-paper/[0.03] select-none"
  >
    {children}
  </span>
)

function SpotlightCard({ children, active = false, className = "" }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const background = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, rgba(201,255,77,0.07), transparent 60%)`

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    mouseX.set(x)
    mouseY.set(y)
    rotateY.set(((x / rect.width) - 0.5) * 9)
    rotateX.set(-((y / rect.height) - 0.5) * 9)
  }

  const handleLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      data-cursor
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1400 }}
      className={`glass-lux group relative h-full overflow-hidden rounded-3xl p-7 transition-colors duration-300 hover:border-accent/40 md:p-8 ${
        active ? "border-accent/50" : ""
      } ${className}`}
    >
      <motion.div style={{ background }} className="pointer-events-none absolute inset-0 z-0" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

export default function Projects() {
  const [active, setActive] = useState(0)
  const project = projects[active]

  return (
    <Section id="work" className="relative overflow-hidden">
      <Watermark>Work</Watermark>
      <SectionHeader
        index="05"
        kicker="Selected work"
        meta={<>case studies</>}
        title={
          <h2 className="mt-8 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
            Systems that <span className="italic-display text-gradient text-[1.06em]">ship.</span>
          </h2>
        }
        lede="Click a project to open its full case study — problem, approach, architecture, and the trade-offs I made."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06} className="h-full">
            <button
              onClick={() => setActive(i)}
              aria-label={`Open case study for ${p.title}`}
              aria-pressed={active === i}
              className="block h-full w-full text-left"
            >
              <SpotlightCard active={active === i}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className={`text-muted transition-all duration-300 ${
                      active === i
                        ? "text-accent"
                        : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    }`}
                  >
                    ↗
                  </span>
                </div>

                <h3 className="mt-6 font-display text-2xl font-bold leading-snug tracking-tight">
                  {p.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted">{p.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((tech) => (
                    <span key={tech} className="chip chip-ink">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-baseline gap-2.5 border-t border-white/10 pt-5">
                  <span className="font-display text-3xl font-bold tracking-tight text-accent">{p.metric}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
                    {p.metricLabel}
                  </span>
                  <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-faint opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    open case →
                  </span>
                </div>
              </SpotlightCard>
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="glass-lux mt-8 overflow-hidden rounded-3xl"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] bg-white/[0.03] px-6 py-5 md:px-9">
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm text-accent">{String(active + 1).padStart(2, "0")}</span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
                  Case study · {active + 1}/{projects.length}
                </p>
                <h3 className="mt-1 font-display text-xl font-bold tracking-tight md:text-2xl">
                  {project.title}
                </h3>
              </div>
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:border-accent hover:text-accent"
            >
              Source on GitHub <span>↗</span>
            </a>
          </div>

          <div className="space-y-10 p-6 md:p-9">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="eyebrow">
                  <span className="text-accent">◉</span> Problem
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-paper/75">{project.problem}</p>
              </div>
              <div>
                <h4 className="eyebrow">
                  <span className="text-accent">◉</span> Approach
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {project.approach.map((a) => (
                    <li key={a} className="flex items-start gap-3 text-sm leading-relaxed text-paper/75">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {project.architecture && (
              <div>
                <h4 className="eyebrow">
                  <span className="text-accent">◉</span> Architecture
                </h4>
                <pre className="code-block mt-4">{project.architecture}</pre>
              </div>
            )}

            <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <h4 className="eyebrow">
                  <span className="text-accent">◉</span> Results
                </h4>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {project.results.map((r) => (
                    <div key={r.label} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4">
                      <p className="font-display text-xl font-bold tracking-tight text-accent">{r.value}</p>
                      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.15em] text-faint">
                        {r.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="eyebrow">
                  <span className="text-accent">◉</span> Trade-off note
                </h4>
                <p className="mt-4 border-l-2 border-accent/50 pl-4 text-sm leading-relaxed text-paper/70">
                  {project.tradeoffs}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 border-t border-white/[0.07] bg-black/20 px-6 py-4 md:px-9">
            {project.stack.map((tech) => (
              <span key={tech} className="chip">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  )
}