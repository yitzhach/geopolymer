// Synthetic scale fixtures exist only in process memory, never in the scientific catalog.
import {performance} from 'node:perf_hooks';
import {gzipSync} from 'node:zlib';
import {knowledgeReferences} from '../src/knowledge-references.js';
import {reconcileBatch,textMatches} from '../src/knowledge-core.js';
for(const size of [500,1000]){
 const fixtures=Array.from({length:size},(_,i)=>({...knowledgeReferences[i%25],id:'synthetic-'+i,doi:'10.9999/synthetic-'+i,title:'SYNTHETIC '+i+' '+knowledgeReferences[i%25].title}));
 let state={records:[],cursor:0};const begin=performance.now();while(state.cursor<size)state=reconcileBatch(state.records,fixtures,{cursor:state.cursor});const importMs=performance.now()-begin;
 const latencies=[];for(let j=0;j<100;j++){const start=performance.now();fixtures.filter(p=>textMatches(p.title,'metakaolin shrinkage'));latencies.push(performance.now()-start);}latencies.sort((a,b)=>a-b);
 const body=JSON.stringify(fixtures);console.log(JSON.stringify({fixture:'synthetic metadata; no fabricated research in public catalog',records:size,importMs,p95SearchMs:latencies[94],jsonBytes:Buffer.byteLength(body),gzipBytes:gzipSync(body).length}));
}
