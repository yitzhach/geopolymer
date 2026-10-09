import {calculate,METRICS} from './gp-chemistry.js';
import {NOTEBOOK_KEY,DRAFT_KEY,MAX_BYTES,newId,newTrial,duplicateTrial,readNotebook,writeNotebook,putTrial,parseNotebook,mergeNotebook,mergeNotebookWithMap,formulationDiff,parseDraft,makeDraft,writeDraft} from './experiment-notebook.js';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=v=>v==null?'Not recorded':typeof v==='object'?JSON.stringify(v):String(v);
const field=(label,key,value,type='text',extra='')=>`<label>${label}<input data-nb="${key}" type="${type}" value="${esc(value)}" ${extra}></label>`;
const area=(label,key,value,max=2000)=>`<label>${label}<textarea data-nb="${key}" maxlength="${max}" rows="3">${esc(value)}</textarea></label>`;
const button=(label,action,extra='')=>`<button type="button" class="button secondary" data-action="${action}" ${extra}>${label}</button>`;
const download=(data,name)=>{const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
export function notebookPage(){return `<section id="notebook" class="notebook section" aria-labelledby="notebook-heading"><p class="eyebrow">EXPERIMENT NOTEBOOK</p><h2 id="notebook-heading">From formulation to observations.</h2><p>Group named trials, preserve recipes and record what actually happened. Saved in this browser only. Download backups; browser data can be cleared. No account, sync or image upload is connected.</p><div class="actions"><a class="button" href="/calculator">Start with a recipe →</a>${button('Download notebook','export')}<label class="button secondary import-label">Import notebook or draft<input id="nb-import" type="file" accept=".json,application/json"></label></div><p id="nb-status" role="status"></p><noscript><p>JavaScript is required for local notebook editing. Your saved records remain in your browser.</p></noscript><div class="notebook-layout"><aside><h3>Experiments & trials</h3><div id="nb-list"></div></aside><div id="nb-editor"><p>Save a recipe as a trial from the calculator, or open an existing trial here.</p></div></div></section>`;}
export function attachNotebook(){
 const root=document.querySelector('#notebook');if(!root)return;
 const q=s=>root.querySelector(s),tell=m=>q('#nb-status').textContent=m;
 let state, draft=null, draftRaw=null, dirty=false;
 try{state=readNotebook(localStorage);draftRaw=localStorage.getItem(DRAFT_KEY);if(draftRaw)draft=parseDraft(draftRaw);}catch(e){tell(`Could not open notebook: ${e.message} Existing data has been kept.`);return;}
 const exists=()=>state.data.trials.find(t=>t.id===draft?.trial.id);
 const recover=()=>{try{draftRaw=writeDraft(localStorage,draft,draftRaw);tell('Draft recovery saved in this browser. Use Save trial to update the notebook.');return true;}catch(e){tell(`Recovery not saved: ${e.message} Keep this page open and Download draft.`);return false;}};
 const renderList=()=>{q('#nb-list').innerHTML=state.data.experiments.length?state.data.experiments.map(e=>`<section class="nb-experiment"><h4>${esc(e.title)}</h4><p class="small">${esc(e.question)}</p>${state.data.trials.filter(t=>t.experimentId===e.id).map(t=>`<button class="draft-item" type="button" data-open="${esc(t.id)}" ${t.id===draft?.trial.id?'aria-current="true"':''}><strong>${esc(t.title)}</strong><span>${t.parentId?'Variation · ':''}${t.results.length} results · ${t.observations.length} observations</span></button>`).join('')}</section>`).join(''):'<p>No trials saved yet. Capture a recipe from the calculator to begin.</p>';};
 const specimenSelect=(key,value)=>`<label>Specimen<select data-nb="${key}"><option value="">Not recorded / whole batch</option>${draft.trial.specimens.map(s=>`<option value="${esc(s.id)}" ${value===s.id?'selected':''}>${esc(s.label||'Unnamed specimen')}</option>`).join('')}</select></label>`;
 const collection=(key,title,body)=>`<section class="nb-section"><div class="section-title"><h3>${title}</h3>${button('Add '+({specimens:'specimen',curing:'curing stage',observations:'observation',results:'result'}[key]),'add',`data-kind="${key}"`)}</div>${body||'<p class="small">Nothing recorded.</p>'}</section>`;
 const cards=(key,render)=>draft.trial[key].map((r,i)=>`<fieldset class="nb-entry"><legend>${key==='results'?'Result':key==='observations'?'Observation':key==='curing'?'Curing stage':'Specimen'} ${i+1}</legend>${render(r,`${key}.${i}`)}${button('Remove entry','remove',`data-kind="${key}" data-index="${i}"`)}</fieldset>`).join('');
 const compare=()=>{
  const t=draft.trial,p=state.data.trials.find(x=>x.id===t.parentId);if(!p)return '';
  const changes=formulationDiff(p.snapshot,t.snapshot);
  const table=(caption,headers,rows)=>`<div class="table-scroll"><table><caption>${caption}</caption><thead><tr>${headers.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(cell=>`<td>${esc(fmt(cell))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  let ratios='';try{const a=calculate(p.snapshot.recipe),b=calculate(t.snapshot.recipe);ratios=table('Planned input ratios (not predicted performance)',['Ratio',p.title,t.title],Object.entries(METRICS).map(([k,v])=>[v.label,a.ratios[k],b.ratios[k]]));}catch{ratios='<p>Complete valid recipe masses to compare ratios.</p>';}
  const results=x=>x.results.map(r=>`${r.property}: ${r.value} ${r.unit}; age ${r.ageHours??'unknown'} h; ${r.sourceType==='own'?'Own measurement':'Literature'}; specimen ${x.specimens.find(s=>s.id===r.specimenId)?.label||'not recorded'}; ${r.method}; ${r.source}; ${r.notes}`).join('\n')||'Not recorded';
  const cure=x=>x.curing.map(c=>`${c.startHours??'?'} h start; ${c.durationHours??'?'} h duration; ${c.temperatureC??'?'} °C; ${c.humidityPct??'?'}% RH; ${c.condition}`).join('\n')||'Not recorded';
  return `<section class="nb-section"><h3>Compare with ${esc(p.title)}</h3><p>Intended variable: ${esc(t.variable||'Not recorded')}. Differences below are raw fields, not a claim that only one scientific variable changed. Row positions are used; reordering can show multiple differences.</p>${changes.length?table('All recipe, target and study-note differences',['Field',p.title,t.title],changes.map(c=>[c.field,c.before,c.after])):'<p>No formulation differences.</p>'}${ratios}${table('Recorded conditions and results — no automatic equivalence or strength ranking',['Record',p.title,t.title],[['Actual masses (g)',p.actualMasses.map((m,i)=>`${p.snapshot.recipe.rows[i].name}: ${m??'not recorded'}`).join('\n'),t.actualMasses.map((m,i)=>`${t.snapshot.recipe.rows[i].name}: ${m??'not recorded'}`).join('\n')],['Casting date (local)',p.preparation.castAt,t.preparation.castAt],['Mixing',p.preparation.mixing,t.preparation.mixing],['Deviations',p.preparation.deviations,t.preparation.deviations],['Curing',cure(p),cure(t)],['Results',results(p),results(t)]])}<p class="small">Compare test age, method, units, geometry and curing before interpreting differences. Unknown ages are not zero; own and literature records remain separate.</p></section>`;
 };
 function renderEditor(){
  if(!draft){q('#nb-editor').innerHTML='<p>Save a recipe as a trial from the calculator, or open an existing trial here.</p>';return;}
  const t=draft.trial,locked=!!exists();
  q('#nb-editor').innerHTML=`<form id="nb-form"><div class="record"><p class="eyebrow">${locked?'SAVED TRIAL · FORMULATION LOCKED':'NEW TRIAL · UNSAVED FORMULATION'}</p><div class="nb-fields">${field('Trial name','title',t.title,'text','required maxlength="180"')}${locked||t.parentId?`<p>Experiment: <strong>${esc(state.data.experiments.find(e=>e.id===t.experimentId)?.title||'Missing experiment')}</strong></p>`:`<label>Experiment<select data-nb="experimentId"><option value="">Create a new experiment</option>${state.data.experiments.map(e=>`<option value="${esc(e.id)}" ${t.experimentId===e.id?'selected':''}>${esc(e.title)}</option>`).join('')}</select></label><div id="nb-new-experiment" ${t.experimentId?'hidden':''}><label>New experiment name<input data-meta="experimentTitle" value="${esc(draft.experimentTitle)}" maxlength="180"></label><label>Question<textarea data-meta="question" maxlength="2000" rows="2">${esc(draft.question)}</textarea></label></div>`}${area('Intended changed variable / hypothesis','variable',t.variable,1000)}</div><div class="actions"><button class="button" type="submit">Save trial</button>${locked?button('Duplicate as variation','duplicate'):''}${button('Download draft','draft-export')}${button('Close draft','close')}</div><p class="small">Saving locks the formulation. Duplicate a saved trial to revise it. Preparation and results can be updated later. Blank values mean not recorded.</p></div>
<section class="nb-section"><h3>Planned recipe & actual batch</h3><p>${locked?'Recipe snapshot is locked.':'Adjust planned grams for this new trial; assays and provenance are retained.'} Enter actual grams separately; they never replace the plan.</p><div class="table-scroll"><table><caption>${esc(t.snapshot.recipe.name)}</caption><thead><tr><th>Ingredient</th><th>Planned (g)</th><th>Actual (g)</th></tr></thead><tbody>${t.snapshot.recipe.rows.map((r,i)=>`<tr><th>${esc(r.name)}<small>${esc(r.provenance.kind)} · ${esc(r.provenance.lot||'Lot not recorded')}</small></th><td>${locked?esc(r.mass):`<input aria-label="Planned grams ${esc(r.name)}" data-nb="snapshot.recipe.rows.${i}.mass" type="number" step="any" min="0" max="1000000000" required value="${esc(r.mass)}">`}</td><td><input aria-label="Actual grams ${esc(r.name)}" data-nb="actualMasses.${i}" type="number" step="any" min="0" max="1000000000" value="${esc(t.actualMasses[i])}"></td></tr>`).join('')}</tbody></table></div><details><summary>Full captured assays, assumptions, targets & source notes</summary><p>Captured independently of future supplier catalog changes. Legacy free-text results below are unclassified source notes, not notebook measurements.</p><pre class="nb-snapshot">${esc(JSON.stringify(t.snapshot,null,2))}</pre></details></section>
<section class="nb-section"><h3>Preparation</h3><div class="nb-fields">${field('Casting date and time (local)','preparation.castAt',t.preparation.castAt,'datetime-local')}${area('Mixing sequence, equipment and timing','preparation.mixing',t.preparation.mixing)}${area('Deviations, substitutions or extra additions','preparation.deviations',t.preparation.deviations)}</div></section>
${collection('specimens','Specimens',cards('specimens',(s,k)=>`<div class="nb-fields">${field('Specimen label',k+'.label',s.label,'text','required maxlength="180"')}${area('Geometry & dimensions (include units)',k+'.geometry',s.geometry,1000)}</div>`))}
${collection('curing','Curing stages',cards('curing',(c,k)=>`<div class="nb-fields">${field('Start age (hours)',k+'.startHours',c.startHours,'number','min="0" step="any"')}${field('Duration (hours)',k+'.durationHours',c.durationHours,'number','min="0" step="any"')}${field('Temperature (°C)',k+'.temperatureC',c.temperatureC,'number','min="-273.15" max="2000" step="any"')}${field('Relative humidity (%)',k+'.humidityPct',c.humidityPct,'number','min="0" max="100" step="any"')}${area('Conditions · sealed, ambient, immersion, demolding, etc.',k+'.condition',c.condition)}</div>`))}
${collection('observations','Dated observations',cards('observations',(o,k)=>`<div class="nb-fields">${field('Date',k+'.date',o.date,'date','required')}${field('Age (hours)',k+'.ageHours',o.ageHours,'number','min="0" step="any"')}${specimenSelect(k+'.specimenId',o.specimenId)}${field('Category',k+'.category',o.category,'text','list="nb-observation-categories" maxlength="100" required')}${area('Observation',k+'.text',o.text,4000)}${field('Image reference URL (optional; no upload)',k+'.imageUrl',o.imageUrl,'url','maxlength="2000"')}${area('Image caption',k+'.caption',o.caption,1000)}</div>`))}
${collection('results','Measured results',cards('results',(r,k)=>`<div class="nb-fields"><label>Evidence source<select data-nb="${k}.sourceType"><option value="own" ${r.sourceType==='own'?'selected':''}>Own measurement · unreviewed</option><option value="literature" ${r.sourceType==='literature'?'selected':''}>Literature-reported · not our test</option></select></label>${field('Measured property',k+'.property',r.property,'text','required maxlength="180"')}${field('Value',k+'.value',r.value,'number','step="any" required')}${field('Unit',k+'.unit',r.unit,'text','required maxlength="80"')}${field('Test age (hours; blank if unknown)',k+'.ageHours',r.ageHours,'number','min="0" step="any"')}${specimenSelect(k+'.specimenId',r.specimenId)}${area('Method / standard & deviations',k+'.method',r.method,1000)}${area('Source · operator / lab record or paper & page',k+'.source',r.source)}${area('Observations, uncertainty & limitations',k+'.notes',r.notes,4000)}</div>`))}
<p class="small">User-entered measurements and citations do not establish independent validation or platform peer review. Enter methods and units explicitly; results are not converted or averaged automatically.</p><div class="actions"><button class="button" type="submit">Save trial</button>${button('Refresh comparison','compare')}</div><div id="nb-comparison">${compare()}</div></form><datalist id="nb-observation-categories">${['Workability','Working time','Demolding','Cracking','Surface finish','Efflorescence','Other'].map(x=>`<option value="${x}">`).join('')}</datalist>`;
 }
 const open=(trial)=>{draft=makeDraft(trial);dirty=false;renderList();renderEditor();recover();};
 const replaceOK=()=>!draft||confirm('Replace the current recovery draft? Save or download it first to keep incomplete edits.');
 root.addEventListener('input',e=>{
  if(!draft)return;const el=e.target;
  if(el.dataset.meta)draft[el.dataset.meta]=el.value;
  else if(el.dataset.nb){const keys=el.dataset.nb.split('.');let target=draft.trial;for(const k of keys.slice(0,-1))target=target[k];target[keys.at(-1)]=el.value;}else return;
  dirty=true;if(el.dataset.nb==='experimentId')q('#nb-new-experiment').hidden=!!el.value;
  recover();
 });
 root.addEventListener('change',e=>{
  if(e.target.dataset.nb?.startsWith('specimens.')&&e.target.dataset.nb.endsWith('.label')){
   root.querySelectorAll('select[data-nb$=".specimenId"]').forEach(select=>{const value=select.value;select.innerHTML='<option value="">Not recorded / whole batch</option>'+draft.trial.specimens.map(s=>`<option value="${esc(s.id)}">${esc(s.label||'Unnamed specimen')}</option>`).join('');select.value=value;});
  }
 });
 root.addEventListener('submit',e=>{
  if(e.target.id!=='nb-form')return;e.preventDefault();
  try{
   const trial=JSON.parse(JSON.stringify(draft.trial));let experiment;
   if(!trial.experimentId){experiment={id:newId(),title:draft.experimentTitle,question:draft.question,createdAt:new Date().toISOString()};trial.experimentId=experiment.id;}
   state=writeNotebook(localStorage,putTrial(state.data,trial,experiment),state.raw);
   draft.trial=state.data.trials.find(t=>t.id===trial.id);dirty=false;renderList();renderEditor();const recovered=recover();
   tell(recovered?'Trial saved in this browser. Formulation locked; download a notebook backup.':'Trial saved, but recovery could not be updated. Download a notebook backup; an older recovery draft may reopen.');
  }catch(err){tell(`Could not save trial: ${err.message} Inputs remain here; Download draft is available.`);}
 });
 root.addEventListener('click',e=>{
  const openButton=e.target.closest('[data-open]');if(openButton){if(replaceOK())open(state.data.trials.find(t=>t.id===openButton.dataset.open));return;}
  const b=e.target.closest('[data-action]');if(!b)return;
  try{
   const action=b.dataset.action;
   if(action==='export'){download(state.data,'geopolymer-notebook.json');tell('Saved notebook downloaded. Incomplete edits are available separately with Download draft.');return;}
   if(!draft)return;
   if(action==='draft-export'){download({...draft,context:state.data},'geopolymer-notebook-draft.json');tell('Draft downloaded, including incomplete edits. Import it here to continue.');}
   if(action==='close'){if(!replaceOK())return;if(localStorage.getItem(DRAFT_KEY)!==draftRaw)throw Error('Recovery draft changed in another tab. Reload first.');localStorage.removeItem(DRAFT_KEY);draftRaw=null;draft=null;dirty=false;renderEditor();renderList();tell('Recovery draft closed. Saved trials are retained.');}
   if(action==='duplicate'){if(dirty&&!confirm('Duplicate the last saved trial? Save current observations first to retain them.'))return;open(duplicateTrial(exists()));dirty=true;tell('Variation created. Record the changed variable and adjust planned grams. Actual quantities, specimens and results start blank.');}
   if(action==='compare')q('#nb-comparison').innerHTML=compare();
   if(action==='add'){
    const key=b.dataset.kind;if(draft.trial[key].length>=({specimens:100,curing:100,observations:300,results:300}[key]))throw Error('Record limit reached.');
    const templates={specimens:{label:'',geometry:''},curing:{startHours:'',durationHours:'',temperatureC:'',humidityPct:'',condition:''},observations:{date:new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,10),ageHours:'',specimenId:'',category:'Cracking',text:'',imageUrl:'',caption:''},results:{property:'',value:'',unit:'',ageHours:'',specimenId:'',method:'',sourceType:'own',source:'',notes:''}};
    draft.trial[key].push({id:newId(),...templates[key]});dirty=true;renderEditor();recover();q(`[data-nb="${key}.${draft.trial[key].length-1}.${key==='specimens'?'label':key==='curing'?'startHours':key==='observations'?'date':'sourceType'}"]`)?.focus();
   }
   if(action==='remove'){
    const key=b.dataset.kind,index=Number(b.dataset.index),record=draft.trial[key][index];
    if(key==='specimens'&&[...draft.trial.results,...draft.trial.observations].some(r=>r.specimenId===record.id))throw Error('Reassign this specimen’s observations and results before removing it.');
    if(!confirm('Remove this entry from the draft? Save trial to apply the removal.'))return;
    draft.trial[key].splice(index,1);dirty=true;renderEditor();recover();
   }
  }catch(err){tell(err.message);}
 });
 q('#nb-import').onchange=async e=>{
  const f=e.target.files[0];try{
   if(!f)return;if(f.size>MAX_BYTES)throw Error('File exceeds 4 MB limit.');const raw=await f.text();const header=JSON.parse(raw);
   if(header?.format==='geopolymer-notebook-draft-v1'){
    const incoming=parseDraft(raw);if(!replaceOK())return;
    if(incoming.context){
     const merged=mergeNotebookWithMap(state.data,incoming.context);
     incoming.trial.id=merged.ids.get(incoming.trial.id)||newId();
     incoming.trial.experimentId=merged.ids.get(incoming.trial.experimentId)||incoming.trial.experimentId;
     incoming.trial.parentId=incoming.trial.parentId?(merged.ids.get(incoming.trial.parentId)||incoming.trial.parentId):null;
     if(incoming.trial.experimentId&&!merged.data.experiments.some(x=>x.id===incoming.trial.experimentId))throw Error('Draft experiment is missing from its backup.');
     if(incoming.trial.parentId&&!merged.data.trials.some(x=>x.id===incoming.trial.parentId))throw Error('Draft parent is missing from its backup.');
     const original=merged.data.trials.find(x=>x.id===incoming.trial.id);
     if(original&&JSON.stringify(original.snapshot)!==JSON.stringify(incoming.trial.snapshot))throw Error('Draft changes a locked formulation.');
     if(!confirm('Restore this draft and its saved notebook context as new copies? Existing work will be retained.'))return;
     state=writeNotebook(localStorage,merged.data,state.raw);delete incoming.context;
    }
    const old=state.data.trials.find(t=>t.id===incoming.trial.id);
    if(old&&JSON.stringify(old.snapshot)!==JSON.stringify(incoming.trial.snapshot))throw Error('Draft conflicts with a locked formulation. Import its notebook backup first.');
    if(incoming.trial.experimentId&&!state.data.experiments.some(x=>x.id===incoming.trial.experimentId))throw Error('Draft requires its original notebook. Import or open it first.');
    if(incoming.trial.parentId&&!state.data.trials.some(x=>x.id===incoming.trial.parentId))throw Error('Draft parent trial is missing. Open the original notebook first.');
    draft=incoming;dirty=true;renderList();renderEditor();recover();return;
   }
   const incoming=parseNotebook(raw);if(!confirm(`Import ${incoming.experiments.length} experiments and ${incoming.trials.length} trials as new copies? Existing records will be retained.`))return;
   state=writeNotebook(localStorage,mergeNotebook(state.data,incoming),state.raw);renderList();tell('Notebook imported as new copies. Existing trials and current draft retained.');
  }catch(err){tell('Import rejected: '+err.message);}finally{e.target.value='';}
 };
 window.addEventListener('beforeunload',e=>{if(dirty&&JSON.stringify(draft)!==draftRaw){e.preventDefault();e.returnValue='';}});
 renderList();renderEditor();if(draft)tell('Recovery draft reopened. Save trial when ready, or download the draft.');
}
