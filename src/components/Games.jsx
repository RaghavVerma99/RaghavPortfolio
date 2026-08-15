import TicTacToe from "./games/TicTacToe"
import MemoryMatch from "./games/MemoryMatch"
import Watermark from "./Watermark"
import { Reveal, Section, SectionLabel } from "./ui"

export default function Games() {
  return (
    <Section id="games" className="border-t border-line">
      <Watermark>Playground</Watermark>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#4d9bff]/10 blur-3xl"
      />
      <SectionLabel index="07" label="Playground" />
      <h2 className="mt-10 max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">
        Take a break. <span className="text-gradient italic">Have some fun.</span>
      </h2>
      <p className="mt-4 max-w-xl text-base text-muted">
        Two small games built straight into the site — a minimax-powered Tic-Tac-Toe and a memory
        match. No servers, no scoreboards. Just the DOM and a bit of logic.
      </p>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Reveal className="h-full">
          <TicTacToe />
        </Reveal>
        <Reveal delay={0.1} className="h-full">
          <MemoryMatch />
        </Reveal>
      </div>
    </Section>
  )
}
