# Geopolymer Platform — Decisions

Version 0.2 • 24 September 2026 • First prototype.

VERIFIED = sourced fact; ASSUMPTION = unvalidated input; RECOMMENDATION = proposal. See DECISIONS.md for approval status.

## 10. Decision log and next actions

| ID | Status | Item |
|---|---|---|
| D01 | Owner baseline | Integrated knowledge, commerce, tools and expertise; community later |
| D02 | Owner baseline | Phase 2 before code; scientific provenance required |
| D03 | Owner baseline | Public MVP counts retained above |
| P01 | Proposed | AlkaliLab or Geopolymer Works naming shortlist, subject to clearance |
| P02 | Proposed | Global content; US physical fulfillment initially |
| P03 | Proposed | Common metakaolin system across first three kits and refill |
| P04 | Proposed | Small private pilot before public MVP |

Planning backlog: owner naming preference and launch-geography decision; live domain/brand clearance for finalists; supplier quote matrix and kit costing; product qualification/safety review; page wireframes and content schema; Phase 3 specification. Do not reopen baseline decisions as if unknown. All proposed prices, margins and supplier relationships remain unconfirmed.


## 24 September 2026 — repository handoff

Owner instructed publication to https://github.com/yitzhach/geopolymer and moving toward building. GitHub becomes the canonical working copy. This does not approve a final brand, pricing, suppliers or production commerce. Start with the reviewable prototype described in BUILD_PLAN.md.

## 24 September 2026 — first prototype

| ID | Status | Decision / reason |
|---|---|---|
| D04 | Owner instruction | Begin the website prototype now; supersedes earlier no-code sequencing. Preserve the business baseline and public MVP scope. |
| D05 | Owner instruction | Use “Geopolymer Platform” temporarily. Final branding, suppliers, prices, shipping, stack and hosting remain open. |
| I01 | Reversible prototype choice | Native ES modules, semantic HTML and CSS; dependency-free Node dev/build/test scripts. Portable static output and hash routing avoid hosting-specific configuration. This does not select the production stack. |
| I02 | Reversible prototype choice | Structured content with stable IDs and TypeScript declaration contracts; separate families, named literature grades, proposed grades, papers, methods, products and test records. No platform tests are claimed. |
| I03 | Editorial boundary | One publisher-summary source record for Technical Paper #26. Full paper not reviewed; method detail is incomplete and not an executable recipe. Research-linked products are conceptually related, not compatibility-validated. |
| I04 | Tool scope | Batch scaler uses neutral 600/300/100 g components to demonstrate as-supplied mass scaling. It does not calculate oxide ratios, solution solids, cure or scale-dependent performance. |
| I05 | Catalog boundary | Four concepts: starter, classroom, casting and metakaolin sample. Existing target prices retained; raw sample sizes proposed at 1/5 lb with exact metric equivalents. Kit chemical masses remain undecided pending qualification. No checkout, reservations or stock claims. |
| I06 | Delivery scope | Keep source in the existing GitHub repository. No hosting setup or deployment is selected in this prototype task. |

Brand tokens and templates can be replaced without changing content IDs. The Sites
workflow was considered but not adopted: this is an existing GitHub project and the
owner explicitly leaves hosting unsettled.

## 24 September 2026 — selected visual direction and audience expansion

- Owner selected the white/forest-green homepage with large material imagery and
  inset sage classroom feature (reference: 3a76b268-925e-457b-8415-d4b0d861dc43.png).
- Education is a primary navigation destination, with observation, source-reading
  and mass-arithmetic activities plus a 30–45 minute non-mixing lesson outline.
- Artists & Artisans is a dedicated page and store collection: casting, texture/relief
  and color/aggregate studies. Two additional kits are proposals, with no price set.
- Existing catalog price targets remain unchanged. No stock or checkout introduced.
- Generated material photography is illustrative, not a tested product photograph.
- Existing portable implementation and GitHub delivery retained; hosting stays open.

## 24 September 2026 — Cloudflare deployment fix

Owner chose Cloudflare Workers. Build logs showed the repository root being used
as assets, including a 127 MiB node_modules binary. Wrangler now builds and serves
only dist/. Dashboard deploy command must be npx wrangler deploy, without --assets .
Live deployment verification remains pending.


## 3 October 2026 — connected platform expansion
Owner requested a global research/development, education, artist and supply platform,
including user studies, peer review, forums, images/recipes, monthly magazine and podcast.
Implemented a searchable existing catalog and browser-local draft workspace with export.
Supply quantities, review, community and editorial destinations explain their actual
status. No shared storage, public submission, reviewer activity or available stock is
claimed. PLATFORM_ROADMAP.md specifies staged implementation and production acceptance.

## 3 October 2026 — calculator and research library
Use assay-based oxide accounting with explicit as-supplied composition. Keep atomic
and oxide ratios distinct, physical water separate from hydroxide-equivalent water,
and activator-only modulus separate from binder totals. Unknown percentages are not
inferred as water. Target gaps report elemental moles at fixed denominator, never
recipe doses or predicted performance. Demo is synthetic; blank templates cover
alkaline MK, slag blends, ash and custom assays. Other activation systems need models.
The library has 39 sourced metadata records including 36 dated 2024–2026. Publisher
links and publication type are provided; full-paper review remains pending. Journal
publication status must never imply platform peer review.

## 3 October 2026 — public-content foundation

- Reviewed the technical brief and market strategy. Keep the white/green design,
  maker/classroom pathways and scientific evidence distinctions; this phase does not
  introduce new markets, stock, newsletter collection, accounts or services.
- Retain native ES modules. Share the existing pure templates between static build
  and browser enhancement instead of migrating frameworks. Public routes are built
  into complete HTML; ordinary document navigation gives reliable reload/history,
  keyboard behavior, per-page metadata and genuine HTTP 404 responses.
- Preserve existing path names and stable IDs. Convert hash paths without renaming
  /artists, /formulations or /tools. The brief's URL renames were proposals, not a
  prerequisite. Preserve /discover as the curated subset and /library as discovery
  metadata; do not silently merge their different evidence scopes.
- Canonical origin is one configurable value (SITE_ORIGIN); temporarily use the
  current Cloudflare origin until an owner-selected custom domain is connected.
- Generate metadata and crawl files. No Offer or external-paper citation_* tags.
  A source ScholarlyArticle is the subject/citation of our summary, not a claim that
  the platform published or peer-reviewed the original. Product schema deliberately
  lacks merchant eligibility rather than fabricating availability/reviews/pricing.
- Consolidate navigation into five primary categories and one accessible native
  disclosure with all sections/utilities; it works without JS, exposes expanded
  state, closes on Escape and restores toggle focus. Do not trap focus in a nonmodal
  menu. Every former destination remains reachable within two actions.
- Reveal styling never sets content opacity to zero. Retain hero and hover motion
  with reduced-motion support. Fix curated research-card heading link sizing.
- Keep saved workspace/calculator keys and export formats unchanged. Use a separate
  best-effort sessionStorage calculator working copy for native route navigation;
  explicit saved local projects are never overwritten by the session copy.
- Local static tests/build passed. Browser execution is restricted in this runtime;
  a GitHub Actions browser gate is added. Publication/deployment/QA outcomes are
  tracked independently in HANDOFF.md and must not be inferred from a git push.

Browser QA follow-up: the first CI run caught a focusout timing race in menu keyboard
navigation after passing the desktop/mobile route sweep. Use FocusEvent.relatedTarget
instead of reading transient document.activeElement during focus transfer.
