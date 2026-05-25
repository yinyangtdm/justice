# Justice for Yong Yang — Project Notes

## What this is

A Next.js 15 advocacy website documenting the LAPD killing of Yong Yang (May 2, 2024) and the family's legal fight for accountability. Live at justiceforyongyang.com.

## Stack

- Next.js 15, React 19, TypeScript, Tailwind CSS v4
- Deployed via Docker container named `jfy`, running on port 3000
- Standalone Next.js output (`output: 'standalone'` assumed from Dockerfile)

## Rebuild / redeploy

Always use:

```
npm run docker
```

This runs: Next.js build → Docker image build → stop/remove old container → start new one. Never suggest the raw docker command chain.

## Key files

- `components/DayTimeline.tsx` — interactive timeline of May 2 events, with zoom zones
- `lib/events.ts` — shared event data
- `app/` — Next.js app router pages (legal, events, news, yong, references, art, videos)
