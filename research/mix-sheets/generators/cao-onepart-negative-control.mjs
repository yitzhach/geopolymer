// One-part metakaolin geopolymers with CaO — Table 2 batches and strengths stated in §2.1 and §4.
import {source,table,tableQuote,num,expect,sheetHeader,save} from './_common.mjs';
const G='cao-onepart-negative-control',src=await source(G),t=table(src,2);
expect(t.header.at(-1),['Sample','Solid Activator/g','Metakaolin/g','Silica Fume/g','CaO/g','Liquid/Solid Ratio'],'Table 2 header');
const cols=[[1,'sa'],[2,'mk'],[3,'sf'],[4,'cao']];
const mixes=t.rows.map((r,i)=>{const text=tableQuote(t,i);
 return {id:r[0],control:r[0]==='GEO-1',form:'paste',cure:'c1',
  quantities:cols.map(([c,m])=>({material:m,value:num(r[c]),unit:'g',basis:'batch',text})),
  parameters:[{key:'liquid/solid',value:num(r[5]),basisNote:'deionized water to total solids, as printed',text}]};});
const g1='The CaO-free sample (GEO-1) achieved the highest compressive strengths of approximately 34, 45, and 56 MPa at 3, 7, and 28 days, respectively.';
const g3='When the CaO dosage reached 5% (GEO-3), the strength reached its minimum at all curing ages, falling to approximately 8, 13, and 17 MPa.';
const ages='Figure 1 depicts the evolution of compressive strength for metakaolin-based one-part geopolymers with varying CaO dosages after curing for 3, 7 and 28 d.';
const g4='A noticeable strength increase was observed when the CaO dosage was further elevated to 7.5% (GEO-4), with its 28 d compressive strength rebounding to 31.3 MPa.';
const g5='As the CaO dosage reached 10% (GEO-5), the compressive strength exhibited a minor secondary decrease to 23.2 MPa.';
const R=(mix,ageDays,value,text,extra={})=>({mix,test:'fc',ageDays,value,text,locator:'§2.1 / Figure 1',...extra});
await save({...sheetHeader(G,'10.3390/molecules31173132',src,'All five Table 2 one-part pastes (0–10 g CaO replacing cementitious material in a 100 g batch) with exact masses and liquid/solid ratios, and the compressive strengths stated in the text for GEO-1, GEO-3, GEO-4 and GEO-5.',{made:'2026-11-02',audit:'research/batches/source-text-batch4-2026-11-02.json'}),
 materials:[{id:'sa',family:'sodium-silicate-solid',role:'activator',name:'solid alkali activator',aliases:['Solid Activator'],detail:'Sodium hydroxide and quartz powder were uniformly mixed in a mass ratio of 1:1, ground in a planetary ball mill (YXQM-2L, MITR, Changsha, China) at 500 rpm for 10 min, and then transferred to a muffle furnace (KSL-1200X, Kejing, Hefei, China) for calcination at 650 °C for 4 h.'},
  {id:'mk',family:'metakaolin',role:'precursor',name:'Metakaolin',detail:'The metakaolin was obtained by calcining kaolin at 700 °C for 12 h in a muffle furnace.'},
  {id:'sf',family:'silica-fume',role:'precursor',name:'Silica Fume'},
  {id:'cao',family:'calcium-hydroxide',role:'additive',name:'CaO',aliases:['calcium oxide'],detail:'calcium oxide (≥97% purity)'}],
 mixes,
 cures:[{id:'c1',category:'ambient',temperatureC:null,duration:24,durationUnit:'h',sealed:true,humidityPercent:null,text:'The samples were demolded after sealed curing for 24 h at room temperature and continued to be cured under the same conditions until the ages of 3, 7 and 28 d for mechanical property tests and microstructural characterizations, respectively.'}],
 tests:[{id:'fc',property:'compressive-strength',unit:'MPa',specimen:'40 mm × 40 mm × 40 mm cubes',method:'CSS-55500 universal testing machine'}],
 results:[R('GEO-1',3,34,g1,{qualifier:'approximately'}),R('GEO-1',7,45,g1,{qualifier:'approximately'}),R('GEO-1',28,56,g1,{qualifier:'approximately'}),
  ...[[3,8],[7,13],[28,17]].map(([a,v])=>R('GEO-3',a,v,g3,{qualifier:'approximately',ageText:ages})),
  R('GEO-4',28,31.3,g4),R('GEO-5',28,23.2,g5,{ageText:g4})],
 findings:[{goal:'Highest compressive strength',mix:'GEO-1',text:g1}],
 notes:[{mix:'GEO-3',kind:'failure',text:g3}],
 gaps:['Table quotes follow the standard form. CaO replaces the cementitious materials by equal mass in a fixed 100 g batch; water (as liquid/solid) rises with CaO.',
  'Source conflict kept visible: §4 says every CaO sample had 28-day strength below 25 MPa, but §2.1 gives GEO-4 31.3 MPa. GEO-1 28-day strength is "approximately 56 MPa" in §2.1 (recorded) and 56.6 MPa in §4 and the abstract. GEO-5\'s sentence directly follows the GEO-4 28-day sentence and gives no age of its own; 28 d is read from that sequence.',
  'GEO-2 strengths, and all other ages for GEO-4/GEO-5, are only in Figure 1. Nitrogen-adsorption data (Table 1) are not mix-table properties.',
  'Second review pending; see the batch audit.']});
