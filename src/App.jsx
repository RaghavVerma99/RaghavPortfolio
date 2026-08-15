import { Suspense, lazy, useEffect, useRef, useState } from "react"
import { AnimatePresence } from "framer-motion"
import Lenis from "lenis"
import Loader from "./components/Loader"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Skills from "./components/Skills"
import Experience from "./components/Experience"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import Games from "./components/Games"
import Footer from "./components/Footer"

const Architecture = lazy(() => import("./components/Architecture"))

function LazyArchitecture() {
  const ref = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true)
          obs.disconnect()
        }
      },
      { rootMargin: "400px" }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref}>
      {show ? (
        <Suspense
          fallback={<div className="h-[600px] animate-pulse bg-ink-2" aria-hidden />}
        >
          <Architecture />
        </Suspense>
      ) : (
        <div className="h-[600px] bg-ink-2/40" aria-hidden />
      )}
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2 })
    window.__lenis = lenis
    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute("href")
      const el = id && id !== "#" && id !== "#top" ? document.querySelector(id) : null
      if (el) {
        e.preventDefault()
        lenis.scrollTo(el, { offset: -72 })
      } else if (id === "#top" || id === "#") {
        e.preventDefault()
        lenis.scrollTo(0)
      }
    }
    document.addEventListener("click", onClick)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener("click", onClick)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  return (
    <div className="min-h-screen bg-ink text-paper">
      <AnimatePresence>
        {loading && <Loader key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <LazyArchitecture />
        <Contact />
        <Games />
      </main>
      <Footer />
    </div>
  )
}
