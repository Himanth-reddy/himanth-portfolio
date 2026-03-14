function Hero() {
  return (
    <section id="hero" className="hero-shell section-shell">
      <div className="hero-glow" aria-hidden="true" />
      <span className="hero-orb hero-orb-1" aria-hidden="true" />
      <span className="hero-orb hero-orb-2" aria-hidden="true" />
      <span className="hero-orb hero-orb-3" aria-hidden="true" />

      <p className="hero-kicker" data-hero-kicker>
        Available for internships and freelance
      </p>

      <h1 className="hero-title">
        <span className="hero-line">
          <span data-hero-line>Building</span>
        </span>
        <span className="hero-line hero-line-offset">
          <span data-hero-line>Things That</span>
        </span>
        <span className="hero-line">
          <span className="outline-text" data-hero-line>
            Learn.
          </span>
        </span>
      </h1>

      <div className="hero-meta-grid grid-frame">
        <div className="hero-meta-card surface-a" data-hero-meta>
          <p className="body-copy">
            AIML student crafting intelligent models and bold web experiences.
          </p>
        </div>
        <div className="hero-meta-card surface-b" data-hero-terminal>
          <p className="hero-terminal-title">~/portfolio</p>
          <p className="hero-terminal-line">&gt; whoami</p>
          <p className="hero-terminal-line">AIML student @ Warangal, India</p>
        </div>
      </div>
    </section>
  )
}

export default Hero