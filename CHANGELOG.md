# Changelog

All notable changes to Career Atlas are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/), and this project uses [semantic versioning](https://semver.org/).

## [0.2.0] - 2026-07-07

### Added
- Track your progress right in the browser: quest checkmarks and certification status now persist between visits, saved locally to your device.
- Certifications have a three-state tracker — Planned, In Progress, Earned — with the ASIS spine lighting up earned segments and an "N of M earned" counter at the top of the page.
- Share any role in the skill tree with a link: `/tree?node=<id>` opens straight to that node, panning and zooming the map to it and opening its detail panel. A "Copy node link" button in the panel header copies the link, and the icon flips to a checkmark to confirm.
- Open a role's details with the keyboard (focus a node and press Enter) and close the panel with Escape.

### Changed
- Progress storage moved to versioned keys (`careeratlas:v1:*`) with a one-time migration of any earlier saved quest progress, so future format changes never silently reinterpret your saved data.

### Fixed
- Corrupted or unreadable saved progress no longer wipes your data on a plain page load, and interrupted migrations retry instead of dropping the only saved copy.
- The questline progress counter now ignores saved entries that are no longer part of the current questline, so it can never read past 100%.

### Internal
- Added a Vitest + React Testing Library test suite (43 tests) covering storage, migration, share links, cert progress, and content-graph integrity, plus a GitHub Actions CI workflow running lint, tests, and build on every push and PR.
