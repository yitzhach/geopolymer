const {chromium}=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES?process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES+'/playwright':'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const base=process.env.BASE_URL||'http://localhost:4173';
(async()=>{const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_EXECUTABLE_PATH?{executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH}:{})});try{
fs.mkdirSync('.qa',{recursive:true});const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));let accept=true;page.on('dialog',d=>accept?d.accept():d.dismiss());
const go=async path=>{await page.goto(base+path);await page.locator('main[data-enhanced=true]').waitFor();};
await go('/formulations');assert.equal(await page.locator('#recipe-cards > a').count(),15);
await page.locator('#recipe-query').fill('KASIL 2040');assert.equal(await page.locator('#recipe-cards > a').count(),1);
await page.locator('#recipe-query').fill('no-recipe-xyz');assert.match(await page.locator('#recipe-count').innerText(),/0 recipes/);
await page.locator('#recipe-query').fill('');await page.locator('#recipe-activation').selectOption('sodium');assert.equal(await page.locator('#recipe-cards > a').count(),4);
await page.locator('[name=target]').fill('15');await page.locator('[name=ageHours]').selectOption('4');await page.locator('#requirements-form button').click();assert.match(await page.locator('#requirements-result').innerText(),/rapid dry-blend/);
await page.locator('[name=property]').selectOption('shear');assert.equal(await page.locator('#requirements-download').isDisabled(),true);await page.locator('#requirements-form button').click();assert.match(await page.locator('#requirements-result').innerText(),/No matching measurements/);
const [catalogDownload]=await Promise.all([page.waitForEvent('download'),page.locator('#catalog-download').click()]);const catalog=JSON.parse(fs.readFileSync(await catalogDownload.path(),'utf8'));assert.equal(catalog.records.length,15);
await go('/formulations/vogt-gp6');assert.match(await page.locator('main').innerText(),/81.3/);assert.match(await page.locator('main').innerText(),/Not recorded/);
await go('/calculator');await page.locator('#gp-name').fill('Preserve my study');await page.locator('#gp-save').click();const saved=await page.evaluate(()=>localStorage.getItem('geopolymer.calculator.v1'));
await go('/formulations/davidovits-fly-ash-80');await page.locator('#mix-mass').fill('950');assert.equal(await page.locator('#mix-open').getAttribute('href'),null);await page.locator('#mix-scale').click();assert.match(await page.locator('#mix-preview').innerText(),/600/);
const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#mix-download').click()]);const path=await download.path();const json=JSON.parse(fs.readFileSync(path,'utf8'));assert.equal(json.recipe.rows[0].mass,600);assert.match(json.study.results,/Literature report only/);
await page.locator('#mix-open').click();await page.locator('#gp-name').waitFor();assert.match(await page.locator('#gp-name').inputValue(),/Davidovits/);assert.match(await page.locator('#gp-comparison').innerText(),/Preserve my study/);assert.equal(await page.evaluate(()=>localStorage.getItem('geopolymer.calculator.v1')),saved);
await page.locator('#gp-notebook').click();await page.waitForURL('**/workspace#notebook');await page.locator('[data-meta=experimentTitle]').waitFor();const draft=await page.evaluate(()=>JSON.parse(localStorage.getItem('geopolymer.notebook.draft.v1')));assert.match(JSON.stringify(draft),/Literature report only/);
await go('/calculator');const name=await page.locator('#gp-name').inputValue();accept=false;await go('/calculator?mix=davidovits-mk-slag&mass=1000');assert.equal(await page.locator('#gp-name').inputValue(),name);accept=true;
await go('/calculator?mix=alameri-t2m9&mass=1000');assert.equal(await page.locator('#gp-name').inputValue(),name);
await go('/formulations/davidovits-fly-ash-80');await page.locator('#mix-mass').fill('-1');await page.locator('#mix-scale').click();assert.equal(await page.locator('#mix-open').getAttribute('href'),null);assert.equal(await page.locator('#mix-download').isDisabled(),true);
for(const width of [1440,390]){await page.setViewportSize({width,height:1000});for(const path of ['/formulations','/formulations/alameri-t2m9','/formulations/davidovits-fly-ash-80']){await go(path);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await page.screenshot({path:'.qa/mixes-'+width+'-'+path.split('/').pop()+'.png',fullPage:true});}}
assert.deepEqual(errors,[]);console.log('PASS literature: scaling, invalidation, export, transfer, cancel, partial blocking, notebook source preservation, desktop/mobile');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1);});
