import type { Metadata } from "next";
import Link from "next/link";
import { events } from "@/lib/events";

export const metadata: Metadata = {
  title: "Events & Community Action",
  description:
    "Community events, rallies, and public actions in support of justice for Yong Yang — from memorial services to city hall.",
  alternates: { canonical: "/events" },
};

const upcomingEvents = events.filter((e) => e.year >= 2026);
const pastEvents = events.filter((e) => e.year < 2026);

export default function EventsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-muted mb-2">Community Action</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Events &amp; Rallies
        </h1>
        <p className="text-muted max-w-2xl">
          From memorial services to city hall, the community has organized continuously since May 2, 2024.
        </p>
      </div>

      <div className="flex gap-3 mb-8">
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

      {upcomingEvents.length > 0 && (
        <section className="mb-10">
          <h2 className="font-serif text-xl font-semibold text-foreground mb-4">Upcoming</h2>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="font-serif text-xl font-semibold text-foreground mb-4">Past Events</h2>
        <div className="space-y-3">
          {pastEvents.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}

function EventCard({ event }: { event: (typeof events)[number] }) {
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
  );
}
