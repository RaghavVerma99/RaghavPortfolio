import { useEffect, useState } from "react"

const lines = [
  "raghav@dev: ~/apollo-gateway",
  "./proxy --release --workers 8",
  "✔ 10K+ conns / thread",
  "✔ p95 < 1ms",
  "✔ ready to scale",
]

export default function Terminal() {
  const [shown, setShown] = useState([])
  const [text, setText] = useState("")
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done) {
      const id = setTimeout(() => {
        setDone(false)
        setShown([])
        setText("")
        setLineIdx(0)
        setCharIdx(0)
      }, 2400)
      return () => clearTimeout(id)
    }

    const delay = charIdx === 0 ? 300 : 42
    const id = setTimeout(() => {
      const line = lines[lineIdx]
      if (charIdx < line.length) {
        setText(line.slice(0, charIdx + 1))
        setCharIdx((c) => c + 1)
      } else if (lineIdx < lines.length - 1) {
        setShown((s) => [...s, line])
        setText("")
        setCharIdx(0)
        setLineIdx((i) => i + 1)
      } else {
        setShown((s) => [...s, line])
        setText("")
        setDone(true)
      }
    }, delay)
    return () => clearTimeout(id)
  }, [charIdx, lineIdx, done])

  return (
    <div className="glass w-full max-w-sm rounded-xl p-4 font-mono text-xs shadow-2xl shadow-black/50">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-3 text-muted">apollo-gateway — zsh</span>
      </div>
      <div className="mt-4 min-h-[120px] space-y-1.5">
        {shown.map((l, i) => (
          <p key={i} className={l.startsWith("✔") ? "text-accent" : "text-paper/70"}>
            {l}
          </p>
        ))}
        {!done && (
          <p className={text.startsWith("./") ? "text-accent" : "text-paper/70"}>
            {text}
            <span className="ml-0.5 inline-block h-3.5 w-2 animate-pulse bg-accent align-middle" />
          </p>
        )}
      </div>
    </div>
  )
}
