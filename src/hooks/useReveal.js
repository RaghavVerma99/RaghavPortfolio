import { useEffect } from "react"

export default function useReveal() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion || !("IntersectionObserver" in window)) return

    const nodes = document.querySelectorAll("[data-reveal]")
    document.documentElement.classList.add("has-reveal")
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add("is-visible")
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" })

    nodes.forEach((node) => observer.observe(node))
    return () => {
      observer.disconnect()
      document.documentElement.classList.remove("has-reveal")
    }
  }, [])
}
