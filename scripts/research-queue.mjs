import {researchTopics} from '../src/research-topics.js';
import {validateResearchTopics} from '../src/research-topic-core.js';
import {library} from '../src/research-library.js';
import {researchQueue} from './research-queue-core.mjs';

const args = process.argv.slice(2);
if (args.includes('--help')) {
  console.log('Usage: npm run research:queue -- [--json] [search words]\nOffline topic-source queue. Searches titles, DOI, materials, notes, locators and next checks. No network calls, ingestion or source-status promotion.');
} else {
  validateResearchTopics(researchTopics);
  const query = args.filter(a => a !== '--json').join(' ');
  const records = researchQueue(researchTopics, library, query);
  if (args.includes('--json')) console.log(JSON.stringify({schemaVersion:1,scope:'Offline research topic queue; not a complete backlog or verified evidence export',query,records},null,2));
  else {
    console.log(`${records.length} unique DOI leads in the topic queue. This is not the complete research backlog.`);
    for (const r of records) {
      console.log(`\n${r.title}\nhttps://doi.org/${r.doi}\nCatalog: ${r.canonicalId || 'not ingested'}`);
      for (const c of r.contexts) console.log(`  ${c.checked} | ${c.topic} | ${c.access}\n  Note: ${c.note}\n  Review: ${c.status}\n  Rights: ${c.rights}\n  Next: ${c.next}`);
    }
  }
}
