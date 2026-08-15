export default function Watermark({ children, className = "" }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute right-0 top-4 select-none font-display text-[22vw] font-bold uppercase leading-none tracking-tight text-paper/[0.025] md:text-[13vw] ${className}`}
    >
      {children}
    </span>
  )
}
