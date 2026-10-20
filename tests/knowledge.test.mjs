import test from 'node:test';
import assert from 'node:assert/strict';
import {pilot} from '../src/knowledge-pilot.js';
import {knowledgeReferences as refs} from '../src/knowledge-references.js';
import {library} from '../src/research-library.js';
import {validateKnowledge,searchEvidence,publicKnowledge,reconcileBatch,normalizeDoi,textMatches,affectedEvidence} from '../src/knowledge-core.js';
const find=q=>searchEvidence(pilot,refs,{...q,pageSize:50});
test('phase A identity, FK and source audit; preserve 61 stable library IDs and pilot observations',()=>{
 assert.equal(library.length,1000);assert.equal(refs.length,939);assert.equal(library.filter(p=>!p.id.startsWith('ke-')).length,61);
 assert.deepEqual(validateKnowledge(pilot,library),[]);assert.equal(pilot.mixes.length,62);assert.equal(pilot.observations.length,275);
 const bad=structuredClone(pilot);bad.observations[0].mixId='211-M50-K';assert.ok(validateKnowledge(bad,library).length);
 assert.equal(normalizeDoi('https://doi.org/10.1039/B212629J'),'10.1039/b212629j');
});
test('gold: MK/slag 28-day figure labels supply same-mix matches; 56-day source result',()=>{
 const matches=find({binder:'metakaolin-slag',minSlag:20,maxSlag:40,property:'compression',unit:'MPa',min:60,ageDays:28,cure:'ambient'});
 assert.deepEqual(matches.exact.map(x=>[x.mix.originalId,x.observation.value]),[['S30-10',80.7],['S30-12',85.3]]);
 assert.equal(find({binder:'metakaolin-slag',minSlag:20,maxSlag:40,property:'compression',unit:'MPa',min:100,ageDays:28}).total,0);
 const r=find({binder:'metakaolin-slag',minSlag:50,maxSlag:50,property:'compression',unit:'MPa',ageDays:56});assert.equal(r.total,1);assert.equal(r.exact[0].observation.value,86.1);assert.equal(r.exact[0].mix.originalId,'S50-10');
});
test('gold: missing cure temperature is partial; criteria may not join across different mixes',()=>{
 const r=find({binder:'metakaolin',property:'compression',unit:'MPa',min:70,ageDays:28,temperatureC:20});assert.equal(r.total,0);assert.ok(r.partialTotal>0);
 // Synthetic mutation adversary, explicitly not part of the scientific catalog.
 const d=structuredClone(pilot);const o=d.observations.find(o=>o.id==='2944-obs-1');o.ageDays=28;o.mixId='2944-S0-10';o.value=110;
 const r2=searchEvidence(d,refs,{binder:'metakaolin-slag',minSlag:20,maxSlag:40,property:'compression',unit:'MPa',min:100,ageDays:28});assert.equal(r2.total,0);
});
test('gold: sodium, potassium and mixed Na/K remain distinct; no cross-property substitutes',()=>{
 const r=find({activation:'mixed-na-k',property:'compression',unit:'MPa',min:70,ageDays:28});assert.equal(r.total,1);assert.equal(r.exact[0].mix.originalId,'K10');assert.equal(r.exact[0].observation.value,72.72);
 assert.equal(find({q:'coffee char'}).total,0);assert.equal(find({q:'coffee ash'}).total,0);
 assert.equal(find({property:'substrate-adhesion',unit:'MPa'}).total,0);
 const b=find({property:'interlayer-tensile-bond',unit:'MPa',ageDays:7});assert.equal(b.exact[0].observation.value,.9);assert.equal(b.exact[0].test.n,5);
 assert.equal(find({min:50}).total,0); // No unit/property, no numeric matches.
});
test('gold: censored strengths, null and unfavorable findings remain explicit',()=>{
 assert.equal(pilot.observations.filter(o=>o.value===null).length,3);
 assert.ok(pilot.findings.some(f=>f.direction==='null'));assert.ok(pilot.findings.some(f=>f.direction==='unfavorable'));
 const o=pilot.observations.find(o=>o.mixId==='2944-S50-10'&&o.property==='drying-shrinkage'&&o.ageDays===28);assert.equal(o.value,890.08);
 assert.ok(!find({q:'GP9.0',ageDays:7,property:'compression'}).total);
});
test('gold: historical grade identities are not current offerings or interchangeable substitutes',()=>{
 const m=pilot.materials.find(m=>m.grade==='KASIL 2040');assert.equal(m.source,'PQ Australia');assert.equal(m.supplierOfferingId,null);assert.equal(m.storeSku,null);
 assert.equal(find({q:'Dynapoz'}).total,0);assert.ok(!textMatches('coffee combustion ash','coffee char'));
 assert.ok(textMatches('metakaolin slag','MK GGBFS'));assert.ok(textMatches('drying shrinkage performance','"drying shrinkage"'));
});
test('gold: withdrawn sources excluded transitively; metadata-only sources never supply numeric claims',()=>{
 const updated=structuredClone(refs);updated.find(p=>p.id==='ke-5396').sourceStatus.state='retracted';
 assert.equal(searchEvidence(pilot,updated,{q:'GP6.0'}).total,0);assert.ok(!publicKnowledge(pilot,updated).observations.some(o=>o.publicationId==='ke-5396'));
 assert.equal(find({q:'10.1007/BF01912193'}).total,0);assert.ok(affectedEvidence(pilot,'ke-5396').observations.length);
});
test('gold: denied or unknown asset rights excluded from exports and model contexts',()=>{
 const d=structuredClone(pilot);d.assets[0].operations.export.decision='unknown';d.observations[0].rawText='DO NOT EXPORT';
 const out=publicKnowledge(d,refs);assert.ok(!out.observations.some(o=>o.publicationId===d.assets[0].publicationId));assert.ok(!JSON.stringify(out).includes('DO NOT EXPORT'));
 assert.equal(publicKnowledge(pilot,refs,'aiTransmission').observations.length,0);
});
test('gold: batch interruption, repeat and duplicate DOI/version are idempotent and reviewable',()=>{
 const batch=refs.slice(0,25);const a=reconcileBatch([],batch,{limit:10});assert.equal(a.cursor,10);const b=reconcileBatch(a.records,batch,{cursor:a.cursor,limit:25});assert.equal(b.records.length,25);
 const c=reconcileBatch(b.records,batch);assert.equal(c.records.length,25);assert.ok(c.events.every(x=>x.status==='unchanged'));
 const changed=reconcileBatch(b.records,[{...refs[0],title:'Changed title'}]);assert.equal(changed.events[0].status,'changed-record-review');assert.equal(changed.records[0].title,refs[0].title);
 const d=reconcileBatch(b.records,[{...refs[0],id:'another-version'}]);assert.equal(d.events[0].status,'duplicate-doi-review');
});
test('source table gold extremes and erosion exposure age are preserved',()=>{
 const row=pilot.observations.find(o=>o.mixId==='2957-N4'&&o.property==='flexure'&&o.ageDays===7);assert.equal(row.originalText,'1.10');
 const e=pilot.observations.find(o=>o.mixId==='5396-GP0'&&o.exposureDays===84);assert.equal(e.value,1.07);assert.equal(e.ageDays,112);
 assert.equal(pilot.observations.find(o=>o.mixId==='5396-GP0'&&o.ageDays===1).value,60.8);
 assert.equal(pilot.observations.find(o=>o.mixId==='5396-GP0'&&o.ageDays===7).value,53.6);
});

test('follow-up: validation mixtures are separate; printed figures preserve direction and fresh age unknowns',()=>{
 const v=pilot.mixes.filter(m=>m.id.endsWith('-validation'));assert.equal(v.length,2);
 assert.deepEqual(pilot.observations.filter(o=>o.mixId==='2957-N-validation').map(o=>o.value),[61.97,65.79]);
 assert.deepEqual(pilot.observations.filter(o=>o.mixId==='2957-K-validation').map(o=>o.value),[8.63,9.37]);
 assert.equal(pilot.mixes.find(m=>m.id==='2957-K-validation').activation,'mixed-na-k');
 assert.equal(pilot.tests.find(t=>t.id==='2957-flexure-validation').n,null);
 const longitudinal=find({q:'Na-N-2.5',property:'compression',unit:'MPa',direction:'longitudinal',ageDays:28});
 assert.equal(longitudinal.total,1);assert.equal(longitudinal.exact[0].observation.value,34);assert.equal(longitudinal.exact[0].test.n,3);
 const spread=find({property:'fresh-spread-after-drop',unit:'mm',min:150});assert.equal(spread.total,1);assert.equal(spread.exact[0].mix.originalId,'Na-D-3.0');
 assert.equal(find({property:'fresh-spread-after-drop',unit:'mm',ageDays:0}).total,0);
 assert.equal(find({property:'fresh-spread-after-drop',unit:'mm',cure:'ambient'}).total,0);
 assert.equal(pilot.tests.find(t=>t.id==='5396-erosion').cure.durationDays,28);
});
