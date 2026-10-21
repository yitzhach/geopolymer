# Geopolymer — current handoff

## Further detailed summaries and deep dives — 21 October 2026
- Added three partial source-backed guides and matching three-paragraph previews
  within the existing 1,000 papers: calcium hydroxide setting endpoints, joint
  silicate-modulus/slag effects, and seawater paste strength/free-chloride limits.
  Current totals: 91 detailed previews / 92 guides; one guide remains recipe-only.
- All 88 previous previews are preserved exactly. Library card links, study pages,
  detailed-summary filters, search and export include the new records.
- Audit: research/batches/reading-followup-2026-10-21.json. Sixteen source operations,
  three reviewed papers, one deferred shrinkage candidate. Selected primary text
  only; publisher 429 and PMC browser checks were respected. Seawater CC BY 4.0
  observed in PMC permissions; other two source licenses remain unassessed.
- No canonical observations, recipes or bibliography records added. Pilot counts
  remain 5 studies / 62 mixes / 275 observations, recipes 43 / 31 scalable.
- Validation: all 119 Node cases, schema and 1,112-route build pass. Reading UI
  checks pass all 91 summaries at desktop/mobile with and without JavaScript.
  All six affected study/guide routes pass browser source/outcome/overflow checks
  in the same four contexts; mobile screenshot inspected. Earlier unchanged routes
  were not exhaustively re-swept. Source-status and correction holds stay intact.
- Standing authorization permits pushing this completed batch to main. Remote CI
  and live deployment are not verified. OpenAlex remains on hold; schedules unchanged.

Updated 20 October 2026; dates use Eastern time.

## Rich reading previews and further deep dives — 20 October 2026
- Owner approved previews for all 73 catalog-backed papers and more deep dives
  within the existing 1,000 papers. Implemented 88 previews (73 + 15) and 89 total
  guides. The unmatched Taguchi recipe guide is still outside the bibliography.
  No publications were added or deleted; stable IDs/DOIs/titles remain intact.
- Native “Read paper summary” disclosures on library cards contain three labeled
  paragraphs, key takeaways, limitations, intended readers and source/deep-dive
  links. Study pages expose the same summary. Library filters distinguish detailed
  reading summaries (88), papers with guides (88), and legacy brief summaries (22).
  Preview text participates in library search; database JSON has an optional
  readingPreview object for the same 88 records.
- Modules: paper-reading-previews.js (static original editorial data),
  paper-reading-ui.js (shared rendering/search), paper-reading-core.js (build
  validation), deep-dive-reading-expansion.js (15 new guides). Preview identity,
  source locators, links and correction holds are validated before public build.
- New guides cover alternative activators, cross-scale strength, pavement and
  lime–pozzolan systems, thermal fillers, cork/fiber/epoxy composites, calcium,
  seashells, waste-sand mortar, RAP grout, ceramsite, corrosion and foam NMR.
  Three five-paper source-review audits retain actual queries and operation counts.
- Existing notes were explicitly allocated to question/method/findings paragraphs.
  Ten missing outcome accounts received indexed primary-text followups in two
  five-paper batches. The aluminum fire-coating preview still labels its
  quantitative outcome unresolved; no rating or numerical ranking was invented.
  Existing MgO correction hold remains visible and excluded from assistant evidence.
- Source scope: selected indexed primary passages, not complete PDF/figure review,
  human/domain review or comprehensive status clearance. Direct publisher fetch
  returned HTTP 429 once. No repeat loop, raw paper/abstract/table/figure retention
  or inferred numerical corrections. New guide licenses remain unassessed.
- Canonical data unchanged: five partial studies / 62 mixes / 275 observations;
  43 recipes / 31 scalable. Editorial previews add no measured observations.
- Validation complete: all 118 Node cases, schema validation and 1,109-route build
  pass. Dedicated UI checks pass all 88 previews, JS filters/search, expansion,
  links, correction hold and export at desktop/mobile. Native disclosures and links
  also pass without JavaScript. All five existing feature suites pass. Smoke checks
  cover all 103 affected study/guide routes at desktop/mobile, without JavaScript,
  and via legacy hashes, plus existing core interactions and storage-failure paths.
- A final readability pass adds term definitions, source-specific methods gaps and
  explicitly editorial interpretation checks. Paragraph totals are 114–331 words,
  before bullet lists. Full Node/build and dedicated UI checks pass again afterward;
  no application logic changed in that prose pass. Final mobile screenshot inspected.
  The reading browser suite is included in CI. All 1,109 routes are built/static
  checked; the older unchanged route corpus was not exhaustively re-swept in-browser.
- A warm local Node filtering/payload measurement is recorded in
  reading-preview-performance-2026-10-20.json. It is not production/browser latency;
  the prior 1,000-paper performance file remains historical pre-preview evidence.
- Published implementation ba38ae77f16e25bc16fbbfaa09c9231016f5aca4 to main;
  git ls-remote confirmed that exact SHA after push. This publication-status note
  follows in a documentation commit. The one-time five-hour backup continuation
  was paused after completion to prevent duplicate work. Daily automation is
  unchanged; OpenAlex stays on hold. Remote CI/live deployment remain unverified.
- Next research: deepen complete source inventories, reconcile remaining correction
  and method holds, and expand source-backed summaries in bounded batches. No
  claim that all 1,000 papers have full-text reviews or rich summaries.

## Paper-to-deep-dive links — 20 October 2026
- Owner asked whether library papers link to connected guides. Study pages already
  link by DOI; library cards previously did not. Added DOI-matched deep-dive links
  to libraryResults, including dynamically filtered cards and no-JavaScript HTML.
- All 73 catalog-matched guides link from their library cards. The 74th guide,
  ggbs-taguchi-mortar (10.1080/13287982.2024.2375468), connects to a curated recipe
  but has no paper in the current 1,000-record library. No new paper was invented
  or automatically added to hide that distinction.
- Production build passes. Fifteen relevant regression cases passed before adding
  the relationship regression; the final nine-case deep-dive suite passes with
  that new regression. Browser checks verify all 73 card links, filtered navigation,
  destination, desktop/mobile and JavaScript/no-JavaScript behavior.
- Owner also asked about richer multi-paragraph/bullet summaries. Current library
  has 22 brief-summary records. Recommended first enriching the 73 guide-backed
  papers from reviewed source notes, then bounded source-review batches for the
  remaining metadata-only records. No bulk summary backfill was performed or
  inferred from titles; source coverage and correction holds must remain visible.

## Deep-dive menu link — 20 October 2026
- Owner requested the direct deep-dive URL and a menu entry. Added “Experiment
  deep dives” under Research, directly after Research Library, in index.html.
- Destination: /deep-dives. Production build passes (1,094 routes). Focused browser
  checks pass at desktop/mobile widths, with and without JavaScript; all 74 guide
  cards render and the destination has no horizontal overflow.
- Publish with this session's standing main-push authorization. Live deployment
  identity remains separate from local validation and Git publication.

## 1,000-publication expansion — 20 October 2026
- Owner requested 200 more after the completed 800 checkpoint, plus more deep
  dives. Standing authorization to push completed tested work to main continues.
- Baseline main a841cbbcca24dc47657dd3e93209a2ea34848754, clean working tree.
  Added 200 metadata records in batches 31–38, preserving all prior 800 identities.
  Total 1,000 publications: the latest additions contain 28 reviews / 172 other
  journal articles. New module src/knowledge-expansion-1000.js.
- Discovery: 90 queries, 299 scoped DOI-deduplicated leads. Checked 216 using exact
  DOI/publisher searches (plus 20 preparatory and four classification followups).
  Verified 205 identities, excluded one publisher-marked RETRACTED paper
  (10.3390/buildings12081066), selected 200 and retained four verified reserves.
  Remaining 83 leads are unchecked, not accepted. Selection favors MDPI; no
  systematic or publisher-balanced coverage claim. Full authorship and exact
  first-online dates remain linked where not transcribed.
- Twenty-five new partial guides, 74 total, in src/deep-dive-expansion-1000.js.
  Five five-paper audits A–E retain actual queries, locators and operation counts.
  Methods, materials, ledger, results, visuals, supplements and uncertainty remain
  explicit inventory areas. No complete full-PDF/visual/human/domain review claim.
- Preserve key holds: mixed volume/mass ratios, 48-day endpoints, co-varying CRT
  glass/activator, ambiguous pore definitions, an unresolved silicate assay/modulus
  context, and substantial Portland cement in the SCBA mixed-alkali source.
  No inferred source corrections or new canonical numbers.
- Direct publisher fetch returned HTTP 429; no repeated-open loop. Selected indexed
  primary text only. All new guide licenses remain unassessed. No raw papers,
  abstracts, complete source tables/figures or supplements retained or reproduced.
- Canonical data unchanged: five partial studies / 62 mixes / 275 observations;
  43 recipes / 31 scalable. Existing reactive-MgO correction exclusion preserved.
- Validation so far: all 114 Node cases, schema validation and 1,094-route build
  pass. All five feature browser suites pass (research, notebook, literature,
  assistant, knowledge). All 225 NEW routes pass desktop/mobile, no-JavaScript
  and legacy-hash checks, plus core interactions, 404s, keyboard behavior and
  storage-failure recovery. All 25 guides pass focused desktop/mobile source-link,
  inventory, walkthrough and overflow checks; mobile screenshot inspected.
  This release did not repeat the earlier 869-route browser sweep; all 1,094
  routes are statically built and checked by the Node foundation suite.
- The first research browser attempt timed out taking a full-page screenshot of
  the 1,000-record library. The listing screenshot is now viewport-bounded;
  record-count and whole-document overflow assertions remain, and the full
  research suite passes on rerun. No application behavior was weakened.
  Production content date updated to 20 October 2026 for generated crawl metadata.
- A local warm Node filtering microbenchmark (500/1,000 actual catalog prefixes,
  140 measured calls each) and payload/build sizes are recorded in the performance
  audit. It is not a browser, network, production or universal performance claim.
- The single owner-authorized five-hour continuation was paused after successful
  completion and verified main publication, preventing duplicate additions.
  Existing daily automation unchanged. OpenAlex remains on hold.
- Published implementation f76afa106d8a712eb6e36f929f93df010006d9e3 to main;
  git ls-remote confirmed that exact SHA after push. This publication-status note
  follows in a documentation commit. Remote CI and live deployment remain
  unverified. Next research: inspect full PDFs
  and supplements for selected guides, reconcile the existing MgO erratum and new
  chemistry/method holds, and resolve existing pilot gaps. No quota beyond 1,000
  is assumed.

## 800-publication release — 19 October 2026
- Owner requested 300 MORE after the 500 checkpoint, plus additional substantive
  deep dives, and explicitly authorized pushing completed work to main.
- Implemented 800 publications and 49 deep dives: +400 publications and +38 guides
  across both requests. The 500 checkpoint is local commit 625a6db.
- Twelve bounded 25-record batches (19–30) preserve all 500 prior identities.
  Screened 377 DOI-deduplicated candidates; 318 passed primary metadata gates;
  selected 300 (39 reviews / 261 other journal articles), leaving 18 reserves.
  Audit: research/batches/breadth-800-verification-2026-10-19.json and frozen
  prior-500 baseline. Metadata discovery is publisher-skewed, not systematic.
- Twenty-three additional partial editorial guides in five review batches A–E.
  Source locators, seven-area inventories, conditional calculations and proposed
  experiments remain distinct. Full PDFs, visuals and supplements were not fully
  inspected. Two apparent experimental leads proved to be reviews and were excluded
  from experiment guides. No raw articles, abstracts or source tables are retained.
- Known update hold: original 10.3390/ma12030526 links erratum
  10.3390/ma12091388. Correction reconciliation remains pending; the source is
  excluded from assistant evidence. No corrected numerical measurements inferred.
- Exact original-article CC BY 4.0 evidence observed for waste-glass paper
  10.3390/polym13091493. Other new guide licenses remain unassessed; the MgO
  erratum license does not establish the original article license.
- Canonical data unchanged: five partial pilots / 62 mixes / 275 observations;
  43 recipes / 31 scalable. No new numerical extraction or automatic transfer.
- Validation: 111 Node cases pass; schema validation and 869-route build pass.
  Five feature browser suites and focused checks of all 38 new guides pass at
  desktop/mobile widths. All 869 routes pass desktop/mobile, legacy-hash and
  no-JavaScript checks. Large smoke coverage was split into the desktop/mobile
  route pass, four concurrent legacy-route workers, and the remaining interaction/
  no-JavaScript pass. The serial run was stopped after its mobile sweep to avoid
  repeating legacy coverage. No browser page errors were observed.
- Final metadata cleanup removed publisher navigation text from ke-b24-017's
  title. The affected build files were safely refreshed without deleting preview
  paths; targeted identity tests and browser study/export checks pass afterward.
- Release implementation: 295870e, following 500 checkpoint 625a6db. Push to main
  succeeded at 5bd2d22593b9dd312db0eacd732eb1a98d420045; git ls-remote confirmed
  that exact main SHA. This publication-status note follows in a documentation
  commit. Remote CI and live deployment remain unverified; GitHub Actions API
  access via gh returned Forbidden.
- An early browser attempt overlapped a test-triggered dist rebuild, interrupting
  the preview. The final browser runs use the completed stable build.
- The one-time five-hour continuation was paused after successful completion
  and verified main publication, preventing duplicate additions. Existing daily
  automation remains unchanged. OpenAlex remains on hold.
- Next research: inspect full PDFs and supplements for selected guides, reconcile
  the known MgO erratum, and resolve existing hemp/foam/biochar pilot gaps.
  No additional breadth quota beyond 800 is assumed.

## 500-publication expansion and fifteen new deep dives — 19 October 2026
- Owner requested +100 articles and as many substantive source-backed guides as
  accessible evidence supports, then explicitly authorized pushing to main.
- Baseline main: 8e580ec7daafc1f3580defe01b9aac8d2da99de2 (PR #24). Working
  checkout was clean. Added 100 unique metadata records in batches 15–18 (25 each),
  preserving all prior 400 IDs/DOIs/titles. Total: 500 publications.
- New module src/knowledge-expansion-500.js; 27 reviews / 73 other journal articles.
  Exact-DOI verification screened 116 candidates. Publisher-index access favors
  MDPI; this is not a systematic/publisher-balanced review. Complete authorship is
  linked where not transcribed. Correction/retraction clearance remains unassessed.
- Fifteen partial editorial guides in src/deep-dive-expansion-500.js: ambient and
  modified coatings, biochar/IBA, phosphate polymers, MK temperature/grade,
  starch/borax retarders, waste foams, PVA tension, epoxy/silane shrinkage,
  Ca(OH)2 carbonation tradeoffs, side-stream printing, SFCC phosphate binders,
  foam/polystyrene fire assemblies, MK/FA liquid ratios and masonry fibers.
  Twenty-six guides total, all with the seven-area inventory and source locators.
- Source inconsistencies retained: shrinkage reduction 131.2% needs signed baseline;
  carbonation equation/prose disagree; PVA sand-ratio wording differs; fire-foam
  percentage labeled density is dimensionally inconsistent. No inferred corrections.
- Audit: research/batches/breadth-500-verification-2026-10-19.json and frozen
  prior-400 baseline; three five-paper deep-dives-500 audits. All new guides are
  selected indexed-text AI reviews, not complete PDF/visual/domain reviews.
  MDPI opens returned 429; PMC opens returned challenges; institutional biochar
  PDF exceeded tool size. No access bypass or repeated failed-open loops.
- No raw papers, abstracts, figures or complete source tables retained. Exact
  CC BY 4.0 evidence was observed for the calcium-hydroxide paper; other new guide
  licenses remain unassessed. Original factual notes/planning only.
- Canonical data unchanged: five partial pilots / 62 mixes / 275 observations;
  43 recipes / 31 scalable. No automatic calculator transfer or predictions added.
- Validation: all 108 Node cases, schema validation and 546-route build pass.
  All six browser suites pass, including the full desktop/mobile, legacy-hash and
  no-JS route sweep. Its console still says 30 routes, but imported routes.length
  was 546. Focused checks of all fifteen guides pass at desktop/mobile widths.
- Publication pending the owner-expanded 800-paper scope. Remote main matches baseline.
  Shell git works with approved sandbox escalation; GitHub Actions API via gh
  returned Forbidden. Do not infer remote CI or live identity from local checks.
- A one-time owner-requested five-hour continuation was created for 20 October
  2026 04:13 Eastern (08:13 UTC), automation 6ad6dc51ebb881918ae3148cd3c9d7b1.
  It must check whether the 500/+15 task is complete before adding anything.
  No usage-reset detection is assumed; existing daily automation is unchanged.
- Next after release: deepen selected guide inventories from full PDFs and resolve
  the existing hemp/foam/biochar pilot gaps. OpenAlex stays on hold. No additional
  breadth quota beyond 500 is assumed.

## Three owner-PDF durability guides — 19 October 2026
- Owner uploaded the three deferred MDPI PDFs. Added /deep-dives/fly-ash-slag-efflorescence-moisture,
  /deep-dives/one-part-admixture-compatibility and /deep-dives/metakaolin-slag-potassium-durability
  (src/deep-dive-owner-pdfs.js): eleven guides, each with the seven-area inventory.
- Conflicts kept visible: efflorescence cylinder size (100×200 vs 50×100 mm); K/Na paper's
  "metasilicate" listed near modulus 3.2 and ambiguous KOH entry basis. Admixture W/GP-solids
  0.367 reproduced from bound water. Admixture study is 60 °C heat-cured, not ambient.
- Audit: research/batches/deep-dives-owner-pdfs-2026-10-19.json. PDFs not committed.
- 105 Node test cases, 431-route build and all six browser suites pass locally.
- Counts: 400 publications; pilot/recipe counts unchanged; no canonical observations added.
- Network: phone app cannot edit environment network access; owner PDF upload is the working route.
- PR #24 (https://github.com/yitzhach/geopolymer/pull/24) carries both this and the inventory
  work below; merged to main once GitHub CI passed. Resume from current main.
- Next: hemp/foam/biochar pilot gaps need source PDFs; ask the owner to upload
  10.1111/jace.70158 (foam), 10.3390/ma18030486 (biochar), 10.3390/polym18111288 (hemp).
  Then move guide inventory rows to extracted with locators. OpenAlex still on hold.

## Guide source inventories; deferred durability methods still blocked — 19 October 2026
- Worked from 6bf1dad (400 publications / eight deep dives) on branch
  claude/keen-bardeen-c34ppt in a cloud session. Not merged; live identity unverified.
- First "Next" item blocked: methods for ma13235550 (moisture/efflorescence),
  min14080776 (mixed K/Na) and ma12203410 (one-part admixtures) not recovered.
  Shell egress refuses research hosts (Europe PMC REST tried, a new route); URL-fetch
  tool failed DNS for every host; 16 searches returned abstracts/introductions only.
  Abstract-level leads recorded but not integrated. All three stay deferred.
- Built: fixed seven-area source inventory (methods, materials, mix ledger, results,
  figures, supplements, uncertainty) for all eight guides in src/deep-dive-inventory.js.
  Restated from existing holds/audits only; no new facts. Rendered on every guide and
  exported in /deep-dives.json. No area is extracted/verified; no coverage percentage.
  Build validation rejects missing areas, unknown states, empty locators and percentages.
- Audit: research/batches/deep-dives-inventory-2026-10-19.json (queries, routes, leads).
- All 26 Node test files (104 cases) and 428-route build pass. All six browser suites pass
  locally with pre-installed Chromium and Playwright 1.63.0; CI not yet run on this branch.
- Counts unchanged: 400 publications, eight deep dives, five partial pilot studies,
  62 mixes, 275 observations, 43 recipes / 31 scalable. OpenAlex on hold; automation unchanged.
- Superseded: the three deferred papers were resolved from owner PDFs (see top). Next: move
  guide inventory rows from partial/not yet extracted to extracted with locators. Hemp/foam/biochar pilot gaps remain as below.

## Hundred-paper expansion and durability deep dives — 19 October 2026
- Published baseline 300 publications / six deep dives confirmed at main
  03976b67daa72683ad4884e0e31bdac9f2c51b8f. Added 100 unique DOI records
  in batches 11–14 (25 each): 400 publications, eight editorial deep dives.
- Added freeze–thaw MK and carbonate/hydroxide slag experimental guides with
  source locators, ratio arithmetic, stepwise planning and explicit reproduction holds.
  Five-paper extraction batch stopped at 40 operations; three method-poor candidates
  deferred in deep-dives-durability-2026-10-19.json. No invented graph values.
- Preserved all prior 300 identities; corrected issue years, replaced duplicate
  oceram.2021.100065 with soil-burial jute paper s41062-020-00441-5.
  Flax eti.2020.101105 is corroborated by a publisher-hosted reference list;
  original article heading inaccessible. This exception is visible on its record.
- Carbonation conbuildmat.2023.133403 has linked corrigendum 134686; unresolved
  interpretation/caption changes flagged and excluded from assistant evidence.
- Counts: five partial pilot studies, 62 mixes, 275 observations, 43 recipes /
  31 scalable remain unchanged. Metadata additions are not new experimental data.
- OpenAlex remains on hold. Daily research draft automation unchanged.
- All 26 Node test files pass; build produces 428 routes. All six browser suites
  passed GitHub run 39235734379 on cadc0a3feb276ca7d94af76574a3cff730278a6a.
  PR #22 merged as 958f8d8868b46dbb2420d6f424a1f014fd503711.
- Local staged tree 55c2719d9c8d3972c565772d5fb9fcd0fd4457cf exactly matches
  the tested feature. This final handoff is newer unstaged work. HEAD remains
  79f41c5; preserve both and do not reset to main.
- Post-merge build-info was inaccessible via the web tool. Live deployment identity
  remains unverified; no access bypass or repeated request loop.
- Next: recover activator/exposure details for moisture/efflorescence, mixed Na/K
  durability and one-part admixture guides; finish new guide inventories and
  existing hemp/foam/biochar pilot gaps. No additional breadth quota assumed.

## Fifty-paper expansion and two control-method deep dives — 19 October 2026
- Confirmed published baseline 250 / four deep dives at main fe1ab160e011de9756480de249384e8b02cf8427.
  Added 50 unique DOI records in bounded batches 9 and 10 (25 each): total 300.
  Preserved all prior 250 IDs/DOIs/titles; new module knowledge-expansion-300.js.
- Added partial editorial deep dives on MK/slag shrinkage controls and MK paste
  water/starting temperature: six total. Ratio denominators, derived arithmetic,
  methods, unfavorable outcomes, source locators and replication holds are explicit.
  These are not complete extractions or qualified ready-to-run recipes.
- Publisher title-only correction for ma17051181 documented. Catalog cards now
  show escaped source notes. An unexplained secondary withdrawal label for
  cemconcomp.2024.105811 was not confirmed at publisher/institution; held from
  assistant evidence pending review. Catalog presence is not status clearance.
- Rejected existing DOI clay.2025.108055 during deduplication; final replacement
  mawe.70103 verified at Wiley. Corrected clay.2020.105968 to cited issue year 2021.
- Audits: breadth-9/10-2026-10-19, frozen 250 baseline, deep-dives-controls-2026-10-19.
  Indexed primary text supports partial methods; publisher 429/PDF failures recorded.
  No graph points or raw papers retained. OpenAlex remains on hold.
- Canonical pilots unchanged: five partial studies, 62 mixes, 275 observations;
  recipe catalog 43 / 31 scalable. Daily draft automation unchanged.
- Local 25 Node test files and 326-route build pass. Local browser server denied
  socket bind (EPERM); all six browser suites passed GitHub run 39216232493.
  Verified feature 493749bae634651f86ddc7d72b933256f0bd3e57; PR #21 merged
  as 29de5eab4e7f9d7ca82a518291abb3eb7e8bf0c3.
- Local staged tree 71a2cfe07242956853fde7c3006353f1ff2db196 exactly matches
  the tested feature. This final handoff is newer unstaged work; HEAD remains
  79f41c5. Preserve both and do not reset to main.
- Post-merge live build-info request was inaccessible via the web tool; deployment
  identity remains unverified. No approval bypass or repeated access attempts.
- Next: complete the two new deep-dive inventories/activator ledgers; investigate
  the secondary source-status flag; resume hemp shiv/fiber durability and existing
  foam/biochar pilot gaps from their audits. No further breadth quota is assumed.

## Hemp test-method follow-up — 18 October 2026
- One-paper, five-query batch located mechanical loading rates and thermal
  ramp/dwell/cooling in §§2.4.2/2.4.4 of DOI 10.3390/polym18111288.
  Updated the existing deep dive and removed the obsolete ramp/cooling hold.
- Added original explanation of within-mix strength retention versus between-mix
  exposed strength. This does not resolve the paper's conflicting thermal claims.
  Quantitative porosity/dispersion were outside the source study's scope.
- Indexed primary text only; no direct-access retries, graph extraction or new
  canonical measurements. Audit: hemp-methods-continuation-2026-10-18.json.
- All 24 Node test files and 274-route build pass. CI 39184384317 passed all
  six browser suites on 9c7fbef2a04a56e729245ebfbd6f9c04e3c733f7. PR #20
  merged as d19bdeccbbfc07a4bf109dc511fa8ff608e0f05c.
- Staged tree e8c51d6e98f3d3f255e5abd2129eb3a4ee8829a5 matches that feature;
  final handoff is newer unstaged work. Local HEAD remains 79f41c5; preserve both.
  Live build-info recheck remained inaccessible; deployment identity unverified.
  Counts remain 250 publications, four deep dives and five partial pilot studies.
  OpenAlex on hold; daily draft automation unchanged. Prior local work preserved.

## Forty-nine-paper expansion and hemp nanofiber deep dive — 18 October 2026
- Confirmed published baseline: PR #18, 201 publications and three deep dives.
  Added 49 unique DOIs in batches 7 (25) and 8 (24): published total 250; all prior
  201 IDs/DOIs/titles preserved. Canonical module: knowledge-expansion-next.js.
- Fourth deep dive: /deep-dives/bn-hemp-nanofiber-slag, requested Polymers DOI
  10.3390/polym18111288. Indexed primary text gives the final-mixture denominator;
  original algebra and nine replication-planning steps distinguish facts from
  proposed controls. Missing mass ledger and conflicting residual-strength claims
  prevent a complete executable recipe. Hybrid reinforcement is not hemp shiv.
- Partial AI source review only. MDPI 429, PMC browser challenge and PDF retrieval
  failure recorded; indexed PMC states CC BY but exact license version unresolved.
  No raw paper, copied figures, graph points or new canonical measurements.
- Renderer supports publication links without fabricated formulation links, article
  source labels, access notes and explicit optional license URLs; build validates
  publication/formulation and HTTPS license links. Existing notes keep their licenses.
- Primary DOI checks corrected a candidate ScienceDirect PII. Historical journal
  names and issue years retained; no independent dataset claim. Metadata-only
  rights/status limits remain visible. OpenAlex remains on hold; no key received.
- All 24 Node test files and 274-route build passed locally. GitHub CI
  39111116677 passed on c2e0434c8646603e1b3ddf0eff6250f17d6a188b, including
  all six browser suites. PR #19 merged as a561ef9fc84d66e953d4abe531e6e3e67e7b7e04.
  Live build-info and new deep-dive route remain inaccessible through the web
  tool; deployment identity unverified.
- Local staged tree 566acc7544edd09fb17213c59c2076556745feb6 matches the
  tested feature. This final HANDOFF update is newer unstaged content; preserve both.
- Five partial pilot studies, 62 mixes, 275 observations, 43 recipes/31 scalable
  unchanged. Foam mix-ID/dose/unit gaps, biochar assay/figure gaps and complete
  hemp extraction remain pending; do not repeat failed access routes without cause.
- Daily draft automation unchanged. This scheduled attempt does not detect a reset;
  the requested +49 is merged, so do not repeat it in a future run.
- Local HEAD remains 79f41c5. Completed PR #19 work is staged; newer handoff
  preserved; no reset, main checkout or retry of approval-blocked fetch.
- Remote main parent: cf772942d11f3682dee94ea9391039b2990512c7.

## Forty-paper expansion and two new deep dives — 17 October 2026
- Local target reached: 201 unique publications, +40 metadata-only records in
  breadth-5 and breadth-6 batches. All 161 prior IDs/DOIs/titles preserved.
  Five partial pilot studies, 62 mixes, 275 observations, 43 recipes/31 scalable
  unchanged. Canonical bibliography joins src/knowledge-expansion.js.
- Added `/deep-dives/biochar-replacement-and-exposure` and
  `/deep-dives/basalt-fiber-carbon-textile`; three deep dives total. Linked existing
  recipes; no duplicate dataset, new measurement or full-extraction claim.
- Audit research/batches/deep-dives-2026-10-17.json records methods, conditional
  arithmetic, source rights and unresolved fields. Hempcrete PDF follow-up failed;
  no new claims from that attempt. Figures/assays remain pending.
- JSON export `/deep-dives.json`; article-specific glossary and study/deep-dive
  links. Metadata provenance label no longer incorrectly assumes Crossref.
  Study descriptions include title to avoid collisions for untranscribed authors.
- Primary exact-DOI checks corrected candidate year/title/journal errors before
  integration (including JCEMS 2020, one-part mortar 2021, SN Applied Sciences).
  Author lists transcribed only where observed; status/rights remain unassessed
  for this metadata batch. No OpenAlex calls or key received/configured.
- All 23 Node test files and 224-route build passed. GitHub CI 39092913920
  passed on 16d1b7ee042c67273c41fd7b164ad2e16e87c5bf, including all six browser
  suites. PR #18 merged as c3f20df7744afb4ef23efaebe31abec9422617c2.
- Staged tree 332b2a80fe9ca333be07425a5afa21a751f24c53 matches that feature;
  final HANDOFF text is newer unstaged work. Preserve both before synchronization.
  Live identity remains unverified.
- Owner requested a separate +49 after five hours. One-time task confirmed for
  18 October 2026 04:12 Eastern (08:12 UTC), automation
  6ad4392c2a088191a2dc6a8bdc519597. It targets 250 only after confirming this
  201 baseline; preserve existing daily draft automation. No usage-reset detection.
- Current local HEAD remains 79f41c5 with completed staged work; preserve before
  synchronization. Remote parent before this batch: f2f497350f712064a028e995040b6f82b093d098.

## GGBS experiment deep dive — 17 October 2026
- New `/deep-dives` section and `/deep-dives/ggbs-taguchi-mortar`, linked from
  research, search and existing T2M9 formulation. Includes highlights, sourced
  materials/ratios/procedure, conditional arithmetic and nine planning steps.
- DOI 10.1080/13287982.2024.2375468 already exists as alameri-t2m9; no duplicate
  study, canonical observations or scalable recipes added. Counts unchanged.
- Publisher returned 403; university PDF text accessible, CC BY 4.0 p.95.
  Audit: research/batches/deep-dive-ggbs-2026-10-17.json. Partial AI text review.
- T2M9 versus zero-SiC recommendation conflict remains. SP solids basis is an
  inference. Complete activator composition/free water and uncertainty unresolved.
- Shared renderer/build validation and tests added. Browser coverage includes
  navigation, nine steps and desktop/mobile overflow. All 22 Node test files and
  the 182-route build pass. GitHub CI 39062454346 passed all six browser suites
  on feature 5503ad54246896d99cf6c261f22db484ad7a1831.
- PR #17 merged as c7016831fd37cf705258b4a08e47045d34783b84.
- Local staged tree 20c36ed2f94ef4cfdcbc326ab114a5a7c1ee0e0e matches the feature;
  this final HANDOFF update is newer unstaged content. Preserve both.
- Live build-info remained inaccessible through the web tool on this check;
  deployment identity is unverified, not inferred from successful CI.
- Local HEAD still 79f41c5; prior staged work preserved. Do not reset to main.
  OpenAlex remains on hold and daily automation unchanged.

## Queue finding search — 17 October 2026
- Offline queue now searches editorial findings and source locators alongside its
  existing title/DOI/material/next-check fields. Each context exports its note,
  review status and rights statement; CLI output displays them with the date.
- Regression tests and CLI probes pass for acoustic and hot-water searches;
  unrelated source terms cannot combine into a match across different papers.
  No network access, source promotion or canonical ingestion added.
- Sand-replacement clean-copy attempts: publisher HTML tool error; PMC browser
  challenge. Do not retry these or import from overlapping PDF text layers.
- GitHub CI 39017806531 passed all checks on 553f96707469758d24945bb3f21a4df21c597cf1.
  PR #16 merged as 710b8710b7ee3d0d4e83fd72f81174b360d3d48a.
- Current local HEAD is still 79f41c5. Staged tree 07e612484c6d935eb3bbca931e6ece712e260785
  matches feature 553f967; HANDOFF.md also contains this newer unstaged checkpoint.
  Preserve both before synchronization. No retry of the approval-blocked fetch.
- Live deployment identity remains unverified; no schedule changes or OpenAlex use.

## Biochar provenance follow-up — 17 October 2026
- Saccani DOI 10.3390/ma18030486 §2.1 and references identify the next sources:
  ref. 33 is Sorrenti et al., Biochar physico-chemical properties as affected by
  environmental exposure (2016); ref. 41 is Manzi et al., Geopolymeric Composites
  Containing Industrial Waste Reinforced with Arundo donax Fibers (2024).
- Ref. 33 is cited for biochar elemental composition; ref. 41 for metakaolin XRD.
  Neither citation alone establishes a matched lot oxide assay. Qualify material
  identity and exposure state before chemistry transfer. No new assays imported.
- Source: https://cris.unibo.it/retrieve/18a88cc9-e847-4171-b93c-8b7d2c5eae67/materials-18-00486.pdf
  CC BY 4.0. Existing dimensional-change figures remain undigitized. Five paper
  texts have been inspected/revisited in this bounded continuation; open a new
  batch before examining further full papers.

## Foam consistency follow-up — 17 October 2026
- Re-read Wiley HTML Table 3 for 10.1111/jace.70158. Dimensional calculation
  conductivity/diffusivity yields volumetric heat capacity, not the printed
  area-based unit. Nineteen of 20 rows agree within 1%; GPF-5S1-1HF differs
  by approximately 4.11% relative to its printed heat capacity. Arithmetic-only
  comparison; rounding/averaging and original data still require investigation.
  No source correction, mix-ID mapping or numeric ingestion is authorized by this.
- Supporting asset listed as jace70158-sup-0001-SuppMat.docx (28.5 KB).
  Prior retrieval failed; not retried. Dose, S1/WP and batch gaps remain.
- Source: https://ceramics.onlinelibrary.wiley.com/doi/full/10.1111/jace.70158
  Only original brief notes retained; no source table/figures reproduced.

## Continued checkpoint — clay/slag hempcrete source pair
- Added two partially reviewed source cards to the hemp topic (10 total) and its
  existing offline queue/export. Canonical data and recipes remain unchanged.
- Audit: research/batches/hemp-clay-slag-2026-10-16.json. Binder/hurd ratios
  disagree across papers; preserve additional pre-wetting water and investigate
  dataset overlap. No numerical recipe transfer or independent replication claim.
- Related Materials and Structures paper now partly inspected; earlier “unreviewed”
  wording below is historical. Complete inventory, visual review and status remain.
- All 20 Node test files, 180-route build and focused desktop/mobile browser
  suite pass. PR #15 initial feature 79f41c5 failed CI 38997242719 during legacy navigation
  (ERR_ABORTED). Startup and hashchange could request duplicate redirects;
  idempotent redirect fix has a regression test (old code issues three calls).
  Updated 21-file Node suite passes. GitHub CI 38997464444 passed on
  cb99c0cdbc3e5de9d6e3be492acca1ad2fef1a3c, including all six browser suites.
  PR #15 merged as dece55681f54ba83ca403c7db3bc2af1151a8462.
  Local full-sweep process result could not be recovered (unknown process ID);
  full-browser verification is from CI, not an assumed local pass.
- At the PR #15 checkpoint, local HEAD was 79f41c5 with staged tree dbe4a479
  matching cb99c0c; current staged state is recorded at the top.
  Final fetch/synchronization was blocked by automatic approval review usage
  failure (not an unsafe-action finding). Preserve staged files before resuming.
  Live identity remains unverified; runtime policy excludes the live host.
- Follow-up: second DOI publisher record gives 21 July 2025 publication/version
  date (https://link.springer.com/article/10.1617/s11527-025-02729-3).
  Exact-DOI correction search found no specific notice; not comprehensive clearance.
- §3.4 tests an epoxy-glued dolly on the hempcrete surface; failure locus remains
  unresolved. Thermal conditioning differs from general curing (§3.3).
- Table 3 separates measured acoustics at 28/332 days from modelled optimum
  absorption. Do not treat estimates as measured or combine ages. Figure screenshots
  again returned placeholders, not inspectable images. No visual verification.
- Runtime network policy still excludes research hosts and live site; use session
  web tools where available. No credentials configured; OpenAlex remains on hold.

## Additional source acquisition — hemp as sand replacement
- Pawluczuk et al., 10.3390/ma14164580 (2021), publisher PDF accessible:
  https://mdpi-res.com/d_attachment/materials/materials-14-04580/article_deploy/materials-14-04580.pdf
  CC BY 4.0 on page 1; partial AI text review, no raw retention or visual check.
- Keep the recycled-fines and hemp experiments separate. Hemp series uses slag,
  volume-based sand substitution and additional activator for hemp after poor
  workability. Fines-series heat cure must not transfer to hemp-series records.
- Next: inspect Table 9 and §§2.4.1–2.4.2 visually, qualify the extra activator,
  resolve overlapping draft/final PDF layers and questionable density units in
  Table 2, inventory all outcomes and check publication status. No numerical import.
- Hornification repository recheck still provides abstract only, no PDF link;
  do not upgrade access from search snippets. OpenAlex remains on hold.

## Next extraction checkpoint — direct calcined-clay/slag hempcrete
- Topic source DOI 10.1108/BEPAM-03-2024-0056, Nair et al.,
  “Suitability of calcined clay and ground granulated blast furnace slag
  geopolymer binder for hempcrete applications”. Added through PR #15.
- Author-hosted full text observed through session web tool:
  https://drgan.net/files/pubs/169_BEPAM_2025.pdf ; institutional identity:
  https://opus.lib.uts.edu.au/handle/10453/185061 . PDF page 1 states CC BY 4.0.
  Exact publication/version date remains to reconcile; acceptance is not publication.
- Partial AI text review only. Table 1 lists three mixes; §§2.3–3 give preparation,
  ambient curing and tests. Pre-wetting water is additional to listed free water.
  Preserve this distinction before any calculator transfer. No numeric ingestion.
- Inventory next: Table 1; Figures 1–2 hurd characterization, Figure 3 earlier
  mortar dataset (not hempcrete), Figures 4–8 outcomes/relationships, Plate 1 setup.
  No visual inspection or digitization yet. Check conditioning, uncertainty,
  material assays, complete water accounting and version identity.
- Hold structural/LCA generalizations: application framing and later structural
  language conflict; full LCA and long-term durability are future work.
- Related source https://drgan.net/files/pubs/174_MS_2025.pdf now partly reviewed;
  check shared datasets before counting independent evidence.
- Follow-up institutional/status web request returned tool error; correction
  clearance remains unknown. OpenAlex not used. No raw source retained.

## Latest checkpoint — hemp methods and offline queue, 16 October 2026
- Continued after the owner's evening request. Publisher red-mud/hemp v3 PDF is
  accessible; topic source upgraded to partial full-text review. See the new
  hemp-methods-followup audit. No new recipes or numerical observations.
- Preserve solid-volume fiber basis, unresolved curing/tensile age and PDF-layer
  conflicts. Compression is separate from Brazilian tension. Screenshot tool
  returned placeholders only; no visual or graph verification is claimed.
- Added `npm run research:queue -- hemp`; JSON via
  `npm run --silent research:queue -- --json hemp`. It deduplicates topic DOIs,
  joins canonical IDs and retains all dated contexts/next checks without picking
  the strongest evidence label. No network calls or ingestion; not the whole backlog.
- Local 20 Node test files, 180-route build and focused desktop/mobile research
  browser suite pass. GitHub CI 38995418584 passed all checks on f2b2fb0.
  PR #14 merged as ca543bd7402004835d49729e77581d7ceb1b31bd.
  Live deployment identity still requires verification. Shell synchronization succeeded
  on retry after the
  reported reset time; completed release and new work are preserved locally.
- One-time 4:30 a.m. Eastern October 17 continuation confirmed. Existing daily
  draft automation unchanged; OpenAlex remains on hold. No reset guarantee.

## Resume and preservation
- Read AGENTS.md, SUBAGENT_POLICY.md and KNOWLEDGE_ENGINE_MASTER_PROMPT.md.
  OpenAlex remains on hold. Keep existing daily automation and confirmed one-time
  4:30 a.m. Eastern October 17 continuation unchanged.
- Recover local work before switching to main. Preserve
  recovery/completed-biochar-d9efdb0. PRs #12–16 are merged; exact verification and local state above.
- Current canonical totals: 300 publications, five partial studies, 62 mixes,
  275 observations. Recipe catalog: 43 designs, 31 scalable. Do not combine the
  recipe characterization cells with canonical pilot counts.
- Remaining pilot/recipe work: source-qualified biochar assays and figures; foam
  IDs, quantities and heat-capacity units; graph uncertainty and missing methods.
  Read the relevant batch audit before repeating extraction or failed access.
- Use research/batches/ and research/briefings/ for evidence; npm run research:queue
  -- hemp for topic leads. The queue is not the entire research backlog.
- Historical release evidence, pilot limitations and architecture map are retained
  in [the checkpoint archive](research/handoffs/history-through-2026-10-16.md).
  Historical pending-language is superseded by newer checkpoints.
- Keep calculator/notebook storage keys, source IDs and unknown values intact.
  AI source review is not human/domain review. No unsupported numeric transfer.
