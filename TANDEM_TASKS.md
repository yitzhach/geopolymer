# Tandem tasks for a lower-cost agent

Routine work that can run in parallel with the main development sessions without touching
site code. Each lane writes only to its own files, works on its own branch and ends in a pull
request that the primary agent (or the owner) reviews before it reaches main. Choose a smaller,
lower-cost model for these sessions.

## Rules for every lane

- Read `AGENTS.md` and this file's lane section. Nothing else is required unless the lane says so.
- Branch: `tandem/<lane>-<YYYY-MM-DD>` from the latest `main`. Never push to `main`; open a pull
  request to `main` titled `Tandem <lane>: <what>` and stop.
- Edit only the files your lane lists. Never edit `src/`, `scripts/`, `tests/`, `index.html`,
  `HANDOFF.md`, standards (`*_STANDARD.md`), schedules or workflow files. Put batch counts and
  open questions in the pull request body, not in `HANDOFF.md`.
- Never invent a DOI, title, number, licence or locator. Unknown stays unknown, with a reason.
- Never copy abstracts, full tables, figures or paper text into the repository. Short factual
  notes and locators (for example "Table 2, p. 4") only.
- No paywall or login bypass, no CAPTCHA solving, no retry loops. OpenAlex stays on hold: do not
  call its API. Ordinary web search and publisher/DOI landing pages are fine.
- Do not delegate to other agents. Do not write model names into files, commits or PR text.
- Run the lane's check before the PR. If it fails twice on the same item, drop that item and
  note it in the PR body.
- One session per lane at a time, so two sessions never edit the same file.

---

## Lane A — mix sheets from reviewed notes (highest value, ready now)

Turns the site's already-reviewed deep-dive notes into structured rows for the Mix Explorer.
No paper is opened. The queue `research/mix-sheets/QUEUE.json` holds 99 open guides.

- Files: `research/mix-sheets/<guideId>.json` (new) and `skip` reasons in
  `research/mix-sheets/QUEUE.json`. Nothing else.
- Procedure: `.claude/skills/mix-sheet/SKILL.md` (the `/mix-sheet` skill) and
  `MIX_SHEET_STANDARD.md`. Skip the skill's "update HANDOFF.md" finish step; report counts
  (`npm run mixes -- stats`) in the PR body instead.
- Batch: 5–10 guides per session, taken in queue order (`npm run mixes -- queue --next 10`).
  Expect about half to be skipped (no labelled mix in the notes); that is a valid result.
- Check: `npm run mixes -- check`, `npm test` and `npm run build` all pass.

Kickoff prompt:

> Work on yitzhach/geopolymer, lane A in TANDEM_TASKS.md. Use the mix-sheet skill on the next
> 10 entries of research/mix-sheets/QUEUE.json (write a sheet or a skip reason for each). Run
> the checks, then open a pull request from branch tandem/mix-sheets-<today> with the stats.

---

## Lane B — new paper candidates (grows the library)

Finds open-access geopolymer papers that report full mix proportions and are not yet in the
library. Records metadata only; the primary agent decides what enters the site.

- Files: `research/tandem/candidates/<YYYY-MM-DD>.json` (new file per session).
- Focus (rotate per session): ambient-cured fly ash/slag; metakaolin; one-part mixes;
  fibre-reinforced composites; coatings and repair mortars; waste-derived precursors;
  admixtures (superplasticizers, retarders); shrinkage and durability. Prefer papers with
  CC BY licences and a labelled mix-proportion table.
- Duplicate check, for every DOI before adding it: `grep -ril "<doi>" src/ research/` returns
  nothing. A hit means it is already known; leave it out.
- Limit: at most 25 candidates or 40 search/fetch operations per session.
- Record per candidate:

```json
{
  "doi": "10.xxxx/xxxxx",
  "title": "exact title from the landing page",
  "year": 2024,
  "journal": "journal name",
  "url": "landing page you opened",
  "licence": "CC BY 4.0 | other text as shown | unknown",
  "openAccess": true,
  "mixTable": "Table 2 (labelled mixes with kg/m3) | none seen | not checked",
  "precursors": ["fly ash", "GGBS"],
  "topic": "one short phrase",
  "query": "the exact search you ran",
  "checked": "YYYY-MM-DD"
}
```

- File shape: `{"lane": "B", "date": "...", "queries": ["..."], "candidates": [...], "excluded": [{"doi": "...", "reason": "duplicate | paywalled | not geopolymer | no mix data"}]}`.
- Check: `node -e "JSON.parse(require('fs').readFileSync(process.argv[1]))" <file>` succeeds, and every DOI passed the duplicate check.

Kickoff prompt:

> Work on yitzhach/geopolymer, lane B in TANDEM_TASKS.md. Focus: <topic>. Find up to 25
> open-access geopolymer papers with labelled mix-proportion tables that are not already in
> the repository, record them in research/tandem/candidates/<today>.json, and open a pull
> request from branch tandem/candidates-<today>.

---

## Lane C — mix-table locators for skipped guides (prepares numeric extraction)

Many guides were skipped because the site's notes name no mix. This lane opens the paper's
landing page and records only where the mix table is and whether its licence allows
extraction, so a later source-text session can go straight to it. It does not copy values.

- Files: `research/tandem/locators/<YYYY-MM-DD>.json` (new file per session).
- Targets: queue entries with a `skip` field in `research/mix-sheets/QUEUE.json` and
  `research/mix-sheets/_QUEUE-fly-ash-slag-pilot.json`; the DOI is on each entry.
- Limit: at most 5 papers per session (the repository's source-access rule).
- Record per paper: `guideId`, `doi`, `url` opened, `licence` as shown, `mixTable` locator
  (e.g. "Table 3: 9 labelled mixes, kg/m3") or `"none found"`, `labels` (the mix names as
  printed, e.g. `["M1", "M2", "REF"]`), `resultsTable` locator or `"figures only"`, `access`
  (`"opened"`, `"paywalled"`, `"failed: <error>"`) and `checked` date.
- Check: the file parses as JSON and every `guideId` exists in a queue file.

Kickoff prompt:

> Work on yitzhach/geopolymer, lane C in TANDEM_TASKS.md. Take the first 5 skipped entries
> in the mix-sheet queue files that have no locator yet, record their mix-table locators in
> research/tandem/locators/<today>.json, and open a pull request from branch
> tandem/locators-<today>.

---

## Lane D — link and DOI health report

Checks that the library's DOI and source links still resolve, so dead links and withdrawn
papers are found early.

- Files: `research/tandem/link-checks/<YYYY-MM-DD>.json` (new file per session).
- List the targets with `node -e "import('./src/research-library.js').then(m=>console.log(m.library.slice(0,100).map(p=>p.doi).join('\n')))"`
  (change the slice for the next block of 100; record which block you checked).
- For each: one request to `https://doi.org/<doi>` (follow redirects). Record `doi`, final
  `status` code, final host, and `note` for anything that is not 200 (404, a retraction or
  withdrawal notice on the landing page, a 403 bot block). A 403 is "blocked", not "dead".
- No retries beyond one, and pause about a second between requests.
- Check: the file parses as JSON; the PR body lists only the non-200 results.

Kickoff prompt:

> Work on yitzhach/geopolymer, lane D in TANDEM_TASKS.md. Check DOIs 1–100 of the research
> library, record the results in research/tandem/link-checks/<today>.json, and open a pull
> request from branch tandem/link-checks-<today> listing the problems.

---

## How the primary agent uses the output

- Lane A pull requests merge after a spot check of the attribution lists.
- Lane B candidates feed the next library batch (metadata enters the site only through the
  research workflow in `KNOWLEDGE_ENGINE_MASTER_PROMPT.md`).
- Lane C locators feed source-text mode (pending the owner's decision in `HANDOFF.md`).
- Lane D problems become source-status updates in the library.
