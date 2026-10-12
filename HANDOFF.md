# Geopolymer — current handoff
Updated 12 October 2026 (Eastern).

## Phase A implementation — review branch, not deployed
- Base: current main `a1dd73c`. Work branch: `codex/knowledge-engine-phase-a`.
- Baseline verified: 61 unique library DOIs and 15 curated literature formulations.
  Final library: 86 unique DOIs, 25 additions, no merges/deletions; stable IDs kept.
- Five full texts have detailed **partial** extraction: 60 mix variants, 182 result
  cells (179 numeric + 3 below detection), 27 transcribed tables, 53 figure entries,
  10 unfavorable/null/mixed findings, 18 historical research material identities.
  Five study dataset families; variants are not independent replication.
- Twenty new records are metadata-only; five are authorized full-text partial
  records. Of the legacy 61, 22 have discovery summaries and 39 have metadata.
  Do not call all 86 newly source audited, or all five fully extracted.
- Added reusable versioned validation/import/rights/search modules; 25 study
  routes; structured same-mix search, explicit partial matches, pagination,
  shareable filters, study-condition comparison, JSON/BibTeX/RIS exports,
  observation/study saves through existing assistant folders.
- Calculator links are citation-only unless an existing curated recipe already
  has its own preview/scaling flow. No guessed mass transfers, assays or strength
  predictions. Calculator/notebook/research folder storage keys remain unchanged.
- Assistant still catalog-test mode. Deep-dive retrieval up to 10 references;
  paginated numeric evidence is in /knowledge. No model, paid service or schedule
  added. Existing daily automation was not inspected or changed in this phase.
- Read KNOWLEDGE_ENGINE.md for architecture, rights policy, importer and limits;
  research/batches/phase-a-2026-10-12.json and phase-a-source-audit.json for evidence.

## Verification for this branch
- 49 Node tests pass, including 10 scientific search/import/rights benchmarks.
- Deterministic source audit checks all 182 observation cells, 27 table
  transcriptions and original HTML hashes; same-agent AI second pass checked
  extreme values, failures, methods, units and conversions. No human/domain review.
- Production build creates 76 routes. Local Playwright browser installation failed
  with an invalid/truncated download. Automatic approval review blocked the branch
  push (explicit publication authorization required); GitHub browser QA not run.
  Local implementation commit: `ce2b961`; follow-up documentation fixes follow it.
  No PR exists and the branch has not been pushed.
- Synthetic scale benchmark: 500 / 1,000 metadata records; p95 search 1.55 / 2.49 ms;
  JSON payload 590,031 / 1,180,391 bytes (gzip 14,312 / 24,573). Fixtures are not in
  the public scientific catalog. These figures do not benchmark 1,000 full papers.
- Production output: 2,375,427 bytes at the final local build.
- Actual importer CLI ran twice against the same 25-record input: atomic
  checkpoint retained exactly 25 records and 25 acceptance events.
- No live deployment or new build identity verified for this branch.

## Remaining acceptance work and next resumable batch
1. Finish GitHub desktop/mobile checks and inspect screenshots; record exact
   commit/PR/check results before release. Main/live are not changed by this file.
2. Five full-paper inventories remain partial: graph-only series, analytical
   profiles and some method details need reviewed extraction/digitization or
   underlying source data. No estimated graph values are in exact numeric search.
   Phase A breadth target is met; complete extraction acceptance is **not** claimed.
3. Preserve unresolved issues on study pages: humidity conflict and misordered
   relative comparisons in ma15082944; slag fraction wording versus mass table in
   ma15010211; unquantified laboratory temperature and mixed Na/K in ma15082957.
4. Current source-status checks are limited to Crossref deposited updates; perform
   wider correction/retraction checks. No absent notice proves a clean status.
5. Next <=25-reference batch should broaden beyond the pilot's shrinkage/MK/slag
   citation chain to coffee char versus ash, coating adhesion, failed setting,
   other publishers and material supply routes. Full-text operations for the
   twenty metadata additions remain unassessed. No encyclopedia pages or current
   supplier offerings have been created; those are subsequent phases.

## Previous production release (historical evidence, unchanged)
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

## Knowledge engine — next implementation priority
Owner requested a much deeper library with hundreds of publications, original
encyclopedia pages, granular experimental evidence, failed/null outcomes, material
identities and supplier sourcing. The two supplied prompts are consolidated into
[KNOWLEDGE_ENGINE_MASTER_PROMPT.md](KNOWLEDGE_ENGINE_MASTER_PROMPT.md).

Documentation only: no new references, database services, AI connection or website
features were implemented in this planning session. The release/test evidence above
belongs to the previous assistant release and was not rerun for these docs.

In the next chat, execute Phase A: audit current main and reconcile existing IDs;
build a reusable rights-aware schema/import/search foundation; target 25 new
verified references and deep extraction of 5 suitable experimental papers, with
study pages, structured measurements and exact provenance. Preserve the 61-reference
and 15-formulation planning baseline, verifying actual counts before migration.
Use the existing Git-backed data path if backend/AI credentials are absent.
Subsequent batches target 300 then 500 total references, 25 then 100 deeply extracted
papers, linked encyclopedia topics and documented material/supplier records.
Counts are targets, not claims of completion. See the master prompt for acceptance
gates, failure evidence, same-mix search joins, review labels and resumable batches.

## Remaining / next actions
0. Execute the knowledge-engine pilot above when the owner launches the next chat.
   This is the next product priority; API connection can follow when details arrive.
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
Continue yitzhach/geopolymer from current main. Read HANDOFF.md and KNOWLEDGE_ENGINE_MASTER_PROMPT.md, then the supporting documents they identify. Execute Phase A of the master prompt: audit the current catalog, implement a reusable permissions-aware scientific data/import/search foundation, preserve the existing references and stable IDs, add an initial batch of 25 verified relevant unique references, and deeply extract 5 suitable experimental papers with formulations, results, failures and precise provenance. Add linked study details and useful structured search to the existing site. Use the working Git-backed path if backend or AI credentials are absent; do not block useful progress on those credentials. Do not claim later phases are complete. Verify the existing daily automation before adding schedules. Run relevant tests/build/browser checks, follow the session's publication authorization, and update handoff with exact counts, blockers and the next resumable batch. Work toward 300, then 500 references through subsequent verified batches.
