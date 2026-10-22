# Geopolymer Knowledge Engine — master implementation and research prompt
Version 1 · 11 October 2026 (Eastern)
Status: approved direction for the next implementation session; specification only.
Repository: https://github.com/yitzhach/geopolymer
Site: https://geopolymer.bobdylan2000.workers.dev/library

## 1. Mission and execution boundary

Act as the project's scientific-data engineer, research editor and software developer. Build a deeply searchable, source-linked geopolymer encyclopedia connecting publications, experimental evidence, materials, methods, outcomes, suppliers and proposed mix designs.

This document consolidates the owner's two supplied prompts, including completion of the second prompt's unfinished research-to-supplier section. It is the canonical plan for this phase. It does not assert that the database, ingestion service or real AI described below already exists. This documentation session adds no papers or application features. Execute the phased plan when the owner launches it in a new chat.

Success means users can find relevant precedents, inspect actual experiments, understand successes AND failures, identify usable material specifications, compare qualified sourcing leads and design better experiments with citations. Hundreds of references are a breadth milestone, not a substitute for deeply extracted evidence.

Build four connected layers:
1. A broad verified bibliographic catalog.
2. Granular, traceable experimental records.
3. Original encyclopedia articles synthesizing multiple sources.
4. Research and formulation tools using those records.

Preserve current URLs and IDs, the distinction between /library discovery records and curated /discover records, white/forest-green design, calculator arithmetic, notebook and research-folder storage keys, imports/exports, and test-mode fallback. Link existing data rather than create competing catalogs. Literature observations, personal measurements and proposed experiments must remain distinguishable.

## 2. Start from current main

Read HANDOFF.md, this file, DECISIONS.md, RESEARCH_PUBLISHING.md, RESEARCH_ASSISTANT.md and RECIPE_DATABASE.md. Read README.md, PLATFORM_ROADMAP.md, SUPPLIER_DATA.md, LITERATURE_MIXES.md, PYRAMENT_RESEARCH.md and EXPERIMENT_NOTEBOOK.md as their features are touched. Follow applicable AGENTS.md instructions.

For every detailed summary and deep dive, also apply `SUMMARY_DEEP_DIVE_STANDARD.md`:
source-linked materials, quantities/bases, preparation, curing, specimens/tests,
outcomes, goal-qualified comparisons and limitations, with explicit unknowns.
Use the shared mix-data contract and exact-DOI catalog; section coverage is not
completed scientific extraction or a reproduction protocol.

Inspect catalog modules, schema contracts, assistant-core, routes, build scripts, tests, CI and Cloudflare configuration. Recount actual publications and formulations; the planning baseline is 61 references and 15 literature formulations, not a hardcoded future count. Record discrepancies without silently deleting existing records.

Produce a brief architecture audit and implement Phase A below. Do not spend the session merely rewriting the plan. Inspect the existing daily research automation before adding or changing any schedule. Draft generation and public publication are separate actions.

## 3. Bounded phases and measurable targets

Targets are goals, never permission to fabricate records or lower quality gates. Complete useful batches, checkpoint progress and report genuine blockers. Do not claim all phases fit one session.

| Phase | Deliverable | Exit evidence |
|---|---|---|
| A — foundation and pilot | Versioned schema, rights policy, resumable importer, existing-catalog adapter, study details, structured search; add 25 relevant unique references and deeply extract 5 accessible experimental papers | Stable-ID reconciliation; source locators; numeric verification; regression/build/browser checks; working search and calculator integration where justified |
| B — breadth | Reach 300 unique in-scope publications total, then 500; eventual 1,000 as coverage justifies it | Batch manifests, deduplication, topic/year/type coverage report, verified bibliographic identity, explicit evidence depth |
| C — depth and encyclopedia | Reach 25 deeply extracted papers, then 100; publish an initial 12 substantive topic pages, expanding with evidence | Source inventories, verified observations and failures, material links, claim citations and documented unresolved gaps |
| D — materials and sourcing | Research material identities plus initial 20 documented commercial grades/offerings where verifiable | Official specifications, dated supplier facts, separate material/product/lot entities, useful comparison pages |
| E — advisor and continuous operations | Evidence retrieval, reviewed experiment proposals, corrections and scheduled discovery | Retrieval benchmark, permissions enforcement, cost controls, audit trail; real AI only after configured and tested |

Phases can overlap after the pilot passes. Start with batches of at most 25 metadata additions and 5 full-text extractions; split further when source complexity demands it. A paper with many variants can occupy an entire extraction batch. Do not truncate its experimental inventory to make a quota.

Default when AI or Cloudflare credentials are absent: implement versioned structured records in the existing Git-backed pipeline, deterministic import/validation/search and a functioning pilot. Add a repository/data adapter for later D1 migration. Do not require a vector database, user accounts or an admin dashboard to begin delivering evidence.

## 4. Scope, discovery and coverage

Include foundational work and recent research across geography and publication date. Core topics: metakaolin/calcined clays; slag and blended binders; low/high-calcium fly ash; natural pozzolans; sodium/potassium activation; carbonate and other one-part systems; separately classified phosphate/acid systems; reaction mechanisms; curing; rheology; shrinkage/cracking; fibers; coatings and adhesion; durability; foams/thermal properties; extrusion/3D printing; waste-derived materials; environmental and economic comparisons.

Prioritize the owner's practical questions: MK/slag blends, potassium versus sodium, ambient curing, early-age performance, thin coatings and artistic casting, flexure/adhesion, low-cost additives, coffee biochar versus combustion ash, and obtainable US materials. Retain international research; do not treat ordinary Portland cement evidence as geopolymer evidence. Adjacent cement research can be indexed with an explicit system label and transfer limitations.

Use provider-approved metadata APIs such as Crossref and OpenAlex, suitable institutional repositories, publisher records and licensed datasets. Verify current API terms, access requirements and quotas before implementation. Biomedical services are optional only when relevant. Citation chaining from reviews and seminal studies supplements keyword discovery; reviews are discovery maps, not replacements for primary experiment sources.

Maintain a versioned search strategy: exact queries, synonyms, provider, date windows, filters, cursor, timestamp, inclusion/exclusion rationale and retrieved counts. Include negative-result terms such as shrinkage, cracking, efflorescence, poor workability, incompatibility, leaching, failed setting and durability loss. Seek opposing results deliberately. Citation count, novelty and open access are prioritization signals, not scientific-quality scores.

Normalize DOI URLs/case while retaining original identifiers. Support DOI-less reports with stable identifiers and bibliographic matching. Distinguish publication versions, corrections, conference/journal overlap and shared experimental datasets. Fuzzy matches become review candidates; never merge automatically on title similarity alone. Count work families, publications and independent datasets separately.

## 5. Rights and source-access policy

Implement a practical conservative platform policy, not an assertion that every factual extraction requires copyright permission or that this prompt guarantees legal compliance. Individual facts and protected expression, database rights, contractual access terms and applicable exceptions are distinct questions. Document the applicable basis for each operation; uncertain cases remain metadata-only pending qualified review.

For each document/version and each supplementary asset record: rights holder when known, exact license/version/URL, official rights evidence URL, authorized access location, checked date, attribution obligations, policy version and allowed operations. Track access, download, processing, raw retention, AI-provider transmission, embedding/indexing, public display and export separately with allowed/denied/unknown decisions and reasons.

Public availability is not blanket reuse permission. API metadata licenses do not automatically cover included abstracts or linked PDFs. A supplemental dataset or third-party figure may have different rights from its article. Use clear commercial-compatible licenses or documented permission/basis; evaluate NC, ND and SA obligations individually. Do not bypass paywalls, credentials or access controls. Respect provider terms and retrieval limits.

Write original factual summaries and original cross-study explanations. Do not paraphrase an entire paper into a replacement article, reproduce protected abstracts or reconstruct whole tables/figures without an established basis. No arbitrary word count or similarity threshold constitutes legal clearance. Automated overlap checks are review aids. Rights checks apply to API responses, snippets, downloads and model outputs as well as source storage.

Retain source text only where authorized; keep restricted evidence private. Never place PDFs, restricted passages, secrets or personal research files in public Git, static builds or CI artifacts. Public exports must whitelist permitted fields and preserve attribution. Keep dated rights evidence; a later unavailable URL is not proof a valid irrevocable license disappeared. Review rights changes and removal requests; invalidate affected caches/indexes and dependent syntheses when necessary.

Primary policy references, checked for this planning document on 11 October 2026:
- https://www.crossref.org/documentation/retrieve-metadata/rest-api/
- https://www.crossref.org/documentation/retrieve-metadata/text-and-data-mining/
- https://creativecommons.org/faq/
Recheck current source-specific terms before operating the importer. Resolve jurisdiction-dependent mass-ingestion exceptions with qualified advice rather than an AI assertion.

## 6. Canonical entities and scientific contracts

Use stable IDs, schema version, revision history, timestamps and explicit foreign keys. Implement minimum useful contracts first; extend them compatibly.

| Entity | Essential content |
|---|---|
| Publication/work/version | Identifiers, authors, title, publisher, journal, first-online/issue dates, document type, peer-review status with basis, version relationships, source URLs, corrections/retractions and last status check |
| Source asset/rights | Article, supplement or dataset identity; permitted location; rights decisions; authorized checksum/version; access date |
| Experiment/dataset family | Publication links, original group names, experimental purpose, manipulated variables, controls and overlapping-dataset links |
| Material/specification/product/lot | Family, functional roles, source identity, grade, processing, lot and assay provenance; unknown identities remain explicit |
| Formulation/ingredient | Original mix ID, component quantities/units/bases, original versus normalized values, material IDs and revision |
| Preparation/curing/specimen/test | Ordered mixing/casting stages, times, temperature/humidity/sealing, age origin, specimen geometry, substrate, loading direction and actual method/standard version |
| Observation | Property, value/range/comparator, unit, age, formulation/test links, n, uncertainty type/value, control, censoring, extraction status |
| Finding/relationship | Claim, supporting/challenging observation IDs, contextual conditions, author interpretation versus platform synthesis, limitations and review history |
| Topic/article | Stable slug, aliases, original sections, claim-level citations, related methods/materials, last review and version |
| Supplier/offering/SKU | Manufacturer identity, official product and document links, dated commercial facts; separate research lead, qualified source and actual store offering |
| Extraction/review/job | Batch, source inventory, extractor/tool/model/prompt version, checks, reviewer identity/type, errors, approval and resumable checkpoint |

Each experimental fact requires publication/version, evidence locator and extraction basis. Locators identify section/page/table/figure, row/column/unit and mix/specimen as available. Use null plus missing-reason codes; do not invent locators for abstracts.

Preserve original numeric text, value, unit, qualifiers and precision. Derived values store expression, input IDs, conversion/version, assumptions and propagated uncertainty when justified. Distinguish exact table values, OCR output, graph estimates, author calculations and platform calculations. Figure digitization needs calibration, uncertainty and separate verification; do not manufacture precise values from low-resolution graphs.

Material attributes include oxide assays and their basis, LOI/moisture, mineralogy/amorphous content and method, particle-size distribution, surface-area method, density type, processing/calcination and concentrations. Never equate total oxide content with reactive fraction. Assays, typical supplier specifications and measured lot COAs are different evidence.

Ratios explicitly identify numerator, denominator and mass/volume/molar basis. Keep Si/Al atomic versus oxide ratios distinct; solution mass versus solids; physical water versus hydroxide-equivalent water; activator-only modulus versus whole-binder ratios. Hydroxide purity, silicate density and solution concentration cannot be guessed. Missing totals trigger review, not forced normalization. Phosphate chemistry must not enter an alkaline calculator model unsupported.

Store cure duration, preconditioning, exposure duration and age at test independently. Age starts from the documented event or remains unknown. No invented early-age or 28-day curves. Separate cube/cylinder, flexural geometries, direct/splitting tension, shear/bond, substrate and printing direction. Preserve reported ranges, detection limits and inequalities. Cost/LCA requires currency/date/region, functional unit, system boundary and allocation assumptions.

## 7. Extraction depth, review and completeness

Do not collapse accessibility, extraction coverage, correctness and scientific credibility into one badge.

Maintain independent states:
- access: metadata only / abstract available / authorized full text / restricted;
- extraction: unstarted / partial / inventory complete / extracted;
- verification: unchecked / automated checks / source checked by AI / human source checked / domain reviewed;
- editorial: draft / approved / published / superseded / withdrawn;
- scientific status: document type, peer-review basis, correction/retraction status.

An AI second pass is not human or independent scientific review. A source-checked number is not independently replicated science.

For each full-text paper, inventory all relevant material tables, mixes, tests, result tables/figures, supplements, failure observations and method sections before extraction. Track category states: not applicable, not reported, not yet extracted, ambiguous, extracted, verified. Only calculate coverage where an enumerated denominator is known; show “18 of 24 inventoried result rows checked” with inventory scope. Otherwise show states and counts, not a fabricated percentage. Keep method completeness distinct from extraction coverage.

Check every numeric observation intended for public structured search against its source locator and units; explicitly log who/what performed the check. A stratified second-pass audit must include extremes, failures, each table/property, conversions and OCR. Hold unresolved observations from verified numeric filters; they may appear as labeled provisional evidence. Disagreement opens a review issue rather than averaging conflicting numbers.

## 8. Successes, failures and cross-study reasoning

Capture unfavorable, null, mixed and failed outcomes at the same granularity as favorable ones. Record intended objective, control, conditions, outcome direction, magnitude, variability and failure mode. Distinguish failed specimen preparation, absent setting, cracking, no statistically detected difference, result not reported and experiment not performed. Non-significance is not proof of equivalence.

A “success” is relative to a documented objective and method, not a universal winning mixture. Preserve tradeoffs: strength versus shrinkage, workability versus water demand, rapid set versus casting time, density versus insulation, cost versus durability.

Relationship types include supports, challenges, condition-dependent difference, replicates, uses-material, reports-method and proposes-mechanism. Every relationship has evidence IDs, scope and reviewer status. Similar keywords alone do not establish scientific support or contradiction.

Before comparing, check binder family, grade/lot, dose basis, activator chemistry, water accounting, cure, age, geometry, test method, substrate/direction and exposure. Show exact matches separately from partial precedents and excluded records with reasons. Unknown is not a passing filter. Different conditions may explain divergent results; state that as a hypothesis unless demonstrated. No pooled rankings or meta-analysis without a defensible harmonization method. Count independent datasets rather than treating related variants as replication. Explain publication bias and corpus gaps in broad conclusions.

## 9. Encyclopedia and user experience

Create original topic pages for materials, chemistry, methods, applications and recurring failure modes. Initial candidates: metakaolin; slag blends; sodium/potassium activators; ambient curing; one-part systems; thin coatings; shrinkage/cracking; fibers; efflorescence; coffee biochar/ash; phosphate activation; formulation ratios.

Each substantive page includes definition/scope, material-system boundaries, established findings, supporting and challenging evidence, condition-dependent outcomes, practical research implications, unknowns, related records and source links. Cite claims at paragraph or statement level. Link methods and material aliases; add a glossary, breadcrumbs, related topics, revision history and last scientific review. Do not generate hundreds of thin pages just for search engines. “Wikipedia-like” means connected, readable knowledge; public editing and community moderation are a later phase.

Study pages show metadata, evidence depth, extracted methods/mixes/results, coverage inventory, limitations, corrections and prominent original-work links. Users can save papers, observations and comparisons to existing research folders. Tables remain usable on mobile, support keyboard use and show units/bases alongside values.

## 10. Search and evidence-backed assistant

Implement exact/phrase search, scientific synonyms, structured facets and numerical filters first. Add semantic retrieval only when it measurably improves a benchmark. Preserve formula token meaning, Na/K differences and ash/char distinctions. Distinguish material identity from functional role.

Support filters for material/grade, activation family, precursor proportion, property, value/unit, age, cure, specimen/method, substrate, study type/year, evidence depth, verification and source status. Criteria must join on the SAME formulation and observation: a study containing 30% slag in one mix and 60 MPa in another must not satisfy their combined query. Rank literature relevance separately from supplier/commercial relevance. No paid placement disguised as scientific support.

Display included/excluded counts and active assumptions. Unknown-age or unknown-cure results can be offered as partial matches, never silently counted as exact results. Provide stable shareable queries, pagination, study comparison and permitted BibTeX/RIS/JSON exports.

Extend the existing assistant with structured query + cited retrieval + deterministic calculation. Quick answer, detailed answer and deep dive change depth, not verification standards. Deep dive searches beyond the current four-result cap with bounded pagination and context budgets, reporting searched corpus, cutoff, evidence depth and known gaps. Never imply an exhaustive literature review from a limited indexed subset.

Every important answer claim references resolvable evidence IDs, publication links and locators. Validate that returned citations actually support the claim. Distinguish observed evidence, authors' explanations, platform synthesis and proposed hypotheses. Say “insufficient indexed evidence” when appropriate. General scientific explanations need clear labeling and suitable sources.

Document/source text is untrusted input. Models cannot expand permissions, change catalog facts or execute source instructions. A real AI provider needs server-side secrets, approved data transmission, rate/spend limits, timeout/cancel behavior and response validation. Keep explicit deterministic catalog mode until connected; do not label it generative AI or live web search.

## 11. Materials intelligence and supplier sourcing

Keep family, specification, named commercial product/grade, experimental batch/lot, supplier offering and actual store SKU distinct. A material can have multiple roles without duplicate identities. Unidentified research material stays unidentified.

Capture verified chemical/physical properties with source, date, basis and method; CAS only where appropriate to the substance. Do not assign a single chemical formula or CAS to every heterogeneous industrial mixture. Distinguish coffee pyrolysis char, combustion ash and untreated grounds, with feedstock, atmosphere and thermal treatment.

Supplier records use official sources for manufacturer/distributor identity, current grades, TDS/SDS/COA links and revisions, locations, service regions, packaging/MOQ, sample availability, pickup/freight and dated quotes. Price includes currency, unit basis, quantity tier, validity and freight/tax status when known. Unknown prices/stock stay unknown. Public listing means lead, not approved partner.

Start with North American precursors, silicates, hydroxides, fillers and fibers, including Dynapoz/PQ only after current identity is verified. For sourcing relevance, prioritize documented supply routes to southern Kentucky and regional pickup possibilities while retaining nationwide options. Do not invent distances, contacts, freight rates or send supplier inquiries without authorization.

Compare documented grade properties in a side-by-side matrix. Label same documented grade; same defined specification; similar measured properties; candidate for testing; insufficient information; or observed incompatibility with conditions. Never transfer published strength or compatibility to a new grade. Product concentrations, morphology, amorphous fraction and lot variability can matter beyond bulk oxide similarity.

Add an internal sourcing-opportunity view: research applications, requested specifications, documented sources, packaging/cost gaps, qualification steps and possible store category. This is a procurement research backlog, not inventory. Store recommendations disclose commercial relationships and evidence gaps. Actual sales require verified product identity, supply, labeling/safety/fulfillment and checkout; patent publication is neither independent validation nor a freedom-to-operate determination.

## 12. Formulation and experiment design

Only transfer fully specified, compatible quantities to the existing calculator. Preview source quantities, unknown assays, assumptions and unsupported chemistry before applying. Keep the published recipe immutable; adaptations create parent-linked notebook trials with a reviewable ingredient diff, source evidence and rationale.

The advisor proposes experiments using retrieved precedents and existing deterministic calculations. Track target property/age, working time, thickness/substrate, available equipment/materials, budget, cure and exposure. Identify missing inputs, controls, confounders and a small test matrix. Separate predicted directions or mechanistic hypotheses from demonstrated effects.

Do not invent optimal dosages or numeric strength predictions. Later predictive models require separately validated property/age/domain coverage, study/lot-separated evaluation and calibrated uncertainty. Personal trial results remain private/local unless explicitly shared; they never silently become published literature evidence.

## 13. Efficient implementation and operations

Retain native JavaScript and existing build/CI. Use a single canonical record source with derived search/site exports. Evaluate D1/Workers for relational serving, R2 for authorized private assets, queues for extraction and Vectorize for semantic retrieval when scale and available bindings justify them. Do not provision paid services or enable unbounded jobs merely because they appear in this plan.

Prefer structured XML/HTML/supplements to PDF OCR. Cache permitted retrievals, hash/version sources, skip unchanged records and extract tables deterministically before using model assistance. Model-assisted extraction produces schema-constrained proposals, never authoritative numbers. Do not resend entire libraries on each question or embed metadata-only records as if full text was read.

Each job records run ID, configuration, query/cursor, source versions, discovered/accepted/excluded/duplicate counts, per-record status, retries, costs and next checkpoint. Enforce request/concurrency/time/token/storage caps; honor Retry-After and backoff. Resume idempotently; repeated runs produce no duplicate publications or observations. Stop cleanly at configured caps and preserve completed work. If no paid budget is supplied, use available permitted tools and keep paid ingestion jobs disabled.

Keep reviewed data changes small and transactional with rollback. CLI + version-controlled review manifests are sufficient initially. Add authenticated editorial UI when needed. Protect server fetches against SSRF, unsafe redirects, oversized files and hostile markup; restrict document types and hosts. Do not leak source text into logs.

Corrections/retractions trigger dependency traversal through observations, comparisons, topics, search indexes, cached answers and recommendations. Retain audit history; default assistant answers must exclude withdrawn claims or explain their status. Recheck sources on a documented schedule, without promising that absent notices prove no retraction.

## 14. Acceptance tests and operational reporting

Create a small gold benchmark from genuinely source-checked records, with expected IDs/values/conditions and explicit abstentions. Cover:
1. MK/slag 20–40% with ambient 28-day compression above a specified threshold.
2. Same query with missing cure/age and with matching values split across different mixes.
3. Sodium versus potassium evidence with incompatible conditions.
4. Coffee char versus ash versus cement-only evidence.
5. Thin-coating adhesion versus flexural/compressive results.
6. Null results, failed setting and shrinkage tradeoffs.
7. Supplier grade versus a superficially similar substitute.
8. A retracted/updated source and a metadata-only paper.
9. Rights-restricted content excluded from public exports/model contexts.
10. Repeat ingestion, duplicate versions and interruption/resumption.

Verify schema/FK validity, provenance, unit/basis conversions, missing/censored values, per-claim citations, completeness denominators and query precision/recall against explicit expected results. Do not call an AI-generated benchmark “expert reviewed.” No unsupported numeric claim in the release benchmark is acceptable. Report benchmark scope; passing a small set is not universal scientific validation.

Run existing regressions, production build and relevant desktop/mobile browser tests. Check filtering, pagination, source links, study routes, calculator transfer, local save/export and keyboard behavior. Measure search latency/payload/build size at 500 and 1,000 metadata records using clearly labeled test fixtures outside the public scientific catalog. Optimize based on results.

At each batch/release report:
- Baseline and final unique publications; additions, merges, exclusions and version families.
- Metadata-only, abstract-reviewed and full-text-extracted counts with defined denominators.
- Source-checked formulations, observations, failures and remaining provisional records.
- Topic pages, material identities, supplier offerings and stale/unknown commercial facts.
- Rights-blocked and incomplete sources with next actions.
- Verification performed by software, AI, humans or domain experts, separately.
- Tests, costs, configuration limits, runtime versus specification status.
- Commit/PR, deployment identity only if actually verified, and resumable next work.

Update HANDOFF.md, DECISIONS.md and affected research/assistant/recipe documentation after each implemented milestone. Preserve prior release evidence; do not claim that a documentation commit deploys the knowledge engine.

## 15. Next-chat launch prompt

Continue yitzhach/geopolymer from current main. Read HANDOFF.md and KNOWLEDGE_ENGINE_MASTER_PROMPT.md, then the supporting documents they identify. Execute Phase A of the master prompt: audit the current catalog, implement a reusable permissions-aware scientific data/import/search foundation, preserve the existing references and stable IDs, add an initial batch of 25 verified relevant unique references, and deeply extract 5 suitable experimental papers with formulations, results, failures and precise provenance. Add linked study details and useful structured search to the existing site. Use the working Git-backed path if backend or AI credentials are absent; do not block useful progress on those credentials. Do not claim later phases are complete. Verify the existing daily automation before adding schedules. Run relevant tests/build/browser checks, follow the session's publication authorization, and update handoff with exact counts, blockers and the next resumable batch. Work toward 300, then 500 references through subsequent verified batches.
