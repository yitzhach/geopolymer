import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import{createHash}from'node:crypto';
import{library}from'../src/research-library.js';import{deepDives}from'../src/deep-dives.js';import{depth50DeepDives}from'../src/deep-dive-depth50-expansion.js';import{paperReadingPreviews}from'../src/paper-reading-previews.js';import{readingPreviewFor}from'../src/paper-reading-ui.js';import{renderPage}from'../src/app.js';
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const baseline=JSON.parse(fs.readFileSync(new URL('../research/batches/depth50-baseline-2026-10-21.json',import.meta.url)));
test('fifty linked additions preserve all previous previews, guides and publication identities exactly',()=>{
 assert.equal(depth50DeepDives.length,50);assert.equal(new Set(depth50DeepDives.map(d=>d.doi)).size,50);
 assert.equal(library.length,1000);assert.equal(hash(library.map(p=>({id:p.id,doi:p.doi,title:p.title}))),baseline.publicationIdentityHash);
 assert.equal(baseline.previousPreviews.length,111);assert.equal(baseline.previousGuides.length,112);
 for(const p of baseline.previousPreviews)assert.equal(hash(readingPreviewFor(p.doi)),p.sha256,p.doi);
 for(const d of baseline.previousGuides)assert.equal(hash(deepDives.find(x=>x.id===d.id)),d.sha256,d.id);
 assert.equal(paperReadingPreviews.length,161);assert.equal(deepDives.length,162);
 for(const d of depth50DeepDives){
  assert.ok(!baseline.previousGuides.some(p=>p.doi===d.doi));const p=readingPreviewFor(d.doi);assert.equal(p.deepDiveId,d.id);
  assert.equal(p.paragraphs.length,3);assert.ok(p.paragraphs.reduce((n,x)=>n+x.text.split(/\s+/).length,0)>=110);
  assert.equal(p.provenance.length,3);assert.ok(p.provenance.every((f,i)=>f.guideFactIndex===i&&f.locator===d.facts[i].locator));
  assert.equal(d.inventory.length,7);assert.equal(new Set(d.highlights).size,3);
  for(const path of[d.relatedStudy,'/deep-dives/'+d.id])assert.equal(renderPage(path).status,200);
 }
});
test('fifty-paper notes preserve endpoint, dataset and failure distinctions',()=>{
 const text=id=>JSON.stringify(readingPreviewFor('10.3390/'+id));
 assert.match(text('min11070732'),/42.3% water absorption/);assert.doesNotMatch(text('min11070732'),/42.3% interconnected porosity/);
 assert.match(text('ma18102272'),/rupture in the repair matrix/);
 assert.match(text('min14070726'),/not an entirely new independent strength dataset/);
 assert.match(text('app13085166'),/precursor replacement.*terminology conflict/);
 assert.match(text('su132011167'),/64.56 MPa.*19.09 MPa/);
 assert.match(text('polym13234160'),/broke along cracks by 20 cycles/);
 assert.match(text('su14052652'),/reduced acid weight loss but increased sodium-sulfate expansion/);
 assert.match(text('app16031623'),/No unreviewed current density/);
 assert.match(text('polym14061140'),/47.8 MPa.*32.7 MPa/);
 assert.equal(readingPreviewFor('10.3390/su16188200'),null);
 for(const d of depth50DeepDives.filter(d=>d.evidenceKind?.startsWith('life-cycle'))){
  assert.match(renderPage('/deep-dives/'+d.id).html,/Assessment walkthrough/);
  assert.doesNotMatch(renderPage('/deep-dives/'+d.id).html,/These steps organise a new experiment/);
  assert.match(d.arithmetic.rows[1][1],/scenarios/);assert.doesNotMatch(JSON.stringify(d.checklist),/Predefine specimen counts/);
 }
 assert.match(text('ma12030526'),/Correction linked; review pending/);
});
test('ten bounded audit batches link exactly fifty existing catalog sources',()=>{
 const seen=new Set();let operations=0;
 for(let b=1;b<=10;b++){
  const a=JSON.parse(fs.readFileSync(new URL(`../research/batches/depth50-${String(b).padStart(2,'0')}-2026-10-21.json`,import.meta.url)));
  assert.equal(a.records.length,5);assert.equal(a.operations,a.queries.length);assert.ok(a.operations>=10&&a.operations<=40);operations+=a.operations;
  for(const r of a.records){assert.ok(!seen.has(r.doi));seen.add(r.doi);assert.equal(readingPreviewFor(r.doi).deepDiveId,r.deepDiveId);}
  assert.equal(a.newCanonicalObservations,0);assert.equal(a.newRecipes,0);assert.equal(a.newBibliographyRecords,0);
 }
 assert.equal(seen.size,50);assert.equal(operations,131);
});
