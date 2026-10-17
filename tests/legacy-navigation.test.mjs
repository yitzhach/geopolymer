import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

test('startup and queued hash events issue only one legacy navigation', async () => {
  const redirects = [], listeners = {};
  const context = {
    URL,
    location: {origin:'https://example.test', hash:'#/workspace?kind=Study%20submission', replace:target=>redirects.push(target)},
    window: {addEventListener:(name,fn)=>{listeners[name]=fn;}},
  };
  const source = (await readFile('src/bootstrap.js','utf8')).replace('export function','function');
  vm.runInNewContext(source, context);
  listeners.hashchange(); listeners.hashchange();
  assert.deepEqual(redirects, ['/workspace?kind=Study%20submission']);
  assert.equal(context.legacyDestination('#//outside.test/path'), null);
  assert.equal(context.legacyDestination('#sources'), null);
  assert.equal(context.legacyDestination('#/research/hemp-geopolymers'), '/research/hemp-geopolymers');
});
