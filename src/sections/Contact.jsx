function Contact() {
  return (
    <section id="contact" className="section-shell">
      <p className="section-label">Get In Touch</p>
      <div className="split-shell">
        <div>
          <h2 className="display-title">
            Let's <span className="outline-text">Build</span>
          </h2>
          <p className="body-copy">Contact links and CTA copy are scaffolded for the next phase.</p>
        </div>
        <form className="placeholder-form surface-a">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" placeholder="Your name" />
          <label htmlFor="email">Email</label>
          <input id="email" name="email" placeholder="your@email.com" />
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="4" placeholder="Tell me about your project..." />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  )
}

export default Contact