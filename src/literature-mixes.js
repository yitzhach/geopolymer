import {recipeAdditions} from './recipe-additions.js';
import {parseProject,scaleRecipe} from './gp-chemistry.js';
const workshop='https://geopolymer.org/fichiers/gpcamp-2011/Davidovits%20-%20Geopolymer%20Cement.pdf';
const patent='https://patents.google.com/patent/US20100010139A1/en';
const row=(name,mass,role='precursor',comp={})=>({name,mass,role,include:role!=='aggregate',comp});
export const literatureMixes=[
 {id:'davidovits-mk-slag',title:'Davidovits · metakaolin / slag',authors:'Joseph Davidovits',year:2011,type:'Workshop presentation',strength:70,age:'28 days',system:'Potassium silicate · metakaolin / slag',status:'Reported proportions',url:workshop,locator:'PDF page 56: Basic MK-750/slag mix',
  summary:'Ambient-cured reference with 45 MPa reported at 7 days and 70 MPa at 28 days.',
  basis:'Source lists 80:20:20:2 without an explicit mass-unit heading. Gram scaling interprets these as mass parts; this is a disclosed assumption.',
  ingredients:[row('Calcined kaolinitic clay (MK-750)',80),row('Slag (15–25 µm)',20),row('Potassium silicate solution · MR 1.40',20,'activator',{H2O:53}),row('Added water',2,'water',{H2O:100})],
  parameters:[['Activator','SiO₂/K₂O molar ratio 1.40; water 53%']],curing:'Ambient temperature; humidity and sealing unspecified.',method:'Specimen geometry, test standard and replicates not specified on the slide.',
  limitations:'Precursor assays and silicate oxide percentages are not supplied. No commercial-grade substitution established.',scalable:true},
 {id:'davidovits-fly-ash-80',title:'Davidovits et al. · fly ash / slag, Example 3',authors:'Joseph, Ralph and Marc Davidovits',year:2010,type:'Patent example',strength:80,age:'28 days',system:'Potassium silicate · fly ash / slag',status:'Reported mass parts',url:patent,locator:'Example 3; Table 5 (heading duplicated as Table 4)',
  summary:'Australian Collie fly ash and slag; source-reported strength, not independent replication.',basis:'Parts by mass, including solution water.',ingredients:[row('Collie fly ash',60),row('Slag · 390 m²/kg',15),row('Potassium silicate solution',10,'activator',{H2O:51}),row('Added water',10,'water',{H2O:100})],parameters:[['Activator','K₂O/SiO₂ molar 0.78 (inverse modulus ≈1.282); water 51%']],curing:'Closed molds, room temperature.',method:'Geometry, standard and replicates unspecified.',limitations:'Assays remain unassigned in the calculator. Do not substitute another ash or silicate grade without reassessment.',scalable:true},
 {id:'davidovits-fly-ash-70',title:'Davidovits et al. · fly ash / slag, Example 5',authors:'Joseph, Ralph and Marc Davidovits',year:2010,type:'Patent example',strength:70,age:'28 days',system:'Potassium silicate · fly ash / slag',status:'Reported mass parts',url:patent,locator:'Example 5',
  summary:'Higher-modulus activator variant of the Australian fly-ash system.',basis:'Parts by mass, including solution water.',ingredients:[row('Australian fly ash',60),row('Slag · 390 m²/kg',15),row('Potassium silicate solution',13.5,'activator',{H2O:55}),row('Added water',10,'water',{H2O:100})],parameters:[['Activator','K₂O/SiO₂ molar 0.54 (inverse modulus ≈1.852); water 55%']],curing:'Closed molds, room temperature.',method:'Geometry, standard and replicates unspecified.',limitations:'Incomplete assay data; patent performance claim, not platform validation.',scalable:true},
 {id:'alameri-t2m9',title:'Alameri et al. · T2M9 slag mortar',authors:'Mohammad Alameri, Jovan Joseph, M. S. Mohamed Ali, Mohamed Elchalakani and Abdul Hamid Sheikh',year:2025,type:'Journal article',strength:126,age:'28 days',system:'Potassium silicate + KOH · slag / silica fume',status:'Partial recipe · source discrepancy',url:'https://doi.org/10.1080/13287982.2024.2375468',fullText:'https://digital.library.adelaide.edu.au/server/api/core/bitstreams/f9cdc382-4b62-414d-8035-1b16b5e1aa17/content',locator:'Table 5; §§3.2–3.4, 4.1; conclusion (pp. 97–101, 108)',
  summary:'Tested T2M9 reports 98 MPa at 7 days and 126 MPa at 28 days.',basis:'Published kg/m³; incomplete batch, not available for gram scaling.',
  ingredients:[row('GGBS',511.1),row('Silica fume',196.6),row('SiC (paper designation)',78.6),row('Fine aggregate',1100.7,'aggregate'),row('Superplasticizer',37.7,'additive'),row('Steel fibre · 0.55 mm',157,'aggregate'),row('Steel fibre · 0.2 mm',78.5,'aggregate')],
  parameters:[['AAS/B; PS/PH; W/B','0.38; 3; 0.28'],['Activator','13.95 M KOH; potassium silicate modulus 1.5'],['Water accounting','Includes activator and superplasticizer water']],
  curing:'Covered molds in 100 °C water for 24 h, then 100% RH fog room until testing.',method:'100 × 200 mm cylinders; ASTM C39; 20 MPa/min.',
  limitations:'Table 5 T2M9 contains 78.6 kg/m³ SiC, but the conclusion describes zero SiC. Activator solids/density and free-water dose are unresolved. No completed gram recipe or calculator transfer until reconciled.',scalable:false},
 {id:'kohout-gs-1',title:'Kohout et al. · GS-1.0 metakaolin / chamotte',authors:'Jan Kohout, Petr Koutník, Pavlína Hájková, Eliška Kohoutová and Aleš Soukup',year:2021,type:'Journal article',strength:95.2,age:'7 days (paper test age)',system:'Potassium silicate + KOH · calcined claystone',status:'Ratio design · mass recipe unavailable',url:'https://doi.org/10.3390/polym13213754',fullText:'https://pmc.ncbi.nlm.nih.gov/articles/PMC8587831/',locator:'§§2.2–2.3, 3.3; Figure 7a',
  summary:'GS-1.0 composite tested at laboratory temperature; not the separate 1000 °C in-situ result.',basis:'Binder molar ratios and composite filler volume; no directly extracted gram batch.',ingredients:[],
  parameters:[['Precursor','Mefisto L05 calcined claystone'],['Binder Si/Al; K/Al','1.5; 1.0 (molar atomic ratios)'],['Total binder water','30% by mass, including activator water'],['Chamotte','65% by volume of composite']],curing:'Sealed at 60 °C for 4 h; demolded, then laboratory cure at 20 °C for 7 days as described in §2.2.',method:'30 × 30 × 64 mm prisms; six specimens; 0.5 MPa/s. Paper cites ISO 1920-10 for compression/modulus measurements.',limitations:'Volume fraction cannot become filler grams without density and basis checks. Curing narrative and test-age wording retained separately. No automatic transfer of targets to another metakaolin.',scalable:false}
];
literatureMixes.push(...recipeAdditions);
for (const m of literatureMixes) {
 m.revision=1;
 m.activation ||= 'potassium';
 m.family ||= m.id.startsWith('davidovits-fly') ? 'Davidovits fly-ash series' : m.title;
 m.results ||= [{property:'compressive',ageHours:m.age.startsWith('28')?672:168,value:m.strength,unit:'MPa',kind:'source-reported',context:m.method}];
 if(m.id==='davidovits-mk-slag')m.results.unshift({property:'compressive',ageHours:168,value:45,unit:'MPa',kind:'source-reported',context:m.method});
 if(m.id==='alameri-t2m9')m.results.unshift({property:'compressive',ageHours:168,value:98,unit:'MPa',kind:'source-reported',context:m.method});
 m.tweaks ||= [{kind:'Proposed experiment',text:'Duplicate this reference in the notebook, change one variable and measure the result. Do not carry the literature strength over to an adapted recipe.'}];
}
export function resultNotes(m){return m.results.length?m.results.map(r=>`${r.property}: ${r.value} ${r.unit} at ${r.ageHours} hours${r.context?' ('+r.context+')':''}`).join('; '):'Numerical results not extracted; consult source.';}
export function mixProject(id,total){
 const m=literatureMixes.find(x=>x.id===id);if(!m?.scalable)throw Error('This record has no complete mass proportions to scale.');
 let recipe={name:m.title+' — literature starting point',rows:m.ingredients.map(r=>({...r,comp:{...r.comp},source:m.url,provenance:{kind:'assumption',basis:'Mass proportions from source; only stated water retained. Other chemistry unassigned. '+m.basis}}))};
 if(total!==undefined){if(!Number.isFinite(Number(total))||Number(total)<=0||Number(total)>1e7)throw Error('Enter a batch mass greater than 0 and at most 10,000,000 g.');recipe=scaleRecipe(recipe,total);}
 return parseProject({version:1,recipe,study:{citation:m.authors+'. '+m.title+' ('+m.year+'). '+m.url,locator:m.locator,curing:m.curing,results:'Literature report only: '+(m.strength===null?'See source':m.strength+' MPa at '+m.age)+'. '+resultNotes(m)+'. '+m.method,adaptations:m.basis+' '+m.limitations+' Adjustment ideas (not tested adaptations): '+m.tweaks.map(t=>t.text).join(' '),targetBasis:'No recommended chemical targets. Missing assays must be entered before interpreting ratios.'}});
}
