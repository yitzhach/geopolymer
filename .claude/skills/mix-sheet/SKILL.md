---
name: mix-sheet
description: Add or fix mix sheets — typed, source-quoted mix data for the Mix Explorer (/mixes) — by converting a deep dive's already-reviewed notes into research/mix-sheets/<guideId>.json and validating it. Use when asked to continue the mix table, add mix sheets, work the mix-sheet queue, or fix a failing sheet.
---

# Mix sheet skill (v1, review-note mode)

You turn notes that are already reviewed and published on the site into structured mix data.
You do **not** open papers, search the web or change site code. A checker verifies your work;
your job is to copy carefully and to leave unknowns empty. The contract is
`MIX_SHEET_STANDARD.md`; this file is the procedure. Work in batches of up to 5 papers.

Kickoff prompt for a new session: *"Use the mix-sheet skill to add the next 5 sheets from the
queue, then do the finish steps."*

## Never

- Never type a number that is not inside the text you quote. Never convert, add, average or
  estimate. The site computes shares; you do not.
- Never use `0` for "not reported". Use `null` with a `missing` reason, or leave it out and add a gap.
- Never invent a mix or material name. If the notes say "the other mixes" or "30 or 50% GGBS"
  without labels, those mixes stay in `gaps`.
- Never edit files outside `research/mix-sheets/`, `HANDOFF.md` (finish step) and
  `research/mix-sheets/QUEUE.json` (skip reasons only).
- Never write model names into files. Use `"madeBy": "AI transcription · mix-sheet skill v1"`.

## Procedure for each paper

1. `npm run mixes -- queue --next 5` — take the first entry.
2. `npm run mixes -- context <guideId>` — read all of it once. This numbered text is the
   **only** text you may quote. If the context says the DOI is already structured, or there is
   no mix composition or result in it, mark the queue entry `"skip": "<reason>"` and move on.
3. `npm run mixes -- new <guideId>` — creates `research/mix-sheets/<guideId>.json`.
4. Fill, in this order: `materials` → `cures` → `tests` → `mixes` → `results` → `findings`
   → `notes` → `gaps`. Edit `scope` to say which mixes you covered.
5. `npm run mixes -- check research/mix-sheets/<guideId>.json --audit`. Fix every `ERROR`.
   Then read every `ATTRIBUTION CHECK` line: does the quote really give **that** value to
   **that** mix at **that** age? If a sentence compares mixes ("X 37.5 versus Y 44.6"), be
   extra careful. Fix or remove anything wrong. Repeat until it passes.
6. Two failed attempts on the same value → delete that value, add a gap, continue.

## Field cookbook

**materials** — one per distinct material in the context.
`{"id": "fa", "family": "fly-ash", "role": "precursor", "name": "Class F fly ash", "aliases": ["FA"]}`
- `name` and each alias must appear in the context exactly (case-insensitive, whole word).
- Family hints: GGBS/GGBFS/BFS/slag → `slag`; fly ash → `fly-ash`; MK → `metakaolin`;
  SF/silica fume → `silica-fume`; NaOH (any molarity) → `sodium-hydroxide`; KOH →
  `potassium-hydroxide`; sodium silicate/waterglass solution → `sodium-silicate-solution`;
  metasilicate or silicate powder → `sodium-silicate-solid`; K-silicate → `potassium-silicate-solution`;
  sand → `sand`; gravel/coarse → `coarse-aggregate`; SP/PCE/SNF → `superplasticizer`;
  borax/sucrose/retarder → `retarder`; HPMC/CMC → `viscosity-modifier`; PVA/PP/steel/basalt
  fibre → `pva-fiber`/`pp-fiber`/`steel-fiber`/`basalt-fiber`. Full list: `FAMILIES` in
  `src/mix-table.js`. Nothing fits → `other-precursor`, `other-activator`, `other-additive`…
- Optional `"detail"`: a quote with grade or assay, e.g. `"45% solids"` text.

**cures** — one per distinct curing regime, only if the context states it.
`{"id": "c1", "category": "heat", "temperatureC": 60, "duration": 24, "durationUnit": "h", "sealed": true, "humidityPercent": null, "text": "Sealed 60 °C/24 h, cool/demold, store 23 ± 3 °C"}`
- category: ≥30 °C → `heat`; steam → `steam`; immersed in water → `water`; fog room or
  ≥90% RH at room temperature → `moist`; room/lab/ambient (<30 °C) → `ambient`; otherwise as
  written (`electric`, `microwave`, `autoclave`, `other`).
- temperature/duration/humidity: the first (main) stage, numbers exactly as in the quote
  (`"24 h"` → 24 + `"h"`; `"28 days"` → 28 + `"d"`). Not stated → `null`.
- sealed: sealed/covered/wrapped/bagged → `true`; explicitly open → `false`; else `null`.

**tests** — one per measured property (and method, if two methods measure one property).
`{"id": "comp", "property": "compressive-strength", "unit": "MPa", "specimen": "50 mm cubes", "method": "ASTM C109"}`
- Common properties: `compressive-strength`, `flexural-strength`, `splitting-tensile-strength`,
  `direct-tensile-strength`, `tensile-strain-capacity` (%), `bond-strength`, `drying-shrinkage`
  (% or microstrain), `autogenous-shrinkage`, `initial-setting-time`/`final-setting-time`/
  `setting-time` (min), `flow` (mm), `flow-time` (s), `slump` (mm), `density` (kg/m3),
  `porosity`/`water-absorption`/`mass-loss` (%), `thermal-conductivity`. Full list with
  units: `PROPERTIES`. A test the paper reports but your context gives no number for → leave out.

**mixes** — one per labelled condition that has a quantity or a result in the context.
`{"id": "D", "aliases": ["Grout D"], "control": false, "form": "grout", "cure": "c1", "quantities": [...], "parameters": [...]}`
- `id`: the label exactly as the notes use it. `control: true` only when called control/reference.
- `form`: what the notes say (paste, mortar, concrete, grout, foam, coating, composite, printed,
  brick-block). Complete ingredient list with no aggregate → `paste`. Unsure → `unknown`.
- `cure`: a cure id, or `null`.

**quantities** — amounts of materials in that mix.

| The context says | unit | basis |
|---|---|---|
| "0.500 mass parts", "0.400 part" | `part` | `mass-parts` |
| "80% GGBS / 20% FA" (share of precursor/binder solids) | `wt%` | `precursor-mass` |
| "2% binder" where "binder" may include activator | `wt%` | `binder-as-defined` + `basisNote` |
| "450 kg/m³" | `kg/m3` | `per-m3` |
| "400 g" | `g` | `batch` |
| "% of total mix mass" | `wt%` | `total-mass` |
| "1.5 vol% fibre" | `vol%` | `volume` + `basisNote` |
| "activator 0.10" per precursor mass | `ratio` | `precursor-mass` |
| material present, amount not given | `value: null` + `"missing": "<why>"` | best fitting pair |

Not quantities — use **parameters** `{"key": "...", "value": n, "text": "..."}`:
"12 M NaOH" → `hydroxide-molarity`; "modulus/Ms 1.5" → `activator-modulus`;
"silicate/NaOH 2.5:1" → `silicate/hydroxide`; "l/s", "LS 0.27" → `liquid/solid`;
"w/b" → `water/binder`; "w/s" → `water/solids`; "activator/binder" → `activator/precursor`;
"Na₂O 8%" → `alkali-dose`; "sand/binder" → `sand/binder`; Si/Al etc. → see `PARAMETERS`.

Variants that the context says share the base proportions: add `"baseMix": "<control id>"` and
`"baseText": "<quote saying all mixes share the base>"`, then list only what differs.

**results** — one per number per mix per test per age.
`{"mix": "B", "test": "comp", "ageDays": 28, "value": 67, "text": "B (40/20/20/20 GGBS/FA/MK/SF, LS 0.33) gives 67 MPa", "ageText": "Grout: 50 mm cubes, 28 days", "locator": "Table 4"}`
- The quote must name the mix and contain the value. If the age is not in that quote, add
  `ageText` quoting where the age is stated. Fresh tests: `"ageDays": null, "ageNote": "fresh test"`.
- "about 40" → `"qualifier": "approximately"`; ">40" → `greater-than`; "<5" → `less-than`;
  "30–40" → `range` with `value` 30 and `valueMax` 40; "± 2.1" → `"spread": 2.1`.
- Statements like "up to 35% lower" without a named mix are not results → `gaps`.
- `locator`: copy the section/table from the context heading when it fits.

**findings** — only when the context selects a mix for a goal.
`{"goal": "Highest grout compressive strength", "mix": "D", "text": "Grout D for strength"}`

**notes** — failures and tradeoffs about one named mix.
`{"mix": "D", "kind": "failure", "text": "D failed adequate penetration at 54/62 vol% RAP"}`

**gaps** — your own short sentences: unlabelled conditions, missing amounts, conflicts the
context mentions, mixes not covered. Always at least one.

## Reading checker messages

| Message | Fix |
|---|---|
| `not found in this guide's reviewed notes` | Copy the fragment again, exactly, from one `[n]` block. Don't join two blocks. |
| `X does not appear in the quoted text` | Quote a longer fragment that contains X, or remove the value. |
| `quoted text must name the mix` | Quote a fragment that includes the mix label, or add a real alias that appears in the context. |
| `the mix id or one alias must appear…` | You invented a label. Use the exact label, or drop the mix and add a gap. |
| `already structured in the formulation catalog or knowledge pilot` | Delete the sheet and mark the queue entry skip. |
| `30 °C or above is a heat cure` | Change category to `heat`. |
| warning `quoted text does not name "<material>"` | Fine when the quote is a shared design sentence; otherwise quote better. |
| warning `age … is not visible` | Add `ageText`. |

## Finish (once per batch)

1. `npm run mixes -- check` → all sheets pass.
2. `npm test` and `npm run build` → both pass.
3. `npm run mixes -- stats` → update the "Mix table" lines in `HANDOFF.md` (rows, papers,
   sheets) and list the sheets you added or skipped.
4. Commit on a branch: `Add mix sheets: <ids>`; push following the publication rule in `HANDOFF.md`.

Worked examples: `research/mix-sheets/one-part-admixture-compatibility.json` (mass parts,
inherited base mix, null doses, setting time) and
`research/mix-sheets/rap-geopolymer-grout-versus-composite.json` (percent shares, liquid/solid
parameter, flow time, `ageText`, finding and failure note).
