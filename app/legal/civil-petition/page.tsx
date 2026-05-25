import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bodycam Petition — 24STCP02107",
  description:
    "Case 24STCP02107 — Writ of Administrative Mandamus filed in Los Angeles Superior Court seeking LAPD records and body camera footage from the killing of Yong Yang. Petition granted March 2025.",
  alternates: { canonical: "/legal/civil-petition" },
};

export default function CivilPetitionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-xs text-muted mb-8">
        <Link href="/" className="hover:text-accent">Home</Link>
        <span>›</span>
        <Link href="/legal" className="hover:text-accent">Legal Cases</Link>
        <span>›</span>
        <span className="text-foreground">Civil Petition</span>
      </nav>

      <div className="mb-10">
        <p className="text-xs font-mono text-accent mb-2">Case No. 24STCP02107</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Civil Petition — Bodycam Release
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          <span>Los Angeles Superior Court</span>
          <span>·</span>
          <span>Writ — Administrative Mandamus</span>
          <span>·</span>
          <span className="text-emerald-400">Petition Granted Mar 2025</span>
        </div>
      </div>

      <div className="prose">
        <h2>Type of Case</h2>
        <p>
          <strong>Writ of Administrative Mandamus</strong> — This petition asked the court to compel
          the City of Los Angeles and LAPD to release records related to the killing of Yong Yang,
          including bodycam footage, internal investigation files, and officer personnel records.
        </p>

        <h2>Background</h2>
        <p>
          Following the May 2, 2024 killing of Yong Yang by LAPD officers, the family and their
          attorneys submitted a California Public Records Act (CPRA) request for all relevant records.
          LAPD denied or delayed the release of key documents, prompting the filing of this petition.
        </p>

        <h2>What Was Sought</h2>
        <ul>
          <li>All body-worn camera footage from the incident</li>
          <li>All investigative reports, including the LAPD&apos;s Force Investigation Division report</li>
          <li>Personnel records of the officers involved, to the extent permitted under SB 1421</li>
          <li>Any communications related to the incident</li>
        </ul>

        <h2>Outcome</h2>
        <p>
          The petition was <strong>granted in March 2025</strong>. Body camera footage has since been
          released. This was a significant legal victory for transparency and for the family&apos;s ability
          to build their civil and federal cases.
        </p>

        <h2>Significance</h2>
        <p>
          California law (AB 748 and SB 1421) requires timely disclosure of footage from incidents
          involving serious use of force. This petition enforced those rights when LAPD refused to
          comply voluntarily.
        </p>
      </div>

      <div className="mt-12 pt-6 border-t border-border">
        <Link href="/legal" className="text-sm text-accent hover:text-accent-light">
          ← Back to all legal cases
        </Link>
      </div>
    </div>
  );
}
