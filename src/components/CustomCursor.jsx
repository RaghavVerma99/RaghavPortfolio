import { useEffect, useRef } from "react"

export default function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const finePointer = window.matchMedia("(pointer: fine)")
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!cursor || !finePointer.matches || reducedMotion.matches) return

    let frame = 0
    let x = -100
    let y = -100
    let tx = x
    let ty = y
    const move = (event) => {
      tx = event.clientX
      ty = event.clientY
      if (!frame) frame = requestAnimationFrame(tick)
    }
    const tick = () => {
      x += (tx - x) * 0.24
      y += (ty - y) * 0.24
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`
      if (Math.abs(tx - x) + Math.abs(ty - y) > 0.2) frame = requestAnimationFrame(tick)
      else frame = 0
    }
    const hover = (event) => {
      if (event.target.closest("a, button")) cursor.dataset.hover = "true"
      else delete cursor.dataset.hover
    }

    document.documentElement.classList.add("has-custom-cursor")
    window.addEventListener("pointermove", move, { passive: true })
    window.addEventListener("pointerover", hover, { passive: true })
    return () => {
      document.documentElement.classList.remove("has-custom-cursor")
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerover", hover)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return <div className="custom-cursor" ref={cursorRef} aria-hidden="true"><span /></div>
}
