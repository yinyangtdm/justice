/** Shared helpers for timeline media scripts */

/** "21:18", "1:30:00", or seconds as number/string → seconds */
export function parseTimestamp(value) {
  if (value == null || value === "") return null
  if (typeof value === "number" && Number.isFinite(value)) return Math.floor(value)
  const raw = String(value).trim()
  if (/^\d+$/.test(raw)) return Number(raw)
  if (/^\d+m\d+s$/i.test(raw)) {
    const [, m, s] = raw.match(/^(\d+)m(\d+)s$/i)
    return Number(m) * 60 + Number(s)
  }
  const parts = raw.split(":").map(Number)
  if (parts.some(n => Number.isNaN(n))) return null
  if (parts.length === 2) return parts[0] * 60 + parts[1]
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2]
  return null
}

export function youtubeEmbedUrl({ videoId, start, end }) {
  const params = new URLSearchParams()
  const startSec = parseTimestamp(start)
  const endSec = parseTimestamp(end)
  if (startSec != null) params.set("start", String(startSec))
  if (endSec != null) params.set("end", String(endSec))
  const q = params.toString()
  return `https://www.youtube.com/embed/${videoId}${q ? `?${q}` : ""}`
}

/** Parse watch/embed URLs; returns { videoId, start, end } (times in seconds). */
export function parseYoutubeUrl(url) {
  const u = new URL(url)
  const videoId =
    u.searchParams.get("v") ||
    u.pathname.match(/\/(?:embed|shorts|live)\/([\w-]{11})/)?.[1] ||
    u.pathname.match(/^\/([\w-]{11})$/)?.[1]

  if (!videoId) return { videoId: null, start: null, end: null }

  let start = u.searchParams.get("start")
  let end = u.searchParams.get("end")

  const t = u.searchParams.get("t")
  if (t && start == null) start = parseTimestamp(t)

  if (u.hash) {
    const hashT = u.hash.match(/[#&]t=(.+)/)?.[1]
    if (hashT && start == null) start = parseTimestamp(hashT)
  }

  return {
    videoId,
    start: start != null ? parseTimestamp(start) : null,
    end: end != null ? parseTimestamp(end) : null,
  }
}
