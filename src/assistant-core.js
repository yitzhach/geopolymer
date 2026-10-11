import { library } from './research-library.js';
import { products } from './data.js';

export const ASSISTANT_KEY = 'gp-research-assistant-v1';
export const emptyResearch = () => ({ version: 1, folders: ['General research'], clips: [] });
export const safeLink = value => typeof value === 'string' && !/[\\\s\u0000-\u001f]/.test(value) && (/^\/(?!\/)/.test(value) || /^https:\/\//i.test(value));
const stop = new Set('a an the of in on at to for and or with is are be this that it my our your i we how what why can could should would do does about please find explain compare research study studies paper papers source sources deep dive help buy purchase product products related me more tell'.split(' '));
function words(text) {
  const tokens = String(text).toLowerCase().match(/[\p{L}\p{N}]+/gu) || [];
  const aliases = { fibres:'fiber',fibers:'fiber',fibre:'fiber',coatings:'coating',coated:'coating',silane:'silane',casting:'cast',castings:'cast',pigments:'color',colours:'color',colors:'color',students:'classroom',student:'classroom',teaching:'classroom',teacher:'classroom' };
  return [...new Set(tokens.filter(w => w.length > 2 && !stop.has(w)).map(w => aliases[w] || w))];
}
function ranked(items, query, context, describe) {
  const wanted = words(query), background = words(context);
  return items.map(item => {
    const hay = new Set(words(describe(item)));
    return { item, score: wanted.reduce((n,w)=>n+(hay.has(w)?4:0),0) + background.reduce((n,w)=>n+(hay.has(w)?1:0),0) };
  }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,4).map(x=>x.item);
}

// Provider boundary: a future server-side provider must return this same structured
// response. No credential, remote call, generated claim or web-search claim here.
export async function answerResearch({ excerpt = '', question = '', history = [] }) {
  const previous = history.filter(m=>m.role==='user').slice(-2).map(m=>m.text).join(' ');
  const context = excerpt + ' ' + previous;
  const shopping = /\b(buy|purchase|shop|product|products|kit|kits|supplies)\b/i.test(question);
  if (shopping) {
    const matches = ranked(products,question,context,p=>`${p.title} ${p.category} ${p.materialId} ${p.summary}`);
    return {
      role:'assistant', mode:'catalog-test', title:'Explore product concepts',
      text: matches.length ? 'These catalog matches are research leads, not a compatibility recommendation. All current products are concepts: none is available to order, and prices and stock are not confirmed.' : 'I could not match that request to a product concept. Try a material or use, such as metakaolin, classroom, casting or texture.',
      sources: matches.map(p=>({id:p.id,title:p.title,url:'/shop/'+p.id,summary:p.summary,evidence:'Product concept · not available to order'})),
      questions:['What material, quantity and application do you need?','Which grade, assay and handling requirements must be confirmed before purchase?'],
    };
  }
  const matches = ranked(library,question,context,p=>`${p.title} ${p.topic} ${p.doi} ${p.authors||''} ${p.summary||''} ${(p.highlights||[]).join(' ')}`);
  return {
    role:'assistant', mode:'catalog-test', title: /\b(plan|test|next)\b/i.test(question) ? 'A research plan to work through' : 'Follow the evidence',
    text: matches.length ? 'I matched your excerpt and question to the site’s research catalog. The notes below describe the linked records; they do not establish that your excerpt is correct. Open the original studies to investigate the claim.' : 'No matching source was found in the site catalog. This test assistant cannot search the web or answer from a language model. Try a specific material, property or DOI, or use the excerpt to start a saved research note.',
    sources: matches.map(p=>({id:p.id,title:p.title,url:p.publisherUrl||p.url,summary:p.summary||'Metadata only; no findings have been extracted for this record.',evidence:p.summaryBasis||'Title and publication metadata only; full paper not reviewed'})),
    questions:['Define the claim: which material, property and application are being discussed?','Compare the source’s material grade, activator, preparation, curing and test age with your intended use.','Record the control mixture, test method, replicates and missing evidence before drawing a conclusion.'],
  };
}

export function parseResearch(raw) {
  const data = typeof raw === 'string' ? JSON.parse(raw) : raw;
  const string = (s,max) => typeof s === 'string' && s.length<=max;
  if (!data || data.version!==1 || !Array.isArray(data.folders) || !data.folders.length || data.folders.length>100 || !data.folders.every(f=>string(f,80)&&f.trim()) || new Set(data.folders).size!==data.folders.length || !Array.isArray(data.clips) || data.clips.length>200) throw new Error('Invalid research backup.');
  const ids=new Set();
  for (const c of data.clips) {
    if (!c || !string(c.id,100) || !c.id || ids.has(c.id) || !data.folders.includes(c.folder) || !string(c.excerpt,5000) || !string(c.notes,10000) || !string(c.title,300) || !string(c.url,3000) || !safeLink(c.url) || !string(c.savedAt,40) || !Number.isFinite(Date.parse(c.savedAt)) || !Array.isArray(c.messages) || c.messages.length>60) throw new Error('Invalid saved research entry.');
    ids.add(c.id);
    for(const m of c.messages) {
      if(!m || !['user','assistant'].includes(m.role) || !string(m.text,10000)) throw new Error('Invalid conversation.');
      if(m.role==='assistant' && (!string(m.title,200) || m.mode!=='catalog-test' || !Array.isArray(m.sources) || m.sources.length>10 || !m.sources.every(s=>s&&string(s.id,100)&&string(s.title,500)&&string(s.summary,3000)&&string(s.evidence,1000)&&string(s.url,3000)&&safeLink(s.url)) || !Array.isArray(m.questions) || m.questions.length>10 || !m.questions.every(q=>string(q,1000)))) throw new Error('Invalid source or response.');
    }
  }
  return structuredClone(data);
}

export function mergeResearch(current, incoming, makeId) {
  const next=parseResearch(current), added=parseResearch(incoming);
  next.folders=[...new Set([...next.folders,...added.folders])];
  next.clips.push(...added.clips.map(c=>({...c,id:makeId()})));
  return parseResearch(next);
}
