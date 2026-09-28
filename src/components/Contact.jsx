import { proofLinks, site, socials } from "../data/content"
import Magnetic from "./Magnetic"
import Watermark from "./Watermark"
import { GlowCard, Reveal, Section, SectionHeader, StaggerWords } from "./ui"

export default function Contact() {
  return (
    <Section id="contact" className="border-t border-line">
      <Watermark>Contact</Watermark>
      <SectionHeader
        index="08"
        kicker="Contact"
        meta={<>reach/routes</>}
      />
      <div className="mt-14 flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
        <h2 className="font-display font-bold leading-[1.02] tracking-tight">
          <StaggerWords text="Let's build" className="refract block text-[12vw] md:text-[7vw]" />
          <StaggerWords
            text="something great"
            delay={0.08}
            className="italic-display text-gradient refract block text-[12vw] md:text-[7vw]"
          />
        </h2>
        <Reveal delay={0.15} className="flex flex-col items-start gap-4 md:items-end md:pb-3">
          <p className="max-w-sm text-sm text-muted md:text-right">
            For internships and full-time SWE loops — GitHub, LinkedIn, or a 20-minute screen.
          </p>
          <Magnetic>
            <a
              href={`mailto:${site.email}?subject=SDE%20%2F%20SWE%20role%20%E2%80%94%20Raghav%20Verma`}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-paper px-8 py-4 font-semibold text-ink transition-colors hover:bg-accent"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-[900ms] group-hover:translate-x-full"
              />
              <span className="relative font-mono text-xs transition-transform duration-300 group-hover:-rotate-45">
                →
              </span>
              <span className="relative">{site.email}</span>
            </a>
          </Magnetic>
          <a
            href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
            className="inline-flex items-center gap-3 font-mono text-sm text-muted transition-colors hover:text-accent"
          >
            {site.phone}
          </a>
          <a
            href={site.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:border-accent hover:text-accent"
          >
            Download resume <span aria-hidden>⇱</span>
          </a>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {proofLinks.map((p) => (
          <Reveal key={p.label}>
            <a href={p.href} target={p.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block">
              <GlowCard className="group p-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-accent">{p.label}</p>
                <p className="mt-3 font-display text-lg font-bold tracking-tight">
                  {p.cta}{" "}
                  <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </p>
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
      <div
        aria-hidden
        className="contact-shadow pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-60"
      />
    </Section>
  )
}