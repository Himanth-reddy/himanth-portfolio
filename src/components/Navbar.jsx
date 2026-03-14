import { useEffect, useState } from 'react'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const links = ['Home', 'About', 'Projects', 'Stats', 'Contact']

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
        YK<span>.</span>
      </a>

      <ul className="nav-links">
        {links.map((link) => (
          <li key={link} data-nav-item>
            <a href={`#${link.toLowerCase()}`}>{link}</a>
          </li>
        ))}
      </ul>

      <button className="nav-cta" type="button" data-nav-cta>
        Hire Me
      </button>
    </nav>
  )
}

export default Navbar