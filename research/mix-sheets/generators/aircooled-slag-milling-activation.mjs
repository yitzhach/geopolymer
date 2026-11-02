// Mechanically activated air-cooled slag versus GGBFS mortars — Table 2 design matrix (54 labels).
import {source,table,tableQuote,headerFor,num,expect,sheetHeader,save} from './_common.mjs';
const G='aircooled-slag-milling-activation',src=await source(G),t=table(src,2);
const heads=[2,3,4,5,6,7].map(i=>headerFor(t,i));
expect(heads,['MCA-ACBFS Water/Binder 0.45','MCA-ACBFS Water/Binder 0.5','MCA-ACBFS Water/Binder 0.55','GGBFS Water/Binder 0.45','GGBFS Water/Binder 0.5','GGBFS Water/Binder 0.55'],'Table 2 column headers');
expect(t.rows.length,9,'Table 2 rows');
const sand='The mass ratio of sand to slag was kept constant at 1:1.';
const ph='The AM of the SS was adjusted to reach three different values of 1, 1.5 and 2.0 by addition of sodium hydroxide pellets (98% purity).';
const mixes=[];
t.rows.forEach((r,i)=>{for(let c=2;c<8;c++){
 const text=tableQuote(t,i,{cols:[0,1,c]}),wb=Number(heads[c-2].split(' ').pop()),acbfs=c<5,label=r[c];
 // The label code repeats the design (A45110 = ACBFS, w/b .45, AM 1, SS 10); check it agrees with row and column.
 expect(label,(acbfs?'A':'G')+String(wb).slice(2)+r[0].replace('.','')+r[1],`label at row ${i}, column ${c}`);
 mixes.push({id:label,control:false,form:'mortar',cure:'c1',
  quantities:[{material:acbfs?'acbfs':'ggbfs',value:null,missing:'sole precursor; mass not tabulated',text},
   {material:'sand',value:null,missing:'sand:slag fixed at 1:1 by mass; batch masses not tabulated',text:sand},
   {material:'ss',value:num(r[1]),unit:'wt%',basis:'binder-as-defined',basisNote:'SS dose as wt.% of the binder content calculated as a solid material',text},
   {material:'naoh',value:null,missing:'pellet mass used to adjust the modulus is not given',text:ph}],
  parameters:[{key:'water/binder',value:wb,basisNote:'water in the silicate solution was subtracted from the calculated w/b',text},
   {key:'activator-modulus',value:num(r[0]),basisNote:'mass ratio SiO2/Na2O, not molar',text},
   {key:'sand/binder',value:1,basisNote:'sand to slag mass ratio',text:sand}]});}});
await save({...sheetHeader(G,'10.3390/ma13051134',src,'All 54 labelled mortars of the Table 2 full-factorial design (27 MCA-ACBFS, 27 GGBFS; w/b 0.45/0.5/0.55 × alkali modulus 1/1.5/2 × SS 10/15/20 wt.%). Strength and slump-flow results are reported only in figures, so no per-mix results are transcribed.'),
 materials:[{id:'acbfs',family:'slag',role:'precursor',name:'Mechanically activated ACBFS',aliases:['MCA-ACBFS','ACBFS'],detail:'The rotation speed was 500 rpm. Ball to powder ratio of 25 and grinding duration of 20 min were used for all grindings.'},
  {id:'ggbfs',family:'slag',role:'precursor',name:'GGBFS',detail:'ACBFS and water-cooled GGBFS were used as precursors for this study. Both materials originated from the same source.'},
  {id:'sand',family:'sand',role:'aggregate',name:'sand'},
  {id:'ss',family:'sodium-silicate-solution',role:'activator',name:'liquid sodium silicate',aliases:['SS'],detail:'The SS had an alkali modulus (AM, mass ratio SiO2/Na2O) of 2.2, with 34.37 wt.% of SiO2, 15.6 wt.% of Na2O and a solid content of 49.97 wt.%.'},
  {id:'naoh',family:'sodium-hydroxide',role:'activator',name:'sodium hydroxide pellets',detail:ph}],
 mixes,
 cures:[{id:'c1',category:'ambient',temperatureC:null,duration:null,durationUnit:null,sealed:null,humidityPercent:null,text:'After demolding, all samples were stored in plastic boxes exposed to laboratory conditions until testing.'}],
 tests:[],results:[],findings:[],notes:[],
 gaps:['Each mix quote joins the Table 2 row cells (alkali modulus, SS wt.%, label) with the stacked column header (precursor, water/binder) that the label sits under; the generator checks every label code (e.g. A45110 = ACBFS, w/b 0.45, AM 1, SS 10%) against its row and column.',
  "Mortar made with untreated ACBFS did not solidify and has no label ('Mortar, produced using only the not-treated ACBFS as a precursor, did not solidified.').",
  'Per-mix 7- and 28-day strength and mini-slump flow appear only in Figures 6–9; the text gives group ranges (MCA-ACBFS 20–40 MPa, GGBFS 20–30 MPa at AM 1 and SS 10%) without mix labels.',
  'The printed mill ball diameter (200 mm in a 500 mL jar) is inconsistent and stays held, as in the deep dive.',
  'Second review (26 Oct 2026): 0 value errors; see the batch audit.']});
