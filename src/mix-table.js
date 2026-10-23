// Mix table: one row per mix, derived from existing canonical records.
// Sources: curated formulation catalog, knowledge pilot and per-paper mix sheets
// (research/mix-sheets/). This module adds no facts of its own; every value keeps
// its original text, unit, basis and source. See MIX_SHEET_STANDARD.md.
export const SHEET_FORMAT='mix-sheet-v1';
export const TABLE_FORMAT='mix-table-v1';
export const SHEET_TOOL='AI transcription · mix-sheet skill v1';

export const ROLES=['precursor','activator','water','aggregate','additive','fiber'];
const fam=(label,role)=>({label,role});
export const FAMILIES={
 'fly-ash':fam('Fly ash','precursor'),'slag':fam('Slag (GGBS/GGBFS)','precursor'),'metakaolin':fam('Metakaolin','precursor'),
 'calcined-clay':fam('Calcined clay','precursor'),'silica-fume':fam('Silica fume','precursor'),'natural-pozzolan':fam('Natural pozzolan / volcanic ash','precursor'),
 'rice-husk-ash':fam('Rice husk ash','precursor'),'biomass-ash':fam('Biomass ash','precursor'),'red-mud':fam('Red mud','precursor'),
 'steel-slag':fam('Steel slag','precursor'),'copper-slag':fam('Copper slag','precursor'),'lithium-slag':fam('Lithium slag','precursor'),
 'waste-glass':fam('Waste glass','precursor'),'ceramic-waste':fam('Ceramic / brick waste','precursor'),'mine-tailings':fam('Mine tailings','precursor'),
 'coal-gangue':fam('Coal gangue','precursor'),'sediment':fam('Sediment / soil','precursor'),'portland-cement':fam('Portland cement','precursor'),
 'gypsum':fam('Gypsum','precursor'),'biochar':fam('Biochar','additive'),'other-precursor':fam('Other precursor','precursor'),
 'sodium-hydroxide':fam('Sodium hydroxide','activator'),'potassium-hydroxide':fam('Potassium hydroxide','activator'),
 'sodium-silicate-solution':fam('Sodium silicate solution','activator'),'potassium-silicate-solution':fam('Potassium silicate solution','activator'),
 'sodium-silicate-solid':fam('Solid sodium silicate / metasilicate','activator'),'potassium-silicate-solid':fam('Solid potassium silicate','activator'),
 'sodium-carbonate':fam('Sodium carbonate','activator'),'sodium-sulfate':fam('Sodium sulfate','activator'),'calcium-hydroxide':fam('Calcium hydroxide / lime','activator'),
 'phosphoric-acid':fam('Phosphoric acid','activator'),'other-activator':fam('Other activator','activator'),
 'water':fam('Water','water'),
 'sand':fam('Sand','aggregate'),'coarse-aggregate':fam('Coarse aggregate','aggregate'),'recycled-aggregate':fam('Recycled aggregate','aggregate'),
 'lightweight-aggregate':fam('Lightweight aggregate','aggregate'),'other-aggregate':fam('Other aggregate / filler','aggregate'),
 'superplasticizer':fam('Superplasticizer','additive'),'retarder':fam('Retarder','additive'),'viscosity-modifier':fam('Viscosity modifier','additive'),
 'foaming-agent':fam('Foaming agent','additive'),'polymer':fam('Polymer / resin','additive'),'nano-additive':fam('Nano additive','additive'),
 'hydrophobic-agent':fam('Hydrophobic agent','additive'),'other-additive':fam('Other additive','additive'),
 'steel-fiber':fam('Steel fiber','fiber'),'pva-fiber':fam('PVA fiber','fiber'),'pp-fiber':fam('Polypropylene fiber','fiber'),
 'basalt-fiber':fam('Basalt fiber','fiber'),'glass-fiber':fam('Glass fiber','fiber'),'carbon-fiber':fam('Carbon fiber / textile','fiber'),
 'natural-fiber':fam('Natural fiber','fiber'),'other-fiber':fam('Other fiber','fiber'),
};
export const UNITS=['g','kg','kg/m3','part','wt%','vol%','mol/L','g/L','mL','L','ratio'];
export const BASES={
 'batch':'absolute amount in the reported batch','per-m3':'per cubic metre of mix',
 'precursor-mass':'share of total precursor (solid binder) mass','binder-as-defined':'relative to the authors’ own “binder” (explain in basisNote)',
 'total-mass':'share of the total wet batch mass','mass-parts':'relative mass parts with no stated total',
 'own-solution':'concentration within its own solution','volume':'volume fraction (explain in basisNote)','other':'other basis (explain in basisNote)',
};
const BASIS_UNITS={batch:['g','kg','mL','L'],'per-m3':['kg/m3'],'precursor-mass':['wt%','part','ratio'],'binder-as-defined':['wt%','part','ratio'],
 'total-mass':['wt%','part','ratio'],'mass-parts':['part','ratio'],'own-solution':['mol/L','wt%','g/L'],'volume':['vol%','mL','L'],other:UNITS};
export const PARAMETERS={
 'hydroxide-molarity':{label:'Hydroxide molarity',unit:'mol/L'},
 'activator-modulus':{label:'Activator modulus SiO₂/M₂O',unit:'molar ratio'},
 'activator/precursor':{label:'Activator / precursor',unit:'mass ratio'},
 'liquid/solid':{label:'Liquid / solid',unit:'mass ratio'},
 'water/binder':{label:'Water / binder',unit:'mass ratio'},
 'water/solids':{label:'Water / solids',unit:'mass ratio'},
 'silicate/hydroxide':{label:'Silicate / hydroxide solution',unit:'mass ratio'},
 'alkali-dose':{label:'Alkali dose (Na₂O-eq. % of precursor)',unit:'%'},
 'sand/binder':{label:'Sand / binder',unit:'mass ratio'},
 'Si/Al':{label:'Si/Al',unit:'atomic ratio'},'SiO2/Al2O3':{label:'SiO₂/Al₂O₃',unit:'molar ratio'},
 'Na/Al':{label:'Na/Al',unit:'atomic ratio'},'Na2O/Al2O3':{label:'Na₂O/Al₂O₃',unit:'molar ratio'},
 'H2O/Na2O':{label:'H₂O/Na₂O',unit:'molar ratio'},'Ca/Si':{label:'Ca/Si',unit:'atomic ratio'},
};
const prop=(label,units,direction=null)=>({label,units,direction});
export const PROPERTIES={
 'compressive-strength':prop('Compressive strength',['MPa'],'higher'),'flexural-strength':prop('Flexural strength',['MPa'],'higher'),
 'splitting-tensile-strength':prop('Splitting tensile strength',['MPa'],'higher'),'direct-tensile-strength':prop('Direct tensile strength',['MPa'],'higher'),
 'tensile-strain-capacity':prop('Tensile strain capacity',['%'],'higher'),'bond-strength':prop('Bond / adhesion strength',['MPa'],'higher'),
 'interlayer-tensile-bond':prop('Interlayer tensile bond',['MPa'],'higher'),'elastic-modulus':prop('Elastic modulus',['GPa']),
 'density':prop('Density',['kg/m3','g/cm3']),'porosity':prop('Porosity',['%'],'lower'),'water-absorption':prop('Water absorption',['%'],'lower'),
 'sorptivity':prop('Sorptivity',['mm/s^0.5','mm/min^0.5','mm/h^0.5']),'drying-shrinkage':prop('Drying shrinkage',['%','microstrain'],'lower'),
 'autogenous-shrinkage':prop('Autogenous shrinkage',['%','microstrain'],'lower'),'chemical-shrinkage':prop('Chemical shrinkage',['mL/g']),
 'initial-setting-time':prop('Initial setting time',['min']),'final-setting-time':prop('Final setting time',['min']),'setting-time':prop('Setting time (type not stated)',['min']),
 'flow-time':prop('Flow time (cone)',['s']),
 'flow':prop('Flow / spread',['mm','%']),'slump':prop('Slump',['mm']),'thermal-conductivity':prop('Thermal conductivity',['W/(m·K)']),
 'mass-loss':prop('Mass loss',['%'],'lower'),'strength-change':prop('Strength change after exposure',['%']),
 'strength-retention':prop('Strength retained after exposure',['%'],'higher'),'carbonation-depth':prop('Carbonation depth',['mm'],'lower'),
 'yield-stress':prop('Yield stress',['Pa']),'plastic-viscosity':prop('Plastic viscosity',['Pa·s']),'contact-angle':prop('Contact angle',['°']),
 'erosion':prop('Acid erosion depth',['mm'],'lower'),'shape-retention':prop('Shape retention ratio',['ratio','%']),
 'mip-porosity':prop('MIP porosity',['%'],'lower'),'mip-critical-pore-diameter':prop('MIP critical pore diameter',['nm']),
 'other':prop('Other property (see note)',null),
};
export const CURE_CATEGORIES={ambient:'Ambient / room temperature',moist:'Moist / high-humidity room temperature',heat:'Heat (≥30 °C)',steam:'Steam',
 water:'Water immersion',autoclave:'Autoclave',microwave:'Microwave',electric:'Electrical curing','not-applicable':'Not applicable (fresh test)',other:'Other',unknown:'Unknown'};
export const FORMS=['paste','mortar','concrete','grout','foam','coating','composite','printed','brick-block','soil','binder','other','unknown'];
export const QUALIFIERS=['reported','approximately','less-than','greater-than','range','below-detection','estimated'];
export const EVIDENCE={'source-checked':'Source-checked by AI','review-note':'From review note — not yet re-checked against the paper'};

// ---------- text grounding helpers (shared by the validator and its tests) ----------
export function normalizeText(s){
 return String(s??'').normalize('NFKC').replace(/[‐-―−]/g,'-').replace(/[‘’′]/g,"'").replace(/[“”″]/g,'"')
  .replace(/[×✕]/g,'x').replace(/ /g,' ').replace(/\s+/g,' ').trim().toLowerCase();
}
export function numbersIn(text){
 return (normalizeText(text).match(/\d+(?:,\d{3})*(?:\.\d+)?/g)||[]).map(t=>Number(t.replace(/,/g,'')));
}
const WORDS={one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,fourteen:14,twenty:20,'twenty-eight':28,ninety:90};
const numberInText=(value,text)=>numbersIn(text).some(n=>Math.abs(n-value)<1e-9);
const ageInText=(days,text)=>{const t=normalizeText(text);return numberInText(days,t)||numberInText(days*24,t)||Object.entries(WORDS).some(([w,n])=>n===days&&new RegExp('\\b'+w+'\\b').test(t));};
// Whole-name match: "AN" must not match inside "AN-PC1-S", and "D" must not match inside "and".
const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
export const containsName=(text,name)=>{const n=normalizeText(name);return !!n&&new RegExp('(?<![a-z0-9.\\-])'+esc(n)+'(?:e?s)?(?![a-z0-9\\-]|\\.[a-z0-9])').test(normalizeText(text));};
const mentions=(text,names)=>names.filter(Boolean).some(n=>containsName(text,n));
const inCorpus=(corpus,names)=>corpus.some(c=>mentions(c,names));
const isNum=v=>typeof v==='number'&&Number.isFinite(v);

// ---------- sheet validation ----------
// ctx: {guide, corpus (array of strings), library, coveredDois:Set} — corpus checks run when corpus is supplied.
export function validateSheet(sheet,ctx={}){
 const errors=[],warnings=[],err=(path,msg)=>errors.push(`${path}: ${msg}`),warn=(path,msg)=>warnings.push(`${path}: ${msg}`);
 if(!sheet||typeof sheet!=='object')return {errors:['sheet: not a JSON object'],warnings};
 if(sheet.format!==SHEET_FORMAT)err('format',`must be "${SHEET_FORMAT}"`);
 for(const k of ['guideId','doi','basis','scope','made','madeBy'])if(typeof sheet[k]!=='string'||!sheet[k].trim())err(k,'required text field is missing');
 if(sheet.made&&!/^\d{4}-\d{2}-\d{2}$/.test(sheet.made))err('made','use YYYY-MM-DD');
 if(!['review-note','source-text'].includes(sheet.basis))err('basis','must be "review-note" or "source-text"');
 if(ctx.guide){if(ctx.guide.id!==sheet.guideId)err('guideId','does not match the guide');if(String(ctx.guide.doi).toLowerCase()!==String(sheet.doi).toLowerCase())err('doi',`must equal the guide DOI ${ctx.guide.doi}`);}
 else if(ctx.guides)err('guideId',`unknown deep-dive guide "${sheet.guideId}"`);
 if(ctx.coveredDois?.has(String(sheet.doi).toLowerCase()))err('doi','already structured in the formulation catalog or knowledge pilot; extend those records instead');
 if(ctx.status==='source-hold')err('guideId','this guide is on a correction hold; do not write a sheet until the hold is resolved');
 if(ctx.status==='no-independent-mix')err('guideId','this guide reviews or models other experiments; it has no physical mixes of its own');
 if(sheet.basis==='source-text'){for(const k of ['sourceUrl','accessed','audit'])if(typeof sheet[k]!=='string'||!sheet[k].trim())err(k,'required for source-text sheets');}
 const corpus=sheet.basis==='review-note'&&Array.isArray(ctx.corpus)?ctx.corpus.map(normalizeText):null;
 const grounded=(path,text,{required=true}={})=>{
  if(typeof text!=='string'||!text.trim()){if(required)err(path+'.text','quote the source text this value comes from');return false;}
  if(corpus&&!corpus.some(c=>c.includes(normalizeText(text)))){err(path+'.text',`not found in this guide's reviewed notes: "${text.slice(0,90)}"`);return false;}
  return true;
 };
 const ids=(list,path)=>{const seen=new Set();for(const [i,x] of (list||[]).entries()){if(typeof x?.id!=='string'||!x.id.trim())err(`${path}[${i}].id`,'required');else if(seen.has(x.id))err(`${path}[${i}].id`,`duplicate id "${x.id}"`);seen.add(x?.id);}return seen;};
 for(const k of ['materials','mixes','cures','tests','results','findings','gaps'])if(!Array.isArray(sheet[k]))err(k,'must be an array (use [] when empty)');
 if(errors.length)return {errors,warnings};
 const materialIds=ids(sheet.materials,'materials'),mixIds=ids(sheet.mixes,'mixes'),cureIds=ids(sheet.cures,'cures'),testIds=ids(sheet.tests,'tests');
 if(!sheet.mixes.length)err('mixes','at least one mix is required');
 const materialById=new Map(sheet.materials.map(m=>[m.id,m]));
 sheet.materials.forEach((m,i)=>{const p=`materials[${i}]`;
  if(!FAMILIES[m.family])err(p+'.family',`unknown family "${m.family}" — pick from FAMILIES in src/mix-table.js`);
  if(!ROLES.includes(m.role))err(p+'.role',`must be one of ${ROLES.join(', ')}`);
  else if(FAMILIES[m.family]&&FAMILIES[m.family].role!==m.role)warn(p+'.role',`"${m.family}" is normally ${FAMILIES[m.family].role}; keep "${m.role}" only if the paper uses it that way`);
  if(typeof m.name!=='string'||!m.name.trim())err(p+'.name','required');
  if(corpus&&!inCorpus(corpus,[m.name,...(m.aliases||[])]))err(p+'.name',`neither the name nor an alias appears in the reviewed notes: "${m.name}"`);
  if(m.detail!==undefined&&m.detail!==null)grounded(p+'.detail',m.detail);
 });
 sheet.cures.forEach((c,i)=>{const p=`cures[${i}]`;
  if(!CURE_CATEGORIES[c.category])err(p+'.category',`must be one of ${Object.keys(CURE_CATEGORIES).join(', ')}`);
  if(!grounded(p,c.text))return;
  if(c.temperatureC!==null&&c.temperatureC!==undefined&&(!isNum(c.temperatureC)||!numberInText(c.temperatureC,c.text)))err(p+'.temperatureC','must be null or a number that appears in the quoted text');
  if(c.duration!==null&&c.duration!==undefined){if(!isNum(c.duration)||!numberInText(c.duration,c.text))err(p+'.duration','must be null or a number that appears in the quoted text');if(!['h','d'].includes(c.durationUnit))err(p+'.durationUnit','use "h" or "d"');}
  if(c.humidityPercent!==null&&c.humidityPercent!==undefined&&(!isNum(c.humidityPercent)||!numberInText(c.humidityPercent,c.text)))err(p+'.humidityPercent','must be null or a number that appears in the quoted text');
  if(![true,false,null].includes(c.sealed??null))err(p+'.sealed','use true, false or null');
  if(c.category==='heat'&&isNum(c.temperatureC)&&c.temperatureC<30)warn(p+'.category','heat cure below 30 °C — check the category');
  if(c.category==='ambient'&&isNum(c.temperatureC)&&c.temperatureC>=30)err(p+'.category','30 °C or above is a heat cure');
 });
 sheet.tests.forEach((t,i)=>{const p=`tests[${i}]`;
  const def=PROPERTIES[t.property];
  if(!def)err(p+'.property',`unknown property "${t.property}"`);
  else if(def.units&&!def.units.includes(t.unit))err(p+'.unit',`${t.property} uses ${def.units.join(' or ')}`);
  if(t.property==='other'&&(typeof t.propertyNote!=='string'||!t.propertyNote.trim()))err(p+'.propertyNote','explain what "other" measures');
  if(t.text!==undefined&&t.text!==null)grounded(p,t.text);
 });
 sheet.mixes.forEach((m,i)=>{const p=`mixes[${i}]`;
  if(corpus&&!inCorpus(corpus,[m.id,...(m.aliases||[])]))err(p+'.id','the mix id or one alias must appear in the reviewed notes as a whole name (do not invent mix names)');
  if(!FORMS.includes(m.form))err(p+'.form',`must be one of ${FORMS.join(', ')}`);
  if(typeof m.control!=='boolean')err(p+'.control','true or false');
  if(m.cure!==null&&m.cure!==undefined&&!cureIds.has(m.cure))err(p+'.cure',`unknown cure id "${m.cure}" (use null when not reported)`);
  if(m.baseMix!==undefined&&m.baseMix!==null){const base=sheet.mixes.find(x=>x.id===m.baseMix);if(!base||base.id===m.id)err(p+'.baseMix',`unknown base mix "${m.baseMix}"`);else if(base.baseMix)err(p+'.baseMix','a base mix cannot itself inherit (one level only)');grounded(p+'.baseText',m.baseText);}
  for(const k of ['quantities','parameters'])if(!Array.isArray(m[k]))err(`${p}.${k}`,'must be an array');
  (m.quantities||[]).forEach((q,j)=>{const qp=`${p}.quantities[${j}]`,mat=materialById.get(q.material);
   if(!mat)err(qp+'.material',`unknown material id "${q.material}"`);
   const optional=q.value===null&&q.unit===undefined&&q.basis===undefined; // an unknown amount may leave unit and basis out
   if(!optional){
    if(!UNITS.includes(q.unit))err(qp+'.unit',`must be one of ${UNITS.join(', ')}`);
    if(!BASES[q.basis])err(qp+'.basis',`must be one of ${Object.keys(BASES).join(', ')}`);
    else if(!BASIS_UNITS[q.basis].includes(q.unit))err(qp+'.unit',`"${q.unit}" does not fit basis "${q.basis}"`);
   }
   if(['binder-as-defined','volume','other'].includes(q.basis)&&!q.basisNote)err(qp+'.basisNote','explain this basis');
   if(q.value===null){if(!q.missing)err(qp+'.missing','null value needs a reason');}
   else if(!isNum(q.value)||q.value<0)err(qp+'.value','must be a non-negative number or null');
   if(!grounded(qp,q.text))return;
   if(isNum(q.value)&&!numberInText(q.value,q.text))err(qp+'.value',`${q.value} does not appear in the quoted text`);
   if(mat&&!mentions(q.text,[mat.name,...(mat.aliases||[])]))warn(qp+'.text',`quoted text does not name "${mat.name}"`);
  });
  (m.parameters||[]).forEach((x,j)=>{const xp=`${p}.parameters[${j}]`;
   if(!PARAMETERS[x.key])err(xp+'.key',`unknown parameter "${x.key}"`);
   if(!isNum(x.value))err(xp+'.value','must be a number');
   if(grounded(xp,x.text)&&isNum(x.value)&&!numberInText(x.value,x.text))err(xp+'.value',`${x.value} does not appear in the quoted text`);
  });
 });
 sheet.results.forEach((r,i)=>{const p=`results[${i}]`,mix=sheet.mixes.find(m=>m.id===r.mix),test=sheet.tests.find(t=>t.id===r.test);
  if(!mix)err(p+'.mix',`unknown mix "${r.mix}"`);
  if(!test)err(p+'.test',`unknown test "${r.test}"`);
  if(r.qualifier!==undefined&&!QUALIFIERS.includes(r.qualifier))err(p+'.qualifier',`must be one of ${QUALIFIERS.join(', ')}`);
  if(!isNum(r.value))err(p+'.value','must be a number; leave unreported results out and list them in gaps');
  if(r.ageDays===null||r.ageDays===undefined){if(!r.ageNote)err(p+'.ageNote','null age needs a note (e.g. fresh test, age not reported)');}
  else if(!isNum(r.ageDays)||r.ageDays<0)err(p+'.ageDays','must be a non-negative number or null');
  if(!grounded(p,r.text))return;
  if(isNum(r.value)&&!numberInText(r.value,r.text))err(p+'.value',`${r.value} does not appear in the quoted text`);
  for(const k of ['valueMax','spread'])if(r[k]!==undefined&&r[k]!==null&&(!isNum(r[k])||!numberInText(r[k],r.text)))err(`${p}.${k}`,'must be a number that appears in the quoted text');
  if(r.qualifier==='range'&&!isNum(r.valueMax))err(p+'.valueMax','a range needs valueMax');
  if(isNum(r.ageDays)&&!ageInText(r.ageDays,r.text+' '+(r.ageText||'')))warn(p+'.ageDays',`age ${r.ageDays} d is not visible in the quoted text — add ageText quoting where the age comes from`);
  if(r.ageText&&!grounded(p+'.ageText',r.ageText))return;
  if(r.condition!==undefined&&r.condition!==null&&!grounded(p+'.condition',r.condition))return;
  if(mix&&!mentions(r.text,[mix.id,...(mix.aliases||[])]))err(p+'.text',`quoted text must name the mix ("${mix.id}" or an alias) so the value cannot be misattributed`);
 });
 sheet.findings.forEach((f,i)=>{const p=`findings[${i}]`;
  if(typeof f.goal!=='string'||!f.goal.trim())err(p+'.goal','state the goal this mix was best for');
  if(!sheet.mixes.some(m=>m.id===f.mix))err(p+'.mix',`unknown mix "${f.mix}"`);
  grounded(p,f.text);
 });
 (sheet.notes||[]).forEach((n,i)=>{const p=`notes[${i}]`;
  if(!['failure','tradeoff','observation'].includes(n.kind))err(p+'.kind','use failure, tradeoff or observation');
  const mix=sheet.mixes.find(m=>m.id===n.mix);if(!mix)err(p+'.mix',`unknown mix "${n.mix}"`);
  if(grounded(p,n.text)&&mix&&!mentions(n.text,[mix.id,...(mix.aliases||[])]))err(p+'.text','quoted text must name the mix');
 });
 sheet.gaps.forEach((g,i)=>{if(typeof g!=='string'||!g.trim())err(`gaps[${i}]`,'must be text');});
 if(!sheet.gaps.length)warn('gaps','list what is still missing (every review-note sheet is partial)');
 const used=new Set(sheet.mixes.flatMap(m=>(m.quantities||[]).map(q=>q.material)));
 for(const id of materialIds)if(!used.has(id))warn('materials',`material "${id}" is not used by any mix quantity (fine if the paper names it without an amount)`);
 for(const id of testIds)if(!sheet.results.some(r=>r.test===id))warn('tests',`test "${id}" has no results`);
 for(const id of mixIds)if(!sheet.results.some(r=>r.mix===id)&&!(sheet.mixes.find(m=>m.id===id)?.quantities||[]).length)warn('mixes',`mix "${id}" has neither quantities nor results`);
 return {errors,warnings};
}

// ---------- compilation into table rows ----------
const lower=s=>String(s||'').toLowerCase();
const doiKey=s=>lower(String(s||'').replace(/^https?:\/\/(dx\.)?doi\.org\//i,''));
const FAMILY_RULES=[
 [/biochar/i,'biochar'],[/silica fume|silica dust|microsilica/i,'silica-fume'],[/steel slag|\bBOF\b/i,'steel-slag'],[/copper slag/i,'copper-slag'],
 [/steel fib/i,'steel-fiber'],[/basalt fib/i,'basalt-fiber'],[/\bPVA\b/i,'pva-fiber'],[/polypropylene|\bPP fib/i,'pp-fiber'],[/carbon (fib|text)/i,'carbon-fiber'],
 [/metakaolin|MK-750|kaolinitic clay|geocement/i,'metakaolin'],[/fly ash/i,'fly-ash'],[/slag|GGBS|GGBFS|GBFS|\bBFS\b/i,'slag'],
 [/NaOH|sodium hydroxide/i,'sodium-hydroxide'],[/KOH|potassium hydroxide/i,'potassium-hydroxide'],
 [/potassium disilicate powder/i,'potassium-silicate-solid'],[/potassium silicate|KASIL|potassium waterglass/i,'potassium-silicate-solution'],
 [/metasilicate/i,'sodium-silicate-solid'],[/silicate solution \+ added water/i,'other-activator'],[/sodium silicate|waterglass|water glass|Vitrosol|Reoflux|N-grade|D-grade/i,'sodium-silicate-solution'],
 [/sodium carbonate/i,'sodium-carbonate'],[/calcium hydroxide/i,'calcium-hydroxide'],[/magnesium hydroxide/i,'other-activator'],
 [/\d+\s*mm aggregate|coarse aggregate/i,'coarse-aggregate'],[/sand/i,'sand'],[/aggregate/i,'other-aggregate'],
 [/superplasticizer|\bPCE\b/i,'superplasticizer'],[/borax|sucrose/i,'retarder'],[/\bCMC\b|HPMC|cellulose/i,'viscosity-modifier'],
 [/^water$|added water|deionized water|tap water/i,'water'],[/SiC/,'other-precursor'],[/aluminosilicate/i,'other-precursor'],
];
export function familyOf(name,role=''){
 for(const [re,f] of FAMILY_RULES)if(re.test(name))return f;
 return role==='precursor'?'other-precursor':role==='activator'?'other-activator':role==='aggregate'?'other-aggregate':role==='water'?'water':'other-additive';
}
const PRECURSOR_ROLE=f=>FAMILIES[f]?.role==='precursor';
function activatorOf(families){
 const a=families.filter(f=>FAMILIES[f]?.role==='activator'),na=a.some(f=>f.startsWith('sodium')),k=a.some(f=>f.startsWith('potassium'));
 return na&&k?'mixed':na?'sodium':k?'potassium':a.includes('phosphoric-acid')?'phosphate':a.length?'other':'unknown';
}
// Precursor shares only when every listed precursor amount shares one unit and mass basis.
export function precursorShares(ingredients){
 const p=ingredients.filter(i=>PRECURSOR_ROLE(i.family));
 if(!p.length)return null;
 const massUnits=['g','kg','kg/m3','part','wt%','ratio'];
 if(p.some(i=>!isNum(i.value))||new Set(p.map(i=>i.unit+'|'+i.basis)).size!==1||!massUnits.includes(p[0].unit)||p[0].basis==='own-solution')return null;
 const total=p.reduce((n,i)=>n+i.value,0);if(!(total>0))return null;
 const shares={};for(const i of p)shares[i.family]=(shares[i.family]||0)+i.value/total*100;
 return Object.fromEntries(Object.entries(shares).map(([k,v])=>[k,Math.round(v*10)/10]));
}
function finishRow(row){
 const fams=row.ingredients.map(i=>i.family);
 const listed=[...new Set([...(row.precursorFamilies||[]),...fams.filter(PRECURSOR_ROLE)])];
 row.precursors=listed.sort();
 row.precursorSystem=row.precursors.length?row.precursors.join(' + '):'unknown';
 row.shares=row.shares||precursorShares(row.ingredients);
 row.activator=row.activator&&row.activator!=='unknown'?row.activator:activatorOf(fams);
 row.fibers=[...new Set(fams.filter(f=>FAMILIES[f]?.role==='fiber'))];
 row.additives=[...new Set(fams.filter(f=>FAMILIES[f]?.role==='additive'))];
 delete row.precursorFamilies;
 return row;
}
// Recipe curing notes are prose; this parser is deterministic and its output is shown beside the original text.
export function parseCure(text){
 const t=String(text||''),temp=t.match(/(\d+(?:\.\d+)?)(?:\s*±\s*\d+(?:\.\d+)?)?\s*°C/),T=temp?Number(temp[1]):null;
 const rh=t.match(/(\d+(?:\.\d+)?)\s*%\s*RH|RH\s*[≥>]?\s*(\d+(?:\.\d+)?)/i),hours=t.match(/(\d+(?:\.\d+)?)\s*h\b/);
 const moist=/moist|fog|moisture chamber|>\s*9\d\s*%\s*RH|≥\s*9\d/i.test(t);
 const category=T!==null&&T>=30?'heat':moist?'moist':/ambient|room|laborator|seal|°C/i.test(t)?'ambient':'unknown';
 return {category,temperatureC:T,durationHours:category==='heat'&&hours?Number(hours[1]):null,sealed:/seal|closed mold|covered|wrap|tape|bag/i.test(t)?true:null,
  humidityPercent:rh?Number(rh[1]||rh[2]):null,text:t,parsed:true};
}
const PILOT_PARAMS={'hydroxide concentration':'hydroxide-molarity','activator / metakaolin':'activator/precursor','sodium silicate solution / hydroxide solution':'silicate/hydroxide',
 'Na2O equivalent':'alkali-dose','deionized water / binder':'water/binder','activator SiO2/Na2O':'activator-modulus'};
const PILOT_PROPERTIES={compression:'compressive-strength',flexure:'flexural-strength','fresh-spread-before-drop':'flow','fresh-spread-after-drop':'flow','shape-retention-ratio':'shape-retention'};
const PILOT_BINDERS={metakaolin:['metakaolin'],'fly-ash-slag':['fly-ash','slag'],'metakaolin-slag':['metakaolin','slag']};
const unitOf=(u,basis='')=>u==='kg/m³'?'kg/m3':u==='%'&&/mass/i.test(basis)?'wt%':u;
// Specimen form from each pilot study's mixing method: sand is added for 211/2944, printed mortar for 902, MK paste for 5396; 2957 does not state it.
const PILOT_FORMS={'ke-211':'mortar','ke-2944':'mortar','ke-902':'printed','ke-5396':'paste','ke-2957':'unknown'};
export function pilotRows(pilot,{library=[],guidesByDoi=new Map()}={}){
 const pubs=new Map(library.map(p=>[p.id,p]));
 return pilot.mixes.map(m=>{
  const pub=pubs.get(m.publicationId)||{},doi=doiKey(pub.doi),guide=guidesByDoi.get(doi);
  const obs=pilot.observations.filter(o=>o.mixId===m.id&&isNum(o.value)&&o.qualifier!=='estimated');
  const tests=new Map(pilot.tests.map(t=>[t.id,t]));
  const pick=n=>/hydroxide/i.test(n)?(m.activation==='potassium'?'potassium-hydroxide':'sodium-hydroxide'):/^silicate solution$/i.test(n)?(m.activation==='potassium'?'potassium-silicate-solution':'sodium-silicate-solution'):familyOf(n);
  const ingredients=m.quantities.filter(q=>!PILOT_PARAMS[q.material]).map(q=>({name:q.material,family:pick(q.material),role:FAMILIES[pick(q.material)]?.role,value:q.value,unit:unitOf(q.unit,q.basis),basis:q.basis,text:q.originalText}));
  const parameters=m.quantities.filter(q=>PILOT_PARAMS[q.material]).map(q=>({key:PILOT_PARAMS[q.material],label:PARAMETERS[PILOT_PARAMS[q.material]].label,value:q.value,unit:PARAMETERS[PILOT_PARAMS[q.material]].unit,text:`${q.material}: ${q.originalText} (${q.basis})`}));
  const results=obs.map(o=>{const t=tests.get(o.testId);return {property:PILOT_PROPERTIES[o.property]||o.property,value:o.value,unit:unitOf(o.unit),ageDays:o.ageDays,qualifier:o.qualifier,spread:o.uncertainty,
   specimen:t?.geometry||null,method:t?.method||null,context:o.property.startsWith('fresh-spread')?o.property.replace('fresh-spread-','spread '):[/-single$/.test(o.testId)?'single printed layer':'',t?.direction?'loading '+t.direction:''].filter(Boolean).join(', '),text:o.originalText,locator:o.provenance?.locator||'',cure:t?.cure?.category||null};});
  // One cure per study: its main strength test, so every mix of a paper carries the same regime.
  const pubTests=pilot.tests.filter(t=>t.publicationId===m.publicationId);
  const cureTest=(pubTests.find(t=>t.property==='compression')||pubTests.find(t=>t.cure?.category!=='not-applicable')||pubTests[0])?.cure||null;
  // A one-precursor binder is 100% that precursor; a two-precursor pilot binder records its slag share.
  const binder=PILOT_BINDERS[m.binder]||[],round1=v=>Math.round(v*10)/10;
  const binderShares=binder.length===1?{[binder[0]]:100}:binder.length===2&&m.slagPercent!==null?{[binder[1]]:round1(m.slagPercent),[binder[0]]:round1(100-m.slagPercent)}:null;
  const row={id:'pilot:'+m.id,origin:'pilot',evidence:'source-checked',label:m.originalId,control:/^(GP0|S0-10)$/.test(m.originalId),
   paper:{key:doi,doi,title:pub.title||'',year:pub.year||null,guideId:guide?.id||null,studyId:m.publicationId},
   form:PILOT_FORMS[m.publicationId]||'unknown',precursorFamilies:PILOT_BINDERS[m.binder]||[],activator:m.activation==='mixed-na-k'?'mixed':m.activation,
   ingredients,parameters,shares:precursorShares(ingredients)||binderShares,
   cure:cureTest?{category:cureTest.category,temperatureC:cureTest.temperatureC,durationHours:isNum(cureTest.durationDays)?cureTest.durationDays*24:null,sealed:cureTest.sealed,humidityPercent:cureTest.humidityPercent,text:cureTest.durationReason||''}:null,
   results,findings:[],gaps:[],locator:m.provenance?.locator||'',
   links:{study:'/studies/'+m.publicationId,guide:guide?'/deep-dives/'+guide.id:null,recipe:null,source:pub.url||(doi?'https://doi.org/'+doi:null)}};
  return finishRow(row);
 });
}
const CATALOG_PROPERTIES={compressive:'compressive-strength',flexural:'flexural-strength'};
export function catalogRows(recipes,{guidesByDoi=new Map(),studyByDoi=new Map()}={}){
 return recipes.map(r=>{
  const doi=doiKey(r.url).startsWith('10.')?doiKey(r.url):'',guide=guidesByDoi.get(doi);
  const ingredients=r.ingredients.map(i=>{const family=familyOf(i.name,i.role);return {name:i.name,family,role:FAMILIES[family]?.role||i.role,value:isNum(i.mass)?i.mass:null,unit:'part',basis:'catalog proportion',text:String(i.mass??'unknown')};});
  const label=r.title.includes(' · ')?r.title.split(' · ').slice(1).join(' · '):r.title;
  return finishRow({id:'recipe:'+r.id,origin:'catalog',evidence:'source-checked',label,control:/control|GP0\b|MH-0|\bPW\b/i.test(r.title),
   paper:{key:doi||lower(r.url),doi,title:guide?.sourceTitle||r.family||r.title,year:r.year||null,guideId:guide?.id||null,studyId:studyByDoi.get(doi)||null},
   form:r.form||(/mortar/i.test(r.title)?'mortar':/concrete/i.test(r.title)?'concrete':/paste/i.test(r.title)?'paste':'unknown'),precursorFamilies:[],activator:r.activation==='mixed'?'mixed':r.activation||'unknown',ingredients,parameters:[],
   cure:parseCure(r.curing),basisNote:r.basis,scalable:!!r.scalable,
   results:(r.results||[]).filter(x=>isNum(x.value)).map(x=>({property:CATALOG_PROPERTIES[x.property]||x.property,value:x.value,unit:x.unit||'MPa',ageDays:isNum(x.ageHours)?x.ageHours/24:null,qualifier:'reported',spread:isNum(x.spread)?x.spread:null,specimen:r.method||null,method:r.method||null,context:x.context||'',text:String(x.value),locator:r.locator||''})),
   findings:[],gaps:r.limitations?[r.limitations]:[],locator:r.locator||'',
   links:{study:studyByDoi.get(doi)?'/studies/'+studyByDoi.get(doi):null,guide:guide?'/deep-dives/'+guide.id:null,recipe:'/formulations/'+r.id,source:r.fullText||r.url}});
 });
}
export function sheetRows(sheet,{guide,studyId=null,title='',year=null}={}){
 const mats=new Map(sheet.materials.map(m=>[m.id,m])),cures=new Map(sheet.cures.map(c=>[c.id,c])),tests=new Map(sheet.tests.map(t=>[t.id,t]));
 const doi=doiKey(sheet.doi);
 return sheet.mixes.map(m=>{
  const cure=cures.get(m.cure);
  const base=m.baseMix?sheet.mixes.find(x=>x.id===m.baseMix):null,own=new Set(m.quantities.map(q=>q.material));
  const quantities=[...(base?base.quantities.filter(q=>!own.has(q.material)).map(q=>({...q,inherited:base.id,inheritText:m.baseText})):[]),...m.quantities];
  const ingredients=quantities.map(q=>{const mat=mats.get(q.material);return {name:mat.name,family:mat.family,role:mat.role,value:q.value,unit:q.unit||'',basis:q.basis||'',basisNote:q.basisNote||'',text:q.text,missing:q.missing||'',inherited:q.inherited||null,inheritText:q.inheritText||''};});
  return finishRow({id:`sheet:${sheet.guideId}:${m.id}`,origin:'sheet',evidence:sheet.basis==='review-note'?'review-note':'source-checked',label:m.id,aliases:m.aliases||[],control:m.control,
   paper:{key:doi,doi,title:title||guide?.sourceTitle||'',year,guideId:sheet.guideId,studyId},
   form:m.form,precursorFamilies:[],activator:'unknown',ingredients,
   parameters:[...(base?base.parameters.filter(x=>!m.parameters.some(y=>y.key===x.key)):[]),...m.parameters].map(x=>({key:x.key,label:PARAMETERS[x.key].label,value:x.value,unit:x.basisNote?`${PARAMETERS[x.key].unit.replace(/^(mass|molar|atomic) /,'')} (${x.basisNote})`:PARAMETERS[x.key].unit,text:x.text})),
   cure:cure?{category:cure.category,temperatureC:cure.temperatureC??null,durationHours:isNum(cure.duration)?(cure.durationUnit==='d'?cure.duration*24:cure.duration):null,sealed:cure.sealed??null,humidityPercent:cure.humidityPercent??null,text:cure.text}:null,
   results:sheet.results.filter(r=>r.mix===m.id).map(r=>{const t=tests.get(r.test);return {property:t.property,propertyNote:t.propertyNote||'',value:r.value,valueMax:r.valueMax??null,unit:t.unit,ageDays:r.ageDays??null,ageNote:r.ageNote||'',qualifier:r.qualifier||'reported',spread:r.spread??null,specimen:t.specimen||null,method:t.method||null,context:r.condition||'',text:r.text,locator:r.locator||''};}),
   findings:sheet.findings.filter(f=>f.mix===m.id).map(f=>({goal:f.goal,text:f.text})),notes:(sheet.notes||[]).filter(n=>n.mix===m.id).map(n=>({kind:n.kind,text:n.text})),gaps:[...(m.missing||[]),...sheet.gaps],locator:sheet.locator||'',scope:sheet.scope,
   links:{study:studyId?'/studies/'+studyId:null,guide:'/deep-dives/'+sheet.guideId,recipe:null,source:guide?.source||'https://doi.org/'+sheet.doi}});
 });
}
// Pilot records are canonical; a matching catalog recipe contributes its gram ledger and link.
export function compileMixTable({sheets=[],recipes=[],pilot={mixes:[]},library=[],guides=[],generated=''}={}){
 const guidesByDoi=new Map(guides.map(g=>[doiKey(g.doi),g])),studyByDoi=new Map(library.map(p=>[doiKey(p.doi),p.id]));
 const pRows=pilotRows(pilot,{library,guidesByDoi}),cRows=catalogRows(recipes,{guidesByDoi,studyByDoi});
 const merged=[];
 for(const c of cRows){
  const match=pRows.find(p=>p.paper.key===c.paper.key&&p.paper.key&&new RegExp('(^|[^\\w.-])'+p.label.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'([^\\w.-]|$)').test(c.label));
  if(match){match.links.recipe=c.links.recipe;match.recipeIngredients=c.ingredients;match.scalable=c.scalable;match.basisNote=c.basisNote;if(!match.results.length)match.results=c.results;merged.push(c.id);}
 }
 const sRows=sheets.flatMap(({sheet,guide,studyId,title,year})=>sheetRows(sheet,{guide,studyId,title,year}));
 const rows=[...pRows,...cRows.filter(c=>!merged.includes(c.id)),...sRows];
 const papers=[...new Set(rows.map(r=>r.paper.key))];
 return {format:TABLE_FORMAT,generated,notice:'Derived view over the formulation catalog, knowledge pilot and mix sheets. Values keep their original text, unit and basis. Cross-paper rows come from different laboratories and are not controlled comparisons; no pooled ranking is implied.',
  counts:{rows:rows.length,papers:papers.length,withResults:rows.filter(r=>r.results.length).length,bySource:{pilot:pRows.length,catalog:cRows.length-merged.length,sheet:sRows.length},mergedCatalogRecipes:merged.length},
  rows};
}

// ---------- explorer logic (browser and tests) ----------
export const AXES={
 'share:slag':{label:'Slag share of precursor (%)',value:r=>r.shares?.slag??(r.shares&&r.precursors.length?0:null)},
 'share:fly-ash':{label:'Fly ash share of precursor (%)',value:r=>r.shares?.['fly-ash']??(r.shares&&r.precursors.length?0:null)},
 'share:metakaolin':{label:'Metakaolin share of precursor (%)',value:r=>r.shares?.metakaolin??(r.shares&&r.precursors.length?0:null)},
 ...Object.fromEntries(Object.entries(PARAMETERS).map(([k,v])=>['param:'+k,{label:`${v.label} (${v.unit})`,value:r=>r.parameters.find(p=>p.key===k)?.value??null}])),
 'cure:temperature':{label:'Cure temperature (°C)',value:r=>r.cure?.temperatureC??null},
};
export const endpointKey=(property,ageDays)=>`${property}@${ageDays??'na'}`;
export function endpoints(rows){
 const map=new Map();
 for(const r of rows)for(const x of r.results){const k=endpointKey(x.property,x.ageDays),e=map.get(k)||{key:k,property:x.property,ageDays:x.ageDays,unit:x.unit,label:`${PROPERTIES[x.property]?.label||x.property} · ${x.ageDays===null?'age n/a':x.ageDays+' d'} (${x.unit})`,rows:new Set()};e.rows.add(r.id);map.set(k,e);}
 return [...map.values()].map(e=>({...e,count:e.rows.size,rows:undefined})).sort((a,b)=>b.count-a.count);
}
// One value per row for an endpoint: if a mix has several (e.g. directions), prefer the uncontextualized value, else the first.
export function endpointValue(row,key){
 const hits=row.results.filter(x=>endpointKey(x.property,x.ageDays)===key);
 if(!hits.length)return null;
 const h=hits.find(x=>!x.context)||hits[0];
 return {value:h.value,unit:h.unit,result:h,count:hits.length};
}
export function filterRows(rows,{q='',precursor='',activator='',cure='',form='',evidence='',endpoint='',paper=''}={}){
 const words=normalizeText(q).split(' ').filter(Boolean);
 return rows.filter(r=>{
  if(precursor&&!r.precursors.includes(precursor))return false;
  if(activator&&r.activator!==activator)return false;
  if(cure&&(r.cure?.category||'unknown')!==cure)return false;
  if(form&&r.form!==form)return false;
  if(evidence&&r.evidence!==evidence)return false;
  if(paper&&r.paper.key!==paper)return false;
  if(endpoint&&!endpointValue(r,endpoint))return false;
  if(words.length){const hay=normalizeText([r.label,r.paper.title,r.paper.doi,r.precursorSystem,r.activator,r.form,...r.ingredients.map(i=>i.name+' '+i.family),...r.parameters.map(p=>p.label),r.cure?.text].join(' '));if(!words.every(w=>hay.includes(w)))return false;}
  return true;
 });
}
const fmt=v=>isNum(v)?String(Math.round(v*1000)/1000):'—';
export const familyLabel=f=>FAMILIES[f]?.label.split(' (')[0]||f;
export const systemLabel=r=>r.precursors.map(familyLabel).join(' + ');
export const hoursText=h=>h%24===0&&h>=48?h/24+' d':h+' h';
const cureText=c=>!c?'unknown':[CURE_CATEGORIES[c.category]?.split(' (')[0]||c.category,isNum(c.temperatureC)?c.temperatureC+' °C':'',isNum(c.durationHours)?hoursText(c.durationHours):'',c.sealed===true?'sealed':c.sealed===false?'unsealed':''].filter(Boolean).join(' · ');
export function shareText(r){return r.shares?Object.entries(r.shares).map(([f,v])=>`${familyLabel(f)} ${v}%`).join(' / '):r.precursors.map(familyLabel).join(' + ')||'—';}
// Attribute-aligned comparison. Status per row: same | different | unknown (any cell missing).
export function compareRows(rows){
 const attrs=[
  ['Paper',r=>r.paper.title?(r.paper.title+(r.paper.year?` (${r.paper.year})`:'')):r.paper.key],
  ['Form',r=>r.form==='unknown'?null:r.form],['Precursors',r=>r.precursors.length?systemLabel(r):null],['Precursor shares',r=>r.shares?shareText(r):null],
  ['Activator',r=>r.activator==='unknown'?null:r.activator],['Fibers',r=>r.fibers.length?r.fibers.map(familyLabel).join(', '):'none listed'],
  ['Cure',r=>r.cure&&r.cure.category!=='unknown'?cureText(r.cure):null],
 ];
 const paramKeys=[...new Set(rows.flatMap(r=>r.parameters.map(p=>p.key)))];
 for(const k of paramKeys)attrs.push([PARAMETERS[k]?.label||k,r=>{const p=r.parameters.find(p=>p.key===k);return p?fmt(p.value):null;}]);
 const eps=endpoints(rows).filter(e=>e.count>=1).slice(0,8);
 for(const e of eps)attrs.push([e.label,r=>{const v=endpointValue(r,e.key);return v?fmt(v.value)+(v.count>1?' (first of '+v.count+')':''):null;}]);
 const table=attrs.map(([label,get])=>{const cells=rows.map(get),known=cells.filter(c=>c!==null&&c!==undefined&&c!=='');return {label,cells,status:known.length<cells.length?'unknown':new Set(known).size===1?'same':'different'};});
 const differences=table.filter(t=>t.status==='different'&&t.label!=='Paper').map(t=>`${t.label}: ${rows.map((r,i)=>`${r.label} ${t.cells[i]}`).join('; ')}`);
 const samePaper=new Set(rows.map(r=>r.paper.key)).size===1;
 return {table,differences,samePaper,note:samePaper?'Same paper: a controlled series, the most direct comparison available here.':'Different papers: laboratories, materials and methods differ. Treat differences as leads to check, not causes.'};
}
// Similarity: shared precursors, activator, form and cure plus closeness of shared numeric settings. Explainable, not a model.
export function similarMixes(target,rows,limit=5){
 const scored=rows.filter(r=>r.id!==target.id).map(r=>{
  const why=[],a=new Set(target.precursors),b=new Set(r.precursors),inter=[...a].filter(x=>b.has(x)),union=new Set([...a,...b]);
  let score=0,weight=0;
  if(union.size){score+=3*inter.length/union.size;weight+=3;if(inter.length)why.push('shares '+inter.map(familyLabel).join(' + '));}
  if(target.activator!=='unknown'&&r.activator!=='unknown'){weight+=2;if(target.activator===r.activator){score+=2;why.push(r.activator+' activator');}}
  if(target.cure?.category&&r.cure?.category&&target.cure.category!=='unknown'&&r.cure.category!=='unknown'){weight+=1;if(target.cure.category===r.cure.category){score+=1;why.push(r.cure.category+' cure');}}
  weight+=1;if(target.form===r.form){score+=1;why.push(r.form);}
  if(target.shares&&r.shares){const keys=new Set([...Object.keys(target.shares),...Object.keys(r.shares)]);const d=[...keys].reduce((n,k)=>n+Math.abs((target.shares[k]||0)-(r.shares[k]||0)),0);weight+=2;score+=2*(1-Math.min(1,d/200));if(d<=20)why.push('similar precursor shares');}
  for(const p of target.parameters){const q=r.parameters.find(x=>x.key===p.key);if(q&&isNum(p.value)&&isNum(q.value)){const s=1-Math.min(1,Math.abs(p.value-q.value)/Math.max(Math.abs(p.value),Math.abs(q.value),1e-9));weight+=1;score+=s;if(s>=0.9)why.push('similar '+(PARAMETERS[p.key]?.label||p.key).toLowerCase());}}
  return {row:r,score:weight?score/weight:0,why,samePaper:r.paper.key===target.paper.key};
 }).filter(x=>x.score>0);
 const other=scored.filter(x=>!x.samePaper).sort((x,y)=>y.score-x.score).slice(0,limit);
 return {otherPapers:other,samePaperCount:scored.filter(x=>x.samePaper).length};
}
// Best mix inside each paper for one endpoint. Only papers with two or more mixes on the same endpoint qualify.
export function withinPaperBest(rows,key){
 const [property]=key.split('@'),direction=PROPERTIES[property]?.direction;
 if(!direction)return {direction:null,winners:[],papers:0};
 const byPaper=new Map();
 for(const r of rows){const v=endpointValue(r,key);if(v)(byPaper.get(r.paper.key)||byPaper.set(r.paper.key,[]).get(r.paper.key)).push({row:r,value:v.value});}
 const winners=[];
 for(const list of byPaper.values()){if(list.length<2)continue;list.sort((a,b)=>direction==='higher'?b.value-a.value:a.value-b.value);winners.push({...list[0],of:list.length,tie:list.length>1&&list[1].value===list[0].value});}
 return {direction,winners,papers:winners.length};
}
export function winnerTraits(winners){
 const n=winners.length,count=get=>{const m=new Map();for(const w of winners)for(const v of [].concat(get(w.row)).filter(Boolean))m.set(v,(m.get(v)||0)+1);return [...m.entries()].filter(([,c])=>c>=2).sort((a,b)=>b[1]-a[1]);};
 return {n,traits:[...count(r=>r.precursors).map(([v,c])=>`${c} of ${n} include ${FAMILIES[v]?.label||v}`),...count(r=>r.activator!=='unknown'?r.activator:null).map(([v,c])=>`${c} of ${n} use a ${v} activator`),
  ...count(r=>r.cure?.category&&r.cure.category!=='unknown'?r.cure.category:null).map(([v,c])=>`${c} of ${n} use ${CURE_CATEGORIES[v]?.toLowerCase()||v} curing`),...count(r=>['unknown','other'].includes(r.form)?null:r.form).map(([v,c])=>`${c} of ${n} are ${v}${v.endsWith('s')?'':'s'}`)]};
}
