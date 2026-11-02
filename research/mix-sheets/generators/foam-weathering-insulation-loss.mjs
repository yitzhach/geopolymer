// Metakaolin geopolymer foam concrete (one mix, GFC) under carbonation, salt fog and UV — values stated in §3.
import {source,sheetHeader,save} from './_common.mjs';
const G='foam-weathering-insulation-loss',src=await source(G);
const act='The alkaline activator was prepared by mixing an 8 M NaOH solution (Macron, Mexico) with sodium silicate (Na2SiO3, 10.6 wt.% Na2O and 26.5 wt.% SiO2; Sigma-Aldrich, St. Louis, MO, USA) at a NaOH/Na2SiO3 ratio of 0.51 wt.%.';
const mix='The activating solution and metakaolin (MK) were mixed at a solid-to-liquid ratio of 1.14. The mixture was poured into a laboratory mixer (Hobar, Troy, OH, USA) and vigorously mixed for two minutes. Subsequently, 3 wt.% of the foaming agent (30% H2O2 solution) was added and homogenized for an additional two minutes [40]. Finally, 1.5 wt.% of surfactant (extra virgin olive oil) was incorporated and mixed for one more minute.';
const d='The uncarbonated GFC exhibited a bulk density of 0.277 g/cm3 and a porosity of 87.3%, consistent with values reported in the literature for chemical GFC [45]. After 7 days of carbonation at 25 °C, the samples reached a density of 0.373 g/cm3 and a porosity of 83.30%. At 40 °C, the corresponding values were 0.494 g/cm3 and 78.68%, respectively.';
const k='Uncarbonated GFC exhibited a thermal conductivity of 0.083 W/m·K, comparable to literature values for low-density GFC (~0.088 W/m·K at 0.28 g/cm3) [45].';
const f='Uncarbonated GFC had a strength of 0.878 MPa, typical for ultra-lightweight foams (<1 MPa at ~0.28 g/cm3) [1].';
const base='uncarbonated reference: pre-cured 24 h at ambient temperature, then 24 h at 60 °C; test age not stated';
const exp='after 7 days of accelerated carbonation (5% CO2, 60 ± 5% RH); specimen age not stated';
const R=(test,value,text,extra)=>({mix:'GFC',test,ageDays:null,ageNote:base,value,text,locator:'§3',...extra});
await save({...sheetHeader(G,'10.3390/ma19010012',src,'The single geopolymer foam concrete (GFC) mix with its stated design, the uncarbonated density, porosity, thermal conductivity and compressive strength, and density/porosity after 7 days of carbonation at 25 and 40 °C. Other exposure results are kept as quoted notes.',{made:'2026-11-02',audit:'research/batches/source-text-batch3-2026-11-02.json'}),
 materials:[{id:'mk',family:'metakaolin',role:'precursor',name:'Metakaolin',aliases:['MK'],detail:'Metakaolin (MK) (Metastar 501, Watson Phillips, Naucalpan de Juárez, Mexico) was used as the aluminosilicate precursor.'},
  {id:'naoh',family:'sodium-hydroxide',role:'activator',name:'8 M NaOH solution',aliases:['NaOH'],detail:act},
  {id:'ss',family:'sodium-silicate-solution',role:'activator',name:'sodium silicate',aliases:['Na2SiO3'],detail:act},
  {id:'h2o2',family:'foaming-agent',role:'additive',name:'H2O2 solution',detail:'A 30% (v/v) H2O2 solution (J.T. Baker, Radnor, PA, USA) was used as the foaming agent'},
  {id:'oil',family:'other-additive',role:'additive',name:'olive oil',detail:'extra virgin olive oil (Ragasa Industrias, Monterrey, Mexico) served as the surfactant'}],
 mixes:[{id:'GFC',control:false,form:'foam',cure:'c1',
  quantities:[{material:'mk',value:null,missing:'mass not given; only the solid-to-liquid ratio 1.14',text:mix},
   {material:'naoh',value:null,missing:'mass not given; NaOH/Na2SiO3 printed as "0.51 wt.%" (basis unresolved)',text:act},{material:'ss',value:null,missing:'mass not given; NaOH/Na2SiO3 printed as "0.51 wt.%" (basis unresolved)',text:act},
   {material:'h2o2',value:3,unit:'wt%',basis:'other',basisNote:'"3 wt.% of the foaming agent"; reference mass not stated',text:mix},
   {material:'oil',value:1.5,unit:'wt%',basis:'other',basisNote:'"1.5 wt.% of surfactant"; reference mass not stated',text:mix}],
  parameters:[{key:'hydroxide-molarity',value:8,text:act}],
  missing:['solid-to-liquid 1.14 is stated as solid/liquid, so no liquid/solid value is entered']}],
 cures:[{id:'c1',category:'heat',temperatureC:60,duration:24,durationUnit:'h',sealed:null,humidityPercent:null,text:'The samples were pre-cured at ambient temperature for 24 h, followed by curing at 60 °C for another 24 h.'}],
 tests:[{id:'rho',property:'density',unit:'g/cm3',specimen:'cylinders',method:'bulk density'},{id:'por',property:'porosity',unit:'%',specimen:'cylinders',method:'total porosity from apparent and true density'},
  {id:'k',property:'thermal-conductivity',unit:'W/(m·K)',specimen:'cylinders',method:null},{id:'fc',property:'compressive-strength',unit:'MPa',specimen:'cylinders',method:null}],
 results:[R('rho',0.277,d,{condition:'The uncarbonated GFC'}),R('por',87.3,d,{condition:'The uncarbonated GFC'}),
  R('rho',0.373,d,{ageNote:exp,condition:'After 7 days of carbonation at 25 °C'}),R('por',83.3,d,{ageNote:exp,condition:'After 7 days of carbonation at 25 °C'}),
  R('rho',0.494,d,{ageNote:exp,condition:'At 40 °C, the corresponding values'}),R('por',78.68,d,{ageNote:exp,condition:'At 40 °C, the corresponding values'}),
  R('k',0.083,k),R('fc',0.878,f)],
 findings:[],
 notes:[],
 gaps:['One mix only; "GFC" is the paper\'s name for it. Carbonated, salt-fog and UV values whose sentences do not name GFC are kept as notes rather than results.',
  'No batch masses; NaOH/Na2SiO3 is printed as "0.51 wt.%" (not read as a mass ratio), and the H2O2 and olive-oil percentages have no stated reference mass.',
  'Test ages are not stated; exposure durations (7 days carbonation, 12 weeks salt fog/UV) are exposure times, not curing ages. Carbonation at 40 °C reached 0.122 W/m·K in the next paragraph (rounded), 0.1217 here.',
  'Second review (2 Nov 2026): 0 value errors; see the batch audit.']});
