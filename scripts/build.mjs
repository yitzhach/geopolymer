import {deepDiveMixDesigns,validateMixDesigns,mixDesignExport} from '../src/deep-dive-mix-designs.js';
import {paperReadingPreviews} from '../src/paper-reading-previews.js';
import {validateReadingPreviews} from '../src/paper-reading-core.js';
import {library} from '../src/research-library.js';
import {deepDives} from '../src/deep-dives.js';
import {validateDeepDives} from '../src/deep-dive-core.js';
import {pilot} from '../src/knowledge-pilot.js';
import {researchTopics} from '../src/research-topics.js';
import {validateResearchTopics} from '../src/research-topic-core.js';
import {knowledgeReferences} from '../src/knowledge-references.js';
import {publicKnowledge,validateKnowledge} from '../src/knowledge-core.js';
import {journalFeed,journalRSS,researchDatabase} from '../src/research-feeds.js';
import {journalArticles} from '../src/journal-data.js';
import { cp, mkdir, rm, readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { renderPage } from '../src/app.js';
import { routes } from '../src/routes.js';
import { papers, products } from '../src/data.js';
import { siteOrigin, contentUpdated } from '../site.config.mjs';
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const plain = html => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
// src/ is public: refuse to build if a private/unassessed asset enters it.
if(pilot.assets.some(a=>a.operations.publicDisplay.decision!=='allowed'||a.operations.export.decision!=='allowed'))throw new Error('Restricted evidence must stay outside public src/; resolve rights before build');
const shell = await readFile('index.html', 'utf8');
validateResearchTopics(researchTopics);
validateDeepDives(deepDives);
validateMixDesigns(deepDiveMixDesigns,deepDives);
validateReadingPreviews(paperReadingPreviews,library,deepDives);
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
  const post=journalArticles.find(p=>path==='/journal/'+p.id);
  if(post) graph.push({'@type':'BlogPosting',headline:post.title,datePublished:post.date,description:post.summary,url,author:{'@type':'Organization',name:'Geopolymer Platform'},creativeWorkStatus:'AI-assisted editorial briefing'});
  const product = products.find(p => path === '/shop/' + p.id);
  if (product) graph.push({ '@type': 'Product', name: product.title, description: 'Proposed concept; not available to order. ' + product.summary, url });
  const noindex = ['/workspace', '/search', '/404'].includes(path);
  const metadata = `<link rel="alternate" type="application/rss+xml" title="GP Journal" href="${siteOrigin}/journal/feed.xml">${noindex ? '<meta name="robots" content="noindex,follow">' : ''}
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
const knowledgeErrors=validateKnowledge(pilot,knowledgeReferences);
if(knowledgeErrors.length)throw new Error(knowledgeErrors.join('\n'));
await writeFile('dist/knowledge.json',JSON.stringify(publicKnowledge(pilot,knowledgeReferences),null,2)+'\n');
const bibSafe=s=>String(s).replace(/[{}\\]/g,'');
await writeFile('dist/knowledge.bib',knowledgeReferences.map(p=>`@article{${p.id},\n  title={${bibSafe(p.title)}},\n  author={${bibSafe(p.authors.replaceAll('; ',' and '))}},\n  year={${p.year}},\n  journal={${bibSafe(p.journal)}},\n  doi={${p.doi}}\n}`).join('\n\n'));
await writeFile('dist/knowledge.ris',knowledgeReferences.map(p=>`TY  - JOUR\nTI  - ${p.title}\n${p.authors.split('; ').map(a=>'AU  - '+a).join('\n')}\nPY  - ${p.year}\nJO  - ${p.journal}\nDO  - ${p.doi}\nUR  - ${p.url}\nER  -`).join('\n\n'));
await writeFile('dist/research-library.json',JSON.stringify(researchDatabase(),null,2)+'\n');
await mkdir('dist/research-topics', {recursive:true});
for(const topic of researchTopics) await writeFile(`dist/research-topics/${topic.id}.json`,JSON.stringify({schemaVersion:1,evidenceScope:'Editorial research leads and proposals; not verified numeric evidence',...topic},null,2)+'\n');
await writeFile('dist/journal/feed.json',JSON.stringify(journalFeed(siteOrigin),null,2)+'\n');
await writeFile('dist/journal/feed.xml',journalRSS(siteOrigin));
await writeFile('dist/_headers', '/src/*\n  Cache-Control: public, max-age=0, must-revalidate\n');
let commit = 'unknown';
try { commit = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(); } catch {}
await writeFile('dist/build-info.json', JSON.stringify({ commit, builtAt: new Date().toISOString(), routes: routes.length, foundation: 1 }) + '\n');
console.log(`Pre-rendered ${routes.length} routes, 404, metadata and crawl files in dist/`);

await writeFile('dist/deep-dives.json',JSON.stringify({format:'geopolymer-deep-dives-v1',notice:'Editorial analysis: reported facts, conditional arithmetic and proposed experiments are separate. Partial AI review; not verified numerical evidence.',articles:deepDives},null,2)+'\n');

await writeFile('dist/deep-dive-mix-designs.json',JSON.stringify(mixDesignExport(),null,2)+'\n');
