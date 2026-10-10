import {journalArticles} from './journal-data.js';
import {literatureMixes} from './literature-mixes.js';
import { materials, papers, formulations, products } from './data.js';

// Public URL names and record IDs are stable. Add each public route here.
export const routes = [
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
