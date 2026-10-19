# Rules per content type

Risk rises with length, closeness to a single source, and commercial sale.
Set `type` on every item. Lengths and per-type limits in the table are
editorial guidance; the checker enforces the global quote limits, protocol
locators, and the e-book rules (commercial by default, human review,
source concentration). Run `--strict` before releasing an e-book: drafts
only warn about a missing review.

| Type | Typical length | Sources | Quotes | Figures | Extra requirements |
|---|---|---|---|---|---|
| `card` | 1–3 sentences | 1 | none | none | Original sentence(s); link title/DOI to the publisher |
| `summary` | ≤ ~300 words | 1 | rare, ≤ 1 | link, don't embed | Selective: what matters to your reader, not every section |
| `deep-dive` | 800–3,000 words | 1–3 | ≤ 3 per source | licensed or original-from-data | Facts carry locators; your own analysis, arithmetic and caveats lead |
| `article` | any | 2+ | ≤ 3 per source | licensed or original-from-data | Cross-study argument, structured by your question |
| `protocol` | recipe, method or procedure | 1+ | none needed | original-from-data | Quantities/conditions carry locators; step wording is your own; safety and evidence limits stated |
| `ebook` | long | many | ≤ 3 per source, ≤ 10% overall | licensed for commercial use, or original | Treated as commercial by default; human `rightsReview` before release; `--strict` run |

## Cards and summaries

- Write the finding in plain words you chose. Don't start from the abstract's
  first sentence and swap synonyms; that is still copying structure.
- Name the authors when verified; otherwise link to the full authorship record.
- Say what evidence level you worked from ("abstract-level note").

## Deep dives

- Lead with your own framing: why this matters, what to check, what is
  missing. The source's facts support your analysis, not the other way round.
- Report only the facts the analysis needs, each with a locator.
- Calculations you derive are yours; show inputs and their locators.
- Holds and caveats ("not reproduced", "single batch") are part of the value.

## Articles

- Organize by question, not by paper. Paragraphs should combine sources.
- When sources disagree, say so and explain possible reasons.

## Protocols (recipes, methods, procedures)

- Ingredient lists, proportions, temperatures and times are facts; record
  each with a locator (table, section, example number). The checker requires
  at least one located claim per source.
- Write method steps in your own words and order them for your reader. Don't
  copy a paper's methods section or a patent example's prose.
- Say what the source did not report (unknown assays, unspecified mixing)
  rather than filling gaps silently, and keep safety notes current.
- Proposed changes are experiments, not recipes with established results.

## E-books

E-books are where an "abridgement" or "compilation" argument is most likely,
so they get extra structure:

- Build chapters around themes and your synthesis. A chapter that walks
  through one paper section by section is a red flag (the checker warns when
  one source supplies over 40% of a chapter's claims).
- Prefer one item per chapter so concentration and quote share are measured
  per chapter.
- Figures must be licensed for commercial reuse (CC BY, CC BY-SA, CC0, public
  domain, or written permission covering commercial use) or be your own
  original charts. CC BY-NC material cannot go in a sold e-book.
- Keep an evidence pack outside the public build: ledger snapshot, rights
  evidence screenshots/URLs with dates, permissions, the checker report.
- A person signs off (`rightsReview: {by, date}`); before a first sale,
  have an IP lawyer review the policy and one sample chapter.
- Free e-books can still be risky: being free helps a fair-use argument but
  doesn't make copying lawful. Apply the same rules.

## AI-assisted writing

- Set `aiAssisted: true` and label it on the page.
- AI models can reproduce source text from context; the overlap check against
  cached source text exists for this. Run it on AI drafts before publishing.
- Never let an AI fill `rightsReview` or claim human review.
