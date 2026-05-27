import type { Metadata } from "next"
import Link from "next/link"
import DayTimeline from "@/components/DayTimeline"
import MilestoneCard from "@/components/MilestoneCard"
import PressCard from "@/components/PressCard"
import {
  familyMilestones,
  featuredPress,
  getInvolvedActions,
  siteFacts,
} from "@/lib/site-content"

export const metadata: Metadata = {
  title: "Justice for Yong Yang — Timeline of May 2, 2024",
  description:
    "Yong Yang was killed by LAPD during a mental health crisis on May 2, 2024. Explore the minute-by-minute timeline, body camera footage, and the family's fight for justice.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Justice for Yong Yang",
    description:
      "Interactive timeline of the day LAPD killed Yong Yang — and the fight for accountability that followed.",
    url: "https://justiceforyongyang.com",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Justice for Yong Yang",
  url: "https://justiceforyongyang.com",
  description:
    "Advocacy and memorial site documenting the LAPD killing of Yong Yang on May 2, 2024 and the fight for justice.",
  sameAs: ["https://www.youtube.com/@JusticeForYongYang"],
}

export default function HomePage() {
  const topMilestones = familyMilestones.slice(0, 4)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero — short, dignified, points to timeline */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-[#1a1208] via-background to-background pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted mb-4">
            May 2, 2024 · Koreatown, Los Angeles
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-5">
            Justice for{" "}
            <span className="text-accent">Yong Yang</span>
          </h1>
          <p className="text-lg text-[#a09880] max-w-2xl mx-auto leading-relaxed mb-8">
            Yong called for help during a mental health crisis at his parents&apos; home.
            LAPD shot and killed him within minutes. This timeline shows what happened — and
            what his family is doing about it.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="#timeline"
              className="px-6 py-3 bg-accent text-black text-sm font-semibold rounded-lg hover:bg-accent-light transition-colors"
            >
              Explore the Timeline
            </a>
            <Link
              href="/yong"
              className="px-6 py-3 bg-transparent border border-border text-foreground text-sm font-medium rounded-lg hover:border-(--accent)/60 hover:text-accent transition-colors"
            >
              Remember Yong
            </Link>
            <Link
              href="/get-involved"
              className="px-6 py-3 bg-transparent border border-border text-foreground text-sm font-medium rounded-lg hover:border-(--accent)/60 hover:text-accent transition-colors"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>

      {/* Timeline — front and center */}
      <section id="timeline" className="border-b border-border scroll-mt-16">
        <div className="max-w-300 mx-auto px-4 sm:px-6 pt-8 pb-2 sm:pt-10">
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted mb-2">Evidence</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                May 2, 2024 — Minute by Minute
              </h2>
              <p className="text-sm text-muted mt-2 max-w-xl">
                Drag to pan · Ctrl+scroll to zoom · Click any event for photos, video, and details.
                The shooting cluster is around 11:54 AM.
              </p>
            </div>
            <Link
              href="/what-happened#bodycam"
              className="shrink-0 text-sm text-accent hover:text-accent-light transition-colors"
            >
              Body camera footage →
            </Link>
          </div>
          <DayTimeline />
        </div>
      </section>

      {/* Key facts */}
      <section className="border-b border-border">
        <div className="max-w-300 mx-auto px-4 sm:px-6 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {siteFacts.map((fact) => (
              <div
                key={fact.label}
                className="p-6 border border-border rounded-xl bg-[#12100e] text-center"
              >
                <p className="font-serif text-3xl sm:text-4xl font-bold text-accent mb-2">
                  {fact.value}
                </p>
                <p className="text-sm font-medium text-foreground mb-1">{fact.label}</p>
                <p className="text-xs text-muted leading-relaxed">{fact.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Family advocacy */}
      <section className="border-b border-border">
        <div className="max-w-300 mx-auto px-4 sm:px-6 py-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted mb-2">Family &amp; Community</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                What Yong&apos;s Parents Have Built
              </h2>
              <p className="text-muted max-w-2xl mt-2 text-sm">
                From the first press conference to federal court — a fight for truth, reform, and
                accountability that has moved institutions.
              </p>
            </div>
            <Link href="/community" className="text-sm text-accent hover:text-accent-light shrink-0">
              Full community story →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topMilestones.map((m) => (
              <MilestoneCard key={m.id} item={m} />
            ))}
          </div>
        </div>
      </section>

      {/* Curated press */}
      <section className="border-b border-border">
        <div className="max-w-300 mx-auto px-4 sm:px-6 py-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted mb-2">In the News</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                Coverage That Matters
              </h2>
              <p className="text-muted max-w-2xl mt-2 text-sm">
                We curate the most significant reporting — not hundreds of duplicate clips.
              </p>
            </div>
            <Link href="/press" className="text-sm text-accent hover:text-accent-light shrink-0">
              All press →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredPress.map((item) => (
              <PressCard key={item.id} item={item} compact />
            ))}
          </div>
        </div>
      </section>

      {/* Legal strip */}
      <section className="border-b border-border">
        <div className="max-w-300 mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 p-6 sm:p-8 border border-border rounded-2xl bg-[#12100e]">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted mb-2">Legal Fight</p>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-2">
                Three Active Cases
              </h2>
              <p className="text-sm text-muted max-w-xl">
                Bodycam petition (granted), state wrongful death lawsuit, and federal civil rights
                case filed January 2026.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/legal/federal-lawsuit"
                className="text-sm px-4 py-2 border border-border rounded-lg hover:border-(--accent)/40 hover:text-accent transition-colors"
              >
                Federal case
              </Link>
              <Link
                href="/legal/civil-lawsuit"
                className="text-sm px-4 py-2 border border-border rounded-lg hover:border-(--accent)/40 hover:text-accent transition-colors"
              >
                State lawsuit
              </Link>
              <Link
                href="/legal"
                className="text-sm px-4 py-2 bg-accent text-black font-medium rounded-lg hover:bg-accent-light transition-colors"
              >
                All legal →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Get involved */}
      <section>
        <div className="max-w-300 mx-auto px-4 sm:px-6 py-14">
          <p className="text-xs uppercase tracking-widest text-muted mb-2">Take Action</p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-8">
            Help Spread the Truth
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {getInvolvedActions.slice(0, 3).map((action) => (
              <Link
                key={action.id}
                href={action.href}
                {...(action.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group p-5 border border-border rounded-xl hover:border-(--accent)/40 hover:bg-[#1a1612] transition-all"
              >
                <h3 className="font-serif font-semibold text-foreground group-hover:text-accent transition-colors mb-2">
                  {action.title}
                </h3>
                <p className="text-sm text-[#6a6050] leading-relaxed">{action.summary}</p>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/get-involved" className="text-sm text-accent hover:text-accent-light">
              More ways to help →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
