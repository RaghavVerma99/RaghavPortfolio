import TicTacToe from "./games/TicTacToe"
import MemoryMatch from "./games/MemoryMatch"
import Watermark from "./Watermark"
import { Reveal, Section, SectionHeader } from "./ui"

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
        className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-blue/10 blur-3xl"
      />
      <SectionHeader
        index="09"
        kicker="Playground"
        meta={<>dom/no-server</>}
        title={
          <h2 className="mt-8 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
            Take a break.{" "}
            <span className="italic-display text-gradient text-[1.06em]">Have some fun.</span>
          </h2>
        }
        lede="Two small games built straight into the site — a minimax-powered Tic-Tac-Toe and a memory match. No servers, no scoreboards. Just the DOM and a bit of logic."
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
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