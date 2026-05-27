import type { PressItem } from "@/lib/site-content"

const tagLabels: Record<NonNullable<PressItem["tag"]>, string> = {
  breaking: "Breaking",
  legal: "Legal",
  community: "Community",
  editorial: "Editorial",
}

type PressCardProps = {
  item: PressItem
  compact?: boolean
}

export default function PressCard({ item, compact }: PressCardProps) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col h-full p-5 border border-border rounded-xl hover:border-(--accent)/40 hover:bg-[#1a1612] transition-all"
    >
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="text-[10px] uppercase tracking-wider text-[#5a5040] font-medium">
          {item.outlet}
        </span>
        {item.tag && (
          <span className="text-[10px] px-1.5 py-px rounded bg-sky-500/10 text-sky-400 font-medium">
            {tagLabels[item.tag]}
          </span>
        )}
        {item.language !== "en" && (
          <span className="text-[10px] px-1.5 py-px rounded bg-[#2a2520] text-[#8a8070]">
            {item.language === "ko" ? "한국어" : item.language === "es" ? "Español" : "中文"}
          </span>
        )}
      </div>
      <h3
        className={`font-serif font-semibold text-foreground group-hover:text-accent transition-colors ${
          compact ? "text-sm mb-1 line-clamp-2" : "text-base mb-2"
        }`}
      >
        {item.title}
      </h3>
      {!compact && (
        <p className="text-sm text-[#6a6050] leading-relaxed mb-3 flex-1">{item.summary}</p>
      )}
      <span className="text-xs text-muted mt-auto">{item.date}</span>
    </a>
  )
}
