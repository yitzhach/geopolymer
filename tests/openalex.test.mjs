import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdir,mkdtemp,readFile,rm,writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {createQueue,applyPage,discover,reviewCandidate,requestURL,validateQueue,fetchPage} from '../scripts/lib/openalex.mjs';
import {library} from '../src/research-library.js';
const catalog=[{id:'existing',doi:'10.1234/already',title:'Existing paper'}];
const work=(n,extra={})=>({id:`https://openalex.org/W${n}`,doi:`https://doi.org/10.1234/p${n}`,title:`Paper ${n}`,publication_year:2026,...extra});
const page=(results,cursor=null)=>({results,meta:{next_cursor:cursor,count:100}});
test('normalizes DOI, detects existing and intra-batch duplicates, preserves title conflicts',()=>{
 const s=applyPage(createQueue('geopolymer',catalog),page([work(1,{doi:'HTTPS://DOI.ORG/10.1234/ALREADY'}),work(2),work(3,{doi:'10.1234/p2'}),work(4,{title:'Existing paper'}),work(5,{doi:null})]),catalog);
 assert.equal(s.candidates.length,3);assert.equal(s.events[0].existingId,'existing');
 assert.ok(s.candidates[1].flags.includes('title-match-needs-review'));assert.ok(s.candidates[2].flags.includes('missing-or-invalid-doi'));
 assert.equal(catalog.length,1);
});
test('retains no abstract, full text, source URL or arbitrary provider fields; OA never grants rights',()=>{
 const s=applyPage(createQueue('test',catalog),page([work(1,{abstract_inverted_index:{secret:[0]},full_text:'secret',open_access:{is_oa:true,oa_url:'https://other.invalid/secret'},primary_location:{license:'cc-by'},is_retracted:true})]),catalog);
 const c=s.candidates[0];assert.equal(c.rights.fullText,'unassessed');assert.equal(c.verification,'unverified-provider-metadata');assert.ok(c.flags.includes('provider-retraction-flag'));assert.ok(!JSON.stringify(s).includes('secret'));
});
test('stops after 25 candidates without dropping page results',async()=>{
 let calls=0;const s=await discover(createQueue('test',catalog),catalog,{request:async url=>{calls++;assert.equal(new URL(url).searchParams.get('per_page'),'25');return {status:200,data:page(Array.from({length:25},(_,i)=>work(i+1)),'next')};}});
 assert.equal(s.status,'capped');assert.equal(s.candidates.length,25);assert.equal(calls,1);
 await discover(s,catalog,{request:()=>assert.fail('terminal queue fetched again')});
});
test('checkpoints first page, preserves cursor on failure, resumes without duplicate additions',async()=>{
 let saved,calls=0;const request=async()=>++calls===1?{status:200,data:page([work(1)],'page2')}:Promise.reject(Error('credential-value'));
 const failed=await discover(createQueue('test',catalog),catalog,{request,save:async s=>{saved=structuredClone(s);}});
 assert.equal(saved.cursor,'page2');assert.equal(saved.candidates.length,1);assert.ok(!JSON.stringify(saved).includes('credential-value'));
 const resumed=await discover(failed,catalog,{request:async url=>{assert.equal(new URL(url).searchParams.get('cursor'),'page2');return {status:200,data:page([work(1),work(2)])};}});
 assert.equal(resumed.candidates.length,2);assert.equal(resumed.status,'exhausted');assert.equal(resumed.lastError,null);
});
test('bounded retry honors short Retry-After, stops rather than retrying too early for long delay',async()=>{
 let calls=0,delays=[];const s=await discover(createQueue('test',catalog),catalog,{request:async()=>++calls===1?{status:429,retryAfter:'2'}:{status:200,data:page([])},sleep:async ms=>delays.push(ms)});
 assert.deepEqual(delays,[2000]);assert.equal(s.status,'exhausted');
 calls=0;const held=await discover(createQueue('test',catalog),catalog,{request:async()=>{calls++;return {status:429,retryAfter:'120'};},sleep:()=>assert.fail('long delay retried')});
 assert.equal(calls,1);assert.equal(held.pages,0);assert.match(held.lastError,/429/);
});
test('permanent errors never retry and response bodies are never persisted',async()=>{
 let calls=0;const s=await discover(createQueue('test',catalog),catalog,{request:async()=>{calls++;return {status:401,data:{secret:'credential'}};}});
 assert.equal(calls,1);assert.match(s.lastError,/401/);assert.ok(!JSON.stringify(s).includes('credential'));
});
test('caps duplicate-only traversal at ten pages',async()=>{
 let count=0;const s=await discover(createQueue('test',catalog),catalog,{request:async()=>({status:200,data:page([work(1,{doi:'10.1234/already'})],`cursor${++count}`)})});
 assert.equal(s.pages,10);assert.equal(s.status,'capped');assert.equal(s.candidates.length,0);
});
test('rejects changed catalog, malformed pages and repeated cursors without partial mutation',()=>{
 const s=createQueue('test',catalog);
 assert.throws(()=>validateQueue(s,[...catalog,{id:'new',doi:'10.1234/new',title:'New'}]));
 assert.throws(()=>applyPage(s,page([work(1)],'*'),catalog));assert.throws(()=>applyPage(s,page([work(1),null]),catalog));
 assert.equal(s.candidates.length,0);
});
test('review decisions retain audit history and do not grant publication or extraction rights',()=>{
 let s=applyPage(createQueue('test',catalog),page([work(1)]),catalog);
 assert.throws(()=>reviewCandidate(s,'oa-W1','accepted','','AI'));
 s=reviewCandidate(s,'oa-W1','accepted','Relevant metadata; requires DOI verification','AI-assisted review');
 s=reviewCandidate(s,'oa-W1','rejected','Out of scope after review','Owner');
 assert.equal(s.reviews.length,2);assert.equal(s.candidates[0].rights.aiTransmission,'unassessed');assert.equal(s.candidates[0].review.state,'rejected');
});
test('API URL contains only fixed endpoint and selected fields; no credentials',()=>{
 const url=new URL(requestURL(createQueue('geopolymer & slag',catalog)));
 assert.equal(url.origin,'https://api.openalex.org');assert.equal(url.searchParams.get('search'),'geopolymer & slag');assert.ok(!url.searchParams.has('api_key'));assert.ok(!url.searchParams.get('select').includes('abstract'));
 assert.throws(()=>fetchPage('https://example.com/works'));assert.throws(()=>fetchPage(url.href,{apiKey:'bad\nheader'}));
});
test('CLI status and review persist, reject query changes, and enforce locks',async()=>{
 await mkdir(new URL('../work/',import.meta.url),{recursive:true});
 const folder=await mkdtemp(new URL('../work/queue-test-',import.meta.url));const file=folder+'/queue.json';
 const run=(...args)=>spawnSync(process.execPath,['scripts/discover-openalex.mjs',...args],{encoding:'utf8'});
 try{
  await writeFile(file,JSON.stringify(applyPage(createQueue('test',library),page([work(999)]),library)));
  assert.equal(run('status',file).status,0);assert.equal(run('review',file,'oa-W999','accepted','Metadata candidate','Test reviewer').status,0);
  assert.equal(JSON.parse(await readFile(file)).candidates[0].review.state,'accepted');
  assert.equal(run('run',file,'different query').status,1);
  await writeFile(file+'.lock','');assert.equal(run('status',file).status,1);
 }finally{await rm(folder,{recursive:true,force:true});}
});
test('transport sends credentials on stdin and parses HTTP without retaining raw errors',async()=>{
 const {EventEmitter}=await import('node:events');const {PassThrough}=await import('node:stream');
 let sent='',args;
 const spawnProcess=(command,argv,options)=>{
  assert.equal(command,'curl');args=argv;assert.equal(options.env,undefined);
  const child=new EventEmitter();child.stdin=new PassThrough();child.stdout=new PassThrough();child.stderr=new PassThrough();
  child.stdin.on('data',c=>sent+=c);child.stdin.on('finish',()=>{
   child.stdout.write('HTTP/1.1 200 OK\r\nContent-Type: application/json\r\n\r\n'+JSON.stringify(page([])));
   child.emit('close',0);
  });return child;
 };
 const response=await fetchPage(requestURL(createQueue('test',catalog)),{apiKey:'test-secret',spawnProcess});
 assert.equal(response.status,200);assert.deepEqual(response.data.results,[]);
 assert.ok(sent.includes('Authorization: Bearer test-secret'));assert.ok(!args.join(' ').includes('test-secret'));
 assert.ok(args.includes('--suppress-connect-headers'));assert.ok(!args.includes('--location'));
});
test('transport bounds response size and refuses redirects without echoing their bodies',async()=>{
 const {EventEmitter}=await import('node:events');const {PassThrough}=await import('node:stream');
 function simulated(raw){return ()=>{
  const child=new EventEmitter();child.stdin=new PassThrough();child.stdout=new PassThrough();child.stderr=new PassThrough();child.kill=()=>child.emit('close',null);
  child.stdin.resume();child.stdin.on('finish',()=>{child.stdout.write(raw);child.emit('close',0);});return child;
 };}
 const url=requestURL(createQueue('test',catalog));
 const redirect=await fetchPage(url,{spawnProcess:simulated('HTTP/1.1 302 Found\r\nLocation: https://other.invalid/\r\n\r\nprivate body')});
 assert.deepEqual(redirect,{status:302,retryAfter:undefined});
 await assert.rejects(()=>fetchPage(url,{spawnProcess:simulated(Buffer.alloc(2_100_001))}),/size limit/);
 await assert.rejects(()=>fetchPage(url,{spawnProcess:simulated('HTTP/1.1 200 OK\r\n\r\nnot-json private body')}),e=>e.message==='Invalid OpenAlex JSON');
});
