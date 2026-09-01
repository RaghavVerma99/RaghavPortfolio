import { ArrowRight, Braces, ExternalLink, GitBranch } from "lucide-react"

const items = [
  { href: "https://github.com/RaghavVerma99", label: "GitHub", icon: GitBranch },
  { href: "https://linkedin.com/in/raghav-verma7", label: "LinkedIn", icon: ExternalLink },
  { href: "https://leetcode.com/u/risshu_raghav", label: "LeetCode", icon: Braces },
  {
    href: "mailto:risshu.verma7@gmail.com?subject=SDE%20%2F%20SWE%20role%20%E2%80%94%20Raghav%20Verma",
    label: "Email",
    icon: ArrowRight,
  },
]

export default function RecruiterDock() {
  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[55] hidden -translate-x-1/2 md:block">
      <div className="pointer-events-auto glass-lux flex items-center gap-1 rounded-full p-1.5">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              title={item.label}
              className="grid h-11 w-11 place-items-center rounded-full text-paper/80 transition-colors hover:bg-white/10 hover:text-accent"
            >
              <Icon size={16} strokeWidth={1.75} />
              <span className="sr-only">{item.label}</span>
            </a>
          )
        })}
      </div>
    </div>
  )
}
