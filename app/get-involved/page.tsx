import type { Metadata } from "next"
import Link from "next/link"
import { getInvolvedActions } from "@/lib/site-content"

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Share the timeline, support AB572, join rallies, and stay connected as we launch a nonprofit foundation in Yong Yang's name.",
  alternates: { canonical: "/get-involved" },
}

export default function GetInvolvedPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-muted mb-2">Take Action</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Get Involved
        </h1>
        <p className="text-muted max-w-2xl leading-relaxed">
          Most people have never seen what happened on May 2, 2024. You can help by sharing the
          truth, showing up for the community, and supporting the reforms Yong&apos;s family is
          fighting for.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
        {getInvolvedActions.map((action) => {
          const Tag = action.external ? "a" : Link
          const props = action.external
            ? { href: action.href, target: "_blank", rel: "noopener noreferrer" as const }
            : { href: action.href }

          return (
            <Tag
              key={action.id}
              {...props}
              className="group p-6 border border-border rounded-xl hover:border-(--accent)/40 hover:bg-[#1a1612] transition-all"
            >
              <h2 className="font-serif text-lg font-semibold text-foreground group-hover:text-accent transition-colors mb-2">
                {action.title}
              </h2>
              <p className="text-sm text-[#6a6050] leading-relaxed">{action.summary}</p>
            </Tag>
          )
        })}
      </div>

      <section id="ab572" className="mb-14 scroll-mt-20 prose max-w-none">
        <h2>Support AB572</h2>
        <p>
          AB572 is California legislation aimed at police accountability and improving mental
          health crisis response — so that calling for help does not become a death sentence.
        </p>
        <p>
          Yong&apos;s case is exactly why this bill matters. Learn more through{" "}
          <Link href="/legal">our legal pages</Link> and follow updates on{" "}
          <a
            href="https://www.youtube.com/@JusticeForYongYang"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube
          </a>
          .
        </p>
      </section>

      <section id="foundation" className="scroll-mt-20 border border-border rounded-xl p-6 sm:p-8 bg-[#12100e]">
        <h2 className="font-serif text-xl font-semibold text-foreground mb-3">
          Yong Yang Foundation — Coming Soon
        </h2>
        <p className="text-sm text-muted leading-relaxed mb-4 max-w-2xl">
          We are forming a nonprofit in Yong&apos;s name to continue advocacy for mental health
          crisis reform, police accountability, and support for families who lose loved ones to
          state violence. This site will become the hub for that work.
        </p>
        <p className="text-sm text-[#6a6050]">
          For now: share the{" "}
          <Link href="/#timeline" className="text-accent hover:text-accent-light">
            timeline
          </Link>
          , attend{" "}
          <Link href="/community" className="text-accent hover:text-accent-light">
            community events
          </Link>
          , and subscribe on{" "}
          <a
            href="https://www.youtube.com/@JusticeForYongYang"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-light"
          >
            YouTube
          </a>{" "}
          for launch announcements.
        </p>
      </section>
    </div>
  )
}
