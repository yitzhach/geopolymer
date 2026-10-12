// Offline bounded importer. Fetching credentials, remote text and paid jobs are intentionally absent.
import {readFile,writeFile,rename} from 'node:fs/promises';
import {reconcileBatch} from '../src/knowledge-core.js';
const [input,output]=process.argv.slice(2);
if(!input||!output)throw new Error('Usage: node scripts/import-research.mjs input.json checkpoint.json');
const bytes=await readFile(input);if(bytes.length>5_000_000)throw new Error('Input exceeds 5 MB cap');
const incoming=JSON.parse(bytes);if(!Array.isArray(incoming)||incoming.length>1000)throw new Error('Expected <=1000 metadata records');
let state={records:[],cursor:0,events:[]};try{state=JSON.parse(await readFile(output,'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;}
const {createHash}=await import('node:crypto');const inputHash=createHash('sha256').update(bytes).digest('hex');
if(state.inputHash&&state.inputHash!==inputHash)throw new Error('Input changed; begin a new batch rather than resuming another input');
const next=reconcileBatch(state.records,incoming,{cursor:state.cursor,limit:25});
const result={...next,inputHash,events:[...state.events,...next.events],updated:new Date().toISOString(),schemaVersion:1};
await writeFile(output+'.tmp',JSON.stringify(result,null,2)+'\n');await rename(output+'.tmp',output);
console.log(JSON.stringify({cursor:result.cursor,complete:result.complete,records:result.records.length}));
