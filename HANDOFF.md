# Geopolymer Platform — HANDOFF
Updated: 24 September 2026 • First website prototype • Owner: Isaac Anderson

## Goal
Global geopolymer/AAM knowledge, commerce, formulation and expertise platform.
Learn → Formulate → Buy → Test → Ask → Share.

## Now
Selected white/green/sage design implemented; education and artist pathways expanded.
Main verified at 1f9fdf0 before this change; existing implementation preserved.
Owner explicitly approved publication to GitHub main after approval-review pause.
Cloudflare Workers deployment configured for dist/; live deployment not yet verified.
Temporary name: Geopolymer Platform. Production stack and hosting remain open.

## Done
- Photo-led homepage with sage classroom feature matching owner-selected direction.
- Education hub: observation, research and arithmetic activities; short lesson outline.
- Artists & Artisans page plus filtered store collection and two new study kits.
- Six product concepts total; new texture/color kit prices remain undecided.
- Homepage; material, research, formulation and product indexes/details.
- Connected journey: metakaolin → Technical Paper #26 → method → kit concept.
- Beginner and educator entry points; evidence standards page.
- Cross-content search with content-type filters and empty states.
- Batch mass scaler: g/kg, as-supplied basis, positive finite input validation.
- Separate stable IDs for materials, grades, papers, methods and products.
- Type contracts include test records; no platform results are claimed.
- Proposed starter/classroom/casting kits and metakaolin sample; no checkout.
- Portable build; four dependency-free tests pass; built HTTP assets return 200.

## Decisions
Owner authorized coding now, superseding the earlier no-code planning sequence.
Native JS modules + HTML/CSS are a reversible prototype implementation only.
Brand tokens and structured data are separate. No production provider chosen.
Paper record uses publisher summary only; complete method extraction is pending.
Scaler uses neutral A/B/C components, not invented chemical recipe quantities.
Existing price targets remain proposals. Kit chemical masses remain unqualified.

## Limits / dead ends
No supplier quotes, safety validation, inventory, expert roster or checkout.
No name/domain clearance or launch-geography decision.
No independently tested or internally reproduced methods.
Visual/browser QA NOT completed. Current Chromium installation download failed;
prior session also encountered browser socket restrictions.
Do not report mobile layout, browser interactions or accessibility as verified.
A browser smoke script is included for a browser-capable environment.
Shell Git push has no credentials; use the connected GitHub plugin for publication.

## Next
1. Run browser smoke + visual review on desktop/mobile and at 200% text size.
2. Review the prototype with Isaac; refine navigation, density and content templates.
3. Retry Cloudflare deploy using npx wrangler deploy; verify the resulting live URL.
4. Review full paper; extract exact recipe/basis/grades and complete editorial fields.
5. Qualify kit masses/equipment, supplier grades, documentation and shipping.
6. Decide final branding, commerce architecture and pilot scope.
The full public MVP counts in KICKOFF.md are unchanged.

## Files / read map
Read HANDOFF.md → BUILD_PLAN.md first; load only relevant files after that.
README.md — run/build instructions, implementation map and content boundaries.
DECISIONS.md — baseline vs proposals and reversible implementation choices.
src/data.js + src/schema.d.ts — entities, relationships, source and search data.
src/app.js + src/style.css — page templates, interactions and visual tokens.
src/scaler.js + tests/prototype.test.mjs — mass calculations and core checks.
tests/browser-smoke.cjs — 22-route desktop/mobile/search/scaler checks (not run).
src/assets/ — generated illustrative photograph and provenance/prompt.
PRODUCTS.md — original target catalog, economics, sourcing and qualification.
RESEARCH_STRUCTURE.md — full provenance/templates; SITE_ARCHITECTURE.md — full UX.
KICKOFF.md — owner requirements; BUSINESS.md / BRAND.md — planning context.

## Verify
Node 18+: npm test; npm run build; npm run dev (http://localhost:4173).
No npm install needed. Alternative preview: python3 -m http.server 4173.
With Playwright + Chromium and server running: node tests/browser-smoke.cjs.
Optional PLAYWRIGHT_EXECUTABLE_PATH points to an installed Chromium binary.

## Resume
Preserve implementation and business direction. Complete browser review before
calling this visually verified. Never turn proposed products into available stock.
