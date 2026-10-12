// Recompute author aggregates from reported measurements; never rewrite source data.
import {pilot} from '../src/knowledge-pilot.js';
export function auditFactorSummaries(data=pilot) {
 const study=data.studies.find(s=>s.publicationId==='ke-2957');
 const checks=[];
 for(const [table,series,age] of [[5,'N',7],[6,'N',28],[7,'K',7],[8,'K',28]]) {
  const source=study.tables.find(t=>t.label==='Table '+table);
  for(const [propertyIndex,property] of ['compression','flexure'].entries()) {
   for(let factor=0;factor<3;factor++) {
    const levels=[[8,10,12,14],[.7,.8,.9,1],[1.5,2,2.5,3]][factor];
    const inputs=levels.map(level=>data.mixes.filter(m=>new RegExp(`^2957-${series}\\d+$`).test(m.id)&&m.quantities[factor].value===level).map(m=>data.observations.find(o=>o.mixId===m.id&&o.property===property&&o.ageDays===age)));
    if(inputs.some(group=>group.length!==4||group.some(o=>!o)))throw new Error('Incomplete orthogonal design inputs');
    const sums=inputs.map(group=>group.reduce((sum,o)=>sum+o.value,0));
    const means=sums.map(sum=>sum/4);
    for(const row of ['K1','K2','K3','K4','k1','k2','k3','k4','R']) {
     const sourceText=source.rows.find(r=>r[1]===row)[2+propertyIndex*3+factor];
     const index=Number(row.slice(1))-1;
     const calculated=row==='R'?Math.max(...means)-Math.min(...means):row[0]==='K'?sums[index]:means[index];
     // Source inputs/outputs rounded to 0.01 MPa: allow compounded rounding.
     const tolerance=row[0]==='K'?.03:row==='R'?.02:.011;
     checks.push({table:source.label,property,ageDays:age,factor:'ABC'[factor],row,sourceText,calculated:Number(calculated.toFixed(6)),tolerance,status:Math.abs(Number(sourceText)-calculated)<=tolerance?'consistent-with-rounding':'disagreement',inputObservationIds:(row==='R'?inputs.flat():inputs[index]).map(o=>o.id)});
    }
   }
  }
 }
 return {schemaVersion:1,publicationId:'ke-2957',checked:'2026-10-12',basis:'Tables 3–4 measurements versus Tables 5–8 author sums, means and ranges',reviewer:'deterministic arithmetic plus Codex AI source review; no human/domain review',policy:'Preserve source cells. Disputed aggregates are not observations and must not drive a numeric recommendation. No inference about which source input is wrong.',checks};
}
if(process.argv[1]?.endsWith('audit-factor-summaries.mjs'))console.log(JSON.stringify(auditFactorSummaries(),null,2));
