import { useEffect, useRef, useState } from "react"
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { MapPin, Command } from "lucide-react"
import { site } from "../data/content"
import Magnetic from "./Magnetic"
import Terminal from "./Terminal"
import { Parallax, StaggerWords, RevealClip } from "./ui"

const EASE = [0.16, 1, 0.3, 1]

const lines = [
  {
    text: "Software Engineer",
    cls: "text-paper/85",
    size: "text-[7vw] font-semibold sm:text-[5.4vw] md:text-[3.2vw]",
  },
  {
    text: "Building Systems",
    cls: "text-stroke",
    size: "text-[11.5vw] leading-[0.95] sm:text-[9.5vw] md:text-[8.6vw] xl:text-[7vw]",
  },
  {
    text: "That Ship & Scale",
    cls: "italic-display text-gradient",
    size: "text-[11.5vw] leading-[0.95] sm:text-[9.5vw] md:text-[8.6vw] xl:text-[7vw]",
  },
]


function useClock() {
  const [time, setTime] = useState(null)
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(new Date())
    setTime(fmt())
    const id = setInterval(() => setTime(fmt()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

function HudValue({ label, children, accent = false }) {
  return (
    <span className="inline-flex items-center gap-1.5 sm:gap-2">
      <span
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
          accent ? "bg-accent shadow-[0_0_8px_rgba(201,255,77,0.7)]" : "bg-cyan/70"
        }`}
      />
      <span className="shrink-0 text-faint">{label}</span>
      <span className="text-paper/90">{children}</span>
    </span>
  )
}

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const clock = useClock()

  const togglePalette = () => window.dispatchEvent(new CustomEvent("command-palette:toggle"))

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const springY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 160]), {
    stiffness: 80,
    damping: 30,
  })
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0.98]), {
    stiffness: 90,
    damping: 30,
  })
  const haloShift = useMotionTemplate`radial-gradient(620px 340px at 16% 10%, rgba(201,255,77,0.12) 0%, rgba(0,229,255,0.08) 48%, transparent 78%)`

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-6 pt-24 sm:px-8 md:px-10 md:pb-8 md:pt-28"
    >
      <div aria-hidden className="bg-grid absolute inset-0" />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[48vw] w-[48vw] rounded-full blur-3xl"
        style={{ background: haloShift }}
        animate={reduceMotion ? undefined : { x: [0, 50, 0], y: [0, 36, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 h-[44vw] w-[44vw] rounded-full bg-blue/[0.06] blur-3xl"
        animate={reduceMotion ? undefined : { x: [0, -44, 0], y: [0, -28, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative">
        {/* Status rail. Deliberately sparse: the shell prompt carries the
            terminal character, the clock carries the "systems" idea. The
            fake telemetry (conns / p95) was noise competing with the
            headline for attention, so it's gone. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6, ease: EASE }}
          className="flex items-center justify-between gap-4 border-b border-line/70 pb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-faint"
        >
          <span className="flex min-w-0 items-center gap-2">
            <span className="refract shrink-0 text-accent">rv@systems</span>
            <span className="hidden shrink-0 text-paper/40 sm:inline" aria-hidden>
              ~
            </span>
            <span className="hidden truncate text-paper/70 lg:inline">
              {site.firstName.toLowerCase()}.sh
            </span>
            <span className="caret-accent hidden shrink-0 text-accent sm:inline" aria-hidden>
              ▋
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-2 sm:gap-3">
            <HudValue label="IST" accent>
              <span className="hidden sm:inline">{clock ?? "--:--:--"}</span>
              <span className="sm:hidden">{clock ? clock.slice(0, 5) : "--:--"}</span>
            </HudValue>
            <span
              aria-hidden
              className="hidden h-3 w-px bg-line sm:block"
            />
            <span className="hidden items-center gap-1.5 md:flex">
              <span className="h-1 w-1 animate-pulse rounded-full bg-accent" />
              <span>healthy</span>
            </span>
          </span>
        </motion.div>

        <div className="relative flex items-start justify-between gap-10 pt-10 sm:pt-12">
          <div className="min-w-0 flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.6, ease: EASE }}
              className="polymorph mb-7 inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2.5 font-mono text-[11px] leading-snug text-muted backdrop-blur-xl sm:text-xs"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="truncate">{site.availability}</span>
            </motion.div>

            <motion.h1
              style={{ y: springY, scale }}
              className="font-display font-bold leading-[1.03] tracking-tight"
            >
              {lines.map((line, i) => (
                <RevealClip key={line.text} delay={1.25 + i * 0.12} className="block">
                  <StaggerWords
                    text={line.text}
                    delay={1.35 + i * 0.14}
                    className={`block ${line.size} ${line.cls} refract`}
                  />
                </RevealClip>
              ))}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.7 }}
              className="mt-6 hidden items-center gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-faint md:flex"
            >
              <span>B.Tech CSE '27</span>
              <span className="h-3 w-px bg-line" aria-hidden />
              <span>backend · distributed systems</span>
              <span className="h-3 w-px bg-line" aria-hidden />
              <span className="text-accent" data-cursor>open to work</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, rotate: 4 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 1.85, duration: 0.8, ease: EASE }}
            className="relative mt-10 hidden shrink-0 xl:block"
          >
            <div aria-hidden className="spin-slow absolute -right-10 -top-10 h-40 w-40">
              <svg viewBox="0 0 160 160" className="h-full w-full text-faint/60">
                <defs>
                  <path id="orbit" d="M80,80 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
                </defs>
                <text className="font-mono" fontSize="10" letterSpacing="3">
                  <textPath href="#orbit">
                    ASPIRE · BUILD · DEPLOY · SCALE · REPEAT ·
                  </textPath>
                </text>
              </svg>
            </div>
            <div className="lift [transform:perspective(900px)_rotateY(-9deg)_rotateX(3deg)] [transform-style:preserve-3d] transition-[transform] duration-500 hover:[transform:perspective(900px)_rotateY(-4deg)_rotateX(1deg)]">
              <Terminal />
            </div>
            <div className="absolute -bottom-4 left-6 rounded-full border border-accent/30 bg-ink/80 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-accent backdrop-blur depth-2">
              <span className="pulse-soft mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
              live · interactive below
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative mt-14 sm:mt-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.75, duration: 0.7, ease: EASE }}
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12"
        >
          <p className="max-w-md text-[15px] leading-relaxed text-muted sm:text-base md:text-lg">
            {site.intro}
          </p>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <Magnetic>
              <a
                href="#work"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-paper px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-accent"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 translate-y-full bg-gradient-to-r from-accent/0 via-white/60 to-accent/0 transition-transform duration-700 group-hover:translate-y-0"
                />
                <span className="relative">View my work</span>
                <span className="relative transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#overview"
                className="lift inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-paper backdrop-blur-xl"
              >
                Recruiter overview
              </a>
            </Magnetic>
            <Magnetic>
              <button
                type="button"
                onClick={togglePalette}
                className="lift inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-mono text-xs text-paper/80"
              >
                <Command size={14} strokeWidth={1.75} aria-hidden />
                <span className="hidden sm:inline">cmd</span> K
              </button>
            </Magnetic>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.05, duration: 0.7 }}
          className="mt-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-line/70 pt-5 font-mono text-[10px] uppercase tracking-widest text-faint sm:mt-10"
        >
          <span className="flex min-w-0 items-center gap-2">
            <MapPin size={11} className="shrink-0 text-accent/70" aria-hidden />
            <span className="truncate">{site.location}</span>
          </span>
          <span className="hidden items-center gap-2 md:flex">
            {site.timezone}
            <span className="text-paper/30" aria-hidden>
              ·
            </span>
            28.47° N / 77.50° E
          </span>
          <span className="flex shrink-0 items-center gap-2">
            Scroll
            <motion.span
              className="inline-block text-accent"
              animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </span>
        </motion.div>
      </div>
    </section>
  )
}