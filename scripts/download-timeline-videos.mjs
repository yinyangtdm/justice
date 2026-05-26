/**
 * Download May 2 timeline Vimeo clips to public/timeline/videos/
 * Run from repo root: node scripts/download-timeline-videos.mjs
 *
 * Requires yt-dlp on PATH or at %TEMP%\yt-dlp-standalone.exe
 * (Download: https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe)
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "fs"
import { join } from "path"
import { spawnSync } from "child_process"

const ROOT = join(import.meta.dirname, "..")
const CSV = join(ROOT, "data", "timeline-source.csv")
const OUT = join(ROOT, "public", "timeline", "videos")
const MANIFEST = join(ROOT, "data", "timeline-media.json")

const YT_DLP = [
  process.env.YT_DLP,
  join(process.env.TEMP || "", "yt-dlp-standalone.exe"),
  join(process.env.TEMP || "", "yt-dlp.exe"),
  join(process.env.APPDATA || "", "Python", "Python314", "Scripts", "yt-dlp.exe"),
  "yt-dlp",
  "yt-dlp.exe",
].filter(Boolean).find(cmd => spawnSync(cmd, ["--version"], { encoding: "utf8" }).status === 0)

if (!YT_DLP) {
  console.error("yt-dlp not found. Install: pip install yt-dlp  OR download yt-dlp.exe from GitHub releases")
  process.exit(1)
}

console.log(`Using yt-dlp: ${YT_DLP}`)
mkdirSync(OUT, { recursive: true })

function parseCsvLine(line) {
  const out = []
  let cur = ""
  let inQuotes = false
  for (const ch of line) {
    if (ch === '"') { inQuotes = !inQuotes; continue }
    if (ch === "," && !inQuotes) { out.push(cur); cur = ""; continue }
    cur += ch
  }
  out.push(cur)
  return out
}

function slug(time, headline) {
  return `${time.replace(/:/g, "-")}-${headline.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "event"}`
}

function findVideo(slugName) {
  const hit = readdirSync(OUT).find(f => f.startsWith(`${slugName}.`))
  return hit ? `/timeline/videos/${hit}` : null
}

async function vimeoMeta(id) {
  const res = await fetch(`https://vimeo.com/${id}`, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
  })
  const html = await res.text()
  const title = html.match(/<meta property="og:title" content="([^"]+)"/)?.[1] || null
  const player = html.match(/twitter:player" content="([^"]+)"/)?.[1]
    || html.match(/player\.vimeo\.com\/video\/\d+\?h=[a-f0-9]+/)?.[0]
  const h = player?.match(/[?&]h=([a-f0-9]+)/)?.[1]
  return { title, playerUrl: player || (h ? `https://player.vimeo.com/video/${id}?h=${h}` : `https://vimeo.com/${id}`) }
}

function download(url, slugName) {
  const existing = findVideo(slugName)
  if (existing) {
    console.log(`skip ${slugName}`)
    return existing
  }

  const out = join(OUT, `${slugName}.%(ext)s`)
  console.log(`\n→ ${url}`)
  const r = spawnSync(YT_DLP, [
    "--merge-output-format", "mp4",
    "--no-playlist",
    "-o", out,
    url,
  ], { encoding: "utf8" })

  if (r.status !== 0) {
    console.error(r.stderr || r.stdout)
    return null
  }

  const local = findVideo(slugName)
  console.log(local ? `✓ ${local}` : `✗ missing file for ${slugName}`)
  return local
}

const raw = readFileSync(CSV, "utf8").trim().split(/\r?\n/)
const headers = parseCsvLine(raw[0])
const mediaIdx = headers.indexOf("Media")
const headlineIdx = headers.indexOf("Headline")
const textIdx = headers.indexOf("Text")
const timeIdx = headers.indexOf("Time")

const manifest = existsSync(MANIFEST)
  ? JSON.parse(readFileSync(MANIFEST, "utf8"))
  : { extractedAt: new Date().toISOString(), entries: [] }

const byRow = new Map(manifest.entries.map(e => [e.row, e]))
let ok = 0
let fail = 0

for (let i = 1; i < raw.length; i++) {
  const cols = parseCsvLine(raw[i])
  const mediaUrl = (cols[mediaIdx] || "").trim()
  if (!/vimeo\.com\/(\d+)/i.test(mediaUrl)) continue

  const id = mediaUrl.match(/vimeo\.com\/(\d+)/)[1]
  const time = cols[timeIdx] || ""
  const headline = cols[headlineIdx] || ""
  const slugName = slug(time, headline)

  const meta = await vimeoMeta(id)
  const local = download(meta.playerUrl, slugName)

  const entry = byRow.get(i) || {
    row: i,
    time: cols[timeIdx],
    headline,
    text: cols[textIdx],
    kind: "vimeo",
    sourceUrl: mediaUrl,
  }
  entry.vimeoId = id
  entry.vimeoTitle = meta.title
  entry.playerUrl = meta.playerUrl
  entry.videoLocalPath = local
  byRow.set(i, entry)

  if (local) ok++
  else fail++
}

manifest.extractedAt = new Date().toISOString()
manifest.entries = [...byRow.values()].sort((a, b) => a.row - b.row)
writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2))

console.log(`\nDone: ${ok} videos downloaded, ${fail} failed`)
console.log(`Manifest: ${MANIFEST}`)
process.exit(fail > 0 ? 1 : 0)
