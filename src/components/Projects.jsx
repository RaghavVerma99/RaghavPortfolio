<<<<<<< HEAD
import React, { useState } from 'react';
import { GitBranch, Cpu, HardDrive, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

const projectsList = [
  {
    id: 'broker',
    title: 'HydraBroker: Distributed Broker',
    tagline: 'Simplified Apache Kafka clone over custom TCP binary protocol',
    lang: 'Java / Netty NIO',
    icon: HardDrive,
    iconColor: '#a855f7',
    bullets: [
      'Implemented custom binary serialization format over TCP sockets, reducing serialization overhead by 42%.',
      'Designed an Append-Only Log commit storage mechanism for partition files, writing incoming events sequentially to disk.',
      'Achieved zero-copy streaming from storage straight to network sockets using Java FileChannel transferTo, reducing context switches by 35%.',
      'Engineered coordinate tracking for consumer groups with partition offset state saved in clustered zookeeper nodes.'
    ],
    metrics: [
      { label: 'Throughput', val: '85,000 msg/sec' },
      { label: 'Zero-Copy Speedup', val: '1.5x throughput' },
      { label: 'Disk Write Latency', val: '0.45 ms' }
    ],
    architecture: `[Producers] ──Custom TCP Protocol──► [HydraBroker Node]
                                         │
                        ┌────────────────┴────────────────┐
                        ▼ (In-Memory Buffer)              ▼ (Storage Path)
                [Ring Buffer Pool]               [Append-Only Commit Log]
                        │                                 │
                        │                                 ▼ (Zero-Copy sendfile)
                        └────────────────┬────────────────┘
                                         ▼
                            [Consumers (Consumer Groups)]`
  },
  {
    id: 'gateway',
    title: 'ApolloGateway: High-Perf Proxy',
    tagline: 'Dynamic HTTP reverse-proxy & load balancer built in C++',
    lang: 'C++20 / epoll / Redis',
    icon: Cpu,
    iconColor: '#00f2fe',
    bullets: [
      'Built a low-latency socket engine in C++20 using epoll (Linux) and kqueue (macOS) to handle 20,000+ active connections per thread.',
      'Implemented consistent hashing (MurmurHash3) to route queries dynamically to service pools with optimal cache hit ratios.',
      'Integrated distributed Token Bucket rate-limiting using Redis cluster connection pools.',
      'Designed a thread-safe Circuit Breaker state machine (Closed, Open, Half-Open) to isolate failing backend APIs.'
    ],
    metrics: [
      { label: 'Active Connections', val: '50,000+' },
      { label: 'p99 Gateway Latency', val: '0.12 ms' },
      { label: 'Rate-limiting latency', val: '< 0.4 ms' }
    ],
    architecture: `[Incoming Client TLS] ──► [epoll Socket Ring] ──► [Consistent Hash Selector]
                                                             │
                              ┌──────────────────────────────┼──────────────────────────────┐
                              ▼                              ▼                              ▼
                       [Service Instance 1]           [Service Instance 2]           [Circuit Breaker (Open)]`
  },
  {
    id: 'scheduler',
    title: 'TelemetryPipe & Task Queue',
    tagline: 'Real-time pipeline & task execution engine',
    lang: 'JavaScript / Node.js / Shell scripting',
    icon: ShieldCheck,
    iconColor: '#f59e0b',
    bullets: [
      'Developed a distributed worker queue using RabbitMQ broker for high-reliability backpressure handling.',
      'Wrote autonomous Shell orchestration scripts (Bash) for cluster healthchecks, log-rotation, and automated container scaling.',
      'Constructed distributed locking primitives via Redis Redlock to enforce strict single-execution policies.',
      'Incorporated Dead-Letter Queue (DLQ) pathways and Exponential Backoff Retries to handle transient service crashes.'
    ],
    metrics: [
      { label: 'Ingestion scale', val: '1.2M jobs/day' },
      { label: 'Lock Overhead', val: '< 2.5 ms' },
      { label: 'Recovery Reliability', val: '99.99%' }
    ],
    architecture: `[HTTP Job Submit] ──► [Fastify BFF] ──► [RabbitMQ Queue] ──► [Locking Check (Redis)]
                                                                                │
                                                                                ▼
                                                                     [Worker Pool (Node.js)]
                                                                                │
                                                                                ▼ (Logs & Backup)
                                                                     [Bash Backup Scripts]`
  }
];

export default function Projects() {
  const [expandedId, setExpandedId] = useState('broker');

  return (
    <div className="flex flex-col gap-6">
      <div className="projects-layout">
        {/* Project Selector List (LHS) */}
        <div className="project-selector">
          {projectsList.map((project) => {
            const Icon = project.icon;
            const isExpanded = expandedId === project.id;
            return (
              <div
                key={project.id}
                onClick={() => setExpandedId(project.id)}
                className={`glass-card project-selector-item ${isExpanded ? 'active' : ''}`}
              >
                <div className="project-selector-header">
                  <div className="project-selector-title-block">
                    <div 
                      className="project-selector-icon-box"
                      style={{
                        borderColor: `${project.iconColor}33`,
                        backgroundColor: `${project.iconColor}11`,
                        color: project.iconColor
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <div>
                      <h4 className="project-selector-name">{project.title}</h4>
                      <span className="project-selector-lang">{project.lang}</span>
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp size={14} style={{ color: 'var(--accent-cyan)' }} /> : <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />}
                </div>
                <p className="project-selector-desc">{project.tagline}</p>
              </div>
            );
          })}
        </div>

        {/* Project Details Panel (RHS) */}
        <div className="project-details-panel">
          {projectsList.map((project) => {
            if (expandedId !== project.id) return null;
            return (
              <div key={project.id} className="glass-card flex flex-col justify-between" style={{ padding: '24px', height: '100%' }}>
                <div>
                  <div className="project-detail-header">
                    <div>
                      <h3 className="project-detail-title">{project.title}</h3>
                      <p className="project-detail-tagline">{project.tagline}</p>
                    </div>
                  </div>
                  
                  {/* Bullets */}
                  <ul className="project-detail-bullets">
                    {project.bullets.map((bullet, idx) => (
                      <li key={idx} className="project-detail-bullet-item">
                        <span className="project-bullet-bullet">✦</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Architecture Diagram */}
                  <div>
                    <h5 className="project-arch-title">Data Flow & Topology</h5>
                    <pre className="project-arch-box">
                      <code>{project.architecture}</code>
                    </pre>
                  </div>
                </div>

                {/* Metrics */}
                <div className="project-metrics-grid">
                  {project.metrics.map((metric, idx) => (
                    <div key={idx} className="project-metric-card">
                      <span className="project-metric-label">{metric.label}</span>
                      <span className="project-metric-val">{metric.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
=======
import { projects } from "../data/content"
import SpotlightCard from "./SpotlightCard"
import Watermark from "./Watermark"
import { Reveal, Section, SectionLabel } from "./ui"

export default function Projects() {
  return (
    <Section id="work" className="border-t border-line">
      <Watermark>Work</Watermark>
      <SectionLabel index="05" label="Selected Work" />
      <div className="mt-14 space-y-4">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05} className="[perspective:1400px]">
            <SpotlightCard className="overflow-hidden rounded-2xl">
              <a
                href={p.link}
                className="group relative block border border-line bg-ink-2 p-8 transition-colors duration-300 hover:border-accent/40 md:p-12"
              >
                <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-start">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-muted">({p.index})</span>
                      <span className="h-px flex-1 bg-line" />
                      <span className="flex items-center gap-1 font-mono text-xs text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                        open
                        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                          ↗
                        </span>
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-3xl font-bold leading-tight transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
                      {p.title}
                    </h3>
                    <p className="mt-4 max-w-xl leading-relaxed text-paper/60">{p.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-muted transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="shrink-0 md:w-44 md:text-right">
                    <span className="font-display text-5xl font-bold text-accent">{p.metric}</span>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted">
                      {p.metricLabel}
                    </p>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-14 -right-8 font-display text-[12rem] font-bold leading-none text-paper/[0.03] transition-colors duration-300 group-hover:text-accent/10 md:-right-14"
                >
                  {p.index}
                </span>
              </a>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
>>>>>>> 12d808e (Updated Files)
}
