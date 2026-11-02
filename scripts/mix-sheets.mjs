// Mix sheet command line. Usage: npm run mixes -- <command> [args]
//   context <guideId>      print the reviewed text a sheet may quote (the only allowed source in review-note mode)
//   new <guideId> [--out p] write a pre-filled skeleton to research/mix-sheets/<guideId>.json (or to path p)
//   check [files…]         validate sheets (default: all); --audit prints value/text pairs for the attribution check
//   queue [--next N]       list the next queue entries that have no sheet yet
//   stats                  table counts after compilation
// Source-text mode (MIX_SHEET_STANDARD.md, "Source-text procedure"); papers stay outside the repository:
//   source <guideId> [--dir d] [--refresh]   find the open-access copy (Europe PMC full-text XML) and save it parsed to d (default: OS temp)
//   tables <guideId> [N] [--dir d]      print the saved paper's tables (all, or Table N) with row indexes
//   quote <guideId> <N> <row> [--cols 0,2,3] [--dir d]   print the standard quote for one table row
//   ground <guideId> [--dir d]          check every quote of a source-text sheet against the saved paper
import {writeFile,access,readFile} from 'node:fs/promises';
import {SHEET_DIR,guideContext,sheetFiles,readSheet,checkSheet,coveredDois,buildMixTable} from './lib/mix-sheets.mjs';
import {SHEET_FORMAT,SHEET_TOOL} from '../src/mix-table.js';
import {fetchOpenSource,parseArticle,isChallenge,findTable,tableQuote,groundSheet} from './lib/source-text.mjs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';

const [command,...args]=process.argv.slice(2);
const flag=name=>{const i=args.indexOf(name);return i<0?null:args[i+1]??true;};
const today=new Date().toISOString().slice(0,10);
const fail=msg=>{console.error(msg);process.exit(1);};

if(command==='context'){
 const ctx=guideContext(args[0]);
 if(!ctx)fail(`Unknown guide "${args[0]}". Guide ids are the /deep-dives/<id> slugs.`);
 const covered=coveredDois().has(ctx.guide.doi.toLowerCase());
 console.log(`GUIDE ${ctx.guide.id}\nDOI ${ctx.guide.doi}\nPAPER ${ctx.title}${ctx.year?` (${ctx.year})`:''}\nSOURCE ${ctx.guide.source}\nREVIEW STATUS ${ctx.packet.status}${covered?'\nNOTE This DOI is already structured in the catalog or pilot — do not write a sheet.':''}\n`);
 console.log('Quote text exactly as printed under each [n] heading (a shorter exact fragment is fine). Every number you enter must appear in the text you quote.\n');
 for(const [i,l] of ctx.lines.entries())console.log(`[${i+1}] ${l.label}${l.locator?` (${l.locator})`:''}\n${l.text}\n`);
}
else if(command==='new'){
 const ctx=guideContext(args[0]);
 if(!ctx)fail(`Unknown guide "${args[0]}".`);
 const path=flag('--out')&&flag('--out')!==true?flag('--out'):`${SHEET_DIR}/${ctx.guide.id}.json`;
 if(await access(path).then(()=>true,()=>false))fail(`${path} already exists; edit it instead.`);
 const skeleton={format:SHEET_FORMAT,guideId:ctx.guide.id,doi:ctx.guide.doi,basis:'review-note',
  scope:'Mixes named in the existing deep-dive review only; not the paper’s complete mix table.',made:today,madeBy:SHEET_TOOL,
  materials:[],mixes:[],cures:[],tests:[],results:[],findings:[],notes:[],gaps:[]};
 await writeFile(path,JSON.stringify(skeleton,null,1)+'\n');
 console.log(`Wrote ${path}. Next: npm run mixes -- context ${ctx.guide.id}`);
}
else if(command==='check'){
 const files=args.filter(a=>!a.startsWith('--')).length?args.filter(a=>!a.startsWith('--')):await sheetFiles();
 const covered=coveredDois();let bad=0;
 for(const path of files){
  const {sheet,error}=await readSheet(path);
  if(error){console.log(`✗ ${error}`);bad++;continue;}
  const {errors,warnings}=checkSheet(sheet,{covered});
  if(!path.endsWith(`/${sheet.guideId}.json`))errors.push(`file name must be ${sheet.guideId}.json`);
  console.log(`${errors.length?'✗':'✓'} ${path} — ${errors.length} error(s), ${warnings.length} warning(s)`);
  for(const e of errors)console.log('   ERROR '+e);
  for(const w of warnings)console.log('   warn  '+w);
  if(errors.length)bad++;
  if(flag('--audit')&&!errors.length){
   console.log('   ATTRIBUTION CHECK — confirm each value belongs to this mix in its quote:');
   for(const r of sheet.results)console.log(`   · ${r.mix} | ${r.test} | ${r.value}${r.ageDays!==null&&r.ageDays!==undefined?` @ ${r.ageDays} d`:''} ← "${r.text}"`);
   for(const m of sheet.mixes){for(const q of m.quantities)console.log(`   · ${m.id} | ${q.material} = ${q.value} ${q.unit||''} (${q.basis||'basis not given'}) ← "${q.text}"`);for(const x of m.parameters)console.log(`   · ${m.id} | ${x.key} = ${x.value}${x.basisNote?` (${x.basisNote})`:''} ← "${x.text}"`);}
   for(const c of sheet.cures)console.log(`   · cure ${c.id} | ${c.category} ${c.temperatureC??'—'} °C ${c.duration??'—'} ${c.durationUnit||''} sealed=${c.sealed??'—'} ← "${c.text}"`);
   for(const f of sheet.findings)console.log(`   · finding ${f.mix} | ${f.goal} ← "${f.text}"`);
   for(const n of sheet.notes||[])console.log(`   · ${n.kind} ${n.mix} ← "${n.text}"`);
  }
 }
 console.log(bad?`\n${bad} sheet(s) need fixes.`:`\nAll ${files.length} sheet(s) pass.`);
 process.exit(bad?1:0);
}
else if(command==='queue'){
 const queue=JSON.parse(await readFile(`${SHEET_DIR}/QUEUE.json`,'utf8'));
 const done=new Set((await sheetFiles()).map(f=>f.split('/').pop().replace(/\.json$/,'')));
 const open=queue.entries.filter(e=>!done.has(e.guideId)&&!e.skip);
 const n=Number(flag('--next'))||open.length;
 console.log(`${done.size} sheet(s) done · ${open.length} open in queue "${queue.name}"\n`);
 for(const e of open.slice(0,n))console.log(`${e.guideId}  (${e.doi})  ${e.why||''}`);
}
else if(['source','tables','quote','ground'].includes(command)){
 const dir=flag('--dir')&&flag('--dir')!==true?flag('--dir'):join(tmpdir(),'geopolymer-sources');
 const ctx=guideContext(args[0]);
 if(!ctx)fail(`Unknown guide "${args[0]}".`);
 const file=join(dir,`${ctx.guide.id}.source.json`);
 const load=async()=>JSON.parse(await readFile(file,'utf8').catch(()=>fail(`No saved paper at ${file}. Run: npm run mixes -- source ${ctx.guide.id}`)));
 if(command==='source'){
  // Node's fetch ignores HTTPS_PROXY unless NODE_USE_ENV_PROXY is set at start-up; re-run once with it.
  if((process.env.HTTPS_PROXY||process.env.https_proxy)&&!process.env.NODE_USE_ENV_PROXY){
   const r=spawnSync(process.execPath,['--no-warnings',...process.argv.slice(1)],{stdio:'inherit',env:{...process.env,NODE_USE_ENV_PROXY:'1'}});
   process.exit(r.status??1);
  }
  const {mkdir}=await import('node:fs/promises');
  const htmlFile=file.replace(/\.source\.json$/,'.xml');
  // A saved page is re-parsed without a new download unless --refresh is given (downloads count toward the batch bound).
  if(!flag('--refresh')&&await access(htmlFile).then(()=>true,()=>false)){
   const old=await load(),raw=await readFile(htmlFile,'utf8');
   if(isChallenge(raw))fail('The saved page is a browser challenge, not the paper. Delete it and use: source <guideId> --refresh (Europe PMC API).');
   const src=parseArticle(raw);
   await writeFile(file,JSON.stringify({meta:old.meta,...src}));
   console.log(`Re-parsed ${htmlFile} (no download).`);
   for(const t of src.tables.filter(t=>t.number))console.log(`  Table ${t.number}: ${t.caption} — ${t.rows.length} row(s)${t.spans.length?`, ${t.spans.length} spanning cell(s)`:''}`);
   process.exit(0);
  }
  const r=await fetchOpenSource(ctx.guide.doi);
  for(const l of r.log)console.log(`operation: ${l.action} ${l.url} → ${l.status}`);
  if(r.error)fail(`Not read: ${r.error}. Record this as failed access/deferral in the batch audit.`);
  await mkdir(dir,{recursive:true});
  await writeFile(htmlFile,r.html);
  await writeFile(file,JSON.stringify({meta:r.meta,...r.source}));
  console.log(`${r.meta.pmcid} · ${r.meta.license} · ${r.meta.title}\nSaved ${file} (keep it out of the repository; delete after review).`);
  for(const t of r.source.tables.filter(t=>t.number))console.log(`  Table ${t.number}: ${t.caption} — ${t.rows.length} row(s)${t.spans.length?`, ${t.spans.length} spanning cell(s)`:''}`);
 }
 else if(command==='tables'){
  const src=await load();
  for(const t of src.tables.filter(t=>t.number&&(!args[1]||args[1].startsWith('--')||String(t.number)===args[1]))){
   console.log(`\nTable ${t.number}: ${t.caption}`);
   for(const h of t.header)console.log(`   head | ${h.join(' | ')}`);
   t.rows.forEach((r,i)=>console.log(`${String(i).padStart(7)} | ${r.join(' | ')}`));
   for(const s of t.spans)console.log(`   span: "${s.text}" covers ${s.rowspan} row(s) × ${s.colspan} column(s) from row ${s.row}, column ${s.col}`);
  }
 }
 else if(command==='quote'){
  const src=await load(),t=findTable(src,args[1]);
  if(!t)fail(`No Table ${args[1]}.`);
  const cols=flag('--cols')&&flag('--cols')!==true?String(flag('--cols')).split(',').map(Number):undefined;
  console.log(tableQuote(t,Number(args[2]),{cols}));
 }
 else{
  const src=await load(),{sheet,error}=await readSheet(`${SHEET_DIR}/${ctx.guide.id}.json`);
  if(error)fail(error);
  const {count,problems}=groundSheet(sheet,src);
  for(const p of problems)console.log('   NOT GROUNDED '+p);
  console.log(`${problems.length?'✗':'✓'} ${count} quote(s) checked against ${src.meta.pmcid}; ${problems.length} not grounded.`);
  process.exit(problems.length?1:0);
 }
}
else if(command==='stats'){
 const table=await buildMixTable();
 console.log(JSON.stringify(table.counts,null,1));
}
else{
 console.log(await readFile(new URL(import.meta.url),'utf8').then(s=>s.split('\n').slice(0,13).join('\n')));
 process.exit(command?1:0);
}
