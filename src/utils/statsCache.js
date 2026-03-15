const CACHE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7
const FRESH_CACHE_TTL_MS = 1000 * 60 * 30

function getCookieValue(name) {
  const encodedName = `${encodeURIComponent(name)}=`
  const cookies = document.cookie ? document.cookie.split('; ') : []

  for (const cookie of cookies) {
    if (cookie.startsWith(encodedName)) {
      return decodeURIComponent(cookie.slice(encodedName.length))
    }
  }

  return null
}

export function readStatsCache(key) {
  if (typeof document === 'undefined') {
    return null
  }

  const rawValue = getCookieValue(key)

  if (!rawValue) {
    return null
  }

  try {
    const parsed = JSON.parse(rawValue)

    if (!parsed || typeof parsed !== 'object' || !('data' in parsed) || !('timestamp' in parsed)) {
      return null
    }

    return parsed
  } catch {
    return null
  }
}

export function writeStatsCache(key, data) {
  if (typeof document === 'undefined') {
    return
  }

  const payload = encodeURIComponent(
    JSON.stringify({
      data,
      timestamp: Date.now(),
    }),
  )

  document.cookie =
    `${encodeURIComponent(key)}=${payload}; Max-Age=${CACHE_COOKIE_MAX_AGE_SECONDS}; Path=/; SameSite=Lax`
}

export function isFreshCache(cacheEntry) {
  if (!cacheEntry?.timestamp) {
    return false
  }

  return Date.now() - cacheEntry.timestamp < FRESH_CACHE_TTL_MS
}

export function isRateLimitError(errorMessage) {
  if (!errorMessage) {
    return false
  }

  const normalized = String(errorMessage).toLowerCase()

  return (
    normalized.includes('rate limit') ||
    normalized.includes('too many requests') ||
    normalized.includes('request failed with 403') ||
    normalized.includes('request failed with 429')
  )
}

export function getStatsCacheKey(service, identifier) {
  return `stats-cache:${service}:${identifier}`
}
