import type { MetadataRoute } from "next"

const base = "https://justiceforyongyang.com"

type RouteConfig = {
  path: string
  priority?: number
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"]
}

const routes: RouteConfig[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/timeline", priority: 0.95, changeFrequency: "weekly" },
  { path: "/what-happened", priority: 0.9 },
  { path: "/yong", priority: 0.9 },
  { path: "/press", priority: 0.85, changeFrequency: "weekly" },
  { path: "/community", priority: 0.85, changeFrequency: "weekly" },
  { path: "/get-involved", priority: 0.85 },
  { path: "/legal", priority: 0.9 },
  { path: "/legal/federal-lawsuit", priority: 0.9 },
  { path: "/legal/civil-lawsuit", priority: 0.9 },
  { path: "/legal/civil-petition", priority: 0.85 },
  { path: "/art", priority: 0.6 },
  { path: "/videos", priority: 0.6 },
  { path: "/events", priority: 0.7 },
  { path: "/events/2026", priority: 0.7, changeFrequency: "weekly" },
  { path: "/events/2025", priority: 0.6 },
  { path: "/events/2024", priority: 0.6 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority = 0.7, changeFrequency = "monthly" }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
