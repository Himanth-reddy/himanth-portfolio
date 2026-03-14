import { heroActionLinks } from '../data/contact.js'
import { siteContent } from '../data/siteContent.js'

function Hero() {
  const heroTitleLines = siteContent.hero.titleLines.map((line) =>
    typeof line === 'string' ? { text: line, style: 'solid', offset: false } : line,
  )

  return (
    <section id="hero" className="hero-shell section-shell">
      <div className="hero-glow" aria-hidden="true" />

      <p className="hero-kicker" data-hero-kicker>
        {siteContent.hero.kicker}
      </p>

      <h1 className="hero-title">
        {heroTitleLines.map((line, index) => (
          <span key={`${line.text}-${index}`} className={`hero-line ${line.offset ? 'hero-line-offset' : ''}`}>
            <span className="hero-line-text">
              <span className={line.style === 'outline' ? 'outline-text' : ''} data-hero-line>
                {line.text}
              </span>
            </span>
          </span>
        ))}
      </h1>

      <div className="hero-meta-grid">
        <div className="hero-meta-card" data-hero-meta>
          <p className="body-copy">{siteContent.hero.description}</p>
          <div className="hero-actions">
            <a className="hero-action hero-action-primary hov" href={heroActionLinks.work}>
              {siteContent.hero.actions.primary.label}
            </a>
            <a
              className="hero-action hero-action-secondary hov"
              href={heroActionLinks.cv}
              target="_blank"
              rel="noreferrer"
            >
              {siteContent.hero.actions.secondary.label}
            </a>
          </div>
        </div>
        <div className="hero-meta-card" data-hero-terminal>
          <div className="hero-terminal-head">
            <span className="hero-terminal-dot hero-terminal-dot-red" aria-hidden="true" />
            <span className="hero-terminal-dot hero-terminal-dot-amber" aria-hidden="true" />
            <span className="hero-terminal-dot hero-terminal-dot-green" aria-hidden="true" />
            <p className="hero-terminal-title">{siteContent.hero.terminal.path}</p>
          </div>
          <p className="hero-terminal-line">{siteContent.hero.terminal.command}</p>
          {siteContent.hero.terminal.output.map((line, index) => (
            <p key={`${siteContent.hero.terminal.path}-${index}`} className="hero-terminal-line">
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
