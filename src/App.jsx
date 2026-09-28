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
import CommandPalette from "./components/CommandPalette"
import Aurora from "./components/Aurora"

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
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.6,
      syncTouch: false,
      autoRaf: false,
    })
    window.__lenis = lenis

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Navbar owns the mobile overlay; freeze the scroller while it's open so
    // the page underneath can't drift out from under the menu.
    const lock = () => lenis.stop()
    const unlock = () => lenis.start()
    window.addEventListener("nav:lock", lock)
    window.addEventListener("nav:unlock", unlock)

    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute("href")
      const el = id && id !== "#" && id !== "#top" ? document.querySelector(id) : null
      if (el) {
        e.preventDefault()
        // Match the live nav height rather than assuming a fixed offset.
        const nav = document.querySelector("header nav")
        const offset = nav ? -(nav.getBoundingClientRect().height + 20) : -72
        lenis.scrollTo(el, { offset, duration: 1.35 })
      } else if (id === "#top" || id === "#") {
        e.preventDefault()
        lenis.scrollTo(0, { duration: 1.5 })
      }
    }
    document.addEventListener("click", onClick)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener("click", onClick)
      window.removeEventListener("nav:lock", lock)
      window.removeEventListener("nav:unlock", unlock)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-ink text-paper">
      <a
        href="#overview"
        className="sr-only rounded-full bg-paper px-4 py-2 font-mono text-xs font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130]"
      >
        Skip to content
      </a>
      <Aurora />
      <div className="grain" aria-hidden />
      <Cursor />
      <RecruiterDock />
      <CommandPalette />
      <div className="nav-progress pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]" aria-hidden>
        <motion.div
          className="h-full origin-left bg-gradient-to-r from-accent via-cyan to-blue shadow-[0_0_18px_rgba(201,255,77,0.55)]"
          style={{ scaleX: progress }}
        />
      </div>
      <AnimatePresence>
        {loading && <Loader key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>
      <Navbar />
      {/* Plain <main>: a transform here would promote the entire document to
          its own composited layer, forcing the browser to keep a full-page
          bitmap in memory and resampling text on every scroll frame. */}
      <main id="main" className="relative z-10">
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

