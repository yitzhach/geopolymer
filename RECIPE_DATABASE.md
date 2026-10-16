# Recipe database and future formulation advisor

## 15 October 2026 — ten hemp, basalt and carbon-textile designs

30 recipes total; 18 scalable. Ten additions represent variants in two studies,
not ten independent experiments. src/fiber-recipes.js holds three scalable
matrix mixes, two read-only textile assemblies, and five read-only foam designs.
Six matrix observations preserve their reported spread, age, specimen scope and
locators. The source's ± type is unresolved; it is not labeled SD or confidence.
Fiber quantities are explicitly derived from geopaste mass, not total mortar.
Foam molar design does not become an invented ingredient batch. Source naming,
foamer basis and testing gaps remain visible. Lightweight filters now return
five study-scope designs; no numerical thermal values are assigned.

Attribution includes source titles, authors, license and rights-evidence links.
The audit in research/batches/recipes-fibers-2026-10-15.json records source access,
partial inventories, conversion basis and deferred biochar work. Canonical
library/pilot counts are unchanged. Local Node checks and validation pass; build
has 166 routes. Browser and remote verification are recorded in HANDOFF.


## 15 October 2026 — polypropylene comparison

Current total: 20 references; 15 support proportional scaling. PP0 adds a printing
control with a derived activator-solution split; PP1.00 retains the fiber volume
basis and blocks mass scaling. Both belong to one study and vary CMC as well as
fiber content. No numeric strength is inferred from graphs. Source-unit captions
and calculator restrictions are tested. See the polypropylene batch audit for
rights, exact locators, derivation and deferred lightweight research.

## 15 October 2026 — novel admixtures and fibers

Published recipes now has 18 records (15 preserved + 3 additions). New GP9.0
uses the existing source-checked pilot extraction and supports proportional mass
scaling. Two Meng PVA/CNT designs retain distinct dose bases and ages; their full
batch is unresolved, so calculator transfer is disabled. License and dated source
review appear on their pages. One paper supplies both designs, not two independent
replications. Numerical flexural values with unresolved age are not searchable.

The novel-recipes section groups silica fume, printing modifiers, steel fibers and
PVA/CNT designs. Collection and study-focus filters are combinable with existing
search/activation/evidence filters. Focus means studied scope, not guaranteed gain.
Shear and lightweight gaps are explicit; perlite is only a linked research lead.
GP9.0 preserves below-detection early-age results without turning them into zero.
Existing storage, scaling, planner property/age joins and source IDs are retained.
See research/batches/recipes-2026-10-15.json for rights, locators and remaining gaps.

Verification: all 17 Node test files, schema validation, 154-route production
build and all six browser suites pass. Final recipe checks include combined
filters, jump-link visibility, missing values, partial-transfer blocking, export
and desktop/mobile layout.

The earlier implementation notes below describe the 15-record baseline.

Implemented 9 October 2026 on codex/potassium-literature-mixes.

## Current deliverable

/formulations is a searchable collection of 15 records: the previous five plus
10 additions. Filters cover text/material/author, activation and evidence type.
Each record has a stable ID, revision, study family, ingredients, source locator,
curing, method, limitations, adjustment ideas and structured literature results.
Ten additions support proportional gram scaling and calculator/notebook transfer.
No supplier replacement is inferred. Unknown assays stay unknown.

New entries: Vogt GP0/GP6.0/GP7.5; Bong Na-N-2.5/K-KA20-2.5;
Davidovits dry Example 6 and Czech Example 2; Hardjito–Rangan GC1 mixes 2/3/4.
These include variants within studies, not ten independent replications. The site
labels evidence as published testing or patent reporting, never “tried and true”.

The collection is a static, version-controlled seed database, not a cloud service.
Download recipe database JSON exports all public records, not private notebook
content. Current calculator v1 and notebook keys are unchanged. All extracted
results travel as literature study notes; own notebook measurements remain empty.

## Source extraction map

- Vogt et al., https://doi.org/10.3390/ma14185396: Tables 2/4 and method excerpts.
  Preserve nonmonotonic measured results; GP7.5 day-one absence is not zero.
- Bong et al., https://doi.org/10.3390/ma12060902: Tables 2/3 and §§3–4.
  Table ratios are relative to total precursor, split 3:1. Keep directional
  results distinct; interlayer tensile bond is not shear. K-KA20-2.5 Figure 10
  values were not digitized, so numeric performance stays unavailable.
- Davidovits US5349118A Examples 1/6 and US20100010139A1 Example 2.
  Technical powder water is not automatically assigned to physical solution water.
- Hardjito/Rangan GC1 report, linked on each record: Tables 4.1/4.9 and §§3–4.
  Use the 476 kg/m³ ash rows, not the separate 408 kg/m³ series. Seven-day
  results follow a 24-hour heated cure; cure duration is not test age.

Primary publisher/repository text and PDF text were reviewed. Screenshot requests
were made, but no usable image content was returned; no visual table QA claimed.
Records intentionally leave chemistry unassigned beyond extracted solution water.
Further curation should capture complete assays, uncertainty, replicates, specific
mixing procedures and material grades before supplier-equivalence calculations.

## Goal planner now

Accept compression, flexure, shear, bond or thin-application goals, numeric target,
layer thickness, age and free-text substrate/cure constraints. Numeric matching
uses exact property and age only. It DOES NOT interpret free-text constraints,
match curing compatibility, qualify thin applications or predict strength.
Every matched observation displays its original cure and method. JSON test briefs
include the requested schedule: 1/4/24/72/168/336/672 hours. Every prediction is null.
Changes to the form invalidate its old downloadable brief.

Adjustment notes distinguish comparisons of published variants from new proposed
experiments. Borax/CMC printing examples retain published admixture amounts;
general fiber, water-reducer and viscosity-modifier guidance is screening advice,
not established compatibility, dosage or quantified strength improvement.

## Future AI advisor — agreed product direction, not implemented

Purpose: help a user describe performance needs, select relevant precedents,
review a draft recipe, suggest traceable changes/admixtures and plan tests.
A virtual test may eventually estimate performance; an LLM must never invent a
strength curve or substitute compression for flexure, shear or adhesion.

### Data foundation

Store normalized entities in a durable backend: sources, material grades/lots and
assays, recipe revisions, ingredients and dose basis, curing stages, specimen
geometry, preparation, test method, loading direction and result observations.
Separate literature, own measurements and model predictions. Each prediction
needs model version, input snapshot, training-domain check and uncertainty.
Record missing values as null, censoring separately, and replicate count/spread
when available. Retain immutable original recipes and parent-linked adaptations.

User requirements should include property, target and age; test method; layer
thickness; substrate; cure temperature/humidity; working time; density; shrinkage;
available equipment/materials; budget and exposure constraints. Shear needs a
specific test type, flexure needs geometry, and bond needs substrate/loading mode.

### Delivery stages

1. Curate complete source and supplier data; cloud persistence, accounts and
   owner-controlled sharing as a separate backend phase.
2. Add a server-side retrieval advisor over approved sources. Keep credentials
   server-side. Retrieve cited precedents, use existing deterministic chemistry
   calculations and propose a reviewable recipe diff. User explicitly applies
   changes; save a new trial with citations and rationale. No silent recipe edits.
3. Train/evaluate separate predictors only for supported properties and material
   domains. Split evaluation by study and material lot to prevent leakage from
   closely related variants. Audit units, duplicate publications, cure history,
   specimen geometry, missing ages and negative/failed trials before training.
4. Add prediction intervals calibrated against held-out measurements, domain
   warnings, per-age coverage and an “insufficient evidence” response. Do not
   extrapolate across activation families, thicknesses or test methods by default.
   Validate early-hour predictions independently; 28-day data alone are insufficient.
5. Optimize candidate variations against multiple constraints with uncertainty;
   propose a small experiment matrix. Link measured follow-up results to the
   frozen suggestion/model version before considering model retraining.

### Admixture records

Track product and chemistry, alkali compatibility evidence, solids/water content,
addition/replacement basis, dosage range from the cited experiment, addition
sequence, dispersion, effect on working time/air/strength/shrinkage and limits.
Candidates include compatible dispersants, retarders, viscosity modifiers,
defoamers, fibers and fillers. Inclusion is a research lead, not approval for all
geopolymer systems. Never carry a commercial product’s claimed performance to a
new binder without testing.

### Acceptance gates

- A cited observation is never labeled as a prediction or own measurement.
- No numeric prediction is shown when required inputs/domain coverage are missing.
- No pooled cube/cylinder, tensile/shear, oven/ambient or direction-blind result.
- Any recommendation has citations or an explicit hypothesis label, plus tradeoffs.
- API, privacy, evaluation dataset, costs and provider remain future decisions.

## Verification and read map

src/recipe-additions.js: ten records; src/literature-mixes.js: shared integration.
src/recipe-planner.js: pure filters, requirements and public export.
src/literature-ui.js: filters, age tables, scaling and experiment brief UI.
tests/recipe-catalog.test.mjs: mass/provenance preservation, exact age/property
matching, missing values, filters and export. Browser coverage is included in
literature-browser.cjs for the next authorized CI run.

## Phase A knowledge links
Five detailed partial experimental records link back to existing curated recipes
by DOI. This adds 60 indexed study mix variants, not 60 newly qualified executable
recipes. The curated recipe count remains 15. Unknown activator splits, ratio
bases and assays block new automatic mass transfers. Study pages also offer a
citation-only calculator link, which does not apply source quantities.

## 15 October 2026 — complete basalt matrix comparison

Added the remaining eight Le et al. matrix variants: 38 curated recipes, 26
scalable. All 11 Table 3 matrix rows now have 22 means with their reported spreads;
16 measurements are new. Source page 5 was visually checked after text extraction.
Recipe pages compare the full same-study matrix series and expose mixing order
and sand grading. Textile assemblies remain separate and read-only; manufacturer
areal mass does not establish a complete assembly batch. Foam methods retain the
identifier, batch, test-age and loading-geometry uncertainties. The canonical
library/pilot remains 161 publications / 5 partial studies / 62 mixes / 275 cells.
See research/batches/recipes-matrix-complete-2026-10-15.json. These are selected
licensed facts and AI source checks, not full-paper extraction or replication.
