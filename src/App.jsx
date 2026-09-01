import { Suspense, lazy, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion"
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
import Marquee from "./components/Marquee"
import Cursor from "./components/Cursor"
import Overview from "./components/Overview"
import Proof from "./components/Proof"
import RecruiterDock from "./components/RecruiterDock"

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
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })

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
    <div className="relative min-h-screen bg-ink text-paper">
      <div className="aurora" aria-hidden />
      <div className="grain" aria-hidden />
      <Cursor />
      <RecruiterDock />
      <motion.div
        aria-hidden
        className="nav-progress pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-accent"
        style={{ scaleX: progress }}
      />
      <AnimatePresence>
        {loading && <Loader key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <Overview />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Proof />
        <LazyArchitecture />
        <Contact />
        <Games />
      </main>
      <Footer />
    </div>
  )
}
