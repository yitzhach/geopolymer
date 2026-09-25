# Geopolymer Platform — HANDOFF
Updated: 25 September 2026 • Favicon + navigation and interaction pass 2 • Owner: Isaac Anderson

## Goal
Global geopolymer/AAM knowledge, commerce, formulation and expertise platform.
Learn → Formulate → Buy → Test → Ask → Share.

## Now
Selected white/green/sage design implemented; education and artist pathways expanded.
Motion pass based on aa63c1c; existing content and deployment configuration preserved.
Detail pages now show reading progress and keep their related-content side panel in view on sufficiently large screens.
Owner explicitly approved publication to GitHub main after approval-review pause.
Cloudflare Workers deployment configured for dist/; live deployment not yet verified.
Temporary name: Geopolymer Platform. Production stack and hosting remain open.

## Done
- First-round motion: staged hero, zoom/parallax, reveals, drawn rules, hover polish.
- Detail-page reading progress indicator and desktop sticky related-content panels.
- Scaler A/B/C proportion bar, subtle search-result entrance and evidence-stage accents.
- Sage "G" favicon in SVG and 32 px PNG, plus a 180 px Apple touch icon;
  all three are copied into dist/ by the portable build.
- Native View Transitions with fallback; observer cleanup on each hash route.
- Compact frosted sticky header; horizontally scrollable mobile navigation.
- Inter via Google Fonts with system fallback; no frontend dependencies added.
- Classroom duplicate photo replaced by Observe / Question / Record typography.
- Reduced-motion, keyboard focus and print visibility fallbacks.
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
- Portable build; five dependency-free tests pass; built HTTP assets return 200.

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
Visual/browser QA NOT completed. Playwright is available here but Chromium is
not installed; browser smoke could not launch. Use a browser-capable environment for M5.
Do not report mobile layout, browser interactions or accessibility as verified.
A browser smoke script is included for a browser-capable environment.
Shell Git push has no credentials; use the connected GitHub plugin for publication.

## Motion roadmap (modern, calm, business-pro; no libraries; reduced-motion safe)
- M1+M2 DONE (46c1b27): hero, reveals, rules, hover, sticky header, Inter, page crossfade.
- M3 Navigation: nav underline, reading progress and sticky side panels DONE.
  Card→detail title morph remains optional pending browser QA.
- M4 Interactive: A/B/C proportion bar, search result stagger and evidence-stage
  accents DONE. Scaler count-up and sliding filter pill remain optional after QA.
- M5 QA: run browser smoke, screenshots desktop/mobile, reduced-motion, CLS check.
Avoid: scroll-jacking, horizontal scroll, custom cursor, bounce, 3D tilt, loops.
Workflow: after each phase update HANDOFF, push to main.

## Next
0. M5 QA first (verify passes 1–2), then consider optional M3/M4 refinements.
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
src/motion.js + src/motion.css — lifecycle, transitions and visual refinements.
tests/motion.test.mjs — observer cleanup, reduced motion and transition fallback.
src/scaler.js + tests/prototype.test.mjs — mass calculations and core checks.
tests/browser-smoke.cjs — 22-route desktop/mobile/search/scaler checks (not run).
src/assets/ — generated illustrative photograph and provenance/prompt.
favicon.svg, favicon-32.png, apple-touch-icon.png — platform icon assets.
PRODUCTS.md — original target catalog, economics, sourcing and qualification.
RESEARCH_STRUCTURE.md — full provenance/templates; SITE_ARCHITECTURE.md — full UX.
KICKOFF.md — owner requirements; BUSINESS.md / BRAND.md — planning context.

## Verify
Node 18+: npm test; npm run build; npm run dev (http://localhost:4173).
On this pass: 5/5 tests pass; build passes; git diff --check passes.
No npm install needed. Alternative preview: python3 -m http.server 4173.
With Playwright + Chromium and server running: node tests/browser-smoke.cjs.
Optional PLAYWRIGHT_EXECUTABLE_PATH points to an installed Chromium binary.

## Resume
Preserve implementation and business direction. Complete browser review before
calling this visually verified. Never turn proposed products into available stock.
