# CareerAtlas — PHASES.md

Interactive career progression map ("RPG class tree") for physical security engineering,
starting from Jr Physical Security Engineer at Jacobs, Portland OR.

## Phase 1 — Foundation & Data Model
- [x] Scaffold Next.js 15 + TypeScript + Tailwind (App Router, src dir)
- [x] Install framer-motion + @xyflow/react
- [x] Research ASIS APP/PSP/CPP, PMP, RCDD requirements from current sources
- [ ] Define TypeScript data model (CareerNode, CareerPath, Certification, CodexEntry, Quest)
- [ ] Author career node data for all 7 paths + base class (~30 nodes)
- [ ] Author certification data with cited requirements
- [ ] Author Tools & Skills codex data
- [ ] Author First 90 Days quest data
- [ ] Author SWE → PSE comparison data

## Phase 2 — Design System & Layout
- [ ] Field-atlas design tokens: ink/brass dark theme, path accent colors
- [ ] Typography: Fraunces display + body sans + mono stat-blocks (next/font)
- [ ] Global layout: header nav, footer, page shell, grain/texture atmosphere
- [ ] Shared UI primitives: tier badges, stat rows, section headers

## Phase 3 — Career Skill Tree (core feature)
- [ ] CareerTree component with React Flow (custom nodes, path-colored edges)
- [ ] Custom node design per tier (base/advanced/specialist/leadership)
- [ ] CareerNodeCard detail panel (slide-in, full node data)
- [ ] Path filter/legend + multiclass note
- [ ] Mobile fallback (list-based tree)

## Phase 4 — Content Pages
- [ ] Homepage: hero, path overview cards, how-it-works
- [ ] Path detail pages (/paths/[slug]) with role ladder + PathDetail component
- [ ] Certification Roadmap page with CertificationBadge components
- [ ] Tools & Skills Codex page with SkillCodexCard components
- [ ] My First 90 Days page with QuestRoadmap component
- [ ] SWE Comparison page

## Phase 5 — Polish & Motion
- [ ] Staggered entrance animations, hover micro-interactions
- [ ] Node card spring transitions
- [ ] Responsive pass (mobile nav, tree fallback)
- [ ] Build passes clean (`npm run build`)

## Phase 6 — Future Enhancements (backlog)
- [ ] Personal progress tracking (localStorage: mark quests/certs complete)
- [ ] "My Build" — save a planned route through the tree
- [ ] Light mode toggle
- [ ] Salary data refresh workflow + more regional data
- [ ] Search across roles/certs/tools
- [ ] Export tree as image / share links to nodes
