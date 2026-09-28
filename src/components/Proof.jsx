import { csTopics, proofLinks, stats } from "../data/content"
import Watermark from "./Watermark"
import { GlowCard, Reveal, Section, SectionHeader, Stagger, StaggerItem } from "./ui"

export default function Proof() {
  return (
    <Section id="proof" className="border-t border-line">
      <Watermark>Proof</Watermark>
      <SectionHeader
        index="06"
        kicker="Signals & links"
        meta={<>verify / signals</>}
        title={
          <h2 className="mt-8 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
            Receipts you can{" "}
            <span className="italic-display text-gradient text-[1.06em]">click.</span>
          </h2>
        }
        lede="Profiles, coursework, and reps a hiring loop actually checks — DSA, systems, and shipped code."
      />

      <Stagger className="grid gap-4 md:grid-cols-2" gap={0.09}>
        {proofLinks.map((p) => (
          <StaggerItem key={p.label} className="h-full">
            <a href={p.href} target={p.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block h-full">
              <GlowCard className="group h-full p-7">
                <div className="flex items-center justify-between gap-4">
                  <p className="eyebrow">
                    <span className="text-accent">●</span> {p.label}
                  </p>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors group-hover:border-accent/40 group-hover:text-accent">
                    {p.cta} ↗
                  </span>
                </div>
                <p className="mt-6 font-display text-2xl font-bold tracking-tight">{p.handle}</p>
                <p className="mt-2 text-sm text-paper/60">{p.detail}</p>
              </GlowCard>
            </a>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-6">
        <GlowCard className="polymorph p-7 md:p-9">
          <p className="eyebrow">
            <span className="text-accent">◉</span> Topics I can interview on
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {csTopics.map((t) => (
              <span key={t} className="chip chip-ink">
                {t}
              </span>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-paper/65">
            {stats[0].value}+ DSA problems on LeetCode, C++ networking patches in public repos, and
            production-style intern work on React + Node + Postgres/Redis.
          </p>
        </GlowCard>
      </Reveal>
    </Section>
  )
}