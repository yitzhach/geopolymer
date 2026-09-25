# Geopolymer Platform — HANDOFF
Updated: 25 September 2026 • Owner: Isaac Anderson

## Goal
Global geopolymer/AAM knowledge, commerce, formulation and expertise platform.
Learn → Formulate → Buy → Test → Ask → Share.

## Now
White/green/sage responsive prototype with education and artist pathways.
Main includes navigation and interaction motion, favicon, and a four-step
metakaolin trail: material → publisher summary → method record → proposed kit.
Cloudflare Workers config builds dist/; live deployment is not verified.
Temporary name: Geopolymer Platform. Production stack and hosting remain open.

## Done
- Homepage, material/research/formulation/product indexes and detail views;
  beginner and educator entry points, artist page and filtered concepts.
- Six product concepts, all clearly unavailable; no checkout or inventory.
- Metakaolin trail on its four detail pages; current step marked for assistive
  technology. The trail explicitly says research does not qualify the kit.
- Stable IDs, evidence labels, publisher-summary provenance and search filters.
- Neutral A/B/C mass scaler with g/kg conversion, validation and proportion bar.
- Hero entrance, scroll reveals, native View Transitions with fallback, compact
  header, detail reading progress, desktop sticky side panel, subtle hover and
  search motion; reduced-motion and keyboard fallbacks.
- Sage G icon: favicon.svg, favicon-32.png and apple-touch-icon.png; build copies
  all three into dist/.
- Five dependency-free tests and portable static build pass.

## Decisions
Owner authorized coding and GitHub main publication. Plain JS modules and
HTML/CSS remain a reversible prototype; no frontend dependency was added.
The paper record uses publisher summary only; full paper is not reviewed.
No executable chemical recipe or platform test result is claimed.
Scaler uses neutral components, not a chemical recipe. Prices are targets;
kit chemical masses, grades and sourcing remain unqualified.

## Limits / dead ends
Browser visual QA is NOT complete. Playwright is present, but Chromium is not;
its download repeatedly failed with a truncated ZIP in this environment.
Do not report desktop/mobile layout, interactions or accessibility as verified.
No supplier quotes, safety validation, expert roster, checkout, name/domain
clearance, or launch geography decision. Shell Git push has no credentials;
use connected GitHub tools. Do not force-update main.

## Next
1. In a browser-capable environment run tests/browser-smoke.cjs and review
   desktop, iPhone widths, 200% text, keyboard, reduced motion and layout shifts.
2. Fix observed QA issues. Ask Isaac to inspect the four-step metakaolin trail
   and product detail density before expanding it to other materials.
3. Verify Cloudflare deployment and live URL after main builds.
4. Review the full source paper; record exact recipe basis, grades, method and
   provenance only after editorial review. Keep source and platform tests separate.
5. Qualify kit masses/equipment, supplier grades, documentation and shipping;
   then decide branding, commerce architecture and pilot scope.
6. Optional motion later: card/title morph, scaler count-up, sliding filter pill.
   Avoid scroll-jacking, looping effects, bounce, 3D tilt and custom cursors.
The full public MVP counts in KICKOFF.md are unchanged.

## Files
Read HANDOFF.md → BUILD_PLAN.md first. README.md has run commands; DECISIONS.md
separates baseline and proposals. src/data.js and src/schema.d.ts own entities;
src/app.js and src/style.css own pages; src/motion.js and src/motion.css own motion.
tests/prototype.test.mjs, tests/motion.test.mjs and tests/browser-smoke.cjs
cover logic and browser checks. PRODUCTS.md and RESEARCH_STRUCTURE.md own
catalog/research detail; SITE_ARCHITECTURE.md, KICKOFF.md, BUSINESS.md and
BRAND.md cover broader scope. src/assets/ contains illustrative photo/provenance.

## Verify
Node 18+: npm test; npm run build; npm run dev (http://localhost:4173).
Five tests and build passed; git diff --check passed. Browser smoke not run.
With Chromium available and server running: node tests/browser-smoke.cjs.
Optional PLAYWRIGHT_EXECUTABLE_PATH selects a Chromium binary.

## Resume
Preserve the existing work and business direction. Verify in a browser before
calling it visually reviewed. Never turn concepts into available stock.
