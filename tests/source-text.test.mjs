import test from 'node:test';
import assert from 'node:assert/strict';
import {parseArticle,tableQuote,findTable,groundSheet,isChallenge,fetchOpenSource,decodeEntities} from '../scripts/lib/source-text.mjs';

// A JATS-style article: label/caption before the table, a column that spans every body row,
// a stacked header, and markup inside cells.
const jats=`<?xml version="1.0"?><!DOCTYPE article><article><front><article-meta><object-id>x_Table 2</object-id></article-meta></front><body>
<sec><title>2. Methods</title><p>Specimens were cured at 20&#x000b0;C for 28 d &amp; then tested.</p>
<table-wrap id="t2"><object-id pub-id-type="pii">materials-t002_Table 2</object-id><label>Table 2</label><caption><p>Mix proportion (kg/m<sup>3</sup>).</p></caption>
<table><thead><tr><th>Mix IDs</th><th>GGBS</th><th>QS</th></tr></thead><tbody>
<tr><td>M1</td><td>600.5</td><td rowspan="2">240</td></tr><tr><td>M2</td><td>420</td></tr></tbody></table></table-wrap>
<table-wrap><label>Table 3</label><caption><p>Design.</p></caption><table>
<tr><th></th><th colspan="2">Slag</th></tr><tr><th>AM</th><th>0.4</th><th>0.5</th></tr>
<tr><td>1</td><td>S41</td><td>S51</td></tr></table></table-wrap>
<p>M1 reached 40.5 MPa.</p></sec></body></article>`;
// An HTML page whose script holds "<" characters that are not markup.
const html=`<!doctype html><html><head><script>if(a<b&&c<d){x="<table>"}</script><style>p<x{}</style></head>
<body><nav>menu</nav><p>Table 1.</p><p>Row-label table.</p><table><tr><th>Category</th><th>A</th><th>B</th></tr>
<tr><td>Abbreviation</td><td>G-0</td><td>G-1</td></tr><tr><td>Ratio</td><td colspan="2">80:20</td></tr></table><p>Body text.</p></body></html>`;

test('parses JATS tables with captions, spans and stacked headers',()=>{
 const s=parseArticle(jats);
 const t2=findTable(s,2),t3=findTable(s,3);
 assert.equal(t2.caption,'Mix proportion (kg/m3).');
 assert.deepEqual(t2.header,[['Mix IDs','GGBS','QS']]);
 assert.deepEqual(t2.rows,[['M1','600.5','240'],['M2','420','240']]);
 assert.deepEqual(t2.spans,[{row:0,col:2,rowspan:2,colspan:1,text:'240'}]);
 assert.deepEqual(t3.header,[['','Slag','Slag'],['AM','0.4','0.5']]);
 assert.ok(s.blocks.includes('Specimens were cured at 20°C for 28 d & then tested.'));
 assert.ok(!s.blocks.some(b=>/materials-t002/.test(b)),'object-id text is dropped');
});

test('script contents and navigation never become text; colspans expand',()=>{
 const s=parseArticle(html),t=findTable(s,1);
 assert.ok(!s.blocks.some(b=>/a<b|menu/.test(b)));
 assert.equal(t.caption,'Row-label table.');
 assert.deepEqual(t.rows[1],['Ratio','80:20','80:20']);
 assert.ok(s.blocks.includes('Body text.'));
 assert.equal(decodeEntities('&plusmn;2 &#956;m'),'±2 μm');
});

test('builds standard table quotes, including spans, stacked headers and row-label tables',()=>{
 const s=parseArticle(jats),h=parseArticle(html);
 assert.equal(tableQuote(findTable(s,2),1),'Table 2 (Mix proportion (kg/m3)): Mix IDs | GGBS | QS → M2 | 420 | 240 [spanning cells: QS]');
 assert.equal(tableQuote(findTable(s,3),0,{cols:[0,2]}),'Table 3 (Design): AM | Slag 0.5 → 1 | S51');
 assert.equal(tableQuote(findTable(h,1),[0,1],{cols:[0,2]}),'Table 1 (Row-label table): Category | B → Abbreviation | G-1 ; Ratio | 80:20 [spanning cells: Ratio (2 columns)]');
});

test('grounding accepts real quotes and rejects altered cells, mixed rows and paraphrase',()=>{
 const s=parseArticle(jats),t2=findTable(s,2);
 const sheet=text=>({mixes:[{quantities:[{text}]}],gaps:['free text is not checked']});
 assert.deepEqual(groundSheet(sheet(tableQuote(t2,0)),s).problems,[]);
 assert.deepEqual(groundSheet(sheet('M1 reached 40.5 MPa.'),s).problems,[]);
 assert.equal(tableQuote(t2,0,{cols:[1],key:0}),'Table 2 (Mix proportion (kg/m3)), Mix IDs M1: GGBS → 600.5');
 assert.deepEqual(groundSheet(sheet(tableQuote(t2,0,{cols:[1],key:0})),s).problems,[]);
 const bad=[
  tableQuote(t2,0).replace('600.5','605.5'),            // changed value
  'Table 2 (Mix proportion (kg/m3)): Mix IDs | GGBS → M1 | 420', // cells from two different rows
  tableQuote(t2,0).replace('Table 2','Table 4'),          // table that does not exist
  tableQuote(t2,0,{cols:[1],key:0}).replace('Mix IDs M1','Mix IDs M2'), // key from another row
  'M1 reached about 40 MPa.',                             // paraphrase
 ];
 for(const q of bad)assert.equal(groundSheet(sheet(q),s).problems.length,1,q);
});

test('fetch refuses closed papers and challenge pages and logs every operation',async()=>{
 const reply=(body,status=200)=>({ok:status<400,status,json:async()=>body,text:async()=>body});
 const search=hit=>async url=>String(url).includes('/search')?reply({resultList:{result:[hit]}}):reply('<html>Checking your browser before accessing</html>');
 const closed=await fetchOpenSource('10.1/x',{fetchImpl:search({doi:'10.1/x',pmcid:'PMC1',isOpenAccess:'N',license:null})});
 assert.match(closed.error,/not open access/);assert.equal(closed.log.length,1);
 const challenged=await fetchOpenSource('10.1/x',{fetchImpl:search({doi:'10.1/x',pmcid:'PMC1',isOpenAccess:'Y',license:'cc by'})});
 assert.match(challenged.error,/challenge/);assert.equal(challenged.log.length,2);
 assert.ok(isChallenge('<title>Checking your browser - reCAPTCHA</title>'));
 const ok=await fetchOpenSource('10.1/x',{fetchImpl:async url=>String(url).includes('/search')?reply({resultList:{result:[{doi:'10.1/x',pmcid:'PMC1',isOpenAccess:'Y',license:'cc by'}]}}):reply(jats)});
 assert.equal(ok.error,undefined);assert.equal(findTable(ok.source,2).rows.length,2);assert.equal(ok.meta.pmcid,'PMC1');
});
