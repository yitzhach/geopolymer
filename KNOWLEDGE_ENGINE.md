# Knowledge engine Phase A implementation

## Audit and architecture

Started from main `a1dd73c`. Recount: 61 library publications, 15 curated literature
formulations. No AGENTS.md found in this checkout. The existing native JS/static
build, IDs, /discover distinction, calculator arithmetic, notebook and assistant
storage formats are retained. Twenty-five Crossref-verified DOI records extend
the same library to 86. Existing recipe URLs are linked by DOI, not duplicated.

`src/knowledge-references.js` is the canonical pilot bibliography;
`src/knowledge-pilot.js` is the canonical licensed extraction. `knowledge-core.js`
provides a catalog adapter, validator, same-mix search, rights-filtered exports,
metadata batch reconciliation and dependency lookup. `/studies/:id` has 25 static
pages (five with experimental records). `/knowledge` provides exact/phrase and
synonym search, facets, numerical conditions, pagination, shareable queries and
side-by-side study conditions. Save study/observation loads the existing assistant
thread; the user explicitly saves it to a local research folder.

The assistant remains deterministic catalog mode. Deep-dive requests show up to
10 catalog links instead of four; structured evidence is available through the
paginated search. No LLM, live web research, paid ingestion, vector service or D1
was configured. No schedules were added or changed, so automation inspection was
not triggered by a proposed schedule change.

## Pilot extraction and limits

Five authorized CC BY 4.0 full texts: Zhan (10.3390/ma15082944),
fly-ash/slag Na/K comparison (10.3390/ma15010211), Vogt (10.3390/ma14185396), Bong (10.3390/ma12060902), and
the orthogonal-test paper (10.3390/ma15082957). Bibliographic records, not this
shorthand, are authoritative for authorship.

- 62 mix variants: 6 + 6 + 4 + 12 + 34, representing five study datasets,
  not 62 independent replications.
- 275 result cells: 260 exact numeric, three below-detection nulls and twelve
  provisional Figure 9 shape-retention graph estimates. Exact search excludes
  graph estimates. Source checks are AI-assisted, not human/domain review.
- 27 source tables transcribed, 53 figures inventoried; five figures now have
  their printed numeric labels extracted (uncertainty remains incomplete).
  12 unfavorable/null/mixed findings, 18 research material identities.
- Table 3/4 orthogonal strength data include every mix and both properties/ages.
  Potassium-hydroxide + sodium-silicate mixes are `mixed-na-k`.
- Acid erosion records separate initial 28-day cure, exposure and total test age.
  Unknown detection thresholds, uncertainty and replicate counts stay unknown.
- Source discrepancies are exposed on study pages. No normalization repairs the
  211 paper's slag fraction wording or 2944 paper's conflicting humidity and
  relative-percentage statements.

**All five extractions remain `partial`.** The full source inventory is preserved;
figure-only series and some specialized analytical results remain pending. Do not
call five papers fully extracted or Phase A's complete acceptance gate passed.
The breadth quota is met; complete experimental extraction remains a resumable
follow-up. No substantive encyclopedia topics or current supplier offerings were
created. No new automatic calculator transfers: sources with complete curated
recipes link to the existing preview/scaling flow; others link a citation only.

## Rights policy gp-rights-1

Bibliographic facts were retrieved through exact Crossref DOI lookups. API docs
checked 12 October 2026: https://www.crossref.org/documentation/retrieve-metadata/rest-api/.
Only whitelisted bibliographic fields were retained; abstracts were discarded.
This is not a remote harvesting service. The importer operates offline and does
not assume provider quotas or licenses for full text.

Each of the five article assets has its own retrieved PMC URL, version, SHA-256,
CC BY 4.0 rights-evidence URL, date and separate operation decisions. Structured
adaptations and table transcriptions credit actual article authors, title, DOI,
license and modifications. No article PDFs/full text or third-party graphics are
in Git. Supplements require a separate rights decision. External AI transmission
and embedding are denied by platform configuration, not by a claimed CC BY ban.
The remaining twenty new references are metadata-only; full-text operations are
unassessed and no full text is stored. Legacy access labels are preserved, not
retroactively upgraded.

`publicKnowledge()` is an allowlisted export/model-context boundary. Denied or
unknown operations and withdrawn/update-pending sources are excluded. Build
refuses any private/unassessed extraction asset in public `src/`; that directory
is copied to the public site. Private future ingestion assets MUST stay outside
`src/`, dist, Git and CI artifacts. No promise of legal clearance is made by a
schema label. Crossref status checks describe deposited update fields only, not
an exhaustive correction/retraction clearance.

## Import and review workflow

1. Collect at most 25 metadata candidates; preserve exact queries, access dates,
   provider and inclusion/exclusion rationale in a batch manifest.
2. Feed a JSON metadata array to:
   `node scripts/import-research.mjs input.json checkpoint.json`.
3. Re-run against the same input to resume. Input SHA-256 prevents resuming a
   changed input. Writes replace one checkpoint atomically. Each invocation
   processes at most 25 records, 1,000 input records and 5 MB; no network calls.
4. Reconciliation normalizes DOI case/URLs, preserves existing IDs, and routes
   duplicate DOI/different ID or title/ID conflicts to review. It does not merge
   publication versions or fuzzy matches automatically. Seed checkpoint records
   with the catalog when reviewing an additional batch. No direct public mutation.
5. Review accepted records, rights and versions before updating canonical modules.
   Run `npm run validate:knowledge`, `npm test`, `npm run build`, browser QA.
6. A correction can be marked in `sourceStatus`; search/export suppress dependent
   evidence and `affectedEvidence` lists affected mixes, observations and findings.
   Rebuild the static site and review dependencies; no background invalidation
   service or scheduled retraction watcher exists.

The runtime validator and `research/schema/knowledge-v1.d.ts` describe v1.
Original cell strings are retained. Public numerical filters accept only exact,
source-checked, noncensored values; no units are silently converted. Metadata-only
records never supply numerical observations. Reuse/migration to D1 can implement
this pure adapter boundary without changing IDs.

## Verification and next checkpoint

`research/batches/phase-a-source-audit.json`: every observation ID and stratified
second pass including extremes, failures, both main strength tables, unknowns,
age conversion and source conflicts. This is same-agent AI checking plus software,
not an independent researcher or human review.

`tests/knowledge.test.mjs` and `tests/knowledge-audit.test.mjs`: 12 gold/adversarial tests; actual source numbers plus
explicitly synthetic cross-mix/retraction/rights mutations. Some benchmark cases
(coffee char, substrate adhesion, Dynapoz equivalence) deliberately abstain because
the pilot has no sufficient data. Passing abstentions is not domain coverage.

`research/batches/phase-a-scale-benchmark.jsonl`: clearly synthetic 500/1,000
metadata fixtures, generated in memory only, p95 search latency and serialized
payload. This tests metadata search/import scale, not 1,000 extracted papers.
Build-size and actual browser results are recorded in HANDOFF.md.

Next: resolve source issues, obtain reusable numerical source data or perform
calibrated/reviewed figure digitization; keep provisional points out of exact
filters. Normalize analytical tables into typed assay/result entities as needed.
Then a new <=25-reference batch should deliberately broaden to coffee char/ash,
coating/substrate adhesion, failed setting, non-MDPI sources and US sourcing.

## 12 October follow-up: missing experiments and figure labels

The first pilot missed two validation schemes outside the orthogonal array.
They now have distinct platform labels, two new mixes and four narrative strength
values. Validation n remains unknown; they are not additional factorial runs.
Sixty-nine additional exact values came from printed chart labels: 23 new
MK/slag compression cells (one duplicate already existed), 22 directional/3-day
printing strength cells and 24 before/after flow-table spread cells. Fresh spread
age remains null; it is not a day-zero cured result. All 73 additions received
same-agent source rechecks. See phase-a-followup-source-audit.json.

The 216 sums/means/ranges in ma15082957 were recalculated from its 32 original
mixes: 18 disagree beyond rounding tolerance. Preserve the primary observations
and original summary cells; no inferred repair or optimized recommendation.
Reproduce with `node scripts/audit-factor-summaries.mjs`; the versioned report
links every calculation to its observation inputs. Figure 3 also mislabels the
K-series silicate; methods define sodium silicate and mixed Na/K remains correct.

All five method sections were reread and extended. The acid-test initial cure is
now explicitly 28 days; shared-tank leachate cannot be assigned to a single mix.
Omitted 14-day EDX profiles/error bars require underlying data, not digitization.

The five experimental PMC records were checked for publication notices. No
notice was found in those retrieved copies. Publisher requests were rate-limited
and PubMed returned browser challenges; these are unresolved checks, not negative
results. See phase-a-status-followup.json and the study-page check scope. The
other twenty additions still have only the prior Crossref check. Full extraction
acceptance remains incomplete; no release or human review is implied.

## Calibrated graph batch, 12 October 2026

Figure 9 of ma12060902 supplies twelve provisional means. `digitization` stores
source-image URL/hash, image dimensions, linear axis points, marker coordinates,
rounding, reading allowance and a separate same-agent visual second check.
`knowledge-digitization.js` validates calibration and reproducibility. The ±0.003
reading allowance covers pixel placement and rounding, not experimental SD/SE/CI.
Experimental SD is still null, with a missing reason. Exports and saved excerpts
retain the estimate label. Numerical search continues to exclude estimates.
`phase-a-graph-audit.json` records method, interior tick checks and all 12 checks.
This does not complete the five full-paper inventories.

## Individual MIP specimens, 13 October 2026

Eight Table 7 values in ma15010211 retain four original `specimenId` labels under
two existing formulations. Each cell is one individual reading, not a two-specimen
mean. MIP porosity (%) and critical pore diameter (nm) have separate properties
and tests; preconditioning, sample dimensions and repeat-reading uncertainty are
unknown. Figure 1–2 marker/line statistics remain ambiguous, so those graph
means are held out pending underlying values or clarification.
