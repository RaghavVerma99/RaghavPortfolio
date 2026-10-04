import { site } from "../data/content"
import Words from "./Words"

export default function Hero() {
  return (
    <header className="pt-20 pb-16 sm:pt-28 sm:pb-24">
      <p className="label enter hero-kicker" style={{ "--d": "0ms" }}>
        <span className="availability-dot" aria-hidden="true" /> Based in {site.location} · Open to opportunities
      </p>

      <h1 className="mt-7 text-[clamp(2.9rem,12.5vw,7rem)] leading-[0.9] font-semibold tracking-[-0.045em] text-balance">
        <Words text={site.name} step={80} />
      </h1>

      {/* Spectrum fill that drifts vertically — the one continuously-moving
          element in the reading column, so the eye has something to land on
          without the copy having to move. */}
      <p className="hero-role enter">Software engineer <span>building dependable backend systems.</span></p>

      <p
        className="enter mt-8 max-w-[56ch] text-[0.95rem] leading-relaxed text-muted sm:mt-9 sm:text-[0.98rem]"
        style={{ "--d": "520ms" }}
      >
        I’m a computer science student focused on backend engineering and distributed systems. I build practical tools, from an asynchronous C++ reverse proxy to a sandboxed online compiler, and enjoy making complex systems easier to use.
      </p>

      <div className="hero-actions enter" style={{ "--d": "600ms" }}>
        <a href="#work" className="primary-link">Explore my work <span aria-hidden="true">↓</span></a>
        <a href={site.resume} className="secondary-link">View resume <span aria-hidden="true">↗</span></a>
      </div>
    </header>
  )
}
