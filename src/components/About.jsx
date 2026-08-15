import { site } from "../data/content"
import Watermark from "./Watermark"
import { Reveal, RevealWords, Section, SectionLabel } from "./ui"

export default function About() {
  return (
    <Section id="about">
      <Watermark>About</Watermark>
      <SectionLabel index="01" label="About" />
      <RevealWords
        text={site.aboutBig}
        className="mt-12 font-display text-3xl font-semibold leading-snug text-paper md:text-5xl"
      />
      <div className="mt-16 grid gap-12 md:grid-cols-[1fr_320px]">
        <Reveal>
          <p className="max-w-2xl text-lg leading-relaxed text-paper/70">{site.about}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {["System Design", "Distributed Systems", "Open Source", "Hackathon"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 px-4 py-1.5 font-mono text-[11px] text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-line bg-ink-2">
            {site.portrait ? (
              <img
                src={site.portrait}
                alt={site.name}
                className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 font-mono text-xs text-muted">
                <span className="text-4xl text-accent">▢</span>
                <span>Add your photo</span>
                <span className="px-8 text-center text-[10px] leading-relaxed">
                  src/data/content.js → site.portrait
                </span>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
