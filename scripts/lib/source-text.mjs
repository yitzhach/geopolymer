// Source-text mode helpers: read an open-access paper (Europe PMC JATS XML, or PMC article HTML) into prose and tables,
// build the standard table quotes, and check a source-text sheet's quotes against the paper.
// Pure functions here; network access lives only in fetchOpenSource. See MIX_SHEET_STANDARD.md,
// "Source-text procedure". Retrieved papers are kept outside the repository (default: the OS temp
// folder) and are never committed.
import {normalizeText} from '../../src/mix-table.js';

const ENTITIES={amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' ',thinsp:' ',ensp:' ',emsp:' ',minus:'−',ndash:'–',mdash:'—',plusmn:'±',deg:'°',times:'×',middot:'·',micro:'µ'};
export function decodeEntities(s){
 return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi,(m,e)=>e[0]==='#'?String.fromCodePoint(e[1].toLowerCase()==='x'?parseInt(e.slice(2),16):Number(e.slice(1))):ENTITIES[e.toLowerCase()]??m);
}
const SKIP=new Set(['script','style','nav','header','footer','noscript','svg','button','form','object-id','disp-formula','ref-list','front-stub']);
const BLOCK=new Set(['p','div','section','h1','h2','h3','h4','h5','h6','li','ul','ol','figcaption','caption','dd','dt','br','article','aside','blockquote',
 'sec','title','label','table-wrap','table-wrap-foot','fig','abstract','list-item','article-title','license-p']);
const VOID=new Set(['br','img','hr','meta','link','input','col','source','wbr']);
const attr=(a,name)=>Number((a.match(new RegExp(`${name}\\s*=\\s*["']?(\\d+)`,'i'))||[])[1]||1);
const clean=s=>s.replace(/\s+/g,' ').trim();

// HTML or JATS XML → {blocks: prose paragraphs in order, tables: [{number, caption, rows, header, spans}]}.
// Cells spanning several rows or columns are copied into every position they cover; `spans`
// lists each spanning cell once so a quote can say so.
export function parseArticle(html){
 const blocks=[],tables=[];let buf='',skip=0,table=null,row=null,cell=null,inHead=false;
 const flush=()=>{const t=clean(buf);if(t)blocks.push(t);buf='';};
 // Tag names may hold '-' and ':' (JATS table-wrap, ali:license_ref); <!doctype>, <?xml?> and CDATA are dropped.
 const re=/<!--[\s\S]*?-->|<![^>]*>|<\?[\s\S]*?\?>|<(\/?)([a-zA-Z][\w:.-]*)([^>]*)>|([^<]+)/g;let m;
 while((m=re.exec(html))){
  if(m[4]!==undefined){const t=decodeEntities(m[4]);if(skip)continue;if(cell)cell.text+=t;else if(!table)buf+=t;continue;}
  if(!m[2])continue;
  const close=m[1]==='/',tag=m[2].toLowerCase(),a=m[3]||'';
  // Raw-text elements: jump to their end tag (their contents may hold "<" that is not markup).
  if(!close&&(tag==='script'||tag==='style')){const end=html.toLowerCase().indexOf(`</${tag}`,re.lastIndex);re.lastIndex=end<0?html.length:html.indexOf('>',end)+1;continue;}
  if(SKIP.has(tag)){if(!close&&!/\/\s*$/.test(a))skip++;else if(close)skip=Math.max(0,skip-1);continue;}
  if(skip)continue;
  if(tag==='table'){
   if(!close){flush();table={rows:[],headRows:0};}
   else if(table){tables.push(finishTable(table,blocks));blocks.push(`[Table ${tables.at(-1).number??'?'}]`);table=null;}
   continue;
  }
  if(table){
   if(tag==='thead')inHead=!close;
   else if(tag==='tr'){if(!close){row=[];}else if(row){table.rows.push({cells:row,head:inHead||row.every(c=>c.th)});row=null;}}
   else if(tag==='td'||tag==='th'){
    if(!close){cell={text:'',rowspan:attr(a,'rowspan'),colspan:attr(a,'colspan'),th:tag==='th'};}
    else if(cell&&row){cell.text=clean(cell.text);row.push(cell);cell=null;}
   }
   else if(cell&&(tag==='br'||tag==='p'))cell.text+=' ';
   continue;
  }
  if(BLOCK.has(tag)||VOID.has(tag)&&tag==='br')flush();
 }
 flush();
 return {blocks,tables};
}

function finishTable(t,blocks){
 // Expand row/column spans into a full grid.
 const grid=[],spans=[];
 t.rows.forEach((r,ri)=>{
  grid[ri]=grid[ri]||[];let ci=0;
  for(const c of r.cells){
   while(grid[ri][ci]!==undefined)ci++;
   if(c.rowspan>1||c.colspan>1)spans.push({row:ri,col:ci,rowspan:c.rowspan,colspan:c.colspan,text:c.text});
   for(let dr=0;dr<c.rowspan;dr++)for(let dc=0;dc<c.colspan;dc++){(grid[ri+dr]=grid[ri+dr]||[])[ci+dc]=c.text;}
   ci+=c.colspan;
  }
 });
 const rows=grid.slice(0,t.rows.length).map(r=>Array.from(r,c=>c??''));
 const first=t.rows.findIndex(r=>!r.head),h=first<0?1:Math.max(first,1);
 // Caption: "Table N." label and the caption text in the blocks just before the table.
 let number=null,caption='';
 for(let i=blocks.length-1;i>=Math.max(0,blocks.length-4);i--){
  const lm=blocks[i].match(/^Table\s+([A-Z]?\d+[a-z]?)\.?\s*(.*)$/);
  if(lm){number=lm[1];caption=clean(lm[2]||blocks.slice(i+1).join(' '));break;}
 }
 // spans are re-indexed to body rows; header spans are dropped.
 return {number,caption:caption.replace(/\s*Open in a new tab\s*$/,''),header:rows.slice(0,h),rows:rows.slice(h),
  spans:spans.filter(s=>s.row>=h).map(s=>({...s,row:s.row-h}))};
}

export const findTable=(source,number)=>source.tables.find(t=>String(t.number)===String(number));

// The standard table quote: "Table N (caption): header | header → cell | cell".
// `cols` picks columns by index (default all). Stacked header rows are joined per column
// ("MCA-ACBFS Water/Binder 0.45"). `rowIndex` may be an array for tables whose mixes are columns:
// the rows are joined with " ; " (e.g. "Abbreviation | G-1 ; PAS Foam:Paste Ratio | 1:1").
// Cells that span several rows or columns in the source are named in a trailing [spanning cells: …].
export function headerFor(table,i){
 return [...new Set(table.header.map(h=>h[i]).filter(Boolean))].join(' ');
}
export function tableQuote(table,rowIndex,{cols,header}={}){
 const indexes=[].concat(rowIndex),spanned=[];
 const parts=indexes.map(ri=>{
  const row=table.rows[ri];if(!row)throw new Error(`Table ${table.number} has no row ${ri}`);
  const idx=cols||row.map((_,i)=>i);
  for(const s of table.spans)if(idx.some(i=>i>=s.col&&i<s.col+s.colspan)&&ri>=s.row&&ri<s.row+s.rowspan)
   spanned.push(s.rowspan>1?(headerFor(table,s.col)||s.text):`${row[0]} (${s.colspan} columns)`);
  return idx.map(i=>row[i]).join(' | ');
 });
 const idx=cols||table.rows[indexes[0]].map((_,i)=>i),head=header||idx.map(i=>headerFor(table,i));
 return `Table ${table.number} (${table.caption.replace(/\.$/,'')}): ${head.join(' | ')} → ${parts.join(' ; ')}`+(spanned.length?` [spanning cells: ${[...new Set(spanned)].join(', ')}]`:'');
}

const QUOTE_FIELDS=['text','detail','baseText','ageText','condition'];
function* quotesOf(o,path=''){
 if(Array.isArray(o))for(const [i,v] of o.entries())yield* quotesOf(v,`${path}[${i}]`);
 else if(o&&typeof o==='object')for(const [k,v] of Object.entries(o)){
  if(QUOTE_FIELDS.includes(k)&&typeof v==='string')yield {path:path+'.'+k,text:v};
  else if(typeof v==='object')yield* quotesOf(v,path?`${path}.${k}`:k);
 }
}
// Every prose quote must occur verbatim (after normalization) in the article text; every table
// quote must name a real table and its cells after "→" must all sit in one row of that table.
export function groundSheet(sheet,source){
 const prose=normalizeText(source.blocks.join(' ')),problems=[];let count=0;
 const skip=new Set(['scope','gaps','missing','basisNote','ageNote','propertyNote']);
 for(const {path,text} of quotesOf(sheet)){
  if([...skip].some(k=>path.endsWith('.'+k)))continue;
  count++;
  const tm=text.match(/^Table\s+([A-Z]?\d+[a-z]?)\s*\((.*?)\):\s*(.*?)\s*→\s*(.*?)(?:\s*\[spanning cells:[^\]]*\])?$/);
  if(tm){
   const table=findTable(source,tm[1]);
   if(!table){problems.push(`${path}: no Table ${tm[1]} in the source`);continue;}
   if(!normalizeText(table.caption).includes(normalizeText(tm[2]).replace(/\.$/,'')))problems.push(`${path}: caption does not match Table ${tm[1]}`);
   for(const seg of tm[4].split(' ; ')){
    const cells=seg.split('|').map(normalizeText);
    const rowsFit=table.rows.some(r=>{const rc=r.map(normalizeText);return cells.every(c=>rc.includes(c));});
    if(!rowsFit)problems.push(`${path}: cells "${seg.slice(0,80)}" are not all in one row of Table ${tm[1]}`);
   }
   const head=new Set([...table.header.flat(),...table.rows.flat()].map(normalizeText).filter(Boolean));
   const headParts=tm[3].split('|').map(normalizeText).filter(Boolean);
   for(const h of headParts)if(![...head].some(x=>h.includes(x)&&x))problems.push(`${path}: header "${h}" is not a cell of Table ${tm[1]}`);
  }
  else if(!prose.includes(normalizeText(text)))problems.push(`${path}: not found verbatim in the source: "${text.slice(0,90)}"`);
 }
 return {count,problems};
}

export const isChallenge=text=>/checking your browser|captcha|are you a robot/i.test(text.slice(0,5000));
// Europe PMC lookup for a DOI, then the article's full text from the Europe PMC API. Returns the parsed source plus the
// access record the batch audit needs. Refuses papers that are not open access.
export async function fetchOpenSource(doi,{fetchImpl=fetch}={}){
 const log=[];
 const q=new URL('https://www.ebi.ac.uk/europepmc/webservices/rest/search');
 q.search=new URLSearchParams({query:`DOI:"${doi}"`,format:'json',resultType:'core',pageSize:'5'}).toString();
 const r=await fetchImpl(q);log.push({action:'Europe PMC search',url:String(q),status:r.status});
 if(!r.ok)return {log,error:`Europe PMC search failed (${r.status})`};
 const hits=(await r.json()).resultList?.result||[];
 const hit=hits.find(h=>h.pmcid&&String(h.doi||'').toLowerCase()===doi.toLowerCase())||hits.find(h=>h.pmcid);
 if(!hit)return {log,error:'no PMC copy'};
 const meta={doi,pmcid:hit.pmcid,openAccess:hit.isOpenAccess==='Y',license:hit.license||null,title:hit.title};
 if(!meta.openAccess||!/^cc[ -]?by/i.test(meta.license||''))return {log,meta,error:`not open access under a CC BY licence (${meta.license||'none'})`};
 // Europe PMC's full-text API is the machine-reading channel for open-access papers; the PMC website is
 // not scraped (it may answer with a browser challenge, which must never be retried or worked around).
 const url=`https://www.ebi.ac.uk/europepmc/webservices/rest/${hit.pmcid}/fullTextXML`;
 const p=await fetchImpl(url);
 log.push({action:'GET full text (JATS XML)',url,status:p.status});
 if(!p.ok)return {log,meta,error:`full text not available from Europe PMC (${p.status}); defer the paper`};
 const xml=await p.text();
 if(isChallenge(xml))return {log,meta,error:'a browser challenge page was returned; do not retry; record failed access and defer'};
 return {log,meta:{...meta,url,articleUrl:`https://pmc.ncbi.nlm.nih.gov/articles/${hit.pmcid}/`,accessed:new Date().toISOString().slice(0,10)},html:xml,source:parseArticle(xml)};
}

// Saved paper for a guide (written by `npm run mixes -- source <guideId>`).
export async function loadSource(guideId,dir){
 const {readFile}=await import('node:fs/promises');const {tmpdir}=await import('node:os');const {join}=await import('node:path');
 return JSON.parse(await readFile(join(dir||join(tmpdir(),'geopolymer-sources'),`${guideId}.source.json`),'utf8'));
}
