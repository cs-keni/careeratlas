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

## Phase 6 — Future Enhancements (backlog)
- [ ] List-based tree view as an alternate mobile presentation
- [x] Quest progress tracking (localStorage) — shipped early in Phase 4
- [ ] Cert progress tracking (mark badges earned, localStorage)
- [ ] "My Build" — save a planned route through the tree
- [ ] Light mode toggle
- [ ] Salary data refresh workflow + more regional data
- [ ] Search across roles/certs/tools
- [ ] Export tree as image / share links to nodes
