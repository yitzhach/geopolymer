// Two metakaolins with CNT or SiC nanowhiskers — Table 4 mixtures and molar ratios; batch masses in §2.6.
import {source,table,tableQuote,num,expect,sheetHeader,save} from './_common.mjs';
const G='cnt-sic-mk-source-dependent',src=await source(G),t=table(src,4);
expect(t.header.at(-1),['Name','Addition (gr)','SiO2/Al2O3','Na2O/Al2O3','Na2O/SiO2','H2O/Na2O'],'Table 4 header');
const batch='The A.S. (120.0 g SS and 8.9 g HS), containing (or not) nanomaterials, was added gradually to MK (100.0 g) and mixed for 5 min in a higher-shear mixer (10,000 rpm).';
const mixes=t.rows.map((r,i)=>{const text=tableQuote(t,i),mk=r[0].startsWith('R1')?'mk1':'mk2',add=r[0].includes('CNT')?'cnt':r[0].includes('NW')?'scw':null;
 return {id:r[0],control:!add,form:'paste',cure:'c1',
  quantities:[{material:mk,value:100,unit:'g',basis:'batch',text:batch},{material:'ss',value:120,unit:'g',basis:'batch',text:batch},{material:'naoh',value:8.9,unit:'g',basis:'batch',text:batch},
   ...(add?[{material:add,value:num(r[1]),unit:'g',basis:'batch',text}]:[])],
  parameters:[{key:'SiO2/Al2O3',value:num(r[2]),text},{key:'Na2O/Al2O3',value:num(r[3]),text},{key:'H2O/Na2O',value:num(r[5]),text}]};});
await save({...sheetHeader(G,'10.3390/ma15176099',src,'All six Table 4 pastes (two metakaolins, each plain, with SiC nanowhiskers or with CNTs) with the shared batch masses and molar ratios. Rheology and strength results are plotted only in figures, so no per-mix results are transcribed.',{made:'2026-11-02',audit:'research/batches/source-text-batch5-2026-11-02.json'}),
 materials:[{id:'mk1',family:'metakaolin',role:'precursor',name:'MK1',detail:'The metakaolin MK1 was obtained calcinating kaolin at 800 °C for 1 h (KK260, Linn Elektro Therm GmbH, Bad Frankenhausen, Germany) in a static muffle.'},
  {id:'mk2',family:'metakaolin',role:'precursor',name:'MK2',detail:'The metakaolin MK2, a commercial product, was provided by a local industrial company.'},
  {id:'ss',family:'sodium-silicate-solution',role:'activator',name:'sodium silicate solution',aliases:['SS'],detail:'The alkaline activator was prepared with sodium silicate solution (Na2SiO3–H2O), with SiO2/Na2O = 3.37, and sodium hydroxide—NaOH (micro pellets) (≥98% purity).'},
  {id:'naoh',family:'sodium-hydroxide',role:'activator',name:'NaOH micro pellets',aliases:['HS'],detail:'Briefly, the NaOH micro pellets were dissolved in a sodium silicate solution using a magnetic stirrer.'},
  {id:'cnt',family:'nano-additive',role:'additive',name:'CNT'},
  {id:'scw',family:'nano-additive',role:'additive',name:'SiC whiskers',aliases:['NW','SCW']}],
 mixes,
 cures:[{id:'c1',category:'ambient',temperatureC:23,duration:null,durationUnit:null,sealed:true,humidityPercent:null,text:'Subsequently, all samples were sealed with plastic films and cured at 23 ± 2 °C. The samples were kept at ambient temperature until the day of the tests.'}],
 tests:[],results:[],findings:[],notes:[],
 gaps:['Table quotes follow the standard form; the mix names are Table 4\'s own ("R1 (MK1 + AS)", "R2 + NW", …). "NW" in Table 4 is the SiC whisker addition called SCW in the text; 0.20 g of addition per 100 g MK is from Table 4.',
  'Batch masses (100.0 g MK, 120.0 g sodium silicate, 8.9 g NaOH) are stated once for all mixtures in §2.6; the review note\'s question on the NaOH physical form is answered: micro pellets dissolved in the silicate.',
  'Yield stress, viscosity and compressive strength are only in figures; Na2O/SiO2 (Table 4) has no parameter key.',
  'Second review pending; see the batch audit.']});
