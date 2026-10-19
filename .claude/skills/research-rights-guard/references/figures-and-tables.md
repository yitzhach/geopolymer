# Figures, charts and tables

A chart's data points are facts; its visual design (selection, layout,
styling, annotation) is protected expression. A photo or diagram is fully
protected. A table's individual values are facts, but a whole table can be
protected for its selection and arrangement, and in the EU/UK a database can
carry separate database rights.

## Three modes

| Mode | Meaning | Allowed when |
|---|---|---|
| `reproduced` | The original image or full table, unchanged | License or permission covers reproduction (and commercial use if the item is commercial) |
| `adapted` | Cropped, recolored, relabeled, combined or redrawn closely after the original | License or permission covers adaptation; not ND |
| `original-from-data` | Your own chart built from extracted values, in your own design | Every value has a `dataLocator`; source was actually read (not metadata-only) |

For tables, `selected-values` (the specific numbers you need, with locators)
is the default and needs no license.

## License matrix

| License | Reproduce | Adapt | In commercial item | Obligations |
|---|---|---|---|---|
| Public domain / CC0 | yes | yes | yes | Credit anyway as good practice |
| CC BY | yes | yes | yes | Attribution: title, author, source link, license link, note changes |
| CC BY-SA | yes | yes | yes | Attribution; adapted figure must use the same license |
| CC BY-ND | yes (unchanged) | **no** | yes | Attribution; no modification at all, including cropping |
| CC BY-NC | yes | yes | **no** | Attribution; non-commercial only |
| CC BY-NC-SA | yes | yes | **no** | Attribution; share alike; non-commercial |
| CC BY-NC-ND | yes (unchanged) | **no** | **no** | Attribution; non-commercial; unmodified |
| All rights reserved / unknown | **no** | **no** | **no** | Needs written permission (publisher permission service or rights holder) |

Record permission on the source or figure:

```json
"permission": { "grantedBy": "Publisher X via RightsLink", "date": "2026-10-19",
  "evidence": "work/rights-evidence/license-123.pdf",
  "scope": ["reproduce", "commercial"] }
```

## Traps

- **Third-party figures inside open papers.** A CC BY article can contain a
  figure "reproduced with permission from …". That figure is not CC BY. Read
  the caption; set `figure.license` explicitly. The checker warns whenever a
  figure inherits its article's license.
- **Close redraws.** Re-plotting one source's chart with the same axes,
  series, ordering and annotations can still be an adaptation. Use your own
  design and, better, combine several studies or add your own analysis. The
  checker warns on single-source original charts.
- **Digitized values.** Values read off a graph are estimates. Label them
  as such, store calibration, and keep them separate from reported numbers.
- **Supplementary data** may carry a different license from the article.
- **Hotlinking** (embedding the publisher's image URL) is still displaying
  their work. Don't.

## Attribution format

`Figure adapted from [Title] by [Authors], [Journal] ([Year]),
[DOI link], licensed under [CC BY 4.0 link]. Changes: [recolored, axis
relabeled].`

For original charts: `Chart by [site] from values reported in [Author Year,
Table 2] and [Author Year, Fig. 4 (digitized estimate)].`
