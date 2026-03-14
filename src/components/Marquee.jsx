function Marquee() {
  const items = [
    'React',
    'Machine Learning',
    'Kaggle Top 12%',
    'PyTorch',
    'Open to Opportunities',
    'Tailwind CSS',
    'NLP & Transformers',
  ]

  return (
    <section className="marquee-shell" aria-label="Skills ticker">
      <div className="marquee-track">
        {items.map((item) => (
          <span key={item} className="marquee-item">
            <span>+</span>
            {item}
          </span>
        ))}
      </div>
    </section>
  )
}

export default Marquee