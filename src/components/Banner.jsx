import { site } from "../data/content"

export default function Banner() {
  return (
    <footer className="site-footer">
      <div className="footer-glow" aria-hidden="true" />
      <svg className="footer-orbit" viewBox="0 0 360 260" fill="none" aria-hidden="true">
        <circle cx="220" cy="130" r="96" />
        <circle cx="220" cy="130" r="63" />
        <ellipse cx="220" cy="130" rx="122" ry="39" transform="rotate(-28 220 130)" />
        <circle className="footer-orbit-point" cx="310" cy="81" r="4" />
      </svg>

      <div className="footer-inner">
        <div className="footer-topline">
          <div className="footer-signature">
            <span className="footer-signature-mark" aria-hidden="true">RV</span>
            <span><strong>{site.name}</strong><small>{site.location}</small></span>
          </div>
          <a className="footer-backtop" href="#top">
            Back to top
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 12.5v-9m-4 4 4-4 4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>

        <div className="footer-main" data-reveal>
          <p className="footer-eyebrow"><span /> OPEN TO GOOD CONVERSATIONS</p>
          <h2>Let’s build<br /><em>thoughtfully.</em></h2>
          <div className="footer-invite">
            <p>Have a product, platform, or tricky system to work on?</p>
            <a className="footer-cta" href={`mailto:${site.email}?subject=Let’s%20work%20together`}>
              <span>Start a conversation</span>
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.5 8h9m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </div>

        <div className="footer-bottomline">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Made with care · {site.timezone}</span>
          <a href="https://github.com/RaghavVerma99" target="_blank" rel="noreferrer noopener">GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </footer>
  )
}
