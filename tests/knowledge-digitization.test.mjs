import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {pilot} from '../src/knowledge-pilot.js';
import {library} from '../src/research-library.js';
import {validateKnowledge,searchEvidence,publicKnowledge} from '../src/knowledge-core.js';
import {validDigitization} from '../src/knowledge-digitization.js';
const estimated=pilot.observations.filter(o=>o.qualifier==='estimated');
test('calibrated figure means have reproducible coordinates, second checks and separate missing experimental SD',()=>{
 const audit=JSON.parse(fs.readFileSync(new URL('../research/batches/phase-a-graph-audit.json',import.meta.url)));
 assert.equal(estimated.length,12);assert.equal(audit.checks.length,12);
 for(const o of estimated){
  assert.ok(validDigitization(o));assert.equal(o.uncertainty,null);assert.equal(o.ageDays,3);
  const c=audit.checks.find(c=>c.observationId===o.id);assert.equal(c.value,o.value);assert.deepEqual(c.digitization,o.digitization);
  const [a,b]=o.digitization.axis;
  for(const t of audit.axisCrosscheck[o.digitization.panel])assert.ok(Math.abs(a.value+(t.pixelY-a.pixelY)*(b.value-a.value)/(b.pixelY-a.pixelY)-t.value)<.001);
 }
 assert.equal(estimated.find(o=>o.mixId==='902-Na-N-2.5').value,.934);
 assert.equal(estimated.find(o=>o.mixId==='902-K-KA22-1.5').value,.851);
});
test('estimates never enter exact search but exports preserve graph status and uncertainty',()=>{
 assert.equal(searchEvidence(pilot,library,{property:'shape-retention-ratio',unit:'ratio'}).total,0);
 assert.equal(searchEvidence(pilot,library,{}).total,252);
 const out=publicKnowledge(pilot,library).observations.filter(o=>o.qualifier==='estimated');assert.deepEqual(out,estimated);
 for(const mutation of [o=>delete o.digitization,o=>o.digitization.axis[1].pixelY=o.digitization.axis[0].pixelY,o=>o.digitization.readingAllowance=0,o=>o.digitization.review.secondPixelY+=10,o=>o.value+=.01,o=>o.qualifier='reported']){
  const d=structuredClone(pilot),o=d.observations.find(o=>o.qualifier==='estimated');mutation(o);
  assert.ok(validateKnowledge(d,library).some(e=>/graph|Graph/.test(e)));
 }
});
