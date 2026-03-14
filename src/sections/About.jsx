import { aboutContent, skillGroups } from '../data/skills.js'

function About() {
  return (
    <section id="about" className="section-shell">
      <p className="section-label">About Me</p>
      <div className="about-grid">
        <div className="about-copy-col">
          <h2 className="about-title">
            {aboutContent.headingMain} <span className="outline-text">{aboutContent.headingAccent}</span>
            <br />
            {aboutContent.headingSuffix}
          </h2>

          {aboutContent.paragraphs.map((paragraph) => (
            <p key={paragraph} className="about-body">
              {paragraph}
            </p>
          ))}

          <p className="about-now">{aboutContent.nowText}</p>
        </div>

        <div className="about-skills-col">
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