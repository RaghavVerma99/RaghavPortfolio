import { site } from "../data/content"

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line px-6 md:px-12">
      <div
        aria-hidden
        className="pointer-events-none select-none pb-4 pt-10 text-center font-display text-[16vw] font-bold uppercase leading-[0.8] tracking-tight text-paper/[0.03]"
      >
        {site.name}
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 border-t border-line py-8 md:flex-row md:items-center">
        <p className="font-mono text-xs text-muted">
          © 2026 {site.name}. All rights reserved.
        </p>
        <p className="font-mono text-xs text-muted">
          Designed & built with React · Tailwind · Framer Motion
        </p>
        <a
          href="#top"
          className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-paper transition-colors hover:text-accent"
        >
          Back to top{" "}
          <span className="transition-transform duration-300 group-hover:-translate-y-1">↑</span>
        </a>
      </div>
    </footer>
  )
}
