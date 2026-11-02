// Fly ash and metakaolin geopolymers screened by XRD — Table 4 formulations joined to Table 5 strengths.
import {source,table,tableQuote,num,expect,sheetHeader,save} from './_common.mjs';
import {isGroupRow} from '../../../scripts/lib/source-text.mjs';
const G='xrd-strength-screening-boundary',src=await source(G),t4=table(src,4),t5=table(src,5);
expect(t4.header.at(-1),['Precursor','Si/Al','Na/Al','H/Si'],'Table 4 header');
expect(t5.header.at(-1),['Sample ID','MPa','Peak Shift','Zeolite'],'Table 5 header');
const groups={'FA 1':'fa1','FA 2':'fa2','MK 1':'mk1','MK 2':'mk2'};
const mixes=[],results=[];let group=null;
t5.rows.forEach((r,i)=>{
 if(isGroupRow(r)){group=i;if(!groups[r[0]])throw new Error(`unknown group ${r[0]}`);return;}
 const g=t5.rows[group][0],m=r[0].match(/^(\d+(?:\.\d+)?) \((\d+(?:\.\d+)?)\)$/);if(!m)throw new Error(`Sample ID "${r[0]}"`);
 const [si,na]=[Number(m[1]),Number(m[2])];
 // Join to the Table 4 formulation with the same precursor and target Si/Al and Na/Al; it must be unique.
 const hits=t4.rows.map((x,j)=>[x,j]).filter(([x])=>x[0]===g.replace(' ','')&&num(x[1])===si&&num(x[2])===na);
 if(hits.length!==1)throw new Error(`${g} ${r[0]}: ${hits.length} Table 4 matches`);
 const j=hits[0][1],q4=tableQuote(t4,j),id=`${g.replace(' ','')} ${r[0]}`;
 mixes.push({id,aliases:[`${g} / Sample ID ${r[0]}`],control:false,form:'paste',cure:'c1',
  quantities:[{material:groups[g],value:null,missing:'mass not given; the formulation is specified by target molar ratios',text:q4},
   {material:'naoh',value:null,missing:'mass not given; NaOH alone or with silicate or aluminate, per formulation not stated',text:'This necessitated using NaOH, NaOH + Na silicate, and NaOH + Na aluminate to achieve the targeted range of Si/Al values (Table 4).'}],
  parameters:[{key:'Si/Al',value:num(t4.rows[j][1]),basisNote:'target molar ratio',text:q4},{key:'Na/Al',value:num(t4.rows[j][2]),basisNote:'target molar ratio',text:q4}]});
 const s=r[1].match(/^(\d+(?:\.\d+)?) \((\d+(?:\.\d+)?)\)$/);if(!s)throw new Error(`strength "${r[1]}"`);
 results.push({mix:id,test:'fc',ageDays:2,value:Number(s[1]),spread:Number(s[2]),text:tableQuote(t5,i,{cols:[1],key:0,group}),
  ageText:'Approximately 48 h after mixing, the samples were tested for their compressive strengths based on ASTM C39 [47].',locator:'Table 5 (bracket = two standard deviations)'});
});
expect(mixes.length,15,'formulations');
await save({...sheetHeader(G,'10.3390/ma18092093',src,'All fifteen formulations (three per fly ash, four or five per metakaolin) with their target Si/Al and Na/Al (Table 4) and approximately 48-hour compressive strength (Table 5). Peak shift and zeolite presence are not transcribed.',{made:'2026-11-02',audit:'research/batches/source-text-batch3-2026-11-02.json'}),
 materials:[{id:'mk1',family:'metakaolin',role:'precursor',name:'MK1',aliases:['MK 1'],detail:'The kaolin samples were chosen because they provide a clearer definition of the amorphous hump in their XRD patterns after calcining at 750 °C for 8 h'},
  {id:'mk2',family:'metakaolin',role:'precursor',name:'MK2',aliases:['MK 2']},
  {id:'fa1',family:'fly-ash',role:'precursor',name:'FA1',aliases:['FA 1'],detail:'two fly ash samples (Synergy power station, sampled in 2022 and 2023, Muja, Australia)'},
  {id:'fa2',family:'fly-ash',role:'precursor',name:'FA2',aliases:['FA 2']},
  {id:'naoh',family:'sodium-hydroxide',role:'activator',name:'NaOH pellets',aliases:['NaOH'],detail:'NaOH pellets (≥99 wt.%, Rowe Scientific)'}],
 mixes,
 cures:[{id:'c1',category:'heat',temperatureC:70,duration:21,durationUnit:'h',sealed:true,humidityPercent:null,text:'The vials were sealed prior to placing in an oven for curing at 70 °C for 21 h. After curing, the samples were demoulded and sealed in plastic bags and stored for 24 h.'}],
 tests:[{id:'fc',property:'compressive-strength',unit:'MPa',specimen:'25 mL polypropylene vials',method:'ASTM C39'}],
 results,findings:[],notes:[],
 gaps:['Table 5 sample IDs ("1.2 (1)" = Si/Al and Na/Al) repeat under precursor group rows, so the sheet labels each formulation "<precursor> <ID>" and each strength quote names its group row ("FA 1 / Sample ID 1.2 (1)"); the generator joins every Table 5 row to exactly one Table 4 formulation by precursor, Si/Al and Na/Al.',
  'Ratios are targets computed on the amount and composition of each precursor\'s amorphous material. No masses are given; the activator (NaOH alone, or with sodium silicate SiO2/Na2O 2.32 or sodium aluminate) is not stated per formulation. H/Si (water) has no parameter key; total H2O was MK 1 29.1%, MK 2 35.0%, FA 1 18.0%, FA 2 15.0 wt.%.',
  'Strength brackets are two standard deviations, recorded as spread. Peak shift and zeolite presence (Table 5) are not mix-table properties.',
  'Second review pending; see the batch audit.']});
