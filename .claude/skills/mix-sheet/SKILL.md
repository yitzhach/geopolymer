---
name: mix-sheet
description: Add or fix mix sheets — typed, source-quoted mix data for the Mix Explorer (/mixes) — by converting a deep dive's already-reviewed notes into research/mix-sheets/<guideId>.json and validating it. Use when asked to continue the mix table, add mix sheets, work the mix-sheet queue, or fix a failing sheet.
---

# Mix sheet skill (v1.2: review-note mode; source-text mode at the end)

You turn notes that are already reviewed and published on the site into structured mix data.
You do **not** open papers, search the web or change site code. A checker verifies your work;
your job is to copy carefully and to leave unknowns empty. The contract is
`MIX_SHEET_STANDARD.md`; this file is the procedure. Work in batches of up to 5 papers.
You do not need the research master prompt for this mode: no new source is opened.

Kickoff prompt for a new session: *"Use the mix-sheet skill to add the next 5 sheets from the
queue, then do the finish steps."*

## Never

- Never type a number that is not inside the text you quote. Never convert, add, average or
  estimate. The site computes shares; you do not.
- Never use `0` for "not reported" or "left out". A control without an additive simply does not
  list that additive. Enter `0` only when the quote itself shows the 0 (e.g. "0% slag").
- Never invent a mix or material name (see "What counts as a label").
- Never edit files outside `research/mix-sheets/`, `HANDOFF.md` (finish step) and
  `research/mix-sheets/QUEUE.json` (skip reasons only).
- Never write model names into files. Use `"madeBy": "AI transcription · mix-sheet skill v1"`.

## What counts as a label

A label is the name the notes use for **one specific condition**: `MK0`, `GPC10`, `AN-PC1-S`,
`Grout D`, `NHFS`, `Starch plus borax`, or a phrase like `the selected blend` **when the notes
give that blend's own composition**. Not labels: group or direction phrases (`higher-MK mortar`,
`fly-ash-rich mixes`, `the other conditions`) and bare levels (`10, 30, 50 wt% slag`). Unlabelled
conditions go into `gaps`.

## Procedure for each paper

1. `npm run mixes -- queue --next 5` — take the first entry (or the ids you were given).
2. `npm run mixes -- context <guideId>` — read all of it once. This numbered text is the
   **only** text you may quote.
3. Skip the paper (set `"skip": "<reason>"` on its queue entry, write no sheet) when:
   the context says the DOI is already structured; the review status is `source-hold` or
   `no-independent-mix`; or the context has **no label** at all. Holds that describe a conflict
   (e.g. "specimen geometry conflict") are **not** a reason to skip — record them in `gaps`.
4. `npm run mixes -- new <guideId>` — creates `research/mix-sheets/<guideId>.json`
   (`--out <path>` writes elsewhere, e.g. a scratch folder).
5. Fill, in this order: `materials` → `cures` → `tests` → `mixes` → `results` → `findings`
   → `notes` → `gaps`. Edit `scope` to say which mixes you covered.
6. `npm run mixes -- check research/mix-sheets/<guideId>.json --audit`. Fix every `ERROR`.
   Once it passes, an `ATTRIBUTION CHECK` list prints every value beside its quote: confirm each
   value belongs to **that** mix (and age, cure, condition). Sentences comparing mixes
   ("X 37.5 versus Y 44.6") need extra care. Fix or remove anything wrong; re-run.
7. Two failed attempts on the same value → delete that value, add a gap, continue.

## Field cookbook

**materials** — one per distinct material in the context.
`{"id": "fa", "family": "fly-ash", "role": "precursor", "name": "Class F fly ash", "aliases": ["FA"]}`
- `name` and each alias must appear in the context as written (whole word; a plural `s` is fine).
- Family hints: GGBS/GGBFS/BFS/blast-furnace slag → `slag`; steel/BOF/ladle-furnace slag →
  `steel-slag`; copper slag → `copper-slag`; fly ash → `fly-ash`; MK → `metakaolin`;
  SF/silica fume → `silica-fume`; NaOH (any molarity) → `sodium-hydroxide`; KOH →
  `potassium-hydroxide`; sodium silicate/waterglass/WG solution → `sodium-silicate-solution`;
  metasilicate or silicate powder → `sodium-silicate-solid`; K-silicate → `potassium-silicate-solution`;
  sand → `sand`; gravel/granite/basalt coarse aggregate → `coarse-aggregate`; SP/PCE/SNF →
  `superplasticizer`; borax/sucrose/starch used to delay setting → `retarder`; HPMC/CMC →
  `viscosity-modifier`; VAE/latex/redispersible powder → `polymer`; PVA/PP/steel/basalt fibre →
  `pva-fiber`/`pp-fiber`/`steel-fiber`/`basalt-fiber`; undefined abbreviation (e.g. "AAS") →
  `other-activator` etc. Full list: `FAMILIES` in `src/mix-table.js`. Nothing fits →
  `other-precursor`, `other-activator`, `other-aggregate`, `other-additive`, `other-fiber`.
- Optional `"detail"`: a quote with grade or assay, e.g. `"8 mol/L NaOH from 96% pellets"`.

**cures** — one per distinct curing regime the context states.
`{"id": "c1", "category": "heat", "temperatureC": 60, "duration": 24, "durationUnit": "h", "sealed": true, "humidityPercent": null, "text": "Sealed 60 °C/24 h, cool/demold, store 23 ± 3 °C"}`
- category: ≥30 °C → `heat`; steam → `steam`; immersed in water → `water`; fog room or
  ≥90% RH at room temperature → `moist`; room/lab/ambient (<30 °C) → `ambient`; otherwise as
  written (`electric`, `microwave`, `autoclave`, `other`).
- Numbers: the first curing stage (not demolding). `"24 h"` → 24 + `"h"`; `"28 days"` → 28 +
  `"d"`; `"about 20 °C"` → 20. A range (`15–25 °C`) or a bound (`RH ≥ 95%`, `>90%`) → `null`;
  the quote keeps it. Later stages stay in the quote. Leave `durationUnit` null when `duration` is.
- Test ages are not curing durations ("7, 14, 28-day strength ages" → no duration).
- sealed: sealed/covered/wrapped/bagged → `true`; explicitly open → `false`; else `null`.

**tests** — one per measured property (and method, if two methods measure one property).
`{"id": "comp", "property": "compressive-strength", "unit": "MPa", "specimen": "50 mm cubes", "method": "ASTM C109"}`
- Common properties: `compressive-strength`, `flexural-strength`, `splitting-tensile-strength`,
  `direct-tensile-strength`, `tensile-strain-capacity` (%), `bond-strength`, `drying-shrinkage`
  (% or microstrain), `autogenous-shrinkage`, `initial-setting-time`/`final-setting-time`/
  `setting-time` (min), `flow` (mm), `flow-time` (s), `slump` (mm), `density` (kg/m3),
  `porosity`/`water-absorption`/`mass-loss` (%), `thermal-conductivity`. Full list with units:
  `PROPERTIES`. Only add a test that has at least one result.

**mixes** — one per labelled condition with at least one quantity, parameter or result.
`{"id": "D", "aliases": ["Grout D"], "control": false, "form": "grout", "cure": "c1", "quantities": [...], "parameters": [...]}`
- `control: true` only when the notes call it control/reference.
- `form`: what the notes say (paste, mortar, concrete, grout, foam, coating, composite, printed,
  brick-block). `paste` only when the context lists every ingredient and none is aggregate.
  Unsure → `unknown`.
- `cure`: a cure id, or `null` when the notes give several regimes without saying which applies.
- Optional `"missing": ["…"]`: what is unknown about this one mix (it shows with the mix).
- Study-wide settings (one activator, one cure, one L/S) with no sign that mixes differ may be
  attached to every labelled mix. If the notes show they vary, attach only where a quote names the mix.

**quantities** — amounts of materials in that mix.

| The context says | unit | basis |
|---|---|---|
| "0.500 mass parts", "0.400 part", "60:40" | `part` | `mass-parts` |
| "80% GGBS / 20% FA", "by binder mass" with only precursors named | `wt%` | `precursor-mass` |
| "2% binder" where "binder" may include activator | `wt%` | `binder-as-defined` + `basisNote` |
| "450 kg/m³" | `kg/m3` | `per-m3` |
| "400 g" | `g` | `batch` |
| "% of total mix mass" | `wt%` | `total-mass` |
| "1.5 vol% fibre" | `vol%` | `volume` + `basisNote` |
| "FA 0.5; BFS 0.5; sand 2" on a binder basis | `ratio` | `precursor-mass` |
| material present, amount not given | `"value": null, "missing": "<why>"` — leave `unit` and `basis` out | |

List an activator with `value: null` when the notes name it but give no amount; the site uses it
to know the activator family (sodium/potassium).

**parameters** — design settings that are not ingredient amounts: `{"key": "...", "value": n, "text": "..."}`
"12 M NaOH" → `hydroxide-molarity`; "modulus/Ms/SiO₂/Na₂O 1.2" → `activator-modulus`;
"silicate/NaOH 2.5:1" → `silicate/hydroxide`; "l/s", "LS 0.27" → `liquid/solid`; "w/b" →
`water/binder`; "w/s" → `water/solids`; "activator/binder", "AAS/binder" → `activator/precursor`;
"Na₂O 8%" → `alkali-dose`; "sand/binder" → `sand/binder`; Si/Al etc. → `PARAMETERS`.
If the notes do not say whether a ratio is by mass, volume or moles, add `"basisNote": "basis not stated"`.

**baseMix** — two patterns only:
1. The notes say variants share the base ("all 18 mixes", "per precursor mass … in all mixes"):
   `"baseMix": "<control id>"`, `"baseText": "<that sentence>"`; list only what differs.
2. The notes give one design table and labelled variants that only add something
   ("Table 3, binder basis: …" plus "HPMC X0.2/X0.4/X0.6 = …; reference zero"): make the
   reference the base mix with the table's amounts, let each variant inherit it with the design
   line as `baseText`, and add the gap "Variants inherit the design table as the base; confirm."

**results** — one per number per mix per test per age.
`{"mix": "B", "test": "comp", "ageDays": 28, "value": 67, "text": "B (40/20/20/20 GGBS/FA/MK/SF, LS 0.33) gives 67 MPa", "ageText": "Grout: 50 mm cubes, 28 days", "locator": "Table 4"}`
- The quote must name the mix and contain the value. If the age is elsewhere, add `ageText`
  quoting it. Fresh tests or unclear ages: `"ageDays": null, "ageNote": "<why>"`.
- Sub-conditions (exposure arm, slice, direction, cure arm): add `"condition": "<quote>"`,
  e.g. `"condition": "Exposed NHFS Part 3 (bottom)"`.
- "about 40" → `"qualifier": "approximately"`; ">40" → `greater-than`; "<5" → `less-than`;
  "30–40" → `range` with `value` 30 and `valueMax` 40; "± 2.1" → `"spread": 2.1`.
- Statements like "up to 35% lower" without a named mix are not results → `gaps`.

**findings** — only when the context selects a mix for a goal; `goal` is your short wording.
`{"goal": "Highest grout compressive strength", "mix": "D", "text": "Grout D for strength"}`

**notes** — `failure`, `tradeoff` or `observation` statements that name one mix.
`{"mix": "D", "kind": "failure", "text": "D failed adequate penetration at 54/62 vol% RAP"}`

**gaps** — your own short sentences: unlabelled conditions, missing amounts, conflicts and holds
from the context, mixes not covered. Always at least one.

## Reading checker messages

| Message | Fix |
|---|---|
| `not found in this guide's reviewed notes` | Copy the fragment again, exactly, from one `[n]` block. Don't join two blocks. |
| `X does not appear in the quoted text` | Quote a longer fragment that contains X, or remove the value. |
| `quoted text must name the mix` | Quote a fragment that includes the label, or add a real alias from the context. |
| `the mix id or one alias must appear…` | You invented a label. Use the exact label, or drop the mix and add a gap. |
| `at least one mix is required` | The paper has no label: delete the sheet and skip it in the queue. |
| `already structured…` / `correction hold` / `no physical mixes` | Delete the sheet and skip it in the queue. |
| `doi: must equal the guide DOI` / `file name must be <id>.json` | Use the skeleton from `new`; don't rename. |
| `unknown cure id` / `unknown mix` / `unknown material id` | Fix the id spelling, or add the missing entry. |
| `null value needs a reason` / `null age needs a note` | Add `missing` / `ageNote`. |
| `30 °C or above is a heat cure` | Change category to `heat`. |
| warning `… not used by any mix quantity` | Fine when the paper names a material without an amount. |
| warning `quoted text does not name "<material>"` | Fine when the quote is a shared design line. |
| warning `age … is not visible` | Add `ageText`. |

The two worked examples pass with 0 and 3 warnings; warnings never block a sheet.

## Source-text mode (v1.2, stronger model only)

Only when the owner has approved it for the batch. Follow "Source-text procedure" in
`MIX_SHEET_STANDARD.md` and the research access rules (≤5 papers, ≤40 operations, audit file in
`research/batches/`). Differences from review-note mode:

- `"basis": "source-text"` plus `sourceUrl` (the PMC article), `accessed` and `audit`;
  `"madeBy": "AI transcription · mix-sheet skill v1 (source-text pilot)"` or later label.
- Labels are the paper's own mix IDs (Table 2 `G50F50R0`, `RG/L-1.5`, `N-30`); text forms such as
  `RG/L = 3` may be aliases when a result sentence uses them.
- `check` cannot ground these quotes in the repository; the grounding check and the second
  review (standard, steps 6–7) replace it. Keep the queue entry's `skip` and add
  `"sheet": "source-text <date>"` so the queue shows it was recovered.
- Expect some papers to yield designs only: results printed only in figures are not read.

## Finish (once per batch)

1. `npm run mixes -- check` → all sheets pass.
2. `npm test` and `npm run build` → both pass.
3. `npm run mixes -- stats` → update the "Mix table" section of `HANDOFF.md` (rows, papers,
   sheets) and list the sheets you added or skipped.
4. Commit on a branch: `Add mix sheets: <ids>`; push following the publication rule in `HANDOFF.md`.

Worked examples: `research/mix-sheets/one-part-admixture-compatibility.json` (mass parts,
inherited base mix, null doses, setting time), `research/mix-sheets/rap-geopolymer-grout-versus-composite.json`
(percent shares, liquid/solid, flow time, `ageText`, finding, failure note) and
`research/mix-sheets/fly-ash-slag-efflorescence-moisture.json` (study-wide settings, bounds left
null, `condition`, a hold kept as a gap).
