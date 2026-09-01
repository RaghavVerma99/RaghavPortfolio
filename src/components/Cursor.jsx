import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function Cursor() {
  const [hover, setHover] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 35, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 500, damping: 35, mass: 0.4 })
  const rx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 180, damping: 22, mass: 0.5 })

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e) => {
      const t = e.target
      if (!(t instanceof Element)) return
      setHover(Boolean(t.closest("a, button, [data-cursor]")))
    }

    window.addEventListener("pointermove", move)
    window.addEventListener("pointerover", over)
    return () => {
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerover", over)
    }
  }, [x, y])

  return (
    <>
      <motion.div className="cursor-dot" style={{ x: sx, y: sy }} />
      <motion.div className={`cursor-ring ${hover ? "is-hover" : ""}`} style={{ x: rx, y: ry }} />
    </>
  )
}
