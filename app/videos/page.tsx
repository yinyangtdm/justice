import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Video documentation of the fight for justice for Yong Yang — news coverage, rally footage, and community statements.",
  alternates: { canonical: "/videos" },
};

export default function VideosPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-muted mb-2">Media</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Videos
        </h1>
        <p className="text-muted max-w-2xl">
          Video documentation of rallies, press conferences, news coverage, and community statements.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
          YouTube Channel
        </h2>
        <a
          href="https://www.youtube.com/@JusticeForYongYang"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 border border-border rounded-lg text-sm text-foreground hover:border-accent hover:text-accent transition-colors"
        >
          <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          @JusticeForYongYang on YouTube
        </a>
      </div>

      <div className="border border-border rounded-xl p-8 text-center text-muted">
        <p className="font-serif text-lg mb-2">Embedded playlists coming soon</p>
        <p className="text-sm">
          Video embeds are being added. Visit the YouTube channel directly in the meantime.
        </p>
      </div>
    </div>
  );
}
