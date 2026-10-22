const {chromium}=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES?process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES+'/playwright':'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.BASE_URL||'http://localhost:4173';
(async()=>{const {deepDives}=await import('../src/deep-dives.js');const {deepDiveMixDesigns}=await import('../src/deep-dive-mix-designs.js');
 const guides=process.env.MIX_FOCUS?deepDives.filter(d=>deepDiveMixDesigns.find(p=>p.guideId===d.id).status!=='source-review-needed'):deepDives;
 const contextFilter=process.env.MIX_CONTEXT;if(contextFilter&&!['1440-js','390-js','1440-nojs','390-nojs'].includes(contextFilter))throw Error('Invalid MIX_CONTEXT');const contexts=[];
 const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_EXECUTABLE_PATH?{executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH}:{})});
 try{for(const javaScriptEnabled of [true,false])for(const width of [1440,390]){
  const contextKey=width+'-'+(javaScriptEnabled?'js':'nojs');if(contextFilter&&contextFilter!==contextKey)continue;contexts.push(contextKey);
  const page=await browser.newPage({javaScriptEnabled,viewport:{width,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const d of guides){const response=await page.goto(base+'/deep-dives/'+d.id);assert.equal(response.status(),200,d.id);if(javaScriptEnabled)await page.locator('main[data-enhanced=true]').waitFor();
   const section=page.locator('#mix-design');assert.equal(await section.count(),1,d.id);assert.equal(await section.locator('.mix-data-set section').count(),8,d.id);assert.equal(await page.locator('a[href="#mix-design"]').count(),1,d.id);
   assert.ok(await section.locator('a[href="'+d.source+'"]').count(),d.id);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,d.id);
   const packet=deepDiveMixDesigns.find(p=>p.guideId===d.id);
   if(packet.selection){assert.match(await section.innerText(),/Why select this version/);assert.equal(await section.locator('article').count(),packet.selection.choices.length);}
  }
  await page.goto(base+'/deep-dives/seawater-strength-versus-free-chloride');if(javaScriptEnabled)await page.locator('main[data-enhanced=true]').waitFor();
  await page.locator('a[href="#mix-design"]').click();assert.ok(page.url().endsWith('#mix-design'));
  assert.match(await page.locator('#mix-design').innerText(),/chloride|Chloride/);assert.match(await page.locator('#mix-design').innerText(),/Calculated 1,000 g/);
  await page.locator('#mix-design .mix-variants summary').click();assert.equal(await page.locator('#mix-design .mix-variants a').count(),3);await page.locator('#mix-design .mix-variants summary').click();
  await page.locator('#mix-design details:not(.mix-variants):not(.mix-data-set) summary').click();assert.equal(await page.locator('#mix-design details:not(.mix-variants):not(.mix-data-set)').getAttribute('open'),'');
  fs.mkdirSync('.qa',{recursive:true});await page.screenshot({path:`.qa/mix-design-${width}-${javaScriptEnabled?'js':'nojs'}.png`});
  await page.locator('#mix-design article a[href="/formulations/seawater-sw"]').first().click();assert.equal(new URL(page.url()).pathname,'/formulations/seawater-sw');
  if(javaScriptEnabled)await page.locator('main[data-enhanced=true]').waitFor();
  assert.match(await page.locator('main').innerText(),/598\/2 = 299 g each/);
  if(javaScriptEnabled){await page.locator('#mix-mass').fill('2000');await page.locator('#mix-scale').click();assert.match(await page.locator('#mix-status').innerText(),/updated/);}
  assert.deepEqual(errors,[]);await page.close();
 }
 const response=await (await browser.newPage()).request.get(base+'/deep-dive-mix-designs.json');assert.equal(response.status(),200);const data=await response.json();assert.equal(data.records.length,362);assert.ok(data.records.every(p=>p.protocolComplete===false));
 console.log('Mix-design sections: '+guides.length+' guides; contexts '+contexts.join(', ')+'; standard dataset, source links, disclosure, scaling and JSON passed.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
