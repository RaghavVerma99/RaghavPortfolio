import { motion } from "framer-motion"
import { site } from "../data/content"
import Magnetic from "./Magnetic"
import Terminal from "./Terminal"
import { StaggerWords } from "./ui"

const EASE = [0.16, 1, 0.3, 1]

const lines = [
  { text: "Software Engineer", cls: "text-paper" },
  { text: "Building Systems", cls: "text-stroke" },
  { text: "That Ship & Scale", cls: "text-gradient italic" },
]

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 pb-8 pt-28 md:px-12 md:pt-32"
    >
      <div aria-hidden className="bg-grid absolute inset-0" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 h-[46vw] w-[46vw] rounded-full bg-accent/[0.06] blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-[40vw] w-[40vw] rounded-full bg-[#4d9bff]/[0.07] blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.6, ease: EASE }}
          className="mb-10 inline-flex items-center gap-3 rounded-full border border-white/10 px-4 py-2 font-mono text-xs text-muted"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {site.availability}
        </motion.div>

        <h1 className="font-display font-bold leading-[1.05] tracking-tight">
          {lines.map((line, i) => (
            <span key={line.text} className="block">
              <StaggerWords
                text={line.text}
                delay={1.35 + i * 0.14}
                className={`block text-[11vw] md:text-[8.5vw] ${line.cls}`}
              />
            </span>
          ))}
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8, ease: EASE }}
        className="pointer-events-none absolute bottom-44 right-8 hidden lg:block"
      >
        <div className="pointer-events-auto [transform:perspective(900px)_rotateY(-8deg)]">
          <Terminal />
        </div>
      </motion.div>

      <div className="relative mt-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.85, duration: 0.7, ease: EASE }}
          className="max-w-md text-base leading-relaxed text-muted md:text-lg"
        >
          {site.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.7, ease: EASE }}
          className="flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-accent"
            >
              View my work
              <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-paper transition-colors hover:border-accent hover:text-accent"
            >
              Get in touch
            </a>
          </Magnetic>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.15, duration: 0.7 }}
        className="relative mt-14 flex items-center justify-between border-t border-line pt-6 font-mono text-[11px] uppercase tracking-widest text-muted"
      >
        <span>{site.location}</span>
        <span className="hidden md:block">B.Tech CSE '27 · SDE / SWE</span>
        <span className="flex items-center gap-2">
          Scroll{" "}
          <motion.span
            className="inline-block text-accent"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </span>
      </motion.div>
    </section>
  )
}
