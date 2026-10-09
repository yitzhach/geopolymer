// Browser-local experiment records. No catalog lookup may rewrite a saved snapshot.
import {parseProject} from './gp-chemistry.js';
export const NOTEBOOK_KEY='geopolymer.notebook.v1';
export const DRAFT_KEY='geopolymer.notebook.draft.v1';
export const FORMAT='geopolymer-notebook-v1';
export const MAX_BYTES=4000000;
const clone=x=>JSON.parse(JSON.stringify(x));
const fail=message=>{throw Error(message);};
const str=(v,label,max=2000,required=false)=>{
 if(typeof v!=='string'||v.length>max||(required&&!v.trim()))fail(`${label}: ${required?'nonempty ':''}text required (maximum ${max} characters).`);
 return v;
};
const id=v=>str(v,'ID',100,true);
const list=(v,label,max)=>{if(!Array.isArray(v)||v.length>max)fail(`${label}: maximum ${max} records.`);return v;};
const number=(v,label,min=0,max=1e9,required=false)=>{
 if(v==null||v===''){if(required)fail(`${label} is required.`);return null;}
 if(!['string','number'].includes(typeof v)||!String(v).trim()||!Number.isFinite(Number(v))||Number(v)<min||Number(v)>max)fail(`${label}: enter a number from ${min} to ${max}.`);
 return Number(v);
};
const timestamp=v=>{str(v,'Timestamp',40,true);if(!Number.isFinite(Date.parse(v)))fail('Invalid timestamp.');return v;};
const unique=(rows,label)=>{if(new Set(rows.map(r=>r.id)).size!==rows.length)fail(`Duplicate ${label} IDs.`);};
export const newId=()=>globalThis.crypto.randomUUID();
export const emptyNotebook=()=>({format:FORMAT,experiments:[],trials:[]});
export function newTrial(project,experimentId='',parent=null){
 return {id:newId(),experimentId,parentId:parent?.id||null,title:parent?`${parent.title} — variation`:project.recipe.name,variable:'',createdAt:new Date().toISOString(),snapshot:parseProject(project),actualMasses:project.recipe.rows.map(()=>null),preparation:{castAt:'',mixing:'',deviations:''},specimens:[],curing:[],observations:[],results:[]};
}
export function duplicateTrial(parent){return newTrial(parent.snapshot,parent.experimentId,parent);}
export function validateTrial(input){
 const t=clone(input);
 id(t.id);id(t.experimentId);if(t.parentId!==null)id(t.parentId);
 str(t.title,'Trial name',180,true);str(t.variable,'Changed variable',1000,!!t.parentId);timestamp(t.createdAt);
 // Calculator v1 remains its own format. The normalized snapshot is self-contained.
 t.snapshot=parseProject(t.snapshot);
 list(t.actualMasses,'Actual masses',50);if(t.actualMasses.length!==t.snapshot.recipe.rows.length)fail('Actual masses must match recipe rows.');
 t.actualMasses=t.actualMasses.map(v=>number(v,'Actual mass'));
 for(const k of ['castAt','mixing','deviations'])str(t.preparation?.[k],`Preparation ${k}`,2000);
 if(t.preparation.castAt&&!/^\d{4}-\d\d-\d\dT\d\d:\d\d$/.test(t.preparation.castAt))fail('Casting date must be a local date and time.');
 list(t.specimens,'Specimens',100).forEach(s=>{id(s.id);str(s.label,'Specimen label',180,true);str(s.geometry,'Specimen geometry and dimensions',1000);});
 unique(t.specimens,'specimen');
 list(t.curing,'Curing stages',100).forEach(c=>{id(c.id);c.startHours=number(c.startHours,'Cure start age (hours)');c.durationHours=number(c.durationHours,'Cure duration (hours)');c.temperatureC=number(c.temperatureC,'Temperature (°C)',-273.15,2000);c.humidityPct=number(c.humidityPct,'Humidity (%)',0,100);str(c.condition,'Curing conditions',2000,true);});
 const specimen=v=>{str(v,'Specimen ID',100);if(v&&!t.specimens.some(s=>s.id===v))fail('A record references a missing specimen.');};
 list(t.observations,'Observations',300).forEach(o=>{id(o.id);str(o.date,'Observation date',20,true);if(!/^\d{4}-\d\d-\d\d$/.test(o.date)||!Number.isFinite(Date.parse(o.date)))fail('Invalid observation date.');o.ageHours=number(o.ageHours,'Observation age (hours)');specimen(o.specimenId);str(o.category,'Observation category',100,true);str(o.text,'Observation',4000,true);str(o.imageUrl,'Image reference',2000);str(o.caption,'Image caption',1000);if(o.imageUrl&&!/^https?:\/\//i.test(o.imageUrl))fail('Image references must use http or https.');});
 list(t.results,'Results',300).forEach(r=>{id(r.id);str(r.property,'Measured property',180,true);r.value=number(r.value,'Measured value',-1e12,1e12,true);str(r.unit,'Result unit',80,true);r.ageHours=number(r.ageHours,'Test age (hours)');specimen(r.specimenId);str(r.method,'Test method',1000,true);if(!['own','literature'].includes(r.sourceType))fail('Choose own measurement or literature result.');str(r.source,'Result source / citation',2000,true);str(r.notes,'Result observations / limitations',4000);});
 for(const k of ['curing','observations','results'])unique(t[k],k);
 return t;
}
export function validateNotebook(input){
 if(!input||input.format!==FORMAT)fail('Unsupported notebook file. Use a notebook v1 backup.');
 const data=clone(input);
 list(data.experiments,'Experiments',100).forEach(e=>{id(e.id);str(e.title,'Experiment name',180,true);str(e.question,'Experiment question',2000);timestamp(e.createdAt);});
 data.trials=list(data.trials,'Trials',500).map(validateTrial);
 unique(data.experiments,'experiment');unique(data.trials,'trial');unique([...data.experiments,...data.trials],'experiment/trial');
 for(const t of data.trials){
  if(!data.experiments.some(e=>e.id===t.experimentId))fail('Trial references a missing experiment.');
  const seen=new Set([t.id]);let p=t;
  while(p.parentId){p=data.trials.find(row=>row.id===p.parentId);if(!p||p.experimentId!==t.experimentId)fail('Parent trial must exist in the same experiment.');if(seen.has(p.id))fail('Trial parent cycle.');seen.add(p.id);}
 }
 return data;
}
export function parseNotebook(raw){if(typeof raw!=='string'||new TextEncoder().encode(raw).length>MAX_BYTES)fail('Notebook exceeds 4 MB limit.');return validateNotebook(JSON.parse(raw));}
export function readNotebook(storage){const raw=storage.getItem(NOTEBOOK_KEY);return {raw,data:raw?parseNotebook(raw):emptyNotebook()};}
export function writeNotebook(storage,data,expectedRaw){
 const valid=validateNotebook(data),raw=JSON.stringify(valid);
 if(new TextEncoder().encode(raw).length>MAX_BYTES)fail('Notebook exceeds 4 MB. Export a backup before continuing.');
 if(storage.getItem(NOTEBOOK_KEY)!==expectedRaw)fail('Notebook changed in another tab. Download your draft, then reload before saving.');
 storage.setItem(NOTEBOOK_KEY,raw);return {raw,data:valid};
}
export function putTrial(data,trial,experiment){
 const next=validateNotebook(data),t=validateTrial(trial),old=next.trials.find(x=>x.id===t.id);
 if(old){
  if(JSON.stringify(old.snapshot)!==JSON.stringify(t.snapshot)||old.parentId!==t.parentId||old.experimentId!==t.experimentId||old.createdAt!==t.createdAt)fail('Saved formulation is locked. Duplicate the trial to change it.');
  next.trials=next.trials.map(x=>x.id===t.id?t:x);
 }else next.trials.push(t);
 if(experiment&&!next.experiments.some(e=>e.id===experiment.id))next.experiments.push(experiment);
 return validateNotebook(next);
}
// Imports are copies: remap every ID and parent/specimen link, never overwrite local work.
export function mergeNotebookWithMap(current,incoming){
 const next=validateNotebook(current),copy=validateNotebook(incoming),ids=new Map();
 for(const e of copy.experiments){ids.set(e.id,newId());}
 for(const t of copy.trials){ids.set(t.id,newId());}
 for(const e of copy.experiments){e.id=ids.get(e.id);e.title=e.title.slice(0,168)+' (imported)';}
 for(const t of copy.trials){t.id=ids.get(t.id);t.experimentId=ids.get(t.experimentId);t.parentId=t.parentId?ids.get(t.parentId):null;const specimens=new Map(t.specimens.map(s=>[s.id,newId()]));for(const s of t.specimens)s.id=specimens.get(s.id);for(const key of ['curing','observations','results'])for(const r of t[key]){r.id=newId();if('specimenId' in r)r.specimenId=r.specimenId?specimens.get(r.specimenId):'';}}
 return {data:validateNotebook({...next,experiments:[...next.experiments,...copy.experiments],trials:[...next.trials,...copy.trials]}),ids};
}
export function mergeNotebook(current,incoming){return mergeNotebookWithMap(current,incoming).data;}
export function formulationDiff(a,b){
 const changes=[];
 const walk=(x,y,path)=>{if(JSON.stringify(x)===JSON.stringify(y))return;if(x&&y&&typeof x==='object'&&typeof y==='object'){for(const key of new Set([...Object.keys(x),...Object.keys(y)]))walk(x[key],y[key],path?`${path}.${key}`:key);}else changes.push({field:path,before:x??null,after:y??null});};
 walk(a.recipe,b.recipe,'recipe');walk(a.targets,b.targets,'targets');walk(a.study,b.study,'study');return changes;
}
// Drafts intentionally retain incomplete numeric text; validation happens on Save trial.
export function parseDraft(raw){
 if(typeof raw!=='string'||new TextEncoder().encode(raw).length>MAX_BYTES)fail('Draft exceeds 4 MB.');
 const d=JSON.parse(raw);if(d?.format!=='geopolymer-notebook-draft-v1')fail('Unsupported draft.');
 const t=d.trial;id(t?.id);str(d.experimentTitle,'Experiment name',180);str(d.question,'Question',2000);
 str(t.title,'Trial name',180);str(t.variable,'Variable',1000);str(t.experimentId,'Experiment ID',100);if(t.parentId!==null)id(t.parentId);timestamp(t.createdAt);
 // Structure-check using benign placeholders for unfinished fields, without changing draft values.
 const check=clone(t);str(check.preparation.castAt,'Casting date',40);check.preparation.castAt='';check.title=check.title||'Draft';check.variable=check.variable||'Draft';check.experimentId=check.experimentId||'draft';
 check.snapshot.recipe.rows.forEach(r=>{str(String(r.mass),'Draft mass',100);r.mass=0;});
 check.actualMasses=check.actualMasses.map(v=>{str(String(v??''),'Draft actual mass',100);return null;});
 for(const k of ['curing','observations','results'])for(const r of list(check[k],k,300)){
  for(const field of ['startHours','durationHours','temperatureC','humidityPct','ageHours','value'])if(field in r){str(String(r[field]??''),'Draft numeric value',100);r[field]=field==='value'?0:null;}
  if('imageUrl' in r){str(r.imageUrl,'Image reference',2000);r.imageUrl='';}
  if('date' in r){str(r.date,'Date',20);r.date='2000-01-01';}
  for(const field of ['condition','category','text','property','unit','method','source','date'])if(field in r){str(r[field],field,4000);if(!r[field])r[field]=field==='date'?'2000-01-01':'Draft';}
 }
 list(check.specimens,'Specimens',100).forEach(s=>{if(!s.label)s.label='Draft';});validateTrial(check);return d;
}
export function makeDraft(trial){return {format:'geopolymer-notebook-draft-v1',experimentTitle:'',question:'',trial:clone(trial)};}
export function writeDraft(storage,draft,expectedRaw){
 const raw=JSON.stringify(draft);parseDraft(raw);
 if(storage.getItem(DRAFT_KEY)!==expectedRaw)fail('Another tab changed the recovery draft. Download your draft before reloading.');
 storage.setItem(DRAFT_KEY,raw);return raw;
}
