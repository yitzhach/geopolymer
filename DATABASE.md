# Geopolymer knowledge database

A relational SQLite database derived from the validated knowledge sources. It makes
the bibliography, rights records, experimental observations, mixes, findings and
materials queryable together, with joins back to source locators.

## Status and source of truth

- The JavaScript modules remain canonical: `src/research-library.js` (publications),
  `src/knowledge-references.js` (full reference records) and `src/knowledge-pilot.js`
  (assets, studies, mixes, tests, observations, findings, materials, relationships).
- The database is **derived and rebuildable**. It is generated into `data/`, which
  is git-ignored. Do not hand-edit it. Change the source modules, rebuild, and run tests.
- Not in the public site. The production build does not read or copy the database.
- Pilot scope is unchanged: 5 partial full-text extractions. Bibliography-only records
  have no observations. See HANDOFF.md for the current extraction gaps.

## Build and verify

```sh
npm run db:build                  # writes data/geopolymer.sqlite
node scripts/build-database.mjs /path/to/other.sqlite
npm test                          # includes tests/database.test.mjs
```

Requires Node 22.5 or later for the built-in `node:sqlite` module. The package has
no npm dependencies. The first run prints an ExperimentalWarning; this is expected.

The build:
1. Runs `validateKnowledge()` and refuses to write if it reports any error.
2. Recreates the file from scratch, then loads everything in one transaction.
3. Checks foreign keys and integrity, and compares each table's row count with its source.

Current counts: 161 publications, 5 assets, 5 studies, 18 materials, 62 mixes,
23 tests, 275 observations (260 exact numeric, 12 graph estimates, 3 censored),
12 findings, 1 relationship.

## Schema (`database/schema.sql`)

| Table | Holds |
|---|---|
| `publications` | One row per DOI record. Typed fields plus `library_json` and `reference_json` (full source records). |
| `assets` | Source-article rights: version, SHA-256, license, rights evidence, per-operation decisions as JSON. `export_decision` is a typed column. |
| `studies` | Pilot study metadata: methods, limitations, inventory and table index as JSON. |
| `mixes` / `mix_quantities` / `mix_materials` | Formulations, ordered quantities with original text, and links to materials. |
| `tests` / `observations` | Test conditions and each measured value, with original text, age, qualifier, uncertainty and provenance. |
| `findings` / `finding_mixes` | Unfavorable, null or mixed findings and the mixes they cite. |
| `materials` | Material identities and qualification notes. Not linked to supplier offerings. |
| `relationships` | Cross-publication links such as corrections. |
| `schema_meta` | Schema version, pilot batch ID and build time. |

Key view: `exact_numeric_observations` applies the existing exact-search rule. It
includes reported, non-censored values that are not graph estimates. Graph estimates
stay visible through `is_estimate = 1`.

Example: the observations for one formulation, with its publication:

```sql
SELECT o.property, o.age_days, o.value, o.unit, o.original_text, p.doi
FROM observations o
JOIN publications p ON p.id = o.publication_id
WHERE o.mix_id = '2957-N1'
ORDER BY o.property, o.age_days;
```

Open it with the built-in client:

```sh
node -e "const {DatabaseSync}=require('node:sqlite');const db=new DatabaseSync('data/geopolymer.sqlite',{readOnly:true});console.log(db.prepare('SELECT COUNT(*) n FROM observations').get())"
```

## Rules the database does not enforce

- **Rights and public release.** The database holds everything, including assets that
  are denied or unknown for export. Before any data leaves the build, use
  `publicKnowledge()` in `src/knowledge-core.js`. Never serve tables directly.
- **Correction holds.** Dependent evidence is suppressed only by the JavaScript
  boundary. Views such as `exact_numeric_observations` do not apply them.
- **Private ingestion assets** must stay outside `src/`, `dist/` and Git (see
  KNOWLEDGE_ENGINE.md).

## Moving to Claude Code or Cloudflare D1

- `database/schema.sql` is plain SQLite DDL without vendor extensions. It contains no
  `BEGIN`/`COMMIT` or `PRAGMA`, so it can be applied with `wrangler d1 execute --file`.
- **Not done yet:** the builder writes only to a local SQLite file. There is no D1
  loader, no migration, and no test against a live D1 database. A D1 path needs a
  separate, reviewed step.
- Once the database becomes the store, change the JavaScript modules to read from it.
  Keep stable IDs and the rule that graph estimates never enter exact search.
