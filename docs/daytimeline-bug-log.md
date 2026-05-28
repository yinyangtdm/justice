# DayTimeline bug log

Living record of bugs caused by changes to `DayTimeline.tsx` (or closely related layout). **Read before editing the timeline.** **Append an entry when a change introduces or reintroduces a bug** — even if fixed in the same session.

Linked from `.cursor/rules/daytimeline-regression-guard.mdc`.

---

## How to add an entry

When a DayTimeline edit causes a visible bug (or reopens a known one):

1. Add a row to the table below (newest first).
2. If the fix is a new invariant, add it to `daytimeline-regression-guard.mdc`.
3. Do not delete old rows — they are the history of what keeps breaking.

| Date | Symptom | Change that caused it | Root cause | Fix | Invariant |
|------|---------|----------------------|------------|-----|-----------|
| 2026-05-27 | Page stretches past screen in DevTools responsive mode | Event panel layout work (side-by-side media + description) | `portrait` used `(orientation: portrait)` only; narrow landscape frames still got desktop `renderEventContent` | `COMPACT_LAYOUT_MQ = "(orientation: portrait), (max-width: 768px)"`; width-first media; capped embedded height; `overflow-x-hidden` on body | Compact layout MQ; no `h-dvh` in-page; `w-full max-h-full` media |
| 2026-05-27 | Same horizontal overflow in event panel with video | Landscape media sized `h-full w-auto aspect-video` | Height-first sizing expands width past flex column | `w-full max-h-full min-h-0 aspect-video` | Width-first media in landscape panel |
| 2026-05-27 | Timeline taller than viewport on `/timeline` mobile | Embedded timeline used `h-dvh` | Full viewport height + site header/footer = vertical overflow | `h-[min(720px,calc(100dvh-8rem))]` when not fullscreen | No `h-dvh` in-page |
| 2026-05-27 | Three red tabs stacked in one lane at ~11:58 | Tab lane assignment edits | Lower-priority colors took lanes; reds piled via `Math.min(lane, 2)` | Sort by `COLOR_PRI` desc, assign lanes 0→2 in order | Tab lane COLOR_PRI sort |
| 2026-05-27 | Long description (e.g. event 16) blows out panel / no scroll | Event panel flex layout (`justify-center`, missing min-h-0) | Flex children couldn't shrink; content pushed layout | `min-h-0`, `overflow-hidden` on row; `overflow-y-auto` on text column; `justify-start` | Flex overflow on event panel |

---

## Entry template (copy for new bugs)

```markdown
| YYYY-MM-DD | What the user saw | What we changed | Why it broke | What fixed it | Rule/checklist item to add |
```
