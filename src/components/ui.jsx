import { useEffect, useRef, useState } from "react"
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"

const EASE = [0.16, 1, 0.3, 1]
const TILT_SPRING = { stiffness: 220, damping: 24, mass: 0.5 }
const PARALLAX_SPRING = { stiffness: 90, damping: 30, mass: 0.4 }

/** True only on devices with a real hovering cursor — gates tilt + glare. */
function useFinePointer() {
  const [fine, setFine] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
    const sync = () => setFine(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])
  return fine
}

export function Section({ id, children, className = "" }) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden px-5 py-[var(--sp-section)] sm:px-8 sm:py-[calc(var(--sp-section)+1.5rem)] lg:px-12 lg:py-[var(--sp-section-lg)] ${className}`}
    >
      <div className="relative z-10 mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

/**
 * Vertical gap between a section header and the content that follows it.
 * Centralised so every section breathes the same amount — this was the
 * single largest source of layout inconsistency.
 */
export function SectionBody({ children, className = "" }) {
  return <div className={`mt-[var(--sp-header)] sm:mt-[var(--sp-header-lg)] ${className}`}>{children}</div>
}

export function SectionLabel({ index, label, className = "" }) {
  return (
    <div
      className={`flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-muted ${className}`}
    >
      <span className="text-accent">({index})</span>
      <span>{label}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  )
}

export function SectionHeader({
  index,
  kicker,
  title,
  lede = "",
  meta = "",
  className = "",
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="eyebrow">
        <span className="text-accent">({index})</span>
        <span aria-hidden className="h-px w-8 shrink-0 bg-accent/40" />
        <span className="shrink-0">{kicker}</span>
        <span aria-hidden className="h-px min-w-4 flex-1 bg-line" />
        {meta && (
          <span className="hidden shrink-0 pl-2 sm:inline-flex">{meta}</span>
        )}
      </div>
      {/* Title clears the eyebrow; the lede clears the title. Both gaps were
          previously inconsistent between sections. */}
      {title}
      {lede && (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{lede}</p>
      )}
    </div>
  )
}

export function Reveal({ children, className = "", delay = 0, y = 40, ...rest }) {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    )
  }
  return (
    <motion.div
      className={className}
      {...rest}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export function RevealClip({ children, className = "", delay = 0, duration = 0.9, ...rest }) {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    )
  }
  return (
    <motion.div
      className={className}
      {...rest}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerWords({ text, className = "", delay = 0, stagger = 0.035 }) {
  const reduceMotion = useReducedMotion()
  const words = text.split(" ")
  if (reduceMotion) {
    return <span className={className}>{text}</span>
  }
  const wordCls = className.replace(/\bblock\b/g, "").trim()
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: {},
        show: { transition: { delayChildren: delay, staggerChildren: stagger } },
      }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "115%", opacity: 0 },
              show: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.75, ease: EASE },
              },
            }}
          >
            <span className={wordCls}>
              {w}
              {i < words.length - 1 ? "\u00A0" : ""}
            </span>
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

export function RevealWords({ text, className = "", stagger = 0.015 }) {
  const reduceMotion = useReducedMotion()
  const words = text.split(" ")
  if (reduceMotion) {
    return <p className={className}>{text}</p>
  }
  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline"
          variants={{
            hidden: { opacity: 0.12, y: 6 },
            show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
          }}
        >
          {w}{" "}
        </motion.span>
      ))}
    </motion.p>
  )
}

export function GlowCard({ children, className = "", hover = true, tilt = false, ...rest }) {
  const surface = (
    <>
      {hover && <div aria-hidden className="glass-shine pointer-events-none absolute inset-0" />}
      {hover && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}
      <div className="relative z-10">{children}</div>
    </>
  )

  if (tilt) {
    return (
      <TiltCard className={`h-full ${className}`} {...rest}>
        <div
          data-cursor
          className="glass-lux group relative h-full overflow-hidden rounded-3xl transition-[border-color] duration-500 hover:border-accent/40"
        >
          {surface}
        </div>
      </TiltCard>
    )
  }

  return (
    <div
      data-cursor
      className={`glass-lux relative overflow-hidden rounded-3xl ${
        hover ? "glass-hover group" : ""
      } ${className}`}
      {...rest}
    >
      {surface}
    </div>
  )
}

/**
 * Pointer-reactive depth card.
 *
 * Three layers react to the cursor, each on a different property so the
 * browser never has to composite them together:
 *   1. rotateX/rotateY — real 3D tilt, spring-damped
 *   2. --mx/--my       — drives the specular glare + iridescent bloom
 *   3. translateZ      — lifts the inner content off the card plane
 *
 * CSS variables are written straight to the node (no React state) so a
 * pointermove never triggers a re-render.
 */
export function TiltCard({
  children,
  className = "",
  intensity = 7,
  lift = 26,
  glare = true,
  ...rest
}) {
  const ref = useRef(null)
  const fine = useFinePointer()
  const reduceMotion = useReducedMotion()
  const active = fine && !reduceMotion

  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const lz = useMotionValue(0)
  const springRx = useSpring(rx, TILT_SPRING)
  const springRy = useSpring(ry, TILT_SPRING)
  const springLz = useSpring(lz, TILT_SPRING)

  const onMove = (e) => {
    const el = ref.current
    if (!el || !active) return
    const r = el.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width
    const ny = (e.clientY - r.top) / r.height

    rx.set((0.5 - ny) * intensity * 2)
    ry.set((nx - 0.5) * intensity * 2)
    lz.set(lift)

    el.style.setProperty("--mx", `${nx * 100}%`)
    el.style.setProperty("--my", `${ny * 100}%`)
    el.style.setProperty("--poly-pos", `${nx * 100}%`)
  }

  const onLeave = () => {
    rx.set(0)
    ry.set(0)
    lz.set(0)
    ref.current?.style.setProperty("--mx", "50%")
    ref.current?.style.setProperty("--my", "50%")
  }

  if (!active) {
    return (
      <div ref={ref} className={className} {...rest}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      data-cursor
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: springRx,
        rotateY: springRy,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
        "--mx": "50%",
        "--my": "50%",
      }}
      className={`group relative ${className}`}
      {...rest}
    >
      {glare && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(340px circle at var(--mx) var(--my), rgba(255,255,255,0.13), transparent 62%)",
            mixBlendMode: "overlay",
          }}
        />
      )}
      <motion.div style={{ z: springLz, transformStyle: "preserve-3d" }} className="relative">
        {children}
      </motion.div>
    </motion.div>
  )
}

/**
 * Scroll-linked depth. The element drifts against the scroll direction by
 * `distance` px across its full pass through the viewport. Spring-damped so
 * it settles instead of tracking the wheel 1:1.
 */
export function Parallax({ children, distance = 48, className = "", ...rest }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  const y = useSpring(raw, PARALLAX_SPRING)

  if (reduceMotion) {
    return (
      <div ref={ref} className={className} {...rest}>
        {children}
      </div>
    )
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className} {...rest}>
      {children}
    </motion.div>
  )
}

/**
 * Masked rise. Combines a vertical clip reveal with a translate so content
 * resolves out of the fog rather than sliding in on a hard edge.
 */
export function FadeIn({
  children,
  className = "",
  delay = 0,
  distance = 28,
  duration = 0.9,
  ...rest
}) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Container that cascades its `StaggerItem` children into view. */
export function Stagger({ children, className = "", delay = 0, gap = 0.07, ...rest }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      variants={{ hidden: {}, show: { transition: { delayChildren: delay, staggerChildren: gap } } }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = "", y = 26, ...rest }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/**
 * Edge-to-edge hairline that fills as it scrolls through the viewport.
 * Used to draw section dividers without hard borders.
 */
export function ScrollRule({ className = "" }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.4"] })
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <div ref={ref} className={`relative h-px w-full overflow-hidden bg-white/8 ${className}`}>
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-accent/70 via-cyan/50 to-transparent"
        style={{ scaleX: width }}
      />
    </div>
  )
}


export function CountUp({ to, suffix = "", decimals = 0, duration = 2 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduceMotion = useReducedMotion()
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) {
      setVal(to)
      return
    }
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => setVal(v),
    })
    return () => controls.stop()
  }, [inView, to, duration, reduceMotion])

  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  )
}