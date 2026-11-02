// Copper-slag (Koranel) potassium-silicate geopolymer, cast ("formed") versus 3D-printed — values stated in §3.
import {source,sheetHeader,save} from './_common.mjs';
const G='copper-slag-print-cast-ledger',src=await source(G);
const act='Potassium silicate solution Geosil 14517 (Wöllner GmbH, Wöllnerstraße 26, 67065 Ludwigshafen, Germany) is used as the activator. The liquid to precursor ratio is 0.47.';
const add='The aluminum powder and sodium oleate pure were introduced in the amounts of 0.25% and 0.01% in relation to copper slag, respectively.';
const q=[{material:'cs',value:null,missing:'batch mass not given',text:'The base material used to prepare the geopolymer paste for 3D printing is copper slag Koranel (Metallo, Beerce, Belgium) [65].'},
 {material:'ks',value:null,missing:'mass not given; liquid to precursor ratio 0.47',text:act},
 {material:'al',value:0.25,unit:'wt%',basis:'precursor-mass',text:add},{material:'ole',value:0.01,unit:'wt%',basis:'precursor-mass',text:add}];
const p=[{key:'activator/precursor',value:0.47,basisNote:'"liquid to precursor ratio"; mass basis not stated',text:act}];
const c='The average compressive strength after 28 days for the formed samples is 46.4 MPa, and for the printed samples, it is 42.1 MPa.';
const t='The average tensile strengths for printed sample ft after 5, 14, and 28 days are 1.8, 2.9, and 3.0 MPa, respectively.';
await save({...sheetHeader(G,'10.3390/ma17225581',src,'The one copper-slag geopolymer recipe, as mould-cast ("formed") and 3D-printed specimens, with the 28-day compressive strengths and the printed interlayer tensile strengths stated in the text. Bending and shear values are given only as ranges or for one age.',{made:'2026-11-02',audit:'research/batches/source-text-batch4-2026-11-02.json'}),
 materials:[{id:'cs',family:'copper-slag',role:'precursor',name:'copper slag Koranel',aliases:['copper slag','Koranel'],detail:'Koranel is a granulated Fe silicate containing traces of heavy metals, derived from secondary copper smelting followed by evaporation of zinc in an immersed plasma to recover Zn and P.'},
  {id:'ks',family:'potassium-silicate-solution',role:'activator',name:'Potassium silicate solution Geosil 14517',aliases:['Potassium silicate solution']},
  {id:'al',family:'foaming-agent',role:'additive',name:'aluminum powder'},
  {id:'ole',family:'other-additive',role:'additive',name:'sodium oleate'}],
 mixes:[{id:'formed',control:true,form:'paste',cure:null,quantities:q,parameters:p,missing:['curing conditions not stated']},
  {id:'printed',control:false,form:'printed',cure:null,quantities:q,parameters:p,missing:['curing conditions not stated']}],
 cures:[],
 tests:[{id:'fc',property:'compressive-strength',unit:'MPa',specimen:'not stated; mean of three',method:'Hager et al. procedure'},
  {id:'ft',property:'interlayer-tensile-bond',unit:'MPa',specimen:'printed specimens, failure at the layer interface',method:'direct tensile test'}],
 results:[{mix:'formed',test:'fc',ageDays:28,value:46.4,text:c,locator:'§3 / Figure 10'},{mix:'printed',test:'fc',ageDays:28,value:42.1,text:c,locator:'§3 / Figure 10'},
  ...[[5,1.8],[14,2.9],[28,3]].map(([ageDays,value])=>({mix:'printed',test:'ft',ageDays,value,text:t,locator:'§3 / Figure 12a'}))],
 findings:[],notes:[],
 gaps:['One recipe: "formed" (cast in standard moulds) and "printed" are the paper\'s own words for the two fabrication conditions and are used as labels; the control flag marks the cast reference.',
  'Curing conditions are not stated in the paper; no batch masses are given.',
  'Bending strength after 28 days is given only as a range for all conditions (7.4–7.8 MPa); shear strength only as 14 MPa after 5 days with "less than 20%" later change; neither is transcribed.',
  'Second review (2 Nov 2026): 0 value errors; see the batch audit.']});
