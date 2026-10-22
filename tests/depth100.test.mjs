import test from'node:test';import assert from'node:assert/strict';import fs from'node:fs';import{createHash}from'node:crypto';
import{library}from'../src/research-library.js';import{deepDives}from'../src/deep-dives.js';import{depth100DeepDives}from'../src/deep-dive-depth100-expansion.js';import{paperReadingPreviews}from'../src/paper-reading-previews.js';import{readingPreviewFor}from'../src/paper-reading-ui.js';import{renderPage}from'../src/app.js';
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex'),baseline=JSON.parse(fs.readFileSync(new URL('../research/batches/depth100-baseline-2026-10-21.json',import.meta.url)));
test('second fifty-paper batch preserves all 161 previews, 162 guides and catalog identities',()=>{
 assert.equal(depth100DeepDives.length,50);assert.equal(new Set(depth100DeepDives.map(d=>d.doi)).size,50);assert.equal(library.length,1000);
 assert.equal(hash(library.map(p=>({id:p.id,doi:p.doi,title:p.title}))),baseline.publicationIdentityHash);
 assert.equal(baseline.previousPreviews.length,161);assert.equal(baseline.previousGuides.length,162);
 for(const p of baseline.previousPreviews)assert.equal(hash(readingPreviewFor(p.doi)),p.sha256,p.doi);
 for(const d of baseline.previousGuides){
  // A documented scientific classification correction is the sole exception to frozen editorial hashes.
  const corrections=JSON.parse(fs.readFileSync(new URL('../research/batches/editorial-corrections-2026-10-21.json',import.meta.url)));
  const c=corrections.find(c=>c.id===d.id&&c.beforeSha256===d.sha256);
  assert.equal(hash(deepDives.find(x=>x.id===d.id)),c?c.afterSha256:d.sha256,d.id);
 }
 assert.equal(paperReadingPreviews.length,311);assert.equal(deepDives.length,312);
 for(const d of depth100DeepDives){
  assert.ok(!baseline.previousGuides.some(p=>p.doi===d.doi));const p=readingPreviewFor(d.doi);assert.equal(p.deepDiveId,d.id);
  assert.equal(p.paragraphs.length,3);assert.ok(p.paragraphs.reduce((n,x)=>n+x.text.split(/\s+/).length,0)>=100);
  assert.equal(p.provenance.length,3);assert.ok(p.provenance.every((f,i)=>f.guideFactIndex===i&&f.locator===d.facts[i].locator));assert.equal(d.inventory.length,7);
  for(const path of[d.relatedStudy,'/deep-dives/'+d.id])assert.equal(renderPage(path).status,200);
 }
});
test('second fifty-paper batch retains unit, outcome and modeling boundaries',()=>{
 const text=s=>JSON.stringify(readingPreviewFor('10.3390/'+s));
 assert.match(text('molecules27154805'),/force unit.*not normalized/);assert.doesNotMatch(text('molecules27154805'),/4109|4\.109/);
 assert.match(text('ma17071585'),/85.71% formaldehyde adsorption/);assert.match(text('ma17071585'),/must not be relabeled/);
 assert.match(text('buildings16153136'),/total water absorption ranged from 35.2% to 42.2%/);
 assert.match(text('ma18010103'),/7.15 MPa\/kg/);assert.match(text('ma18010103'),/not a stress value/);
 assert.match(text('ma14010214'),/increasing leachability/);
 assert.match(text('polym13172970'),/no effect on the tested gram-positive/);
 assert.match(text('buildings15162974'),/Data Availability Statement correction/);
 const model=depth100DeepDives.find(d=>d.evidenceKind==='numerical-model-calibrated-on-prior-experiments');const html=renderPage('/deep-dives/'+model.id).html;
 assert.match(html,/Model review walkthrough/);assert.doesNotMatch(html,/These steps organise a new experiment/);assert.match(html,/not new physical observations/);
 for(const doi of['polym18121514','min13020232','buildings16020327'])assert.equal(readingPreviewFor('10.3390/'+doi),null);
 assert.match(text('ma12030526'),/Correction linked; review pending/);
});
test('second fifty-paper audit batches are bounded and cover exactly fifty distinct existing papers',()=>{
 const seen=new Set();let operations=0,deferred=0;
 for(let b=1;b<=10;b++){
  const a=JSON.parse(fs.readFileSync(new URL(`../research/batches/depth100-${String(b).padStart(2,'0')}-2026-10-21.json`,import.meta.url)));
  assert.equal(a.records.length,5);assert.equal(a.operations,a.queries.length);assert.ok(a.operations>=10&&a.operations<=40);operations+=a.operations;deferred+=a.deferred.length;
  for(const r of a.records){assert.ok(!seen.has(r.doi));seen.add(r.doi);assert.equal(readingPreviewFor(r.doi).deepDiveId,r.deepDiveId);}
  assert.equal(a.newCanonicalObservations,0);assert.equal(a.newRecipes,0);assert.equal(a.newBibliographyRecords,0);
 }
 assert.equal(seen.size,50);assert.equal(operations,137);assert.equal(deferred,3);
});
