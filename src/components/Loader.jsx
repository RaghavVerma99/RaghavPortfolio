import { useEffect, useState } from "react"
import { animate, motion } from "framer-motion"
import { site } from "../data/content"

export default function Loader({ onDone }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(onDone, 150),
    })
    return () => controls.stop()
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-6 md:p-10"
      exit={{ y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="flex items-center justify-between">
        <span className="font-display text-sm font-bold tracking-wide">
          {site.name}
          <span className="text-accent">.</span>
        </span>
        <span className="font-mono text-xs text-muted">© 2026</span>
      </div>

      <div className="flex items-end justify-between gap-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[220px] font-mono text-xs leading-relaxed text-muted"
        >
          Compiling experience
          <br />
          <span className="text-accent">index.ts_</span>
        </motion.p>
        <span className="font-display text-[28vw] font-bold leading-none md:text-[18vw]">
          {count}
        </span>
      </div>

      <div className="h-px w-full bg-white/10">
        <div className="h-px bg-accent" style={{ width: `${count}%` }} />
      </div>
    </motion.div>
  )
}
