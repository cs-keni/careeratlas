# ENGINEERING_LOG.md

## 2026-07-03

- Added gstack skill routing rules to CLAUDE.md so agent requests auto-route to the
  right slash skill (/investigate for bugs, /ship for deploys, etc.). Config-only
  change, no code touched. Commit: `77c656d`.
- Vercel import complete (Kenny, via dashboard). Every push to `main` now
  auto-deploys. Note: `careeratlas.vercel.app` belongs to an unrelated project;
  our deployment lives under a different Vercel project URL.
- Phase 6 engineering review completed (/plan-eng-review + Codex outside voice).
  Rescoped to 3 sequenced PRs; PHASES.md rewritten, TODOS.md created. Key
  decisions: shared `useStoredSet` hook with versioned keys (`careeratlas:v1:*`),
  stable quest ids + legacy-key migration; share links via location/replaceState
  + popstate (not useSearchParams); full "atlas at day" light theme with
  hardcoded-color audit; grouped-substring search in a testable lib module (no
  library); My Build as edge-validated routes with mark-don't-delete repair;
  Vitest + RTL infra and a content-graph validation suite land in PR1. Test
  plan artifact written to ~/.gstack/projects/careeratlas/ for /qa.
- Phase 6 design review completed (/plan-design-review + Codex/Claude outside
  voices; design completeness 4/10 → 9/10). Day palette approved: Variant A
  "Reading Room" (paper #f4edda, ink #2b2418, brass #8a6c2c; sketch in
  ~/.gstack/projects/careeratlas/designs/tree-day-theme-20260703/). PHASES.md
  Phase 6 rewritten as a full UX contract: cert tracking is tri-state
  Planned/In Progress/Earned (map storage, brighten-not-dim), share links get
  camera-pan arrival + copy-link affordance, search is an "atlas index"
  overlay (icon button + / or Ctrl+K), My Build is a legend-bar mode with
  route rail + mobile stepper list, status tokens (oxide/verdigris) added to
  the system, full a11y package, light tokens produced as an artifact before
  PR2, DESIGN.md authored in PR2. TODOS.md gains multi-route upgrade entry.

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
