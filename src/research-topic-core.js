const accessStates = new Set(['indexed-lead', 'abstract-reviewed', 'full-text-partial']);
export function validateResearchTopics(topics) {
  const ids = new Set();
  for (const topic of topics) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(topic.id) || ids.has(topic.id)) throw new Error('Invalid or duplicate topic ID');
    ids.add(topic.id);
    if (!topic.title || !topic.summary || !/^\d{4}-\d{2}-\d{2}$/.test(topic.checked)) throw new Error('Missing topic context');
    if (!Array.isArray(topic.sources) || !topic.sources.length) throw new Error('Topic needs sources');
    const sources = new Set(), dois = new Set();
    for (const s of topic.sources) {
      if (!/^[a-z0-9-]+$/.test(s.id) || sources.has(s.id)) throw new Error('Invalid or duplicate source ID');
      sources.add(s.id);
      const doi = String(s.doi).toLowerCase();
      if (!/^10\.\d{4,9}\/\S+$/.test(doi) || dois.has(doi)) throw new Error('Invalid or duplicate DOI');
      dois.add(doi);
      if (!accessStates.has(s.access)) throw new Error('Unsupported evidence depth');
      if (!Number.isInteger(s.year) || s.year < 1900 || s.year > 2100) throw new Error('Invalid publication year');
      if (!['title','material','locator','note','next','rights','status','checked'].every(k => typeof s[k] === 'string' && s[k].trim())) throw new Error('Missing source provenance or limits');
      const url = new URL(s.sourceUrl);
      if (url.protocol !== 'https:' || url.username || url.password) throw new Error('Unsafe source URL');
      if ('results' in s || 'abstract' in s || 'fullText' in s) throw new Error('Topic leads cannot contain numeric datasets or raw source text');
    }
    if (!Array.isArray(topic.questions)) throw new Error('Missing questions');
    for (const q of topic.questions) {
      if (!q.title || !q.text || !q.sources?.length || q.sources.some(id => !sources.has(id))) throw new Error('Question has unresolved sources');
    }
  }
  return true;
}
