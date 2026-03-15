import { useEffect, useState } from 'react'
import { heroActionLinks } from '../data/contact.js'
import { siteContent } from '../data/siteContent.js'

function Hero() {
  const [visibleCommand, setVisibleCommand] = useState('')
  const [visibleTerminalLines, setVisibleTerminalLines] = useState([])
  const [isPlaybackComplete, setIsPlaybackComplete] = useState(false)
  const [showCommandCaret, setShowCommandCaret] = useState(false)
  const heroTitleLines = siteContent.hero.titleLines.map((line) =>
    typeof line === 'string' ? { text: line, style: 'solid', offset: false } : line,
  )
  const terminalCommand = siteContent.hero.terminal.command
  const terminalLines = siteContent.hero.terminal.output

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      const timer = window.setTimeout(() => {
        setVisibleCommand(terminalCommand)
        setVisibleTerminalLines(terminalLines)
        setIsPlaybackComplete(true)
        setShowCommandCaret(false)
      }, 0)

      return () => window.clearTimeout(timer)
    }

    const timers = []
    const commandStepDelay = 90
    const lineStepDelay = 42
    const linePauseDelay = 220
    let hasStarted = false

    const startTerminalPlayback = () => {
      if (hasStarted) {
        return
      }

      hasStarted = true
      setShowCommandCaret(true)

      timers.push(
        window.setTimeout(() => {
          setVisibleCommand('')
        }, 0),
      )

      terminalCommand.split('').forEach((_, index) => {
        timers.push(
          window.setTimeout(() => {
            setVisibleCommand(terminalCommand.slice(0, index + 1))
          }, (index + 1) * commandStepDelay),
        )
      })

      let nextLineDelay = (terminalCommand.length + 1) * commandStepDelay + 360

      timers.push(
        window.setTimeout(() => {
          setShowCommandCaret(false)
        }, nextLineDelay),
      )

      terminalLines.forEach((line, lineIndex) => {
        const totalChars = line.accent.length + line.detail.length

        timers.push(
          window.setTimeout(() => {
            setVisibleTerminalLines((currentLines) => [
              ...currentLines,
              { accent: '', detail: '', accentColor: line.accentColor },
            ])
          }, nextLineDelay),
        )

        for (let charIndex = 1; charIndex <= totalChars; charIndex += 1) {
          timers.push(
            window.setTimeout(() => {
              const accentChars = Math.min(charIndex, line.accent.length)
              const detailChars = Math.max(charIndex - line.accent.length, 0)

              setVisibleTerminalLines((currentLines) =>
                currentLines.map((currentLine, currentIndex) =>
                  currentIndex === lineIndex
                    ? {
                        accent: line.accent.slice(0, accentChars),
                        detail: line.detail.slice(0, detailChars),
                        accentColor: line.accentColor,
                      }
                    : currentLine,
                ),
              )
            }, nextLineDelay + charIndex * lineStepDelay),
          )
        }

        nextLineDelay += totalChars * lineStepDelay + linePauseDelay
      })

      timers.push(
        window.setTimeout(() => {
          setIsPlaybackComplete(true)
        }, nextLineDelay),
      )
    }

    window.addEventListener('hero-terminal-ready', startTerminalPlayback)

    return () => {
      window.removeEventListener('hero-terminal-ready', startTerminalPlayback)
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [terminalCommand, terminalLines])

  return (
    <section id="hero" className="hero-shell section-shell">
      <div className="hero-glow" aria-hidden="true" />

      <p className="hero-kicker" data-hero-kicker>
        {siteContent.hero.kicker}
      </p>

      <h1 className="hero-title">
        {heroTitleLines.map((line, index) => (
          <span key={`${line.text}-${index}`} className={`hero-line ${line.offset ? 'hero-line-offset' : ''}`}>
            <span className="hero-line-text">
              <span className={line.style === 'outline' ? 'outline-text' : ''} data-hero-line>
                {line.text}
              </span>
            </span>
          </span>
        ))}
      </h1>

      <div className="hero-meta-grid">
        <div className="hero-meta-card" data-hero-meta>
          <p className="body-copy">{siteContent.hero.description}</p>
          <div className="hero-actions">
            <a className="hero-action hero-action-primary hov" href={heroActionLinks.work}>
              {siteContent.hero.actions.primary.label}
            </a>
            <a
              className="hero-action hero-action-secondary hov"
              href={heroActionLinks.cv}
              download="Himanth's Resume.pdf"
            >
              {siteContent.hero.actions.secondary.label}
            </a>
          </div>
        </div>
        <div className="hero-meta-card" data-hero-terminal>
          <div className="hero-terminal-head">
            <span className="hero-terminal-dot hero-terminal-dot-red" aria-hidden="true" />
            <span className="hero-terminal-dot hero-terminal-dot-amber" aria-hidden="true" />
            <span className="hero-terminal-dot hero-terminal-dot-green" aria-hidden="true" />
            <p className="hero-terminal-title">{siteContent.hero.terminal.path}</p>
          </div>
          <p className="hero-terminal-line">
            <span className="hero-terminal-prompt">›</span>
            <span className="hero-terminal-detail">{visibleCommand}</span>
            {showCommandCaret ? <span className="hero-terminal-caret" /> : null}
          </p>
          {visibleTerminalLines.map((line, index) => (
            <p key={`${siteContent.hero.terminal.path}-${index}`} className="hero-terminal-line">
              <span className="hero-terminal-prompt">›</span>
              <span className={`hero-terminal-accent hero-terminal-accent-${line.accentColor}`}>{line.accent}</span>
              {line.detail ? <span className="hero-terminal-detail">{line.detail}</span> : null}
            </p>
          ))}
          {isPlaybackComplete ? (
            <p className="hero-terminal-line" aria-hidden="true">
              <span className="hero-terminal-prompt">›</span>
              <span className="hero-terminal-caret" />
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default Hero
