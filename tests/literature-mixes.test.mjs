import test from 'node:test';
import assert from 'node:assert/strict';
import {literatureMixes,mixProject} from '../src/literature-mixes.js';
import {calculate,parseProject} from '../src/gp-chemistry.js';
import {newTrial} from '../src/experiment-notebook.js';
test('literature scaling preserves parts and leaves unreported assays unknown',()=>{
 const before=JSON.stringify(literatureMixes);
 const p=mixProject('davidovits-fly-ash-80',950);
 assert.deepEqual(p.recipe.rows.map(r=>r.mass),[600,150,100,100]);
 const c=calculate(p.recipe);assert.equal(c.total,950);assert.equal(c.physicalWater,151);assert.equal(c.ratios.siAl,null);assert.ok(c.unassigned>0);
 assert.match(p.study.results,/Literature report only: 80 MPa/);
 const t=newTrial(parseProject(JSON.parse(JSON.stringify(p))));assert.equal(t.results.length,0);assert.equal(t.snapshot.study.results,p.study.results);
 assert.equal(JSON.stringify(literatureMixes),before);
});
test('partial or ambiguous designs never become executable gram recipes',()=>{
 for(const id of ['alameri-t2m9','kohout-gs-1','missing'])assert.throws(()=>mixProject(id,1000));
 for(const mass of ['',0,-1,Infinity,NaN,1e8])assert.throws(()=>mixProject('davidovits-mk-slag',mass));
 assert.match(mixProject('davidovits-mk-slag',1000).study.adaptations,/assumption/);
 const a=literatureMixes.find(m=>m.id==='alameri-t2m9');assert.equal(a.ingredients[2].mass,78.6);assert.match(a.limitations,/conclusion describes zero SiC/);assert.match(a.curing,/100 °C/);
});
