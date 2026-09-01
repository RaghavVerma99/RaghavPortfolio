import { proofLinks, site, socials } from "../data/content"
import Magnetic from "./Magnetic"
import Watermark from "./Watermark"
import { GlowCard, Reveal, Section, SectionLabel, StaggerWords } from "./ui"

export default function Contact() {
  return (
    <Section id="contact" className="border-t border-line">
      <Watermark>Contact</Watermark>
      <SectionLabel index="08" label="Contact" />
      <div className="mt-12 flex flex-col gap-12 md:mt-20 md:flex-row md:items-end md:justify-between">
        <h2 className="font-display font-bold leading-[1.05] tracking-tight">
          <StaggerWords text="Let's build" className="block text-[13vw] md:text-[7.5vw]" />
          <StaggerWords
            text="something great"
            delay={0.08}
            className="italic-display text-gradient block text-[13vw] md:text-[7.5vw]"
          />
        </h2>
        <Reveal delay={0.15} className="flex flex-col items-start gap-4 md:items-end md:pb-4">
          <p className="max-w-sm text-sm text-muted md:text-right">
            For internships and full-time SWE loops — GitHub, LinkedIn, or a 20-minute screen.
          </p>
          <Magnetic>
            <a
              href={`mailto:${site.email}?subject=SDE%20%2F%20SWE%20role%20%E2%80%94%20Raghav%20Verma`}
              className="group inline-flex items-center gap-3 rounded-full bg-paper px-8 py-4 font-semibold text-ink transition-colors hover:bg-accent"
            >
              <span className="font-mono text-xs transition-transform duration-300 group-hover:-rotate-45">
                →
              </span>
              {site.email}
            </a>
          </Magnetic>
          <a
            href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
            className="inline-flex items-center gap-3 font-mono text-sm text-muted transition-colors hover:text-accent"
          >
            {site.phone}
          </a>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {proofLinks.map((p) => (
          <Reveal key={p.label}>
            <a href={p.href} target={p.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              <GlowCard className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-accent">{p.label}</p>
                <p className="mt-3 font-display text-lg font-bold">{p.cta} ↗</p>
                <p className="mt-1 font-mono text-[11px] text-muted">{p.detail}</p>
              </GlowCard>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="group font-mono text-sm text-muted transition-colors hover:text-accent"
          >
            {s.label}{" "}
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
        ))}
      </Reveal>
    </Section>
  )
}
