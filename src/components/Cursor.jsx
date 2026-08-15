import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [hidden, setHidden] = useState(true)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.5 })

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return
    setEnabled(true)

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setHidden(false)
    }
    const over = (e) => {
      setHovering(!!e.target.closest("a, button, [data-cursor]"))
    }
    const leave = () => setHidden(true)

    window.addEventListener("mousemove", move)
    window.addEventListener("mouseover", over)
    document.documentElement.addEventListener("mouseleave", leave)
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseover", over)
      document.documentElement.removeEventListener("mouseleave", leave)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[120]"
        style={{ x, y }}
        animate={{ opacity: hidden ? 0 : 1 }}
      >
        <div className="-ml-1 -mt-1 h-2 w-2 rounded-full bg-accent mix-blend-difference" />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[120]"
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: hidden ? 0 : 1, scale: hovering ? 1.6 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="-ml-5 -mt-5 h-10 w-10 rounded-full border border-paper/40 mix-blend-difference" />
      </motion.div>
    </>
  )
}
