# Geopolymer — current handoff
Updated 17 October 2026 (UTC); research checked 16 October Eastern.

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
- Local HEAD remains 79f41c5 with staged tree dbe4a479 matching cb99c0c.
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
- New candidate DOI 10.1108/BEPAM-03-2024-0056, Nair et al.,
  “Suitability of calcined clay and ground granulated blast furnace slag
  geopolymer binder for hempcrete applications”. No match in src/research searches.
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
  recovery/completed-biochar-d9efdb0. PRs #12–15 are merged; exact verification and local state above.
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
