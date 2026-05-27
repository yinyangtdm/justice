import Link from "next/link"
import type { Milestone } from "@/lib/site-content"

export default function MilestoneCard({ item }: { item: Milestone }) {
  const inner = (
    <>
      <span className="text-xs text-muted block mb-1">{item.date}</span>
      <h3 className="font-serif text-base font-semibold text-foreground group-hover:text-accent transition-colors mb-1">
        {item.title}
      </h3>
      <p className="text-sm text-[#6a6050] leading-relaxed">{item.summary}</p>
    </>
  )

  if (item.href?.startsWith("http")) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block p-5 border border-border rounded-xl hover:border-(--accent)/40 hover:bg-[#1a1612] transition-all"
      >
        {inner}
      </a>
    )
  }

  if (item.href) {
    return (
      <Link
        href={item.href}
        className="group block p-5 border border-border rounded-xl hover:border-(--accent)/40 hover:bg-[#1a1612] transition-all"
      >
        {inner}
      </Link>
    )
  }

  return (
    <div className="p-5 border border-border rounded-xl bg-[#12100e]">{inner}</div>
  )
}
