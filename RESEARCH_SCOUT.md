# Geopolymer research scout and materials synthesis workflow

Version 1 — 14 October 2026. An executable workflow for an interactive research
agent with web-search and repository tools, not a deployed unattended service.
Use with AGENTS.md, HANDOFF.md, SUBAGENT_POLICY.md and the knowledge-engine master
prompt. Publication, source rights and evidence rules in those files still apply.

## Invocation and useful deliverable

Ask: "Run the research scout for [outcome/material/application]. Find accessible
primary papers, enrich existing references, and prepare a source-linked materials
comparison and testable hypotheses."

Default priorities: ambient-cured casting, thin coatings and adhesion, shrinkage,
flexure/toughness, workability, inexpensive waste-derived additions and practical
material availability. Choose two focused searches, one exploratory material
search and one failure/contradiction search per run. A search family in
research/scout-searches.json supplies starting phrases; expand spelling/synonyms.

Stop after 25 new candidate records or 40 discovery/retrieval tool calls, whichever
comes first. Inspect at most five full papers in one run. This is a work limit,
not an acceptance quota. Checkpoint earlier if tools or sources fail. No automatic
paid purchases, recursive delegation, scheduled jobs or public publication.

Return a short batch report with:
- Existing papers enriched versus genuinely new DOI candidates; no duplicate count.
- Exact discovery queries, dates, provider, links and inclusion/exclusion reasons.
- Access and rights state, retrieval channel and date for each attempted copy.
- Materials/property comparison with per-claim source locators and missing values.
- Up to three useful connections, conflicting evidence and experiment hypotheses.
- Unfinished work and next checkpoint. Separate software checks, AI source review
  and human/domain review. A model reviewing itself is not independent science.

## Discovery and accessible copies

1. Reconcile all leads with the canonical library before assigning new identities.
2. Use OpenAlex keyword searches plus source citation chains. Start with OA-only
   searches for extraction candidates; also retain important closed records as
   metadata leads to avoid mistaking OA coverage for the entire literature.
   CLI example after live access works:
   `npm run discover:openalex -- run work/coatings.json "geopolymer coating adhesion" --oa`
3. Examine best_oa_location AND alternative locations. A publisher landing page
   may require payment while an institution has an accepted manuscript. Record
   the actual version, not just a shared DOI. Cached OpenAlex content is another
   possible source, requiring separate content.openalex.org network access and
   authentication. Never send the OpenAlex credential to a publisher/repository.
4. When the API is unavailable, use the session's authorized web search directly:
   search the exact title/DOI and repository names. This does not demonstrate that
   the cloud worker can retrieve that URL. Preserve the channel distinction.
5. Google Scholar is a supplementary manual discovery route: PDF/HTML and All
   versions links can lead to authorized copies. Accept owner-supplied DOIs,
   titles or citations as seeds. Do not scrape Scholar or evade its challenges.
   A Google Scholar search link is a convenience, not an inspected source.
6. Unpaywall's current documentation says it uses OpenAlex's underlying database.
   Use it for a compatible DOI lookup or browser helper, not as independent OA
   corroboration. Publisher/repository evidence is the verification step.
7. Try at most three authorized copies per paper. Stop on challenges/rate limits;
   distinguish blocked, unavailable, subscription-required and unverified results.
   Do not infer a paywall from a generic tool error or a 403.

Use explicit access states: metadata-only; OA-reported-link-unchecked;
full-text-observed; browser-challenge; tool-error; subscription-required;
not-found. Seeing a snippet, abstract, HTTP 200 or PDF button is insufficient to
claim full-text-observed. Inspect recognizable methods/results plus identity.
Rights are a separate asset/version/operation assessment. Keep unknown rights
unknown and retain no raw text or restricted assets in Git or public builds.

## Materials discovery and profiles

Search recent publications and citation chains for new-to-this-catalog materials.
"New" does not mean first-ever use: record earliest located date and search scope.
Search primary experiments; reviews are maps, supplier literature documents a
product rather than independently demonstrating performance.

For each material record the exact grade/source/lot where available, functional
role (precursor, activator, filler, reinforcement, pore former, admixture), and
processing. Record oxide-assay basis, mineralogy/amorphous fraction, particle-size
method, surface area, density type, porosity, moisture/LOI, solubility/reactivity
and variability. Unknown stays unknown. Bulk oxide totals are not reactive fractions.

Keep raw coffee grounds, pyrolysis biochar and combustion ash distinct; likewise
precursor calcium versus soluble calcium addition, solid silicate versus solution,
Na versus K activation, and phosphate versus alkaline chemistry. Supplier grades
and literature materials need explicit links; family names do not qualify a swap.

Map each property to its measured role/outcome: setting/workability, compressive
and flexural strength, bond on a specified substrate, shrinkage/cracking, thermal
conductivity/fire exposure, water/acid resistance, leaching, density, cost or LCA.
Capture failures, dose tradeoffs and impractical preparation as first-class results.

## Connecting studies without inventing compatibility

Represent each proposed connection as:

- Question and target outcome/application.
- Relationship: direct-comparison, supports, challenges, condition-dependent,
  mechanistic-hypothesis or untested-combination.
- Supporting and challenging publication/version IDs and actual observation IDs
  with section/table/figure/row/column locators. Discovery-only leads are labeled.
- Independent dataset count; related mixes and reused datasets are not replication.
- Conditions matched, mismatched and unknown: material grade/lot/processing,
  chemistry, dose basis, water accounting, cure, age, specimen geometry/method,
  substrate/direction and exposure. All numerical criteria join on the same mix.
- What was measured, what the authors interpreted and what the agent proposes.
- Tradeoffs, alternative explanations, evidence gaps and review state.

Never average incompatible strengths, turn a compressive result into an adhesion
claim, or infer that two separately successful additives work together. Similar
keywords, citations and OpenAlex related-work links establish search leads only.
Do not call an association causal without an appropriate design. Search for
contradictions and explain possible confounding as hypotheses, not resolutions.

## From connections to experiments

Propose a question and expected direction only where mechanisms/evidence support
it. Use a matched control and, for a two-additive hypothesis, separately identify
baseline, A-only, B-only and A+B comparisons under fixed cure/test conditions.
Do not invent doses: identify supported ranges and quantity bases or leave dose
selection pending. State needed assay, moisture, equipment and method inputs.

Specify the outcomes and ages to measure, failure criteria, replication needs and
tradeoffs. Keep proposals in the notebook/review layer. Do not claim optimum
recipes, guaranteed compatibility, predicted MPa or structural suitability.
Calculator transfers require fully specified quantities and a supported chemistry.

## Implementation status and acceptance

Implemented: bounded OpenAlex metadata discovery; OA-only mode; alternate source
locations/version/license hints; cached-content leads; citation links; existing
catalog access leads; deduplication; resumable queue; review history. These are
source leads, not automatic retrieval or source verification.

Interactive web search can execute this workflow now. Unattended search/retrieval,
full-text extraction, a synthesis engine and scheduled operation are not deployed.
The live cloud API remains blocked by secret binding/network configuration.

Measure success by relevant independent datasets with usable methods/results and
usable rights evidence, not raw paper count. Test abstention on: unknown cure,
wrong material form, split-mix numeric matches, retracted sources, missing dose
basis and incompatible methods. Preserve references that challenge a preferred
material. Avoid ranking by novelty, citation count or accessibility as if those
were quality scores.

Primary guidance consulted 14 October 2026:
- https://help.openalex.org/data/works/open-access/
- https://help.openalex.org/access/fulltext/
- https://help.openalex.org/access/unpaywall/
- https://scholar.google.com/intl/us/scholar/help.html
