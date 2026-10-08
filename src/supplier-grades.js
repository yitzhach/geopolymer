// Manufacturer/supplier publications checked 2026-10-08. Typical data, not lot COAs.
// Sources are primary publications; PQ's historic bulletins are hosted by EngNet.
const pqNa='https://www.engnetglobal.com/documents/pdfcatalog/PQS001_110412024051_Applications%20of%20Soluble%20Silicates.pdf';
const pqK='https://www.engnet.co.za/documents/pdfcatalog/PQS001_110412024333_Potassium%20Silicates.pdf';
const liquid=(id,name,system,silica,alkali,density,source,locator)=>({id,name,role:'activator',system,supplier:'PQ Corporation',comp:{SiO2:silica,[system==='sodium'?'Na2O':'K2O']:alkali,H2O:Number((100-silica-alkali).toFixed(4))},density,source,locator,basis:'Typical aqueous solution mass percentages. Water calculated as 100 minus reported oxide solids; assumes no other dissolved constituents.',note:'Historic manufacturer typical values; confirm current regional grade and lot COA. Water balance is an explicit model assumption. Density at 20 °C; no powder volume conversion.'});
export const supplierGrades=[
 {id:'dynapoz-110-cr',name:'R-E-D Dynapoz 110 CR',role:'precursor',supplier:'R-E-D Industrial Products',comp:{SiO2:57.2,Al2O3:36.7,Fe2O3:1.78,CaO:.48,MgO:.36,K2O:.08,Na2O:1.08,Other:2.17},source:'https://www.redindustrialproducts.com/_files/ugd/fa120c_946a12d3e6e64b2bb1cf993ac59c94a2.pdf',locator:'TDS-METAKAOLIN-GEN-0925, p. 1, XRF table',basis:'Published XRF values used without normalization. Dry/as-supplied basis and moisture are not specified: dry-powder assumption requires confirmation.',note:'Other = TiO2 2.01 + P2O5 0.12 + SrO 0.04%. Remaining 0.15% unassigned. No reactive fraction, moisture or batch certification supplied.'},
 {id:'powerpozz-white',name:'ACT PowerPozz White',role:'precursor',supplier:'Advanced Cement Technologies',comp:{SiO2:51.7,Al2O3:43.2,Fe2O3:.4,Other:2.03},source:'https://www.metakaolin.com/phys-chem-properties-white/',locator:'10.150 Physical & Chemical Properties — White',basis:'Planning midpoints of supplier ranges: SiO2 51–52.4; Al2O3 42.1–44.3; Fe2O3 0.30–0.50; TiO2 1.56–2.50 wt%. Dry-powder assumption; not a measured assay.',note:'Other = TiO2 midpoint. Unreported chemistry remains unknown. Midpoints are independent estimates, not a real lot or a supplier specification.'},
 liquid('pq-n','PQ N sodium silicate','sodium',28.7,8.9,11.6*453.59237/3785.411784,pqNa,'Bulletin 12-31, Table I, p. 4; density converted from 11.6 lb/US gal'),
 liquid('pq-ru','PQ RU sodium silicate','sodium',33.2,13.85,13*453.59237/3785.411784,pqNa,'Bulletin 12-31, Table I, p. 4; density converted from 13.0 lb/US gal'),
 liquid('pq-d','PQ D sodium silicate','sodium',29.4,14.7,12.8*453.59237/3785.411784,pqNa,'Bulletin 12-31, Table I, p. 4; density converted from 12.8 lb/US gal'),
 liquid('pq-kasil-1','PQ KASIL 1 potassium silicate','potassium',20.8,8.3,1.26,pqK,'Figure 1, printed p. 5 (PDF p. 7)'),
 liquid('pq-kasil-6','PQ KASIL 6 potassium silicate','potassium',26.5,12.65,1.38,pqK,'Figure 1, printed p. 5 (PDF p. 7)')
];
export function findGrade(id){return supplierGrades.find(g=>g.id===id);}
export function gradeIngredient(id,mass=0){
 const g=findGrade(id);if(!g)throw Error('Choose a listed supplier grade.');
 return {name:g.name,role:g.role,include:true,mass,comp:{...g.comp},catalogId:g.id,density:g.density??null,source:`${g.source} · ${g.locator} · checked 2026-10-08`,provenance:{kind:'assumption',supplier:g.supplier,lot:'',basis:g.basis}};
}
