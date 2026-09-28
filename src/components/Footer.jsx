import { navLinks, site, socials } from "../data/content"

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line px-6 md:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 border-b border-line py-12 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-xs text-muted">
            © 2026 {site.name} — built with React · Tailwind · Motion.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-accent"
              >
                <span className="mr-1 text-accent opacity-0 transition-opacity group-hover:opacity-100">→</span>
                {l.label}
              </a>
            ))}
            <a
              href={site.resume}
              target="_blank"
              rel="noreferrer"
              className="group font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-accent"
            >
              <span className="mr-1 text-accent opacity-0 transition-opacity group-hover:opacity-100">→</span>
              Resume
            </a>
            <a
              href="#games"
              className="group font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-accent"
            >
              <span className="mr-1 text-accent opacity-0 transition-opacity group-hover:opacity-100">→</span>
              Playground
            </a>
            {socials.slice(0, 3).map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-accent"
              >
                <span className="mr-1 text-accent opacity-0 transition-opacity group-hover:opacity-100">→</span>
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="pointer-events-none relative select-none">
          <div
            aria-hidden
            className="wm fade-x top-auto! bottom-0! left-1/2! right-auto! -translate-x-1/2 whitespace-nowrap text-[11vw]!"
          >
            {site.name}
          </div>
          <div className="relative flex items-center justify-between pb-8 pt-10 font-mono text-[10px] uppercase tracking-widest text-faint">
            <span>
              status: <span className="text-accent">up and shipping</span>
            </span>
            <a
              href="#top"
              className="group flex items-center gap-2 text-paper transition-colors hover:text-accent"
            >
              Back to top
              <span className="transition-transform duration-300 group-hover:-translate-y-1">↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}