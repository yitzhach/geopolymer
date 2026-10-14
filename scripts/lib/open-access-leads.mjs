// Discovery hints only. This module never fetches a URL or grants asset rights.
const text = value => typeof value === 'string' ? value.slice(0,300) : null;
export function sourceURL(value) {
 if(typeof value!=='string'||value.length>2048)return null;
 try {
  const url=new URL(value);
  if(url.protocol!=='https:'||url.username||url.password||url.port||!url.hostname.includes('.')||/^\[|^[\d.]+$/.test(url.hostname)||/(^|\.)(localhost|local|internal|test|invalid)$/.test(url.hostname))return null;
  if([...url.searchParams.keys()].some(key=>/token|secret|key|signature|credential|authorization/i.test(key)))return null;
  url.hash='';return url.href;
 }catch{return null;}
}
export function accessLeads(work) {
 const entries=[],seen=new Set();
 const add=(value,details)=>{
  const url=sourceURL(value);if(!url)return;
  const key=JSON.stringify([url,details.version,details.license]);if(seen.has(key))return;
  seen.add(key);entries.push({url,...details,reachability:'unchecked',rights:'unassessed'});
 };
 const locations=[work.best_oa_location,...(Array.isArray(work.locations)?work.locations.slice(0,50):[]),work.primary_location];
 for(const location of locations){
  if(!location||location.is_oa!==true)continue;
  const details={provider:'openalex-location',version:text(location.version),license:text(location.license),hostType:text(location.source?.type),reportedOpenAccess:true};
  add(location.pdf_url,{...details,format:'pdf'});add(location.landing_page_url,{...details,format:'landing-page'});
 }
 for(const [key,format] of [['grobid_xml','tei-xml'],['pdf','pdf']]){
  const url=sourceURL(work.content_urls?.[key]);
  const suffix=key==='pdf'?'pdf':'grobid-xml';
  const id=/^https:\/\/openalex.org\/(W\d{1,20})$/.exec(work.id||'')?.[1];
  if(id&&work.has_content?.[key]===true&&url===`https://content.openalex.org/works/${id}.${suffix}`)
   add(url,{provider:'openalex-content',format,version:null,license:null,hostType:'cached-content',reportedOpenAccess:null,requiresApiKey:true});
 }
 return entries.sort((a,b)=>{
  const score=x=>(['cc-by','cc0'].includes(x.license)?4:0)+(x.format==='tei-xml'?2:0)+(x.format==='pdf'?1:0);
  return score(b)-score(a);
 }).slice(0,20);
}
export function researchLinks(work) {
 const ids=rows=>(Array.isArray(rows)?rows:[]).filter(id=>typeof id==='string'&&/^https:\/\/openalex.org\/W\d{1,20}$/.test(id)).slice(0,20);
 return {references:ids(work.referenced_works),related:ids(work.related_works),meaning:'Discovery links only; not evidence of scientific agreement'};
}
