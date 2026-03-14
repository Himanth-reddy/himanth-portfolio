import { useEffect, useState } from 'react'
import { statsCards, statsProfile, statsSectionContent } from '../data/stats.js'
import { useGithubStats } from '../hooks/useGithubStats.js'
import { useLeetcodeStats } from '../hooks/useLeetcodeStats.js'
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
  const githubResult = useGithubStats(statsProfile.githubUsername)
  const leetcodeResult = useLeetcodeStats(statsProfile.leetcodeUsername)

  const githubValue = githubResult.data?.publicRepos ?? statsCards.github.fallbackValue
  const githubSubStats = githubResult.data
    ? [
        { label: 'Followers', value: githubResult.data.followers },
        { label: 'Following', value: githubResult.data.following },
        { label: 'Gists', value: githubResult.data.gists },
      ]
    : statsCards.github.fallbackSubStats

  const leetcodeValue = leetcodeResult.data?.solved ?? statsCards.leetcode.fallbackValue
  const leetcodeSubStats = leetcodeResult.data
    ? [
        { label: 'Easy', value: leetcodeResult.data.easy },
        { label: 'Medium', value: leetcodeResult.data.medium },
        { label: 'Hard', value: leetcodeResult.data.hard },
      ]
    : statsCards.leetcode.fallbackSubStats

  const ghAnimated = useCountUp(githubValue, isVisible)
  const lcAnimated = useCountUp(leetcodeValue, isVisible)

  return (
    <section id="stats" ref={ref} className={`section-shell stats-shell ${isVisible ? 'is-visible' : ''}`}>
      <p className="section-label">{statsSectionContent.label}</p>

      <div className="section-head-row stats-head-row">
        <h2 className="display-title stats-title">
          {statsSectionContent.titleTop}
          <br />
          {statsSectionContent.titleBottom}
        </h2>
        <p className="body-copy stats-copy">{statsSectionContent.description}</p>
      </div>

      <div className="stats-grid grid-frame">
        <article className="stats-card surface-b">
          <div className="stats-card-top">
            <div className="stats-platform-row">
              <span className={`stats-platform-icon ${statsCards.github.colorClass}`}>{statsCards.github.short}</span>
              <span className="stats-platform-name">{statsCards.github.name}</span>
            </div>
            <span className="live-pill">Live</span>
          </div>

          <p className={`stats-primary ${statsCards.github.colorClass}`}>{ghAnimated}</p>
          <p className="stats-primary-label">{statsCards.github.primaryLabel}</p>

          <div className="stats-sub-row">
            {githubSubStats.map((item) => (
              <p key={`gh-${item.label}`} className="stats-sub-item">
                <strong>{item.value}</strong>
                {item.label}
              </p>
            ))}
          </div>

          <div className="stats-progress-track">
            <span
              className="stats-progress-fill"
              style={{ width: isVisible ? `${statsCards.github.progress}%` : '0%' }}
            />
          </div>
        </article>

        <article className="stats-card surface-b">
          <div className="stats-card-top">
            <div className="stats-platform-row">
              <span className={`stats-platform-icon ${statsCards.leetcode.colorClass}`}>
                {statsCards.leetcode.short}
              </span>
              <span className="stats-platform-name">{statsCards.leetcode.name}</span>
            </div>
            <span className="live-pill">Live</span>
          </div>

          <p className={`stats-primary ${statsCards.leetcode.colorClass}`}>{lcAnimated}</p>
          <p className="stats-primary-label">{statsCards.leetcode.primaryLabel}</p>

          <div className="stats-sub-row">
            {leetcodeSubStats.map((item) => (
              <p key={`lc-${item.label}`} className="stats-sub-item">
                <strong>{item.value}</strong>
                {item.label}
              </p>
            ))}
          </div>

          <div className="stats-progress-track">
            <span
              className="stats-progress-fill"
              style={{ width: isVisible ? `${statsCards.leetcode.progress}%` : '0%' }}
            />
          </div>
        </article>

        <article className="stats-card surface-b">
          <div className="stats-card-top">
            <div className="stats-platform-row">
              <span className={`stats-platform-icon ${statsCards.kaggle.colorClass}`}>{statsCards.kaggle.short}</span>
              <span className="stats-platform-name">{statsCards.kaggle.name}</span>
            </div>
            <span className="live-pill">Live</span>
          </div>

          <p className={`stats-primary stats-primary-text ${statsCards.kaggle.colorClass}`}>
            {statsCards.kaggle.primaryText}
          </p>
          <p className="stats-primary-label">{statsCards.kaggle.primaryLabel}</p>

          <div className="stats-sub-row">
            {statsCards.kaggle.subStats.map((item) => (
              <p key={`kg-${item.label}`} className="stats-sub-item">
                <strong>{item.value}</strong>
                {item.label}
              </p>
            ))}
          </div>

          <div className="stats-progress-track">
            <span
              className="stats-progress-fill"
              style={{ width: isVisible ? `${statsCards.kaggle.progress}%` : '0%' }}
            />
          </div>
        </article>
      </div>
    </section>
  )
}

export default LiveStats