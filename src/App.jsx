import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import Cursor from './components/Cursor.jsx'
import Navbar from './components/Navbar.jsx'
import Marquee from './components/Marquee.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import Projects from './sections/Projects.jsx'
import LiveStats from './sections/LiveStats.jsx'
import Contact from './sections/Contact.jsx'
import Footer from './sections/Footer.jsx'

function App() {
  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const supportsHover = window.matchMedia('(hover: hover)').matches

    if (prefersReducedMotion) {
      return undefined
    }

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ delay: 0.1 })

      intro
        .fromTo(
          '[data-nav-logo]',
          { opacity: 0, y: -18 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        )
        .fromTo(
          '[data-nav-item]',
          { opacity: 0, y: -12 },
          { opacity: 1, y: 0, duration: 0.42, stagger: 0.08, ease: 'power3.out' },
          '-=0.25',
        )
        .fromTo(
          '[data-nav-cta]',
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.42, ease: 'power3.out' },
          '-=0.28',
        )
        .fromTo(
          '[data-hero-kicker]',
          { opacity: 0, yPercent: 125 },
          { opacity: 1, yPercent: 0, duration: 0.85, ease: 'power4.out' },
          '-=0.15',
        )
        .fromTo(
          '[data-hero-line]',
          { yPercent: 115 },
          { yPercent: 0, duration: 0.95, stagger: 0.17, ease: 'power4.out' },
          '-=0.35',
        )
        .fromTo(
          '[data-hero-meta]',
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          '-=0.38',
        )
        .fromTo(
          '[data-hero-terminal]',
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          '-=0.56',
        )

      gsap.to('.hero-orb-1', {
        y: -12,
        x: 7,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.to('.hero-orb-2', {
        y: -8,
        x: -5,
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.to('.hero-orb-3', {
        y: -14,
        x: 4,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      const onMove = (event) => {
        const x = (event.clientX / window.innerWidth - 0.5) * 30
        const y = (event.clientY / window.innerHeight - 0.5) * 20

        gsap.to('.hero-glow', {
          x,
          y,
          duration: 1.35,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }

      if (supportsHover) {
        window.addEventListener('mousemove', onMove)
      }

      return () => {
        if (supportsHover) {
          window.removeEventListener('mousemove', onMove)
        }
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="app-shell surface-a">
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <LiveStats />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
