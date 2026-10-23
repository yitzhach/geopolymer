import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {buildMixTable,checkSheet,sheetFiles,readSheet} from '../scripts/lib/mix-sheets.mjs';
import {containsName,precursorShares,parseCure,endpointKey,endpointValue,filterRows,compareRows,similarMixes,withinPaperBest,EVIDENCE} from '../src/mix-table.js';

const table=await buildMixTable({generated:'test'});
const example=JSON.parse(await readFile('research/mix-sheets/one-part-admixture-compatibility.json','utf8'));
const clone=()=>JSON.parse(JSON.stringify(example));
const errorsFor=mutate=>{const s=clone();mutate(s);return checkSheet(s).errors;};

test('every committed mix sheet passes the checker and compiles into the table',async()=>{
 const files=await sheetFiles();
 assert.ok(files.length>=9);
 for(const f of files){const {sheet}=await readSheet(f);assert.deepEqual(checkSheet(sheet).errors,[],f);}
 assert.equal(table.counts.bySource.sheet,table.rows.filter(r=>r.origin==='sheet').length);
 assert.equal(table.counts.rows,table.rows.length);
 for(const r of table.rows){assert.ok(EVIDENCE[r.evidence],r.id);assert.ok(r.links.source,r.id);assert.equal(new Set(table.rows.map(x=>x.id)).size,table.rows.length);}
});

test('checker rejects the mistakes a transcriber is most likely to make',()=>{
 const cases={
  'invented number':s=>{s.results[0].value=45.6;},
  'paraphrased quote':s=>{s.results[2].text='AN-PC1-B reached 32.8 MPa';},
  'value given to the wrong mix':s=>{s.results.push({mix:'GD',test:'comp',ageDays:3,value:37.5,text:'At three days, AN-PC1-S reports 37.5 MPa versus AN 44.6 MPa'});},
  'invented mix label':s=>{s.mixes.push({id:'AN-PC2',control:false,form:'paste',cure:'c1',quantities:[],parameters:[]});},
  'zero used for unknown':s=>{s.mixes[1].quantities[0].value=0;},
  'heat cure labelled ambient':s=>{s.cures[0].category='ambient';},
  'wrong unit for property':s=>{s.tests[0].unit='psi';},
  'null without reason':s=>{delete s.mixes[1].quantities[0].missing;},
  'unknown vocabulary':s=>{s.materials[0].family='flyash';},
  'DOI changed':s=>{s.doi='10.1000/other';},
 };
 for(const [name,mutate] of Object.entries(cases))assert.ok(errorsFor(mutate).length>0,name);
 assert.deepEqual(errorsFor(()=>{}),[]);
});

test('checker blocks duplicate coverage, correction holds and model-only guides',async()=>{
 const covered=checkSheet({...clone(),guideId:'silica-fume-acid-strength-compromise',doi:'10.3390/ma14185396'}).errors;
 assert.ok(covered.some(e=>/already structured/.test(e)));
 const {deepDives}=await import('../src/deep-dives.js');const {mixDesignFor}=await import('../src/deep-dive-mix-designs.js');
 const held=deepDives.find(d=>mixDesignFor(d.id).status==='source-hold');
 assert.ok(checkSheet({...clone(),guideId:held.id,doi:held.doi}).errors.some(e=>/correction hold/.test(e)));
 const model=deepDives.find(d=>mixDesignFor(d.id).status==='no-independent-mix');
 assert.ok(checkSheet({...clone(),guideId:model.id,doi:model.doi}).errors.some(e=>/no physical mixes/.test(e)));
});

test('names match as whole names only',()=>{
 assert.equal(containsName('initial set 407 min vs 169 for AN','AN'),true);
 assert.equal(containsName('AN-PC1-S: initial set 407 min','AN'),false);
 assert.equal(containsName('and then','D'),false);
 assert.equal(containsName('GP6.0 silica fume','GP6'),false);
 assert.equal(containsName('coarse sands','sand'),true);
});

test('pilot rows are canonical and absorb matching catalog recipes',()=>{
 assert.equal(table.counts.mergedCatalogRecipes,6);
 const gp6=table.rows.find(r=>r.id==='pilot:5396-GP6.0');
 assert.equal(gp6.links.recipe,'/formulations/vogt-gp6');assert.ok(gp6.recipeIngredients.length>0);
 assert.ok(!table.rows.some(r=>r.id==='recipe:vogt-gp6'));
 const bong=table.rows.find(r=>r.id==='pilot:902-Na-N-2.5');
 assert.ok(bong.results.filter(x=>x.ageDays===28&&x.property==='compressive-strength').every(x=>/loading/.test(x.context)));
});

test('precursor shares need one shared unit and mass basis; nothing is guessed',()=>{
 assert.deepEqual(precursorShares([{family:'fly-ash',value:80,unit:'wt%',basis:'precursor-mass'},{family:'slag',value:20,unit:'wt%',basis:'precursor-mass'}]),{'fly-ash':80,slag:20});
 assert.equal(precursorShares([{family:'fly-ash',value:80,unit:'wt%',basis:'precursor-mass'},{family:'slag',value:null,unit:'wt%',basis:'precursor-mass'}]),null);
 assert.equal(precursorShares([{family:'fly-ash',value:476,unit:'kg/m3',basis:'per-m3'},{family:'slag',value:20,unit:'wt%',basis:'precursor-mass'}]),null);
 const an=table.rows.find(r=>r.id==='sheet:one-part-admixture-compatibility:AN-PC1-S');
 assert.deepEqual(an.shares,{'fly-ash':50,slag:50});assert.ok(an.ingredients.some(i=>i.inherited==='AN'));
 const x02=table.rows.find(r=>r.id==='sheet:hpmc-vae-workability-durability:X0.2');
 assert.ok(x02.parameters.some(p=>p.key==='activator/precursor'));assert.equal(x02.activator,'sodium');
});

test('recipe curing notes are classified deterministically',()=>{
 assert.equal(parseCure('Covered molds in 100 °C water for 24 h, then 100% RH fog room until testing.').category,'heat');
 assert.equal(parseCure('Sealed, 23 ± 3 °C.').temperatureC,23);
 assert.equal(parseCure('Demold at 24 h; 20 ± 2 °C, >95% RH.').category,'moist');
 assert.equal(parseCure('Sealed, ambient temperature.').category,'ambient');
 assert.equal(parseCure('').category,'unknown');
});

test('explorer logic: filters, best within paper, comparison and similar mixes',()=>{
 const slag=filterRows(table.rows,{precursor:'slag'});assert.ok(slag.length>0&&slag.every(r=>r.precursors.includes('slag')));
 const key=endpointKey('compressive-strength',28),best=withinPaperBest(table.rows,key);
 assert.equal(best.direction,'higher');
 for(const w of best.winners){const peers=table.rows.filter(r=>r.paper.key===w.row.paper.key&&endpointValue(r,key));assert.ok(peers.length>=2);assert.ok(peers.every(r=>endpointValue(r,key).value<=w.value));}
 assert.equal(withinPaperBest(table.rows,endpointKey('setting-time',null)).direction,null);
 const pair=[table.rows.find(r=>r.id==='pilot:2944-S0-10'),table.rows.find(r=>r.id==='pilot:2944-S30-10')];
 const c=compareRows(pair);assert.equal(c.samePaper,true);
 assert.equal(c.table.find(t=>t.label==='Precursor shares').status,'different');
 assert.equal(c.table.find(t=>t.label==='Activator').status,'same');
 const s=similarMixes(table.rows.find(r=>r.id==='sheet:fly-ash-slag-efflorescence-moisture:NHFS'),table.rows);
 assert.ok(s.otherPapers.length>0&&s.otherPapers.every(x=>x.row.paper.key!=='10.3390/ma13235550'));
 assert.ok(s.otherPapers[0].row.precursors.includes('fly-ash'));
});
