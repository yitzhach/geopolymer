---
name: research-rights-guard
description: Copyright and source-rights guardrails for turning research papers, patents, datasets and web sources into published summaries, deep dives, articles, recipes/protocols, e-books, charts or tables. Use whenever writing, editing or reviewing content derived from someone else's research; whenever quoting, reusing or redrawing a figure, chart, graph or table; whenever pulling papers or web text (APIs, scraping, PDFs); and before publishing or selling long-form work. Enforces original writing, short attributed quotes, license-aware figure/table reuse, a per-source rights ledger and a build-time checker. Not legal advice.
---

# Research rights guard

Goal: publish useful, original work built on other people's research while
pointing readers back to the authors, and keep a record that shows each use
had a basis. This skill reduces risk; it cannot guarantee non-infringement.
Fair use and copyright exceptions are judged case by case and differ by
country. Say so plainly whenever someone asks for a guarantee, and recommend
a qualified IP lawyer before selling long-form products.

## The five rules

1. **Facts are free; expression is not.** Extract findings, numbers, methods
   and conditions. Never copy the author's sentences, structure or narrative
   order. Abstracts, highlights and figure captions are expression.
2. **Write from notes, not from the open source.** Close the source, write
   from your extracted facts and locators, then compare. This is the single
   most effective guard against accidental paraphrase-copying.
3. **Don't substitute for the original.** A summary should make a reader
   want the paper, not replace it. Cover what matters to your audience,
   not every section in order. Cross-study synthesis is the safest and most
   valuable form.
4. **Images and tables have their own rights.** Charts, diagrams, photos and
   whole tables are reused only under a license or permission that covers the
   exact use (see `references/figures-and-tables.md`). Otherwise extract the
   values and draw your own chart in your own design, ideally across studies.
5. **Always point back.** Every item lists its sources; every specific claim
   has a locator (section/page/table/figure); every quote and figure carries
   attribution. Label AI-assisted writing.

## Workflow for any content item

1. **Ledger first.** Make sure every source is in the rights ledger with
   license, rights evidence, access level and checked date
   (`references/sourcing-and-access.md`). Unknown license is fine for facts
   only; it blocks figure/table reuse.
2. **Extract** facts with locators. Record what you read: `metadata-only`,
   `abstract`, `open-full-text` or `licensed-full-text`. A locator into a
   section you could not read is a false claim.
3. **Write** original prose from the notes. Rules per format are in
   `references/content-types.md` (cards, summaries, deep dives, articles,
   protocols/recipes, e-books).
4. **Quote sparingly.** Only when the exact wording matters. Short (default
   ≤ 40 words), in quotation marks, with author and locator, declared in the
   item's `quotes` list, ≤ 10% of the item.
5. **Figures/tables:** pick a mode — `reproduced`, `adapted` or
   `original-from-data` — and check it against the license matrix.
6. **Rights note.** Fill `rightsNote` for the item using the template below.
7. **Run the checker** and fix every error. Warnings need a decision, not
   silence.
8. **Commercial or e-book items** need `rightsReview: {by, date}` from a
   person before release. Never fill that field on a person's behalf.

## Rights note template

> Original [summary/synthesis] of [N] sources. Facts from [sections/tables
> read]; [no / N short] quotations with locators. Figures: [none /
> reproduced under CC BY 4.0 with attribution / original chart from values in
> Table X of A and Table Y of B]. Tables: [selected values only / …]. Access:
> [abstract-level / open full text]. AI-assisted: [yes/no].

## The checker

`scripts/check-rights.mjs` validates a `{sources, items}` bundle (schema in
`references/data-model.md`):

```bash
node .claude/skills/research-rights-guard/scripts/check-rights.mjs --config rights-guard.config.json
# installed for every project instead:
node ~/.claude/skills/research-rights-guard/scripts/check-rights.mjs --config rights-guard.config.json
#   --json     machine-readable report
#   --strict   fail on warnings too (use before releasing an e-book)
#   --quiet    print errors only
```

It fails on: missing provenance or license evidence; undeclared, long or
unlocated quotes; quotes over the item share limit; raw source text fields
(`abstract`, `fullText`, …); figure/table reuse the license doesn't allow
(NC in commercial items, adapting ND, all-rights-reserved without
permission); claims with locators into metadata-only sources; commercial or
e-book items without a human rights review. When a private cache of source
text is available it also flags runs of ≥ 12 shared consecutive words
(warning from 8). Thresholds are review aids, not legal standards.

Keep the source text cache out of Git (e.g. a gitignored `work/rights-cache/`
with one `<source-id>.txt` per source). CI without the cache still runs every
structural check; run with the cache locally before publishing long-form work.

## Setting up in a project

1. Copy this folder to `<repo>/.claude/skills/research-rights-guard/` (or to
   `~/.claude/skills/` for every project).
2. Create `rights-guard.config.json` at the repo root. Either point at two
   JSON files:
   ```json
   { "sources": "rights/sources.json", "items": "rights/items.json",
     "cacheDir": "work/rights-cache", "options": { "commercialDefault": false } }
   ```
   or at an adapter module that maps your content into the bundle:
   ```json
   { "adapter": "scripts/rights-adapter.mjs", "cacheDir": "work/rights-cache" }
   ```
   Working example: `examples/`.
3. Add the checker to the test or build command so violations block merges.

## What never to do

- Bypass paywalls, logins, rate limits, CAPTCHAs or robots/ToS blocks.
- Download or hotlink figures automatically.
- Store PDFs, full text or abstracts in a public repo, build or CI artifact.
- Treat "publicly visible" or "open access" as permission to reuse. Check the
  actual license; a figure inside a CC BY paper can be third-party material.
- Tell anyone the content is "100% safe" or "legally cleared" on the basis of
  these checks.
