import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Justice for Yong Yang",
  description:
    "Yong Yang was killed by LAPD on May 2, 2024. This site documents the legal fight, community organizing, and the truth behind his death.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Justice for Yong Yang",
    description:
      "Yong Yang was killed by LAPD on May 2, 2024. Documenting the fight for justice and accountability.",
    url: "https://justiceforyongyang.com",
  },
};

const quickLinks = [
  {
    href: "/yong",
    title: "Who Was Yong?",
    desc: "Learn about Yong Yang — his life, his family, and the circumstances of his death.",
    icon: "◈",
  },
  {
    href: "/what-happened",
    title: "What Happened",
    desc: "The facts of how Yong was killed, where, and the evidence that followed.",
    icon: "◉",
  },
  {
    href: "/legal",
    title: "Legal Cases",
    desc: "Civil petition, civil lawsuit, and federal lawsuit filed on behalf of Yong's family.",
    icon: "◇",
  },
  {
    href: "/events",
    title: "Take Action",
    desc: "Community organizing, protests, and public gatherings in support of justice.",
    icon: "◆",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-[#1a1208] via-background to-background pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted mb-6">
            May 2, 2024 · Los Angeles, CA
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Justice for{" "}
            <span className="text-accent">Yong Yang</span>
          </h1>
          <p className="text-lg text-[#a09880] max-w-2xl mx-auto leading-relaxed mb-10">
            Yong Yang, a 40-year-old Korean American, was killed by LAPD officers on May 2, 2024.
            This site documents the community&apos;s pursuit of accountability, the legal proceedings,
            and the truth behind his death.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/yong"
              className="px-6 py-3 bg-accent text-black text-sm font-semibold rounded-lg hover:bg-accent-light transition-colors"
            >
              Yong&apos;s Story
            </Link>
            <Link
              href="/what-happened"
              className="px-6 py-3 bg-transparent border border-border text-foreground text-sm font-medium rounded-lg hover:border-(--accent)/60 hover:text-accent transition-colors"
            >
              What Happened
            </Link>
            <Link
              href="/legal"
              className="px-6 py-3 bg-transparent border border-border text-foreground text-sm font-medium rounded-lg hover:border-(--accent)/60 hover:text-accent transition-colors"
            >
              Legal Cases
            </Link>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="max-w-300 mx-auto px-4 sm:px-6 py-16">
        <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Learn More</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group p-6 border border-border rounded-xl hover:border-(--accent)/40 hover:bg-[#1a1612] transition-all"
            >
              <span className="text-2xl text-accent mb-3 block">{item.icon}</span>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* What happened */}
      <section className="border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="font-serif text-2xl font-bold text-accent-light mb-6">What Happened</h2>
          <div className="prose">
            <p>
              On May 2, 2024, LAPD officers responded to a mental health crisis call involving Yong
              Yang, a 40-year-old Korean American living in the Koreatown area of Los Angeles. Yong
              was shot and killed by LAPD officers. He was unarmed in the way that matters most — he
              posed no lethal threat that warranted deadly force.
            </p>
            <p>
              His family, community members, and advocates have been fighting ever since for
              accountability, transparency, and justice — through the courts, through public
              organizing, and through continued community pressure on the LAPD and the Los Angeles
              District Attorney&apos;s office.
            </p>
            <p>
              Three active legal cases are currently in progress:{" "}
              <Link href="/legal/civil-petition">a civil petition (24STCP02107)</Link>,{" "}
              <Link href="/legal/civil-lawsuit">a civil lawsuit (24STCV24804)</Link>, and{" "}
              <Link href="/legal/federal-lawsuit">
                a federal civil rights lawsuit (2:26-cv-01014)
              </Link>
              .
            </p>
          </div>
          <div className="mt-6">
            <Link href="/what-happened" className="text-sm text-accent hover:text-accent-light">
              Full account of what happened →
            </Link>
          </div>
        </div>
      </section>

      {/* Events strip */}
      <section className="border-t border-border">
        <div className="max-w-300 mx-auto px-4 sm:px-6 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-foreground mb-1">
              Events &amp; Rallies
            </h2>
            <p className="text-sm text-muted">
              The community continues to organize and demand justice.
            </p>
          </div>
          <Link
            href="/events"
            className="shrink-0 text-sm text-accent hover:text-accent-light transition-colors"
          >
            View all events →
          </Link>
        </div>
      </section>
    </>
  );
}
