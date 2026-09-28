import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  AtSign,
  Braces,
  Command,
  ExternalLink,
  FileText,
  FolderGit,
  Mail,
  Search,
  ArrowRight,
} from "lucide-react"
import { navLinks, site } from "../data/content"

const EASE = [0.16, 1, 0.3, 1]

const groups = [
  {
    title: "Navigate",
    items: navLinks.map((l) => ({ ...l, icon: ArrowRight, hint: "Scroll" })),
  },
  {
    title: "Actions",
    items: [
      {
        label: "Email me",
        hint: "SDE / SWE role",
        icon: Mail,
        href: `mailto:${site.email}?subject=SDE%20%2F%20SWE%20role%20%E2%80%94%20Raghav%20Verma`,
      },
      {
        label: "Download resume",
        hint: "Print-ready PDF",
        icon: FileText,
        href: site.resume,
        external: true,
      },
      {
        label: "Call me",
        hint: site.phone,
        icon: AtSign,
        href: `tel:${site.phone.replace(/[^+\d]/g, "")}`,
      },
    ],
  },
  {
    title: "Profiles",
    items: [
      { label: "GitHub", hint: "Projects & open source", icon: FolderGit, href: "https://github.com/RaghavVerma99", external: true },
      { label: "LinkedIn", hint: "experience & connections", icon: ExternalLink, href: "https://linkedin.com/in/raghav-verma7", external: true },
      { label: "LeetCode", hint: "500+ DSA problems", icon: Braces, href: "https://leetcode.com/u/risshu_raghav", external: true },
    ],
  },
]

const flatItems = groups.flatMap((g) =>
  g.items.map((item) => ({ ...item, group: g.title }))
)

function scrollToAnchor(href) {
  const id = href.split("#")[1]
  const el = id ? document.getElementById(id) : null
  const lenis = window.__lenis
  if (lenis) {
    lenis.scrollTo(el || 0, { offset: -72 })
  } else if (el) {
    el.scrollIntoView({ behavior: "smooth" })
  }
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [index, setIndex] = useState(0)
  const inputRef = useRef(null)

  const items = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return flatItems
    return flatItems.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        (i.hint && i.hint.toLowerCase().includes(q)) ||
        i.group.toLowerCase().includes(q)
    )
  }, [query])

  useEffect(() => {
    setIndex(0)
  }, [query, open])

  useEffect(() => {
    if (open) {
      window.requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === "Escape") setOpen(false)
    }
    const onToggle = () => setOpen((v) => !v)

    window.addEventListener("keydown", onKey)
    window.addEventListener("command-palette:toggle", onToggle)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("command-palette:toggle", onToggle)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const activate = (item) => {
    setOpen(false)
    setQuery("")
    if (item.href?.startsWith("#")) {
      scrollToAnchor(item.href)
      return
    }
    if (item.external || item.href?.startsWith("http")) {
      window.open(item.href, "_blank", "noopener,noreferrer")
      return
    }
    window.location.href = item.href
  }

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setIndex((i) => (i + 1) % Math.max(items.length, 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setIndex((i) => (i - 1 + Math.max(items.length, 1)) % Math.max(items.length, 1))
    } else if (e.key === "Enter") {
      e.preventDefault()
      const item = items[index]
      if (item) activate(item)
    }
  }

  const shownGroups = groups
    .map((g) => ({
      ...g,
      items: items.filter((item) => item.group === g.title),
    }))
    .filter((g) => g.items.length > 0)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[110] flex items-start justify-center bg-ink/70 px-4 pt-[8vh] backdrop-blur-sm sm:pt-[12vh]"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false)
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="glass-lux w-full max-w-lg overflow-hidden rounded-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4">
              <Search size={16} className="shrink-0 text-muted" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search… (nav, actions, profiles)"
                className="w-full min-w-0 bg-transparent py-4 font-mono text-sm text-paper outline-none placeholder:text-muted/70"
                aria-label="Search commands"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-results"
              />
              <kbd className="hidden shrink-0 rounded-md border border-white/15 px-1.5 py-0.5 font-mono text-[10px] text-muted sm:block">
                ESC
              </kbd>
            </div>

            <div id="palette-results" className="max-h-[46vh] overflow-y-auto p-2">
              {shownGroups.length === 0 && (
                <p className="px-3 py-8 text-center font-mono text-xs text-muted">
                  No results for “{query}”.
                </p>
              )}
              {shownGroups.map((group) => (
                <div key={group.title} className="mb-1">
                  <p className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                    {group.title}
                  </p>
                  {group.items.map((item) => {
                    const Icon = item.icon
                    const isActive = items.indexOf(item) === index
                    return (
                      <button
                        key={item.label}
                        onClick={() => activate(item)}
                        onMouseEnter={() => setIndex(items.indexOf(item))}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                          isActive ? "bg-accent/10 text-paper" : "text-paper/80"
                        }`}
                      >
                        <span
                          className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg border ${
                            isActive ? "border-accent/40 text-accent" : "border-white/10 text-muted"
                          }`}
                        >
                          <Icon size={13} strokeWidth={1.75} aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-display text-sm font-semibold">
                            {item.label}
                          </span>
                          {item.hint && (
                            <span className="block truncate font-mono text-[10px] text-muted">
                              {item.hint}
                            </span>
                          )}
                        </span>
                        {item.group === "Navigate" && (
                          <span className="font-mono text-[10px] text-muted">↵</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              ))}
              <div className="mt-1 flex items-center justify-between border-t border-white/10 px-3 pb-1 pt-2 font-mono text-[10px] text-muted">
                <span>
                  <kbd className="text-paper/60">↑↓</kbd> navigate &nbsp;{" "}
                  <kbd className="text-paper/60">↵</kbd> select
                </span>
                <span className="hidden items-center gap-1 sm:flex">
                  <Command size={11} aria-hidden /> K to open
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}