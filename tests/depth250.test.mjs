import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {createHash} from 'node:crypto';
import {depth250DeepDives,depth250ReadingPreviews} from '../src/deep-dive-depth250-expansion.js';import {deepDives} from '../src/deep-dives.js';import {paperReadingPreviews} from '../src/paper-reading-previews.js';import {library} from '../src/research-library.js';import {literatureMixes} from '../src/literature-mixes.js';import {pilot} from '../src/knowledge-pilot.js';import {mixDesignFor} from '../src/deep-dive-mix-designs.js';import {filterDeepDives,deepDiveEntries,comparisonHTML,entryLedger} from '../src/deep-dive-explorer.js';import {researchDatabase} from '../src/research-feeds.js';import {renderPage} from '../src/app.js';import {validateMixDataSet} from '../src/mix-data-contract.js';
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');const read=name=>JSON.parse(fs.readFileSync(new URL('../research/batches/'+name,import.meta.url)));const baseline=read('depth250-baseline-2026-10-21.json');
test('next fifty guides and summaries preserve the published c5ad30a batch and all scientific records',()=>{
 assert.equal(deepDives.length,362);assert.equal(paperReadingPreviews.length,361);assert.equal(depth250DeepDives.length,50);assert.equal(depth250ReadingPreviews.length,50);assert.equal(new Set(depth250DeepDives.map(d=>d.doi)).size,50);
 assert.equal(baseline.previousGuides.length,312);assert.equal(baseline.previousPreviews.length,311);
 for(const x of baseline.previousGuides)assert.equal(hash(deepDives.find(d=>d.id===x.id)),x.sha256,x.id);
 for(const x of baseline.previousPreviews)assert.equal(hash(paperReadingPreviews.find(p=>p.doi===x.doi)),x.sha256,x.doi);
 assert.equal(hash(library.map(p=>({id:p.id,doi:p.doi,title:p.title}))),baseline.publicationIdentityHash);assert.equal(hash(literatureMixes),baseline.recipeCatalogHash);assert.equal(hash(pilot),baseline.canonicalPilotHash);
 for(const d of depth250DeepDives){assert.ok(!baseline.previousGuides.some(p=>p.doi===d.doi));const p=depth250ReadingPreviews.find(p=>p.doi===d.doi);assert.equal(p.paragraphs.length,3);assert.ok(p.paragraphs.reduce((n,p)=>n+p.text.split(/\s+/).length,0)>=100);assert.equal(renderPage(d.relatedStudy).status,200);assert.equal(renderPage(p.links.deepDive).status,200);}
});
test('new source ledgers distinguish dose bases, stock concentrations, analytical mixtures and failed conditions',()=>{
 const p=id=>mixDesignFor(id);assert.match(p('solid-refractory-sr1-versus-sr4').partialReview.ledger[0][1],/26%.*52%.*3%.*8%.*11%/);assert.match(p('solid-refractory-sr1-versus-sr4').partialReview.notes,/failed/);
 assert.match(p('mk-modulus-age-loading-boundaries').partialReview.ledger[0][1],/750.*1875.*215.*430.*solution/);
 for(const id of ['mk-strength-development-activator-scope','industrial-kaolin-alkali-characterization','sfcc-phosphate-acid-window']){assert.equal(p(id).dataSet.fields.find(f=>f.id==='ingredients').state,'pending');assert.ok(!filterDeepDives({readiness:'with'}).some(d=>d.id===id));}
 for(const id of ['printing-rheology-review-transfer','pva-nanosilica-rheology-model-scope','co2-wellcement-review-qualification']){assert.equal(p(id).status,'no-independent-mix');assert.deepEqual(p(id).recipeIds,[]);assert.ok(p(id).dataSet.fields.filter(f=>f.id!=='limitations').every(f=>f.state==='not-applicable'));}
 assert.match(p('granite-reactive-silica-conflicted-optimum').partialReview.notes,/GWS60.*14.2.*13.8.*GWS70/);assert.match(p('calcined-pumice-multiobjective').partialReview.notes,/750.*600/);assert.match(p('aircooled-slag-milling-activation').partialReview.preparation,/200 mm.*inconsistency/);
 assert.equal(p('reactive-mgo-carbonation-review-gap'),null);assert.equal(p('heap-flyash-activator-definition'),null);
});
test('bounded next fifty audits retain actual access failures and do not multiply catalogs or observations',()=>{
 const seen=new Set();let ops=0,deferred=0;for(let b=1;b<=11;b++){const a=read(`depth250-${String(b).padStart(2,'0')}-2026-10-21.json`);assert.ok(a.records.length+a.deferred.length<=5);assert.equal(a.operationCount,a.operations.length);assert.ok(a.operationCount<=40);assert.equal(a.rawSourceRetained,false);assert.equal(a.newRecipes,0);assert.equal(a.newCanonicalObservations,0);ops+=a.operationCount;deferred+=a.deferred.length;for(const r of a.records){assert.ok(!seen.has(r.doi));seen.add(r.doi);assert.equal(mixDesignFor(r.deepDiveId).doi,r.doi);assert.equal(r.protocolComplete,false);}}
 assert.equal(seen.size,50);assert.equal(ops,125);assert.equal(deferred,2);assert.match(read('depth250-06-2026-10-21.json').access,/429.*no retry/);assert.match(read('depth250-10-2026-10-21.json').access,/challenge/);
 const a=read('mix-design-07-2026-10-21.json');assert.equal(a.records.length,5);assert.equal(a.operationCount,11);assert.equal(a.records.filter(r=>r.status==='source-review-needed').length,1);assert.equal(a.records.filter(r=>r.quantitiesAvailable).length,3);
});
test('every new summary joins the same eight-field source dataset without granting protocol completeness',()=>{
 const database=researchDatabase();for(const d of depth250DeepDives){const packet=mixDesignFor(d.id);assert.ok(validateMixDataSet(packet.dataSet,d));assert.equal(packet.dataSet.fields.length,8);assert.equal(packet.protocolComplete,false);assert.deepEqual(database.records.find(p=>p.doi===d.doi).mixData,packet.dataSet);for(const f of packet.dataSet.fields){assert.equal(f.source,d.source);assert.ok(f.locator);}}
 assert.equal(filterDeepDives({readiness:'with'}).length,119);assert.equal(mixDesignFor('masonry-fiber-material-versus-structure').status,'source-review-needed');assert.match(mixDesignFor('foam-polystyrene-fire-assembly').partialReview.notes,/S20.*not.*S19/);assert.match(mixDesignFor('metakaolin-gel-amount-versus-composition').partialReview.notes,/Mixture 1.*excluded.*unreliable/);
});

test('mix comparisons expose the actual curing field and label stock-only notes honestly',()=>{
 const selected=['solid-refractory-sr1-versus-sr4','glass-frit-chloride-containment-ramp'].map(id=>deepDiveEntries.find(e=>e.id===id));const html=comparisonHTML(selected);
 for(const e of selected){assert.ok(html.includes(e.packet.partialReview.curing));assert.ok(html.includes(e.packet.partialReview.testing));}
 assert.match(entryLedger(deepDiveEntries.find(e=>e.id==='mk-strength-development-activator-scope')),/Material and stock notes — batch quantities pending/);
});
