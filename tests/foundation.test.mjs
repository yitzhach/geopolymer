import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { routes } from '../src/routes.js';
import { renderPage } from '../src/app.js';

execFileSync(process.execPath, ['scripts/build.mjs']);
test('every registered route has complete, unique, crawlable HTML and metadata', async () => {
  const titles = new Set(), descriptions = new Set();
  for (const path of routes) {
    const html = await readFile(`dist${path === '/' ? '' : path}/index.html`, 'utf8');
    const title = html.match(/<title>(.*?)<\/title>/)[1];
    const description = html.match(/name="description" content="([^"]*)"/)[1];
    assert.ok(!titles.has(title), 'duplicate title: ' + path); titles.add(title);
    assert.ok(!descriptions.has(description), 'duplicate description: ' + path); descriptions.add(description);
    assert.match(html, /<main[^>]*>[\s\S]*<h1/);
    assert.ok(renderPage(path).html.length > 500, path);
    assert.match(html, /rel="canonical" href="https:\/\//);
    assert.match(html, /property="og:image"/);
    const graph = JSON.parse(html.match(/type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.equal(graph['@context'], 'https://schema.org');
    assert.ok(!JSON.stringify(graph).includes('"Offer"'));
    assert.ok(!html.includes('href="#/'));
    // All internal content/navigation links must resolve to a registered page or asset.
    for (const [, href] of html.matchAll(/href="(\/[^"?&#]*)(?:[^\"]*)"/g)) {
      if (!/\.[a-z0-9]+$/.test(href)) assert.ok(routes.includes(href), `${path} -> ${href}`);
    }
  }
});
test('unknown and malformed nested routes are 404 rather than existing page fallbacks', () => {
  for (const path of ['/missing','/learn/missing','/calculator/extra','/materials/metakaolin/extra','/research/missing']) {
    assert.equal(renderPage(path).status, 404); assert.match(renderPage(path).html, /This page is not here/);
  }
});
test('library is rendered in HTML, crawl exclusions and evidence boundaries are retained', async () => {
  const html = await readFile('dist/library/index.html','utf8');
  assert.equal((html.match(/class="record library-card"/g)||[]).length,39);
  assert.match(html,/Journal publication is not platform peer review/);
  const sitemap=await readFile('dist/sitemap.xml','utf8');
  assert.ok(!sitemap.includes('/workspace')); assert.ok(!sitemap.includes('/search'));
  assert.equal((sitemap.match(/<url>/g)||[]).length,routes.length-2);
  assert.match(await readFile('dist/robots.txt','utf8'),/Disallow: \/workspace/);
  assert.match(await readFile('dist/404.html','utf8'),/noindex,follow/);
});
