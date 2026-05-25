import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Legal Cases",
  description:
    "Three active legal cases filed in pursuit of justice for Yong Yang — civil petition (24STCP02107), civil lawsuit (24STCV24804), and federal civil rights lawsuit (2:26-cv-01014).",
  alternates: { canonical: "/legal" },
};

const cases = [
  {
    href: "/legal/civil-petition",
    caseNo: "24STCP02107",
    title: "Civil Petition",
    court: "Los Angeles Superior Court",
    type: "Writ — Administrative Mandamus",
    desc: "Petition seeking the release of LAPD records and bodycam footage related to the killing of Yong Yang.",
    status: "Active",
  },
  {
    href: "/legal/civil-lawsuit",
    caseNo: "24STCV24804",
    title: "Civil Lawsuit",
    court: "Los Angeles Superior Court",
    type: "Civil Rights — Wrongful Death",
    desc: "Lawsuit filed by Yong Yang's family against the City of Los Angeles and LAPD officers involved in the shooting.",
    status: "Active",
  },
  {
    href: "/legal/federal-lawsuit",
    caseNo: "2:26-cv-01014",
    title: "Federal Civil Rights Lawsuit",
    court: "U.S. District Court, Central District of California",
    type: "42 U.S.C. § 1983 — Civil Rights",
    desc: "Federal civil rights lawsuit alleging violations of Yong Yang's constitutional rights under the Fourth and Fourteenth Amendments.",
    status: "Active",
  },
];

export default function LegalPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-muted mb-2">Court Cases</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Legal Cases
        </h1>
        <p className="text-muted max-w-2xl">
          Three active legal actions filed in pursuit of accountability and justice for Yong Yang and his family.
        </p>
      </div>

      <div className="space-y-4">
        {cases.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group block p-6 border border-border rounded-xl hover:border-(--accent)/40 hover:bg-[#1a1612] transition-all"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <span className="text-xs font-mono text-accent mb-1 block">{c.caseNo}</span>
                <h2 className="font-serif text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                  {c.title}
                </h2>
              </div>
              <span className="text-xs px-2 py-1 rounded-full border border-emerald-800/50 text-emerald-400 bg-emerald-950/30">
                {c.status}
              </span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
              <span className="text-xs text-muted">{c.court}</span>
              <span className="text-xs text-muted">·</span>
              <span className="text-xs text-muted">{c.type}</span>
            </div>
            <p className="text-sm text-[#7a7060] leading-relaxed">{c.desc}</p>
            <span className="mt-4 inline-flex items-center text-xs text-accent group-hover:text-accent-light">
              View case documents →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
