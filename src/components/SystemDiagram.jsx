import { useEffect, useState } from "react"
import { Globe, Cpu, Server, Database, Network } from "lucide-react"

const NODES = {
  lb: { label: "Edge Proxy", sub: "C++20 · epoll · consistent hash", color: "#4facfe", icon: Network, latency: 0.4 },
  gateway: { label: "Express API", sub: "Node.js · async I/O", color: "#39ff14", icon: Server, latency: 6 },
  engine: { label: "Core Engine", sub: "C++20 · lock-free · µs", color: "#ff4a77", icon: Cpu, latency: 0.08 },
  cache: { label: "Redis", sub: "in-memory cache", color: "#f59e0b", icon: Database, latency: 0.8 },
  db: { label: "PostgreSQL", sub: "source of truth", color: "#00f2fe", icon: Database, latency: 3 },
}

function LiveLatency({ base }) {
  const [v, setV] = useState(base)
  useEffect(() => {
    const id = setInterval(() => setV(base * (1 + (Math.random() - 0.5) * 0.2)), 1600)
    return () => clearInterval(id)
  }, [base])
  return <span>{Number(v.toFixed(2))} ms</span>
}

function TrafficCounter() {
  const [n, setN] = useState(42000)
  useEffect(() => {
    const id = setInterval(() => setN((v) => v + Math.round(Math.random() * 160) - 50), 700)
    return () => clearInterval(id)
  }, [])
  return <span>{n.toLocaleString("en-US")}</span>
}

function NodeBox({ id, selected, onSelect }) {
  const n = NODES[id]
  const Icon = n.icon
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      aria-pressed={selected}
      style={{
        borderColor: selected ? n.color : "rgba(255,255,255,0.1)",
        background: selected ? `${n.color}14` : "rgba(255,255,255,0.03)",
        boxShadow: selected ? `0 0 0 1px ${n.color}, 0 0 30px ${n.color}33` : undefined,
      }}
      className="relative flex w-full flex-col items-center justify-center gap-1.5 rounded-xl border px-4 py-3 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 md:w-auto"
    >
      {selected && (
        <span
          className="absolute -top-2 rounded-full px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest"
          style={{ background: n.color, color: "#0b0b0b" }}
        >
          inspecting
        </span>
      )}
      <span className="flex items-center gap-2">
        <Icon size={16} style={{ color: n.color }} aria-hidden />
        <span className="font-display text-sm font-bold text-paper">{n.label}</span>
      </span>
      <span className="font-mono text-[10px] text-muted">{n.sub}</span>
      <span className="mt-0.5 flex items-center gap-1.5 font-mono text-[10px] text-muted">
        <span className="relative flex h-1.5 w-1.5">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
            style={{ background: n.color }}
          />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: n.color }} />
        </span>
        <LiveLatency base={n.latency} />
      </span>
    </button>
  )
}

function ClientBox() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 md:w-auto">
      <span className="flex items-center gap-2">
        <Globe size={16} className="text-paper/80" aria-hidden />
        <span className="font-display text-sm font-bold text-paper">Clients</span>
      </span>
      <span className="font-mono text-[10px] text-muted">Web · Mobile · API consumers</span>
    </div>
  )
}

function TierLabel({ children }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">{children}</span>
  )
}

function VFlow({ className = "" }) {
  return (
    <svg
      width="40"
      height="44"
      viewBox="0 0 40 44"
      className={`mx-auto my-0.5 text-muted ${className}`}
      aria-hidden
    >
      <line x1="20" y1="2" x2="20" y2="40" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
      <path
        d="M14 40 L20 43 L26 40"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle r="2.4" fill="#00f2fe" opacity="0.9">
        <animateMotion dur="1.4s" repeatCount="indefinite" path="M20 4 L20 38" />
      </circle>
    </svg>
  )
}

const FAN_PATHS = ["M150 2 L150 22 L100 22 L100 48", "M150 2 L150 22 L200 22 L200 48"]

function FanOut() {
  return (
    <svg
      width="300"
      height="52"
      viewBox="0 0 300 52"
      className="mx-auto hidden text-muted md:block"
      aria-hidden
    >
      <g stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" fill="none">
        {FAN_PATHS.map((p) => (
          <path key={p} d={p} />
        ))}
      </g>
      <g fill="#00f2fe" opacity="0.9">
        {FAN_PATHS.map((p, i) => (
          <circle key={p} r="2.4">
            <animateMotion dur="1.6s" repeatCount="indefinite" begin={`${i * 0.4}s`} path={p} />
          </circle>
        ))}
      </g>
    </svg>
  )
}

const CONVERGE_PATHS = ["M100 2 L100 22 L150 22 L150 48", "M200 2 L200 22 L150 22 L150 48"]

function FanIn() {
  return (
    <svg
      width="300"
      height="52"
      viewBox="0 0 300 52"
      className="mx-auto hidden text-muted md:block"
      aria-hidden
    >
      <g stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" fill="none">
        {CONVERGE_PATHS.map((p) => (
          <path key={p} d={p} />
        ))}
      </g>
      <g fill="#00f2fe" opacity="0.9">
        {CONVERGE_PATHS.map((p, i) => (
          <circle key={p} r="2.4">
            <animateMotion dur="1.6s" repeatCount="indefinite" begin={`${i * 0.4}s`} path={p} />
          </circle>
        ))}
      </g>
    </svg>
  )
}

const LOGS = [
  { tag: "[proxy]", color: "#4facfe", msg: "routed GET /api/v1/orders → node-02 (3ms)" },
  { tag: "[express]", color: "#39ff14", msg: "200 OK /api/v1/users · 12ms · req#48217" },
  { tag: "[core]", color: "#ff4a77", msg: "matched order 88213 in 0.08ms" },
  { tag: "[redis]", color: "#f59e0b", msg: "cache HIT keyspace:user:4821 · 0.6ms" },
  { tag: "[db]", color: "#00f2fe", msg: "SELECT · 2 rows · 2.8ms · slow-log ok" },
]

function LiveLog() {
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setOffset((o) => o + 1), 2400)
    return () => clearInterval(id)
  }, [])
  const lines = Array.from({ length: 3 }, (_, i) => LOGS[(offset + i) % LOGS.length])
  return (
    <div className="mt-4 rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-mono text-[10px] leading-relaxed">
      {lines.map((l, i) => (
        <p key={i} className="truncate whitespace-nowrap text-paper/70">
          <span style={{ color: l.color }}>{l.tag}</span> {l.msg}
        </p>
      ))}
    </div>
  )
}

export default function SystemDiagram({ selectedId, onSelectNode }) {
  return (
    <div className="glass overflow-hidden rounded-3xl p-5 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
          Request flow · C++ + Express
        </span>
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00f2fe]" />
          <TrafficCounter /> req/s
        </span>
      </div>

      <div className="mx-auto mt-6 flex max-w-2xl flex-col items-center">
        {/* Tier 1 — Client */}
        <TierLabel>01 · Client Tier</TierLabel>
        <div className="mt-2 flex w-full max-w-[220px] items-center justify-center">
          <ClientBox />
        </div>

        <VFlow />

        {/* Tier 2 — Edge proxy (C++) */}
        <TierLabel>02 · Edge · C++20</TierLabel>
        <div className="mt-2 flex w-full max-w-[260px] items-center justify-center">
          <NodeBox id="lb" selected={selectedId === "lb"} onSelect={onSelectNode} />
        </div>

        {/* Branch to services */}
        <div className="md:hidden">
          <VFlow />
        </div>
        <FanOut />

        {/* Tier 3 — Express + C++ services */}
        <TierLabel>03 · Service Tier · Express + C++</TierLabel>
        <div className="mt-2 flex w-full max-w-[420px] flex-col items-center gap-0 md:max-w-none md:flex-row md:items-stretch md:gap-4">
          <div className="w-full md:w-auto">
            <NodeBox id="gateway" selected={selectedId === "gateway"} onSelect={onSelectNode} />
          </div>
          <div className="md:hidden">
            <VFlow />
          </div>
          <div className="w-full md:w-auto">
            <NodeBox id="engine" selected={selectedId === "engine"} onSelect={onSelectNode} />
          </div>
        </div>

        <FanIn />
        <div className="md:hidden">
          <VFlow />
        </div>

        {/* Tier 4 — Cache */}
        <TierLabel>04 · Cache Tier · Redis</TierLabel>
        <div className="mt-2 flex w-full max-w-[260px] items-center justify-center">
          <NodeBox id="cache" selected={selectedId === "cache"} onSelect={onSelectNode} />
        </div>

        <VFlow />

        {/* Tier 5 — Storage */}
        <TierLabel>05 · Storage Tier · source of truth</TierLabel>
        <div className="mt-2 flex w-full max-w-[280px] items-center justify-center">
          <NodeBox id="db" selected={selectedId === "db"} onSelect={onSelectNode} />
        </div>
      </div>

      <LiveLog />

      <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        Click any node for the brief →
      </p>
    </div>
  )
}
