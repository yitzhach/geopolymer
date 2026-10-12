import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {pilot} from '../src/knowledge-pilot.js';
import {auditFactorSummaries} from '../scripts/audit-factor-summaries.mjs';
test('factor audit preserves disagreements and excludes follow-up mixes from the orthogonal array',()=>{
 const report=auditFactorSummaries();assert.equal(report.checks.length,216);
 const disputed=report.checks.filter(c=>c.status==='disagreement');assert.equal(disputed.length,18);
 const a=disputed.find(c=>c.table==='Table 6'&&c.factor==='A'&&c.row==='K4');assert.equal(a.sourceText,'28.96');assert.equal(a.calculated,28.53);
 assert.ok(report.checks.every(c=>c.inputObservationIds.every(id=>!pilot.observations.find(o=>o.id===id).mixId.endsWith('-validation'))));
 assert.deepEqual(report,JSON.parse(fs.readFileSync(new URL('../research/batches/phase-a-factor-audit.json',import.meta.url))));
});
