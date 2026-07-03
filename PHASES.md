# CareerAtlas — PHASES.md

Interactive career progression map ("RPG class tree") for physical security engineering,
starting from Jr Physical Security Engineer at Jacobs, Portland OR.

## Phase 1 — Foundation & Data Model
- [x] Scaffold Next.js 15 + TypeScript + Tailwind (App Router, src dir)
- [x] Install framer-motion + @xyflow/react
- [x] Research ASIS APP/PSP/CPP, PMP, RCDD requirements from current sources
- [x] Define TypeScript data model (CareerNode, CareerPath, Certification, CodexEntry, Quest)
- [x] Author career node data for all 7 paths + base class (~30 nodes)
- [x] Author certification data with cited requirements
- [x] Author Tools & Skills codex data
- [x] Author First 90 Days quest data
- [x] Author SWE → PSE comparison data

## Phase 2 — Design System & Layout
- [x] Field-atlas design tokens: ink/brass dark theme, path accent colors
- [x] Typography: Fraunces display + body sans + mono stat-blocks (next/font)
- [x] Global layout: header nav, footer, page shell, grain/texture atmosphere
- [x] Shared UI primitives: tier badges, stat rows, section headers

## Phase 3 — Career Skill Tree (core feature)
- [x] CareerTree component with React Flow (custom nodes, path-colored edges)
- [x] Custom node design per tier (base/advanced/specialist/leadership)
- [x] CareerNodeCard detail panel (slide-in, full node data)
- [x] Path filter/legend + multiclass note
- [x] Mobile: tree is touch pan/zoomable, detail panel goes full-width (list-based fallback moved to Phase 6)

## Phase 4 — Content Pages
- [x] Homepage: hero, path overview cards, how-it-works
- [x] Path detail pages (/paths/[slug]) with role ladder + PathDetail component
- [x] Certification Roadmap page with CertificationBadge components
- [x] Tools & Skills Codex page with SkillCodexCard components
- [x] My First 90 Days page with QuestRoadmap component
- [x] SWE Comparison page

## Phase 5 — Polish & Motion
- [x] Staggered entrance animations, hover micro-interactions
- [x] Node card spring transitions
- [x] Responsive pass (mobile nav verified, hero/cards stack, tree usable via touch)
- [x] Build passes clean (`npm run build`)

## Phase 6 — Interactive Layer (plan locked by /plan-eng-review, 2026-07-03)
- [x] Quest progress tracking (localStorage) — shipped early in Phase 4

Ships as 3 sequenced PRs. Deferred items moved to TODOS.md (list view, image
export, salary workflow, shareable build links).

### PR 1 — Storage foundation, cert tracking, share links
- [ ] Vitest + React Testing Library + jsdom test infra (`npm test`; mock ResizeObserver/DOMRect for React Flow)
- [ ] Shared storage hooks: `useStoredSet` (quests) + `useStoredMap` (cert tri-state) — hydration guard, try/catch, writes outside setState updater
- [ ] Versioned storage keys (`careeratlas:v1:*`), stable quest ids, one-time migration of legacy `careeratlas-quest-progress`
- [ ] Content-graph validation suite (unique ids, nextRoles targets exist, no cycles, unique positions, cert sources present)
- [ ] Cert progress: tri-state Planned → In Progress → Earned (never "completed"); stored as `{certId: state}` map
- [ ] Cert UI: discrete cycle-button in badge header next to medallion (NOT whole-card-clickable — cards contain links). Planned = brass outline ring; In Progress = pulsing half-fill; Earned = medallion fills level color + border brightens + brass shimmer
- [ ] /certifications hierarchy: ASIS spine lights Earned segments + "N of M earned" rune counter at top; "saved in your browser" caption (quest pattern)
- [ ] Share links: `/tree?node=<id>` — read on mount, validate vs nodeById, replaceState on select, popstate sync
- [ ] Share arrival: camera pans/zooms to the node (animated) + detail panel opens. Invalid id: silent fallback to plain tree (specified — no toast)
- [ ] Share creation: "Copy node link" control in node detail panel header; icon → checkmark micro-state, reverts ~1.2s; aria-live "Link copied"
- [ ] Hydrate-then-animate on all tracked surfaces (no state pop-in)
- [ ] Tests: storage hydrate/corrupt/migrate/toggle/quota, `?node=` valid/invalid, data integrity

### PR 2 — Light mode + search
- [ ] Light token block produced as a design artifact BEFORE implementation: every existing var name gets a day value from approved Variant A "Reading Room" (paper #f4edda, ink #2b2418, brass #8a6c2c — see ~/.gstack/projects/careeratlas/designs/tree-day-theme-20260703/). Includes 7 path accents at ≥4.5:1 on paper, line/glow alphas, warm shadows (never black-on-paper), grain + graticule recipes for paper, ::selection
- [ ] Status tokens in BOTH themes: `--status-broken` (desaturated oxide red), `--status-ok` (verdigris) — atlas voice, no raw Tailwind reds
- [ ] Contrast floor: body and muted text ≥4.5:1 in both themes
- [ ] `[data-theme="light"]` retheme uses existing variable names (`--ink-*` → paper surfaces, `--parchment` → ink text) — not one-off colors
- [ ] Hardcoded color audit: minimap maskColor via prop, pathHex light variants, body gradients, focus states, borders
- [ ] Theme toggle: icon button right of nav (mobile: in menu sheet); `prefers-color-scheme` default; no-flash pre-paint inline script (try/catch → default dark); preference via v1 keys; ~300ms token cross-fade on toggle + day/night micro-animation; aria-pressed; skip cross-fade under prefers-reduced-motion
- [ ] Replace `background-attachment: fixed` with fixed-position pseudo-element during background rework
- [ ] Search entry: icon button in header (mobile: menu sheet); opens on `/` or Ctrl+K
- [ ] Search overlay = "atlas index": centered panel, dimmed scrim, rune-style group headers (Roles / Certifications / Codex / Quests), dense result rows (path-colored dot + title + one-line context) — no per-result cards; empty groups omitted
- [ ] Search states: pre-query hint; no-match: "Nothing charted here yet." + browse suggestion; keyboard nav (arrows/Enter/Esc), focus trap + return-to-trigger, listbox + aria-activedescendant
- [ ] Search destinations: roles → `/tree?node=<id>` (reuses PR1); certs/codex/quests → anchor ids added to cards + scroll with brief brass highlight pulse on arrival
- [ ] New flat utility recipes in globals.css: `.atlas-toolbar`, `.atlas-chip`, `.atlas-control`, `.atlas-result-row` — denser, no gradients/hover-shadows; `.card` stays reserved for content artifacts
- [ ] Search logic: grouped substring matching in `src/lib/searchIndex.ts` (title-before-body within groups; no library)
- [ ] Author DESIGN.md: atlas tokens (both themes), type scale, `.card` vs `.atlas-*` vocabulary, motion constants, atlas-native language rules
- [ ] Tests: search empty/no-match/case/grouping; dual-theme visual QA on /tree

### PR 3 — My Build (route planner)
- [ ] Edge-validated ordered route model (each hop via nextRoles), stored via v1 convention as single-element keyed collection `{routes:[…]}` — v1 UI is ONE route; multi-route later is pure UI, no migration
- [ ] Mode entry: segmented control "Explore | My Build" at right end of legend bar; plan mode swaps path chips for a slim route rail (ordered hop chips + undo / clear / exit) — no new vertical chrome, no side panel
- [ ] First-entry empty state: banner "Start from your current role — tap a glowing node to chart the next hop"; base node auto-highlighted
- [ ] State precedence on canvas: route > selected > filter-dim. Legal next hops: brass pulse ring; non-legal: existing dimmed treatment; route edges: solid brass, full opacity
- [ ] Saved route draws in with staggered edge reveal on load (loading artifact → moment)
- [ ] Stale-save repair: broken hop drawn as dashed `--status-broken` edge; calm repair drawer ("This route has changed since you charted it") listing legal alternatives; mark-don't-delete, never auto-remove
- [ ] Mobile (< md): plan mode renders as a stepper list — current route as stacked hop chips, next-hop choices as full-width 44px tappable rows; same validation module drives both presentations
- [ ] Desktop keyboard: legal hops Tab/Enter reachable; route rail chips ≥44px touch targets
- [ ] Completion moment: route reaching a target node gets one restrained brass shimmer (same treatment as cert Earned — reused, not reinvented)
- [ ] Tests: route validation valid/broken-hop/removed-node/empty/duplicate; stepper renders same route state as canvas

### Phase 6 design constants (from /plan-design-review, 2026-07-03)
- Approved day palette: Variant A "Reading Room" (sketch + approved.json in ~/.gstack/projects/careeratlas/designs/tree-day-theme-20260703/)
- Language is atlas-native everywhere: Tracked/Planned/Earned, "chart", "charted" — never SaaS "completed/done"
- One celebration treatment (brass shimmer) reused at: final quest check, cert Earned, route completion
- Focus-visible rings in brass on every new interactive element
