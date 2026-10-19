# Bundle data model

The checker reads `{ sources: Source[], items: Item[] }`, either from two
JSON files or from an adapter module (`export default async ({root, config})
=> ({sources, items})`).

## Source

```jsonc
{
  "id": "smith-2024-mk",                    // required, unique
  "title": "…",                             // required
  "authors": "A. Smith, B. Lee",
  "doi": "10.1234/abcd",                    // doi or https url required
  "url": "https://doi.org/10.1234/abcd",
  "license": "CC-BY-4.0",                   // required: CC-BY[-NC][-ND|-SA][-x.y], CC0-1.0,
                                            //   public-domain, all-rights-reserved, unknown
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
  "rightsEvidence": "Stated on article page, PMC copyright notice",  // required for open licenses
  "checked": "2026-10-19",                  // required
  "access": "open-full-text",               // required: metadata-only | abstract |
                                            //   open-full-text | licensed-full-text
  "permission": { "grantedBy": "…", "date": "…", "evidence": "…", "scope": ["reproduce","adapt","commercial"] },
  "operations": {                          // optional per-operation decisions: allowed | denied | unknown
    "publicDisplay": { "decision": "allowed", "reason": "CC BY 4.0 notice checked" },
    "aiTransmission": { "decision": "denied", "reason": "…" }
  }   // keys: access, download, processing, rawRetention, aiTransmission, embedding, publicDisplay, export
}
```

## Item

```jsonc
{
  "id": "mk-freeze-thaw",                   // required, unique
  "type": "deep-dive",                      // card | summary | deep-dive | article | protocol | ebook
  "status": "published",                    // "draft" downgrades the human-review error
  "commercial": false,                      // default false; ebooks default true
  "aiAssisted": true,                       // required boolean
  "text": "All public prose of the item…",  // required; everything a reader sees
  "sources": ["smith-2024-mk"],             // required
  "claims": [{ "source": "smith-2024-mk", "locator": "§2.2; Table 3" }],
  "quotes": [{ "text": "exact words", "source": "smith-2024-mk", "locator": "p. 4" }],
  "figures": [{
    "id": "fig-1", "mode": "original-from-data",   // reproduced | adapted | original-from-data
    "sources": ["smith-2024-mk", "lee-2023"],
    "dataLocator": "Smith Table 3; Lee Fig. 4 (digitized)",
    "attribution": "Chart by us from values in …",
    "license": "CC-BY-4.0"                  // figure-specific rights, if different
  }],
  "tables": [{ "id": "t-1", "mode": "selected-values", "source": "smith-2024-mk", "locator": "Table 2" }],
  "rightsNote": "Original synthesis of …",  // required
  "rightsReview": { "by": "Person name", "date": "2026-10-19" }  // required for commercial/ebook
}
```

## Finding codes

| Code | Level | Meaning |
|---|---|---|
| SRC_FIELD / SRC_URL / SRC_ACCESS / SRC_CHECKED | error | Incomplete or invalid ledger entry |
| SRC_LICENSE | error | Unrecognized license identifier |
| SRC_LICENSE_VERSION | warning | CC license without version |
| SRC_LICENSE_MISMATCH | error | `licenseUrl` names a different license than `license` |
| SRC_OPERATION | error | Unknown operation key or decision value |
| SRC_OPERATION_DENIED | error | A public item draws on a source whose `publicDisplay` is denied |
| FIG_OPERATION / TABLE_OPERATION | error | Reproducing/adapting from a source with operations recorded but `publicDisplay` not allowed |
| SRC_ID / SRC_DUPLICATE / ITEM_ID / ITEM_DUPLICATE / ITEM_TYPE | error | Missing or duplicate ids; unknown item type |
| SRC_RAW_TEXT | error | Ledger entry carries `abstract`, `fullText`, `sourceText`, `rawText`, `pdf` or `html` |
| QUOTE_ACCESS | error | Quote from a metadata-only source |
| FIG_RIGHTS_STALE | warning | Figure reuse relies on rights checked more than `maxRightsAgeDays` (400) ago |
| EBOOK_NONCOMMERCIAL | warning | E-book overrides the commercial default |
| SRC_EVIDENCE | error | Open license relied on without saying where it is stated |
| SRC_PERMISSION | error | Incomplete permission record |
| ITEM_TEXT / ITEM_AI_LABEL / ITEM_RIGHTS_NOTE / ITEM_NO_SOURCES | error | Missing required item fields |
| ITEM_RAW_TEXT | error | Item carries `abstract`, `fullText`, `sourceText`, `rawText`, `pdf` or `html` |
| ITEM_UNKNOWN_SOURCE | error | Reference not in the ledger |
| ITEM_UNCITED_SOURCE | warning | Used in a claim/quote/figure but not listed in `sources` |
| CLAIM_LOCATOR / CLAIM_ACCESS | error | Claim without locator, or locator into a metadata-only source |
| PROTOCOL_LOCATOR | error | Protocol cites a source without any located claim |
| QUOTE_LONG / QUOTE_LOCATOR / QUOTE_SHARE / QUOTE_UNDECLARED | error | Quote rules |
| QUOTE_MANY / QUOTE_ABSENT | warning | Many quotes from one source; declared quote not found in text |
| FIG_* / TABLE_* | error/warning | Mode, attribution, locator and license-matrix checks |
| FIG_RIGHTS_INHERITED | warning | Figure assumed to share its article's license |
| FIG_SINGLE_SOURCE | warning | Original chart from one source may mirror its design |
| HUMAN_REVIEW | error (warning for drafts) | Commercial/e-book item without a person's rights review |
| EBOOK_FEW_SOURCES / EBOOK_CONCENTRATION | warning | E-book leans on too few sources |
| OVERLAP | error ≥ 12 words, warning ≥ 8 | Shared consecutive words with cached source text |

## Options (defaults)

`quote.maxWords` 40 · `quote.maxPerSourcePerItem` 3 · `quote.maxShare` 0.1 ·
`quote.detectMinWords` 6 (shorter quoted passages are not flagged) ·
`overlap.warnRun` 8 · `overlap.errorRun` 12 · `ebook.minSources` 3 ·
`ebook.maxSourceShare` 0.4 (checked once an e-book has ≥ 5 claims) ·
`maxRightsAgeDays` 400 · `commercialDefault` false.

Straight double quotes count as quotation marks only when they open after a
space or bracket and close before punctuation or a space, so inch marks are
ignored. Declared quotes are removed as whole-word sequences before the
overlap check.
