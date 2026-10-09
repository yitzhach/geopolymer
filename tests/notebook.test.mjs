import test from 'node:test';
import assert from 'node:assert/strict';
import {template,parseProject} from '../src/gp-chemistry.js';
import {gradeIngredient} from '../src/supplier-grades.js';
import {NOTEBOOK_KEY,DRAFT_KEY,emptyNotebook,newTrial,duplicateTrial,validateNotebook,putTrial,readNotebook,writeNotebook,parseNotebook,mergeNotebook,formulationDiff,makeDraft,parseDraft,writeDraft} from '../src/experiment-notebook.js';
const project=()=>parseProject({version:1,recipe:template(),study:{citation:'Source title',results:'Legacy source note, not a measured test'}});
const experiment={id:'experiment-1',title:'Water and cracking',question:'What changes?',createdAt:'2026-10-09T02:00:00.000Z'};
const seed=()=>{const trial=newTrial(project(),experiment.id);trial.title='Trial A';return putTrial(emptyNotebook(),trial,experiment);};
const store=()=>{const m=new Map();return {getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,v)};};

test('trial captures independent supplier assays and source notes; saved formulation cannot change',()=>{
 const p=project();p.recipe.rows[0]=gradeIngredient('dynapoz-110-cr');p.recipe.rows[0].mass=100;
 const t=newTrial(p,experiment.id);const data=putTrial(emptyNotebook(),t,experiment);
 p.recipe.rows[0].comp.SiO2=1;
 assert.notEqual(data.trials[0].snapshot.recipe.rows[0].comp.SiO2,1);
 assert.equal(data.trials[0].snapshot.study.results,'Legacy source note, not a measured test');
 assert.deepEqual(data.trials[0].results,[]);
 const changed=structuredClone(data.trials[0]);changed.snapshot.recipe.rows[0].mass=110;
 assert.throws(()=>putTrial(data,changed),/locked/);
 changed.snapshot=data.trials[0].snapshot;changed.actualMasses[0]=101;
 assert.equal(putTrial(data,changed).trials[0].actualMasses[0],101);
 assert.equal(data.trials[0].actualMasses[0],null);
});
test('variation keeps parent and assays but clears actual measurements and records all formulation differences',()=>{
 const data=seed(),parent=data.trials[0];parent.actualMasses[0]=123;parent.specimens=[{id:'s1',label:'Cube',geometry:'50 mm'}];
 const child=duplicateTrial(parent);child.title='Trial B';child.variable='Added water';child.snapshot.recipe.rows[2].mass=12;
 assert.equal(child.parentId,parent.id);assert.deepEqual(child.specimens,[]);assert.deepEqual(child.actualMasses,[null,null,null]);
 assert.deepEqual(formulationDiff(parent.snapshot,child.snapshot),[{field:'recipe.rows.2.mass',before:10,after:12}]);
 assert.equal(putTrial(data,child).trials.length,2);
 child.variable='';assert.throws(()=>putTrial(data,child),/Changed variable/);
});
test('measured and literature results retain units, specimen, unknown age and evidence without auto-validation',()=>{
 const data=seed(),t=data.trials[0];t.specimens=[{id:'s1',label:'Cube 1',geometry:'50 × 50 × 50 mm'}];
 t.results=[{id:'r1',property:'Compressive strength',value:'24.1',unit:'MPa',ageHours:'168',specimenId:'s1',method:'Reported laboratory method',sourceType:'own',source:'Operator record 1',notes:'Single specimen; no population estimate'}, {id:'r2',property:'Compressive strength',value:30,unit:'MPa',ageHours:'',specimenId:'',method:'Paper method',sourceType:'literature',source:'DOI and table 2',notes:''}];
 const restored=parseNotebook(JSON.stringify(data));assert.equal(restored.trials[0].results[0].ageHours,168);assert.equal(restored.trials[0].results[1].ageHours,null);
 const invalid=structuredClone(data);invalid.trials[0].results[0].specimenId='missing';assert.throws(()=>validateNotebook(invalid),/missing specimen/);
 invalid.trials[0].results[0].specimenId='s1';invalid.trials[0].results[0].value='';assert.throws(()=>validateNotebook(invalid),/required/);
 invalid.trials[0].results[0].value=1;invalid.trials[0].results[0].sourceType='validated';assert.throws(()=>validateNotebook(invalid),/own measurement/);
});
test('import creates copies, remaps parents/specimens and rejects dangling or cyclic relationships',()=>{
 const data=seed(),t=data.trials[0];t.specimens=[{id:'s1',label:'Tile',geometry:'100 mm square'}];t.observations=[{id:'o1',date:'2026-10-09',ageHours:24,specimenId:'s1',category:'Cracking',text:'None visible',imageUrl:'https://example.com/tile.jpg',caption:'At 24 h'}];
 const child=duplicateTrial(t);child.variable='Water';const both=putTrial(data,child);const merged=mergeNotebook(both,both);
 assert.equal(merged.trials.length,4);assert.equal(merged.experiments.length,2);
 assert.equal(merged.trials[3].parentId,merged.trials[2].id);
 assert.equal(merged.trials[2].observations[0].specimenId,merged.trials[2].specimens[0].id);
 assert.notEqual(merged.trials[2].id,t.id);assert.deepEqual(merged.trials[0],both.trials[0]);
 const broken=structuredClone(both);broken.trials[0].parentId=broken.trials[1].id;broken.trials[0].variable='Cycle';assert.throws(()=>validateNotebook(broken),/cycle/);
 broken.trials[0].parentId='missing';assert.throws(()=>validateNotebook(broken),/Parent trial/);
});
test('storage failures and conflicting tab saves preserve notebook and legacy keys',()=>{
 const s=store();s.setItem('geopolymer.calculator.v1','legacy calculator');s.setItem('geopolymer.workspace.v1','legacy drafts');
 const data=seed();let saved=writeNotebook(s,data,null);assert.equal(readNotebook(s).data.trials.length,1);
 assert.throws(()=>writeNotebook(s,data,null),/another tab/i);assert.equal(s.getItem(NOTEBOOK_KEY),saved.raw);
 const quota={getItem:s.getItem,setItem:()=>{throw Error('quota');}};assert.throws(()=>writeNotebook(quota,data,saved.raw),/quota/);assert.equal(s.getItem(NOTEBOOK_KEY),saved.raw);
 assert.equal(s.getItem('geopolymer.calculator.v1'),'legacy calculator');assert.equal(s.getItem('geopolymer.workspace.v1'),'legacy drafts');
 s.setItem(NOTEBOOK_KEY,'broken');assert.throws(()=>readNotebook(s));assert.equal(s.getItem(NOTEBOOK_KEY),'broken');
});
test('unfinished draft recovery and download retain invalid numeric inputs and blank entries',()=>{
 const draft=makeDraft(newTrial(project()));draft.trial.snapshot.recipe.rows[0].mass='';draft.trial.actualMasses[0]='-';
 draft.trial.specimens=[{id:'s1',label:'',geometry:''}];
 draft.trial.curing=[{id:'c1',startHours:'',durationHours:'',temperatureC:'-',humidityPct:'105',condition:''}];
 draft.trial.observations=[{id:'o1',date:'',ageHours:'',specimenId:'',category:'',text:'',imageUrl:'unfinished URL',caption:''}];
 draft.trial.results=[{id:'r1',property:'',value:'',unit:'',ageHours:'',specimenId:'',method:'',sourceType:'own',source:'',notes:''}];
 const s=store();const raw=writeDraft(s,draft,null);assert.deepEqual(parseDraft(raw),draft);
 assert.throws(()=>writeDraft(s,draft,null),/another tab/i);assert.equal(s.getItem(DRAFT_KEY),raw);
 assert.throws(()=>parseDraft(JSON.stringify({...draft,format:'future-format'})),/Unsupported/);
});
