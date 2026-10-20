export function validateReadingPreviews(previews,publications,guides){
 const seen=new Set();
 for(const p of previews){
  const fail=message=>{throw new Error(`Reading preview ${p.doi||'unknown'}: ${message}`);};
  const key=String(p.doi||'').toLowerCase();if(seen.has(key))fail('duplicate DOI');seen.add(key);
  const source=publications.find(s=>s.doi.toLowerCase()===key),guide=guides.find(g=>g.id===p.deepDiveId&&g.doi.toLowerCase()===key);
  if(!source||!guide||source.id!==p.publicationId)fail('broken publication/guide identity');
  if(p.links?.deepDive!=='/deep-dives/'+guide.id||p.links?.originalArticle!=='https://doi.org/'+source.doi)fail('invalid reading links');
  if(p.paragraphs?.length!==3||p.paragraphs.some(x=>!x.heading||!x.text))fail('three labeled paragraphs required');
  for(const field of ['takeaways','limitations','provenance'])if(!Array.isArray(p[field])||!p[field].length)fail('missing '+field);
  if(!p.audience||!p.coverage||!p.edited||!p.sourceChecked)fail('missing reader/coverage context');
  if(p.provenance.some(x=>!x.locator||!/^https:\/\//.test(x.source)))fail('source locators required');
  if(p.sourceStatus!==(source.sourceStatus?.state||'not-assessed'))fail('source status needs reconciliation');
  if(p.sourceStatus==='update-requires-review'&&!p.statusNotice)fail('correction hold must stay visible');
 }
 return true;
}
