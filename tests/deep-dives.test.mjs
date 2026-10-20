import test from 'node:test';
import assert from 'node:assert/strict';
import {deepDives} from '../src/deep-dives.js';
import {validateDeepDives} from '../src/deep-dive-core.js';
import {deepDivePage} from '../src/deep-dive-ui.js';
import {renderPage} from '../src/app.js';
import {search} from '../src/data.js';
test('deep dives are discoverable with unresolved replication gaps visible',()=>{
 assert.equal(validateDeepDives(deepDives),true);
 assert.ok(search(deepDives[0].doi).some(x=>x.href==='/deep-dives/ggbs-taguchi-mortar'));
 const page=renderPage('/deep-dives/ggbs-taguchi-mortar');assert.equal(page.status,200);
 for(const text of ['Source conflict','Table 5','Free-water mass','not a complete recipe','Original laboratory planning guidance'])assert.ok(page.html.includes(text),text);
 assert.equal(renderPage('/deep-dives/missing').status,404);
});
test('editorial publication rejects duplicate DOI, missing source locators and unsafe URLs',()=>{
 for(const change of [r=>r.push({...r[0],id:'another'}),r=>r[0].facts[0].locator='',r=>r[0].source='javascript:alert(1)',r=>r[0].holds=[]]){const r=structuredClone(deepDives);change(r);assert.throws(()=>validateDeepDives(r));}
});
test('shared template escapes article-specific prose and calculations',()=>{
 const d=structuredClone(deepDives[0]);d.arithmetic.rows[0][1]='<img src=x onerror=alert(1)>';d.facts[0].text='<script>alert(1)</script>';
 const html=deepDivePage(d);assert.ok(!html.includes('<img'));assert.ok(!html.includes('<script>'));assert.match(html,/&lt;img/);
});

test('each deep dive resolves its formulation and uses its own glossary',()=>{
 assert.equal(deepDives.length,74);
 for(const d of deepDives){assert.equal(renderPage(d.relatedRecipe||d.relatedStudy).status,200);const page=renderPage('/deep-dives/'+d.id);assert.equal(page.status,200);const escaped=d.glossary.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));assert.ok(page.html.includes(escaped),d.id);assert.ok(search(d.doi).some(r=>r.href==='/deep-dives/'+d.id));}
 const biochar=renderPage('/deep-dives/biochar-replacement-and-exposure').html;
 assert.match(biochar,/age-matched/);assert.doesNotMatch(biochar,/PS\/PH/);
 assert.match(renderPage('/deep-dives/basalt-fiber-carbon-textile').html,/0.249%/);
});

test('hemp editorial notes link a publication without inventing a recipe',()=>{
 const d=deepDives.find(x=>x.doi==='10.3390/polym18111288');assert.ok(d.relatedStudy);assert.equal(d.relatedRecipe,undefined);
 const html=deepDivePage(d);for(const term of ['Read the source article','Related publication record','Source conflict','indexed publisher/PMC','F=pB/(1−p)'])assert.ok(html.includes(term),term);
 assert.doesNotMatch(html,/Related formulation record|href="undefined"|Read the source PDF/);
 for(const field of ['relatedStudy','licenseUrl']){const copy=structuredClone(d);copy[field]='javascript:alert(1)';assert.throws(()=>validateDeepDives([copy]));}
});

test('control deep dives preserve denominator and replication limitations',()=>{
 const shrink=renderPage('/deep-dives/metakaolin-slag-shrinkage-controls').html;
 for(const term of ['110 ± 5%','Assumes a mass ratio','title-only correction','immediately after demolding'])assert.ok(shrink.includes(term),term);
 const water=renderPage('/deep-dives/metakaolin-water-temperature').html;
 for(const term of ['250 g stock solution','150 g added water','MK0.6/MK1.0/MK1.4','not total water/binder','No graph values'])assert.ok(water.includes(term),term);
});

test('every guide shows a fixed-area source inventory without coverage percentages',()=>{
 for(const d of deepDives){
  assert.deepEqual(d.inventory.map(r=>r.area),['Methods','Materials','Mix ledger','Results','Figures','Supplements','Uncertainty']);
  assert.ok(!d.inventory.some(r=>['extracted','verified'].includes(r.state)),d.id);
  const html=renderPage('/deep-dives/'+d.id).html;assert.match(html,/id="inventory"/);assert.match(html,/no coverage percentage is given/);
 }
 assert.match(deepDivePage(deepDives.find(d=>d.id==='metakaolin-freeze-thaw-design')),/Mass units and exact binder\/water denominator unresolved/);
 for(const change of [r=>r[0].inventory.pop(),r=>r[0].inventory[0].state='complete',r=>r[0].inventory[0].note='80% covered',r=>r[0].inventory[1].locator='']){const r=structuredClone(deepDives);change(r);assert.throws(()=>validateDeepDives(r));}
});

test('owner-PDF guides keep source conflicts and ratio checks visible',()=>{
 const html=id=>renderPage('/deep-dives/'+id).html;
 const eff=html('fly-ash-slag-efflorescence-moisture');for(const t of ['Specimen geometry conflict','2 ± 0.5 mm','24.7 / 34.5'])assert.ok(eff.includes(t),t);
 const adm=html('one-part-admixture-compatibility');for(const t of ['403 / 1097','397 / 1082','Not an ambient-only cure'])assert.ok(adm.includes(t),t);
 const k=html('metakaolin-slag-potassium-durability');for(const t of ['≈ 3.24 molar','KOH entry basis','Higher GGBFS lowered strength'])assert.ok(k.includes(t),t);
 for(const id of ['ke-b14-002','ke-b14-005','ke-b14-017'])assert.match(renderPage('/studies/'+id).html,/Read the experiment deep dive/);
});
