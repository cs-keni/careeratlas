# HANDOFF.md

Latest handoff notes between agents. Newest at top.

## 2026-07-02 — Claude Code — Initial build (COMPLETE)

Build finished, visually QA'd (desktop + mobile via headless browser), `npm run build`
clean — all 17 routes static. Everything below shipped as planned, with these deltas:

- **Structure note:** the planned `MobileTreeList` was skipped — React Flow handles
  touch pan/zoom well and the detail panel goes full-width on mobile. A list view
  remains a Phase 6 option.
- **Tree legend** is a static bar above the canvas (an overlay version hid the
  base node); path `shortName` field added to `CareerPath` for it.
- **Minimap** needs hex colors, not CSS vars (SVG fills) — hence `pathHex()` in
  `src/lib/pathColors.ts` alongside `pathColor()`.
- **Quest progress** (localStorage checkboxes + XP bar) shipped early in
  `QuestRoadmap` — key: `careeratlas-quest-progress`.
- Fonts landed as Fraunces / Archivo / IBM Plex Mono.

## 2026-07-02 — Claude Code — Initial build plan (superseded, kept for context)

Greenfield build of CareerAtlas per Kenny's full spec (see PHASES.md for plan and progress).

**Component ownership / structure (planned):**
- `src/components/tree/` — CareerTree (React Flow canvas), CareerRoleNode (custom node),
  CareerNodeCard (detail side panel), TreeLegend, MobileTreeList
- `src/components/paths/` — PathDetail sections
- `src/components/certs/` — CertificationBadge
- `src/components/codex/` — SkillCodexCard
- `src/components/quests/` — QuestRoadmap
- `src/components/ui/` — shared primitives (TierBadge, StatRow, SectionHeading, EstimateTag)
- `src/components/layout/` — SiteHeader, SiteFooter, PageShell

**Architecture notes:**
- Content is 100% static TS data in `src/data/` — no backend, no CMS.
- Tailwind v4: theme tokens live in `src/app/globals.css` under `@theme`, not a config file.
- React Flow requires client components; keep `"use client"` at the tree boundary only.

**Gotchas for the next agent:**
- Salary/YoE figures are estimates by design — UI must keep the "estimate" labels.
- Cert requirements carry source URLs in `src/data/certifications.ts`; don't edit numbers
  without re-checking sources.
- Repo lives on `/mnt/c` (WSL) — npm is slow; prefer targeted installs.
- No git remote configured yet — commits are local only until Kenny adds one.
