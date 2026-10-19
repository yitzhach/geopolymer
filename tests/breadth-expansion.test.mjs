import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {library} from '../src/research-library.js';
import {knowledgeExpansion} from '../src/knowledge-expansion.js';
import {reconcileBatch} from '../src/knowledge-core.js';
import {renderPage} from '../src/app.js';
import {researchDatabase} from '../src/research-feeds.js';
const read=name=>JSON.parse(fs.readFileSync(new URL('../research/batches/'+name,import.meta.url)));
test('40 additions preserve all 161 prior identities and remain metadata-only',()=>{
 const baseline=read('breadth-2026-10-17-baseline.json');assert.equal(baseline.length,161);
 assert.deepEqual(library.slice(0,161).map(({id,doi,title})=>({id,doi,title})),baseline);
 assert.equal(library.length,300);assert.equal(knowledgeExpansion.length,40);
 assert.equal(new Set(library.map(p=>p.doi.toLowerCase())).size,300);
 let records=library.slice(0,161);
 for(const n of [5,6]){const audit=read('breadth-'+n+'-2026-10-17.json');assert.equal(audit.records.length,20);records=reconcileBatch(records,audit.records).records;assert.equal(records.length,audit.final);assert.ok(reconcileBatch(records,audit.records).events.every(e=>e.status==='unchanged'));}
 for(const p of knowledgeExpansion){assert.equal(p.datasetFamilyId,null);assert.equal(p.extraction,'unstarted');assert.ok(!p.summary&&!p.abstract&&!p.observations);assert.match(p.metadataSource,/^https:/);assert.equal(renderPage('/studies/'+p.id).status,200);assert.match(renderPage('/studies/'+p.id).html,/No extracted experiment/);assert.doesNotMatch(renderPage('/studies/'+p.id).html,/>Crossref</);}
 assert.equal(researchDatabase().records.length,300);
});
test('source year and journal corrections survive integration',()=>{
 const find=doi=>knowledgeExpansion.find(p=>p.doi===doi);
 assert.equal(find('10.5897/jcems2019.0340').year,2020);
 assert.equal(find('10.1016/j.conbuildmat.2020.121973').year,2021);
 assert.equal(find('10.1007/s42452-022-05167-w').journal,'SN Applied Sciences');
});
