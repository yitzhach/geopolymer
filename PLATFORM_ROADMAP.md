# Geopolymer Platform — connected platform roadmap
Updated 3 October 2026. Owner: Isaac Anderson.

## Product promise
Find reliable research, develop a documented formulation, collaborate on a trial,
and source the exact materials. Serve scientists, students, artists and industry.
Worldwide knowledge access; physical supply expands only where delivery is qualified.

## Delivered in this increment
- Research catalog search by title, author, DOI and summary (one existing record).
- Browser-local workspace for experiments, formulations, study submissions,
  discussions, supply requests and editorial pitches; save/reopen/export JSON.
- Supply planning from samples/classroom kits to bags, pallets and bulk briefs.
- Proposed review process, community spaces and monthly magazine/podcast outline.
- Existing source provenance, product concepts, visual design and motion preserved.
No accounts, public submission, image upload, forum backend or checkout are implied.

## Build order and acceptance
1. Research depth: curate an initial 25–50 studies with verified citations, access
   level, material families, methods, outcome units and limitations. Add filters
   for precursor, application, curing, publication year and review status. Store
   metadata and permitted summaries; link to publisher papers. Import DOI metadata
   with deduplication and editorial review, not automatic endorsement.
2. Persistent lab: implement accounts and private projects, structured ingredient
   rows, dry/as-supplied basis, test records, image uploads, export/import and version
   history. Validate units and records before calculations. Draft recovery must
   survive refresh, quota failures and failed network saves without losing edits.
3. Publishing and community: author profiles, submission queue, moderation, threaded
   discussions, replies, project membership and explicit sharing permissions.
   Verify access controls for every record and image; private content is private
   by default. Establish reporting, moderation and withdrawal/correction policies.
4. Peer review pilot: recruit subject editors and reviewers; disclosures, conflicts,
   review assignments, revisions and editorial decisions with an audit trail.
   Separate platform review, journal review, community comment and independent
   testing. Never let authors self-award reviewed status. Publish a clear rubric.
5. Commerce pilot: qualify a small catalog with grade/lot, SDS/TDS/COA, stock,
   pack sizes, landed costs and destination eligibility. Samples and kits use
   checkout; bags/pallets/bulk may require freight quotes. Complete test orders,
   refunds, stock reconciliation and freight checks before launch.
6. Editorial: launch a monthly issue after content and editor capacity are secured.
   Combine a research digest, reproducible-method feature, classroom activity,
   artist application and sourcing note. Podcast episodes need guest releases,
   edited audio, transcript, citations and accessible playback. No invented guests.

## Proposed backend (not yet selected or provisioned)
Keep Cloudflare hosting. Evaluate Worker APIs + D1 for metadata and R2 for images,
with an established identity provider and commerce provider selected for the actual
catalog. Public content now has pre-rendered path URLs and page metadata.
Keep templates framework-independent until catalog/backend complexity warrants migration.

## Core records
Person; organization; material family; supplier grade; lot; product/SKU; paper;
formulation version; experiment; test result; attachment; project; discussion;
submission; review assignment; review; editorial decision; issue; episode; quote.
Stable IDs connect records. Permissions, provenance and version history are required.

## Useful measures
Successful study-to-method journeys, repeat notebook use, complete submissions,
review turnaround, qualified catalog coverage, fulfilled orders and returning users.
Do not optimize for a large count of low-quality studies or unreviewed recipes.

## Next concrete implementation
Research catalog enrichment and structured ingredient/test records, followed by
accounts and durable image storage. Review visual QA before expanding navigation.

## Implemented update — 3 October 2026
Research discovery now includes 39 DOI-linked records and filters. GP calculator
adds assay bookkeeping, comparison and local JSON projects. Next enrichment should
connect verified supplier grades, cited formulations and measured experiment results.
Remaining gates: browser QA, live deployment verification, independent scientific
review, durable accounts/storage and vetted supply fulfillment.

## Foundation update — 3 October 2026
30 pre-rendered path routes, legacy hash compatibility, per-page metadata, crawl files,
custom HTTP 404, consolidated navigation and always-visible reveal sections implemented.
Preserve the distinction between the curated source record and 39 discovery references.
Next: complete browser/deployment checks recorded in HANDOFF.md, then research metadata
and source enrichment. Focus commercial validation on makers and classroom modules;
market strategy recommendations are not commitments to launch every proposed service.

## Workbench update — 8 October 2026
Calculator input provenance, ingredient contribution audit and research citation
linking delivered. Study notes record adaptations, source location, curing, results
and target definitions; all persist in local save/export/import. Next: multi-trial
notebook and structured measured test records; these free-text study notes do not
replace that phase. Full-paper curation and independent scientific review remain open.

## Supplier builder update — 8 October 2026
Delivered supplier profiles, custom assays, gram proportioning and constrained
sodium/potassium target solving. Next qualification work: lot COAs, current regional
supplier grades, full-paper validated formulations and independent scientific review.
Phosphate activation needs a separately specified model. Experiment notebook remains
next product phase; no account, shared storage or commerce infrastructure added here.


## Experiment notebook — review branch published 8 October 2026
Browser-local experiments and immutable formulation trials, gram variations,
structured curing/specimens/observations/results, parent comparison and portable
backup/import are implemented on a review branch. Existing general drafts remain.
GitHub browser QA passed (37873602855). Next gate: inspect generated screenshots
(artifact download was blocked here), then authorize merge/release. Later: lot/assay changes through richer variation editing, explicit
record revision history, then accounts, permissions and durable image storage.
Do not describe this browser-local increment as the durable private lab backend.
