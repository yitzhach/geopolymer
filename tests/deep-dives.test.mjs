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
 assert.equal(deepDives.length,4);
 for(const d of deepDives){assert.equal(renderPage(d.relatedRecipe||d.relatedStudy).status,200);const page=renderPage('/deep-dives/'+d.id);assert.equal(page.status,200);assert.ok(page.html.includes(d.glossary));assert.ok(search(d.doi).some(r=>r.href==='/deep-dives/'+d.id));}
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
