import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function getWinner(board) {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line: [a, b, c] }
    }
  }
  return board.every(Boolean) ? { player: "draw", line: [] } : null
}

function minimax(board, isMax) {
  const res = getWinner(board)
  if (res) return res.player === "O" ? 10 : res.player === "X" ? -10 : 0

  let best = isMax ? -Infinity : Infinity
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      const next = [...board]
      next[i] = isMax ? "O" : "X"
      const score = minimax(next, !isMax)
      best = isMax ? Math.max(best, score) : Math.min(best, score)
    }
  }
  return best
}

function bestMove(board) {
  let bestScore = -Infinity
  let candidates = []
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      const next = [...board]
      next[i] = "O"
      const score = minimax(next, false)
      if (score > bestScore) {
        bestScore = score
        candidates = [i]
      } else if (score === bestScore) {
        candidates.push(i)
      }
    }
  }
  return candidates.length ? candidates[Math.floor(Math.random() * candidates.length)] : -1
}

function Mark({ player }) {
  if (player === "X") {
    return (
      <motion.svg
        viewBox="0 0 24 24"
        className="h-9 w-9 md:h-10 md:w-10"
        fill="none"
        strokeLinecap="round"
        strokeWidth="3"
        initial={{ scale: 0.3, rotate: -90, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
      >
        <path d="M6 6l12 12" stroke="#c9ff4d" />
        <path d="M18 6L6 18" stroke="#c9ff4d" />
      </motion.svg>
    )
  }
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className="h-9 w-9 md:h-10 md:w-10"
      fill="none"
      initial={{ scale: 0.3, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
    >
      <circle cx="12" cy="12" r="7" stroke="#7aa7ff" strokeWidth="3" />
    </motion.svg>
  )
}

export default function TicTacToe() {
  const [mode, setMode] = useState("ai")
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState("X")
  const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 })

  const result = getWinner(board)
  const winCells = result && result.player !== "draw" ? result.line : []

  useEffect(() => {
    if (mode !== "ai" || result || turn !== "O") return
    const id = setTimeout(() => {
      const idx = bestMove(board)
      if (idx === -1) return
      const next = [...board]
      next[idx] = "O"
      setBoard(next)
      const res = getWinner(next)
      if (res) setScores((s) => ({ ...s, [res.player]: s[res.player] + 1 }))
      else setTurn("X")
    }, 420)
    return () => clearTimeout(id)
  }, [mode, result, turn, board])

  const play = (idx) => {
    if (board[idx] || result) return
    if (mode === "ai" && turn === "O") return
    const next = [...board]
    next[idx] = turn
    setBoard(next)
    const res = getWinner(next)
    if (res) setScores((s) => ({ ...s, [res.player]: s[res.player] + 1 }))
    else setTurn(turn === "X" ? "O" : "X")
  }

  const switchMode = (m) => {
    setMode(m)
    setBoard(Array(9).fill(null))
    setTurn("X")
  }

  const newRound = () => {
    setBoard(Array(9).fill(null))
    setTurn("X")
  }

  const status = result
    ? result.player === "draw"
      ? "It's a draw"
      : result.player === "X"
        ? mode === "ai"
          ? "You win"
          : "X wins"
        : mode === "ai"
          ? "AI wins"
          : "O wins"
    : mode === "ai"
      ? turn === "O"
        ? "AI is thinking…"
        : "Your move — you play X"
      : `${turn}'s turn`

  return (
    <div className="glass flex h-full flex-col rounded-3xl p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-bold">Tic-Tac-Toe</h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted">
            Minimax AI · unbeatable
          </p>
        </div>
        <div className="flex rounded-full border border-white/10 p-1 font-mono text-[11px]">
          {["ai", "pvp"].map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`rounded-full px-3 py-1 uppercase tracking-wider transition-colors ${
                mode === m ? "bg-accent font-semibold text-ink" : "text-muted hover:text-paper"
              }`}
            >
              {m === "ai" ? "vs AI" : "2P"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <span className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2 font-mono text-xs">
          <span className="text-accent">X</span> {scores.X}
        </span>
        <span className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2 font-mono text-xs">
          <span className="text-muted">D</span> {scores.draw}
        </span>
        <span className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2 font-mono text-xs">
          <span className="text-[#7aa7ff]">O</span> {scores.O}
        </span>
      </div>

      <div className="mx-auto mt-6 grid w-full max-w-[320px] grid-cols-3 gap-2">
        {board.map((cell, i) => {
          const isWin = winCells.includes(i)
          return (
            <button
              key={i}
              onClick={() => play(i)}
              aria-label={`Cell ${i + 1}`}
              className={`grid aspect-square place-items-center rounded-2xl transition-all duration-300 ${
                isWin
                  ? "border border-accent/60 bg-accent/10 shadow-[0_0_20px_rgba(201,255,77,0.2)]"
                  : "glass-soft hover:border-white/25"
              }`}
            >
              {cell && <Mark player={cell} />}
            </button>
          )
        })}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p
          className={`font-mono text-xs uppercase tracking-widest ${
            result ? "text-accent" : "text-muted"
          }`}
        >
          {status}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setScores({ X: 0, O: 0, draw: 0 })}
            className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors hover:border-accent/40 hover:text-paper"
          >
            Reset scores
          </button>
          <button
            onClick={newRound}
            className="rounded-full bg-paper px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-accent"
          >
            New round
          </button>
        </div>
      </div>
    </div>
  )
}
