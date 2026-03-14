import { useEffect, useState } from 'react'

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

        const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`LeetCode request failed with ${response.status}`)
        }

        const result = await response.json()

        if (result?.status === 'error') {
          throw new Error(result.message || 'LeetCode stats unavailable')
        }

        setData({
          solved: asNumber(result.totalSolved),
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