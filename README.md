# Raghav Verma — Portfolio

A single-page developer portfolio for **SDE / SWE roles**, engineered as a high-performance, motion-first web experience.

---

## Tech Stack at a Glance

| Layer | Technology | Role |
| --- | --- | --- |
| UI Framework | [React 19](https://react.dev) | Component architecture & state |
| Build Tool | [Vite 7](https://vite.dev) | Dev server, bundling, HMR |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling & design tokens |
| Animations | [Framer Motion](https://www.framer.com/motion/) | Micro-interactions & scroll choreography |
| Smooth Scroll | [Lenis](https://github.com/darkroomengineering/lenis) | Inertia-based scrolling |
| Typography | Syne · Inter · JetBrains Mono | Display / body / code faces |

---

## Core Technologies

### React 19
The application is built on React 19 with the modern `<StrictMode>` entry point. Components are organized by responsibility — one file per section (`Hero`, `Marquee`, `Skills`, `Experience`, `Projects`, …) plus a shared `ui.jsx` of reusable primitives (`Reveal`, `StaggerWords`, `RevealWords`, `CountUp`). All content lives in a single data module (`src/data/content.js`) so the UI is fully decoupled from the copy.

### Vite 7
Serves as the build system with the official React and Tailwind plugins wired into `vite.config.js`. Vite compiles the project as native ES modules, giving fast cold starts, instant HMR during development, and a tree-shaken production bundle.

### Tailwind CSS v4
Version 4 runs on the `@tailwindcss/vite` plugin — no `tailwind.config.js` needed. The entire design language is declared as **CSS-native design tokens** in `src/index.css` under `@theme`:

| Token | Value | Usage |
| --- | --- | --- |
| `--color-ink` | `#0b0b0b` | Primary background |
| `--color-ink-2` | `#131313` | Raised surfaces / cards |
| `--color-paper` | `#f2efe6` | Primary text |
| `--color-accent` | `#c9ff4d` | Action color / highlights |
| `--color-muted` | `#9b9b93` | Secondary text |
| `--color-line` | `rgba(242,239,230,0.08)` | Hairline borders |
| `--font-display` / `--font-body` / `--font-mono` | Syne / Inter / JetBrains Mono | Typefaces |

These tokens are consumed as utilities like `bg-ink`, `text-paper`, `text-accent`, and `font-display`. Custom visual effects (grid mask, grain overlay, marquee keyframes, spotlight cards, gradient text) are layered as plain CSS.

### Framer Motion
Framer Motion drives every animation through declarative motion values rather than imperative JS:

- **`StaggerWords`** — splits headings into words and reveals them with a clipped `y: 110% → 0` rise, delay-chained per line.
- **`RevealWords`** — scroll-driven word-by-word opacity fade for long statement text.
- **`Reveal`** — `whileInView` fade-and-rise wrapper used across sections.
- **`useScroll`** — powers the scroll-linked progress bar (`scaleX`) and the Experience timeline's glowing fill line.
- **`useSpring` + `useMotionValue`** — drives the custom cursor's trailing ring, magnetic buttons, and 3D tilt on project cards.
- **`animate()`** — runs the loader percentage counter and the stats count-up.
- **`AnimatePresence`** — orchestrates loader exit, mobile-menu, and back-to-top transitions.

### Lenis
Smooth scrolling is handled by Lenis, which lerps the native scroll into a velocity-smoothed motion. Anchor links are intercepted and routed through `lenis.scrollTo()` with an offset, keeping in-page navigation smooth and consistent.

---

## Supporting Pieces

- **Google Fonts** — Syne (display, weights 400–800), Inter (body), JetBrains Mono (mono, weights 300–700), loaded via `preconnect` + single stylesheet in `index.html`.
- **CSS-only motion** — the dual-direction marquees, pulsing availability dot, blinking terminal cursor, and gradient shimmer run on keyframes (paused on hover, disabled under `prefers-reduced-motion`).
- **Micro-interactions** — custom cursor with `mix-blend-difference`, magnetic CTA buttons, cursor-following spotlight + 3D tilt on project cards, scroll-spy navigation.
- **Decor** — fixed grain overlay and masked grid background for texture.

---

## Performance Characteristics

- **Single-page Vite build** — one HTML entry, one CSS chunk (~33 kB), one JS chunk (~390 kB, ~123 kB gzip).
- **GPU-friendly transforms** — animations compose on `transform` / `opacity` only; scroll-linked effects use `scaleY` / `scaleX`.
- **Respects reduced motion** — keyframe animations and gradient shifts are disabled under `prefers-reduced-motion`.
- **Responsive** — fluid `vw`-based display type and a `pointer: fine`-gated custom cursor keep it usable on touch devices.
