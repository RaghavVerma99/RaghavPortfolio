import {
  focusAreas,
  lookingFor,
  site,
  snapshotFacts,
  stats,
} from "../data/content"
import Magnetic from "./Magnetic"
import Watermark from "./Watermark"
import { CountUp, GlowCard, Reveal, Section, SectionLabel } from "./ui"

export default function Overview() {
  return (
    <Section id="overview">
      <Watermark>Hire</Watermark>
      <SectionLabel index="01" label="For recruiters" />
      <h2 className="mt-10 max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">
        Scan in 30 seconds.{" "}
        <span className="italic-display text-gradient text-[1.05em]">Then go deep.</span>
      </h2>
      <p className="mt-4 max-w-xl text-base text-muted">
        {site.notice}. Backend-leaning SWE who ships APIs, concurrent systems, and the UI on top.
      </p>

      <div className="mt-12 grid gap-4 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <GlowCard className="h-full p-7 md:p-9">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
              Open roles
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {lookingFor.map((item) => (
                <span key={item} className="chip chip-ink">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {snapshotFacts.map((f) => (
                <div key={f.k}>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted">{f.k}</p>
                  <p className="mt-1 font-display text-lg font-semibold">{f.v}</p>
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
              <a
                href="https://linkedin.com/in/raghav-verma7"
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/RaghavVerma99"
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
              >
                GitHub
              </a>
            </div>
          </GlowCard>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-5">
          <GlowCard className="grid h-full grid-cols-2 gap-px overflow-hidden p-0">
            {stats.map((s) => (
              <div key={s.label} className="bg-black/20 px-5 py-7">
                <p className="font-display text-3xl font-bold md:text-4xl">
                  <CountUp to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  {s.label}
                </p>
              </div>
            ))}
          </GlowCard>
        </Reveal>

        {focusAreas.map((area, i) => (
          <Reveal key={area.title} delay={0.04 * i} className="lg:col-span-3">
            <GlowCard className="h-full p-6">
              <p className="font-mono text-[10px] text-accent">0{i + 1}</p>
              <h3 className="mt-3 font-display text-xl font-bold">{area.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper/65">{area.copy}</p>
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
