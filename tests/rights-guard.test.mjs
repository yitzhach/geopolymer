import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadBundle } from '../.claude/skills/research-rights-guard/scripts/check-rights.mjs';
import { checkBundle } from '../.claude/skills/research-rights-guard/scripts/rights-core.mjs';

test('published editorial content passes the research rights guard',async()=>{
  const {config,bundle,sourceTextFor}=await loadBundle('rights-guard.config.json');
  const report=checkBundle(bundle,config.options,sourceTextFor);
  const errors=report.findings.filter(f=>f.level==='error');
  assert.deepEqual(errors,[],errors.map(f=>`${f.code} ${f.item||f.source}: ${f.message}`).join('\n'));
  assert.ok(bundle.items.some(i=>i.type==='deep-dive')&&bundle.items.some(i=>i.type==='article')&&bundle.items.some(i=>i.type==='card'));
});
