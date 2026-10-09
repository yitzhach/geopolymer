# Experiment notebook — review branch published and browser checks passed, 8 October 2026 (Eastern)

- Owner approved implementation, then explicitly approved review-branch publication
  and browser checks. Branch: `codex/experiment-notebook`, based on main `80315cf`.
- Published implementation: `93ae031876793d5b559ef0160d60ae90b50cce0f`.
- Draft PR: https://github.com/yitzhach/geopolymer/pull/1.
- Main and Cloudflare have NOT been changed. Review branch only; merge/deployment
  is a separate next action.
- Added `/workspace#notebook` alongside existing general drafts. Calculator action
  “Save recipe as notebook trial” captures the full v1 formulation/assay snapshot.
- Named experiments, locked saved recipes, gram-change duplication with parent
  links, actual weighed grams, preparation, specimens, curing stages, dated
  observations and structured own/literature results. No automatic validation badge.
- Parent comparison includes every recipe/target/study field difference, input
  ratios, actual quantities, preparation, curing and separately labeled results.
- Separate keys: `geopolymer.notebook.v1` and `geopolymer.notebook.draft.v1`.
  Existing calculator/session/workspace keys and v1 files remain untouched.
- Incomplete drafts recover independently from saved trials. Notebook imports make
  copies and remap relationships. Portable draft downloads include saved notebook
  context so a parent-linked unfinished trial can be restored on another browser.
- Browser storage only; no cloud durability, accounts, sync or image uploads.
  Image URLs/captions are recorded without automatically loading external images.
- PASS: 30 Node tests, 30-route production build, JS syntax and diff checks.
- PASS: local happy-dom integration of capture/save, records, variation, comparison,
  refresh recovery, portable incomplete draft restoration and copy imports. This is
  DOM behavior verification only, not browser rendering or visual QA.
- PASS: GitHub browser workflow 37873602855 on `93ae031`, including both the
  existing 30-route desktop/mobile/JS-disabled suite and the new notebook suite.
  Logs confirm capture, snapshots, actual quantities, records, variation, recovery,
  portable draft/backup imports, legacy preservation and quota failure checks.
- Browser screenshots generated in browser-qa artifact 11591396763. Download to
  this runtime returned HTTP 403, so no manual screenshot/visual review is claimed.
  Local Chromium is unavailable. Inspect the artifact before a main release.
- Connector publication uses different commit IDs than the original local branch.
  Fetch remote review branch before continuing; never force-push the local history.
- Next: inspect screenshots, then merge/release when authorized and independently
  verify Cloudflare build-info.json and changed content.
- Edit map: `src/experiment-notebook.js` (model/storage), `src/notebook-ui.js`
  (workspace UI), calculator/platform integration, schema, CSS, tests.
- Design and data notes: `EXPERIMENT_NOTEBOOK.md`. Earlier sections below describe
  the current main release and the completed supplier builder.

---

# START HERE — new-chat handoff, 8 October 2026 (Eastern)

## Resume without replaying this conversation
- Canonical repository: https://github.com/yitzhach/geopolymer, branch `main`.
- Live: https://geopolymer.bobdylan2000.workers.dev
- Workbench: /calculator#recipe-builder. Research discovery: /library.
- Read this section, README.md, DECISIONS.md, SUPPLIER_DATA.md and
  PLATFORM_ROADMAP.md from current main before editing.
- Last implementation: `734cdac0edb36daec03c4c4e82f0068b320d95bd`.
  Latest main before this documentation update: `865615dbeb4090f22e41fc2229489c6c2f9586ac`.
- Completed: public-content foundation; transparent calculator with research-linked
  notes; supplier-grade picker and gram recipe builder. Do not rebuild these phases.
- Verified implementation: 24 Node tests, 30-route build, GitHub browser workflow
  37811000782 and independent live Cloudflare HTTP/content checks. Details below.
- At this handoff, live build-info.json also confirmed documentation release
  `865615dbeb4090f22e41fc2229489c6c2f9586ac`, built 2026-10-08T16:45:54.750Z.
- No unfinished code changes at handoff. This request is documentation-only.

## Recommended next phase (not yet authorized for implementation)
Build the experiment notebook around the existing calculator:
1. Multiple named trials, each retaining an immutable formulation/assay snapshot.
2. Duplicate a trial, record the changed variable, and compare with its parent.
3. Structured curing and measured test records: value, unit, specimen, age,
   method, source and observations; separate literature results from own tests.
4. Safe export/import, draft recovery and migration that preserves existing saves.
5. Design attachment/image storage separately; do not imply accounts, sync or
   durable cloud storage until an authorized backend is implemented.
Confirm this next phase with the owner unless their new-chat request authorizes it.
Alternative priorities: manual desktop/mobile visual review of the new builder,
current lot COAs and source-reviewed executable formulations. Phosphate activation
requires a separate model and remains deferred, not a silicate substitution.

## Guardrails and edit map
- Preserve white/forest-green design, real paths, static content and accessibility.
- Preserve `geopolymer.calculator.v1`, `geopolymer.calculator.session.v1`, existing
  workspace keys and v1 JSON compatibility. New fields are optional snapshots.
- Typical supplier values, range midpoints and water/basis assumptions must stay
  visible. No default ideal targets, validated strength, safe mixing procedure,
  platform peer-review badge, qualified compatibility or stock claim is established.
- src/supplier-grades.js: seven sourced profiles; SUPPLIER_DATA.md: provenance/math.
- src/recipe-builder.js: mass-proportion and target-solving UI/model.
- src/gp-chemistry.js: oxide bookkeeping/normalization; src/gp-calculator.js: workbench.
- src/platform.js: existing local draft workspace; src/research-library.js: 39 sources.
- tests/recipe-builder.test.mjs and tests/browser-smoke.cjs cover the latest phase.
- Run npm test, npm run build, syntax/diff checks. Browser CI runs on GitHub.
  Previous managed runtime lacked supported local browser QA; do not claim visual QA.
- GitHub publication and Cloudflare verification are separate. Check /build-info.json
  and changed live content after releases. Cloudflare: npm run build, npx wrangler
  deploy; never deploy repository root with --assets .
- This session used GitHub connector commits, so local `delivered-main` commit IDs
  differ from remote despite matching content. Start a fresh checkout of current
  remote main, not a force-push of the old local branch. Never overwrite newer work.

## Suggested new-chat request
Continue yitzhach/geopolymer from current GitHub main. Read HANDOFF.md, README.md,
DECISIONS.md, SUPPLIER_DATA.md and PLATFORM_ROADMAP.md. The supplier recipe builder
is complete and deployed. Propose the smallest useful experiment-notebook phase
with multiple saved trials, one-variable duplication and structured test results;
preserve the calculator, existing saves and evidence distinctions. Confirm scope
before implementing.

---

# Supplier recipe builder — 8 October 2026
Built on verified GitHub main 56f3626. Existing GitHub/Cloudflare hosting retained.

- Seven sourced planning profiles: R-E-D Dynapoz 110 CR, ACT PowerPozz White,
  PQ N/RU/D sodium silicates, PQ KASIL 1/6 potassium silicates. Custom assays supported.
- Supplier picker also adds profiles directly to the workbench at zero mass.
- Two builder modes: entered mass proportions; explicit target solve for atomic
  Si/Al, atomic (Na+K)/Al and physical water/non-water binder mass. Total wet grams
  set batch size. Target solve adds matching NaOH/KOH feed only as calculated;
  actual hydroxide and water percentages are required. No recommended ratios assumed.
- Preview before transfer; transfer captures current ingredients as reference and
  retains notes. Catalog ID/density extend v1 JSON without changing storage keys.
- Liquid volume = grams/density, approximate and per ingredient, never summed.
  No powder-volume estimate; composition edits clear density to avoid stale volume.
- TDS values are not lot assays. Dynapoz XRF basis is unconfirmed (dry-powder
  planning assumption). PowerPozz uses labeled range midpoints. PQ historic typical
  tables use an explicitly disclosed aqueous water-balance assumption. Missing powder
  chemistry stays unknown. All copied profiles are assumption-labeled until reviewed.
- Phosphoric-acid activation is visibly deferred and rejected by the builder model.
- PASS locally: 24 tests, 30-route production build, JS syntax and whitespace checks.
- Published implementation: 734cdac0edb36daec03c4c4e82f0068b320d95bd.
- PASS: GitHub browser run 37811000782, including supplier selection, preview
  invalidation, potassium target solving, infeasible water handling, transfer,
  previous-reference retention, save/navigation persistence and zero-mass grade add.
- PASS: Cloudflare build check and seven independent live HTTP/content checks.
  build-info.json confirms 734cdac with build time 2026-10-08T16:43:38.737Z;
  calculator, both new modules, library, sitemap and real 404 verified.
- This follow-up changes documentation only. No new manual visual inspection or
  independent experimental/scientific validation is claimed.
- Source and equation details: SUPPLIER_DATA.md. No compatibility/strength/cure claim,
  automatic universal recipe, validated mixing procedure or current stock implied.

---

# Current phase — 8 October 2026
Calculator transparency and research-linked formulations implemented on verified
main 7ed8c8b. Existing Cloudflare/GitHub hosting retained; no Sites migration.

- Per-ingredient evidence category, supplier/grade, lot/date and assay-basis notes.
  Missing/assumed provenance and undocumented basis surfaced as warnings.
- Contribution audit shows individual oxide equivalents, physical water, unknown
  mass and included/excluded scope, alongside existing live ratios.
- All 39 library entries link citations to current calculator studies with explicit
  confirmation, preserving ingredients and notes. No paper recipe data is invented.
- Citation locator, adaptations, curing, results and target-definition notes save,
  reopen, export/import and survive native navigation. Evidence remains unreviewed;
  alternative activation sources explicitly remain outside model scope.
- Existing v1 files and local/session keys retained; absent new fields normalize to
  empty/unknown. New optional fields are included in v1 exports. Older site versions
  may discard new metadata if used to re-save a new export.
- PASS locally: 19 Node tests, 30-route production build, syntax and diff checks.
- Published to GitHub main: 8d8c157dc8ece86f0f3feeff81630d4a3123bcf2.
- PASS: GitHub browser run 37803313759, including desktop/mobile/JS-disabled
  foundation checks and new source-link, provenance and study-note persistence tests.
- PASS: Cloudflare Workers Builds check. Live build-info.json independently confirms
  8d8c157 with build timestamp 2026-10-08T15:45:56.005Z. Eight live HTTP checks passed:
  build record, calculator, library, connected method, chemistry JS, sitemap, robots
  and a genuine unknown-route 404. Changed content verified, not just HTTP status.
- Local browser QA was skipped under managed Sites guidance; browser suite ran in
  GitHub Actions. No new manual visual or scientific review is claimed.
- This verification follow-up changes documentation only; implementation tested and
  independently verified on Cloudflare is 8d8c157.
- Next phase: experiment notebook with multiple saved trials, structured measured
  test records, one-variable duplication and image support. Current study notes are
  not that full notebook; public executable formulations still need source extraction.

---

# Geopolymer Platform — HANDOFF
Updated: 3 October 2026 • Owner: Isaac Anderson

## Current increment
Foundation implementation based on verified main
8aec26b9dbb33cc62707f1956c6e79172f920264.
Technical brief and market strategy reviewed before implementation.

## Implemented
- 30 real path routes with complete pre-rendered public HTML. All 39 library
  references are readable without JavaScript. Existing content IDs/path names kept.
- Existing hash links redirect to same-origin paths, preserving query parameters.
  Native navigation supports refresh, browser back/forward and opening new tabs.
- Unique titles/descriptions, canonical/Open Graph/Twitter metadata, 1200×630 share
  image and scoped structured data. No invented product Offers or source authorship.
- Generated sitemap.xml, robots.txt, llms.txt, build-info.json and custom HTTP 404.
  Workspace/search noindex and excluded from sitemap. Cloudflare 404-page config.
- One compact navigation header with native disclosure, no horizontally hidden menu,
  keyboard/Escape handling and expanded state. All former routes remain accessible.
- Always-visible reveal content and correctly sized curated research-card titles.
- GP calculator chemistry, local save keys, JSON import/export, workspace drafts,
  design and evidence distinctions preserved. Calculator working state retained
  separately in sessionStorage when available during native navigation.

## Verification / publication status
- PASS: 17 Node tests, including chemistry, saved-data errors, unique metadata,
  internal links, strict unknown-route handling and 39 pre-rendered references.
- PASS: static production build (30 routes), JS syntax and git diff whitespace check.
- PASS: GitHub browser workflow 37149893229 on ec043af. All 30 routes at
  1440px/390px and with JS disabled; legacy hashes/queries, HTTP 404s, menu/skip
  keyboard behavior, reduced motion, search/scaler, calculator/workspace local
  save/reopen/download and storage failures. No JS errors.
- PASS: 37 live Cloudflare HTTP checks: all 30 routes, sitemap/robots/llms/build info,
  plus three invalid paths returning HTTP 404. Library HTML contains 39 references.
  /build-info.json independently reported 77b7173bd42c1c71d71972c96010d0ecf94ae858.
- Live cloud-browser inspection confirmed design and corrected menu keyboard focus.
- Screenshot review found the animated hero could be captured mid-entrance. Automated
  previews now skip that entrance; normal browsing retains it. The final CI run passed
  the immediate-visibility assertion and uploaded desktop/mobile screenshots.
- Local browser launch remains restricted by runtime sockets; the successful browser
  suite ran on GitHub, not locally. No external rich-results validator claimed.
- GitHub implementation release: ec043afdca75d81f290efb5e599b46772d676a83.
- Cloudflare independently served that same commit in build-info.json at 20:00 UTC
  on 3 October 2026. Live robots.txt matches generated crawl rules; /research/
  redirects to /research. Follow-up documentation commits do not change tested code.

## Deployment
Cloudflare build: npm run build. Deploy: npx wrangler deploy (never --assets .).
SITE_ORIGIN defaults to existing Cloudflare host until a custom domain is selected.
Set it in build variables after attaching the custom domain. No final brand chosen.
Verify /build-info.json commit, /library HTML, robots/sitemap and unknown-route HTTP
404 independently of GitHub main publication. No dashboard crawler policy altered.

## Scope / limits
No accounts, shared projects, public submissions/reviews, live community, checkout,
newsletter collection or stock claims. Products remain concepts. One curated
publisher-summary record; 39 discovery records are not full-paper reviews.
Local storage can be cleared. Save/export important work. Notebook import remains
unimplemented; calculator import works. Session working-copy storage is best effort.
No external rich-results-validator or assistive-technology audit claimed.

## Next
1. Keep the browser CI green and verify build-info.json after every deployment.
2. Enrich research authors, access/license, full-text and correction/retraction checks.
3. Structured ingredients/test results and reviewed unit/basis handling.
4. Accounts and durable private storage/image permissions before shared publishing.
5. Qualify maker/classroom products, shipping and supply; no sales before qualification.
6. Newsletter provider/domain decisions; moderation/editors before public review/media.

## Edit map
README.md: run/build/deploy. DECISIONS.md: scope and implementation choices.
PLATFORM_ROADMAP.md: staged production requirements.
src/routes.js: public route registry. src/app.js: shared renderPage + enhancement.
src/bootstrap.js: hash compatibility and menu. scripts/build.mjs: static HTML/SEO.
site.config.mjs: canonical origin/update date. src/platform.js: workspace/catalog.
src/gp-calculator.js + gp-chemistry.js: calculator. src/research-library.js: references.
Do not weaken evidence distinctions or replace current stable IDs when expanding.
