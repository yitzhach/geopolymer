import test from 'node:test';
import assert from 'node:assert/strict';
import {accessLeads,sourceURL,researchLinks} from '../scripts/lib/open-access-leads.mjs';
import {createQueue,applyPage,requestURL,validateQueue} from '../scripts/lib/openalex.mjs';
const location={is_oa:true,pdf_url:'https://repository.edu/paper.pdf',landing_page_url:'https://repository.edu/paper',version:'acceptedVersion',license:'cc-by',source:{type:'repository'}};
test('keeps repository versions, format and license hints without upgrading reachability or rights',()=>{
 const leads=accessLeads({locations:[location,location,{...location,is_oa:false,pdf_url:'https://publisher.com/paywall.pdf'}]});
 assert.equal(leads.length,2);assert.equal(leads[0].version,'acceptedVersion');assert.ok(leads.every(p=>p.reachability==='unchecked'&&p.rights==='unassessed'));
});
test('cached content must match the exact work identity and reports required key',()=>{
 const work={id:'https://openalex.org/W123',has_content:{pdf:true,grobid_xml:true},content_urls:{pdf:'https://content.openalex.org/works/W999.pdf',grobid_xml:'https://content.openalex.org/works/W123.grobid-xml'}};
 const leads=accessLeads(work);assert.equal(leads.length,1);assert.equal(leads[0].format,'tei-xml');assert.equal(leads[0].requiresApiKey,true);assert.equal(leads[0].license,null);
});
test('rejects credential-bearing, private-address, malformed and unsafe URLs',()=>{
 for(const url of ['http://repo.edu/paper','https://user:pass@repo.edu/paper','https://127.0.0.1/paper','https://localhost/paper','https://metadata.internal/paper','https://repo.edu/paper?api_key=secret','javascript:alert(1)','https://[::1]/paper'])assert.equal(sourceURL(url),null);
 assert.equal(sourceURL('https://repo.edu/paper?download=1#section'),'https://repo.edu/paper?download=1');
});
test('caps alternate locations and citation lists; citations never imply support',()=>{
 assert.equal(accessLeads({locations:Array.from({length:60},(_,i)=>({...location,pdf_url:`https://repo.edu/${i}.pdf`}))}).length,20);
 const links=researchLinks({referenced_works:Array.from({length:30},(_,i)=>`https://openalex.org/W${i}`),related_works:['untrusted']});assert.equal(links.references.length,20);assert.deepEqual(links.related,[]);assert.match(links.meaning,/not evidence/);
});
test('OA-only searches preserve broad-search compatibility and validate mode',()=>{
 const s=createQueue('geopolymer',[]);assert.equal(new URL(requestURL(s)).searchParams.get('filter'),null);
 s.openAccessOnly=true;assert.equal(new URL(requestURL(s)).searchParams.get('filter'),'open_access.is_oa:true');s.openAccessOnly='yes';assert.throws(()=>validateQueue(s,[]));
});
test('existing catalog papers gain discovery leads without duplicate catalog candidates',()=>{
 const catalog=[{id:'old',doi:'10.1234/existing',title:'Existing'}];
 const s=applyPage(createQueue('geopolymer',catalog),{results:[{id:'https://openalex.org/W123',doi:'10.1234/existing',title:'Existing',locations:[location]}],meta:{next_cursor:null}},catalog);
 assert.equal(s.candidates.length,0);assert.equal(s.accessLeads[0].existingId,'old');assert.equal(s.accessLeads[0].locations.length,2);assert.equal(catalog.length,1);
});
