// Metakaolin–phosphoric acid (SAP) geopolymers across Al/P 0.8–4 — Table 3 batches; values stated in §3.
import {source,table,tableQuote,num,expect,sheetHeader,save} from './_common.mjs';
const G='phosphate-al-p-series-ledger',src=await source(G),t=table(src,3);
const ids=['P-0.8','P-1','P-1.5','P-2','P-3','P-4'];
expect(t.header.at(-1),['',...ids],'Table 3 header');expect(t.rows.map(r=>r[0]),['Metakaolin','H3PO4','Water'],'Table 3 rows');
const mat=['mk','acid','water'];
const mixes=ids.map((id,j)=>({id,control:false,form:'paste',cure:'c1',
 quantities:t.rows.map((r,i)=>({material:mat[i],value:num(r[j+1]),unit:'g',basis:'batch',text:tableQuote(t,i,{cols:[0,j+1]})})),parameters:[]}));
const age='The compressive and flexural strengths were determined 7 days after the casting, and then other analyses were performed.';
const d='The density of the sample with the highest Al/P ratio (P-4), i.e., with the lowest phosphoric acid content, was close to that of the original metakaolin (2552 kg·m−3 vs. 2610 kg·m−3).';
const p='The resulting value of porosity ranged from approximately 20% in P-0.8 to 46% in P-4.';
const note='measured after the 7-day strength tests ("then other analyses were performed"); exact age not stated';
await save({...sheetHeader(G,'10.3390/polym17172358',src,'All six Table 3 mixtures (300 g metakaolin with 85% H3PO4 and water, labelled by Al/P molar ratio) with exact batch masses, plus the density and porosity values stated in the text. Strengths are plotted only in Figure 1.',{made:'2026-11-02',audit:'research/batches/source-text-batch3-2026-11-02.json'}),
 materials:[{id:'mk',family:'metakaolin',role:'precursor',name:'Metakaolin',aliases:['MK'],detail:'Commercially produced metakaolin (MK) Mefisto L05 by ČLUZ company (Nové Strašecí, Czech Republic) was used as a precursor.'},
  {id:'acid',family:'phosphoric-acid',role:'activator',name:'H3PO4',detail:'A set of SAP geopolymers was prepared from MK and an 85% H3PO4 solution (Table 3).'},
  {id:'water',family:'water',role:'water',name:'Water',detail:'The amount of water was adjusted to a consistency of a 160 mm spill (according to EN 1015 standard).'}],
 mixes,
 cures:[{id:'c1',category:'ambient',temperatureC:20,duration:24,durationUnit:'h',sealed:true,humidityPercent:null,text:'The samples were kept for 24 h at lab temperature (20 ± 2 °C) and then cured at 60 °C for another 24 h. The molds with samples were covered by plastic foil in order to eliminate possible quick drying and cracking. Then the samples were demolded and kept in laboratory conditions.'}],
 tests:[{id:'rho',property:'density',unit:'kg/m3',specimen:'20 × 20 × 160 mm3 prisms',method:'density (not bulk density; Figure 2)'},
  {id:'por',property:'porosity',unit:'%',specimen:'20 × 20 × 160 mm3 prisms',method:'from bulk density and density (Figure 2)'}],
 results:[{mix:'P-4',test:'rho',ageDays:null,ageNote:note,value:2552,text:d,locator:'§3 / Figure 2'},
  {mix:'P-0.8',test:'por',ageDays:null,ageNote:note,value:20,qualifier:'approximately',text:p,locator:'§3 / Figure 2'},
  {mix:'P-4',test:'por',ageDays:null,ageNote:note,value:46,qualifier:'approximately',text:p,locator:'§3 / Figure 2'}],
 findings:[{goal:'Highest 7-day compressive strength',mix:'P-1.5',text:'The highest compressive strength was achieved in the sample with an Al/P molar ratio of 1.5, while previous studies have often reported an optimum at Al/P = 1.'}],
 notes:[],
 gaps:['Mixes are columns in Table 3, so each quote pairs the row (Metakaolin, H3PO4, Water) with that sample\'s column. The H3PO4 row is the 85% acid solution as dosed.',
  "Labels give the Al/P molar ratio computed on the metakaolin's amorphous Al2O3 (40.8% by mass), not total XRF aluminium; there is no Al/P parameter key, so the ratio stays in the label.",
  'Compressive and flexural strengths (7 days) are plotted only in Figure 1; flexural strength decreased with increasing Al/P. Water was adjusted to a 160 mm spill, so acid and water change together.',
  'Cure fields hold the first stage (24 h at 20 ± 2 °C under foil); the quote keeps the following 24 h at 60 °C.',
  'Second review pending; see the batch audit.']});
