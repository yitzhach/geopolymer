# Research database and GP Journal

Updated 10 October 2026. This release adds 20 dated journal publications to the
existing 39 references, plus four original AI-assisted editorial articles. The reviewed PR #3 additions
bring the current totals to 61 references (22 with discovery summaries) and five
journal articles.
The new selection covers 7 September–9 October 2026. It is a recent verified
selection, not a claim to exhaustively rank the world's newest 20 papers.

## Data and publishing

- `src/research-updates.js`: stable ID, DOI, primary publisher URL, actual
  publication/online date, publication status, summary, highlights, check date.
- `src/research-library.js`: merges the original stable library IDs and new data;
  filters title, author where recorded, summary, highlights, journal, DOI and topic.
- `src/journal-data.js`: original articles with explicit IDs linking to sources.
- `src/journal.js`: searchable journal index and crawlable article routes.
- `src/research-feeds.js`: database JSON, RSS and JSON Feed exports.
- The build writes `/research-library.json`, `/journal/feed.xml`, and
  `/journal/feed.json`. Feeds change with published articles, not on every visit.
- Publishing is Git-backed: edit records, run checks, merge main, verify the
  Cloudflare build ID and live routes. No public editor or shared database backend.

## Editorial policy

Use brief original factual summaries and links, not copied abstracts, publisher
highlights, figures or full papers. Distinguish research, reviews, accepted early
access and journal pre-proofs. Do not turn a study summary into an executable
recipe or validated performance claim. AI-assisted editorial content is labeled.
Authors are credited where verified; other cards link the full title and DOI to
the publisher's complete authorship record. No guest interviews or podcast audio
are claimed; the podcast entry is explicitly reading notes.

Search cutoff: 10 October 2026. Primary publisher pages and indexed publisher
abstract/overview text were checked through web search. Some publisher pages
returned rate limits; those notes rely on their indexed text. No claim of full
methods audit. The latest Materials paper's DOI was marked as registering, so the
reading link uses the publisher landing page directly. First-online dates take
precedence over future issue labels. Older records keep their cited year.

## Daily research workflow

A daily research task can check new publisher records against the stable DOI
catalog and prepare a source-linked briefing. No fixed quota: do not manufacture
news or reissue the same paper. Keep article publication dates separate from
source publication dates. Recheck corrections/retractions, record limitations,
and label any preprint separately. Prepare a reviewable source update and run
available build/browser checks before release. A task schedule does not itself
create a server-side AI endpoint, public CMS, or guaranteed unattended deployment.

## Source register

Each of the 20 records contains the primary URL, DOI, publication date, status,
summary basis and check date. The public downloadable JSON preserves those
fields. Reader-facing citations in the journal link directly to those records'
publishers. No publisher images or full-text copies are stored in the repository.

## Checks

`npm test` checks source identities, date bounds, search coverage, article source
references, routes and feed membership, along with calculator and notebook
regressions. Browser CI exercises filtered search, reset, reading notes, article
navigation, JSON/RSS endpoints and desktop/mobile page width. Existing browser
checks also cover recipe scaling, calculator transfer and notebook preservation.

## 10 October daily draft review

Integrated both records and the briefing from PR #3 (11d7464), preserving IDs.
Rechecked publisher titles, authors, version-of-record dates and abstract claims
for DOI 10.1007/s12633-026-03820-2 and 10.1617/s11527-026-03289-w.
Summaries remain abstract-level discovery notes; no full methods audit or
independent replication is claimed. Removed the briefing’s pending-review text.
The JSON in research-drafts remains the original historical submission, not a
runtime content source. Its integration instructions describe the earlier main.

## Phase A review-branch extension — 12 October 2026
Library now has 86 records: original 61 plus 25 DOI-verified additions. The first
five additions have rights-recorded partial experimental extractions; the other
20 are metadata-only. New study routes and /knowledge connect to the existing
catalog. Public numerical data, review manifests and conservative reuse policy
are documented in KNOWLEDGE_ENGINE.md. HANDOFF.md tracks tests and publication.

## 13 October 2026 bibliography extension

Current library: 111 unique references; 25 new metadata-only additions are recorded
in `research/batches/breadth-2026-10-13.json`. The earlier 22 discovery summaries and
five GP Journal articles are unchanged. Five experimental papers remain partially
extracted. Per-record check dates and scope notes govern evidence depth; the
feed's checked date identifies the catalog update, not a re-audit of all records.
Two new references have Crossref correction links, visible on their cards/study
pages and excluded from assistant evidence pending review. No full-text operation
is authorized by a metadata record alone. See KNOWLEDGE_ENGINE.md for current
counts and HANDOFF.md for verification/publication.

## 13 October — two further breadth batches

Library now contains 161 unique DOI records (50 new metadata-only additions).
All prior IDs and 275 experimental cells remain unchanged. See batch manifests
`research/batches/breadth-3-2026-10-13.json` and `breadth-4-2026-10-13.json` for
exact metadata, source dates, scope and idempotent importer results. Topics broaden
to fibers/repair, precursors, efflorescence/acid exposure and phosphate systems.
No full-text extraction, numerical performance, human review or supplier claims.
Five pilot papers remain partial. Correction follow-up records partial progress
and retained assistant holds. HANDOFF.md records current QA/publication status.

## OpenAlex discovery milestone — 14 October 2026

A private discovery adapter and resumable review queue now precede editorial
integration. See OPENALEX_PIPELINE.md. Synthetic-response tests pass; live API
access remains blocked by environment configuration. Queued/accepted candidates
are not published or source-verified records. All existing scientific counts and
partial-extraction limits remain unchanged. No schedule or AI provider was added.

## 14 October — accessible-source and materials research scout

Extend discovery with OA-only searches, alternate location/version/license hints,
citation leads and existing-record access enrichment. All links remain unchecked;
no full-text fetcher or permission upgrade. RESEARCH_SCOUT.md defines interactive
materials comparisons, contradictory-evidence searches and hypothesis/test planning,
with nine search families and explicit grade/processing/method boundaries. Current
OpenAlex guidance says Unpaywall uses the same underlying data; it is not independent
OA verification. Google Scholar remains a manual seed source. Three web-tool access
checks are recorded in research/batches/scout-access-2026-10-14.json. Catalog and
measurements unchanged; cloud API and unattended synthesis remain unconfigured.


## 16 October 2026 — research topic notes

`src/research-topics.js` supplies `/research/hemp-geopolymers`, linked from research,
library and site search. Eight leads are separate from the 161 canonical library
records and from numeric evidence. Source cards retain access depth, scope,
rights limits, next checks and unresolved status. Proposed experiments reference
stable source IDs. The build validates records before replacing dist and writes
`/research-topics/hemp-geopolymers.json` from the same data.

`src/research-topic-core.js` rejects duplicate IDs/DOIs, missing provenance,
unsupported evidence states, unsafe source links, unresolved question citations
and numeric/raw-source fields in lead records. This checks structure, not truth,
rights clearance or scientific validity. New topics use this contract and still
require source review. No additional library, assistant evidence, recipe,
OpenAlex integration or automation is implied by a topic publication.


### Offline continuation queue

`npm run research:queue -- hemp` lists DOI-deduplicated topic leads and next
checks; `npm run --silent research:queue -- --json hemp` emits machine-readable
JSON. It joins canonical IDs and retains multiple dated source contexts rather
than promoting the strongest label or silently overwriting a conflict. This
queue covers topic records only, not every historical batch or pilot gap. It
makes no network calls and does not run OpenAlex or ingest candidates.
