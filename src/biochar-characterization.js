// Selected adaptations of Saccani, Baldazzi & Manzi (2025), CC BY 4.0.
// Tables 3–5 visually source-checked 16 October 2026; one dataset, no replication.
export const biocharTestContexts={
 fresh:{label:'Fresh paste',ageHours:null,ageOrigin:'Immediately after preparation',specimen:'Brass truncated cone: diameters 20–40 mm, height 60 mm',n:null,method:'§2.3.1: remove mould and average two perpendicular spread diameters. C = 100 × (dm − 40)/40. Two diameter readings are not independent specimens.'},
 physical:{label:'28-day cure, then physical-test conditioning',ageHours:672,ageOrigin:'Curing duration before conditioning; not total test age',specimen:'Three cylinders per recipe, 27 mm diameter × 40 mm height (§2.2)',n:3,method:'§2.3.2: EN 772-13 bulk density and EN 772-21 atmospheric-pressure water absorption. After 28-day cure: immerse about 3 days, weigh wet and hydrostatically, then dry at 40 °C at least 2 days. Repeat weighings until mass changes <2%. This is not capillary uptake or sorptivity.'},
 initialModulus:{label:'28-day initial dynamic modulus',ageHours:672,ageOrigin:'Initial curing age',specimen:'Cylinders, 27 mm diameter × 55 mm height',n:null,method:'§2.3.4: Matest C369N ultrasonic pulse velocity tester, EN 12504-4, before compression. Dynamic modulus is not static Young’s modulus; per-age replicate count unresolved.'},
 exposed:{label:'40-day total age after capillary exposure and drying',ageHours:960,ageOrigin:'28 days cure + 8 days capillary exposure + 4 days drying',initialCureHours:672,exposureHours:192,dryingHours:96,dryingTemperatureC:40,specimen:'Three cylinders per recipe, 27 mm diameter × 55 mm height (§2.3.4)',n:3,method:'§§2.3.2/2.3.4: EN 15801 capillary setup on filter paper over shallow water, then 40 °C oven. Compression: Wolpert 100 kN, 5 mm/min, EN 196-1 except specimen dimensions. Dynamic modulus: Matest C369N, EN 12504-4, before compression. §3 describes drying to constant mass; §2.3.4 specifies four days. No matched unexposed 40-day control is reported; age, water and heating effects cannot be separated.'}
};
const rows=[
 // dose, dm, C, density/spread, WA/spread, initial Ed/spread, exposed strength/spread, exposed Ed/spread, author Δ
 [0,'120','200','1.42','0.01','27.5','0.1','7.6','0.3','22.4','2.7','9.3','0.6','−12.8'],
 [1,'117','193','1.42','0.02','27.5','0.7','7.7','0.3','29.8','2.1','9.2','0.3','+0.7'],
 [2,'115','188','1.42','0.01','27.5','0.4','7.5','0.2','30.2','2.8','8.4','0.3','+4.5'],
 [5,'102','155','1.41','0.02','28.1','0.7','6.3','0.1','26.3','3.0','7.6','0.2','+8.7'],
 [8,'96','140','1.37','0.01','28.6','0.3','5.9','0.1','21.1','1.2','7.7','0.2','+5.0']
];
export const characterizationColumns=[
 {property:'spread-diameter',label:'Spread diameter',unit:'mm',contextId:'fresh',table:3,page:11,column:'dm'},
 {property:'consistency',label:'Consistency',unit:'%',contextId:'fresh',table:3,page:11,column:'C',kind:'author-calculated'},
 {property:'bulk-density',label:'Bulk density',unit:'Mg/m³',contextId:'physical',table:3,page:11,column:'ρb'},
 {property:'water-absorption',label:'Atmospheric water absorption',unit:'%',contextId:'physical',table:3,page:11,column:'WA'},
 {property:'dynamic-modulus',label:'Initial dynamic modulus',unit:'GPa',contextId:'initialModulus',table:4,page:12,column:'Ed 28 days'},
 {property:'compressive',label:'Exposed compression',unit:'MPa',contextId:'exposed',table:5,page:15,column:'σc'},
 {property:'dynamic-modulus',label:'Exposed dynamic modulus',unit:'GPa',contextId:'exposed',table:5,page:15,column:'Ed'},
 {property:'strength-change',label:'Author-reported strength change',unit:'%',contextId:'exposed',table:5,page:15,column:'Δ',kind:'author-calculated'}
];
export function biocharCharacterization(dose){
 const row=rows.find(r=>r[0]===dose);if(!row)throw Error('Unknown biochar dose');
 const [,dm,c,d,ds,wa,was,e,es,s,ss,ee,ees,delta]=row;
 const values=[[dm],[c],[d,ds],[wa,was],[e,es],[s,ss],[ee,ees],[delta]];
 return characterizationColumns.map((column,i)=>{
  const [value,spread]=values[i],context=biocharTestContexts[column.contextId];
  return {id:'saccani-mh'+dose+'-'+column.contextId+'-'+column.property,...column,
   value:Number(value.replace('−','-')),original:value+(spread!==undefined?' ± '+spread:''),
   ...(spread!==undefined?{spread:Number(spread),spreadKind:'reported ±; type unresolved'}:{}),
   kind:column.kind||'source-reported',context:{...context},checkedAt:'2026-10-16',
   locator:'Table '+column.table+', p. '+column.page+' / MH-'+dose+' / '+column.column,
   ...(column.property==='consistency'?{calculation:'100 × (dm − 40)/40; source-rounded percent; uncertainty not reported'}:{}),
   ...(column.property==='strength-change'?{calculation:'100 × (Table 5 σc − Table 4 28-day σc) / Table 4 28-day σc; author-rounded, not recalculated; uncertainty not reported'}:{})};
 });
}
