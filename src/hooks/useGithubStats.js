import { useEffect, useState } from 'react'
import { getStatsCacheKey, isFreshCache, isRateLimitError, readStatsCache, writeStatsCache } from '../utils/statsCache.js'

export const GITHUB_STATS = {
  publicRepos: { key: 'publicRepos', label: 'Public Repos' },
  followers: { key: 'followers', label: 'Followers' },
  following: { key: 'following', label: 'Following' },
  gists: { key: 'gists', label: 'Gists' },
  totalCommits: { key: 'totalCommits', label: 'Commits This Year' },
  accountYears: { key: 'accountYears', label: 'Account Years' },
}

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql'

function getCurrentYearRange() {
  const year = new Date().getUTCFullYear()

  return {
    from: `${year}-01-01T00:00:00Z`,
    to: `${year}-12-31T23:59:59Z`,
  }
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

async function fetchGithubCommitTotal(username, signal) {
  const token = import.meta.env.VITE_GITHUB_TOKEN

  if (!token) {
    return 0
  }

  const { from, to } = getCurrentYearRange()
  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: 'POST',
    signal,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
        query GithubCommitTotals($username: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $username) {
            contributionsCollection(from: $from, to: $to) {
              totalCommitContributions
            }
          }
        }
      `,
      variables: {
        username,
        from,
        to,
      },
    }),
  })

  if (!response.ok) {
    throw new Error(`GitHub GraphQL request failed with ${response.status}`)
  }

  const result = await response.json()

  if (result.errors?.length) {
    throw new Error(result.errors[0].message || 'GitHub GraphQL request failed')
  }

  return Number(result.data?.user?.contributionsCollection?.totalCommitContributions) || 0
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

    const cacheKey = getStatsCacheKey('github', username)
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

    async function loadGithubStats() {
      try {
        setLoading(true)
        setError(null)

        const profileResponse = await fetch(`https://api.github.com/users/${username}`, {
          signal: controller.signal,
        })

        if (!profileResponse.ok) {
          throw new Error(`GitHub request failed with ${profileResponse.status}`)
        }

        const result = await profileResponse.json()
        let totalCommits = 0

        try {
          totalCommits = await fetchGithubCommitTotal(username, controller.signal)
        } catch {
          totalCommits = 0
        }

        const nextData = {
          publicRepos: Number(result.public_repos) || 0,
          followers: Number(result.followers) || 0,
          following: Number(result.following) || 0,
          gists: Number(result.public_gists) || 0,
          totalCommits,
          accountYears: yearsSince(result.created_at),
        }

        setData(nextData)
        writeStatsCache(cacheKey, nextData)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          const nextError = isRateLimitError(fetchError.message)
            ? 'GitHub rate limit reached. Showing cached stats if available.'
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

    loadGithubStats()

    return () => controller.abort()
  }, [username])

  return { data, loading, error }
}
