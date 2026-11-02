// Shared helpers for source-text sheet generators (see README.md).
import {writeFile} from 'node:fs/promises';
import {loadSource,findTable,tableQuote,headerFor} from '../../../scripts/lib/source-text.mjs';
export {findTable,tableQuote,headerFor};
export const SHEET_TOOL_SOURCE='AI transcription · mix-sheet skill v1 (source-text pilot)';
export const AUDIT='research/batches/source-text-pilot-2026-10-26.json';
export async function source(guideId){
 try{return await loadSource(guideId);}catch{throw new Error(`No saved paper. Run: npm run mixes -- source ${guideId}`);}
}
export function table(src,n){const t=findTable(src,n);if(!t)throw new Error(`Table ${n} missing from the parsed source`);return t;}
// Number from a cell; throws on anything that is not a plain number so a misparse cannot slip through.
export function num(cell){const s=String(cell).trim();if(!/^\d+(\.\d+)?$/.test(s))throw new Error(`not a plain number: "${cell}"`);return Number(s);}
// "111.7 (1.7)" → [111.7, 1.7]
export function valueSd(cell){const m=String(cell).trim().match(/^(\d+(?:\.\d+)?) \((\d+(?:\.\d+)?)\)$/);if(!m)throw new Error(`not "value (sd)": "${cell}"`);return [Number(m[1]),Number(m[2])];}
export function expect(actual,wanted,what){if(JSON.stringify(actual)!==JSON.stringify(wanted))throw new Error(`${what}: expected ${JSON.stringify(wanted)}, got ${JSON.stringify(actual)}`);}
export function sheetHeader(guideId,doi,src,scope,{made='2026-10-26',audit=AUDIT}={}){
 return {format:'mix-sheet-v1',guideId,doi,basis:'source-text',sourceUrl:src.meta.articleUrl||src.meta.url,accessed:src.meta.accessed,audit,scope,made,madeBy:SHEET_TOOL_SOURCE};
}
export async function save(sheet){
 const path=`research/mix-sheets/${sheet.guideId}.json`;
 await writeFile(path,JSON.stringify(sheet,null,1)+'\n');
 console.log(`Wrote ${path}: ${sheet.mixes.length} mixes, ${sheet.results.length} results`);
}
