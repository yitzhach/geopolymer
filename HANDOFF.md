# Geopolymer — current handoff
Updated 13 October 2026 (Eastern).

## Current checkpoint — 13 October 2026 breadth and agent policy
- Owner reports the prior build appears live and requested 25 additional references.
- Implementation branch: `codex/research-batch-25-policy`, based on main `140faf4`.
  Publication/browser QA pending at this checkpoint; do not infer deployment.
- Library grows **86 → 111 unique DOI records**: exactly 25 metadata-only additions,
  no merges/deletions, all 86 prior IDs retained. New records are `ke-b02-001`–025.
- Coverage: nine coffee-material references (eight GP/AAM/fill and one adjacent
  Portland-cement biochar paper), ten coating/efflorescence, six clay/pozzolan/one-part.
  One new item is a review. No new extracted experiments or performance claims.
- Exact Crossref DOI identities checked, no abstracts retained. `updated-by` found
  corrections on `ke-b02-009` and `ke-b02-021`; card/study correction links are visible
  and assistant evidence excludes both pending review. Other new records have only
  metadata status checks, not exhaustive publisher clearance.
- Overall depth: 84 metadata-only, 22 discovery-summary, five partial-full-text
  records. Five studies / 62 variants / 275 cells / 12 unfavorable/null/mixed
  findings / 18 historical materials unchanged. No encyclopedia or supplier additions.
- Added root AGENTS.md and SUBAGENT_POLICY.md. Two explicitly selected Luna agents
  gathered references read-only; Primary Agent verified, integrated and tested.
- Pilot gaps are scoped entry-by-entry in `phase-a-gap-scope-2026-10-13.json`.
  All five papers remain partial; no Phase A complete-acceptance claim. Fresh
  ma15082944 retrieval was blocked by PMC challenge / publisher HTTP 429.
- Next depth work: ma15082944 Figures 4–6 with authorized figure access and
  signed/baseline-aware calibration. Review two linked corrections before using
  those new records as assistant evidence. New full-text rights remain unassessed.
- Narrow read map: AGENTS.md, SUBAGENT_POLICY.md, KNOWLEDGE_ENGINE.md,
  `research/batches/breadth-2026-10-13.json`, gap-scope manifest, then relevant source
  audit only. Do not restart Phase A or re-add the previous 25 records.

## Phase A implementation — foundation merged; extraction continues
- PR #6 merged to main as `1f873e492e24e81784cb46d64e3b386e7d9af846`
  after owner authorized pushing to main and continuing Phase A on 12 October.
  https://github.com/yitzhach/geopolymer/pull/6. Final pre-merge head `7156e57`
  passed Foundation verification run 38320017366. No new live deployment verified.
- PR #7 merged to main as `7c08fc33d158470cec5cef3bb4a29e56b4e5cf69`:
  https://github.com/yitzhach/geopolymer/pull/7. Resume from current main.
  Verified implementation `8e919d60ae141375ba6a4e0bdde0a4788ae5fb83` includes
  twelve graph estimates and eight specimen-level MIP cells. All 54 Node tests
  and six browser suites passed run 38347215725. No live deployment verified.
- Follow-up implementation `568d4e62452df88d5c04926196e52744074c1715`.
  Earlier verified implementation `8eaf0f244a8faa575e5a9ad4c64982c0b6fc64c7`;
  initial implementation `a97a00e`, navigation/count fix `ace84d7`, mobile title
  wrapping fix `93c4e1b`, saved-folder browser assertion fix `8eaf0f2`.
  Git trees matched the prepared local implementation; GitHub connector was used
  because command-line Git had no push credentials.
- Baseline verified: 61 unique library DOIs and 15 curated literature formulations.
  Final library: 86 unique DOIs, 25 additions, no merges/deletions; stable IDs kept.
- Five full texts have detailed **partial** extraction: 62 mix variants, 275 result
  cells (260 exact numeric + 3 below detection + 12 provisional graph estimates), 27 transcribed tables, 53 figure entries,
  12 unfavorable/null/mixed findings, 18 historical research material identities.
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
- 54 Node tests pass after the specimen batch, including calibration, specimen
  identity and same-mix numerical filters. Earlier batches passed 51/53 tests.
- Initial source audit checks 182 observation cells, 27 table
  transcriptions and original HTML hashes; same-agent AI second pass checked
  extreme values, failures, methods, units and conversions. No human/domain review.
- Production build creates 76 routes. Local Playwright browser installation failed
  with an invalid/truncated download. GitHub run 38252231782 passed all 49 Node
  tests and all six browser suites on implementation `8eaf0f2`:
  https://github.com/yitzhach/geopolymer/actions/runs/38252231782.
  Suites: route smoke (76 routes), notebook, literature, research, assistant,
  knowledge. Desktop/mobile checks include filters, abstention, pagination,
  shared URLs, censored results, saving and exports.
  Visually reviewed six 1440px/390px viewport screenshots for /knowledge and
  studies ke-5396/ke-2957 from artifact 11748471985: readable responsive titles,
  controls and partial-extraction notices. These are viewport, not full-page,
  screenshots; automated route checks cover horizontal overflow.
  A pre-QA review corrected the no-JavaScript catalog count (86) and prevented
  initial evidence rendering from changing canonical/legacy-hash URLs.
- Synthetic scale benchmark: 500 / 1,000 metadata records; p95 search 1.55 / 2.49 ms;
  JSON payload 590,031 / 1,180,391 bytes (gzip 14,312 / 24,573). Fixtures are not in
  the public scientific catalog. These figures do not benchmark 1,000 full papers.
- Production output: 2,698,432 bytes at the specimen-batch local build.
- Implementation `8e919d6` passes all 54 tests and six browser suites:
  https://github.com/yitzhach/geopolymer/actions/runs/38347215725.
  Browser checks cover the percent-unit query and individual-specimen label,
  plus the existing graph-excerpt, export and desktop/mobile regressions.
- Graph implementation `017b4e8` passes all 53 tests and six browser suites:
  https://github.com/yitzhach/geopolymer/actions/runs/38321300599.
  Artifact 11778309305: reviewed the graph rows at 1440/390 px and knowledge
  overview at 390 px. Estimate labels and reading allowances are visible;
  tables use horizontal scrolling on mobile. The first browser run dismissed
  the existing replacement-confirmation prompt; the test now accepts it before
  checking the saved excerpt. Application confirmation behavior is unchanged.
- Actual importer CLI ran twice against the same 25-record input: atomic
  checkpoint retained exactly 25 records and 25 acceptance events.
- No live deployment or new build identity verified for this branch.
  A 12 October request to the live build-info endpoint returned HTTP 403.

## Remaining acceptance work and next resumable batch
1. PR #6 and PR #7 are merged. Resume from current main (`7c08fc3` merge plus
   this documentation checkpoint). Both source batches and browser verification
   are published. Scientific Phase A acceptance remains incomplete.
2. Five full-paper inventories remain partial: graph-only series, analytical
   profiles and some method details need reviewed extraction/digitization or
   underlying source data. No estimated graph values are in exact numeric search.
   Phase A breadth target is met; complete extraction acceptance is **not** claimed.
3. Preserve unresolved issues on study pages: humidity conflict and misordered
   relative comparisons in ma15082944; slag fraction wording versus mass table in
   ma15010211; unquantified laboratory temperature and mixed Na/K in ma15082957.
4. Status follow-up checked the five PMC experimental article copies; no notices
   found. Publisher requests returned HTTP 429 and PubMed browser challenges, so
   those checks remain unresolved. The other twenty additions have only their
   Crossref check. No absent notice proves a clean status.
5. Finish the pilot before breadth expansion: ma12060902 Figure 9 means now have calibrated
   provisional extraction; experimental standard deviations remain pending; ma15010211 Figures 1–2 remain blocked by undefined
   marker/connecting-line statistics; underlying values or clarification required; ma15082944 shrinkage curves need sign/baseline-aware
   digitization; ma14185396 analytical profiles include unprinted data. Preserve
   missing uncertainty and all source conflicts. Then a <=25-reference batch should broaden beyond the pilot's shrinkage/MK/slag
   citation chain to coffee char versus ash, coating adhesion, failed setting,
   other publishers and material supply routes. Full-text operations for the
   twenty metadata additions remain unassessed. No encyclopedia pages or current
   supplier offerings have been created; those are subsequent phases.

## Follow-up checkpoint — 12 October 2026
- Added 73 exact reported values: 69 printed figure labels and four previously
  missed validation results; two additional validation mixtures. Totals above
  supersede the first QA run's 60 mixes / 182 observations.
- All additions have source locators, two-pass same-agent review and an audit
  manifest. No graph-estimated values introduced. Figure-only curves and error
  magnitudes still pending; five full-text records remain partial.
- Recomputed all 216 K/k/R factor summaries in ma15082957; 18 disagreements with
  primary tables retained and disclosed. No unsupported correction or optimum.
- Expanded methods for all five papers; fixed acid-test initial cure to 28 days;
  preserved shared-tank and omitted-profile limitations. Added two failure/mixed
  findings (12 total). Schema/foreign-key validation and 76-route build pass.
- Follow-up implementation `568d4e62452df88d5c04926196e52744074c1715` passes
  all 51 Node tests and all six browser suites in run 38319716460:
  https://github.com/yitzhach/geopolymer/actions/runs/38319716460.
  Artifact 11778690860 contains desktop/mobile screenshots. Visually reviewed
  four viewports: knowledge at 1440/390 px, ke-2957 at 390 px and ke-5396 at
  1440 px; counts, wrapping and partial/source-status disclosures are readable.
  This final handoff/documentation update does not change the verified code.
- Read phase-a-followup-source-audit.json, phase-a-factor-audit.json and
  phase-a-status-followup.json. PR #6 subsequently merged as recorded above; no new live identity verified.

## Specimen-level MIP checkpoint — 13 October 2026 (Eastern)
- Reviewed refreshed ma15010211 HTML and Figures 1–2. Multiple overlapping
  markers and undefined line statistics prevent defensible graph-mean extraction.
  Two bending specimens are specified; compression reading count is not. Marked
  both figures ambiguous; no synthetic means or age-zero results entered.
- Added all eight exact Table 7 MIP cells (porosity and critical pore diameter).
  Four original specimen labels remain linked to two existing formulations;
  each result is an individual specimen, n=1, not an average or new dataset.
  MIP preconditioning, dimensions and repeat-reading uncertainty remain unknown.
- Added specimen labels to study/search tables, saved excerpts and JSON exports;
  added % and nm search units. All five papers remain partial.
- See research/batches/phase-a-mip-audit.json. All 54 tests, schema validation,
  76-route build and six browser suites passed on `8e919d6` (run 38347215725).
  Merged through PR #7. No new live identity verified.

## Graph-estimate checkpoint — 12 October 2026 (Eastern)
- Twelve Figure 9 mean markers in ma12060902 are now provisional graph estimates.
  Image URL/hash, 796 × 1139 dimensions, per-panel axis/point coordinates, three-
  decimal rounding, ±0.003 reading allowance and separate same-agent visual checks
  are recorded in phase-a-graph-audit.json and exported evidence.
- Reading allowance is an operational bound, not SD, SE or a confidence interval.
  Experimental SD remains null; exact n remains unknown (paper says at least six).
  Three-day age comes from §3.2 part I, measured after printing.
- Exact numeric search still exposes only 252 reported numeric observations.
  Study tables and saved excerpts label estimates explicitly. Validation rejects
  missing/invalid calibration, under-sized allowance, conflicting second readings
  and relabelling graph estimates as reported. No human/domain review claimed.
- All five papers remain partial. Next: ma15010211 replicate points, ma15082944
  shrinkage curves and ma14185396 analytical data/uncertainty gaps. Do not expand
  bibliography breadth until pilot acceptance gaps have been resolved or scoped.

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

## Knowledge engine — original planning checkpoint (historical)
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
0. Continue the unfinished pilot extraction from the current status at the top.
   Foundation and 25-reference breadth target are implemented; deep extraction
   remains partial. API connection can follow when details arrive.
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
