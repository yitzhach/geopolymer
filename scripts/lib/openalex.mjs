// Private ingestion code: never imported by the public site.
import {createHash} from 'node:crypto';
import {spawn} from 'node:child_process';
import {normalizeDoi} from '../../src/knowledge-core.js';
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const clean = (value, max=2000) => typeof value === 'string' ? value.replace(/[\u0000-\u001f]/g,' ').slice(0,max) : '';
const doiOf = value => {const d=normalizeDoi(value);return d.length<=2048&&/^10\.\d{4,9}\/\S+$/.test(d)?d:null;};
const titleKey = value => clean(value).normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
export function catalogHash(catalog) {return digest(catalog.map(p=>[p.id,doiOf(p.doi),titleKey(p.title)]).sort((a,b)=>a[0].localeCompare(b[0])));}
export function createQueue(query,catalog,now=new Date().toISOString()) {
 if(typeof query!=='string'||!query.trim()||query.length>500)throw Error('Search must contain 1–500 characters');
 return {schemaVersion:1,provider:'openalex',query:query.trim(),catalogHash:catalogHash(catalog),created:now,updated:now,cursor:'*',pages:0,status:'pending',candidates:[],seen:[],events:[],reviews:[],limits:{candidates:25,pages:10},lastError:null};
}
export function validateQueue(state,catalog) {
 if(state?.schemaVersion!==1||state.provider!=='openalex'||state.catalogHash!==catalogHash(catalog))throw Error('Checkpoint schema or catalog changed; start a new queue');
 if(typeof state.query!=='string'||!state.query.trim()||state.query.length>500||!['pending','exhausted','capped'].includes(state.status)||!Number.isInteger(state.pages)||state.pages<0||state.pages>10||state.limits?.candidates!==25||state.limits?.pages!==10||!Array.isArray(state.candidates)||state.candidates.length>25||!Array.isArray(state.seen)||state.seen.length>250||!Array.isArray(state.events)||!Array.isArray(state.reviews)||!(state.cursor===null||typeof state.cursor==='string'&&state.cursor.length<=4096))throw Error('Invalid discovery checkpoint');
 if(state.status==='pending'&&(state.pages>=10||state.candidates.length>=25||!state.cursor))throw Error('Invalid pending checkpoint');
 if(new Set(state.candidates.map(p=>p.id)).size!==state.candidates.length||state.candidates.some(p=>!/^oa-W\d{1,20}$/.test(p.id)||!['pending','accepted','rejected'].includes(p.review?.state)))throw Error('Invalid candidate identities or decisions');
}
export function requestURL(state) {
 const url=new URL('https://api.openalex.org/works');
 url.searchParams.set('search',state.query);url.searchParams.set('cursor',state.cursor);
 url.searchParams.set('per_page',String(25-state.candidates.length));
 url.searchParams.set('select','id,doi,title,publication_year,publication_date,type,authorships,primary_location,open_access,is_retracted');
 return url.href;
}
export function applyPage(state,page,catalog,now=new Date().toISOString()) {
 validateQueue(state,catalog);
 const remaining=25-state.candidates.length;
 if(!page||!Array.isArray(page.results)||page.results.length>remaining||!page.meta||!(page.meta.next_cursor===null||typeof page.meta.next_cursor==='string'&&page.meta.next_cursor.length>0&&page.meta.next_cursor.length<=4096))throw Error('Invalid OpenAlex page');
 if(page.results.length&&page.meta.next_cursor===state.cursor)throw Error('OpenAlex cursor did not advance');
 const next=structuredClone(state), knownDois=new Map(catalog.map(p=>[doiOf(p.doi),p.id]).filter(([d])=>d)), knownTitles=new Map(catalog.map(p=>[titleKey(p.title),p.id]));
 for(const row of page.results) {
  if(!row||typeof row!=='object')throw Error('Invalid OpenAlex work');
  const match=/^https:\/\/openalex.org\/(W\d{1,20})$/.exec(row.id||'');
  const id=match?`oa-${match[1]}`:null, doi=doiOf(row.doi), title=clean(row.title);
  let reason=null,existingId=null;
  if(!id||!title.trim())reason='invalid-metadata';
  else if(next.seen.includes(id))reason='duplicate-openalex-id';
  else if(doi&&knownDois.has(doi)){reason='existing-catalog-doi';existingId=knownDois.get(doi);}
  else if(doi&&next.candidates.some(p=>p.doi===doi))reason='duplicate-batch-doi';
  if(id&&!next.seen.includes(id))next.seen.push(id);
  if(reason){next.events.push({at:now,id,doi,reason,existingId});continue;}
  const flags=[];
  if(!doi)flags.push('missing-or-invalid-doi');
  if(knownTitles.has(titleKey(title))||next.candidates.some(p=>titleKey(p.title)===titleKey(title)))flags.push('title-match-needs-review');
  if(row.is_retracted===true)flags.push('provider-retraction-flag');
  next.candidates.push({id,openalexId:row.id,doi,title,year:Number.isInteger(row.publication_year)?row.publication_year:null,published:clean(row.publication_date,20),type:clean(row.type,100),authors:(Array.isArray(row.authorships)?row.authorships:[]).slice(0,500).map(a=>clean(a.author?.display_name,200)).filter(Boolean),journal:clean(row.primary_location?.source?.display_name,300),discovery:{provider:'openalex',retrieved:now,query:state.query,reportedOpenAccess:typeof row.open_access?.is_oa==='boolean'?row.open_access.is_oa:null,reportedLicense:clean(row.primary_location?.license,100)||null},rights:{fullText:'unassessed',aiTransmission:'unassessed'},extraction:'unstarted',verification:'unverified-provider-metadata',flags,review:{state:'pending'}});
 }
 next.pages++;next.cursor=page.meta.next_cursor;next.updated=now;next.lastError=null;
 next.status=!page.results.length||next.cursor===null?'exhausted':next.candidates.length>=25||next.pages>=10?'capped':'pending';
 next.events.push({at:now,reason:'page-processed',page:next.pages,received:page.results.length,responseHash:digest(page.results.map(p=>({id:p.id,doi:p.doi,title:p.title}))),reportedTotal:Number.isFinite(page.meta.count)?page.meta.count:null});
 return next;
}
// curl honors the managed environment's HTTPS proxy and CA configuration.
// The credential is supplied on stdin, never in argv, a URL, or error output.
export function fetchPage(url,{apiKey='',timeoutMs=20000,spawnProcess=spawn}={}) {
 if(new URL(url).origin!=='https://api.openalex.org'||new URL(url).pathname!=='/works'||new URL(url).username||new URL(url).password||new URL(url).searchParams.has('api_key'))throw Error('Disallowed API destination');
 if(/[\r\n]/.test(apiKey))throw Error('Invalid credential format');
 const quote=value=>'"'+value.replace(/\\/g,'\\\\').replace(/"/g,'\\"')+'"';
 return new Promise((resolve,reject)=>{
  const child=spawnProcess('curl',['-q','--config','-','--silent','--include','--suppress-connect-headers','--proto','=https','--max-time',String(timeoutMs/1000),'--max-filesize','2000000'],{stdio:['pipe','pipe','pipe']});
  let chunks=[],bytes=0,overflow=false;
  child.stdout.on('data',chunk=>{bytes+=chunk.length;if(bytes>2_100_000){overflow=true;child.kill();}else chunks.push(chunk);});
  child.stderr.resume();child.stdin.on('error',()=>{});
  child.on('error',()=>reject(Error('OpenAlex transport unavailable')));
  child.on('close',code=>{
   if(code!==0||overflow)return reject(Error('OpenAlex transport failed (network, timeout, or size limit)'));
   const raw=Buffer.concat(chunks).toString('utf8'),split=raw.indexOf('\r\n\r\n');
   const head=raw.slice(0,split),status=Number(/^HTTP\/\S+ (\d+)/.exec(head)?.[1]);
   if(split<0||!status)return reject(Error('Invalid HTTP response'));
   const retryAfter=/^retry-after:\s*(.+)$/im.exec(head)?.[1]?.trim();
   if(status!==200)return resolve({status,retryAfter});
   try{resolve({status,data:JSON.parse(raw.slice(split+4))});}catch{reject(Error('Invalid OpenAlex JSON'));}
  });
  child.stdin.end('url = '+quote(url)+'\n'+(apiKey?'header = '+quote('Authorization: Bearer '+apiKey)+'\n':''));
 });
}
export async function discover(state,catalog,{request=fetchPage,save=async()=>{},apiKey='',sleep=ms=>new Promise(r=>setTimeout(r,ms)),now=()=>new Date().toISOString()}={}) {
 validateQueue(state,catalog);let current=structuredClone(state);
 while(current.status==='pending') {
  try {
   let response;
   for(let attempt=0;attempt<3;attempt++) {
    response=await request(requestURL(current),{apiKey});
    if(![429,502,503,504].includes(response.status)||attempt===2)break;
    const raw=response.retryAfter;
    const delay=raw===undefined?1000*2**attempt:/^\d+$/.test(raw)?Number(raw)*1000:Date.parse(raw)-Date.parse(now());
    if(!Number.isFinite(delay)||delay>5000)break;
    await sleep(Math.max(0,delay));
   }
   if(response.status!==200)throw Error(`OpenAlex HTTP ${Number.isInteger(response.status)?response.status:'error'}; resume later`);
   current=applyPage(current,response.data,catalog,now());
  }catch(error){
   // Only controlled codes are persisted; exceptions can contain credentials or bodies.
   current.lastError=/^OpenAlex HTTP \d{3}; resume later$/.test(error?.message)?error.message:'Discovery stopped: transport or response validation failed';
   current.updated=now();await save(current);return current;
  }
  await save(current);
 }
 return current;
}
export function reviewCandidate(state,id,decision,reason,reviewer,now=new Date().toISOString()) {
 if(!['accepted','rejected'].includes(decision)||!reason?.trim()||!reviewer?.trim())throw Error('Decision, reason and reviewer are required');
 const next=structuredClone(state),candidate=next.candidates.find(p=>p.id===id);
 if(!candidate)throw Error('Unknown candidate');
 const review={state:decision,reason:clean(reason),reviewer:clean(reviewer,200),at:now};
 candidate.review=review;next.reviews.push({id,...review});next.updated=now;return next;
}
