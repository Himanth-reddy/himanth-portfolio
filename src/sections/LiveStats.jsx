import { useEffect, useRef, useState } from 'react'
import { statsCards, statsProfile, statsSectionContent } from '../data/stats.js'
import { useGithubStats } from '../hooks/useGithubStats.js'
import { useLeetcodeStats } from '../hooks/useLeetcodeStats.js'
import { siteContent } from '../data/siteContent.js'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

function useCountUp(target, isVisible) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isVisible) {
      return undefined
    }

    const duration = 1200
    let frameId = 0
    let startTime = null

    const step = (time) => {
      if (startTime === null) {
        startTime = time
      }

      const progress = Math.min((time - startTime) / duration, 1)
      setValue(Math.round(progress * target))

      if (progress < 1) {
        frameId = window.requestAnimationFrame(step)
      }
    }

    frameId = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(frameId)
  }, [isVisible, target])

  return value
}

function LiveStats() {
  const { ref, isVisible } = useScrollReveal()
  const gridRef = useRef(null)
  const scrollStateRef = useRef({ frameId: 0, currentLeft: 0, targetLeft: 0 })
  const githubResult = useGithubStats(statsProfile.githubUsername)
  const leetcodeResult = useLeetcodeStats(statsProfile.leetcodeUsername)
  const githubCard = statsCards.find((card) => card.id === 'github')
  const leetcodeCard = statsCards.find((card) => card.id === 'leetcode')

  const githubMetrics = githubResult.data ?? githubCard?.fallbackMetrics ?? {}
  const leetcodeMetrics = leetcodeResult.data ?? leetcodeCard?.fallbackMetrics ?? {}

  const ghAnimated = useCountUp(githubMetrics[githubCard?.primaryStat.key] ?? 0, isVisible)
  const lcAnimated = useCountUp(leetcodeMetrics[leetcodeCard?.primaryStat.key] ?? 0, isVisible)

  const renderedStatsCards = statsCards.map((card) => {
    if (card.source === 'github') {
      return {
        ...card,
        displayValue: ghAnimated,
        primaryLabel: card.primaryStat.label,
        subStats: card.subStats.map((stat) => ({
          label: stat.label,
          value: githubMetrics[stat.key] ?? 0,
        })),
        isTextValue: false,
      }
    }

    if (card.source === 'leetcode') {
      return {
        ...card,
        displayValue: lcAnimated,
        primaryLabel: card.primaryStat.label,
        subStats: card.subStats.map((stat) => ({
          label: stat.label,
          value: leetcodeMetrics[stat.key] ?? 0,
        })),
        isTextValue: false,
      }
    }

    return {
      ...card,
      displayValue: card.primaryText ?? card.fallbackValue ?? 0,
      subStats: card.subStats ?? card.fallbackSubStats ?? [],
      isTextValue: Boolean(card.primaryText),
    }
  })

  useEffect(() => {
    const node = gridRef.current

    if (!node || renderedStatsCards.length <= 3) {
      return undefined
    }

    const scrollState = scrollStateRef.current
    scrollState.currentLeft = node.scrollLeft
    scrollState.targetLeft = node.scrollLeft

    const animate = () => {
      scrollState.currentLeft += (scrollState.targetLeft - scrollState.currentLeft) * 0.12

      if (Math.abs(scrollState.targetLeft - scrollState.currentLeft) < 0.5) {
        scrollState.currentLeft = scrollState.targetLeft
      } else {
        scrollState.frameId = window.requestAnimationFrame(animate)
      }

      node.scrollLeft = scrollState.currentLeft
    }

    const startAnimation = () => {
      if (scrollState.frameId) {
        return
      }

      scrollState.frameId = window.requestAnimationFrame(() => {
        scrollState.frameId = 0
        animate()
      })
    }

    const onWheel = (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
        return
      }

      event.preventDefault()

      const maxScroll = node.scrollWidth - node.clientWidth
      scrollState.targetLeft = Math.max(0, Math.min(maxScroll, scrollState.targetLeft + event.deltaY))
      startAnimation()
    }

    node.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      node.removeEventListener('wheel', onWheel)
      if (scrollState.frameId) {
        window.cancelAnimationFrame(scrollState.frameId)
        scrollState.frameId = 0
      }
    }
  }, [renderedStatsCards.length])

  const scrollStats = () => {
    const node = gridRef.current

    if (!node || renderedStatsCards.length <= 3) {
      return
    }

    const firstCard = node.querySelector('.stats-card')
    const cardWidth = firstCard instanceof HTMLElement ? firstCard.offsetWidth : node.clientWidth / 3
    node.scrollBy({
      left: cardWidth + 1,
      behavior: 'smooth',
    })
  }

  return (
    <section
      id="stats"
      ref={ref}
      className={`section-shell stats-shell reveal-section ${isVisible ? 'is-visible' : ''}`}
    >
      <p className="section-label reveal-item">{statsSectionContent.label}</p>

      <div className="section-head-row stats-head-row reveal-item" style={{ transitionDelay: '0.06s' }}>
        <h2 className="display-title stats-title">
          <span className="narrow-display">
            {statsSectionContent.titleTop}
            <br />
            {statsSectionContent.titleBottom}
          </span>
        </h2>
        <div className="projects-controls">
          <p className="body-copy stats-copy">{statsSectionContent.description}</p>
          <button type="button" className="project-scroll-btn hov" onClick={scrollStats} aria-label="Next stats tile">
            {'->'}
          </button>
        </div>
      </div>

      <div
        ref={gridRef}
        className={`stats-grid reveal-item ${renderedStatsCards.length > 3 ? 'stats-grid-scroll' : 'grid-frame'}`}
        style={{ transitionDelay: '0.12s' }}
      >
        {renderedStatsCards.map((card) => {
          const CardTag = card.href ? 'a' : 'article'

          return (
            <CardTag
              key={card.id}
              className={`stats-card surface-b ${card.href ? 'hov' : ''}`}
              href={card.href}
              target={card.href ? '_blank' : undefined}
              rel={card.href ? 'noreferrer' : undefined}
            >
              <span className="stats-card-bar" aria-hidden="true" />
              <div className="stats-card-top">
                <div className="stats-platform-row">
                  <span className={`stats-platform-icon ${card.colorClass}`}>{card.short}</span>
                  <span className="stats-platform-name">{card.name}</span>
                </div>
                <span className="live-pill">Live</span>
              </div>

              <p className={`stats-primary ${card.isTextValue ? 'stats-primary-text' : ''} ${card.colorClass}`}>
                <span className="narrow-display">{card.displayValue}</span>
              </p>
              <p className="stats-primary-label">{card.primaryLabel}</p>

              <div className="stats-sub-row">
                {card.subStats.map((item) => (
                  <p key={`${card.id}-${item.label}`} className="stats-sub-item">
                    <strong>
                      <span className="narrow-display">{item.value}</span>
                    </strong>
                    {item.label}
                  </p>
                ))}
              </div>

              <div className="stats-progress-track">
                <span className="stats-progress-fill" style={{ width: isVisible ? `${card.progress}%` : '0%' }} />
              </div>
            </CardTag>
          )
        })}
      </div>
    </section>
  )
}

export default LiveStats
