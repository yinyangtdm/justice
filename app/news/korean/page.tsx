import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Korean News Coverage — 한국어 보도",
  description:
    "Korean-language media coverage of Yong Yang's killing and the fight for justice — 양용 씨 사건에 대한 한국어 언론 보도.",
  alternates: { canonical: "/news/korean" },
};

const outlets = [
  {
    slug: "korea-daily",
    label: "The Korea Daily (코리아데일리)",
    desc: "Primary Korean-American daily newspaper covering LA Koreatown.",
  },
  {
    slug: "joongang",
    label: "JoongAng Ilbo (중앙일보)",
    desc: "Major South Korean newspaper with US edition coverage.",
  },
  {
    slug: "radio-korea",
    label: "Radio Korea (라디오코리아)",
    desc: "Korean-language radio and digital news in Los Angeles.",
  },
  {
    slug: "radio-seoul",
    label: "Radio Seoul (라디오서울)",
    desc: "Korean-language radio broadcast serving the LA community.",
  },
  {
    slug: "sunday-journal",
    label: "Sunday Journal (선데이저널)",
    desc: "Korean-American weekly news publication.",
  },
  {
    slug: "snuaa",
    label: "SNUAA USA (서울대 미주 동문회)",
    desc: "Coverage from the Seoul National University Alumni Association.",
  },
];

export default function KoreanNewsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-6">
        <Link href="/news" className="text-xs text-muted hover:text-accent transition-colors">
          ← All news coverage
        </Link>
      </div>

      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-muted mb-2">한국어 보도</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Korean News Coverage
        </h1>
        <p className="text-muted max-w-2xl">
          Korean-language media coverage of Yong Yang&apos;s killing and the community&apos;s pursuit of
          justice.
        </p>
      </div>

      <div className="space-y-3">
        {outlets.map((outlet) => (
          <Link
            key={outlet.slug}
            href={`/news/korean/${outlet.slug}`}
            className="group flex flex-col p-5 border border-border rounded-xl hover:border-(--accent)/40 hover:bg-[#1a1612] transition-all"
          >
            <h2 className="font-serif text-base font-semibold text-foreground group-hover:text-accent transition-colors mb-1">
              {outlet.label}
            </h2>
            <p className="text-sm text-muted">{outlet.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
