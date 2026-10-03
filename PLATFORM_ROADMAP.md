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
catalog. Public content needs indexable URLs and metadata beyond current hash routes.
Avoid moving the frontend solely to adopt a framework; migrate routes when needed.

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
