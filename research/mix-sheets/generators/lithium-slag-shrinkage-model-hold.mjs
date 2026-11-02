// Lithium slag + GBFS mortar shrinkage — Table 2 batches and four 90-day shrinkage values in §3.
import {source,table,tableQuote,num,expect,sheetHeader,save} from './_common.mjs';
const G='lithium-slag-shrinkage-model-hold',src=await source(G),t2=table(src,2);
expect(t2.header.at(-1),['No','Samples','GBFS (g)','LS (g)','Sand (g)','Water (g)'],'Table 2 header');
const design='The alkali equivalent and modulus of the alkali activator in this experiment were 5% and 1.2, respectively.';
const prep='For every 1000 g of Na2SiO3 solution, 184 g of NaOH particles should be added to reduce the original modulus from 3.2 to 1.2.';
const aliases={'RG/L-3':['RG/L = 3'],'RG/L-1.5':['RG/L = 1.5'],'RB/S-0.21':['RB/S = 0.21'],'RB/S-0.39':['RB/S = 0.39']};
const cols=['gbfs','ls','sand','water'];
const mixes=t2.rows.map((r,i)=>{const text=tableQuote(t2,i);return {id:r[1],...(aliases[r[1]]?{aliases:aliases[r[1]]}:{}),control:false,form:'mortar',cure:'c1',
 quantities:[...cols.map((m,j)=>({material:m,value:num(r[j+2]),unit:'g',basis:'batch',text})),
  ...['ss','naoh'].map(m=>({material:m,value:null,missing:'activator mass per batch is not tabulated; only the 5% alkali equivalent and modulus 1.2 are given',text:prep}))],
 parameters:[{key:'alkali-dose',value:5,basisNote:'"alkali equivalent"; basis not stated',text:design},{key:'activator-modulus',value:1.2,text:design}]};});
const p1='It can be found that when RG/L = 3, the 90 d shrinkage strain of the specimen is the highest (4928 με), which is 25.8% higher than that when RG/L = 1.5 (3917 με).';
const p2='When RB/S = 0.21, the shrinkage strain is 3340 με. When RB/S = 0.39, the shrinkage strain increased by 39.8% to 4670 με.';
const fig='Figure 8 shows the 90 d shrinkage strain performance of LSGM with different component ratios.';
await save({...sheetHeader(G,'10.3390/ma18204766',src,'All twelve rows of Table 2 (grams per three-prism batch) with the study-wide activator design, and the four 90-day shrinkage strains stated in the text. Curves in Figure 8 and the fitted model are not transcribed.'),
 materials:[{id:'gbfs',family:'slag',role:'precursor',name:'blast furnace slag',aliases:['GBFS']},
  {id:'ls',family:'lithium-slag',role:'precursor',name:'lithium slag',aliases:['LS']},
  {id:'sand',family:'sand',role:'aggregate',name:'quartz sand',aliases:['Sand'],detail:'quartz sand with a mesh size of 80–120'},
  {id:'water',family:'water',role:'water',name:'water',aliases:['Water']},
  {id:'ss',family:'sodium-silicate-solution',role:'activator',name:'Silicic acid sodium solution',aliases:['Na2SiO3 solution'],detail:'Silicic acid sodium solution (26.2% silica, 8.3% sodium oxide, 65.5% water)'},
  {id:'naoh',family:'sodium-hydroxide',role:'activator',name:'Sodium hydroxide',aliases:['NaOH'],detail:prep}],
 mixes,
 cures:[{id:'c1',category:'moist',temperatureC:21,duration:null,durationUnit:null,sealed:true,humidityPercent:98,text:'Then cover the test block with a film and place it in a constant temperature and humidity curing chamber for curing (at 21 °C with a relative humidity of 98%). After 24 h, remove the mold and then place the sample back into the curing chamber to continue the curing process under the same conditions.'}],
 tests:[{id:'sh',property:'other',propertyNote:'Shrinkage strain from length change after demolding (JGJT70-2009), specimens kept in the 21 °C / 98% RH chamber; not a standard drying-shrinkage exposure',unit:'microstrain',specimen:'40 mm × 40 mm × 160 mm prisms, three per group',method:'JGJT70-2009 length comparator'}],
 results:[{mix:'RG/L-3',test:'sh',ageDays:90,value:4928,text:p1,locator:'§3 (Figure 8 discussion)'},
  {mix:'RG/L-1.5',test:'sh',ageDays:90,value:3917,text:p1,locator:'§3 (Figure 8 discussion)'},
  {mix:'RB/S-0.21',test:'sh',ageDays:90,value:3340,text:p2,ageText:fig,locator:'§3 (Figure 8c discussion)'},
  {mix:'RB/S-0.39',test:'sh',ageDays:90,value:4670,text:p2,ageText:fig,locator:'§3 (Figure 8c discussion)'}],
 findings:[],
 notes:[{mix:'RG/L-3',kind:'observation',text:'when RG/L = 3, the 90 d shrinkage strain of the specimen is the highest (4928 με)'}],
 gaps:['Table quotes follow the standard form (Table N (caption): header → row).',
  "Source inconsistencies kept visible: the text says ten groups but Table 2 lists twelve rows; RG/L-2.5, RB/S-0.33 and RW/B-0.37 have identical masses; the RB/S labels (0.21–0.39) equal sand/binder in Table 2 (e.g. 495/1500 = 0.33), not binder/sand; the RW/B labels equal Table 2 water/(GBFS+LS) (405/1500 = 0.27 … 855/1500 = 0.57), so they exclude the activator solution's water; the text says 'The ratios in Table 3 represent the materials required to make 3 samples' but means Table 2.",
  "Batch basis: the text says the ratios 'in Table 3 represent the materials required to make 3 samples'; Table 3 is the model table, so reading Table 2 as a three-prism batch is inferred.",
  'The activator mass per batch is not tabulated, so water accounting and total liquid are unresolved (the existing correction hold on this guide stays).',
  "The text's water/binder comparison (36.7%) names no mix value and is contradictory (reduction and increase in the same paragraph); not transcribed.",
  "Shrinkage was measured on specimens kept in the 98% RH chamber, so it is recorded as 'other' rather than drying shrinkage.",
  'Second review (26 Oct 2026): 0 value errors; see the batch audit.']});
