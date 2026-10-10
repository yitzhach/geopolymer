import {test} from 'node:test';
import assert from 'node:assert/strict';
import {researchUpdates} from '../src/research-updates.js';
import {library,filterLibrary} from '../src/research-library.js';
import {journalArticles,filterJournal} from '../src/journal-data.js';
import {journalRSS,journalFeed,researchDatabase} from '../src/research-feeds.js';
import {renderPage} from '../src/app.js';
import {search} from '../src/data.js';
test('new literature is dated, deduplicated and searchable through original summaries',()=>{
 assert.equal(researchUpdates.length,20);assert.equal(library.length,59);
 assert.equal(new Set(library.map(p=>p.id)).size,59);assert.equal(new Set(library.map(p=>p.doi.toLowerCase())).size,59);
 assert.equal(library.find(p=>p.id==='library-39').year,2019);
 for(const p of researchUpdates){assert.ok(p.published>='2026-09-01'&&p.published<='2026-10-10');assert.match(p.publisherUrl,/^https:\/\//);assert.equal(p.highlights.length,2);assert.ok(p.summary.length>60&&p.summary.length<350);assert.ok(p.summaryBasis&&p.publicationStatus);}
 assert.equal(filterLibrary()[0].id,'research-pp-impact');
 assert.equal(filterLibrary('','all','all','all','summaries').length,20);
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
 assert.equal(researchDatabase().records.length,59);
 const rss=journalRSS('https://example.test');assert.equal((rss.match(/<item>/g)||[]).length,journalArticles.length);assert.ok(rss.includes('Fibers, curing'));
 assert.match(renderPage('/journal/inside-the-material-lab-reading-notes').html,/no recording/);
});
