import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { site } from "../data/content"

const BOOT = [
  "rv@systems ~ booting…",
  "loading profile.json     ok",
  "kernel.module = backend   ok",
  "viewport + render → ready",
]

export default function Loader({ onDone }) {
  const [line, setLine] = useState(0)

  useEffect(() => {
    const timers = []
    BOOT.forEach((_, i) => {
      timers.push(setTimeout(() => setLine(i), 140 + i * 185))
    })
    timers.push(setTimeout(onDone, 1010))
    return () => timers.forEach(clearTimeout)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      exit={{ opacity: 0, y: -12, transition: { duration: 0.5, ease: "easeInOut" } }}
    >
      <span className="font-display text-3xl font-bold tracking-tight">
        {site.name}
        <span className="text-accent">.</span>
      </span>
      <div className="mt-8 h-px w-56 overflow-hidden bg-white/10">
        <motion.div
          className="h-full bg-accent"
          initial={{ x: "-120%" }}
          animate={{ x: "220%" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="mt-6 min-h-[1.25rem] space-y-1 font-mono text-[11px] text-faint">
        {BOOT.slice(0, line).map((b) => (
          <motion.p
            key={b}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-accent">$</span> {b}
          </motion.p>
        ))}
        <p className="text-accent">
          <span className="caret-accent">▋</span>
        </p>
      </div>
    </motion.div>
  )
}