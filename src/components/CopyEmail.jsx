import { useEffect, useRef, useState } from "react"

const COPY_MS = 1600

/* Clipboard write with a text fallback: the async API is unavailable on
   insecure origins, which includes a plain-HTTP preview deploy. */
async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value)
      return true
    } catch {
      /* fall through to the legacy path */
    }
  }

  const el = document.createElement("textarea")
  el.value = value
  el.setAttribute("readonly", "")
  el.style.cssText = "position:fixed;top:-1000px;opacity:0"
  document.body.appendChild(el)
  el.select()
  let ok = false
  try {
    ok = document.execCommand("copy")
  } catch {
    ok = false
  }
  document.body.removeChild(el)
  return ok
}

export default function CopyEmail({ value, children }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const onClick = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!(await copyText(value))) return

    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), COPY_MS)
  }

  return (
    <button
      type="button"
      onClick={onClick}
      data-copied={copied || undefined}
      className="copy-btn"
      aria-label={`Copy ${value} to clipboard`}
    >
      {/* Two stacked spans cross-fade so the swap doesn't reflow the row. */}
      <span className="copy-btn-label copy-btn-idle" aria-hidden={copied}>
        {children}
      </span>
      <span className="copy-btn-label copy-btn-done" aria-hidden={!copied}>
        Copied
      </span>
    </button>
  )
}
