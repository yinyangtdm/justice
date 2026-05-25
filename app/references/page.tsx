import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resources & References",
  description:
    "Legal references, government resources, police accountability data, and organizational links relevant to the case of Yong Yang.",
  alternates: { canonical: "/references" },
};

const sections = [
  {
    title: "Government — Law Enforcement",
    links: [
      { label: "LAPD", href: "https://lapdonline.org", external: true },
      { label: "LA Police Commission", href: "https://www.lapdonline.org/office-of-the-inspector-general/police-commission/", external: true },
    ],
  },
  {
    title: "Government — Prosecution",
    links: [
      { label: "LA County District Attorney", href: "https://da.lacounty.gov", external: true },
      { label: "California DOJ", href: "https://oag.ca.gov", external: true },
      { label: "U.S. Department of Justice", href: "https://justice.gov", external: true },
    ],
  },
  {
    title: "Courts",
    links: [
      { label: "LA Superior Court", href: "https://www.lacourt.org", external: true },
      { label: "9th Circuit Court of Appeals", href: "https://www.ca9.uscourts.gov", external: true },
      { label: "Supreme Court of the U.S.", href: "https://supremecourt.gov", external: true },
    ],
  },
  {
    title: "Organizations",
    links: [
      { label: "Asian Mental Health Project", href: "https://asianmentalhealthproject.com", external: true },
      { label: "American Psychiatric Association (APA)", href: "https://psychiatry.org", external: true },
      { label: "SNUAA USA", href: "/references/organizations/snuaa", external: false },
      { label: "Korean Consulate General – Los Angeles", href: "/references/organizations/consulate", external: false },
    ],
  },
  {
    title: "Similar Cases & Patterns",
    links: [
      { label: "Victoria Lee", href: "/references/killings/victoria-lee", external: false },
      { label: "The Pattern: Kill, Justify, Repeat", href: "/references/killings/pattern", external: false },
    ],
  },
];

export default function ReferencesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-muted mb-2">Research</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
          References
        </h1>
        <p className="text-muted max-w-2xl">
          Legal references, government resources, organizations, and related cases.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
              {section.title}
            </h2>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#7a7060] hover:text-accent transition-colors"
                    >
                      {link.label} ↗
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-[#7a7060] hover:text-accent transition-colors"
                    >
                      {link.label} →
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
