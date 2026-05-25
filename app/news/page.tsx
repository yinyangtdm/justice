import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "News Coverage",
  description:
    "Media coverage of Yong Yang's killing and the fight for justice — English, Korean, Spanish, and Mandarin news.",
  alternates: { canonical: "/news" },
};

const englishOutlets = [
  { href: "/news/english/kabc", label: "KABC 7 / ABC" },
  { href: "/news/english/nbc", label: "NBC" },
  { href: "/news/english/fox11", label: "FOX 11" },
  { href: "/news/english/kcal-cbs", label: "KCAL 9 / CBS" },
  { href: "/news/english/la-times", label: "LA Times" },
  { href: "/news/english/laist", label: "LAist" },
  { href: "/news/english/la-wave", label: "LA Wave" },
  { href: "/news/english/washington-post", label: "Washington Post" },
  { href: "/news/english/asamnews", label: "AsAmNews" },
  { href: "/news/english/korea-daily", label: "Korea Daily (English)" },
];

const koreanOutlets = [
  { href: "/news/korean/korea-daily", label: "The Korea Daily (한국어)" },
  { href: "/news/korean/joongang", label: "JoongAng Ilbo" },
  { href: "/news/korean/radio-korea", label: "Radio Korea" },
  { href: "/news/korean/radio-seoul", label: "Radio Seoul" },
  { href: "/news/korean/sunday-journal", label: "Sunday Journal" },
  { href: "/news/korean/snuaa", label: "SNUAA USA" },
];

export default function NewsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-muted mb-2">Media</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
          News Coverage
        </h1>
        <p className="text-muted max-w-2xl">
          Coverage of Yong Yang&apos;s killing and the fight for justice across English and Korean media.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
            English
          </h2>
          <ul className="space-y-2">
            {englishOutlets.map((o) => (
              <li key={o.href}>
                <Link
                  href={o.href}
                  className="text-sm text-[#7a7060] hover:text-accent transition-colors"
                >
                  {o.label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
            Korean (한국어)
          </h2>
          <ul className="space-y-2">
            {koreanOutlets.map((o) => (
              <li key={o.href}>
                <Link
                  href={o.href}
                  className="text-sm text-[#7a7060] hover:text-accent transition-colors"
                >
                  {o.label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
