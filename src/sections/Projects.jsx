import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { projectFilters, projects } from '../data/projects.js'
import { siteContent } from '../data/siteContent.js'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

function Projects() {
  const { ref, isVisible } = useScrollReveal()
  const [activeFilter, setActiveFilter] = useState('all')
  const gridRef = useRef(null)
  const scrollStateRef = useRef({ frameId: 0, currentLeft: 0, targetLeft: 0 })

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return projects
    }

    return projects.filter((project) => project.category === activeFilter)
  }, [activeFilter])

  const paddedProjects = useMemo(() => {
    if (visibleProjects.length >= 3) {
      return visibleProjects
    }

    return [
      ...visibleProjects,
      ...Array.from({ length: 3 - visibleProjects.length }, (_, index) => ({
        id: `placeholder-${activeFilter}-${index}`,
        isPlaceholder: true,
      })),
    ]
  }, [activeFilter, visibleProjects])

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

  useEffect(() => {
    const node = gridRef.current

    if (!node || visibleProjects.length <= 3) {
      return undefined
    }

    const scrollState = scrollStateRef.current
    scrollState.currentLeft = node.scrollLeft
    scrollState.targetLeft = node.scrollLeft

    const animate = () => {
      scrollState.currentLeft += (scrollState.targetLeft - scrollState.currentLeft) * 0.12

      if (Math.abs(scrollState.targetLeft - scrollState.currentLeft) < 0.5) {
        scrollState.currentLeft = scrollState.targetLeft
      } else {
        scrollState.frameId = window.requestAnimationFrame(animate)
      }

      node.scrollLeft = scrollState.currentLeft
    }

    const startAnimation = () => {
      if (scrollState.frameId) {
        return
      }

      scrollState.frameId = window.requestAnimationFrame(() => {
        scrollState.frameId = 0
        animate()
      })
    }

    const onWheel = (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
        return
      }

      event.preventDefault()

      const maxScroll = node.scrollWidth - node.clientWidth
      scrollState.targetLeft = Math.max(0, Math.min(maxScroll, scrollState.targetLeft + event.deltaY))
      startAnimation()
    }

    node.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      node.removeEventListener('wheel', onWheel)
      if (scrollState.frameId) {
        window.cancelAnimationFrame(scrollState.frameId)
        scrollState.frameId = 0
      }
    }
  }, [visibleProjects.length])

  const scrollProjects = () => {
    const node = gridRef.current

    if (!node || visibleProjects.length <= 3) {
      return
    }

    const firstCard = node.querySelector('.project-card')
    const cardWidth = firstCard instanceof HTMLElement ? firstCard.offsetWidth : node.clientWidth / 3
    node.scrollBy({
      left: cardWidth + 1,
      behavior: 'smooth',
    })
  }

  return (
    <section
      id="projects"
      ref={ref}
      className={`section-shell reveal-section ${isVisible ? 'is-visible' : ''}`}
    >
      <p className="section-label reveal-item">{siteContent.projects.sectionLabel}</p>
      <div className="section-head-row projects-head reveal-item" style={{ transitionDelay: '0.06s' }}>
        <h2 className="display-title projects-title">
          <span className="narrow-display">{siteContent.projects.title}</span>
        </h2>
        <div className="projects-controls">
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
          <button type="button" className="project-scroll-btn hov" onClick={scrollProjects} aria-label="Next project">
            {'->'}
          </button>
        </div>
      </div>

      <div
        ref={gridRef}
        className={`project-grid reveal-item ${visibleProjects.length > 3 ? 'project-grid-scroll' : 'grid-frame'}`}
        style={{ transitionDelay: '0.12s' }}
      >
        {paddedProjects.map((project, index) =>
          project.isPlaceholder ? (
            <article key={project.id} className="project-card project-card-placeholder" aria-hidden="true" />
          ) : (
            <article key={project.id} className="project-card surface-a">
              <span className="project-card-bar" aria-hidden="true" />
              <p className="project-card-number">
                <span className="narrow-display">{String(index + 1).padStart(2, '0')}</span>
              </p>
              <p className="project-card-type">{project.type}</p>
              <h3 className="project-card-title">
                <span className="narrow-display">{project.title}</span>
              </h3>
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
          ),
        )}
      </div>
    </section>
  )
}

export default Projects
