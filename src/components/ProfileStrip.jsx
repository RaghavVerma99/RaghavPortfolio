import { Braces, ExternalLink, GitBranch } from "lucide-react"
import { profiles } from "../data/content"

const ICONS = {
  github: GitBranch,
  braces: Braces,
  link: ExternalLink,
}

export default function ProfileStrip() {
  return (
    <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
      {profiles.map((p, i) => {
        const Icon = ICONS[p.icon]
        return (
          <a
            key={p.label}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="glass lift flex flex-col rounded-2xl p-5"
            style={{ transitionDelay: `${i * 30}ms` }}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="shrink-0 text-accent">
                {Icon && <Icon size={18} strokeWidth={1.75} />}
              </span>
              <span className="truncate font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-paper">
                {p.label}
              </span>
            </div>
            {/* min-w-0 lets the handle truncate instead of forcing the card
                wider than its grid track on narrow screens. */}
            <p className="mt-4 truncate font-mono text-sm font-semibold text-paper">
              {p.handle}
            </p>
            <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-muted">
              {p.stat}
            </p>
          </a>
        )
      })}
    </div>
  )
}
