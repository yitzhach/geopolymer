# Geopolymer Platform — HANDOFF
Updated: 3 October 2026 • Owner: Isaac Anderson

## Goal
Global research, development, education, art and materials commerce platform.
Find studies → formulate → document trials → collaborate → source supplies.

## Now
Expanded from verified main 60d768c4b37db7a50b91fc730c113e62d20ae5c5.
Existing white/green/sage design, motion and metakaolin trail preserved.
Cloudflare Workers builds dist/. Live deployment remains unverified here.

## Done
- GP calculator: editable assays, atomic/oxide ratios, solution water, sodium/potassium
  hydroxide equivalents, scaling, reference comparisons and source-specific target gaps.
- Calculator browser save/reopen and validated JSON import/export; synthetic demo only.
- Research Library: 39 DOI-linked records, 36 from 2024–2026, searchable by title/DOI
  and filtered by year/topic/type; linked from research, navigation and global search.
- Existing material/research/method/product pages, education, artist pathway,
  unified search, arithmetic batch scaler, six unavailable product concepts.
- Research catalog search: title, author, DOI, summary; one curated source record.
- My workspace: local experiment/formulation/submission/discussion/supply/pitch drafts.
- Save, reopen and update drafts; download JSON. Storage errors retain form input.
- Supply planning for samples through bulk, with explicit unqualified availability.
- Peer-review process, community spaces and monthly magazine/podcast planned pages.
- PLATFORM_ROADMAP.md: staged production requirements and connected data records.

## Decisions
Plain JS retained. No fabricated studies, recipes, reviews, users or inventory.
Workspace stores drafts only in this browser; no server submission or sync.
Image references/captions only; image uploads are a next backend task.
Public publishing/review/forum/checkout require backend and moderation work.
Global knowledge is intended; international shipping eligibility is not established.

## Limits
Browser visual QA remains outstanding; Chromium unavailable in this environment.
No claim of tested desktop/mobile layout or accessibility.
No active accounts, public submissions, peer reviews, media issues or episodes.
Paper uses publisher summary only; complete paper and protocol not reviewed.
Local storage can be cleared; export drafts. Notebook import is not implemented; calculator JSON import is implemented.

## Next
1. Browser QA for existing and new routes, keyboard, mobile, reduced motion, storage
   failures, save/reopen/download and search. Verify Cloudflare deployment URL.
2. Enrich the 39 discovery records with authors, access/license, full-text checks and
   correction/retraction checks. Metadata discovery is not full scientific review.
3. Add structured ingredients, test results and reviewed unit/basis handling.
4. Add accounts, durable private projects and permissioned image storage.
5. Pilot moderated publication and review with real editors and reviewers.
6. Qualify stock, pack sizes, bulk quotes and destination-specific commerce.
7. Launch editorial issue/podcast after content and contributor arrangements.

## Files
HANDOFF.md → PLATFORM_ROADMAP.md → BUILD_PLAN.md.
src/platform.js — new pages, research search, local drafts and export.
src/app.js — existing pages/router plus platform integration.
src/data.js — current sourced records and proposed catalog.
src/style.css / src/motion.js / src/motion.css — appearance and motion.
DECISIONS.md — decisions; RESEARCH_STRUCTURE.md — evidence templates.
PRODUCTS.md — original catalog qualification; README.md — commands.

## Verify
Calculator fixture tests cover molar basis, hydroxide equivalents, solution water,
reference losses, target gaps, aggregate exclusion, scaling and invalid imports.
Research filters and DOI uniqueness pass. npm run build succeeds with dist/ assets.
Browser smoke routes updated for library/calculator, but execution remains blocked
by Chromium download network restrictions. Cloudflare live deployment unverified.
npm test passes existing tests plus workspace save/update/corruption/quota checks
and route template checks. JS syntax checks pass. Browser QA not completed.
Source-only incremental patch based on current main; preserve existing build/assets.

## Resume
Use current main, preserve existing work, and keep implemented functions clearly
separate from planned public services. Do not self-award peer-review status.
