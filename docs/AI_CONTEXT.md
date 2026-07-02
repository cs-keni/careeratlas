# AI_CONTEXT.md — CareerAtlas

Shared context for AI agents (Claude Code, Codex) working on this repo. Keep current.

## What this is
**CareerAtlas** — an interactive career progression map for physical security engineering,
styled as a professional RPG-inspired "field atlas." Built for Kenny Nguyen, who started as
a Jr Physical Security Engineer at Jacobs (Portland, OR) coming from a CS/software background.

The base class is **Jr Physical Security Engineer**; the tree branches into 7 career paths
(technical, consultant, project/delivery, data center/critical infra, corporate security,
systems integration, cyber-physical). Paths are explicitly non-rigid — "multiclassing" is a
core message.

## Stack
- Next.js 15 (App Router, `src/` dir, TypeScript, static — no backend)
- Tailwind CSS v4 (CSS-config via `@theme` in `globals.css`, NOT tailwind.config)
- Framer Motion (animations)
- @xyflow/react (React Flow v12) for the career tree graph
- Fonts via `next/font/google`: Fraunces (display), Newsreader (editorial accents if used),
  body sans + IBM Plex Mono (stat blocks) — see `src/app/layout.tsx` for the source of truth

## Data architecture (the important part)
All content lives in static, hand-editable TypeScript files under `src/data/`:
- `types.ts` — all interfaces (CareerNode, CareerPath, Certification, CodexEntry, QuestPhase…)
- `careerNodes.ts` — every role node incl. graph x/y positions
- `paths.ts` — the 7 path definitions (overview, pros/cons, CS-background advantages…)
- `certifications.ts` — APP/PSP/CPP/PMP/RCDD/vendor certs **with cited sources**
- `codex.ts` — tools & domain knowledge entries (Bluebeam, Revit, Division 28…)
- `quests.ts` — First 90 Days roadmap phases
- `comparison.ts` — SWE → PSE role mapping

Adding a role = add a node to `careerNodes.ts` with an id, path, tier, and position.
Edges are derived from each node's `nextRoles`.

## Key decisions
- Salary ranges and years-of-experience are ESTIMATES and must always be labeled as such in UI.
- Certification requirements were researched July 2026 (ASIS, PMI, BICSI sources cited in
  `certifications.ts`); anything unverified is phrased as "verify in current handbook."
- Dark-first design ("field atlas at night"): ink/charcoal ground, brass/amber primary accent,
  per-path accent colors defined as CSS variables in `globals.css`.
- Tree is client-only (React Flow); content pages are static server components where possible.
- Mobile: React Flow tree gets a list-based fallback rather than a cramped canvas.

## Rendering/animation system
- Framer Motion for page-level staggered reveals and card micro-interactions.
- React Flow custom node types per tier; edges colored by path via CSS vars.
- Grain/texture overlay + radial atmosphere in the page background (CSS only).
