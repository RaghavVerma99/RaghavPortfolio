import { useEffect, useState } from "react"
import { site } from "../data/content"

const LINES = [
  { delay: 200, kind: "cmd", text: "whoami" },
  { delay: 700, kind: "out-accent", text: `${site.name} · ${site.role}` },
  { delay: 1100, kind: "cmd", text: "uptime --focus" },
  { delay: 1550, kind: "out", text: "C++20 · Node · distributed systems" },
  { delay: 1950, kind: "cmd", text: "status" },
  { delay: 2350, kind: "status", text: site.availability },
]

export default function Terminal() {
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    const timers = LINES.map((line, i) =>
      setTimeout(() => setVisible(i + 1), line.delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="terminal-card glass w-[360px] rounded-2xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
      <div className="terminal-header">
        <div className="terminal-window-buttons">
          <span className="terminal-window-button red" />
          <span className="terminal-window-button yellow" />
          <span className="terminal-window-button green" />
        </div>
        <span className="font-mono text-[10px] tracking-widest text-muted">rv@systems — zsh</span>
      </div>
      <div className="space-y-1.5 break-words px-4 py-4 font-mono text-[11px] leading-relaxed text-paper/80">
        {LINES.slice(0, visible).map((line, i) => (
          <p key={i}>
            {line.kind === "cmd" && (
              <>
                <span className="text-muted">$ </span>
                {line.text}
              </>
            )}
            {line.kind === "out" && line.text}
            {line.kind === "out-accent" && <span className="text-accent">{line.text}</span>}
            {line.kind === "status" && (
              <>
                <span className="text-accent">● </span>
                {line.text}
              </>
            )}
          </p>
        ))}
        <p className="animate-pulse text-accent">▍</p>
      </div>
    </div>
  )
}
