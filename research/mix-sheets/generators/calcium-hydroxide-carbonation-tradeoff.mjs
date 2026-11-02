// Ca(OH)2-modified fly ash / metakaolin geopolymer pastes — Table 2 and 28-day carbonation depths (§3.2).
import {source,table,tableQuote,num,expect,sheetHeader,save} from './_common.mjs';
const G='calcium-hydroxide-carbonation-tradeoff',src=await source(G),t=table(src,2);
expect(t.header.at(-1),['Serial Number','Incorporation Amount of Ca(OH)2 (%)','FA (%)','MK (%)','The Water–Binder Ratio','Mode of Maintenance'],'Table 2 header');
const act='Before the test, the water–binder ratio was controlled to 0.65, and the modulating modulator and concentration were 1.2 and 36%, respectively.';
const mk='Sodium hydroxide solid (purity of 99.5%) and deionized water were added to the raw material of the activator to make modified sodium silicate as the activator.';
const dose='The modification effect of Ca(OH)2 on the carbonation resistance of the polymer was studied by adding Ca(OH)2, with mass fractions of raw material of 5% and 10%.';
const mixes=t.rows.map((r,i)=>{
 const text=tableQuote(t,i),pc=r[0]==='PC0.65',q=[];
 if(r[1]!=='-')q.push({material:'caoh2',value:num(r[1]),unit:'wt%',basis:'binder-as-defined',basisNote:'mass fraction of raw material (fly ash + metakaolin)',text});
 if(!pc){q.push({material:'fa',value:num(r[2]),unit:'wt%',basis:'precursor-mass',text},{material:'mk',value:num(r[3]),unit:'wt%',basis:'precursor-mass',text},
  ...['ss','naoh'].map(m=>({material:m,value:null,missing:'activator mass not given; modulus 1.2 and concentration 36% are stated',text:mk})));}
 else q.push({material:'opc',value:null,missing:'cement mass not given; only water/binder 0.65 is stated',text});
 return {id:r[0],control:pc,form:'paste',cure:'c1',quantities:q,
  parameters:[{key:'water/binder',value:num(r[4]),basisNote:'basis not stated (activator water accounting not given)',text},...(pc?[]:[{key:'activator-modulus',value:1.2,text:act}])]};
});
const d1='The carbonization depths of the F0, F2, and F4 groups reached 25.5 mm, 33.4 mm, and 15.4 mm at 28 days of carbonization, respectively, while the carbonization depth of the PC0.65 cement control group was 17.1 mm after 28 days of accelerated carbonization.';
const d2='When 5% Ca(OH)2 was added into the geopolymer, the carbonation depths of the Ca5F0, Ca5F2, and Ca5F4 groups at the carbonation age of 28 days decreased to 17.7 mm, 13.8 mm, and 12.5 mm, respectively.';
const d3='When the content of Ca(OH)2 was 10%, the carbonation depths of the Ca10F0, Ca10F2, and Ca10F4 groups at the 28 d carbonation stage were 9.5 mm, 12.2 mm, and 11.7 mm, respectively.';
const note='after 1 d in the mould and 28 d of curing, then 28 d of accelerated carbonation (20 ± 3% CO2); total specimen age not stated';
const C=(mix,value,text,condition)=>({mix,test:'carb',ageDays:null,ageNote:note,condition,value,text,locator:'§3.2 / Figure 3'});
const results=[C('F0',25.5,d1,'at 28 days of carbonization'),C('F2',33.4,d1,'at 28 days of carbonization'),C('F4',15.4,d1,'at 28 days of carbonization'),C('PC0.65',17.1,d1,'after 28 days of accelerated carbonization'),
 C('Ca5F0',17.7,d2,'at the carbonation age of 28 days'),C('Ca5F2',13.8,d2,'at the carbonation age of 28 days'),C('Ca5F4',12.5,d2,'at the carbonation age of 28 days'),
 C('Ca10F0',9.5,d3,'at the 28 d carbonation stage'),C('Ca10F2',12.2,d3,'at the 28 d carbonation stage'),C('Ca10F4',11.7,d3,'at the 28 d carbonation stage')];
const p1='the porosity of the F2 group before carbonization was 22.14%, and that of PC0.65 before carbonization was 21.40%.';
const p2='the porosity of the Ca10F2 group before carbonization was 19.24%.';
const pn='before carbonization, after 1 d in the mould and 28 d of curing; total age not stated';
results.push({mix:'F2',test:'mip',ageDays:null,ageNote:pn,value:22.14,text:p1,locator:'§3.4 / Figure 6b'},{mix:'PC0.65',test:'mip',ageDays:null,ageNote:pn,value:21.4,text:p1,locator:'§3.4 / Figure 6b'},{mix:'Ca10F2',test:'mip',ageDays:null,ageNote:pn,value:19.24,text:p2,locator:'§3.4 / Figure 6b'});
await save({...sheetHeader(G,'10.3390/ma16062305',src,'All ten Table 2 pastes (nine fly ash/metakaolin geopolymers with 0, 5 or 10% Ca(OH)2 and the PC0.65 cement control), their 28-day accelerated-carbonation depths and the three MIP porosities stated in the text. Compressive strength is given only as percentage changes and is not transcribed.',{made:'2026-11-02',audit:'research/batches/source-text-batch2-2026-11-02.json'}),
 materials:[{id:'fa',family:'fly-ash',role:'precursor',name:'fly ash',aliases:['FA']},
  {id:'mk',family:'metakaolin',role:'precursor',name:'metakaolin',aliases:['MK'],detail:'metakaolin a KAOOPOZZ series of highly active metakaolin produced by China Inner Mongolia Chaobrand Building Materials Technology Co., Ltd.'},
  {id:'caoh2',family:'calcium-hydroxide',role:'additive',name:'Ca(OH)2',detail:dose},
  {id:'ss',family:'sodium-silicate-solution',role:'activator',name:'Industrial alkaline sodium silicate solution',aliases:['sodium silicate'],detail:'Industrial alkaline sodium silicate solution (SiO2/Na2O molar ratio of 3.28, solid content of 34.89%) was used as the raw material of the activator.'},
  {id:'naoh',family:'sodium-hydroxide',role:'activator',name:'Sodium hydroxide solid',detail:'Sodium hydroxide solid (purity of 99.5%) and deionized water were added to the raw material of the activator to make modified sodium silicate as the activator.'},
  {id:'opc',family:'portland-cement',role:'precursor',name:'cement',aliases:['PC0.65'],detail:'A group of cement slurries with a water-binder ratio of 0.65 were prepared as the control group'}],
 mixes,
 cures:[{id:'c1',category:'moist',temperatureC:20,duration:24,durationUnit:'h',sealed:true,humidityPercent:95,text:'The mixed slurry was poured into the mold, and then cured in a standard curing box for 24 h. To ensure that no shrinkage cracking occurs before sample carbonization, the temperature T = 20 °C and relative humidity RH = 95% were maintained in the curing box. After 24 h from mold removal, the mixtures continued curing for 28 days; then, accelerated carbonization tests and pre-carbonization compressive strength tests were conducted.'}],
 tests:[{id:'carb',property:'carbonation-depth',unit:'mm',specimen:'50 × 50 × 50 mm cubes, split',method:'GB/T 50082-2009 accelerated carbonation, 1% phenolphthalein'},
  {id:'mip',property:'mip-porosity',unit:'%',specimen:'0–10 mm slice from the exposed face',method:'MIP (PoreMaster 33)'}],
 results,
 findings:[],
 notes:[],
 gaps:['Table quotes follow the standard form; Table 2 merges FA, MK, water/binder and curing cells across each three-row group (named as spanning cells).',
  'Compressive strength is reported only as percentage changes (e.g. 3.30–38.80% gains; losses of more than 48% after carbonation for Ca(OH)2 mixes); absolute values are in Figure 2 and are not transcribed.',
  'Carbonation coefficients De and pH values are stated per group but have no mix-table property.',
  'Activator mass and the water/binder basis are not stated (modulus 1.2, concentration 36%); Ca(OH)2 is dosed as a mass fraction of raw material.',
  "Cure is recorded as sealed from Table 2's 'Seal curing'; the curing box is 20 °C / 95% RH; the 28-day continued-curing conditions are not restated.",
  'Second review (2 Nov 2026): 0 value errors; see the batch audit.']});
