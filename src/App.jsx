import Hero from "./components/Hero"
import Socials from "./components/Socials"
import Banner from "./components/Banner"
import CopyEmail from "./components/CopyEmail"
import { site, projects, experience, education, skills } from "./data/content"

export default function App() {
  return (
    <div className="relative min-h-screen">
      <div className="backdrop" aria-hidden="true" />

      {/* First tab stop — the page is one column, so this is the only thing
          keyboard users need to skip past. */}
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className="relative z-20">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-5 sm:px-8">
          <p className="font-mono text-xs tracking-[0.12em] text-faint">
            {site.name}
          </p>
          <div className="flex items-center gap-4">
            <CopyEmail value={site.email}>Copy email</CopyEmail>
          </div>
        </div>
      </header>

      <main id="main" className="relative z-10 mx-auto max-w-3xl px-6 sm:px-8">
        <div id="top" />
        <Hero />
        <section className="work-section" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <p className="label">Selected work</p>
            <h2 id="work-title">Things I’ve built</h2>
          </div>
          <div className="project-list">
            {projects.map((project, index) => (
              <article className="project-card" key={project.index} style={{ "--card-index": index }}>
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
          <div className="section-heading">
            <p className="label">Experience</p>
            <h2 id="experience-title">Where I’ve contributed</h2>
          </div>
          <div className="timeline">
            {experience.map((item) => (
              <article className="timeline-item" key={`${item.company}-${item.role}`}>
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
          <div className="section-heading">
            <p className="label">Focus</p>
            <h2 id="focus-title">Tools I reach for</h2>
          </div>
          <div className="focus-groups">
            {skills.filter((group) => ["Languages", "Systems", "Backend", "Databases"].includes(group.title)).map((group) => (
              <div className="focus-group" key={group.title}>
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
