import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "fs"
import { join, extname } from "path"
import { spawnSync } from "child_process"

const ROOT = join(import.meta.dirname, "..")
const CSV_PATH = join(ROOT, "data", "timeline-source.csv")
const OUT_DIR = join(ROOT, "public", "timeline")
const MANIFEST_PATH = join(ROOT, "data", "timeline-media.json")

const YT_DLP_CANDIDATES = [
  process.env.YT_DLP,
  join(process.env.APPDATA || "", "Python", "Python314", "Scripts", "yt-dlp.exe"),
  "yt-dlp",
  "yt-dlp.exe",
].filter(Boolean)

function findYtDlp() {
  for (const cmd of YT_DLP_CANDIDATES) {
    const probe = spawnSync(cmd, ["--version"], { encoding: "utf8" })
    if (probe.status === 0) return cmd
  }
  return null
}

const ytDlp = findYtDlp()

mkdirSync(join(OUT_DIR, "images"), { recursive: true })
mkdirSync(join(OUT_DIR, "videos"), { recursive: true })

function findVideoFile(slug) {
  const dir = join(OUT_DIR, "videos")
  if (!existsSync(dir)) return null
  const match = readdirSync(dir).find(f => f.startsWith(`${slug}.`))
  return match ? `/timeline/videos/${match}` : null
}

function downloadVideo(sourceUrl, slug) {
  if (!ytDlp) {
    console.warn("yt-dlp not found — skipping video download")
    return null
  }

  const existing = findVideoFile(slug)
  if (existing) {
    console.log(`skip video: ${existing}`)
    return existing
  }

  const outTemplate = join(OUT_DIR, "videos", `${slug}.%(ext)s`)
  const args = [
    "-f", "bestvideo[height<=1080]+bestaudio/best[height<=1080]/best",
    "--merge-output-format", "mp4",
    "--no-playlist",
    "-o", outTemplate,
    sourceUrl,
  ]

  console.log(`video: ${sourceUrl}`)
  const result = spawnSync(ytDlp, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] })
  if (result.status !== 0) {
    console.error(result.stderr || result.stdout)
    return null
  }

  const local = findVideoFile(slug)
  if (!local) {
    console.warn(`Download finished but file missing for ${slug}`)
    return null
  }
  console.log(`saved: ${local}`)
  return local
}

function parseCsvLine(line) {
  const out = []
  let cur = ""
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      inQuotes = !inQuotes
      continue
    }
    if (ch === "," && !inQuotes) {
      out.push(cur)
      cur = ""
      continue
    }
    cur += ch
  }
  out.push(cur)
  return out
}

function pad(n) {
  return String(n).padStart(2, "0")
}

function slug(time, headline) {
  const safe = headline
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40)
  return `${time.replace(/:/g, "-")}-${safe || "event"}`
}

function mediaKind(url) {
  if (!url) return null
  if (/flickr\.com|\.jpe?g$|\.png$|\.webp$|\.gif$/i.test(url)) return "image"
  if (/vimeo\.com/i.test(url)) return "vimeo"
  if (/youtube\.com|youtu\.be/i.test(url)) return "youtube"
  return "link"
}

const raw = readFileSync(CSV_PATH, "utf8").trim().split(/\r?\n/)
const headers = parseCsvLine(raw[0])
const mediaIdx = headers.indexOf("Media")
const headlineIdx = headers.indexOf("Headline")
const textIdx = headers.indexOf("Text")
const timeIdx = headers.indexOf("Time")
const monthIdx = headers.indexOf("Month")
const dayIdx = headers.indexOf("Day")

const entries = []

for (let i = 1; i < raw.length; i++) {
  const cols = parseCsvLine(raw[i])
  const mediaUrl = (cols[mediaIdx] || "").trim()
  if (!mediaUrl) continue

  const time = cols[timeIdx] || ""
  const headline = cols[headlineIdx] || ""
  const text = cols[textIdx] || ""
  const kind = mediaKind(mediaUrl)
  const id = slug(time, headline)

  const entry = {
    row: i,
    time: `2024-${pad(cols[monthIdx])}-${pad(cols[dayIdx])}T${time}`,
    headline,
    text,
    kind,
    sourceUrl: mediaUrl,
    localPath: null,
    videoLocalPath: null,
    thumbnailUrl: null,
    embedUrl: null,
  }

  if (kind === "image") {
    const ext = extname(new URL(mediaUrl).pathname) || ".jpg"
    const filename = `${id}${ext}`
    const localPath = `/timeline/images/${filename}`
    const dest = join(OUT_DIR, "images", filename)
    if (!existsSync(dest)) {
      const res = await fetch(mediaUrl)
      if (!res.ok) throw new Error(`Failed ${mediaUrl}: ${res.status}`)
      writeFileSync(dest, Buffer.from(await res.arrayBuffer()))
      console.log(`image: ${filename}`)
    } else {
      console.log(`skip: ${filename}`)
    }
    entry.localPath = localPath
    entry.thumbnailUrl = localPath
  }

  if (kind === "vimeo" || kind === "youtube") {
    if (kind === "vimeo") {
      const vimeoId = mediaUrl.match(/vimeo\.com\/(\d+)/)?.[1]
      entry.embedUrl = vimeoId ? `https://player.vimeo.com/video/${vimeoId}` : null
    }
    if (kind === "youtube") {
      const ytId = mediaUrl.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/)?.[1]
      entry.embedUrl = ytId ? `https://www.youtube.com/embed/${ytId}` : null
    }

    try {
      const oembedUrl = kind === "vimeo"
        ? `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(mediaUrl)}`
        : `https://www.youtube.com/oembed?url=${encodeURIComponent(mediaUrl)}&format=json`
      const oembed = await fetch(oembedUrl).then(r => r.json())
      entry.thumbnailUrl = oembed.thumbnail_url || null
      if (entry.thumbnailUrl) {
        const thumbName = `${id}-thumb.jpg`
        const thumbDest = join(OUT_DIR, "images", thumbName)
        if (!existsSync(thumbDest)) {
          const res = await fetch(entry.thumbnailUrl)
          if (res.ok) {
            writeFileSync(thumbDest, Buffer.from(await res.arrayBuffer()))
            console.log(`thumb: ${thumbName}`)
          }
        }
        entry.localPath = `/timeline/images/${thumbName}`
      }
    } catch (e) {
      console.warn(`oembed failed ${mediaUrl}:`, e.message)
    }

    entry.videoLocalPath = downloadVideo(mediaUrl, id)
  }

  entries.push(entry)
}

writeFileSync(MANIFEST_PATH, JSON.stringify({ extractedAt: new Date().toISOString(), entries }, null, 2))
console.log(`\n${entries.length} media entries → ${MANIFEST_PATH}`)
