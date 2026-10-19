import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { checkBundle, reuseDecision, sharedRuns, licenseTerms, findQuotedRuns, licenseFromUrl } from '../scripts/rights-core.mjs';
import { run } from '../scripts/check-rights.mjs';

const src = (over = {}) => ({ id: 's1', title: 'T', url: 'https://example.org/a', license: 'CC-BY-4.0',
  rightsEvidence: 'article page', checked: '2026-10-01', access: 'open-full-text', ...over });
const item = (over = {}) => ({ id: 'i1', type: 'summary', aiAssisted: true, text: 'Curing heat changed early strength in this study.',
  sources: ['s1'], rightsNote: 'Original summary.', ...over });
const codes = (bundle, opts, text) => checkBundle(bundle, { today: '2026-10-19', ...opts }, text).findings.map(f => f.code);

test('clean bundle passes; example project passes through the CLI', async () => {
  assert.deepEqual(codes({ sources: [src()], items: [item()] }), []);
  const config = fileURLToPath(new URL('../examples/rights-guard.config.json', import.meta.url));
  assert.equal(await run(['--config', config, '--quiet'], () => {}), 0);
  assert.equal(await run(['--config'], () => {}), 2);
});

test('license parsing and reuse matrix', () => {
  assert.equal(licenseTerms('CC-BY').versioned, false);
  assert.equal(licenseTerms('CC-BY-NC-ND-4.0').nd, true);
  assert.equal(licenseTerms('MIT-ish').known, false);
  assert.equal(reuseDecision('CC-BY-4.0', 'adapt', true).level, null);
  assert.equal(reuseDecision('CC-BY-NC-4.0', 'reproduce', true).level, 'error');
  assert.equal(reuseDecision('CC-BY-NC-4.0', 'reproduce', false).level, null);
  assert.equal(reuseDecision('CC-BY-ND-4.0', 'adapt', false).level, 'error');
  assert.equal(reuseDecision('CC-BY-ND-4.0', 'reproduce', true).level, null);
  assert.equal(reuseDecision('CC-BY-SA-4.0', 'adapt', false).level, 'warning');
  assert.equal(reuseDecision('all-rights-reserved', 'reproduce', false).level, 'error');
  assert.equal(reuseDecision('all-rights-reserved', 'reproduce', true, { scope: ['reproduce'] }).level, 'error');
  assert.equal(reuseDecision('all-rights-reserved', 'reproduce', true, { scope: ['reproduce', 'commercial'] }).level, null);
});

test('ledger problems are errors', () => {
  const c = codes({ sources: [src({ license: 'CC-BY', rightsEvidence: '' }), src({ id: 's2', url: 'http://x', access: 'skimmed' })], items: [] });
  assert.ok(c.includes('SRC_LICENSE_VERSION') && c.includes('SRC_EVIDENCE') && c.includes('SRC_URL') && c.includes('SRC_ACCESS'));
});

test('items need labels, notes, known sources and no raw text', () => {
  const c = codes({ sources: [src()], items: [item({ aiAssisted: undefined, rightsNote: '', sources: ['nope'], abstract: 'copied' })] });
  for (const k of ['ITEM_AI_LABEL', 'ITEM_RIGHTS_NOTE', 'ITEM_UNKNOWN_SOURCE', 'ITEM_RAW_TEXT']) assert.ok(c.includes(k), k);
});

test('claims cannot locate into metadata-only sources', () => {
  const c = codes({ sources: [src({ access: 'metadata-only' })], items: [item({ claims: [{ source: 's1', locator: 'Table 2' }] })] });
  assert.ok(c.includes('CLAIM_ACCESS'));
});

test('quote rules: undeclared, long, unlocated, share', () => {
  const long = Array.from({ length: 45 }, (_, i) => `w${i}`).join(' ');
  assert.ok(codes({ sources: [src()], items: [item({ text: 'They wrote “the binder failed in every single wet cycle test” here.' })] }).includes('QUOTE_UNDECLARED'));
  const c = codes({ sources: [src()], items: [item({ text: `Intro “${long}” end.`, quotes: [{ text: long, source: 's1' }] })] });
  for (const k of ['QUOTE_LONG', 'QUOTE_LOCATOR', 'QUOTE_SHARE']) assert.ok(c.includes(k), k);
  assert.equal(findQuotedRuns('a "short one" b', 6).length, 0);
  const masked = item({ text: 'They wrote “the binder failed in every single wet cycle test” here.', quotes: [{ text: '', source: 's1', locator: 'p. 1' }, { text: 'binder', source: 's1', locator: 'p. 1' }] });
  assert.ok(codes({ sources: [src()], items: [masked] }).includes('QUOTE_UNDECLARED'), 'empty or partial declared quotes must not mask a longer quoted passage');
});

test('figures follow the license matrix and commercial status', () => {
  const fig = { id: 'f', mode: 'adapted', source: 's1', attribution: 'From …', license: 'CC-BY-NC-4.0' };
  assert.ok(codes({ sources: [src()], items: [item({ type: 'ebook', status: 'draft', figures: [fig] })] }).includes('FIG_LICENSE'));
  assert.ok(!codes({ sources: [src()], items: [item({ figures: [fig] })] }).includes('FIG_LICENSE'));
  const inherited = codes({ sources: [src()], items: [item({ figures: [{ ...fig, license: undefined, mode: 'reproduced' }] })] });
  assert.ok(inherited.includes('FIG_RIGHTS_INHERITED'));
  const redraw = codes({ sources: [src()], items: [item({ figures: [{ id: 'f', mode: 'original-from-data', source: 's1', attribution: 'Ours' }] })] });
  assert.ok(redraw.includes('FIG_DATA_LOCATOR') && redraw.includes('FIG_SINGLE_SOURCE'));
  const full = codes({ sources: [src({ license: 'all-rights-reserved', rightsEvidence: undefined })], items: [item({ tables: [{ id: 't', mode: 'reproduced', source: 's1', locator: 'Table 1' }] })] });
  assert.ok(full.includes('TABLE_LICENSE'));
});

test('e-books are commercial by default and need a human review', () => {
  assert.ok(codes({ sources: [src()], items: [item({ type: 'ebook' })] }).includes('HUMAN_REVIEW'));
  const f = checkBundle({ sources: [src()], items: [item({ type: 'ebook', status: 'draft' })] }, { today: '2026-10-19' }).findings;
  assert.equal(f.find(x => x.code === 'HUMAN_REVIEW').level, 'warning');
  assert.ok(!codes({ sources: [src()], items: [item({ type: 'ebook', rightsReview: { by: 'Owner', date: '2026-10-19' } })] }).includes('HUMAN_REVIEW'));
});

test('overlap detection flags copied wording but not declared quotes', () => {
  const source = 'The specimens were cured at sixty degrees for twenty four hours before demoulding and testing in compression.';
  assert.equal(sharedRuns('cured at sixty degrees for twenty four hours before demoulding', source, 8)[0].length, 10);
  const copied = item({ text: 'Specimens were cured at sixty degrees for twenty four hours before demoulding and testing in compression.' });
  const c = checkBundle({ sources: [src()], items: [copied] }, {}, () => source);
  assert.equal(c.findings.find(f => f.code === 'OVERLAP').level, 'error');
  const quoted = item({ text: 'They say “cured at sixty degrees for twenty four hours before demoulding”.',
    quotes: [{ text: 'cured at sixty degrees for twenty four hours before demoulding', source: 's1', locator: '§2' }] });
  assert.ok(!checkBundle({ sources: [src()], items: [quoted] }, {}, () => source).findings.some(f => f.code === 'OVERLAP'));
  const own = item({ text: 'Heat curing for a day at 60 °C preceded the compression tests.' });
  assert.equal(checkBundle({ sources: [src()], items: [own] }, {}, () => source).errors, 0);
});

test('protocols need a located claim for every source', () => {
  const proto = item({ type: 'protocol', text: 'Mix 80 parts metakaolin with 20 parts slag, then cure sealed at room temperature.' });
  assert.ok(codes({ sources: [src()], items: [proto] }).includes('PROTOCOL_LOCATOR'));
  assert.ok(!codes({ sources: [src()], items: [{ ...proto, claims: [{ source: 's1', locator: 'Example 3; Table 5' }] }] }).includes('PROTOCOL_LOCATOR'));
});

test('license URL must agree with the recorded license', () => {
  assert.equal(licenseFromUrl('https://creativecommons.org/licenses/by-nc-nd/4.0/'), 'CC-BY-NC-ND-4.0');
  const url = 'https://creativecommons.org/licenses/by/4.0/';
  assert.ok(codes({ sources: [src({ license: 'CC-BY-NC-4.0', licenseUrl: url })], items: [] }).includes('SRC_LICENSE_MISMATCH'));
  assert.ok(codes({ sources: [src({ license: 'unknown', licenseUrl: url, rightsEvidence: undefined })], items: [] }).includes('SRC_LICENSE_MISMATCH'));
  assert.ok(!codes({ sources: [src({ licenseUrl: url })], items: [] }).includes('SRC_LICENSE_MISMATCH'));
  assert.ok(!codes({ sources: [src({ license: 'CC-BY', licenseUrl: url })], items: [] }).includes('SRC_LICENSE_MISMATCH'));
});

test('per-operation decisions gate public display', () => {
  const ops = d => ({ operations: { publicDisplay: { decision: d, reason: 'r' } } });
  assert.ok(codes({ sources: [src(ops('denied'))], items: [item()] }).includes('SRC_OPERATION_DENIED'));
  const table = { tables: [{ id: 't', mode: 'reproduced', source: 's1', locator: 'Table 1' }] };
  assert.ok(codes({ sources: [src(ops('unknown'))], items: [item(table)] }).includes('TABLE_OPERATION'));
  assert.deepEqual(codes({ sources: [src(ops('allowed'))], items: [item(table)] }), []);
  assert.ok(codes({ sources: [src({ operations: { publish: { decision: 'allowed' } } })], items: [] }).includes('SRC_OPERATION'));
});

test('null or missing options fall back to defaults', () => {
  assert.equal(checkBundle({ sources: [src()], items: [item()] }, null).errors, 0);
});
