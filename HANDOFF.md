# Geopolymer — current handoff
Updated 10 October 2026 (Eastern).

## Release status
- Repository: https://github.com/yitzhach/geopolymer
- Live: https://geopolymer.bobdylan2000.workers.dev
- PR #2 merged to main as 60306e1e30d198843c77e900c566376e46ce4781.
  Previous main: d3292b9. Feature head: 720f773.
- Independently verified live /build-info.json reports 60306e1, build time
  2026-10-10T20:21:46.546Z, 49 routes. Live research JSON contains 59 records;
  live journal JSON feed contains four articles.
- This handoff is a subsequent documentation-only commit. Earlier publication
  blocks are superseded by the owner's explicit authorization; release is complete.
- Remote feature branches and original local history are preserved. No force pushes.

## Completed and live
- Fifteen source-linked formulations, including ten additions: potassium/sodium
  search, evidence filters, gram scaling where source quantities allow it,
  calculator transfer, database export, source/cure/method details and tweak ideas.
- Literature measurements at 1h, 4h, 24h, 72h, 1w, 2w and 28d where reported.
  Missing measurements stay unknown; no invented curves or strength guarantees.
- Goal planner for compression, flexure, shear, bond and thin applications.
  Matching uses exact measured property/age; this is not an AI prediction tool.
- Twenty recent publications added to the original 39: searchable brief original
  summaries, highlights, dates, DOI/publisher links and publication status.
- Four source-linked GP Journal articles and RSS/JSON feeds. Podcast material is
  reading notes; no recordings are claimed.
- Prior calculator, supplier builder and experiment notebook remain available.
- Mobile recipe-table overflow and calculator browser-test timing were fixed.

## Verification
- Rechecked locally: all 37 Node tests pass; production build creates 49 routes.
- GitHub Actions run 38023955457 on feature head 720f773 passed all steps,
  including desktop/mobile, notebook, literature and research browser suites.
- Browser QA screenshots were uploaded by CI; no fresh manual screenshot review
  was performed in this recovery session.
- Live build identity and JSON record/feed counts verified after merge.
- Commands: npm test; npm run build. Browser workflow: .github/workflows/verify.yml.
  Hosting builds from main; never deploy the repository root using --assets .

## Remaining / next actions
1. PR #3 source review and catalog integration are complete in this branch: two
   additional studies and one briefing, now 61 references, five articles, 50 routes.
   Original draft retained for provenance. Both publisher records were rechecked;
   summary-level evidence and stable IDs preserved. All 37 Node tests and build pass.
   Local browser launch unavailable (Chromium absent); GitHub browser gate pending.
   Publication/live verification pending; prior release status above remains live.
2. Verify the existing daily research automation configuration before creating any
   new schedule; the earlier session produced PR #3. This recovery did not inspect
   or change its schedule. Draft production is not unattended public publishing.
3. Enrich recipe evidence: complete assays, material grades, preparation, replicates,
   test methods and source discrepancies. See the recipe documents below.
4. Next substantial product phase: choose accounts/cloud storage and image-upload
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
Continue yitzhach/geopolymer from current main. Read HANDOFF.md and its narrow
read map. The daily research integration is implemented; check release verification above.
Next verify the existing daily research automation configuration before creating
any schedule. Do not rebuild completed features.
