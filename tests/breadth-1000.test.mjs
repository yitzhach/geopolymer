import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {library,filterLibrary} from '../src/research-library.js';
import {knowledgeExpansion1000} from '../src/knowledge-expansion-1000.js';
import {expansion1000DeepDives} from '../src/deep-dive-expansion-1000.js';
import {reconcileBatch} from '../src/knowledge-core.js';
import {renderPage} from '../src/app.js';
const read=n=>JSON.parse(fs.readFileSync(new URL('../research/batches/'+n,import.meta.url)));
test('1000 milestone preserves the frozen 800 and all eight batches remain idempotent',()=>{
 assert.deepEqual(library.slice(0,800).map(({id,doi,title})=>({id,doi,title})),read('breadth-1000-2026-10-20-baseline.json'));
 assert.equal(library.length,1000);assert.equal(knowledgeExpansion1000.length,200);
 assert.equal(new Set(library.map(p=>p.doi.toLowerCase())).size,1000);
 const norm=s=>s.toLowerCase().replace(/[^a-z0-9]/g,'');assert.equal(new Set(library.map(p=>norm(p.title))).size,1000);
 let rows=library.slice(0,800);
 for(let n=31;n<=38;n++){const a=read(`breadth-${n}-2026-10-20.json`);assert.equal(a.records.length,25);assert.ok(a.strategy.primaryVerification<=40);assert.deepEqual(a.records,knowledgeExpansion1000.filter(p=>p.id.startsWith(`ke-b${n}-`)));rows=reconcileBatch(rows,a.records).records;assert.equal(rows.length,a.final);assert.ok(reconcileBatch(rows,a.records).events.every(e=>e.status==='unchanged'));}
 for(const p of knowledgeExpansion1000){assert.doesNotMatch(p.title,/Free Full.Text|\| Notes|\| Abstract|RETRACTED/i);assert.equal(p.extraction,'unstarted');assert.equal(p.datasetFamilyId,null);assert.ok(!p.abstract&&!p.observations);assert.equal(p.checked,'2026-10-20');assert.ok(p.metadataSource&&p.metadataLocator&&p.rights.basis);assert.equal(filterLibrary(p.doi).length,1);assert.equal(renderPage('/studies/'+p.id).status,200);}
});
test('observed retraction stays excluded and newly identified reviews remain bibliography',()=>{
 assert.ok(!library.some(p=>p.doi==='10.3390/buildings12081066'));
 const log=read('breadth-1000-verification-2026-10-20.json');assert.equal(log.reservedOrRejected.find(p=>p.doi==='10.3390/buildings12081066').decision,'excluded');
 for(const doi of ['10.3390/buildings14010226','10.3390/jcs10060327']){assert.equal(library.find(p=>p.doi===doi).type,'Review');assert.ok(!expansion1000DeepDives.some(d=>d.doi===doi));}
});
test('25 linked partial guides retain important mixture, age, unit and source boundaries',()=>{
 assert.equal(expansion1000DeepDives.length,25);
 for(const d of expansion1000DeepDives){const p=knowledgeExpansion1000.find(p=>p.doi===d.doi);assert.ok(p);assert.equal(p.type,'Journal article');assert.equal(d.relatedStudy,'/studies/'+p.id);assert.equal(d.sourceTitle,p.title);assert.ok(!d.relatedRecipe);assert.equal(d.inventory.length,7);assert.equal(renderPage('/deep-dives/'+d.id).status,200);assert.match(renderPage(d.relatedStudy).html,/Read the experiment deep dive/);}
 for(const b of 'abcde'){const a=read(`deep-dives-1000-${b}-2026-10-20.json`);assert.equal(a.reviewedSourcePapers,5);assert.ok(a.operationCount<=40);assert.equal(a.records.length,5);assert.equal(a.newCanonicalObservations,0);}
 const html=id=>renderPage('/deep-dives/'+id).html;
 for(const [id,terms] of [
 ['silica-fume-activator-volume-versus-mass',['volume ratio','measured solution densities']],
 ['microwave-curing-precursor-energy-boundary',['ambient-cured specimens outperform','J/(g·K²)']],
 ['crt-glass-coupled-activator-comparisons',['eight distinct mixtures','not automatically a service-leaching result']],
 ['one-part-activator-dose-long-term-age',['10.71%','365']],
 ['carbon-black-self-sensing-load-levels',['50 kN','35 kN']],
 ['lightweight-aggregate-absorption-activator-budget',['48-day strength','not a 28-day result']],
 ['ten-year-fly-ash-age-and-assay-boundaries',['3.30','do not silently overwrite']],
 ['bagasse-mixed-alkali-cement-hybrid',['800 g cement','final solution liters','cement-containing hybrid']]
 ])for(const term of terms)assert.ok(html(id).includes(term),id+': '+term);
});
