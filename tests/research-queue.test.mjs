import test from 'node:test';
import assert from 'node:assert/strict';
import {researchQueue} from '../scripts/research-queue-core.mjs';

test('queue deduplicates DOI while retaining conflicting evidence contexts',()=>{
  const input=[{id:'hemp',sources:[{id:'one',doi:'10.1234/ABC',title:'Hemp study',checked:'2026-10-15',material:'fiber',access:'abstract-reviewed',next:'Read methods'}]},
    {id:'durability',sources:[{id:'two',doi:'10.1234/abc',title:'Hemp study',checked:'2026-10-16',material:'fiber',access:'indexed-lead',next:'Resolve version'}]}];
  const before=structuredClone(input);
  const rows=researchQueue(input,[{id:'known',doi:'10.1234/abc'}]);
  assert.equal(rows.length,1);assert.equal(rows[0].canonicalId,'known');
  assert.deepEqual(rows[0].contexts.map(c=>c.access),['indexed-lead','abstract-reviewed']);
  assert.deepEqual(input,before);
  assert.equal(researchQueue(input,[],'HEMP version').length,1);
  assert.equal(researchQueue(input,[],'unmatched').length,0);
  assert.equal(researchQueue(input,[])[0].canonicalId,null);
});


test('finding searches retain their dated review and rights context',()=>{
  const sources=[{id:'a',doi:'10.1234/a',title:'Binder comparison',checked:'2026-10-16',material:'shiv',access:'full-text-partial',note:'Acoustic performance has a tradeoff',locator:'Section 4.6',next:'Review conditioning',status:'Correction review pending',rights:'Linked source only'},
    {id:'b',doi:'10.1234/b',title:'Fiber study',checked:'2026-10-16',material:'fiber',access:'full-text-partial',note:'Hot-water washing',locator:'Section 2.1',next:'Review cure',status:'Partial',rights:'No reproduced figures'}];
  const topics=[{id:'hemp',sources}];
  const rows=researchQueue(topics,[],'acoustic tradeoff');
  assert.deepEqual(rows.map(r=>r.doi),['10.1234/a']);
  assert.equal(rows[0].contexts[0].status,'Correction review pending');
  assert.equal(rows[0].contexts[0].rights,'Linked source only');
  assert.equal(rows[0].contexts[0].access,'full-text-partial');
  assert.equal(researchQueue(topics,[],'hot-water')[0].doi,'10.1234/b');
  assert.equal(researchQueue(topics,[],'4.6')[0].doi,'10.1234/a');
  assert.equal(researchQueue(topics,[],'acoustic hot-water').length,0);
});
