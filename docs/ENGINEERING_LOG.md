# ENGINEERING_LOG.md

## 2026-07-07

- **PR1 /review completed** (7 passes: critical checklist, 4 specialists,
  Claude adversarial, Codex adversarial + structured; Codex gate PASS) and all
  findings actioned on `phase6/pr1-storage-foundation`. Storage hardening
  (cross-model top finding): `write()` now reports success and the legacy
  quest key is deleted only after a confirmed v1 write (failed write ⇒
  migration retries next load); `readRaw` distinguishes absent vs invalid so
  a corrupt v1 key never re-triggers migration from stale legacy data; hooks
  persist only after a user mutation (dirty flag) so corrupt-but-recoverable
  stored bytes survive page loads; mutations before hydration are ignored;
  `useStoredMap` rejects array-shaped values. Share links: new `NodeParamSync`
  child (useSearchParams inside its own Suspense — tree stays out of the
  boundary, decision 2A intact) reconciles same-segment Next navigations
  (header link now clears panel + PR2 search destinations will open it);
  `onSelectionChange` makes keyboard Enter/Space/Escape node selection drive
  the panel/URL (React Flow never calls onNodeClick from keyboard); Escape
  closes the panel; camera pan respects prefers-reduced-motion. Polish: quest
  copy is atlas-native ("charted"), earned counter no longer announces the
  hydration 0→N flip to screen readers, brass-shimmer uses the
  --brass-bright token via color-mix, sorted certs hoisted to module scope,
  `LEGACY_QUEST_PROGRESS_KEY` exported from quests.ts, COPY_RESET_MS named,
  Certification.id documented as storage identity. Tests 31 → 42 (migration
  failure paths, corrupt v1/legacy, URL write/clear, Escape, clipboard
  rejection, read-only badge, array-shape map, spine-id integrity; counts now
  derived from data). Added `.github/workflows/ci.yml` (lint + test + build)
  — the repo's first CI. TODOS.md gained multi-tab sync (accepted limitation)
  and panel focus management. Lint clean, 42/42 tests, build clean (17
  routes, /tree still static).

## 2026-07-03

- **Phase 6 PR1 implemented** on branch `phase6/pr1-storage-foundation` (5 WIP
  commits; /ship will squash). Test infra: Vitest + RTL + jsdom with
  ResizeObserver/DOMMatrixReadOnly/DOMRect/IntersectionObserver stubs in
  `vitest.setup.ts` (React Flow + framer-motion whileInView need them);
  `npm test` runs 31 tests. Used Vite's native `resolve.tsconfigPaths` instead
  of the deprecated vite-tsconfig-paths plugin. Storage: `src/lib/storage.ts`
  ships `useStoredSet`/`useStoredMap` (versioned `careeratlas:v1:*` keys,
  hydration guard, try/catch reads/writes in effects outside setState updaters,
  one-time legacy migration that removes the old key). Quests: stable ids on
  all 27 quests (`w1-*`…`y1-*`), `migrateLegacyQuestProgress` maps old
  `phaseId::title` entries and drops unknowns; QuestRoadmap rewired. Data:
  content-graph integrity suite (unique ids, nextRoles exist, DAG check, unique
  positions, cert sources, quest-id uniqueness). Certs: tri-state
  Planned → In Progress → Earned via one `useStoredMap` in the new
  `CertificationsIndex` client shell (single hook instance so badges never
  race); cycle button in badge header; medallion states (brass ring / breathing
  half-fill / filled + one-shot shimmer, never on hydration); ASIS spine lights
  Earned segments + "N of 10 earned" counter. Tree: `/tree?node=<id>` share
  links via location+replaceState+popstate (deliberately not useSearchParams),
  camera `setCenter` pan on arrival/popstate only, silent fallback on bad ids,
  "Copy node link" with ✓ micro-state + aria-live. New globals.css recipes:
  `brass-shimmer`, `status-breathe`, `.focus-brass`, all reduced-motion-aware.
  Verified live via browse daemon: migration, toggle persistence, cert cycle +
  reload, share arrival/pan, URL sync, invalid-id fallback, corrupt-storage
  recovery. `npm test` 31/31, lint clean, `npm run build` clean (17 routes).
  Note: headless daemon denies clipboard-write permission (env limitation);
  copy flow verified with a stubbed clipboard + trusted click.

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
