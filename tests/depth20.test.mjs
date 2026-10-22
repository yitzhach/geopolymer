import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {library} from '../src/research-library.js';
import {deepDives} from '../src/deep-dives.js';
import {depth20DeepDives} from '../src/deep-dive-depth20-expansion.js';
import {paperReadingPreviews} from '../src/paper-reading-previews.js';
import {readingPreviewFor} from '../src/paper-reading-ui.js';
import {renderPage} from '../src/app.js';
const baseline=JSON.parse(fs.readFileSync(new URL('../research/batches/depth20-baseline-2026-10-20.json',import.meta.url)));
test('twenty depth additions preserve previous papers, previews and guide identities',()=>{
 assert.equal(depth20DeepDives.length,20);assert.equal(new Set(depth20DeepDives.map(d=>d.doi)).size,20);
 assert.deepEqual(library.map(p=>({id:p.id,doi:p.doi,title:p.title})),baseline.publicationIdentities);
 assert.equal(baseline.previousPreviews.length,91);assert.equal(baseline.previousGuideIds.length,92);
 for(const p of baseline.previousPreviews)assert.equal(readingPreviewFor(p.doi).deepDiveId,p.deepDiveId);
 for(const id of baseline.previousGuideIds)assert.ok(deepDives.some(d=>d.id===id));
 assert.equal(paperReadingPreviews.length,311);assert.equal(deepDives.length,312);
 for(const d of depth20DeepDives){
  assert.ok(!baseline.previousGuideIds.includes(d.id));const p=readingPreviewFor(d.doi);assert.equal(p.deepDiveId,d.id);
  assert.equal(p.paragraphs.length,3);assert.ok(p.paragraphs.reduce((n,x)=>n+x.text.split(/\s+/).length,0)>=120);
  assert.equal(p.provenance.length,3);assert.ok(p.provenance.every((f,i)=>f.guideFactIndex===i&&f.locator===d.facts[i].locator));
  assert.notEqual(p.takeaways[0],p.takeaways[1]);assert.equal(d.inventory.length,7);
  for(const path of [d.relatedStudy,'/deep-dives/'+d.id])assert.equal(renderPage(path).status,200);
 }
});
test('source-specific negative results and experimental boundaries remain visible',()=>{
 const text=doi=>JSON.stringify(readingPreviewFor('10.3390/'+doi));
 assert.match(text('ma9060462'),/early strength fell/);
 assert.match(text('ma18112557'),/4.6%.*13.2%/);
 assert.match(text('ma12101616'),/only up to 6 MPa/);
 assert.match(text('app8122358'),/17.2 MPa/);assert.match(text('app8122358'),/different geometries/);
 assert.match(text('ma17194910'),/insufficient alkalinity/);
 assert.match(text('polym16020211'),/not independent printing validation/);
 assert.match(text('min12111342'),/Prior-study strength values/);
 assert.match(text('ma13163499'),/strength penalties.*require extraction/);
 for(let batch=1;batch<=4;batch++){
  const audit=JSON.parse(fs.readFileSync(new URL(`../research/batches/depth20-${batch}-2026-10-20.json`,import.meta.url)));
  assert.equal(audit.records.length,5);assert.equal(audit.operations,audit.queries.length);assert.ok(audit.operations<=40&&audit.operations>=5);
  assert.equal(audit.newCanonicalObservations,0);assert.equal(audit.newBibliographyRecords,0);
  for(const r of audit.records)assert.equal(readingPreviewFor(r.doi).deepDiveId,r.deepDiveId);
 }
});
