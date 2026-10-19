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

## 13 October breadth batch and scoped pilot backlog

Owner requested parallel bibliography expansion while retaining the pilot limits.
The canonical bibliography now has 50 additions to the unchanged 61-record legacy
catalog: **111 unique publications**. New batch: 25 metadata-only records; nine
coffee-material references (including one explicitly adjacent Portland-cement
biochar paper), ten coating/efflorescence records and six precursor/one-part
records. One addition is a review. Publisher diversity increases, but the batch
is still selected discovery, not a systematic review or 25 independent datasets.

All 25 identities were checked via exact Crossref DOI lookups; only bibliographic
fields retained, no abstracts/full texts. Scope notes distinguish untreated
coffee, combustion ash and pyrolysis char, as well as substrate/application limits.
Crossref `updated-by` identified two linked errata/corrections. Their discovery
records expose correction links and remain excluded from assistant evidence until
review. Status checks are not comprehensive publisher clearance. Full-text rights
remain unassessed for all 25 additions. See `breadth-2026-10-13.json` for dated
metadata evidence, provider limits, DOI candidates, inclusion scope and importer
replay (seed 86, final 111, exactly 25 acceptance events after two invocations).

No new numerical extraction is claimed: five partial papers, 62 variants, 275
cells, 12 failure/null/mixed findings and 18 research material identities remain.
`phase-a-gap-scope-2026-10-13.json` snapshots every remaining inventory entry with
study-specific next actions and closure requirements. Source-statistic disputes,
omitted data and experimental uncertainty remain unresolved. Fresh ma15082944
access returned a PMC browser challenge and publisher HTTP 429. Next digitization
is Figures 4–6, with signed-axis/time-origin/baseline checks; blocked data must not
be guessed. Phase A complete acceptance remains incomplete.

Root `AGENTS.md` requires `SUBAGENT_POLICY.md`: explicitly selected lightweight
agents only, narrow read-only tasks, depth one, normally at most three concurrent;
all implementation and final validation stay with the Primary Agent.

## 13 October — two further breadth batches

Library now contains 161 unique DOI records (50 new metadata-only additions).
All prior IDs and 275 experimental cells remain unchanged. See batch manifests
`research/batches/breadth-3-2026-10-13.json` and `breadth-4-2026-10-13.json` for
exact metadata, source dates, scope and idempotent importer results. Topics broaden
to fibers/repair, precursors, efflorescence/acid exposure and phosphate systems.
No full-text extraction, numerical performance, human review or supplier claims.
Five pilot papers remain partial. Correction follow-up records partial progress
and retained assistant holds. HANDOFF.md records current QA/publication status.

## Recovery follow-up, 13 October 2026
Recovered PR #9 and its successful browser run 38351237103. Expose correction
review scope on cards/study pages while retaining both assistant holds. No new
scientific results or full-text rights upgrades. Pilot access remains blocked.
See HANDOFF.md for publication state and the supplemental access-review audit.

## OpenAlex discovery milestone — 14 October 2026

A private discovery adapter and resumable review queue now precede editorial
integration. See OPENALEX_PIPELINE.md. Synthetic-response tests pass; live API
access remains blocked by environment configuration. Queued/accepted candidates
are not published or source-verified records. All existing scientific counts and
partial-extraction limits remain unchanged. No schedule or AI provider was added.

## 14 October — accessible-source and materials research scout

Extend discovery with OA-only searches, alternate location/version/license hints,
citation leads and existing-record access enrichment. All links remain unchecked;
no full-text fetcher or permission upgrade. RESEARCH_SCOUT.md defines interactive
materials comparisons, contradictory-evidence searches and hypothesis/test planning,
with nine search families and explicit grade/processing/method boundaries. Current
OpenAlex guidance says Unpaywall uses the same underlying data; it is not independent
OA verification. Google Scholar remains a manual seed source. Three web-tool access
checks are recorded in research/batches/scout-access-2026-10-14.json. Catalog and
measurements unchanged; cloud API and unattended synthesis remain unconfigured.

## 15 October 2026 — materials scout evidence checkpoint

The interactive workflow produced research/batches/scout-materials-2026-10-15.json
and research/briefings/materials-scout-2026-10-15.md: six new candidates, one existing
record follow-up, one partial full-text review and three experimental questions.
No canonical scientific records or public routes changed. Publisher/repository
search was used; this does not demonstrate live OpenAlex or deployed AI operation.

## 17 October 2026 expansion
201 unique publications (40 new metadata-only records), five partial pilot
studies, 62 mixes and 275 observations. The recipe catalog remains 43 designs,
31 scalable. Three editorial deep dives are not three newly extracted studies.
`src/knowledge-expansion.js` joins the existing canonical references; batch
manifests preserve source URLs, dates, rights limits, unknown authors and identity
corrections. A frozen 161-record ID/DOI/title baseline checks preservation and
idempotent import tests protect against duplicate additions. Study metadata now
uses article titles in descriptions to avoid collisions when authors are unknown.

## 18 October 2026 — 250-publication catalog

Added 49 bibliographic records after the published 201 baseline in batches 7/8
(25/24). DOI deduplication and frozen baseline checks preserve every prior identity.
Four editorial deep dives now include the requested BN/PVA/hemp nanofiber study.
Its indexed-source access limits, ratio denominator, conflicting strength claims
and incomplete replication ledger remain explicit. No canonical experimental
observations or recipes added; five pilot studies remain partial. OpenAlex on hold.
See HANDOFF.md and research/batches/*2026-10-18* for evidence and publication status.

## 19 October 2026 — 300 publications, six editorial deep dives
Two 25-record batches preserve the prior 250 identities and add metadata only.
Two partial methods deep dives explain MK/slag shrinkage controls and MK paste
water/temperature design, with source locators, ratio bases, conditional arithmetic,
rights evidence and explicit replication gaps. Canonical pilot observations and
recipes are unchanged. Source notes are visible in catalog cards and escaped.
The unexplained secondary status flag on DOI 10.1016/j.cemconcomp.2024.105811
is held for review and excluded from assistant evidence. OpenAlex stays on hold;
daily draft automation is unchanged. Exact audits and release status: HANDOFF.md.

## 19 October 2026 — 400-publication checkpoint

Added 100 DOI-deduplicated metadata records in four 25-record batches, preserving
all prior 300 identities. Eight editorial deep dives now include MK freeze–thaw
and carbonate/hydroxide activation of slag. Partial review, explicit ratio
denominators, unfavorable outcomes and unresolved reproduction details remain
visible. Canonical pilot data and recipes are unchanged. Source correction and
access limitations are recorded in the batch audits; OpenAlex stays on hold.
The daily research draft automation is unchanged.
