import { useState } from "react"
import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { projects } from "../data/content"
import { Section, SectionLabel, Reveal } from "./ui"

const EASE = [0.16, 1, 0.3, 1]

const Watermark = ({ children }) => (
  <span
    aria-hidden
    className="pointer-events-none absolute top-0 right-0 font-display text-[18vw] leading-none font-bold text-paper/[0.03] select-none"
  >
    {children}
  </span>
)

function SpotlightCard({ children, active = false, className = "" }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const background = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(201,255,77,0.06), transparent 60%)`

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    mouseX.set(x)
    mouseY.set(y)
    rotateY.set(((x / rect.width) - 0.5) * 10)
    rotateX.set(-((y / rect.height) - 0.5) * 10)
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
      className={`spotlight-card glass group relative h-full rounded-3xl p-7 transition-colors duration-300 hover:border-accent/40 md:p-9 ${
        active ? "border-accent/50" : ""
      } ${className}`}
    >
      <motion.div
        style={{ background }}
        className="pointer-events-none absolute inset-0 z-0"
      />
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
      <SectionLabel index="04" label="Selected Work" />
      <p className="mt-6 max-w-xl text-muted">
        Click a project to open its full case study — problem, approach, architecture, and the
        trade-offs I made.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06} className="h-full">
            <button
              onClick={() => setActive(i)}
              aria-label={`Open case study for ${p.title}`}
              className="block h-full w-full text-left"
            >
              <SpotlightCard active={active === i}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-paper/40 transition-colors group-hover:text-accent ${
                      active === i ? "text-accent" : ""
                    }`}
                  >
                    ↗
                  </span>
                </div>

                <h3 className="mt-6 font-display text-2xl font-bold">{p.title}</h3>

                <p className="mt-3 text-sm leading-relaxed text-muted">{p.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((tech) => (
                    <span key={tech} className="chip chip-ink">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-baseline gap-2 border-t border-white/10 pt-5">
                  <span className="font-display text-3xl font-bold text-accent">{p.metric}</span>
                  <span className="font-mono text-xs uppercase tracking-widest text-muted">
                    {p.metricLabel}
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
          className="glass mt-6 rounded-3xl p-7 md:p-10"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
                Case study · {active + 1}/{projects.length}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold md:text-3xl">{project.title}</h3>
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:border-accent hover:text-accent"
            >
              View on GitHub <span>↗</span>
            </a>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-muted">
                The problem
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-paper/75">{project.problem}</p>
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-muted">
                The approach
              </h4>
              <ul className="mt-2 space-y-2.5">
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
            <div className="mt-8">
              <h4 className="font-mono text-xs uppercase tracking-widest text-muted">
                Architecture
              </h4>
              <pre className="code-block mt-3">{project.architecture}</pre>
            </div>
          )}

          <div className="mt-8">
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted">
              Trade-offs & results
            </h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.results.map((r) => (
                <span
                  key={r.label}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs"
                >
                  <span className="font-semibold text-accent">{r.value}</span>{" "}
                  <span className="text-muted">{r.label}</span>
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-paper/60">{project.tradeoffs}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  )
}
