import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {createHash} from 'node:crypto';
import {mixProject} from '../src/literature-mixes.js';
import {library} from '../src/research-library.js';import {deepDives} from '../src/deep-dives.js';import {paperReadingPreviews} from '../src/paper-reading-previews.js';import {depth200DeepDives,depth200ReadingPreviews} from '../src/deep-dive-depth200-expansion.js';import {deepDiveMixDesigns,mixDesignFor,proportionalExample} from '../src/deep-dive-mix-designs.js';import {mixDataFields,validateMixDataSet} from '../src/mix-data-contract.js';import {literatureMixes} from '../src/literature-mixes.js';import {pilot} from '../src/knowledge-pilot.js';import {readingPreviewFor,renderReadingPreview} from '../src/paper-reading-ui.js';import {researchDatabase} from '../src/research-feeds.js';import {renderPage} from '../src/app.js';
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');const baseline=JSON.parse(fs.readFileSync(new URL('../research/batches/depth200-baseline-2026-10-21.json',import.meta.url)));
test('fifty new source-backed guides preserve all prior editorial and scientific records',()=>{
 assert.equal(depth200DeepDives.length,50);assert.equal(depth200ReadingPreviews.length,50);assert.equal(deepDives.length,362);assert.equal(paperReadingPreviews.length,361);assert.equal(library.length,1000);
 assert.equal(new Set(depth200DeepDives.map(d=>d.doi)).size,50);
 for(const d of baseline.previousGuides)assert.equal(hash(deepDives.find(x=>x.id===d.id)),d.sha256,d.id);
 for(const p of baseline.previousPreviews)assert.equal(hash(readingPreviewFor(p.doi)),p.sha256,p.doi);
 assert.equal(hash(library.map(p=>({id:p.id,doi:p.doi,title:p.title}))),baseline.publicationIdentityHash);
 assert.equal(hash(literatureMixes.filter(r=>r.id!=='acid-wastewater-mk-control')),baseline.recipeCatalogHash);assert.equal(hash(pilot),baseline.canonicalPilotHash);
 for(const d of depth200DeepDives){assert.ok(!baseline.previousGuides.some(x=>x.doi===d.doi));const p=readingPreviewFor(d.doi);assert.equal(p.paragraphs.length,3);assert.equal(p.deepDiveId,d.id);assert.ok(p.takeaways.length>=3&&p.limitations.length>=3);assert.equal(p.provenance.length,3);assert.equal(renderPage(d.relatedStudy).status,200);assert.equal(renderPage('/deep-dives/'+d.id).status,200);}
});
test('all guides and detailed summaries expose the same source-linked eight-field dataset',()=>{
 for(const d of deepDives){const p=mixDesignFor(d.id);assert.ok(validateMixDataSet(p.dataSet,d));assert.deepEqual(p.dataSet.fields.map(f=>f.id),mixDataFields);assert.match(renderPage('/deep-dives/'+d.id).html,/class="mix-data-set"/);}
 for(const p of paperReadingPreviews){const source=library.find(s=>s.doi===p.doi);assert.match(renderReadingPreview(source),/class="mix-data-set"/);}
 assert.equal(researchDatabase().records.filter(p=>p.mixData?.version==='mix-data-v1').length,361);
 const legacy=deepDiveMixDesigns.find(p=>p.status==='source-review-needed');assert.equal(legacy.dataSet.fields.find(f=>f.id==='ingredients').state,'pending');
 const hold=deepDiveMixDesigns.find(p=>p.status==='source-hold');assert.ok(hold.dataSet.fields.every(f=>f.state==='held'));
});
test('dataset validation fails omissions, source loss, false protocol completion and identity changes',()=>{
 const d=deepDives[0],original=mixDesignFor(d.id).dataSet;
 for(const mutate of [p=>p.fields.pop(),p=>p.fields[0].source='',p=>p.fields[0].locator='',p=>p.fields[0].state='verified',p=>p.protocolComplete=true,p=>p.doi='10.3390/wrong']){const p=structuredClone(original);mutate(p);assert.throws(()=>validateMixDataSet(p,d));}
});
test('new ledgers retain ratio conflicts, proprietary limits, failed hardening and model boundaries',()=>{
 const p=id=>mixDesignFor(id);
 assert.match(p('volcanic-graphene-ratio-conflict').partialReview.ledger[2][1],/10\/30/);
 assert.match(p('nitrite-cold-mortar-ratio-conflict').partialReview.ledger[2][1],/2:1.*101:202/);
 assert.match(p('nickel-carbon-laminate-proprietary').partialReview.ledger[2][1],/Proprietary/);
 assert.match(p('underwater-printing-water-anisotropy').partialReview.notes,/49 days/);
 assert.equal(p('onepart-ann-optimization-evidence').status,'no-independent-mix');assert.deepEqual(p('onepart-ann-optimization-evidence').recipeIds,[]);
 for(const id of ['xrd-strength-screening-boundary','egc-thermal-cure-tensile-clock'])assert.equal(p(id).dataSet.fields.find(f=>f.id==='ingredients').state,'pending');
 assert.equal(p('calcium-hydroxide-carbonation-tradeoff').status,'partial-source-design');
});
test('bounded primary review manifests cover fifty guides and record deferred access without raw retention',()=>{
 let operations=0;const seen=new Set();for(let b=1;b<=11;b++){const a=JSON.parse(fs.readFileSync(new URL(`../research/batches/depth200-${String(b).padStart(2,'0')}-2026-10-21.json`,import.meta.url)));assert.ok(a.records.length<=5);assert.ok(a.operationCount<=40);assert.equal(a.operationCount,a.operations.length);assert.equal(a.rawSourceRetained,false);assert.equal(a.newCanonicalObservations,0);assert.equal(a.newRecipes,b===2?1:0);operations+=a.operationCount;for(const r of a.records){assert.ok(!seen.has(r.doi));seen.add(r.doi);assert.equal(mixDesignFor(r.deepDiveId).doi,r.doi);}}
 assert.equal(seen.size,50);assert.equal(operations,80);
 const a=JSON.parse(fs.readFileSync(new URL('../research/batches/mix-design-06-2026-10-21.json',import.meta.url)));assert.equal(a.records.length,5);assert.ok(a.operationCount<=40);assert.equal(a.operations.length,a.operationCount);assert.equal(a.records.filter(r=>r.status==='partial-source-design').length,4);
});
test('new catalog condition scales only source stock masses and retains chemical unknowns',()=>{
 const r=literatureMixes.find(r=>r.id==='acid-wastewater-mk-control');assert.deepEqual(r.ingredients.map(x=>x.mass),[400,1350,425]);assert.ok(r.ingredients.every(x=>Object.keys(x.comp).length===0));assert.equal(r.strength,null);assert.deepEqual(r.results,[]);assert.equal(r.license.label,'CC BY 4.0');assert.deepEqual(mixProject(r.id,2175).recipe.rows.map(x=>x.mass),[400,1350,425]);assert.ok(Math.abs(proportionalExample(r,1000).reduce((s,x)=>s+x.massG,0)-1000)<1e-9);
 const p=mixDesignFor('acid-wastewater-mortar-comparison');assert.equal(p.status,'source-mix-with-gaps');assert.deepEqual(p.recipeIds,[r.id]);assert.equal(p.protocolComplete,false);assert.match(r.limitations,/moisture/);
});
