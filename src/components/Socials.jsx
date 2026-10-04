import { socials } from "../data/content"
import useTilt from "../hooks/useTilt"
import BrandIcon from "./BrandIcon"

export default function Socials() {
  const root = useTilt()

  return (
    <section id="contact" className="border-t border-line pt-10 pb-24 sm:pt-12 sm:pb-28">
      <h2 className="label enter" style={{ "--d": "0ms" }}>
        Elsewhere
      </h2>

      {/* One delegated pointer listener for the whole grid — see useTilt. */}
      <ul ref={root} className="mt-7 grid gap-2.5 sm:mt-8 sm:gap-3 sm:grid-cols-2">
        {socials.map((s, i) => (
          <li key={s.label} className="enter" style={{ "--d": `${120 + i * 80}ms` }}>
            <a
              href={s.href}
              {...(s.external ? { target: "_blank", rel: "noreferrer noopener" } : null)}
              data-tilt=""
              className="social-tile"
              /* Two independent colour inputs: --hue drives the glow, ring and
                 wash so the five stay on one spectrum; --brand is the
                 platform's own colour, used only for its mark. */
              style={{ "--hue": s.hue, "--brand": s.brand }}
            >
              <span className="brand-mark">
                <BrandIcon name={s.icon} className="size-[1.15rem]" />
              </span>

              <span className="relative z-10 min-w-0 flex-1">
                <span className="block text-[1.02rem] font-medium tracking-[-0.01em]">
                  {s.label}
                </span>
                <span className="mt-1 block truncate font-mono text-xs text-muted">
                  {s.handle}
                </span>
              </span>

              <span className="relative z-10 flex items-center gap-2.5">
                {/* The detail line is the first thing to go when space runs
                    out — on a phone it's the least useful of the three. */}
                <span className="hidden font-mono text-[11px] text-faint lg:block">
                  {s.detail}
                </span>
                <span className="social-tile-arrow" aria-hidden="true">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4"
                  >
                    <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
                  </svg>
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
