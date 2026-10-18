# Geopolymer — current handoff
Updated 17 October 2026; research checks span 16–17 October Eastern.

## Forty-paper expansion and two new deep dives — 17 October 2026
- Local target reached: 201 unique publications, +40 metadata-only records in
  breadth-5 and breadth-6 batches. All 161 prior IDs/DOIs/titles preserved.
  Five partial pilot studies, 62 mixes, 275 observations, 43 recipes/31 scalable
  unchanged. Canonical bibliography joins src/knowledge-expansion.js.
- Added `/deep-dives/biochar-replacement-and-exposure` and
  `/deep-dives/basalt-fiber-carbon-textile`; three deep dives total. Linked existing
  recipes; no duplicate dataset, new measurement or full-extraction claim.
- Audit research/batches/deep-dives-2026-10-17.json records methods, conditional
  arithmetic, source rights and unresolved fields. Hempcrete PDF follow-up failed;
  no new claims from that attempt. Figures/assays remain pending.
- JSON export `/deep-dives.json`; article-specific glossary and study/deep-dive
  links. Metadata provenance label no longer incorrectly assumes Crossref.
  Study descriptions include title to avoid collisions for untranscribed authors.
- Primary exact-DOI checks corrected candidate year/title/journal errors before
  integration (including JCEMS 2020, one-part mortar 2021, SN Applied Sciences).
  Author lists transcribed only where observed; status/rights remain unassessed
  for this metadata batch. No OpenAlex calls or key received/configured.
- All 23 Node test files and 224-route build passed. GitHub CI 39092913920
  passed on 16d1b7ee042c67273c41fd7b164ad2e16e87c5bf, including all six browser
  suites. PR #18 merged as c3f20df7744afb4ef23efaebe31abec9422617c2.
- Staged tree 332b2a80fe9ca333be07425a5afa21a751f24c53 matches that feature;
  final HANDOFF text is newer unstaged work. Preserve both before synchronization.
  Live identity remains unverified.
- Owner requested a separate +49 after five hours. One-time task confirmed for
  18 October 2026 04:12 Eastern (08:12 UTC), automation
  6ad4392c2a088191a2dc6a8bdc519597. It targets 250 only after confirming this
  201 baseline; preserve existing daily draft automation. No usage-reset detection.
- Current local HEAD remains 79f41c5 with completed staged work; preserve before
  synchronization. Remote parent before this batch: f2f497350f712064a028e995040b6f82b093d098.

## GGBS experiment deep dive — 17 October 2026
- New `/deep-dives` section and `/deep-dives/ggbs-taguchi-mortar`, linked from
  research, search and existing T2M9 formulation. Includes highlights, sourced
  materials/ratios/procedure, conditional arithmetic and nine planning steps.
- DOI 10.1080/13287982.2024.2375468 already exists as alameri-t2m9; no duplicate
  study, canonical observations or scalable recipes added. Counts unchanged.
- Publisher returned 403; university PDF text accessible, CC BY 4.0 p.95.
  Audit: research/batches/deep-dive-ggbs-2026-10-17.json. Partial AI text review.
- T2M9 versus zero-SiC recommendation conflict remains. SP solids basis is an
  inference. Complete activator composition/free water and uncertainty unresolved.
- Shared renderer/build validation and tests added. Browser coverage includes
  navigation, nine steps and desktop/mobile overflow. All 22 Node test files and
  the 182-route build pass. GitHub CI 39062454346 passed all six browser suites
  on feature 5503ad54246896d99cf6c261f22db484ad7a1831.
- PR #17 merged as c7016831fd37cf705258b4a08e47045d34783b84.
- Local staged tree 20c36ed2f94ef4cfdcbc326ab114a5a7c1ee0e0e matches the feature;
  this final HANDOFF update is newer unstaged content. Preserve both.
- Live build-info remained inaccessible through the web tool on this check;
  deployment identity is unverified, not inferred from successful CI.
- Local HEAD still 79f41c5; prior staged work preserved. Do not reset to main.
  OpenAlex remains on hold and daily automation unchanged.

## Queue finding search — 17 October 2026
- Offline queue now searches editorial findings and source locators alongside its
  existing title/DOI/material/next-check fields. Each context exports its note,
  review status and rights statement; CLI output displays them with the date.
- Regression tests and CLI probes pass for acoustic and hot-water searches;
  unrelated source terms cannot combine into a match across different papers.
  No network access, source promotion or canonical ingestion added.
- Sand-replacement clean-copy attempts: publisher HTML tool error; PMC browser
  challenge. Do not retry these or import from overlapping PDF text layers.
- GitHub CI 39017806531 passed all checks on 553f96707469758d24945bb3f21a4df21c597cf1.
  PR #16 merged as 710b8710b7ee3d0d4e83fd72f81174b360d3d48a.
- Current local HEAD is still 79f41c5. Staged tree 07e612484c6d935eb3bbca931e6ece712e260785
  matches feature 553f967; HANDOFF.md also contains this newer unstaged checkpoint.
  Preserve both before synchronization. No retry of the approval-blocked fetch.
- Live deployment identity remains unverified; no schedule changes or OpenAlex use.

## Biochar provenance follow-up — 17 October 2026
- Saccani DOI 10.3390/ma18030486 §2.1 and references identify the next sources:
  ref. 33 is Sorrenti et al., Biochar physico-chemical properties as affected by
  environmental exposure (2016); ref. 41 is Manzi et al., Geopolymeric Composites
  Containing Industrial Waste Reinforced with Arundo donax Fibers (2024).
- Ref. 33 is cited for biochar elemental composition; ref. 41 for metakaolin XRD.
  Neither citation alone establishes a matched lot oxide assay. Qualify material
  identity and exposure state before chemistry transfer. No new assays imported.
- Source: https://cris.unibo.it/retrieve/18a88cc9-e847-4171-b93c-8b7d2c5eae67/materials-18-00486.pdf
  CC BY 4.0. Existing dimensional-change figures remain undigitized. Five paper
  texts have been inspected/revisited in this bounded continuation; open a new
  batch before examining further full papers.

## Foam consistency follow-up — 17 October 2026
- Re-read Wiley HTML Table 3 for 10.1111/jace.70158. Dimensional calculation
  conductivity/diffusivity yields volumetric heat capacity, not the printed
  area-based unit. Nineteen of 20 rows agree within 1%; GPF-5S1-1HF differs
  by approximately 4.11% relative to its printed heat capacity. Arithmetic-only
  comparison; rounding/averaging and original data still require investigation.
  No source correction, mix-ID mapping or numeric ingestion is authorized by this.
- Supporting asset listed as jace70158-sup-0001-SuppMat.docx (28.5 KB).
  Prior retrieval failed; not retried. Dose, S1/WP and batch gaps remain.
- Source: https://ceramics.onlinelibrary.wiley.com/doi/full/10.1111/jace.70158
  Only original brief notes retained; no source table/figures reproduced.

## Continued checkpoint — clay/slag hempcrete source pair
- Added two partially reviewed source cards to the hemp topic (10 total) and its
  existing offline queue/export. Canonical data and recipes remain unchanged.
- Audit: research/batches/hemp-clay-slag-2026-10-16.json. Binder/hurd ratios
  disagree across papers; preserve additional pre-wetting water and investigate
  dataset overlap. No numerical recipe transfer or independent replication claim.
- Related Materials and Structures paper now partly inspected; earlier “unreviewed”
  wording below is historical. Complete inventory, visual review and status remain.
- All 20 Node test files, 180-route build and focused desktop/mobile browser
  suite pass. PR #15 initial feature 79f41c5 failed CI 38997242719 during legacy navigation
  (ERR_ABORTED). Startup and hashchange could request duplicate redirects;
  idempotent redirect fix has a regression test (old code issues three calls).
  Updated 21-file Node suite passes. GitHub CI 38997464444 passed on
  cb99c0cdbc3e5de9d6e3be492acca1ad2fef1a3c, including all six browser suites.
  PR #15 merged as dece55681f54ba83ca403c7db3bc2af1151a8462.
  Local full-sweep process result could not be recovered (unknown process ID);
  full-browser verification is from CI, not an assumed local pass.
- At the PR #15 checkpoint, local HEAD was 79f41c5 with staged tree dbe4a479
  matching cb99c0c; current staged state is recorded at the top.
  Final fetch/synchronization was blocked by automatic approval review usage
  failure (not an unsafe-action finding). Preserve staged files before resuming.
  Live identity remains unverified; runtime policy excludes the live host.
- Follow-up: second DOI publisher record gives 21 July 2025 publication/version
  date (https://link.springer.com/article/10.1617/s11527-025-02729-3).
  Exact-DOI correction search found no specific notice; not comprehensive clearance.
- §3.4 tests an epoxy-glued dolly on the hempcrete surface; failure locus remains
  unresolved. Thermal conditioning differs from general curing (§3.3).
- Table 3 separates measured acoustics at 28/332 days from modelled optimum
  absorption. Do not treat estimates as measured or combine ages. Figure screenshots
  again returned placeholders, not inspectable images. No visual verification.
- Runtime network policy still excludes research hosts and live site; use session
  web tools where available. No credentials configured; OpenAlex remains on hold.

## Additional source acquisition — hemp as sand replacement
- Pawluczuk et al., 10.3390/ma14164580 (2021), publisher PDF accessible:
  https://mdpi-res.com/d_attachment/materials/materials-14-04580/article_deploy/materials-14-04580.pdf
  CC BY 4.0 on page 1; partial AI text review, no raw retention or visual check.
- Keep the recycled-fines and hemp experiments separate. Hemp series uses slag,
  volume-based sand substitution and additional activator for hemp after poor
  workability. Fines-series heat cure must not transfer to hemp-series records.
- Next: inspect Table 9 and §§2.4.1–2.4.2 visually, qualify the extra activator,
  resolve overlapping draft/final PDF layers and questionable density units in
  Table 2, inventory all outcomes and check publication status. No numerical import.
- Hornification repository recheck still provides abstract only, no PDF link;
  do not upgrade access from search snippets. OpenAlex remains on hold.

## Next extraction checkpoint — direct calcined-clay/slag hempcrete
- Topic source DOI 10.1108/BEPAM-03-2024-0056, Nair et al.,
  “Suitability of calcined clay and ground granulated blast furnace slag
  geopolymer binder for hempcrete applications”. Added through PR #15.
- Author-hosted full text observed through session web tool:
  https://drgan.net/files/pubs/169_BEPAM_2025.pdf ; institutional identity:
  https://opus.lib.uts.edu.au/handle/10453/185061 . PDF page 1 states CC BY 4.0.
  Exact publication/version date remains to reconcile; acceptance is not publication.
- Partial AI text review only. Table 1 lists three mixes; §§2.3–3 give preparation,
  ambient curing and tests. Pre-wetting water is additional to listed free water.
  Preserve this distinction before any calculator transfer. No numeric ingestion.
- Inventory next: Table 1; Figures 1–2 hurd characterization, Figure 3 earlier
  mortar dataset (not hempcrete), Figures 4–8 outcomes/relationships, Plate 1 setup.
  No visual inspection or digitization yet. Check conditioning, uncertainty,
  material assays, complete water accounting and version identity.
- Hold structural/LCA generalizations: application framing and later structural
  language conflict; full LCA and long-term durability are future work.
- Related source https://drgan.net/files/pubs/174_MS_2025.pdf now partly reviewed;
  check shared datasets before counting independent evidence.
- Follow-up institutional/status web request returned tool error; correction
  clearance remains unknown. OpenAlex not used. No raw source retained.

## Latest checkpoint — hemp methods and offline queue, 16 October 2026
- Continued after the owner's evening request. Publisher red-mud/hemp v3 PDF is
  accessible; topic source upgraded to partial full-text review. See the new
  hemp-methods-followup audit. No new recipes or numerical observations.
- Preserve solid-volume fiber basis, unresolved curing/tensile age and PDF-layer
  conflicts. Compression is separate from Brazilian tension. Screenshot tool
  returned placeholders only; no visual or graph verification is claimed.
- Added `npm run research:queue -- hemp`; JSON via
  `npm run --silent research:queue -- --json hemp`. It deduplicates topic DOIs,
  joins canonical IDs and retains all dated contexts/next checks without picking
  the strongest evidence label. No network calls or ingestion; not the whole backlog.
- Local 20 Node test files, 180-route build and focused desktop/mobile research
  browser suite pass. GitHub CI 38995418584 passed all checks on f2b2fb0.
  PR #14 merged as ca543bd7402004835d49729e77581d7ceb1b31bd.
  Live deployment identity still requires verification. Shell synchronization succeeded
  on retry after the
  reported reset time; completed release and new work are preserved locally.
- One-time 4:30 a.m. Eastern October 17 continuation confirmed. Existing daily
  draft automation unchanged; OpenAlex remains on hold. No reset guarantee.

## Resume and preservation
- Read AGENTS.md, SUBAGENT_POLICY.md and KNOWLEDGE_ENGINE_MASTER_PROMPT.md.
  OpenAlex remains on hold. Keep existing daily automation and confirmed one-time
  4:30 a.m. Eastern October 17 continuation unchanged.
- Recover local work before switching to main. Preserve
  recovery/completed-biochar-d9efdb0. PRs #12–16 are merged; exact verification and local state above.
- Current canonical totals: 161 publications, five partial studies, 62 mixes,
  275 observations. Recipe catalog: 43 designs, 31 scalable. Do not combine the
  recipe characterization cells with canonical pilot counts.
- Remaining pilot/recipe work: source-qualified biochar assays and figures; foam
  IDs, quantities and heat-capacity units; graph uncertainty and missing methods.
  Read the relevant batch audit before repeating extraction or failed access.
- Use research/batches/ and research/briefings/ for evidence; npm run research:queue
  -- hemp for topic leads. The queue is not the entire research backlog.
- Historical release evidence, pilot limitations and architecture map are retained
  in [the checkpoint archive](research/handoffs/history-through-2026-10-16.md).
  Historical pending-language is superseded by newer checkpoints.
- Keep calculator/notebook storage keys, source IDs and unknown values intact.
  AI source review is not human/domain review. No unsupported numeric transfer.
