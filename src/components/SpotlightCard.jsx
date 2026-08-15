import { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export default function SpotlightCard({ children, className = "" }) {
  const ref = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 150, damping: 15 })
  const ry = useSpring(useTransform(mx, [0, 1], [-5, 5]), { stiffness: 150, damping: 15 })

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    mx.set(px)
    my.set(py)
    el.style.setProperty("--mx", `${px * 100}%`)
    el.style.setProperty("--my", `${py * 100}%`)
  }

  const onLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className={`spotlight-card ${className}`}
    >
      {children}
    </motion.div>
  )
}
