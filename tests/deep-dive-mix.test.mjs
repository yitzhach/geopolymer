import test from 'node:test';
import assert from 'node:assert/strict';
import {deepDives} from '../src/deep-dives.js';
import {literatureMixes,mixProject} from '../src/literature-mixes.js';
import {deepDiveMixDesigns,mixDesignFor,validateMixDesigns,proportionalExample,mixVariant,mixDesignExport} from '../src/deep-dive-mix-designs.js';
import {deepDiveMixSection} from '../src/deep-dive-mix-ui.js';
import {renderPage} from '../src/app.js';
const clone=x=>structuredClone(x);
test('all guides expose source-specific recipe readiness, never a blanket complete protocol',()=>{
 assert.equal(validateMixDesigns(deepDiveMixDesigns,deepDives),true);
 assert.equal(deepDiveMixDesigns.length,212);
 for(const d of deepDives){const p=mixDesignFor(d.id),html=renderPage('/deep-dives/'+d.id).html;
  assert.equal(p.protocolComplete,false);assert.match(html,/id="mix-design"/);assert.match(html,/href="#mix-design"/);assert.match(html,/What must be resolved before reproduction/);
  assert.ok(p.reportedConstraints.every(f=>f.source===d.source&&f.locator));
 }
 assert.equal(mixDesignExport().records.length,212);
 assert.equal(mixDesignFor('not-a-guide'),null);
});
test('selection endpoints and examples preserve exact solution masses, age and scope',()=>{
 const p=mixDesignFor('basalt-fiber-carbon-textile');assert.deepEqual(p.selection.choices.map(c=>c.criterion.property),['flexural','compressive']);
 assert.ok(p.selection.notes.some(n=>n.text.includes('must not be assigned to carbon-textile plates')));
 assert.equal(mixDesignFor('biochar-replacement-and-exposure').selection.choices[0].recipeId,'saccani-mh1');
 const mh=proportionalExample(mixVariant('saccani-mh1'));assert.ok(Math.abs(mh.reduce((s,r)=>s+r.massG,0)-1000)<1e-9);assert.ok(Math.abs(mh.find(x=>x.name.includes('hydroxide')).massG-212.9)<1e-9);
 for(const id of ['saccani-mh1','le-matrix-24mm-075','seawater-sw']){const r=mixVariant(id),before=JSON.stringify(r),ex=proportionalExample(r);assert.equal(ex.length,r.ingredients.length);assert.ok(Math.abs(ex.reduce((s,r)=>s+r.massG,0)-1000)<1e-9);assert.equal(JSON.stringify(r),before);}
 assert.throws(()=>proportionalExample(mixVariant('alameri-t2m9')));
 for(const n of [0,-1,NaN,Infinity])assert.throws(()=>proportionalExample(mixVariant('seawater-sw'),n));
 for(const mass of [null,NaN,undefined,-1])assert.throws(()=>proportionalExample({scalable:true,ingredients:[{mass}]}));
});
test('water-source series scales the reported ledger without inventing dry chemical or extra water',()=>{
 const sw=mixVariant('seawater-sw');assert.deepEqual(sw.ingredients.map(r=>r.mass),[1197,299,299]);
 assert.deepEqual(sw.ingredients[1].comp,{});assert.equal(sw.ingredients[2].comp.H2O,61);
 assert.match(sw.basis,/598\/2 = 299 g each \(derived\)/);assert.match(sw.limitations,/Free-chloride/);
 assert.deepEqual(['pw','tw','sw'].map(s=>mixVariant('seawater-'+s).results[0].value),[51.16,49.62,54.22]);
 const p=mixProject(sw.id,1000);assert.ok(Math.abs(p.recipe.rows.reduce((s,r)=>s+r.mass,0)-1000)<1e-9);
 assert.match(p.study.results,/672 hours/);assert.equal(literatureMixes.length,48);
});
test('partial liquid definitions, correction hold and model inputs cannot become scalable recipes',()=>{
 for(const id of ['one-part-waste-sand-water-demand','rap-geopolymer-grout-versus-composite']){const p=mixDesignFor(id),html=deepDiveMixSection(deepDives.find(d=>d.id===id));assert.equal(p.status,'partial-source-design');assert.equal(p.recipeIds.length,0);assert.match(html,/unresolved/i);assert.doesNotMatch(html,/Calculated 1,000 g/);}
 const hold=deepDiveMixDesigns.find(p=>p.doi==='10.3390/ma12030526');assert.equal(hold.status,'source-hold');assert.equal(hold.selection,null);
 for(const d of deepDives.filter(d=>['numerical-model-calibrated-on-prior-experiments','comparative-synthesis-of-prior-experiments'].includes(d.evidenceKind)))assert.equal(mixDesignFor(d.id).status,'no-independent-mix');
 const volcanic=deepDives.find(d=>d.id==='volcanic-ash-limestone-modulus');assert.equal(volcanic.evidenceKind,'experimental-study');assert.notEqual(mixDesignFor(volcanic.id).status,'no-independent-mix');
});
test('validation rejects cross-source recipes, duplicate guides and wrong endpoint selections',()=>{
 let ps=clone(deepDiveMixDesigns);ps[0].recipeIds.push('saccani-mh1');assert.throws(()=>validateMixDesigns(ps,deepDives),/source mismatch/);
 ps=clone(deepDiveMixDesigns);ps[1]=ps[0];assert.throws(()=>validateMixDesigns(ps,deepDives),/identity mismatch/);
 ps=clone(deepDiveMixDesigns);ps[0].selection.choices[0].criterion.ageHours=1;assert.throws(()=>validateMixDesigns(ps,deepDives),/endpoint/);
 ps=clone(deepDiveMixDesigns);ps[0].protocolComplete=true;assert.throws(()=>validateMixDesigns(ps,deepDives),/complete protocol/);
});
test('reference conditions preserve denominators without invented numerical rankings',()=>{
 const carb=mixVariant('xie-c4m1'),fa=mixVariant('vogt-fa10-49');assert.deepEqual(carb.ingredients.map(r=>r.mass),[100,10,4,1,50]);assert.deepEqual(fa.ingredients.map(r=>r.mass),[90,10,49]);
 for(const r of [carb,fa]){assert.equal(r.strength,null);assert.deepEqual(r.results,[]);assert.ok(r.scalable);assert.match(r.license.label,/CC BY 4.0/);}
 assert.match(mixDesignFor('metakaolin-slag-shrinkage-controls').missing.join(' '),/wt%.*molar/);
 assert.match(mixDesignFor('one-part-admixture-compatibility').partialReview.notes,/three days/);
 assert.match(mixDesignFor('metakaolin-curing-temperature-grade').partialReview.testing,/excluded/);
});
test('source-review batches are bounded with exact identities and operations',async()=>{
 const fs=await import('node:fs/promises');let added=0;
 for(const [id,n,ops]of [['reuse',3,0],['01',3,33],['02',5,26],['03',5,21]]){
  const a=JSON.parse(await fs.readFile(new URL('../research/batches/mix-design-'+id+'-2026-10-21.json',import.meta.url)));
  assert.equal(a.records.length,n);assert.ok(n<=5);assert.equal(a.operationCount,ops);assert.equal(a.operations.length,ops);assert.ok(ops<=40);
  for(const r of a.records){assert.equal(r.doi,mixDesignFor(r.id).doi);assert.equal(r.protocolComplete,false);}
  assert.equal(a.rawSourceRetained,false);assert.equal(a.newCanonicalObservations,0);added+=n;
 }assert.equal(added,16);
});
