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

The dev command builds first and serves the same pre-rendered output as production.
Re-run the build after editing. Do not open index.html via file:// or serve the source
shell directly: public HTML is generated into dist/.

`npm test` runs chemistry, storage, template and static foundation checks (and builds).
Browser QA: install Playwright, run the dist server, then
`node tests/browser-smoke.cjs`. `BASE_URL` can target a deployed build;
`PLAYWRIGHT_EXECUTABLE_PATH` can select an existing Chromium executable.
The GitHub Actions workflow runs the same tests and saves desktop/mobile screenshots.
See HANDOFF.md for actual execution results, not just test coverage.

## Edit map

- `src/data.js` — structured content, stable IDs, relationships and search records.
- `src/schema.d.ts` — content contracts, including evidence and test entities.
- `src/app.js` — shared pure page rendering plus progressive browser interactions.
- `src/routes.js` — complete route registry; add public pages here.
- `src/bootstrap.js` — old hash redirects and accessible disclosure navigation.
- `scripts/build.mjs` — 30 pre-rendered routes, metadata, sitemap, robots and 404.
- `site.config.mjs` — canonical origin and content update date.
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

## Cloudflare Workers deployment

Connect this repository's `main` branch. Root directory: repository root.
Build command: `npm run build`. Deploy command: `npx wrangler deploy`.
Do not use `--assets .`: that uploads the repository and installed dependencies.
`wrangler.jsonc` restricts published assets to `dist/` and builds before deployment.
The configured Worker name is `geopolymer`; match the Cloudflare project name.

## Foundation routing and metadata

Native path navigation serves complete HTML before JavaScript. Old `/#/…` links
use an origin-restricted redirect preserving query parameters. URL names and stable
content IDs remain unchanged; proposed /methods and /studio renames are deferred.
All 39 research references are present in static HTML. Filtering, calculators and
workspace drafts remain client-side. Local save keys and JSON formats are unchanged;
the calculator also keeps a best-effort working copy in sessionStorage for navigation.

Cloudflare assets use `not_found_handling: 404-page` and
`html_handling: drop-trailing-slash`. Unknown routes return the custom 404 with HTTP
404, not a home-page fallback. Native links support reload, back/forward and new tabs.

Set `SITE_ORIGIN` in build environment variables when a custom domain is attached.
Until then the existing Cloudflare origin is the canonical; no new brand/domain is
chosen. Update `contentUpdated` when public content changes. The build generates
unique metadata, Open Graph/Twitter cards, structured data, sitemap.xml, robots.txt,
llms.txt and build-info.json. Workspace/search are noindex and omitted from sitemap.
Product schema has no Offer; source articles are cited without claiming authorship
or platform review. Product concepts are not eligible for merchant rich results.

GitHub publication and Cloudflare delivery are separate. Verify build-info.json's
commit against GitHub main and check real path responses and the HTTP 404 before
calling a release deployed. Custom domain, crawler dashboard policy, newsletter and
commerce setup remain owner/backend work outside this foundation change.
