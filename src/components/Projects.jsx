import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { projects } from "../data/content"
import { Section, SectionLabel, Reveal } from "./ui"

const Watermark = ({ children }) => (
  <span
    aria-hidden
    className="pointer-events-none absolute top-0 right-0 font-display text-[18vw] leading-none font-bold text-paper/[0.03] select-none"
  >
    {children}
  </span>
)

function SpotlightCard({ children, className = "" }) {
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
      className={`spotlight-card group relative h-full rounded-3xl border border-line bg-ink-2 p-7 transition-colors duration-300 hover:border-accent/30 md:p-9 ${className}`}
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
  return (
    <Section id="projects" className="relative overflow-hidden">
      <Watermark>Work</Watermark>
      <SectionLabel index="05" title="Selected Work" />

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.06}>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              <SpotlightCard>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-paper/40 transition-colors group-hover:text-accent">
                    ↗
                  </span>
                </div>

                <h3 className="mt-6 font-display text-2xl font-bold">{project.title}</h3>

                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-line bg-ink px-3 py-1 font-mono text-xs text-paper/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
