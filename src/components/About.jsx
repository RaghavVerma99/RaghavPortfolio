import { site, stats } from "../data/content"
import portrait from "../assets/portrait.jpg"
import ProfileStrip from "./ProfileStrip"
import Watermark from "./Watermark"
import { CountUp, Reveal, RevealWords, Section, SectionLabel } from "./ui"

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
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white/[0.025] px-5 py-6 transition-colors duration-300 hover:bg-white/[0.05]"
              >
                <p className="font-display text-4xl font-bold text-paper">
                  <CountUp to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <ProfileStrip />
        </Reveal>
        <Reveal delay={0.1} className="mx-auto w-full max-w-[380px]">
          <div className="group relative">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-accent/25 via-white/5 to-[#4d9bff]/25 opacity-50 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
            />
            <div
              aria-hidden
              className="absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/70 via-white/10 to-[#4d9bff]/70 opacity-50 transition-opacity duration-500 group-hover:opacity-90"
            />
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl glass">
              <img
                src={portrait}
                alt={site.name}
                className="h-full w-full object-cover transition-all duration-700 ease-out grayscale group-hover:scale-[1.04] group-hover:grayscale-0"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
              />
              <div className="absolute inset-x-5 bottom-5">
                <p className="font-display text-2xl font-bold tracking-tight text-paper">
                  {site.name}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
                  {site.role} · B.Tech CSE '27
                </p>
              </div>
              <div
                aria-hidden
                className="absolute left-3.5 top-3.5 h-7 w-7 rounded-tl-xl border-l-2 border-t-2 border-accent/80 transition-all duration-500 group-hover:h-9 group-hover:w-9"
              />
              <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-paper/90 backdrop-blur">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                Open to work
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
