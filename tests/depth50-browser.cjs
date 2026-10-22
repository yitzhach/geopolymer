const {chromium}=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES?process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES+'/playwright':'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.BASE_URL||'http://localhost:4173';
(async()=>{
 const {depth50DeepDives:guides}=await import('../src/deep-dive-depth50-expansion.js');
 const {paperReadingPreviews}=await import('../src/paper-reading-previews.js');
 const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_EXECUTABLE_PATH?{executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH}:{})});
 try{
  for(const javaScriptEnabled of [true,false])for(const width of [1440,390]){
   const page=await browser.newPage({javaScriptEnabled,viewport:{width,height:1000}}),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   for(const d of guides){
    const p=paperReadingPreviews.find(p=>p.doi===d.doi);
    for(const path of [d.relatedStudy,p.links.deepDive]){
     const response=await page.goto(base+path);assert.equal(response.status(),200,path);
     if(javaScriptEnabled)await page.locator('main[data-enhanced=true]').waitFor();
     assert.ok((await page.locator('main').innerText()).includes(d.facts[2].text),path);
     assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,path);
     if(path===d.relatedStudy){
      const summary=page.locator('.paper-reading-summary');assert.equal(await summary.locator('p > strong').count(),3);
      assert.equal(await summary.locator('a[href="'+p.links.deepDive+'"]').count(),1);
      assert.ok(await summary.locator('a[href="'+p.links.originalArticle+'"]').count());
     }else{
      if(d.evidenceKind&&d.evidenceKind!=='experimental-study'){assert.match(await page.locator('#walkthrough').innerText(),/Original assessment and evidence-review guidance/);assert.doesNotMatch(await page.locator('#walkthrough').innerText(),/These steps organise a new experiment/);}
      assert.equal(await page.locator('#inventory tbody tr').count(),7);assert.ok(await page.locator('main a[href="'+d.source+'"]').count());}
    }
   }
   await page.goto(base+'/library');if(javaScriptEnabled)await page.locator('main[data-enhanced=true]').waitFor();
   const target=guides.find(d=>d.doi==='10.3390/ma18102272'),p=paperReadingPreviews.find(p=>p.doi===target.doi);
   if(javaScriptEnabled){await page.locator('#lib-query').fill(target.doi);assert.equal(await page.locator('.library-card').count(),1);}
   const summary=page.locator('#'+p.publicationId+' details.paper-reading-summary');await summary.locator(':scope > summary').click();
   assert.match(await summary.innerText(),/rupture in the repair matrix/);
   await summary.evaluate(el=>window.scrollTo(0,window.scrollY+el.getBoundingClientRect().top-100));
   fs.mkdirSync('.qa',{recursive:true});await page.screenshot({path:`.qa/depth50-summary-${width}-${javaScriptEnabled?'js':'nojs'}.png`});
   await summary.locator('a[href="'+p.links.deepDive+'"]').click();await page.waitForURL('**'+p.links.deepDive);
   assert.deepEqual(errors,[]);await page.close();
  }
  console.log('PASS depth50: all 100 affected routes, findings, inventories, source/guide links, library disclosure/navigation, desktop/mobile and JS/no-JS.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
