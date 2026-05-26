import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Yong Yang — His Story",
  description:
    "Learn about Yong Yang — his life, his family, his community, and the circumstances of his death on May 2, 2024.",
  alternates: { canonical: "/yong" },
  openGraph: {
    title: "Yong Yang — His Story",
    description:
      "Yong Yang (April 7, 1984 – May 2, 2024) was killed by LAPD on May 2, 2024. Learn who he was.",
  },
};

export default function YongPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-muted mb-2">In Memory</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Yong Yang
        </h1>
        <p className="text-muted">April 7, 1984 – May 2, 2024</p>
      </div>

      <div className="prose">
        <p>
          Yong Yang was a 40-year-old Korean American living in the Koreatown neighborhood of
          Los Angeles. He was a father, a husband, and a member of a community that loved him.
        </p>

        <h2>The Day He Was Killed</h2>
        <p>
          On May 2, 2024, LAPD officers responded to a 911 call related to a mental health crisis.
          Yong Yang was shot and killed by LAPD officers. At the time of his death, he was
          experiencing a mental health episode — a medical situation that required care, not lethal
          force.
        </p>

        <h2>Who He Was</h2>
        <p>
          Yong was known for his warmth, his humor, and his dedication to his family. He immigrated
          to the United States and built a life in Los Angeles. His loss has devastated his family
          and a community that refuses to let his death be forgotten.
        </p>

        <h2>The Fight for Justice</h2>
        <p>
          Since his death, Yong&apos;s family, friends, and community advocates have organized
          rallies, filed legal actions, and continued to press for accountability — from the LAPD,
          from the Los Angeles District Attorney, and from elected officials at every level.
        </p>
        <p>
          Three active legal cases are proceeding:{" "}
          <Link href="/legal/civil-petition">24STCP02107</Link>,{" "}
          <Link href="/legal/civil-lawsuit">24STCV24804</Link>, and{" "}
          <Link href="/legal/federal-lawsuit">2:26-cv-01014</Link>.
        </p>
      </div>

      <div className="mt-12">
        <Link
          href="/art"
          className="group p-5 border border-border rounded-xl hover:border-(--accent)/40 hover:bg-[#1a1612] transition-all inline-block"
        >
          <h3 className="font-serif font-semibold text-foreground group-hover:text-accent transition-colors mb-1">
            Art for Yong →
          </h3>
          <p className="text-sm text-muted">Artwork created in his memory</p>
        </Link>
      </div>
    </div>
  );
}
