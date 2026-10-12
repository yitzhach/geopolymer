const {chromium}=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES?process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES+'/playwright':'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.BASE_URL||'http://localhost:4173';
(async()=>{const browser=await chromium.launch({headless:true});try{
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const go=async path=>{await page.goto(base+path);await page.locator('main[data-enhanced=true]').waitFor();};
 await go('/knowledge');await page.locator('#ke-next').click();assert.match(await page.locator('#ke-count').innerText(),/Page 2/);
 await go('/knowledge?activation=mixed-na-k&property=compression&unit=MPa&min=70&ageDays=28');assert.match(await page.locator('#ke-count').innerText(),/^1 exact/);assert.match(await page.locator('#ke-results').innerText(),/72.72/);
 await page.reload();await page.locator('main[data-enhanced=true]').waitFor();assert.equal(await page.locator('[name=activation]').inputValue(),'mixed-na-k');
 await go('/knowledge?binder=metakaolin-slag&property=compression&unit=MPa&minSlag=20&maxSlag=40&ageDays=28&min=60');assert.match(await page.locator('#ke-count').innerText(),/^2 exact/);
 await go('/knowledge?binder=metakaolin-slag&property=compression&unit=MPa&minSlag=20&maxSlag=40&ageDays=28&min=100');assert.match(await page.locator('#ke-count').innerText(),/^0 exact/);
 await go('/studies/ke-5396');assert.match(await page.locator('main').innerText(),/below instrument detection/);
 await page.locator('[data-ke-save="5396-obs-1"]').click();await page.locator('#ra-panel').waitFor({state:'visible'});assert.match(await page.locator('#ra-excerpt').inputValue(),/5396-obs-1/);
 await page.locator('#ra-save').click();await page.locator('#ra-folders summary').click();assert.match(await page.locator('#ra-saved').innerText(),/5396-obs-1/);await page.keyboard.press('Escape');
 const exported=await (await page.request.get(base+'/knowledge.json')).json();assert.equal(exported.observations.length,267);assert.ok(!JSON.stringify(exported).includes('rawText'));
 await go('/studies/ke-902');assert.match(await page.locator('[id="902-srr-Na-D-1.5"]').innerText(),/Graph estimate/);await page.locator('[data-ke-save="902-srr-Na-D-1.5"]').click();assert.match(await page.locator('#ra-excerpt').inputValue(),/graph estimate; reading allowance ±0.003/);await page.keyboard.press('Escape');
 await go('/studies/ke-006');assert.match(await page.locator('main').innerText(),/No extracted experiment/);
 fs.mkdirSync('.qa',{recursive:true});for(const width of [1440,390]){await page.setViewportSize({width,height:1000});for(const path of ['/knowledge','/studies/ke-2957','/studies/ke-5396','/studies/ke-902']){await go(path);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'overflow '+path);await page.screenshot({path:'.qa/knowledge-'+width+'-'+path.split('/').pop()+'.png',fullPage:false});if(path==='/studies/ke-902'){await page.locator('[id="902-srr-Na-D-1.5"]').scrollIntoViewIfNeeded();await page.screenshot({path:'.qa/graph-estimates-'+width+'.png',fullPage:false});}}}
 assert.deepEqual(errors,[]);console.log('PASS knowledge: joined filters, abstention, pagination, stable URL, study routes, censored values, folder save, export, desktop/mobile');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1);});
