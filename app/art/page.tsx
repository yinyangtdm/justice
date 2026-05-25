import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Art for Yong",
  description:
    "Artwork created in memory of Yong Yang by artists in Los Angeles and beyond.",
  alternates: { canonical: "/art" },
};

export default function ArtPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-muted mb-2">In Memory</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Art for Yong
        </h1>
        <p className="text-muted max-w-2xl">
          Artists from Los Angeles and beyond have created work in honor and memory of Yong Yang.
        </p>
      </div>

      <div className="prose mb-10">
        <p>
          Art has been a powerful way for the community to grieve, to remember, and to demand
          justice. This gallery collects artwork created since May 2, 2024 — portraits, murals,
          illustrations, and tributes by artists who refuse to let Yong be forgotten.
        </p>
      </div>

      <div className="border border-border rounded-xl p-8 text-center text-muted">
        <p className="font-serif text-lg mb-2">Gallery coming soon</p>
        <p className="text-sm">Art images are being compiled and optimized for display.</p>
      </div>

      <div className="mt-10">
        <Link href="/yong" className="text-sm text-accent hover:text-accent-light">
          ← Yong&apos;s Story
        </Link>
      </div>
    </div>
  );
}
