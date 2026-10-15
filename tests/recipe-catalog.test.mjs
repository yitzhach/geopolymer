import test from 'node:test';
import assert from 'node:assert/strict';
import {literatureMixes,mixProject} from '../src/literature-mixes.js';
import {recipeAdditions} from '../src/recipe-additions.js';
import {selectRecipes,planRequirements,catalogExport,testAges} from '../src/recipe-planner.js';
import {mixDetail} from '../src/literature-ui.js';
import {newTrial} from '../src/experiment-notebook.js';
test('mass-proportion source records scale without altering source results or notebook measurements',()=>{
 assert.equal(recipeAdditions.length,11);assert.equal(literatureMixes.length,18);assert.equal(new Set(literatureMixes.map(m=>m.id)).size,18);
 const before=JSON.stringify(literatureMixes);
 for(const m of recipeAdditions){const p=mixProject(m.id,2000);assert.ok(Math.abs(p.recipe.rows.reduce((s,r)=>s+r.mass,0)-2000)<1e-8);assert.ok(m.url.startsWith('https://'));assert.ok(m.locator);assert.ok(m.method);assert.ok(m.curing);assert.equal(newTrial(p).results.length,0);}
 assert.equal(JSON.stringify(literatureMixes),before);
 const p=mixProject('vogt-gp6',100);assert.deepEqual(p.recipe.rows.map(r=>r.mass),[60.92,3.89,35.19]);assert.match(p.study.results,/13.9 MPa at 24 hours/);assert.match(p.study.results,/81.3 MPa at 672 hours/);
});
test('requirements match exact property and age without inventing curves or cross-property conversions',()=>{
 const four=planRequirements({target:15,ageHours:4});assert.deepEqual(four.matches.map(m=>m.id),['davidovits-dry-ex6']);
 const one=planRequirements({target:10,ageHours:1});assert.equal(one.matches.length,0);assert.ok(one.testSchedule.every(r=>r.predictedStrength===null));assert.deepEqual(one.testSchedule.map(r=>r.ageHours),testAges);
 assert.equal(planRequirements({property:'shear',target:1}).matches.length,0);
 assert.ok(planRequirements({property:'flexural',target:6}).matches.every(m=>m.id==='bong-na-n-25'));
 assert.equal(planRequirements({property:'thin',thickness:3}).matches.length,0);
 for(const input of [{target:''},{target:-1},{target:Infinity},{target:10,ageHours:12},{property:'thin',thickness:''}])assert.throws(()=>planRequirements(input));
});
test('catalog filters and export preserve references and unknown results',()=>{
 assert.equal(selectRecipes({query:'xyz-no-match'}).length,0);assert.ok(selectRecipes({activation:'sodium'}).every(m=>m.activation==='sodium'));
 assert.equal(selectRecipes({query:'KASIL 2040'}).length,1);
 const k=literatureMixes.find(m=>m.id==='bong-k-ka20-25');assert.equal(k.strength,null);assert.deepEqual(k.results,[]);assert.doesNotMatch(mixDetail(k),/null MPa/);assert.match(mixDetail(k),/Not recorded/);
 assert.equal(JSON.parse(JSON.stringify(catalogExport())).records.length,18);
});

test('novel collection preserves dosage bases, age boundaries and non-scalable partial recipes',()=>{
 const pt5=literatureMixes.find(m=>m.id==='meng-pt5'),pt6=literatureMixes.find(m=>m.id==='meng-pt6');
 assert.equal(pt5.results[0].ageHours,672);assert.equal(pt5.results[0].value,46.4);
 assert.equal(pt6.results[0].ageHours,168);assert.equal(pt6.results[0].value,44.7);
 assert.match(pt5.parameters[1][1],/1.5‰ of metakaolin mass/);
 for(const m of [pt5,pt6]){assert.throws(()=>mixProject(m.id,1000));assert.doesNotMatch(mixDetail(m),/id="mix-open"/);assert.equal(m.license.label,'CC BY 4.0');}
 assert.ok(selectRecipes({collection:'novel',query:'PVA',activation:'sodium'}).every(m=>m.id.startsWith('meng-')));
 assert.equal(selectRecipes({collection:'novel',query:'PVA'}).length,2);
 assert.equal(selectRecipes({focus:'shear'}).length,0);assert.equal(selectRecipes({focus:'lightweight'}).length,0);
 assert.deepEqual(selectRecipes({focus:'bond'}).map(m=>m.id),['bong-na-n-25']);
 assert.ok(selectRecipes({focus:'flexural'}).some(m=>m.id==='meng-pt5'));
 assert.ok(!planRequirements({property:'flexural',target:1}).matches.some(m=>m.id.startsWith('meng-')));
 const gp9=literatureMixes.find(m=>m.id==='vogt-gp9');assert.equal(gp9.results.length,1);assert.equal(gp9.results[0].ageHours,672);
 assert.match(mixDetail(gp9),/Below detection; limit not reported/);
 assert.deepEqual(mixProject('vogt-gp9',100).recipe.rows.map(r=>r.mass),[58.98,5.83,35.19]);
});
