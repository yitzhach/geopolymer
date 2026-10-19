import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadBundle } from '../.claude/skills/research-rights-guard/scripts/check-rights.mjs';
import { checkBundle } from '../.claude/skills/research-rights-guard/scripts/rights-core.mjs';

test('published editorial content passes the research rights guard',async()=>{
  const {config,bundle,sourceTextFor}=await loadBundle('rights-guard.config.json');
  const report=checkBundle(bundle,config.options,sourceTextFor);
  const errors=report.findings.filter(f=>f.level==='error');
  assert.deepEqual(errors,[],errors.map(f=>`${f.code} ${f.item||f.source}: ${f.message}`).join('\n'));
  const {literatureMixes}=await import('../src/literature-mixes.js');
  const {researchTopics}=await import('../src/research-topics.js');
  const count=prefix=>bundle.items.filter(i=>i.id.startsWith(prefix)).length;
  assert.equal(count('recipe:'),literatureMixes.length);
  assert.equal(count('topic:'),researchTopics.length);
  const {pilot}=await import('../src/knowledge-pilot.js');
  assert.equal(count('study:'),pilot.studies.length);
  assert.ok(count('deep-dive:')&&count('journal:')&&count('library:')&&count('recipe-group:')&&count('formulation:'));
});
