import type { Metadata } from "next";
import DayTimeline from "@/components/DayTimeline";

export const metadata: Metadata = {
  title: "Timeline — May 2, 2024",
  description:
    "Minute-by-minute timeline of May 2, 2024 — the day LAPD shot and killed Yong Yang in Koreatown, Los Angeles.",
  alternates: { canonical: "/timeline" },
};

export default function TimelinePage() {
  return (
    <div className="max-w-300 mx-auto px-4 sm:px-6 pt-4 pb-0 sm:pt-10 sm:pb-0">
      <div className="mb-4 sm:mb-6">
        <p className="text-xs uppercase tracking-widest text-muted mb-2">May 2, 2024</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Timeline
        </h1>
        <p className="text-sm text-muted">
          Drag or scroll to pan · Ctrl+scroll to zoom · Click any event to read details
        </p>
      </div>
      <DayTimeline />
    </div>
  );
}
