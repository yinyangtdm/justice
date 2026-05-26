/**
 * Build lib/timeline-media.ts from:
 *   - data/timeline-media-map.json  (event id → vimeo / youtube / image paths)
 *   - data/timeline-media.json      (manifest from pull-timeline-media.mjs)
 *
 * node scripts/generate-timeline-media-lib.mjs
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from "fs"
import { join } from "path"
import { youtubeEmbedUrl } from "./timeline-media-utils.mjs"

const ROOT = join(import.meta.dirname, "..")
const MAP_PATH = join(ROOT, "data", "timeline-media-map.json")
const MANIFEST_PATH = join(ROOT, "data", "timeline-media.json")
const LIB_PATH = join(ROOT, "lib", "timeline-media.ts")
const VIDEO_DIR = join(ROOT, "public", "timeline", "videos")

function findLocalVideo(slug) {
  if (!existsSync(VIDEO_DIR)) return null
  const match = readdirSync(VIDEO_DIR).find(f => f.startsWith(`${slug}.`))
  return match ? `/timeline/videos/${match}` : null
}

const map = JSON.parse(readFileSync(MAP_PATH, "utf8"))
const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"))

const vimeoById = Object.fromEntries(
  manifest.entries
    .map(e => {
      const vimeoId = e.vimeoId || e.sourceUrl?.match(/vimeo\.com\/(\d+)/)?.[1]
      return vimeoId ? [vimeoId, e] : null
    })
    .filter(Boolean),
)

const media = {}

for (const [eventId, imageUrl] of Object.entries(map.images || {})) {
  media[eventId] = { imageUrl }
}

for (const [eventId, vimeoId] of Object.entries(map.vimeo || {})) {
  const entry = vimeoById[vimeoId]
  const hash = map.vimeoHashes?.[vimeoId]
  const videoEmbedUrl = hash
    ? `https://player.vimeo.com/video/${vimeoId}?h=${hash}`
    : entry?.playerUrl || `https://player.vimeo.com/video/${vimeoId}`
  const block = {
    videoEmbedUrl,
    posterUrl: entry?.localPath,
  }
  if (entry?.videoLocalPath) block.videoSrc = entry.videoLocalPath
  media[eventId] = block
}

for (const [eventId, clip] of Object.entries(map.youtube || {})) {
  const posterSlug = clip.poster || `youtube-${clip.videoId}`
  const videoSrc = clip.videoLocalPath || findLocalVideo(posterSlug)
  const block = {
    videoEmbedUrl: youtubeEmbedUrl(clip),
    posterUrl: `/timeline/images/${posterSlug}-thumb.jpg`,
  }
  if (videoSrc) block.videoSrc = videoSrc
  media[eventId] = block
}

const sortedIds = Object.keys(media).sort((a, b) => Number(a) - Number(b))

function formatEntry(id, entry) {
  const lines = [`  "${id}": {`]
  if (entry.videoSrc) lines.push(`    videoSrc: "${entry.videoSrc}",`)
  if (entry.videoEmbedUrl) lines.push(`    videoEmbedUrl: "${entry.videoEmbedUrl}",`)
  if (entry.posterUrl) lines.push(`    posterUrl: "${entry.posterUrl}",`)
  if (entry.imageUrl) lines.push(`    imageUrl: "${entry.imageUrl}",`)
  lines.push("  },")
  return lines.join("\n")
}

const body = sortedIds.map(id => formatEntry(id, media[id])).join("\n")

const lib = `export type TimelineMedia = {
  imageUrl?: string
  videoEmbedUrl?: string
  videoSrc?: string
  posterUrl?: string
}

/** Generated from data/timeline-media-map.json — run: npm run timeline:media */
export const TIMELINE_MEDIA: Record<string, TimelineMedia> = {
${body}
}

export const mediaForEvent = (id: string): TimelineMedia | undefined => TIMELINE_MEDIA[id]
`

writeFileSync(LIB_PATH, lib)
console.log(`Wrote ${sortedIds.length} entries → ${LIB_PATH}`)
