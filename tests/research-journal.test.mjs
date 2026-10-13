import {test} from 'node:test';
import assert from 'node:assert/strict';
import {researchUpdates} from '../src/research-updates.js';
import {library,filterLibrary} from '../src/research-library.js';
import {journalArticles,filterJournal} from '../src/journal-data.js';
import {journalRSS,journalFeed,researchDatabase} from '../src/research-feeds.js';
import {renderPage} from '../src/app.js';
import {search} from '../src/data.js';
import {answerResearch} from '../src/assistant-core.js';
import {knowledgeReferences} from '../src/knowledge-references.js';
import {reconcileBatch} from '../src/knowledge-core.js';
import fs from 'node:fs';
test('breadth batch preserves identities, metadata limits and correction exclusions',async()=>{
 const additions=knowledgeReferences.filter(p=>p.id.startsWith('ke-b02-'));
 const baseline=library.filter(p=>!/^ke-b0[234]-/.test(p.id));
 assert.equal(additions.length,25);assert.equal(baseline.length,86);
 assert.ok(additions.every(p=>p.extraction==='unstarted'&&p.datasetFamilyId===null&&!p.summary));
 const a=reconcileBatch(baseline,additions);assert.equal(a.records.length,111);
 assert.deepEqual(a.records.slice(0,86),baseline);
 assert.ok(reconcileBatch(a.records,additions).events.every(e=>e.status==='unchanged'));
 const flagged=additions.filter(p=>p.sourceStatus.state==='update-requires-review');
 assert.deepEqual(flagged.map(p=>p.id),['ke-b02-009','ke-b02-021']);
 for(const p of flagged){
  assert.match(renderPage('/studies/'+p.id).html,/Correction linked; review pending/);
  assert.ok(renderPage('/studies/'+p.id).html.includes(p.sourceStatus.updates[0].DOI));
  const answer=await answerResearch({question:p.doi});assert.ok(!answer.sources.some(s=>s.id===p.id));
 }
 assert.match(renderPage('/studies/ke-b02-009').html,/Adjacent Portland-cement/);
 const audit=JSON.parse(fs.readFileSync(new URL('../research/batches/breadth-2026-10-13.json',import.meta.url)));
 assert.deepEqual(audit.records.map(r=>r.id),additions.map(r=>r.id));
 for(const p of additions){const m=audit.records.find(r=>r.id===p.id).metadata;assert.equal(p.doi,m.DOI.toLowerCase());assert.equal(p.title,m.title[0]);assert.equal(p.journal,m['container-title'][0]);assert.ok(!('abstract' in m));}
});
test('new literature is dated, deduplicated and searchable through original summaries',()=>{
 assert.equal(researchUpdates.length,22);assert.equal(library.length,161);
 assert.equal(new Set(library.map(p=>p.id)).size,161);assert.equal(new Set(library.map(p=>p.doi.toLowerCase())).size,161);
 assert.equal(library.find(p=>p.id==='library-39').year,2019);
 for(const p of researchUpdates){assert.ok(p.published>='2026-09-01'&&p.published<='2026-10-10');assert.match(p.publisherUrl,/^https:\/\//);assert.equal(p.highlights.length,2);assert.ok(p.summary.length>60&&p.summary.length<350);assert.ok(p.summaryBasis&&p.publicationStatus);}
 assert.equal(filterLibrary()[0].id,'research-pp-impact');
 assert.equal(filterLibrary('','all','all','all','summaries').length,22);
 assert.equal(filterLibrary('Raspberry')[0].id,'research-sensor-bricks');
 assert.equal(filterLibrary('','2026','AI & modeling','Research article','summaries').length,2);
 assert.ok(search('Raspberry').some(p=>p.id==='research-sensor-bricks'));
});
test('journal articles, feeds and source references resolve without inventing podcasts',()=>{
 for(const p of journalArticles){const page=renderPage('/journal/'+p.id);assert.equal(page.status,200);assert.ok(page.html.includes(p.title));for(const id of p.sources)assert.ok(researchUpdates.find(r=>r.id===id));}
 assert.equal(renderPage('/journal/missing').status,404);
 assert.equal(filterJournal('','Podcast reading notes').length,1);
 assert.equal(filterJournal('no-article-xyz').length,0);
 assert.ok(filterJournal('18 distinct').length);
 const feed=journalFeed('https://example.test');assert.equal(new Set(feed.items.map(i=>i.id)).size,journalArticles.length);
 assert.equal(researchDatabase().records.length,161);
 const rss=journalRSS('https://example.test');assert.equal((rss.match(/<item>/g)||[]).length,journalArticles.length);assert.ok(rss.includes('Fibers, curing'));
 assert.match(renderPage('/journal/inside-the-material-lab-reading-notes').html,/no recording/);
});

test('two new bounded batches preserve metadata provenance and all previous identities',()=>{
 const baseline=library.filter(p=>!/^ke-b0[34]-/.test(p.id));assert.equal(baseline.length,111);
 let imported=baseline;
 for(const batch of [3,4]){
  const additions=knowledgeReferences.filter(p=>p.id.startsWith('ke-b0'+batch+'-'));assert.equal(additions.length,25);
  const audit=JSON.parse(fs.readFileSync(new URL('../research/batches/breadth-'+batch+'-2026-10-13.json',import.meta.url)));
  assert.deepEqual(additions.map(p=>p.id),audit.records.map(r=>r.id));
  for(const p of additions){const m=audit.records.find(r=>r.id===p.id).metadata;assert.equal(p.doi,m.DOI.toLowerCase());assert.equal(p.title,m.title[0].replace(/<[^>]+>/g,''));assert.equal(p.extraction,'unstarted');assert.equal(p.datasetFamilyId,null);assert.ok(!p.summary&&!m.abstract);assert.equal(renderPage('/studies/'+p.id).status,200);}
  imported=reconcileBatch(imported,additions).records;assert.ok(reconcileBatch(imported,additions).events.every(e=>e.status==='unchanged'));
 }
 assert.equal(imported.length,161);assert.deepEqual(imported.slice(0,111),baseline);
 assert.match(renderPage('/studies/ke-b04-022').html,/outside the alkaline calculator model/);
});
