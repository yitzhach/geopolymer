# Mix sheet standard

Version `mix-sheet-v1` (rules revised 23 October 2026 after two test runs by a smaller model; source-text procedure added 26 October 2026). Applies to every file in `research/mix-sheets/`.
The step-by-step runbook is `.claude/skills/mix-sheet/SKILL.md`.

## Purpose

The Mix Explorer (`/mixes`) shows one row per **mix**, not per paper, so that people can
filter, chart, line up and find overlapping mixes across papers. Its rows come from three
places:

| Source | Rows | Evidence label |
|---|---|---|
| Knowledge pilot (`src/knowledge-pilot.js`) | typed mixes and results | Source-checked by AI |
| Formulation catalog (`src/literature-mixes.js`) | recipes with ingredient ledgers | Source-checked by AI |
| **Mix sheets** (`research/mix-sheets/<guideId>.json`) | typed versions of a deep dive's reviewed notes | From review note |

`npm run build` compiles all three into `dist/mixes.json` and the `/mixes` page. Pilot rows win
when a catalog recipe describes the same mix; the recipe then contributes its ledger and link.
The table is a derived view: it never stores a fact that is not in one of those sources.

## Two modes

1. **review-note** (default; safe for a smaller model). The sheet turns text that is *already
   reviewed and published* for one deep dive into typed fields. Allowed text is exactly what
   `npm run mixes -- context <guideId>` prints. No paper is opened. The checker verifies that
   every quote exists in that text and every number exists in its quote.
2. **source-text** (needs a stronger reviewer). Values come from the paper itself. Follow
   `SUMMARY_DEEP_DIVE_STANDARD.md` access rules: at most 5 papers and 40 operations per batch,
   no access-control bypass, an audit file in `research/batches/`, and `sourceUrl`, `accessed`
   and `audit` on the sheet. Quotes cannot be checked against the repository, so a second
   reviewer must check every value against its locator before release.

## File shape

One JSON file per deep dive, named `<guideId>.json`. All arrays are required (use `[]`).

```json
{
 "format": "mix-sheet-v1",
 "guideId": "<deep-dive id>", "doi": "<same DOI as the guide>",
 "basis": "review-note", "scope": "<which mixes this sheet covers and which it does not>",
 "made": "YYYY-MM-DD", "madeBy": "AI transcription · mix-sheet skill v1",
 "materials": [{"id","family","role","name","aliases?","detail?"}],
 "mixes": [{"id","aliases?","control","form","cure","baseMix?","baseText?","quantities":[],"parameters":[],"missing?":[]}],
 "cures": [{"id","category","temperatureC","duration","durationUnit","sealed","humidityPercent","text"}],
 "tests": [{"id","property","unit","specimen","method","text?","propertyNote?"}],
 "results": [{"mix","test","value","ageDays","ageNote?","ageText?","condition?","qualifier?","valueMax?","spread?","text","locator?"}],
 "findings": [{"goal","mix","text"}],
 "notes": [{"mix","kind","text"}],
 "gaps": ["<what is still missing>"]
}
```

- **quantity**: `{"material","value","unit","basis","basisNote?","missing?","text"}`. `value` is a
  number or `null`; `null` needs `missing` and may omit `unit` and `basis`. Listing a named
  activator with `null` tells the site its family (sodium, potassium) without inventing an amount.
- **parameter**: `{"key","value","basisNote?","text"}` for design settings that are not ingredient
  amounts (molarity, modulus, liquid/solid, water/binder, silicate/hydroxide, alkali dose, Si/Al …).
  `basisNote` records an unstated mass/volume/molar basis.
- **baseMix/baseText**: a variant inherits its base mix's quantities and parameters when
  `baseText` quotes either a sentence saying the base proportions are shared, or the single design
  table whose labelled variants only add an ingredient (then a gap records that reading). One
  level only; the variant's own entries override.
- **condition**: a quoted sub-condition of a result (exposure arm, slice, direction, cure arm).
- **findings**: only when the notes state that a mix is best or selected *for a goal*.
- **notes**: `failure`, `tradeoff` or `observation` statements about one mix (failed setting,
  poor penetration, a strength penalty). Failures matter as much as successes.

Closed vocabularies live in `src/mix-table.js`: `FAMILIES` (material family → default role),
`UNITS`, `BASES`, `PARAMETERS`, `PROPERTIES` (with allowed units), `CURE_CATEGORIES`, `FORMS`,
`QUALIFIERS`. Add a vocabulary entry only in a reviewed code change with a test, never inside a sheet.

## Rules

1. **Quote, never compose.** Every `text` is an exact fragment of the allowed source text.
   Whitespace, case, dashes, quotes and `×` are normalized; nothing else is.
2. **Every number appears in its own quote.** Quantity and parameter values, `valueMax`,
   `spread`, `temperatureC`, `duration` and `humidityPercent` must each appear in the quoted
   `text`. Ranges and bounds ("15–25 °C", "RH ≥ 95%") stay `null`; the quote keeps them.
3. **Unknown stays unknown.** Use `null` plus a reason. Never `0`, never an estimate, never a
   value converted or calculated by you. The compiler computes precursor shares; you do not.
4. **Names are grounded.** A mix id (or alias), and a material name (or alias), must appear in
   the allowed text as a whole name. A label names one specific condition; group phrases and
   bare levels ("higher-MK mortar", "10, 30, 50 wt% slag") are not labels. A paper with no label
   is skipped in review-note mode. Do not invent labels such as "Mix 2" or "GPC30".
5. **Attribution is explicit.** A result's quote must name its mix. When a sentence compares two
   mixes, re-read it to confirm each number belongs to the mix you assigned.
6. **Keep conditions separate.** Curing, test age and exposure time are different clocks. A
   fresh test (flow, setting) has `ageDays: null` with `ageNote`. Grout, paste, mortar and
   composite results are different forms.
7. **No duplicate coverage, no held sources.** A DOI already structured in the catalog or pilot
   gets no sheet; neither does a guide on a correction hold or one without its own physical mixes.
8. **Partial is normal.** `scope` says which mixes are covered; `gaps` says what is missing.
9. **No model names** in any repository file; use the tool label above.

## Source-text procedure (pilot, 26 October 2026)

Proven on five skipped fly-ash/slag guides; record in
`research/batches/source-text-pilot-2026-10-26.json`.

1. **Route.** `npm run mixes -- source <guideId>` looks up the guide's DOI in the Europe PMC
   REST search and, for an open-access CC BY copy, downloads the full text as JATS XML from the
   Europe PMC API (two logged operations). It saves the paper outside the repository (OS temp
   folder, `geopolymer-sources/`) and lists its tables. Re-running it re-parses the saved copy
   without a download; `--refresh` downloads again. The PMC and publisher websites are not
   scraped: PMC answered rapid page requests with a browser challenge and MDPI's CDN answers
   "Access Denied". A challenge, a closed paper or a missing full text stops the command; record
   it as failed access and defer the paper. Never retry or work around it.
2. **Rights.** Only open-access papers under a CC BY licence (checked by `source`). The saved
   paper stays outside the repository and is deleted after review; the repository keeps only the
   short quotes that carry each value.
3. **Bound.** Every paper opened counts toward the five-paper batch, including one later
   judged to have no usable numbers; do not swap in a sixth paper. Each `source` download is two
   operations of the batch's forty.
4. **Quotes.** Prose: an exact fragment of the paper. Tables: built by `npm run mixes -- quote
   <guideId> <table> <row> [--cols …]` (or `tableQuote` in a generator) in the form
   `Table N (caption): header | header → cell | cell`. Stacked header rows are joined per column
   (`MCA-ACBFS Water/Binder 0.45`); cells spanning several rows or columns are named in a trailing
   `[spanning cells: …]`; where mixes are columns, the quote joins the label row and the design
   row with ` ; `. `npm run mixes -- tables <guideId>` prints every table with row indexes.
5. **No hand typing.** Write a generator in `research/mix-sheets/generators/<guideId>.mjs` (see
   its README) that reads table cells, checks the headers and labels it relies on, and writes the
   sheet. Values read off figures are never entered; text ranges without a mix label stay in
   `gaps`.
6. **Grounding check.** `npm run mixes -- ground <guideId>`: every prose quote must occur in the
   paper text and every table quote's cells must sit in one row of the named table. It must
   report 0 not grounded before review.
7. **Second review.** An independent reviewer, given the attribution listing
   (`check --audit`) and the saved paper (`tables` output and text), checks every value against the row/column or sentence
   of the source for the right mix, property, age and cure. Fix or remove each disputed value,
   record the review in the batch audit, then release. AI review is not human/domain review.
8. **Source contradictions** (row counts that differ from the text, ratio labels that do not
   match the table, misnamed tables) go into `gaps` verbatim; the sheet never repairs them.

## What the checker enforces

`npm run mixes -- check [file] [--audit]` (also run by `npm test` and `npm run build`):
identity and file name, closed vocabularies, unit–basis fit, property units, grounded quotes,
numbers inside quotes, grounded mix/material names, mix named in each result quote,
`null` with a reason, base-mix rules, cure category versus temperature, duplicate ids and
duplicate DOI coverage, correction holds and model-only guides. Warnings flag likely problems
(unused materials, unnamed material in a quantity quote, age not visible in the quote). Once a
sheet passes, `--audit` prints every quantity, parameter, result, cure, finding and note beside
its quote for the attribution check that software cannot do.

## What the compiler derives (and labels as derived)

Precursor system and shares (only when every listed precursor amount shares one unit and mass
basis), activator family (from activator material families), fiber and additive lists,
inherited base quantities, and cure hours. Cross-paper views never pool, rank or average results.
