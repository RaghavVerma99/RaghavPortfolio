import { site, stats } from "../data/content"
import portrait from "../assets/portrait.jpg"
import ProfileStrip from "./ProfileStrip"
import Watermark from "./Watermark"
import {
  CountUp,
  GlowCard,
  Reveal,
  RevealWords,
  Section,
  SectionBody,
  SectionHeader,
} from "./ui"

export default function About() {
  return (
    <Section id="about">
      <Watermark>About</Watermark>
      <SectionHeader
        index="02"
        kicker="About"
        meta={<>whoami</>}
        title={
          <RevealWords
            text={site.aboutBig}
            className="mt-10 block max-w-4xl font-display text-3xl font-semibold leading-[1.15] tracking-tight text-paper md:text-5xl"
          />
        }
      />
      <SectionBody className="grid gap-12 md:grid-cols-[1fr_320px] md:gap-14">
        <Reveal>
          {/* Body copy gets generous leading and measure control — long
              paragraphs were previously sitting too close to the card edge. */}
          <p className="max-w-2xl text-[17px] leading-[1.75] text-paper/70 sm:text-lg">
            {site.about}
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {["System Design", "Distributed Systems", "Open Source", "Hackathons"].map((t) => (
              <span key={t} className="chip chip-solid">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-ink-2/80 px-4 py-5 sm:px-5">
                <p className="font-display text-2xl font-bold tracking-tight">
                  <CountUp to={s.value} />
                  <span className="text-accent">{s.suffix}</span>
                </p>
                <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-faint">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <ProfileStrip />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="mx-auto w-full max-w-[380px]">
          <div className="group relative">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-accent/20 via-white/5 to-blue/20 opacity-40 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
            />
            <div
              aria-hidden
              className="absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/60 via-white/10 to-blue/60 opacity-40 transition-opacity duration-500 group-hover:opacity-90"
            />
            <div className="glass relative aspect-[3/4] overflow-hidden rounded-2xl depth-4">
              <img
                src={portrait}
                alt={`Portrait of ${site.name}`}
                className="h-full w-full scale-105 object-cover transition-all duration-[900ms] ease-out grayscale group-hover:scale-100 group-hover:grayscale-0"
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(280px circle at 50% 40%, rgba(0,229,255,0.14), transparent 65%)",
                  mixBlendMode: "overlay",
                }}
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
              <div className="absolute left-1/2 top-3 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.3em] text-paper/60">
                portrait.jpeg
              </div>
            </div>
          </div>
        </Reveal>
      </SectionBody>
    </Section>
  )
}