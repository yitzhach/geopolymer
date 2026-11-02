// PP-fibre GBFS geopolymer mortars — Table 1 (g/kg), Table 3 split-Hopkinson peak stress, control flow in §3.
import {source,table,tableQuote,num,expect,sheetHeader,save} from './_common.mjs';
const G='pp-fiber-impact-static-tradeoff',src=await source(G),t1=table(src,1),t3=table(src,3);
expect(t1.header.at(-1),['Groups','Slag','Alkali Activator Solution','Sand','PPF Vpf (%)'],'Table 1 header');
expect(t3.header.at(-1),['Sample','Impact Air Pressure (MPa)','Average Strain Rate /(s−1)','Peak Stress/MPa','Ultimate Toughness/(J·cm−3)','Peak Strain/103','DIF'],'Table 3 header');
const act='A specific amount of Na2SiO3, NaOH and water was used to prepare the alkali activators, which had a modulus of 1.8 and solid content of 20%.';
const wb='The water-to-binder (w/b) ratio was set at 0.55 for all mortar mixes in this study.';
// Table 3 sample names are "<group with 0.0% for Ctrl>-<pressure index>"; each becomes an alias of its mix.
const prefix=r=>r[0]==='Ctrl'?'PPF-0.0%':r[0];
const mixes=t1.rows.map((r,i)=>{const text=tableQuote(t1,i),samples=t3.rows.map(x=>x[0]).filter(s=>s.startsWith(prefix(r)+'-'));
 expect(samples.length,4,`${r[0]} Table 3 specimens`);
 return {id:r[0],aliases:[...(r[0]==='Ctrl'?['PPF-0.0%']:[]),...samples],control:r[0]==='Ctrl',form:'mortar',cure:'c1',
  quantities:[{material:'slag',value:num(r[1]),unit:'part',basis:'mass-parts',text},{material:'act',value:num(r[2]),unit:'part',basis:'mass-parts',text},{material:'sand',value:num(r[3]),unit:'part',basis:'mass-parts',text},
   {material:'ppf',value:num(r[4]),unit:'vol%',basis:'volume',basisNote:'PPF volume fraction of the total mixture volume',text}],
  parameters:[{key:'water/binder',value:0.55,basisNote:'basis not stated',text:wb},{key:'activator-modulus',value:1.8,text:act}]};});
const results=t3.rows.map((r,i)=>{const mix=t1.rows.find(x=>r[0].startsWith(prefix(x)+'-'))[0];
 return {mix,test:'dyn',ageDays:null,ageNote:'test age not stated (mechanical tests at 3, 7 and 28 days)',condition:tableQuote(t3,i,{cols:[0,1]}),value:num(r[3]),text:tableQuote(t3,i,{cols:[0,1,3]}),locator:'Table 3'};});
results.push({mix:'Ctrl',test:'flow',ageDays:null,ageNote:'fresh test',value:253,text:'The flowability of the plain mortar (Ctrl) is measured at 253 mm.',locator:'§3 / Figure 3'});
await save({...sheetHeader(G,'10.3390/ma19204263',src,'All six Table 1 mortars (Ctrl and 0.2–1.0 vol% PP fibre) with the shared g/kg batch, the Table 3 split-Hopkinson peak stress of each mortar at four impact pressures, and the control flow. Static strengths are plotted only in Figure 4.',{made:'2026-11-02',audit:'research/batches/source-text-batch4-2026-11-02.json'}),
 materials:[{id:'slag',family:'slag',role:'precursor',name:'granulated blast furnace slag',aliases:['GBFS','Slag']},
  {id:'act',family:'sodium-silicate-solution',role:'activator',name:'Alkali Activator Solution',detail:act},
  {id:'sand',family:'sand',role:'aggregate',name:'River sand',aliases:['Sand'],detail:'River sand was used as the fine aggregate in this study, with a fineness modulus of 2.36 and an apparent density of 3000 kg/m3.'},
  {id:'ppf',family:'pp-fiber',role:'fiber',name:'PPFs',aliases:['PPF'],detail:'PPFs with lengths of 13 mm, diameter of 150 µm and density of 0.91 g/cm3 were used in this research [26].'}],
 mixes,
 cures:[{id:'c1',category:'moist',temperatureC:20,duration:24,durationUnit:'h',sealed:true,humidityPercent:null,text:'Subsequently, the mortar, sealed in the molds, is placed in a curing room with a humidity level of no less than 95% and a temperature of (20 ± 2) °C for 24 h. For specimens with uneven surfaces, it is necessary to use a grinding machine for surface treatment before placing the specimens back in the curing room for continued curing.'}],
 tests:[{id:'dyn',property:'other',propertyNote:'Dynamic peak stress (split Hopkinson pressure bar) at the stated impact air pressure',unit:'MPa',specimen:'cylinders 74 mm diameter × 37 mm',method:'SHPB'},
  {id:'flow',property:'flow',unit:'mm',specimen:'fresh mortar',method:'GB/T 2419-2024'}],
 results,findings:[],notes:[],
 gaps:['Table 1 is in g/kg of mortar (recorded as mass parts); the activator is one solution (modulus 1.8, 20% solids) made from Na2SiO3, NaOH and water. Fibre is dosed by volume of the total mixture.',
  'Table 3 names specimens "PPF-0.0%-1 … PPF-1.0%-4"; the 0.0% series is the Ctrl mix and the suffix is the impact-pressure index (0.35, 0.45, 0.55, 0.65 MPa), quoted as each result\'s condition. Strain rate, toughness, peak strain and DIF are not transcribed.',
  'Static compressive strength at 3, 7 and 28 days is only in Figure 4; flow values other than Ctrl are stated by fibre content without the group label (0.2%: 248 mm; 1.0%: 224 mm).',
  'Second review (2 Nov 2026): 0 value errors; see the batch audit.']});
