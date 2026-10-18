import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {library} from '../src/research-library.js';
import {knowledgeExpansionNext} from '../src/knowledge-expansion-next.js';
import {reconcileBatch} from '../src/knowledge-core.js';
const read=name=>JSON.parse(fs.readFileSync(new URL('../research/batches/'+name,import.meta.url)));
test('49 additions preserve the published 201 identities and reconcile idempotently',()=>{
 const baseline=read('breadth-2026-10-18-baseline.json');assert.equal(baseline.length,201);
 assert.deepEqual(library.slice(0,201).map(({id,doi,title})=>({id,doi,title})),baseline);
 assert.equal(knowledgeExpansionNext.length,49);assert.equal(library.length,250);
 assert.equal(new Set(library.map(p=>p.doi.toLowerCase())).size,250);
 let records=library.slice(0,201);
 for(const [n,count] of [[7,25],[8,24]]){const audit=read(`breadth-${n}-2026-10-18.json`);assert.equal(audit.records.length,count);records=reconcileBatch(records,audit.records).records;assert.equal(records.length,audit.final);assert.ok(reconcileBatch(records,audit.records).events.every(e=>e.status==='unchanged'));}
 for(const p of knowledgeExpansionNext){assert.equal(p.extraction,'unstarted');assert.equal(p.datasetFamilyId,null);assert.ok(!p.abstract&&!p.summary&&!p.observations);assert.match(p.metadataSource,/^https:/);}
 assert.equal(library.filter(p=>p.doi==='10.3390/polym18111288').length,1);
});
