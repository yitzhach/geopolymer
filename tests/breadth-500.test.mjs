import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {library,filterLibrary} from '../src/research-library.js';
import {knowledgeExpansion500} from '../src/knowledge-expansion-500.js';
import {expansion500DeepDives} from '../src/deep-dive-expansion-500.js';
import {pilot} from '../src/knowledge-pilot.js';
import {literatureMixes} from '../src/literature-mixes.js';
import {renderPage} from '../src/app.js';
import {reconcileBatch} from '../src/knowledge-core.js';
const read=n=>JSON.parse(fs.readFileSync(new URL('../research/batches/'+n,import.meta.url)));
test('500-publication milestone preserves 400 identities and reconciles four bounded batches idempotently',()=>{
 assert.deepEqual(library.slice(0,400).map(({id,doi,title})=>({id,doi,title})),read('breadth-500-2026-10-19-baseline.json'));
 assert.equal(knowledgeExpansion500.length,100);assert.equal(library.length,1000);
 assert.equal(new Set(library.map(p=>p.doi.toLowerCase())).size,1000);assert.equal(new Set(library.map(p=>p.id)).size,1000);
 let imported=library.slice(0,400);
 for(const n of [15,16,17,18]){
  const a=read(`breadth-${n}-2026-10-19.json`);assert.equal(a.records.length,25);assert.ok(a.strategy.primaryVerification<=40);
  assert.deepEqual(a.records,knowledgeExpansion500.filter(p=>p.id.startsWith(`ke-b${n}-`)));
  imported=reconcileBatch(imported,a.records).records;assert.equal(imported.length,a.final);
  assert.ok(reconcileBatch(imported,a.records).events.every(e=>e.status==='unchanged'));
 }
 for(const p of knowledgeExpansion500){assert.equal(p.extraction,'unstarted');assert.equal(p.datasetFamilyId,null);assert.ok(!p.summary&&!p.abstract&&!p.observations);assert.match(p.metadataSource,/^https:/);assert.ok(p.metadataLocator&&p.rights.basis);assert.equal(filterLibrary(p.doi).length,1);assert.equal(renderPage('/studies/'+p.id).status,200);}
 assert.equal(pilot.studies.length,5);assert.equal(pilot.mixes.length,62);assert.equal(pilot.observations.length,275);assert.equal(literatureMixes.length,48);
});
test('fifteen editorial guides resolve exclusively to the new sources without becoming executable recipes',()=>{
 assert.equal(expansion500DeepDives.length,15);
 for(const d of expansion500DeepDives){
  const p=knowledgeExpansion500.find(p=>p.doi===d.doi);assert.ok(p);assert.equal(d.relatedStudy,'/studies/'+p.id);assert.ok(!d.relatedRecipe);
  assert.equal(d.sourceTitle,p.title);assert.ok(d.facts.every(f=>f.locator));assert.equal(d.inventory.length,7);
  const html=renderPage('/deep-dives/'+d.id).html;assert.match(html,/Partial extraction/);assert.match(html,/No human\/domain review/);assert.match(html,/not a complete recipe/);
  assert.match(renderPage(d.relatedStudy).html,/Read the experiment deep dive/);
 }
});
test('condition and interpretation traps remain visible in the rendered new guides',()=>{
 const html=id=>renderPage('/deep-dives/'+id).html;
 for(const [id,terms] of [
  ['calcium-hydroxide-carbonation-tradeoff',['strength reductions above 48%','20 ± 3%','mm/√day','chronology']],
  ['epoxy-silane-shrinkage-bases',['131.2%','−0.312','not promoted to a verified expansion']],
  ['metakaolin-fly-ash-liquid-definition',['490 g is not pure water','one study design']],
  ['pva-egc-tension-versus-model',['24 h at 60°C','not ambient-only','seven groups']],
  ['foam-polystyrene-fire-assembly',['53.2%','not a certified building fire classification']],
  ['phosphate-polymer-rheology',['acid activation','373 K','Supplementary Materials']]
 ])for(const term of terms)assert.ok(html(id).includes(term),id+': '+term);
});
