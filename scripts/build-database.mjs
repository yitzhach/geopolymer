// Builds the derived knowledge database from the validated JavaScript sources.
// Usage: node scripts/build-database.mjs [output.sqlite]
// Requires Node 22.5+ for the built-in node:sqlite module. No npm dependencies.
import {DatabaseSync} from 'node:sqlite';
import {mkdirSync, readFileSync, rmSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {pilot} from '../src/knowledge-pilot.js';
import {library} from '../src/research-library.js';
import {knowledgeReferences} from '../src/knowledge-references.js';
import {validateKnowledge} from '../src/knowledge-core.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const defaultDatabasePath = resolve(root, 'data/geopolymer.sqlite');
const schemaPath = resolve(root, 'database/schema.sql');

// node:sqlite rejects undefined and booleans. Absent values become NULL, and
// structured values are stored as JSON text in the same column.
const cell = v => {
  if (v === undefined || v === null) return null;
  if (typeof v === 'boolean') return v ? 1 : 0;
  if (typeof v === 'object') return JSON.stringify(v);
  return v;
};
const json = v => (v === undefined || v === null ? null : JSON.stringify(v));
const flag = v => (v ? 1 : 0);

function insertRows(db, table, columns, rows) {
  const stmt = db.prepare(`INSERT INTO ${table} (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`);
  for (const row of rows) stmt.run(...row.map(cell));
  return rows.length;
}

const count = (db, sql) => db.prepare(sql).get().n;

export function buildDatabase(outPath = defaultDatabasePath) {
  const errors = validateKnowledge(pilot, library);
  if (errors.length) throw new Error(`Refusing to build; validation failed:\n${errors.join('\n')}`);

  const referenceById = new Map(knowledgeReferences.map(r => [r.id, r]));
  const schema = readFileSync(schemaPath, 'utf8');

  mkdirSync(dirname(outPath), {recursive: true});
  for (const suffix of ['', '-journal', '-wal', '-shm']) rmSync(outPath + suffix, {force: true});

  const db = new DatabaseSync(outPath);
  try {
    db.exec('PRAGMA foreign_keys = ON;');
    db.exec(schema);
    db.exec('BEGIN');
    try {
      insertRows(db, 'schema_meta', ['key', 'value'], [
        ['schema_version', String(pilot.schemaVersion)],
        ['pilot_batch_id', String(pilot.batchId)],
        ['built_at', new Date().toISOString()],
      ]);

      insertRows(db, 'publications', ['id', 'doi', 'year', 'title', 'journal', 'type', 'topic', 'url', 'checked', 'access', 'extraction', 'verification', 'editorial', 'library_json', 'reference_json'],
        library.map(p => {
          const ref = referenceById.get(p.id);
          return [p.id, p.doi, p.year, p.title, p.journal, p.type, p.topic, p.url, p.checked, p.access,
            ref?.extraction, ref?.verification, ref?.editorial, json(p), json(ref)];
        }));

      insertRows(db, 'assets', ['id', 'publication_id', 'version', 'url', 'sha256', 'rights_holder', 'license', 'license_url', 'rights_evidence_url', 'checked', 'policy_version', 'attribution', 'export_decision', 'operations_json'],
        pilot.assets.map(a => [a.id, a.publicationId, a.version, a.url, a.sha256, a.rightsHolder, a.license, a.licenseUrl,
          a.rightsEvidenceUrl, a.checked, a.policyVersion, a.attribution, a.operations?.export?.decision, json(a.operations)]));

      insertRows(db, 'studies', ['publication_id', 'asset_id', 'dataset_family_id', 'access', 'extraction', 'verification', 'editorial', 'coverage_note', 'source_hash', 'methods_json', 'method_provenance_json', 'limitations_json', 'inventory_json', 'tables_json'],
        pilot.studies.map(s => [s.publicationId, s.assetId, s.datasetFamilyId, s.access, s.extraction, s.verification, s.editorial,
          s.coverageNote, s.sourceHash, json(s.methods), json(s.methodProvenance), json(s.limitations), json(s.inventory), json(s.tables)]));

      insertRows(db, 'materials', ['id', 'publication_id', 'family', 'source', 'grade', 'lot', 'lot_missing_reason', 'record_type', 'supplier_offering_id', 'store_sku', 'qualification_json', 'provenance_json'],
        pilot.materials.map(m => [m.id, m.publicationId, m.family, m.source, m.grade, m.lot, m.lotMissingReason, m.recordType,
          m.supplierOfferingId, m.storeSku, json(m.qualification), json(m.provenance)]));

      insertRows(db, 'mixes', ['id', 'publication_id', 'original_id', 'dataset_family_id', 'binder', 'activation', 'slag_percent', 'slag_basis', 'calculator_eligible', 'calculator_blocker', 'provenance_json', 'derivation_json'],
        pilot.mixes.map(m => [m.id, m.publicationId, m.originalId, m.datasetFamilyId, m.binder, m.activation, m.slagPercent,
          m.slagBasis, flag(m.calculatorEligible), m.calculatorBlocker, json(m.provenance), json(m.derivation)]));

      insertRows(db, 'mix_quantities', ['mix_id', 'seq', 'material', 'original_text', 'value', 'unit', 'basis'],
        pilot.mixes.flatMap(m => m.quantities.map((q, i) => [m.id, i + 1, q.material, q.originalText, q.value, q.unit, q.basis])));

      insertRows(db, 'mix_materials', ['mix_id', 'material_id'],
        pilot.mixes.flatMap(m => (m.materialIds ?? []).map(materialId => [m.id, materialId])));

      insertRows(db, 'tests', ['id', 'publication_id', 'property', 'geometry', 'method', 'cure', 'n', 'direction', 'substrate', 'provenance_json'],
        pilot.tests.map(t => [t.id, t.publicationId, t.property, t.geometry, t.method, t.cure, t.n, t.direction, t.substrate, json(t.provenance)]));

      insertRows(db, 'observations', ['id', 'publication_id', 'mix_id', 'test_id', 'property', 'original_text', 'value', 'unit', 'age_days', 'age_origin', 'exposure_days', 'missing_reason', 'qualifier', 'uncertainty', 'uncertainty_reason', 'verification', 'specimen_id', 'is_estimate', 'digitization_json', 'provenance_json'],
        pilot.observations.map(o => [o.id, o.publicationId, o.mixId, o.testId, o.property, o.originalText, o.value, o.unit,
          o.ageDays, o.ageOrigin, o.exposureDays, o.missingReason, o.qualifier, o.uncertainty, o.uncertaintyReason,
          o.verification, o.specimenId, flag(o.digitization || o.qualifier === 'estimated'), json(o.digitization), json(o.provenance)]));

      insertRows(db, 'findings', ['id', 'publication_id', 'direction', 'text', 'claim_type', 'verification', 'provenance_json'],
        pilot.findings.map(f => [f.id, f.publicationId, f.direction, f.text, f.claimType, f.verification, json(f.provenance)]));

      insertRows(db, 'finding_mixes', ['finding_id', 'mix_id'],
        pilot.findings.flatMap(f => (f.mixIds ?? []).map(mixId => [f.id, mixId])));

      insertRows(db, 'relationships', ['id', 'publication_id', 'type', 'related_publication_id', 'evidence_ids_json', 'scope', 'verification'],
        pilot.relationships.map(r => [r.id, r.publicationId, r.type, r.relatedPublicationId, json(r.evidenceIds), r.scope, r.verification]));

      db.exec('COMMIT');
    } catch (error) {
      db.exec('ROLLBACK');
      throw error;
    }

    const foreignKeyProblems = db.prepare('PRAGMA foreign_key_check').all();
    if (foreignKeyProblems.length) throw new Error(`Foreign key check failed: ${JSON.stringify(foreignKeyProblems.slice(0, 5))}`);
    const integrity = db.prepare('PRAGMA integrity_check').get();
    if (Object.values(integrity)[0] !== 'ok') throw new Error(`Integrity check failed: ${JSON.stringify(integrity)}`);

    const counts = {
      publications: count(db, 'SELECT COUNT(*) AS n FROM publications'),
      assets: count(db, 'SELECT COUNT(*) AS n FROM assets'),
      studies: count(db, 'SELECT COUNT(*) AS n FROM studies'),
      materials: count(db, 'SELECT COUNT(*) AS n FROM materials'),
      mixes: count(db, 'SELECT COUNT(*) AS n FROM mixes'),
      tests: count(db, 'SELECT COUNT(*) AS n FROM tests'),
      observations: count(db, 'SELECT COUNT(*) AS n FROM observations'),
      estimated_observations: count(db, 'SELECT COUNT(*) AS n FROM observations WHERE is_estimate = 1'),
      exact_numeric_observations: count(db, 'SELECT COUNT(*) AS n FROM exact_numeric_observations'),
      findings: count(db, 'SELECT COUNT(*) AS n FROM findings'),
      relationships: count(db, 'SELECT COUNT(*) AS n FROM relationships'),
    };

    // Each source table must land with exactly the rows its JavaScript source holds.
    const expected = {
      publications: library.length,
      assets: pilot.assets.length,
      studies: pilot.studies.length,
      materials: pilot.materials.length,
      mixes: pilot.mixes.length,
      tests: pilot.tests.length,
      observations: pilot.observations.length,
      findings: pilot.findings.length,
      relationships: pilot.relationships.length,
    };
    for (const [table, n] of Object.entries(expected)) {
      if (counts[table] !== n) throw new Error(`Row count mismatch in ${table}: ${counts[table]} != ${n}`);
    }
    return counts;
  } finally {
    db.close();
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const outPath = resolve(process.argv[2] ?? defaultDatabasePath);
  const counts = buildDatabase(outPath);
  console.log(JSON.stringify({database: outPath, counts}, null, 2));
}
