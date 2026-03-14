import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { projectFilters, projects } from '../data/projects.js'

function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')
  const gridRef = useRef(null)

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return projects
    }

    return projects.filter((project) => project.category === activeFilter)
  }, [activeFilter])

  useLayoutEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.project-card')

    if (!cards || cards.length === 0) {
      return undefined
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 20, scale: 0.985 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.48,
          ease: 'power2.out',
          stagger: 0.07,
          clearProps: 'transform',
        },
      )
    })

    return () => ctx.revert()
  }, [visibleProjects])

  return (
    <section id="projects" className="section-shell">
      <p className="section-label">Selected Work</p>
      <div className="section-head-row projects-head">
        <h2 className="display-title projects-title">Projects</h2>
        <div className="filter-shell">
          {projectFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={activeFilter === filter.id ? 'is-active' : ''}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div ref={gridRef} className="project-grid grid-frame">
        {visibleProjects.map((project, index) => (
          <article key={project.id} className="project-card hov surface-a">
            <span className="project-card-bar" aria-hidden="true" />
            <p className="project-card-number">{String(index + 1).padStart(2, '0')}</p>
            <p className="project-card-type">{project.type}</p>
            <h3 className="project-card-title">{project.title}</h3>
            <p className="project-card-desc">{project.description}</p>

            <div className="project-tag-row">
              {project.tags.map((tag) => (
                <span key={`${project.id}-${tag}`} className="project-tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="project-link-row">
              {project.links.map((link) => (
                <a key={`${project.id}-${link.label}`} href={link.href}>
                  {link.label} {'->'}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects