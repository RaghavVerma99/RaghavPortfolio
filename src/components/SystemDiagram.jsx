import { Globe, Radio, Cpu, Server, Database, Network } from "lucide-react"

const NODES = {
  lb: { label: "Load Balancer", sub: "C++ epoll · consistent hashing", color: "#4facfe", icon: Network },
  srv1: { label: "Auth Service", sub: "Java · Spring WebFlux", color: "#bd00ff", icon: Cpu },
  srv2: { label: "Order Engine", sub: "C++20 · lock-free match", color: "#ff4a77", icon: Server },
  srv3: { label: "Notify Worker", sub: "Java · Netty async", color: "#f59e0b", icon: Radio },
  cache: { label: "Redis Cache", sub: "In-memory · 94% hit rate", color: "#39ff14", icon: Database },
  db_primary: { label: "MySQL Primary", sub: "Writes · Raft", color: "#00f2fe", icon: Database },
  db_replica: { label: "MySQL Replica", sub: "Reads · binlog", color: "#00f2fe", icon: Database },
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

function HFlow() {
  return (
    <svg width="64" height="20" viewBox="0 0 64 20" className="text-muted" aria-hidden>
      <line x1="2" y1="10" x2="52" y2="10" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
      <path
        d="M50 5 L56 10 L50 15"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle r="2.2" fill="#00f2fe" opacity="0.9">
        <animateMotion dur="1.2s" repeatCount="indefinite" path="M4 10 L50 10" />
      </circle>
    </svg>
  )
}

const FAN_PATHS = [
  "M150 2 L150 18 L50 18 L50 48",
  "M150 2 L150 48",
  "M150 2 L150 18 L250 18 L250 48",
]

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
            <animateMotion dur="1.6s" repeatCount="indefinite" begin={`${i * 0.35}s`} path={p} />
          </circle>
        ))}
      </g>
    </svg>
  )
}

const CONVERGE_PATHS = [
  "M50 2 L50 16 L150 16 L150 48",
  "M150 2 L150 48",
  "M250 2 L250 16 L150 16 L150 48",
]

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
            <animateMotion dur="1.6s" repeatCount="indefinite" begin={`${i * 0.35}s`} path={p} />
          </circle>
        ))}
      </g>
    </svg>
  )
}

export default function SystemDiagram({ selectedId, onSelectNode }) {
  return (
    <div className="glass overflow-hidden rounded-3xl p-5 md:p-8">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
          Request flow · one pass
        </span>
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00f2fe]" />
          live topology
        </span>
      </div>

      <div className="mx-auto mt-6 flex max-w-2xl flex-col items-center">
        {/* Tier 1 — Client */}
        <TierLabel>01 · Client Tier</TierLabel>
        <div className="mt-2 flex w-full max-w-[220px] items-center justify-center">
          <ClientBox />
        </div>

        <VFlow />

        {/* Tier 2 — Load Balancer */}
        <TierLabel>02 · Edge / Load Balancing</TierLabel>
        <div className="mt-2 flex w-full max-w-[260px] items-center justify-center">
          <NodeBox id="lb" selected={selectedId === "lb"} onSelect={onSelectNode} />
        </div>

        {/* Branch to services */}
        <div className="md:hidden">
          <VFlow />
        </div>
        <FanOut />

        {/* Tier 3 — Services */}
        <TierLabel>03 · Service Tier · stateless & scaled</TierLabel>
        <div className="mt-2 flex w-full max-w-[340px] flex-col items-center gap-0 md:max-w-none md:flex-row md:items-stretch md:gap-4">
          <div className="w-full md:w-auto">
            <NodeBox id="srv1" selected={selectedId === "srv1"} onSelect={onSelectNode} />
          </div>
          <div className="md:hidden">
            <VFlow />
          </div>
          <div className="w-full md:w-auto">
            <NodeBox id="srv2" selected={selectedId === "srv2"} onSelect={onSelectNode} />
          </div>
          <div className="md:hidden">
            <VFlow />
          </div>
          <div className="w-full md:w-auto">
            <NodeBox id="srv3" selected={selectedId === "srv3"} onSelect={onSelectNode} />
          </div>
        </div>

        <FanIn />
        <div className="md:hidden">
          <VFlow />
        </div>

        {/* Tier 4 — Cache */}
        <TierLabel>04 · Cache Tier · read hot-path</TierLabel>
        <div className="mt-2 flex w-full max-w-[260px] items-center justify-center">
          <NodeBox id="cache" selected={selectedId === "cache"} onSelect={onSelectNode} />
        </div>

        <VFlow />

        {/* Tier 5 — Storage */}
        <TierLabel>05 · Storage Tier · source of truth</TierLabel>
        <div className="mt-2 flex w-full max-w-[420px] items-center justify-center gap-3">
          <div className="w-1/2 max-w-[180px]">
            <NodeBox id="db_primary" selected={selectedId === "db_primary"} onSelect={onSelectNode} />
          </div>
          <HFlow />
          <div className="w-1/2 max-w-[180px]">
            <NodeBox id="db_replica" selected={selectedId === "db_replica"} onSelect={onSelectNode} />
          </div>
        </div>
      </div>

      <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        Click any node to inspect it below →
      </p>
    </div>
  )
}
