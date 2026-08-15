import { useEffect, useRef, useState } from "react"
import { animate, motion, useInView } from "framer-motion"

const EASE = [0.16, 1, 0.3, 1]

export function Section({ id, children, className = "" }) {
  return (
    <section id={id} className={`relative overflow-hidden px-6 py-24 md:px-12 md:py-32 ${className}`}>
      <div className="relative mx-auto max-w-6xl">{children}</div>
    </section>
  )
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

export function Reveal({ children, className = "", delay = 0, y = 40, ...rest }) {
  return (
    <motion.div
      className={className}
      {...rest}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerWords({ text, className = "", delay = 0, stagger = 0.035 }) {
  const words = text.split(" ")
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
              hidden: { y: "110%", opacity: 0 },
              show: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.7, ease: EASE },
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
  const words = text.split(" ")
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
            hidden: { opacity: 0.1 },
            show: { opacity: 1, transition: { duration: 0.25 } },
          }}
        >
          {w}{" "}
        </motion.span>
      ))}
    </motion.p>
  )
}

export function CountUp({ to, suffix = "", decimals = 0, duration = 2 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => setVal(v),
    })
    return () => controls.stop()
  }, [inView, to, duration])

  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  )
}
