function LiveStats() {
  return (
    <section id="stats" className="section-shell surface-b">
      <p className="section-label">Live Profiles</p>
      <div className="section-head-row">
        <h2 className="display-title">
          Coding
          <br />
          Stats
        </h2>
        <p className="body-copy">Real profile metrics and animated counters come next.</p>
      </div>
      <div className="stats-grid grid-frame">
        <article className="placeholder-block surface-b">GitHub card</article>
        <article className="placeholder-block surface-b">LeetCode card</article>
        <article className="placeholder-block surface-b">Kaggle card</article>
      </div>
    </section>
  )
}

export default LiveStats