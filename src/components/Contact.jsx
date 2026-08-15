import { site, socials } from "../data/content"
import Magnetic from "./Magnetic"
import Watermark from "./Watermark"
import { Reveal, Section, SectionLabel, StaggerWords } from "./ui"

export default function Contact() {
  return (
    <Section id="contact" className="border-t border-line">
      <Watermark>Contact</Watermark>
      <SectionLabel index="07" label="Contact" />
      <div className="mt-12 flex flex-col gap-12 md:mt-20 md:flex-row md:items-end md:justify-between">
        <h2 className="font-display font-bold leading-[0.95] tracking-tight">
          <StaggerWords text="Let's build" className="block text-[13vw] md:text-[7.5vw]" />
          <StaggerWords
            text="something great"
            delay={0.08}
            className="block text-[13vw] italic text-gradient md:text-[7.5vw]"
          />
        </h2>
        <Reveal delay={0.15} className="flex flex-col items-start gap-4 md:items-end md:pb-4">
          <Magnetic>
            <a
              href={`mailto:${site.email}`}
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

      <Reveal delay={0.2} className="mt-16 flex flex-wrap gap-x-8 gap-y-3">
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
