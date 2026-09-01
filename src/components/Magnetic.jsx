import { useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function Magnetic({ children, strength = 0.28 }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 280, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 280, damping: 18, mass: 0.4 })

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-block will-change-transform"
    >
      {children}
    </motion.div>
  )
}
