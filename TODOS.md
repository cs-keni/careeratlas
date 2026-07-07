# TODOS.md

Deferred work with full context, so a future session can pick any item up cold.
Items added by /plan-eng-review on 2026-07-03 (Phase 6 planning); PR1 /review
items added 2026-07-07.

## Multi-tab storage sync (known limitation, accepted for v1)
- **What:** `useStoredSet`/`useStoredMap` hold a full in-memory snapshot per tab and persist last-write-wins; a `storage`-event listener would re-sync tabs.
- **Why:** Toggling progress in two open tabs can silently lose the other tab's change (both Claude and Codex flagged this in the PR1 /review, 2026-07-07).
- **Pros:** `storage` events are the standard fix; the hooks are already the single chokepoint, so the listener lands in one file.
- **Cons:** Reconciling a Set/Record snapshot mid-interaction has UX edge cases (state changing under an open page) for a site with one known user.
- **Context:** Deliberately documented instead of built during the PR1 review. The hooks already persist only user mutations (dirty flag), which narrows the clobber window.
- **Depends on / blocked by:** Nothing.

## Node detail panel focus management
- **What:** Move focus into `CareerNodeCard` when it opens (incl. programmatic deep-link opens), restore focus on close, and consider `role="dialog"` + `aria-label`.
- **Why:** The panel overlays the tree with no AT indication it opened (PR1 /review red-team finding, 2026-07-07). Escape-to-close and keyboard node selection (`onSelectionChange`) shipped in PR1; focus management is the remaining piece.
- **Pros:** Completes the keyboard story the PR1 fixes started; standard dialog pattern.
- **Cons:** Focus-restore interacts with React Flow's own focus handling — needs live AT testing, not just jsdom.
- **Context:** PR3's plan-mode keyboard work ("legal hops Tab/Enter reachable") touches the same surface — natural time to do both.
- **Depends on / blocked by:** Nothing; pairs well with PR3.

## List-based mobile tree view
- **What:** An alternate list presentation of the career tree for small screens.
- **Why:** A list is more scannable one-handed than pan/zoom on a 375px canvas.
- **Pros:** Better mobile ergonomics; trivial data reuse (renders `careerNodes` grouped by path/tier).
- **Cons:** Second presentation of the same data to keep consistent with tree changes.
- **Context:** React Flow touch pan/zoom was judged "good enough" at initial build (2026-07-02 QA pass); this was Phase 6 line 1 and was deliberately moved here when Phase 6 was rescoped to 3 PRs. Start by rendering path-grouped tiers under `/tree` behind a viewport check or a view toggle.
- **Depends on / blocked by:** Nothing.

## Export tree as image
- **What:** Render the React Flow tree to a downloadable PNG.
- **Why:** Shareable artifact for posts/slides beyond what a URL gives.
- **Pros:** React Flow has an official `html-to-image` example to follow; one afternoon of work.
- **Cons:** First new runtime dependency for the site; `html-to-image` has webfont/CSS-var edge cases with SVG that need QA.
- **Context:** Cut from Phase 6 (decision D3, 2026-07-03) because share links (`/tree?node=`) deliver most sharing value at zero dependencies. Revisit when a concrete need appears (talk, post).
- **Depends on / blocked by:** Nothing technical; blocked on "is a dependency worth it".

## Salary data refresh workflow
- **What:** A documented process for refreshing `est.` salary/YoE figures with sources; optionally a per-node `lastVerified` date surfaced in the UI.
- **Why:** Estimates decay; the site's credibility leans on "researched, not invented".
- **Pros:** Cheap (half a page of docs); protects the citation discipline set in `certifications.ts`.
- **Cons:** Manual process docs go stale if never exercised.
- **Context:** Reclassified from app feature to docs/process task during Phase 6 planning (decision D3). Belongs in `docs/`, not a PR.
- **Depends on / blocked by:** Nothing.

## Multi-route My Build upgrade
- **What:** Named multiple saved routes with a routes drawer (list / rename / delete / switch) in the `.atlas-*` utility vocabulary.
- **Why:** Comparing alternate futures (technical vs leadership track) is the natural power-use of a career atlas.
- **Pros:** Storage already future-proofed — v1 stores `{routes:[…]}` as a single-element collection (decision 10A, /plan-design-review 2026-07-03), so this is pure UI, zero migration.
- **Cons:** Full CRUD surface (naming, switching, deleting) for a tool with one known user.
- **Context:** v1 (PR3) deliberately ships ONE route with "Clear and re-chart" as the whole management story. Pick this up only when an actual need to compare routes appears.
- **Depends on / blocked by:** PR3 (My Build) shipped.

## Shareable My Build links
- **What:** Encode a saved route in the URL (e.g. `/tree?build=jr-pse.pse.tech-lead`) so a build can be shared without a backend.
- **Why:** Share links only share a single node (Codex outside-voice finding); sharing a whole planned route is the natural extension — the URL is the transport.
- **Pros:** Route validation (PR1 data suite + PR3 validator) already guarantees a shared route can be checked on load like a stored one.
- **Cons:** Long URLs; `?node=` vs `?build=` precedence rules need defining.
- **Context:** Approved for backlog during Phase 6 eng review (decision D17). Build on PR1's URL handling and PR3's route model.
- **Depends on / blocked by:** PR3 (My Build) must ship first.
