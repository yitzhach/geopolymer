// Ceramic brick waste / metakaolin waste geopolymer binders F1–F5 — Tables 3–4 and values stated in §3.
import {source,table,tableQuote,num,expect,sheetHeader,save} from './_common.mjs';
const G='brick-mk-waste-thermal-tradeoff',src=await source(G),t3=table(src,3),t4=table(src,4);
expect(t3.header.at(-1),['Mix No.','CBW','MKW','NaOH','Na2SiO3','SiO2/Al2O3(Si/Al)','H2O/Na2O','Na2O/Al2O3(Na/Al)','SiO2/Na2O(Si/Na)','SSA1','AS/P2','W/S3'],'Table 3 header');
expect(t4.header.at(-1),['Mix No.','AS/P Ratio','Fresh Paste Density, kg/m3','Initial','Final','Vicat Plunger Time to Bottom, s','Spread Diameter, mm'],'Table 4 header');
// "9.79 (4.89)" → [9.79, 4.89]: oxide ratio and, in brackets, the element ratio.
const pair=c=>{const m=String(c).match(/^(\d+(?:\.\d+)?) \((\d+(?:\.\d+)?)\)$/);if(!m)throw new Error(`"${c}" is not "a (b)"`);return [Number(m[1]),Number(m[2])];};
const mixes=t3.rows.map((r,i)=>{const text=tableQuote(t3,i),[sa,si]=pair(r[5]),[na2,na]=pair(r[7]);
 const act=v=>({value:num(v),unit:'wt%',basis:'precursor-mass',basisNote:'Table 3 "wt.%"; NaOH + Na2SiO3 equals AS/P × 100, and AS/P is alkali solution to precursor (powder) per the Table 3 footnote',text});
 return {id:r[0],control:r[0]==='F1',form:'paste',cure:'c1',
  quantities:[{material:'cbw',value:num(r[1]),unit:'wt%',basis:'precursor-mass',text},{material:'mkw',value:num(r[2]),unit:'wt%',basis:'precursor-mass',text},
   {material:'naoh',...act(r[3])},{material:'ss',...act(r[4])}],
  parameters:[{key:'SiO2/Al2O3',value:sa,text},{key:'Si/Al',value:si,text},{key:'H2O/Na2O',value:num(r[6]),text},{key:'Na2O/Al2O3',value:na2,text},{key:'Na/Al',value:na,text},
   {key:'activator/precursor',value:num(r[10]),basisNote:'AS/P: alkaline solution to precursor',text},{key:'water/solids',value:num(r[11]),basisNote:'W/S',text},
   {key:'hydroxide-molarity',value:8,text:'The NaOH solution (Figure 1c) was prepared by combining sodium hydroxide pellets (97% purity) with a specified volume of distilled water, yielding a solution concentration of 8 M.'}]};});
const results=[];
t4.rows.forEach((r,i)=>{const text=tableQuote(t4,i,{cols:[0,2,3,4,6]});
 for(const [c,test] of [[2,'rho'],[3,'ist'],[4,'fst'],[6,'flow']])results.push({mix:r[0],test,ageDays:null,ageNote:'fresh paste',value:num(r[c]),text,locator:'Table 4'});});
const f1='The reference specimens (F1) were composed of 100% CBW, and their compressive strength was found to be 26.8 and 32.6 MPa after 7 and 28 days, respectively.';
results.push({mix:'F1',test:'fc',ageDays:7,value:26.8,text:f1,locator:'§3 / Figure 7b'},{mix:'F1',test:'fc',ageDays:28,value:32.6,text:f1,locator:'§3 / Figure 7b'},
 {mix:'F5',test:'ff',ageDays:28,value:1.38,text:'the lowest recorded strength of 1.38 MPa occurring after 28 days in the composition (F5) containing 100% metakaolin waste precursor',locator:'§3 / Figure 7d'},
 {mix:'F1',test:'ml',ageDays:90,condition:'During the execution of the free-drying shrinkage evaluation',value:8.7,text:'The mass change after 90 days for the F1 reference composition specimens was the lowest (8.7%)',locator:'§3 / Figure 10'});
await save({...sheetHeader(G,'10.3390/ma19183890',src,'All five Table 3 binders (ceramic brick waste replaced 0–100 wt.% by metakaolin waste) with activator doses and molar ratios, their Table 4 fresh density, setting times and spread, and the strength and mass-change values stated for F1 and F5. Other strengths, shrinkage and post-heating values are in figures.',{made:'2026-11-02',audit:'research/batches/source-text-batch4-2026-11-02.json'}),
 materials:[{id:'cbw',family:'ceramic-waste',role:'precursor',name:'ceramic brick waste',aliases:['CBW']},
  {id:'mkw',family:'metakaolin',role:'precursor',name:'metakaolin waste',aliases:['MKW']},
  {id:'naoh',family:'sodium-hydroxide',role:'activator',name:'NaOH solution',aliases:['NaOH']},
  {id:'ss',family:'sodium-silicate-solution',role:'activator',name:'Na2SiO3 solution',aliases:['Na2SiO3'],detail:'The Na2SiO3 solution (Figure 1d) was procured from a local chemical compounds supplier with a silica modulus (Ms) of 3.0 (Na2O: 9.3%, SiO2: 28.0%,) and a specific gravity of 1.38 g/cm3.'}],
 mixes,
 cures:[{id:'c1',category:'heat',temperatureC:60,duration:24,durationUnit:'h',sealed:true,humidityPercent:null,text:'To mitigate moisture loss during the early stages of the curing process, the molds were coated with polypropylene film. Subsequent to specimen formation, the specimens of geopolymer binder were placed in an environmental setting at ambient temperature (20 ± 2 °C, 45% relative humidity) for a period of 24 h, allowing them to rest. After a rest period of 24 h, a furnace-curing regime was employed (60 °C for 24 h).'}],
 tests:[{id:'rho',property:'density',unit:'kg/m3',specimen:'fresh paste',method:null},{id:'ist',property:'initial-setting-time',unit:'min',specimen:'paste',method:'EN 196-3 Vicat'},
  {id:'fst',property:'final-setting-time',unit:'min',specimen:'paste',method:'EN 196-3 Vicat'},{id:'flow',property:'flow',unit:'mm',specimen:'fresh paste',method:'spread diameter'},
  {id:'fc',property:'compressive-strength',unit:'MPa',specimen:'40 mm cubes',method:'EN 12390-3'},{id:'ff',property:'flexural-strength',unit:'MPa',specimen:'160 × 40 × 40 mm prisms',method:'EN 12390-5'},
  {id:'ml',property:'mass-loss',unit:'%',specimen:'160 × 40 × 40 mm prisms',method:'mass change during drying-shrinkage test'}],
 results,
 findings:[{goal:'Lowest thermal shrinkage and mass loss after heating',mix:'F1',text:'It was found that the composition (F1), comprising solely ceramic brick waste precursor, yielded the most efficacious performance, characterized by the lowest thermal shrinkage.'}],
 notes:[],
 gaps:['Table quotes follow the standard form. Oxide ratios with element ratios in brackets (e.g. "9.79 (4.89)") are split into SiO2/Al2O3 and Si/Al, and Na2O/Al2O3 and Na/Al. SSA (specific surface area) and Si/Na are not transcribed.',
  'Activator doses are printed as "wt.%"; their sum equals AS/P × 100 for every mix, so they are read as % of precursor mass (noted per value). The silicate stock modulus is 3.0; NaOH is 8 M.',
  'Compressive strength of F2–F5, flexural strength of F1–F4, drying shrinkage, softening coefficients and residual strengths after 200–800 °C are only in Figures 7–13; F2–F5 mass change is given only as a range (11.1–17.0%).',
  'Second review (2 Nov 2026): 0 value errors; see the batch audit.']});
