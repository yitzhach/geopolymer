import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readDrafts,saveDraft,platformPage} from '../src/platform.js';
test('draft saves reopen, edit same record, and preserve data on corrupt storage',()=>{
 let raw=null;const store={getItem:()=>raw,setItem:(_,value)=>raw=value};
 saveDraft(store,{id:'one',title:' Trial ',body:' observations ',kind:'Experiment'});
 assert.equal(readDrafts(store)[0].title,'Trial');
 saveDraft(store,{id:'one',title:'Revised',body:'Result'});
 assert.equal(readDrafts(store).length,1);
 assert.equal(readDrafts(store)[0].body,'Result');
 raw='broken';assert.throws(()=>saveDraft(store,{id:'two',title:'New',body:'Keep'}));assert.equal(raw,'broken');
 assert.throws(()=>saveDraft({getItem:()=>null,setItem:()=>{throw Error('quota');}},{id:'x',title:'Trial',body:'Notes'}),/quota/);
});
test('platform destinations render and disclose pending public services',()=>{
 for(const area of ['workspace','discover','review','community','journal','supply']) assert.match(platformPage(area),/<h1>/);
 assert.match(platformPage('workspace'),/does not submit/);
 assert.match(platformPage('review'),/not live/);
 assert.match(platformPage('supply'),/not yet available/);
});
