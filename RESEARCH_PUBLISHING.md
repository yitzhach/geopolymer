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
