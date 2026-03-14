import Navbar from './components/Navbar.jsx'
import Marquee from './components/Marquee.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import Projects from './sections/Projects.jsx'
import LiveStats from './sections/LiveStats.jsx'
import Contact from './sections/Contact.jsx'
import Footer from './sections/Footer.jsx'

function App() {
  return (
    <div className="app-shell surface-a">
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
