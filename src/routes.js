import {deepDives} from './deep-dives.js';
import {knowledgeReferences} from './knowledge-references.js';
import {researchTopics} from './research-topics.js';
import {journalArticles} from './journal-data.js';
import {literatureMixes} from './literature-mixes.js';
import { materials, papers, formulations, products } from './data.js';

// Public URL names and record IDs are stable. Add each public route here.
export const routes = [
  '/deep-dives', ...deepDives.map(d=>'/deep-dives/'+d.id),
  ...researchTopics.map(t=>'/research/'+t.id),
  '/knowledge', ...knowledgeReferences.map(p=>'/studies/'+p.id),
  ...[...new Set(deepDives.map(d=>d.relatedStudy).filter(path=>path&&!knowledgeReferences.some(p=>path==='/studies/'+p.id)))],
  '/', '/learn', '/learn/beginners', '/learn/educators', '/artists',
  '/materials', '/research', '/discover', '/library', '/formulations',
  '/shop', '/tools', '/calculator', '/workspace', '/supply', '/review',
  '/community', '/journal', '/search', '/evidence',
  ...journalArticles.map(p => '/journal/'+p.id),
  ...materials.map(x => '/materials/' + x.id),
  ...papers.map(x => '/research/' + x.id),
  ...literatureMixes.map(x => "/formulations/" + x.id),
  ...formulations.map(x => '/formulations/' + x.id),
  ...products.map(x => '/shop/' + x.id),
];
