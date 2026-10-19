# Sourcing and access

Copyright (what you publish) and access terms (how you obtain material) are
separate risks. Respecting one doesn't cover the other.

## Preferred sources, in order

1. **Metadata APIs**: Crossref, OpenAlex, DataCite, PubMed/Europe PMC, arXiv.
   Bibliographic facts (title, authors, journal, date, DOI) are safe to store
   and display. Check each API's current terms and rate limits before use.
   Abstracts returned by an API are **not** covered by the metadata license;
   don't store or republish them.
2. **Open-access full text with an explicit license**: PMC open-access subset,
   publisher pages stating CC BY, institutional repositories. Record the
   license version, the URL where it is stated, and the date checked.
3. **Licensed access** (subscription, institutional) for reading and
   extracting facts. Check the license or ToS for text-and-data-mining
   terms before automated processing; many allow reading but restrict bulk
   download or mining.
4. **Web pages**: read individually; for automated collection, obey
   robots.txt and site terms, identify your client, and rate-limit.

## Never

- Bypass paywalls, logins, IP blocks, CAPTCHAs or rate limits.
- Use shadow libraries or unofficial mirrors of paywalled papers.
- Treat a 403/429/timeout as proof of a paywall, or as permission to retry in
  a loop.
- Send restricted full text to a third-party AI service unless your access
  terms allow it.

## Ledger fields (per source)

| Field | Why |
|---|---|
| `id`, `title`, `authors`, `doi`/`url` | Point readers to the original and credit authors |
| `license` | Exact identifier, e.g. `CC-BY-4.0`, `CC-BY-NC-4.0`, `all-rights-reserved`, `unknown` |
| `licenseUrl`, `rightsEvidence` | Where the license is stated (article page, PDF page, PMC notice) |
| `checked` | Date you verified it; licenses are irrevocable for copies obtained under them, but keep the dated evidence |
| `access` | `metadata-only`, `abstract`, `open-full-text`, `licensed-full-text` — what you actually read |
| `permission` | Written permission, if any, with scope |
| `operations` | Optional allowed/denied/unknown decision per operation (access, download, processing, rawRetention, aiTransmission, embedding, publicDisplay, export). Public display and AI transmission are separate questions: an article you may display may still be one you must not send to an AI provider. The checker enforces `publicDisplay`; other decisions are recorded for your process (it cannot tell from `aiAssisted` whether source text was transmitted) |

## Jurisdiction notes (orientation only, not advice)

- **US**: facts and ideas aren't protected (Feist v. Rural, 1991); fair use
  weighs purpose (commercial vs. transformative), nature of the work, amount
  used and market effect. Van Buren (2021) narrowed the federal computer-crime
  statute's "exceeds authorized access" to areas you are not entitled to
  enter; how it applies to terms-of-service breaches still varies by court.
  Breach of contract and access-control circumvention remain real risks.
- **EU**: the DSM Directive allows text and data mining by research
  organisations and cultural heritage institutions (Art. 3) and, more broadly,
  unless the rights holder has opted out in machine-readable form (Art. 4).
  Both require lawful access, and each member state implements them in its
  own law. Database rights can protect substantial extraction from databases.
- **UK**: the TDM exception covers computational analysis for non-commercial
  research by someone with lawful access.

These exceptions cover *mining to find facts*. Publishing outputs is a
separate question governed by the rules in this skill.

## Takedown and corrections

Publish a contact for rights holders. On a credible complaint: unpublish the
item promptly, review, and record the outcome. Invalidate caches or derived
items that depended on the material.
