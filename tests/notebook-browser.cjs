const {chromium}=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES ? process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES+'/playwright' : 'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const base=process.env.BASE_URL||'http://localhost:4173';
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_EXECUTABLE_PATH?{executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH}:{})});
 try{
  fs.mkdirSync('.qa',{recursive:true});
  const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
  const go=async path=>{await page.goto(base+path);await page.locator('main[data-enhanced="true"]').waitFor();};
  const field=k=>page.locator(`[data-nb="${k}"]`);
  const action=(a,k)=>page.locator(`[data-action="${a}"]${k?`[data-kind="${k}"]`:''}`);
  const saved=async()=>{await page.locator('#nb-form button[type=submit]').first().click();await page.waitForFunction(()=>document.querySelector('#nb-status').textContent.startsWith('Trial saved'));};
  await go('/calculator');await page.locator('#gp-name').fill('Water comparison baseline');await page.locator('#gp-save').click();
  const legacy=await page.evaluate(()=>localStorage.getItem('geopolymer.calculator.v1'));
  await page.locator('#gp-notebook').click();await page.waitForURL(base+'/workspace#notebook');
  await page.locator('[data-meta=experimentTitle]').fill('Water and cracking');
  await page.locator('[data-meta=question]').fill('What changes when added water increases?');
  await field('title').fill('Trial A');await saved();
  assert.equal(await field('snapshot.recipe.rows.0.mass').count(),0,'saved recipe locked');
  await field('actualMasses.0').fill('101');await field('preparation.mixing').fill('Recorded sequence; no validated protocol implied');
  await action('add','specimens').click();await field('specimens.0.label').fill('Tile A1');await field('specimens.0.geometry').fill('100 × 100 × 10 mm');
  await action('add','curing').click();await field('curing.0.startHours').fill('0');await field('curing.0.durationHours').fill('24');await field('curing.0.temperatureC').fill('23');await field('curing.0.condition').fill('Sealed in mold');
  await action('add','observations').click();await field('observations.0.category').fill('Cracking');await field('observations.0.text').fill('No visible cracks at 24 hours');await field('observations.0.ageHours').fill('24');
  const specimen=await field('observations.0.specimenId').locator('option').nth(1).getAttribute('value');await field('observations.0.specimenId').selectOption(specimen);
  await action('add','results').click();await field('results.0.property').fill('Specimen mass');await field('results.0.value').fill('215.4');await field('results.0.unit').fill('g');await field('results.0.ageHours').fill('24');await field('results.0.method').fill('Bench balance');await field('results.0.source').fill('Operator notebook');await field('results.0.specimenId').selectOption(specimen);await saved();
  await action('duplicate').click();await field('title').fill('Trial B');await field('variable').fill('Increase added water by 2 g');await field('snapshot.recipe.rows.2.mass').fill('12');
  assert.equal(await field('results.0.value').count(),0,'duplicate has no copied results');assert.equal(await field('actualMasses.0').inputValue(),'');
  await saved();assert.match(await page.locator('#nb-comparison').innerText(),/recipe.rows.2.mass/);
  await action('add','observations').click();await field('observations.0.text').fill('Draft observation survives refresh');await page.reload();await page.locator('main[data-enhanced=true]').waitFor();
  assert.equal(await field('observations.0.text').inputValue(),'Draft observation survives refresh');await saved();
  assert.equal(await page.evaluate(()=>localStorage.getItem('geopolymer.calculator.v1')),legacy);
  const data=await page.evaluate(()=>JSON.parse(localStorage.getItem('geopolymer.notebook.v1')));
  assert.equal(data.trials.length,2);assert.equal(data.trials[1].parentId,data.trials[0].id);assert.equal(data.trials[0].snapshot.recipe.rows[2].mass,10);assert.equal(data.trials[1].snapshot.recipe.rows[2].mass,12);
  assert.equal(data.trials[0].results[0].sourceType,'own');assert.equal(data.trials[0].actualMasses[0],101);
  await page.screenshot({path:'.qa/notebook-desktop.png',fullPage:true});
  await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await page.screenshot({path:'.qa/notebook-mobile.png',fullPage:true});
  const downloaded=page.waitForEvent('download');await action('export').click();const file=await downloaded;assert.equal(file.suggestedFilename(),'geopolymer-notebook.json');
  await page.locator('#nb-import').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(data))});await page.waitForFunction(()=>document.querySelector('#nb-status').textContent.includes('imported as new copies'));
  assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('geopolymer.notebook.v1')).trials.length),4);
  const current=await page.evaluate(()=>localStorage.getItem('geopolymer.notebook.v1'));
  await page.locator('#nb-import').setInputFiles({name:'bad.json',mimeType:'application/json',buffer:Buffer.from('{"format":"future"}')});await page.waitForFunction(()=>document.querySelector('#nb-status').textContent.includes('Import rejected'));assert.equal(await page.evaluate(()=>localStorage.getItem('geopolymer.notebook.v1')),current);
  // Portable incomplete draft carries the saved context, including its parent trial.
  await action('add','results').click();await field('results.0.property').fill('Incomplete result');
  const draftDownload=page.waitForEvent('download');await action('draft-export').click();const draftFile=await draftDownload;
  const portable=fs.readFileSync(await draftFile.path());
  const clean=await browser.newContext(),other=await clean.newPage();other.on('dialog',d=>d.accept());await other.goto(base+'/workspace');await other.locator('main[data-enhanced=true]').waitFor();
  await other.locator('#nb-import').setInputFiles({name:'draft.json',mimeType:'application/json',buffer:portable});await other.waitForFunction(()=>document.querySelector('[data-nb="results.0.property"]')?.value==='Incomplete result');
  assert.equal(await other.locator('[data-nb="title"]').inputValue(),'Trial B');assert.match(await other.locator('#nb-comparison').innerText(),/Trial A/);
  // Save failure keeps input and the previously committed notebook unchanged.
  await page.evaluate(()=>{Storage.prototype.setItem=()=>{throw Error('QA quota');};});
  await field('results.0.value').fill('200');await field('results.0.unit').fill('g');await field('results.0.method').fill('Balance');await field('results.0.source').fill('Lab');
  await page.locator('#nb-form button[type=submit]').first().click();assert.match(await page.locator('#nb-status').innerText(),/Could not save trial/);assert.equal(await field('results.0.value').inputValue(),'200');assert.equal(await page.evaluate(()=>localStorage.getItem('geopolymer.notebook.v1')),current);
  assert.deepEqual(errors,[]);console.log('PASS: notebook capture, locked snapshots, actual quantities, specimens, curing, results, duplication, mobile layout, recovery, portable draft and notebook imports, legacy preservation and quota failure.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
