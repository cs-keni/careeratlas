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
- [ ] Vitest + React Testing Library + jsdom test infra (`npm test`)
- [ ] Shared `useStoredSet` hook (hydration guard, try/catch, writes outside setState updater)
- [ ] Versioned storage keys (`careeratlas:v1:*`), stable quest ids, one-time migration of legacy `careeratlas-quest-progress`
- [ ] Content-graph validation suite (unique ids, nextRoles targets exist, no cycles, unique positions, cert sources present)
- [ ] Cert progress tracking on /certifications via the hook
- [ ] Share links: `/tree?node=<id>` — read on mount from location, validate against nodeById, write via replaceState, sync on popstate
- [ ] Tests: storage hydrate/corrupt/migrate/toggle/quota, `?node=` valid/invalid, data integrity

### PR 2 — Light mode + search
- [ ] `[data-theme="light"]` token block — full "atlas at day" art direction
- [ ] Hardcoded color audit: minimap maskColor prop, pathHex light variants, body gradients, focus states, borders
- [ ] Toggle + `prefers-color-scheme` default + no-flash pre-paint inline script; preference stored via v1 keys
- [ ] Replace `background-attachment: fixed` with a fixed-position pseudo-element during the background rework
- [ ] Search: grouped substring matching in `src/lib/searchIndex.ts` (roles/certs/codex/quests; title-before-body within groups; no library)
- [ ] Tests: search empty/no-match/case/grouping; dual-theme visual QA on /tree

### PR 3 — My Build (route planner)
- [ ] Edge-validated ordered route model (each hop via nextRoles), stored via v1 convention
- [ ] Tree plan mode: highlight legal next hops while drawing a route
- [ ] Stale-save repair: mark-don't-delete broken hops, repair UI with legal alternatives
- [ ] Tests: route validation valid/broken-hop/removed-node/empty/duplicate
