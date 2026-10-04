import { useEffect, useRef } from "react"

/* A soft light that trails the cursor. Painted once into a fixed layer and
   moved with `transform` only, so it costs a compositor update per frame
   rather than a full-viewport repaint.

   Two deliberate omissions:
   - The light lerps toward the target instead of tracking it exactly, so fast
     flicks trail slightly. This reads as weight; a 1:1 follow looks glued.
   - It's hidden on coarse pointers (nothing to follow) and under reduced
     motion. */
export default function Spotlight() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(pointer: coarse)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0
    let tx = window.innerWidth / 2
    let ty = window.innerHeight * 0.3
    let x = tx
    let y = ty

    const tick = () => {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`

      // Keep animating only while the light is still catching up.
      const settled =
        Math.abs(tx - x) < 0.5 && Math.abs(ty - y) < 0.5
      if (settled) {
        frame = 0
        return
      }
      frame = requestAnimationFrame(tick)
    }

    const onMove = (e) => {
      tx = e.clientX
      ty = e.clientY
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const onLeave = () => {
      // Park it back at the top rather than leaving it stuck mid-page.
      tx = window.innerWidth / 2
      ty = -200
      if (!frame) frame = requestAnimationFrame(tick)
    }

    /* A hidden tab still gets rAF time budgeted in some browsers, and a
       looping transform is exactly the kind of work that should stop when
       nobody is looking. */
    const onVisibility = () => {
      if (document.hidden) {
        if (frame) cancelAnimationFrame(frame)
        frame = 0
      }
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerleave", onLeave)
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerleave", onLeave)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return (
    <div className="spotlight-layer" aria-hidden="true">
      <div ref={ref} className="spotlight" />
    </div>
  )
}
