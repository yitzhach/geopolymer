// Fail publication when an editorial record loses its identity or provenance.
export function validateDeepDives(records){
 const ids=new Set(),dois=new Set();
 const required=(value,label)=>{if(typeof value!=='string'||!value.trim())throw new Error(`Deep dive: missing ${label}`);};
 for(const d of records){
  for(const key of ['id','title','summary','sourceTitle','doi','checked','citation','source','license','glossary'])required(d[key],key);
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(d.id)||ids.has(d.id))throw new Error('Deep dive: invalid/duplicate id');ids.add(d.id);
  const doi=d.doi.toLowerCase();if(!/^10\.\d{4,9}\/\S+$/.test(doi)||dois.has(doi))throw new Error('Deep dive: invalid/duplicate DOI');dois.add(doi);
  if(d.relatedRecipe && !/^\/formulations\/[a-z0-9-]+$/.test(d.relatedRecipe))throw new Error('Deep dive: invalid related recipe');
  if(d.relatedStudy && !/^\/studies\/[a-z0-9-]+$/.test(d.relatedStudy))throw new Error('Deep dive: invalid related study');
  if(!d.relatedRecipe&&!d.relatedStudy)throw new Error('Deep dive: related record required');
  if(d.licenseUrl && new URL(d.licenseUrl).protocol!=='https:')throw new Error('Deep dive: HTTPS license required');
  if(new URL(d.source).protocol!=='https:')throw new Error('Deep dive: HTTPS source required');
  for(const key of ['facts','highlights','checklist','holds'])if(!Array.isArray(d[key])||!d[key].length)throw new Error(`Deep dive: missing ${key}`);
  for(const f of d.facts)for(const key of ['title','text','locator'])required(f[key],`fact ${key}`);
  for(const item of [...d.highlights,...d.holds])required(item,'note');
  for(const step of d.checklist){if(step.length!==2)throw new Error('Deep dive: invalid step');step.forEach(x=>required(x,'step'));}
  required(d.arithmetic?.intro,'arithmetic context');
  if(!d.arithmetic.rows?.length||!d.arithmetic.notes?.length)throw new Error('Deep dive: arithmetic notes required');
  for(const row of d.arithmetic.rows){if(row.length!==3)throw new Error('Deep dive: invalid arithmetic row');row.forEach(x=>required(x,'arithmetic cell'));}
  d.arithmetic.notes.forEach(x=>required(x,'arithmetic note'));
 }
 return true;
}
