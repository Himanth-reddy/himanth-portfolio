import { aboutContent, skillGroups } from '../data/skills.js'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

function About() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="about" ref={ref} className={`section-shell reveal-section ${isVisible ? 'is-visible' : ''}`}>
      <p className="section-label reveal-item">About Me</p>
      <div className="about-grid">
        <div className="about-copy-col reveal-item reveal-left">
          <h2 className="about-title reveal-item" style={{ transitionDelay: '0.06s' }}>
            {aboutContent.headingMain} <span className="outline-text">{aboutContent.headingAccent}</span>
            <br />
            {aboutContent.headingSuffix}
          </h2>

          {aboutContent.paragraphs.map((paragraph) => (
            <p key={paragraph} className="about-body reveal-item" style={{ transitionDelay: '0.12s' }}>
              {paragraph}
            </p>
          ))}

          <p className="about-now reveal-item" style={{ transitionDelay: '0.16s' }}>
            {aboutContent.nowText}
          </p>
        </div>

        <div className="about-skills-col reveal-item reveal-right" style={{ transitionDelay: '0.1s' }}>
          {skillGroups.map((group) => (
            <div key={group.category}>
              <p className="skill-category">{group.category}</p>
              <div className="skill-row">
                {group.items.map((item) => (
                  <span
                    key={`${group.category}-${item.name}`}
                    className={`skill-badge ${item.hot ? 'is-hot' : ''}`}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About