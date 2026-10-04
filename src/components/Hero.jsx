import { site } from "../data/content"

export default function Hero() {
  return (
    <header className="hero pt-20 pb-16 sm:pt-28 sm:pb-24">
      <div className="hero-copy">
        <p className="label enter hero-kicker" style={{ "--d": "0ms" }}>
          <span className="availability-dot" aria-hidden="true" /> Based in {site.location} · Open to opportunities
        </p>

        <h1 className="hero-title mt-7" aria-label={site.name}>
          {site.name.split(" ").map((part) => (
            <span className="hero-title-line" key={part}>{part}</span>
          ))}
        </h1>

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
      </div>
      <div className="hero-art" aria-hidden="true">
        <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="160" cy="160" r="112" stroke="currentColor" strokeOpacity=".22" />
          <circle cx="160" cy="160" r="77" stroke="currentColor" strokeOpacity=".28" />
          <circle cx="160" cy="160" r="39" stroke="currentColor" strokeOpacity=".36" />
          <path d="M49 160h222M160 49v222" stroke="currentColor" strokeOpacity=".13" />
          <ellipse cx="160" cy="160" rx="112" ry="42" transform="rotate(-34 160 160)" stroke="currentColor" strokeOpacity=".55" />
          <circle cx="237" cy="102" r="5" fill="currentColor" />
          <circle cx="160" cy="160" r="7" fill="currentColor" fillOpacity=".75" />
        </svg>
        <span className="hero-art-caption">Curiosity in orbit</span>
      </div>
    </header>
  )
}
