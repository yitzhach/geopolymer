// Offline planning only: retain every topic context; never infer the best evidence depth.
export function researchQueue(topics, library, query = '') {
  const catalog = new Map(library.map(r => [r.doi.toLowerCase(), r.id]));
  const grouped = new Map();
  for (const topic of topics) for (const source of topic.sources) {
    const doi = source.doi.toLowerCase();
    if (!grouped.has(doi)) grouped.set(doi, {
      doi, title: source.title, canonicalId: catalog.get(doi) ?? null, contexts: [],
    });
    grouped.get(doi).contexts.push({
      topic: topic.id, source: source.id, checked: source.checked,
      material: source.material, access: source.access, locator: source.locator,
      sourceUrl: source.sourceUrl, next: source.next,
      note: source.note, status: source.status, rights: source.rights,
    });
  }
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return [...grouped.values()].filter(row => {
    const haystack = [row.doi, row.title, ...row.contexts.flatMap(c => [c.topic, c.material, c.next, c.note, c.locator])].join(' ').toLowerCase();
    return words.every(word => haystack.includes(word));
  }).map(row => ({...row, contexts: row.contexts.sort((a,b) => b.checked.localeCompare(a.checked) || a.topic.localeCompare(b.topic))}))
    .sort((a,b) => a.doi.localeCompare(b.doi));
}
