# Geopolymer — current handoff
Updated 11 October 2026 (Eastern).

## Release status
- Live: https://geopolymer.bobdylan2000.workers.dev
- Repository: https://github.com/yitzhach/geopolymer
- PR #4 merged as 4a7b8e4940013cf448d9dbe2a7b6e84636a3af2c.
  Feature head: 28e9056. Previous main: fac389b.
- Independently verified live build-info.json reports 4a7b8e4, build time
  2026-10-11T03:06:56.524Z, 50 routes. Rechecked on 11 October (Eastern).
- Live bootstrap loads the assistant; assistant UI/core modules and corrected
  header CSS all return successfully with the expected feature code.
- This handoff is a subsequent documentation-only commit. Release is complete.

## Research assistant — completed and live
- Site-wide Research assistant launcher and nonmodal panel. Enable Highlight
  assist mode, close the panel, select page text and click Research selected text.
  Pasting a topic and asking a question also work.
- Catalog-based test responses, follow-up searches, source links with existing
  summaries/evidence limits, and clearly unavailable product-concept links.
- Browser-local folders save excerpts, page references, notes and conversations.
  Updates, reopening, deletion, JSON export/import-as-copy and session recovery.
- Separate versioned storage; existing notebook/calculator keys are unchanged.
  Invalid imports are rejected. Storage errors and cross-tab conflicts retain
  work in memory for export rather than claiming it was saved.
- Explicit test mode: no connected AI model, live web search, cloud sync or
  checkout. Product matches are concepts, not compatibility recommendations.
- See RESEARCH_ASSISTANT.md for the flow and future server-side API boundary.

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
- All 39 Node tests pass; production build creates 50 routes.
- GitHub Actions run 38107206079 on 28e9056 passed all existing browser suites
  and the new assistant desktop/mobile suite: selection, follow-ups, products,
  folders, updates, navigation recovery, export/import, markup escaping,
  keyboard close, cross-tab conflicts and storage quota failure.
- Downloaded and visually reviewed desktop/mobile assistant screenshots.
  Fixed inherited header margins; reviewed the corrected response screenshots.
- Local Chromium installation failed; browser execution was through GitHub CI.
- Live build identity and assistant assets verified separately after deployment.
- Commands: npm test; npm run build; node tests/assistant-browser.cjs.
  CI: .github/workflows/verify.yml. Never deploy repository root with --assets .

## Daily draft review completed
PR #3's two studies and briefing are integrated and live. Publisher authors,
dates and abstract claims were checked against both primary source records.
Stable IDs and abstract-level limitations remain; no methods audit or independent
replication is claimed. The original research-drafts/2026-10-10.json is an archive
whose pending status describes its original submission, not current deployment.

## Remaining / next actions
1. Connect the assistant to a server-side AI provider when the owner supplies API
   details. Decide model, request/spend limits, data disclosure and retention.
   Keep citations and working catalog fallback. API keys must stay server-side.
   Extend response-mode validation and UI labels together when adding real AI;
   never label generated replies as catalog tests. See RESEARCH_ASSISTANT.md.
2. Verify the existing daily research automation configuration before creating any
   new schedule; the earlier session produced PR #3. This session did not inspect
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
RESEARCH_ASSISTANT.md. The assistant test release is verified live. Connect the research assistant
to a server-side provider when the owner supplies API details. Preserve catalog
citations, test-mode fallback, local research folders and existing notebook keys.
