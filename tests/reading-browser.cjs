const {chromium}=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES?process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES+'/playwright':'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.BASE_URL||'http://localhost:4173';
(async()=>{
 const {paperReadingPreviews}=await import('../src/paper-reading-previews.js');
 const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_EXECUTABLE_PATH?{executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH}:{})});
 try{
  for(const javaScriptEnabled of [true,false])for(const width of [1440,390]){
   const page=await browser.newPage({javaScriptEnabled,viewport:{width,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(base+'/library');if(javaScriptEnabled)await page.locator('main[data-enhanced=true]').waitFor();
   assert.equal(await page.locator('.paper-reading-summary').count(),111);
   const target=paperReadingPreviews.find(p=>p.doi==='10.3390/app13031804');
   if(javaScriptEnabled){
    await page.locator('#lib-scope').selectOption('reading');assert.equal(await page.locator('.library-card').count(),111);
    await page.locator('#lib-query').fill('acquisition');assert.ok(await page.locator('.library-card a[href="/deep-dives/foam-nmr-acquisition-time-versus-kinetics"]').count());
    await page.locator('#lib-query').fill(target.doi);assert.equal(await page.locator('.library-card').count(),1);
   }
   const card=page.locator('#'+target.publicationId),summary=card.locator('details.paper-reading-summary');
   assert.equal(await summary.evaluate(e=>e.open),false);await summary.locator('summary').click();assert.equal(await summary.evaluate(e=>e.open),true);
   assert.equal(await summary.locator('p > strong').count(),3);for(const text of ['Key takeaways','Limitations','Who would benefit'])assert.ok((await summary.innerText()).includes(text));
   assert.equal(await summary.getByRole('link',{name:'Read original article',exact:false}).getAttribute('href'),target.links.originalArticle);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
   fs.mkdirSync('.qa',{recursive:true});await summary.evaluate(el=>window.scrollTo(0,window.scrollY+el.getBoundingClientRect().top-100));await page.screenshot({path:`.qa/reading-summary-${width}-${javaScriptEnabled?'js':'nojs'}.png`});
   await summary.getByRole('link',{name:'Read experiment deep dive',exact:false}).click();await page.waitForURL('**'+target.links.deepDive);assert.equal(await page.locator('#inventory tbody tr').count(),7);
   const flagged=paperReadingPreviews.find(p=>p.sourceStatus==='update-requires-review');await page.goto(base+'/studies/'+flagged.publicationId);
   assert.match(await page.locator('.paper-reading-summary').innerText(),/Correction linked; review pending/);
   assert.deepEqual(errors,[]);await page.close();
  }
  const page=await browser.newPage();const response=await page.request.get(base+'/research-library.json');const exported=await response.json();assert.equal(exported.records.length,1000);assert.equal(exported.records.filter(p=>p.readingPreview).length,111);
  console.log('PASS reading summaries: all 111 previews, filters and summary search, expandable paragraphs/bullets, source and guide links, correction hold, export, desktop/mobile and no-JavaScript.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
