import test from 'node:test';
import assert from 'node:assert/strict';
import {biocharCharacterization} from '../src/biochar-characterization.js';
import {literatureMixes,mixProject} from '../src/literature-mixes.js';
import {catalogExport,planRequirements} from '../src/recipe-planner.js';
import {mixDetail} from '../src/literature-ui.js';
import {characterizationComparison} from '../src/recipe-characterization-ui.js';
import {newTrial} from '../src/experiment-notebook.js';
// Independent transcription of Tables 3/4/5 verified against rendered pages.
const expected=[
 [0,120,200,1.42,.01,27.5,.1,7.6,.3,22.4,2.7,9.3,.6,-12.8],
 [1,117,193,1.42,.02,27.5,.7,7.7,.3,29.8,2.1,9.2,.3,.7],
 [2,115,188,1.42,.01,27.5,.4,7.5,.2,30.2,2.8,8.4,.3,4.5],
 [5,102,155,1.41,.02,28.1,.7,6.3,.1,26.3,3,7.6,.2,8.7],
 [8,96,140,1.37,.01,28.6,.3,5.9,.1,21.1,1.2,7.7,.2,5]
];
test('biochar physical and exposure facts preserve all selected cells, units and source precision',()=>{
 for(const [dose,dm,c,d,ds,wa,was,e,es,s,ss,ee,ees,delta] of expected){
  const cells=biocharCharacterization(dose);
  assert.equal(cells.length,8);
  assert.deepEqual(cells.map(r=>r.value),[dm,c,d,wa,e,s,ee,delta]);
  assert.deepEqual(cells.filter(r=>r.spread!==undefined).map(r=>r.spread),[ds,was,es,ss,ees]);
  assert.deepEqual(cells.map(r=>r.unit),['mm','%','Mg/m³','%','GPa','MPa','GPa','%']);
  assert.equal(c,Math.round(100*(dm-40)/40));
  for(const r of cells){assert.match(r.locator,new RegExp('MH-'+dose+' /'));assert.ok(r.original);assert.equal(r.context.ageHours,r.contextId==='fresh'?null:r.contextId==='exposed'?960:672);if(r.spread!==undefined)assert.equal(r.spreadKind,'reported ±; type unresolved');}
  assert.equal(cells[1].kind,'author-calculated');assert.equal(cells[7].kind,'author-calculated');
 }
 assert.equal(biocharCharacterization(8)[7].original,'+5.0');
 assert.equal(biocharCharacterization(0)[7].original,'−12.8');
 assert.throws(()=>biocharCharacterization(7));
});
test('exposure chronology and physical conditioning survive export without entering ordinary strength matches',()=>{
 const rows=literatureMixes.filter(m=>m.id.startsWith('saccani-'));
 assert.equal(rows.length,5);assert.equal(rows.flatMap(m=>m.characterization).length,40);
 for(const m of rows){
  assert.deepEqual(m.results.map(r=>r.ageHours),[168,336,672]);
  const c=m.characterization.find(r=>r.contextId==='exposed').context;
  assert.equal(c.ageHours,c.initialCureHours+c.exposureHours+c.dryingHours);
  assert.equal(c.n,3);assert.equal(c.dryingTemperatureC,40);
  assert.match(m.characterization[2].context.ageOrigin,/before conditioning/);
  assert.equal(m.characterization[2].context.n,3);
  assert.match(m.characterization[2].context.specimen,/40 mm/);
  const project=mixProject(m.id,1000);
  assert.ok(project.study.results.length<3000);assert.match(project.study.results,/No matched 40-day unexposed control\.$/);assert.match(project.study.results,/Separate characterization/);assert.match(project.study.results,/40-day total age/);
  assert.deepEqual(newTrial(project).results,[]);
 }
 const matching=planRequirements({property:'compressive',target:29.7,ageHours:672}).matches.map(r=>r.id);
 assert.ok(!matching.includes('saccani-mh1'));assert.ok(!matching.includes('saccani-mh2'));
 const exported=JSON.parse(JSON.stringify(catalogExport())).records.find(m=>m.id==='saccani-mh0');
 assert.equal(exported.characterization[7].value,-12.8);assert.equal(exported.characterization[5].context.exposureHours,192);
});
test('comparison labels all conditions and units and rejects a cross-study row',()=>{
 const m=literatureMixes.find(m=>m.id==='saccani-mh1');const html=mixDetail(m);
 assert.match(html,/id="biochar-physical"/);assert.match(html,/id="biochar-exposed"/);
 assert.equal((html.match(/aria-current="true"/g)||[]).length,2);
 assert.match(html,/27.5 ± 0.7/);assert.match(html,/9.2 ± 0.3/);assert.match(html,/−12.8/);
 assert.match(html,/Mg\/m³/);assert.match(html,/excluded from ordinary strength matching/);
 assert.match(html,/not static Young/);assert.match(html,/unexposed 40-day control/);
 assert.equal(characterizationComparison({...m,characterizationComparisonIds:['le-matrix-control']},literatureMixes),'');
 assert.equal(characterizationComparison({...m,characterizationComparisonIds:['missing-id']},literatureMixes),'');
 assert.equal(characterizationComparison(literatureMixes[0],literatureMixes),'');
});
