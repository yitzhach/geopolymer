# Potassium literature designs — 9 October 2026

Five records in src/literature-mixes.js, rendered at /formulations and individual
/formulations/<id> paths. Authors, evidence type, source locator, strength age,
curing, geometry and missing information travel with each record. These are source
extractions, not independent reproduction or scientific validation.

## Extraction checks
- Davidovits workshop PDF page 56 visually checked: MK/slag 80/20, silicate 20,
  water 2; MR 1.40, solution water 53%; 45/70 MPa at 7/28 days. Slide lacks
  explicit units: interpreting its proportions as mass parts is disclosed.
- Davidovits / Davidovits / Davidovits US20100010139A1, Examples 3 and 5:
  extracted actual mass parts, inverse modulus definitions, water and 28-day
  results. Patent claims are not journal peer review. No safety or legal claim
  from the patent title is endorsed. Missing test geometry/standard stays unknown.
- Alameri et al., DOI 10.1080/13287982.2024.2375468: full institutional PDF
  reviewed; Table 5 and adjacent testing/results page visually checked (PDF p8,
  printed p101). T2M9 contains 78.6 kg/m³ SiC, although the conclusion specifies
  zero SiC. Preserve the tested row, not a fabricated reconciled optimum.
  Activator concentration/density/free water unresolved; no mass-ready export.
  126 MPa is a 28-day cylinder result after 100 °C/24 h hot-water curing plus
  fog-room storage; it is not ambient-cured paste strength.
- Kohout et al., DOI 10.3390/polym13213754: full PMC text reviewed, §§2.2/2.3/3.3.
  GS-1.0 is 95.2 MPa at laboratory testing temperature, NOT the separate 97.1
  MPa 1000 °C in-situ result. Binder ratios/water and 65 vol% chamotte retained.
  No invented density conversion or gram batch. Cure narrative and test-age
  wording are preserved separately.

## Behavior
Three Davidovits records scale reported proportions by total wet mass and export
calculator v1 JSON. Missing chemistry is deliberately unassigned: only stated
water is populated. No typical supplier assays or inferred silicate oxide split
silently replace the original inputs. Review current assay data before ratios.
Calculator loading asks before replacing current study, retains old ingredients
as baseline, and never overwrites the explicit saved project. Citation, locator,
cure, literature-only result and caveats persist into notebook snapshots; own
structured test results start empty. The two partial designs reject calculator
loading even if a URL is hand-edited. Invalid/edited mass invalidates the preview.

## Next curation
Resolve Alameri Table 5/conclusion discrepancy and activator/free-water values;
extract additional complete K-silicate metakaolin batches from primary papers;
review supplier/lot substitutions explicitly, never transfer reported MPa to them.
Keep original evidence alongside any adapted trial.

## Expanded collection
Ten records added, 15 total; source extraction and future AI plan are documented in
RECIPE_DATABASE.md. All new records have scalable mass proportions; the potassium
printing variant has no transcribed numeric strength. Structured age tables retain
missing values and original cure/method; adjustments are explicitly experimental.
