// Bauxite residue / fly ash / glass geopolymer mortars with NaNO2 under subzero storage — Table 2 and §3 strengths.
import {source,table,tableQuote,num,expect,sheetHeader,save} from './_common.mjs';
const G='nitrite-cold-mortar-ratio-conflict',src=await source(G),t=table(src,2);
expect(t.header.at(-1),['Name','Bauxite Residue (kg/m3)','Fly Ash (kg/m3)','Waste Glass Powder (kg/m3)','Fine Aggregate (kg/m3)','NaOH (kg/m3)','Na2SiO3 (kg/m3)','NaNO2 (kg/m3)','Curing Method'],'Table 2 header');
const mats=['br','fa','glass','sand','naoh','ss','nitrite'];
const molar='Sodium hydroxide (NaOH) pellets (77.5% Na2O, 22.5% H2O) were purchased from Laboratoire MAT (Québec City, QC, Canada) and dissolved in tap water to prepare a 16 mol/L solution.';
const mixes=t.rows.map((r,i)=>{const text=tableQuote(t,i);
 return {id:r[0],control:r[0]==='C',form:'mortar',cure:r[8]==='ambient'?'amb':'sub',
  quantities:mats.map((m,j)=>[m,r[j+1]]).filter(([,v])=>v!=='-').map(([m,v])=>({material:m,value:num(v),unit:'kg/m3',basis:'per-m3',text})),
  parameters:[{key:'hydroxide-molarity',value:16,text:molar}]};});
const cure='The mortar specimens were thermally cured at 80 °C for 24 h in a laboratory oven to facilitate the geopolymerization [16]. After demolding, C samples were exposed to ambient conditions for 7 and 28 days prior to testing. Meanwhile, the N0, N1, N2, and N3 samples were stored at −10 °C for similar times to evaluate their mechanical properties under negative temperature exposure.';
const ages='Compressive tests were conducted after 7 and 28 days of curing to evaluate long-term strength.';
const c='Sample C, the control geopolymer in the ambient temperature curing, exhibited a steady strength gain from 35.4 ± 0.26 MPa to 44.1 ± 2.62 MPa.';
const n0='Sample N0, which did not contain NaNO2 but was subjected to subzero curing, achieved a lower early strength (18.6 ± 1.5 MPa at 7 days) and a modest increase to 26.1 ± 3.2 MPa at 28 days.';
const n1='Sample N1 demonstrated a significant increase in strength, from 11.2 ± 0.1 MPa at 7 days to 30.4 ± 4.8 MPa at 28 days.';
const n2='Meanwhile, sample N2 exhibited an average of 38.5 MPa at 28 days.';
const n3='At the same age, sample N3 achieved 40.7 ± 0.7 MPa under similar curing conditions.';
const R=(mix,ageDays,value,spread,text,extra={})=>({mix,test:'fc',ageDays,value,...(spread!==null?{spread}:{}),text,locator:'§3.3 text',...(mix==='C'?{}:{condition:'the N0, N1, N2, and N3 samples were stored at −10 °C'}),...extra});
await save({...sheetHeader(G,'10.3390/ma18173987',src,'All five Table 2 mortars (ambient control C; N0–N3 stored at −10 °C with 0, 7.6, 15.2 and 22.8 kg/m3 NaNO2) with kg/m3 batches, and the 7- and 28-day compressive strengths stated in the text.',{made:'2026-11-02',audit:'research/batches/source-text-batch5-2026-11-02.json'}),
 materials:[{id:'br',family:'red-mud',role:'precursor',name:'Bauxite Residue',aliases:['bauxite residue']},
  {id:'fa',family:'fly-ash',role:'precursor',name:'Fly Ash'},
  {id:'glass',family:'waste-glass',role:'precursor',name:'Waste Glass Powder',aliases:['waste glass']},
  {id:'sand',family:'sand',role:'aggregate',name:'Fine Aggregate',aliases:['Natural sand'],detail:'Its fineness modulus and absorption capacity were 2.9 and 0.3%, respectively.'},
  {id:'naoh',family:'sodium-hydroxide',role:'activator',name:'NaOH',detail:molar},
  {id:'ss',family:'sodium-silicate-solution',role:'activator',name:'Na2SiO3',detail:'Sodium silicate solution (Na2SiO3), containing 8.9% Na2O, 28.7% SiO2, and 62.4% H2O, was supplied by an industrial supplier in Richmond, Canada.'},
  {id:'nitrite',family:'other-additive',role:'additive',name:'NaNO2',aliases:['Sodium nitrite']}],
 mixes,
 cures:[{id:'amb',category:'heat',temperatureC:80,duration:24,durationUnit:'h',sealed:true,humidityPercent:null,text:cure},
  {id:'sub',category:'heat',temperatureC:80,duration:24,durationUnit:'h',sealed:true,humidityPercent:null,text:cure}],
 tests:[{id:'fc',property:'compressive-strength',unit:'MPa',specimen:'50 mm × 50 mm × 50 mm cubes, mean of ≥3',method:'ASTM C109'}],
 results:[R('C',7,35.4,0.26,c,{ageText:ages,condition:'in the ambient temperature curing'}),R('C',28,44.1,2.62,c,{ageText:ages,condition:'in the ambient temperature curing'}),
  R('N0',7,18.6,1.5,n0),R('N0',28,26.1,3.2,n0),R('N1',7,11.2,0.1,n1),R('N1',28,30.4,4.8,n1),R('N2',28,38.5,null,n2),R('N3',28,40.7,0.7,n3,{ageText:n2})],
 findings:[],notes:[],
 gaps:['Table quotes follow the standard form. Both cure entries share the 80 °C / 24 h sealed oven stage; "amb" (C) then ambient storage and "sub" (N0–N3) then storage at −10 °C, per Table 2\'s Curing Method column.',
  'Source conflict kept visible: the text mixes NaOH (16 mol/L) and Na2SiO3 "in a 2:1 weight ratio", but Table 2 gives 101 and 202 kg/m3 (1:2). The binder-to-liquid ratio is stated as 0.45 (binder/liquid), so no liquid/solid value is entered. NaNO2 is dosed as 0–3 wt% of binder.',
  'C strengths are stated as a gain "from … to …" without ages in the sentence; 7 and 28 days come from the test schedule. N3\'s sentence says "At the same age" after the N2 28-day sentence. N2 has no ± and no 7-day value; N3 has no 7-day value in the text.',
  'The paper gives C\'s 28-day strength as 44.1 ± 2.62 MPa in §3.3 (recorded), 44.18 MPa in the FTIR discussion and 44.2 MPa in the conclusions.',
  'Setting times are only in a figure.',
  'Second review (2 Nov 2026): 0 value errors; see the batch audit.']});
