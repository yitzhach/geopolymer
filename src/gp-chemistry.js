// Oxide bookkeeping, not a reaction, phase-equilibrium or performance model.
export const MW = Object.freeze({SiO2:60.0843,Al2O3:101.9613,Na2O:61.9789,K2O:94.196,CaO:56.0774,MgO:40.3044,Fe2O3:159.688,H2O:18.01528,NaOH:39.99709,KOH:56.10564});
export const OXIDES=['SiO2','Al2O3','Na2O','K2O','CaO','MgO','Fe2O3'];
export const SPECIES=[...OXIDES,'NaOH','KOH','H2O','Other'];
export const ROLES=['precursor','activator','water','aggregate','additive'];
export const METRICS={
 siAl:{label:'Si / Al',numerator:'Si',denominator:'Al',unit:'atomic'},
 oxideSiAl:{label:'SiO₂ / Al₂O₃',numerator:'SiO2',denominator:'Al2O3',unit:'molar'},
 naAl:{label:'Na / Al',numerator:'Na',denominator:'Al',unit:'atomic'},
 kAl:{label:'K / Al',numerator:'K',denominator:'Al',unit:'atomic'},
 alkaliAl:{label:'(Na + K) / Al',numerator:'alkali',denominator:'Al',unit:'atomic'},
 caSi:{label:'Ca / Si',numerator:'Ca',denominator:'Si',unit:'atomic'},
 binderModulus:{label:'Binder SiO₂ / (Na₂O + K₂O)',unit:'molar'},
 activatorModulus:{label:'Activator SiO₂ / (Na₂O + K₂O)',unit:'molar'},
 physicalWaterAlkali:{label:'Physical H₂O / (Na₂O + K₂O)',unit:'molar'},
 equivalentWaterAlkali:{label:'Equivalent H₂O / (Na₂O + K₂O)',unit:'molar'},
 waterSolids:{label:'Physical water / non-water binder mass',unit:'mass'},
 naEquivalentPct:{label:'Activator Na₂O equivalent / dry precursor',unit:'mass %'}
};
const divide=(a,b)=>b>0?a/b:null;
const num=(v,label,max=1e9)=>{if((typeof v!=='number'&&typeof v!=='string')||String(v).trim()===''||!Number.isFinite(Number(v))||Number(v)<0||Number(v)>max)throw Error(label+' must be a finite, nonnegative number (maximum '+max+').');return Number(v);};
const text=(v,max)=>String(v??'').slice(0,max);
export function normalizeRecipe(input){
 if(!input||!Array.isArray(input.rows)||input.rows.length<1||input.rows.length>50)throw Error('Use 1–50 ingredient rows.');
 const rows=input.rows.map((r,i)=>{
  if(!r||!ROLES.includes(r.role)||typeof r.include!=='boolean')throw Error('Invalid ingredient role or chemistry scope.');
  const comp={};for(const k of SPECIES)comp[k]=num(r.comp?.[k]??0,`${r.name||'Row '+(i+1)} ${k} percentage`,100);
  if(SPECIES.reduce((n,k)=>n+comp[k],0)>100.000001)throw Error((r.name||'Row '+(i+1))+': composition exceeds 100%. Do not enter hydroxide and its oxide equivalent twice.');
  return {id:String(i),name:text(r.name,160)||'Unnamed ingredient',role:r.role,include:r.include,mass:num(r.mass,'Ingredient mass'),catalogId:text(r.catalogId,100),density:r.density==null||r.density===''?null:num(r.density,'Liquid density',10)||null,source:text(r.source,500),provenance:{kind:['unknown','assumption','supplier','paper','measured'].includes(r.provenance?.kind)?r.provenance.kind:'unknown',supplier:text(r.provenance?.supplier,160),lot:text(r.provenance?.lot,160),basis:text(r.provenance?.basis,500)},comp};
 });
 return {name:text(input.name,180)||'Untitled mix',rows};
}
const empty=()=>Object.fromEntries([...OXIDES,'H2O'].map(k=>[k,0]));
export function calculate(input){
 const recipe=normalizeRecipe(input),grams=empty(),activator=empty(),warnings=[],contributions=[];
 let total=0,binderMass=0,physicalWater=0,precursorDry=0,unassigned=0;
 for(const row of recipe.rows){
  total+=row.mass;
  const g=empty();for(const k of [...OXIDES,'H2O'])g[k]=row.mass*row.comp[k]/100;
  // 2 MOH = M2O + H2O is an accounting identity, not a mixing instruction.
  const nh=row.mass*row.comp.NaOH/100/MW.NaOH/2,kh=row.mass*row.comp.KOH/100/MW.KOH/2;
  g.Na2O+=nh*MW.Na2O;g.K2O+=kh*MW.K2O;g.H2O+=(nh+kh)*MW.H2O;
  const physical=row.mass*row.comp.H2O/100;
  const sum=SPECIES.reduce((n,k)=>n+row.comp[k],0),missing=row.mass*(100-sum)/100;
  contributions.push({name:row.name,include:row.include,mass:row.mass,grams:g,physicalWater:physical,unassigned:missing});
  if(!row.include||!row.mass)continue;
  binderMass+=row.mass;physicalWater+=physical;unassigned+=missing;
  if(row.role==='precursor')precursorDry+=row.mass-physical;
  for(const k of Object.keys(g)){grams[k]+=g[k];if(row.role==='activator')activator[k]+=g[k];}
  if(sum<99.999)warnings.push(`${row.name}: ${(100-sum).toFixed(2)}% unassigned. Ratios are partial until composition is complete; do not fill unknown chemistry with guessed water.`);
  if(row.provenance.kind==='unknown'||row.provenance.kind==='assumption')warnings.push(`${row.name}: composition evidence is ${row.provenance.kind}; these ratios are input accounting, not verified material chemistry.`);
  if(!row.provenance.basis.trim())warnings.push(`${row.name}: original assay basis / conversion not documented. Confirm percentages are as supplied.`);
  if(!row.source.trim())warnings.push(`${row.name}: no assay/source note supplied.`);
  if(row.role==='aggregate')warnings.push(`${row.name}: aggregate included in chemistry by your selection. Bulk mineral Si/Al does not imply reactive Si/Al.`);
 }
 if(!binderMass)warnings.push('No positive-mass ingredient is included in binder chemistry.');
 if(!grams.Al2O3)warnings.push('No reported aluminum contribution; Al-denominator ratios are undefined.');
 if(!grams.Na2O&&!grams.K2O)warnings.push('No reported sodium or potassium contribution; alkali-denominator ratios are undefined.');
 if(grams.CaO)warnings.push('Calcium is present. These totals do not predict C-(A)-S-H / N-A-S-H phases or transfer metakaolin targets to slag blends.');
 const moles=Object.fromEntries(Object.entries(grams).map(([k,v])=>[k,v/MW[k]]));
 const atoms={Si:moles.SiO2,Al:2*moles.Al2O3,Na:2*moles.Na2O,K:2*moles.K2O,Ca:moles.CaO,alkali:2*(moles.Na2O+moles.K2O)};
 const alk=moles.Na2O+moles.K2O,actAlk=activator.Na2O/MW.Na2O+activator.K2O/MW.K2O;
 const ratios={};for(const [k,d]of Object.entries(METRICS)){if(d.numerator)ratios[k]=divide(({...moles,...atoms})[d.numerator],({...moles,...atoms})[d.denominator]);}
 Object.assign(ratios,{binderModulus:divide(moles.SiO2,alk),activatorModulus:divide(activator.SiO2/MW.SiO2,actAlk),physicalWaterAlkali:divide(physicalWater/MW.H2O,alk),equivalentWaterAlkali:divide(moles.H2O,alk),waterSolids:divide(physicalWater,binderMass-physicalWater),naEquivalentPct:divide(actAlk*MW.Na2O*100,precursorDry)});
 return {recipe,total,binderMass,physicalWater,precursorDry,unassigned,grams,moles,atoms,ratios,contributions,warnings};
}
export function targetGap(result,key,value){
 const d=METRICS[key];if(!d?.numerator)throw Error('Unsupported target.');
 const t=num(value,'Target ratio',1000);if(t<=0)throw Error('Target ratio must be greater than zero.');
 const totals={...result.moles,...result.atoms};const denominator=totals[d.denominator];
 if(denominator<=0)return {defined:false,message:'No denominator contribution; a target gap cannot be calculated.'};
 return {defined:true,deltaMoles:t*denominator-totals[d.numerator],numerator:d.numerator,denominator:d.denominator,target:t};
}
export function scaleRecipe(input,target){const recipe=normalizeRecipe(input),sum=recipe.rows.reduce((n,r)=>n+r.mass,0);const t=num(target,'Target batch mass');if(sum<=0||t<=0)throw Error('Current and target batch mass must be greater than zero.');return normalizeRecipe({...recipe,rows:recipe.rows.map(r=>({...r,mass:r.mass*t/sum}))});}
const row=(name,role,mass,comp={},source='')=>({name,role,mass,include:role!=='aggregate',comp,source});
export function template(kind='demo'){
 if(kind==='demo')return normalizeRecipe({name:'Arithmetic demonstration — not a validated recipe',rows:[row('Illustrative precursor','precursor',100,{SiO2:55,Al2O3:40,Other:5},'Synthetic teaching composition; not a supplier grade'),row('Illustrative sodium silicate solution','activator',50,{SiO2:25,Na2O:10,H2O:65},'Synthetic teaching composition; not a supplier grade'),row('Added water','water',10,{H2O:100},'Water accounting assumption')]});
 const names={metakaolin:['Metakaolin'],blend:['Metakaolin','Slag'],ash:['Fly ash'],custom:['Custom precursor']}[kind]||['Custom precursor'];
 return normalizeRecipe({name:'New '+kind+' study',rows:[...names.map(n=>row(n,'precursor',0)),row('Activator — enter actual solution assay','activator',0),row('Added water','water',0,{H2O:100},'Water accounting assumption')]});
}
export function parseProject(data){
 if(!data||data.version!==1)throw Error('Unsupported calculator file version.');
 const recipe=normalizeRecipe(data.recipe),baseline=data.baseline?normalizeRecipe(data.baseline):null,targets={};
 for(const k of ['siAl','alkaliAl','caSi']){const v=data.targets?.[k];targets[k]=v==null||v===''?'':num(v,'Target',1000);if(targets[k]===0)throw Error('Targets must be greater than zero or blank.');}
 const study={}; for(const key of ['sourceId','citation','locator','adaptations','curing','results','targetBasis']) study[key]=text(data.study?.[key],key==='sourceId'?80:2000);
 return {version:1,recipe,baseline,targets,study};
}
