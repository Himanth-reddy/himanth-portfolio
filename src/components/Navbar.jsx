import { useEffect, useState } from 'react'
import { siteContent } from '../data/siteContent.js'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const links = siteContent.navigation.links

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 18)
    }

    onScroll()
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav-shell ${isScrolled ? 'is-scrolled' : ''}`} aria-label="Primary">
      <a className="nav-logo" href="#hero" aria-label="Go to top" data-nav-logo>
        {siteContent.brand.shortName}
        <span>{siteContent.brand.mark}</span>
      </a>

      <ul className="nav-links">
        {links.map((link) => (
          <li key={link.label} data-nav-item>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>

      <a className="nav-cta" href={siteContent.navigation.cta.href} data-nav-cta>
        {siteContent.navigation.cta.label}
      </a>
    </nav>
  )
}

export default Navbar
