import { useEffect, useState } from 'react'
import { getStatsCacheKey, isFreshCache, isRateLimitError, readStatsCache, writeStatsCache } from '../utils/statsCache.js'

export const LEETCODE_STATS = {
  solved: { key: 'solved', label: 'Problems Solved' },
  easy: { key: 'easy', label: 'Easy' },
  medium: { key: 'medium', label: 'Medium' },
  hard: { key: 'hard', label: 'Hard' },
}

const LEETCODE_API_BASE_URL = 'https://alfa-leetcode-api.onrender.com'

function asNumber(value) {
  const numeric = Number(value)
  return Number.isFinite(numeric) ? numeric : 0
}

export function useLeetcodeStats(username) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username) {
      setLoading(false)
      setData(null)
      setError('Missing LeetCode username')
      return undefined
    }

    const cacheKey = getStatsCacheKey('leetcode', username)
    const cachedEntry = readStatsCache(cacheKey)

    if (cachedEntry?.data) {
      setData(cachedEntry.data)
      setLoading(!isFreshCache(cachedEntry))
      setError(null)
    }

    if (isFreshCache(cachedEntry)) {
      return undefined
    }

    const controller = new AbortController()

    async function loadLeetcodeStats() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`${LEETCODE_API_BASE_URL}/${username}/solved`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`LeetCode request failed with ${response.status}`)
        }

        const result = await response.json()

        if (typeof result !== 'object' || result === null) {
          throw new Error('LeetCode stats unavailable')
        }

        const nextData = {
          solved: asNumber(result.solvedProblem),
          easy: asNumber(result.easySolved),
          medium: asNumber(result.mediumSolved),
          hard: asNumber(result.hardSolved),
        }

        setData(nextData)
        writeStatsCache(cacheKey, nextData)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          const nextError = isRateLimitError(fetchError.message)
            ? 'LeetCode rate limit reached. Showing cached stats if available.'
            : fetchError.message

          setError(nextError)

          if (!cachedEntry?.data) {
            setData(null)
          }
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadLeetcodeStats()

    return () => controller.abort()
  }, [username])

  return { data, loading, error }
}
