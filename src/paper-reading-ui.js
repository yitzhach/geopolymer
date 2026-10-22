import {paperReadingPreviews} from './paper-reading-previews.js';
import {mixDesignFor} from './deep-dive-mix-designs.js';
import {renderMixDataSet} from './mix-data-contract.js';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const byDoi=new Map(paperReadingPreviews.map(p=>[p.doi.toLowerCase(),p]));
export const readingPreviewFor=doi=>byDoi.get(String(doi||'').toLowerCase())||null;
const searchTextByDoi=new Map(paperReadingPreviews.map(p=>[p.doi.toLowerCase(),[...p.paragraphs.map(x=>x.text),...p.takeaways,...p.limitations,p.audience,...mixDesignFor(p.deepDiveId).dataSet.fields.map(f=>[f.text,...f.rows.flat()].join(' '))].join(' ')]));
export const readingPreviewSearchText=doi=>searchTextByDoi.get(String(doi||'').toLowerCase())||'';
export function renderReadingPreview(record,{collapsible=true}={}){
 const p=readingPreviewFor(record.doi);if(!p)return '';
 const body=`${p.statusNotice?`<p class="callout">${esc(p.statusNotice)}</p>`:''}${p.paragraphs.map(x=>`<p><strong>${esc(x.heading)}.</strong> ${esc(x.text)}</p>`).join('')}${renderMixDataSet(mixDesignFor(p.deepDiveId).dataSet)}<h3>Key takeaways</h3><ul>${p.takeaways.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><h3>Limitations</h3><ul>${p.limitations.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><h3>Who would benefit from reading further?</h3><p>${esc(p.audience)}</p><div class="actions"><a class="text-link" href="${esc(p.links.deepDive)}">Read experiment deep dive →</a><a class="text-link" href="${esc(p.links.originalArticle)}" target="_blank" rel="noopener noreferrer">Read original article ↗</a></div><p class="small">${esc(p.coverage)} Summary edited ${esc(p.edited)}; source-note check ${esc(p.sourceChecked)}.${p.additionalSourceCheck?` Additional findings check ${esc(p.additionalSourceCheck)}.`:''}</p>`;
 return collapsible?`<details class="paper-reading-summary"><summary>Read paper summary</summary>${body}</details>`:`<section class="section paper-reading-summary"><h2>Paper summary</h2>${body}</section>`;
}
