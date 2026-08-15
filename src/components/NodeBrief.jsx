import { useEffect, useState } from "react"
import { Network, Server, Cpu, Database } from "lucide-react"

const BRIEFS = {
  lb: {
    title: "Edge Proxy",
    tag: "C++20 · epoll",
    role: "Front door — every request lands here first.",
    about:
      "An asynchronous reverse proxy on edge-triggered epoll. Consistent hashing keeps a key pinned to the same backend, Redis-backed token buckets rate-limit the edge, and a hot-reload swaps binaries without dropping a single connection.",
    stats: [
      { label: "Throughput", value: 42000, suffix: " req/s", decimals: 0 },
      { label: "p99 Latency", value: 0.4, suffix: " ms", decimals: 2 },
    ],
    color: "#4facfe",
    icon: Network,
  },
  gateway: {
    title: "Express API",
    tag: "Node.js · Express",
    role: "REST + WebSocket routing layer.",
    about:
      "Async-first Express services — JWT auth middleware, validated request handling, and WebSocket upgrade routing. One event loop, never blocked on I/O, easy to scale horizontally behind the proxy.",
    stats: [
      { label: "Throughput", value: 18500, suffix: " req/s", decimals: 0 },
      { label: "p99 Latency", value: 6, suffix: " ms", decimals: 1 },
    ],
    color: "#39ff14",
    icon: Server,
  },
  engine: {
    title: "Core Engine",
    tag: "C++20",
    role: "The low-latency compute core.",
    about:
      "Lock-free data structures, cache-aligned types, and CPU pinning for deterministic sub-millisecond work. This is where time-critical computation lives — the hot path the Express layer hands off to.",
    stats: [
      { label: "Throughput", value: 220000, suffix: " ops/s", decimals: 0 },
      { label: "p99 Latency", value: 0.08, suffix: " ms", decimals: 2 },
    ],
    color: "#ff4a77",
    icon: Cpu,
  },
  cache: {
    title: "Redis",
    tag: "in-memory cache",
    role: "Keeps the hot path off the database.",
    about:
      "Shared cache for sessions, rate-limit buckets, and hot reads. Lua scripts keep multi-step updates atomic, and a 94% hit ratio means most traffic never touches disk-backed storage.",
    stats: [
      { label: "Hit ratio", value: 94, suffix: "%", decimals: 1 },
      { label: "p99 Latency", value: 0.8, suffix: " ms", decimals: 2 },
    ],
    color: "#f59e0b",
    icon: Database,
  },
  db: {
    title: "PostgreSQL",
    tag: "relational storage",
    role: "Source of truth for durable writes.",
    about:
      "ACID transactions and strong consistency for everything that must survive a restart. Reads are served through Redis, keeping the primary light and write latency predictable.",
    stats: [
      { label: "Writes / s", value: 2400, suffix: "", decimals: 0 },
      { label: "Replication lag", value: 0, suffix: " ms", decimals: 1 },
    ],
    color: "#00f2fe",
    icon: Database,
  },
}

function LiveStat({ label, value, suffix = "", decimals = 0 }) {
  const [v, setV] = useState(value)
  useEffect(() => {
    setV(value)
    const id = setInterval(() => setV(value * (1 + (Math.random() - 0.5) * 0.06)), 1800)
    return () => clearInterval(id)
  }, [value])
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
        {label}
      </span>
      <span className="mt-1 block font-mono text-sm font-semibold text-paper">
        {v.toLocaleString("en-US", { maximumFractionDigits: decimals })}
        {suffix}
      </span>
    </div>
  )
}

export default function NodeBrief({ selectedId = "lb" }) {
  const node = BRIEFS[selectedId] || BRIEFS.lb
  const Icon = node.icon
  return (
    <div className="glass-card flex min-w-0 flex-col justify-between gap-5 overflow-hidden rounded-3xl p-6 md:p-8">
      <div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="grid h-11 w-11 place-items-center rounded-xl border"
              style={{
                borderColor: `${node.color}33`,
                backgroundColor: `${node.color}11`,
                color: node.color,
              }}
            >
              <Icon size={20} aria-hidden />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-paper">{node.title}</h3>
              <p className="font-mono text-[11px]" style={{ color: node.color }}>
                {node.tag}
              </p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ background: node.color }}
              />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: node.color }} />
            </span>
            live
          </span>
        </div>

        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{node.role}</p>
        <p className="mt-2 text-sm leading-relaxed text-paper/70">{node.about}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {node.stats.map((s) => (
          <LiveStat key={s.label} {...s} />
        ))}
      </div>
    </div>
  )
}
