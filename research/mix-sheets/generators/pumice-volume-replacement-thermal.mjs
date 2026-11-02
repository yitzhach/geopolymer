// Metakaolin geopolymer recycled mortars with pumice powder — Table 3 (kg/m3) and values stated in §3.
import {source,table,tableQuote,num,expect,sheetHeader,save} from './_common.mjs';
const G='pumice-volume-replacement-thermal',src=await source(G),t=table(src,3);
expect(t.header.at(-1),['Sample','Replacement Rate','PP','MK','RFA','Pre-Wetting Water','NaOH','Na2SiO3','Distilled Water'],'Table 3 header');
const naoh='The NaOH solution had a concentration of 10 mol/L and was prepared 24 h before mixing and allowed to cool to room temperature.';
const cols=[[2,'pp'],[3,'mk'],[4,'rfa'],[5,'pw'],[6,'naoh'],[7,'ss'],[8,'water']];
const mixes=t.rows.map((r,i)=>{const text=tableQuote(t,i);
 return {id:r[0],control:r[0]==='PP0',form:'mortar',cure:'c1',
  quantities:cols.filter(([c])=>r[c]!=='-').map(([c,m])=>({material:m,value:num(r[c]),unit:'kg/m3',basis:'per-m3',text})),
  parameters:[{key:'hydroxide-molarity',value:10,text:naoh}]};});
const amb='At 7 days, specimens designated for the ambient reference condition were subjected to the same 50 °C drying treatment as the thermally exposed specimens and tested after cooling.';
const c1='PP70 exhibited the highest compressive strength (31.7 MPa) among the PP-containing mixtures, exceeding that of PP60 (30.1 MPa) by 5.3% and remaining only 1.6% lower than that of PP0 (32.2 MPa).';
const b1='The tensile bond strength decreased from 2.8 MPa for PP0 to 2.5 MPa for both PP60 and PP70.';
const r8='After exposure to 800 °C for 3 h, the mean residual compressive strength of PP70 was approximately 18.8 MPa, compared with 17.5 MPa for PP0 and 12.5 MPa for PP100. The corresponding strength-retention ratios were approximately 59.3%, 54.3%, and 48.3%, respectively.';
const b8='Under the most severe condition of 800 °C for 3 h, PP70 retained approximately 1.1 MPa, while PP90 and PP100 retained only about 0.7 MPa.';
const A=(mix,test,value,text)=>({mix,test,ageDays:7,value,text,ageText:amb,condition:'ambient-temperature compressive and tensile bond strengths',locator:'§3.1 / Figure 3'});
const H=(mix,test,value,text,cond)=>({mix,test,ageDays:null,ageNote:'exposed to 800 °C for 3 h at an age of 7 days; specimen age at test not stated',condition:cond,qualifier:'approximately',value,text,locator:'§3.2'});
await save({...sheetHeader(G,'10.3390/ma19183819',src,'All six Table 3 mortars (pumice powder replacing recycled fine aggregate by volume, 0–100%) with kg/m3 batches; ambient compressive and tensile bond strengths stated for PP0, PP60 and PP70, and residual values after 800 °C for 3 h stated for PP0, PP70, PP90 and PP100.',{made:'2026-11-02',audit:'research/batches/source-text-batch4-2026-11-02.json'}),
 materials:[{id:'mk',family:'metakaolin',role:'precursor',name:'Metakaolin',aliases:['MK']},
  {id:'pp',family:'other-aggregate',role:'aggregate',name:'Pumice powder',aliases:['PP'],detail:'Pumice powder (PP) was an industrial by-product produced by Hebei Runhuabang New Materials Technology Co., Ltd., (Shijiazhuang, China).'},
  {id:'rfa',family:'recycled-aggregate',role:'aggregate',name:'RFA',detail:'The apparent density, water absorption, and fineness modulus of the RFA were 2273 kg/m3, 9.4%, and 2.9, respectively.'},
  {id:'pw',family:'water',role:'water',name:'Pre-Wetting Water'},
  {id:'naoh',family:'sodium-hydroxide',role:'activator',name:'NaOH',detail:naoh},
  {id:'ss',family:'sodium-silicate-solution',role:'activator',name:'Na2SiO3',detail:'The sodium silicate solution contained 21.5 wt.% SiO2, 18.5 wt.% Na2O, and 60 wt.% H2O, corresponding to a silica modulus (Ms = SiO2/Na2O molar ratio) of 1.2.'},
  {id:'water',family:'water',role:'water',name:'Distilled Water'}],
 mixes,
 cures:[{id:'c1',category:'heat',temperatureC:70,duration:24,durationUnit:'h',sealed:true,humidityPercent:null,text:'After casting, the specimens were sealed and cured at 70 °C for 24 h. They were subsequently demoulded and stored under standard curing conditions (20 ± 2 °C, RH ≥ 95%) until an age of 7 days.'}],
 tests:[{id:'fc',property:'compressive-strength',unit:'MPa',specimen:'50 × 50 × 50 mm3 cubes, mean of 3',method:'JGJ/T 70-2009 (modified)'},
  {id:'tb',property:'bond-strength',unit:'MPa',specimen:'40 × 40 × 6 mm plates, epoxy-bonded fixtures',method:'modified direct-tension test'},
  {id:'ret',property:'strength-retention',unit:'%',specimen:'50 mm cubes',method:'residual / ambient compressive strength'}],
 results:[A('PP70','fc',31.7,c1),A('PP60','fc',30.1,c1),A('PP0','fc',32.2,c1),A('PP0','tb',2.8,b1),A('PP60','tb',2.5,b1),A('PP70','tb',2.5,b1),
  H('PP70','fc',18.8,r8,'After exposure to 800 °C for 3 h'),H('PP0','fc',17.5,r8,'After exposure to 800 °C for 3 h'),H('PP100','fc',12.5,r8,'After exposure to 800 °C for 3 h'),
  H('PP70','ret',59.3,r8,'After exposure to 800 °C for 3 h'),H('PP0','ret',54.3,r8,'After exposure to 800 °C for 3 h'),H('PP100','ret',48.3,r8,'After exposure to 800 °C for 3 h'),
  H('PP70','tb',1.1,b8,'Under the most severe condition of 800 °C for 3 h'),H('PP90','tb',0.7,b8,'Under the most severe condition of 800 °C for 3 h'),H('PP100','tb',0.7,b8,'Under the most severe condition of 800 °C for 3 h')],
 findings:[{goal:'Highest compressive strength among pumice-containing mortars',mix:'PP70',text:c1}],
 notes:[],
 gaps:['Table quotes follow the standard form; "PP" is pumice powder (not polypropylene) and replaces RFA by equal absolute volume. NaOH is the 10 mol/L solution as dosed.',
  'Ambient values were tested at 7 days after the same 50 °C drying as the heated specimens. Residual values exist for 600–800 °C and 1 or 3 h holds; only those whose sentences name the 800 °C / 3 h condition are transcribed. The PP70 1 h versus 3 h series (30.7→28.2 MPa at 600 °C; 25.0→18.8 MPa at 800 °C; bond 2.4→2.0, 2.2→1.5, 1.9→1.1 MPa) is left in the paper.',
  "Table 5 carbon intensity is embodied carbon divided by strength; strengths are not back-calculated from it.",
  'Second review pending; see the batch audit.']});
