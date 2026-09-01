import { csTopics, proofLinks, stats } from "../data/content"
import Watermark from "./Watermark"
import { GlowCard, Reveal, Section, SectionLabel } from "./ui"

export default function Proof() {
  return (
    <Section id="proof" className="border-t border-line">
      <Watermark>Proof</Watermark>
      <SectionLabel index="06" label="Signals & links" />
      <h2 className="mt-10 max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">
        Receipts you can <span className="italic-display text-gradient text-[1.05em]">click.</span>
      </h2>
      <p className="mt-4 max-w-xl text-base text-muted">
        Profiles, coursework, and reps a hiring loop actually checks — DSA, systems, and shipped
        code.
      </p>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {proofLinks.map((p, i) => (
          <Reveal key={p.label} delay={i * 0.05}>
            <a href={p.href} target={p.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              <GlowCard className="h-full p-7">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                    {p.label}
                  </p>
                  <span className="font-mono text-xs text-muted">{p.cta} ↗</span>
                </div>
                <p className="mt-6 font-display text-2xl font-bold">{p.handle}</p>
                <p className="mt-2 text-sm text-paper/60">{p.detail}</p>
              </GlowCard>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-6">
        <GlowCard className="p-7 md:p-9">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
            Topics I can interview on
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {csTopics.map((t) => (
              <span key={t} className="chip chip-ink">
                {t}
              </span>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-paper/55">
            {stats[0].value}+ DSA problems on LeetCode, C++ networking patches in public repos, and
            production-style intern work on React + Node + Postgres/Redis.
          </p>
        </GlowCard>
      </Reveal>
    </Section>
  )
}
