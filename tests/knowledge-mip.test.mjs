import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {pilot} from '../src/knowledge-pilot.js';
import {library} from '../src/research-library.js';
import {searchEvidence,publicKnowledge} from '../src/knowledge-core.js';
test('MIP specimen columns remain individual observations within their original mixtures',()=>{
 const audit=JSON.parse(fs.readFileSync(new URL('../research/batches/phase-a-mip-audit.json',import.meta.url)));
 const obs=pilot.observations.filter(o=>o.publicationId==='ke-211'&&o.property.startsWith('mip-'));
 assert.equal(obs.length,8);assert.equal(new Set(obs.map(o=>o.specimenId)).size,4);assert.equal(new Set(obs.map(o=>o.mixId)).size,2);
 for(const c of audit.checks){const o=obs.find(o=>o.id===c.observationId);assert.equal(o.originalText,c.originalText);assert.equal(o.value,Number(c.originalText));assert.equal(o.specimenId,c.sourceColumn);assert.equal(o.unit,c.unit);assert.equal(o.ageDays,28);assert.equal(o.uncertainty,null);assert.equal(pilot.tests.find(t=>t.id===o.testId).n,1);}
 const r=searchEvidence(pilot,library,{property:'mip-critical-pore-diameter',unit:'nm',activation:'potassium',ageDays:28,min:2000});assert.equal(r.total,1);assert.equal(r.exact[0].observation.specimenId,'M50-K-1');assert.equal(r.exact[0].observation.value,2095);
 assert.equal(searchEvidence(pilot,library,{property:'mip-porosity',unit:'%',activation:'sodium',min:14}).total,1);
 assert.ok(publicKnowledge(pilot,library).observations.some(o=>o.specimenId==='M50-Na-2'&&o.value===13.4));
});
