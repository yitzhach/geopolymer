const {chromium}=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES?process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES+'/playwright':'playwright');
const assert=require('node:assert/strict');const fs=require('node:fs');
const base=process.env.BASE_URL||'http://localhost:4173';
(async()=>{const browser=await chromium.launch({headless:true});try{
 for(const width of [1440,390]){
  const context=await browser.newContext({viewport:{width,height:900},acceptDownloads:true});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
  await page.goto(base+'/library');await page.locator('#ra-launch').click();
  assert.match(await page.locator('#ra-panel').innerText(),/not a connected AI model/);
  await page.locator('#ra-mode').check();await page.locator('#ra-close').click();
  await page.evaluate(()=>{const text=[...document.querySelectorAll('.library-card h2,.library-card h3')].find(e=>e.textContent.includes('Silane'));if(!text)throw Error('Source card missing');const range=document.createRange();range.selectNodeContents(text);const s=getSelection();s.removeAllRanges();s.addRange(range);document.dispatchEvent(new Event('selectionchange'));});
  await page.locator('#ra-selection').click();assert.match(await page.locator('#ra-excerpt').inputValue(),/Silane/);
  await page.locator('[data-prompt="Deep dive into this text"]').click();await page.locator('.ra-source').first().waitFor();
  assert.match(await page.locator('#ra-messages').innerText(),/KH-560/);
  await page.locator('#ra-question').fill('What about metakaolin products?');await page.locator('#ra-ask').click();
  await page.waitForFunction(()=>document.querySelectorAll('.ra-message').length===4);
  assert.match(await page.locator('#ra-messages').innerText(),/not available to order/);
  await page.locator('#ra-folders summary').click();await page.locator('#ra-folder-name').fill('Surface research');await page.locator('#ra-folder-form button').click();
  await page.locator('#ra-notes').fill('<img src=x onerror=alert(1)> My test note');await page.locator('#ra-save').click();assert.match(await page.locator('#ra-status').innerText(),/Saved to/);
  await page.locator('#ra-save').click();assert.equal(await page.locator('[data-open]').count(),1);
  const downloadPromise=page.waitForEvent('download');await page.locator('#ra-export').click();const download=await downloadPromise;const backup=fs.readFileSync(await download.path(),'utf8');assert.equal(JSON.parse(backup).clips.length,1);
  await page.goto(base+'/shop');await page.locator('#ra-launch').click();assert.match(await page.locator('#ra-excerpt').inputValue(),/Silane/);
  await page.locator('#ra-folders summary').click();await page.locator('[data-open]').click();assert.match(await page.locator('#ra-notes').inputValue(),/My test note/);assert.equal(await page.locator('#gp-assistant img').count(),0);
  await page.locator('#ra-import').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(backup)});await page.waitForFunction(()=>document.querySelectorAll('[data-open]').length===2);
  await page.locator('#ra-import').setInputFiles({name:'bad.json',mimeType:'application/json',buffer:Buffer.from('{"version":99}')});await page.waitForFunction(()=>document.querySelector('#ra-status').textContent.includes('Import rejected'));assert.equal(await page.locator('[data-open]').count(),2);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const box=await page.locator('#ra-panel').boundingBox();assert.ok(box.x>=0&&box.x+box.width<=width);
  fs.mkdirSync('.qa',{recursive:true});await page.screenshot({path:`.qa/assistant-${width}.png`,fullPage:true});
  await page.locator('#ra-question').focus();await page.keyboard.press('Escape');assert.equal(await page.locator('#ra-panel').isVisible(),false);
  await page.locator('#ra-launch').click();
  await page.evaluate(()=>localStorage.setItem('gp-research-assistant-v1',JSON.stringify({version:1,folders:['Other tab'],clips:[]})));
  await page.locator('#ra-save').click();assert.match(await page.locator('#ra-status').innerText(),/Not saved/);
  assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('gp-research-assistant-v1')).folders),['Other tab']);
  assert.deepEqual(errors,[]);await context.close();
 }
 const blocked=await browser.newContext();await blocked.addInitScript(()=>{const original=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k==='gp-research-assistant-v1')throw new DOMException('Full','QuotaExceededError');return original.call(this,k,v);};});
 const page=await blocked.newPage();await page.goto(base+'/');await page.locator('#ra-launch').click();await page.locator('#ra-excerpt').fill('Storage failure excerpt');await page.locator('#ra-save').click();assert.match(await page.locator('#ra-status').innerText(),/Not saved/);await blocked.close();
 console.log('PASS assistant: desktop/mobile selection, retrieval, products, folders, navigation recovery, backup/import, unsafe markup, storage conflicts, quota failure and keyboard close');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1);});
