import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {library} from '../src/research-library.js';
import {knowledgeExpansion400} from '../src/knowledge-expansion-400.js';
import {reconcileBatch} from '../src/knowledge-core.js';
import {answerResearch} from '../src/assistant-core.js';
import {deepDives} from '../src/deep-dives.js';
const read=n=>JSON.parse(fs.readFileSync(new URL('../research/batches/'+n,import.meta.url)));
test('four bounded batches preserve 300 identities and add 100 unique metadata records',()=>{
 assert.deepEqual(library.slice(0,300).map(({id,doi,title})=>({id,doi,title})),read('breadth-2026-10-19-300-baseline.json'));
 assert.equal(knowledgeExpansion400.length,100);assert.equal(library.length,500);assert.equal(new Set(library.map(p=>p.doi.toLowerCase())).size,500);
 let records=library.slice(0,300);
 for(const n of [11,12,13,14]){const a=read(`breadth-${n}-2026-10-19.json`);assert.equal(a.records.length,25);assert.ok(a.strategy.primaryVerification<=40);records=reconcileBatch(records,a.records).records;assert.equal(records.length,a.final);assert.ok(reconcileBatch(records,a.records).events.every(e=>e.status==='unchanged'));}
 for(const p of knowledgeExpansion400){assert.equal(p.extraction,'unstarted');assert.equal(p.datasetFamilyId,null);assert.ok(!p.summary&&!p.abstract&&!p.observations);assert.ok(p.metadataLocator&&p.rights.basis);}
});
test('bibliographic caveats survive export and correction blocks assistant evidence',async()=>{
 const get=doi=>library.find(p=>p.doi===doi);
 assert.equal(get('10.1021/acsomega.4c06227').year,2025);
 assert.equal(get('10.1007/s40891-021-00341-3').year,2021);
 assert.equal(get('10.1002/cepa.2769').type,'Conference paper');
 assert.match(get('10.1016/j.eti.2020.101105').metadataLocator,/Reference 113/);
 const p=get('10.1016/j.conbuildmat.2023.133403');assert.equal(p.sourceStatus.state,'update-requires-review');assert.equal(p.sourceStatus.updates[0].DOI,'10.1016/j.conbuildmat.2023.134686');
 const answer=await answerResearch({question:p.doi});assert.ok(!answer.sources.some(s=>s.id===p.id));
});
test('durability guides preserve missing-data and denominator distinctions',()=>{
 const freeze=deepDives.find(p=>p.id==='metakaolin-freeze-thaw-design');assert.match(JSON.stringify(freeze),/untestable/);assert.match(JSON.stringify(freeze),/units.*unresolved/);
 const carbonate=deepDives.find(p=>p.id==='carbonate-slag-hydroxide-balance');assert.match(JSON.stringify(carbonate),/0.435/);assert.match(JSON.stringify(carbonate),/0.455/);assert.match(JSON.stringify(carbonate),/increases autogenous shrinkage/);
});
