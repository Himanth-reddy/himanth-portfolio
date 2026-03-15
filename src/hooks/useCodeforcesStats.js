import { useEffect, useState } from 'react'

export const CODEFORCES_STATS = {
  rank: { key: 'rank', label: 'Current Rank' },
  rating: { key: 'rating', label: 'Rating' },
  contests: { key: 'contests', label: 'Contests' },
  bestRating: { key: 'bestRating', label: 'Best Rating' },
}

const CODEFORCES_API_BASE_URL = 'https://codeforces.com/api'

function asNumber(value) {
  const numeric = Number(value)
  return Number.isFinite(numeric) ? numeric : 0
}

function formatRank(rank) {
  if (!rank || typeof rank !== 'string') {
    return 'Unrated'
  }

  return rank.replace(/\b\w/g, (char) => char.toUpperCase())
}

export function useCodeforcesStats(handle) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!handle) {
      setLoading(false)
      setData(null)
      setError('Missing Codeforces handle')
      return undefined
    }

    const controller = new AbortController()

    async function loadCodeforcesStats() {
      try {
        setLoading(true)
        setError(null)

        const [userInfoResponse, userRatingResponse] = await Promise.all([
          fetch(`${CODEFORCES_API_BASE_URL}/user.info?handles=${encodeURIComponent(handle)}`, {
            signal: controller.signal,
          }),
          fetch(`${CODEFORCES_API_BASE_URL}/user.rating?handle=${encodeURIComponent(handle)}`, {
            signal: controller.signal,
          }),
        ])

        if (!userInfoResponse.ok) {
          throw new Error(`Codeforces user.info failed with ${userInfoResponse.status}`)
        }

        if (!userRatingResponse.ok) {
          throw new Error(`Codeforces user.rating failed with ${userRatingResponse.status}`)
        }

        const userInfoResult = await userInfoResponse.json()
        const userRatingResult = await userRatingResponse.json()

        if (userInfoResult.status !== 'OK') {
          throw new Error(userInfoResult.comment || 'Codeforces user.info unavailable')
        }

        if (userRatingResult.status !== 'OK') {
          throw new Error(userRatingResult.comment || 'Codeforces user.rating unavailable')
        }

        const user = userInfoResult.result?.[0]
        const contests = Array.isArray(userRatingResult.result) ? userRatingResult.result.length : 0

        if (!user) {
          throw new Error('Codeforces user not found')
        }

        setData({
          rank: formatRank(user.rank),
          rating: asNumber(user.rating),
          contests,
          bestRating: asNumber(user.maxRating),
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

    loadCodeforcesStats()

    return () => controller.abort()
  }, [handle])

  return { data, loading, error }
}
