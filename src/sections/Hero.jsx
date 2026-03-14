function Hero() {
  return (
    <section id="hero" className="hero-shell section-shell">
      <p className="hero-kicker">Available for internships and freelance</p>

      <h1 className="hero-title">
        <span>Building</span>
        <span>Things That</span>
        <span className="outline-text">Learn.</span>
      </h1>

      <div className="hero-meta-grid grid-frame">
        <div className="hero-meta-card surface-a">
          <p className="body-copy">
            AIML student crafting intelligent models and bold web experiences.
          </p>
        </div>
        <div className="hero-meta-card surface-b">
          <p className="hero-terminal-title">~/portfolio</p>
          <p className="hero-terminal-line">&gt; whoami</p>
          <p className="hero-terminal-line">AIML student @ Warangal, India</p>
        </div>
      </div>
    </section>
  )
}

export default Hero