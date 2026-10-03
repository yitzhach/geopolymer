const { chromium } = require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES ? process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES + '/playwright' : 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const base = process.env.BASE_URL || 'http://localhost:4173';
fs.mkdirSync('.qa', { recursive: true });
(async () => {
  const { routes } = await import('../src/routes.js');
  const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH } : {}) });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('dialog', dialog => dialog.accept());
    const go = async path => {
      const response = await page.goto(base + path);
      assert.equal(response.status(), 200, path);
      await page.locator('main[data-enhanced="true"]').waitFor();
    };
    for (const viewport of [{width:1440,height:1100},{width:390,height:844}]) {
      await page.setViewportSize(viewport);
      for (const route of routes) {
        await go(route);
        assert.equal(await page.locator('h1').count(), 1, route);
        assert.ok(!(await page.locator('h1').innerText()).includes('not here'), route);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'overflow ' + route);
        assert.equal(await page.evaluate(() => [...document.querySelectorAll('.reveal')].some(e => getComputedStyle(e).opacity === '0')), false, 'hidden content ' + route);
      }
      await go('/');
      if (viewport.width === 390) assert.ok(await page.locator('main').evaluate(e => e.getBoundingClientRect().top) <= 120);
      assert.equal(await page.locator('.hero-enter').count(), 0, 'preview hero must be visible immediately');
      await page.screenshot({path: `.qa/home-${viewport.width}.png`, fullPage:true});
    }
    // Native disclosure: keyboard entry, sequential focus, Escape restoration.
    const menu = page.locator('#site-menu summary');
    await menu.press('Enter');
    await page.waitForFunction(() => document.querySelector('#site-menu summary').getAttribute('aria-expanded') === 'true');
    await menu.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement.getAttribute('href')), '/research');
    await page.keyboard.press('Escape');
    assert.equal(await menu.getAttribute('aria-expanded'), 'false');
    assert.equal(await page.evaluate(() => document.activeElement.tagName), 'SUMMARY');
    await go('/'); await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Skip to content');
    await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'main');

    // Every old route redirects, including query parameters; the hash is not a server rewrite.
    for (const route of routes) {
      await page.goto(base + '/#' + route);
      await page.waitForURL(base + route);
      await page.locator('main[data-enhanced="true"]').waitFor();
    }
    await page.goto(base + '/#/workspace?kind=Study%20submission');
    await page.waitForURL(base + '/workspace?kind=Study%20submission');
    await page.locator('main[data-enhanced="true"]').waitFor();
    assert.equal(await page.locator('[name=kind]').inputValue(),'Study submission');

    await go('/tools');
    await page.locator('#target').fill('2.5');
    await page.locator('#scaler button').click();
    assert.equal(await page.locator('tbody tr').first().locator('td').last().innerText(), '1,500');
    await page.locator('#target').fill('-1');
    assert.match(await page.locator('#scale-error').innerText(), /greater than zero/);
    await go('/search');
    await page.locator('#query').fill('metakaolin');
    assert.ok(await page.locator('.result').count() >= 4);
    await page.getByRole('button',{name:'Research',exact:true}).click();
    assert.ok(await page.locator('.result').count() >= 1);
    await page.locator('#query').fill('<script>');
    assert.equal(await page.locator('.result').count(),0);
    await go('/search?q=%22%3E%3Cimg%20src=x%20onerror=alert(1)%3E');
    assert.equal(await page.locator('#query').inputValue(),'\"><img src=x onerror=alert(1)>');
    await go('/shop?audience=artists');
    assert.equal(await page.locator('.product-card').count(),3);
    await go('/library?q=coffee');
    assert.equal(await page.locator('.library-card').count(),2);

    await go('/workspace');
    await page.locator('[name=title]').fill('Foundation QA draft');
    await page.locator('[name=body]').fill('Browser-local test; not submitted.');
    await page.locator('#draft-form button[type=submit]').click();
    assert.match(await page.locator('#draft-status').innerText(),/Saved/);
    await go('/materials'); await go('/workspace');
    await page.getByRole('button',{name:/Foundation QA draft/}).click();
    assert.equal(await page.locator('[name=body]').inputValue(),'Browser-local test; not submitted.');
    const download = page.waitForEvent('download');
    await page.locator('#download-draft').click();
    assert.equal((await download).suggestedFilename(),'geopolymer-draft.json');
    await go('/calculator');
    await page.locator('#gp-name').fill('Foundation QA calculator');
    await page.locator('#gp-save').click();
    assert.match(await page.locator('#gp-status').innerText(),/Saved/);
    await go('/materials'); await go('/calculator');
    assert.equal(await page.locator('#gp-name').inputValue(),'Foundation QA calculator');
    await page.locator('#gp-load').click();
    assert.equal(await page.locator('#gp-name').inputValue(),'Foundation QA calculator');
    assert.match(await page.locator('#gp-status').innerText(),/reopened/);
    const calcDownload = page.waitForEvent('download');
    await page.locator('#gp-export').click();
    assert.match((await calcDownload).suggestedFilename(),/\.json$/);
    // Actual browser storage failures keep entered workspace text.
    await page.context().addInitScript(() => { Storage.prototype.setItem = () => { throw new Error('QA quota'); }; });
    await go('/workspace');
    await page.locator('[name=title]').fill('Keep this input');
    await page.locator('[name=body]').fill('Keep these notes');
    await page.locator('#draft-form button[type=submit]').click();
    assert.match(await page.locator('#draft-status').innerText(),/Could not save/);
    assert.equal(await page.locator('[name=body]').inputValue(),'Keep these notes');

    const noJS = await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});
    for (const route of routes) {
      assert.equal((await noJS.goto(base+route)).status(),200,route);
      assert.equal(await noJS.locator('h1').count(),1,route);
      assert.ok((await noJS.locator('main').innerText()).length>150,route);
    }
    await noJS.goto(base+'/library');
    assert.equal(await noJS.locator('.library-card').count(),39);
    await noJS.locator('#site-menu summary').click();
    assert.equal(await noJS.getByRole('link',{name:'GP calculator',exact:true}).isVisible(),true);
    for (const path of ['/missing','/learn/missing','/calculator/extra']) {
      assert.equal((await noJS.goto(base+path)).status(),404,path);
      assert.match(await noJS.locator('h1').innerText(),/not here/);
    }
    const reduced = await browser.newPage({reducedMotion:'reduce'});
    await reduced.goto(base+'/'); await reduced.locator('main[data-enhanced="true"]').waitFor();
    assert.equal(await reduced.locator('.hero-enter').count(),0);
    assert.deepEqual(errors,[]);
    console.log('PASS: 30 routes desktop/mobile and JS-disabled; old hashes, 404s, keyboard/menu, visible content, reduced motion, search, calculator, workspace save/reopen/export and storage failure.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
