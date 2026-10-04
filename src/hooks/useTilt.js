import { useEffect, useRef } from "react"

/* Pointer-tracked tilt, shared by every link on the page.

   Writes normalised -0.5..0.5 coordinates into CSS custom properties and lets
   the stylesheet do the transform. One delegated listener covers all links
   regardless of how many exist, and the only per-frame work is two property
   writes — no React state, so no re-render. */
export default function useTilt() {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    if (window.matchMedia("(pointer: coarse)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const onMove = (e) => {
      const el = e.target.closest("[data-tilt]")
      if (!el || !root.contains(el)) return
      const r = el.getBoundingClientRect()
      el.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(4))
      el.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(4))
    }

    const onLeave = (e) => {
      const el = e.target.closest?.("[data-tilt]")
      if (!el) return
      el.style.setProperty("--px", 0)
      el.style.setProperty("--py", 0)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerout", onLeave, { passive: true })

    return () => {
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerout", onLeave)
    }
  }, [])

  return ref
}
