import {test} from 'node:test';
import assert from 'node:assert/strict';
import {calculate,template,targetGap,scaleRecipe,parseProject,MW,OXIDES} from '../src/gp-chemistry.js';
import {library,filterLibrary} from '../src/research-library.js';
const close=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
const row=(name,mass,comp,role='precursor',include=true)=>({name,mass,comp,role,include,source:'Test fixture'});
test('one mole oxide fixtures distinguish atomic and oxide ratios',()=>{
 const r=calculate({rows:[row('Si',MW.SiO2,{SiO2:100}),row('Al',MW.Al2O3,{Al2O3:100}),row('Na',MW.Na2O,{Na2O:100},'activator'),row('K',MW.K2O,{K2O:100},'activator'),row('Ca',MW.CaO,{CaO:100}),row('water',MW.H2O,{H2O:100},'water')]});
 close(r.ratios.siAl,.5);close(r.ratios.oxideSiAl,1);close(r.ratios.naAl,1);close(r.ratios.kAl,1);close(r.ratios.alkaliAl,2);close(r.ratios.caSi,1);close(r.ratios.binderModulus,.5);close(r.ratios.activatorModulus,0);close(r.ratios.physicalWaterAlkali,.5);
});
test('hydroxides convert once and equivalent water is not physical water',()=>{
 const r=calculate({rows:[row('NaOH',2*MW.NaOH,{NaOH:100},'activator'),row('KOH',2*MW.KOH,{KOH:100},'activator')]});
 close(r.grams.Na2O,MW.Na2O);close(r.grams.K2O,MW.K2O);close(r.grams.H2O,2*MW.H2O);close(r.physicalWater,0);close(r.ratios.equivalentWaterAlkali,1);close(r.ratios.physicalWaterAlkali,0);assert.equal(r.ratios.siAl,null);
 close(Object.values(r.grams).reduce((s,g)=>s+g,0),r.total,1e-5);
});
test('solution water and activator modulus use declared role and composition',()=>{
 const r=calculate(template());close(r.physicalWater,42.5);close(r.grams.SiO2,67.5);close(r.grams.Al2O3,40);close(r.ratios.activatorModulus,(12.5/MW.SiO2)/(5/MW.Na2O));close(r.ratios.waterSolids,42.5/117.5);close(r.ratios.naEquivalentPct,5);
 const aggregate=row('Quartz sand',1000,{SiO2:100},'aggregate',false);const withSand=calculate({rows:[...template().rows,aggregate]});close(withSand.ratios.siAl,r.ratios.siAl);close(withSand.total,r.total+1000);
});
test('reducing solution gives coupled oxide and water losses and target deficit',()=>{
 const baseline=calculate(template());const mix=template();mix.rows[1].mass=25;const changed=calculate(mix);
 close(baseline.grams.SiO2-changed.grams.SiO2,6.25);close(baseline.grams.Na2O-changed.grams.Na2O,2.5);close(baseline.physicalWater-changed.physicalWater,16.25);
 close(targetGap(changed,'siAl',baseline.ratios.siAl).deltaMoles,6.25/MW.SiO2);close(targetGap(changed,'alkaliAl',baseline.ratios.alkaliAl).deltaMoles,5/MW.Na2O);
 mix.rows[0].mass=0;const noAl=calculate(mix);assert.equal(noAl.ratios.siAl,null);assert.equal(targetGap(noAl,'siAl',2).defined,false);
});
test('batch scaling preserves ratios and unknown composition remains visible',()=>{
 const original=calculate(template()),scaled=calculate(scaleRecipe(template(),16000));for(const k of Object.keys(original.ratios))close(original.ratios[k],scaled.ratios[k]);close(scaled.total,16000);
 const r=calculate({rows:[row('Unknown',100,{SiO2:40})]});close(r.unassigned,60);close(r.physicalWater,0);assert.match(r.warnings.join(' '),/unassigned/);
});
test('invalid masses, composition totals and unsafe imported structures rejected',()=>{
 for(const mass of [-1,NaN,Infinity,'',null,{},1e10])assert.throws(()=>calculate({rows:[row('Bad',mass,{SiO2:100})]}));
 assert.throws(()=>calculate({rows:[row('Double counted',100,{NaOH:100,Na2O:77.48})]}));
 assert.throws(()=>calculate({rows:[row('Bad percentage',1,{SiO2:-1})]}));
 assert.throws(()=>scaleRecipe(template('custom'),100));
 assert.throws(()=>parseProject({version:2,recipe:template()}));
 assert.throws(()=>parseProject({version:1,recipe:template(),targets:{siAl:-1}}));
 const p={version:1,recipe:template(),baseline:template(),targets:{siAl:2,alkaliAl:1,caSi:''}};assert.deepEqual(parseProject(JSON.parse(JSON.stringify(p))),p);
 assert.throws(()=>parseProject({version:1,recipe:{rows:Array.from({length:51},()=>row('x',1,{}))}}));
});
test('library has dozens of distinct publisher DOI links and functional filters',()=>{
 assert.equal(library.length,39);assert.equal(new Set(library.map(r=>r.doi.toLowerCase())).size,39);assert.equal(library.filter(r=>r.year>=2024).length,36);
 for(const r of library){assert.match(r.url,/^https:\/\/doi.org\/10\./);assert.ok(r.year<=2026);assert.ok(r.title&&r.journal&&r.topic);}
 assert.ok(filterLibrary('coffee').length===2);assert.ok(filterLibrary('','2024','3D printing').length>=4);assert.equal(filterLibrary('','all','all','Technical report').length,1);assert.equal(filterLibrary('nothing-matches-xyz').length,0);assert.equal(filterLibrary('10.3390/ma18163864').length,1);
});
