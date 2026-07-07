# HANDOFF.md

Latest handoff notes between agents. Newest at top.

## 2026-07-07 — Claude Code — PR1 review complete (awaiting /ship)

/review ran 7 passes (checklist, testing/maintainability/performance/design
specialists, Claude adversarial, Codex ×2, red team). Everything actioned;
42/42 tests, lint + build clean. Architecture changes since the 07-03 note:

- **Storage semantics changed** in `src/lib/storage.ts` — know these before PR3:
  - Hooks persist ONLY after a user mutation (`dirtyRef`). Merely hydrating
    never writes back, so corrupt stored bytes stay recoverable on disk.
  - Mutations before hydration are ignored (`if (!hydrated) return`).
  - `write()` returns success; the legacy quest key is deleted only after a
    confirmed v1 write. `readRaw` returns `absent | invalid | ok` — migration
    runs ONLY on `absent` (never over a corrupt v1 value).
- **`NodeParamSync`** (in `CareerTree.tsx`): tiny `useSearchParams` child in
  its own `<Suspense>` bridging router-driven `?node=` changes (same-segment
  `<Link>` navs fire neither remount nor popstate). PR2 search can rely on
  `/tree?node=<id>` opening the panel. The tree itself stays outside the
  boundary — decision 2A holds; /tree still prerenders static.
- **Keyboard**: React Flow never calls `onNodeClick` from the keyboard —
  `onSelectionChange` drives selection instead; Escape closes the panel
  (listener in `CareerNodeCard`). Panel focus management is a TODO (TODOS.md).
- CI now exists: `.github/workflows/ci.yml` (lint + test + build).
- Tests derive content counts from data — hand-editing quests/certs no longer
  breaks behavior tests.

**Next:** /ship this branch (squashes 5+ WIP commits). Re-QA /tree live first
— CareerTree changed after the 07-03 browse verification.

## 2026-07-03 — Claude Code — Phase 6 PR1 (IMPLEMENTED, awaiting review/ship)

Branch `phase6/pr1-storage-foundation`, 5 WIP commits (continuous-checkpoint
mode; /ship squashes). All PR1 boxes in PHASES.md are checked. 31 tests green,
lint clean, build clean, features verified in a live browser.

**New architecture to know about:**
- `src/lib/storage.ts` — THE persistence layer. `useStoredSet` (quests) and
  `useStoredMap` (certs; routes later in PR3). All keys `careeratlas:v1:*`
  (constants exported). Hooks hydrate in effects (SSR-safe), persist in
  effects outside setState updaters, and degrade to in-memory state on
  corrupt/quota/disabled storage. One-time legacy migration deletes the old
  key after transform.
- **One hook instance per key per page.** Two components mounting
  `useStoredMap(SAME_KEY)` would clobber each other's writes —
  `CertificationsIndex` exists precisely to own the single cert map and feed
  presentational `CertificationBadge`s. Follow that pattern in PR3.
- Quest ids are storage identity: never reuse/repurpose an id in
  `src/data/quests.ts`; retire it. Integrity tests enforce uniqueness.
- Share links: `CareerTree` mirrors selection into `?node=` via
  `history.replaceState` and listens to popstate. Camera pans only on
  arrival/popstate, never on ordinary clicks. PR2's search reuses
  `/tree?node=<id>` as its role destination.
- `globals.css` gained `brass-shimmer` (THE celebration treatment — reuse it,
  don't invent new ones), `status-breathe`, and `.focus-brass` (put it on
  every new interactive element). All respect prefers-reduced-motion.
- Test infra: `vitest.setup.ts` stubs ResizeObserver/DOMMatrixReadOnly/
  DOMRect/IntersectionObserver so React Flow + framer-motion render in jsdom.
  userEvent.setup() replaces navigator.clipboard — use fireEvent when a test
  needs its own clipboard mock.

**Next:** /review then /ship this branch; PR2 (light theme + search) follows —
produce the light token artifact BEFORE implementing (PHASES.md § PR 2).

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
