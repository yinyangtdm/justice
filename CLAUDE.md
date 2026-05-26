# Justice for Yong Yang — Project Notes

## What this is

A Next.js 15 advocacy website documenting the LAPD killing of Yong Yang (May 2, 2024) and the family's legal fight for accountability. Live at justiceforyongyang.com.

## Stack

- Next.js 15, React 19, TypeScript, Tailwind CSS v4
- Standalone Next.js output (`output: 'standalone'` in Dockerfile — production only)

## Development workflow

**Daily dev: `npm run dev` on port 3000.** Do not suggest Docker, `npm run build`, or deploy unless the user explicitly asks to go live.

**Default rule: revert, don't repair.**

When something errors, looks wrong, or breaks dev:

1. **Stop** — don't stack fixes on top of a bad state
2. **Go back one step** — `git checkout -- .`, restore the last commit, or `git revert`
3. **Confirm clean** — page loads, no overlay errors
4. **Try again** — one small change only

Goal: a **stack of clean commits**, not a pile of patches on broken work.

### While working

- **One change at a time** — especially `DayTimeline.tsx`
- **Verify in the browser** before the next change
- **Commit only when you say it's right** — that commit becomes the new floor to revert to
- **One dev server** on port 3000 — don't run `npm run build` while `npm run dev` is up
- If dev acts broken: stop server, delete `.next`, `npm run dev` again

### When to revert

| Situation | Action |
|-----------|--------|
| 500 / module not found / CoerceError | Revert file or last commit, clear `.next`, restart dev |
| Feature wrong but no crash | Revert that change; redo smaller |
| Agent session went sideways | `git checkout HEAD -- <files>` or reset to last good commit |

Do **not** spend multiple turns debugging forward on a state you already know is bad.

## Production deploy (only when asked)

Docker is **not** part of normal dev. Only mention deploy if the user asks to ship or go live.

When they do, use `npm run docker` (build → Docker image → container `jfy` on port 3000). Never suggest the raw docker command chain unprompted.

## Key files

- `components/DayTimeline.tsx` — interactive timeline of May 2 events, with zoom zones
- `lib/events.ts` — shared event data
- `app/` — Next.js app router pages (legal, events, news, yong, references, art, videos)
