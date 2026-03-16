import { useMemo, useState } from 'react'
import emailjs from '@emailjs/browser'
import { contactFormFields, contactLinks, contactSectionContent } from '../data/contact.js'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

const MESSAGE_RATE_LIMIT_WINDOW_MS = 30 * 60 * 1000
const MESSAGE_RATE_LIMIT_STORAGE_KEY = 'contact-message-rate-limit-v1'

const INITIAL_FORM = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

function normalizeMessageForRateLimit(message) {
  return message.trim().replace(/\s+/g, ' ').toLowerCase()
}

function hashMessage(message) {
  let hash = 0

  for (let index = 0; index < message.length; index += 1) {
    hash = (hash << 5) - hash + message.charCodeAt(index)
    hash |= 0
  }

  return String(hash)
}

function readRateLimitStore() {
  if (typeof window === 'undefined') {
    return {}
  }

  try {
    const raw = window.localStorage.getItem(MESSAGE_RATE_LIMIT_STORAGE_KEY)

    if (!raw) {
      return {}
    }

    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function writeRateLimitStore(store) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(MESSAGE_RATE_LIMIT_STORAGE_KEY, JSON.stringify(store))
}

function pruneExpiredRateLimits(store, now) {
  return Object.fromEntries(
    Object.entries(store).filter(([, timestamp]) => now - Number(timestamp) < MESSAGE_RATE_LIMIT_WINDOW_MS),
  )
}

function formatRemainingWaitTime(remainingMs) {
  const totalMinutes = Math.ceil(remainingMs / (60 * 1000))

  if (totalMinutes < 60) {
    return `${totalMinutes} minute${totalMinutes === 1 ? '' : 's'}`
  }

  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (minutes === 0) {
    return `${hours} hour${hours === 1 ? '' : 's'}`
  }

  return `${hours} hour${hours === 1 ? '' : 's'} ${minutes} minute${minutes === 1 ? '' : 's'}`
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

      const normalizedMessage = normalizeMessageForRateLimit(form.message)
      const messageKey = hashMessage(normalizedMessage)
      const now = Date.now()
      const rateLimitStore = pruneExpiredRateLimits(readRateLimitStore(), now)
      const lastSentAt = Number(rateLimitStore[messageKey] ?? 0)

      if (lastSentAt && now - lastSentAt < MESSAGE_RATE_LIMIT_WINDOW_MS) {
        const remainingMs = MESSAGE_RATE_LIMIT_WINDOW_MS - (now - lastSentAt)

        writeRateLimitStore(rateLimitStore)
        setStatus({
          type: 'error',
          message: `This message was already sent recently. Try again in ${formatRemainingWaitTime(remainingMs)}.`,
        })
        return
      }

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

      writeRateLimitStore({
        ...rateLimitStore,
        [messageKey]: now,
      })
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
            <span className="narrow-display">
              {contactSectionContent.titleTop}
              <br />
              <span className="outline-text">{contactSectionContent.titleAccent}</span>
              <br />
              {contactSectionContent.titleBottom}
            </span>
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
            {isSubmitting ? 'Sending...' : status.type === 'success' ? 'Message Sent' : 'Send Message ->'}
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
