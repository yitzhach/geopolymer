// Maps published editorial content into the research-rights-guard bundle.
// Covers deep dives, journal briefings and library discovery summaries.
import {library} from '../src/research-library.js';
import {deepDives} from '../src/deep-dives.js';
import {journalArticles} from '../src/journal-data.js';

const ccFromUrl=url=>{const m=/creativecommons\.org\/licenses\/((?:by)(?:-nc)?(?:-nd|-sa)?)\/(\d\.\d)/.exec(url||'');return m?`CC-${m[1].toUpperCase()}-${m[2]}`:null;};
const ccFromText=text=>/\bCC BY\b/.test(text)?'CC-BY':'unknown';
const text=parts=>parts.flat(Infinity).filter(x=>typeof x==='string').join('\n');

export default function collect(){
 const sources=new Map(),byDoi=new Map();
 for(const r of library){
  const s={id:r.id,title:r.title,authors:r.authors,doi:r.doi,url:r.url,license:'unknown',checked:r.checked,
   access:/abstract/i.test(r.summaryBasis||'')?'abstract':'metadata-only'};
  sources.set(s.id,s);byDoi.set(r.doi.toLowerCase(),s);
 }
 const items=[];
 for(const d of deepDives){
  // A deep dive read more of its source than the catalog record did; its rights record wins.
  const s=byDoi.get(d.doi.toLowerCase())||{id:`doi:${d.doi.toLowerCase()}`,doi:d.doi};
  Object.assign(s,{title:d.sourceTitle,authors:d.citation,url:d.source,license:ccFromUrl(d.licenseUrl)||ccFromText(d.license),
   licenseUrl:d.licenseUrl,rightsEvidence:d.license,checked:d.checked,access:'open-full-text'});
  sources.set(s.id,s);
  items.push({id:`deep-dive:${d.id}`,type:'deep-dive',aiAssisted:true,sources:[s.id],
   text:text([d.title,d.summary,d.glossary,d.highlights,d.facts.map(f=>[f.title,f.text]),d.checklist,d.arithmetic.intro,d.arithmetic.rows,d.arithmetic.notes,d.holds]),
   claims:d.facts.map(f=>({source:s.id,locator:f.locator})),quotes:[],figures:[],
   rightsNote:[d.license,d.accessNote].filter(Boolean).join(' ')});
 }
 for(const a of journalArticles)items.push({id:`journal:${a.id}`,type:'article',aiAssisted:true,sources:a.sources,
  text:text([a.title,a.summary,a.paragraphs]),quotes:[],figures:[],
  rightsNote:'Original AI-assisted editorial briefing from abstract-level notes; links to publisher records. No quotations, figures or tables reproduced.'});
 for(const r of library.filter(r=>r.summary))items.push({id:`library:${r.id}`,type:'card',aiAssisted:/AI-assisted/.test(r.summaryAuthor||''),
  sources:[r.id],text:text([r.summary,r.highlights||[]]),rightsNote:`${r.summaryBasis}. ${r.access}`});
 return {sources:[...sources.values()],items};
}
