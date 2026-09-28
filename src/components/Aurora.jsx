import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"

const ORBS = [
  { cls: "aurora-orb-1", depth: 60 },
  { cls: "aurora-orb-2", depth: -90 },
  { cls: "aurora-orb-3", depth: 40 },
  { cls: "aurora-orb-4", depth: -50 },
]

/**
 * Ambient light field behind the whole document.
 *
 * The orbs are animated in CSS on `transform` only, so they stay on the
 * compositor and never repaint a multi-hundred-megapixel gradient. The
 * wrapper adds a gentle scroll-linked drift so the light appears to sit
 * behind the content plane rather than glued to the viewport.
 */
export default function Aurora() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 220]), {
    stiffness: 60,
    damping: 30,
    mass: 0.6,
  })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.12, 0.95])

  if (reduceMotion) {
    return (
      <div className="aurora" aria-hidden>
        <div className={`aurora-orb ${ORBS[0].cls}`} />
        <div className={`aurora-orb ${ORBS[1].cls}`} />
        <div className={`aurora-orb ${ORBS[2].cls}`} />
        <div className={`aurora-orb ${ORBS[3].cls}`} />
        <div className="aurora-mask" />
      </div>
    )
  }

  return (
    <motion.div className="aurora" aria-hidden style={{ y, scale }}>
      {ORBS.map((orb) => (
        <div key={orb.cls} className={`aurora-orb ${orb.cls}`} />
      ))}
      <div className="aurora-sweep" />
      <div className="aurora-mask" />
    </motion.div>
  )
}
