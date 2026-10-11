const {chromium}=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES?process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES+'/playwright':'playwright');
const assert=require('node:assert/strict');const fs=require('node:fs');
const base=process.env.BASE_URL||'http://localhost:4173';
(async()=>{const browser=await chromium.launch({headless:true});try{
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const go=async path=>{await page.goto(base+path);await page.locator('main[data-enhanced=true]').waitFor();};
 await go('/library');assert.equal(await page.locator('.library-card').count(),61);
 await page.locator('#lib-scope').selectOption('summaries');assert.equal(await page.locator('.library-card').count(),22);
 await page.locator('#lib-query').fill('Raspberry');assert.equal(await page.locator('.library-card').count(),1);
 await page.locator('.library-card summary').click();assert.match(await page.locator('.library-card').innerText(),/not itself a direct strength/);
 await page.locator('#lib-clear').click();assert.equal(await page.locator('.library-card').count(),61);
 await page.locator('#lib-topic').selectOption('AI & modeling');assert.equal(await page.locator('.library-card').count(),3);
 const data=await (await page.request.get(base+'/research-library.json')).json();assert.equal(data.records.length,61);
 await go('/journal');assert.equal(await page.locator('.journal-card').count(),5);
 await page.locator('#journal-category').selectOption('Podcast reading notes');assert.equal(await page.locator('.journal-card').count(),1);
 await page.locator('.journal-card h2 a').click();await page.waitForURL('**/journal/inside-the-material-lab-reading-notes');await page.locator('main[data-enhanced=true]').waitFor();assert.match(await page.locator('.journal-body').innerText(),/no recording/);
 await go('/journal?q=unmatched-xyz');assert.equal(await page.locator('.journal-card').count(),0);await page.locator('#journal-clear').click();assert.equal(await page.locator('.journal-card').count(),5);
 const feed=await (await page.request.get(base+'/journal/feed.json')).json();assert.equal(feed.items.length,5);
 const rss=await (await page.request.get(base+'/journal/feed.xml')).text();assert.equal((rss.match(/<item>/g)||[]).length,5);
 fs.mkdirSync('.qa',{recursive:true});
 for(const width of [1440,390]){await page.setViewportSize({width,height:1000});for(const path of ['/library','/journal','/journal/admixtures-and-precursors-need-controls']){await go(path);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'overflow '+path);await page.screenshot({path:'.qa/research-'+width+'-'+path.split('/').pop()+'.png',fullPage:true});}}
 assert.deepEqual(errors,[]);console.log('PASS research: searchable summaries, filters, reset, article routes, database export, RSS/JSON, desktop/mobile');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1);});
