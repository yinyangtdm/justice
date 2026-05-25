import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CA Civil Lawsuit — 24STCV24804",
  description:
    "Case 24STCV24804 — Civil rights and wrongful death lawsuit filed in Los Angeles Superior Court by the family of Yong Yang against the City of Los Angeles and LAPD.",
  alternates: { canonical: "/legal/civil-lawsuit" },
};

export default function CivilLawsuitPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-xs text-muted mb-8">
        <Link href="/" className="hover:text-accent">Home</Link>
        <span>›</span>
        <Link href="/legal" className="hover:text-accent">Legal Cases</Link>
        <span>›</span>
        <span className="text-foreground">Civil Lawsuit</span>
      </nav>

      <div className="mb-10">
        <p className="text-xs font-mono text-accent mb-2">Case No. 24STCV24804</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Civil Lawsuit
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          <span>Los Angeles Superior Court</span>
          <span>·</span>
          <span>Civil Rights — Wrongful Death</span>
          <span>·</span>
          <span className="text-emerald-400">Active</span>
        </div>
      </div>

      <div className="prose">
        <h2>Overview</h2>
        <p>
          This civil lawsuit was filed by Yong Yang&apos;s family against the City of Los Angeles
          and the LAPD officers who shot and killed Yong on May 2, 2024. It seeks damages for
          wrongful death and violations of civil rights under California state law.
        </p>

        <h2>Claims</h2>
        <ul>
          <li>Wrongful death — negligent and intentional use of excessive force</li>
          <li>
            Violation of the Bane Act (Civil Code § 52.1) — interference with constitutional rights
            by threat or coercion
          </li>
          <li>Negligent hiring, training, supervision, and retention</li>
          <li>Battery by a law enforcement officer</li>
        </ul>

        <h2>Named Parties</h2>
        <p>
          Defendants include the City of Los Angeles, the Los Angeles Police Department, and the
          individual officers who discharged their weapons on May 2, 2024.
        </p>

        <h2>Status</h2>
        <p>Case is active and in litigation. Updates will be posted as proceedings develop.</p>
      </div>

      <div className="mt-12 pt-6 border-t border-border">
        <Link href="/legal" className="text-sm text-accent hover:text-accent-light">
          ← Back to all legal cases
        </Link>
      </div>
    </div>
  );
}
