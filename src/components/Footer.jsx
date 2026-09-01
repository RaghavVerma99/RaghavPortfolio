import { navLinks, site, socials } from "../data/content"

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line px-6 md:px-12">
      <div
        aria-hidden
        className="pointer-events-none select-none pb-4 pt-10 text-center font-display text-[16vw] font-bold uppercase leading-[0.8] tracking-tight text-paper/[0.045]"
      >
        {site.name}
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 border-t border-line py-8 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-xs text-muted">
          © 2026 {site.name}. Built with React · Tailwind · Motion.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="font-mono text-[11px] uppercase tracking-widest text-muted hover:text-accent">
              {l.label}
            </a>
          ))}
          {socials.slice(0, 3).map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] uppercase tracking-widest text-muted hover:text-accent"
            >
              {s.label}
            </a>
          ))}
          <a href="#games" className="font-mono text-[11px] uppercase tracking-widest text-muted hover:text-accent">
            Playground
          </a>
        </div>
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
