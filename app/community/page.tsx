import type { Metadata } from "next"
import Link from "next/link"
import MilestoneCard from "@/components/MilestoneCard"
import { events } from "@/lib/events"
import { familyMilestones } from "@/lib/site-content"

export const metadata: Metadata = {
  title: "Community & Family Advocacy",
  description:
    "Rallies, memorials, and public advocacy by Yong Yang's family and community — from Koreatown to LA City Hall to the APA.",
  alternates: { canonical: "/community" },
}

const upcomingEvents = events.filter((e) => e.year >= 2026)
const pastEvents = events.filter((e) => e.year < 2026)

export default function CommunityPage() {
  return (
    <div className="max-w-300 mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10 max-w-3xl">
        <p className="text-xs uppercase tracking-widest text-muted mb-2">Community</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Community &amp; Family Advocacy
        </h1>
        <p className="text-muted leading-relaxed">
          Yong&apos;s parents did not retreat after losing their son. They organized press
          conferences, testified before the Police Commission, spoke at the American Psychiatric
          Association, and led four major rallies — while pursuing justice in three courts.
        </p>
      </div>

      <section id="advocacy" className="mb-14 scroll-mt-20">
        <h2 className="font-serif text-xl font-semibold text-foreground mb-2">
          What the Family Has Accomplished
        </h2>
        <p className="text-sm text-muted mb-6 max-w-2xl">
          Public milestones — the work that turned a private tragedy into a movement.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {familyMilestones.map((m) => (
            <MilestoneCard key={m.id} item={m} />
          ))}
        </div>
      </section>

      {upcomingEvents.length > 0 && (
        <section id="upcoming" className="mb-14 scroll-mt-20">
          <h2 className="font-serif text-xl font-semibold text-foreground mb-4">Upcoming</h2>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <EventRow key={event.slug} event={event} />
            ))}
          </div>
        </section>
      )}

      <section className="mb-8">
        <div className="flex flex-wrap gap-3 mb-6">
          {[2026, 2025, 2024].map((year) => (
            <Link
              key={year}
              href={`/events/${year}`}
              className="text-sm px-3 py-1.5 border border-border rounded-lg text-muted hover:border-(--accent)/40 hover:text-accent transition-colors"
            >
              {year}
            </Link>
          ))}
        </div>
        <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
          Rallies &amp; Memorials
        </h2>
        <div className="space-y-3">
          {pastEvents.map((event) => (
            <EventRow key={event.slug} event={event} />
          ))}
        </div>
      </section>

      <section className="border border-border rounded-xl p-6 sm:p-8 bg-[#12100e]">
        <h2 className="font-serif text-lg font-semibold text-foreground mb-2">Art for Yong</h2>
        <p className="text-sm text-muted mb-4">
          Artists across Los Angeles have created work in Yong&apos;s memory — portraits, murals,
          and community tributes.
        </p>
        <Link
          href="/art"
          className="text-sm text-accent hover:text-accent-light transition-colors"
        >
          View art gallery →
        </Link>
      </section>
    </div>
  )
}

function EventRow({ event }: { event: (typeof events)[number] }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group flex gap-5 p-5 border border-border rounded-xl hover:border-(--accent)/40 hover:bg-[#1a1612] transition-all"
    >
      <div className="shrink-0 text-right min-w-24">
        <span className="text-xs text-muted leading-tight block">{event.date}</span>
      </div>
      <div className="min-w-0">
        <h3 className="font-serif text-base font-semibold text-foreground group-hover:text-accent transition-colors mb-1">
          {event.title}
        </h3>
        <p className="text-xs text-muted mb-1">{event.location}</p>
        <p className="text-sm text-[#6a6050] leading-relaxed">{event.desc}</p>
      </div>
    </Link>
  )
}
