import { useEffect, useState } from "react"
import { AtSign, Braces, FileText, FolderGit, Mail } from "lucide-react"
import { site } from "../data/content"

const items = [
  { href: "https://github.com/RaghavVerma99", label: "GitHub", icon: FolderGit },
  { href: "https://linkedin.com/in/raghav-verma7", label: "LinkedIn", icon: AtSign },
  { href: "https://leetcode.com/u/risshu_raghav", label: "LeetCode", icon: Braces },
  { href: site.resume, label: "Resume", icon: FileText },
  {
    href: `mailto:${site.email}?subject=SDE%20%2F%20SWE%20role%20%E2%80%94%20Raghav%20Verma`,
    label: "Email",
    icon: Mail,
  },
]

export default function RecruiterDock() {
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > lastY && y > 600)
      lastY = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className={`recruiter-dock pointer-events-none fixed bottom-5 left-1/2 z-[55] -translate-x-1/2 transition-all duration-500 ${
        hidden ? "translate-y-20 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="pointer-events-auto glass-lux flex items-center gap-1 rounded-full p-1.5">
        <span className="hidden items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-accent sm:flex">
          <span className="h-1 w-1 rounded-full bg-accent" />
          open
        </span>
        {items.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") || item.href.startsWith("/resume") ? "_blank" : undefined}
              rel="noreferrer"
              title={`${item.label}${item.label === "Resume" ? " — print or save as PDF" : ""}`}
              aria-label={item.label}
              className="group relative grid h-11 w-11 place-items-center rounded-full text-paper/80 transition-colors hover:bg-white/10 hover:text-accent"
            >
              <Icon size={16} strokeWidth={1.75} />
              <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-md border border-white/10 bg-ink/90 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-paper opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100">
                {item.label}
              </span>
            </a>
          )
        })}
      </div>
    </div>
  )
}