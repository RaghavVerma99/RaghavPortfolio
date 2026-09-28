import { useState } from "react"
import SystemDiagram from "./SystemDiagram"
import NodeBrief from "./NodeBrief"
import InteractiveTerminal from "./InteractiveTerminal"
import Watermark from "./Watermark"
import { Reveal, Section, SectionHeader } from "./ui"

export default function Architecture() {
  const [selected, setSelected] = useState("lb")

  return (
    <Section id="systems" className="border-t border-line">
      <Watermark>Systems</Watermark>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-blue/10 blur-3xl"
      />
      <SectionHeader
        index="07"
        kicker="System architecture"
        meta={<>live topology</>}
        title={
          <h2 className="mt-8 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
            Backend architecture.{" "}
            <span className="italic-display text-gradient text-[1.06em]">C++ & Express.</span>
          </h2>
        }
        lede="The reference shape of the systems I build — a C++ edge proxy in front of Express services, with Redis and PostgreSQL underneath. Click a node for the brief."
      />
      <Reveal className="mt-14">
        <SystemDiagram selectedId={selected} onSelectNode={setSelected} />
      </Reveal>
      <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-2">
        <Reveal className="h-full min-w-0">
          <NodeBrief selectedId={selected} />
        </Reveal>
        <Reveal delay={0.1} className="h-full min-w-0">
          <InteractiveTerminal />
        </Reveal>
      </div>
    </Section>
  )
}