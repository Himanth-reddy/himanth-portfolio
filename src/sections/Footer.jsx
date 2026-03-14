import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { siteContent } from '../data/siteContent.js'

function Footer() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <footer ref={ref} className={`footer-shell reveal-section ${isVisible ? 'is-visible' : ''}`}>
      <p className="footer-logo">
        <span className="narrow-display">
          {siteContent.brand.shortName}
          <span>{siteContent.brand.mark}</span>
        </span>
      </p>
      <div className="footer-links">
        {siteContent.footer.links.map((link) => (
          <a key={link.label} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
      <p className="footer-copy">{siteContent.brand.footerCopy}</p>
    </footer>
  )
}

export default Footer
