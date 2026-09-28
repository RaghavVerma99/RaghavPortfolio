import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { FileText, Command } from "lucide-react"
import { navLinks, site, socials } from "../data/content"
import Magnetic from "./Magnetic"

const togglePalette = () => {
  window.dispatchEvent(new CustomEvent("command-palette:toggle"))
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("")
  const menuTriggerRef = useRef(null)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > lastY && y > 180 && !open)
      lastY = y
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [open])

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: "-40% 0px -55% 0px" }
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

  const close = useCallback(() => {
    setOpen(false)
    window.requestAnimationFrame(() => menuTriggerRef.current?.focus())
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, close])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -96 : 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: hidden ? 0 : 1.0 }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6"
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 md:rounded-full md:px-5 ${
            scrolled
              ? "glass-lux"
              : "border border-transparent bg-transparent"
          }`}
          aria-label="Primary"
        >
          <a href="#top" className="group flex items-center gap-2.5 font-display text-base font-bold tracking-tight md:text-lg">
            <span className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-lg border border-white/12 bg-white/[0.04] font-mono text-[11px] tracking-tight transition-colors group-hover:border-accent/50">
              {site.initials}
              <span className="absolute bottom-0 left-0 h-1 w-full bg-accent/80" aria-hidden />
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span>
                {site.name}
                <span className="text-accent">.</span>
              </span>
              <span className="font-mono text-[9px] font-normal uppercase tracking-[0.3em] text-faint">
                sde profile
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-6 md:flex lg:gap-8">
            {navLinks.map((l) => {
              const isActive = active === l.href.slice(1)
              return (
                <li key={l.label}>
                  <a
                    href={l.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`group relative flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                      isActive ? "text-accent" : "text-muted hover:text-paper"
                    }`}
                  >
                    <span
                      className={`h-1 w-1 rounded-full transition-all duration-300 ${
                        isActive ? "bg-accent" : "bg-transparent group-hover:bg-paper/50"
                      }`}
                    />
                    {l.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={togglePalette}
              aria-haspopup="dialog"
              aria-label="Open command menu"
              title="Command menu (Ctrl/⌘ + K)"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-paper/70 transition-colors hover:border-accent/40 hover:text-accent"
            >
              <Command size={15} strokeWidth={1.75} />
            </button>
            <a
              href={site.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-paper transition-colors hover:border-accent hover:text-accent"
            >
              <FileText size={13} strokeWidth={1.75} />
              Resume
            </a>
            <Magnetic>
              <a
                href={`mailto:${site.email}?subject=SDE%20%2F%20SWE%20role%20%E2%80%94%20Raghav%20Verma`}
                className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-ink transition-colors hover:bg-accent"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" aria-hidden />
                Hire me
              </a>
            </Magnetic>
          </div>

          <button
            ref={menuTriggerRef}
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="h-px w-6 bg-paper" />
            <span className="h-px w-6 bg-paper" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[90] flex flex-col bg-ink/95 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-display text-lg font-bold">
                {site.name}
                <span className="text-accent">.</span>
              </span>
              <button
                onClick={close}
                className="flex h-10 w-10 items-center justify-center text-2xl text-paper transition-transform active:rotate-90 active:scale-90"
                aria-label="Close menu"
                autoFocus
              >
                ×
              </button>
            </div>

            <ul className="flex flex-1 flex-col justify-center gap-1 px-6">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-line py-1"
                >
                  <a
                    onClick={close}
                    href={l.href}
                    className="group flex items-baseline gap-4 py-2 font-display text-4xl font-bold tracking-tight"
                  >
                    <span className="w-8 font-mono text-xs text-accent">0{i + 1}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-2">
                      {l.label}
                    </span>
                    <span className="ml-auto font-mono text-xs text-faint opacity-0 transition-opacity group-hover:opacity-100">
                      →
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-6 pb-10 font-mono text-xs">
              <a href={`mailto:${site.email}`} className="text-muted" onClick={close}>
                {site.email}
              </a>
              <span aria-hidden className="text-paper/20">·</span>
              <a href={site.resume} target="_blank" rel="noreferrer" className="text-accent" onClick={close}>
                Resume ⇱
              </a>
              <div className="flex w-full flex-wrap gap-x-4 gap-y-1 pt-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted transition-colors hover:text-paper"
                    onClick={close}
                  >
                    {s.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}