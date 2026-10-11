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
    // Source linking retains existing ingredients; provenance and study notes roundtrip.
    const massBefore = await page.locator('[data-field=mass]').first().inputValue();
    await go('/calculator?source=library-39');
    assert.equal(await page.locator('[data-field=mass]').first().inputValue(),massBefore);
    assert.match(await page.locator('#gp-source-link').innerText(),/Standardized Method/);
    await page.locator('[data-study=curing]').fill('23 C; sealed; 7 days — personal trial');
    await page.locator('[data-row]').first().locator('summary').click();
    await page.locator('[data-provenance=kind]').first().selectOption('supplier');
    await page.locator('[data-provenance=lot]').first().fill('QA lot 12');
    await page.locator('#gp-save').click();
    await go('/materials'); await go('/calculator');
    assert.match(await page.locator('[data-study=curing]').inputValue(),/personal trial/);
    assert.equal(await page.locator('[data-provenance=lot]').first().inputValue(),'QA lot 12');
    assert.match(await page.locator('#gp-audit').innerText(),/QA|supplier/);
    await page.screenshot({path:'.qa/calculator-provenance-mobile.png',fullPage:true});
    await page.locator('#gp-unlink').click();
    assert.match(await page.locator('#gp-source-link').innerText(),/No library reference/);
    assert.match(await page.locator('[data-study=curing]').inputValue(),/personal trial/);
    await go('/calculator?source=not-a-record');
    assert.match(await page.locator('#gp-status').innerText(),/Unknown library reference/);
    // Supplier builder: preview, invalidation, target solver, transfer and persistence.
    await go('/calculator');
    await page.locator('#builder-solution-parts').fill('50');
    await page.locator('#builder-ack').check();
    await page.locator('#builder-form button[type=submit]').click();
    assert.match(await page.locator('#builder-preview').innerText(),/Planning recipe/);
    assert.match(await page.locator('#builder-preview').innerText(),/Dynapoz/);
    await page.locator('#builder-total').fill('2000');
    assert.equal(await page.locator('#builder-use').isVisible(),false);
    await page.locator('#builder-system').selectOption('potassium');
    await page.locator('#builder-activator').selectOption('pq-kasil-6');
    await page.locator('#builder-mode').selectOption('targets');
    await page.locator('#builder-si-al').fill('2');
    await page.locator('#builder-alkali-al').fill('1');
    await page.locator('#builder-water-solids').fill('0.8');
    await page.locator('#builder-hydroxide-pct').fill('98');
    await page.locator('#builder-target-source').fill('QA exploratory arithmetic targets');
    await page.locator('#builder-ack').check();
    await page.locator('#builder-form button[type=submit]').click();
    assert.match(await page.locator('#builder-preview').innerText(),/KOH feed/);
    await page.locator('#builder-water-solids').fill('0');
    await page.locator('#builder-form button[type=submit]').click();
    assert.match(await page.locator('#builder-preview').innerText(),/more water/);
    assert.equal(await page.locator('#builder-use').isVisible(),false);
    await page.locator('#builder-water-solids').fill('0.8');
    await page.locator('#builder-form button[type=submit]').click();
    await page.locator('#builder-use').click();
    assert.match(await page.locator('#gp-name').inputValue(),/Planning mix/);
    assert.match(await page.locator('#gp-comparison').innerText(),/Reference:/);
    assert.match(await page.locator('#gp-output').innerText(),/2,000/);
    await page.locator('#gp-save').click();
    await go('/materials'); await go('/calculator');
    assert.match(await page.locator('#gp-name').inputValue(),/Planning mix/);
    assert.match(await page.locator('[data-study=targetBasis]').inputValue(),/QA exploratory/);
    await page.locator('#gp-grade').selectOption('powerpozz-white');
    await page.locator('#gp-add-grade').click();
    assert.equal(await page.locator('[data-field=name]').last().inputValue(),'ACT PowerPozz White');
    assert.equal(await page.locator('[data-field=mass]').last().inputValue(),'0');
    await page.screenshot({path:'.qa/supplier-builder-mobile.png',fullPage:true});
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
    assert.equal(await noJS.locator('.library-card').count(),61);
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
