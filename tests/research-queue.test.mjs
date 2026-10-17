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
