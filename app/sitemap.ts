import type { MetadataRoute } from "next";

const base = "https://justiceforyongyang.com";

type RouteConfig = {
  path: string;
  priority?: number;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const routes: RouteConfig[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },

  // Yong Yang
  { path: "/yong", priority: 0.9 },
  { path: "/what-happened", priority: 0.9 },
  { path: "/timeline", priority: 0.8 },
  { path: "/art", priority: 0.6 },
  { path: "/videos", priority: 0.6 },

  // Legal
  { path: "/legal", priority: 0.9 },
  { path: "/legal/federal-lawsuit", priority: 0.9 },
  { path: "/legal/civil-lawsuit", priority: 0.9 },
  { path: "/legal/civil-petition", priority: 0.8 },

  // Events / Take action
  { path: "/events", priority: 0.8, changeFrequency: "weekly" },
  { path: "/events/2026", priority: 0.8, changeFrequency: "weekly" },
  { path: "/events/2025", priority: 0.7 },
  { path: "/events/2024", priority: 0.7 },

  // News
  { path: "/news", priority: 0.8 },
  { path: "/news/korean", priority: 0.7 },
  { path: "/news/spanish", priority: 0.7 },
  { path: "/news/mandarin", priority: 0.7 },

  // Resources
  { path: "/references", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority = 0.7, changeFrequency = "monthly" }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
