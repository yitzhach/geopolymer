// Node-side helpers for mix sheets: guide context packs, loading, validation and compilation.
import {readdir,readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {deepDives} from '../../src/deep-dives.js';
import {mixDesignFor} from '../../src/deep-dive-mix-designs.js';
import {paperReadingPreviews} from '../../src/paper-reading-previews.js';
import {library} from '../../src/research-library.js';
import {literatureMixes} from '../../src/literature-mixes.js';
import {pilot} from '../../src/knowledge-pilot.js';
import {validateSheet,compileMixTable} from '../../src/mix-table.js';

export const SHEET_DIR='research/mix-sheets';
const doiKey=s=>String(s||'').replace(/^https?:\/\/(dx\.)?doi\.org\//i,'').toLowerCase();

// Reviewed text already published for a guide. Sheets in review-note mode may only quote these lines.
export function guideContext(guideId){
 const guide=deepDives.find(d=>d.id===guideId);
 if(!guide)return null;
 const packet=mixDesignFor(guideId),review=packet.partialReview,lines=[];
 const add=(label,text,locator='')=>{if(typeof text==='string'&&text.trim())lines.push({label,text:text.trim(),locator});};
 if(review){
  add('review summary',review.title,review.locator);add('materials',review.materials,review.locator);
  for(const [name,value] of review.ledger||[])add('ledger',`${name}: ${value}`,review.locator);
  for(const k of ['notes','preparation','curing','testing'])add(k,review[k],review.locator);
  for(const g of review.gaps||[])add('gap',g,review.locator);
 }
 if(packet.selection){add('selection',packet.selection.title);for(const n of packet.selection.notes||[])add('selection · '+n.kind,n.text,n.locator);}
 for(const f of guide.facts||[])add('fact · '+f.title,f.text,f.locator);
 for(const h of guide.holds||[])add('hold',h);
 const preview=paperReadingPreviews.find(p=>p.deepDiveId===guideId)||paperReadingPreviews.find(p=>doiKey(p.doi)===doiKey(guide.doi));
 if(preview){for(const p of preview.paragraphs||[])add('summary · '+p.heading,p.text);for(const t of preview.takeaways||[])add('takeaway',t);for(const l of preview.limitations||[])add('limitation',l);}
 const pub=library.find(p=>doiKey(p.doi)===doiKey(guide.doi));
 return {guide,packet,lines,corpus:lines.map(l=>l.text),studyId:pub?.id||null,title:pub?.title||guide.sourceTitle||'',year:pub?.year?Number(pub.year):null};
}
export function coveredDois(){
 const pubs=new Map(library.map(p=>[p.id,p]));
 return new Set([...literatureMixes.map(r=>doiKey(r.url)).filter(d=>d.startsWith('10.')),...pilot.studies.map(s=>doiKey(pubs.get(s.publicationId)?.doi))]);
}
export async function sheetFiles(dir=SHEET_DIR){
 return (await readdir(dir).catch(()=>[])).filter(f=>f.endsWith('.json')&&!f.startsWith('_')&&f!=='QUEUE.json').sort().map(f=>join(dir,f));
}
export async function readSheet(path){
 const raw=await readFile(path,'utf8');
 try{return {sheet:JSON.parse(raw)};}catch(e){return {error:`${path}: invalid JSON — ${e.message}`};}
}
export function checkSheet(sheet,{covered=coveredDois()}={}){
 const ctx=guideContext(sheet?.guideId);
 const result=validateSheet(sheet,{guide:ctx?.guide,guides:true,corpus:ctx?.corpus,library,coveredDois:covered,status:ctx?.packet?.status});
 return {...result,ctx};
}
// Loads, validates and compiles every sheet. Throws with all errors so a bad sheet can never reach the site.
export async function buildMixTable({dir=SHEET_DIR,generated=new Date().toISOString().slice(0,10)}={}){
 const covered=coveredDois(),sheets=[],problems=[],seen=new Set();
 for(const path of await sheetFiles(dir)){
  const {sheet,error}=await readSheet(path);
  if(error){problems.push(error);continue;}
  const {errors,ctx}=checkSheet(sheet,{covered});
  if(seen.has(sheet.guideId))errors.push(`guideId: second sheet for "${sheet.guideId}"`);
  seen.add(sheet.guideId);
  if(!path.endsWith(`/${sheet.guideId}.json`))errors.push(`file name must be ${sheet.guideId}.json`);
  if(errors.length){problems.push(...errors.map(e=>`${path} → ${e}`));continue;}
  sheets.push({sheet,guide:ctx.guide,studyId:ctx.studyId,title:ctx.title,year:ctx.year});
 }
 if(problems.length)throw new Error('Mix sheet validation failed:\n'+problems.join('\n'));
 return compileMixTable({sheets,recipes:literatureMixes,pilot,library,guides:deepDives,generated});
}
