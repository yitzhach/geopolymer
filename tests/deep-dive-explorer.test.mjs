import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {deepDiveEntries,filterDeepDives,entryLedger,comparisonHTML,sharedMaterials} from '../src/deep-dive-explorer.js';
import {mixDesignFor} from '../src/deep-dive-mix-designs.js';
import {renderPage} from '../src/app.js';
test('deep dive readiness separates proportion scaling, partial inputs and source holds',()=>{
 assert.equal(deepDiveEntries.length,312);
 assert.equal(filterDeepDives({readiness:'with'}).length,79);
 assert.equal(filterDeepDives({readiness:'without'}).length,233);
 assert.equal(filterDeepDives({readiness:'scalable'}).length,8);
 assert.equal(filterDeepDives({readiness:'partial'}).length,71);
 assert.equal(filterDeepDives({readiness:'hold'})[0].packet.doi,'10.3390/ma12030526');
 assert.equal(filterDeepDives({readiness:'analysis'}).length,3);
 assert.ok(filterDeepDives({readiness:'with'}).every(e=>e.recipes.length||e.packet.partialReview));
 const html=renderPage('/deep-dives').html;assert.equal((html.match(/data-dive-id=/g)||[]).length,312);
 assert.match(html,/id="dive-material"/);assert.match(html,/id="dive-group-pending"/);
});
test('ingredient and dose searches use recorded ledgers without inferring missing recipes',()=>{
 assert.ok(filterDeepDives({query:'26.9 PBDI'}).some(e=>e.id==='phosphate-polymer-rheology'));
 assert.ok(filterDeepDives({query:'1.0% PCE',readiness:'with'}).some(e=>e.id==='ambient-fly-ash-superplasticizer'));
 assert.ok(filterDeepDives({material:'potassium',readiness:'scalable'}).some(e=>e.id==='metakaolin-fly-ash-liquid-definition'));
 assert.equal(filterDeepDives({query:'not-a-real-ingredient-zzzz'}).length,0);
 assert.equal(filterDeepDives({material:'potassium',readiness:'pending'}).length,0);
 const p=deepDiveEntries.find(e=>e.id==='phosphate-polymer-rheology');
 assert.match(entryLedger(p),/20.0 g/);assert.doesNotMatch(entryLedger(p),/Calculated 100 g/);
 const s=deepDiveEntries.find(e=>e.id==='seawater-strength-versus-free-chloride');
 assert.match(entryLedger(s),/Calculated 100 g total wet batch/);assert.match(entryLedger(s),/not a 100 g precursor basis/);
});
test('cross-study overlap remains a descriptive comparison with source-specific test context',()=>{
 const entries=['carbonate-slag-hydroxide-balance','bn-hemp-nanofiber-slag'].map(id=>deepDiveEntries.find(e=>e.id===id));
 assert.ok(sharedMaterials(entries).some(m=>m.id==='slag'&&m.count===2));
 const html=comparisonHTML(entries);assert.match(html,/no pooled ranking/);assert.match(html,/Curing:/);assert.match(html,/Reproduction gaps/);assert.match(html,/Original article/);
 assert.match(comparisonHTML([]),/Select up to four/);
});
test('five further primary reviews preserve quantities, units and unresolved boundaries',async()=>{
 const audit=JSON.parse(await fs.readFile(new URL('../research/batches/mix-design-05-2026-10-21.json',import.meta.url)));
 assert.equal(audit.records.length,5);assert.ok(audit.operationCount<=40);assert.equal(audit.operations.length,audit.operationCount);
 assert.equal(audit.rawSourceRetained,false);assert.equal(audit.newRecipes,0);
 for(const r of audit.records){const p=mixDesignFor(r.id);assert.equal(p.doi,r.doi);assert.equal(p.status,'partial-source-design');assert.equal(p.protocolComplete,false);assert.deepEqual(p.recipeIds,[]);}
 assert.match(mixDesignFor('metakaolin-freeze-thaw-design').partialReview.ledger[0][0],/units unresolved/);
 assert.match(mixDesignFor('biochar-bottom-ash-pore-evolution').partialReview.testing,/7\/30\/90.*7\/28\/90/);
 assert.match(mixDesignFor('bn-hemp-nanofiber-slag').partialReview.ledger[2][1],/INCLUDING nanofibers/);
});
