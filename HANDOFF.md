# Geopolymer — current handoff

Short current-state file. Dated release logs through 22 October 2026 are archived verbatim in
`research/handoffs/history-2026-10-16-to-10-22.md` (and `history-through-2026-10-16.md`); read
them only when you need the evidence behind a specific earlier batch.

## Read order

- **Mix-sheet work** (typing reviewed notes into the mix table): this file, then
  `.claude/skills/mix-sheet/SKILL.md` and `MIX_SHEET_STANDARD.md`. Nothing else is required.
- **Anything else**: this file, `AGENTS.md`, `SUBAGENT_POLICY.md`, then
  `KNOWLEDGE_ENGINE_MASTER_PROMPT.md` for research and `SUMMARY_DEEP_DIVE_STANDARD.md` before
  touching summaries or deep dives.

## Current state — 24 October 2026

- Library 1,000 publications · 361 detailed summaries · 362 deep-dive guides (every guide and
  summary exposes `mix-data-v1`). Formulation catalog 49 conditions / 37 proportional scalers.
  Canonical knowledge pilot 5 partial studies / 62 mixes / 275 observations. All unchanged here.
- Guide mix readiness: 8 with complete weights, 111 partial, 236 without an extracted mix,
  1 correction hold, 6 without an independent experiment. No guide has a complete protocol.
- Verified 22 October 2026: live site `build-info.json` reported main `a6348a2`, and GitHub CI
  (Foundation verification) passed on that commit.
- Published to main on 23 October 2026 at the owner's request: the mix table, `/mixes` Mix
  Explorer, mix-sheet standard/skill/queue and nine pilot sheets (branch `claude/mix-table-pilot`
  merged). Verified 24 October 2026: live `build-info.json` reports `99d7468` (= main then).

## Mix table

- One row per mix, compiled at build time by `scripts/lib/mix-sheets.mjs` → `src/mix-table.js`
  from the knowledge pilot, the formulation catalog and `research/mix-sheets/*.json`. Output:
  `dist/mixes.json` and `/mixes`. Pilot rows absorb matching catalog recipes (6 merged).
- Counts: **143 rows from 37 papers; 101 with numeric results; 38 rows from 17 mix sheets**
  (`npm run mixes -- stats`).
- Sheets so far (review-note mode): one-part-admixture-compatibility, rap-geopolymer-grout-
  versus-composite, fly-ash-slag-efflorescence-moisture (worked examples), hpmc-vae-
  workability-durability, starch-borax-retarder-screening, one-part-waste-sand-water-demand,
  metakaolin-slag-shrinkage-controls, fa-ggbs-acid-strength-compromise, tailings-gangue-slag-rsm;
  added 24 Oct: ambient-fly-ash-superplasticizer, superplasticizer-flow-air-long-term,
  biomass-onepart-boiler-tradeoff, road-composite-gangue-fiber-nanosilica; tandem lane A (PR #25):
  metakaolin-water-temperature, metakaolin-freeze-thaw-design, coating-wetting-versus-bond,
  phosphate-polymer-rheology.
- The fly-ash/slag pilot queue is finished (13 done, 11 skipped with reasons) and archived as
  `research/mix-sheets/_QUEUE-fly-ash-slag-pilot.json`. New queue `QUEUE.json`
  ("partial-designs-round-2"): the 99 remaining partial-design guides that are not sheeted,
  skipped or already structured; 10 worked by PR #25 (4 sheets, 6 skips).
  `npm run mixes -- queue --next 5`.
- Template test: drafts by a smaller, lower-cost model (two rounds) passed the checker with no
  invented values; its feedback produced skill v1.1. All committed sheets were reviewed by the
  primary agent before import. Review-note mode yields mostly compositions: the notes rarely
  name mixes or give numbers. Numeric density now depends on source-text mode (below).
- Evidence labels: pilot/catalog rows "Source-checked by AI"; sheet rows "From review note —
  not yet re-checked against the paper". Sheet values never enter `/knowledge` exact search.

## Tandem lanes

`TANDEM_TASKS.md` defines four lanes a lower-cost agent can run in parallel, each on its own
`tandem/*` branch ending in a pull request: (A) mix sheets from the new queue, (B) new paper
candidates → `research/tandem/candidates/`, (C) mix-table locators for skipped guides →
`research/tandem/locators/`, (D) DOI link health → `research/tandem/link-checks/`. Review and
merge their PRs; lanes B–D are leads, not site data.

- 24 Oct review: merged #25 (lane A; review fix: freeze-thaw cure duration 28 d, not the 2 d
  demold age), #26, #28, #29 (lane B: 7 ambient fly-ash/slag + 12 metakaolin candidates in
  `research/tandem/candidates/`). #26 and the #29 entry are search-snippet leads only: titles,
  licences and two MDPI DOIs (derived from article URLs) are unresolved — resolve before any
  enters the library. Closed #27 (lane C): every attempt failed.
- **Network blocker:** this cloud environment's policy denies `doi.org`, `mdpi.com`,
  `api.crossref.org`, PMC and DOAJ (CONNECT 403). Lanes C/D and source-text mode cannot run until
  the owner allows those hosts (environment settings → Network access).

## Site speed (24 Oct)

- `src/bootstrap.js` now loads `src/enhance.js`, which imports only the modules a page's tools
  need. `src/app.js` is the build-time renderer (plus `/tools`, `/search`, `/shop` tools). The
  research assistant loads the catalog on the first question. The 404 page carries
  `<meta name="gp-page" content="not-found">`.
- Measured locally (uncompressed, all requests): home 6.75 → 0.41 MB, `/learn` 6.49 → 0.14 MB,
  `/mixes` 7.49 → 1.15 MB, `/deep-dives` → 2.8 MB. Still heavy: `/library` (3.5 MB HTML of
  1,000 cards plus its data, ~9 MB) and `/knowledge`, `/calculator`, `/search` (~6 MB; they
  need the catalog).

## Standing rules (carried forward)

- Never fabricate masses, results or complete-protocol status; unknowns stay unknown with a
  reason. AI source review is not human/domain review. No unsupported numeric transfer.
- Preserve publication identities, stable IDs, canonical pilot data, catalog records, frozen
  editorial records, calculator/notebook storage keys and import/export formats.
- Source access: at most 5 papers and 40 operations per batch; record actual queries, locators,
  failed access and deferrals in `research/batches/`; no paywall/challenge bypass or retry
  loops; retain no raw papers, abstracts or complete tables/figures without rights.
- Known holds stay visible: MgO erratum (10.3390/ma12030526) excluded from assistant evidence;
  carbonation corrigendum (conbuildmat.2023.133403); unconfirmed secondary withdrawal label
  (cemconcomp.2024.105811) held from assistant evidence; unresolved fire-coating findings.
- OpenAlex stays on hold until the owner authorizes it. The daily research-draft automation
  (draft PR #5, branch `research/daily-2026-10-11`) is unchanged; don't add or modify schedules.
- Publication: earlier checkpoints record the owner's standing authorization to publish
  completed, tested work to main. GitHub publication and Cloudflare delivery are separate; verify
  `build-info.json` against main before calling a release deployed.
- No model names in repository files, commits or PR text.

## Open owner decisions

1. Source-text mode pilot: allow a stronger model to read papers' mix tables for queued and
   skipped guides (bounded batches, audit files) so rows gain labels and numbers?
2. Pause further 50-guide batches in favour of mix extraction?
3. Lift the OpenAlex hold (balanced coverage, citation counts)?
4. Open PRs #23 (rights-guard skill, since 19 Oct) and #5 (daily drafts): merge or close?

## Next work

1. Start tandem lane A (and B–D if wanted) from `TANDEM_TASKS.md`; review their PRs.
2. Source-text mode pilot on 5 skipped fly-ash/slag guides (labels + tables), with a second
   reviewer checking every value; extend the skill once the pilot proves the procedure.
3. Explorer: more axes (activator/precursor, curing hours), CSV export, saved comparisons.
4. Site speed: paginate or lazy-render the 1,000-card `/library` page; split `data.js` so
   `/tools` and `/shop` stop importing the full catalog.

## Checks

`npm test` (Node suite incl. `tests/mix-table.test.mjs`), `npm run build`, `npm run mixes --
check`, then browser suites with the dist server (`node scripts/serve.mjs --dist`), including
`node tests/mix-explorer-browser.cjs`. CI runs the same list from `.github/workflows/verify.yml`.

## Starting the next chat

Paste one of these as the first message of a new session on this repository.

- **Cheap tandem round** (choose a smaller model): use a kickoff prompt from `TANDEM_TASKS.md`.
- **Next development round** (choose the strongest model): *"Continue yitzhach/geopolymer from
  main. Read HANDOFF.md and follow AGENTS.md. Goal: make the Mix Explorer numerically useful.
  (1) Pilot source-text mode on 5 skipped fly-ash/slag guides from research/mix-sheets/QUEUE.json:
  open each paper's mix table within the source-access rules, write sheets with labels, amounts
  and results plus an audit in research/batches/, and have a second reviewer check every value
  against its locator. (2) Extend MIX_SHEET_STANDARD.md and the mix-sheet skill with what the
  pilot proves. (3) If time allows, add CSV export and saved comparisons to /mixes. Run all
  checks, update HANDOFF.md, and publish to main under the standing authorization."*
