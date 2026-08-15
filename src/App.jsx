import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import Lenis from "lenis"
import Cursor from "./components/Cursor"
import ScrollProgress from "./components/ScrollProgress"
import BackToTop from "./components/BackToTop"
import Loader from "./components/Loader"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Marquee from "./components/Marquee"
import About from "./components/About"
import Skills from "./components/Skills"
import Experience from "./components/Experience"
import Education from "./components/Education"
import Projects from "./components/Projects"
import Stats from "./components/Stats"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

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
    <div className="grain min-h-screen bg-ink text-paper">
      <Cursor />
      <ScrollProgress />
      <AnimatePresence>
        {loading && <Loader key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Stats />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
