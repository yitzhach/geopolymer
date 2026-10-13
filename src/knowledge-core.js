// Pure versioned adapter: no storage, network or model side effects.
import {validDigitization} from './knowledge-digitization.js';
export const SCHEMA_VERSION = 1;
export const normalizeDoi = value => String(value || '').trim().replace(/^https?:\/\/(?:dx\.)?doi\.org\//i,'').replace(/^doi:\s*/i,'').toLowerCase();
const safeURL = value => typeof value==='string' && /^https:\/\/[^\s<>"\\]+$/.test(value);
const withdrawn = p => ['retracted','withdrawn','update-requires-review'].includes(p?.sourceStatus?.state) || ['withdrawn','superseded'].includes(p?.editorial);
export function adaptCatalog(library) {
 return library.map(p=>({...p,doi:normalizeDoi(p.doi),workFamilyId:p.workFamilyId||p.id,extraction:p.extraction||'unstarted',verification:p.verification||'legacy-discovery',editorial:p.editorial||'published',sourceStatus:p.sourceStatus||{state:'unchecked',checked:p.checked},metadataOnly:!p.extraction||p.extraction==='unstarted'}));
}
export function validateKnowledge(data, publications) {
 const errors=[]; const fail=s=>errors.push(s);
 if(data?.schemaVersion!==1) return ['Unsupported knowledge schema'];
 const groups=['assets','studies','mixes','tests','observations','findings','materials','relationships'];
 for(const k of groups) if(!Array.isArray(data[k])) fail('Missing array: '+k);
 if(errors.length)return errors;
 const pubs=new Map(publications.map(p=>[p.id,p]));
 if(pubs.size!==publications.length)fail('Duplicate publication ID');
 if(new Set(publications.map(p=>normalizeDoi(p.doi))).size!==publications.length)fail('Duplicate DOI');
 const maps={};
 for(const k of groups.filter(k=>k!=='studies')) {
  maps[k]=new Map(data[k].map(x=>[x.id,x]));
  if(maps[k].size!==data[k].length)fail('Duplicate '+k+' ID');
  for(const r of data[k]) if(!r.id||!pubs.has(r.publicationId))fail(k+' missing identity/publication: '+r.id);
 }
 const provenance=(r)=>{
  if(!r.provenance||!maps.assets.has(r.provenance.assetId)||!r.provenance.locator||!r.provenance.basis||!r.provenance.checkedBy||!r.provenance.checkedAt)fail('Missing provenance: '+r.id);
  else if(maps.assets.get(r.provenance.assetId).publicationId!==r.publicationId)fail('Cross-publication provenance: '+r.id);
 };
 for(const a of data.assets) {
  if(!safeURL(a.url)||!safeURL(a.rightsEvidenceUrl)||!a.policyVersion||!a.checked)fail('Invalid rights evidence: '+a.id);
  for(const op of ['access','download','processing','rawRetention','aiTransmission','embedding','publicDisplay','export'])if(!['allowed','denied','unknown'].includes(a.operations?.[op]?.decision)||!a.operations[op].reason)fail('Invalid operation '+op+': '+a.id);
 }
 for(const s of data.studies) {
  if(!pubs.has(s.publicationId)||maps.assets.get(s.assetId)?.publicationId!==s.publicationId||!Array.isArray(s.inventory)||!s.limitations.length)fail('Invalid study: '+s.publicationId);
  if(!['partial','inventory-complete','extracted'].includes(s.extraction))fail('Invalid extraction state');
 }
 for(const m of data.mixes) {
  provenance(m);
  for(const id of m.materialIds||[])if(maps.materials.get(id)?.publicationId!==m.publicationId)fail('Invalid material link: '+m.id);
  if(!['sodium','potassium','mixed-na-k','phosphate','unknown'].includes(m.activation))fail('Unknown activation: '+m.id);
  if(m.slagPercent!==null&&(!Number.isFinite(m.slagPercent)||m.slagPercent<0||m.slagPercent>100||!m.slagBasis))fail('Invalid slag basis: '+m.id);
  for(const q of m.quantities)if(!Number.isFinite(q.value)||q.value<0||!q.originalText||!q.unit||!q.basis)fail('Invalid quantity: '+m.id);
 }
 for(const t of data.tests)provenance(t);
 for(const m of data.materials)provenance(m);
 for(const r of data.relationships){if(!pubs.has(r.relatedPublicationId)||!r.scope||!r.verification)fail('Invalid relationship: '+r.id);for(const id of r.evidenceIds)if(!maps.observations.has(id))fail('Invalid relationship evidence: '+r.id);}
 for(const o of data.observations) {
  provenance(o); const m=maps.mixes.get(o.mixId), t=maps.tests.get(o.testId);
  if(!m||!t||m.publicationId!==o.publicationId||t.publicationId!==o.publicationId||t.property!==o.property)fail('Invalid observation joins: '+o.id);
  if(o.value===null ? !o.missingReason : !Number.isFinite(o.value))fail('Invalid numeric value: '+o.id);
  if(!o.originalText||!o.unit||!o.qualifier||!o.verification)fail('Incomplete observation: '+o.id);
  if(o.ageDays!==null&&(!Number.isFinite(o.ageDays)||o.ageDays<0))fail('Invalid age: '+o.id);
  if(o.ageDays===null&&!o.ageOrigin)fail('Missing age reason: '+o.id);
  if(o.exposureDays!==null && (!Number.isFinite(o.exposureDays)||o.exposureDays<0||o.ageDays<o.exposureDays))fail('Invalid exposure: '+o.id);
  if(o.qualifier==='estimated'&&!validDigitization(o))fail('Invalid graph calibration/review: '+o.id);
  if(o.digitization&&o.qualifier!=='estimated')fail('Graph estimate mislabeled as reported: '+o.id);
 }
 for(const f of data.findings){provenance(f);for(const id of f.mixIds)if(maps.mixes.get(id)?.publicationId!==f.publicationId)fail('Invalid finding mix: '+f.id);}
 return errors;
}
const aliases={mk:'metakaolin',ggbfs:'slag',ggbs:'slag',na:'sodium',k:'potassium',compressive:'compression',flexural:'flexure',fibres:'fiber',fibers:'fiber'};
export function scientificTokens(text){return String(text).toLowerCase().match(/"[^"]+"|[\p{L}\p{N}.%-]+/gu)?.map(t=>t.startsWith('"')?t.slice(1,-1):(aliases[t]||t))||[];}
export function textMatches(text,query){const hay=scientificTokens(text).join(' ');return scientificTokens(query).every(t=>hay.includes(t));}
const allowed=(a,op)=>a?.operations?.[op]?.decision==='allowed';
export function searchEvidence(data, publications, query={}) {
 const pubs=new Map(publications.map(p=>[p.id,p])), mixes=new Map(data.mixes.map(m=>[m.id,m])), tests=new Map(data.tests.map(t=>[t.id,t])), assets=new Map(data.assets.map(a=>[a.id,a]));
 const exact=[],partial=[];let excluded=0;
 for(const o of data.observations){
  const p=pubs.get(o.publicationId),m=mixes.get(o.mixId),t=tests.get(o.testId),a=assets.get(o.provenance.assetId);
  if(!p||!m||!t||withdrawn(p)||!allowed(a,'publicDisplay')||o.verification!=='source-checked-ai'||o.value===null||o.qualifier!=='reported'){excluded++;continue;}
  const reasons=[];let mismatch=false;
  const eq=(want,got,key)=>{if(want!==undefined&&want!==null&&want!==''){if(got===null||got===undefined)reasons.push('unknown '+key);else if(String(want)!==String(got))mismatch=true;}};
  const range=(want,got,key,lower)=>{if(want!==undefined&&want!==null&&want!==''){const n=Number(want);if(!Number.isFinite(n)){mismatch=true;return;}if(got===null||got===undefined)reasons.push('unknown '+key);else if(lower?got<n:got>n)mismatch=true;}};
  if(query.material&&!m.materialIds?.some(id=>{const material=data.materials.find(x=>x.id===id);return material&&[material.id,material.family,material.grade].includes(query.material);}))mismatch=true;
  if(query.q&&!textMatches(`${p.title} ${p.authors} ${p.doi} ${m.binder} ${m.activation} ${o.property} ${m.originalId}`,query.q))mismatch=true;
  for(const [key,value] of Object.entries({binder:m.binder,activation:m.activation,property:o.property,unit:o.unit,ageDays:o.ageDays,cure:t.cure.category,geometry:t.geometry,method:t.method,substrate:t.substrate,direction:t.direction,year:p.year,verification:o.verification,depth:p.extraction}))eq(query[key],value,key);
  range(query.minSlag,m.slagPercent,'slag fraction',true);range(query.maxSlag,m.slagPercent,'slag fraction',false);range(query.min,o.value,'value',true);range(query.max,o.value,'value',false);eq(query.temperatureC,t.cure.temperatureC,'temperature');
  // Numerical thresholds must have a property and explicit unit; never compare MPa with mm.
  if((query.min!==undefined&&query.min!==''||query.max!==undefined&&query.max!=='')&&(!query.property||!query.unit))mismatch=true;
  if(mismatch){excluded++;continue;}
  (reasons.length?partial:exact).push({observation:o,mix:m,test:t,publication:p,reasons});
 }
 const page=Math.max(1,Math.floor(Number(query.page)||1)), pageSize=Math.min(50,Math.max(1,Math.floor(Number(query.pageSize)||20)));
 return {exact:exact.slice((page-1)*pageSize,page*pageSize),partial:partial.slice(0,pageSize),total:exact.length,partialTotal:partial.length,excluded,corpus:data.observations.length,page,pageSize};
}
// Whitelist output: unrelated fields/raw text cannot leak through arbitrary spreads.
export function publicKnowledge(data,publications,operation='export') {
 if(!['export','aiTransmission'].includes(operation))throw new Error('Invalid export operation');
 const pubIds=new Set(publications.filter(p=>!withdrawn(p)).map(p=>p.id));
 const assets=data.assets.filter(a=>pubIds.has(a.publicationId)&&allowed(a,operation)&&allowed(a,'publicDisplay'));
 const ids=new Set(assets.map(a=>a.id)), keep=r=>ids.has(r.provenance?.assetId);
 const fields=(r,keys)=>Object.fromEntries(keys.filter(k=>r[k]!==undefined).map(k=>[k,structuredClone(r[k])]));
 return {schemaVersion:1,assets:assets.map(a=>fields(a,['id','publicationId','url','license','licenseUrl','attribution','checked'])),
 publications:publications.filter(p=>assets.some(a=>a.publicationId===p.id)).map(p=>fields(p,['id','title','authors','doi','year','url','sourceStatus'])),
 mixes:data.mixes.filter(keep).map(r=>fields(r,['id','publicationId','originalId','binder','activation','slagPercent','slagBasis','quantities','provenance','derivation','materialIds'])),
 tests:data.tests.filter(keep).map(r=>fields(r,['id','publicationId','property','geometry','method','cure','n','direction','substrate','provenance'])),
 observations:data.observations.filter(keep).map(r=>fields(r,['id','publicationId','mixId','specimenId','testId','property','originalText','value','unit','ageDays','ageOrigin','ageDerivation','exposureDays','missingReason','qualifier','uncertainty','uncertaintyReason','verification','provenance','digitization'])),
 materials:data.materials.filter(keep).map(r=>fields(r,['id','publicationId','family','source','grade','lot','lotMissingReason','recordType','qualification','provenance'])),
 findings:data.findings.filter(keep).map(r=>fields(r,['id','publicationId','mixIds','direction','text','claimType','verification','provenance']))};
}
export function reconcileBatch(existing,incoming,{cursor=0,limit=25}={}){
 if(!Array.isArray(existing)||!Array.isArray(incoming)||!Number.isInteger(cursor)||cursor<0||!Number.isInteger(limit)||limit<1||limit>25)throw new Error('Invalid bounded batch');
 const records=structuredClone(existing),events=[];
 for(const r of incoming.slice(cursor,cursor+limit)){
  const doi=normalizeDoi(r.doi), found=records.find(p=>normalizeDoi(p.doi)===doi);
  if(!/^10\.\d{4,9}\/.+/.test(doi)||!r.id||!r.title||!safeURL(r.url)){events.push({id:r.id,status:'rejected-invalid'});continue;}
  if(found){const unchanged=JSON.stringify({...found,doi:normalizeDoi(found.doi)})===JSON.stringify({...r,doi});events.push({id:r.id,status:found.id!==r.id?'duplicate-doi-review':unchanged?'unchanged':'changed-record-review',existingId:found.id});continue;}
  if(records.some(p=>p.id===r.id||p.title.toLowerCase()===r.title.toLowerCase())){events.push({id:r.id,status:'identity-review'});continue;}
  records.push({...r,doi});events.push({id:r.id,status:'accepted'});
 }
 return {records,events,cursor:Math.min(incoming.length,cursor+limit),complete:cursor+limit>=incoming.length};
}
export function affectedEvidence(data,publicationId){return {publicationId,mixes:data.mixes.filter(x=>x.publicationId===publicationId).map(x=>x.id),observations:data.observations.filter(x=>x.publicationId===publicationId).map(x=>x.id),findings:data.findings.filter(x=>x.publicationId===publicationId).map(x=>x.id)};}
