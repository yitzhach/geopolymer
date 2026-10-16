import test from 'node:test';
import assert from 'node:assert/strict';
import {literatureMixes,mixProject} from '../src/literature-mixes.js';
import {recipeAdditions} from '../src/recipe-additions.js';
import {selectRecipes,planRequirements,catalogExport,testAges} from '../src/recipe-planner.js';
import {mixDetail,sourceComparison} from '../src/literature-ui.js';
import {newTrial} from '../src/experiment-notebook.js';
test('mass-proportion source records scale without altering source results or notebook measurements',()=>{
 assert.equal(recipeAdditions.length,11);assert.equal(literatureMixes.length,43);assert.equal(new Set(literatureMixes.map(m=>m.id)).size,43);
 const before=JSON.stringify(literatureMixes);
 for(const m of recipeAdditions){const p=mixProject(m.id,2000);assert.ok(Math.abs(p.recipe.rows.reduce((s,r)=>s+r.mass,0)-2000)<1e-8);assert.ok(m.url.startsWith('https://'));assert.ok(m.locator);assert.ok(m.method);assert.ok(m.curing);assert.equal(newTrial(p).results.length,0);}
 assert.equal(JSON.stringify(literatureMixes),before);
 const p=mixProject('vogt-gp6',100);assert.deepEqual(p.recipe.rows.map(r=>r.mass),[60.92,3.89,35.19]);assert.match(p.study.results,/13.9 MPa at 24 hours/);assert.match(p.study.results,/81.3 MPa at 672 hours/);
});
test('requirements match exact property and age without inventing curves or cross-property conversions',()=>{
 const four=planRequirements({target:15,ageHours:4});assert.deepEqual(four.matches.map(m=>m.id),['davidovits-dry-ex6']);
 const one=planRequirements({target:10,ageHours:1});assert.equal(one.matches.length,0);assert.ok(one.testSchedule.every(r=>r.predictedStrength===null));assert.deepEqual(one.testSchedule.map(r=>r.ageHours),testAges);
 assert.equal(planRequirements({property:'shear',target:1}).matches.length,0);
 assert.deepEqual([...new Set(planRequirements({property:'flexural',target:6}).matches.map(m=>m.id))],['bong-na-n-25',...literatureMixes.filter(m=>m.id.startsWith('le-matrix-')).map(m=>m.id)]);
 assert.equal(planRequirements({property:'thin',thickness:3}).matches.length,0);
 for(const input of [{target:''},{target:-1},{target:Infinity},{target:10,ageHours:12},{property:'thin',thickness:''}])assert.throws(()=>planRequirements(input));
});
test('catalog filters and export preserve references and unknown results',()=>{
 assert.equal(selectRecipes({query:'xyz-no-match'}).length,0);assert.ok(selectRecipes({activation:'sodium'}).every(m=>m.activation==='sodium'));
 assert.equal(selectRecipes({query:'KASIL 2040'}).length,1);
 const k=literatureMixes.find(m=>m.id==='bong-k-ka20-25');assert.equal(k.strength,null);assert.deepEqual(k.results,[]);assert.doesNotMatch(mixDetail(k),/null MPa/);assert.match(mixDetail(k),/Not recorded/);
 assert.equal(JSON.parse(JSON.stringify(catalogExport())).records.length,43);
});

test('novel collection preserves dosage bases, age boundaries and non-scalable partial recipes',()=>{
 const pt5=literatureMixes.find(m=>m.id==='meng-pt5'),pt6=literatureMixes.find(m=>m.id==='meng-pt6');
 assert.equal(pt5.results[0].ageHours,672);assert.equal(pt5.results[0].value,46.4);
 assert.equal(pt6.results[0].ageHours,168);assert.equal(pt6.results[0].value,44.7);
 assert.match(pt5.parameters[1][1],/1.5‰ of metakaolin mass/);
 for(const m of [pt5,pt6]){assert.throws(()=>mixProject(m.id,1000));assert.doesNotMatch(mixDetail(m),/id="mix-open"/);assert.equal(m.license.label,'CC BY 4.0');}
 assert.ok(selectRecipes({collection:'novel',query:'PVA',activation:'sodium'}).every(m=>m.id.startsWith('meng-')));
 assert.equal(selectRecipes({collection:'novel',query:'PVA'}).length,2);
 assert.equal(selectRecipes({focus:'shear'}).length,0);assert.equal(selectRecipes({focus:'lightweight'}).length,5);
 assert.deepEqual(selectRecipes({focus:'bond'}).map(m=>m.id),['bong-na-n-25','nematollahi-pp0','nematollahi-pp1']);
 assert.ok(selectRecipes({focus:'flexural'}).some(m=>m.id==='meng-pt5'));
 assert.ok(!planRequirements({property:'flexural',target:1}).matches.some(m=>m.id.startsWith('meng-')));
 const gp9=literatureMixes.find(m=>m.id==='vogt-gp9');assert.equal(gp9.results.length,1);assert.equal(gp9.results[0].ageHours,672);
 assert.match(mixDetail(gp9),/Below detection; limit not reported/);
 assert.deepEqual(mixProject('vogt-gp9',100).recipe.rows.map(r=>r.mass),[58.98,5.83,35.19]);
});

test('PP recipe keeps volume fibers out of mass scaling and preserves activator solution ratio',()=>{
 const control=literatureMixes.find(m=>m.id==='nematollahi-pp0');
 const fiber=literatureMixes.find(m=>m.id==='nematollahi-pp1');
 const batch=mixProject(control.id,3007);
 assert.ok(Math.abs(batch.recipe.rows.reduce((sum,r)=>sum+r.mass,0)-3007)<1e-8);
 assert.ok(Math.abs(batch.recipe.rows[2].mass/batch.recipe.rows[1].mass-2.5)<1e-10);
 assert.equal(control.ingredients.at(-1).mass,0.040);assert.equal(fiber.ingredients.at(-1).mass,0.004);
 assert.equal(fiber.parameters[0][1],'1 vol%');assert.throws(()=>mixProject(fiber.id,1000));
 assert.match(mixDetail(fiber),/Mass parts per fly ash; excludes separately stated fiber/);
 assert.doesNotMatch(mixDetail(fiber),/Source quantities .kg\/m³; incomplete batch/);
 assert.ok(!planRequirements({property:'bond',target:0.1,ageHours:24}).matches.some(m=>m.id.startsWith('nematollahi')));
});


test('fiber batch scales geopaste-based doses and keeps specimen results separate',()=>{
 const additions=literatureMixes.filter(m=>m.id.startsWith('le-')||m.id.startsWith('sbi-'));
 assert.equal(additions.length,18);assert.equal(new Set(additions.map(m=>m.doi)).size,2);
 assert.equal(additions.filter(m=>m.scalable).length,11);
 const mix=literatureMixes.find(m=>m.id==='le-matrix-6mm-050');
 const p=mixProject(mix.id,3609);
 assert.deepEqual(p.recipe.rows.map(r=>Math.round(r.mass)),[1000,800,1500,200,100,9]);
 assert.ok(Math.abs(p.recipe.rows.at(-1).mass/(p.recipe.rows[0].mass+p.recipe.rows[1].mass)-0.005)<1e-10);
 assert.match(p.study.results,/77.01 ± 3.13/);assert.match(p.study.results,/reported ±; type unresolved/);
 assert.equal(newTrial(p).results.length,0);
 const html=mixDetail(mix);assert.match(html,/13.43 ± 0.85/);assert.match(html,/Matrix only/);
 for(const m of additions){
  assert.equal(m.license.label,'CC BY 4.0');assert.ok(m.sourceTitle);assert.ok(m.locator);
  if(!m.scalable){assert.throws(()=>mixProject(m.id,1000));assert.deepEqual(m.results,[]);assert.equal(m.strength,null);assert.doesNotMatch(mixDetail(m),/id="mix-open"/);}
 }
 const textile=literatureMixes.find(m=>m.id==='le-textile-6mm-050');
 assert.match(mixDetail(textile),/Matrix parts only; excludes carbon textile/);
 assert.ok(!planRequirements({property:'flexural',target:1}).matches.some(m=>m.id.startsWith('le-textile')||m.id.startsWith('sbi-')));
 assert.ok(!planRequirements({property:'compressive',target:1,ageHours:168}).matches.some(m=>m.id.startsWith('le-')));
 assert.equal(selectRecipes({query:'hemp',collection:'novel',focus:'lightweight'}).length,5);
 assert.ok(selectRecipes({focus:'lightweight'}).every(m=>!m.scalable));
 const exported=catalogExport().records.find(m=>m.id===mix.id);assert.equal(exported.results[0].spread,3.13);
});

 test('complete basalt matrix comparison retains unfavorable values and excludes assemblies',()=>{
 const rows=literatureMixes.filter(m=>m.id.startsWith('le-matrix-'));
 assert.equal(rows.length,11);assert.equal(rows.flatMap(m=>m.results).length,22);
 const highDose=rows.find(m=>m.id==='le-matrix-6mm-100');
 assert.equal(highDose.results.find(r=>r.property==='compressive').value,75.24);
 assert.equal(highDose.results.find(r=>r.property==='flexural').value,13.33);
 assert.ok(Math.abs(highDose.ingredients.at(-1).mass-0.018)<1e-12);
 assert.equal(rows.find(m=>m.id==='le-matrix-12mm-075').strength,83.77);
 assert.equal(rows.find(m=>m.id==='le-matrix-24mm-050').results[1].spread,0.65);
 const html=sourceComparison(highDose);assert.equal((html.match(/scope="row"/g)||[]).length,11);
 assert.match(html,/75.24 ± 4.01/);assert.doesNotMatch(html,/le-textile-/);
 assert.equal(sourceComparison({...highDose,comparisonIds:['le-textile-control']}),'');
 for(const m of rows){const p=mixProject(m.id,1200);assert.ok(Math.abs(p.recipe.rows.reduce((sum,r)=>sum+r.mass,0)-1200)<1e-8);assert.equal(newTrial(p).results.length,0);}
 });

 test('biochar wet mass and replacement bases stay distinct and measured ages stay exact',()=>{
 const m=literatureMixes.find(r=>r.id==='saccani-mh1');
 const p=mixProject(m.id,1000);assert.deepEqual(p.recipe.rows.map(r=>Math.round(r.mass*10)/10),[554.6,5.6,212.9,212.9,14]);
 assert.equal(m.results.length,3);assert.deepEqual(m.results.map(r=>r.ageHours),[168,336,672]);
 assert.equal(m.results[1].original,'30.0 ± 2.4');assert.deepEqual(m.ingredients[3].comp,{});
 assert.equal(literatureMixes.find(r=>r.id==='saccani-mh8').strength,20.1);
 assert.equal(newTrial(p).results.length,0);
 assert.equal(selectRecipes({query:'biochar',collection:'novel'}).length,5);
 assert.ok(!planRequirements({property:'compressive',target:1,ageHours:24}).matches.some(r=>r.id.startsWith('saccani')));
 assert.ok(!planRequirements({property:'flexural',target:1}).matches.some(r=>r.id.startsWith('saccani')));
 });
