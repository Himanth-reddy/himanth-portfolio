function Navbar() {
  const links = ['Home', 'About', 'Projects', 'Stats', 'Contact']

  return (
    <nav className="nav-shell" aria-label="Primary">
      <a className="nav-logo" href="#hero" aria-label="Go to top">
        YK<span>.</span>
      </a>

      <ul className="nav-links">
        {links.map((link) => (
          <li key={link}>
            <a href={`#${link.toLowerCase()}`}>{link}</a>
          </li>
        ))}
      </ul>

      <button className="nav-cta" type="button">
        Hire Me
      </button>
    </nav>
  )
}

export default Navbar