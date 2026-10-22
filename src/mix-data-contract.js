export const mixDataFields=['materials','ingredients','preparation','curing','specimensTests','results','comparison','limitations'];
export const mixDataLabels={materials:'Materials and grades',ingredients:'Ingredient quantities and dose bases',preparation:'Preparation and mixing',curing:'Curing and conditioning',specimensTests:'Specimens, tests and ages',results:'Reported outcomes',comparison:'Goal-specific comparison and tradeoffs',limitations:'Unknowns, conflicts and reproduction limits'};
export function buildMixDataSet(packet,guide,recipes){
 const review=packet.partialReview,analytical=packet.status==='no-independent-mix',hold=packet.status==='source-hold';
 const source=packet.source,locator=review?.locator||recipes.map(r=>r.locator).join('; ')||'Source review pending; see original article';
 const field=(id,text,rows=[])=>({id,state:hold?'held':analytical&&id!=='limitations'?'not-applicable':review?.fieldStates?.[id]||(id==='ingredients'&&review?.hasQuantities===false?'pending':text||rows.length?'partial':'pending'),text:analytical&&id!=='limitations'?'No new independent physical experiment. Trace original experimental sources before supplying this field.':text||'Condition-specific '+mixDataLabels[id].toLowerCase()+' not yet extracted; do not infer a value.',rows,source,locator});
 const recipeNotes=key=>recipes.map(r=>r[key]).filter(Boolean).join(' | ');
 return {version:'mix-data-v1',guideId:guide.id,doi:guide.doi,checked:packet.checked,protocolComplete:false,condition:review?.title||packet.selection?.title||'No reconciled best-result condition selected',
  fields:[field('materials',review?.materials||recipes.flatMap(r=>r.ingredients.map(x=>x.name)).join('; ')||(review?review.ledger.map(r=>r[0]).join('; '):'')),
   field('ingredients',recipes.length?'Use each linked formulation’s original basis. As-supplied solution mass is distinct from dry activator and water.':review?'Selected source entries; unresolved units and denominators stay as reported.':'',review?.ledger||[]),
   field('preparation',review?.preparation||recipeNotes('preparation')),
   field('curing',review?.curing||recipeNotes('curing')||(review?'Combined source curing/testing note; schedule not independently separated: '+review.testing:'')),
   field('specimensTests',review?.testing||recipeNotes('method')),
   field('results',review?.notes||packet.selection?.notes.map(n=>n.text).join(' ')||(recipes.some(r=>r.results.length)?'Age-qualified measurements are recorded in the linked formulation records; preserve form, method and uncertainty.':'')),
   field('comparison',review?.notes||packet.selection?.notes.map(n=>n.text).join(' ')),
   field('limitations',packet.missing.join(' '))]};
}
export function validateMixDataSet(data,guide){
 if(data?.version!=='mix-data-v1'||data.guideId!==guide.id||data.doi!==guide.doi||data.protocolComplete!==false||!data.checked||!data.condition)throw Error('Invalid mix dataset identity or readiness.');
 if(data.fields?.map(f=>f.id).join('|')!==mixDataFields.join('|'))throw Error('All eight mix dataset fields are required.');
 for(const f of data.fields){if(!['partial','pending','held','not-applicable'].includes(f.state)||!f.text||!/^https:\/\//.test(f.source)||!f.locator||!Array.isArray(f.rows))throw Error('Mix dataset needs explicit state, source, locator and unknown reason.');for(const row of f.rows)if(row.length!==2||row.some(v=>typeof v!=='string'||!v.trim()))throw Error('Ingredient entries require source quantity/basis or an explicit unknown.');}
 return true;
}
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function renderMixDataSet(data){return `<details class="mix-data-set"><summary>Materials, mix quantities, methods and results — standard dataset</summary><p>Each field keeps its source and review state. Pending is an extraction gap, not proof that the paper omitted a value.</p>${data.fields.map(f=>`<section><h4>${esc(mixDataLabels[f.id])} · ${esc(f.state)}</h4><p>${esc(f.text)}</p>${f.rows.length?`<ul>${f.rows.map(([name,value])=>`<li><b>${esc(name)}:</b> ${esc(value)}</li>`).join('')}</ul>`:''}<a class="small" href="${esc(f.source)}">${esc(f.locator)}</a></section>`).join('')}<p><a href="/deep-dives/${esc(data.guideId)}#mix-design">Full mix-design review and source recipes</a></p></details>`;}
