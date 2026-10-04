import { site } from "../data/content"

/* Two layers of the name, stacked to read as carved rather than printed:
   .banner-depth — a light silhouette nudged down-right. Because the face
                   above it is near-black, this only shows as a lit bevel
                   around the lower edge of every glyph.
   .banner-face  — the pitch-black front, which is why the depth layer is
                   load-bearing: on its own, black-on-black is invisible.
   The footer also carries a soft light source behind them, so the black has
   something to sit against. */
export default function Banner() {
  const name = site.name.toUpperCase()

  return (
    <footer className="banner relative overflow-hidden">
      <div className="banner-light" aria-hidden="true" />

      <div className="banner-stage" aria-hidden="true">
        <span className="banner-depth">{name}</span>
        <span className="banner-face">{name}</span>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-10 sm:px-8 sm:pb-12">
        <div className="banner-rule mb-6" />
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <p className="banner-meta">
            {site.name} · {site.location} · {site.timezone}
          </p>
          <p className="banner-meta">{site.availability}</p>
        </div>
      </div>
    </footer>
  )
}
