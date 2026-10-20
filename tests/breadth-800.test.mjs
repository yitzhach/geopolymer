import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {library,filterLibrary} from '../src/research-library.js';
import {knowledgeExpansion800} from '../src/knowledge-expansion-800.js';
import {expansion800DeepDives} from '../src/deep-dive-expansion-800.js';
import {reconcileBatch} from '../src/knowledge-core.js';
import {renderPage} from '../src/app.js';
import {answerResearch} from '../src/assistant-core.js';
const read=n=>JSON.parse(fs.readFileSync(new URL('../research/batches/'+n,import.meta.url)));
test('800 milestone preserves all 500 identities and twelve import batches remain idempotent',()=>{
 assert.deepEqual(library.slice(0,500).map(({id,doi,title})=>({id,doi,title})),read('breadth-800-2026-10-19-baseline.json'));
 assert.equal(library.length,1000);assert.equal(knowledgeExpansion800.length,300);
 assert.equal(new Set(library.map(p=>p.doi.toLowerCase())).size,1000);
 const norm=s=>s.toLowerCase().replace(/[^a-z0-9]/g,'');assert.equal(new Set(library.map(p=>norm(p.title))).size,1000);
 let rows=library.slice(0,500);
 for(let n=19;n<=30;n++){const a=read(`breadth-${n}-2026-10-19.json`);assert.equal(a.records.length,25);assert.ok(a.strategy.primaryVerification<=40);assert.deepEqual(a.records,knowledgeExpansion800.filter(p=>p.id.startsWith(`ke-b${n}-`)));rows=reconcileBatch(rows,a.records).records;assert.equal(rows.length,a.final);assert.ok(reconcileBatch(rows,a.records).events.every(e=>e.status==='unchanged'));}
 for(const p of knowledgeExpansion800){assert.doesNotMatch(p.title,/Free Full.Text|\| Notes|\| Abstract/i);assert.equal(p.extraction,'unstarted');assert.equal(p.datasetFamilyId,null);assert.ok(!p.abstract&&!p.summary&&!p.observations);assert.ok(p.metadataSource&&p.metadataLocator&&p.rights.basis);assert.equal(filterLibrary(p.doi).length,1);assert.equal(renderPage('/studies/'+p.id).status,200);}
});
test('known reviews and the observed erratum cannot masquerade as original experimental evidence',async()=>{
 for(const doi of ['10.3390/molecules28124710','10.3390/ma15228032']){assert.equal(library.find(p=>p.doi===doi).type,'Review');assert.ok(!expansion800DeepDives.some(d=>d.doi===doi));}
 const p=library.find(p=>p.doi==='10.3390/ma12030526');assert.equal(p.sourceStatus.state,'update-requires-review');assert.equal(p.sourceStatus.updates[0].DOI,'10.3390/ma12091388');
 assert.match(renderPage('/studies/'+p.id).html,/Correction linked; review pending/);
 assert.ok(!(await answerResearch({question:p.doi})).sources.some(s=>s.id===p.id));
});
test('23 new guides remain linked partial editorial analyses with condition traps retained',()=>{
 assert.equal(expansion800DeepDives.length,23);
 for(const d of expansion800DeepDives){const p=knowledgeExpansion800.find(p=>p.doi===d.doi);assert.ok(p);assert.equal(p.type,'Journal article');assert.equal(d.relatedStudy,'/studies/'+p.id);assert.ok(!d.relatedRecipe);assert.equal(d.sourceTitle,p.title);assert.equal(d.inventory.length,7);assert.equal(renderPage('/deep-dives/'+d.id).status,200);assert.match(renderPage(d.relatedStudy).html,/Read the experiment deep dive/);}
 const html=id=>renderPage('/deep-dives/'+id).html;
 for(const [id,terms] of [
 ['aluminum-foam-coating-ratio-conflict',['0.80','0.45','Do not average']],
 ['metakaolin-reactivity-and-liquid-volume',['0.5 mL/g','not a liquid/solid mass ratio']],
 ['pce-alkali-stability-versus-flow',['increased paste viscosity','binder denominator includes MK']],
 ['carbon-textile-thermal-directions',['10⁶ J/m³/K','in-plane warp/weft']],
 ['reactive-mgo-dose-and-erratum',['10.3390/ma12091388','60 g MgO + 940 g','excluded from assistant evidence']],
 ['ceramic-fines-conditioning-and-absorption',['85°C','not the material curing temperature']],
 ['one-part-batch-reproducibility',['not visually inspected','not a raw measurement']]
 ])for(const term of terms)assert.ok(html(id).includes(term),id+': '+term);
});
