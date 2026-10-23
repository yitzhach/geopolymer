// Mix sheet command line. Usage: npm run mixes -- <command> [args]
//   context <guideId>      print the reviewed text a sheet may quote (the only allowed source in review-note mode)
//   new <guideId> [--out p] write a pre-filled skeleton to research/mix-sheets/<guideId>.json (or to path p)
//   check [files…]         validate sheets (default: all); --audit prints value/text pairs for the attribution check
//   queue [--next N]       list the next queue entries that have no sheet yet
//   stats                  table counts after compilation
import {writeFile,access,readFile} from 'node:fs/promises';
import {SHEET_DIR,guideContext,sheetFiles,readSheet,checkSheet,coveredDois,buildMixTable} from './lib/mix-sheets.mjs';
import {SHEET_FORMAT,SHEET_TOOL} from '../src/mix-table.js';

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
  materials:[],mixes:[],cures:[],tests:[],results:[],findings:[],gaps:[]};
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
   for(const m of sheet.mixes)for(const q of m.quantities)console.log(`   · ${m.id} | ${q.material} = ${q.value} ${q.unit} (${q.basis}) ← "${q.text}"`);
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
else if(command==='stats'){
 const table=await buildMixTable();
 console.log(JSON.stringify(table.counts,null,1));
}
else{
 console.log(await readFile(new URL(import.meta.url),'utf8').then(s=>s.split('\n').slice(0,7).join('\n')));
 process.exit(command?1:0);
}
