// Red mud / fly ash / GGBS engineered geopolymer composite — Tables 2, 3 and 5 plus two flow values in §3.1.
import {source,table,tableQuote,num,valueSd,expect,sheetHeader,save} from './_common.mjs';
const G='red-mud-egc-strength-ductility',src=await source(G);
const t2=table(src,2),t3=table(src,3),t5=table(src,5);
expect(t2.header.at(-1),['Mix IDs','GGBS','FA','RM','QS','Activator','Water','BaCl2','PE Fiber'],'Table 2 header');
expect(t3.header.at(-1),['Mix IDs','fc (MPa)','εc (%)','E (GPa)'],'Table 3 header');
expect(t5.header.at(-1),['Mix IDs','σtc (MPa)','σtu (MPa)','εtu (%)','gse (kJ/m3)'],'Table 5 header');
const mix='The alkaline activator was prepared by mixing a 10 mol/L sodium hydroxide solution with a water glass solution in a mass ratio of 1:2.';
const fixed='The proportions of the remaining EGC constituents were kept constant: the water-to-binder ratio was 0.32, the alkali content was 6.8%, the alkali activator modulus was 1.2, the sand-to-binder ratio was 0.2, the PE fiber content was 2 vol.%, and the BaCl2 content was 1%.';
const materials=[
 {id:'ggbs',family:'slag',role:'precursor',name:'ground granulated blast-furnace slag',aliases:['GGBS']},
 {id:'fa',family:'fly-ash',role:'precursor',name:'fly ash',aliases:['FA']},
 {id:'rm',family:'red-mud',role:'precursor',name:'red mud',aliases:['RM']},
 {id:'qs',family:'sand',role:'aggregate',name:'quartz sand',aliases:['QS'],detail:'Quartz sand with a particle-size range of approximately 101–310 μm was used as the aggregate'},
 {id:'act',family:'other-activator',role:'activator',name:'alkaline activator',aliases:['Activator'],detail:mix},
 {id:'naoh',family:'sodium-hydroxide',role:'activator',name:'sodium hydroxide solution',detail:'10 mol/L sodium hydroxide solution'},
 {id:'wg',family:'sodium-silicate-solution',role:'activator',name:'water glass solution',detail:'The inherent modulus of the water glass solution (the ratio of SiO2 to Na2O in moles) is 2.25, and the mass fractions of Na2O and SiO2 are 13.75% and 29.99% respectively.'},
 {id:'water',family:'water',role:'water',name:'water',aliases:['Water']},
 {id:'bacl2',family:'retarder',role:'additive',name:'barium chloride',aliases:['BaCl2'],detail:'barium chloride (BaCl2) was incorporated as a retarder to regulate the setting time'},
 {id:'pe',family:'other-fiber',role:'fiber',name:'PE fibers',aliases:['PE Fiber','UHMWPE'],detail:'Ultra-high-molecular-weight polyethylene (UHMWPE, hereafter PE) fibers with a length of 12 mm and a diameter of 24 μm'}];
const parameters=[
 {key:'water/binder',value:0.32,basisNote:'basis not stated',text:fixed},
 {key:'alkali-dose',value:6.8,basisNote:'basis not stated ("alkali content")',text:fixed},
 {key:'activator-modulus',value:1.2,text:fixed},
 {key:'sand/binder',value:0.2,basisNote:'basis not stated',text:fixed},
 {key:'hydroxide-molarity',value:10,text:mix},
 {key:'silicate/hydroxide',value:2,text:mix}];
const col=['ggbs','fa','rm','qs','act','water','bacl2','pe'];
const mixes=t2.rows.map((r,i)=>{
 const text=tableQuote(t2,i);
 return {id:r[0],control:false,form:'composite',cure:'c1',
  quantities:[...col.map((m,j)=>({material:m,value:num(r[j+1]),unit:'kg/m3',basis:'per-m3',text})),
   ...['naoh','wg'].map(m=>({material:m,value:null,missing:'only the blended activator mass is tabulated; the 1:2 NaOH:water-glass mass split is stated but not converted here',text:mix}))],
  parameters};
});
const age='where they were cured for 28 d prior to testing',results=[];
t3.rows.forEach((r,i)=>{const text=tableQuote(t3,i);
 for(const [c,test] of [[1,'fc'],[3,'E']]){const [value,spread]=valueSd(r[c]);results.push({mix:r[0],test,ageDays:28,value,spread,text,ageText:age,locator:'Table 3 (values in parentheses are standard deviations)'});}});
t5.rows.forEach((r,i)=>{const text=tableQuote(t5,i);
 for(const [c,test] of [[2,'ftu'],[3,'etu']]){const [value,spread]=valueSd(r[c]);results.push({mix:r[0],test,ageDays:28,value,spread,text,ageText:age,locator:'Table 5 (values in parentheses are standard deviations)'});}});
const fl='Among all mixtures, G20F80R0, which contained no RM, exhibited the highest flow spread of 166 mm, whereas G20F50R30, with the highest RM content, showed the lowest value of only 152.5 mm.';
results.push({mix:'G20F80R0',test:'flow',ageDays:null,ageNote:'fresh test',value:166,text:fl,locator:'§3.1'},{mix:'G20F50R30',test:'flow',ageDays:null,ageNote:'fresh test',value:152.5,text:fl,locator:'§3.1'});
await save({...sheetHeader(G,'10.3390/polym18182271',src,'All ten mixes of Table 2 (kg/m3) with the fixed design ratios; 28-day compressive strength and elastic modulus (Table 3), tensile strength and ultimate tensile strain (Table 5), and the two flow values stated in the text. First-cracking strength, peak strain, strain energy and crack-pattern data are not transcribed.'),
 materials,mixes,
 cures:[{id:'c1',category:'moist',temperatureC:20,duration:28,durationUnit:'d',sealed:true,humidityPercent:null,text:'Immediately after casting, all specimens were sealed with plastic film. After 24 h, they were demolded and transferred to a standard curing room maintained at 20 ± 2 °C and a relative humidity of at least 90%, where they were cured for 28 d prior to testing.'}],
 tests:[{id:'fc',property:'compressive-strength',unit:'MPa',specimen:'φ50 mm × 100 mm cylinders',method:'ASTM C39/C39M-24'},
  {id:'E',property:'elastic-modulus',unit:'GPa',specimen:'φ50 mm × 100 mm cylinders',method:'ASTM C39/C39M-24; chord between 0.00005 strain and 40% of ultimate load'},
  {id:'ftu',property:'direct-tensile-strength',unit:'MPa',specimen:'dog-bone, 80 mm gauge',method:'JSCE recommendations, 0.5 mm/min'},
  {id:'etu',property:'tensile-strain-capacity',unit:'%',specimen:'dog-bone, 80 mm gauge',method:'JSCE recommendations, 0.5 mm/min'},
  {id:'flow',property:'flow',unit:'mm',specimen:'truncated cone',method:'GB/T 2419-2005'}],
 results,
 findings:[{goal:'Highest compressive strength',mix:'G50F50R0',text:'G50F50R0 exhibited the highest compressive strength of 111.7 MPa, whereas G20F50R30 showed the lowest value of 70.3 MPa, representing a reduction of 37.1%.'}],
 notes:[{mix:'G20F50R30',kind:'tradeoff',text:'G20F50R30 showed the lowest value of 70.3 MPa'}],
 gaps:['Table quotes follow the standard form (Table N (caption): header → row); QS, activator, water, BaCl2 and PE fibre are single cells spanning all ten rows in the source.',
  'The activator is tabulated only as one blended mass; the NaOH and water-glass masses are not split here.',
  'Water/binder, alkali content and sand/binder bases are not stated (water/binder 0.32 cannot be reproduced from the Water column alone, so it presumably includes activator water); flow values exist in text for two mixes only, the rest are in Figure 5.',
  'First-cracking strength (σtc), peak compressive strain (εc), strain energy (gse) and crack width/number (Table 4) are not mapped to a vocabulary property and are not transcribed.',
  'Second review (26 Oct 2026): 0 value errors; see the batch audit.']});
