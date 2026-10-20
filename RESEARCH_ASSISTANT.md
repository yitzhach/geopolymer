# Research assistant — working test feature

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
