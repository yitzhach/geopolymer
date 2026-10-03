import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
// Dev uses the same pre-rendered output as production. Rebuild after source edits.
if (!process.argv.includes('--dist')) await import('./build.mjs');
const root = resolve('dist');
const types = { '.jpg':'image/jpeg', '.png':'image/png', '.svg':'image/svg+xml', '.html':'text/html; charset=utf-8', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.xml':'application/xml', '.txt':'text/plain' };
http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    if (pathname !== '/' && /\/$/.test(pathname)) {
      res.writeHead(308, { Location: pathname.replace(/\/+$/, '') + url.search }).end(); return;
    }
    let file = resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control':'no-store' }).end(data);
  } catch {
    res.writeHead(404, { 'Content-Type':'text/html; charset=utf-8' }).end(await readFile(resolve(root, '404.html')));
  }
}).listen(Number(process.env.PORT) || 4173, '0.0.0.0', () => console.log('Pre-rendered site: http://localhost:4173'));
