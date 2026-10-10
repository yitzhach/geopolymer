import {literatureMixes} from './literature-mixes.js';
export const testAges=[1,4,24,72,168,336,672];
export const ageLabels=['1 hour','4 hours','24 hours','72 hours','1 week','2 weeks','28 days'];
export function selectRecipes({query='',activation='',evidence=''}={}){
 const q=query.trim().toLowerCase();
 return literatureMixes.filter(m=>(!activation||m.activation===activation)&&(!evidence||m.type===evidence)&&(!q||[m.title,m.authors,m.system,m.family,m.summary,...m.ingredients.map(r=>r.name)].join(' ').toLowerCase().includes(q)));
}
export function planRequirements({property='compressive',target='',ageHours=672,thickness='',notes=''}={}){
 if(!['compressive','flexural','shear','bond','thin'].includes(property))throw Error('Choose a supported goal.');
 ageHours=Number(ageHours);if(!testAges.includes(ageHours))throw Error('Choose a listed test age.');
 const value=target===''?null:Number(target),mm=thickness===''?null:Number(thickness);
 if(value!==null&&(!Number.isFinite(value)||value<=0||value>1000))throw Error('Enter a strength above 0 and at most 1,000 MPa.');
 if(mm!==null&&(!Number.isFinite(mm)||mm<=0||mm>1000))throw Error('Enter a thickness above 0 and at most 1,000 mm.');
 if(property==='thin'&&mm===null)throw Error('Enter the intended layer thickness.');
 if(property!=='thin'&&value===null)throw Error('Enter the desired strength in MPa.');
 const matches=property==='thin'?[]:literatureMixes.flatMap(m=>m.results.filter(r=>r.property===property&&r.ageHours===ageHours&&r.value>=value).map(r=>({id:m.id,title:m.title,url:m.url,result:r,curing:m.curing,method:m.method})));
 const guidance={
  compressive:'Use the exact age and cure as comparison criteria. Trial compatible water-reducing admixtures only after checking their grade and water contribution; do not assume added alkali raises strength.',
  flexural:'Plan fiber type, length, volume fraction, dispersion and flexural test geometry together. Compression does not establish bending performance.',
  shear:'Specify direct shear, slant-shear or interface shear and the substrate. Tensile bond and flexural values cannot substitute for shear tests.',
  bond:'Define substrate and loading mode. Printed interlayer tension is not evidence of adhesion to a wood panel or existing concrete.',
  thin:'Plan a coupon at the actual thickness and substrate. Screen fine aggregate grading, shrinkage, adhesion and a compatible viscosity modifier; fiber length and finish need separate trials.'
 }[property];
 return {version:1,kind:'experiment-requirements',createdAt:new Date().toISOString(),goal:{property,targetMPa:property==='thin'?null:value,ageHours,thicknessMm:mm,notes:String(notes).slice(0,4000)},status:'Planning only — no virtual strength model is active',matches,guidance,testSchedule:testAges.map((h,i)=>({ageHours:h,label:ageLabels[i],predictedStrength:null})),limitations:['Matches are literature observations under the displayed conditions, not a forecast for your batch.','No inferred values at missing ages. No conversion between compression, flexure, bond and shear.','Admixture suggestions are screening ideas; no dosage or compatibility is established.']};
}
export function catalogExport(){return {schemaVersion:1,exportedAt:new Date().toISOString(),recordCount:literatureMixes.length,scope:'Curated public literature records; no private notebook data',records:literatureMixes};}
