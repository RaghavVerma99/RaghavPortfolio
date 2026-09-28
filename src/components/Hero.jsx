import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { MapPin, Command } from "lucide-react"
import { site } from "../data/content"
import Magnetic from "./Magnetic"
import Terminal from "./Terminal"
import { StaggerWords, RevealClip } from "./ui"

const EASE = [0.16, 1, 0.3, 1]

const lines = [
  { text: "Software Engineer", cls: "text-paper/85", size: "text-[6vw] font-semibold md:text-[3.2vw]" },
  { text: "Building Systems", cls: "text-stroke", size: "text-[12vw] md:text-[8.6vw] xl:text-[7vw] leading-[0.95]" },
  { text: "That Ship & Scale", cls: "italic-display text-gradient", size: "text-[12vw] md:text-[8.6vw] xl:text-[7vw] leading-[0.95]" },
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

function useDrift(base, { spread = 0.05, interval = 1800, disabled = false } = {}) {
  const [v, setV] = useState(base)
  useEffect(() => {
    if (disabled || !base) return
    const id = setInterval(() => {
      setV((prev) => {
        const delta = (Math.random() - 0.5) * 2 * base * spread
        const next = prev + delta
        const lo = base * (1 - spread * 2)
        const hi = base * (1 + spread * 2)
        return Math.min(hi, Math.max(lo, next))
      })
    }, interval)
    return () => clearInterval(id)
  }, [base, spread, interval, disabled])
  return v
}

function HudValue({ label, children, accent = false }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-1.5 w-1.5 rounded-full ${accent ? "bg-accent shadow-[0_0_8px_rgba(201,255,77,0.7)]" : "bg-cyan/70"}`} />
      <span className="text-faint">{label}</span>
      <span className="text-paper/90">{children}</span>
    </span>
  )
}

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const clock = useClock()
  const conns = useDrift(10840, { disabled: reduceMotion })
  const latency = useDrift(0.42, { spread: 0.3, interval: 1200, disabled: reduceMotion })
  const p95 = useDrift(6.8, { spread: 0.2, interval: 1600, disabled: reduceMotion })

  const togglePalette = () => window.dispatchEvent(new CustomEvent("command-palette:toggle"))

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-6 pt-24 md:px-10 md:pb-8 md:pt-28"
    >
      <div aria-hidden className="bg-grid absolute inset-0" />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[48vw] w-[48vw] rounded-full bg-accent/[0.05] blur-3xl"
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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6, ease: EASE }}
          className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-faint"
        >
          <span className="flex items-center gap-2">
            <span className="text-accent">rv@systems</span>
            <span className="hidden text-paper/50 sm:inline">~</span>
            <span className="hidden text-paper/80 sm:inline">{site.firstName.toLowerCase()}.sh</span>
            <span className="caret-accent text-accent" aria-hidden>
              ▋
            </span>
          </span>
          <span className="hidden items-center gap-3 lg:flex">
            <HudValue label="IST" accent={clock ? true : false}>{clock ?? "--:--:--"}</HudValue>
          </span>
          <span className="flex items-center gap-3">
            <HudValue label="CONN">
              {Math.round(conns).toLocaleString("en-US")}
            </HudValue>
            <HudValue label="p95" accent>
              {p95.toFixed(1)}ms
            </HudValue>
            <span className="hidden items-center gap-1.5 md:flex">
              <span className="h-1 w-1 animate-pulse rounded-full bg-accent" />
              healthy
            </span>
          </span>
        </motion.div>

        <div className="relative flex items-start justify-between gap-10 pt-8">
          <div className="min-w-0 flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.6, ease: EASE }}
              className="mb-8 inline-flex flex-wrap items-center gap-3 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 font-mono text-xs text-muted backdrop-blur-xl"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-accent">●</span> {site.availability}
            </motion.div>

            <h1 className="font-display font-bold leading-[1.03] tracking-tight">
              {lines.map((line, i) => (
                <RevealClip key={line.text} delay={1.25 + i * 0.12} className="block">
                  <StaggerWords
                    text={line.text}
                    delay={1.35 + i * 0.14}
                    className={`block ${line.size} ${line.cls}`}
                  />
                </RevealClip>
              ))}
            </h1>

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
            <div className="[transform:perspective(900px)_rotateY(-9deg)_rotateX(3deg)] transition-transform duration-500 hover:[transform:perspective(900px)_rotateY(-4deg)_rotateX(1deg)]">
              <Terminal />
            </div>
            <div className="absolute -bottom-4 left-6 rounded-full border border-accent/30 bg-ink/80 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-accent backdrop-blur">
              <span className="pulse-soft mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
              live · interactive below
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative mt-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.75, duration: 0.7, ease: EASE }}
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">
            {site.intro}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#work"
                className="group inline-flex items-center gap-2.5 rounded-full bg-paper px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-accent"
              >
                View my work
                <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#overview"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-paper backdrop-blur-xl transition-colors hover:border-accent hover:text-accent"
              >
                Recruiter overview
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={togglePalette}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-mono text-xs text-paper/80 transition-colors hover:border-accent hover:text-accent"
            >
              <Command size={14} strokeWidth={1.75} aria-hidden />
              <span className="hidden sm:inline">cmd</span> K
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.05, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5 font-mono text-[10px] uppercase tracking-widest text-faint"
        >
          <span className="flex items-center gap-2">
            <MapPin size={11} className="text-accent/70" aria-hidden />
            {site.location}
          </span>
          <span className="hidden md:flex items-center gap-2">
            {site.timezone}
            <span className="text-paper/30">·</span>
            28.47° N / 77.50° E
          </span>
          <span className="flex items-center gap-2">
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