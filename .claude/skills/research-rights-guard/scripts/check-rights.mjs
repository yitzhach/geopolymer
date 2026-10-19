#!/usr/bin/env node
// research-rights-guard CLI.
//   node check-rights.mjs [--config rights-guard.config.json] [--json] [--strict] [--quiet]
// Exit codes: 0 clean, 1 errors (or warnings with --strict), 2 configuration problem.
import { readFile, access } from 'node:fs/promises';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { checkBundle, cacheName } from './rights-core.mjs';

export async function loadBundle(configPath) {
  const config = JSON.parse(await readFile(configPath, 'utf8'));
  const root = dirname(resolve(configPath));
  let bundle;
  if (config.adapter) {
    const mod = await import(pathToFileURL(resolve(root, config.adapter)).href);
    bundle = await (mod.default || mod.collect)({ root, config });
  } else if (config.sources && config.items) {
    bundle = {
      sources: JSON.parse(await readFile(resolve(root, config.sources), 'utf8')),
      items: JSON.parse(await readFile(resolve(root, config.items), 'utf8'))
    };
  } else throw new Error('Config needs "adapter" or both "sources" and "items"');
  const cacheDir = config.cacheDir ? resolve(root, config.cacheDir) : null;
  const sourceTextFor = id => {
    if (!cacheDir) return null;
    const file = join(cacheDir, cacheName(id));
    return existsSync(file) ? readFileSync(file, 'utf8') : null;
  };
  return { config, bundle, sourceTextFor, cacheDir };
}

export async function run(argv = process.argv.slice(2), log = console.log) {
  const flag = f => argv.includes(f);
  const i = argv.indexOf('--config');
  const configPath = resolve(i >= 0 ? argv[i + 1] : 'rights-guard.config.json');
  try { await access(configPath); } catch { log(`rights-guard: no config at ${configPath}`); return 2; }
  let loaded;
  try { loaded = await loadBundle(configPath); } catch (e) { log(`rights-guard: ${e.message}`); return 2; }
  const { config, bundle, sourceTextFor, cacheDir } = loaded;
  const report = checkBundle(bundle, config.options, sourceTextFor);
  const failed = report.errors > 0 || (flag('--strict') && report.warnings > 0);
  if (flag('--json')) { log(JSON.stringify(report, null, 2)); return failed ? 1 : 0; }
  const shown = flag('--quiet') ? report.findings.filter(f => f.level === 'error') : report.findings;
  for (const f of shown) log(`${f.level.toUpperCase().padEnd(7)} ${f.code.padEnd(20)} ${f.item || f.source || ''}  ${f.message}`);
  const s = report.stats;
  log(`rights-guard: ${s.items} items, ${s.sources} sources — ${report.errors} errors, ${report.warnings} warnings.`);
  log(cacheDir && s.overlapChecked
    ? `Wording overlap checked against ${s.overlapChecked} cached source texts (${s.overlapNoCache} citations had no cached text).`
    : 'Wording overlap not checked: no private source text cache available here. Run locally with the cache before publishing long-form work.');
  log('Policy checks only; not legal clearance.');
  return failed ? 1 : 0;
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) process.exitCode = await run();
