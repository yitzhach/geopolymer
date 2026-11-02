// 3D-printable side-stream geopolymers — Table 4 compositions and Table 7 mean strengths (preliminary cure).
import {source,table,tableQuote,num,expect,sheetHeader,save} from './_common.mjs';
const G='printing-side-stream-process-window',src=await source(G),t4=table(src,4),t7=table(src,7);
expect(t4.header.at(-1),['Mix','Ash','C&D Waste','Metakaolin','Reagent','Water','Sand c','Sand F','Al','Si','Curing Min'],'Table 4 header');
expect(t7.header.at(-1),['Material Sample','Compressive Strength (MPa) (2 n)','Compressive Strength (MPa) (3 n)'],'Table 7 header');
expect(t7.rows[10][0],'Mean value','Table 7 mean row');
const cols={Ash:'ash','C&D Waste':'cdw',Metakaolin:'mk',Reagent:'ss',Water:'water','Sand c':'sandc','Sand F':'sandf'};
const mixes=t4.rows.map((r,i)=>{const text=tableQuote(t4,i,{cols:[0,1,2,3,4,5,6,7]}),q=[];
 t4.header.at(-1).slice(1,8).forEach((h,j)=>{const cell=r[j+1];if(cell!=='')q.push({material:cols[h],value:num(cell),unit:'wt%',basis:'total-mass',text});});
 return {id:r[0].replace(' ',''),aliases:[r[0]],control:false,form:'mortar',cure:'c1',quantities:q,
  parameters:[],missing:['silicate modulus is a range (2.4–2.6), so no single activator-modulus value is entered']};});
const prelim='Specimens were formed by casting in cubes of dimensions 50 × 50 × 50 mm and cured for 24 h in an oven at 60 °C and then cured at room temperature for 48 h to attain a maximum compression strength.';
const results=[1,2].map(c=>({mix:c===1?'2n':'3n',test:'fc',ageDays:null,ageNote:'preliminary specimens: 24 h at 60 °C, then 48 h at room temperature',value:num(t7.rows[10][c]),text:tableQuote(t7,10,{cols:[0,c]}),locator:'Table 7 (mean of ten specimens)'}));
await save({...sheetHeader(G,'10.3390/ma14164758',src,'The ten Table 4 mixtures used for preliminary compression testing (composition in % of the mixture) and the Table 7 mean compressive strengths of 2 n and 3 n. Printed/cast results for geopolymers A and B (Figures 7–11, Table 8) are not mapped to these labels in the paper and are not transcribed.',{made:'2026-11-02',audit:'research/batches/source-text-batch2-2026-11-02.json'}),
 materials:[{id:'ash',family:'biomass-ash',role:'precursor',name:'Bark boiler ash',aliases:['Ash','Bark ash'],detail:'Bark ash, which is a by-product of the paper and pulp industry, is used as the primary binder ingredient instead of fly ash.'},
  {id:'cdw',family:'other-precursor',role:'precursor',name:'C&D waste',aliases:['C&D Waste'],detail:'The C&D waste was employed as a filler and reactive material in this investigation'},
  {id:'mk',family:'metakaolin',role:'precursor',name:'Metakaolin',detail:'Commercial metakaolin (having 47% of Al and Si in a 1:2 ratio) was used as a reactive pozzolan and source of Al and Si.'},
  {id:'ss',family:'sodium-silicate-solution',role:'activator',name:'sodium silicate solution',aliases:['Reagent'],detail:'For the alkaline reagent, a sodium silicate solution having a molar ratio of 2.4–2.6 was used (31% SiO2 and 13% Na2O).'},
  {id:'water',family:'water',role:'water',name:'Water'},
  {id:'sandc',family:'sand',role:'aggregate',name:'Sand c',detail:'Sand (coarse and fine) was received as the leftover product from mine tailings and used as a filler material with no reactive components.'},
  {id:'sandf',family:'sand',role:'aggregate',name:'Sand F',detail:'Sand (coarse and fine) was received as the leftover product from mine tailings and used as a filler material with no reactive components.'}],
 mixes,
 cures:[{id:'c1',category:'heat',temperatureC:60,duration:24,durationUnit:'h',sealed:null,humidityPercent:null,text:prelim}],
 tests:[{id:'fc',property:'compressive-strength',unit:'MPa',specimen:'50 × 50 × 50 mm cubes',method:'SFS-EN 12390-3'}],
 results,
 findings:['2n','3n'].map(mix=>({goal:'Selected for repeat strength testing on the highest preliminary results',mix,text:'Considering the highest compression strength results, an additional ten samples of the materials 2 n and 3 n were tested.'})),
 notes:[],
 gaps:['Table 4 is headed "Mixture composition (%)"; rows do not all sum to 100 (e.g. 5 p sums to 96), so the basis is recorded as % of total mix as printed. The Al, Si and "Curing Min" columns are not ingredient amounts and are not transcribed.',
  'Table 3 water-to-silicate and silicate-to-binder entries are ranges or single descriptors that conflict with Table 4; not transcribed (the review-note conflict stays).',
  'Strength of the other eight mixtures is only in Figure 6; geopolymers A and B (setting, shape stability, 7/28-day cast and extruded strengths, Table 8 densities) are not linked to a Table 4 label.',
  'Table 7 lists ten single-specimen values per material; only the stated mean is transcribed.',
  'Second review pending; see the batch audit.']});
