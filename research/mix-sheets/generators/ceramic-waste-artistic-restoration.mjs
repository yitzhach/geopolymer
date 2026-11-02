// Metakaolin geopolymer mortars with ceramic and gypsum waste fillers — Table 2 (mixes are columns) and Table 5.
import {source,table,tableQuote,num,expect,sheetHeader,save} from './_common.mjs';
const G='ceramic-waste-artistic-restoration',src=await source(G),t2=table(src,2),t5=table(src,5);
const ids=['MK','PS-MK','RP-MK','RPdry-MK','Gy-MK','MIX-MK'];
expect(t2.header.at(-1),['Materials (wt.%)','MK','PS-MK','RP-MK','RPdry-MK (1)','Gy-MK','MIX-MK'],'Table 2 header');
expect(t5.header.at(-1),['Sample Properties',...ids],'Table 5 header');
expect(t2.rows.map(r=>r[0]),['Metakaolin','NaOH','Sodium silicate','Pressed burnt and extruded ceramic waste','Raw pressed','Gypsum'],'Table 2 rows');
const mat=['mk','naoh','ss','ps','rp','gy'];
const mixes=ids.map((id,j)=>{const q=[];
 t2.rows.forEach((r,i)=>{if(r[j+1]!=='-')q.push({material:mat[i],value:num(r[j+1]),unit:'wt%',basis:'total-mass',text:tableQuote(t2,i,{cols:[0,j+1]})});});
 return {id,control:id==='MK',form:id==='MK'?'paste':'mortar',cure:'c1',quantities:q,
  parameters:id==='MK'?[{key:'liquid/solid',value:1.4,text:'BASF Matamax® metakaolin was then incorporated into the activating solution with a liquid-to-solid ratio of 1.4:1 by weight and mixed by a mechanical mixer for 10 min at 800 rpm'}]:[]};});
// "1773 ± 95" → value and spread; ">25" → greater-than; a bare number has no spread.
const cell=c=>{let m;if((m=c.match(/^(\d+(?:\.\d+)?) ± (\d+(?:\.\d+)?)$/)))return {value:Number(m[1]),spread:Number(m[2])};
 if((m=c.match(/^>(\d+(?:\.\d+)?)$/)))return {value:Number(m[1]),qualifier:'greater-than'};return {value:num(c)};};
const rowOf=l=>{const i=t5.rows.findIndex(r=>r[0]===l);if(i<0)throw new Error(`Table 5 row ${l}`);return i;};
const results=[];
for(const [label,test] of [['Density (kg/m3)','rho'],['Water absorption (%)','wa'],['Compressive strength (MPa)','fc']]){const i=rowOf(label);
 ids.forEach((id,j)=>results.push({mix:id,test,...(test==='fc'?{ageDays:28,ageText:'The tests were performed after 28 days of curing at room temperature, and the values reported are the averages of 5 compression strength values.'}:{ageDays:null,ageNote:'age not stated; specimens followed the 28-day curing schedule'}),
  ...cell(t5.rows[i][j+1]),text:tableQuote(t5,i,{cols:[0,j+1]}),locator:'Table 5 (± definition not stated)'}));}
await save({...sheetHeader(G,'10.3390/ma15238600',src,'All six Table 2 samples (neat MK geopolymer and five waste-filled mortars, wt.% of the batch) with their Table 5 density, water absorption and compressive strength.',{made:'2026-11-02',audit:'research/batches/source-text-batch3-2026-11-02.json'}),
 materials:[{id:'mk',family:'metakaolin',role:'precursor',name:'Metakaolin',aliases:['BASF Matamax® metakaolin']},
  {id:'naoh',family:'sodium-hydroxide',role:'activator',name:'NaOH',detail:'NaOH in pellets was dissolved in the sodium silicate solution to prepare the alkaline activating solution.'},
  {id:'ss',family:'sodium-silicate-solution',role:'activator',name:'Sodium silicate',detail:'The chemical composition of the alkaline activating solution is Na2O 1.55 SiO2 12.14 H2O.'},
  {id:'ps',family:'ceramic-waste',role:'aggregate',name:'Pressed burnt and extruded ceramic waste',aliases:['PS']},
  {id:'rp',family:'ceramic-waste',role:'aggregate',name:'Raw pressed',aliases:['RP'],detail:'RPdry refers to raw pressed ceramic waste annealed at 750 °C for 5 h in air'},
  {id:'gy',family:'gypsum',role:'aggregate',name:'Gypsum',aliases:['Gy']}],
 mixes,
 cures:[{id:'c1',category:'heat',temperatureC:60,duration:24,durationUnit:'h',sealed:null,humidityPercent:null,text:'As soon as prepared, all the specimens were cast in cubic moulds (50 × 50 × 50 mm3) and cured in >95% relative humidity conditions at 60 °C for 24 h. Subsequently, the specimens were kept at room temperature for a further 6 days in >95% relative humidity conditions, and then for a further 21 days in air'}],
 tests:[{id:'rho',property:'density',unit:'kg/m3',specimen:'cubes',method:null},{id:'wa',property:'water-absorption',unit:'%',specimen:'cubes',method:null},
  {id:'fc',property:'compressive-strength',unit:'MPa',specimen:'40 × 40 × 40 mm3 cubes, mean of 5',method:'EN 196-1'}],
 results,
 findings:[],
 notes:[{mix:'Gy-MK',kind:'tradeoff',text:tableQuote(t5,rowOf('Compressive strength (MPa)'),{cols:[0,5]})}],
 gaps:['Mixes are columns in Tables 2 and 5, so each table quote pairs the row label with that sample\'s column. RPdry-MK is headed "RPdry-MK (1)" in Table 2 (footnote: raw pressed waste annealed at 750 °C for 5 h).',
  'Table 2 gives wt.% of the whole batch (columns sum to 100); NaOH is pellets dissolved in the silicate solution. The "±" in Table 5 is not defined (strength is the mean of 5 specimens).',
  'Specimens were cast in 50 mm moulds but strength is reported on 40 mm cubes; both stated, not reconciled.',
  'Density and water-absorption test ages are not stated. Gy-MK and MIX-MK water absorption is printed only as ">25".',
  'Second review pending; see the batch audit.']});
