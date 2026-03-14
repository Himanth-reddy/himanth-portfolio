import { useMemo, useState } from 'react'
import emailjs from '@emailjs/browser'
import { contactFormFields, contactLinks, contactSectionContent } from '../data/contact.js'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

const INITIAL_FORM = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

function Contact() {
  const { ref, isVisible } = useScrollReveal()
  const [form, setForm] = useState(INITIAL_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState({ type: 'idle', message: '' })

  const envConfig = useMemo(
    () => ({
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    }),
    [],
  )

  const onFieldChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    if (!envConfig.serviceId || !envConfig.templateId || !envConfig.publicKey) {
      setStatus({
        type: 'error',
        message:
          'Email service is not configured. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY to your .env file.',
      })
      return
    }

    try {
      setIsSubmitting(true)
      setStatus({ type: 'idle', message: '' })

      await emailjs.send(
        envConfig.serviceId,
        envConfig.templateId,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        { publicKey: envConfig.publicKey },
      )

      setStatus({ type: 'success', message: 'Message sent successfully. I will reply soon.' })
      setForm(INITIAL_FORM)
    } catch {
      setStatus({
        type: 'error',
        message: 'Message failed to send. Please try again or use one of the social links.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className={`section-shell contact-shell reveal-section ${isVisible ? 'is-visible' : ''}`}
    >
      <p className="section-label reveal-item">{contactSectionContent.label}</p>
      <div className="contact-grid">
        <div className="contact-copy-col reveal-item reveal-left" style={{ transitionDelay: '0.07s' }}>
          <h2 className="contact-title">
            {contactSectionContent.titleTop}
            <br />
            <span className="outline-text">{contactSectionContent.titleAccent}</span>
            <br />
            {contactSectionContent.titleBottom}
          </h2>

          <p className="contact-copy">{contactSectionContent.description}</p>

          <div className="contact-links-col">
            {contactLinks.map((link) => (
              <a key={link.id} className="contact-link hov" href={link.href} target="_blank" rel="noreferrer">
                <span className="contact-link-icon">{link.icon}</span>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <form
          className="contact-form reveal-item reveal-right"
          style={{ transitionDelay: '0.12s' }}
          onSubmit={onSubmit}
        >
          <div className="contact-form-row">
            {contactFormFields.slice(0, 2).map((field) => (
              <label key={field.id} htmlFor={field.id} className="contact-field">
                <span>{field.label}</span>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  value={form[field.id]}
                  onChange={onFieldChange}
                  required
                  placeholder={field.placeholder}
                />
              </label>
            ))}
          </div>

          <label htmlFor="subject" className="contact-field">
            <span>Subject</span>
            <input
              id="subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={onFieldChange}
              required
              placeholder={contactFormFields[2].placeholder}
            />
          </label>

          <label htmlFor="message" className="contact-field">
            <span>Message</span>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={form.message}
              onChange={onFieldChange}
              required
              placeholder={contactFormFields[3].placeholder}
            />
          </label>

          <button className="contact-submit hov" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message ->'}
          </button>

          {status.message ? (
            <p className={`contact-status ${status.type === 'error' ? 'is-error' : 'is-success'}`}>
              {status.message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  )
}

export default Contact