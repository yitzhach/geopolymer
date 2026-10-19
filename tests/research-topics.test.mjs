import test from 'node:test';
import assert from 'node:assert/strict';
import {researchTopics} from '../src/research-topics.js';
import {validateResearchTopics} from '../src/research-topic-core.js';
import {researchTopicPage} from '../src/research-topic-ui.js';
import {renderPage} from '../src/app.js';
import {search} from '../src/data.js';
import {library} from '../src/research-library.js';

test('research leads remain separate from canonical evidence and are discoverable',()=>{
  assert.equal(validateResearchTopics(researchTopics),true);
  assert.equal(library.length,300);
  assert.ok(search('hempcrete').some(r=>r.href==='/research/hemp-geopolymers'));
  const page=renderPage('/research/hemp-geopolymers');
  assert.equal(page.status,200);
  assert.match(page.html,/Abstract reviewed · full methods pending/);
  assert.match(page.html,/PROPOSED EXPERIMENT/);
  assert.match(page.html,/S1\/WP/);
});
test('validation rejects duplicate identity, unsupported evidence and broken citations',()=>{
  for(const mutate of [
    t=>t.sources.push({...t.sources[0],id:'duplicate'}),
    t=>t.sources[0].access='verified',
    t=>t.sources[0].locator='',
    t=>t.sources[0].sourceUrl='javascript:alert(1)',
    t=>t.sources[0].results=[{value:99,unit:'MPa'}],
    t=>t.questions[0].sources.push('missing'),
  ]){const rows=structuredClone(researchTopics);mutate(rows[0]);assert.throws(()=>validateResearchTopics(rows));}
});
test('topic prose and source titles cannot inject markup',()=>{
  const topic=structuredClone(researchTopics[0]);topic.sources[0].title='<img src=x onerror=alert(1)>';
  const html=researchTopicPage(topic);
  assert.ok(!html.includes('<img'));assert.match(html,/&lt;img/);
});
