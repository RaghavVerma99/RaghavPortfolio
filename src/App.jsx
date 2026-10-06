import Hero from "./components/Hero"
import Socials from "./components/Socials"
import Banner from "./components/Banner"
import CopyEmail from "./components/CopyEmail"
import CustomCursor from "./components/CustomCursor"
import ScrollProgress from "./components/ScrollProgress"
import { site, projects, experience, education, skills } from "./data/content"
import useReveal from "./hooks/useReveal"

export default function App() {
  useReveal()

  return (
    <div className="relative min-h-screen">
      <div className="backdrop" aria-hidden="true" />
      <CustomCursor />
      <ScrollProgress />

      {/* First tab stop — the page is one column, so this is the only thing
          keyboard users need to skip past. */}
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className="site-header">
        <div className="header-inner mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-5 sm:px-8">
          <a className="header-brand" href="#top" aria-label={`${site.name} — home`}>
            <span className="header-brand-mark" aria-hidden="true">
              <svg viewBox="0 0 40 40" fill="none">
                <path d="M11 29V11h8.5c4.1 0 6.5 2 6.5 5.5S23.6 22 19.5 22H11m8.5 0L28 29" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="30" cy="10" r="2" fill="currentColor" />
              </svg>
            </span>
            <span className="header-brand-copy">
              <strong>{site.name}</strong>
              <small>SOFTWARE ENGINEER</small>
            </span>
          </a>
          <nav className="site-nav" aria-label="Main navigation">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="header-actions">
            <CopyEmail value={site.email}>
              <span>Copy email</span>
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="2.25" y="3.25" width="11.5" height="9.5" rx="2" stroke="currentColor" strokeWidth="1.25" /><path d="m3 4 5 4 5-4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </CopyEmail>
          </div>
        </div>
      </header>

      <main id="main" className="relative z-10 mx-auto max-w-3xl px-6 sm:px-8">
        <div id="top" />
        <Hero />
        <section className="work-section" id="work" aria-labelledby="work-title">
          <div className="section-heading" data-reveal>
            <div className="section-heading-copy">
              <p className="label"><span>01</span> / Selected work</p>
              <h2 id="work-title">Things I’ve built</h2>
            </div>
            <span className="section-note">SYSTEMS · TOOLS · PRODUCTS</span>
          </div>
          <div className="project-list">
            {projects.map((project, index) => (
              <article className="project-card" data-reveal key={project.index} style={{ "--card-index": index }}>
                <div className="project-topline">
                  <span className="project-index">{project.index} / 0{projects.length}</span>
                  <span className="project-metric"><strong>{project.metric}</strong> {project.metricLabel}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-bottomline">
                  <ul className="tag-list" aria-label="Technologies">
                    {project.stack.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <a href={project.link} target="_blank" rel="noreferrer noopener" className="text-link">
                    GitHub <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="experience-section" id="experience" aria-labelledby="experience-title">
          <div className="section-heading" data-reveal>
            <div className="section-heading-copy">
              <p className="label"><span>02</span> / Experience</p>
              <h2 id="experience-title">Where I’ve contributed</h2>
            </div>
            <span className="section-note">INTERNSHIP · OPEN SOURCE</span>
          </div>
          <div className="timeline">
            {experience.map((item) => (
              <article className="timeline-item" data-reveal key={`${item.company}-${item.role}`}>
                <div className="timeline-date">{item.period}</div>
                <div>
                  <h3>{item.role} <span>· {item.company}</span></h3>
                  <p>{item.summary}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="education-line"><span>Education</span><p>{education.degree} · {education.school} <small>{education.period}</small></p></div>
        </section>

        <section className="focus-section" aria-labelledby="focus-title">
          <div className="section-heading" data-reveal>
            <div className="section-heading-copy">
              <p className="label"><span>03</span> / Focus</p>
              <h2 id="focus-title">Tools I reach for</h2>
            </div>
            <span className="section-note">A PRACTICAL TOOLKIT</span>
          </div>
          <div className="focus-groups">
            {skills.filter((group) => ["Languages", "Systems", "Backend", "Databases"].includes(group.title)).map((group) => (
              <div className="focus-group" data-reveal key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </section>
        <Socials />
      </main>

      <Banner />
    </div>
  )
}
