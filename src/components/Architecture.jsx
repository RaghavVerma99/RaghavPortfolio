import { useState } from "react"
import SystemDiagram from "./SystemDiagram"
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
        The typical shape of the distributed systems I build — one request, from the edge down to
        the data layer. Click a node to inspect it, or drop into the shell and poke around.
      </p>
      <Reveal className="mt-10">
        <SystemDiagram selectedId={selected} onSelectNode={setSelected} />
      </Reveal>
      <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-2">
        <Reveal className="h-full min-w-0">
          <SystemArchitect selectedId={selected} />
        </Reveal>
        <Reveal delay={0.1} className="h-full min-w-0">
          <InteractiveTerminal />
        </Reveal>
      </div>
    </Section>
  )
}
