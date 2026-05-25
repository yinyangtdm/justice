import type { Metadata } from "next";
import Link from "next/link";
import DayTimeline from "@/components/DayTimeline";

export const metadata: Metadata = {
  title: "What Happened to Yong Yang",
  description:
    "How Yong Yang was killed by LAPD on May 2, 2024 — the facts, the location, the body camera footage, and the evidence.",
  alternates: { canonical: "/what-happened" },
  openGraph: {
    title: "What Happened to Yong Yang",
    description:
      "On May 2, 2024, LAPD officers shot and killed Yong Yang, a 40-year-old Korean American experiencing a mental health crisis at his parents' home in Koreatown, Los Angeles.",
  },
};

export default function WhatHappenedPage() {
  return (
    <>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-muted mb-2">May 2, 2024</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
          What Happened
        </h1>
        <p className="text-muted max-w-2xl">
          The facts of how Yong Yang was killed, where it happened, and the evidence that followed.
        </p>
      </div>

      <div className="prose">
        <h2 id="how">How Yong Was Killed</h2>
        <p>
          On May 2, 2024, someone called 911 about a mental health crisis involving Yong Yang, a
          40-year-old Korean American. LAPD officers responded to the scene — his parents&apos; home
          in the Koreatown neighborhood of Los Angeles. Within minutes of arrival, officers shot and
          killed Yong Yang.
        </p>
        <p>
          Yong was experiencing a mental health episode. He posed no lethal threat justifying the
          use of deadly force. He needed medical care and crisis intervention — not a police response
          that ended his life.
        </p>

        <h2 id="where">Where It Happened</h2>
        <p>
          Yong Yang was killed at his parents&apos; home in Koreatown, Los Angeles — a neighborhood
          with a dense Korean-American population and one of the highest concentrations of Korean
          culture outside of Korea.
        </p>
        <p>
          He was killed inside or immediately outside the family home, during what should have been
          a welfare check or mental health intervention.
        </p>

        <h2 id="bodycam">Body Camera Footage</h2>
        <p>
          LAPD officers were equipped with body-worn cameras at the time of the shooting. The
          family filed a legal petition (24STCP02107) to compel the release of this footage.
          The petition was <strong>granted in March 2025</strong>.
        </p>
        <p>
          Body camera footage has since been released. It documents the moments leading up to and
          including the shooting of Yong Yang.
        </p>
        <p>
          <Link href="/legal/civil-petition">
            Read more about the bodycam petition (24STCP02107) →
          </Link>
        </p>

        <h2 id="evidence">Evidence &amp; Oddities</h2>
        <p>
          The circumstances surrounding Yong Yang&apos;s death raise serious questions that his
          family, legal team, and community advocates continue to investigate and document:
        </p>
        <ul>
          <li>
            Whether LAPD followed its own crisis intervention protocols before resorting to lethal
            force
          </li>
          <li>
            Whether proper de-escalation techniques were attempted
          </li>
          <li>
            The timeline between the 911 call and the shooting
          </li>
          <li>
            The conduct of individual officers and supervisors present
          </li>
        </ul>
        <p>
          These questions form the factual basis of both the{" "}
          <Link href="/legal/civil-lawsuit">state civil lawsuit</Link> and the{" "}
          <Link href="/legal/federal-lawsuit">federal civil rights lawsuit</Link> filed on behalf of
          Yong&apos;s family.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/legal"
          className="group p-5 border border-border rounded-xl hover:border-(--accent)/40 hover:bg-[#1a1612] transition-all"
        >
          <h3 className="font-serif font-semibold text-foreground group-hover:text-accent transition-colors mb-1">
            Legal Cases →
          </h3>
          <p className="text-sm text-muted">Three active lawsuits</p>
        </Link>
        <Link
          href="/yong"
          className="group p-5 border border-border rounded-xl hover:border-(--accent)/40 hover:bg-[#1a1612] transition-all"
        >
          <h3 className="font-serif font-semibold text-foreground group-hover:text-accent transition-colors mb-1">
            Who Was Yong? →
          </h3>
          <p className="text-sm text-muted">His life and his story</p>
        </Link>
      </div>
    </div>

    <section className="border-t border-border">
      <div className="max-w-300 mx-auto px-4 sm:px-6 py-10">
        <h2 className="font-serif text-2xl font-bold text-accent-light mb-2">
          May 2, 2024 — Minute by Minute
        </h2>
        <p className="text-sm text-muted mb-6">
          Drag or scroll to pan · Ctrl+scroll to zoom · Click any event to read details
        </p>
        <DayTimeline />
      </div>
    </section>
    </>
  );
}
