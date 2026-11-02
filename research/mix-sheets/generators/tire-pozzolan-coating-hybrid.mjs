// Fly ash / CEM II-B-S hybrid geopolymer mortars with coated waste-tyre aggregate — Table 5 Taguchi mixes M1–M16.
import {source,table,tableQuote,num,expect,sheetHeader,save} from './_common.mjs';
const G='tire-pozzolan-coating-hybrid',src=await source(G),t=table(src,5);
expect(t.header.at(-1),['Mix ID','Coating Type','WTA Content','PP Fiber Content','UK','Cement','Water','PCE','Alkali Activator','Silica Sand','WTA','PP Fiber'],'Table 5 header');
const rows=t.rows.map((r,i)=>[r,i]).filter(([r])=>/^M\d+$/.test(r[0]));
expect(rows.length,16,'labelled Table 5 mixes');
const cols=[[4,'fa'],[5,'cem'],[6,'water'],[7,'pce'],[8,'meta'],[9,'sand'],[10,'wta'],[11,'ppf']];
const coat={Pumice:'pumice',Perlite:'perlite',Diatomite:'diatomite'};
const mixes=rows.map(([r,i])=>{const text=tableQuote(t,i),q=cols.map(([c,m])=>({material:m,value:num(r[c]),unit:'kg/m3',basis:'per-m3',text}));
 if(coat[r[1]])q.push({material:coat[r[1]],value:null,missing:'coating mass per m3 not given; the WTA is dry-coated with this pozzolan before mixing',text});
 return {id:r[0],control:false,form:'mortar',cure:null,quantities:q,parameters:[],missing:['curing regime not found in the paper']};});
await save({...sheetHeader(G,'10.3390/polym18162014',src,'The sixteen Table 5 Taguchi mixes M1–M16 (coating type × tyre-aggregate content × PP fibre) with kg/m3 amounts. Per-mix test results are in figures; the verification results in Table 7 are for optimum mixes not in Table 5.',{made:'2026-11-02',audit:'research/batches/source-text-batch5-2026-11-02.json'}),
 materials:[{id:'fa',family:'fly-ash',role:'precursor',name:'Fly ash',aliases:['UK','FA'],detail:'The selected fly ash was a low-calcium aluminosilicate.'},
  {id:'cem',family:'portland-cement',role:'precursor',name:'CEM II/B-S 42.5 N Portland cement',aliases:['Cement']},
  {id:'water',family:'water',role:'water',name:'Water'},
  {id:'pce',family:'superplasticizer',role:'additive',name:'PCE'},
  {id:'meta',family:'sodium-silicate-solid',role:'activator',name:'Sodium metasilicate',aliases:['Alkali Activator','metasilicate'],detail:'Sodium metasilicate (Na2SiO3) powder served as an alkaline activator to initiate geopolymerization.'},
  {id:'sand',family:'sand',role:'aggregate',name:'Silica Sand'},
  {id:'wta',family:'other-aggregate',role:'aggregate',name:'waste tire aggregates',aliases:['WTA'],detail:'The WTA particles were classified using a 0.5–4 mm sieve and then immersed in a NaOH solution. The NaOH solution was prepared to a concentration of 12 M 24 h before immersion.'},
  {id:'ppf',family:'pp-fiber',role:'fiber',name:'PP fibers',aliases:['PP Fiber']},
  {id:'pumice',family:'natural-pozzolan',role:'additive',name:'Pumice'},{id:'perlite',family:'natural-pozzolan',role:'additive',name:'Perlite'},{id:'diatomite',family:'natural-pozzolan',role:'additive',name:'Diatomite'}],
 mixes,cures:[],tests:[],results:[],findings:[],notes:[],
 gaps:['Table quotes follow the standard form. "UK" is the fly ash: the text lists the binder as fly ash and CEM II/B-S cement, and "UK at 400 kg/m3, cement at 400 kg/m3" (the Turkish abbreviation is not expanded in the paper).',
  'All WTA, including the uncoated M1–M4, received the same 12 M NaOH soak and 75 °C conditioning; coated series were then dry-coated with pumice, perlite or diatomite (coating mass not given per mix).',
  'Table 5\'s reference row is printed with the label "The" (apparently truncated) and "Without WTA"; it is not transcribed. No curing regime was found.',
  'Compressive and flexural results, porosity, absorption and durability per mix are only in figures; Table 7 reports two optimum mixes that are not Table 5 rows.',
  'Second review (2 Nov 2026): 0 value errors; see the batch audit.']});
