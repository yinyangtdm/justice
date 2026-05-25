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
    <div className="mx-auto flex min-h-0 w-full max-w-[1440px] flex-1 flex-col px-4 py-3 sm:px-6 sm:py-4 max-md:px-0 max-md:py-0">
      <DayTimeline variant="page" />
    </div>
  );
}
