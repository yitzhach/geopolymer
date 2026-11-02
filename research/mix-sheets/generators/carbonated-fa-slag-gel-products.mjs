// Carbonated FA/GGBS geopolymer pastes — Table 2 (each paste has a non-carbonated and a carbonated ID).
import {source,table,tableQuote,num,expect,sheetHeader,save} from './_common.mjs';
const G='carbonated-fa-slag-gel-products',src=await source(G),t=table(src,2);
expect(t.header.at(-1),['No.','FA: GGBS (Mass Ratio)','Non-Carbonation','AcceleratedCarbonation','GP-Liquor/Filler Ratio(by Mass)'],'Table 2 header');
const liq='Then, an alkali-activator solution, hereafter called GP-liquor, was prepared by mixing both solutions in a 3:1 by volume ratio, the characteristics of which are as follows: density 1.31 kg/dm3 and concentration 26.3% by mass with S/N 1.1 in molar.';
const stock='S/N 2.1 in molar, and density 1.27 kg/dm3 for the former, and 10 mole/L, and 1.33 kg/dm3 for the latter, respectively.';
const stocks='stock solutions of sodium disilicate and caustic soda were firstly prepared from commercially available sodium disilicate and caustic soda solutions by diluting with deionized water';
const mixes=[];
t.rows.forEach((r,i)=>{const text=tableQuote(t,i),[fa,gg]=r[1].split(':').map(num);
 for(const [c,cure,control] of [[2,'cn',true],[3,'cc',false]])mixes.push({id:r[c],control,form:'paste',cure,
  quantities:[{material:'fa',value:fa,unit:'part',basis:'mass-parts',text},{material:'ggbs',value:gg,unit:'part',basis:'mass-parts',text},
   ...['ds','naoh'].map(m=>({material:m,value:null,missing:'GP-liquor is dosed as one solution (0.5 of filler mass); stock volumes per batch are not given',text:stocks}))],
  parameters:[{key:'liquid/solid',value:num(r[4]),text},{key:'activator-modulus',value:1.1,text:liq},{key:'silicate/hydroxide',value:3,basisNote:'by volume, not mass',text:liq},{key:'hydroxide-molarity',value:10,text:stock}]});});
await save({...sheetHeader(G,'10.3390/ma17071491',src,'All six Table 2 specimen IDs: three FA:GGBS pastes (100:0, 70:30, 0:100), each as a sealed non-carbonated (N-) and an accelerated-carbonation (C-) arm. The paper reports XRD/SEM-EDS phase data only; there are no mechanical or physical results to transcribe.'),
 materials:[{id:'fa',family:'fly-ash',role:'precursor',name:'Low-lime coal fly ash',aliases:['FA'],detail:'The FA and GGBS meet the JIS class II (>250 m2/kg, Blaine) and the JIS grade 4000, respectively.'},
  {id:'ggbs',family:'slag',role:'precursor',name:'ground granulate blast-furnace slag',aliases:['GGBS']},
  {id:'ds',family:'sodium-silicate-solution',role:'activator',name:'sodium disilicate',detail:stock},
  {id:'naoh',family:'sodium-hydroxide',role:'activator',name:'caustic soda',detail:stock}],
 mixes,
 cures:[{id:'cn',category:'ambient',temperatureC:20,duration:28,durationUnit:'d',sealed:true,humidityPercent:60,text:'All the paste specimens were sealed with a plastic film for preventing water loss to reduce shrinkage and to avoid natural carbonation in the air, then cured in a room regulated at 20 °C and 60% R.H. for 28 days. Demolding and then sealing with the film was conducted at 3 days. After 28 days, half of them were unsealed and moved into an accelerated carbonation apparatus, ACT-250 made by Asahikagaku Ltd. in Tokyo, Japan, regulated at 20 °C, 60% R.H., and 10% of CO2 concentration for 35 days. Other specimens continued to be stored in the curing room for 35 days, kept with wrap sealing.'},
  {id:'cc',category:'ambient',temperatureC:20,duration:28,durationUnit:'d',sealed:true,humidityPercent:60,text:'cured in a room regulated at 20 °C and 60% R.H. for 28 days. Demolding and then sealing with the film was conducted at 3 days. After 28 days, half of them were unsealed and moved into an accelerated carbonation apparatus, ACT-250 made by Asahikagaku Ltd. in Tokyo, Japan, regulated at 20 °C, 60% R.H., and 10% of CO2 concentration for 35 days.'}],
 tests:[],results:[],findings:[],notes:[],
 gaps:['Table quotes follow the standard form (Table N (caption): header → row).',
  'N- and C- arms share one paste; the arms differ only after 28 days (sealed storage versus 35 days at 10% CO2). N- arms are marked as controls for the carbonation comparison.',
  'GP-liquor composition is given as stock ratios (3:1 by volume, S/N 1.1 molar, 26.3% by mass); no per-batch masses are given.',
  'Results are SEM-EDS spot compositions and XRD phases (Tables 3–4), which have no mix-table property; no strength or physical values are reported.',
  'Second review (26 Oct 2026): 0 value errors; see the batch audit.']});
