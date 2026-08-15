import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { navLinks, site } from "../data/content"
import Magnetic from "./Magnetic"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "glass" : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
          <a href="#top" className="font-display text-lg font-bold tracking-tight">
            {site.name}
            <span className="text-accent">.</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className={`group relative font-mono text-xs uppercase tracking-widest transition-colors ${
                    active === l.href.slice(1) ? "text-accent" : "text-muted hover:text-paper"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                      active === l.href.slice(1) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Magnetic>
              <a
                href={`mailto:${site.email}`}
                className="rounded-full border border-white/15 px-5 py-2 font-mono text-xs uppercase tracking-widest transition-colors hover:border-accent hover:text-accent"
              >
                Let's talk
              </a>
            </Magnetic>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Open menu"
          >
            <span className="h-px w-6 bg-paper" />
            <span className="h-px w-6 bg-paper" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[90] flex flex-col bg-ink"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-display text-lg font-bold">
                {site.name}
                <span className="text-accent">.</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center text-2xl text-paper"
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <ul className="flex flex-1 flex-col justify-center gap-2 px-6">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    onClick={() => setOpen(false)}
                    href={l.href}
                    className="group flex items-baseline gap-4 font-display text-5xl font-bold"
                  >
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="px-6 pb-8 font-mono text-xs text-muted">{site.email}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
