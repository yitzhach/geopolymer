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
- Owner explicitly approved publication on 8 October 2026. GitHub upload and
  deployment verification in progress.
- Browser CI and live Cloudflare verification: pending for this increment. Historical
  verification below concerns the previous foundation release only. Local browser QA
  skipped under managed Sites guidance: control-browser capability is unavailable.
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
