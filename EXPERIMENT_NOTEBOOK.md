# Experiment notebook v1

Status: published on `codex/experiment-notebook`, draft PR #1. GitHub browser
workflow 37873602855 passed on implementation 93ae031. Main/live unchanged.
Screenshot inspection is pending because artifact download returned HTTP 403.
See HANDOFF.md for verification details.

## Workflow
1. Build or reopen a calculator formulation and choose Save recipe as notebook trial.
2. Name a new experiment/question, or select an existing experiment; name the trial.
3. Review the copied recipe and adjust planned grams before first save if needed.
4. Save trial to lock the formulation. Record actual quantities and deviations.
5. Add specimens, curing stages, dated observations and own/literature results.
6. Duplicate a saved trial, describe the changed variable and adjust planned grams.
   Actual quantities, specimens, curing and results start blank for the new trial.
7. Compare to the parent, checking method, unit, age, geometry and curing context.
8. Download saved notebook JSON; Download draft includes incomplete edits and the
   saved context needed to restore the draft elsewhere. Import is always explicit.

## Records and evidence
Notebook -> experiments -> trials. Trial links are stable IDs, including parentId.
The snapshot is a complete normalized calculator v1 project: recipe, reference,
targets and study notes. Ingredients include assay/provenance, catalog ID and
optional density. Snapshot data never refreshes from a supplier catalog.
Legacy free-text study results remain unclassified notes in the snapshot; they
are not converted into measured results or copied into a new result record.

Preparation records local casting date/time, mixing and deviations. Curing records
start age/duration in hours, temperature in degrees C, RH percent and conditions.
Actual masses are grams, with blank/unknown distinct from zero. Specimens have
labels plus explicit geometry/dimension notes. Observations have date, optional
age/specimen, category, text and optional image URL/caption. No external image is
fetched automatically and no attachment bytes are saved.

Each result requires property, finite value, unit, method and source; age/specimen
may be unknown. Own and literature sources remain distinct, both unreviewed by the
platform. Users can record individual replicates as separate specimen results.
No automatic unit conversions, averages, equivalence or performance ranking.

## Persistence and compatibility
- `geopolymer.notebook.v1`: validated committed experiments/trials.
- `geopolymer.notebook.draft.v1`: separate incomplete working copy, saved on input.
- `geopolymer.calculator.v1`, `geopolymer.calculator.session.v1` and
  `geopolymer.workspace.v1` are unchanged. No destructive migration.
- Browser-local persistence is not durable cloud backup. Quota/unavailable-storage
  errors retain the current DOM/model for download. Closing the page after failed
  recovery writes can lose edits; an unload warning is best effort.
- Saving checks the expected prior serialized value to detect conflicting tabs.
  There is no server lock or collaborative editing protocol.
- Import validates format/structure/numbers/references before writing. Saved
  notebook imports remap IDs, including parents and specimen references. They
  append copies; importing twice deliberately creates two copies.
- Draft downloads include saved notebook context. Importing these makes context
  copies and remaps the draft's experiment/trial/parent links. Existing local data
  remains. Recovery-only drafts without context need their original notebook.
- Bounds: 4 MB JSON, 100 experiments, 500 trials, 50 ingredients per trial,
  100 specimens/curing stages and 300 observations/results per trial.
- Existing saved snapshot changes are rejected at the model boundary. Results and
  notes are editable; complete audit/revision history is a later backend feature.

## Comparisons and limits
Recipe comparison walks all recipe, target and study fields, so linked source,
assay, provenance, scope and density changes cannot silently disappear. It compares
ingredient row positions (the calculator's current IDs are positional); reordering
can produce several differences. An intended single-variable label is not proof
of controlled experimental design. Ratios are bulk input accounting only.

The first version edits planned masses in new trials, not supplier assays. For a
new assay/grade, create a new captured trial from the calculator; richer linked
assay-variation editing is later work. No phosphate model, account, sync, shared
publishing or uploaded images are included.

## Verification
`npm test` includes immutable snapshots, source separation, unknown-value handling,
parent/specimen remapping, graph validation, failed/conflicting saves, legacy keys
and incomplete recovery records. The browser suite exercises calculator capture,
actual quantities, records, duplication, refresh recovery, desktop/mobile layout,
backup/import, portable drafts and quota failures. See HANDOFF.md for what actually
ran; a test file is not evidence that a browser run passed.
