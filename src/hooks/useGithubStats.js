import { useEffect, useState } from 'react'

export const GITHUB_STATS = {
  publicRepos: { key: 'publicRepos', label: 'Public Repos' },
  followers: { key: 'followers', label: 'Followers' },
  following: { key: 'following', label: 'Following' },
  gists: { key: 'gists', label: 'Gists' },
  accountYears: { key: 'accountYears', label: 'Account Years' },
}

function yearsSince(dateString) {
  if (!dateString) {
    return 0
  }

  const startedAt = new Date(dateString).getTime()
  const now = Date.now()
  const yearMs = 1000 * 60 * 60 * 24 * 365

  return Math.max(0, Math.floor((now - startedAt) / yearMs))
}

export function useGithubStats(username) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username) {
      setLoading(false)
      setData(null)
      setError('Missing GitHub username')
      return undefined
    }

    const controller = new AbortController()

    async function loadGithubStats() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`https://api.github.com/users/${username}`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`GitHub request failed with ${response.status}`)
        }

        const result = await response.json()

        setData({
          publicRepos: Number(result.public_repos) || 0,
          followers: Number(result.followers) || 0,
          following: Number(result.following) || 0,
          gists: Number(result.public_gists) || 0,
          accountYears: yearsSince(result.created_at),
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

    loadGithubStats()

    return () => controller.abort()
  }, [username])

  return { data, loading, error }
}
