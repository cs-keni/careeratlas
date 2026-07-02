# ENGINEERING_LOG.md

## 2026-07-02

- Project inception. Scaffolded Next.js 15 + TS + Tailwind v4 (App Router, src dir),
  installed framer-motion and @xyflow/react.
- Researched certification requirements from current sources (ASIS APP/PSP/CPP, PMI PMP,
  BICSI RCDD) so the Certification Roadmap cites real eligibility rules instead of
  invented ones.
- Created PHASES.md (6-phase plan) and docs/ (AI_CONTEXT, HANDOFF, CURRENT_TASK, this log).
- Built the full site: data model + content (`src/data/` — 32 career nodes, 7 paths,
  10 certifications with sources, 17 codex entries, 27 quests, SWE↔PSE comparison),
  field-atlas design system (Tailwind v4 tokens in globals.css; Fraunces/Archivo/
  IBM Plex Mono), React Flow skill tree with custom nodes + slide-in detail panel +
  path filters, and all 7 routes (home, tree, paths index/detail, certifications,
  codex, first-90-days, compare).
- QA fixes found via headless-browser review: tree legend moved from canvas overlay
  to a static bar (overlay hid the Jr PSE base node); minimap given hex node colors
  (`pathHex`) and a dark SVG background (CSS vars don't resolve in SVG fills);
  `shortName` added to CareerPath for compact legend labels.
- Verified responsive behavior at 375px (hamburger nav, stacked hero, touch-usable
  tree) and clean static production build (17 routes).
- Commit: `a5f52c6` — initial build on `main`. No git remote configured yet, so
  the push step is pending until one is added.
