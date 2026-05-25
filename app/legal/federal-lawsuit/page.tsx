import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Federal Civil Rights Lawsuit — 2:26-cv-01014",
  description:
    "Case 2:26-cv-01014 — Federal civil rights lawsuit filed in the U.S. District Court, Central District of California, alleging constitutional violations in the killing of Yong Yang by LAPD.",
  alternates: { canonical: "/legal/federal-lawsuit" },
};

export default function FederalLawsuitPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-xs text-muted mb-8">
        <Link href="/" className="hover:text-accent">Home</Link>
        <span>›</span>
        <Link href="/legal" className="hover:text-accent">Legal Cases</Link>
        <span>›</span>
        <span className="text-foreground">Federal Lawsuit</span>
      </nav>

      <div className="mb-10">
        <p className="text-xs font-mono text-accent mb-2">Case No. 2:26-cv-01014</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Federal Civil Rights Lawsuit
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          <span>U.S. District Court, Central District of California</span>
          <span>·</span>
          <span>42 U.S.C. § 1983</span>
          <span>·</span>
          <span className="text-emerald-400">Active</span>
        </div>
      </div>

      <div className="prose">
        <h2>Overview</h2>
        <p>
          This federal lawsuit alleges that LAPD officers violated Yong Yang&apos;s constitutional rights
          under the Fourth and Fourteenth Amendments to the United States Constitution. It is filed
          under 42 U.S.C. § 1983, which provides a legal remedy for civil rights violations committed
          under color of state law.
        </p>

        <h2>Constitutional Claims</h2>
        <ul>
          <li>
            <strong>Fourth Amendment</strong> — Unreasonable seizure through the use of excessive
            and deadly force
          </li>
          <li>
            <strong>Fourteenth Amendment</strong> — Deprivation of life without due process of law;
            substantive due process rights of family members (Fourteenth Amendment familial association)
          </li>
          <li>
            <strong>Monell liability</strong> — The City of Los Angeles maintained unconstitutional
            policies, customs, and practices that caused the violation of Yong Yang&apos;s rights
          </li>
        </ul>

        <h2>Why Federal Court</h2>
        <p>
          Federal court provides an independent forum from the California state court system.
          A federal § 1983 claim also allows for attorney&apos;s fees if successful, and holds the City
          accountable under federal constitutional standards — which may be harder to satisfy but
          carry significant public weight when met.
        </p>

        <h2>Status</h2>
        <p>
          Case was filed in 2026 and is currently active. Updates will be posted as proceedings develop.
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
