import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {createHash} from 'node:crypto';
import {library} from '../src/research-library.js';import {deepDives} from '../src/deep-dives.js';import {depth150DeepDives} from '../src/deep-dive-depth150-expansion.js';import {paperReadingPreviews} from '../src/paper-reading-previews.js';import {readingPreviewFor} from '../src/paper-reading-ui.js';import {renderPage} from '../src/app.js';import {mixDesignFor} from '../src/deep-dive-mix-designs.js';import {literatureMixes} from '../src/literature-mixes.js';import {pilot} from '../src/knowledge-pilot.js';
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const baseline=JSON.parse(fs.readFileSync(new URL('../research/batches/depth150-baseline-2026-10-21.json',import.meta.url)));
test('third fifty-pair addition preserves every previous summary/guide and publication identity',()=>{
 assert.equal(library.length,1000);assert.equal(depth150DeepDives.length,50);assert.equal(new Set(depth150DeepDives.map(d=>d.doi)).size,50);
 assert.equal(paperReadingPreviews.length,311);assert.equal(deepDives.length,312);
 assert.equal(hash(library.map(p=>({id:p.id,doi:p.doi,title:p.title}))),baseline.publicationIdentityHash);
 assert.equal(baseline.previousPreviews.length,211);assert.equal(baseline.previousGuides.length,212);
 for(const p of baseline.previousPreviews)assert.equal(hash(readingPreviewFor(p.doi)),p.sha256,p.doi);
 for(const d of baseline.previousGuides)assert.equal(hash(deepDives.find(x=>x.id===d.id)),d.sha256,d.id);
 for(const d of depth150DeepDives){const p=readingPreviewFor(d.doi);assert.ok(!baseline.previousGuides.some(x=>x.doi===d.doi));assert.equal(p.deepDiveId,d.id);assert.equal(p.paragraphs.length,3);
  const words=p.paragraphs.reduce((s,p)=>s+p.text.split(/\s+/).length,0);assert.ok(words>=110&&words<=200,d.id);
  assert.ok(p.takeaways.length>=3&&p.limitations.length>=3&&p.audience);assert.equal(d.inventory.length,7);assert.equal(new Set(d.highlights).size,3);assert.equal(p.provenance.length,3);
  assert.ok(p.provenance.every((f,i)=>f.guideFactIndex===i&&f.locator===d.facts[i].locator));
  for(const path of [d.relatedStudy,p.links.deepDive])assert.equal(renderPage(path).status,200,path);
  assert.equal(mixDesignFor(d.id).protocolComplete,false);
 }
 assert.equal(depth150DeepDives.filter(d=>mixDesignFor(d.id).recipeIds.length).length,2);
 for(const d of depth150DeepDives.filter(d=>mixDesignFor(d.id).recipeIds.length)){assert.equal(mixDesignFor(d.id).selection,null);assert.match(renderPage('/deep-dives/'+d.id).html,/Curated source formulations are linked above/);}
 assert.equal(hash(literatureMixes.filter(r=>r.id!=='acid-wastewater-mk-control')),baseline.recipeCatalogHash);assert.equal(hash(pilot),baseline.canonicalPilotHash);
});
test('new notes preserve age, control, chemistry and test-mode boundaries',()=>{
 const text=doi=>JSON.stringify(readingPreviewFor('10.3390/'+doi));
 assert.match(text('ma15082944'),/86.1 MPa at 56 days/);assert.match(text('ma15082957'),/64.18 MPa.*72.72 MPa/);assert.match(text('ma15082957'),/two result sets must not be merged/);
 assert.match(text('su14063141'),/acceptance criteria/);assert.match(text('ma15010202'),/acid chemistry/);
 assert.match(text('app12115478'),/0.5 wt%.*1.0 wt%/);assert.match(text('app112110443'),/cement-containing hybrid/);
 assert.match(text('ma12091459'),/ambient storage and wet\/dry cycling/);assert.match(text('ma13143215'),/different conditions/);assert.match(text('ma13143215'),/insulation with acoustic absorption/);
 assert.match(text('buildings14030592'),/SS means steel slag here, not sodium silicate/);assert.match(text('coatings13101731'),/phosphate-modified suspensions/);assert.match(text('coatings12111695'),/Grid ratings are categorical/);
 assert.equal(literatureMixes.length,49);assert.equal(pilot.studies.length,5);assert.equal(pilot.mixes.length,62);assert.equal(pilot.observations.length,275);
});
test('ten bounded source-review batches account for exactly fifty added pairs',()=>{
 const seen=new Set();let count=0;
 for(let n=1;n<=10;n++){
  const a=JSON.parse(fs.readFileSync(new URL(`../research/batches/depth150-${String(n).padStart(2,'0')}-2026-10-21.json`,import.meta.url)));
  assert.equal(a.records.length,5);assert.equal(a.operations,a.queries.length);assert.ok(a.operations>0&&a.operations<=40);count+=a.operations;
  for(const p of a.records){assert.ok(!seen.has(p.doi));seen.add(p.doi);assert.equal(readingPreviewFor(p.doi).deepDiveId,p.deepDiveId);}
  assert.equal(a.newBibliographyRecords,0);assert.equal(a.newCanonicalObservations,0);assert.equal(a.newRecipes,0);assert.deepEqual(a.deferred,[]);
 }assert.equal(seen.size,50);assert.equal(count,113);
});
