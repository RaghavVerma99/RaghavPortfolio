import { useEffect } from "react"
import { motion } from "framer-motion"
import { site } from "../data/content"

export default function Loader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 900)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-ink"
      exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
    >
      <div className="text-center">
        <span className="font-display text-2xl font-bold tracking-tight">
          {site.name}
          <span className="text-accent">.</span>
        </span>
        <div className="mx-auto mt-6 h-px w-36 overflow-hidden bg-white/10">
          <motion.div
            className="h-full w-1/2 bg-accent"
            initial={{ x: "-120%" }}
            animate={{ x: "220%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
          Loading systems
        </p>
      </div>
    </motion.div>
  )
}
