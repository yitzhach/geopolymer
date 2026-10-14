import {readFile,writeFile,rename,mkdir,open,unlink,realpath} from 'node:fs/promises';
import {resolve,dirname,relative,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {randomUUID} from 'node:crypto';
import {library} from '../src/research-library.js';
import {createQueue,validateQueue,discover,reviewCandidate} from './lib/openalex.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
async function main(){
 const [command,path,...args]=process.argv.slice(2);
 if(!['run','status','review'].includes(command)||!path)throw Error('Usage: discover-openalex.mjs run work/queue.json "search" | status work/queue.json | review work/queue.json ID accepted|rejected "reason" "reviewer"');
 const output=resolve(path),work=resolve(root,'work');
 if(!output.startsWith(work+sep)||!output.endsWith('.json'))throw Error('Queues must be JSON files inside repository work/');
 await mkdir(dirname(output),{recursive:true});
 const realParent=await realpath(dirname(output));
 if(relative(work,realParent).startsWith('..')||relative(work,realParent).startsWith(sep))throw Error('Queue path escapes work/');
 const lock=await open(output+'.lock','wx',0o600).catch(()=>{throw Error('Queue is locked; do not run concurrent writers');});
 try{
  let state;try{const bytes=await readFile(output);if(bytes.length>5_000_000)throw Error('Checkpoint too large');state=JSON.parse(bytes);}catch(e){if(e.code!=='ENOENT')throw e;}
  const save=async value=>{
   const temporary=output+'.'+randomUUID()+'.tmp';
   try{await writeFile(temporary,JSON.stringify(value,null,2)+'\n',{mode:0o600,flag:'wx'});await rename(temporary,output);}
   finally{await unlink(temporary).catch(e=>{if(e.code!=='ENOENT')throw e;});}
  };
  if(command==='run'){
   if(args.length<1||args.length>2||(args[1]&&args[1]!=='--oa'))throw Error('Supply one quoted search query and optional --oa');
   const openAccessOnly=args[1]==='--oa';
   if(!state){state=createQueue(args[0],library);state.openAccessOnly=openAccessOnly;await save(state);}
   if(state.query!==args[0].trim()||Boolean(state.openAccessOnly)!==openAccessOnly)throw Error('Query changed; use a new queue file');
   state=await discover(state,library,{save,apiKey:process.env.OPENALEX_API_KEY||''});
  }else{
   if(!state)throw Error('Queue not found');validateQueue(state,library);
   if(command==='review'){if(args.length!==4)throw Error('Supply ID, decision, reason and reviewer');state=reviewCandidate(state,...args);await save(state);}
  }
  console.log(JSON.stringify({status:state.status,pages:state.pages,candidates:state.candidates.length,existingAccessLeads:state.accessLeads?.length||0,decisions:state.candidates.reduce((a,p)=>(a[p.review.state]++,a),{pending:0,accepted:0,rejected:0}),lastError:state.lastError}));
  if(state.lastError)process.exitCode=1;
 }finally{await lock.close();await unlink(output+'.lock');}
}
main().catch(()=>{console.error('Discovery command failed. Check arguments, checkpoint/catalog compatibility and lock; see OPENALEX_PIPELINE.md.');process.exitCode=1;});
