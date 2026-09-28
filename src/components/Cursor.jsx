import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function Cursor() {
  const [hover, setHover] = useState(false)
  const [editable, setEditable] = useState(false)
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
      setEditable(Boolean(t.closest("input, textarea, select, [contenteditable]")))
    }

    const focusEditable = (e) => {
      const t = e.target
      if (!(t instanceof Element)) return
      setEditable(Boolean(t.closest("input, textarea, select, [contenteditable]")))
    }

    window.addEventListener("pointermove", move)
    window.addEventListener("pointerover", over)
    window.addEventListener("focusin", focusEditable)
    return () => {
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerover", over)
      window.removeEventListener("focusin", focusEditable)
    }
  }, [x, y, setHover, setEditable])

  return (
    <>
      <motion.div
        className={`cursor-dot ${editable ? "is-hidden" : ""}`}
        style={{ x: sx, y: sy }}
        aria-hidden
      />
      <motion.div
        className={`cursor-ring ${hover ? "is-hover" : ""} ${editable ? "is-hidden" : ""}`}
        style={{ x: rx, y: ry }}
        aria-hidden
      />
    </>
  )
}
