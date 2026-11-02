# Source-text sheet generators

One script per source-text sheet. Each reads the saved open-access paper
(`npm run mixes -- source <guideId>`, kept outside the repository) and rewrites
`research/mix-sheets/<guideId>.json`, so every table value is copied from a parsed
table cell and every table quote is built by `tableQuote` — never typed.

```
npm run mixes -- source <guideId>          # Europe PMC lookup + full-text XML (counts toward the batch bound)
node research/mix-sheets/generators/<guideId>.mjs
npm run mixes -- check research/mix-sheets/<guideId>.json --audit
npm run mixes -- ground <guideId>          # every quote against the saved paper
```

Prose quotes are written into the generator as exact fragments; `ground` verifies them.
A generator throws if a table cell it expects is missing or different, so a re-run
against a changed or misparsed source cannot silently produce a different sheet.
Procedure and rules: `MIX_SHEET_STANDARD.md`, "Source-text procedure".
