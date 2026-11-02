// Metakaolin geopolymer pastes with edge-oxidized graphene oxide — Table 3 batches and Table 4 setting times.
import {source,table,tableQuote,num,expect,sheetHeader,save} from './_common.mjs';
const G='eogo-metakaolin-dose-dispersion',src=await source(G),t3=table(src,3),t4=table(src,4);
expect(t3.header.at(-1),['Paste ID','L/B Ratio','Metakaolin (g)','SSS (g)','SHS (g)','EOGO (%)','EOGO (g)'],'Table 3 header');
expect(t4.header.at(-1),['Paste ID','Initial Setting Time (min)','Final Setting Time (min)'],'Table 4 header');
expect(t3.rows.map(r=>r[0]),t4.rows.map(r=>r[0]),'same Paste IDs in Tables 3 and 4');
const mixes=t3.rows.map((r,i)=>{const text=tableQuote(t3,i);
 return {id:r[0],...(r[0]==='CP'?{aliases:['CS']}:{}),control:r[0]==='CP',form:'paste',cure:'c1',
  quantities:[{material:'mk',value:num(r[2]),unit:'g',basis:'batch',text},{material:'sss',value:num(r[3]),unit:'g',basis:'batch',text},
   {material:'shs',value:num(r[4]),unit:'g',basis:'batch',text},{material:'eogo',value:num(r[6]),unit:'g',basis:'batch',text},
   {material:'eogo',value:num(r[5]),unit:'wt%',basis:'precursor-mass',text}],
  parameters:[{key:'activator/precursor',value:num(r[1]),basisNote:'printed as L/B: liquid = SSS + SHS solutions, binder = metakaolin only',text}]};});
const results=[];
t4.rows.forEach((r,i)=>{for(const [c,test] of [[1,'ist'],[2,'fst']])results.push({mix:r[0],test,ageDays:null,ageNote:'fresh paste test',value:num(r[c]),text:tableQuote(t4,i),locator:'Table 4'});});
await save({...sheetHeader(G,'10.3390/ma18163864',src,'All four Table 3 pastes (control CP and 0.1, 0.5 and 1% EOGO by metakaolin mass) with exact batch masses, and their Table 4 initial and final setting times. Compressive strength, stiffness, voids and flow are reported as percentages, in figures or without mix names and are not transcribed.',{made:'2026-11-02',audit:'research/batches/source-text-batch3-2026-11-02.json'}),
 materials:[{id:'mk',family:'metakaolin',role:'precursor',name:'Metakaolin',aliases:['MK'],detail:'Metakaolin (MK) is a pozzolanic material containing 49.1% silica (SiO2) and 43.2% alumina (Al2O3). The mean particle size of metakaolin is 11 μm.'},
  {id:'sss',family:'sodium-silicate-solution',role:'activator',name:'sodium silicate (Na2SiO3) solution',aliases:['SSS']},
  {id:'shs',family:'sodium-hydroxide',role:'activator',name:'sodium hydroxide (NaOH) solution',aliases:['SHS']},
  {id:'eogo',family:'nano-additive',role:'additive',name:'Edge-Oxidized Graphene Oxide',aliases:['EOGO'],detail:'EOGO was procured from Garmor, Inc. (Orlando, FL, USA), and the chemical composition of EOGO is given in Table 2.'}],
 mixes,
 cures:[{id:'c1',category:'ambient',temperatureC:25,duration:null,durationUnit:null,sealed:null,humidityPercent:null,text:'All specimens were cured at a room temperature of 25 °C for 7, 14, and 28 days.'}],
 tests:[{id:'ist',property:'initial-setting-time',unit:'min',specimen:'paste',method:null},{id:'fst',property:'final-setting-time',unit:'min',specimen:'paste',method:null}],
 results,
 findings:[{goal:'Highest compressive strength',mix:'MKGO 0.1',text:'The specimen with 0.1% EOGO (MKGO 0.1) showed the highest compressive strength.'}],
 notes:[],
 gaps:['Table quotes follow the standard form. The control is "CP" in the tables and "CS" in the strength and absorption text; both are recorded as the same mix.',
  'The NaOH (SHS) and silicate (SSS) solution concentrations are not stated.',
  'Compressive strength is plotted (Figure 6) and given in the text only as a 14.2% gain for MKGO 0.1 over the control at 28 days; stiffness, voids and toughness (no unit) likewise.',
  'Flow diameters (407.50, 395.33, 388.33 and 381.67 mm) are listed with "respectively" in a sentence that names no pastes; water-absorption values are given as "rate … mm" without a defined unit. Neither is transcribed.',
  'MKGO 0.5 water-absorption results were not plotted because its specimen cracked during that test (§3, Figure 10); its strength and stiffness were reported.',
  'Second review (2 Nov 2026): 0 value errors; see the batch audit.']});
