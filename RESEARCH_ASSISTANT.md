# Research assistant — working test feature

## 20 October 2026 — depth expansion to 111 previews

Twenty more linked summary/guide pairs bring coverage to 111 catalog-backed
previews and 112 partial guides. Source findings, author interpretations and
proposed planning checks remain distinct. The experimental assistant corpus stays
at five partial studies / 62 mixes / 275 observations. No prediction capability,
correction clearance or automatic formulation ingestion follows from the guides.

## 21 October 2026 — three further reading previews

Coverage is now 91 catalog-backed detailed previews and 92 partial guides, with
1,000 bibliography records. These editorial notes add no assistant observations
or prediction capability. All correction holds and canonical evidence counts
remain unchanged. Source scope and batch validation are recorded in HANDOFF.md.

## 20 October 2026 — editorial previews remain separate from numerical evidence

The unchanged 1,000-paper catalog now has 88 detailed reading previews and 89
partial editorial guides (one guide is tied only to a curated recipe). Previews
are discoverable in library search and exported as optional reading-preview
objects. They are not canonical observations, full-paper verification or a
prediction layer. Existing source-status exclusions remain active; the reactive-MgO
preview explicitly repeats its unresolved correction hold. The assistant's
experimental corpus remains five partial studies / 62 mixes / 275 observations.


## 20 October 2026 — 1,000-paper discovery catalog

The assistant's linked catalog now contains 1,000 publications and 74 partial
editorial guides. The latest 200 metadata additions and 25 guides add no canonical
observations or executable recipes. Guides distinguish source facts, conditional
arithmetic and proposed experiments. An explicitly retracted new candidate was
excluded; the pre-existing reactive-MgO correction hold remains unchanged and is
still excluded from assistant evidence. Bibliographic identity checks do not
establish full-text extraction, independent experimental evidence or status
clearance. See HANDOFF.md for release validation.


## Latest catalog — 800 publications

The further 300-record expansion brings the catalog to 800 and editorial guides
to 49. Structured numeric evidence remains the original five partial pilots.
The observed reactive-MgO erratum is blocked by the existing source-status gate;
metadata inclusion and a partial editorial guide do not clear its source status.
No model, live research provider, prediction or automatic recipe transfer added.

## 19 October 2026 catalog continuation

The catalog now contains 500 publications and the site has 26 editorial deep dives.
The 100 new bibliographic records remain metadata-only in the structured evidence
adapter even where a separate partial editorial guide exists. No new numeric
pilot observations, AI model, prediction or recipe transfer was introduced.
Existing correction/status exclusions and deterministic retrieval limits remain.

## User flow

The fixed Research assistant launcher is available on every enhanced page. Open
it and enable Highlight assist mode, close the panel, then select page text and
choose Research selected text. Mobile uses native long-press selection; keyboard
selection works through the same selection-change handler. Pasting a topic is
also supported. The panel is nonmodal so users can keep selecting page content.

Deep dive and Find studies retrieve up to four catalog records with publisher
links, existing summaries and evidence limits. Follow-up questions reuse the
excerpt and recent user questions. Find products retrieves linked product
concepts, explicitly unavailable to order. There is no LLM or live web search;
the disclosure and each response identify test mode. No outbound AI requests,
fabricated answers, predicted strengths or automatic recipe changes occur.

Folders support creation, excerpt/notes/conversation saves, updates, reopening,
deletion, JSON export and import-as-copy. Selected folder is the save destination.
All saved data stays on this browser. Current thread and highlight preference
use session storage for navigation recovery; explicit folder saves use local
storage. Starting/replacing a working thread asks before discarding changes.

## Data and failure behavior

- `gp-research-assistant-v1`: version 1, folders and clips. Each clip keeps ID,
  folder, excerpt, page title/URL, notes, saved date and structured conversation.
- `gp-research-assistant-session-v1`: session working copy and highlight toggle.
- Calculator/workspace/notebook storage keys are untouched.
- Import validates shape, limits and links before merging with fresh IDs.
  User text is escaped; links permit HTTPS or same-origin absolute paths only.
- Maximum 100 folders, 200 clips, 60 messages per clip and 5 MB import file.
- Corrupt local storage is not overwritten. Storage errors retain current work
  in memory with download/export available. Cross-tab changes block overwrites;
  export current in-memory work and reload to see the other tab's data.
- Browser data is not shared between users/devices. Clearing browser data removes
  it; exports are the durable backup until an accounts/storage phase is built.

## API connection phase

`answerResearch` in `src/assistant-core.js` is the provider boundary. Today it is
deterministic catalog retrieval. Once a provider is selected, add an authenticated,
rate-limited server endpoint (Cloudflare Worker or equivalent). Store the API key
as a server secret, never in these static modules, git, browser storage or HTML.

Pass the user-authorized excerpt, question and necessary conversation context,
retrieve approved catalog evidence server-side, and return structured text with
verifiable source IDs/URLs. Treat excerpts and source content as untrusted input.
Keep tool/product links tied to catalog IDs. Distinguish retrieved evidence,
editorial reasoning and unknowns. Web research requires a real search provider;
never label catalog matching as a fresh search. Add cancellation, timeout,
streaming/status, request limits and unavailable-provider fallback before release.

Before enabling requests, explain what selected text is sent and to which
provider. Decide retention, account/cloud sync, per-user quotas and spend limits.
Validate server responses before rendering. Product ordering needs actual stock,
qualified grades and checkout; current concept status must remain visible.

## Verification

`npm test` includes retrieval/evidence and backup-validation regressions.
`tests/assistant-browser.cjs` covers desktop/mobile selection, follow-ups, product
links, folders, navigation recovery, updates, backup import/export, escaped text,
keyboard close, cross-tab conflicts and storage quota failure. It runs in the
existing GitHub verification workflow. See HANDOFF.md for executed results.

## Phase A review-branch integration
Study and observation buttons load source identity, locators and page links into
the existing working thread for explicit local folder save. Deep-dive requests
retrieve up to 10 catalog sources; other requests retain four. Responses state
corpus size and link study pages. /knowledge provides explicit same-mix numeric
filters, exclusions and pagination. Still no real model or web search. Structured
numeric answers are not inferred from free-text questions.

## 13 October 2026 catalog breadth

Catalog expanded to 111 references. Scope notes are searchable and retained in
assistant evidence labels; metadata-only records do not become extracted findings.
Two newly indexed records with correction notices are excluded through the existing
`update-requires-review` gate. They remain discoverable in the library with visible
correction links. Retrieval is still catalog-test mode with no connected AI API.
