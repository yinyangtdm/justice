import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ["**/node_modules/**", "**/.playwright-mcp/**"],
    };
    return config;
  },
  // 301 redirects from old WordPress URL patterns
  async redirects() {
    return [
      // Legal cases
      { source: "/24stcp02107-civil-petition", destination: "/legal/civil-petition", permanent: true },
      { source: "/24stcv24804-2", destination: "/legal/civil-lawsuit", permanent: true },
      { source: "/2_26-cv-01014-federal-civil-lawsuit", destination: "/legal/federal-lawsuit", permanent: true },
      // Art
      { source: "/art-yong", destination: "/art", permanent: true },
      // Videos
      { source: "/youtube-playlist", destination: "/videos", permanent: true },
      { source: "/youtube-channel", destination: "/videos", permanent: true },
      { source: "/video-playlists", destination: "/videos", permanent: true },
      // New IA — curated pages replace mega-archives
      { source: "/news", destination: "/press", permanent: true },
      { source: "/news/:path*", destination: "/press", permanent: true },
      { source: "/references", destination: "/get-involved", permanent: true },
      { source: "/references/:path*", destination: "/get-involved", permanent: true },
      // News categories (legacy WordPress)
      { source: "/category/news-english", destination: "/press", permanent: true },
      { source: "/category/news-korean", destination: "/press#korean", permanent: true },
      { source: "/category/news-english/:slug", destination: "/press", permanent: true },
      { source: "/category/news-korean/:slug", destination: "/press#korean", permanent: true },
      { source: "/news-english/:path*", destination: "/press", permanent: true },
      { source: "/news-korean/:path*", destination: "/press#korean", permanent: true },
      // Events galleries (legacy WordPress)
      { source: "/category/event-history-photo-galleries", destination: "/community", permanent: true },
      { source: "/event-history-photo-galleries/:slug", destination: "/community", permanent: true },
      // References
      { source: "/category/references", destination: "/references", permanent: true },
      { source: "/category/references/:path*", destination: "/references", permanent: true },
      // Language pages
      { source: "/language/in-english/:slug", destination: "/news/english/:slug", permanent: true },
      { source: "/language/in-korean/:slug", destination: "/news/korean/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
