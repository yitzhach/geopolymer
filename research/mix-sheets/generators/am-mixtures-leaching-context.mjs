// Two printable metakaolin geopolymer mixtures — Table 2 component ratios (normalized to metakaolin = 1).
import {source,table,tableQuote,expect,sheetHeader,save} from './_common.mjs';
const G='am-mixtures-leaching-context',src=await source(G),t=table(src,2);
expect(t.header.at(-1),['Component','Mixture I (NaOH 16 M)','Mixture II (Baucis + Sand)'],'Table 2 header');
expect(t.rows.map(r=>r[0]),['Metakaolin','Waterglass','Silica','Graphite','Carbon fibers','Alginate','Anhydrite','Cellulose','Sand (<1 mm)'],'Table 2 rows');
const mat=['mk','wg','silica','graphite','cf','alginate','anhydrite','cellulose','sand'];
// Leading number of a cell ("0.90 (NaOH 16 M)" → 0.9); "–" means the component is absent.
const lead=c=>{const m=String(c).match(/^(\d+(?:\.\d+)?)(?: \(.*\))?$/);if(!m)throw new Error(`cell "${c}"`);return Number(m[1]);};
const mixes=[['Mixture I',1],['Mixture II',2]].map(([id,col])=>({id,control:false,form:'printed',cure:null,
 quantities:t.rows.map((r,i)=>[r,i]).filter(([r])=>r[col]!=='–').map(([r,i])=>({material:mat[i],value:lead(r[col]),unit:'part',basis:'mass-parts',
  ...(i===1?{basisNote:`Table 2 cell reads "${r[col]}"`}:{}),text:tableQuote(t,i,{cols:[0,col]})})),parameters:[],missing:['curing regime not stated']}));
await save({...sheetHeader(G,'10.3390/ma18214886',src,'Both Table 2 mixtures with component ratios normalized to metakaolin = 1.00. The paper reports leaching (Table 4) and radionuclide activity (Table 5), which have no mix-table property, and no mechanical values.',{made:'2026-11-02',audit:'research/batches/source-text-batch5-2026-11-02.json'}),
 materials:[{id:'mk',family:'metakaolin',role:'precursor',name:'Metakaolin',aliases:['MT']},
  {id:'wg',family:'sodium-silicate-solution',role:'activator',name:'Waterglass'},
  {id:'silica',family:'other-additive',role:'additive',name:'Silica'},{id:'graphite',family:'other-additive',role:'additive',name:'Graphite'},
  {id:'cf',family:'carbon-fiber',role:'fiber',name:'Carbon fibers'},{id:'alginate',family:'viscosity-modifier',role:'additive',name:'Alginate'},
  {id:'anhydrite',family:'gypsum',role:'additive',name:'Anhydrite'},{id:'cellulose',family:'viscosity-modifier',role:'additive',name:'Cellulose'},
  {id:'sand',family:'sand',role:'aggregate',name:'Sand (<1 mm)',aliases:['Sand']}],
 mixes,cures:[],tests:[],results:[],findings:[],notes:[],
 gaps:['Mixes are columns in Table 2, so each quote pairs a component row with that mixture\'s column. Ratios are normalized to metakaolin (MT) = 1.00; the mass basis is implied by the normalization but not stated.',
  'Activator identity kept as printed: Mixture I\'s waterglass cell reads "0.90 (NaOH 16 M)" and Mixture II\'s "0.90 (Baucis)"; the paper does not reconcile whether Mixture I used waterglass, 16 M NaOH or both.',
  'Leachate concentrations (Table 4, mg/kg) and natural radionuclide activity (Table 5) are not mix-table properties; no curing regime or mechanical results are stated.',
  'Second review (2 Nov 2026): 0 value errors; see the batch audit.']});
