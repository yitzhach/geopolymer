# Geopolymer — current handoff
Updated 10 October 2026 (Eastern).

## Assistant implementation — pending release
Owner requested a working live research assistant before API credentials exist.
Implemented site-wide highlight assist, selected-text capture, catalog-backed
research follow-ups, product-concept links, local folders/notes/conversations and
JSON backups. Explicit test mode; no LLM or live web search.
All 39 Node tests pass; build creates 50 routes. Browser CI and publication pending.
Local Chromium installation failed; use GitHub Actions browser verification.
See RESEARCH_ASSISTANT.md for UI, storage and future server-side API integration.

## Release status
- Repository: https://github.com/yitzhach/geopolymer
- Live: https://geopolymer.bobdylan2000.workers.dev
- PR #3 merged to main as 6a5986bfcbb5a6c4fb11dbc6810ccefd5a2c5b2c.
  Reviewed feature head: c13627a. Previous main: 14e0a68.
- Independently verified live build-info.json reports 6a5986b, build time
  2026-10-11T02:21:43.415Z, 50 routes. Cache-busted live checks confirm
  61 research records, both new IDs, five JSON/RSS articles and the new briefing.
- This handoff is a subsequent documentation-only commit. Release is complete.
- Remote branches and original draft preserved. No force pushes.

## Completed and live
- Fifteen source-linked formulations, including ten additions: potassium/sodium
  search, evidence filters, gram scaling where source quantities allow it,
  calculator transfer, database export, source/cure/method details and tweak ideas.
- Literature measurements at 1h, 4h, 24h, 72h, 1w, 2w and 28d where reported.
  Missing measurements stay unknown; no invented curves or strength guarantees.
- Goal planner for compression, flexure, shear, bond and thin applications.
  Matching uses exact measured property/age; this is not an AI prediction tool.
- Twenty-two recent publications added to the original 39: searchable brief original
  summaries, highlights, dates, DOI/publisher links and publication status.
- Five source-linked GP Journal articles and RSS/JSON feeds. Podcast material is
  reading notes; no recordings are claimed.
- Prior calculator, supplier builder and experiment notebook remain available.
- Mobile recipe-table overflow and calculator browser-test timing were fixed.

## Verification
- All 37 Node tests pass; production build creates 50 routes.
- GitHub Actions run 38104805366 on feature head c13627a passed all steps,
  including desktop/mobile, notebook, literature and research browser suites.
- Research browser coverage includes the new briefing at desktop/mobile widths.
  CI uploaded screenshots; no manual screenshot review performed in this session.
- Local browser launch was unavailable because Chromium was not installed.
- Live build identity, database IDs/count, JSON/RSS counts and new article verified.
- Commands: npm test; npm run build. Browser workflow: .github/workflows/verify.yml.
  Hosting builds from main; never deploy the repository root using --assets .

## Daily draft review completed
PR #3's two studies and briefing are integrated and live. Publisher authors,
dates and abstract claims were checked against both primary source records.
Stable IDs and abstract-level limitations remain; no methods audit or independent
replication is claimed. The original research-drafts/2026-10-10.json is an archive
whose pending status describes its original submission, not current deployment.

## Remaining / next actions
1. Verify the existing daily research automation configuration before creating any
   new schedule; the earlier session produced PR #3. This session did not inspect
   or change its schedule. Draft production is not unattended public publishing.
2. Enrich recipe evidence: complete assays, material grades, preparation, replicates,
   test methods and source discrepancies. See the recipe documents below.
3. Next substantial product phase: choose accounts/cloud storage and image-upload
   architecture, or implement the cited retrieval advisor from RECIPE_DATABASE.md.
   AI strength prediction remains future work requiring validated data/models,
   domain checks and uncertainty intervals, separately for each property/age.

## Limits and preservation
Notebook saves are browser-local unless exported; no accounts/cloud sync or image
uploads. Static Git-backed catalogs, no public CMS. No validated virtual test,
podcast audio, commerce or guaranteed material compatibility.
Preserve calculator v1 and notebook storage keys, import/export compatibility,
stable route/record IDs, source evidence labels, unknown values and the current
white/forest-green design. Literature results must never become own measurements.
No silicate powder/liquid or supplier substitution without explicit basis checks.

## Narrow read map
- RESEARCH_ASSISTANT.md and src/assistant-core.js, research-assistant.js: test assistant.
- RESEARCH_PUBLISHING.md: research schema, original-summary policy, feeds/workflow.
- RECIPE_DATABASE.md: 15 recipes, extraction map, goal planner and future AI plan.
- LITERATURE_MIXES.md and PYRAMENT_RESEARCH.md: provenance and unresolved caveats.
- EXPERIMENT_NOTEBOOK.md and SUPPLIER_DATA.md: saved data and supplier assumptions.
- README.md, DECISIONS.md, PLATFORM_ROADMAP.md: architecture and wider scope.
- src/research-updates.js, research-library.js, journal-data.js, journal.js,
  research-feeds.js: research and editorial content.
- src/literature-mixes.js, recipe-additions.js, literature-ui.js, recipe-planner.js:
  recipe catalog and goals.
- src/routes.js and scripts/build.mjs: routes/static output; tests/: regressions.

## New-chat prompt
Continue yitzhach/geopolymer from current main. Read HANDOFF.md and
RESEARCH_ASSISTANT.md. Check release status, then connect the research assistant
to a server-side provider when the owner supplies API details. Preserve catalog
citations, test-mode fallback, local research folders and existing notebook keys.
