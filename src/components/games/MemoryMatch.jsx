import { useState } from "react"
import { motion } from "framer-motion"

const SYMBOLS = ["▲", "◆", "●", "■", "✕", "◉", "⬢", "✚"]

const shuffle = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const createDeck = () =>
  shuffle([...SYMBOLS, ...SYMBOLS]).map((symbol, id) => ({
    id,
    symbol,
    flipped: false,
    matched: false,
  }))

export default function MemoryMatch() {
  const [deck, setDeck] = useState(() => createDeck())
  const [first, setFirst] = useState(null)
  const [lock, setLock] = useState(false)
  const [moves, setMoves] = useState(0)

  const won = deck.every((c) => c.matched)

  const flip = (card) => {
    if (lock || card.flipped || card.matched) return

    const next = deck.map((c) => (c.id === card.id ? { ...c, flipped: true } : c))
    setDeck(next)

    if (first === null) {
      setFirst(card.id)
      return
    }

    setLock(true)
    setMoves((m) => m + 1)
    const other = next.find((c) => c.id === first)
    const matched = other.symbol === card.symbol

    setTimeout(() => {
      setDeck((prev) =>
        prev.map((c) =>
          c.id === card.id || c.id === first ? { ...c, matched, flipped: matched } : c
        )
      )
      setFirst(null)
      setLock(false)
    }, matched ? 450 : 750)
  }

  const reset = () => {
    setDeck(createDeck())
    setFirst(null)
    setLock(false)
    setMoves(0)
  }

  return (
    <div className="glass flex h-full flex-col rounded-3xl p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-bold">Memory Match</h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted">
            Find the pairs · 4×4 grid
          </p>
        </div>
        <div className="rounded-full border border-white/10 px-4 py-1.5 font-mono text-xs text-muted">
          Moves <span className="font-semibold text-paper">{moves}</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-2.5">
        {deck.map((c) => (
          <button
            key={c.id}
            onClick={() => flip(c)}
            aria-label={`Card ${c.symbol}`}
            className="flip-scene aspect-square"
          >
            <div className={`flip-inner ${c.flipped ? "is-flipped" : ""}`}>
              <div className="flip-face flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                <span className="font-mono text-lg text-accent/70">?</span>
              </div>
              <div
                className={`flip-face flip-back flex items-center justify-center rounded-xl text-2xl transition-shadow duration-300 ${
                  c.matched
                    ? "border border-accent/50 bg-white/[0.04] text-accent shadow-[0_0_18px_rgba(201,255,77,0.22)]"
                    : "border border-white/15 bg-gradient-to-br from-white/[0.09] to-white/[0.02] text-paper"
                }`}
              >
                {c.symbol}
              </div>
            </div>
          </button>
        ))}
      </div>

      {won ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            Solved in {moves} moves
          </p>
          <button
            onClick={reset}
            className="rounded-full bg-accent px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink transition-transform hover:scale-105"
          >
            Play again
          </button>
        </motion.div>
      ) : (
        <button
          onClick={reset}
          className="mt-6 self-end rounded-full border border-white/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors hover:border-accent/40 hover:text-paper"
        >
          Shuffle
        </button>
      )}
    </div>
  )
}
