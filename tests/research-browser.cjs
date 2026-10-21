const {chromium}=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES?process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES+'/playwright':'playwright');
const assert=require('node:assert/strict');const fs=require('node:fs');
const base=process.env.BASE_URL||'http://localhost:4173';
(async()=>{const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_EXECUTABLE_PATH?{executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH}:{})});try{
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const go=async path=>{await page.goto(base+path);await page.locator('main[data-enhanced=true]').waitFor();};
 await go('/library');assert.equal(await page.locator('.library-card').count(),1000);
 await page.locator('#lib-scope').selectOption('summaries');assert.equal(await page.locator('.library-card').count(),22);
 await page.locator('#lib-query').fill('Raspberry');assert.equal(await page.locator('.library-card').count(),1);
 await page.locator('.library-card summary').click();assert.match(await page.locator('.library-card').innerText(),/not itself a direct strength/);
 await page.locator('#lib-clear').click();assert.equal(await page.locator('.library-card').count(),1000);
 await page.locator('#lib-topic').selectOption('AI & modeling');assert.equal(await page.locator('.library-card').count(),3);
 await page.locator('#lib-clear').click();await page.locator('#lib-query').fill('10.1016/j.jclepro.2023.138205');assert.equal(await page.locator('.library-card').count(),1);assert.match(await page.locator('.library-card').innerText(),/Adjacent Portland-cement/);assert.match(await page.locator('.library-card').innerText(),/Correction linked; review pending/);
 await page.locator('.library-card a[href="/studies/ke-b02-009"]').click();await page.locator('main[data-enhanced=true]').waitFor();assert.match(await page.locator('main').innerText(),/No extracted experiment/);assert.equal(await page.locator('.callout a[href="https://doi.org/10.1016/j.jclepro.2023.139246"]').count(),1);
 await go('/studies/ke-b04-022');assert.match(await page.locator('main').innerText(),/outside the alkaline calculator model/);
 const data=await (await page.request.get(base+'/research-library.json')).json();assert.equal(data.records.length,1000);
 await go('/research');await page.locator('a[href="/research/hemp-geopolymers"]').click();await page.locator('main[data-enhanced=true]').waitFor();
 assert.equal(await page.locator('article[id^="source-"]').count(),10);
 await page.locator('#source-hempcrete summary').click();assert.match(await page.locator('#source-hempcrete details').innerText(),/Review pending/);
 const notes=await (await page.request.get(base+'/research-topics/hemp-geopolymers.json')).json();assert.equal(notes.sources.length,10);assert.match(notes.evidenceScope,/not verified numeric/);
 await page.locator('a[href="#sources"]').click();assert.equal(await page.locator('#sources').count(),1);
 const dives=await (await page.request.get(base+'/deep-dives.json')).json();assert.equal(dives.articles.length,212);
 await go('/deep-dives');assert.equal(await page.locator('article.record').count(),212);await page.locator('a[href="/deep-dives/ggbs-taguchi-mortar"]').click();await page.locator('main[data-enhanced=true]').waitFor();assert.match(await page.locator('main').innerText(),/Source conflict/);assert.equal(await page.locator('#walkthrough ol > li').count(),9);
 await go('/deep-dives/bn-hemp-nanofiber-slag');assert.match(await page.locator('main').innerText(),/Source conflict/);await page.locator('a[href="/studies/ke-b07-025"]').click();await page.locator('main[data-enhanced=true]').waitFor();assert.match(await page.locator('main').innerText(),/10.3390\/polym18111288/);
 await go('/journal');assert.equal(await page.locator('.journal-card').count(),5);
 await page.locator('#journal-category').selectOption('Podcast reading notes');assert.equal(await page.locator('.journal-card').count(),1);
 await page.locator('.journal-card h2 a').click();await page.waitForURL('**/journal/inside-the-material-lab-reading-notes');await page.locator('main[data-enhanced=true]').waitFor();assert.match(await page.locator('.journal-body').innerText(),/no recording/);
 await go('/journal?q=unmatched-xyz');assert.equal(await page.locator('.journal-card').count(),0);await page.locator('#journal-clear').click();assert.equal(await page.locator('.journal-card').count(),5);
 const feed=await (await page.request.get(base+'/journal/feed.json')).json();assert.equal(feed.items.length,5);
 const rss=await (await page.request.get(base+'/journal/feed.xml')).text();assert.equal((rss.match(/<item>/g)||[]).length,5);
 fs.mkdirSync('.qa',{recursive:true});
 // Keep the 1,000-record library screenshot bounded; DOM count and full-page overflow checks still apply.
 for(const width of [1440,390]){await page.setViewportSize({width,height:1000});for(const path of ['/deep-dives','/deep-dives/ggbs-taguchi-mortar','/deep-dives/biochar-replacement-and-exposure','/deep-dives/basalt-fiber-carbon-textile','/deep-dives/bn-hemp-nanofiber-slag','/deep-dives/metakaolin-slag-shrinkage-controls','/deep-dives/metakaolin-water-temperature','/deep-dives/metakaolin-freeze-thaw-design','/deep-dives/carbonate-slag-hydroxide-balance','/deep-dives/fly-ash-slag-efflorescence-moisture','/deep-dives/one-part-admixture-compatibility','/deep-dives/metakaolin-slag-potassium-durability','/research/hemp-geopolymers','/library','/journal','/journal/admixtures-and-precursors-need-controls','/studies/ke-b02-009','/studies/ke-b04-022']){await go(path);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'overflow '+path);await page.screenshot({path:'.qa/research-'+width+'-'+path.split('/').pop()+'.png',fullPage:path!=='/library'});}}
 assert.deepEqual(errors,[]);console.log('PASS research: searchable summaries, filters, reset, article routes, database export, RSS/JSON, desktop/mobile');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1);});
