import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "中文报道 — Mandarin News Coverage",
  description:
    "Mandarin-language media coverage of the killing of Yong Yang by the LAPD and the community's fight for justice.",
  alternates: { canonical: "/news/mandarin" },
};

export default function MandarinNewsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-6">
        <Link href="/news" className="text-xs text-muted hover:text-accent transition-colors">
          ← All news coverage
        </Link>
      </div>

      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-muted mb-2">中文</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Mandarin-Language Coverage
        </h1>
        <p className="text-muted max-w-2xl">
          Mandarin-language media coverage of the killing of Yong Yang and the fight for justice.
          Coverage is being documented and will be added here.
        </p>
      </div>

      <div className="p-6 border border-border rounded-xl text-muted text-sm">
        Mandarin-language coverage is being compiled. Check back soon or{" "}
        <Link href="/news">see all news coverage</Link>.
      </div>
    </div>
  );
}
