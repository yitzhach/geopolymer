# Geopolymer Platform

A connected knowledge, materials, formulation and commerce platform.
**Learn → Formulate → Buy → Test → Ask → Share**

## Current prototype

Responsive homepage; material, research, formulation and product indexes/details;
beginner and expanded educator pathways; Artists & Artisans page and store collection;
unified search with type filters; a batch mass scaler.
The catalog contains proposed products only. No checkout, inventory or live services.

Start with [HANDOFF.md](HANDOFF.md), then [BUILD_PLAN.md](BUILD_PLAN.md).
GitHub is the working source of truth. The full business direction and public MVP
remain in [KICKOFF.md](KICKOFF.md); this build is an initial reviewable slice.

## Run and verify

No package installation is needed. Node 18+ runs the development tools:

```sh
npm run dev
# Open http://localhost:4173
npm test
npm run build
node scripts/serve.mjs --dist
```

Alternatively, serve the repository with `python3 -m http.server 4173`.
Do not open index.html via file://; native JavaScript modules need an HTTP server.
`dist/` is portable static output. Hash routes work without server rewrite rules.
No hosting provider or production framework has been selected.

Optional browser smoke check, with Playwright and its Chromium installed and the
server running: `node tests/browser-smoke.cjs`. It covers all 22 routes on desktop
and mobile, search, scaler and keyboard skip navigation; screenshots go to `.qa/`.
`PLAYWRIGHT_EXECUTABLE_PATH` can select an existing Chromium binary. This optional
check is separate from the dependency-free Node tests. Browser QA remains outstanding:
Chromium is unavailable and its installation download failed.

## Edit map

- `src/data.js` — structured content, stable IDs, relationships and search records.
- `src/schema.d.ts` — content contracts, including evidence and test entities.
- `src/app.js` — hash routing, page templates and interactions.
- `src/scaler.js` — pure mass-scaling function; neutral demonstration components.
- `src/style.css` — responsive design and replaceable brand tokens.
- `index.html` — shared shell, navigation and metadata.
- `tests/prototype.test.mjs` — calculation, validation, search and content integrity.

## Content boundaries

The research record is based on the Geopolymer Institute publisher summary of
Technical Paper #26, checked 24 September 2026; the full paper has not been reviewed.
No complete chemical recipe or platform performance result is supplied. The scaler
uses a separate arithmetic example, not the paper's formulation. Proposed kit masses
remain explicitly unresolved rather than invented. Raw powder pack sizes demonstrate
exact metric storage with pound equivalents. Supplier, pricing, shipping and safety
qualification are still open.

Planning files are mapped in HANDOFF.md. Update HANDOFF.md and DECISIONS.md whenever
implementation or decisions change. Product concepts must never imply available stock.
