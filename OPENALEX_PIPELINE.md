# OpenAlex discovery and review queue

Implemented 14 October 2026 (Eastern). This is a private command-line discovery
workflow, not a scheduled service, extraction model, or public catalog writer.
Live API access has not been verified. The prepared environment currently exposes
no OpenAlex secret binding and does not allow api.openalex.org. No live discovery
was attempted during this milestone. Mock responses are test fixtures, not research.

## Run after access is configured

Requires Node >=18 and curl supporting --suppress-connect-headers and --max-filesize.
Run from the repository root:

```sh
npm run discover:openalex -- run work/openalex-slag.json "geopolymer slag ambient curing"
npm run discover:openalex -- status work/openalex-slag.json
```

Repeat the same `run` command after an interruption to resume. Every successful
page is saved atomically, along with the next cursor. A failed page retains its
previous cursor. Exhausted or capped queues perform no further requests. Use a
new queue file for a different query or after changing catalog identities/titles.
A stale `.lock` after a killed process must be removed only after confirming that
no process is using that queue. Locks prevent concurrent CLI writers.

Read the candidate records in the private queue JSON. Each has bibliographic
metadata, provider/query/retrieval provenance, flags and its review state. Exact
normalized DOIs are compared with all current catalog records and the current
batch. Repeated OpenAlex IDs are suppressed. Title matches and missing DOIs are
held as candidates for review, never automatically merged or invented.

```sh
npm run discover:openalex -- review work/openalex-slag.json oa-W123456 accepted "Relevant discovery candidate; primary DOI verification still needed" "Reviewer name or AI-assisted review"
npm run discover:openalex -- review work/openalex-slag.json oa-W123456 rejected "Outside geopolymer scope" "Reviewer name"
```

Use an actual candidate ID from your queue. Review changes append history.
`accepted` means accepted for further editorial work, not source-verified or
approved for public publication. Review metadata identity and source status,
resolve title/DOI conflicts, assign a stable catalog ID, check rights separately,
and prepare a bounded input for the existing offline importer. Do not feed the
raw queue to that importer: it is a review manifest, not publication records.
No command changes `src/`, research data, stable catalog IDs, or site content.

## Credentials and transport

Configure OPENALEX_API_KEY as a network secret for api.openalex.org using the
supported environment configuration workflow. Personal-vault storage alone does
not establish a binding or network permission. No credential is requested on the
command line. A missing key permits anonymous API requests if network access is
allowed; the implementation does not claim that anonymous quotas are sufficient.

The transport uses curl so inherited HTTPS proxy and CA settings remain effective.
The key or managed proxy placeholder is passed in an Authorization header through
curl's standard input. It is not put in a URL, process arguments, logs or a file.
The fixed HTTPS works endpoint is the only destination. Redirects are not followed;
TLS checking remains enabled. Provider bodies and curl stderr never appear in
errors. Error messages report only controlled HTTP codes or generic failure states.

## Bounds and evidence limits

- At most 25 new candidates and 10 successfully processed pages per queue; page
  size shrinks to remaining candidate capacity. At most 250 result rows examined.
- At most three attempts per page per invocation. Only 429/502/503/504 retry.
  Honor Retry-After up to five seconds; larger/invalid values stop for later resume.
- Each request has a 20-second timeout and a 2 MB body limit; the entire captured
  HTTP response has a separate 2.1 MB bound. Request concurrency is one.
- No automatic paid credit purchase. These are request bounds, not a provider
  dollar-budget guarantee; if an account has prepaid credit, the provider may draw
  from it. Check its usage settings before live operation.
- Only selected bibliographic fields are requested/retained. Abstracts, PDFs, full
  text, figures and raw source content is not stored or fetched. Alternate source URLs are retained
  only as unchecked discovery leads (see the update below).
- OA/license fields and retraction flags are provider hints. Full-text operations
  and AI transmission remain unassessed. Absence of a retraction flag is not clearance.
- Queues live under gitignored `work/`, outside public `src/` and the build. They
  are local checkpoint files, not a long-term private asset store.
- No AI provider, schedule, extraction, summary generation or cross-study inference
  has been connected. The existing partial pilot remains partial.

## Verification and next step

Thirteen focused tests cover duplicate identities, title conflicts, missing DOIs,
rights limits, 25-candidate/10-page bounds, failed-page recovery, retry behavior,
source-response rejection, review history, CLI persistence/locks and credential
transport through an injected subprocess. No live curl-to-OpenAlex authentication
or proxy substitution has been tested. Existing tests, schema validation and
production build also run for this milestone; see HANDOFF.md for outcomes.

Once environment editing is repaired: bind the saved secret, allow the endpoint,
publish the environment, and use a new task. Run one bounded discovery batch and
inspect costs, real response fields and credentials/proxy behavior. Then verify
candidate identities with primary DOI records. The next extraction milestone is
one authorized pilot paper, preserving existing source gaps and rights decisions.

Provider references checked in this conversation on 14 October 2026:
- https://help.openalex.org/api/authentication/
- https://help.openalex.org/access/pricing/
The current help permits limited anonymous use and offers a free key budget;
older announcements differ. Recheck terms/quotas before live or scheduled operation.

## Accessible-source and materials scout update — 14 October 2026

Use `--oa` to request papers for which OpenAlex reports an open-access location:

```sh
npm run discover:openalex -- run work/coatings-oa.json "geopolymer coating adhesion" --oa
```

Search mode is part of the checkpoint identity. Repeat the same option on resume;
changing it requires a new queue file. Existing broad-search checkpoints remain
valid. OpenAlex's OA filter is not a reachability or reuse-permission guarantee.

Candidates now retain up to 20 unchecked alternate source locations, including
version/license hints and exact matching cached-content URLs, and up to 20 links
in each citation/related-work list. Existing catalog DOI matches also retain up
to 25 access-lead records per queue, without creating duplicate publications.
URLs containing credentials or sensitive query parameters are discarded. These
checks do not authorize requests: no URL fetcher, DNS/redirect validation pipeline
or full-text download has been added. Cached content needs content.openalex.org
access separately; never forward the OpenAlex key to third-party hosts.

RESEARCH_SCOUT.md defines the interactive research and materials-synthesis workflow;
research/scout-searches.json provides nine outcome/material search families. The
three-paper spot check in research/batches/scout-access-2026-10-14.json records
actual web-tool access outcomes, separately from the blocked cloud transport.
No new public papers, extracted measurements or material recommendations were added.
