import { useState } from "react"
import SystemCanvas from "./SystemCanvas"
import SystemArchitect from "./SystemArchitect"
import InteractiveTerminal from "./InteractiveTerminal"
import Watermark from "./Watermark"
import { Reveal, Section, SectionLabel } from "./ui"

export default function Architecture() {
  const [selected, setSelected] = useState("lb")

  return (
    <Section id="architecture" className="border-t border-line">
      <Watermark>Architecture</Watermark>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#4d9bff]/10 blur-3xl"
      />
      <SectionLabel index="06" label="System Architecture" />
      <h2 className="mt-10 max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">
        Inside the stack. <span className="text-gradient italic">Node by node.</span>
      </h2>
      <p className="mt-4 max-w-xl text-base text-muted">
        A reference topology of the kind of distributed systems I build — drag to orbit, click a
        node to inspect it, or drop into the shell and poke around.
      </p>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Reveal className="h-full">
          <div className="glass h-full rounded-3xl p-4 md:p-6">
            <SystemCanvas selectedNodeId={selected} onSelectNode={setSelected} />
          </div>
        </Reveal>
        <Reveal delay={0.08} className="h-full">
          <SystemArchitect selectedId={selected} />
        </Reveal>
      </div>
      <Reveal delay={0.12} className="mt-6">
        <InteractiveTerminal />
      </Reveal>
    </Section>
  )
}
