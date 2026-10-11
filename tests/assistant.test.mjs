import { test } from 'node:test';
import assert from 'node:assert/strict';
import {answerResearch,parseResearch,emptyResearch,mergeResearch,safeLink} from '../src/assistant-core.js';

test('test assistant retrieves evidence without claiming AI, web access or recipe validation',async()=>{
  const answer=await answerResearch({excerpt:'KH-560 silane',question:'Find related studies'});
  assert.ok(answer.sources.some(s=>s.id==='research-silane-ternary'));
  assert.equal(answer.mode,'catalog-test');assert.match(answer.text,/do not establish/);
  assert.ok(answer.sources.every(s=>safeLink(s.url)&&s.evidence));
  const missing=await answerResearch({question:'xyzzyunmatched'});
  assert.equal(missing.sources.length,0);assert.match(missing.text,/cannot search the web/);
  const metadata=await answerResearch({question:'coffee'});
  assert.ok(metadata.sources.some(s=>s.summary.includes('Metadata only')));
  const products=await answerResearch({excerpt:'metakaolin',question:'Find products'});
  assert.ok(products.sources.some(s=>s.id==='mk-sample'));
  assert.ok(products.sources.every(s=>s.evidence.includes('not available to order')));
  assert.match(products.text,/not a compatibility/);
  const followup=await answerResearch({question:'Find related studies',history:[{role:'user',text:'KH-560 silane'}]});
  assert.ok(followup.sources.some(s=>s.id==='research-silane-ternary'));
});

test('research backups preserve originals, reject dangerous links and keep imports as copies',async()=>{
  const data=emptyResearch();data.clips.push({id:'one',folder:'General research',excerpt:'<script>not markup</script>',notes:'My notes',title:'Page',url:'/library',savedAt:'2026-10-11T03:00:00.000Z',messages:[await answerResearch({question:'silane'})]});
  assert.deepEqual(parseResearch(JSON.stringify(data)),data);
  const merged=mergeResearch(data,data,()=> 'two');assert.equal(merged.clips.length,2);assert.equal(data.clips.length,1);
  const bad=structuredClone(data);bad.clips[0].messages[0].sources[0].url='javascript:alert(1)';assert.throws(()=>parseResearch(bad));
  assert.throws(()=>parseResearch({...data,version:2}));
  assert.throws(()=>parseResearch({...data,folders:[]}));
  assert.throws(()=>mergeResearch(data,data,()=> 'one'));
  for(const link of ['//evil.test','/\\evil.test','javascript:alert(1)','data:text/html,test','https://a.test\n'])assert.equal(safeLink(link),false);
});
