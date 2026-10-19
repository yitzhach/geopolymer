// research-rights-guard core: pure checks over a {sources, items} bundle.
// No dependencies; Node 18+. These checks are review aids that enforce a
// written policy. They are not legal clearance and no threshold here is a
// legal standard.

export const DEFAULTS = {
  quote: { maxWords: 40, maxPerSourcePerItem: 3, maxShare: 0.1, detectMinWords: 6 },
  overlap: { warnRun: 8, errorRun: 12 },
  ebook: { minSources: 3, maxSourceShare: 0.4 },
  maxRightsAgeDays: 400,
  commercialDefault: false,
  today: null
};

export const ACCESS = ['metadata-only', 'abstract', 'open-full-text', 'licensed-full-text'];
export const ITEM_TYPES = ['card', 'summary', 'deep-dive', 'article', 'protocol', 'ebook'];
export const FIGURE_MODES = ['reproduced', 'adapted', 'original-from-data'];
export const TABLE_MODES = ['selected-values', 'reproduced', 'adapted'];
// Item keys that would publish source text rather than original writing.
export const RAW_KEYS = ['abstract', 'fullText', 'sourceText', 'rawText', 'pdf', 'html'];

const CC = /^CC-BY(-NC)?(-ND|-SA)?(?:-(\d\.\d))?$/;

// Parse a license identifier into the terms that matter for reuse decisions.
export function licenseTerms(license) {
  if (license === 'public-domain' || license === 'CC0-1.0')
    return { known: true, open: true, versioned: true, attribution: false, nc: false, nd: false, sa: false };
  if (license === 'all-rights-reserved' || license === 'unknown')
    return { known: true, open: false, versioned: true, attribution: true, nc: false, nd: false, sa: false };
  const m = CC.exec(license || '');
  if (!m) return { known: false, open: false };
  return { known: true, open: true, versioned: Boolean(m[3]), attribution: true, nc: Boolean(m[1]), nd: m[2] === '-ND', sa: m[2] === '-SA' };
}

// Identifier implied by a creativecommons.org license URL, or null.
export function licenseFromUrl(url) {
  if (/creativecommons\.org\/publicdomain\/zero\/1\.0/.test(url || '')) return 'CC0-1.0';
  const m = /creativecommons\.org\/licenses\/(by(?:-nc)?(?:-nd|-sa)?)\/(\d\.\d)/.exec(url || '');
  return m ? `CC-${m[1].toUpperCase()}-${m[2]}` : null;
}

// Per-operation rights decisions a ledger may record (allowed | denied | unknown).
export const OPERATIONS = ['access', 'download', 'processing', 'rawRetention', 'aiTransmission', 'embedding', 'publicDisplay', 'export'];
const decision = (s, op) => s?.operations?.[op]?.decision;

const PERMISSION_SCOPES = ['reproduce', 'adapt', 'commercial'];
function permissionCovers(permission, use, commercial) {
  if (!permission || !Array.isArray(permission.scope)) return false;
  return permission.scope.includes(use) && (!commercial || permission.scope.includes('commercial'));
}

// Decide whether a figure/table may be reproduced or adapted under a license.
// Returns {level: null|'warning'|'error', reason}.
export function reuseDecision(license, use, commercial, permission) {
  if (permissionCovers(permission, use, commercial)) return { level: null, reason: 'documented permission' };
  const t = licenseTerms(license);
  if (!t.known) return { level: 'error', reason: `unrecognized license "${license}"` };
  if (!t.open) return { level: 'error', reason: `${license}: needs documented permission covering "${use}"${commercial ? ' and commercial use' : ''}` };
  if (t.nc && commercial) return { level: 'error', reason: `${license} forbids commercial use; this item is commercial` };
  if (t.nd && use === 'adapt') return { level: 'error', reason: `${license} forbids adaptations; reproduce unmodified or make an original chart from data` };
  if (t.sa && use === 'adapt') return { level: 'warning', reason: `${license}: the adapted figure must carry the same license` };
  return { level: null, reason: 'license permits this use with attribution' };
}

export function tokenize(text) {
  return String(text || '').toLowerCase().normalize('NFKC').match(/[\p{L}\p{N}]+/gu) || [];
}

// Longest runs of consecutive words shared between `text` and `source`.
// Runs shorter than `minRun` are ignored.
export function sharedRuns(text, source, minRun) {
  const a = tokenize(text), b = tokenize(source);
  if (a.length < minRun || b.length < minRun) return [];
  const grams = new Set();
  for (let i = 0; i + minRun <= b.length; i++) grams.add(b.slice(i, i + minRun).join(' '));
  const runs = [];
  let start = -1, last = -1;
  for (let i = 0; i + minRun <= a.length; i++) {
    if (grams.has(a.slice(i, i + minRun).join(' '))) {
      if (start < 0 || i > last + 1) { if (start >= 0) runs.push([start, last]); start = i; }
      last = i;
    }
  }
  if (start >= 0) runs.push([start, last]);
  return runs.map(([s, e]) => ({ length: e - s + minRun, text: a.slice(s, e + minRun).join(' ') }));
}

// Quoted passages in prose: “…” or "…" (single quotes collide with apostrophes).
export function findQuotedRuns(text, minWords) {
  const out = [];
  for (const m of String(text || '').matchAll(/[“"]([^“”"]{1,3000})[”"]/g))
    if (tokenize(m[1]).length >= minWords) out.push(m[1]);
  return out;
}

const norm = s => tokenize(s).join(' ');
const nonEmpty = v => typeof v === 'string' && v.trim().length > 0;
const words = s => tokenize(s).length;
const daysBetween = (a, b) => Math.floor((Date.parse(b) - Date.parse(a)) / 86400000);

export function mergeOptions(options = {}) {
  return {
    ...DEFAULTS, ...options,
    quote: { ...DEFAULTS.quote, ...options.quote },
    overlap: { ...DEFAULTS.overlap, ...options.overlap },
    ebook: { ...DEFAULTS.ebook, ...options.ebook }
  };
}

export function checkBundle(bundle, options = {}, sourceTextFor = () => null) {
  const o = mergeOptions(options);
  const today = o.today || new Date().toISOString().slice(0, 10);
  const findings = [];
  const add = (level, code, message, ref = {}) => findings.push({ level, code, message, ...ref });
  const stats = { sources: 0, items: 0, overlapChecked: 0, overlapNoCache: 0 };

  // Sources: the rights ledger.
  const ledger = new Map();
  for (const s of bundle.sources || []) {
    stats.sources++;
    const ref = { source: s.id };
    if (!nonEmpty(s.id)) { add('error', 'SRC_ID', 'Source without id', ref); continue; }
    if (ledger.has(s.id)) add('error', 'SRC_DUPLICATE', `Duplicate source id ${s.id}`, ref);
    ledger.set(s.id, s);
    for (const k of ['title', 'checked', 'access', 'license'])
      if (!nonEmpty(s[k])) add('error', 'SRC_FIELD', `Missing ${k}`, ref);
    if (!nonEmpty(s.doi) && !nonEmpty(s.url)) add('error', 'SRC_FIELD', 'Missing doi or url (needed to point readers to the original)', ref);
    if (nonEmpty(s.url) && !/^https:\/\//.test(s.url)) add('error', 'SRC_URL', 'Source url must be https', ref);
    if (s.access && !ACCESS.includes(s.access)) add('error', 'SRC_ACCESS', `Unknown access "${s.access}" (use ${ACCESS.join(', ')})`, ref);
    if (s.checked && Number.isNaN(Date.parse(s.checked))) add('error', 'SRC_CHECKED', `Unparseable checked date "${s.checked}"`, ref);
    const t = licenseTerms(s.license);
    if (s.license && !t.known) add('error', 'SRC_LICENSE', `Unrecognized license "${s.license}"`, ref);
    if (t.known && !t.versioned) add('warning', 'SRC_LICENSE_VERSION', `${s.license} has no version; record the exact license version and URL`, ref);
    const urlLicense = licenseFromUrl(s.licenseUrl);
    if (urlLicense && t.known && urlLicense !== s.license && !(t.open && !t.versioned && urlLicense.startsWith(`${s.license}-`)))
      add('error', 'SRC_LICENSE_MISMATCH', `license ${s.license} disagrees with licenseUrl (${urlLicense}); record what the rights evidence actually states`, ref);
    if (s.operations) for (const [op, v] of Object.entries(s.operations)) {
      if (!OPERATIONS.includes(op)) add('error', 'SRC_OPERATION', `Unknown operation "${op}" (use ${OPERATIONS.join(', ')})`, ref);
      else if (!['allowed', 'denied', 'unknown'].includes(v?.decision)) add('error', 'SRC_OPERATION', `Operation ${op} needs decision allowed|denied|unknown`, ref);
    }
    if (t.open && !nonEmpty(s.rightsEvidence)) add('error', 'SRC_EVIDENCE', `License ${s.license} is relied on but rightsEvidence (where it is stated) is missing`, ref);
    if (s.permission) {
      for (const k of ['grantedBy', 'date', 'evidence']) if (!nonEmpty(s.permission[k])) add('error', 'SRC_PERMISSION', `Permission missing ${k}`, ref);
      if (!Array.isArray(s.permission.scope) || !s.permission.scope.every(x => PERMISSION_SCOPES.includes(x)))
        add('error', 'SRC_PERMISSION', `Permission scope must list only ${PERMISSION_SCOPES.join(', ')}`, ref);
    }
  }

  const itemIds = new Set();
  for (const item of bundle.items || []) {
    stats.items++;
    const ref = { item: item.id };
    if (!nonEmpty(item.id)) { add('error', 'ITEM_ID', 'Item without id'); continue; }
    if (itemIds.has(item.id)) add('error', 'ITEM_DUPLICATE', `Duplicate item id ${item.id}`, ref);
    itemIds.add(item.id);
    if (!ITEM_TYPES.includes(item.type)) add('error', 'ITEM_TYPE', `Unknown type "${item.type}" (use ${ITEM_TYPES.join(', ')})`, ref);
    const commercial = item.commercial ?? (item.type === 'ebook' ? true : o.commercialDefault);
    const draft = item.status === 'draft';
    const text = String(item.text || '');
    const textWords = words(text);
    if (!textWords) add('error', 'ITEM_TEXT', 'Item has no public text to check', ref);
    if (typeof item.aiAssisted !== 'boolean') add('error', 'ITEM_AI_LABEL', 'Declare aiAssisted: true|false so AI-assisted writing can be labeled', ref);
    if (!nonEmpty(item.rightsNote)) add('error', 'ITEM_RIGHTS_NOTE', 'Missing rightsNote (what was used, under what basis)', ref);
    for (const k of RAW_KEYS) if (k in item) add('error', 'ITEM_RAW_TEXT', `Field "${k}" would publish source text; store original writing only`, ref);

    const cited = Array.isArray(item.sources) ? item.sources : [];
    if (!cited.length) add('error', 'ITEM_NO_SOURCES', 'Item cites no sources', ref);
    for (const id of cited) if (!ledger.has(id)) add('error', 'ITEM_UNKNOWN_SOURCE', `Cites ${id}, which is not in the rights ledger`, ref);
    for (const id of cited) if (decision(ledger.get(id), 'publicDisplay') === 'denied')
      add('error', 'SRC_OPERATION_DENIED', `${id} records publicDisplay: denied, but this public item draws on it`, ref);
    const known = id => {
      if (!ledger.has(id)) { add('error', 'ITEM_UNKNOWN_SOURCE', `References ${id}, which is not in the rights ledger`, ref); return null; }
      if (!cited.includes(id)) add('warning', 'ITEM_UNCITED_SOURCE', `${id} is used but not listed in item.sources`, ref);
      return ledger.get(id);
    };

    // Claims: locators prove the fact came from a part of the source that was read.
    const claimCounts = new Map();
    for (const c of item.claims || []) {
      const s = known(c.source);
      if (!s) continue;
      claimCounts.set(c.source, (claimCounts.get(c.source) || 0) + 1);
      if (!nonEmpty(c.locator)) add('error', 'CLAIM_LOCATOR', `Claim from ${c.source} has no locator (section/page/table/figure)`, ref);
      else if (s.access === 'metadata-only') add('error', 'CLAIM_ACCESS', `Claim locator "${c.locator}" cites ${c.source}, which is metadata-only; nothing beyond bibliographic facts was read`, ref);
    }
    // Protocols (recipes, methods) publish quantities and conditions: each source needs a locator.
    if (item.type === 'protocol') for (const id of cited)
      if (ledger.has(id) && !claimCounts.has(id)) add('error', 'PROTOCOL_LOCATOR', `Protocol uses ${id} without a located claim (table/section/example) for its quantities`, ref);

    // Quotes: short, attributed, located and declared.
    const quotes = item.quotes || [];
    const perSource = new Map();
    let quoteWords = 0;
    for (const q of quotes) {
      const n = words(q.text);
      quoteWords += n;
      if (!known(q.source)) continue;
      perSource.set(q.source, (perSource.get(q.source) || 0) + 1);
      if (n > o.quote.maxWords) add('error', 'QUOTE_LONG', `Quote of ${n} words from ${q.source} exceeds ${o.quote.maxWords}`, ref);
      if (!nonEmpty(q.locator)) add('error', 'QUOTE_LOCATOR', `Quote from ${q.source} has no locator`, ref);
      if (!norm(text).includes(norm(q.text))) add('warning', 'QUOTE_ABSENT', `Declared quote from ${q.source} does not appear in the text`, ref);
    }
    for (const [id, n] of perSource) if (n > o.quote.maxPerSourcePerItem) add('warning', 'QUOTE_MANY', `${n} quotes from ${id}; keep quoting to what the point needs`, ref);
    if (textWords && quoteWords / textWords > o.quote.maxShare)
      add('error', 'QUOTE_SHARE', `Quotes are ${Math.round(100 * quoteWords / textWords)}% of the text (limit ${Math.round(100 * o.quote.maxShare)}%)`, ref);
    const declared = quotes.map(q => norm(q.text));
    for (const run of findQuotedRuns(text, o.quote.detectMinWords))
      if (!declared.some(d => d.includes(norm(run)) || norm(run).includes(d)))
        add('error', 'QUOTE_UNDECLARED', `Quoted passage not declared in item.quotes: “${run.slice(0, 80)}${run.length > 80 ? '…' : ''}”`, ref);

    // Figures and tables.
    for (const f of item.figures || []) {
      const label = `Figure ${f.id || '(no id)'}`;
      if (!FIGURE_MODES.includes(f.mode)) { add('error', 'FIG_MODE', `${label}: mode must be ${FIGURE_MODES.join(', ')}`, ref); continue; }
      if (!nonEmpty(f.attribution)) add('error', 'FIG_ATTRIBUTION', `${label}: attribution text is required`, ref);
      const ids = f.sources || (f.source ? [f.source] : []);
      const srcs = ids.map(known).filter(Boolean);
      if (!ids.length) add('error', 'FIG_SOURCE', `${label}: no source`, ref);
      if (f.mode === 'original-from-data') {
        if (!nonEmpty(f.dataLocator)) add('error', 'FIG_DATA_LOCATOR', `${label}: original chart needs dataLocator for every plotted value`, ref);
        for (const s of srcs) if (s.access === 'metadata-only') add('error', 'FIG_ACCESS', `${label}: plots data from ${s.id}, which is metadata-only`, ref);
        if (ids.length === 1) add('warning', 'FIG_SINGLE_SOURCE', `${label}: a single-source redraw can still copy the original's design; use your own layout or combine studies`, ref);
        continue;
      }
      const use = f.mode === 'reproduced' ? 'reproduce' : 'adapt';
      for (const s of srcs) {
        if (s.operations && decision(s, 'publicDisplay') !== 'allowed')
          add('error', 'FIG_OPERATION', `${label}: ${s.id} does not record publicDisplay: allowed`, ref);
        const lic = f.license || s.license;
        if (!f.license) add('warning', 'FIG_RIGHTS_INHERITED', `${label}: rights assumed to match ${s.id}; check the caption for third-party credit and set figure.license`, ref);
        const d = reuseDecision(lic, use, commercial, f.permission || s.permission);
        if (d.level) add(d.level, 'FIG_LICENSE', `${label} (${f.mode}): ${d.reason}`, ref);
        if (s.checked && daysBetween(s.checked, today) > o.maxRightsAgeDays)
          add('warning', 'FIG_RIGHTS_STALE', `${label}: rights for ${s.id} last checked ${s.checked}; recheck before reuse`, ref);
      }
    }
    for (const tb of item.tables || []) {
      const label = `Table ${tb.id || '(no id)'}`;
      if (!TABLE_MODES.includes(tb.mode)) { add('error', 'TABLE_MODE', `${label}: mode must be ${TABLE_MODES.join(', ')}`, ref); continue; }
      const s = known(tb.source);
      if (!nonEmpty(tb.locator)) add('error', 'TABLE_LOCATOR', `${label}: locator required`, ref);
      if (!s || tb.mode === 'selected-values') continue;
      if (s.operations && decision(s, 'publicDisplay') !== 'allowed')
        add('error', 'TABLE_OPERATION', `${label}: ${s.id} does not record publicDisplay: allowed`, ref);
      const d = reuseDecision(tb.license || s.license, tb.mode === 'reproduced' ? 'reproduce' : 'adapt', commercial, tb.permission || s.permission);
      if (d.level) add(d.level, 'TABLE_LICENSE', `${label} (${tb.mode}): ${d.reason}`, ref);
    }

    // Long-form and commercial products.
    if (commercial || item.type === 'ebook') {
      const r = item.rightsReview;
      if (!r || !nonEmpty(r.by) || !nonEmpty(r.date))
        add(draft ? 'warning' : 'error', 'HUMAN_REVIEW', `${commercial ? 'Commercial' : 'E-book'} item needs rightsReview {by, date} from a person before release`, ref);
    }
    if (item.type === 'ebook') {
      if (cited.length < o.ebook.minSources) add('warning', 'EBOOK_FEW_SOURCES', `E-book cites ${cited.length} sources; build on cross-study synthesis, not one paper`, ref);
      const total = [...claimCounts.values()].reduce((a, b) => a + b, 0);
      for (const [id, n] of claimCounts) if (total >= 5 && n / total > o.ebook.maxSourceShare)
        add('warning', 'EBOOK_CONCENTRATION', `${id} supplies ${Math.round(100 * n / total)}% of claims; risk of a substitute for the original`, ref);
    }

    // Wording overlap against privately cached source text.
    let stripped = text;
    for (const q of quotes) if (nonEmpty(q.text)) stripped = stripped.split(q.text).join(' ');
    for (const id of cited) {
      const sourceText = ledger.has(id) ? sourceTextFor(id) : null;
      if (!sourceText) { stats.overlapNoCache++; continue; }
      stats.overlapChecked++;
      for (const run of sharedRuns(stripped, sourceText, o.overlap.warnRun)) {
        const level = run.length >= o.overlap.errorRun ? 'error' : 'warning';
        add(level, 'OVERLAP', `${run.length} consecutive words match ${id}: “${run.text.slice(0, 100)}${run.text.length > 100 ? '…' : ''}” — rewrite in your own words or declare a short quote`, ref);
      }
    }
  }

  return {
    findings,
    errors: findings.filter(f => f.level === 'error').length,
    warnings: findings.filter(f => f.level === 'warning').length,
    stats
  };
}

// File name used for a source's private cached text.
export const cacheName = id => `${String(id).replace(/[^A-Za-z0-9._-]/g, '_')}.txt`;
