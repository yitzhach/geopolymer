# Summary and deep-dive mix-data standard

Version `mix-data-v1` · 21 October 2026 · applies to every future detailed summary
and deep dive. Read with the research master prompt, rights policy and handoff.

Every guide and its reading summary must expose the same source-linked dataset,
in HTML and public JSON. The guide owns the review; summaries join it by exact
DOI/guide ID. Do not maintain a separate summary recipe or competing catalog.
The existing formulation catalog supplies scalable conditions by exact DOI.

Required fields:

1. **Materials and grades:** precursor, activator, aggregate, additive and fiber
   identities; supplier/grade/lot, treatment and assay when actually reported.
2. **Ingredient quantities and dose bases:** named condition/control; each
   ingredient's original quantity, unit and denominator. Distinguish grams,
   kg/m³, precursor mass fractions, wet-batch fractions, volume fractions and
   oxide molar ratios. Keep stock solution identity separate from dry chemical,
   solution water, added water and aggregate moisture. Record an explicit unknown
   rather than dropping an ingredient or assigning zero.
3. **Preparation:** activator preparation/rest, order, mixing time/speed,
   dispersion, casting and compaction; distinguish feedstock synthesis, matrix,
   aggregate, coating and assembled specimen stages.
4. **Curing and conditioning:** sealing, temperature, humidity, demolding,
   storage, drying, thermal ramps/holds/cooling and exposure clocks. Curing age,
   test age and additional exposure duration are distinct.
5. **Specimens, tests and ages:** geometry, loading/protocol, test age,
   orientation, replicate count and independent batches when reported. Do not
   turn assembly loads, aggregate crushing, nanoindentation, UCS or hot/residual
   tests into interchangeable mortar compression results.
6. **Reported outcomes:** source-specific means, units, ages, spread definition,
   controls, failure/negative results and validity limits. No graph digitization,
   interpolation or numerical canonical ingestion without its own verification.
7. **Goal-qualified comparison:** the selected condition and measured endpoint,
   why it is useful, what it sacrifices and where it underperforms. If no
   justified best condition is extracted, say so. Different endpoint maxima do
   not make a single recipe. Shared ingredients and fitted models do not prove
   a causal mechanism, statistical superiority or cross-study equivalence.
8. **Limitations:** unresolved quantities, ambiguous units, contradictory
   passages, unavailable/proprietary information, rights/access limits and
   reproduction checks. A review/model must trace original experiments and must
   not acquire a fabricated independent mix.

Each field has `id`, `state`, original `text`, optional two-cell source `rows`,
HTTPS `source` and precise `locator`. States are `partial`, `pending`, `held` and
`not-applicable`. Pending means extraction incomplete, not absence from the
paper. Source omissions/proprietary limits require direct source evidence.
Each dataset carries version, guide ID, exact DOI, check date, condition scope
and `protocolComplete:false`. A closed mass ledger alone is not a complete
reproduction protocol. Do not change readiness by filling a text template.

Use the shared builder/validator/renderer in `src/mix-data-contract.js` and the
existing `src/deep-dive-mix-designs.js` packet. New partial reviews must record
`hasQuantities:false` when actual mix quantities/ratios remain unavailable, plus
field-specific pending states. Only reconciled existing catalog records may
produce proportional gram examples, explicitly labeled by total wet-batch basis.
Do not infer stock water fractions, solution masses or ratio units. A 1% dose
needs its actual denominator; molarity alone is not a batch ledger.

Detailed summaries retain three paragraphs (question, materials/methods,
findings), takeaways, limitations, intended readers and original/deep-dive links.
Their dataset disclosure and JSON join the current reviewed data without
silently rewriting previously published paragraphs. Search the source-backed
ingredient/method fields; ingredient facets describe known ledger identities,
not chemical guesses from article titles.

Before release, verify source identity/status and prior failed-access records;
keep review batches ≤5 papers and ≤40 operations. Record actual queries, source
locators, rights basis, gaps and deferred candidates. Retain no raw source or
complete tables/figures without rights. OpenAlex remains on hold until separately
authorized. Preserve canonical pilot data, publication identities and old
editorial records unless a documented correction is required.

Run Node/schema/build checks, the affected summary/guide routes and dataset
disclosures in desktop/mobile with and without JavaScript, explorer filters,
comparisons and exports. Test missing-field, cross-source identity, held-source
and model boundaries. Record exact counts, tests and remaining extraction work
in HANDOFF.md. Publication follows the owner's existing authorization; automated
schema checks do not establish scientific validity or complete extraction.
