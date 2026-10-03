import { cp, mkdir, rm, readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { renderPage } from '../src/app.js';
import { routes } from '../src/routes.js';
import { papers, products } from '../src/data.js';
import { siteOrigin, contentUpdated } from '../site.config.mjs';
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const plain = html => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const shell = await readFile('index.html', 'utf8');
await rm('dist', { recursive: true, force: true });
await mkdir('dist');
for (const file of ['favicon.svg', 'favicon-32.png', 'apple-touch-icon.png', 'share-card.png', 'src'])
  await cp(file, 'dist/' + file, { recursive: true });

for (const path of [...routes, '/404']) {
  const page = renderPage(path);
  const url = siteOrigin + path;
  const description = plain(page.html.match(/<p class="lede">([\s\S]*?)<\/p>/)?.[1] || page.title + ': explore connected geopolymer knowledge.');
  const title = `${page.title} · Geopolymer Platform`;
  const graph = [{ '@type': 'WebPage', '@id': url, url, name: title, description }];
  if (path === '/') graph.push(
    { '@type': 'Organization', '@id': siteOrigin + '/#organization', name: 'Geopolymer Platform', url: siteOrigin + '/' },
    { '@type': 'WebSite', url: siteOrigin + '/', name: 'Geopolymer Platform', potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: siteOrigin + '/search?q={search_term_string}' }, 'query-input': 'required name=search_term_string' } }
  );
  if (path.split('/').filter(Boolean).length > 1) {
    const parent = '/' + path.split('/')[1];
    graph.push({ '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteOrigin + '/' },
      { '@type': 'ListItem', position: 2, name: renderPage(parent).title, item: siteOrigin + parent },
      { '@type': 'ListItem', position: 3, name: page.title, item: url }
    ] });
  }
  const paper = papers.find(p => path === '/research/' + p.id);
  if (paper) {
    // This page summarizes a source. Do not imply we authored/published/reviewed it.
    const article = { '@type': 'ScholarlyArticle', '@id': 'https://doi.org/' + paper.doi,
      name: 'Standardized Method in Testing Commercial Metakaolins for Geopolymer Formulations',
      author: paper.authors.split(/, | & /).map(name => ({ '@type': 'Person', name })),
      datePublished: String(paper.year), sameAs: paper.url, url: 'https://doi.org/' + paper.doi,
      description: paper.access + '; ' + paper.publication };
    graph[0].about = { '@id': article['@id'] };
    graph[0].citation = article.url;
    graph.push(article);
  }
  const product = products.find(p => path === '/shop/' + p.id);
  if (product) graph.push({ '@type': 'Product', name: product.title, description: 'Proposed concept; not available to order. ' + product.summary, url });
  const noindex = ['/workspace', '/search', '/404'].includes(path);
  const metadata = `${noindex ? '<meta name="robots" content="noindex,follow">' : ''}
    ${path === '/404' ? '' : `<link rel="canonical" href="${esc(url)}">`}
    <meta property="og:type" content="website">
    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:url" content="${esc(url)}">
    <meta property="og:image" content="${siteOrigin}/share-card.png">
    <meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Geopolymer Platform — knowledge connected to materials">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(title)}">
    <meta name="twitter:description" content="${esc(description)}">
    <meta name="twitter:image" content="${siteOrigin}/share-card.png">
    <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}</script>`;
  const html = shell.replace(/<title>.*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${esc(description)}">`)
    .replace('<!-- PAGE_METADATA -->', metadata).replace('<!-- PAGE_CONTENT -->', page.html);
  const directory = path === '/' || path === '/404' ? 'dist' : 'dist' + path;
  await mkdir(directory, { recursive: true });
  await writeFile(directory + (path === '/404' ? '/404.html' : '/index.html'), html);
}
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.filter(p => !['/workspace','/search'].includes(p)).map(p => `<url><loc>${esc(siteOrigin + p)}</loc><lastmod>${contentUpdated}</lastmod></url>`).join('')}</urlset>\n`);
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nDisallow: /workspace\nDisallow: /search?\n\nSitemap: ${siteOrigin}/sitemap.xml\n`);
await writeFile('dist/llms.txt', `# Geopolymer Platform\n\nConnected geopolymer research, learning, studio work and proposed materials. Journal publication, platform review, internal reproduction and independent testing are distinct. Products are concepts, not available stock.\n\n${['research','library','materials','formulations','learn','artists','calculator','evidence'].map(p => `- [${renderPage('/'+p).title}](${siteOrigin}/${p})`).join('\n')}\n`);
await writeFile('dist/_headers', '/src/*\n  Cache-Control: public, max-age=0, must-revalidate\n');
let commit = 'unknown';
try { commit = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(); } catch {}
await writeFile('dist/build-info.json', JSON.stringify({ commit, builtAt: new Date().toISOString(), routes: routes.length, foundation: 1 }) + '\n');
console.log(`Pre-rendered ${routes.length} routes, 404, metadata and crawl files in dist/`);
