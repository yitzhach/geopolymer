import {test} from 'node:test';
import assert from 'node:assert/strict';
import {buildRecipe} from '../src/recipe-builder.js';
import {supplierGrades,gradeIngredient,findGrade} from '../src/supplier-grades.js';
import {normalizeRecipe,parseProject,calculate} from '../src/gp-chemistry.js';
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
const input=(id='pq-n',system='sodium')=>({precursor:gradeIngredient('dynapoz-110-cr'),activator:gradeIngredient(id),system,mode:'targets',total:1000,siAl:2,alkaliAl:1,waterSolids:.8,hydroxidePct:98,hydroxideWater:0,targetSource:'Exploratory numerical fixture, not a recommended formulation'});
test('supplier compositions, water assumptions and densities keep explicit source provenance',()=>{
 assert.equal(supplierGrades.length,7);
 for(const g of supplierGrades){const r=normalizeRecipe({rows:[gradeIngredient(g.id,100)]});assert.match(r.rows[0].source,/https:/);assert.equal(r.rows[0].provenance.kind,'assumption');assert.ok(r.rows[0].provenance.basis);}
 const d=calculate({rows:[gradeIngredient('dynapoz-110-cr',100)]});close(d.unassigned,.15);close(d.physicalWater,0);
 close(findGrade('pq-kasil-6').comp.H2O,60.85);close(findGrade('pq-kasil-1').density,1.26);
 assert.equal(findGrade('powerpozz-white').density,undefined);assert.match(findGrade('powerpozz-white').basis,/midpoints/);
 assert.throws(()=>gradeIngredient('unknown'));
});
test('gram proportions sum to chosen wet mass without mutating catalog',()=>{
 const args={...input(),mode:'parts',solutionParts:50,waterParts:10,total:1600};
 const b=buildRecipe(args);assert.deepEqual(b.recipe.rows.map(r=>r.mass),[1000,500,100]);close(b.result.total,1600);assert.equal(args.precursor.mass,0);
 assert.equal(b.recipe.rows[1].catalogId,'pq-n');assert.ok(b.recipe.rows[1].density>1);
 const saved=parseProject({version:1,recipe:b.recipe});assert.deepEqual(parseProject(JSON.parse(JSON.stringify(saved))),saved);
});
test('sodium and potassium target solutions reproduce all three requested ratios',()=>{
 for(const [id,system] of [['pq-n','sodium'],['pq-d','sodium'],['pq-ru','sodium'],['pq-kasil-1','potassium'],['pq-kasil-6','potassium']]){
  const b=buildRecipe(input(id,system));close(b.result.ratios.siAl,2);close(b.result.ratios.alkaliAl,1);close(b.result.ratios.waterSolids,.8);close(b.result.total,1000);
  assert.ok(b.recipe.rows.every(r=>r.mass>=0));assert.ok(b.recipe.rows[2].comp[system==='sodium'?'NaOH':'KOH']===98);
 }
});
test('aqueous hydroxide accounts for physical feed water separately from equivalent water',()=>{
 const b=buildRecipe({...input(),hydroxidePct:50,hydroxideWater:50});close(b.result.ratios.waterSolids,.8);assert.ok(b.result.grams.H2O>b.result.physicalWater);assert.ok(b.recipe.rows[2].comp.H2O===50);
});
test('infeasible or incomplete targets never become negative ingredient doses',()=>{
 for(const [change,message] of [[{siAl:.1},/below the precursor/],[{alkaliAl:.01},/exceeds the alkali/],[{waterSolids:0},/more water/],[{targetSource:''},/source or rationale/],[{hydroxidePct:90,hydroxideWater:20},/exceed/],[{system:'phosphate'},/separate model/],[{siAl:''},/positive/],[{total:-1},/positive/]])assert.throws(()=>buildRecipe({...input(),...change}),message);
 assert.throws(()=>buildRecipe({...input(),precursor:{...gradeIngredient('dynapoz-110-cr'),comp:{SiO2:100}}}),/Al2O3/);
 assert.throws(()=>buildRecipe({...input(),activator:{...gradeIngredient('pq-n'),comp:{H2O:100}}}),/supply/);
});
