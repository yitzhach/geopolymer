# Mix sheet standard

Version `mix-sheet-v1` · 22 October 2026. Applies to every file in `research/mix-sheets/`.
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
 "mixes": [{"id","aliases?","control","form","cure","baseMix?","baseText?","quantities":[],"parameters":[],"missing?"}],
 "cures": [{"id","category","temperatureC","duration","durationUnit","sealed","humidityPercent","text"}],
 "tests": [{"id","property","unit","specimen","method","text?","propertyNote?"}],
 "results": [{"mix","test","value","ageDays","ageNote?","ageText?","qualifier?","valueMax?","spread?","text","locator?"}],
 "findings": [{"goal","mix","text"}],
 "notes": [{"mix","kind","text"}],
 "gaps": ["<what is still missing>"]
}
```

- **quantity**: `{"material","value","unit","basis","basisNote?","missing?","text"}`. `value` is a
  number or `null`; `null` needs `missing`.
- **parameter**: `{"key","value","text"}` for design settings that are not ingredient amounts
  (molarity, modulus, liquid/solid, water/binder, silicate/hydroxide, alkali dose, Si/Al …).
- **baseMix/baseText**: a variant may inherit its base mix's quantities when `baseText` quotes the
  sentence that says the base proportions are shared. One level only; own quantities override.
- **findings**: only when the notes state that a mix is best or selected *for a goal*.
- **notes**: `failure`, `tradeoff` or `observation` statements about one mix (failed setting,
  poor penetration, a strength penalty). Failures matter as much as successes.

Closed vocabularies live in `src/mix-table.js`: `FAMILIES` (material family → default role),
`UNITS`, `BASES`, `PARAMETERS`, `PROPERTIES` (with allowed units), `CURE_CATEGORIES`, `FORMS`,
`QUALIFIERS`. Add a vocabulary entry only in a reviewed code change with a test, never inside a sheet.

## Rules

1. **Quote, never compose.** Every `text` is an exact fragment of the allowed source text.
   Whitespace, case, dashes, quotes and `×` are normalized; nothing else is.
2. **Every number appears in its own quote.** `value`, `valueMax`, `spread`, `temperatureC`,
   `duration` and `humidityPercent` must each appear in the quoted `text`.
3. **Unknown stays unknown.** Use `null` plus a reason. Never `0`, never an estimate, never a
   value converted or calculated by you. The compiler computes precursor shares; you do not.
4. **Names are grounded.** A mix id (or alias), and a material name (or alias), must appear in
   the allowed text as a whole name. Do not invent labels such as "Mix 2" or "GPC30".
5. **Attribution is explicit.** A result's quote must name its mix. When a sentence compares two
   mixes, re-read it to confirm each number belongs to the mix you assigned.
6. **Keep conditions separate.** Curing, test age and exposure time are different clocks. A
   fresh test (flow, setting) has `ageDays: null` with `ageNote`. Grout, paste, mortar and
   composite results are different forms.
7. **No duplicate coverage.** A DOI already structured in the catalog or pilot gets no sheet.
8. **Partial is normal.** `scope` says which mixes are covered; `gaps` says what is missing.
9. **No model names** in any repository file; use the tool label above.

## What the checker enforces

`npm run mixes -- check [file] [--audit]` (also run by `npm test` and `npm run build`):
identity and file name, closed vocabularies, unit–basis fit, property units, grounded quotes,
numbers inside quotes, grounded mix/material names, mix named in each result quote,
`null` with a reason, base-mix rules, cure category versus temperature, duplicate ids and
duplicate DOI coverage. Warnings flag likely problems (unused materials, unnamed material in a
quantity quote, age not visible in the quote). `--audit` prints every value beside its quote for
the attribution check that software cannot do.

## What the compiler derives (and labels as derived)

Precursor system and shares (only when every listed precursor amount shares one unit and mass
basis), activator family (from activator material families), fiber and additive lists,
inherited base quantities, and cure hours. Cross-paper views never pool, rank or average results.
