// Mix Explorer: pre-rendered table (complete without JavaScript) plus filters, chart,
// comparison, similar mixes and within-paper best, enhanced from /mixes.json.
import {FAMILIES,PARAMETERS,PROPERTIES,CURE_CATEGORIES,EVIDENCE,AXES,endpoints,endpointKey,endpointValue,filterRows,compareRows,similarMixes,withinPaperBest,winnerTraits,shareText} from './mix-table.js';

const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const isNum=v=>typeof v==='number'&&Number.isFinite(v);
const fmt=v=>isNum(v)?String(Math.round(v*1000)/1000):'—';
const short=(s,n=70)=>{s=String(s||'');return s.length>n?s.slice(0,n-1).trimEnd()+'…':s;};
const famLabel=f=>FAMILIES[f]?.label.split(' (')[0]||f;
const cap=s=>s?s[0].toUpperCase()+s.slice(1):s;
export const DEFAULT_ENDPOINT=endpointKey('compressive-strength',28);
const cureText=c=>!c||c.category==='unknown'?'Not stated':[CURE_CATEGORIES[c.category]?.split(' (')[0]||c.category,isNum(c.temperatureC)?c.temperatureC+' °C':'',isNum(c.durationHours)?(c.durationHours%24===0&&c.durationHours>=48?c.durationHours/24+' d':c.durationHours+' h'):'',c.sealed===true?'sealed':''].filter(Boolean).join(' · ');
const paramText=r=>r.parameters.map(p=>`${PARAMETERS[p.key]?.label||p.key} ${fmt(p.value)}`).join('; ')||'—';
const resultCell=(r,key)=>{const v=endpointValue(r,key);return v?`<strong>${fmt(v.value)}</strong> ${esc(v.unit)}${v.count>1?` <small>(1 of ${v.count})</small>`:''}`:'<span class="mx-muted">—</span>';};
const evidenceBadge=r=>`<span class="mx-evidence ${r.evidence==='review-note'?'note':'checked'}">${r.evidence==='review-note'?'Review note':'Source-checked'}</span>`;
const paperLine=r=>`${esc(short(r.paper.title,80))}${r.paper.year?` (${esc(r.paper.year)})`:''}`;

function detailHTML(r){
 const ing=r.ingredients.length?`<ul class="mx-list">${r.ingredients.map(i=>`<li><strong>${esc(i.name)}</strong> <small>${esc(famLabel(i.family))}</small> — ${i.value===null||i.value===undefined?`<em>amount not given</em>${i.missing?` (${esc(i.missing)})`:''}`:`${esc(fmt(i.value))} ${esc(i.unit)}`} <small>· ${esc(i.basis)}${i.basisNote?` (${esc(i.basisNote)})`:''}</small>${i.inherited?` <small>· shared with ${esc(i.inherited)}</small>`:''}${r.origin==='sheet'?`<q>${esc(i.text)}</q>`:''}</li>`).join('')}</ul>`:'<p class="mx-muted">No ingredient amounts recorded.</p>';
 const recipe=r.recipeIngredients?.length?`<p class="small">Gram ledger from the linked recipe: ${r.recipeIngredients.map(i=>`${esc(i.name)} ${esc(fmt(i.value))}`).join(' · ')}${r.basisNote?` (${esc(r.basisNote)})`:''}</p>`:'';
 const params=r.parameters.length?`<ul class="mx-list">${r.parameters.map(p=>`<li><strong>${esc(PARAMETERS[p.key]?.label||p.key)}</strong> ${esc(fmt(p.value))} <small>${esc(p.unit)}</small><q>${esc(p.text)}</q></li>`).join('')}</ul>`:'';
 const results=r.results.length?`<ul class="mx-list">${r.results.map(x=>`<li><strong>${esc(PROPERTIES[x.property]?.label||x.property)}</strong>${x.context?` <small>(${esc(x.context)})</small>`:''}: ${x.qualifier&&x.qualifier!=='reported'?esc(x.qualifier)+' ':''}${esc(fmt(x.value))}${isNum(x.valueMax)?'–'+esc(fmt(x.valueMax)):''} ${esc(x.unit)}${isNum(x.spread)?` ± ${esc(fmt(x.spread))}`:''} · ${x.ageDays===null||x.ageDays===undefined?esc(x.ageNote||'age not applicable'):esc(fmt(x.ageDays))+' d'}${x.specimen?` <small>· ${esc(x.specimen)}</small>`:''}${x.locator?` <small>· ${esc(x.locator)}</small>`:''}${r.origin==='sheet'?`<q>${esc(x.text)}</q>`:''}</li>`).join('')}</ul>`:'<p class="mx-muted">No numeric results recorded for this mix.</p>';
 const findings=[...(r.findings||[]).map(f=>`<li><strong>Selected for:</strong> ${esc(f.goal)}<q>${esc(f.text)}</q></li>`),...(r.notes||[]).map(n=>`<li><strong>${esc(cap(n.kind))}:</strong><q>${esc(n.text)}</q></li>`)].join('');
 const links=[r.links.guide&&`<a href="${esc(r.links.guide)}">Deep dive</a>`,r.links.recipe&&`<a href="${esc(r.links.recipe)}">Recipe and scaling</a>`,r.links.study&&`<a href="${esc(r.links.study)}">Study page</a>`,r.links.source&&`<a href="${esc(r.links.source)}">Original paper</a>`].filter(Boolean).join(' · ');
 return `<details class="mx-more"><summary>Ingredients, settings, results and sources · ${esc(r.label)}</summary><div class="mx-detail">
  <div><h4>Ingredients</h4>${ing}${recipe}${params?`<h4>Design settings</h4>${params}`:''}<h4>Curing</h4><p>${esc(cureText(r.cure))}${r.cure?.text?`<q>${esc(r.cure.text)}</q>`:''}${r.cure?.parsed?' <small>(classified from the recipe’s curing note)</small>':''}</p></div>
  <div><h4>Reported results</h4>${results}${findings?`<h4>Findings and failures</h4><ul class="mx-list">${findings}</ul>`:''}${r.gaps?.length?`<h4>Still missing</h4><ul class="mx-list">${r.gaps.map(g=>`<li>${esc(g)}</li>`).join('')}</ul>`:''}
  <p class="small">${EVIDENCE[r.evidence]?esc(EVIDENCE[r.evidence])+'. ':''}${r.scope?esc(r.scope)+' ':''}${r.shares?'Precursor shares are calculated from the listed precursor amounts.':''}</p><p>${links}</p>
  <p class="mx-actions" hidden><button type="button" class="button secondary" data-act="compare" data-id="${esc(r.id)}">Add to comparison</button> <button type="button" class="button secondary" data-act="similar" data-id="${esc(r.id)}">Find similar mixes</button> <button type="button" class="button secondary" data-act="paper" data-paper="${esc(r.paper.key)}">Compare all mixes in this paper</button></p></div></div></details>`;
}
function rowHTML(r,key){
 return `<tbody class="mx-row" data-id="${esc(r.id)}" data-paper="${esc(r.paper.key)}"><tr>
  <td data-label="Mix"><label class="mx-pick" hidden><input type="checkbox" data-pick="${esc(r.id)}"> <span class="sr-only">Select ${esc(r.label)} for comparison</span></label><strong>${esc(r.label)}</strong>${r.control?' <span class="mx-tag">control</span>':''}<small class="mx-paper">${paperLine(r)}</small></td>
  <td data-label="Precursors">${esc(shareText(r))}${r.fibers.length?`<small>+ ${esc(r.fibers.map(famLabel).join(', '))}</small>`:''}</td>
  <td data-label="Activator">${esc(cap(r.activator==='unknown'?'not stated':r.activator))}</td>
  <td data-label="Settings">${esc(paramText(r))}</td>
  <td data-label="Cure">${esc(cureText(r.cure))}</td>
  <td data-label="Result" class="mx-result">${resultCell(r,key)}</td>
  <td data-label="Evidence">${evidenceBadge(r)}</td></tr>
  <tr class="mx-detail-row"><td colspan="7">${detailHTML(r)}</td></tr></tbody>`;
}
const option=(value,label,selected)=>`<option value="${esc(value)}"${selected?' selected':''}>${esc(label)}</option>`;
export function mixExplorerPage(table){
 const rows=table.rows,eps=endpoints(rows),key=eps.some(e=>e.key===DEFAULT_ENDPOINT)?DEFAULT_ENDPOINT:eps[0]?.key||'';
 const present=role=>[...new Set(rows.flatMap(r=>r.precursors))].filter(f=>FAMILIES[f]?.role===role||role==='any').sort((a,b)=>famLabel(a).localeCompare(famLabel(b)));
 const sheetPapers=new Set(rows.filter(r=>r.origin==='sheet').map(r=>r.paper.key)).size;
 const axes=Object.entries(AXES).filter(([,a])=>rows.filter(r=>isNum(a.value(r))).length>=3);
 return `<section class="page-intro"><p class="eyebrow">RESEARCH / MIX EXPLORER</p><h1>Compare mixes across papers.</h1><p class="lede">Every row is one mix: its materials, design settings, curing and reported results, with the source text behind each number. Filter, chart, line mixes up side by side and find similar mixes from other papers.</p>
 <p>${table.counts.rows} mixes from ${table.counts.papers} papers · ${table.counts.withResults} with numeric results · ${table.counts.bySource.sheet} mixes from ${sheetPapers} newly structured papers · <a href="/mixes.json">Download the mix table (JSON)</a> · <a href="/deep-dives">Experiment deep dives</a></p>
 <p class="small mx-boundary">Mixes from different papers come from different laboratories, materials and test methods, so a cross-paper difference is a lead to check, not a cause. Nothing here is pooled or ranked across papers. Rows marked <em>Review note</em> were typed from the site’s reviewed notes and have not yet been re-checked against the paper; coverage of each paper is partial.</p></section>
 <section id="mix-explorer" aria-label="Mix explorer">
 <form class="mx-controls" id="mx-controls" onsubmit="return false">
  <label>Search<input id="mx-q" name="q" placeholder="Material, mix, paper, DOI…"></label>
  <label>Precursor<select id="mx-precursor" name="precursor">${option('','Any precursor')}${present('precursor').map(f=>option(f,famLabel(f))).join('')}</select></label>
  <label>Activator<select id="mx-activator" name="activator">${option('','Any activator')}${['sodium','potassium','mixed','other','unknown'].filter(a=>rows.some(r=>r.activator===a)).map(a=>option(a,a==='unknown'?'Not stated':cap(a))).join('')}</select></label>
  <label>Cure<select id="mx-cure" name="cure">${option('','Any cure')}${Object.entries(CURE_CATEGORIES).filter(([k])=>rows.some(r=>(r.cure?.category||'unknown')===k)).map(([k,v])=>option(k,v)).join('')}</select></label>
  <label>Form<select id="mx-form" name="form">${option('','Any form')}${[...new Set(rows.map(r=>r.form))].sort().map(f=>option(f,cap(f))).join('')}</select></label>
  <label>Evidence<select id="mx-evidence" name="evidence">${option('','All evidence')}${option('source-checked','Source-checked')}${option('review-note','From review notes')}</select></label>
  <label class="mx-wide">Result shown<select id="mx-result" name="result">${eps.map(e=>option(e.key,`${e.label} — ${e.count} mixes`,e.key===key)).join('')}</select></label>
  <label>Sort<select id="mx-sort" name="sort">${option('paper','By paper')}${option('desc','Result: high to low')}${option('asc','Result: low to high')}</select></label>
  <button type="button" class="button secondary" id="mx-reset" hidden>Clear filters</button>
 </form>
 <p id="mx-count" class="mx-count" aria-live="polite">${rows.length} of ${rows.length} mixes</p>
 <div class="mx-panels" hidden>
  <section class="record mx-chart-panel" id="mx-chart-panel" aria-labelledby="mx-chart-title"><h2 id="mx-chart-title">Chart the selected result</h2>
   <div class="mx-chart-controls"><label>Horizontal axis<select id="mx-x">${axes.map(([k,a])=>option(k,a.label,k==='share:slag')).join('')}</select></label>
   <label>Color by<select id="mx-color">${option('cure','Cure regime')}${option('activator','Activator')}</select></label>
   <label class="mx-check"><input type="checkbox" id="mx-lines" checked> Connect same-paper series</label>
   <label class="mx-check"><input type="checkbox" id="mx-best" checked> Ring the best mix within each paper</label></div>
   <div id="mx-chart" class="mx-chart"></div><p class="small" id="mx-chart-note"></p>
   <div id="mx-best-panel" class="mx-best"></div></section>
  <section class="record" id="mx-compare-panel" aria-labelledby="mx-compare-title"><h2 id="mx-compare-title">Line up mixes side by side</h2><p id="mx-compare-status" class="small">Tick up to six mixes in the table, or open a mix and choose “Compare all mixes in this paper”.</p><div id="mx-compare"></div></section>
  <section class="record" id="mx-similar-panel" hidden aria-labelledby="mx-similar-title"><h2 id="mx-similar-title">Similar mixes</h2><div id="mx-similar"></div></section>
 </div>
 <div class="mx-table-wrap"><table class="mx-table"><caption class="sr-only">Mixes with precursors, activator, design settings, cure, selected result and evidence level</caption>
  <thead><tr><th scope="col">Mix and paper</th><th scope="col">Precursors</th><th scope="col">Activator</th><th scope="col">Design settings</th><th scope="col">Cure</th><th scope="col" id="mx-result-head">${esc(eps.find(e=>e.key===key)?.label||'Result')}</th><th scope="col">Evidence</th></tr></thead>
  ${rows.map(r=>rowHTML(r,key)).join('')}</table></div>
 <p id="mx-empty" class="callout" hidden>No mixes match. Clear a filter to widen the search.</p>
 </section>`;
}

// ---------------- browser enhancement ----------------
const SERIES={cure:[['ambient','Ambient'],['heat','Heat'],['moist','Moist']],activator:[['sodium','Sodium'],['potassium','Potassium'],['mixed','Mixed Na/K']]};
const COLORS=['#2a78d6','#eb6834','#1baf7a'],OTHER='#9a9f9c';
const groupOf=(r,by)=>{const v=by==='cure'?(r.cure?.category||'unknown'):r.activator;const i=SERIES[by].findIndex(([k])=>k===v);return i<0?{i:3,label:'Other / not stated',color:OTHER}:{i,label:SERIES[by][i][1],color:COLORS[i]};};
function ticks(min,max,count=5){
 if(min===max){min-=1;max+=1;}
 const span=max-min,step0=span/count,mag=10**Math.floor(Math.log10(step0)),step=[1,2,2.5,5,10].map(m=>m*mag).find(s=>s>=step0);
 const start=Math.floor(min/step)*step,end=Math.ceil(max/step)*step,out=[];for(let v=start;v<=end+step/2;v+=step)out.push(Math.round(v*1e6)/1e6);return out;
}
export function seriesSignature(r,xKey){
 const c=r.cure||{};
 return JSON.stringify([r.activator,r.form,c.category,c.temperatureC,c.durationHours,r.fibers,r.additives,xKey.startsWith('share:')?null:r.shares,r.parameters.filter(p=>'param:'+p.key!==xKey).map(p=>p.key+'='+p.value).sort()]);
}
function chartSVG(points,{xKey,xLabel,yLabel,lines,best}){
 const W=760,H=420,m={l:58,r:18,t:16,b:54},xs=points.map(p=>p.x),ys=points.map(p=>p.y);
 const xt=ticks(Math.min(...xs),Math.max(...xs)),yt=ticks(Math.min(0,...ys),Math.max(...ys));
 const X=v=>m.l+(v-xt[0])/(xt.at(-1)-xt[0])*(W-m.l-m.r),Y=v=>H-m.b-(v-yt[0])/(yt.at(-1)-yt[0])*(H-m.t-m.b);
 const grid=yt.map(v=>`<line x1="${m.l}" x2="${W-m.r}" y1="${Y(v)}" y2="${Y(v)}" class="mx-grid"/><text x="${m.l-8}" y="${Y(v)+4}" text-anchor="end" class="mx-tick">${v}</text>`).join('')+xt.map(v=>`<text x="${X(v)}" y="${H-m.b+18}" text-anchor="middle" class="mx-tick">${v}</text>`).join('');
 // Join only mixes from one paper whose other recorded settings are identical: a controlled series in x.
 const byPaper=new Map();for(const p of points){const k=p.row.paper.key+'|'+seriesSignature(p.row,xKey);(byPaper.get(k)||byPaper.set(k,[]).get(k)).push(p);}
 const paths=lines?[...byPaper.values()].filter(g=>new Set(g.map(p=>p.x)).size>1).map(g=>{const s=[...g].sort((a,b)=>a.x-b.x||a.y-b.y);return `<polyline class="mx-link" points="${s.map(p=>`${X(p.x)},${Y(p.y)}`).join(' ')}"/>`;}).join(''):'';
 const dots=[...points].sort((a,b)=>b.g.i-a.g.i).map(p=>`<g class="mx-dot" tabindex="0" role="button" data-id="${esc(p.row.id)}" aria-label="${esc(`${p.row.label}, ${p.row.paper.title}: ${fmt(p.y)} at ${xLabel} ${fmt(p.x)}`)}"><circle class="mx-hit" cx="${X(p.x)}" cy="${Y(p.y)}" r="12"/>${best.has(p.row.id)?`<circle class="mx-ring" cx="${X(p.x)}" cy="${Y(p.y)}" r="8.5"/>`:''}<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="5" fill="${p.g.color}" class="mx-mark"/></g>`).join('');
 return `<svg viewBox="0 0 ${W} ${H}" role="group" aria-label="${esc(yLabel)} against ${esc(xLabel)}" class="mx-svg"><line x1="${m.l}" x2="${W-m.r}" y1="${H-m.b}" y2="${H-m.b}" class="mx-axis"/>${grid}${paths}${dots}<text x="${(W+m.l-m.r)/2}" y="${H-12}" text-anchor="middle" class="mx-axis-label">${esc(xLabel)}</text><text transform="translate(16 ${(H-m.b+m.t)/2}) rotate(-90)" text-anchor="middle" class="mx-axis-label">${esc(yLabel)}</text></svg>`;
}
export async function attachMixExplorer(root=document){
 const host=root.querySelector('#mix-explorer');if(!host)return;
 let table;try{table=await (await fetch('/mixes.json')).json();}catch(e){host.insertAdjacentHTML('afterbegin','<p class="callout">Interactive filters could not load; the full table below still works.</p>');return;}
 const rows=table.rows,byId=new Map(rows.map(r=>[r.id,r])),$=s=>host.querySelector(s);
 const ctl={q:$('#mx-q'),precursor:$('#mx-precursor'),activator:$('#mx-activator'),cure:$('#mx-cure'),form:$('#mx-form'),evidence:$('#mx-evidence'),result:$('#mx-result'),sort:$('#mx-sort'),x:$('#mx-x'),color:$('#mx-color')};
 const params=new URLSearchParams(location.search);
 for(const [k,el] of Object.entries(ctl)){const v=params.get(k);if(v!==null&&(el.tagName==='INPUT'||[...el.options].some(o=>o.value===v)))el.value=v;}
 let paper=params.get('paper')||'',selected=[...new Set((params.get('compare')||'').split(','))].filter(id=>byId.has(id)).slice(0,6);
 host.querySelectorAll('[hidden].mx-panels,.mx-actions,.mx-pick,#mx-reset').forEach(el=>el.hidden=false);
 const bodies=new Map([...host.querySelectorAll('.mx-row')].map(b=>[b.dataset.id,b])),tableEl=host.querySelector('.mx-table'),tip=document.createElement('div');
 tip.className='mx-tip';tip.hidden=true;$('#mx-chart').append(tip);
 const state=()=>({q:ctl.q.value,precursor:ctl.precursor.value,activator:ctl.activator.value,cure:ctl.cure.value,form:ctl.form.value,evidence:ctl.evidence.value,paper});
 function syncURL(){const u=new URL(location.href);for(const [k,el] of Object.entries(ctl)){const def=el.tagName==='SELECT'?(el.querySelector('option[selected]')||el.options[0]).value:'';if(el.value&&el.value!==def)u.searchParams.set(k,el.value);else u.searchParams.delete(k);}
  paper?u.searchParams.set('paper',paper):u.searchParams.delete('paper');selected.length?u.searchParams.set('compare',selected.join(',')):u.searchParams.delete('compare');history.replaceState(null,'',u);}
 function renderCompare(){
  host.querySelectorAll('[data-pick]').forEach(c=>c.checked=selected.includes(c.dataset.pick));
  host.querySelectorAll('[data-act="compare"]').forEach(b=>b.textContent=selected.includes(b.dataset.id)?'Remove from comparison':'Add to comparison');
  const list=selected.map(id=>byId.get(id));
  if(list.length<2){$('#mx-compare').innerHTML='';$('#mx-compare-status').textContent=list.length?`1 mix selected (${list[0].label}). Select at least one more.`:'Tick up to six mixes in the table, or open a mix and choose “Compare all mixes in this paper”.';syncURL();return;}
  const c=compareRows(list),status={same:'Same',different:'Different',unknown:'Unknown'};
  $('#mx-compare-status').textContent=`${list.length} mixes · ${c.note}`;
  $('#mx-compare').innerHTML=`<div class="mx-compare-scroll"><table class="mx-compare-table"><thead><tr><th scope="col">Attribute</th>${list.map(r=>`<th scope="col">${esc(r.label)}<small>${esc(short(r.paper.title,40))}</small></th>`).join('')}<th scope="col">Match</th></tr></thead><tbody>${c.table.map(t=>`<tr class="mx-${t.status}"><th scope="row">${esc(t.label)}</th>${t.cells.map(v=>`<td>${v===null||v===undefined||v===''?'<span class="mx-muted">—</span>':esc(v)}</td>`).join('')}<td><span class="mx-status">${status[t.status]}</span></td></tr>`).join('')}</tbody></table></div>
   ${c.differences.length?`<h3>What differs</h3><ul class="mx-list">${c.differences.map(d=>`<li>${esc(d)}</li>`).join('')}</ul>`:''}<p class="small">“Unknown” means at least one mix does not record the attribute; it is not a match.</p><p><button type="button" class="button secondary" id="mx-clear-compare">Clear comparison</button></p>`;
  syncURL();
 }
 function toggleCompare(id){if(selected.includes(id))selected=selected.filter(x=>x!==id);else if(selected.length<6)selected.push(id);else{$('#mx-compare-status').textContent='Six mixes selected. Remove one before adding another.';return;}renderCompare();}
 function renderChart(visible){
  const key=ctl.result.value,axis=AXES[ctl.x.value],by=ctl.color.value,label=ctl.result.selectedOptions[0]?.textContent.split(' — ')[0]||'Result';
  const pts=visible.map(r=>({row:r,x:axis?.value(r),y:endpointValue(r,key)?.value,g:groupOf(r,by)})).filter(p=>isNum(p.x)&&isNum(p.y));
  const bestInfo=withinPaperBest(visible,key),bestIds=new Set($('#mx-best').checked?bestInfo.winners.map(w=>w.row.id):[]);
  const withY=visible.filter(r=>endpointValue(r,key)).length;
  if(pts.length<2){$('#mx-chart').innerHTML='<p class="mx-muted">Fewer than two filtered mixes have both this result and this horizontal-axis value. Try another axis or result, or clear a filter.</p>';$('#mx-chart').append(tip);}
  else{
   const groups=[...new Map(pts.map(p=>[p.g.i,p.g])).values()].sort((a,b)=>a.i-b.i);
   $('#mx-chart').innerHTML=`<ul class="mx-legend">${groups.map(g=>`<li><span class="mx-key" style="background:${g.color}"></span>${esc(g.label)} <small>${pts.filter(p=>p.g.i===g.i).length}</small></li>`).join('')}${bestIds.size?'<li><span class="mx-key ring"></span>Best within its paper</li>':''}</ul>${chartSVG(pts,{xKey:ctl.x.value,xLabel:axis.label,yLabel:label,lines:$('#mx-lines').checked,best:bestIds})}`;
   $('#mx-chart').append(tip);
  }
  const missingX=withY-pts.length;
  $('#mx-chart-note').textContent=`${pts.length} of ${visible.length} filtered mixes plotted${missingX?`; ${missingX} more ${missingX===1?'has':'have'} this result but no ${axis?.label.toLowerCase()||'axis value'}`:''}. Lines join mixes from one paper that differ only in the horizontal-axis setting, as far as recorded here: those are controlled comparisons. Points from different papers are not one trend.`;
  const dir=bestInfo.direction;
  $('#mx-best-panel').innerHTML=!dir?`<p class="small">No single “better” direction is defined for this result, so a best mix per paper is not computed.</p>`:bestInfo.winners.length?`<h3>Best within each paper · ${esc(label)} (${dir} is better)</h3><ul class="mx-list">${bestInfo.winners.map(w=>`<li><strong>${esc(w.row.label)}</strong> ${esc(fmt(w.value))} — best of ${w.of} mixes in ${esc(short(w.row.paper.title,70))}${w.tie?' (tied)':''}</li>`).join('')}</ul>${bestInfo.winners.length>=2?(()=>{const t=winnerTraits(bestInfo.winners);return t.traits.length?`<p><strong>What these winners share:</strong> ${esc(t.traits.join('; '))}.</p>`:'<p>The winners share no recorded precursor, activator, cure or form.</p>';})():''}<p class="small">A winner is only best among the mixes its own paper tested at this age. Shared features are hypotheses to test, not causes.</p>`:'<p class="small">No paper in the current filter has two or more mixes with this result.</p>';
 }
 function apply(){
  const visible=filterRows(rows,state()),ids=new Set(visible.map(r=>r.id)),key=ctl.result.value;
  for(const [id,b] of bodies)b.hidden=!ids.has(id);
  $('#mx-result-head').textContent=ctl.result.selectedOptions[0]?.textContent.split(' — ')[0]||'Result';
  for(const r of rows){const cell=bodies.get(r.id)?.querySelector('.mx-result');if(cell)cell.innerHTML=resultCell(r,key);}
  const order=[...rows];if(ctl.sort.value!=='paper'){const s=ctl.sort.value==='desc'?-1:1;order.sort((a,b)=>{const va=endpointValue(a,key)?.value,vb=endpointValue(b,key)?.value;return isNum(va)&&isNum(vb)?s*(va-vb):isNum(va)?-1:isNum(vb)?1:0;});}
  for(const r of order)tableEl.append(bodies.get(r.id));
  $('#mx-count').textContent=`${visible.length} of ${rows.length} mixes${paper?` · one paper (${short(rows.find(r=>r.paper.key===paper)?.paper.title,50)})`:''}`;
  $('#mx-empty').hidden=visible.length>0;
  renderChart(visible);syncURL();
 }
 function showSimilar(id){
  const r=byId.get(id),s=similarMixes(r,rows);$('#mx-similar-panel').hidden=false;
  $('#mx-similar').innerHTML=`<p>Closest mixes to <strong>${esc(r.label)}</strong> from other papers, by shared precursors, activator, form, cure and nearby design settings. Similar composition does not mean similar performance.</p>${s.otherPapers.length?`<ol class="mx-list">${s.otherPapers.map(x=>`<li><strong>${esc(x.row.label)}</strong> — ${esc(short(x.row.paper.title,70))} <small>(${Math.round(x.score*100)}% match${x.why.length?': '+esc(x.why.join(', ')):''})</small> <button type="button" class="button secondary mx-small-button" data-act="compare" data-id="${esc(x.row.id)}">${selected.includes(x.row.id)?'Remove from comparison':'Add to comparison'}</button></li>`).join('')}</ol>`:'<p class="mx-muted">No mixes from other papers share recorded attributes.</p>'}${s.samePaperCount?`<p><button type="button" class="button secondary" data-act="paper" data-paper="${esc(r.paper.key)}">Compare all ${s.samePaperCount+1} mixes in this paper</button></p>`:''}`;
  $('#mx-similar-panel').scrollIntoView({block:'nearest'});
 }
 host.addEventListener('click',e=>{
  const b=e.target.closest('[data-act]');if(b){const act=b.dataset.act;
   if(act==='compare')toggleCompare(b.dataset.id);
   if(act==='similar')showSimilar(b.dataset.id);
   if(act==='paper'){paper=b.dataset.paper;selected=rows.filter(r=>r.paper.key===paper).map(r=>r.id).slice(0,6);renderCompare();apply();$('#mx-compare-panel').scrollIntoView({block:'start'});}
   return;}
  if(e.target.id==='mx-clear-compare'){selected=[];renderCompare();}
  if(e.target.id==='mx-reset'){for(const el of Object.values(ctl))if(el.tagName==='INPUT')el.value='';else el.value=(el.querySelector('option[selected]')||el.options[0]).value;paper='';apply();}
  const dot=e.target.closest('.mx-dot');if(dot){toggleCompare(dot.dataset.id);}
 });
 host.addEventListener('change',e=>{if(e.target.dataset.pick)toggleCompare(e.target.dataset.pick);else apply();});
 ctl.q.addEventListener('input',apply);
 const chart=$('#mx-chart');
 const showTip=(dot,x,y)=>{const r=byId.get(dot.dataset.id),key=ctl.result.value,v=endpointValue(r,key),ax=AXES[ctl.x.value];tip.replaceChildren();
  const strong=document.createElement('strong');strong.textContent=`${fmt(v?.value)} ${v?.unit||''}`;const name=document.createElement('span');name.textContent=r.label;const meta=document.createElement('small');meta.textContent=`${short(r.paper.title,60)} · ${ax.label}: ${fmt(ax.value(r))} · click to compare`;
  tip.append(strong,name,meta);tip.hidden=false;const box=chart.getBoundingClientRect();tip.style.left=Math.min(Math.max(0,x-box.left+12),box.width-220)+'px';tip.style.top=Math.max(0,y-box.top-12)+'px';};
 chart.addEventListener('pointermove',e=>{const d=e.target.closest('.mx-dot');if(d)showTip(d,e.clientX,e.clientY);else tip.hidden=true;});
 chart.addEventListener('pointerleave',()=>tip.hidden=true);
 chart.addEventListener('focusin',e=>{const d=e.target.closest('.mx-dot');if(d){const b=d.querySelector('.mx-mark').getBoundingClientRect();showTip(d,b.right,b.top);}});
 chart.addEventListener('focusout',()=>tip.hidden=true);
 chart.addEventListener('keydown',e=>{const d=e.target.closest('.mx-dot');if(d&&(e.key==='Enter'||e.key===' ')){e.preventDefault();toggleCompare(d.dataset.id);}});
 apply();renderCompare();
}
