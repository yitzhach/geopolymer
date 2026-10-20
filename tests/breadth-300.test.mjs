import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {library,libraryResults} from '../src/research-library.js';
import {knowledgeExpansion300} from '../src/knowledge-expansion-300.js';
import {reconcileBatch} from '../src/knowledge-core.js';
const read=name=>JSON.parse(fs.readFileSync(new URL('../research/batches/'+name,import.meta.url)));
test('two bounded batches add 50 unique records while preserving all 250 identities',()=>{
 const baseline=read('breadth-2026-10-19-baseline.json');assert.equal(baseline.length,250);
 assert.deepEqual(library.slice(0,250).map(({id,doi,title})=>({id,doi,title})),baseline);
 assert.equal(library.length,1000);assert.equal(knowledgeExpansion300.length,50);
 assert.equal(new Set(library.map(p=>p.doi.toLowerCase())).size,1000);
 let records=library.slice(0,250);
 for(const n of [9,10]){const audit=read(`breadth-${n}-2026-10-19.json`);assert.equal(audit.records.length,25);records=reconcileBatch(records,audit.records).records;assert.equal(records.length,audit.final);assert.ok(reconcileBatch(records,audit.records).events.every(e=>e.status==='unchanged'));}
 for(const p of knowledgeExpansion300){assert.equal(p.extraction,'unstarted');assert.equal(p.datasetFamilyId,null);assert.ok(!p.abstract&&!p.summary&&!p.observations);assert.match(p.metadataSource,/^https:/);assert.doesNotMatch(p.title+p.journal,/PENDING/);}
});
test('source status uncertainties and escaped metadata notes survive publication',()=>{
 const flagged=library.find(p=>p.doi==='10.1016/j.cemconcomp.2024.105811');assert.equal(flagged.sourceStatus.state,'update-requires-review');assert.match(libraryResults([flagged]),/not confirm it/);
 const corrected=library.find(p=>p.doi==='10.3390/ma17051181');assert.match(libraryResults([corrected]),/title-only correction/);
 const html=libraryResults([{...corrected,metadataNote:'<img src=x onerror=alert(1)>'}]);assert.match(html,/&lt;img/);assert.doesNotMatch(html,/<img/);
});
