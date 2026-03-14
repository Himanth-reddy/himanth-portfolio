function Projects() {
  return (
    <section id="projects" className="section-shell">
      <p className="section-label">Selected Work</p>
      <div className="section-head-row">
        <h2 className="display-title">Projects</h2>
        <div className="filter-shell">
          <button type="button">All</button>
          <button type="button">ML / AI</button>
          <button type="button">React</button>
        </div>
      </div>
      <div className="project-grid grid-frame">
        <article className="placeholder-block surface-a">Project card 01</article>
        <article className="placeholder-block surface-a">Project card 02</article>
        <article className="placeholder-block surface-a">Project card 03</article>
      </div>
    </section>
  )
}

export default Projects