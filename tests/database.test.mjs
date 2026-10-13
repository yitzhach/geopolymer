import {test, after} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {DatabaseSync} from 'node:sqlite';
import {buildDatabase} from '../scripts/build-database.mjs';
import {pilot} from '../src/knowledge-pilot.js';
import {library} from '../src/research-library.js';

const dir = mkdtempSync(join(tmpdir(), 'geopolymer-db-'));
const path = join(dir, 'test.sqlite');
const counts = buildDatabase(path);
const db = new DatabaseSync(path, {readOnly: true});
after(() => { db.close(); rmSync(dir, {recursive: true, force: true}); });

const scalar = (sql, ...params) => Object.values(db.prepare(sql).get(...params))[0];

test('row counts match the validated JavaScript sources and handoff figures', () => {
  assert.equal(counts.publications, library.length);
  assert.equal(counts.publications, 161);
  assert.equal(counts.studies, 5);
  assert.equal(counts.mixes, 62);
  assert.equal(counts.observations, 275);
  assert.equal(counts.findings, 12);
  assert.equal(counts.materials, 18);
});

test('exact numeric view excludes censored values and graph estimates', () => {
  const expectedExact = pilot.observations.filter(o => o.value !== null && o.qualifier === 'reported' && !o.digitization).length;
  const expectedEstimates = pilot.observations.filter(o => o.digitization || o.qualifier === 'estimated').length;
  assert.equal(counts.exact_numeric_observations, expectedExact);
  assert.equal(counts.exact_numeric_observations, 260);
  assert.equal(counts.estimated_observations, expectedEstimates);
  assert.equal(counts.estimated_observations, 12);
  assert.equal(scalar('SELECT COUNT(*) AS n FROM exact_numeric_observations WHERE is_estimate = 1'), 0);
  assert.equal(scalar('SELECT COUNT(*) AS n FROM observations WHERE value IS NULL'), 3);
});

test('foreign keys and integrity hold after the build', () => {
  assert.deepEqual(db.prepare('PRAGMA foreign_key_check').all(), []);
  assert.equal(scalar('PRAGMA integrity_check'), 'ok');
});

test('same-mix join returns each observation with its mix and publication', () => {
  const rows = db.prepare(`
    SELECT o.id, o.value, m.original_id, p.id AS publication_id
    FROM observations o
    JOIN mixes m ON m.id = o.mix_id
    JOIN publications p ON p.id = o.publication_id
    WHERE o.mix_id = ?`).all('2957-N1');
  assert.ok(rows.length > 0);
  for (const row of rows) {
    assert.equal(row.original_id, 'N1');
    assert.equal(row.publication_id, 'ke-2957');
  }
});

test('asset export decisions and source provenance are stored unchanged', () => {
  for (const asset of pilot.assets) {
    const row = db.prepare('SELECT export_decision, sha256, rights_evidence_url FROM assets WHERE id = ?').get(asset.id);
    assert.equal(row.export_decision, asset.operations.export.decision);
    assert.equal(row.sha256, asset.sha256);
    assert.equal(row.rights_evidence_url, asset.rightsEvidenceUrl);
  }
  const provenance = JSON.parse(scalar('SELECT provenance_json FROM observations WHERE id = ?', '2957-obs-1'));
  assert.deepEqual(provenance, pilot.observations.find(o => o.id === '2957-obs-1').provenance);
});

test('rebuilding replaces the database file instead of appending rows', () => {
  const second = buildDatabase(path);
  assert.equal(second.observations, 275);
  assert.equal(second.publications, 161);
});
