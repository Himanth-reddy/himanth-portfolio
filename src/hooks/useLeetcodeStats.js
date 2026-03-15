import { useEffect, useState } from 'react'

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

        setData({
          solved: asNumber(result.solvedProblem),
          easy: asNumber(result.easySolved),
          medium: asNumber(result.mediumSolved),
          hard: asNumber(result.hardSolved),
        })
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message)
          setData(null)
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
