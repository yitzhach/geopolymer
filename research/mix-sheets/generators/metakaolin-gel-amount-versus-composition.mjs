// Silicate-activated metakaolin pastes with and without Ca — Table 1 design ratios, Table 2 NMR gel fraction.
import {source,table,tableQuote,num,expect,sheetHeader,save} from './_common.mjs';
const G='metakaolin-gel-amount-versus-composition',src=await source(G),t1=table(src,1),t2=table(src,2);
expect(t1.header.at(-1),['Mixture Number','Na/Al','Si/Al','H2O/Na2O','Ca/Si'],'Table 1 header');
expect(t2.header.at(-1),['Mix No.','Na/Al','Si/Al','Si/Al','Si, mol%','Si/Al','Si, mol%'],'Table 2 header');
const keys=['Na/Al','Si/Al','H2O/Na2O','Ca/Si'];
const mixes=t1.rows.map((r,i)=>{const text=tableQuote(t1,i,{cols:[1,2,3,4],key:0}),n=Number(r[0]),ca=num(r[4])>0;
 return {id:`Mixture ${n}`,aliases:[`Mixture Number ${n}`,`Mix No. ${n}`],control:false,form:'paste',cure:'c1',
  quantities:[{material:'mk',value:null,missing:'mass not tabulated; the design is given as molar ratios',text:'Geopolymer mixtures were synthesized using metakaolin (MetaMax®, BASF, Ludwigshafen, Germany) as the precursor.'},
   ...['ss','naoh'].map(m=>({material:m,value:null,missing:'activator masses not tabulated; Na/Al and H2O/Na2O are given',text:src.blocks.find(b=>b.startsWith('Geopolymer mixtures were synthesized'))})),
   ...(ca?[{material:'caoh2',value:null,missing:'amount given only as the Ca/Si ratio',text:'For mixtures containing Ca, the desired amount of calcium hydroxide was first mixed with the metakaolin precursor.'}]:[])],
  parameters:keys.map((k,j)=>({key:k,value:num(r[j+1]),basisNote:'molar ratio of the mixture design',text}))};});
const results=t2.rows.map((r,i)=>({mix:`Mixture ${Number(r[0])}`,test:'gel',ageDays:7,value:num(r[4]),text:tableQuote(t2,i,{cols:[1,2,3,4],key:0}),ageText:'All tests were carried out at 7 days after mixing.',locator:'Table 2'}));
await save({...sheetHeader(G,'10.3390/ma13245784',src,'All seven Table 1 mixtures (molar design ratios; mixtures 5–7 add calcium hydroxide) and, for the non-calcium mixtures 1–4, the 7-day NMR geopolymer-gel fraction from Table 2. Strengths are plotted only in Figures 3–4 and are not transcribed.',{made:'2026-11-02',audit:'research/batches/source-text-batch2-2026-11-02.json'}),
 materials:[{id:'mk',family:'metakaolin',role:'precursor',name:'metakaolin',detail:'The average particle size of metakaolin is 1.3 µm based on the manufacturer’s data.'},
  {id:'ss',family:'sodium-silicate-solution',role:'activator',name:'sodium silicate solution',detail:'sodium silicate solution (29.02 wt % SiO2, 9.00 wt % Na2O and 61.98 wt % H2O, Fisher, Waltham, MA, USA)'},
  {id:'naoh',family:'sodium-hydroxide',role:'activator',name:'sodium hydroxide',detail:'reagent-grade sodium hydroxide (Fisher, Waltham, MA, USA)'},
  {id:'caoh2',family:'calcium-hydroxide',role:'additive',name:'calcium hydroxide'}],
 mixes,
 cures:[{id:'c1',category:'moist',temperatureC:25,duration:3,durationUnit:'h',sealed:null,humidityPercent:100,text:'Specimens were stored in a curing room at 25 °C and 100% relative humidity for around 3 h and then heated at 60 °C and ambient humidity and pressure for 2 h. After this heat treatment, they were put back in the curing room until around 24 h after mixing, when they were demolded. The demolded specimens were kept in the curing room until testing.'}],
 tests:[{id:'gel',property:'other',propertyNote:'Share of the mixture’s Si in geopolymer gel (Si, mol%) by 29Si NMR with chemical extraction — a degree-of-reaction measure',unit:'mol%',specimen:'ground paste',method:'29Si NMR with chemical extraction'}],
 results,
 findings:[],
 notes:[{mix:'Mixture 1',kind:'failure',text:'It should be noted that Mixture 1 was excluded in both figures, as the samples were poorly consolidated as a result of extremely low workability.'}],
 gaps:['Table quotes name each row by its key column ("Mixture Number 4", "Mix No. 4"); the sheet labels the mixtures "Mixture n" as the text does.',
  'No masses are tabulated: the design is given only as molar Na/Al, Si/Al, H2O/Na2O and Ca/Si ratios.',
  'Compressive strengths (7 days, ASTM C109) are plotted in Figures 3–4 only; the text gives no per-mixture values.',
  'Gel composition (Si/Al of gel and of unreacted metakaolin) in Table 2 is not transcribed; gel amounts for the calcium mixtures 5–7 are not tabulated.',
  'Cure: first stage 25 °C / 100% RH for about 3 h, then 2 h at 60 °C, then the curing room until testing at 7 days.',
  'Second review (2 Nov 2026): 0 value errors; see the batch audit.']});
