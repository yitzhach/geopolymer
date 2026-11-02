// Spent FCC catalyst / metakaolin phosphoric-acid geopolymers — Table 2 batches and strengths stated in §3.
import {source,table,tableQuote,expect,sheetHeader,save} from './_common.mjs';
const G='sfcc-phosphate-acid-window',src=await source(G),t=table(src,2);
expect(t.header.at(-1),['Specimen No.','SFCC Catalyst (g)','Metakaolin','Acid Volume','Acid Concentration (mol/L)'],'Table 2 header');
const unit=(cell,u)=>{const m=String(cell).match(new RegExp(`^(\\d+(?:\\.\\d+)?) ${u}$`));if(!m)throw new Error(`"${cell}" is not "<n> ${u}"`);return Number(m[1]);};
// The text reports results by acid concentration, so each specimen's concentration is its alias.
const alias={1:['6 mol/L'],2:['8 mol/L'],3:['10 mol/L'],4:['12 mol/L'],5:['14 mol'],6:['metakaolin-based geopolymer']};
const mixes=t.rows.map((r,i)=>{const text=tableQuote(t,i),n=Number(r[0]);
 return {id:`No. ${n}`,aliases:alias[n],control:n===6,form:'paste',cure:'c1',
  quantities:[{material:'sfcc',value:unit(r[1],'g'),unit:'g',basis:'batch',text},{material:'mk',value:unit(r[2],'g'),unit:'g',basis:'batch',text},
   {material:'acid',value:unit(r[3],'mL'),unit:'mL',basis:'batch',text},{material:'acid',value:unit(r[4],'mol/L'),unit:'mol/L',basis:'own-solution',text}],parameters:[]};});
const s1='When the phosphoric acid concentration was 12 mol/L, the SFCC catalyst-based geopolymer obtained the highest compressive strength of 30.2 MPa, which is even higher than that of metakaolin-based geopolymer with the same condition.';
const s2='With the acid concentration decreasing from 12 to 6 mol/L, the compressive strength of geopolymers decreased from 30.2 MPa to 9.8 MPa.';
const s3='However, at a higher acid concentration of 14 mol, it almost could not condense and harden to form geopolymer, and the compressive strength was only 1.2 MPa.';
const an='test age not stated: sealed, 6 h at 60 °C, then 7 days at room temperature';
await save({...sheetHeader(G,'10.3390/gels8020130',src,'All six Table 2 specimens (SFCC catalyst with 6–14 mol/L phosphoric acid, and the metakaolin comparison at 12 mol/L) with exact batch amounts, and the three compressive strengths stated in the text. Strengths at 8 and 10 mol/L and for the metakaolin specimen are only in Figure 2.',{made:'2026-11-02',audit:'research/batches/source-text-batch2-2026-11-02.json'}),
 materials:[{id:'sfcc',family:'other-precursor',role:'precursor',name:'SFCC catalyst',aliases:['SFCC Catalyst'],detail:'A pretreatment of ball mill was preformed for 15 min to increase its reactivity.'},
  {id:'mk',family:'metakaolin',role:'precursor',name:'Metakaolin'},
  {id:'acid',family:'phosphoric-acid',role:'activator',name:'phosphoric acid solution',aliases:['Acid'],detail:'The phosphoric acid (H3PO4, industrial grade) with 85% purity was used the activator in the synthesis.'}],
 mixes,
 cures:[{id:'c1',category:'heat',temperatureC:60,duration:6,durationUnit:'h',sealed:true,humidityPercent:null,text:'After being sealed with polyethylene film, it was first cured at 60 °C for 6 h and continued at room temperature for 7 days.'}],
 tests:[{id:'fc',property:'compressive-strength',unit:'MPa',specimen:'5 cm × 5 cm × 5 cm cubes',method:null}],
 results:[{mix:'No. 4',test:'fc',ageDays:null,ageNote:an,value:30.2,text:s1,locator:'§3 / Figure 2'},
  {mix:'No. 1',test:'fc',ageDays:null,ageNote:an,value:9.8,text:s2,locator:'§3 / Figure 2'},
  {mix:'No. 5',test:'fc',ageDays:null,ageNote:an,value:1.2,text:s3,locator:'§3 / Figure 2'}],
 findings:[{goal:'Highest compressive strength',mix:'No. 4',text:s1}],
 notes:[{mix:'No. 5',kind:'failure',text:s3}],
 gaps:['Table quotes follow the standard form; the 40 mL acid volume is one cell spanning specimens 1–5 in the source (specimen 6 has its own cell).',
  "Specimen numbers are the paper's labels (Table 2 'Specimen No.'; the text uses 'No. 2', 'No. 4', 'No. 6'); because the strength sentences name acid concentrations, each specimen's concentration is recorded as its alias.",
  'Strengths at 8 and 10 mol/L and for the metakaolin comparison (No. 6) are only in Figure 2; the text says only that No. 4 exceeds the metakaolin specimen.',
  'The acid solution was prepared from 85% H3PO4 and deionized water; the acid mass per batch is not given. Test age is not stated.',
  'Second review (2 Nov 2026): 0 value errors; see the batch audit.']});
