const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.BASE_URL||'http://localhost:4173';
(async()=>{const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_EXECUTABLE_PATH?{executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH}:{})});try{
 const table=await (await fetch(base+'/mixes.json')).json();
 assert.equal(table.format,'mix-table-v1');assert.equal(table.rows.length,table.counts.rows);
 const sheetRow=table.rows.find(r=>r.origin==='sheet'&&table.rows.filter(x=>x.paper.key===r.paper.key).length>1),guide=sheetRow.paper.guideId;
 for(const width of [1440,390])for(const javaScriptEnabled of [true,false]){
  const p=await browser.newPage({viewport:{width,height:1000},javaScriptEnabled}),errors=[];p.on('pageerror',e=>errors.push(e.message));
  assert.equal((await p.goto(base+'/mixes')).status(),200);
  assert.equal(await p.locator('.mx-row').count(),table.rows.length);
  if(javaScriptEnabled){
   await p.locator('main[data-enhanced=true]').waitFor();
   assert.match(await p.locator('#mx-count').innerText(),new RegExp(`${table.rows.length} of ${table.rows.length}`));
   assert.ok(await p.locator('#mx-chart svg .mx-dot').count()>=10,'chart plots points');
   assert.match(await p.locator('#mx-best-panel').innerText(),/Best within each paper/);
   await p.selectOption('#mx-precursor','slag');const slag=await p.locator('.mx-row:visible').count();assert.ok(slag>0&&slag<table.rows.length);
   await p.click('#mx-reset');await p.fill('#mx-q','AN-PC1-S');assert.equal(await p.locator('.mx-row:visible').count(),1);
   await p.click('#mx-reset');assert.equal(await p.locator('.mx-row:visible').count(),table.rows.length);
   // Sorting by the selected result puts the largest value first.
   await p.selectOption('#mx-sort','desc');const first=await p.locator('.mx-row:visible .mx-result strong').first().innerText();
   const values=await p.locator('.mx-row:visible .mx-result strong').allInnerTexts();assert.equal(Number(first),Math.max(...values.map(Number)));
   await p.selectOption('#mx-sort','paper');
   // Mix-level comparison with same/different/unknown rows and a shareable URL.
   const picks=p.locator('.mx-row:visible [data-pick]');await picks.nth(0).check();await picks.nth(1).check();
   assert.match(await p.locator('#mx-compare').innerText(),/Attribute[\s\S]*Match/);assert.match(await p.locator('#mx-compare-status').innerText(),/2 mixes/);
   assert.ok(p.url().includes('compare='));await p.reload();await p.locator('main[data-enhanced=true]').waitFor();
   assert.match(await p.locator('#mx-compare-status').innerText(),/2 mixes/);
   await p.click('#mx-clear-compare');assert.doesNotMatch(p.url(),/compare=/);
   // Compare every mix in one paper, then find similar mixes from other papers.
   const row=p.locator(`.mx-row[data-id="${sheetRow.id}"]`);await row.locator('summary').click();
   await row.locator('[data-act="paper"]').click();assert.match(await p.locator('#mx-compare-status').innerText(),/Same paper/);
   assert.match(await p.locator('#mx-count').innerText(),/one paper/);
   await row.locator('[data-act="similar"]').click();assert.match(await p.locator('#mx-similar').innerText(),/Closest mixes/);
   await p.click('#mx-reset');
   // Switching the charted result updates the table heading.
   const options=await p.locator('#mx-result option').allTextContents();await p.selectOption('#mx-result',{index:1});
   assert.equal(await p.locator('#mx-result-head').innerText(),options[1].split(' — ')[0]);
  }else{
   const row=p.locator(`.mx-row[data-id="${sheetRow.id}"]`);await row.locator('summary').click();
   assert.match(await row.innerText(),/Reported results/);assert.equal(await row.locator('[data-act]').first().isVisible(),false);
  }
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);assert.deepEqual(errors,[]);
  fs.mkdirSync('.qa',{recursive:true});await p.screenshot({path:`.qa/mix-explorer-${width}-${javaScriptEnabled?'js':'nojs'}.png`});await p.close();
 }
 // Deep dives with structured mixes link straight to their filtered rows.
 const g=await browser.newPage();await g.goto(`${base}/deep-dives/${guide}`);
 const href=await g.locator('a:has-text("Compare these mixes")').getAttribute('href');assert.ok(href.startsWith('/mixes?paper='));
 await g.goto(base+href);await g.locator('main[data-enhanced=true]').waitFor();assert.ok(await g.locator('.mx-row:visible').count()>=1);
 assert.ok(await g.locator('.mx-row:visible').count()<table.rows.length);await g.close();
 console.log('PASS mix explorer: table, filters, search, sort, chart, best-within-paper, comparison, paper comparison, similar mixes, share URLs, guide links, mobile/no-JS');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
