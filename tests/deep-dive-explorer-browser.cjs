const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.BASE_URL||'http://localhost:4173';
(async()=>{const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_EXECUTABLE_PATH?{executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH}:{})});try{
 for(const width of [1440,390])for(const javaScriptEnabled of [true,false]){
  const p=await browser.newPage({viewport:{width,height:1000},javaScriptEnabled}),errors=[];p.on('pageerror',e=>errors.push(e.message));
  assert.equal((await p.goto(base+'/deep-dives')).status(),200);if(javaScriptEnabled)await p.locator('main[data-enhanced=true]').waitFor();
  assert.equal(await p.locator('[data-dive-id]').count(),362);
  if(javaScriptEnabled){
   await p.selectOption('#dive-readiness','with');assert.match(await p.locator('#dive-count').innerText(),/119 of 362/);assert.equal(await p.locator('[data-dive-id]:visible').count(),119);
   await p.selectOption('#dive-material','potassium');assert.ok(await p.locator('[data-dive-id]:visible').count()>0);
   const first=p.locator('[data-dive-id]:visible').first();await first.locator('.dive-compare').click();assert.match(await p.locator('#dive-compare-status').innerText(),/1 of 4/);
   await p.click('#dive-reset');await p.fill('#dive-query','26.9 PBDI');assert.equal(await p.locator('[data-dive-id]:visible').count(),1);
   await p.locator('[data-dive-id="phosphate-polymer-rheology"] .dive-compare').click();assert.match(await p.locator('#dive-compare-status').innerText(),/2 of 4/);
   const url=p.url();assert.ok(url.includes('compare='));await p.reload();await p.locator('main[data-enhanced=true]').waitFor();assert.match(await p.locator('#dive-compare-status').innerText(),/2 of 4/);
   await p.locator('[data-dive-id="phosphate-polymer-rheology"] summary').click();assert.match(await p.locator('[data-dive-id="phosphate-polymer-rheology"]').innerText(),/20.0 g/);
   assert.match(await p.locator('#dive-comparison').innerText(),/no pooled ranking/);
   await p.fill('#dive-query','nothing-matches-zzzz');assert.equal(await p.locator('[data-dive-id]:visible').count(),0);assert.match(await p.locator('#dive-count').innerText(),/try removing/);
   await p.click('#dive-reset');const ids=await p.locator('[data-dive-id]').evaluateAll(cs=>cs.slice(0,6).map(c=>c.dataset.diveId));await p.click('#dive-clear-comparison');
   for(const id of ids.slice(0,5))await p.locator(`[data-compare-id="${id}"]`).click();assert.match(await p.locator('#dive-compare-status').innerText(),/Four guides selected/);
   assert.equal(await p.locator('.dive-compare[aria-pressed="true"]').count(),4);await p.click('#dive-clear-comparison');
   await p.goto(base+'/deep-dives?compare=solid-refractory-sr1-versus-sr4,glass-frit-chloride-containment-ramp');await p.locator('main[data-enhanced=true]').waitFor();
   const conditions=await p.locator('#dive-comparison').innerText();assert.match(conditions,/70 °C\/24 h/);assert.match(conditions,/900 °C\/5 h/);assert.match(conditions,/Curing:/);assert.match(conditions,/Testing:/);
   await p.selectOption('#dive-readiness','with');await p.locator('#deep-dive-explorer').scrollIntoViewIfNeeded();
  }else{const card=p.locator('[data-dive-id="phosphate-polymer-rheology"]');await card.locator('summary').click();assert.match(await card.innerText(),/26.9 g/);await card.scrollIntoViewIfNeeded();}
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);assert.deepEqual(errors,[]);
  fs.mkdirSync('.qa',{recursive:true});await p.screenshot({path:`.qa/dive-explorer-${width}-${javaScriptEnabled?'js':'nojs'}.png`});await p.close();
 }
 console.log('PASS deep-dive explorer: grouping, materials, dose search, source ledgers, comparison, share URLs, limits, empty/reset, mobile/no-JS');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
