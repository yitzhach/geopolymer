// Maps published editorial content into the research-rights-guard bundle.
// Covers deep dives, journal briefings, library summaries, research topics,
// published recipes, novel-recipe groups, house formulation records and
// knowledge-pilot study pages.
import {library} from '../src/research-library.js';
import {deepDives} from '../src/deep-dives.js';
import {journalArticles} from '../src/journal-data.js';
import {researchTopics} from '../src/research-topics.js';
import {literatureMixes} from '../src/literature-mixes.js';
import {novelRecipeGroups} from '../src/novel-recipes.js';
import {formulations,papers} from '../src/data.js';
import {pilot} from '../src/knowledge-pilot.js';
import {licenseFromUrl} from '../.claude/skills/research-rights-guard/scripts/rights-core.mjs';

// The written rights statement is the evidence; licenseUrl is carried separately so the
// checker can catch a link that disagrees with it. Anything not stated stays unknown.
const licenseFromText=text=>{const m=/\bCC BY(?: (\d\.\d))?\b/.exec(text||'');if(m)return m[1]?`CC-BY-${m[1]}`:'CC-BY';return /\bIn Copyright\b/.test(text||'')?'all-rights-reserved':'unknown';};
const text=parts=>parts.flat(Infinity).filter(x=>typeof x==='string').join('\n');
const depth={'metadata-only':0,abstract:1,'open-full-text':2,'licensed-full-text':2};

export default function collect(){
 const sources=new Map(),byKey=new Map();
 // Records that only carry a doi.org URL still identify a DOI.
 const key=(doi,url)=>{doi=doi||/^https:\/\/doi\.org\/(10\.\S+)$/.exec(url||'')?.[1];return doi?`doi:${doi.toLowerCase()}`:`url:${url}`;};
 // One ledger entry per work. Deeper reading upgrades access; a recorded license replaces "unknown".
 const source=(doi,url,fields)=>{
  const k=key(doi,url);let s=byKey.get(k);
  if(!s){s={id:fields.id||k,doi,url,license:'unknown',access:'metadata-only'};byKey.set(k,s);sources.set(s.id,s);}
  const {id,access,license,checked,...rest}=fields;
  for(const [f,v] of Object.entries(rest))if(v!==undefined&&v!==null&&v!=='')s[f]=v;
  if(checked&&!(s.checked>checked))s.checked=checked;
  if(access&&depth[access]>=depth[s.access])s.access=access;
  if(license&&license!=='unknown')s.license=license;
  return s;
 };
 for(const r of library)source(r.doi,r.url,{id:r.id,title:r.title,authors:r.authors,checked:r.checked,
  access:/abstract/i.test(r.summaryBasis||'')?'abstract':'metadata-only'});

 const items=[];
 for(const d of deepDives){
  const s=source(d.doi,d.source,{title:d.sourceTitle,authors:d.citation,url:d.source,license:licenseFromText(d.license),
   licenseUrl:d.licenseUrl,rightsEvidence:d.license,checked:d.checked,access:'open-full-text'});
  items.push({id:`deep-dive:${d.id}`,type:'deep-dive',aiAssisted:true,sources:[s.id],
   text:text([d.title,d.summary,d.glossary,d.highlights,d.facts.map(f=>[f.title,f.text]),d.checklist,d.arithmetic.intro,d.arithmetic.rows,d.arithmetic.notes,d.holds]),
   claims:d.facts.map(f=>({source:s.id,locator:f.locator})),
   rightsNote:[d.license,d.accessNote].filter(Boolean).join(' ')});
 }
 for(const a of journalArticles)items.push({id:`journal:${a.id}`,type:'article',aiAssisted:true,sources:a.sources,
  text:text([a.title,a.summary,a.paragraphs]),
  rightsNote:'Original AI-assisted editorial briefing from abstract-level notes; links to publisher records. No quotations, figures or tables reproduced.'});
 // Library cards publish summaries, scope notes and metadata notes beside the bibliographic record.
 for(const r of library.filter(r=>r.summary||r.scope||r.metadataNote))items.push({id:`library:${r.id}`,type:'card',
  aiAssisted:true,sources:[r.id],text:text([r.summary,r.highlights||[],r.scope,r.metadataNote]),
  rightsNote:[r.summaryBasis,r.rights?.basis,r.access].filter(Boolean).join('. ')});

 for(const t of researchTopics){
  const ids=new Map();
  for(const l of t.sources){
   // Indexed leads record identity only; their locator describes retrieval status, not a section read.
   const access={'indexed-lead':'metadata-only','abstract-reviewed':'abstract','full-text-partial':'open-full-text'}[l.access];
   const license=licenseFromText([l.locator,l.rights,l.next].join(' '));
   const s=source(l.doi,l.sourceUrl,{title:l.title,checked:l.checked,access,license,
    rightsEvidence:license==='unknown'?undefined:`${l.locator}. ${l.rights}`});
   ids.set(l.id,{ledgerId:s.id,lead:l,access});
  }
  items.push({id:`topic:${t.id}`,type:'article',aiAssisted:true,sources:[...ids.values()].map(x=>x.ledgerId),
   text:text([t.title,t.summary,t.sources.map(l=>[l.material,l.note,l.next]),t.questions.map(q=>[q.title,q.text])]),
   claims:[...ids.values()].filter(x=>x.access!=='metadata-only').map(x=>({source:x.ledgerId,locator:x.lead.locator})),
   rightsNote:`Original topic synthesis linking ${t.sources.length} sources; ${[...new Set(t.sources.map(l=>l.rights))].join(' ')}`});
 }

 const recipeSource=new Map();
 for(const m of literatureMixes){
  const lic=m.license;
  const s=source(m.doi,m.url,{title:m.sourceTitle||m.title,authors:m.authors,checked:m.checkedAt,
   license:lic?licenseFromText(lic.label):'unknown',licenseUrl:lic?.url,
   rightsEvidence:lic?`${lic.label}. ${lic.notice} Evidence: ${lic.evidenceUrl||lic.url}`:undefined,
   // Every published recipe locates its quantities in a table, section, page or example of the document.
   access:'open-full-text'});
  recipeSource.set(m.id,s.id);
  const locators=[m.locator,...(m.results||[]).map(r=>r.locator),...(m.characterization||[]).map(c=>c.table&&`Table ${c.table}${c.page?`, p. ${c.page}`:''}`)].filter(Boolean);
  items.push({id:`recipe:${m.id}`,type:'protocol',aiAssisted:true,sources:[s.id],
   text:text([m.title,m.summary,m.basis,m.ingredients.map(i=>i.name),m.parameters,m.preparation,m.curing,m.method,m.limitations,
    (m.results||[]).map(r=>r.context),(m.tweaks||[]).map(x=>x.text),m.evidenceLimits]),
   claims:[...new Set(locators)].map(locator=>({source:s.id,locator})),
   rightsNote:lic?`${lic.label}. ${lic.notice} ${m.evidenceLimits||''}`.trim()
    :`No reuse license recorded; selected facts only (proportions, conditions, reported values) located at ${m.locator}. No source text, tables or figures reproduced.`});
 }
 for(const g of novelRecipeGroups)items.push({id:`recipe-group:${g.id}`,type:'card',aiAssisted:true,
  sources:[...new Set(g.recipes.map(id=>recipeSource.get(id)))],text:text([g.title,g.focus,g.note]),
  rightsNote:'Original editorial grouping note; facts come from the linked recipe records.'});

 const paperSource=new Map(papers.map(p=>[p.id,source(p.doi,p.url,{title:p.title,authors:p.authors,checked:p.reviewedAt,
  access:/summary reviewed/i.test(p.access)?'abstract':'metadata-only'}).id]));
 for(const p of papers)items.push({id:`paper:${p.id}`,type:'summary',aiAssisted:true,sources:[paperSource.get(p.id)],
  text:text([p.summary,p.limitation]),rightsNote:`${p.access}. Original summary; no source text reproduced.`});
 for(const f of formulations)items.push({id:`formulation:${f.id}`,type:'card',aiAssisted:true,
  sources:f.paperIds.map(id=>paperSource.get(id)),text:text([f.title,f.summary]),
  rightsNote:'Original method record pointing to the linked paper; no quantities extracted.'});

 // Knowledge-pilot study pages: assets carry the platform's own per-operation rights ledger.
 const studySource=new Map();
 for(const a of pilot.assets){
  const lib=library.find(r=>r.id===a.publicationId);
  const s=source(lib?.doi,lib?.url||a.url,{license:a.license,licenseUrl:a.licenseUrl,checked:a.checked,access:'open-full-text',
   rightsEvidence:`${a.rightsEvidenceUrl}. ${a.attribution}`,operations:a.operations});
  studySource.set(a.publicationId,s.id);
 }
 const located=rows=>rows.map(r=>r.provenance?.locator).filter(Boolean);
 for(const st of pilot.studies){
  const pub=st.publicationId,own=rows=>rows.filter(r=>r.publicationId===pub),id=studySource.get(pub);
  const rel=own(pilot.relationships);
  items.push({id:`study:${pub}`,type:'deep-dive',aiAssisted:/ai/.test(st.verification),
   sources:[...new Set([id,...rel.map(r=>studySource.get(r.relatedPublicationId))])],
   text:text([st.methods,st.limitations,st.coverageNote,st.inventory.map(i=>i.note),own(pilot.findings).map(f=>f.text),
    own(pilot.tests).map(t=>[t.geometry,t.method]),own(pilot.materials).map(m=>[m.source,m.qualification]),rel.map(r=>r.scope)]),
   claims:[...new Set([st.methodProvenance.locator,...located([...own(pilot.mixes),...own(pilot.tests),...own(pilot.observations),...own(pilot.findings),...own(pilot.materials)])])]
    .map(locator=>({source:id,locator})),
   // Full transcriptions of source tables are reproductions under the asset's license.
   tables:st.tables.map(t=>({id:t.id,mode:'reproduced',source:id,locator:t.provenance.locator})),
   rightsNote:`${pilot.assets.find(a=>a.publicationId===pub).attribution} ${st.coverageNote}`});
 }

 return {sources:[...sources.values()],items};
}
