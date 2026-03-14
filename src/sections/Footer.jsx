import { useScrollReveal } from '../hooks/useScrollReveal.js'

function Footer() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <footer ref={ref} className={`footer-shell reveal-section ${isVisible ? 'is-visible' : ''}`}>
      <p className="footer-logo">
        YK<span>.</span>
      </p>
      <div className="footer-links">
        <a href="#">GitHub</a>
        <a href="#">LinkedIn</a>
        <a href="#">Kaggle</a>
      </div>
      <p className="footer-copy">Copyright 2026. Built with React + Tailwind.</p>
    </footer>
  )
}

export default Footer