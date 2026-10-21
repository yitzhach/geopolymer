import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {library,filterLibrary,libraryResults} from '../src/research-library.js';
import {deepDives} from '../src/deep-dives.js';
import {readingExpansionDeepDives} from '../src/deep-dive-reading-expansion.js';
import {paperReadingPreviews} from '../src/paper-reading-previews.js';
import {readingPreviewFor,renderReadingPreview} from '../src/paper-reading-ui.js';
import {validateReadingPreviews} from '../src/paper-reading-core.js';
import {researchDatabase} from '../src/research-feeds.js';
import {renderPage} from '../src/app.js';
test('every catalog-backed guide has a three-paragraph reading preview and both reading links',()=>{
 assert.equal(library.length,1000);assert.equal(deepDives.length,92);assert.equal(paperReadingPreviews.length,91);
 assert.equal(validateReadingPreviews(paperReadingPreviews,library,deepDives),true);
 const baseline=JSON.parse(fs.readFileSync(new URL('../research/batches/reading-previews-2026-10-20-baseline.json',import.meta.url)));
 assert.equal(baseline.length,73);for(const p of baseline)assert.equal(readingPreviewFor(p.doi).deepDiveId,p.id);
 for(const d of deepDives){const p=library.find(p=>p.doi.toLowerCase()===d.doi.toLowerCase());if(!p)continue;
  const preview=readingPreviewFor(p.doi);assert.ok(preview);assert.equal(preview.paragraphs.length,3);assert.ok(preview.paragraphs.reduce((n,p)=>n+p.text.split(/\s+/).length,0)>=90);
  const card=libraryResults([p]);for(const text of ['Read paper summary','Key takeaways','Limitations','Who would benefit','Read original article'])assert.ok(card.includes(text));
  assert.ok(card.includes(preview.links.deepDive));assert.ok(renderPage('/studies/'+p.id).html.includes('Paper summary'));
 }
 assert.equal(filterLibrary('','all','all','all','reading').length,91);assert.equal(filterLibrary('','all','all','all','deep-dives').length,91);assert.equal(filterLibrary('','all','all','all','summaries').length,22);
 assert.equal(researchDatabase().records.filter(p=>p.readingPreview).length,91);
 const plain=library.find(p=>!readingPreviewFor(p.doi));assert.equal(renderReadingPreview(plain),'');
});
test('fifteen new guides stay in the existing catalog and preserve important negative/domain results',()=>{
 assert.equal(readingExpansionDeepDives.length,15);
 for(const d of readingExpansionDeepDives){assert.ok(library.some(p=>p.doi===d.doi));assert.equal(d.inventory.length,7);assert.equal(renderPage('/deep-dives/'+d.id).status,200);}
 for(const [doi,term] of [['10.3390/ma14164599','abandoned'],['10.3390/ma13163644','9–32 MPa'],['10.3390/min14050516','more than two hours'],['10.3390/jcs10010022','omit labor']])assert.ok(readingPreviewFor(doi).paragraphs.some(p=>p.text.includes(term)),doi);
 const correction=readingPreviewFor('10.3390/ma12030526');assert.equal(correction.sourceStatus,'update-requires-review');assert.match(renderReadingPreview({doi:correction.doi}),/Correction linked; review pending/);
 assert.equal(readingPreviewFor('10.3390/coatings11010087').findingsCoverage,'selected-comparison-with-unresolved-result');
});
test('publication gates reject broken provenance, unsafe reading links and hidden correction holds',()=>{
 for(const change of [ps=>ps.push({...ps[0]}),ps=>ps[0].links.originalArticle='javascript:alert(1)',ps=>ps[0].provenance=[],ps=>ps[0].paragraphs.pop(),ps=>{delete ps.find(p=>p.sourceStatus==='update-requires-review').statusNotice;}]){
  const ps=structuredClone(paperReadingPreviews);change(ps);assert.throws(()=>validateReadingPreviews(ps,library,deepDives));
 }
 const p=paperReadingPreviews[0],old=p.audience;try{p.audience='<img src=x onerror=alert(1)>';const html=renderReadingPreview({doi:p.doi});assert.ok(!html.includes('<img'));assert.ok(html.includes('&lt;img'));}finally{p.audience=old;}
});

test('followup guides preserve endpoint, chemistry and chloride boundaries',async()=>{
 const {followupDeepDives}=await import('../src/deep-dive-followup-expansion.js');
 assert.equal(followupDeepDives.length,3);
 for(const d of followupDeepDives){
  const p=readingPreviewFor(d.doi);assert.equal(p.deepDiveId,d.id);assert.equal(d.inventory.length,7);
  assert.equal(renderPage('/deep-dives/'+d.id).status,200);assert.ok(p.provenance.every(f=>f.locator&&f.source===d.source));
 }
 assert.match(readingPreviewFor('10.3390/ma15010194').paragraphs[2].text,/initial set.*final set/);
 assert.match(readingPreviewFor('10.3390/min10010015').limitations.join(' '),/universal optimum/);
 const sea=readingPreviewFor('10.3390/ma13061467');assert.match(sea.paragraphs[2].text,/free chloride/);
 assert.match(sea.limitations.join(' '),/corrosion performance/);
 assert.equal(followupDeepDives.find(d=>d.doi===sea.doi).licenseUrl,'https://creativecommons.org/licenses/by/4.0/');
 assert.equal(readingPreviewFor('10.3390/ma13163499'),null);
});
