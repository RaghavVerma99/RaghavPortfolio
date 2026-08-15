import { Braces, ExternalLink, GitBranch } from "lucide-react"
import { profiles } from "../data/content"

const ICONS = {
  github: GitBranch,
  braces: Braces,
  link: ExternalLink,
}

export default function ProfileStrip() {
  return (
    <div className="mt-10 grid gap-3 sm:grid-cols-3">
      {profiles.map((p, i) => {
        const Icon = ICONS[p.icon]
        return (
          <a
            key={p.label}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="group glass rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40"
            style={{ transitionDelay: `${i * 30}ms` }}
          >
            <div className="flex items-center justify-between">
              <span className="text-accent">{Icon && <Icon size={18} strokeWidth={1.75} />}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-paper">
                {p.label}
              </span>
            </div>
            <p className="mt-4 font-mono text-sm font-semibold text-paper">{p.handle}</p>
            <p className="mt-1 font-mono text-[11px] text-muted">{p.stat}</p>
          </a>
        )
      })}
    </div>
  )
}
