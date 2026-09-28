export default function Watermark({ children }) {
  return (
    <span aria-hidden className="wm truncate">
      {children}
    </span>
  )
}