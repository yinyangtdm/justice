import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { events, VALID_YEARS, type ValidYear } from "@/lib/events";

type Props = { params: Promise<{ year: string }> };

export async function generateStaticParams() {
  return VALID_YEARS.map((year) => ({ year: String(year) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;
  return {
    title: `${year} Events`,
    description: `Community events and actions in support of justice for Yong Yang during ${year}.`,
    alternates: { canonical: `/events/${year}` },
  };
}

export default async function YearEventsPage({ params }: Props) {
  const { year: yearStr } = await params;
  const year = Number(yearStr) as ValidYear;

  if (!VALID_YEARS.includes(year)) notFound();

  const yearEvents = events.filter((e) => e.year === year);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-6">
        <Link href="/events" className="text-xs text-muted hover:text-accent transition-colors">
          ← All events
        </Link>
      </div>

      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-muted mb-2">Community Action</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
          {year} Events
        </h1>
      </div>

      <div className="flex gap-3 mb-8">
        {VALID_YEARS.map((y) => (
          <Link
            key={y}
            href={`/events/${y}`}
            className={`text-sm px-3 py-1.5 border rounded-lg transition-colors ${
              y === year
                ? "border-accent text-accent"
                : "border-border text-muted hover:border-(--accent)/40 hover:text-accent"
            }`}
          >
            {y}
          </Link>
        ))}
      </div>

      {yearEvents.length === 0 ? (
        <p className="text-muted">No events recorded for {year} yet.</p>
      ) : (
        <div className="space-y-3">
          {yearEvents.map((event) => (
            <Link
              key={event.slug}
              href={`/events/${event.slug}`}
              className="group flex gap-5 p-5 border border-border rounded-xl hover:border-(--accent)/40 hover:bg-[#1a1612] transition-all"
            >
              <div className="shrink-0 text-right min-w-24">
                <span className="text-xs text-muted leading-tight block">{event.date}</span>
              </div>
              <div className="min-w-0">
                <h2 className="font-serif text-base font-semibold text-foreground group-hover:text-accent transition-colors mb-1">
                  {event.title}
                </h2>
                <p className="text-xs text-muted mb-1">{event.location}</p>
                <p className="text-sm text-[#6a6050] leading-relaxed">{event.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
