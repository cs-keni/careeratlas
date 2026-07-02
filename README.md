# Security Career Atlas

An interactive field guide to career progression in physical security engineering —
styled like an RPG class tree, grounded in the real profession. Built for exploring
where a **Jr Physical Security Engineer** role can lead: seven branches through
technical mastery, consulting, project leadership, data centers/critical
infrastructure, corporate security, systems integration, and the cyber-physical
frontier.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all routes are static)
```

## Pages

| Route | What it is |
|---|---|
| `/` | Home — hero, character sheet, the seven paths, how to use |
| `/tree` | Interactive career skill tree (React Flow) — click nodes for full stats |
| `/paths` + `/paths/[slug]` | Field notes per path: ladder, skills, certs, pros/cons, risks |
| `/certifications` | Badge roadmap: APP → PSP → CPP spine + PMP, RCDD, vendor certs |
| `/codex` | Tools & domain knowledge compendium, each with a software analogy |
| `/first-90-days` | Onboarding questline with progress saved in localStorage |
| `/compare` | SWE ↔ PSE Rosetta stone (roles + concept quick-map) |

## Editing the content (the point of the design)

**All content is plain TypeScript data in `src/data/` — no CMS, no backend.**

- **Add a role:** append a `CareerNode` to `careerNodes.ts` (give it an `id`,
  `path`, `tier`, and `position {x, y}`), then reference its id from another
  node's `nextRoles` to draw the edge. Columns/rows use the `COL` and `ROW`
  constants at the top of the file.
- **Add a path:** add a `PathId` to `types.ts`, a `CareerPath` to `paths.ts`,
  a `--path-*` color in `globals.css` (`:root` + `@theme`), and map it in
  `src/lib/pathColors.ts` (both `pathColor` and `pathHex`).
- **Add a cert:** append to `certifications.ts`. Keep `sources` populated and
  set `requirementsVerified` honestly — the UI shows a "verify" warning when false.
- **Add codex entries / quests / comparisons:** `codex.ts`, `quests.ts`,
  `comparison.ts`. The pages render whatever is there.

Salary and years-of-experience figures are deliberately rough estimates; the UI
labels them `est.` everywhere. Don't remove those labels.

## Design system ("field atlas at night")

- **Tokens** live in `src/app/globals.css` (`:root` + Tailwind v4 `@theme inline`).
  Grounds: `--ink-950…800`. Text: `--parchment`, `--parchment-dim`, `--muted`.
  Accent: `--brass`. One accent color per path (`--path-*`).
- **Type:** Fraunces (display serif), Archivo (body), IBM Plex Mono (stat blocks,
  `.rune` labels). Loaded via `next/font` in `layout.tsx`.
- **Recipes:** `.card` (hover-lit panel), `.rune` (mono small-caps label),
  `.gold-rule`, `.corner-ticks` (cartographic frame). Grain + dotted graticule
  background on `body`.
- **Motion:** `Reveal` wraps sections for scroll-triggered staggered entrances;
  Framer Motion springs for the node detail panel and quest progress bar.
  Everything respects `prefers-reduced-motion`.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion ·
@xyflow/react (React Flow 12). Fully static output.

## Roadmap

See `PHASES.md` (Phase 6): "My Build" saved routes, cert/quest progress tracking
across pages, light mode, search, shareable node links, salary data refresh.
