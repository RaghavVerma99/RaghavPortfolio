import {
  focusAreas,
  lookingFor,
  site,
  snapshotFacts,
  stats,
} from "../data/content"
import Magnetic from "./Magnetic"
import Watermark from "./Watermark"
import { CountUp, GlowCard, Reveal, Section, SectionHeader } from "./ui"

export default function Overview() {
  return (
    <Section id="overview">
      <Watermark>Hire</Watermark>
      <SectionHeader
        index="01"
        kicker="For recruiters"
        meta={<>30&nbsp;sec scan</>}
        title={
          <h2 className="mt-8 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
            Scan in 30 seconds.{" "}
            <span className="italic-display text-gradient text-[1.06em]">Then go deep.</span>
          </h2>
        }
        lede={`${site.notice} Backend-leaning SWE who ships APIs, concurrent systems, and the UI on top.`}
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <GlowCard className="h-full p-7 md:p-9">
            <p className="eyebrow">
              <span className="text-accent">●</span> Open roles
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {lookingFor.map((item) => (
                <span key={item} className="chip chip-ink">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {snapshotFacts.map((f) => (
                <div key={f.k} className="bg-ink-2/80 px-5 py-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint">{f.k}</p>
                  <p className="mt-1.5 font-display text-lg font-semibold">{f.v}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <a
                  href={`mailto:${site.email}?subject=SDE%20%2F%20SWE%20role%20%E2%80%94%20Raghav%20Verma`}
                  className="inline-flex rounded-full bg-paper px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent"
                >
                  Email me
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="https://linkedin.com/in/raghav-verma7"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
                >
                  LinkedIn
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="https://github.com/RaghavVerma99"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
                >
                  GitHub
                </a>
              </Magnetic>
            </div>
          </GlowCard>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-5">
          <GlowCard className="grid h-full grid-cols-2 gap-px overflow-hidden rounded-3xl p-0">
            {stats.map((s) => (
              <div key={s.label} className="group bg-ink-2/80 px-5 py-7 transition-colors duration-300 hover:bg-ink-3">
                <p className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                  <CountUp to={s.value} />
                  <span className="text-accent">{s.suffix}</span>
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                  {s.label}
                </p>
              </div>
            ))}
          </GlowCard>
        </Reveal>

        {focusAreas.map((area, i) => (
          <Reveal key={area.title} delay={0.04 * i} className="lg:col-span-3">
            <GlowCard className="group h-full p-6">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] text-accent">0{i + 1}</p>
                <span aria-hidden className="font-mono text-[10px] text-faint opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  →
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-bold tracking-tight">{area.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper/70">{area.copy}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {area.tags.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}