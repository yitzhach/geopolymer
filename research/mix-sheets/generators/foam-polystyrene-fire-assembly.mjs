// Metakaolin/KOH geopolymer foams S19–S22 — Table 2 ratios to MK, Table 3 porosimetry, strengths and λ in §3.
import {source,table,tableQuote,num,expect,sheetHeader,save} from './_common.mjs';
const G='foam-polystyrene-fire-assembly',src=await source(G),t2=table(src,2),t3=table(src,3);
expect(t2.header.at(-1),['GFs','Metakaolin(MK)','Activator(A)','ChoppedBasaltFibers(CBFs)','Silica Sand(SA)','Silica Fume(SF)','AluminumPowder (Al)'],'Table 2 header');
expect(t3.header.at(-1),['Parameters','Unit','S19','S20','S21','S22'],'Table 3 header');
const mats=['mk','koh','cbf','sand','sf','al'];
const mixes=t2.rows.map((r,i)=>{const text=tableQuote(t2,i);
 return {id:r[0],control:r[0]==='S19',form:'foam',cure:'c1',quantities:mats.map((m,j)=>({material:m,value:num(r[j+1]),unit:'part',basis:'mass-parts',text})),parameters:[]};});
const row=label=>{const i=t3.rows.findIndex(r=>r[0]===label);if(i<0)throw new Error(`Table 3 row "${label}" missing`);return i;};
const age='All the GF specimens were cured in specific molds for 28 days to test their effective physical properties.';
const results=[];
for(const [label,test] of [['Porosity','por'],['Density at 0.0015 MPa','rho']]){const i=row(label);
 t3.header.at(-1).slice(2).forEach((mix,j)=>results.push({mix,test,ageDays:28,value:num(t3.rows[i][j+2]),text:tableQuote(t3,i,{cols:[0,1,j+2]}),ageText:age,locator:'Table 3'}));}
const s1='The flexural and compressive strengths of S20 (3.2 MPa and 5.4 MPa) increased compared to S19 (2.1 MPa and 5 MPa).';
const s2='Sample S22 presents the highest λ (0.27 W/mK). On the contrary, sample S20 is the one with the lowest λ (0.25 W/mK).';
results.push({mix:'S20',test:'ff',ageDays:28,value:3.2,text:s1,ageText:age,locator:'§3 / Figure 6'},{mix:'S20',test:'fc',ageDays:28,value:5.4,text:s1,ageText:age,locator:'§3 / Figure 6'},
 {mix:'S19',test:'ff',ageDays:28,value:2.1,text:s1,ageText:age,locator:'§3 / Figure 6'},{mix:'S19',test:'fc',ageDays:28,value:5,text:s1,ageText:age,locator:'§3 / Figure 6'},
 {mix:'S22',test:'k',ageDays:28,value:0.27,text:s2,ageText:age,locator:'§3 / Figure 7'},{mix:'S20',test:'k',ageDays:28,value:0.25,text:s2,ageText:age,locator:'§3 / Figure 7'});
await save({...sheetHeader(G,'10.3390/polym14101945',src,'The four Table 2 foams S19–S22 (ratios referred to MK), their Table 3 MIP porosity and bulk density, and the strength and thermal-conductivity values stated in the text. The S20 fire test on polystyrene boards is recorded as a note only.',{made:'2026-11-02',audit:'research/batches/source-text-batch2-2026-11-02.json'}),
 materials:[{id:'mk',family:'metakaolin',role:'precursor',name:'metakaolin',aliases:['MK','Metakaolin(MK)'],detail:'The industrially commercial binder “Baucis lk” used for this research was supplied by České Lupkové Závody, a.s. (Nové Strašecí, Czech Republic) and is a two-component aluminosilicate binder based on metakaolin (MK) activated by an alkaline solution of potassium hydroxide (A).'},
  {id:'koh',family:'potassium-hydroxide',role:'activator',name:'alkaline solution of potassium hydroxide',aliases:['Activator(A)'],detail:'the metakaolin (MK) was mixed with an alkaline solution of potassium hydroxide (A) (KOH, pH = 11) for five minutes'},
  {id:'cbf',family:'basalt-fiber',role:'fiber',name:'Chopped basalt fibers',aliases:['CBFs'],detail:'characterized by a fiber length of 3.2 mm, a diameter of 13 µm, a density of 2.67 g/cm3, and thermal conductivity of 0.031/0.038 W/mK.'},
  {id:'sand',family:'sand',role:'aggregate',name:'Silica sand',aliases:['SA'],detail:'the silica sand characterized by a mean range particle size of 0.3–0.8 mm and a density of 2.65 g/cm3.'},
  {id:'sf',family:'silica-fume',role:'additive',name:'silica fume',aliases:['SF'],detail:'The silica fume (SF) (produced by Kema Morava—sanační centrum a.s., Republic of Slovenia) contained 90 wt.% of SiO2, with an average grain size of 1 mm.'},
  {id:'al',family:'foaming-agent',role:'additive',name:'aluminum powder',aliases:['Al'],detail:'The aluminum powder (Al) was supplied by Pkchemie, Inc. (Třebíč, Czech Republic) with a mean particle size of 51.47 µm.'}],
 mixes,
 cures:[{id:'c1',category:'ambient',temperatureC:null,duration:28,durationUnit:'d',sealed:null,humidityPercent:null,text:'Hardening treatments of the experimental products were carried out under heat drying conditions at room temperature. All the GF specimens were cured in specific molds for 28 days to test their effective physical properties.'}],
 tests:[{id:'por',property:'mip-porosity',unit:'%',specimen:'40 × 40 × 10 mm3 plates',method:'MIP, AutoPore IV 9510'},
  {id:'rho',property:'density',unit:'g/cm3',specimen:'40 × 40 × 10 mm3 plates',method:'MIP bulk density at 0.0015 MPa (printed in g/mL)'},
  {id:'fc',property:'compressive-strength',unit:'MPa',specimen:'not stated',method:null},
  {id:'ff',property:'flexural-strength',unit:'MPa',specimen:'not stated',method:null},
  {id:'k',property:'thermal-conductivity',unit:'W/(m·K)',specimen:'not stated',method:null}],
 results,
 findings:[{goal:'Best overall physical performance (chosen for the fire test)',mix:'S20',text:'Geopolymer S20 was recognized as the material with the best performance in terms of physical properties.'}],
 notes:[{mix:'S20',kind:'observation',text:'According to Table 2, (Section 2.2), the three specimens were prepared following the S20 composition.'}],
 gaps:['Table quotes follow the standard form; in Table 2 the MK, activator, basalt fibre, sand and aluminium cells span all four rows, and only silica fume varies by row (this resolves the merged-row question in the review notes).',
  'Table 2 ratios are "referred to MK"; the mass basis is not stated, and the text calls the silica-fume levels 5, 10 and 20 wt.%. Activator concentration is given only as pH 11.',
  'Density is the MIP bulk density at 0.0015 MPa, printed in g/mL (numerically the same as g/cm3).',
  'Strengths for S21 and S22 are given only as percentages of S19 (12% and 19.2% lower compression); λ for S19 and S21 are only in Figure 7. Specimen geometry for strength and λ is not stated.',
  "Cure: 28 days in moulds 'under heat drying conditions at room temperature' (wording kept); fire-test boards were cured 28 days at RT and tested up to 800 °C; the fire result is in Figure 8 only.",
  'Second review pending; see the batch audit.']});
