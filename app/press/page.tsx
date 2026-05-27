import type { Metadata } from "next"
import Link from "next/link"
import PressCard from "@/components/PressCard"
import { curatedPress, pressByLanguage } from "@/lib/site-content"

export const metadata: Metadata = {
  title: "Press & Media Coverage",
  description:
    "Curated news coverage of Yong Yang's killing and the fight for justice — LA Times, Korea Daily, AsAmNews, and more.",
  alternates: { canonical: "/press" },
  openGraph: {
    title: "Press Coverage — Justice for Yong Yang",
    description: "Significant media coverage, curated for quality — not an archive of every clip.",
  },
}

export default function PressPage() {
  return (
    <div className="max-w-300 mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10 max-w-3xl">
        <p className="text-xs uppercase tracking-widest text-muted mb-2">Media</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Press &amp; Coverage
        </h1>
        <p className="text-muted leading-relaxed">
          The old site indexed hundreds of articles — many duplicates or minor clips. Here we keep
          only reporting that moves the story forward: legal breakthroughs, community action, and
          investigative journalism. Links open the original article or our archive summary.
        </p>
      </div>

      <section className="mb-14">
        <h2 className="font-serif text-xl font-semibold text-foreground mb-4">Featured</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {curatedPress
            .filter((p) => p.featured)
            .map((item) => (
              <PressCard key={item.id} item={item} />
            ))}
        </div>
      </section>

      <section id="english" className="mb-14 scroll-mt-20">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
          English
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pressByLanguage.en.map((item) => (
            <PressCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section id="korean" className="mb-14 scroll-mt-20">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
          Korean (한국어)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pressByLanguage.ko.map((item) => (
            <PressCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="border border-border rounded-xl p-6 sm:p-8 bg-[#12100e]">
        <h2 className="font-serif text-lg font-semibold text-foreground mb-2">Video &amp; TV</h2>
        <p className="text-sm text-muted mb-4 max-w-2xl">
          Rally footage, press conferences, and TV segments live on our YouTube channel — not
          scattered across hundreds of blog posts.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://www.youtube.com/@JusticeForYongYang"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-2 border border-border rounded-lg hover:border-(--accent)/40 hover:text-accent transition-colors"
          >
            YouTube channel →
          </a>
          <Link
            href="/videos"
            className="text-sm px-4 py-2 border border-border rounded-lg hover:border-(--accent)/40 hover:text-accent transition-colors"
          >
            Videos page →
          </Link>
        </div>
      </section>

      <p className="mt-10 text-xs text-[#4a4540]">
        Looking for an older article from the full archive?{" "}
        <a
          href="https://justiceforyongyang.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-accent"
        >
          Search the legacy site
        </a>{" "}
        — we are migrating only what matters.
      </p>
    </div>
  )
}
