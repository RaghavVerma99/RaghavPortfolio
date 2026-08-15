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
        <div className="mx-auto mt-5 h-px w-28 overflow-hidden bg-white/10">
          <motion.div
            className="h-full bg-accent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  )
}
